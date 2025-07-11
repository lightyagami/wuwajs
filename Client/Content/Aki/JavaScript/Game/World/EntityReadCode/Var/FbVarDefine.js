"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVarDefine = undefined;
const UnionVarConfigHelper_1 = require("./UnionVarConfigHelper");
class FbVarDefine {
  constructor(t) {
    this.FbDataInternal = t;
    this.x_h = false;
    this.FGi = undefined;
    this.u_h = false;
    this.f8o = undefined;
    this.kmh = false;
    this.Gmh = undefined;
    this.qZh = false;
    this.kZh = undefined;
    this.GZh = false;
    this.OZh = false;
    this.FZh = false;
    this.NZh = false;
  }
  static Create(t) {
    if (t) {
      return new FbVarDefine(t);
    }
  }
  get Name() {
    if (!this.x_h) {
      this.x_h = true;
      this.FGi = this.FbDataInternal.name();
    }
    return this.FGi;
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Value() {
    var t;
    var i;
    if (!this.kmh && (this.kmh = true, t = this.FbDataInternal.valueType(), i = UnionVarConfigHelper_1.UnionVarConfigHelper.GetUnionVarConfigObject(t))) {
      this.Gmh = UnionVarConfigHelper_1.UnionVarConfigHelper.ReadUnionVarConfig(t, this.FbDataInternal.value(i));
    }
    return this.Gmh;
  }
  get Access() {
    if (!this.qZh) {
      this.qZh = true;
      this.kZh = this.FbDataInternal.access();
    }
    return this.kZh;
  }
  get IsIgnoreOnRollBack() {
    if (!this.GZh) {
      this.GZh = true;
      this.OZh = this.FbDataInternal.isIgnoreOnRollBack();
    }
    return this.OZh;
  }
  get IsClient() {
    if (!this.FZh) {
      this.FZh = true;
      this.NZh = this.FbDataInternal.isClient();
    }
    return this.NZh;
  }
}
exports.FbVarDefine = FbVarDefine;
//# sourceMappingURL=FbVarDefine.js.map