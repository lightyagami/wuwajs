"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbConstVarRef = undefined;
const UnionVarConfigHelper_1 = require("./UnionVarConfigHelper");
class FbConstVarRef {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.bZh = false;
    this.LZh = undefined;
    this.kmh = false;
    this.Gmh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbConstVarRef(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Source() {
    if (!this.bZh) {
      this.bZh = true;
      this.LZh = this.FbDataInternal.source();
    }
    return this.LZh;
  }
  get Value() {
    var t;
    var i;
    if (!this.kmh && (this.kmh = true, t = this.FbDataInternal.valueType(), i = UnionVarConfigHelper_1.UnionVarConfigHelper.GetUnionVarConfigObject(t))) {
      this.Gmh = UnionVarConfigHelper_1.UnionVarConfigHelper.ReadUnionVarConfig(t, this.FbDataInternal.value(i));
    }
    return this.Gmh;
  }
}
exports.FbConstVarRef = FbConstVarRef;
//# sourceMappingURL=FbConstVarRef.js.map