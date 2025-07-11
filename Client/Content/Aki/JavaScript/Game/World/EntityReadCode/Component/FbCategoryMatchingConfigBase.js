"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCategoryMatchingConfigBase = undefined;
const FbCategoryMatchingAnimationBase_1 = require("./FbCategoryMatchingAnimationBase");
const FbCategoryMatchingCondition_1 = require("./FbCategoryMatchingCondition");
const FbCategoryMatchingSucceedBase_1 = require("./FbCategoryMatchingSucceedBase");
class FbCategoryMatchingConfigBase {
  constructor(t) {
    this.FbDataInternal = t;
    this.f_h = false;
    this.X6o = undefined;
    this._Fh = false;
    this.cFh = undefined;
    this.uFh = false;
    this.dFh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCategoryMatchingConfigBase(t);
    }
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
      this.cFh = FbCategoryMatchingAnimationBase_1.FbCategoryMatchingAnimationBase.Create(this.FbDataInternal.animation());
    }
    return this.cFh;
  }
  get Callback() {
    if (!this.uFh) {
      this.uFh = true;
      this.dFh = FbCategoryMatchingSucceedBase_1.FbCategoryMatchingSucceedBase.Create(this.FbDataInternal.callback());
    }
    return this.dFh;
  }
}
exports.FbCategoryMatchingConfigBase = FbCategoryMatchingConfigBase;
//# sourceMappingURL=FbCategoryMatchingConfigBase.js.map