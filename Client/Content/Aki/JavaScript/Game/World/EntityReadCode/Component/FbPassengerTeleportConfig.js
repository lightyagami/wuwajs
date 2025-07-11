"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPassengerTeleportConfig = undefined;
const FbPosA_1 = require("../Action/FbPosA");
class FbPassengerTeleportConfig {
  constructor(s) {
    this.FbDataInternal = s;
    this.vCc = false;
    this.yCc = undefined;
  }
  static Create(s) {
    if (s) {
      return new FbPassengerTeleportConfig(s);
    }
  }
  get PosA() {
    if (!this.vCc) {
      this.vCc = true;
      this.yCc = FbPosA_1.FbPosA.Create(this.FbDataInternal.posA());
    }
    return this.yCc;
  }
}
exports.FbPassengerTeleportConfig = FbPassengerTeleportConfig;
//# sourceMappingURL=FbPassengerTeleportConfig.js.map