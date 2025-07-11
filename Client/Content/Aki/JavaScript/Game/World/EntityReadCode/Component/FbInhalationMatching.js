"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInhalationMatching = undefined;
const FbCategoryMatchingCondition_1 = require("./FbCategoryMatchingCondition");
class FbInhalationMatching {
  constructor(t) {
    this.FbDataInternal = t;
    this.oYh = false;
    this.nYh = 0;
    this.gFh = false;
    this.fFh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbInhalationMatching(t);
    }
  }
  get InhalationStrength() {
    if (!this.oYh) {
      this.oYh = true;
      this.nYh = this.FbDataInternal.inhalationStrength();
    }
    return this.nYh;
  }
  get EntityMatch() {
    if (!this.gFh) {
      this.gFh = true;
      this.fFh = FbCategoryMatchingCondition_1.FbCategoryMatchingCondition.Create(this.FbDataInternal.entityMatch());
    }
    return this.fFh;
  }
}
exports.FbInhalationMatching = FbInhalationMatching;
//# sourceMappingURL=FbInhalationMatching.js.map