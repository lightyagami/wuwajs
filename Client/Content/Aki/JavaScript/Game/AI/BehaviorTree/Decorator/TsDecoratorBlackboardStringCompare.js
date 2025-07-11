"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorBlackboardStringCompare extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.BlackboardKey = "";
    this.Positive = false;
    this.Exactly = false;
    this.CompareValue = "";
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
    this.TsPositive = false;
    this.TsExactly = false;
    this.TsCompareValue = "";
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
    this.TsPositive = false;
    this.TsExactly = false;
    this.TsCompareValue = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKey = this.BlackboardKey;
      this.TsPositive = this.Positive;
      this.TsExactly = this.Exactly;
      this.TsCompareValue = this.CompareValue;
    }
  }
  PerformConditionCheckAI(t, r) {
    var s = t.AiController;
    if (!s) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      return false;
    }
    t = s.CharAiDesignComp;
    if (!t) {
      return false;
    }
    this.InitTsVariables();
    s = ControllerHolder_1.ControllerHolder.BlackboardController.GetStringValueByEntity(t.Entity.Id, this.TsBlackboardKey);
    return (this.TsExactly ? s === this.TsCompareValue : s.includes(this.TsCompareValue)) === this.TsPositive;
  }
}
exports.default = TsDecoratorBlackboardStringCompare;
//# sourceMappingURL=TsDecoratorBlackboardStringCompare.js.map