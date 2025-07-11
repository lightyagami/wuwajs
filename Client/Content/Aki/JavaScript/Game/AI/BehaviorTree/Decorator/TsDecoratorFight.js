"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
class TsDecoratorFight extends UE.BTDecorator_BlueprintBase {
  Constructor() {}
  PerformConditionCheckAI(e, r) {
    e = e.AiController?.AiHateList.GetCurrentTarget()?.Valid;
    return e || false;
  }
}
exports.default = TsDecoratorFight;
//# sourceMappingURL=TsDecoratorFight.js.map