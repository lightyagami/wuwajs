"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCategoryMatchingCondition = undefined;
const FbDynamicEntityMatch_1 = require("./FbDynamicEntityMatch");
class FbCategoryMatchingCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.gFh = false;
    this.fFh = undefined;
    this.pFh = false;
    this.vFh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCategoryMatchingCondition(t);
    }
  }
  get EntityMatch() {
    if (!this.gFh) {
      this.gFh = true;
      this.fFh = FbDynamicEntityMatch_1.FbDynamicEntityMatch.Create(this.FbDataInternal.entityMatch());
    }
    return this.fFh;
  }
  get SelfState() {
    if (!this.pFh) {
      this.pFh = true;
      this.vFh = this.FbDataInternal.selfState();
    }
    return this.vFh;
  }
}
exports.FbCategoryMatchingCondition = FbCategoryMatchingCondition;
//# sourceMappingURL=FbCategoryMatchingCondition.js.map