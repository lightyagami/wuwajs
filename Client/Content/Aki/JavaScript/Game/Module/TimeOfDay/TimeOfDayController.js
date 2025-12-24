"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeOfDayController = undefined;
const ue_1 = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventCSharpBridge_1 = require("../../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const TimeOfDayDefine_1 = require("./TimeOfDayDefine");
const TimeOfDayModel_1 = require("./TimeOfDayModel");
const SENDTIMEGAP = 2000;
class TimeOfDayController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnterGameSuccess, this.nTo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PauseGame, this.LZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LoginSuccess, this.gSe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BeforeLoadMap, this.SYi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.FWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestSyncTsTimeModelParam, this.zwm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestAdjustTime, this.Jwm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestSetTimeScale, this.Zwm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestLockTimeRunStateClient, this.eLm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestLockTimeSyncLockStateClient, this.tLm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestTimeCanOpenViewState, this.iLm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestSyncServerGameTime, this.rLm);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterGameSuccess, this.nTo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PauseGame, this.LZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LoginSuccess, this.gSe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BeforeLoadMap, this.SYi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.FWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestSyncTsTimeModelParam, this.zwm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestAdjustTime, this.Jwm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestSetTimeScale, this.Zwm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestLockTimeRunStateClient, this.eLm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestLockTimeSyncLockStateClient, this.tLm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestTimeCanOpenViewState, this.iLm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestSyncServerGameTime, this.rLm);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(20510, TimeOfDayController.sTo);
    Net_1.Net.Register(20598, TimeOfDayController.aTo);
    Net_1.Net.Register(18985, TimeOfDayController.hTo);
    Net_1.Net.Register(15912, TimeOfDayController.Awa);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20510);
    Net_1.Net.UnRegister(20598);
    Net_1.Net.UnRegister(18985);
    Net_1.Net.UnRegister(15912);
  }
  static OnTick(e) {
    if (!!TimeOfDayController.lTo && !!TimeOfDayController._To && !TimeOfDayController.uTo && !TimeOfDayController.cTo && !ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState) {
      this.mTo += e;
      this.dTo(this.mTo);
      this.mTo = 0;
    }
  }
  static dTo(e) {
    var t = ModelManager_1.ModelManager.GameModeModel.IsMulti ? 1 : ModelManager_1.ModelManager.TimeOfDayModel.TimeScale;
    var e = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(e / TimeOfDayDefine_1.TOD_MILLIONSECOND_PER_SECOND * t);
    if (!(e <= 0)) {
      this.CTo(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second + e);
    }
  }
  static gTo() {
    if (!Global_1.Global.BaseCharacter) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TimeOfDay", 27, "时间找不到角色");
      }
      return false;
    }
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TimeOfDay", 27, "时间在副本");
      }
      return false;
    }
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TimeOfDay", 27, "时间在联机");
      }
      return false;
    }
    for (const e of ConfigManager_1.ConfigManager.TimeOfDayConfig.GetBanGamePlayTags()) {
      if (e && Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity?.GetComponent(215)?.HasTag(e.TagId)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("TimeOfDay", 27, "时间在BanTag");
        }
        return false;
      }
    }
    return !ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState || (Log_1.Log.CheckInfo() && Log_1.Log.Info("TimeOfDay", 26, "时间被锁定"), false);
  }
  static CTo(e, t = true) {
    let i = e;
    while (i > TimeOfDayDefine_1.TOD_SECOND_PER_DAY) {
      i -= TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
    }
    ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second = i;
    this.SyncGlobalGameTime(i);
    this.fTo(i);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TodTimeChange);
    if (t && !ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState) {
      this.pTo(e);
    }
  }
  static pTo(e) {
    let t = e;
    if (t > TimeOfDayDefine_1.TOD_SECOND_PER_DAY) {
      t = 0;
    }
    var i = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.DayState;
    if (this.vTo !== i) {
      this.vTo = i;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DayStateChange);
    }
    var i = Time_1.Time.Now - this.MTo;
    if (i > SENDTIMEGAP && t - this.ETo > TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE || this.ETo > t) {
      this.SyncServerGameTime(t);
    }
    var i = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR);
    if (i < this.STo) {
      e = Math.floor((e - i * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
      this.yTo(1, i, e, Protocol_1.Aki.Protocol.C4s.Proto_TimeFlowAuto);
    }
    this.RecordLastHour(i);
  }
  static SyncServerGameTime(e) {
    var t;
    var i;
    if (!!GlobalData_1.GlobalData.World && (!ModelManager_1.ModelManager.GameModeModel.IsMulti || !!ModelManager_1.ModelManager.CreatureModel.IsMyWorld())) {
      t = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR);
      i = Math.floor((e - t * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
      this.yTo(0, t, i, Protocol_1.Aki.Protocol.C4s.Proto_TimeFlowAuto);
      this.ETo = e;
      this.MTo = Time_1.Time.Now;
    }
  }
  static SyncGlobalGameTime(e) {
    if (this.IsSyncToEngine) {
      if (GlobalData_1.GlobalData.World && !ModelManager_1.ModelManager.LoginModel.HasLoginPromise()) {
        ue_1.KuroRenderingRuntimeBPPluginBPLibrary.SetGlobalGITime(GlobalData_1.GlobalData.World, TimeOfDayModel_1.TodDayTime.ConvertToHour(e));
      }
    }
  }
  static fTo(e) {
    var t;
    if (GlobalData_1.GlobalData.World && ((t = TimeOfDayController.ITo - e) > TimeOfDayController.TTo || t < -TimeOfDayController.TTo)) {
      AudioSystem_1.AudioSystem.SetRtpcValue("time", TimeOfDayModel_1.TodDayTime.ConvertToHour(e));
      AudioSystem_1.AudioSystem.SetRtpcValue("time_local", TimeUtil_1.TimeUtil.GetHoursFloat());
      TimeOfDayController.ITo = e;
    }
  }
  static ChangeTimeScale(e) {
    ModelManager_1.ModelManager.TimeOfDayModel.SetTimeScale(e);
  }
  static PauseTime() {
    ModelManager_1.ModelManager.TimeOfDayModel.SetTimeScale(0);
  }
  static ResumeTimeScale(e = true) {
    ModelManager_1.ModelManager.TimeOfDayModel.SetTimeScale(e ? 1 : ModelManager_1.ModelManager.TimeOfDayModel.OldTimeScale);
  }
  static ForcePauseTime() {
    TimeOfDayController.PauseTime();
    ModelManager_1.ModelManager.TimeOfDayModel.FreezeTimeScale = true;
  }
  static ForceResumeTime() {
    ModelManager_1.ModelManager.TimeOfDayModel.FreezeTimeScale = false;
    TimeOfDayController.ResumeTimeScale();
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("TimeOfDaySecondView", TimeOfDayController.CanOpenView, "TimeOfDayController.CanOpenView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("TimeOfDaySecondView", TimeOfDayController.CanOpenView);
  }
  static SyncSceneTime(t, i, a, n = false) {
    ModelManager_1.ModelManager.TimeOfDayModel.SetPassSceneTime(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second);
    if (t !== undefined && i !== undefined) {
      t = t * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR + TimeOfDayModel_1.TodDayTime.ConvertFromMinute(i);
      let e = 0;
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        e = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(Number(MathUtils_1.MathUtils.LongToBigInt(a) / BigInt(TimeOfDayDefine_1.TOD_MILLIONSECOND_PER_SECOND)) * ModelManager_1.ModelManager.TimeOfDayModel.TimeScale);
      }
      TimeOfDayController.lTo = true;
      const r = t + e;
      if (n) {
        UiManager_1.UiManager.ResetToBattleView(e => {
          if (e) {
            e = {
              SetTime: r
            };
            UiManager_1.UiManager.OpenView("TimeOfDaySecondView", e, e => {
              if (!e) {
                this.CTo(r, false);
              }
            });
          } else {
            this.CTo(r, false);
          }
        });
      } else {
        this.CTo(r, false);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TimeOfDay", 26, "服务器同步Tod时间", ["second", r], ["showUi", n]);
      }
    }
  }
  static AdjustTime(e, t, i = 0) {
    var a;
    var n;
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsRequestAdjustTime, e, t, i);
    if (!!GlobalData_1.GlobalData.World && (!ModelManager_1.ModelManager.GameModeModel.IsMulti || !!ModelManager_1.ModelManager.CreatureModel.IsMyWorld())) {
      ModelManager_1.ModelManager.TimeOfDayModel.CacheTimeRecords();
      a = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR);
      n = Math.floor((e - a * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
      this.yTo(i, a, n, t);
      this.CTo(e, false);
      this.ETo = e;
      this.RecordLastHour(a);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdjustTime);
    }
  }
  static yTo(e, t, i, a) {
    var n;
    if (!!GlobalData_1.GlobalData.World && (!ModelManager_1.ModelManager.GameModeModel.IsMulti || !!ModelManager_1.ModelManager.CreatureModel.IsMyWorld())) {
      (n = Protocol_1.Aki.Protocol.Qcs.create()).rjn = t;
      n.ojn = i;
      n.x9n = a;
      n.njn = e;
      Net_1.Net.Call(15890, n, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25511);
          } else {
            ModelManager_1.ModelManager.TimeOfDayModel.SetCurrentDay(e.aDs);
            EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsResponseSyncServerGameTime, e.aDs);
          }
        }
      });
    }
  }
  static CheckInMinuteSpan(e, t) {
    e = [e, t];
    t = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Minute;
    return TimeOfDayModel_1.TodDayTime.CheckInMinuteSpan(t, e);
  }
  static AdjustTimeByMinute(e, t) {
    this.AdjustTime(TimeOfDayModel_1.TodDayTime.ConvertFromMinute(e), t);
  }
  static SetUiAnimFlag(e) {
    TimeOfDayController.cTo = e;
  }
  static RecordLastHour(e) {
    if (this.STo !== e) {
      this.STo = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CrossHour);
    }
  }
  static OnClear() {
    return true;
  }
}
exports.TimeOfDayController = TimeOfDayController;
(_a = TimeOfDayController).IsSyncToEngine = true;
TimeOfDayController.mTo = 0;
TimeOfDayController.vTo = 4;
TimeOfDayController.ITo = 0;
TimeOfDayController.ETo = 0;
TimeOfDayController.MTo = 0;
TimeOfDayController.STo = 0;
TimeOfDayController._To = false;
TimeOfDayController.uTo = false;
TimeOfDayController.cTo = false;
TimeOfDayController.lTo = false;
TimeOfDayController.TTo = TimeOfDayDefine_1.TOD_SECOND_PER_HOUR * 0.1;
TimeOfDayController.nTo = () => {
  TimeOfDayController._To = true;
  EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsOnTimeEnterGame);
};
TimeOfDayController.SYi = () => {
  TimeOfDayController.uTo = true;
  EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsOnTimeBeforeLoadMap);
};
TimeOfDayController.FWe = () => {
  TimeOfDayController.uTo = false;
  TimeOfDayController.SyncGlobalGameTime(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second);
  EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsOnTimeWorldDone);
};
TimeOfDayController.LZe = e => {
  if (e === 1) {
    TimeOfDayController.PauseTime();
  } else if (e === 0) {
    TimeOfDayController.ResumeTimeScale();
  }
};
TimeOfDayController.gSe = e => {
  ModelManager_1.ModelManager.TimeOfDayModel.PlayerAccount = e;
};
TimeOfDayController.CanOpenView = e => ModelManager_1.ModelManager.WeatherModel.CanSwitchWeather() ? !!_a.gTo() || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("TimeOfDayCantOpenView"), false) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("Weather", 90, "天气切换中途禁止切换时间"), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(new ConfirmBoxDefine_1.ConfirmBoxDataNew(428)), false);
TimeOfDayController.sTo = e => {
  ModelManager_1.ModelManager.TimeOfDayModel.SetCurrentDay(e.aDs);
};
TimeOfDayController.aTo = e => {
  var t = e.ARs;
  TimeOfDayController.SyncSceneTime(t.rjn, t.ojn, t.FRs, e.lZ_);
};
TimeOfDayController.hTo = e => {
  if (e.Y5n) {
    ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateServer = true;
    ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateServer = true;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("TimeOfDay", 26, "[TimeRunLockState] 服务器通知锁定时间");
    }
  } else {
    ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateServer = false;
    ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateServer = false;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("TimeOfDay", 26, "[TimeRunLockState] 服务器通知解锁时间");
    }
  }
  var t = MathUtils_1.MathUtils.LongToNumber(e.rjn);
  var e = MathUtils_1.MathUtils.LongToNumber(e.ojn);
  if (t !== -1 && e !== -1) {
    t = TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(t, e);
    _a.CTo(t, false);
  }
};
TimeOfDayController.Awa = e => {
  if (e.S0a === 1) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("TimeOfDay", 37, "[TimeResetNotify] 收到服务器4点跨天通知,触发跨天事件");
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CrossDay);
  } else if (e.S0a === 4) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("TimeOfDay", 37, "[TimeResetNotify] 收到服务器0点跨天通知,触发跨天事件");
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CrossDayZone);
  }
};
TimeOfDayController.zwm = () => {
  var e = ModelManager_1.ModelManager.TimeOfDayModel.FreezeTimeScale;
  var t = ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateClient;
  var i = ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateServer;
  var a = ModelManager_1.ModelManager.TimeOfDayModel.TimeSyncLockStateClient;
  var n = ModelManager_1.ModelManager.TimeOfDayModel.TimeSyncLockStateServer;
  EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsResponseSyncToCsTimeModelParam, e, t, i, a, n);
};
TimeOfDayController.Jwm = (e, t, i) => {
  _a.AdjustTime(e, t, i);
};
TimeOfDayController.Zwm = e => {
  ModelManager_1.ModelManager.TimeOfDayModel.SetTimeScale(e, false);
};
TimeOfDayController.eLm = e => {
  ModelManager_1.ModelManager.TimeOfDayModel.SetTimeRunLockStateClient(e, false);
};
TimeOfDayController.tLm = e => {
  ModelManager_1.ModelManager.TimeOfDayModel.SetTimeSyncLockStateClient(e, false);
};
TimeOfDayController.iLm = () => {
  var e = _a.gTo();
  EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsResponseTimeCanOpenViewState, e);
};
TimeOfDayController.rLm = (e, t, i, a) => {
  _a.RecordLastHour(t);
  _a.yTo(e, t, i, a);
}; //# sourceMappingURL=TimeOfDayController.js.map