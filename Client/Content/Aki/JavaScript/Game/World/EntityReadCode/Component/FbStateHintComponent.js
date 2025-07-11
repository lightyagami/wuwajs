"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbStateHintComponent = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbEntityStateCondition_1 = require("../Condition/FbEntityStateCondition");
class FbStateHintComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.o5h = false;
    this.n5h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbStateHintComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get ActiveConditions() {
    if (!this.o5h) {
      this.o5h = true;
      this.n5h = new Array();
      var i = this.FbDataInternal.activeConditionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.activeConditions(t, new fb_condition_1.EntityStateCondition());
          this.n5h.push(FbEntityStateCondition_1.FbEntityStateCondition.Create(n));
        }
      }
    }
    return this.n5h;
  }
}
exports.FbStateHintComponent = FbStateHintComponent;
//# sourceMappingURL=FbStateHintComponent.js.map