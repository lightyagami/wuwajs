"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbSequenceBatchRefresh = void 0;
const UnionEntityBatchHelper_1 = require("./UnionEntityBatchHelper");
class FbSequenceBatchRefresh {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.XL1 = !1, this.YL1 = void 0, this.zL1 = !1, this.JL1 = !1
  }
  static Create(t) {
    if (t) return new FbSequenceBatchRefresh(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get EntityBatches() {
    if (!this.XL1) {
      this.XL1 = !0, this.YL1 = new Array;
      var e = this.FbDataInternal.entityBatchesLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.entityBatchesType(t),
            s = UnionEntityBatchHelper_1.UnionEntityBatchHelper.GetUnionEntityBatchObject(i);
          s && void 0 !== (i = UnionEntityBatchHelper_1.UnionEntityBatchHelper.ReadUnionEntityBatch(i, this.FbDataInternal.entityBatches(t, s))) && this.YL1.push(i)
        }
    }
    return this.YL1
  }
  get IsRestartAfterAllBatchesFinished() {
    return this.zL1 || (this.zL1 = !0, this.JL1 = this.FbDataInternal.isRestartAfterAllBatchesFinished()), this.JL1
  }
}
exports.FbSequenceBatchRefresh = FbSequenceBatchRefresh;
//# sourceMappingURL=FbSequenceBatchRefresh.js.map