"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSummonEntity = undefined;
const UnionSummonEntityTypeHelper_1 = require("./UnionSummonEntityTypeHelper");
class FbSummonEntity {
  constructor(t) {
    this.FbDataInternal = t;
    this.lc1 = false;
    this._c1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSummonEntity(t);
    }
  }
  get SummonEntityConfig() {
    var t;
    var n;
    if (!this.lc1 && (this.lc1 = true, t = this.FbDataInternal.summonEntityConfigType(), n = UnionSummonEntityTypeHelper_1.UnionSummonEntityTypeHelper.GetUnionSummonEntityTypeObject(t))) {
      this._c1 = UnionSummonEntityTypeHelper_1.UnionSummonEntityTypeHelper.ReadUnionSummonEntityType(t, this.FbDataInternal.summonEntityConfig(n));
    }
    return this._c1;
  }
}
exports.FbSummonEntity = FbSummonEntity;
//# sourceMappingURL=FbSummonEntity.js.map