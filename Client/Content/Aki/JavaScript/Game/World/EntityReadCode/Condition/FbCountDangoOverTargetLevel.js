"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCountDangoOverTargetLevel = undefined;
class FbCountDangoOverTargetLevel {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.o01 = false;
    this.n01 = 0;
    this.s01 = false;
    this.a01 = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCountDangoOverTargetLevel(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TargetNumber() {
    if (!this.o01) {
      this.o01 = true;
      this.n01 = this.FbDataInternal.targetNumber();
    }
    return this.n01;
  }
  get TargetLevel() {
    if (!this.s01) {
      this.s01 = true;
      this.a01 = this.FbDataInternal.targetLevel();
    }
    return this.a01;
  }
}
exports.FbCountDangoOverTargetLevel = FbCountDangoOverTargetLevel;
//# sourceMappingURL=FbCountDangoOverTargetLevel.js.map