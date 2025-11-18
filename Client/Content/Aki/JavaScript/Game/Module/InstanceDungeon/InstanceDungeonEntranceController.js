"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceController = exports.SETTLE_TYPE_MATERIALS = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const BossRushController_1 = require("../Activity/ActivityContent/BossRush/BossRushController");
const ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const MowingRiskInstanceView_1 = require("../Activity/ActivityContent/MowingRisk/View/MowingRiskInstanceView");
const SolarSpeedDefine_1 = require("../Activity/ActivityContent/SolarisSpeed/SolarSpeedDefine");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const EditBattleTeamController_1 = require("../EditBattleTeam/EditBattleTeamController");
const ItemRewardController_1 = require("../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../ItemReward/RewardData/RewardItemData");
const OnlineController_1 = require("../Online/OnlineController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const TeleportController_1 = require("../Teleport/TeleportController");
const TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController");
const TowerController_1 = require("../TowerDetailUi/TowerController");
const InstanceDungeonController_1 = require("./InstanceDungeonController");
const ONE_SECONDS = 1000;
const INSTANCE_SUCCESS = 3004;
const INSTANCE_FAIL = 3005;
const INSTANCE_SUCCESS_NO_REWARD = 3007;
const SETTLE_TYPE_ONETIME = 1;
const SETTLE_TYPE_ROLETRIAL = 2;
const SETTLE_TYPE_NONE = 3;
exports.SETTLE_TYPE_MATERIALS = 4;
const SETTLE_TYPE_CLOSE = 5;
class InstanceDungeonEntranceController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    this._hi = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(5).IconSmall;
    InstanceDungeonEntranceController.K9a();
    return true;
  }
  static OnClear() {
    this.uhi = undefined;
    this._hi = undefined;
    InstanceDungeonEntranceController.$9a();
    return true;
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("All", InstanceDungeonEntranceController.OpenViewLimit, "InstanceDungeonEntranceController.OpenViewLimit");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("All", InstanceDungeonEntranceController.OpenViewLimit);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, InstanceDungeonEntranceController.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, InstanceDungeonEntranceController.p5a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveOnlineWorld, InstanceDungeonEntranceController.chi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPowerChanged, InstanceDungeonEntranceController.A6e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, InstanceDungeonEntranceController.juc);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, InstanceDungeonEntranceController.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, InstanceDungeonEntranceController.p5a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveOnlineWorld, InstanceDungeonEntranceController.chi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPowerChanged, InstanceDungeonEntranceController.A6e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, InstanceDungeonEntranceController.juc);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(24074, InstanceDungeonEntranceController.mhi);
    Net_1.Net.Register(23669, InstanceDungeonEntranceController.dhi);
    Net_1.Net.Register(18656, InstanceDungeonEntranceController.Chi);
    Net_1.Net.Register(18125, InstanceDungeonEntranceController.MatchTeamNotify);
    Net_1.Net.Register(18143, InstanceDungeonEntranceController.ghi);
    Net_1.Net.Register(21906, InstanceDungeonEntranceController.MatchTeamStateNotify);
    Net_1.Net.Register(29744, InstanceDungeonEntranceController.fhi);
    Net_1.Net.Register(26398, InstanceDungeonEntranceController.phi);
    Net_1.Net.Register(17881, InstanceDungeonEntranceController.vhi);
    Net_1.Net.Register(15229, InstanceDungeonEntranceController.Mhi);
    Net_1.Net.Register(24798, InstanceDungeonEntranceController.Ehi);
    Net_1.Net.Register(29688, InstanceDungeonEntranceController.Shi);
    Net_1.Net.Register(17917, InstanceDungeonEntranceController.yhi);
    Net_1.Net.Register(19189, InstanceDungeonEntranceController.Ihi);
    Net_1.Net.Register(18132, InstanceDungeonEntranceController.Thi);
    Net_1.Net.Register(15783, InstanceDungeonEntranceController.Lhi);
    Net_1.Net.Register(22678, InstanceDungeonEntranceController.Dhi);
    Net_1.Net.Register(21262, InstanceDungeonEntranceController.Rhi);
    Net_1.Net.Register(23070, InstanceDungeonEntranceController.NMl);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24074);
    Net_1.Net.UnRegister(23669);
    Net_1.Net.UnRegister(18656);
    Net_1.Net.UnRegister(18125);
    Net_1.Net.UnRegister(18143);
    Net_1.Net.UnRegister(21906);
    Net_1.Net.UnRegister(29744);
    Net_1.Net.UnRegister(26398);
    Net_1.Net.UnRegister(17881);
    Net_1.Net.UnRegister(15229);
    Net_1.Net.UnRegister(24798);
    Net_1.Net.UnRegister(29688);
    Net_1.Net.UnRegister(17917);
    Net_1.Net.UnRegister(19189);
    Net_1.Net.UnRegister(18132);
    Net_1.Net.UnRegister(15783);
    Net_1.Net.UnRegister(22678);
    Net_1.Net.UnRegister(23070);
  }
  static K9a() {
    InstanceDungeonEntranceController.X9a.set(8500, MowingRiskInstanceView_1.MowingRiskInstanceView);
  }
  static $9a() {
    InstanceDungeonEntranceController.X9a.clear();
  }
  static async EnterEntrance(e, n = 0, o) {
    var t;
    if (e) {
      t = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlowId(e);
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceEntityId = n;
      if (o) {
        this.RegisterDungeonEntranceRestoreCb(o);
      }
      return t !== 3 && t !== 4 && (t === 7 ? BossRushController_1.BossRushController.OpenDefaultBossRushView() : t === 5 ? TowerController_1.TowerController.OpenTowerView() : (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId = e, InstanceDungeonEntranceController.Uhi()));
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 16, "副本入口打开错误", ["entranceId", e]);
      }
      return false;
    }
  }
  static async Uhi() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
    const n = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlow(e);
    return !!n && InstanceDungeonEntranceController.InstEntranceDetailRequest(e).finally(() => {
      n.Start();
    });
  }
  static ContinueEntranceFlow() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
    var e = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlow(e);
    if (e) {
      e.Flow();
    }
  }
  static RevertEntranceFlowStep() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
    if (e &&= ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlow(e)) {
      e.RevertStep();
    }
  }
  static OnEditBattleViewClose() {
    ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.OnEditBattleViewClose();
  }
  static async EnterInstanceDungeon() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    if (e) {
      return InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(e, ModelManager_1.ModelManager.EditBattleTeamModel.GetOwnRoleConfigIdList[0], ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId, 0);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 16, "进入副本失败，副本Id不存在", ["instanceId", e]);
      }
      return false;
    }
  }
  static async EnterInstanceDungeonByAutoRole() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 16, "请求进入副本失败，副本Id不存在", ["instanceId", e]);
      }
      return false;
    }
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    if (!n) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 16, "请求进入副本失败，副本不存在", ["instanceId", e]);
      }
      return false;
    }
    let o = false;
    var t = n.TrialRoleFormation;
    if (t &&= ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTrialRoleConfig(t)) {
      r = t.MaleFormation.length > 0 && t.FemaleFormation.length > 0;
      o = t.OnlyTrial && r;
    }
    var t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
    if (o) {
      return InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(e, [], t);
    }
    var r = n.FightFormationId;
    var n = ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(r);
    if (!n) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 16, "副本没有编队配置", ["instanceId", e]);
      }
      return false;
    }
    r = n.AutoRole;
    if (!r || r.length === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("InstanceDungeon", 16, "请求进入副本失败，自动上阵角色列表为空", ["autoRoleGroupIdList", r]);
      }
      return false;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InstanceDungeon", 16, "请求进入副本跳过编队，并且配置了自动上阵角色", ["instanceId", e], ["autoRoleGroupIdList", r]);
    }
    var a = new Array();
    for (const l of r) {
      a.push(ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(l));
    }
    return InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(e, a, t);
  }
  static async LeaveInstanceDungeon() {
    return InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
  }
  static async LeaveInstanceDungeonRequest(e = 0) {
    var n = Protocol_1.Aki.Protocol.Hos.create();
    n.XVn = e;
    var e = await Net_1.Net.CallAsync(27680, n);
    return !!e && !(e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22150), 1) : ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList = undefined);
  }
  static async RestartInstanceDungeon() {
    return InstanceDungeonController_1.InstanceDungeonController.SingleInstReChallengeRequest();
  }
  static async InstEntranceDetailRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Vos();
    n.L9n = e;
    var e = await Net_1.Net.CallAsync(26319, n);
    if (!e) {
      return false;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10209" + Protocol_1.Aki.Protocol.$os.name]);
    }
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20471);
      return false;
    }
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceInstanceIdList.length = 0;
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.ClearDungeonArchiveInfo();
    for (const o of e.pws) {
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceInstanceIdList.push(o.r6n);
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetInstanceResetTime(o.r6n, o.ZLs);
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetDungeonArchiveInfo(o.r6n, o.tUc);
    }
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceEndTime = e.gPs;
    return true;
  }
  static async MatchChangeRoleRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Bas();
    n.Q6n = e;
    n.Tzs = TowerDefenceController_1.TowerDefenseController.BuildPhantomIdListByOwnRoleCfgIdList(e);
    n.vPc = new Protocol_1.Aki.Protocol.lqc();
    n.vPc.SPc = ModelManager_1.ModelManager.DangoAbyssModel.GetMatchDangoRoleOwnData(ModelManager_1.ModelManager.PlayerInfoModel.GetId(), e);
    var e = await Net_1.Net.CallAsync(22806, n);
    return !!e && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10061" + Protocol_1.Aki.Protocol.qas.name]), e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs || (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15075), false));
  }
  static async MatchChangeReadyRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Oas();
    n.D9n = e;
    var n = await Net_1.Net.CallAsync(20899, n);
    return !!n && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10064" + Protocol_1.Aki.Protocol.kas.name]), n.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(n.Q4n, 26048), false) : (n = ModelManager_1.ModelManager.PlayerInfoModel.GetId(), ModelManager_1.ModelManager.InstanceDungeonModel.SetPrewarPlayerReadyState(n, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PrewarReadyChanged, n, e), true));
  }
  static async LeaveMatchTeamRequest() {
    var e = new Protocol_1.Aki.Protocol.Fas();
    var e = await Net_1.Net.CallAsync(24872, e);
    return !!e && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10066" + Protocol_1.Aki.Protocol.Vas.name]), e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28720), false) : (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveTeam), true));
  }
  static async KickMatchTeamPlayerRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Was();
    n.W5n = e;
    var e = await Net_1.Net.CallAsync(17764, n);
    return !!e && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10071" + Protocol_1.Aki.Protocol.Kas.name]), e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs || (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23253), false));
  }
  static async SetMatchTeamMatchFlagRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Qas();
    n.u6n = e;
    var e = await Net_1.Net.CallAsync(16347, n);
    return !!e && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10075" + Protocol_1.Aki.Protocol.Xas.name]), e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs || (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20963), false));
  }
  static async EnterMatchInstRequest() {
    var e = new Protocol_1.Aki.Protocol.Jas();
    var e = await Net_1.Net.CallAsync(15332, e);
    return !!e && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10073" + Protocol_1.Aki.Protocol.zas.name]), e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26571, undefined, true, ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsNeedErrorCodeForEnterInstance), false) : (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveTeam), true));
  }
  static CheckInstanceShieldView(e) {
    var n;
    return !!InstanceDungeonEntranceController.LimitOpenView && !!(n = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()) && ConfigManager_1.ConfigManager.InstanceDungeonConfig.CheckViewShield(n, e);
  }
  static RestoreDungeonEntranceEntity() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceEntityId;
    if (e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e))?.IsInit) {
      e.Entity.GetComponent(84)?.Restore();
    }
  }
  static RegisterDungeonEntranceRestoreCb(e) {
    var n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceEntityId;
    if (n && (n = ModelManager_1.ModelManager.CreatureModel.GetEntityById(n))?.IsInit && (n = n.Entity.GetComponent(84))) {
      n.RegisterRestoreCb(e);
    } else {
      e();
    }
  }
  static async oYa(e, n = false) {
    var o;
    if ((await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestrictedAsync(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId())) === 1) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CommunicationRectricted"));
      this.O3a();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Chat", 27, "PrivateChatRequest 通信受限");
      }
      return false;
    } else if (ModelManager_1.ModelManager.GameModeModel.IsMulti || OnlineController_1.OnlineController.CheckPlatformCanopen()) {
      if (ModelManager_1.ModelManager.SubPackageDownLoadModel.CheckOnlineHaveSubPackage()) {
        (o = new Protocol_1.Aki.Protocol.Eas()).r6n = e;
        o.A9n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
        o.U9n = n;
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingId(e);
        Net_1.Net.Call(15267, o, e => {
          if (e) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10051" + Protocol_1.Aki.Protocol.yas.name]);
            }
            if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15970);
            } else {
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(1);
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingBegin);
            }
          }
        });
        return true;
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("MultiPlayerTeam", 5, "StartMatchRequest资源未下载");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MultiPlayerTeam", 5, "AgreeJoinResultRequest未通过PS5平台会员检测");
      }
      return false;
    }
  }
  static StartMatchRequest(e, n = false) {
    this.oYa(e, n);
  }
  static CancelMatchRequest() {
    var e = new Protocol_1.Aki.Protocol.Tas();
    Net_1.Net.Call(21039, e, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10053" + Protocol_1.Aki.Protocol.Las.name]);
      }
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15125);
      } else {
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(0);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
      }
    });
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CancelMatch", MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId()).MapName));
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingId(0);
  }
  static MatchConfirmRequest(n) {
    var e = new Protocol_1.Aki.Protocol.Pas();
    e.R9n = n;
    Net_1.Net.Call(20472, e, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10059" + Protocol_1.Aki.Protocol.Uas.name]);
      }
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29169);
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(0);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
      } else {
        ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchingPlayerConfirmState(ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), true);
        if (n) {
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(3);
        } else {
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(0);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
        }
      }
    });
  }
  static TeamChallengeRequest(e, n) {
    var o = new Protocol_1.Aki.Protocol.Zas();
    o.r6n = e;
    o.A9n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
    o.U9n = n;
    Net_1.Net.Call(28513, o, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10080" + Protocol_1.Aki.Protocol.ehs.name]);
      }
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22104);
      }
    });
  }
  static TeamMatchAcceptInviteRequest(e, n) {
    var o = new Protocol_1.Aki.Protocol.ohs();
    o.r6n = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceId();
    o.CIa = e ? Protocol_1.Aki.Protocol.GR_.jc_ : n ? Protocol_1.Aki.Protocol.GR_.Proto_ActiveRefuse : Protocol_1.Aki.Protocol.GR_.Proto_TimeOutRefuse;
    o.qVn = ModelManager_1.ModelManager.OnlineModel.OwnerId;
    Net_1.Net.Call(24948, o, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10085" + Protocol_1.Aki.Protocol.nhs.name]);
      }
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17856);
      }
    });
  }
  static TeamMatchInviteRequest() {
    var e = new Protocol_1.Aki.Protocol.ths();
    e.r6n = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceId();
    Net_1.Net.Call(27987, e, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10085" + Protocol_1.Aki.Protocol.ihs.name]);
      }
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21198);
      }
    });
  }
  static async OpenInstanceDungeonFailView() {
    if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      return false;
    }
    if (ModelManager_1.ModelManager.RoguelikeModel?.CheckInRoguelike()) {
      return false;
    }
    var e = InstanceDungeonEntranceController.Ahi(false);
    if (UiManager_1.UiManager.IsViewShow("InstanceDungeonFailView") || ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      return false;
    }
    {
      var n = InstanceDungeonEntranceController.Phi();
      const o = new CustomPromise_1.CustomPromise();
      ItemRewardController_1.ItemRewardController.OpenExploreRewardView(INSTANCE_FAIL, false, undefined, undefined, n, e, undefined, undefined, undefined, undefined, e => {
        o.SetResult(e);
      });
      return o.Promise;
    }
  }
  static Ahi(e) {
    var n = [];
    var o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.CreatureModel.GetInstanceId());
    var t = o.SettleButtonType;
    var r = ModelManager_1.ModelManager.GameModeModel.IsMulti;
    if (!e || !!r || t === SETTLE_TYPE_NONE || t === SETTLE_TYPE_ONETIME || t === exports.SETTLE_TYPE_MATERIALS) {
      o = {
        ButtonTextId: "Text_ButtonTextExit_Text",
        DescriptionTextId: "GenericPromptTypes_2_GeneralText",
        DescriptionArgs: undefined,
        TimeDown: o.AutoLeaveTime * TimeUtil_1.TimeUtil.InverseMillisecond,
        IsTimeDownCloseView: true,
        OnTimeDownOnCallback: () => {
          InstanceDungeonEntranceController.LeaveInstanceDungeon();
        },
        IsClickedCloseView: false,
        OnClickedCallback: e => {
          InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(() => {
            if (UiManager_1.UiManager.IsViewShow("ExploreRewardView")) {
              UiManager_1.UiManager.CloseView("ExploreRewardView");
            }
          });
        }
      };
      n.push(o);
    }
    if (r) {
      o = ModelManager_1.ModelManager.CreatureModel.IsMyWorld() ? "Text_ContinueChallenge_Text" : "Text_SuggestContinueChallenge_Text";
      r = [];
      a = ModelManager_1.ModelManager.PowerModel.PowerCount;
      r.push(a);
      a = `<texture=${this._hi}/>`;
      r.push(a);
      a = {
        ButtonTextId: o,
        DescriptionTextId: "Text_RemainText_Text",
        DescriptionArgs: r,
        IsTimeDownCloseView: false,
        IsClickedCloseView: false,
        OnClickedCallback: InstanceDungeonEntranceController.SettleViewButtonSuccessOnMultiCallBack,
        ClickCd: ModelManager_1.ModelManager.OnlineModel.ApplyCd * TimeUtil_1.TimeUtil.InverseMillisecond
      };
      n.push(a);
    } else {
      if (!e || t === exports.SETTLE_TYPE_MATERIALS) {
        this.whi = true;
        o = [];
        let e = ModelManager_1.ModelManager.PowerModel.PowerCount.toString();
        const l = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
        var r = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(l);
        if (!ModelManager_1.ModelManager.PowerModel.IsPowerEnough(r)) {
          e = `<color=#c25757>${e}</color>`;
        }
        o.push(e);
        var a = `<texture=${this._hi}/>`;
        o.push(a);
        var a = {
          ButtonTextId: "Text_ChallengeAgain_Text",
          DescriptionTextId: r ? "Text_RemainText_Text" : undefined,
          DescriptionArgs: r ? o : undefined,
          IsTimeDownCloseView: false,
          IsClickedCloseView: false,
          OnClickedCallback: e => {
            var n;
            var o = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(l);
            if (ModelManager_1.ModelManager.PowerModel.IsPowerEnough(o) || ModelManager_1.ModelManager.InstanceDungeonModel.HidePowerLackConfirmBox) {
              if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanChallenge(l)) {
                InstanceDungeonEntranceController.RestartInstanceDungeon().finally(() => {
                  if (UiManager_1.UiManager.IsViewShow("ExploreRewardView")) {
                    UiManager_1.UiManager.CloseView("ExploreRewardView");
                  }
                });
              } else {
                ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("InstanceDungeonLackChallengeTimes");
              }
            } else {
              (n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(176)).ShowPowerItem = true;
              n.SetTextArgs(o.toString(), ModelManager_1.ModelManager.PowerModel.PowerCount.toString());
              n.FunctionMap.set(1, () => {});
              n.FunctionMap.set(2, () => {
                InstanceDungeonEntranceController.RestartInstanceDungeon().finally(() => {
                  if (UiManager_1.UiManager.IsViewShow("ExploreRewardView")) {
                    UiManager_1.UiManager.CloseView("ExploreRewardView");
                  }
                });
              });
              n.HasToggle = true;
              n.ToggleText = ConfigManager_1.ConfigManager.TextConfig.GetTextById("PlotSkipConfirmToggle");
              n.SetToggleFunction(e => {
                ModelManager_1.ModelManager.InstanceDungeonModel.HidePowerLackConfirmBox = e;
              });
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(n);
            }
          }
        };
        n.push(a);
      }
      if (!!e && (t === SETTLE_TYPE_ROLETRIAL || t === SETTLE_TYPE_NONE)) {
        n.push({
          ButtonTextId: "Text_KeepOnButton_Text",
          DescriptionTextId: undefined,
          IsTimeDownCloseView: false,
          IsClickedCloseView: false,
          OnClickedCallback: e => {
            if (UiManager_1.UiManager.IsViewShow("ExploreRewardView")) {
              UiManager_1.UiManager.CloseView("ExploreRewardView");
              this.whi = false;
            }
          }
        });
      }
    }
    return n;
  }
  static Phi() {
    var e = [];
    var n = ModelManager_1.ModelManager.TrainingDegreeModel.GetTrainingDataList();
    if (n) {
      for (const t of n) {
        var o = {
          TrainingData: t
        };
        e.push(o);
      }
      return e;
    }
  }
  static Bhi(e) {
    var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).MapName);
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("TeamLeaderMatch", n);
    const o = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
    o.SetMatchingId(e);
    o.SetMatchingState(1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingBegin);
    if (!UiManager_1.UiManager.IsViewOpen("OnlineWorldHallView") && !UiManager_1.UiManager.IsViewOpen("InstanceDungeonEntranceView") && !UiManager_1.UiManager.IsViewOpen("EditBattleTeamView")) {
      o.MatchingTime = 0;
      o.OnStopTimer = () => o.GetMatchingState() !== 1;
      this.StartMatchTimer();
    }
  }
  static StartMatchTimer(e) {
    const n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
    if (n.MatchingTimer !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(n.MatchingTimer);
    }
    n.MatchingTimer = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      if (n.OnStopTimer) {
        if (n.OnStopTimer()) {
          if (n.MatchingTimer !== undefined) {
            TimerSystem_1.GameplayTimerSystem.Remove(n.MatchingTimer);
          }
          n.MatchingTimer = undefined;
          if (n.OnStopHandle) {
            n.OnStopHandle();
          }
        } else {
          n.MatchingTimeIncrease();
          if (e) {
            e();
          }
        }
      } else {
        if (n.MatchingTimer !== undefined) {
          TimerSystem_1.GameplayTimerSystem.Remove(n.MatchingTimer);
        }
        n.OnStopTimer = undefined;
        n.OnStopHandle = undefined;
        n.MatchingTimer = undefined;
      }
    }, ONE_SECONDS);
  }
  static async O3a() {
    await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(), 3, 6);
  }
  static CreateInstanceSubViewByType(e) {
    e = InstanceDungeonEntranceController.X9a.get(e);
    if (e) {
      return new e();
    }
  }
  static CheckRightTitleAvailableByInstanceId(e) {
    return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetEntranceIdByInstanceId(e) !== 9000;
  }
  static GetPictureItemDataGetter(e) {
    if (ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetEntranceIdByInstanceId(e) === 9000) {
      return () => ModelManager_1.ModelManager.SolarSpeedModel.GetInfoPicturePathByInstanceId(e);
    }
  }
  static GetDescWidelyItemDataGetter(e) {
    if (ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetEntranceIdByInstanceId(e) === 9000) {
      const n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
      if (n === undefined) {
        return undefined;
      } else {
        return () => n.DungeonDesc;
      }
    }
  }
  static GetTitleWidelyItemDataGetter(e) {
    if (ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetEntranceIdByInstanceId(e) === 9000) {
      const n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
      if (n === undefined) {
        return undefined;
      } else {
        return () => n.MapName;
      }
    }
  }
  static GetScoreListItemDataGetter(r) {
    if (ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetEntranceIdByInstanceId(r) === 9000) {
      return () => {
        var e;
        var n;
        var o = ModelManager_1.ModelManager.SolarSpeedModel;
        var t = o.GetHistoryRankByInstanceId(r);
        if (t !== undefined && t !== 0) {
          e = o.GetHistoryHighScoreByInstanceId(r);
          n = o.GetHistoryLapRecordByInstanceId(r) ?? 0;
          o = t === undefined ? undefined : o.GetMedalPathByRank(t);
          return {
            TitleTextId1: SolarSpeedDefine_1.SOLAR_SPEED_HIGHEST_RANK_TEXT_ID,
            TitleTextId2: SolarSpeedDefine_1.SOLAR_SPEED_HIGHEST_SCORE_TEXT_ID,
            TitleTextId3: SolarSpeedDefine_1.SOLAR_SPEED_LAP_RECORD_TEXT_ID,
            ScoreText1: t?.toString() ?? "",
            ScoreText2: e?.toString() ?? "",
            ScoreText3: n === 0 ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(SolarSpeedDefine_1.SOLAR_SPEED_LAP_RECORD_NO_RECORD_TEXT_ID) ?? "" : TimeUtil_1.TimeUtil.GetTimeString(n),
            MedalPathId: o
          };
        }
      };
    }
  }
}
exports.InstanceDungeonEntranceController = InstanceDungeonEntranceController;
(_a = InstanceDungeonEntranceController).uhi = undefined;
InstanceDungeonEntranceController.LimitOpenView = true;
InstanceDungeonEntranceController._hi = undefined;
InstanceDungeonEntranceController.whi = false;
InstanceDungeonEntranceController.bhi = false;
InstanceDungeonEntranceController.IsSettleExternalProcess = false;
InstanceDungeonEntranceController.X9a = new Map();
InstanceDungeonEntranceController.nye = () => {
  _a.whi = false;
  if (InstanceDungeonEntranceController.uhi) {
    InstanceDungeonEntranceController.Ihi(InstanceDungeonEntranceController.uhi);
    InstanceDungeonEntranceController.uhi = undefined;
  }
};
InstanceDungeonEntranceController.p5a = () => {
  if (_a.HandleExitMatch) {
    _a.HandleExitMatch = false;
    _a.LeaveMatchTeamRequest();
  }
  if (_a.HandleTipsExitMatchId) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CancelMatch", MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(_a.HandleTipsExitMatchId).MapName));
    _a.HandleTipsExitMatchId = 0;
  }
};
InstanceDungeonEntranceController.A6e = () => {
  var e;
  if (_a.whi && (e = _a.Ahi(_a.bhi), ItemRewardController_1.ItemRewardController.SetButtonList(e), e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId, e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(e), ModelManager_1.ModelManager.PowerModel.IsPowerEnough(e)) && UiManager_1.UiManager.IsViewOpen("ConfirmBoxView")) {
    UiManager_1.UiManager.CloseView("ConfirmBoxView");
  }
};
InstanceDungeonEntranceController.juc = () => {
  if (_a.HandleExitMatch) {
    _a.HandleExitMatch = false;
    _a.LeaveMatchTeamRequest();
  }
};
InstanceDungeonEntranceController.chi = () => {
  ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(0);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
};
InstanceDungeonEntranceController.Chi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10054" + Protocol_1.Aki.Protocol.Das.name]);
  }
  if (e.x9n === Protocol_1.Aki.Protocol.b5s.Proto_TimeOut) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("MatchingTimeOut");
  }
  ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(0);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
  ModelManager_1.ModelManager.InstanceDungeonModel.ResetData();
};
InstanceDungeonEntranceController.MatchTeamNotify = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10056" + Protocol_1.Aki.Protocol.Aas.name]);
  }
  ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchTeamInfo(e.Ibs);
  ModelManager_1.ModelManager.InstanceDungeonModel.InitMatchingTeamConfirmReadyState(e.Ibs.TRs);
  const n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId();
  if (ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckInstanceIdIsTowerDefense(n)) {
    TowerDefenceController_1.TowerDefenseController.SetIsUiFlowOpen(true);
  }
  if (ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchingPlayerConfirmStateByPlayerId(ModelManager_1.ModelManager.PlayerInfoModel.GetId())) {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(4);
    if (!UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView") && !UiManager_1.UiManager.IsViewShow("EditBattleTeamView")) {
      InstanceDungeonEntranceController.OpenEditBattleView();
      const n = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceId();
      if (ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckInstanceIdIsTowerDefense(n)) {
        TowerDefenceController_1.TowerDefenseController.SetIsUiFlowOpen(true);
      }
      return;
    }
  } else {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(2);
    if (UiManager_1.UiManager.IsViewOpen("OnlineMatchSuccessView")) {
      return;
    }
    if (!UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView") && !UiManager_1.UiManager.IsViewShow("EditBattleTeamView") && !UiManager_1.UiManager.IsViewShow("DangoAbyssInsSelectView")) {
      UiManager_1.UiManager.OpenView("OnlineMatchSuccessView");
    }
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
};
InstanceDungeonEntranceController.ghi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10057" + Protocol_1.Aki.Protocol.xas.name]);
  }
  ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(1);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
};
InstanceDungeonEntranceController.MatchTeamStateNotify = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10075" + Protocol_1.Aki.Protocol.bas.name]);
  }
  ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchTeamState(e.P9n);
  if (e.P9n === Protocol_1.Aki.Protocol.B5s.Proto_ReadyConfirm) {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(4);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
    if (!UiManager_1.UiManager.IsViewOpen("InstanceDungeonEntranceView")) {
      InstanceDungeonEntranceController.OpenEditBattleView();
      if (UiManager_1.UiManager.IsViewShow("OnlineMatchSuccessView")) {
        UiManager_1.UiManager.CloseView("OnlineMatchSuccessView");
      }
      return;
    }
  } else if (e.P9n === Protocol_1.Aki.Protocol.B5s.Proto_WaiteConfirm) {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(3);
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
};
InstanceDungeonEntranceController.fhi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10076" + Protocol_1.Aki.Protocol.was.name]);
  }
  ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchingPlayerConfirmState(e.Tbs, true);
  var n = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
  if (e.Tbs === n && ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchingTeamReady()) {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(4);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
    if (!UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView")) {
      InstanceDungeonEntranceController.OpenEditBattleView();
      if (UiManager_1.UiManager.IsViewOpen("OnlineMatchSuccessView")) {
        UiManager_1.UiManager.CloseView("OnlineMatchSuccessView");
      }
    }
  }
};
InstanceDungeonEntranceController.phi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10062" + Protocol_1.Aki.Protocol.Gas.name]);
  }
  ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchTeamInfoPlayerRole(e.W5n, e.J6n);
};
InstanceDungeonEntranceController.vhi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10065" + Protocol_1.Aki.Protocol.Nas.name]);
  }
  ModelManager_1.ModelManager.InstanceDungeonModel.SetPrewarPlayerReadyState(e.W5n, e.D9n);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PrewarReadyChanged, e.W5n, e.D9n);
  ModelManager_1.ModelManager.InstanceDungeonModel.SetPlayerUiState(e.W5n, e.D9n ? Protocol_1.Aki.Protocol.G5s.CTs : Protocol_1.Aki.Protocol.G5s.Proto_Wait);
};
InstanceDungeonEntranceController.Mhi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10068" + Protocol_1.Aki.Protocol.$as.name]);
  }
  var n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
  if (e.W5n === n) {
    if (!ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost() && e.Lbs === Protocol_1.Aki.Protocol.q5s.Proto_HostLeave) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("LeaderExitMatching");
    }
    if (e.Lbs === Protocol_1.Aki.Protocol.q5s.Proto_BeKick) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("MatchLeaveTeamByKickOut");
    }
    ModelManager_1.ModelManager.InstanceDungeonModel.ResetData();
    EditBattleTeamController_1.EditBattleTeamController.ExitEditBattleTeam(false);
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(0);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
    ModelManager_1.ModelManager.OnlineModel.ClearPlayerTeleportState();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveTeam);
    _a.HandleExitMatch = false;
  } else {
    n = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamName(e.W5n);
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("OthersLeaveMatchTeam", n);
    ModelManager_1.ModelManager.InstanceDungeonModel.RemovePrewarFormationDataByPlayer(e.W5n);
    ModelManager_1.ModelManager.OnlineModel.DeletePlayerTeleportState(e.W5n);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PrewarFormationChanged);
  }
};
InstanceDungeonEntranceController.Ehi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10076" + Protocol_1.Aki.Protocol.jas.name]);
  }
  ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchingPlayerConfirmState(e.jRs.W5n, false);
  ModelManager_1.ModelManager.InstanceDungeonModel.SetPrewarPlayerReadyState(e.jRs.W5n, false);
  ModelManager_1.ModelManager.InstanceDungeonModel.AddPrewarFormationDataByPlayerInfo(e.jRs);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PrewarFormationChanged);
};
InstanceDungeonEntranceController.Shi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10076" + Protocol_1.Aki.Protocol.Yas.name]);
  }
  var n = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo();
  if (n) {
    n = n.qVn;
    ModelManager_1.ModelManager.InstanceDungeonModel.SetPlayerUiState(n, e.Rbs ? Protocol_1.Aki.Protocol.G5s.Proto_Matching : Protocol_1.Aki.Protocol.G5s.Proto_Wait);
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetEditBattleTeamMatching(e.Rbs);
  } else if (e.Rbs) {
    _a.Bhi(e.r6n);
  } else {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CancelMatchingTimer();
    if (!ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("LeaderCancelMatch");
    }
  }
};
InstanceDungeonEntranceController.Ihi = o => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10216" + Protocol_1.Aki.Protocol.Xos.name]);
  }
  if (InstanceDungeonEntranceController.IsSettleExternalProcess) {
    InstanceDungeonEntranceController.IsSettleExternalProcess = false;
  } else {
    _a.bhi = o.Mws;
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone) {
      if (o.Sws) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("InstanceDungeonRewardTimeNotEnough");
      } else {
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SyncSettleRewardItemList(o.gws);
        if (o.Mws) {
          var t = InstanceDungeonEntranceController.Ahi(o.Mws);
          var r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.CreatureModel.GetInstanceId()).SettleButtonType;
          if (r !== SETTLE_TYPE_CLOSE) {
            var a = [];
            var l = o.gws;
            for (const E of Object.keys(l)) {
              var _ = l[E]?.O9n;
              if (_) {
                var i = Number(E);
                for (const D of _) {
                  var c = new RewardItemData_1.RewardItemData(D.L8n, D.m9n, undefined, i);
                  a.push(c);
                }
              }
            }
            let e = false;
            var g;
            var s;
            var M;
            var d;
            var C;
            var u = ModelManager_1.ModelManager.CreatureModel?.GetInstanceId();
            if (u) {
              r = ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(u)?.InstSubType ?? 0;
              e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("MultiRewardLevelInstType")?.includes(r) ?? false;
            }
            let n = undefined;
            if (o.B9n > 1) {
              switch (o.dsm) {
                case Protocol_1.Aki.Protocol.msm.Proto_DoubleActivity:
                  n = ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivityFullTip([1, 2]);
                  break;
                case Protocol_1.Aki.Protocol.msm.Proto_FromRegress:
                  if (u && ([d, g, s, M, C] = ModelManager_1.ModelManager.ActivityRegressModel.GetRegressDoubleDropTuple(u), d)) {
                    d = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(C);
                    C = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(M, g, s);
                    n = "" + d + C;
                  }
              }
            }
            ItemRewardController_1.ItemRewardController.OpenExploreRewardView(a.length > 0 ? INSTANCE_SUCCESS : INSTANCE_SUCCESS_NO_REWARD, true, a, undefined, undefined, t, undefined, undefined, undefined, n, undefined, ModelManager_1.ModelManager.GameModeModel.IsMulti, undefined, undefined, e);
          }
        } else {
          InstanceDungeonEntranceController.OpenInstanceDungeonFailView();
        }
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InstanceDungeon", 5, "副本结算通知时，世界未加载完成");
      }
      InstanceDungeonEntranceController.uhi = o;
    }
  }
};
InstanceDungeonEntranceController.yhi = n => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10217" + Protocol_1.Aki.Protocol.les.name]);
  }
  var o = MathUtils_1.MathUtils.LongToNumber(n.s5n);
  var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
  if (o) {
    let e = undefined;
    switch (n.Y4n) {
      case Protocol_1.Aki.Protocol.U3s.Proto_NotUnlock:
        e = -421801185;
        break;
      case Protocol_1.Aki.Protocol.U3s.Proto_Unlockable:
        e = 1960897308;
        break;
      case Protocol_1.Aki.Protocol.U3s.Proto_Unlocked:
        e = 1196894179;
        break;
      default:
        e = -421801185;
    }
    n = o.Entity.GetComponent(107);
    if (n) {
      n.ChangeLockTag(e);
    }
  }
};
InstanceDungeonEntranceController.mhi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10200" + Protocol_1.Aki.Protocol.qos.name]);
  }
  ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InitInstanceDataList(e.fws);
};
InstanceDungeonEntranceController.dhi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10201" + Protocol_1.Aki.Protocol.Gos.name]);
  }
  ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InitInstanceDataList(e.fws);
};
InstanceDungeonEntranceController.Thi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10083" + Protocol_1.Aki.Protocol.rhs.name]);
  }
  var n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
  n.CancelMatchingTimer();
  ModelManager_1.ModelManager.InstanceDungeonModel.SetInstanceId(e.r6n);
  n.SetMatchingId(e.r6n);
  if (!ModelManager_1.ModelManager.PlotModel.IsInPlot) {
    if (UiManager_1.UiManager.IsViewShow("OnlineChallengeApplyView")) {
      UiManager_1.UiManager.CloseView("OnlineChallengeApplyView");
    }
    UiManager_1.UiManager.OpenView("OnlineChallengeApplyView");
  }
};
InstanceDungeonEntranceController.NMl = e => {
  e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(e.Q4n);
  ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, undefined, undefined, [e]);
};
InstanceDungeonEntranceController.Lhi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "10087" + Protocol_1.Aki.Protocol.Ias.name]);
  }
  _a.Bhi(e.r6n);
};
InstanceDungeonEntranceController.Dhi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", ["协议id", "11865" + Protocol_1.Aki.Protocol.Ras.name]);
  }
  var n;
  var o = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
  if (!ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() && o.GetMatchingState() === 1) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("LeaderCancelMatch");
  }
  if (ModelManager_1.ModelManager.LoadingModel?.IsLoading && (n = o.GetMatchingId()) !== 0) {
    _a.HandleTipsExitMatchId = n;
  }
  o.CancelMatchingTimer();
};
InstanceDungeonEntranceController.Rhi = e => {
  if (e.CIa !== Protocol_1.Aki.Protocol.GR_.jc_) {
    e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e.W5n).Name;
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("RefuseInviteMatch", e);
  }
};
InstanceDungeonEntranceController.OpenViewLimit = e => !InstanceDungeonEntranceController.CheckInstanceShieldView(e) || (BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip() ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("IOSCannotUseTips") : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("InstanceDungeonShieldViewCantOpen"), false);
InstanceDungeonEntranceController.HandleTipsExitMatchId = 0;
InstanceDungeonEntranceController.HandleExitMatch = false;
InstanceDungeonEntranceController.OpenEditBattleView = () => {
  const e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId();
  var n;
  var o;
  if (ModelManager_1.ModelManager.LoadingModel.IsLoading) {
    _a.HandleExitMatch = true;
  } else {
    n = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()?.P5n;
    o = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()?.g8n;
    if (n && o) {
      n = Vector_1.Vector.Create(n);
      o = Rotator_1.Rotator.Create(o);
      (ControllerHolder_1.ControllerHolder.TeleportController.UseNewTeleport ? ControllerHolder_1.ControllerHolder.TeleportControllerNew.TeleportPlayer("InstanceDungeonEntranceController.OpenEditBattleView", n.ToUeVector(), o.ToUeRotator(), undefined, 0) : TeleportController_1.TeleportController.TeleportToPosition(n.ToUeVector(), o.ToUeRotator(), undefined, "InstanceDungeonEntranceController.OpenEditBattleView")).finally(() => {
        ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = true;
        EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(e, true);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterTeam);
      });
    } else {
      ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = true;
      EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(e, true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterTeam);
    }
  }
};
InstanceDungeonEntranceController.SettleViewButtonSuccessOnMultiCallBack = e => {
  var n;
  var o;
  if (ModelManager_1.ModelManager.OnlineModel.AllowInitiate) {
    n = ModelManager_1.ModelManager.CreatureModel.IsMyWorld();
    if ((o = ModelManager_1.ModelManager.OnlineModel.NextInitiateLeftTime) > 0) {
      if (n) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NextInviteTime", TimeUtil_1.TimeUtil.GetCoolDown(o));
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NextSuggestTime", TimeUtil_1.TimeUtil.GetCoolDown(o));
      }
    } else {
      if (UiManager_1.UiManager.IsViewOpen("OnlineChallengeApplyView")) {
        UiManager_1.UiManager.CloseView("OnlineChallengeApplyView");
      }
      if (ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(ModelManager_1.ModelManager.PlayerInfoModel.GetId()) !== 2 && n) {
        OnlineController_1.OnlineController.InviteRechallengeRequest();
      } else {
        OnlineController_1.OnlineController.ApplyRechallengeRequest(Protocol_1.Aki.Protocol.o8s.eou);
      }
    }
  } else {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CannotInvite");
  }
};
InstanceDungeonEntranceController.GetInstanceSubtitleTextIdByInstanceId = e => {
  var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
  if (n !== undefined && n.InstSubType === 22) {
    return ModelManager_1.ModelManager.MowingRiskModel.BuildInstanceSubtitleTextIdByInstanceId(e);
  } else {
    return undefined;
  }
};
InstanceDungeonEntranceController.GetInstanceSubtitleArgsByInstanceId = e => {
  var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
  if (n !== undefined && n.InstSubType === 22) {
    return ModelManager_1.ModelManager.MowingRiskModel.BuildInstanceSubtitleTextArgsByInstanceId(e);
  } else {
    return undefined;
  }
};
InstanceDungeonEntranceController.GetIconRightPathGetter = e => {
  var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
  if (n !== undefined && n.InstSubType === 28) {
    return ModelManager_1.ModelManager.SolarSpeedModel.GetIconPathInInstanceSeriesItemByInstanceId(e);
  } else {
    return undefined;
  }
};
InstanceDungeonEntranceController.GetInstanceItemLockStateGetter = e => {
  var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
  return n !== undefined && n.InstSubType !== 28 && !ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(e);
}; //# sourceMappingURL=InstanceDungeonEntranceController.js.map