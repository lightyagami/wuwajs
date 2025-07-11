"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAiGearStrategyComponent = undefined;
const UnionAiGearStrategyHelper_1 = require("./UnionAiGearStrategyHelper");
class FbAiGearStrategyComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.G$h = false;
    this.O$h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAiGearStrategyComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get StrategyType() {
    var t;
    var e;
    if (!this.G$h && (this.G$h = true, t = this.FbDataInternal.strategyTypeType(), e = UnionAiGearStrategyHelper_1.UnionAiGearStrategyHelper.GetUnionAiGearStrategyObject(t))) {
      this.O$h = UnionAiGearStrategyHelper_1.UnionAiGearStrategyHelper.ReadUnionAiGearStrategy(t, this.FbDataInternal.strategyType(e));
    }
    return this.O$h;
  }
}
exports.FbAiGearStrategyComponent = FbAiGearStrategyComponent;
//# sourceMappingURL=FbAiGearStrategyComponent.js.map