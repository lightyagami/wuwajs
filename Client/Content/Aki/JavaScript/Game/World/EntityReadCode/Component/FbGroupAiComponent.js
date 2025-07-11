"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGroupAiComponent = undefined;
const UnionGroupAiOptionHelper_1 = require("./UnionGroupAiOptionHelper");
class FbGroupAiComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Ayh = false;
    this.xyh = undefined;
    this.s_h = false;
    this.Hye = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbGroupAiComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Entities() {
    if (!this.Ayh) {
      this.Ayh = true;
      this.xyh = new Array();
      var i = this.FbDataInternal.entitiesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.xyh.push(this.FbDataInternal.entities(t));
        }
      }
    }
    return this.xyh;
  }
  get Option() {
    var t;
    var i;
    if (!this.s_h && (this.s_h = true, t = this.FbDataInternal.optionType(), i = UnionGroupAiOptionHelper_1.UnionGroupAiOptionHelper.GetUnionGroupAiOptionObject(t))) {
      this.Hye = UnionGroupAiOptionHelper_1.UnionGroupAiOptionHelper.ReadUnionGroupAiOption(t, this.FbDataInternal.option(i));
    }
    return this.Hye;
  }
}
exports.FbGroupAiComponent = FbGroupAiComponent;
//# sourceMappingURL=FbGroupAiComponent.js.map