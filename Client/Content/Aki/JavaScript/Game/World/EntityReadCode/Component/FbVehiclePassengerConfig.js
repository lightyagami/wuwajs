"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehiclePassengerConfig = undefined;
class FbVehiclePassengerConfig {
  constructor(s) {
    this.FbDataInternal = s;
    this._jl = false;
    this.cjl = 0;
    this.hMh = false;
    this.lMh = 0;
  }
  static Create(s) {
    if (s) {
      return new FbVehiclePassengerConfig(s);
    }
  }
  get PassengerNpc() {
    if (!this._jl) {
      this._jl = true;
      this.cjl = this.FbDataInternal.passengerNpc();
    }
    return this.cjl;
  }
  get Seat() {
    if (!this.hMh) {
      this.hMh = true;
      this.lMh = this.FbDataInternal.seat();
    }
    return this.lMh;
  }
}
exports.FbVehiclePassengerConfig = FbVehiclePassengerConfig;
//# sourceMappingURL=FbVehiclePassengerConfig.js.map