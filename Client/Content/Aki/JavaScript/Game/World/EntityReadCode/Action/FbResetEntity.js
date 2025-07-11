"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbResetEntity = undefined;
const UnionResetEntityConfigHelper_1 = require("./UnionResetEntityConfigHelper");
class FbResetEntity {
  constructor(t) {
    this.FbDataInternal = t;
    this.BAh = false;
    this.qAh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbResetEntity(t);
    }
  }
  get ResetEntityConfig() {
    var t;
    var e;
    if (!this.BAh && (this.BAh = true, t = this.FbDataInternal.resetEntityConfigType(), e = UnionResetEntityConfigHelper_1.UnionResetEntityConfigHelper.GetUnionResetEntityConfigObject(t))) {
      this.qAh = UnionResetEntityConfigHelper_1.UnionResetEntityConfigHelper.ReadUnionResetEntityConfig(t, this.FbDataInternal.resetEntityConfig(e));
    }
    return this.qAh;
  }
}
exports.FbResetEntity = FbResetEntity;
//# sourceMappingURL=FbResetEntity.js.map