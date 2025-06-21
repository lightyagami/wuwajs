"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbRandomBatchPoolRefresh = void 0;
const UnionEntityBatchHelper_1 = require("./UnionEntityBatchHelper");
class FbRandomBatchPoolRefresh {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.XL1 = !1, this.YL1 = void 0, this.zL1 = !1, this.JL1 = !1
  }
  static Create(t) {
    if (t) return new FbRandomBatchPoolRefresh(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get EntityBatches() {
    if (!this.XL1) {
      this.XL1 = !0, this.YL1 = new Array;
      var i = this.FbDataInternal.entityBatchesLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.entityBatchesType(t),
            e = UnionEntityBatchHelper_1.UnionEntityBatchHelper.GetUnionEntityBatchObject(s);
          e && void 0 !== (s = UnionEntityBatchHelper_1.UnionEntityBatchHelper.ReadUnionEntityBatch(s, this.FbDataInternal.entityBatches(t, e))) && this.YL1.push(s)
        }
    }
    return this.YL1
  }
  get IsRestartAfterAllBatchesFinished() {
    return this.zL1 || (this.zL1 = !0, this.JL1 = this.FbDataInternal.isRestartAfterAllBatchesFinished()), this.JL1
  }
}
exports.FbRandomBatchPoolRefresh = FbRandomBatchPoolRefresh;
//# sourceMappingURL=FbRandomBatchPoolRefresh.js.map