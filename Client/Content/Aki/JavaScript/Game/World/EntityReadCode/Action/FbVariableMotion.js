"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVariableMotion = undefined;
class FbVariableMotion {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.KEh = false;
    this.$Eh = 0;
    this.XEh = false;
    this.YEh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbVariableMotion(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Acceleration() {
    if (!this.KEh) {
      this.KEh = true;
      this.$Eh = this.FbDataInternal.acceleration();
    }
    return this.$Eh;
  }
  get MaxSpeed() {
    if (!this.XEh) {
      this.XEh = true;
      this.YEh = this.FbDataInternal.maxSpeed();
    }
    return this.YEh;
  }
}
exports.FbVariableMotion = FbVariableMotion;
//# sourceMappingURL=FbVariableMotion.js.map