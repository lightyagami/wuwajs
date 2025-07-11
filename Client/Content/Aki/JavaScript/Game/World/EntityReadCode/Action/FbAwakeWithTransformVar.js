"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAwakeWithTransformVar = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbAwakeWithTransformVar {
  constructor(r) {
    this.FbDataInternal = r;
    this.u_h = false;
    this.f8o = undefined;
    this.z11 = false;
    this.J11 = undefined;
  }
  static Create(r) {
    if (r) {
      return new FbAwakeWithTransformVar(r);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TransformVar() {
    var r;
    var t;
    if (!this.z11 && (this.z11 = true, r = this.FbDataInternal.transformVarType(), t = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(r))) {
      this.J11 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(r, this.FbDataInternal.transformVar(t));
    }
    return this.J11;
  }
}
exports.FbAwakeWithTransformVar = FbAwakeWithTransformVar;
//# sourceMappingURL=FbAwakeWithTransformVar.js.map