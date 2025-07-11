"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOpenGlobalTimeScale = undefined;
class FbOpenGlobalTimeScale {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.jd1 = false;
    this.ATo = 0;
    this.I_h = false;
    this.y6o = 0;
    this.Hd1 = false;
    this.$d1 = false;
  }
  static Create(t) {
    if (t) {
      return new FbOpenGlobalTimeScale(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TimeScale() {
    if (!this.jd1) {
      this.jd1 = true;
      this.ATo = this.FbDataInternal.timeScale();
    }
    return this.ATo;
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = this.FbDataInternal.duration();
    }
    return this.y6o;
  }
  get ExceptPlayer() {
    if (!this.Hd1) {
      this.Hd1 = true;
      this.$d1 = this.FbDataInternal.exceptPlayer();
    }
    return this.$d1;
  }
}
exports.FbOpenGlobalTimeScale = FbOpenGlobalTimeScale;
//# sourceMappingURL=FbOpenGlobalTimeScale.js.map