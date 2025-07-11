"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRandomBatchRefresh = undefined;
const UnionEntityBatchHelper_1 = require("./UnionEntityBatchHelper");
class FbRandomBatchRefresh {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Sw1 = false;
    this.Mw1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRandomBatchRefresh(t);
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
      var i = this.FbDataInternal.entityBatchesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.entityBatchesType(t);
          var s = UnionEntityBatchHelper_1.UnionEntityBatchHelper.GetUnionEntityBatchObject(e);
          if (s && (e = UnionEntityBatchHelper_1.UnionEntityBatchHelper.ReadUnionEntityBatch(e, this.FbDataInternal.entityBatches(t, s))) !== undefined) {
            this.Mw1.push(e);
          }
        }
      }
    }
    return this.Mw1;
  }
}
exports.FbRandomBatchRefresh = FbRandomBatchRefresh;
//# sourceMappingURL=FbRandomBatchRefresh.js.map