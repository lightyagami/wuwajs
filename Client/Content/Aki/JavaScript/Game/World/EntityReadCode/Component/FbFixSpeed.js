"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFixSpeed = undefined;
class FbFixSpeed {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.qmh = false;
    this.H8o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbFixSpeed(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Speed() {
    if (!this.qmh) {
      this.qmh = true;
      this.H8o = this.FbDataInternal.speed();
    }
    return this.H8o;
  }
}
exports.FbFixSpeed = FbFixSpeed;
//# sourceMappingURL=FbFixSpeed.js.map