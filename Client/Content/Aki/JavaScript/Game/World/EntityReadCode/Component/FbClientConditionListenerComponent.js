"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbClientConditionListenerComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbClientConditionListener_1 = require("./FbClientConditionListener");
class FbClientConditionListenerComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.v7h = false;
    this.y7h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbClientConditionListenerComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Listeners() {
    if (!this.v7h) {
      this.v7h = true;
      this.y7h = new Array();
      var i = this.FbDataInternal.listenersLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.listeners(t, new fb_component_1.ClientConditionListener());
          this.y7h.push(FbClientConditionListener_1.FbClientConditionListener.Create(e));
        }
      }
    }
    return this.y7h;
  }
}
exports.FbClientConditionListenerComponent = FbClientConditionListenerComponent;
//# sourceMappingURL=FbClientConditionListenerComponent.js.map