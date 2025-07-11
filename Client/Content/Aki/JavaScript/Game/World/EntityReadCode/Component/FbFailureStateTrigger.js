"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFailureStateTrigger = undefined;
const FbOperationsAfterEntityGroupFailure_1 = require("./FbOperationsAfterEntityGroupFailure");
const UnionEntityGroupFailureConditionHelper_1 = require("./UnionEntityGroupFailureConditionHelper");
class FbFailureStateTrigger {
  constructor(i) {
    this.FbDataInternal = i;
    this.DOh = false;
    this.BOh = undefined;
    this.RVh = false;
    this.wVh = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbFailureStateTrigger(i);
    }
  }
  get FailureConditions() {
    if (!this.DOh) {
      this.DOh = true;
      this.BOh = new Array();
      var t = this.FbDataInternal.failureConditionsLength();
      if (t) {
        for (let i = 0; i < t; ++i) {
          var r = this.FbDataInternal.failureConditionsType(i);
          var e = UnionEntityGroupFailureConditionHelper_1.UnionEntityGroupFailureConditionHelper.GetUnionEntityGroupFailureConditionObject(r);
          if (e && (r = UnionEntityGroupFailureConditionHelper_1.UnionEntityGroupFailureConditionHelper.ReadUnionEntityGroupFailureCondition(r, this.FbDataInternal.failureConditions(i, e))) !== undefined) {
            this.BOh.push(r);
          }
        }
      }
    }
    return this.BOh;
  }
  get FailureOperations() {
    if (!this.RVh) {
      this.RVh = true;
      this.wVh = FbOperationsAfterEntityGroupFailure_1.FbOperationsAfterEntityGroupFailure.Create(this.FbDataInternal.failureOperations());
    }
    return this.wVh;
  }
}
exports.FbFailureStateTrigger = FbFailureStateTrigger;
//# sourceMappingURL=FbFailureStateTrigger.js.map