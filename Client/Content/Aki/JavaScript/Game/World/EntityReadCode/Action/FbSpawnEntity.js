"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSpawnEntity = undefined;
const FbTransform_1 = require("./FbTransform");
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbSpawnEntity {
  constructor(t) {
    this.FbDataInternal = t;
    this.Pph = false;
    this.Uph = 0;
    this.bph = false;
    this.Lph = undefined;
    this.Dph = false;
    this.Bph = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSpawnEntity(t);
    }
  }
  get EntityDataId() {
    if (!this.Pph) {
      this.Pph = true;
      this.Uph = this.FbDataInternal.entityDataId();
    }
    return this.Uph;
  }
  get Transform() {
    if (!this.bph) {
      this.bph = true;
      this.Lph = FbTransform_1.FbTransform.Create(this.FbDataInternal.transform());
    }
    return this.Lph;
  }
  get Save() {
    var t;
    var i;
    if (!this.Dph && (this.Dph = true, t = this.FbDataInternal.saveType(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.Bph = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.save(i));
    }
    return this.Bph;
  }
}
exports.FbSpawnEntity = FbSpawnEntity;
//# sourceMappingURL=FbSpawnEntity.js.map