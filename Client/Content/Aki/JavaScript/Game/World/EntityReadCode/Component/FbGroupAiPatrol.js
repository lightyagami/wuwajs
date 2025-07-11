"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGroupAiPatrol = undefined;
class FbGroupAiPatrol {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.YXh = false;
    this.zXh = 0;
    this.kuh = false;
    this.Guh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbGroupAiPatrol(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Leader() {
    if (!this.YXh) {
      this.YXh = true;
      this.zXh = this.FbDataInternal.leader();
    }
    return this.zXh;
  }
  get SplineEntityId() {
    if (!this.kuh) {
      this.kuh = true;
      this.Guh = this.FbDataInternal.splineEntityId();
    }
    return this.Guh;
  }
}
exports.FbGroupAiPatrol = FbGroupAiPatrol;
//# sourceMappingURL=FbGroupAiPatrol.js.map