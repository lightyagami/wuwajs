"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNoRenderPortalComponent = undefined;
const UnionNoRenderPortalConfigHelper_1 = require("./UnionNoRenderPortalConfigHelper");
class FbNoRenderPortalComponent {
  constructor(e) {
    this.FbDataInternal = e;
    this.q_h = false;
    this.k_h = false;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbNoRenderPortalComponent(e);
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
    if (!this.bSh && (this.bSh = true, e = this.FbDataInternal.configType(), t = UnionNoRenderPortalConfigHelper_1.UnionNoRenderPortalConfigHelper.GetUnionNoRenderPortalConfigObject(e))) {
      this.TAe = UnionNoRenderPortalConfigHelper_1.UnionNoRenderPortalConfigHelper.ReadUnionNoRenderPortalConfig(e, this.FbDataInternal.config(t));
    }
    return this.TAe;
  }
}
exports.FbNoRenderPortalComponent = FbNoRenderPortalComponent;
//# sourceMappingURL=FbNoRenderPortalComponent.js.map