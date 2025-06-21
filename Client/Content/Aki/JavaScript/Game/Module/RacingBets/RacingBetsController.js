"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsController = void 0;
const UE = require("ue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../Activity/ActivityControllerBase"),
  ConfirmBoxController_1 = require("../ConfirmBox/ConfirmBoxController"),
  InstanceDungeonEntranceController_1 = require("../InstanceDungeon/InstanceDungeonEntranceController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  RacingBetsSeasonData_1 = require("./Data/RacingBetsSeasonData"),
  RacingBetsActivityView_1 = require("./View/RacingBetsActivityView");
class RacingBetsController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_RaceHorseGuide"
  }
  OnCreateSubPageComponent(e) {
    return new RacingBetsActivityView_1.RacingBetsActivityView
  }
  OnCreateActivityData(e) {
    var t = new RacingBetsSeasonData_1.RacingBetsSeasonData;
    return ModelManager_1.ModelManager.RacingBetsModel.SetRacingBetsSeasonData(t), t
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1
  }
  OnInit() {
    return !(RacingBetsController.ae1 = !1)
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsDataRefresh, RacingBetsController.he1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, RacingBetsController.p5a), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, RacingBetsController.le1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeon, RacingBetsController.wa1)
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsDataRefresh, RacingBetsController.he1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, RacingBetsController.p5a), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, RacingBetsController.le1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeon, RacingBetsController.wa1)
  }
  OnClear() {
    return RacingBetsController.ae1 = !1, RacingBetsController.lM1 && (TimerSystem_1.RealTimeTimerSystem.Remove(RacingBetsController.lM1), RacingBetsController.lM1 = void 0), RacingBetsController.PH1 && (TimerSystem_1.RealTimeTimerSystem.Remove(RacingBetsController.PH1), RacingBetsController.PH1 = void 0), !0
  }
  OnActivityFirstUnlock(e) {
    UiManager_1.UiManager.OpenView("RacingBetsDangoActivityOpenTips")
  }
  static TryRegisterNextDangoOddsUpdateRequest(e) {
    var e = e.GetCurLegMatchData();
    !e || (e = e.NextOddsRateRefreshTime - TimeUtil_1.TimeUtil.GetServerTimeStamp()) < 0 || (this.lM1 && (TimerSystem_1.RealTimeTimerSystem.Remove(this.lM1), this.lM1 = void 0), this.lM1 = TimerSystem_1.RealTimeTimerSystem.Delay(this.RacingBetsUpdateOddsRequest, e, void 0, void 0, !1))
  }
  static TryRegisterLegMatchStateChange(e) {
    !e || !(e = e.GetCurLegMatchData()) || (e = TimeUtil_1.TimeUtil.SetTimeMillisecond(e.GetLegRemindTime())) <= 0 || (this.PH1 && (TimerSystem_1.RealTimeTimerSystem.Remove(this.PH1), this.PH1 = void 0), this.PH1 = TimerSystem_1.RealTimeTimerSystem.Delay(this.xH1, e, void 0, void 0, !1))
  }
  static TryStartRacingBetsGaming(e) {
    var t, n;
    ConfirmBoxController_1.ConfirmBoxController.CheckIsConfirmBoxOpen() || (t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData(), (e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsLegMatchData(e)) && t && (n = e.GetLegMatchState(), ModelManager_1.ModelManager.RacingBetsModel.GetIsFromActivityOpenDungeon()) && 3 === n && (RacingBetsController.RacingBetMatchActionRequest(t.Id, e.Id), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsWatchGameRecord, e.Id)))
  }
  static TryOpenRacingBetsLegMatchResultView() {
    var e = ModelManager_1.ModelManager.RacingBetsModel.GetLegMatchResultData();
    return !!e && (1 === e.L8c ? UiManager_1.UiManager.OpenView("RacingBetsSuccessTip", e) : UiManager_1.UiManager.OpenView("RacingBetsFailTip", e), ModelManager_1.ModelManager.RacingBetsModel.SetLegMatchResultData(void 0), !0)
  }
  static TryLeaveRacingBetsDungeon() {
    ModelManager_1.ModelManager.RacingBetsModel.CheckInRacingBetsDungeon() && (ModelManager_1.ModelManager.RacingBetsModel.IsDungeonPlaying ? (ModelManager_1.ModelManager.RacingBetsModel.LeaveDungeonOnEnd = !0, ModelManager_1.ModelManager.RacingBetsModel.RacingBetsAbortDungeon()) : InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest())
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(23110, RacingBetsController.STc), Net_1.Net.Register(22492, RacingBetsController.MTc), Net_1.Net.Register(25891, RacingBetsController.ce1), Net_1.Net.Register(21348, RacingBetsController.qP1)
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(23110), Net_1.Net.UnRegister(22492), Net_1.Net.UnRegister(25891), Net_1.Net.UnRegister(21348)
  }
  static RacingBetsGearRequest(t, e, n, r, o) {
    var a = Protocol_1.Aki.Protocol.Az_.create();
    a.w6n = t, a.mJ_ = e.Id, a.Kz_ = n, a.gJ_ = r, a._J_ = o, a.zZ_ = e.OddsVersion, Net_1.Net.Call(17128, a, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16128) : (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Dango_BetPage_BetSuccess"), ModelManager_1.ModelManager.RacingBetsModel.OnPlayerInfoUpdate(e.jRs), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsBettingInfoUpdate, n, !0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t)))
    })
  }
  static RacingBetsGearRefundRequest(t, e, n) {
    var r = Protocol_1.Aki.Protocol.ZRc.create();
    r.w6n = t, r.mJ_ = e.Id, r.Kz_ = n, Net_1.Net.Call(22582, r, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16128) : (ModelManager_1.ModelManager.RacingBetsModel.OnPlayerInfoUpdate(e.jRs), ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Dango_BetPage_CancelSuccess"), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsBettingInfoUpdate, n, !1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t)))
    })
  }
  static RacingBetsRankRequest(e, t) {
    var n = Protocol_1.Aki.Protocol.wz_.create();
    n.w6n = e, Net_1.Net.Call(25808, n, e => {
      e && (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_RacingBetsBulletNotFundOpenRankCurTime ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Dango_RankPage_EmptyInfo") : e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25942) : (ModelManager_1.ModelManager.RacingBetsModel.RacingBetsRankRefresh(e), t?.()))
    })
  }
  static RacingBetsTaskRewardRequest(e) {
    var t = Protocol_1.Aki.Protocol.Bz_.create();
    t.gps = e, Net_1.Net.Call(22041, t, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28978), e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData().Id, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e))
    })
  }
  static RacingBetMatchActionRequest(t, n) {
    var e = Protocol_1.Aki.Protocol.qs1.create();
    e.w6n = t, e.mJ_ = n, Net_1.Net.Call(19801, e, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27507) : (ModelManager_1.ModelManager.RacingBetsModel.RacingBetsMatchStart(n, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t)))
    })
  }
  static async RacingBetsMatchRoundActionRequestAsync(e, t, n) {
    var r = Protocol_1.Aki.Protocol.Fs1.create(),
      e = (r.w6n = e, r.mJ_ = t, r.pBc = n, await Net_1.Net.CallAsync(15501, r));
    return !!e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17633), !1) : (ModelManager_1.ModelManager.RacingBetsModel.RacingBetsMatchRoundRefresh(t, e.BJ_, !0), !0))
  }
  static RacingBetsMatchInfoRequest(e, t) {
    var n = Protocol_1.Aki.Protocol.zh1.create();
    n.w6n = e, n.mJ_ = t, Net_1.Net.Call(23641, n, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18370) : ModelManager_1.ModelManager.RacingBetsModel.RacingBetsMatchPreview(t, e))
    })
  }
  static RacingBetsBulletScreenRequest(t) {
    var e = Protocol_1.Aki.Protocol.Vz_.create(),
      n = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    e.w6n = n.Id, e.mJ_ = ModelManager_1.ModelManager.RacingBetsModel.DungeonMatchId, e.kJ_ = t, e.mTs = ModelManager_1.ModelManager.RacingBetsModel.GetCommandActionIndex(), Net_1.Net.Call(28921, e, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18979) : EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsPushBulletScreen, [t], !0))
    })
  }
}
exports.RacingBetsController = RacingBetsController, (_a = RacingBetsController).ae1 = !1, RacingBetsController.lM1 = void 0, RacingBetsController.PH1 = void 0, RacingBetsController.p5a = () => {
  var e, t;
  ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) && 31 === e.InstSubType && (e = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.RayTracing.Shadows"), t = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.NGX.DLSS.Enable"), ModelManager_1.ModelManager.RacingBetsModel.SetVisionValue(e, t), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.RayTracing.Shadows 0"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Enable 0"))
}, RacingBetsController.le1 = () => {
  var e;
  ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) && 31 === e.InstSubType ? (UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("DiceBp"), 1)?.SetActorHiddenInGame(!0), RacingBetsController.ae1 || (UiManager_1.UiManager.OpenView("RacingBetsDangoFrameTipView"), RacingBetsController.ae1 = !0)) : RacingBetsController.ae1 && (UiManager_1.UiManager.CloseView("RacingBetsDangoFrameTipView"), RacingBetsController.ae1 = !1)
}, RacingBetsController.wa1 = () => {
  var e, t;
  ModelManager_1.ModelManager.RacingBetsModel.CheckInRacingBetsDungeon() && (e = ModelManager_1.ModelManager.RacingBetsModel.RayTracingShadowsValue, t = ModelManager_1.ModelManager.RacingBetsModel.DlssValue, UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.RayTracing.Shadows " + e), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Enable " + t))
}, RacingBetsController.he1 = e => {
  _a.TryRegisterNextDangoOddsUpdateRequest(e), _a.TryRegisterLegMatchStateChange(e)
}, RacingBetsController.xH1 = () => {
  var e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
  e && (_a.TryRegisterLegMatchStateChange(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.Id))
}, RacingBetsController.RacingBetsUpdateOddsRequest = () => {
  var e = Protocol_1.Aki.Protocol.KZ_.create();
  const t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
  var n = t.GetCurLegMatchData();
  e.w6n = t.Id, e.mJ_ = n.Id, Net_1.Net.Call(15510, e, e => {
    e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29712) : (ModelManager_1.ModelManager.RacingBetsModel.OnRacingBetsOddsUpdate(e), _a.TryRegisterNextDangoOddsUpdateRequest(t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsDangoOddsUpdate)))
  })
}, RacingBetsController.STc = e => {
  ModelManager_1.ModelManager.RacingBetsModel.OnPlayerInfoUpdate(e.jRs), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate)
}, RacingBetsController.MTc = e => {
  ModelManager_1.ModelManager.RacingBetsModel.OnRacingBetsTaskNotify(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsRewardRefresh);
  e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData().Id;
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e)
}, RacingBetsController.ce1 = e => {
  ModelManager_1.ModelManager.RacingBetsModel.OnRacingBetsMatchResultNotify(e)
}, RacingBetsController.qP1 = e => {
  ModelManager_1.ModelManager.RacingBetsModel.RefreshLegMatchResult(e.j7n), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsLegMatchEnd, e.j7n.mJ_)
};
//# sourceMappingURL=RacingBetsController.js.map