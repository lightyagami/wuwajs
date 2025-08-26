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
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterGameSuccess, this.nTo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PauseGame, this.LZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LoginSuccess, this.gSe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BeforeLoadMap, this.SYi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.FWe);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(20336, TimeOfDayController.sTo);
    Net_1.Net.Register(15599, TimeOfDayController.aTo);
    Net_1.Net.Register(22916, TimeOfDayController.hTo);
    Net_1.Net.Register(19394, TimeOfDayController.Awa);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20336);
    Net_1.Net.UnRegister(15599);
    Net_1.Net.UnRegister(22916);
    Net_1.Net.UnRegister(19394);
  }
  static OnTick(e) {
    if (!!TimeOfDayController.lTo && !!TimeOfDayController._To && !TimeOfDayController.uTo && !TimeOfDayController.cTo && !ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState) {
      this.mTo += e;
      this.dTo(this.mTo);
      this.mTo = 0;
    }
  }
  static dTo(e) {
    var i = ModelManager_1.ModelManager.GameModeModel.IsMulti ? 1 : ModelManager_1.ModelManager.TimeOfDayModel.TimeScale;
    var e = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(e / TimeOfDayDefine_1.TOD_MILLIONSECOND_PER_SECOND * i);
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
      if (e && Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity?.GetComponent(206)?.HasTag(e.TagId)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("TimeOfDay", 27, "时间在BanTag");
        }
        return false;
      }
    }
    return !ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState || (Log_1.Log.CheckInfo() && Log_1.Log.Info("TimeOfDay", 26, "时间被锁定"), false);
  }
  static CTo(e, i = true) {
    let t = e;
    while (t > TimeOfDayDefine_1.TOD_SECOND_PER_DAY) {
      t -= TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
    }
    ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second = t;
    this.SyncGlobalGameTime(t);
    this.fTo(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TodTimeChange);
    if (i && !ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState) {
      this.pTo(e);
    }
  }
  static pTo(e) {
    let i = e;
    if (i > TimeOfDayDefine_1.TOD_SECOND_PER_DAY) {
      i = 0;
    }
    var t = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.DayState;
    if (this.vTo !== t) {
      this.vTo = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DayStateChange);
    }
    var t = Time_1.Time.Now - this.MTo;
    if (t > SENDTIMEGAP && i - this.ETo > TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE || this.ETo > i) {
      this.SyncServerGameTime(i);
    }
    var t = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR);
    if (t < this.STo) {
      e = Math.floor((e - t * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
      this.yTo(1, t, e, Protocol_1.Aki.Protocol.C4s.Proto_TimeFlowAuto);
    }
    this.RecordLastHour(t);
  }
  static SyncServerGameTime(e) {
    var i;
    var t;
    if (!!GlobalData_1.GlobalData.World && (!ModelManager_1.ModelManager.GameModeModel.IsMulti || !!ModelManager_1.ModelManager.CreatureModel.IsMyWorld())) {
      i = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR);
      t = Math.floor((e - i * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
      this.yTo(0, i, t, Protocol_1.Aki.Protocol.C4s.Proto_TimeFlowAuto);
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
    var i;
    if (GlobalData_1.GlobalData.World && ((i = TimeOfDayController.ITo - e) > TimeOfDayController.TTo || i < -TimeOfDayController.TTo)) {
      AudioSystem_1.AudioSystem.SetRtpcValue("time", TimeOfDayModel_1.TodDayTime.ConvertToHour(e));
      AudioSystem_1.AudioSystem.SetRtpcValue("time_local", TimeUtil_1.TimeUtil.GetHoursFloat());
      TimeOfDayController.ITo = e;
    }
  }
  static ChangeTimeScale(e) {
    ModelManager_1.ModelManager.TimeOfDayModel.TimeScale = e;
  }
  static PauseTime() {
    ModelManager_1.ModelManager.TimeOfDayModel.TimeScale = 0;
  }
  static ResumeTimeScale(e = true) {
    ModelManager_1.ModelManager.TimeOfDayModel.TimeScale = e ? 1 : ModelManager_1.ModelManager.TimeOfDayModel.OldTimeScale;
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
    UiManager_1.UiManager.AddOpenViewCheckFunction("TimeOfDaySecondView", TimeOfDayController.iVe, "TimeOfDayController.CanOpenView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("TimeOfDaySecondView", TimeOfDayController.iVe);
  }
  static SyncSceneTime(i, t, a, o = false) {
    ModelManager_1.ModelManager.TimeOfDayModel.SetPassSceneTime(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second);
    if (i !== undefined && t !== undefined) {
      i = i * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR + TimeOfDayModel_1.TodDayTime.ConvertFromMinute(t);
      let e = 0;
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        e = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(Number(MathUtils_1.MathUtils.LongToBigInt(a) / BigInt(TimeOfDayDefine_1.TOD_MILLIONSECOND_PER_SECOND)) * ModelManager_1.ModelManager.TimeOfDayModel.TimeScale);
      }
      TimeOfDayController.lTo = true;
      const r = i + e;
      if (o) {
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
        Log_1.Log.Info("TimeOfDay", 26, "服务器同步Tod时间", ["second", r], ["showUi", o]);
      }
    }
  }
  static AdjustTime(e, i, t = 0) {
    var a;
    var o;
    if (!!GlobalData_1.GlobalData.World && (!ModelManager_1.ModelManager.GameModeModel.IsMulti || !!ModelManager_1.ModelManager.CreatureModel.IsMyWorld())) {
      ModelManager_1.ModelManager.TimeOfDayModel.CacheTimeRecords();
      a = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR);
      o = Math.floor((e - a * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
      this.yTo(t, a, o, i);
      this.CTo(e, false);
      this.ETo = e;
      this.RecordLastHour(a);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdjustTime);
    }
  }
  static yTo(e, i, t, a) {
    var o;
    if (!!GlobalData_1.GlobalData.World && (!ModelManager_1.ModelManager.GameModeModel.IsMulti || !!ModelManager_1.ModelManager.CreatureModel.IsMyWorld())) {
      (o = Protocol_1.Aki.Protocol.Qcs.create()).rjn = i;
      o.ojn = t;
      o.x9n = a;
      o.njn = e;
      Net_1.Net.Call(20578, o, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29933);
          } else {
            ModelManager_1.ModelManager.TimeOfDayModel.SetCurrentDay(e.aDs);
          }
        }
      });
    }
  }
  static CheckInMinuteSpan(e, i) {
    e = [e, i];
    i = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Minute;
    return TimeOfDayModel_1.TodDayTime.CheckInMinuteSpan(i, e);
  }
  static AdjustTimeByMinute(e, i) {
    this.AdjustTime(TimeOfDayModel_1.TodDayTime.ConvertFromMinute(e), i);
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
};
TimeOfDayController.SYi = () => {
  TimeOfDayController.uTo = true;
};
TimeOfDayController.FWe = () => {
  TimeOfDayController.uTo = false;
  TimeOfDayController.SyncGlobalGameTime(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second);
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
TimeOfDayController.iVe = e => !!_a.gTo() || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("TimeOfDayCantOpenView"), false);
TimeOfDayController.sTo = e => {
  ModelManager_1.ModelManager.TimeOfDayModel.SetCurrentDay(e.aDs);
};
TimeOfDayController.aTo = e => {
  var i = e.ARs;
  TimeOfDayController.SyncSceneTime(i.rjn, i.ojn, i.FRs, e.lZ_);
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
  var i = MathUtils_1.MathUtils.LongToNumber(e.rjn);
  var e = MathUtils_1.MathUtils.LongToNumber(e.ojn);
  if (i !== -1 && e !== -1) {
    i = TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(i, e);
    _a.CTo(i, false);
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
}; //# sourceMappingURL=TimeOfDayController.js.map