"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAudioVehicleFeature = undefined;
const FbVehicleAudioConfig_1 = require("./FbVehicleAudioConfig");
class FbAudioVehicleFeature {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.Oq_ = false;
    this.Gq_ = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbAudioVehicleFeature(i);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get AudioConfigs() {
    if (!this.Oq_) {
      this.Oq_ = true;
      this.Gq_ = FbVehicleAudioConfig_1.FbVehicleAudioConfig.Create(this.FbDataInternal.audioConfigs());
    }
    return this.Gq_;
  }
}
exports.FbAudioVehicleFeature = FbAudioVehicleFeature;
//# sourceMappingURL=FbAudioVehicleFeature.js.map