"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckFinishLoading = undefined;
const UnionCheckTargetTypeConfigHelper_1 = require("./UnionCheckTargetTypeConfigHelper");
class FbCheckFinishLoading {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.BJh = false;
    this.qJh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbCheckFinishLoading(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CheckTarget() {
    var e;
    var i;
    if (!this.BJh && (this.BJh = true, e = this.FbDataInternal.checkTargetType(), i = UnionCheckTargetTypeConfigHelper_1.UnionCheckTargetTypeConfigHelper.GetUnionCheckTargetTypeConfigObject(e))) {
      this.qJh = UnionCheckTargetTypeConfigHelper_1.UnionCheckTargetTypeConfigHelper.ReadUnionCheckTargetTypeConfig(e, this.FbDataInternal.checkTarget(i));
    }
    return this.qJh;
  }
}
exports.FbCheckFinishLoading = FbCheckFinishLoading;
//# sourceMappingURL=FbCheckFinishLoading.js.map