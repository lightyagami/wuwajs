"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSplineComponent = undefined;
const UnionSplineOptionHelper_1 = require("./UnionSplineOptionHelper");
class FbSplineComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.s_h = false;
    this.Hye = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSplineComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Option() {
    var t;
    var i;
    if (!this.s_h && (this.s_h = true, t = this.FbDataInternal.optionType(), i = UnionSplineOptionHelper_1.UnionSplineOptionHelper.GetUnionSplineOptionObject(t))) {
      this.Hye = UnionSplineOptionHelper_1.UnionSplineOptionHelper.ReadUnionSplineOption(t, this.FbDataInternal.option(i));
    }
    return this.Hye;
  }
}
exports.FbSplineComponent = FbSplineComponent;
//# sourceMappingURL=FbSplineComponent.js.map