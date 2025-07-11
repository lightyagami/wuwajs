"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleportTransitionWithFadeInScreen = undefined;
class FbTeleportTransitionWithFadeInScreen {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.aCh = false;
    this.hCh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTeleportTransitionWithFadeInScreen(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ScreenType() {
    if (!this.aCh) {
      this.aCh = true;
      this.hCh = this.FbDataInternal.screenType();
    }
    return this.hCh;
  }
}
exports.FbTeleportTransitionWithFadeInScreen = FbTeleportTransitionWithFadeInScreen;
//# sourceMappingURL=FbTeleportTransitionWithFadeInScreen.js.map