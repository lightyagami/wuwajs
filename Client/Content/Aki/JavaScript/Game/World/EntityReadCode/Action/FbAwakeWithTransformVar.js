"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbAwakeWithTransformVar = void 0;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbAwakeWithTransformVar {
  constructor(r) {
    this.FbDataInternal = r, this.u_h = !1, this.f8o = void 0, this.P11 = !1, this.x11 = void 0
  }
  static Create(r) {
    if (r) return new FbAwakeWithTransformVar(r)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get TransformVar() {
    var r, t;
    return !this.P11 && (this.P11 = !0, r = this.FbDataInternal.transformVarType(), t = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(r)) && (this.x11 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(r, this.FbDataInternal.transformVar(t))), this.x11
  }
}
exports.FbAwakeWithTransformVar = FbAwakeWithTransformVar;
//# sourceMappingURL=FbAwakeWithTransformVar.js.map