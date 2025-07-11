"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSuccessConditionSpecificTargetState = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbEntityStateCondition_1 = require("../Condition/FbEntityStateCondition");
class FbSuccessConditionSpecificTargetState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ich = false;
    this.rch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSuccessConditionSpecificTargetState(t);
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
      var i = this.FbDataInternal.conditionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.conditions(t, new fb_condition_1.EntityStateCondition());
          this.rch.push(FbEntityStateCondition_1.FbEntityStateCondition.Create(e));
        }
      }
    }
    return this.rch;
  }
}
exports.FbSuccessConditionSpecificTargetState = FbSuccessConditionSpecificTargetState;
//# sourceMappingURL=FbSuccessConditionSpecificTargetState.js.map