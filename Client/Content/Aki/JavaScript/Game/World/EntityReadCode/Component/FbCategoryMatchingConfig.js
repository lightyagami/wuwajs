"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCategoryMatchingConfig = undefined;
const FbCategoryMatchingAnimation_1 = require("./FbCategoryMatchingAnimation");
const FbCategoryMatchingCondition_1 = require("./FbCategoryMatchingCondition");
const FbCategoryMatchingSucceed_1 = require("./FbCategoryMatchingSucceed");
const FbItemLockingConfig_1 = require("./FbItemLockingConfig");
class FbCategoryMatchingConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.f_h = false;
    this.X6o = undefined;
    this._Fh = false;
    this.cFh = undefined;
    this.uFh = false;
    this.dFh = undefined;
    this.mFh = false;
    this.CFh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCategoryMatchingConfig(t);
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
      this.cFh = FbCategoryMatchingAnimation_1.FbCategoryMatchingAnimation.Create(this.FbDataInternal.animation());
    }
    return this.cFh;
  }
  get Callback() {
    if (!this.uFh) {
      this.uFh = true;
      this.dFh = FbCategoryMatchingSucceed_1.FbCategoryMatchingSucceed.Create(this.FbDataInternal.callback());
    }
    return this.dFh;
  }
  get ItemLockingConfig() {
    if (!this.mFh) {
      this.mFh = true;
      this.CFh = FbItemLockingConfig_1.FbItemLockingConfig.Create(this.FbDataInternal.itemLockingConfig());
    }
    return this.CFh;
  }
}
exports.FbCategoryMatchingConfig = FbCategoryMatchingConfig;
//# sourceMappingURL=FbCategoryMatchingConfig.js.map