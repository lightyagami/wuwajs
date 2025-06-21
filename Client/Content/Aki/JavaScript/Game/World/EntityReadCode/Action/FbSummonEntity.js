"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbSummonEntity = void 0;
const UnionSummonEntityTypeHelper_1 = require("./UnionSummonEntityTypeHelper");
class FbSummonEntity {
  constructor(t) {
    this.FbDataInternal = t, this.j11 = !1, this.H11 = void 0
  }
  static Create(t) {
    if (t) return new FbSummonEntity(t)
  }
  get SummonEntityConfig() {
    var t, n;
    return !this.j11 && (this.j11 = !0, t = this.FbDataInternal.summonEntityConfigType(), n = UnionSummonEntityTypeHelper_1.UnionSummonEntityTypeHelper.GetUnionSummonEntityTypeObject(t)) && (this.H11 = UnionSummonEntityTypeHelper_1.UnionSummonEntityTypeHelper.ReadUnionSummonEntityType(t, this.FbDataInternal.summonEntityConfig(n))), this.H11
  }
}
exports.FbSummonEntity = FbSummonEntity;
//# sourceMappingURL=FbSummonEntity.js.map