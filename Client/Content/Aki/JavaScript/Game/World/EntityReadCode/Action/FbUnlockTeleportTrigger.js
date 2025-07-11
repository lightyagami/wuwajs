"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbUnlockTeleportTrigger = undefined;
class FbUnlockTeleportTrigger {
  constructor(t) {
    this.FbDataInternal = t;
    this.h0h = false;
    this.l0h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbUnlockTeleportTrigger(t);
    }
  }
  get TeleportId() {
    if (!this.h0h) {
      this.h0h = true;
      this.l0h = this.FbDataInternal.teleportId();
    }
    return this.l0h;
  }
}
exports.FbUnlockTeleportTrigger = FbUnlockTeleportTrigger;
//# sourceMappingURL=FbUnlockTeleportTrigger.js.map