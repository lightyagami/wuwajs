"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChargingDevice = undefined;
class FbChargingDevice {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.nWh = false;
    this.Fke = 0;
    this.sWh = false;
    this.aWh = 0;
    this.hWh = false;
    this.lWh = 0;
    this._Wh = false;
    this.cWh = 0;
    this.AWh = false;
    this.xWh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbChargingDevice(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MaxValue() {
    if (!this.nWh) {
      this.nWh = true;
      this.Fke = this.FbDataInternal.maxValue();
    }
    return this.Fke;
  }
  get InitValue() {
    if (!this.sWh) {
      this.sWh = true;
      this.aWh = this.FbDataInternal.initValue();
    }
    return this.aWh;
  }
  get ProgressPerformanceAttribute() {
    if (!this.hWh) {
      this.hWh = true;
      this.lWh = this.FbDataInternal.progressPerformanceAttribute();
    }
    return this.lWh;
  }
  get IncreaseSpeed() {
    if (!this._Wh) {
      this._Wh = true;
      this.cWh = this.FbDataInternal.increaseSpeed();
    }
    return this.cWh;
  }
  get HitExtraValue() {
    if (!this.AWh) {
      this.AWh = true;
      this.xWh = this.FbDataInternal.hitExtraValue();
    }
    return this.xWh;
  }
}
exports.FbChargingDevice = FbChargingDevice;
//# sourceMappingURL=FbChargingDevice.js.map