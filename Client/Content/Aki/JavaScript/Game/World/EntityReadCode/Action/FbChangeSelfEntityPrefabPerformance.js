"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeSelfEntityPrefabPerformance = undefined;
class FbChangeSelfEntityPrefabPerformance {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.gLh = false;
    this.fLh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbChangeSelfEntityPrefabPerformance(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get PerformanceTag() {
    if (!this.gLh) {
      this.gLh = true;
      this.fLh = this.FbDataInternal.performanceTag();
    }
    return this.fLh;
  }
}
exports.FbChangeSelfEntityPrefabPerformance = FbChangeSelfEntityPrefabPerformance;
//# sourceMappingURL=FbChangeSelfEntityPrefabPerformance.js.map