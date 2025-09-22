"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonController = undefined;
const ue_1 = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const LevelEventLockInputState_1 = require("../../LevelGamePlay/LevelEventLockInputState");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../Ui/UiManager");
const WorldGlobal_1 = require("../../World/WorldGlobal");
const BlackScreenController_1 = require("../BlackScreen/BlackScreenController");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const ReconnectDefine_1 = require("../ReConnect/ReconnectDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const SeamlessTravelDefine_1 = require("../SeamlessTravel/SeamlessTravelDefine");
const InstanceDungeonExitHandlerBase_1 = require("./Define/InstanceDungeonExitHandler/InstanceDungeonExitHandlerBase");
const InstanceDungeonExitHandlerDefine_1 = require("./Define/InstanceDungeonExitHandler/InstanceDungeonExitHandlerDefine");
const InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController");
class InstanceDungeonController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeWakeUp, this.ohi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.$5e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputDistribute, this.rhi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInstResultNotify, this.nhi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LoadingViewOnAfterShow, this.Hsl);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeWakeUp, this.ohi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.$5e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputDistribute, this.rhi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInstResultNotify, this.nhi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LoadingViewOnAfterShow, this.Hsl);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(16805, InstanceDungeonController.shi);
    Net_1.Net.Register(27605, InstanceDungeonController.nhi);
    Net_1.Net.Register(29042, InstanceDungeonController.Xoh);
    Net_1.Net.Register(25907, InstanceDungeonController.pMl);
    Net_1.Net.Register(16982, InstanceDungeonController.IR1);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16805);
    Net_1.Net.UnRegister(27605);
    Net_1.Net.UnRegister(29042);
    Net_1.Net.UnRegister(25907);
    Net_1.Net.UnRegister(16982);
  }
  static GetBeInviteOverdueTime(e) {
    if (e) {
      return (e.GetLimitTimestamp() - TimeUtil_1.TimeUtil.GetServerTimeStamp()) / WorldGlobal_1.ONE_SECOND_FOR_MILLISECOND;
    } else {
      return 0;
    }
  }
  static GetInstExchangeRewardRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Kos();
    n.Cal = e;
    Net_1.Net.Call(16258, n, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeScrollingTipsView(e.Q4n, []);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", ["协议id", "10214" + Protocol_1.Aki.Protocol.Qos.name]);
      }
    });
  }
  static OnClickInstanceDungeonExitButton(e, n, o = true) {
    var r;
    var t = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon;
    var t = InstanceDungeonExitHandlerDefine_1.dungeonExitHandlerMap.get(t.InstSubType);
    if (t && t.Checker()) {
      (r = new InstanceDungeonExitHandlerBase_1.InstanceDungeonExitHandlerData()).IsButton = o;
      r.ConfirmBack = e;
      r.CancelBack = n;
      t.HandleExit(r);
    } else {
      t = this.GetExitConfirmBoxConfigId();
      this.OpenNormalInstanceDungeonExitConfirmBox(t, e, n, o);
    }
  }
  static OpenNormalInstanceDungeonExitConfirmBox(e, n, o, r) {
    const t = this.NeedOpenReChallengeConfirmBox();
    var l = ModelManager_1.ModelManager.InstanceDungeonModel?.InstanceFinishSuccess;
    if (ModelManager_1.ModelManager.InstanceDungeonModel?.GetInstanceDungeonInfo()?.FinishEscAction && r && l === 1) {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest(1);
    } else {
      (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e)).IsEscViewTriggerCallBack = false;
      r.FunctionMap.set(0, o);
      r.FunctionMap.set(1, () => {
        if (t) {
          if (!this.Syn()) {
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LeaveInstanceDungeonConfirm);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LeaveInstanceExternalCancel);
        if (o) {
          o();
        }
      });
      r.FunctionMap.set(2, () => {
        if (!this.Syn()) {
          if (t) {
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestartInstanceDungeon();
          } else {
            if (BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip()) {
              ue_1.KuroVariableFunctionLibrary.SetBoolValue("IosAuditNeedHotPatch", true);
              ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.ExitGameConfirmBox);
              return;
            }
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
          }
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LeaveInstanceDungeonConfirm);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LeaveInstanceExternalConfirm);
        if (n) {
          n();
        }
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
    }
  }
  static NeedOpenReChallengeConfirmBox() {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.CreatureModel.GetInstanceId()).InstSubType === 4 && !ModelManager_1.ModelManager.GameModeModel.IsMulti;
  }
  static GetExitConfirmBoxConfigId() {
    let e = undefined;
    var n = ModelManager_1.ModelManager.InstanceDungeonModel.GetCurrentDungeonExitConfirmId();
    return e = n !== undefined && n > 0 ? n : this.NeedOpenReChallengeConfirmBox() ? 219 : BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip() ? 296 : 4;
  }
  static Syn() {
    let e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId;
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    }
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    return n?.InstSubType === 19 || n?.InstSubType === 20 || n?.InstSubType === 24 || n?.InstSubType === 21 || n?.InstSubType === 22 || n?.InstSubType === 25 || n?.InstSubType === 33 || n?.InstSubType === 42;
  }
  static async PrewarTeamFightRequest(e, n, o = 0, r = 0, t, l) {
    if (ControllerHolder_1.ControllerHolder.RoleController.IsInRoleTrial() && !InstanceDungeonController.CanTrialRoleEnterDungeon(o, e)) {
      ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceEnterContentText();
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleDungeonsLimit");
      return false;
    }
    if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam) {
      ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceEnterContentText();
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomFormationEnterInstanceTip");
      return false;
    }
    if (this.IsForbidDungeon(e)) {
      ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceEnterContentText();
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomFormationEnterInstanceTip");
      return false;
    }
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
    var a = [];
    for (const _ of n) {
      if (_ !== 0) {
        a.push(_);
      }
    }
    var i = Protocol_1.Aki.Protocol.Oos.create();
    i.d5n = e;
    i.C5n = a;
    i.L9n = o;
    i.g5n = r;
    i.f5n = t;
    i.Tzs = l ?? [];
    i.$ah = ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText;
    i.eUc = ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue;
    BlackScreenController_1.BlackScreenController.AddBlackScreen("None", "PreWarLeaveScene");
    InstanceDungeonController.jsl = true;
    var e = await Net_1.Net.CallAsync(16581, i).finally(() => {
      BlackScreenController_1.BlackScreenController.RemoveBlackScreen("None", "PreWarLeaveScene");
    });
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue = false;
    ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceEnterContentText();
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19928, undefined, true, InstanceDungeonController.Stc(e.Q4n));
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EnterInstanceDungeonFail, e.Q4n);
      return false;
    } else {
      ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList = n;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EnterInstanceDungeon);
      return true;
    }
  }
  static async SingleInstReChallengeRequest(e, n = undefined) {
    if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomFormationEnterInstanceTip");
      return false;
    }
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
    var o = Protocol_1.Aki.Protocol.ins.create();
    o.C5n = e;
    o.Tzs = ModelManager_1.ModelManager.TowerDefenseModel.GetProtocolPhantomIdList(e) ?? [];
    o.$ah = n;
    BlackScreenController_1.BlackScreenController.AddBlackScreen("None", "SingleInstReChallengeRequest");
    var n = await Net_1.Net.CallAsync(15463, o).finally(() => {
      BlackScreenController_1.BlackScreenController.RemoveBlackScreen("None", "SingleInstReChallengeRequest");
    });
    if (n.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(n.Q4n, 20892);
      return false;
    } else {
      ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EnterInstanceDungeon);
      return true;
    }
  }
  static TeleportDungeonRequest(e, n = true) {
    var o = Protocol_1.Aki.Protocol.oC_.create();
    o.w5n = this.TeleportDungeonActionIncIdHandle;
    o.ORs = this.TeleportDungeonActionHostIdHandle;
    o.C5n = e;
    o.ybs = n;
    o.eUc = this.TeleportDungeonContinueLastInst;
    Net_1.Net.Call(27007, o, e => {
      if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 19928);
      }
    });
    ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList = e;
    this.TeleportDungeonContinueLastInst = false;
    this.TeleportDungeonActionHostIdHandle = 0;
    this.TeleportDungeonActionIncIdHandle = 0;
  }
  static IsForbidDungeon(e) {
    if (!this.XJa) {
      if (!this.YJa) {
        return true;
      }
      if (!this.YJa.includes(e)) {
        return true;
      }
    }
    return false;
  }
  static UpdateForbidDungeon(e, n) {
    this.XJa = e;
    this.YJa = n;
  }
  static UpdateTrialRoleDungeonWhiteList(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InstanceDungeon", 48, "更新试用角色副本白名单", ["DungeonList", e]);
    }
    var n = ModelManager_1.ModelManager.InstanceDungeonModel.TrialRoleDungeonWhiteList;
    n.length = 0;
    for (const o of e) {
      n.push(o);
    }
  }
  static CanTrialRoleEnterDungeon(e, n) {
    if (e <= 0 || n <= 0) {
      return false;
    }
    if (!ModelManager_1.ModelManager.InstanceDungeonModel.TrialRoleDungeonWhiteList.includes(n)) {
      return false;
    }
    let o = true;
    var n = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (n > 0 && (n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(n))?.InstSubType === 12 && n?.WorldDungeonSubType > 0) {
      o = false;
    }
    var n = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e);
    return !o || !!n && n.FlowId === 2;
  }
  static Stc(e) {
    return e !== Protocol_1.Aki.Protocol.Q4n.Proto_TeamParkMemberErr;
  }
  static CheckAndShowDungeonArchiveExpireTips(e) {
    var n;
    if (!!ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonArchiveActivate(e) && !(e <= 0)) {
      if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonArchiveExpire(e) && !ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonArchiveExpireTipsShow(e)) {
        n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetDungeonArchiveExpireLocalTips(e);
        if (!StringUtils_1.StringUtils.IsEmpty(n)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(n);
        }
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetDungeonArchiveExpireTipsShow(e);
      }
    }
  }
}
exports.InstanceDungeonController = InstanceDungeonController;
(_a = InstanceDungeonController).XJa = true;
InstanceDungeonController.jsl = false;
InstanceDungeonController.YJa = [];
InstanceDungeonController.rhi = e => {
  if (!!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && e === InputMappingsDefine_1.actionMappings.功能菜单 && !LevelEventLockInputState_1.LevelEventLockInputState.InputLimitEsc && !ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()) {
    InstanceDungeonController.OnClickInstanceDungeonExitButton();
  }
};
InstanceDungeonController.ohi = () => {
  var e;
  if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
    if (!(e = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo())) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InstanceDungeon", 27, "加载结束但是副本行为树为空");
      }
    }
    e?.SetTrack(true);
  }
};
InstanceDungeonController.$5e = () => {
  if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
    ModelManager_1.ModelManager.InstanceDungeonModel.ConstructCurrentDungeonAreaName();
    if (ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonName()) {
      UiManager_1.UiManager.OpenView("InstanceDungeonAreaView");
    }
    ModelManager_1.ModelManager.InstanceDungeonModel.CurrentInstanceIsFinish = ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId);
  }
  if (_a.TeleportDungeonActionDungeonIdHandle) {
    ControllerHolder_1.ControllerHolder.EditBattleTeamController.PlayerOpenEditBattleTeamView(_a.TeleportDungeonActionDungeonIdHandle, false, false);
    _a.TeleportDungeonActionDungeonIdHandle = 0;
  }
};
InstanceDungeonController.shi = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("InstanceDungeon", 5, "副本信息通知", ["副本玩法Id:", e.s5n]);
  }
  ModelManager_1.ModelManager.InstanceDungeonModel.CreateInstanceInfo(e.s5n);
};
InstanceDungeonController.nhi = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("InstanceDungeon", 5, "副本结束通知", ["副本Id:", e.s5n]);
  }
  if (e.s5n !== ModelManager_1.ModelManager.CreatureModel.GetInstanceId()) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("InstanceDungeon", 63, "副本结束通知跳过更新,与当前副本id不一致", ["副本Id:", e.s5n], ["当前副本Id:", ModelManager_1.ModelManager.CreatureModel.GetInstanceId()]);
    }
  } else {
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceFinishSuccess = e.tMs ? 1 : 2;
    if (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceFinishSuccess === 1 && ControllerHolder_1.ControllerHolder.OnlineController.HandleTips !== "") {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("OnlineSomeOneLeaveInstance");
      ControllerHolder_1.ControllerHolder.OnlineController.HandleTips = "";
    }
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceRewardHaveTake = e.Ews;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnDungeonFinish);
  }
};
InstanceDungeonController.Hsl = () => {
  if (InstanceDungeonController.jsl) {
    BlackScreenController_1.BlackScreenController.RemoveBlackScreen("None", "PreWarLeaveScene");
    InstanceDungeonController.jsl = false;
  }
};
InstanceDungeonController.TeleportDungeonActionHostIdHandle = 0;
InstanceDungeonController.TeleportDungeonActionIncIdHandle = 0;
InstanceDungeonController.TeleportDungeonActionDungeonIdHandle = 0;
InstanceDungeonController.TeleportDungeonContinueLastInst = false;
InstanceDungeonController.Xoh = n => {
  var e;
  var o = n.M9n;
  _a.TeleportDungeonActionHostIdHandle = n.ORs;
  _a.TeleportDungeonActionIncIdHandle = n.w5n;
  if (ModelManager_1.ModelManager.SundryModel?.IsBlockTpDungeon()) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText("TeleportDungeon被GM屏蔽，跳过执行");
    _a.TeleportDungeonRequest([], false);
  } else if (ControllerHolder_1.ControllerHolder.InstanceDungeonController.IsForbidDungeon(o)) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomFormationEnterInstanceTip");
    _a.TeleportDungeonRequest([], false);
  } else if (!ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen() && (e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId, e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) && e.InstType) {
    _a.TeleportDungeonContinueLastInst = n.eUc;
    if (n.gS_) {
      (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(164)).FunctionMap.set(2, () => {
        var e = n.M9n;
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = e;
        _a.TeleportDungeonRequest(ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList);
      });
      e.FunctionMap.set(1, () => {
        _a.TeleportDungeonRequest([], false);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    } else if (n.CS_) {
      ModelManager_1.ModelManager.EditBattleTeamModel.IsFormTeleportAction = true;
      if (ModelManager_1.ModelManager.LoadingModel?.IsLoading) {
        _a.TeleportDungeonActionDungeonIdHandle = o;
      } else {
        ControllerHolder_1.ControllerHolder.EditBattleTeamController.PlayerOpenEditBattleTeamView(o, false, false);
      }
    } else if (n.f5n?.p5n === Protocol_1.Aki.Protocol.p5n.Proto_Seamless && n.f5n.R$s?.PG1.includes(Protocol_1.Aki.Protocol.xG1.Proto_Kite)) {
      (e = new SeamlessTravelDefine_1.SeamlessTravelContext()).ParseConfig(n.f5n.R$s);
      ControllerHolder_1.ControllerHolder.SeamlessTravelController.EnableSeamlessTravel(e, true);
      _a.TeleportDungeonRequest([]);
    } else {
      _a.TeleportDungeonRequest(ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList);
    }
  } else {
    _a.TeleportDungeonRequest([], false);
  }
};
InstanceDungeonController.pMl = e => {
  e = e.M9n;
  e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
  e = e && e.InstType === Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance ? "TrialRoleTransmitLimit" : "TrialRoleDungeonsLimit";
  ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(e);
};
InstanceDungeonController.IR1 = e => {
  ModelManager_1.ModelManager.InstanceDungeonModel?.ClearInstanceIdsWithSaveData();
  for (const o of e.BVn) {
    var n = MathUtils_1.MathUtils.LongToNumber(o);
    ModelManager_1.ModelManager.InstanceDungeonModel?.AddInstanceIdsWithSaveData(n);
  }
}; //# sourceMappingURL=InstanceDungeonController.js.map