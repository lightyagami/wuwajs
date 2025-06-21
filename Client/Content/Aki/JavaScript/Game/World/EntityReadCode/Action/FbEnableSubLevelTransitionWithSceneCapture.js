"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbEnableSubLevelTransitionWithSceneCapture = void 0;
class FbEnableSubLevelTransitionWithSceneCapture {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.U8_ = !1, this.D8_ = void 0, this.B8_ = !1, this.LIo = void 0, this.lu1 = !1, this._u1 = void 0
  }
  static Create(t) {
    if (t) return new FbEnableSubLevelTransitionWithSceneCapture(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get SceneCaptureEffect() {
    return this.U8_ || (this.U8_ = !0, this.D8_ = this.FbDataInternal.sceneCaptureEffect()), this.D8_
  }
  get ScreenEffect() {
    return this.B8_ || (this.B8_ = !0, this.LIo = this.FbDataInternal.screenEffect()), this.LIo
  }
  get ScreenEffectLoop() {
    return this.lu1 || (this.lu1 = !0, this._u1 = this.FbDataInternal.screenEffectLoop()), this._u1
  }
}
exports.FbEnableSubLevelTransitionWithSceneCapture = FbEnableSubLevelTransitionWithSceneCapture;
//# sourceMappingURL=FbEnableSubLevelTransitionWithSceneCapture.js.map