"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMovementPerformConfig = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbSpeedEffectConfig_1 = require("./FbSpeedEffectConfig");
const FbVehicleMontagePlayConfig_1 = require("./FbVehicleMontagePlayConfig");
class FbMovementPerformConfig {
  constructor(e) {
    this.FbDataInternal = e;
    this.a7l = false;
    this.h7l = undefined;
    this.Fq_ = false;
    this.Nq_ = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbMovementPerformConfig(e);
    }
  }
  get VehicleMontagePlayConfigs() {
    if (!this.a7l) {
      this.a7l = true;
      this.h7l = new Array();
      var t = this.FbDataInternal.vehicleMontagePlayConfigsLength();
      if (t) {
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.vehicleMontagePlayConfigs(e, new fb_component_1.VehicleMontagePlayConfig());
          this.h7l.push(FbVehicleMontagePlayConfig_1.FbVehicleMontagePlayConfig.Create(i));
        }
      }
    }
    return this.h7l;
  }
  get PlayerSpeedEffectConfigs() {
    if (!this.Fq_) {
      this.Fq_ = true;
      this.Nq_ = new Array();
      var t = this.FbDataInternal.playerSpeedEffectConfigsLength();
      if (t) {
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.playerSpeedEffectConfigs(e, new fb_component_1.SpeedEffectConfig());
          this.Nq_.push(FbSpeedEffectConfig_1.FbSpeedEffectConfig.Create(i));
        }
      }
    }
    return this.Nq_;
  }
}
exports.FbMovementPerformConfig = FbMovementPerformConfig;
//# sourceMappingURL=FbMovementPerformConfig.js.map