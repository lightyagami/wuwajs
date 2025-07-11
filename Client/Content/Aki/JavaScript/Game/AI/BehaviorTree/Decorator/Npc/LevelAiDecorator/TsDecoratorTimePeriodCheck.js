"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const GlobalData_1 = require("../../../../../GlobalData");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const TimeOfDayDefine_1 = require("../../../../../Module/TimeOfDay/TimeOfDayDefine");
const DAYTIME_HOUR_START = 6;
const DAYTIME_HOUR_END = 18;
const NIGHT_HOUR_START = 18;
const NIGHT_HOUR_END = 6;
class TsDecoratorTimePeriodCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.CheckType = 0;
    this.TimePeriod = "";
    this.IsInitTsVariables = false;
    this.TsCheckType = 0;
    this.TsTimePeriod = "";
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsCheckType = 0;
    this.TsTimePeriod = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsCheckType = this.CheckType;
      this.TsTimePeriod = this.TimePeriod;
    }
  }
  PerformConditionCheckAI(e, r) {
    if (!e.AiController) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      return false;
    }
    this.InitTsVariables();
    let i = 0;
    let t = 0;
    t = this.TsTimePeriod === "DayTime" ? (i = DAYTIME_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR, DAYTIME_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR) : (i = NIGHT_HOUR_START * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR, NIGHT_HOUR_END * TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR);
    var o = ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(i, t);
    switch (this.TsCheckType) {
      case 0:
        return o;
      case 1:
        return !o;
      default:
        return false;
    }
  }
}
exports.default = TsDecoratorTimePeriodCheck;
//# sourceMappingURL=TsDecoratorTimePeriodCheck.js.map