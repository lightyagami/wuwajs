"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbPassengerTeleportConfig = void 0;
const FbPosA_1 = require("../Action/FbPosA");
class FbPassengerTeleportConfig {
  constructor(s) {
    this.FbDataInternal = s, this.vCc = !1, this.yCc = void 0
  }
  static Create(s) {
    if (s) return new FbPassengerTeleportConfig(s)
  }
  get PosA() {
    return this.vCc || (this.vCc = !0, this.yCc = FbPosA_1.FbPosA.Create(this.FbDataInternal.posA())), this.yCc
  }
}
exports.FbPassengerTeleportConfig = FbPassengerTeleportConfig;
//# sourceMappingURL=FbPassengerTeleportConfig.js.map