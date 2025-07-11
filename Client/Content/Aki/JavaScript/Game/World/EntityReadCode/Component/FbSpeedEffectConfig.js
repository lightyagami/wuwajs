"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSpeedEffectConfig = undefined;
class FbSpeedEffectConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.d7l = false;
    this.m7l = 0;
    this.C7l = false;
    this.g7l = 0;
    this.Vq_ = false;
    this.jq_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSpeedEffectConfig(t);
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
  get GameplayCueIds() {
    if (!this.Vq_) {
      this.Vq_ = true;
      this.jq_ = new Array();
      var e = this.FbDataInternal.gameplayCueIdsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          this.jq_.push(Number(this.FbDataInternal.gameplayCueIds(t) ?? 0));
        }
      }
    }
    return this.jq_;
  }
}
exports.FbSpeedEffectConfig = FbSpeedEffectConfig;
//# sourceMappingURL=FbSpeedEffectConfig.js.map