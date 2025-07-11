"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRotatorEntity = undefined;
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbRotatorEntity {
  constructor(t) {
    this.FbDataInternal = t;
    this.AEh = false;
    this.PW = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRotatorEntity(t);
    }
  }
  get Entity() {
    var t;
    var e;
    if (!this.AEh && (this.AEh = true, t = this.FbDataInternal.entityType(), e = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.PW = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.entity(e));
    }
    return this.PW;
  }
}
exports.FbRotatorEntity = FbRotatorEntity;
//# sourceMappingURL=FbRotatorEntity.js.map