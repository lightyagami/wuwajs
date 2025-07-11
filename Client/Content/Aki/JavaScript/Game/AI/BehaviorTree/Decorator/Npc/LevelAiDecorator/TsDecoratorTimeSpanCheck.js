"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine");
const GlobalData_1 = require("../../../../../GlobalData");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
class TsDecoratorTimeSpanCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.CheckType = 0;
    this.StartTime = new UE.Timecode();
    this.EndTime = new UE.Timecode();
    this.IsInitTsVariables = false;
    this.TsCheckType = 0;
    this.TsStartTime = new UE.Timecode();
    this.TsEndTime = new UE.Timecode();
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsCheckType = 0;
    this.TsStartTime = new UE.Timecode();
    this.TsEndTime = new UE.Timecode();
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsCheckType = this.CheckType;
      this.TsStartTime = this.StartTime;
      this.TsEndTime = this.EndTime;
    }
  }
  PerformConditionCheckAI(e, t) {
    if (!e.AiController) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      return false;
    }
    this.InitTsVariables();
    var e = this.TsStartTime.Hours * CommonDefine_1.MINUTE_PER_HOUR + this.TsStartTime.Minutes;
    var r = this.TsEndTime.Hours * CommonDefine_1.MINUTE_PER_HOUR + this.TsEndTime.Minutes;
    var o = ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(e, r);
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
exports.default = TsDecoratorTimeSpanCheck;
//# sourceMappingURL=TsDecoratorTimeSpanCheck.js.map