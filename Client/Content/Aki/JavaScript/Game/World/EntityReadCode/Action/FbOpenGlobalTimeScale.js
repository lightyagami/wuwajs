"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbOpenGlobalTimeScale = void 0;
class FbOpenGlobalTimeScale {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.Ld1 = !1, this.ATo = 0, this.I_h = !1, this.y6o = 0, this.wd1 = !1, this.Ad1 = !1
  }
  static Create(t) {
    if (t) return new FbOpenGlobalTimeScale(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get TimeScale() {
    return this.Ld1 || (this.Ld1 = !0, this.ATo = this.FbDataInternal.timeScale()), this.ATo
  }
  get Duration() {
    return this.I_h || (this.I_h = !0, this.y6o = this.FbDataInternal.duration()), this.y6o
  }
  get ExceptPlayer() {
    return this.wd1 || (this.wd1 = !0, this.Ad1 = this.FbDataInternal.exceptPlayer()), this.Ad1
  }
}
exports.FbOpenGlobalTimeScale = FbOpenGlobalTimeScale;
//# sourceMappingURL=FbOpenGlobalTimeScale.js.map