"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
class TsDecoratorCheckFsmState extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.State = "";
  }
  Constructor() {}
  PerformConditionCheckAI(e, r) {
    var o = e.AiController;
    if (o) {
      return !!(o = o.CharActorComp.Entity.GetComponent(81).StateMachineGroup.GetNodeByName(this.State)) && o.Activated;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      return false;
    }
  }
}
exports.default = TsDecoratorCheckFsmState;
//# sourceMappingURL=TsDecoratorCheckFsmState.js.map