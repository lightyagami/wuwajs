"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorBlackboard extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.BlackboardKeyName = "";
    this.IsSet = false;
    this.IsInitTsVariables = false;
    this.TsBlackboardKeyName = "";
    this.TsIsSet = false;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsBlackboardKeyName = "";
    this.TsIsSet = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKeyName = this.BlackboardKeyName;
      this.TsIsSet = this.IsSet;
    }
  }
  PerformConditionCheckAI(r, t) {
    var e = r.AiController;
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", r.GetClass().GetName()]);
      }
      return false;
    }
    this.InitTsVariables();
    r = ControllerHolder_1.ControllerHolder.BlackboardController.HasValueByEntity(e.CharAiDesignComp.Entity.Id, this.TsBlackboardKeyName);
    return this.TsIsSet === r;
  }
}
exports.default = TsDecoratorBlackboard;
//# sourceMappingURL=TsDecoratorBlackboard.js.map