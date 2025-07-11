"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityVisibleComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbVisibleConditionGroup_1 = require("./FbVisibleConditionGroup");
class FbEntityVisibleComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Gch = false;
    this.Och = false;
    this.s5h = false;
    this.a5h = false;
    this.h5h = false;
    this.l5h = false;
    this._5h = false;
    this.c5h = false;
    this.u5h = false;
    this.d5h = undefined;
    this.m5h = false;
    this.C5h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbEntityVisibleComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get DelayChange() {
    if (!this.Gch) {
      this.Gch = true;
      this.Och = this.FbDataInternal.delayChange();
    }
    return this.Och;
  }
  get UseFadeEffect() {
    if (!this.s5h) {
      this.s5h = true;
      this.a5h = this.FbDataInternal.useFadeEffect();
    }
    return this.a5h;
  }
  get UseCutEffect() {
    if (!this.h5h) {
      this.h5h = true;
      this.l5h = this.FbDataInternal.useCutEffect();
    }
    return this.l5h;
  }
  get UseHolographicEffect() {
    if (!this._5h) {
      this._5h = true;
      this.c5h = this.FbDataInternal.useHolographicEffect();
    }
    return this.c5h;
  }
  get VisibleConditions() {
    if (!this.u5h) {
      this.u5h = true;
      this.d5h = new Array();
      var i = this.FbDataInternal.visibleConditionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.visibleConditions(t, new fb_component_1.VisibleConditionGroup());
          this.d5h.push(FbVisibleConditionGroup_1.FbVisibleConditionGroup.Create(s));
        }
      }
    }
    return this.d5h;
  }
  get CustomVisibleRange() {
    if (!this.m5h) {
      this.m5h = true;
      this.C5h = this.FbDataInternal.customVisibleRange();
    }
    return this.C5h;
  }
}
exports.FbEntityVisibleComponent = FbEntityVisibleComponent;
//# sourceMappingURL=FbEntityVisibleComponent.js.map