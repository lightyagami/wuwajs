"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetGlobalTimeScale = undefined;
const UnionSetGlobalTimeScaleHelper_1 = require("./UnionSetGlobalTimeScaleHelper");
class FbSetGlobalTimeScale {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbSetGlobalTimeScale(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Config() {
    var e;
    var t;
    if (!this.bSh && (this.bSh = true, e = this.FbDataInternal.configType(), t = UnionSetGlobalTimeScaleHelper_1.UnionSetGlobalTimeScaleHelper.GetUnionSetGlobalTimeScaleObject(e))) {
      this.TAe = UnionSetGlobalTimeScaleHelper_1.UnionSetGlobalTimeScaleHelper.ReadUnionSetGlobalTimeScale(e, this.FbDataInternal.config(t));
    }
    return this.TAe;
  }
}
exports.FbSetGlobalTimeScale = FbSetGlobalTimeScale;
//# sourceMappingURL=FbSetGlobalTimeScale.js.map