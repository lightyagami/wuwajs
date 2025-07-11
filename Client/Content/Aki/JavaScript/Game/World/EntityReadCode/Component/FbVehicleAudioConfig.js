"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleAudioConfig = undefined;
class FbVehicleAudioConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.d7l = false;
    this.m7l = 0;
    this.C7l = false;
    this.g7l = 0;
    this.Hq_ = false;
    this.$q_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbVehicleAudioConfig(t);
    }
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
  get AudioEvent() {
    if (!this.Hq_) {
      this.Hq_ = true;
      this.$q_ = this.FbDataInternal.audioEvent();
    }
    return this.$q_;
  }
}
exports.FbVehicleAudioConfig = FbVehicleAudioConfig;
//# sourceMappingURL=FbVehicleAudioConfig.js.map