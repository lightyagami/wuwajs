"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehiclePlayPassengerVoice = undefined;
const FbPlayVoicePassengersConfig_1 = require("./FbPlayVoicePassengersConfig");
class FbVehiclePlayPassengerVoice {
  constructor(e) {
    this.FbDataInternal = e;
    this.S5l = false;
    this.M5l = undefined;
    this.yoc = false;
    this.Soc = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbVehiclePlayPassengerVoice(e);
    }
  }
  get TriggerType() {
    if (!this.S5l) {
      this.S5l = true;
      this.M5l = this.FbDataInternal.triggerType();
    }
    return this.M5l;
  }
  get TriggerPassengers() {
    if (!this.yoc) {
      this.yoc = true;
      this.Soc = FbPlayVoicePassengersConfig_1.FbPlayVoicePassengersConfig.Create(this.FbDataInternal.triggerPassengers());
    }
    return this.Soc;
  }
}
exports.FbVehiclePlayPassengerVoice = FbVehiclePlayPassengerVoice;
//# sourceMappingURL=FbVehiclePlayPassengerVoice.js.map