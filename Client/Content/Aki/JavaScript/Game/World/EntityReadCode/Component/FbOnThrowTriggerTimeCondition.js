"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOnThrowTriggerTimeCondition = undefined;
class FbOnThrowTriggerTimeCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.p0h = false;
    this.nXs = 0;
    this.M2h = false;
    this.E2h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbOnThrowTriggerTimeCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get BulletId() {
    if (!this.p0h) {
      this.p0h = true;
      this.nXs = Number(this.FbDataInternal.bulletId());
    }
    return this.nXs;
  }
  get TriggerTime() {
    if (!this.M2h) {
      this.M2h = true;
      this.E2h = this.FbDataInternal.triggerTime();
    }
    return this.E2h;
  }
}
exports.FbOnThrowTriggerTimeCondition = FbOnThrowTriggerTimeCondition;
//# sourceMappingURL=FbOnThrowTriggerTimeCondition.js.map