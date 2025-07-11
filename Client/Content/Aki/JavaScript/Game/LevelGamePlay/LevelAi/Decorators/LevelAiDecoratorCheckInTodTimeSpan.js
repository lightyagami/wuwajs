"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiDecoratorCheckInTodTimeSpan = undefined;
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const LevelAiDecorator_1 = require("../LevelAiDecorator");
class LevelAiDecoratorCheckInTodTimeSpan extends LevelAiDecorator_1.LevelAiDecorator {
  OnExecutionStart() {
    this.CheckConditionOnTick = true;
  }
  CheckCondition(e) {
    var o;
    var r;
    var n = this.Params;
    return !!n.Start && !!n.End && (r = n.Start.Hour * CommonDefine_1.MINUTE_PER_HOUR + n.Start.Min, o = n.End.Hour * CommonDefine_1.MINUTE_PER_HOUR + n.End.Min, r = ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(r, o), n.Compare === "Eq" ? r : !r);
  }
}
exports.LevelAiDecoratorCheckInTodTimeSpan = LevelAiDecoratorCheckInTodTimeSpan;
//# sourceMappingURL=LevelAiDecoratorCheckInTodTimeSpan.js.map