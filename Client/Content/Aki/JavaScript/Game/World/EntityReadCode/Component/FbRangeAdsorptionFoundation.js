"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRangeAdsorptionFoundation = undefined;
const FbAdsorptionMatchingAnimation_1 = require("./FbAdsorptionMatchingAnimation");
const FbCategoryMatchingAnimation_1 = require("./FbCategoryMatchingAnimation");
const FbCategoryMatchingCondition_1 = require("./FbCategoryMatchingCondition");
const FbCategoryMatchingSucceed_1 = require("./FbCategoryMatchingSucceed");
class FbRangeAdsorptionFoundation {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.f_h = false;
    this.X6o = undefined;
    this._Fh = false;
    this.cFh = undefined;
    this.YFh = false;
    this.zFh = undefined;
    this.uFh = false;
    this.dFh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRangeAdsorptionFoundation(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbCategoryMatchingCondition_1.FbCategoryMatchingCondition.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get Animation() {
    if (!this._Fh) {
      this._Fh = true;
      this.cFh = FbAdsorptionMatchingAnimation_1.FbAdsorptionMatchingAnimation.Create(this.FbDataInternal.animation());
    }
    return this.cFh;
  }
  get CategoryAnimation() {
    if (!this.YFh) {
      this.YFh = true;
      this.zFh = FbCategoryMatchingAnimation_1.FbCategoryMatchingAnimation.Create(this.FbDataInternal.categoryAnimation());
    }
    return this.zFh;
  }
  get Callback() {
    if (!this.uFh) {
      this.uFh = true;
      this.dFh = FbCategoryMatchingSucceed_1.FbCategoryMatchingSucceed.Create(this.FbDataInternal.callback());
    }
    return this.dFh;
  }
}
exports.FbRangeAdsorptionFoundation = FbRangeAdsorptionFoundation;
//# sourceMappingURL=FbRangeAdsorptionFoundation.js.map