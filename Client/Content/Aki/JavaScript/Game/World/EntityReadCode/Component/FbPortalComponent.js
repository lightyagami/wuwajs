"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPortalComponent = undefined;
const UnionPortalConfigHelper_1 = require("./UnionPortalConfigHelper");
class FbPortalComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPortalComponent(t);
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
    var t;
    var i;
    if (!this.bSh && (this.bSh = true, t = this.FbDataInternal.configType(), i = UnionPortalConfigHelper_1.UnionPortalConfigHelper.GetUnionPortalConfigObject(t))) {
      this.TAe = UnionPortalConfigHelper_1.UnionPortalConfigHelper.ReadUnionPortalConfig(t, this.FbDataInternal.config(i));
    }
    return this.TAe;
  }
}
exports.FbPortalComponent = FbPortalComponent;
//# sourceMappingURL=FbPortalComponent.js.map