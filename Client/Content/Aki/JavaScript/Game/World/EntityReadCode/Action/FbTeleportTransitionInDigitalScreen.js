"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleportTransitionInDigitalScreen = undefined;
class FbTeleportTransitionInDigitalScreen {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.D0h = false;
    this.B0h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbTeleportTransitionInDigitalScreen(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ConfigId() {
    if (!this.D0h) {
      this.D0h = true;
      this.B0h = this.FbDataInternal.configId();
    }
    return this.B0h;
  }
}
exports.FbTeleportTransitionInDigitalScreen = FbTeleportTransitionInDigitalScreen;
//# sourceMappingURL=FbTeleportTransitionInDigitalScreen.js.map