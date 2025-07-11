"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOnCollisionCondition = undefined;
const FbTriggerCountConfig_1 = require("./FbTriggerCountConfig");
class FbOnCollisionCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.p0h = false;
    this.nXs = 0;
    this.p2h = false;
    this.v2h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbOnCollisionCondition(t);
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
  get TriggerCount() {
    if (!this.p2h) {
      this.p2h = true;
      this.v2h = FbTriggerCountConfig_1.FbTriggerCountConfig.Create(this.FbDataInternal.triggerCount());
    }
    return this.v2h;
  }
}
exports.FbOnCollisionCondition = FbOnCollisionCondition;
//# sourceMappingURL=FbOnCollisionCondition.js.map