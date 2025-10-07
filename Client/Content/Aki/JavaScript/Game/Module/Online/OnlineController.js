"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LoginDefine_1 = require("../Login/Data/LoginDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const OnlineHallData_1 = require("./OnlineHallData");
const OnlineModel_1 = require("./OnlineModel");
const LIST_REQUEST_CD = 5;
const NOTIFY_PLAYSTATION_CD = +TimeUtil_1.TimeUtil.InverseMillisecond;
const ONLINE_SING_LONG_TIME = TimeUtil_1.TimeUtil.InverseMillisecond * 300;
const ONLINE_SING_TIPS_TIME = TimeUtil_1.TimeUtil.InverseMillisecond * 1200;
const ONLINE_SING_TIPS_TIMER_INTERVAL = TimeUtil_1.TimeUtil.InverseMillisecond * 60;
class OnlineController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    OnlineController.UGi = CommonParamById_1.configCommonParamById.GetIntConfig("netstate_push_interval") * TimeUtil_1.TimeUtil.InverseMillisecond;
    OnlineController.AGi = CommonParamById_1.configCommonParamById.GetIntConfig("netstate_great");
    OnlineController.PGi = CommonParamById_1.configCommonParamById.GetIntConfig("netstate_good");
    OnlineController.xGi = CommonParamById_1.configCommonParamById.GetIntConfig("netstate_weak");
    this.bv1 = (0, puerts_1.toManualReleaseDelegate)(this.H5a);
    UE.KuroStaticPS5Library.AddJoinSessionDelegate(this.bv1);
    return true;
  }
  static OnClear() {
    if (OnlineController.bv1) {
      (0, puerts_1.releaseManualReleaseDelegate)(OnlineController.H5a);
      OnlineController.bv1 = undefined;
    }
    UE.KuroStaticPS5Library.ClearJoinSessionDelegate();
    return true;
  }
  static async O5l(e) {
    if ((await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestrictedAsync(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId())) === 1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MultiPlayerTeam", 27, "通信受限，拒绝申请");
      }
      this.O3a();
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MultiPlayerTeam", 27, "通信检查，可以申请");
      }
      e = this.GetPlayerIdByPlayerSessionId(e);
      if (!StringUtils_1.StringUtils.IsEmpty(e) && e !== "-1" && !!(e = Number(e)) && !(e <= 0)) {
        this.ApplyJoinWorldRequest(e, Protocol_1.Aki.Protocol.J8s.Proto_QueryJoin);
      }
    }
  }
  static async O3a() {
    await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(), 3, 6);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ScenePlayerLeaveScene, OnlineController.y4t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, OnlineController.$5e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, OnlineController.p5a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCloseLoadingView, OnlineController.jJa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFinishLoadingState, OnlineController.wGi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSetGameModeDataDone, OnlineController.WJa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ScenePlayerLeaveScene, OnlineController.y4t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, OnlineController.$5e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, OnlineController.p5a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseLoadingView, OnlineController.jJa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFinishLoadingState, OnlineController.wGi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSetGameModeDataDone, OnlineController.WJa);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(29663, OnlineController.ApplyJoinWorldNotify);
    Net_1.Net.Register(17175, OnlineController.AgreeJoinResultNotify);
    Net_1.Net.Register(17876, OnlineController.AllApplyJoinNotify);
    Net_1.Net.Register(28709, OnlineController.JoinWorldTeamNotify);
    Net_1.Net.Register(21450, OnlineController.PlayerLeaveWorldTeamNotify);
    Net_1.Net.Register(27406, OnlineController.PlayerEnterWorldTeamNotify);
    Net_1.Net.Register(29337, OnlineController.WorldTeamPlayerInfoChangeNotify);
    Net_1.Net.Register(24137, OnlineController.ReceiveRechallengeNotify);
    Net_1.Net.Register(15736, OnlineController.InviteRechallengeNotify);
    Net_1.Net.Register(22961, OnlineController.ReceiveRechallengePlayerIdsNotify);
    Net_1.Net.Register(17849, OnlineController.PlayerNetStateNotify);
    Net_1.Net.Register(17749, OnlineController.MatchChangePlayerUiStateNotify);
    Net_1.Net.Register(28686, OnlineController.PlayerTeleportStateNotify);
    Net_1.Net.Register(16063, OnlineController.ApplyerEnterSceneNotify);
    Net_1.Net.Register(16341, OnlineController.PlayerPsnSessionNotify);
    Net_1.Net.Register(23853, OnlineController.SyncPlayerLocationNotify);
    Net_1.Net.Register(17740, OnlineController.ClientVersionNoMatchNotify);
    Net_1.Net.Register(26033, OnlineController.PlayerGravityUpdateNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29663);
    Net_1.Net.UnRegister(17175);
    Net_1.Net.UnRegister(21450);
    Net_1.Net.UnRegister(28709);
    Net_1.Net.UnRegister(17876);
    Net_1.Net.UnRegister(27406);
    Net_1.Net.UnRegister(29337);
    Net_1.Net.UnRegister(24137);
    Net_1.Net.UnRegister(15736);
    Net_1.Net.UnRegister(22961);
    Net_1.Net.UnRegister(17849);
    Net_1.Net.UnRegister(17749);
    Net_1.Net.UnRegister(28686);
    Net_1.Net.UnRegister(16063);
    Net_1.Net.UnRegister(23853);
    Net_1.Net.UnRegister(17740);
    Net_1.Net.UnRegister(26033);
  }
  static CXa() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(), e => {
      if (e === 1 && (ControllerHolder_1.ControllerHolder.OnlineController.WorldEnterPermissionsRequest(Protocol_1.Aki.Protocol.Y8s.Proto_ForbidJoin), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("InstanceDungeon", 27, "通信受限，禁止加入联机");
      }
    });
  }
  static MLc() {
    if (this.ELc === Protocol_1.Aki.Protocol.az_.Proto_MatchTeam) {
      return 280;
    } else {
      return 279;
    }
  }
  static async RefreshWorldList() {
    var e;
    var n = TimeUtil_1.TimeUtil.GetServerTime();
    return n - OnlineController.F6t > LIST_REQUEST_CD && (ModelManager_1.ModelManager.OnlineModel.CleanFriendWorldList(), ModelManager_1.ModelManager.OnlineModel.CleanStrangerWorldList(), (e = []).push(OnlineController.LobbyListRequest(false)), e.push(OnlineController.LobbyListRequest(true)), await Promise.all(e), OnlineController.F6t = n, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshWorldList), true);
  }
  static OnTick(e) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone && ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      if (OnlineController.BGi > OnlineController.UGi) {
        OnlineController.BGi -= OnlineController.UGi;
        OnlineController.PlayerNetStatePush();
      }
      OnlineController.BGi += e;
    }
  }
  static async LobbyListRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Y0s();
    n.V7n = e;
    var n = await Net_1.Net.CallAsync(15833, n);
    return !!n && (n.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(n.Q4n, 25835), false) : (await OnlineController.NFa(n, e), true));
  }
  static async NFa(e, n) {
    var o;
    var l = await ModelManager_1.ModelManager.KuroSdkModel.GetSdkBlockUserMap();
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25835);
    } else {
      for (const r of e.O9n) {
        if (!l.get(r.ywa)) {
          o = new OnlineHallData_1.OnlineHallData(r);
          if (n) {
            ModelManager_1.ModelManager.OnlineModel.PushFriendWorldList(o);
          } else {
            ModelManager_1.ModelManager.OnlineModel.PushStrangerWorldList(o);
          }
        }
      }
    }
    ModelManager_1.ModelManager.OnlineModel.SortWorldList(n);
  }
  static WorldEnterPermissionsRequest(e) {
    var n = new Protocol_1.Aki.Protocol.N0s();
    n.h5n = e;
    Net_1.Net.Call(15035, n, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", ["协议id", "9671" + Protocol_1.Aki.Protocol.F0s.name]);
      }
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15597);
      } else {
        ModelManager_1.ModelManager.OnlineModel.SetPermissionsSetting(e.h5n);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshPermissionsSetting);
      }
    });
  }
  static ApplyJoinWorldRequest(e, n) {
    var o;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti || OnlineController.CheckPlatformCanopen()) {
      (o = new Protocol_1.Aki.Protocol.V0s()).W5n = e;
      o.H7n = n;
      Net_1.Net.Call(15344, o, e => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", ["协议id", "9669" + Protocol_1.Aki.Protocol.$0s.name]);
        }
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18527, e.lvs);
        }
      });
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MultiPlayerTeam", 5, "ApplyJoinWorldRequest未通过PS5平台会员检测");
    }
  }
  static bGi() {
    return !!UiManager_1.UiManager.IsViewOpen("CycleTowerView") || !!UiManager_1.UiManager.IsViewOpen("CycleTowerChallengeView") || !!UiManager_1.UiManager.IsViewOpen("CycleTowerTeamView") || !!UiManager_1.UiManager.IsViewOpen("SingleTimeTowerView") || !!UiManager_1.UiManager.IsViewOpen("SingleTimeTowerChallengeView") || !!UiManager_1.UiManager.IsViewOpen("SingleTimeTowerTeamView");
  }
  static async oPa(n) {
    if ((await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestrictedAsync(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId())) === 1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MultiPlayerTeam", 27, "通信受限，拒绝申请");
      }
    } else if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !OnlineController.bGi()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MultiPlayerTeam", 27, "好友申请进入联机", ["accountId", n.ywa?.toString()], ["onlineId", n.Qxa?.toString()]);
      }
      if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().NeedCheckPlayOnly()) {
        if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().PlayOnly() && n.Jxa === "") {
          return;
        }
      }
      if (n.Jxa) {
        [].push(n.Jxa);
      }
      if ((await ModelManager_1.ModelManager.KuroSdkModel.GetSdkBlockUserMap()).get(n.ywa)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("MultiPlayerTeam", 27, "SDK屏蔽好友列表", ["key", n.Jxa.toString()]);
        }
      } else {
        const o = new OnlineHallData_1.OnlineApplyData(n.JMs, n.W5n, n.cOs, n.dSs, n.F6n, n.Qxa);
        ModelManager_1.ModelManager.OnlineModel.PushCurrentApplyList(o);
        if (ModelManager_1.ModelManager.OnlineModel.GetCurrentApplySize() <= 1) {
          UiManager_1.UiManager.OpenView("OnlineApplyView");
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshApply);
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          var e = ModelManager_1.ModelManager.OnlineModel.GetCurrentApplyListById(o.PlayerId);
          if (e && e.RefuseTimestamp === n.cOs) {
            ModelManager_1.ModelManager.OnlineModel.DeleteCurrentApplyListById(o.PlayerId);
            OnlineController.AgreeJoinResultRequest(o.PlayerId, false);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshApply);
          }
        }, o.ApplyTimeLeftTime * TimeUtil_1.TimeUtil.InverseMillisecond);
      }
    }
  }
  static async OnAllApplyJoinNotify(e) {
    if ((await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestrictedAsync(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId())) === 1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MultiPlayerTeam", 27, "通信受限，拒绝申请");
      }
    } else {
      for (const o of e.dOs);
      var n = await ModelManager_1.ModelManager.KuroSdkModel.GetSdkBlockUserMap();
      for (const l of e.dOs) {
        if (n.get(l.ywa)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("MultiPlayerTeam", 27, "SDK屏蔽好友列表", ["key", l.Jxa.toString()]);
          }
          return;
        }
        if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().NeedCheckPlayOnly()) {
          if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().PlayOnly() && l.Jxa === "") {
            return;
          }
        }
        const r = new OnlineHallData_1.OnlineApplyData(l.JMs, l.W5n, l.cOs, l.dSs, l.F6n, l.Qxa);
        ModelManager_1.ModelManager.OnlineModel.PushCurrentApplyList(r);
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          if (ModelManager_1.ModelManager.OnlineModel.GetCurrentApplyListById(r.PlayerId)) {
            ModelManager_1.ModelManager.OnlineModel.DeleteCurrentApplyListById(r.PlayerId);
            OnlineController.AgreeJoinResultRequest(r.PlayerId, false);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshApply);
          }
        }, r.ApplyTimeLeftTime * TimeUtil_1.TimeUtil.InverseMillisecond);
      }
      if (ModelManager_1.ModelManager.OnlineModel.GetCurrentApplySize() <= 1) {
        UiManager_1.UiManager.OpenView("OnlineApplyView");
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshApply);
    }
  }
  static LobbyQueryPlayersRequest(n) {
    var e = new Protocol_1.Aki.Protocol.z0s();
    e.W5n = n;
    Net_1.Net.Call(21831, e, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", ["协议id", "9661" + Protocol_1.Aki.Protocol.Z0s.name]);
      }
      OnlineController.FFa(e, n);
    });
  }
  static async FFa(e, n) {
    var o;
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLobbyTryQuerySelf) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("CanNotSearchSelf");
      } else if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrHostOffline) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("OnlineInvalidUserId");
      } else if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerAccountDeactivation) {
        o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PlayerDeleteSelf");
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, undefined, undefined, [o]);
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29229);
      }
    } else if ((o = e.mOs) && o.W5n !== 0) {
      if ((await ModelManager_1.ModelManager.KuroSdkModel.GetSdkBlockUserMap()).get(o.ywa)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("MultiPlayerTeam", 27, "SDK屏蔽好友列表", ["key", o.Jxa.toString()]);
        }
      } else {
        ModelManager_1.ModelManager.OnlineModel.CleanSearchResultList();
        e = new OnlineHallData_1.OnlineHallData(o);
        ModelManager_1.ModelManager.OnlineModel.PushSearchResultList(e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSearchWorld, n);
      }
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("OnlineInvalidUserId");
    }
  }
  static AgreeJoinResultRequest(n, e) {
    var o;
    if (!e || ModelManager_1.ModelManager.GameModeModel.IsMulti || OnlineController.CheckPlatformCanopen()) {
      (o = new Protocol_1.Aki.Protocol.j0s()).W5n = n;
      o.j7n = e;
      Net_1.Net.Call(25891, o, e => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", ["协议id", "9666" + Protocol_1.Aki.Protocol.W0s.name]);
        }
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27844);
        } else {
          ModelManager_1.ModelManager.OnlineModel.DeleteCurrentApplyListById(n);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshApply);
        }
      });
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MultiPlayerTeam", 5, "AgreeJoinResultRequest未通过PS5平台会员检测");
    }
  }
  static MatchChangePlayerUiStateRequest(n) {
    var e = new Protocol_1.Aki.Protocol.ahs();
    e.w9n = n;
    Net_1.Net.Call(27984, e, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", ["协议id", "9666" + Protocol_1.Aki.Protocol.hhs.name]);
      }
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27844);
      } else {
        e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
        ModelManager_1.ModelManager.InstanceDungeonModel.SetPlayerUiState(e, n);
      }
    });
  }
  static async wSl(n) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MultiPlayerTeam", 5, "通知接收", ["通知id", "9620 " + Protocol_1.Aki.Protocol.tgs.name]);
    }
    var e;
    var o = ModelManager_1.ModelManager.OnlineModel;
    o.ClearWorldTeamPlayerFightInfo();
    o.ClearOtherScenePlayerDataList();
    var l = n.TRs.length;
    for (let e = 0; e < l; e++) {
      var r = n.TRs[e];
      var t = new OnlineHallData_1.OnlineTeamData(r.JMs, r.W5n, r.F6n, r.dSs, r.zVn, e + 1, r.mOs, r.gOs, r.tnc, r.inc, r.v7n, r.B7_);
      ModelManager_1.ModelManager.OnlineModel.PushCurrentTeamList(t);
      var a = new Array();
      for (const s of r.COs.dUs) {
        var i = new OnlineHallData_1.WorldTeamRoleInfo(s.Q6n, s.eI_, s.Ebs);
        a.push(i);
      }
      t = new OnlineHallData_1.WorldTeamPlayerFightInfo(ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(r.W5n).Name, r.W5n, r.COs.FVn, r.mOs.Qxa, r.mOs.ywa, a);
      o.PushWorldTeamPlayerFightInfo(t);
    }
    ModelManager_1.ModelManager.OnlineModel.SetTeamOwnerId(n.nIs);
    if (ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) {
      UiManager_1.UiManager.ResetToBattleView();
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshOnlineTeamList);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterOnlineWorld);
    if (ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() && (e = this.CreatePlayerSession(), Log_1.Log.CheckInfo() && Log_1.Log.Info("MultiPlayerTeam", 5, "JoinWorldTeamNotify PS5" + e), e !== "-1")) {
      this.PlayerCreatePsnSessionRequest(e);
    }
    var _ = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser();
    for (const g of ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer()) {
      var M = ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(g);
      if (M && _ && _.get(M.ThirdPartyAccountId)) {
        M.Name = "";
      }
    }
    this.OMd();
  }
  static async BSl(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MultiPlayerTeam", 5, "通知接收", ["通知id", "9621 " + Protocol_1.Aki.Protocol.rgs.name]);
    }
    var e = e.jRs;
    var n = new OnlineHallData_1.OnlineTeamData(e.JMs, e.W5n, e.F6n, e.dSs, e.zVn, ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() + 1, e.mOs, e.gOs, e.tnc, e.inc, e.v7n, e.B7_);
    var o = new Array();
    for (const t of e.COs.dUs) {
      var l = new OnlineHallData_1.WorldTeamRoleInfo(t.Q6n, t.eI_, t.Ebs);
      o.push(l);
    }
    var r = new OnlineHallData_1.WorldTeamPlayerFightInfo(e.JMs, e.W5n, e.COs.FVn, e.mOs.Qxa, e.mOs.ywa, o);
    ModelManager_1.ModelManager.OnlineModel.PushCurrentTeamList(n);
    ModelManager_1.ModelManager.OnlineModel.PushWorldTeamPlayerFightInfo(r);
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("IsEnteringWorld", n.Name);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshOnlineTeamList);
    var n = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser();
    if (n && n.get(e.mOs.ywa)) {
      r.Name = "";
    }
  }
  static CheckPlayerNetHealthy(e) {
    var n;
    if (ModelManager_1.ModelManager.PlayerInfoModel.GetId() === e) {
      n = this.GetNetPingState(Net_1.Net.RttMs);
      return this.IsNetStateGood(n);
    } else {
      return !!(n = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e)) && this.IsNetStateGood(n.PingState);
    }
  }
  static IsNetStateGood(e) {
    return e === Protocol_1.Aki.Protocol.r7s.Proto_GREAT || e === Protocol_1.Aki.Protocol.r7s.Proto_GOOD;
  }
  static ApplyRechallengeRequest(e) {
    ModelManager_1.ModelManager.OnlineModel.RefreshInitiateTime();
    var n = new Protocol_1.Aki.Protocol.F1s();
    n.x9n = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer);
    Net_1.Net.Call(22250, n, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", ["协议id", "9624" + Protocol_1.Aki.Protocol.V1s.name], ["response", e]);
      }
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20741);
      }
      if (ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("HaveInvite");
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("HaveSuggest");
      }
    });
  }
  static ReceiveRechallengeRequest(e, n) {
    var o = new Protocol_1.Aki.Protocol.H1s();
    o.j7n = e ? Protocol_1.Aki.Protocol.KR_.jc_ : n ? Protocol_1.Aki.Protocol.KR_.Proto_ActiveRefuse : Protocol_1.Aki.Protocol.KR_.Proto_TimeOutRefuse;
    Net_1.Net.Call(21008, o, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", ["协议id", "9624" + Protocol_1.Aki.Protocol.j1s.name]);
      }
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23759);
      }
    });
  }
  static InviteRechallengeRequest() {
    ModelManager_1.ModelManager.OnlineModel.RefreshInitiateTime();
    var e = new Protocol_1.Aki.Protocol.W1s();
    Net_1.Net.Call(18412, e, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", ["协议id", "9624" + Protocol_1.Aki.Protocol.W1s.name]);
      }
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24818);
      } else {
        UiManager_1.UiManager.OpenView("OnlineChallengeStateView");
        if (UiManager_1.UiManager.IsViewOpen("OnlineChallengeApplyView")) {
          UiManager_1.UiManager.CloseView("OnlineChallengeApplyView");
        }
      }
    });
  }
  static LeaveWorldTeamRequest(e, n) {
    var o = new Protocol_1.Aki.Protocol.ogs();
    o.W5n = e;
    o.x9n = n;
    Net_1.Net.Call(15590, o, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", ["协议id", "9624" + Protocol_1.Aki.Protocol.ngs.name]);
      }
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21576);
      } else {
        ModelManager_1.ModelManager.OnlineModel.ClearOnlineTeamMap();
      }
    });
  }
  static KickWorldTeamRequest(e) {
    var n = new Protocol_1.Aki.Protocol.sgs();
    n.W5n = e;
    Net_1.Net.Call(22614, n, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", ["协议id", "9626" + Protocol_1.Aki.Protocol.ags.name]);
      }
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17701);
      }
    });
  }
  static PlayerCreatePsnSessionRequest(e) {
    var n = new Protocol_1.Aki.Protocol._f_();
    n.f5a = e;
    Net_1.Net.Call(28822, n, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", ["协议id", "9626" + Protocol_1.Aki.Protocol.cf_.name]);
      }
    });
  }
  static PlayerNetStatePush() {
    var e = new Protocol_1.Aki.Protocol.ugs();
    var n = Net_1.Net.RttMs;
    e.W7n = n;
    Net_1.Net.Send(20073, e);
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var n = this.GetNetPingState(n);
    var o = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e);
    if (o && o.PingState !== n) {
      o.PingState = n;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshPlayerPing, e, n);
    }
  }
  static GetNetPingState(e) {
    if (e < 0) {
      return Protocol_1.Aki.Protocol.r7s.Proto_UNKNOWN;
    } else if (e <= OnlineController.AGi) {
      return Protocol_1.Aki.Protocol.r7s.Proto_GREAT;
    } else if (e <= OnlineController.PGi) {
      return Protocol_1.Aki.Protocol.r7s.Proto_GOOD;
    } else if (e <= OnlineController.xGi) {
      return Protocol_1.Aki.Protocol.r7s.Proto_POOR;
    } else {
      return Protocol_1.Aki.Protocol.r7s.Proto_UNKNOWN;
    }
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("OnlineWorldHallView", OnlineController.iVe, "OnlineController.CanOpenView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("OnlineWorldHallView", OnlineController.iVe);
  }
  static CheckPlatformCanopen() {
    var e = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.CheckUserPremium();
    if (e === -1) {
      this.CheckoutCommerceDialogPremiumMode();
    }
    return e >= 0;
  }
  static ShowTipsWhenOnlineDisabled(e = []) {
    if (!ModelManager_1.ModelManager.OnlineModel.IsOnlineDisabled()) {
      return true;
    }
    var n = ModelManager_1.ModelManager.OnlineModel.GetOnlineDisabledSource();
    if (!n) {
      return true;
    }
    var o;
    var l;
    var r;
    var t;
    var a = new Map();
    for ([o, l] of n) {
      if (!e.includes(l)) {
        a.set(o, l);
      }
    }
    if (a.size === 0) {
      return true;
    }
    for ([r, t] of n) {
      switch (t) {
        case 0:
          var i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(r.TreeId).Name;
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(OnlineModel_1.onlineDisabledSourceTipsId[t], i);
          break;
        case 1:
          i = ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(r.TreeId).Name;
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(OnlineModel_1.onlineDisabledSourceTipsId[t], i);
          break;
        default:
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(OnlineModel_1.onlineDisabledSourceTipsId[t]);
      }
    }
    return false;
  }
  static qGi() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(136);
    e.SetCloseFunction(() => {
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(5);
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(e);
  }
  static CreatePlayerSession() {
    var e = ModelManager_1.ModelManager.OnlineModel.GetGameJoinTypeToPlayStationJoinType();
    var n = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    return PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.CreatePlayerSession(e, n ?? 0);
  }
  static LeavePlayerSession() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.LeavePlayerSession();
    if (this.v5a) {
      this.v5a.Remove();
      this.v5a = undefined;
    }
  }
  static JoinPlayerSession(e) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.JoinPlayerSession(e);
  }
  static CheckJoinSession() {
    var e = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.CheckJoinSession();
    ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId = e;
  }
  static NotifyPlayStationPremium() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NotifyPlayStationPremium(ModelManager_1.ModelManager.KuroSdkModel.PlayStationPlayOnlyState);
  }
  static GetPlayerIdByPlayerSessionId(e) {
    return PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetPlayerIdByPlayerSessionId(e);
  }
  static CheckoutCommerceDialogPremiumMode() {
    this.uFa = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      switch (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().PollCheckoutDialogResult()) {
        case 2:
          TimerSystem_1.GameplayTimerSystem.Remove(this.uFa);
          this.uFa = undefined;
          break;
        case 1:
          break;
        default:
          TimerSystem_1.GameplayTimerSystem.Remove(this.uFa);
          this.uFa = undefined;
      }
    }, 500);
  }
  static OMd() {
    if (!this.qMd) {
      if (ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() !== 1) {
        this.GMd();
      } else {
        this.FMd ||= TimerSystem_1.GameplayTimerSystem.Delay(() => {
          var e;
          var n;
          if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
            this.jKd();
          } else if (ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() !== 1) {
            this.GMd();
          } else {
            (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(371)).FunctionMap.set(0, n = () => {
              this.jKd();
            });
            e.FunctionMap.set(1, () => {
              var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0;
              this.LeaveWorldTeamRequest(e);
            });
            e.FunctionMap.set(2, n);
            e.IsEscViewTriggerCallBack = false;
            if (UiManager_1.UiManager.IsViewShow("BattleView")) {
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
            } else {
              this.jKd();
            }
            this.GMd();
            this.qMd = true;
          }
        }, ONLINE_SING_LONG_TIME);
      }
    }
  }
  static jKd() {
    this.HMd();
    this.NMd = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.VMd();
    }, ONLINE_SING_TIPS_TIMER_INTERVAL);
  }
  static VMd() {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      if (ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() !== 1) {
        this._Kd = 0;
      } else {
        this._Kd += ONLINE_SING_TIPS_TIMER_INTERVAL;
        if (!(this._Kd < ONLINE_SING_TIPS_TIME)) {
          if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
            this.jMd = true;
          } else {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("OnlineSingleTips");
            this._Kd = 0;
          }
        }
      }
    } else {
      this.HMd();
    }
  }
  static HMd() {
    if (this.NMd) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.NMd);
    }
    this.NMd = undefined;
  }
  static GMd() {
    if (this.FMd) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.FMd);
    }
    this.FMd = undefined;
  }
}
exports.OnlineController = OnlineController;
(_a = OnlineController).F6t = 0;
OnlineController.BGi = 0;
OnlineController.v5a = undefined;
OnlineController.ELc = undefined;
OnlineController.bv1 = undefined;
OnlineController.H5a = (e, n) => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Login", 5, "PS5 PlaySession 点击加入事件触发 ", ["userId:", e], ["playerSession", n]);
  }
  UE.KuroStaticPS5Library.ClearJoinSessionHandle();
  if (UiManager_1.UiManager.IsViewShow("LoginView") || ModelManager_1.ModelManager.LoadingModel.IsLoadingView || ModelManager_1.ModelManager.LoginModel.IsLoginStatus(LoginDefine_1.ELoginStatus.Init)) {
    ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId = n;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlayStationJoinSessionEvent);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 5, "PS5 PlaySession 点击加入事件触发 登录或加载界面");
    }
  } else if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 5, "PS5 PlaySession 点击加入事件触发 副本中");
    }
  } else {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 5, "PS5 PlaySession 点击加入事件触发 大世界申请联机");
    }
    _a.O5l(n);
  }
};
OnlineController.$5e = () => {
  ModelManager_1.ModelManager.OnlineModel.SetPermissionsSetting(ModelManager_1.ModelManager.FunctionModel.GetWorldPermission());
  _a.CXa();
  ModelManager_1.ModelManager.OnlineModel.ClearOtherScenePlayerDataList();
};
OnlineController.p5a = () => {
  var e = ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId;
  if (e !== "-1") {
    _a.O5l(e).finally(() => {
      ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId = "-1";
    });
  }
  if (_a.ELc !== undefined) {
    e = _a.MLc();
    e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    _a.ELc = undefined;
  }
  if (_a.jMd) {
    _a.VMd();
    _a.jMd = false;
  }
  _a.OMd();
};
OnlineController.jJa = () => {
  if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn && ModelManager_1.ModelManager.GameModeModel.IsMulti) {
    if (_a.v5a) {
      _a.v5a.Remove();
      _a.v5a = undefined;
    }
    _a.v5a = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      _a.NotifyPlayStationPremium();
    }, NOTIFY_PLAYSTATION_CD);
  }
};
OnlineController.HandleTips = "";
OnlineController.y4t = e => {
  if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
    ModelManager_1.ModelManager.OnlineModel.SetContinuingChallengeConfirmState(e, 1);
    ModelManager_1.ModelManager.OnlineModel.SetAllowInitiate(false);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlayerChallengeStateChange, e, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer);
    if (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceFinishSuccess !== 1) {
      _a.HandleTips = "OnlineSomeOneLeaveInstance";
    } else {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("OnlineSomeOneLeaveInstance");
    }
  }
};
OnlineController.wGi = () => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("MultiPlayerTeam", 5, "OnCloseLoading" + OnlineController.NGi);
  }
  if (OnlineController.NGi) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(OnlineController.NGi[0], OnlineController.NGi[1]);
    OnlineController.NGi = undefined;
  }
};
OnlineController.IsFirstSetMode = true;
OnlineController.WJa = () => {
  if (_a.IsFirstSetMode && (_a.IsFirstSetMode = false, ModelManager_1.ModelManager.GameModeModel.IsMulti) && !OnlineController.CheckPlatformCanopen() && Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("MultiPlayerTeam", 5, "ApplyJoinWorldRequest未通过PS5平台会员检测");
  }
};
OnlineController.rAt = () => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("MultiPlayerTeam", 5, "PS5 自动登录流程 - 监听到输入，取消后续流程");
  }
  ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId = "-1";
  EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputAnyKey, OnlineController.rAt);
};
OnlineController.ApplyJoinWorldNotify = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", ["协议id", "9667" + Protocol_1.Aki.Protocol.H0s.name]);
  }
  _a.oPa(e);
};
OnlineController.AgreeJoinResultNotify = e => {
  if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ApplyRefused", e.JMs);
  } else {
    OnlineController.NGi = ["EnteringOtherWorld", [e.JMs]];
  }
};
OnlineController.AllApplyJoinNotify = e => {
  OnlineController.OnAllApplyJoinNotify(e);
};
OnlineController.JoinWorldTeamNotify = e => {
  _a.wSl(e);
};
OnlineController.PlayerLeaveWorldTeamNotify = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("MultiPlayerTeam", 69, "igs", ["", e]);
  }
  var n = e.W5n;
  var o = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(n);
  if (o.IsSelf) {
    if (!ModelManager_1.ModelManager.GameModeModel.WorldDone) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Formation", 5, "离开队伍时世界未加载完成");
      }
      _a.qGi();
      return;
    }
    if (UiManager_1.UiManager.IsViewOpen("OnlineWorldHallView")) {
      UiManager_1.UiManager.CloseView("OnlineWorldHallView");
    }
    if (n !== ModelManager_1.ModelManager.OnlineModel.OwnerId) {
      if (e.x9n === Protocol_1.Aki.Protocol.t7s.Proto_Dissolve) {
        OnlineController.NGi = ["LeaderExitOnlineTeam", [o.Name]];
      } else {
        OnlineController.NGi = ["OnlineSimulationPassiveExit", []];
      }
    }
    ModelManager_1.ModelManager.OnlineModel.SetTeamOwnerId(-1);
    ModelManager_1.ModelManager.OnlineModel.ClearOnlineTeamMap();
    ModelManager_1.ModelManager.OnlineModel.ClearPlayerTeleportState();
    ModelManager_1.ModelManager.OnlineModel.ClearWorldTeamPlayerFightInfo();
    ModelManager_1.ModelManager.OnlineModel.ClearOtherScenePlayerDataList();
    _a.qMd = false;
    _a.HMd();
    _a.GMd();
    _a.LeavePlayerSession();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveOnlineWorld);
  } else {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ExitOnlineTeam", o.Name);
    ModelManager_1.ModelManager.OnlineModel.ResetTeamDataPlayer(o.PlayerNumber);
    ModelManager_1.ModelManager.OnlineModel.DeleteCurrentTeamListById(n);
    ModelManager_1.ModelManager.OnlineModel.DeleteWorldTeamPlayerFightInfo(n);
    ModelManager_1.ModelManager.OnlineModel.DeleteOtherScenePlayerDataList(n);
    ModelManager_1.ModelManager.OnlineModel.DeletePlayerTeleportState(n);
  }
  _a.OMd();
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshOnlineTeamList);
};
OnlineController.PlayerEnterWorldTeamNotify = e => {
  _a.BSl(e);
};
OnlineController.WorldTeamPlayerInfoChangeNotify = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("MultiPlayerTeam", 5, "通知接收", ["通知id", "9619 " + Protocol_1.Aki.Protocol.egs.name]);
  }
  var n = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e.W5n);
  if (n) {
    switch (e.JDs) {
      case Protocol_1.Aki.Protocol.i7s.Proto_Head:
        n.HeadId = e.V8n;
        break;
      case Protocol_1.Aki.Protocol.i7s.F6n:
        n.Level = e.V8n;
        break;
      case Protocol_1.Aki.Protocol.i7s.H8n:
        n.Name = e.j8n;
        break;
      case Protocol_1.Aki.Protocol.i7s.zVn:
        n.Signature = e.j8n;
        break;
      case Protocol_1.Aki.Protocol.i7s.Proto_PlayerTitle:
        n.SetPlayerTitleInfo(e.j8n);
        break;
      case Protocol_1.Aki.Protocol.i7s.v7n:
        n.Sex = e.V8n;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshOnlineTeamList);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnWorldTeamPlayerInfoChanged, e);
  }
};
OnlineController.ReceiveRechallengeNotify = e => {
  var n = e.W5n;
  if (e.j7n !== Protocol_1.Aki.Protocol.KR_.jc_) {
    if (UiManager_1.UiManager.IsViewOpen("OnlineChallengeStateView")) {
      UiManager_1.UiManager.CloseView("OnlineChallengeStateView");
    }
    if (n !== ModelManager_1.ModelManager.PlayerInfoModel?.GetId()) {
      e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(n).Name;
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("RefuseInviteMatch", e);
    }
  } else {
    ModelManager_1.ModelManager.OnlineModel.SetContinuingChallengeConfirmState(n, 0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer);
    e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    if (n === ModelManager_1.ModelManager.OnlineModel.OwnerId && ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(e) === 0) {
      UiManager_1.UiManager.OpenView("OnlineChallengeStateView");
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlayerChallengeStateChange, n, 0);
  }
};
OnlineController.InviteRechallengeNotify = e => {
  var n = ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(ModelManager_1.ModelManager.PlayerInfoModel.GetId());
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer);
  if ((n !== 0 || !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) && !(ModelManager_1.ModelManager.OnlineModel.SetChallengeApplyPlayerId(e.M2s), UiManager_1.UiManager.IsViewOpen("OnlineChallengeStateView"))) {
    if (UiManager_1.UiManager.IsViewOpen("OnlineChallengeApplyView")) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSuggestChallengePlayerInfo);
    } else {
      UiManager_1.UiManager.OpenView("OnlineChallengeApplyView");
    }
  }
};
OnlineController.ReceiveRechallengePlayerIdsNotify = e => {
  ModelManager_1.ModelManager.OnlineModel.ResetContinuingChallengeConfirmState();
  for (const n of e.S2s) {
    ModelManager_1.ModelManager.OnlineModel.SetContinuingChallengeConfirmState(n, 0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer);
  }
};
OnlineController.PlayerNetStateNotify = e => {
  var n = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e.W5n);
  if (n) {
    n.PingState = e.gOs;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshPlayerPing, e.W5n, n.PingState);
  }
};
OnlineController.MatchChangePlayerUiStateNotify = e => {
  ModelManager_1.ModelManager.InstanceDungeonModel.SetPlayerUiState(e.W5n, e.w9n);
};
OnlineController.PlayerTeleportStateNotify = e => {
  var n;
  var o;
  var l = e.W5n;
  ModelManager_1.ModelManager.OnlineModel.SetPlayerTeleportState(l, e.fOs);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshPlayerUiState, l);
  if (l !== ModelManager_1.ModelManager.PlayerInfoModel.GetId() && (n = e.fOs === Protocol_1.Aki.Protocol.o7s.Proto_Default, ModelManager_1.ModelManager.OnlineModel.SetRoleActivated(l, n), n)) {
    if (e.vOs) {
      if ((n = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(e.vOs.F4n))) && n.Entity) {
        if (n.IsInit) {
          o = n.Entity.GetComponent(3);
          e = Vector_1.Vector.Create(e.vOs.P5n.X, e.vOs.P5n.Y, e.vOs.P5n.Z);
          if (!o.FixBornLocation("队友传送完成", true, e, true)) {
            o.TeleportTo(e.ToUeVector(), o.ActorRotationProxy.ToUeRotator(), "队友传送完成(地面修正失败)");
          }
        }
        n.Entity.GetComponent(68)?.ClearReplaySamples();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MultiPlayerTeam", 14, "队友传送完成通知缺失位置信息", ["playerId", l]);
    }
  }
};
OnlineController.ApplyerEnterSceneNotify = e => {
  e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(e.Q4n);
  ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, undefined, undefined, [e]);
};
OnlineController.PlayerPsnSessionNotify = e => {
  if (ModelManager_1.ModelManager.GameModeModel.IsMulti && !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) {
    _a.JoinPlayerSession(e.f5a);
  }
};
OnlineController.SyncPlayerLocationNotify = e => {
  for (const o of e.iT_) {
    let e = ModelManager_1.ModelManager.OnlineModel.GetOtherScenePlayerDataByPlayerId(o.W5n);
    if (!e) {
      e = new OnlineHallData_1.OtherScenePlayerData(o.W5n, o.w7n, o.P5n);
      ModelManager_1.ModelManager.OnlineModel.PushOtherScenePlayerDataList(e);
    }
    var n = Vector_1.Vector.Create(o.P5n);
    e.SetLocation(n);
    e.MapId = o.w7n;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ScenePlayerLocationChanged, o.W5n, n);
  }
};
OnlineController.ClientVersionNoMatchNotify = e => {
  if (_a.ELc !== Protocol_1.Aki.Protocol.az_.Proto_WorldTeam) {
    _a.ELc = e.az_;
  }
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("MultiPlayerTeam", 69, "客户端版本不匹配", ["sz_", e]);
  }
};
OnlineController.PlayerGravityUpdateNotify = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("MultiPlayerTeam", 5, "PlayerGravityUpdateNotify", ["message.Proto_CurGravityDirection", e.wI_]);
  }
  ModelManager_1.ModelManager.OnlineModel.SetPlayerGravityIsNormal(e.wI_);
};
OnlineController.iVe = e => ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomFormationEnterOnlineTip"), false) : (!!ModelManager_1.ModelManager.GameModeModel.IsMulti || !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10021)) && !(!ModelManager_1.ModelManager.GameModeModel.IsMulti && ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("OnlineDisabledByInstance"), 1) : !OnlineController.ShowTipsWhenOnlineDisabled());
OnlineController.uFa = undefined;
OnlineController.FMd = undefined;
OnlineController.NMd = undefined;
OnlineController.jMd = false;
OnlineController.qMd = false;
OnlineController._Kd = 0; //# sourceMappingURL=OnlineController.js.map