"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleCruisingParams = undefined;
class FbVehicleCruisingParams {
  constructor(t) {
    this.FbDataInternal = t;
    this.Rcc = false;
    this.Acc = 0;
    this.Pcc = false;
    this.xcc = 0;
    this.ECc = false;
    this.ICc = false;
  }
  static Create(t) {
    if (t) {
      return new FbVehicleCruisingParams(t);
    }
  }
  get ForwardSpeed() {
    if (!this.Rcc) {
      this.Rcc = true;
      this.Acc = this.FbDataInternal.forwardSpeed();
    }
    return this.Acc;
  }
  get ForwardAcceleration() {
    if (!this.Pcc) {
      this.Pcc = true;
      this.xcc = this.FbDataInternal.forwardAcceleration();
    }
    return this.xcc;
  }
  get DisableSprint() {
    if (!this.ECc) {
      this.ECc = true;
      this.ICc = this.FbDataInternal.disableSprint();
    }
    return this.ICc;
  }
}
exports.FbVehicleCruisingParams = FbVehicleCruisingParams;
//# sourceMappingURL=FbVehicleCruisingParams.js.map