"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSummonVehicle = undefined;
class FbSummonVehicle {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.q$h = false;
    this.k$h = undefined;
    this.S0h = false;
    this.M0h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSummonVehicle(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TemplateId() {
    if (!this.q$h) {
      this.q$h = true;
      this.k$h = this.FbDataInternal.templateId();
    }
    return this.k$h;
  }
  get PositionEntityId() {
    if (!this.S0h) {
      this.S0h = true;
      this.M0h = this.FbDataInternal.positionEntityId();
    }
    return this.M0h;
  }
}
exports.FbSummonVehicle = FbSummonVehicle;
//# sourceMappingURL=FbSummonVehicle.js.map