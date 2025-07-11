"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCategoryMatchingAnimation = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCategoryMatchingAnimation {
  constructor(t) {
    this.FbDataInternal = t;
    this.bFh = false;
    this.LFh = undefined;
    this.AFh = false;
    this.xFh = undefined;
    this.RFh = false;
    this.wFh = undefined;
    this.PFh = false;
    this.UFh = undefined;
    this.DFh = false;
    this.BFh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCategoryMatchingAnimation(t);
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
  get MatchSequence() {
    if (!this.PFh) {
      this.PFh = true;
      this.UFh = this.FbDataInternal.matchSequence();
    }
    return this.UFh;
  }
  get MatchSequenceOffset() {
    if (!this.DFh) {
      this.DFh = true;
      this.BFh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.matchSequenceOffset());
    }
    return this.BFh;
  }
}
exports.FbCategoryMatchingAnimation = FbCategoryMatchingAnimation;
//# sourceMappingURL=FbCategoryMatchingAnimation.js.map