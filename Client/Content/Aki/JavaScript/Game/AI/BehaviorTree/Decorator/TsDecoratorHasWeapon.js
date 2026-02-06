"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
class TsDecoratorHasWeapon extends UE.BTDecorator_BlueprintBase {
  Constructor() {}
  PerformConditionCheckAI(e, o) {
    var r = e.AiController;
    if (r) {
      return r.CharActorComp.Entity.GetComponent(86).HasWeapon;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      return false;
    }
  }
}
exports.default = TsDecoratorHasWeapon;
//# sourceMappingURL=TsDecoratorHasWeapon.js.map