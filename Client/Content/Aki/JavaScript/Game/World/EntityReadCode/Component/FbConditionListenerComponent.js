"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbConditionListenerComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbCondtionListener_1 = require("./FbCondtionListener");
class FbConditionListenerComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.v7h = false;
    this.y7h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbConditionListenerComponent(t);
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
      var e = this.FbDataInternal.listenersLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.listeners(t, new fb_component_1.CondtionListener());
          this.y7h.push(FbCondtionListener_1.FbCondtionListener.Create(i));
        }
      }
    }
    return this.y7h;
  }
}
exports.FbConditionListenerComponent = FbConditionListenerComponent;
//# sourceMappingURL=FbConditionListenerComponent.js.map