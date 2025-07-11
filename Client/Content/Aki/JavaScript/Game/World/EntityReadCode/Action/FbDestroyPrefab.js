"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDestroyPrefab = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbDestroyPrefab {
  constructor(e) {
    this.FbDataInternal = e;
    this.qph = false;
    this.kph = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbDestroyPrefab(e);
    }
  }
  get VarName() {
    var e;
    var r;
    if (!this.qph && (this.qph = true, e = this.FbDataInternal.varNameType(), r = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(e))) {
      this.kph = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(e, this.FbDataInternal.varName(r));
    }
    return this.kph;
  }
}
exports.FbDestroyPrefab = FbDestroyPrefab;
//# sourceMappingURL=FbDestroyPrefab.js.map