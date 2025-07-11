"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiDecoratorCheckTodTimePeriod = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TimeOfDayDefine_1 = require("../../../Module/TimeOfDay/TimeOfDayDefine");
const LevelAiDecorator_1 = require("../LevelAiDecorator");
const DAYTIME_HOUR_START = 6;
const DAYTIME_HOUR_END = 18;
const NIGHT_HOUR_START = 18;
const NIGHT_HOUR_END = 6;
class LevelAiDecoratorCheckTodTimePeriod extends LevelAiDecorator_1.LevelAiDecorator {
  OnExecutionStart() {
    this.CheckConditionOnTick = true;
  }
  CheckCondition(e) {
    var r = this.Params;
    if (!r) {
      return false;
    }
    let i = 0;
    let o = 0;
    o = r.TimePeriod === "DayTime" ? (i = DAYTIME_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR, DAYTIME_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR) : (i = NIGHT_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR, NIGHT_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
    var T = ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(i, o);
    if (r.Compare === "Eq") {
      return T;
    } else {
      return !T;
    }
  }
}
exports.LevelAiDecoratorCheckTodTimePeriod = LevelAiDecoratorCheckTodTimePeriod;
//# sourceMappingURL=LevelAiDecoratorCheckTodTimePeriod.js.map