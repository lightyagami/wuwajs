"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeOfDayModel = exports.TodDayTime = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const TimeOfDayDefine_1 = require("./TimeOfDayDefine");
const TimeOfDaySecondItem_1 = require("./Views/TimeOfDaySecondItem");
class TodDayTime {
  constructor() {
    this.LTo = 0;
  }
  static get dBi() {
    this.DTo ||= ConfigManager_1.ConfigManager.TimeOfDayConfig.GetRate();
    return this.DTo;
  }
  get Second() {
    return this.LTo;
  }
  set Second(e) {
    this.LTo = TodDayTime.ConvertToOneDaySecond(e);
  }
  get DayState() {
    return ConfigManager_1.ConfigManager.TimeOfDayConfig.GetDayStateByGameTimeMinute(this.Minute);
  }
  get Hour() {
    return this.Minute / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR;
  }
  get Minute() {
    return this.Second / TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE;
  }
  get HourMinuteString() {
    return TodDayTime.ConvertToHourMinuteString(this.Second);
  }
  static ConvertFromRealTimeSecond(e) {
    if (TodDayTime.dBi) {
      return e * TodDayTime.dBi / TimeOfDayDefine_1.TOD_RATE_RATIO;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TimeOfDay", 16, "获取时间流速比错误");
      }
      return 0;
    }
  }
  static ConvertToDayState(e) {
    return ConfigManager_1.ConfigManager.TimeOfDayConfig.GetDayStateByGameTimeMinute(TodDayTime.ConvertToMinute(e));
  }
  static ConvertToOneDaySecond(e) {
    if (e < 0) {
      return 0;
    } else {
      return e % TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
    }
  }
  static ConvertToHourMinuteString(e) {
    var t = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR);
    var e = Math.floor((e - t * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
    return ("0" + t).slice(-2) + ":" + ("0" + e).slice(-2);
  }
  static ConvertToDay(e) {
    return e / TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
  }
  static ConvertToHour(e) {
    return e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR;
  }
  static ConvertToMinute(e) {
    return e / TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE;
  }
  static ConvertFromMinute(e) {
    return e * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE;
  }
  static ConvertFromHourMinute(e, t) {
    return e * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR + t * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE;
  }
  static CheckInMinuteSpan(e, t) {
    if (!(e < 0) && !(e > TimeOfDayDefine_1.TOD_MINUTE_PER_DAY)) {
      var i = t[0];
      var t = t[1];
      if (i < t) {
        if (i <= e && e < t) {
          return true;
        }
      } else if (i <= e || e < t) {
        return true;
      }
    }
    return false;
  }
}
(exports.TodDayTime = TodDayTime).DTo = 0;
class TimeOfDayModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.RTo = new TodDayTime();
    this.UTo = 0;
    this.ATo = 1;
    this.PTo = 1;
    this.FreezeTimeScale = false;
    this.PlayerAccount = undefined;
    this.CurrentSelectTimeItemSt = undefined;
    this.xTo = 0;
    this.wTo = 0;
    this.BTo = 0;
    this.Z41 = false;
    this.TimeRunLockStateClient = false;
    this.TimeRunLockStateServer = false;
    this.TimeSyncLockStateClient = false;
    this.TimeSyncLockStateServer = false;
  }
  get GameTime() {
    return this.RTo;
  }
  get TimeRunLockState() {
    if (this.Z41) {
      return this.TimeRunLockStateClient;
    } else {
      return this.TimeRunLockStateServer;
    }
  }
  get TimeSynLockState() {
    if (this.Z41) {
      return this.TimeSyncLockStateClient;
    } else {
      return this.TimeSyncLockStateServer;
    }
  }
  GetPassSceneTime() {
    return this.BTo;
  }
  SetPassSceneTime(e) {
    this.BTo = e;
  }
  get OldTimeScale() {
    return this.PTo;
  }
  get TimeScale() {
    return this.ATo;
  }
  set TimeScale(e) {
    if (!this.FreezeTimeScale && !(e < 0)) {
      this.PTo = this.ATo;
      this.ATo = e;
    }
  }
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  CacheTimeRecords() {
    this.xTo = this.GameTime.Second;
    this.UTo = Time_1.Time.Now;
  }
  CheckCanCacheRecord() {
    return this.UTo === 0 || !(Time_1.Time.Now - this.UTo < TimeOfDayDefine_1.TOD_SAVE_CD_MINUTE * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE * TimeOfDayDefine_1.TOD_MILLIONSECOND_PER_SECOND);
  }
  IsCurrentTimePassedNormally() {
    if (this.xTo === 0) {
      return this.GameTime.Second >= TimeOfDayDefine_1.TOD_SECOND_PER_DAY - TimeOfDayDefine_1.TOD_SAVE_CD_SECONDS;
    } else if (this.GameTime.Second < TimeOfDayDefine_1.TOD_SAVE_CD_SECONDS) {
      return this.xTo >= TimeOfDayDefine_1.TOD_SECOND_PER_DAY - TimeOfDayDefine_1.TOD_SAVE_CD_SECONDS + this.GameTime.Second || this.xTo <= this.GameTime.Second;
    } else {
      return this.GameTime.Second - this.xTo > 0 && this.GameTime.Second - this.xTo < TimeOfDayDefine_1.TOD_SAVE_CD_SECONDS;
    }
  }
  GetTimeOfDayShowData() {
    var t = new Array();
    var i = ConfigManager_1.ConfigManager.TimeOfDayConfig.GetTimePresets();
    let r = 0;
    var n;
    var a = this.GameTime.Second;
    var s = ConfigManager_1.ConfigManager.TimeOfDayConfig.GetDayTimeChangePresets();
    for (let e = 0; e < s.length; e++) {
      for (var [o] of i) {
        if (s[e].ChangeDayNum !== 0 || !(a > o)) {
          (n = new TimeOfDaySecondItem_1.TimeOfDaySecondItemSt()).Id = r;
          n.ChangeDayIndex = e;
          n.SetTime = o;
          n.ShowName = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s[e].Title);
          t.push(n);
          r++;
        }
      }
    }
    return t;
  }
  SetCurrentDay(e) {
    if (this.wTo !== e && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TimeOfDay", 27, "日期调整");
    }
    this.wTo = e;
  }
  GetCurrentDay() {
    return this.wTo;
  }
  SetUseClientLockState(e) {
    this.Z41 = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("TimeOfDay", 26, "使用客户端时间锁定状态", ["enable", e]);
    }
  }
}
exports.TimeOfDayModel = TimeOfDayModel;
//# sourceMappingURL=TimeOfDayModel.js.map