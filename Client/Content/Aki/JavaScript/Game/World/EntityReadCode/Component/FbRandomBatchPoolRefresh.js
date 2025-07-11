"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRandomBatchPoolRefresh = undefined;
const UnionEntityBatchHelper_1 = require("./UnionEntityBatchHelper");
class FbRandomBatchPoolRefresh {
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
      return new FbRandomBatchPoolRefresh(t);
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
          var s = this.FbDataInternal.entityBatchesType(t);
          var e = UnionEntityBatchHelper_1.UnionEntityBatchHelper.GetUnionEntityBatchObject(s);
          if (e && (s = UnionEntityBatchHelper_1.UnionEntityBatchHelper.ReadUnionEntityBatch(s, this.FbDataInternal.entityBatches(t, e))) !== undefined) {
            this.Mw1.push(s);
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
exports.FbRandomBatchPoolRefresh = FbRandomBatchPoolRefresh;
//# sourceMappingURL=FbRandomBatchPoolRefresh.js.map