"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
class TsDecoratorWander extends UE.BTDecorator_BlueprintBase {
  Constructor() {}
  PerformConditionCheckAI(e, r) {
    var o = e.AiController;
    if (o) {
      return !o.AiHateList.GetCurrentTarget()?.Valid && !o.CharActorComp.Entity.CheckGetComponent(215).HasTag(-1371021686);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      return false;
    }
  }
}
exports.default = TsDecoratorWander;
//# sourceMappingURL=TsDecoratorWander.js.map