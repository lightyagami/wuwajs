"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRandomVar = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbRandomVar {
  constructor(t) {
    this.FbDataInternal = t;
    this.J1h = false;
    this.Z1h = undefined;
    this.ech = false;
    this.tch = undefined;
    this.Y1h = false;
    this.z1h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRandomVar(t);
    }
  }
  get LeftVar() {
    var t;
    var e;
    if (!this.J1h && (this.J1h = true, t = this.FbDataInternal.leftVarType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.Z1h = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.leftVar(e));
    }
    return this.Z1h;
  }
  get RightVar() {
    var t;
    var e;
    if (!this.ech && (this.ech = true, t = this.FbDataInternal.rightVarType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.tch = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.rightVar(e));
    }
    return this.tch;
  }
  get Result() {
    var t;
    var e;
    if (!this.Y1h && (this.Y1h = true, t = this.FbDataInternal.resultType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.z1h = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.result(e));
    }
    return this.z1h;
  }
}
exports.FbRandomVar = FbRandomVar;
//# sourceMappingURL=FbRandomVar.js.map