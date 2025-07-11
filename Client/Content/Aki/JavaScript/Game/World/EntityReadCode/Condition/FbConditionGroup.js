"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbConditionGroup = undefined;
const UnionCondition2Helper_1 = require("./UnionCondition2Helper");
class FbConditionGroup {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.ich = false;
    this.rch = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbConditionGroup(i);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Conditions() {
    if (!this.ich) {
      this.ich = true;
      this.rch = new Array();
      var t = this.FbDataInternal.conditionsLength();
      if (t) {
        for (let i = 0; i < t; ++i) {
          var o = this.FbDataInternal.conditionsExtType(i);
          var n = UnionCondition2Helper_1.UnionCondition2Helper.GetUnionCondition2Object(o);
          var o = UnionCondition2Helper_1.UnionCondition2Helper.ReadUnionCondition2(o, this.FbDataInternal.conditions(i, n));
          if (o !== undefined) {
            this.rch.push(o);
          }
        }
      }
    }
    return this.rch;
  }
}
exports.FbConditionGroup = FbConditionGroup;
//# sourceMappingURL=FbConditionGroup.js.map