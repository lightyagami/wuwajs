"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
class TsDecoratorCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.CheckValue = "";
  }
  Constructor() {}
  PerformConditionCheckAI(e, r) {
    return true;
  }
}
exports.default = TsDecoratorCheck;
//# sourceMappingURL=TsDecoratorCheck.js.map