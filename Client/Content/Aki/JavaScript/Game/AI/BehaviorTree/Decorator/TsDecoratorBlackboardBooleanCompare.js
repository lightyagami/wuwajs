"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorBlackboardBooleanCompare extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.BlackboardKey = "";
    this.CompareValue = false;
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
    this.TsCompareValue = false;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
    this.TsCompareValue = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKey = this.BlackboardKey;
      this.TsCompareValue = this.CompareValue;
    }
  }
  PerformConditionCheckAI(o, r) {
    var e = o.AiController;
    if (e) {
      return !!(e = e.CharAiDesignComp) && (this.InitTsVariables(), ControllerHolder_1.ControllerHolder.BlackboardController.GetBooleanValueByEntity(e.Entity.Id, this.TsBlackboardKey) ? this.TsCompareValue : !this.TsCompareValue);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", o.GetClass().GetName()]);
      }
      return false;
    }
  }
}
exports.default = TsDecoratorBlackboardBooleanCompare;
//# sourceMappingURL=TsDecoratorBlackboardBooleanCompare.js.map