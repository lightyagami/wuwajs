"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSequenceBatchRefresh = undefined;
const UnionEntityBatchHelper_1 = require("./UnionEntityBatchHelper");
class FbSequenceBatchRefresh {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Sw1 = false;
    this.Mw1 = undefined;
    this.Ew1 = false;
    this.Iw1 = false;
  }
  static Create(t) {
    if (t) {
      return new FbSequenceBatchRefresh(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EntityBatches() {
    if (!this.Sw1) {
      this.Sw1 = true;
      this.Mw1 = new Array();
      var e = this.FbDataInternal.entityBatchesLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.entityBatchesType(t);
          var s = UnionEntityBatchHelper_1.UnionEntityBatchHelper.GetUnionEntityBatchObject(i);
          if (s && (i = UnionEntityBatchHelper_1.UnionEntityBatchHelper.ReadUnionEntityBatch(i, this.FbDataInternal.entityBatches(t, s))) !== undefined) {
            this.Mw1.push(i);
          }
        }
      }
    }
    return this.Mw1;
  }
  get IsRestartAfterAllBatchesFinished() {
    if (!this.Ew1) {
      this.Ew1 = true;
      this.Iw1 = this.FbDataInternal.isRestartAfterAllBatchesFinished();
    }
    return this.Iw1;
  }
}
exports.FbSequenceBatchRefresh = FbSequenceBatchRefresh;
//# sourceMappingURL=FbSequenceBatchRefresh.js.map