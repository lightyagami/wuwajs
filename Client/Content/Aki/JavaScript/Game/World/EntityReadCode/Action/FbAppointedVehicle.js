"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAppointedVehicle = undefined;
class FbAppointedVehicle {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.yMh = false;
    this.SMh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbAppointedVehicle(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get VehicleId() {
    if (!this.yMh) {
      this.yMh = true;
      this.SMh = this.FbDataInternal.vehicleId();
    }
    return this.SMh;
  }
}
exports.FbAppointedVehicle = FbAppointedVehicle;
//# sourceMappingURL=FbAppointedVehicle.js.map