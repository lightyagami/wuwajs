"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleMontagePlayConfig = undefined;
class FbVehicleMontagePlayConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.l7l = false;
    this._7l = 0;
    this.c7l = false;
    this.u7l = 0;
    this.d7l = false;
    this.m7l = 0;
    this.C7l = false;
    this.g7l = 0;
    this.IOh = false;
    this.TOh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbVehicleMontagePlayConfig(t);
    }
  }
  get MinMontageSpeedFactor() {
    if (!this.l7l) {
      this.l7l = true;
      this._7l = this.FbDataInternal.minMontageSpeedFactor();
    }
    return this._7l;
  }
  get MaxMontageSpeedFactor() {
    if (!this.c7l) {
      this.c7l = true;
      this.u7l = this.FbDataInternal.maxMontageSpeedFactor();
    }
    return this.u7l;
  }
  get MinVehicleSpeed() {
    if (!this.d7l) {
      this.d7l = true;
      this.m7l = this.FbDataInternal.minVehicleSpeed();
    }
    return this.m7l;
  }
  get MaxVehicleSpeed() {
    if (!this.C7l) {
      this.C7l = true;
      this.g7l = this.FbDataInternal.maxVehicleSpeed();
    }
    return this.g7l;
  }
  get TargetState() {
    if (!this.IOh) {
      this.IOh = true;
      this.TOh = this.FbDataInternal.targetState();
    }
    return this.TOh;
  }
}
exports.FbVehicleMontagePlayConfig = FbVehicleMontagePlayConfig;
//# sourceMappingURL=FbVehicleMontagePlayConfig.js.map