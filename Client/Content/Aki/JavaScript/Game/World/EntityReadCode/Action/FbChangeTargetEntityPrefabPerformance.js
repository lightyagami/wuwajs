"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeTargetEntityPrefabPerformance = undefined;
class FbChangeTargetEntityPrefabPerformance {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.gLh = false;
    this.fLh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbChangeTargetEntityPrefabPerformance(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get PerformanceTag() {
    if (!this.gLh) {
      this.gLh = true;
      this.fLh = this.FbDataInternal.performanceTag();
    }
    return this.fLh;
  }
}
exports.FbChangeTargetEntityPrefabPerformance = FbChangeTargetEntityPrefabPerformance;
//# sourceMappingURL=FbChangeTargetEntityPrefabPerformance.js.map