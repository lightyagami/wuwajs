"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityGroupFailureSequentialState = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbEntityStateCondition_1 = require("../Condition/FbEntityStateCondition");
class FbEntityGroupFailureSequentialState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.FOh = false;
    this.NOh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityGroupFailureSequentialState(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Order() {
    if (!this.FOh) {
      this.FOh = true;
      this.NOh = new Array();
      var i = this.FbDataInternal.orderLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.order(t, new fb_condition_1.EntityStateCondition());
          this.NOh.push(FbEntityStateCondition_1.FbEntityStateCondition.Create(e));
        }
      }
    }
    return this.NOh;
  }
}
exports.FbEntityGroupFailureSequentialState = FbEntityGroupFailureSequentialState;
//# sourceMappingURL=FbEntityGroupFailureSequentialState.js.map