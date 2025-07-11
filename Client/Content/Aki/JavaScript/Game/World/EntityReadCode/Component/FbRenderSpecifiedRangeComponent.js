"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRenderSpecifiedRangeComponent = undefined;
const UnionRenderSpecifiedRangeConfigHelper_1 = require("./UnionRenderSpecifiedRangeConfigHelper");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbRenderSpecifiedRangeComponent {
  constructor(e) {
    this.FbDataInternal = e;
    this.q_h = false;
    this.k_h = false;
    this.f_h = false;
    this.X6o = undefined;
    this.qKh = false;
    this.kKh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbRenderSpecifiedRangeComponent(e);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get RenderConfig() {
    var e;
    var i;
    if (!this.qKh && (this.qKh = true, e = this.FbDataInternal.renderConfigType(), i = UnionRenderSpecifiedRangeConfigHelper_1.UnionRenderSpecifiedRangeConfigHelper.GetUnionRenderSpecifiedRangeConfigObject(e))) {
      this.kKh = UnionRenderSpecifiedRangeConfigHelper_1.UnionRenderSpecifiedRangeConfigHelper.ReadUnionRenderSpecifiedRangeConfig(e, this.FbDataInternal.renderConfig(i));
    }
    return this.kKh;
  }
}
exports.FbRenderSpecifiedRangeComponent = FbRenderSpecifiedRangeComponent;
//# sourceMappingURL=FbRenderSpecifiedRangeComponent.js.map