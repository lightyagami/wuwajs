"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbVehiclePlayPassengerVoice = void 0;
const FbPlayVoicePassengersConfig_1 = require("./FbPlayVoicePassengersConfig");
class FbVehiclePlayPassengerVoice {
  constructor(e) {
    this.FbDataInternal = e, this.S5l = !1, this.M5l = void 0, this.yoc = !1, this.Soc = void 0
  }
  static Create(e) {
    if (e) return new FbVehiclePlayPassengerVoice(e)
  }
  get TriggerType() {
    return this.S5l || (this.S5l = !0, this.M5l = this.FbDataInternal.triggerType()), this.M5l
  }
  get TriggerPassengers() {
    return this.yoc || (this.yoc = !0, this.Soc = FbPlayVoicePassengersConfig_1.FbPlayVoicePassengersConfig.Create(this.FbDataInternal.triggerPassengers())), this.Soc
  }
}
exports.FbVehiclePlayPassengerVoice = FbVehiclePlayPassengerVoice;
//# sourceMappingURL=FbVehiclePlayPassengerVoice.js.map