"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorGeneralConditionCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.ConditionGroupId = "";
    this.CompareValue = true;
    this.IsInitTsVariables = false;
    this.TsConditionGroupId = "";
    this.TsCompareValue = false;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsConditionGroupId = "";
    this.TsCompareValue = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsConditionGroupId = this.ConditionGroupId;
      this.TsCompareValue = this.CompareValue;
    }
  }
  PerformConditionCheckAI(t, e) {
    this.InitTsVariables();
    return !!this.TsConditionGroupId && ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(this.TsConditionGroupId, undefined) === this.TsCompareValue;
  }
}
exports.default = TsDecoratorGeneralConditionCheck;
//# sourceMappingURL=TsDecoratorGeneralConditionCheck.js.map