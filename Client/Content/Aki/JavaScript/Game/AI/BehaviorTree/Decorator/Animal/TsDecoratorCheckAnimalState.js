"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const GlobalData_1 = require("../../../../GlobalData");
class TsDecoratorCheckAnimalState extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.State = 0;
    this.Inverse = false;
    this.IsInitTsVariables = false;
    this.TsState = 0;
    this.TsInverse = false;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsState = 0;
    this.TsInverse = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsState = this.State;
      this.TsInverse = this.Inverse;
    }
  }
  PerformConditionCheckAI(t, e) {
    var s = t.AiController;
    if (!s) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      return false;
    }
    this.InitTsVariables();
    t = s.CharActorComp.Entity.GetComponent(14);
    if (this.TsInverse) {
      return t.CurrentState() !== this.TsState;
    } else {
      return t.CurrentState() === this.TsState;
    }
  }
}
exports.default = TsDecoratorCheckAnimalState;
//# sourceMappingURL=TsDecoratorCheckAnimalState.js.map