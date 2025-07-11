"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckTodTimePeriod = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const TimeOfDayDefine_1 = require("../../Module/TimeOfDay/TimeOfDayDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const DAYTIME_HOUR_START = 6;
const DAYTIME_HOUR_END = 18;
const NIGHT_HOUR_START = 18;
const NIGHT_HOUR_END = 6;
class LevelConditionCheckTodTimePeriod extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) {
      return false;
    }
    let i = 0;
    let T = 0;
    T = e.TimePeriod === "DayTime" ? (i = DAYTIME_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR, DAYTIME_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR) : (i = NIGHT_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR, NIGHT_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
    var _ = ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(i, T);
    if (e.Compare === "Eq") {
      return _;
    } else {
      return !_;
    }
  }
}
exports.LevelConditionCheckTodTimePeriod = LevelConditionCheckTodTimePeriod;
//# sourceMappingURL=LevelConditionCheckTodTimePeriod.js.map