"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEffectAreaComponent = undefined;
const UnionEffectAreaConfigHelper_1 = require("./UnionEffectAreaConfigHelper");
class FbEffectAreaComponent {
  constructor(e) {
    this.FbDataInternal = e;
    this.q_h = false;
    this.k_h = false;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbEffectAreaComponent(e);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Config() {
    var e;
    var t;
    if (!this.bSh && (this.bSh = true, e = this.FbDataInternal.configType(), t = UnionEffectAreaConfigHelper_1.UnionEffectAreaConfigHelper.GetUnionEffectAreaConfigObject(e))) {
      this.TAe = UnionEffectAreaConfigHelper_1.UnionEffectAreaConfigHelper.ReadUnionEffectAreaConfig(e, this.FbDataInternal.config(t));
    }
    return this.TAe;
  }
}
exports.FbEffectAreaComponent = FbEffectAreaComponent;
//# sourceMappingURL=FbEffectAreaComponent.js.map