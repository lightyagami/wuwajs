"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsController = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ActivityControllerBase_1 = require("../Activity/ActivityControllerBase");
const ConfirmBoxController_1 = require("../ConfirmBox/ConfirmBoxController");
const InstanceDungeonEntranceController_1 = require("../InstanceDungeon/InstanceDungeonEntranceController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const RacingBetsSeasonData_1 = require("./Data/RacingBetsSeasonData");
const RacingBetsActivityView_1 = require("./View/RacingBetsActivityView");
class RacingBetsController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_RaceHorseGuide";
  }
  OnCreateSubPageComponent(e) {
    return new RacingBetsActivityView_1.RacingBetsActivityView();
  }
  OnCreateActivityData(e) {
    var t = new RacingBetsSeasonData_1.RacingBetsSeasonData();
    ModelManager_1.ModelManager.RacingBetsModel.SetRacingBetsSeasonData(t);
    return t;
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnInit() {
    return !(RacingBetsController.be1 = false);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsDataRefresh, RacingBetsController.Le1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, RacingBetsController.p5a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, RacingBetsController.Re1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeon, RacingBetsController.Ja1);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsDataRefresh, RacingBetsController.Le1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, RacingBetsController.p5a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, RacingBetsController.Re1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeon, RacingBetsController.Ja1);
  }
  OnClear() {
    RacingBetsController.be1 = false;
    if (RacingBetsController.UM1) {
      TimerSystem_1.RealTimeTimerSystem.Remove(RacingBetsController.UM1);
      RacingBetsController.UM1 = undefined;
    }
    if (RacingBetsController.m$1) {
      TimerSystem_1.RealTimeTimerSystem.Remove(RacingBetsController.m$1);
      RacingBetsController.m$1 = undefined;
    }
    return true;
  }
  OnShowActivityFirstUnlockView(e) {
    UiManager_1.UiManager.OpenView("RacingBetsDangoActivityOpenTips");
  }
  static TryRegisterNextDangoOddsUpdateRequest(e) {
    var e = e.GetCurLegMatchData();
    if (!!e && !((e = e.NextOddsRateRefreshTime - TimeUtil_1.TimeUtil.GetServerTimeStamp()) < 0)) {
      if (this.UM1) {
        TimerSystem_1.RealTimeTimerSystem.Remove(this.UM1);
        this.UM1 = undefined;
      }
      this.UM1 = TimerSystem_1.RealTimeTimerSystem.Delay(this.RacingBetsUpdateOddsRequest, e, undefined, undefined, false);
    }
  }
  static TryRegisterLegMatchStateChange(e) {
    if (!!e && !!(e = e.GetCurLegMatchData()) && !((e = TimeUtil_1.TimeUtil.SetTimeMillisecond(e.GetLegRemindTime())) <= 0)) {
      if (this.m$1) {
        TimerSystem_1.RealTimeTimerSystem.Remove(this.m$1);
        this.m$1 = undefined;
      }
      this.m$1 = TimerSystem_1.RealTimeTimerSystem.Delay(this.f$1, e, undefined, undefined, false);
    }
  }
  static TryStartRacingBetsGaming(e) {
    var t;
    var n;
    if (!ConfirmBoxController_1.ConfirmBoxController.CheckIsConfirmBoxOpen()) {
      t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
      if ((e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsLegMatchData(e)) && t && (n = e.GetLegMatchState(), ModelManager_1.ModelManager.RacingBetsModel.GetIsFromActivityOpenDungeon()) && n === 3) {
        RacingBetsController.RacingBetMatchActionRequest(t.Id, e.Id);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsWatchGameRecord, e.Id);
      }
    }
  }
  static TryOpenRacingBetsLegMatchResultView() {
    var e = ModelManager_1.ModelManager.RacingBetsModel.GetLegMatchResultData();
    return !!e && (e.L8c === 1 ? UiManager_1.UiManager.OpenView("RacingBetsSuccessTip", e) : UiManager_1.UiManager.OpenView("RacingBetsFailTip", e), ModelManager_1.ModelManager.RacingBetsModel.SetLegMatchResultData(undefined), true);
  }
  static TryLeaveRacingBetsDungeon() {
    if (ModelManager_1.ModelManager.RacingBetsModel.CheckInRacingBetsDungeon()) {
      if (ModelManager_1.ModelManager.RacingBetsModel.IsDungeonPlaying) {
        ModelManager_1.ModelManager.RacingBetsModel.LeaveDungeonOnEnd = true;
        ModelManager_1.ModelManager.RacingBetsModel.RacingBetsAbortDungeon();
      } else {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
      }
    }
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(16808, RacingBetsController.STc);
    Net_1.Net.Register(25050, RacingBetsController.MTc);
    Net_1.Net.Register(28307, RacingBetsController.Ae1);
    Net_1.Net.Register(22538, RacingBetsController.cx1);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16808);
    Net_1.Net.UnRegister(25050);
    Net_1.Net.UnRegister(28307);
    Net_1.Net.UnRegister(22538);
  }
  static RacingBetsGearRequest(t, e, n, r, o) {
    var a = Protocol_1.Aki.Protocol.Az_.create();
    a.w6n = t;
    a.mJ_ = e.Id;
    a.Kz_ = n;
    a.gJ_ = r;
    a._J_ = o;
    a.zZ_ = e.OddsVersion;
    Net_1.Net.Call(20436, a, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26942);
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Dango_BetPage_BetSuccess");
          ModelManager_1.ModelManager.RacingBetsModel.OnPlayerInfoUpdate(e.jRs);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsBettingInfoUpdate, n, true);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t);
        }
      }
    });
  }
  static RacingBetsGearRefundRequest(t, e, n) {
    var r = Protocol_1.Aki.Protocol.ZRc.create();
    r.w6n = t;
    r.mJ_ = e.Id;
    r.Kz_ = n;
    Net_1.Net.Call(18365, r, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26942);
        } else {
          ModelManager_1.ModelManager.RacingBetsModel.OnPlayerInfoUpdate(e.jRs);
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Dango_BetPage_CancelSuccess");
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsBettingInfoUpdate, n, false);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t);
        }
      }
    });
  }
  static RacingBetsRankRequest(e, t) {
    var n = Protocol_1.Aki.Protocol.wz_.create();
    n.w6n = e;
    Net_1.Net.Call(19309, n, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_RacingBetsBulletNotFundOpenRankCurTime) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Dango_RankPage_EmptyInfo");
        } else if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24558);
        } else {
          ModelManager_1.ModelManager.RacingBetsModel.RacingBetsRankRefresh(e);
          t?.();
        }
      }
    });
  }
  static RacingBetsTaskRewardRequest(e) {
    var t = Protocol_1.Aki.Protocol.Bz_.create();
    t.gps = e;
    Net_1.Net.Call(29464, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29755);
        }
        e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData().Id;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e);
      }
    });
  }
  static RacingBetMatchActionRequest(t, n) {
    var e = Protocol_1.Aki.Protocol.aa1.create();
    e.w6n = t;
    e.mJ_ = n;
    Net_1.Net.Call(23074, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19615);
        } else {
          ModelManager_1.ModelManager.RacingBetsModel.RacingBetsMatchStart(n, e);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t);
        }
      }
    });
  }
  static async RacingBetsMatchRoundActionRequestAsync(e, t, n) {
    var r = Protocol_1.Aki.Protocol.la1.create();
    r.w6n = e;
    r.mJ_ = t;
    r.pBc = n;
    var e = await Net_1.Net.CallAsync(16824, r);
    return !!e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16365), false) : (ModelManager_1.ModelManager.RacingBetsModel.RacingBetsMatchRoundRefresh(t, e.BJ_, true), true));
  }
  static RacingBetsMatchInfoRequest(e, t) {
    var n = Protocol_1.Aki.Protocol.sl1.create();
    n.w6n = e;
    n.mJ_ = t;
    Net_1.Net.Call(15302, n, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20328);
        } else {
          ModelManager_1.ModelManager.RacingBetsModel.RacingBetsMatchPreview(t, e);
        }
      }
    });
  }
  static RacingBetsBulletScreenRequest(t) {
    var e = Protocol_1.Aki.Protocol.Vz_.create();
    var n = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    e.w6n = n.Id;
    e.mJ_ = ModelManager_1.ModelManager.RacingBetsModel.DungeonMatchId;
    e.kJ_ = t;
    e.mTs = ModelManager_1.ModelManager.RacingBetsModel.GetCommandActionIndex();
    Net_1.Net.Call(25901, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27836);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsPushBulletScreen, [t], true);
        }
      }
    });
  }
}
exports.RacingBetsController = RacingBetsController;
(_a = RacingBetsController).be1 = false;
RacingBetsController.UM1 = undefined;
RacingBetsController.m$1 = undefined;
RacingBetsController.p5a = () => {
  var e;
  var t;
  if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) && e.InstSubType === 31) {
    e = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.RayTracing.Shadows");
    t = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.NGX.DLSS.Enable");
    ModelManager_1.ModelManager.RacingBetsModel.SetVisionValue(e, t);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.RayTracing.Shadows 0");
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Enable 0");
  }
};
RacingBetsController.Re1 = () => {
  var e;
  if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) && e.InstSubType === 31) {
    UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("DiceBp"), 1)?.SetActorHiddenInGame(true);
    if (!RacingBetsController.be1) {
      UiManager_1.UiManager.OpenView("RacingBetsDangoFrameTipView");
      RacingBetsController.be1 = true;
    }
  } else if (RacingBetsController.be1) {
    UiManager_1.UiManager.CloseView("RacingBetsDangoFrameTipView");
    RacingBetsController.be1 = false;
  }
};
RacingBetsController.Ja1 = () => {
  var e;
  var t;
  if (ModelManager_1.ModelManager.RacingBetsModel.CheckInRacingBetsDungeon()) {
    e = ModelManager_1.ModelManager.RacingBetsModel.RayTracingShadowsValue;
    t = ModelManager_1.ModelManager.RacingBetsModel.DlssValue;
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.RayTracing.Shadows " + e);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.NGX.DLSS.Enable " + t);
  }
};
RacingBetsController.Le1 = e => {
  _a.TryRegisterNextDangoOddsUpdateRequest(e);
  _a.TryRegisterLegMatchStateChange(e);
};
RacingBetsController.f$1 = () => {
  var e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
  if (e) {
    _a.TryRegisterLegMatchStateChange(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.Id);
  }
};
RacingBetsController.RacingBetsUpdateOddsRequest = () => {
  var e = Protocol_1.Aki.Protocol.KZ_.create();
  const t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
  var n = t.GetCurLegMatchData();
  e.w6n = t.Id;
  e.mJ_ = n.Id;
  Net_1.Net.Call(18874, e, e => {
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20481);
      } else {
        ModelManager_1.ModelManager.RacingBetsModel.OnRacingBetsOddsUpdate(e);
        _a.TryRegisterNextDangoOddsUpdateRequest(t);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsDangoOddsUpdate);
      }
    }
  });
};
RacingBetsController.STc = e => {
  ModelManager_1.ModelManager.RacingBetsModel.OnPlayerInfoUpdate(e.jRs);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate);
};
RacingBetsController.MTc = e => {
  ModelManager_1.ModelManager.RacingBetsModel.OnRacingBetsTaskNotify(e);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsRewardRefresh);
  e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData().Id;
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e);
};
RacingBetsController.Ae1 = e => {
  ModelManager_1.ModelManager.RacingBetsModel.OnRacingBetsMatchResultNotify(e);
};
RacingBetsController.cx1 = e => {
  ModelManager_1.ModelManager.RacingBetsModel.RefreshLegMatchResult(e.j7n);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsLegMatchEnd, e.j7n.mJ_);
}; //# sourceMappingURL=RacingBetsController.js.map