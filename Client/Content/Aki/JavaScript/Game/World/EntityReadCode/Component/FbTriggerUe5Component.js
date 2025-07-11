"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTriggerUe5Component = undefined;
const FbTriggerActions_1 = require("../Action/FbTriggerActions");
class FbTriggerUe5Component {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.vkh = false;
    this.ykh = 0;
    this.Skh = false;
    this.Mkh = false;
    this.dkh = false;
    this.mkh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTriggerUe5Component(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get MaxTriggerTimes() {
    if (!this.vkh) {
      this.vkh = true;
      this.ykh = this.FbDataInternal.maxTriggerTimes();
    }
    return this.ykh;
  }
  get IsNotLoad() {
    if (!this.Skh) {
      this.Skh = true;
      this.Mkh = this.FbDataInternal.isNotLoad();
    }
    return this.Mkh;
  }
  get TriggerActions() {
    if (!this.dkh) {
      this.dkh = true;
      this.mkh = FbTriggerActions_1.FbTriggerActions.Create(this.FbDataInternal.triggerActions());
    }
    return this.mkh;
  }
}
exports.FbTriggerUe5Component = FbTriggerUe5Component;
//# sourceMappingURL=FbTriggerUe5Component.js.map