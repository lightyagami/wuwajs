"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDynamicPortalCreatorComponent = undefined;
const UnionDynamicPortalCreateHelper_1 = require("./UnionDynamicPortalCreateHelper");
class FbDynamicPortalCreatorComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.I$h = false;
    this.T$h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDynamicPortalCreatorComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Model() {
    var t;
    var e;
    if (!this.I$h && (this.I$h = true, t = this.FbDataInternal.modelType(), e = UnionDynamicPortalCreateHelper_1.UnionDynamicPortalCreateHelper.GetUnionDynamicPortalCreateObject(t))) {
      this.T$h = UnionDynamicPortalCreateHelper_1.UnionDynamicPortalCreateHelper.ReadUnionDynamicPortalCreate(t, this.FbDataInternal.model(e));
    }
    return this.T$h;
  }
}
exports.FbDynamicPortalCreatorComponent = FbDynamicPortalCreatorComponent;
//# sourceMappingURL=FbDynamicPortalCreatorComponent.js.map