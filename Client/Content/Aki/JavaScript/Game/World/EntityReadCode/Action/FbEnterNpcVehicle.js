"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnterNpcVehicle = undefined;
class FbEnterNpcVehicle {
  constructor(t) {
    this.FbDataInternal = t;
    this.ldh = false;
    this.NHo = 0;
    this.hMh = false;
    this.lMh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbEnterNpcVehicle(t);
    }
  }
  get Target() {
    if (!this.ldh) {
      this.ldh = true;
      this.NHo = this.FbDataInternal.target();
    }
    return this.NHo;
  }
  get Seat() {
    if (!this.hMh) {
      this.hMh = true;
      this.lMh = this.FbDataInternal.seat();
    }
    return this.lMh;
  }
}
exports.FbEnterNpcVehicle = FbEnterNpcVehicle;
//# sourceMappingURL=FbEnterNpcVehicle.js.map