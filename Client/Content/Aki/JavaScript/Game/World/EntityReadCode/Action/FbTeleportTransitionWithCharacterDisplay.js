"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleportTransitionWithCharacterDisplay = undefined;
class FbTeleportTransitionWithCharacterDisplay {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.fc1 = false;
    this.gc1 = 0;
  }
  static Create(t) {
    if (t) {
      return new FbTeleportTransitionWithCharacterDisplay(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get StyleId() {
    if (!this.fc1) {
      this.fc1 = true;
      this.gc1 = this.FbDataInternal.styleId();
    }
    return this.gc1;
  }
}
exports.FbTeleportTransitionWithCharacterDisplay = FbTeleportTransitionWithCharacterDisplay;
//# sourceMappingURL=FbTeleportTransitionWithCharacterDisplay.js.map