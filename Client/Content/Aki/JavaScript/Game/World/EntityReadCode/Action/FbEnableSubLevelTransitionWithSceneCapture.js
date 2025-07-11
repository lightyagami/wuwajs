"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnableSubLevelTransitionWithSceneCapture = undefined;
class FbEnableSubLevelTransitionWithSceneCapture {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.U8_ = false;
    this.D8_ = undefined;
    this.B8_ = false;
    this.LIo = undefined;
    this.xu1 = false;
    this.Uu1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEnableSubLevelTransitionWithSceneCapture(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get SceneCaptureEffect() {
    if (!this.U8_) {
      this.U8_ = true;
      this.D8_ = this.FbDataInternal.sceneCaptureEffect();
    }
    return this.D8_;
  }
  get ScreenEffect() {
    if (!this.B8_) {
      this.B8_ = true;
      this.LIo = this.FbDataInternal.screenEffect();
    }
    return this.LIo;
  }
  get ScreenEffectLoop() {
    if (!this.xu1) {
      this.xu1 = true;
      this.Uu1 = this.FbDataInternal.screenEffectLoop();
    }
    return this.Uu1;
  }
}
exports.FbEnableSubLevelTransitionWithSceneCapture = FbEnableSubLevelTransitionWithSceneCapture;
//# sourceMappingURL=FbEnableSubLevelTransitionWithSceneCapture.js.map