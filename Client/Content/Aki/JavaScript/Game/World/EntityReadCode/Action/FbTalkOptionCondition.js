"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTalkOptionCondition = undefined;
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbTalkOptionCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ich = false;
    this.rch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTalkOptionCondition(t);
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
      this.rch = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.conditions());
    }
    return this.rch;
  }
}
exports.FbTalkOptionCondition = FbTalkOptionCondition;
//# sourceMappingURL=FbTalkOptionCondition.js.map