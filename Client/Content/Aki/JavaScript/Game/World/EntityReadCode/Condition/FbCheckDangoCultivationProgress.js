"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckDangoCultivationProgress = undefined;
const UnionCheckDangoCultivationProgressConfigHelper_1 = require("./UnionCheckDangoCultivationProgressConfigHelper");
class FbCheckDangoCultivationProgress {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.wJh = false;
    this.PJh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckDangoCultivationProgress(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CheckType() {
    var t;
    var i;
    if (!this.wJh && (this.wJh = true, t = this.FbDataInternal.checkTypeType(), i = UnionCheckDangoCultivationProgressConfigHelper_1.UnionCheckDangoCultivationProgressConfigHelper.GetUnionCheckDangoCultivationProgressConfigObject(t))) {
      this.PJh = UnionCheckDangoCultivationProgressConfigHelper_1.UnionCheckDangoCultivationProgressConfigHelper.ReadUnionCheckDangoCultivationProgressConfig(t, this.FbDataInternal.checkType(i));
    }
    return this.PJh;
  }
}
exports.FbCheckDangoCultivationProgress = FbCheckDangoCultivationProgress;
//# sourceMappingURL=FbCheckDangoCultivationProgress.js.map