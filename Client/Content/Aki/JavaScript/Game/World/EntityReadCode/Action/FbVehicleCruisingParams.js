"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbVehicleCruisingParams = void 0;
class FbVehicleCruisingParams {
  constructor(t) {
    this.FbDataInternal = t, this.Rcc = !1, this.Acc = 0, this.Pcc = !1, this.xcc = 0, this.ECc = !1, this.ICc = !1
  }
  static Create(t) {
    if (t) return new FbVehicleCruisingParams(t)
  }
  get ForwardSpeed() {
    return this.Rcc || (this.Rcc = !0, this.Acc = this.FbDataInternal.forwardSpeed()), this.Acc
  }
  get ForwardAcceleration() {
    return this.Pcc || (this.Pcc = !0, this.xcc = this.FbDataInternal.forwardAcceleration()), this.xcc
  }
  get DisableSprint() {
    return this.ECc || (this.ECc = !0, this.ICc = this.FbDataInternal.disableSprint()), this.ICc
  }
}
exports.FbVehicleCruisingParams = FbVehicleCruisingParams;
//# sourceMappingURL=FbVehicleCruisingParams.js.map