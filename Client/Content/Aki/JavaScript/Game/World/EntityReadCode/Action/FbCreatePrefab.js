"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCreatePrefab = undefined;
const UnionPrefabConfigHelper_1 = require("./UnionPrefabConfigHelper");
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbCreatePrefab {
  constructor(e) {
    this.FbDataInternal = e;
    this.ISh = false;
    this.TSh = 0;
    this.bSh = false;
    this.TAe = undefined;
    this.qph = false;
    this.kph = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbCreatePrefab(e);
    }
  }
  get PosEntityId() {
    if (!this.ISh) {
      this.ISh = true;
      this.TSh = this.FbDataInternal.posEntityId();
    }
    return this.TSh;
  }
  get Config() {
    var e;
    var t;
    if (!this.bSh && (this.bSh = true, e = this.FbDataInternal.configType(), t = UnionPrefabConfigHelper_1.UnionPrefabConfigHelper.GetUnionPrefabConfigObject(e))) {
      this.TAe = UnionPrefabConfigHelper_1.UnionPrefabConfigHelper.ReadUnionPrefabConfig(e, this.FbDataInternal.config(t));
    }
    return this.TAe;
  }
  get VarName() {
    var e;
    var t;
    if (!this.qph && (this.qph = true, e = this.FbDataInternal.varNameType(), t = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(e))) {
      this.kph = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(e, this.FbDataInternal.varName(t));
    }
    return this.kph;
  }
}
exports.FbCreatePrefab = FbCreatePrefab;
//# sourceMappingURL=FbCreatePrefab.js.map