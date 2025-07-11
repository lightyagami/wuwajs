"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorDayStateCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.BlackboardKey = "DayState";
    this.CheckValue = 0;
    this.IsCollected = false;
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
    this.TsCheckValue = 0;
  }
  Constructor() {
    this.IsCollected = false;
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
    this.TsCheckValue = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKey = this.BlackboardKey;
      this.TsCheckValue = this.CheckValue;
    }
  }
  PerformConditionCheckAI(t, e) {
    var r = t.AiController;
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      return false;
    }
    this.InitTsVariables();
    if (!this.IsCollected) {
      if (t = r.NpcDecision) {
        this.IsCollected = true;
        t.CheckDayState = true;
      }
    }
    t = r.CharActorComp;
    return !!t && (r = t.Entity.Id, ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(r, this.TsBlackboardKey) === this.TsCheckValue);
  }
}
exports.default = TsDecoratorDayStateCheck;
//# sourceMappingURL=TsDecoratorDayStateCheck.js.map