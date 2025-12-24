"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeUtil = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Time_1 = require("../../Core/Common/Time");
const CommonDefine_1 = require("../../Core/Define/CommonDefine");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const StringBuilder_1 = require("../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../Manager/ConfigManager");
class TimeUtil {
  static Init(t) {
    this.Ode = t;
  }
  static GetServerTimeStamp() {
    return Time_1.Time.ServerTimeStamp;
  }
  static GetServerStopTimeStamp() {
    return Time_1.Time.ServerFlowTimeStamp;
  }
  static GetServerTime() {
    return Time_1.Time.ServerTimeStamp * this.Millisecond;
  }
  static SetServerTimeStamp(t) {
    Time_1.Time.SetServerTimeStamp(Number(MathUtils_1.MathUtils.LongToBigInt(t)));
    this.InitNextDayTimeStamp();
  }
  static Tick(t) {
    if (this.kde && Time_1.Time.ServerTimeStamp >= this.kde) {
      this.InitNextDayTimeStamp();
    }
  }
  static InitNextDayTimeStamp() {
    var t = new Date(Time_1.Time.ServerTimeStamp);
    if (t.getHours() >= TimeUtil.CrossDayHour) {
      t.setDate(t.getDate() + 1);
    }
    t.setHours(TimeUtil.CrossDayHour, 0, 0, 0);
    this.kde = t.getTime() + Math.random();
  }
  static GetNextDayTimeStamp() {
    return this.kde;
  }
  static SetTimeMillisecond(t) {
    return t * this.InverseMillisecond;
  }
  static SetTimeSecond(t) {
    return t / this.InverseMillisecond;
  }
  static DateFormat(t) {
    return `${t.getFullYear()}.${t.getMonth() + 1}.${t.getDate()}-${t.getHours()}.${t.getMinutes()}.${t.getSeconds()}:${t.getMilliseconds()}`;
  }
  static DateFormat2(t) {
    return `${t.getFullYear()}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")} ${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}:${t.getSeconds().toString().padStart(2, "0")}`;
  }
  static DateFormat3(t) {
    return `${t.getFullYear()}/${(t.getMonth() + 1).toString().padStart(2, "0")}/${t.getDate().toString().padStart(2, "0")} ${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
  }
  static DateFormat4(t) {
    return `${t.getFullYear()}/${(t.getMonth() + 1).toString().padStart(2, "0")}/${t.getDate().toString().padStart(2, "0")}`;
  }
  static DateFormat4String(t) {
    t = new Date(t * this.InverseMillisecond);
    return this.DateFormat4(t);
  }
  static DateFormat5(t) {
    return `${t.getFullYear()}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")} ${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}:${t.getSeconds().toString().padStart(2, "0")}.${t.getMilliseconds()}`;
  }
  static DateFormat6String(t) {
    t = new Date(t);
    return (t.getMonth() + 1).toString().padStart(2, "0") + "." + t.getDate().toString().padStart(2, "0");
  }
  static DateFormat7String(t) {
    t = new Date(t);
    return t.getHours().toString().padStart(2, "0") + ":" + t.getMinutes().toString().padStart(2, "0");
  }
  static DateFormat8(t, e) {
    return `${t.getFullYear()}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")} ${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}:${t.getSeconds().toString().padStart(2, "0")}${e}`;
  }
  static GetServerUnixTime() {
    var t = new Date(Time_1.Time.ServerTimeStamp);
    var t = new Date(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate(), t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds());
    return Math.round(t.getTime() * this.Millisecond);
  }
  static DateFormatString(t) {
    t = new Date(t * this.InverseMillisecond);
    return `${t.getFullYear()}/${t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1).toString()}/${t.getDate() < 10 ? "0" + t.getDate() : t.getDate().toString()} ${t.getHours() < 10 ? "0" + t.getHours() : t.getHours().toString()}:${t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes().toString()}:${t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds().toString()}`;
  }
  static DateFormatString2(t) {
    t = new Date(t * this.InverseMillisecond);
    return "" + t.getFullYear() + (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1).toString()) + (t.getDate() < 10 ? "0" + t.getDate() : t.getDate().toString()) + (t.getHours() < 10 ? "0" + t.getHours() : t.getHours().toString()) + (t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes().toString()) + (t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds().toString());
  }
  static GetTimeString(t) {
    var e;
    if (t < 0) {
      return "";
    } else {
      e = (e = t % this.Minute) < 10 ? "0" + e : e.toString();
      return ((t = Math.floor(t / this.Minute)) < 10 ? "0" + t : t.toString()) + ":" + e;
    }
  }
  static GetDataFromTimeStamp(t) {
    t = new Date(t * this.InverseMillisecond);
    return {
      Year: t.getFullYear().toString(),
      Month: t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1).toString(),
      Day: t.getDate() < 10 ? "0" + t.getDate() : t.getDate().toString(),
      Hour: t.getHours() < 10 ? "0" + t.getHours() : t.getHours().toString(),
      Minute: t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes().toString(),
      Second: t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds().toString()
    };
  }
  static CalculateDayGapBetweenNow(t, e) {
    var i = Time_1.Time.ServerTimeStamp / TimeUtil.InverseMillisecond;
    var a = new Date();
    var r = new Date(t * TimeUtil.InverseMillisecond);
    var i = e ? t - i : i - t;
    if (i < 0 && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Mail", 27, "时间非法");
    }
    var t = i / 86400;
    let n = t;
    if (t < 2) {
      n = e ? a.getMonth() < r.getMonth() ? 1 : r.getDate() - a.getDate() : a.getMonth() > r.getMonth() ? 1 : a.getDate() - r.getDate();
    }
    return parseInt(n.toFixed(0));
  }
  static CalculateDayTimeStampGapBetweenNow(t, e) {
    var i = Time_1.Time.ServerTimeStamp / TimeUtil.InverseMillisecond;
    var e = e ? t - i : i - t;
    if (e < 0 && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Mail", 27, "时间非法");
    }
    return Math.floor(e / 86400);
  }
  static CalculateHourGapBetweenNow(t, e) {
    var i = TimeUtil.GetServerTimeStamp() / TimeUtil.InverseMillisecond;
    var e = e ? t - i : i - t;
    if (e < 0 && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Mail", 27, "时间非法");
    }
    return e / 3600;
  }
  static CalculateMinuteGapBetweenNow(t, e) {
    var i = Time_1.Time.ServerTimeStamp / TimeUtil.InverseMillisecond;
    var e = e ? t - i : i - t;
    if (e < 0 && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Mail", 27, "时间非法");
    }
    return e / 60;
  }
  static GetCoolDown(t) {
    let e = "";
    t = Math.floor(t);
    if (t < 10) {
      e = e + "0" + t;
    } else {
      e += "" + t;
    }
    return e;
  }
  static GetHoursFloat() {
    var t = new Date(Time_1.Time.ServerTimeStamp);
    var e = t.getHours();
    var i = t.getMinutes();
    var t = t.getSeconds();
    return e + i / this.Minute + t / this.Hour;
  }
  static IsExceededServerTime(t) {
    return t >= TimeUtil.GetServerTime();
  }
  static CalculateRemainingTime(e, i = 1) {
    if (!(e <= 0)) {
      let t = 3;
      var a = {
        TimeValue: 0,
        RemainingTime: e + TimeUtil.TimeDeviation,
        TextId: CommonDefine_1.remainTimeTextId[i]
      };
      for (; t >= i;) {
        var r = TimeUtil.Fde[t](e);
        if (r) {
          a.TimeValue = r[0];
          a.TextId = CommonDefine_1.remainTimeTextId[t];
          a.RemainingTime = r[1] + TimeUtil.TimeDeviation;
          return a;
        }
        --t;
      }
      return a;
    }
  }
  static Vde(t, e, i, a) {
    if (t <= 0) {
      return {
        CountDownText: undefined,
        RemainingTime: TimeUtil.TimeDeviation
      };
    }
    var r = new StringBuilder_1.StringBuilder();
    let n = t;
    let m = undefined;
    var o;
    m = i ?? 3;
    o = a ?? 1;
    let s = undefined;
    switch (e) {
      case 0:
        s = CommonDefine_1.remainTimeTextId;
        break;
      case 1:
        s = CommonDefine_1.remainTimeTextIdFormat2;
        break;
      default:
        s = CommonDefine_1.remainTimeTextId;
    }
    while (m >= o) {
      var T = TimeUtil.Fde[m](n);
      var l = this.Ode.GetTextById(s[m]);
      var u = T ? T[0] : 0;
      var l = StringUtils_1.StringUtils.Format(l, u.toString());
      n = T ? T[1] : n;
      r.Append(l);
      --m;
    }
    return {
      CountDownText: r.ToString(),
      RemainingTime: n + TimeUtil.TimeDeviation
    };
  }
  static GetCountDownData(t, e, i) {
    return TimeUtil.Vde(t, 0, e, i);
  }
  static GetCountDownDataFormat2(t, e, i) {
    return TimeUtil.Vde(t, 1, e, i);
  }
  static GetRemainTimeDataFormat(t) {
    var e = this.GetTimeTypeData(t);
    if (e[0] === 0) {
      return {
        CountDownText: ConfigManager_1.ConfigManager.TextConfig.GetTextById("NotEnoughOneHour"),
        RemainingTime: t
      };
    } else {
      return this.GetCountDownDataFormat2(t, e[0], e[1]);
    }
  }
  static GetTimeTypeData(t) {
    if (t > CommonDefine_1.SECOND_PER_DAY) {
      return [3, 2];
    } else if (t > CommonDefine_1.SECOND_PER_HOUR) {
      return [2, 2];
    } else {
      return [0, 0];
    }
  }
  static GetRemainTimeDataFormat3(t) {
    let e = [0, 0];
    if (t > CommonDefine_1.SECOND_PER_DAY) {
      e = [3, 2];
    } else if (t > CommonDefine_1.SECOND_PER_HOUR) {
      e = [2, 1];
    } else if (t > CommonDefine_1.SECOND_PER_MINUTE) {
      e = [1, 0];
    }
    return TimeUtil.Vde(t, 1, e[0], e[1]);
  }
  static GetRemainTimeDataFormat4(t) {
    var e = [1, 1];
    if (t < CommonDefine_1.SECOND_PER_MINUTE) {
      return TimeUtil.Vde(CommonDefine_1.SECOND_PER_MINUTE, 1, e[0], e[1]);
    } else {
      return TimeUtil.Vde(t, 1, e[0], e[1]);
    }
  }
  static GetRemainTimeDataFormat5(t) {
    var t = Math.max(0, t);
    var e = this.Hour;
    var t = Math.min(t, e);
    var e = Math.floor(t / TimeUtil.Minute);
    var i = Math.floor(t % TimeUtil.Minute);
    var t = Math.floor((t - Math.floor(t)) * 100);
    return `${e.toString().padStart(2, "0")}:${i.toString().padStart(2, "0")}:${t.toString().padStart(2, "0")}`;
  }
  static GetRemainTimeDataFormat6(t) {
    var t = Math.max(0, t);
    var e = Math.floor(t % TimeUtil.Hour / TimeUtil.Minute);
    var t = Math.floor(t % TimeUtil.Minute);
    return e.toString().padStart(2, "0") + ":" + t.toString().padStart(2, "0");
  }
  static IsInTimeSpan(t, e) {
    var i = TimeUtil.GetServerTime();
    return t <= i && i <= e;
  }
  static GetCurrentCrossDayStamp() {
    var t = new Date(Time_1.Time.ServerTimeStamp);
    if (t.getHours() < TimeUtil.CrossDayHour) {
      t.setDate(t.getDate() - 1);
    }
    t.setHours(TimeUtil.CrossDayHour, 0, 0, 0);
    return t.getTime();
  }
  static GetTimeDataFormat(t) {
    var e = new StringBuilder_1.StringBuilder();
    var i = Math.floor(t / 60);
    e.Append(i.toString().padStart(2, "0"));
    e.Append(":");
    var i = t % 60;
    e.Append(i.toString().padStart(2, "0"));
    return e.ToString();
  }
  static GetTimeZoneOffset() {
    const t = UE.KismetMathLibrary.UtcNow();
    const e = UE.KismetMathLibrary.Now();
    let i = UE.KismetMathLibrary.Subtract_DateTimeDateTime(e, t);
    if (UE.KismetMathLibrary.GetSeconds(i) < 0) {
      const e = UE.KismetMathLibrary.Now();
      const t = UE.KismetMathLibrary.UtcNow();
      i = UE.KismetMathLibrary.Subtract_DateTimeDateTime(e, t);
    }
    return i;
  }
  static GetTimeZoneOffsetString() {
    var t = TimeUtil.GetTimeZoneOffset();
    var e = UE.KismetMathLibrary.GetHours(t);
    var t = UE.KismetMathLibrary.GetMinutes(t);
    let i = undefined;
    return i = e >= 0 ? t === 0 ? "+" + e : `+${e}:${t}` : t === 0 ? "-" + -e : `-${-e}:${-t}`;
  }
  static LogTimeZoneOffset() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("TimeUtil", 17, "本地时间和UTC时间的偏移", ["", TimeUtil.GetTimeZoneOffsetString()]);
    }
  }
  static GetRemainTimeDataFormat7(t) {
    let e = [0, 0];
    if (t >= CommonDefine_1.SECOND_PER_DAY) {
      e = [3, 3];
    } else if (t >= CommonDefine_1.SECOND_PER_HOUR) {
      e = [2, 2];
    } else if (t >= CommonDefine_1.SECOND_PER_MINUTE) {
      e = [1, 1];
    }
    return TimeUtil.Vde(t, 1, e[0], e[1]);
  }
}
(exports.TimeUtil = TimeUtil).OneDayHourCount = 24;
TimeUtil.Hour = 3600;
TimeUtil.Minute = 60;
TimeUtil.OneDaySeconds = 86400;
TimeUtil.Millisecond = 0.001;
TimeUtil.InverseMillisecond = 1000;
TimeUtil.CrossDayHour = 4;
TimeUtil.kde = 0;
TimeUtil.TimeDeviation = 0.1;
TimeUtil.Fde = {
  [0]: t => {
    if (t > 0) {
      return [t = Math.floor(t), t];
    }
  },
  1: t => {
    if (t >= CommonDefine_1.SECOND_PER_MINUTE) {
      return [(t - (t = t % CommonDefine_1.SECOND_PER_MINUTE)) / CommonDefine_1.SECOND_PER_MINUTE, t];
    }
  },
  2: t => {
    if (t >= CommonDefine_1.SECOND_PER_HOUR) {
      return [(t - (t = t % CommonDefine_1.SECOND_PER_HOUR)) / CommonDefine_1.SECOND_PER_HOUR, t];
    }
  },
  3: t => {
    if (t >= CommonDefine_1.SECOND_PER_DAY) {
      return [(t - (t = t % CommonDefine_1.SECOND_PER_DAY)) / CommonDefine_1.SECOND_PER_DAY, t];
    }
  }
}; //# sourceMappingURL=TimeUtil.js.map