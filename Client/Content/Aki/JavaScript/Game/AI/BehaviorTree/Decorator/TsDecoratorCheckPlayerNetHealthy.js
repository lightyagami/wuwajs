"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorCheckPlayerNetHealthy extends UE.BTDecorator_BlueprintBase {
  Constructor() {}
  PerformConditionCheckAI(e, r) {
    var o = e.AiController;
    if (o) {
      o = o.CharAiDesignComp.Entity.GetComponent(0).GetPlayerId();
      return ControllerHolder_1.ControllerHolder.OnlineController.CheckPlayerNetHealthy(o);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      return false;
    }
  }
}
exports.default = TsDecoratorCheckPlayerNetHealthy;
//# sourceMappingURL=TsDecoratorCheckPlayerNetHealthy.js.map