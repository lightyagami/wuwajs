"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleportSceneEffect = undefined;
class FbTeleportSceneEffect {
  constructor(t) {
    this.FbDataInternal = t;
    this.JKh = false;
    this.ZKh = undefined;
    this.e$h = false;
    this.t$h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTeleportSceneEffect(t);
    }
  }
  get WorldEffectPath() {
    if (!this.JKh) {
      this.JKh = true;
      this.ZKh = this.FbDataInternal.worldEffectPath();
    }
    return this.ZKh;
  }
  get ScreenEffectPath() {
    if (!this.e$h) {
      this.e$h = true;
      this.t$h = this.FbDataInternal.screenEffectPath();
    }
    return this.t$h;
  }
}
exports.FbTeleportSceneEffect = FbTeleportSceneEffect;
//# sourceMappingURL=FbTeleportSceneEffect.js.map