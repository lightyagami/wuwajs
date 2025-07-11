"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbProbabilityRefreshItem = undefined;
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbProbabilityRefreshItem {
  constructor(t) {
    this.FbDataInternal = t;
    this.CBh = false;
    this.gBh = 0;
    this.fBh = false;
    this.pBh = 0;
    this.vBh = false;
    this.yBh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbProbabilityRefreshItem(t);
    }
  }
  get Probability() {
    if (!this.CBh) {
      this.CBh = true;
      this.gBh = this.FbDataInternal.probability();
    }
    return this.gBh;
  }
  get RefreshEntityId() {
    if (!this.fBh) {
      this.fBh = true;
      this.pBh = this.FbDataInternal.refreshEntityId();
    }
    return this.pBh;
  }
  get AdditionalCondition() {
    if (!this.vBh) {
      this.vBh = true;
      this.yBh = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.additionalCondition());
    }
    return this.yBh;
  }
}
exports.FbProbabilityRefreshItem = FbProbabilityRefreshItem;
//# sourceMappingURL=FbProbabilityRefreshItem.js.map