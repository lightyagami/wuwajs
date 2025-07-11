"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVisibleConditionGroup = undefined;
const UnionVisibleConditionHelper_1 = require("../Condition/UnionVisibleConditionHelper");
class FbVisibleConditionGroup {
  constructor(i) {
    this.FbDataInternal = i;
    this.ich = false;
    this.rch = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbVisibleConditionGroup(i);
    }
  }
  get Conditions() {
    if (!this.ich) {
      this.ich = true;
      this.rch = new Array();
      var o = this.FbDataInternal.conditionsLength();
      if (o) {
        for (let i = 0; i < o; ++i) {
          var t = this.FbDataInternal.conditionsType(i);
          var e = UnionVisibleConditionHelper_1.UnionVisibleConditionHelper.GetUnionVisibleConditionObject(t);
          if (e && (t = UnionVisibleConditionHelper_1.UnionVisibleConditionHelper.ReadUnionVisibleCondition(t, this.FbDataInternal.conditions(i, e))) !== undefined) {
            this.rch.push(t);
          }
        }
      }
    }
    return this.rch;
  }
}
exports.FbVisibleConditionGroup = FbVisibleConditionGroup;
//# sourceMappingURL=FbVisibleConditionGroup.js.map