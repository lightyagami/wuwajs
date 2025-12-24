"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorBlackboardIntCompare extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.BlackboardKey = "";
    this.Operation = 0;
    this.CompareValue = 0;
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
    this.TsOperation = 0;
    this.TsCompareValue = 0;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
    this.TsOperation = 0;
    this.TsCompareValue = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKey = this.BlackboardKey;
      this.TsOperation = this.Operation;
      this.TsCompareValue = this.CompareValue;
    }
  }
  PerformConditionCheckAI(t, r) {
    var e = t.AiController;
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      return false;
    }
    t = e.CharAiDesignComp;
    if (!t) {
      return false;
    }
    this.InitTsVariables();
    let s = undefined;
    e = t.Entity.GetComponent(79);
    s = (s = (s = e ? e.StateMachineGroup?.GetCustomBlackboard(this.TsBlackboardKey) : s) === undefined ? ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(t.Entity.Id, this.TsBlackboardKey) : s) || 0;
    switch (this.TsOperation) {
      case 0:
        return s === this.TsCompareValue;
      case 1:
        return s !== this.TsCompareValue;
      case 2:
        return s < this.TsCompareValue;
      case 3:
        return s <= this.TsCompareValue;
      case 4:
        return s > this.TsCompareValue;
      case 5:
        return s >= this.TsCompareValue;
      default:
        return false;
    }
  }
}
exports.default = TsDecoratorBlackboardIntCompare;
//# sourceMappingURL=TsDecoratorBlackboardIntCompare.js.map