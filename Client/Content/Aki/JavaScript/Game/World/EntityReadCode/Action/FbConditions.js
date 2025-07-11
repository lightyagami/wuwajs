"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbConditions = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbCondition_1 = require("./FbCondition");
class FbConditions {
  constructor(t) {
    this.FbDataInternal = t;
    this.hch = false;
    this.lch = undefined;
    this.ich = false;
    this.rch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbConditions(t);
    }
  }
  get LogicOpType() {
    if (!this.hch) {
      this.hch = true;
      this.lch = this.FbDataInternal.logicOpType();
    }
    return this.lch;
  }
  get Conditions() {
    if (!this.ich) {
      this.ich = true;
      this.rch = new Array();
      var i = this.FbDataInternal.conditionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.conditions(t, new fb_action_1.Condition());
          this.rch.push(FbCondition_1.FbCondition.Create(s));
        }
      }
    }
    return this.rch;
  }
}
exports.FbConditions = FbConditions;
//# sourceMappingURL=FbConditions.js.map