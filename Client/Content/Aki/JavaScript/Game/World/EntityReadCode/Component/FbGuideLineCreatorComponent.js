"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGuideLineCreatorComponent = undefined;
const FbGuideLineCreatorScanOption_1 = require("./FbGuideLineCreatorScanOption");
const UnionColorChangeStrategyOfSplineEffectHelper_1 = require("./UnionColorChangeStrategyOfSplineEffectHelper");
class FbGuideLineCreatorComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.R5h = false;
    this.w5h = undefined;
    this.kuh = false;
    this.Guh = 0;
    this.P5h = false;
    this.U5h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbGuideLineCreatorComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get ColorChangeOption() {
    var t;
    var e;
    if (!this.R5h && (this.R5h = true, t = this.FbDataInternal.colorChangeOptionType(), e = UnionColorChangeStrategyOfSplineEffectHelper_1.UnionColorChangeStrategyOfSplineEffectHelper.GetUnionColorChangeStrategyOfSplineEffectObject(t))) {
      this.w5h = UnionColorChangeStrategyOfSplineEffectHelper_1.UnionColorChangeStrategyOfSplineEffectHelper.ReadUnionColorChangeStrategyOfSplineEffect(t, this.FbDataInternal.colorChangeOption(e));
    }
    return this.w5h;
  }
  get SplineEntityId() {
    if (!this.kuh) {
      this.kuh = true;
      this.Guh = this.FbDataInternal.splineEntityId();
    }
    return this.Guh;
  }
  get ScanOption() {
    if (!this.P5h) {
      this.P5h = true;
      this.U5h = FbGuideLineCreatorScanOption_1.FbGuideLineCreatorScanOption.Create(this.FbDataInternal.scanOption());
    }
    return this.U5h;
  }
}
exports.FbGuideLineCreatorComponent = FbGuideLineCreatorComponent;
//# sourceMappingURL=FbGuideLineCreatorComponent.js.map