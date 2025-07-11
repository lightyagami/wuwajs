"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCategoryMatchingAnimationBase = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCategoryMatchingAnimationBase {
  constructor(t) {
    this.FbDataInternal = t;
    this.bFh = false;
    this.LFh = undefined;
    this.AFh = false;
    this.xFh = undefined;
    this.RFh = false;
    this.wFh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCategoryMatchingAnimationBase(t);
    }
  }
  get MatchPos() {
    if (!this.bFh) {
      this.bFh = true;
      this.LFh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.matchPos());
    }
    return this.LFh;
  }
  get MatchRot() {
    if (!this.AFh) {
      this.AFh = true;
      this.xFh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.matchRot());
    }
    return this.xFh;
  }
  get MatchReferenceKey() {
    if (!this.RFh) {
      this.RFh = true;
      this.wFh = this.FbDataInternal.matchReferenceKey();
    }
    return this.wFh;
  }
}
exports.FbCategoryMatchingAnimationBase = FbCategoryMatchingAnimationBase;
//# sourceMappingURL=FbCategoryMatchingAnimationBase.js.map