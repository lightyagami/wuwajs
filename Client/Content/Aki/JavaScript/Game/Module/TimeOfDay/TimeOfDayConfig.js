"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeOfDayConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const DaySelectPresetAll_1 = require("../../../Core/Define/ConfigQuery/DaySelectPresetAll");
const DaySelectPresetById_1 = require("../../../Core/Define/ConfigQuery/DaySelectPresetById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const TimeOfDayById_1 = require("../../../Core/Define/ConfigQuery/TimeOfDayById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const TimeOfDayDefine_1 = require("./TimeOfDayDefine");
const TimeOfDayModel_1 = require("./TimeOfDayModel");
class TimeOfDayConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.iTo = [];
    this.oTo = [];
  }
  rTo() {
    return TimeOfDayById_1.configTimeOfDayById.GetConfig(1);
  }
  GetInitTimeSecond() {
    return (this.rTo()?.InitTime ?? 0) * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE;
  }
  GetMaxV() {
    return TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE * (this.rTo()?.V ?? 0);
  }
  GetA() {
    return TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE * (this.rTo()?.A ?? 0);
  }
  GetRate() {
    var e = this.rTo()?.Rate;
    return e || (Log_1.Log.CheckError() && Log_1.Log.Error("TimeOfDay", 16, "时间流速比未配置"), 0);
  }
  InitDayStateTimeSpanList() {
    var e = this.rTo()?.StateSpan;
    return !!e && !(e.size <= 0) && !(this.iTo = Array.from(e), this.iTo.sort((e, i) => e[0] < i[0] ? 1 : 0), 0);
  }
  GetDayStateByGameTimeMinute(t) {
    if (this.iTo.length === 0 && !this.InitDayStateTimeSpanList()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TimeOfDay", 16, "时间区间配置错误");
      }
      return 0;
    }
    let r = 0;
    this.iTo.every((e, i) => !TimeOfDayModel_1.TodDayTime.CheckInMinuteSpan(t, e) || (r = i, false));
    if (r >= 4) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TimeOfDay", 16, "时间区间配置超出范围");
      }
      return 0;
    } else {
      return r;
    }
  }
  GetBanGamePlayTags() {
    if (!(this.oTo.length > 0)) {
      var e = this.rTo()?.BanTag;
      if (e) {
        for (const t of e) {
          var i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(t);
          if (i) {
            this.oTo.push(i);
          }
        }
      }
    }
    return this.oTo;
  }
  GetTimePresets() {
    return this.rTo()?.TimePreset ?? undefined;
  }
  GetDayTimeChangePresets() {
    return DaySelectPresetAll_1.configDaySelectPresetAll.GetConfigList();
  }
  GetDayTimeChangeConfig(e) {
    e = DaySelectPresetById_1.configDaySelectPresetById.GetConfig(e);
    if (e) {
      return e;
    }
  }
  GetTimeChangeText(e) {
    e = this.GetDayTimeChangeConfig(e);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title) ?? "";
  }
}
exports.TimeOfDayConfig = TimeOfDayConfig;
//# sourceMappingURL=TimeOfDayConfig.js.map