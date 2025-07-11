"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAudioFade = undefined;
class FbAudioFade {
  constructor(t) {
    this.FbDataInternal = t;
    this.$8h = false;
    this.X8h = undefined;
    this.Y8h = false;
    this.z8h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbAudioFade(t);
    }
  }
  get FadeCurve() {
    if (!this.$8h) {
      this.$8h = true;
      this.X8h = this.FbDataInternal.fadeCurve();
    }
    return this.X8h;
  }
  get FadeDuration() {
    if (!this.Y8h) {
      this.Y8h = true;
      this.z8h = this.FbDataInternal.fadeDuration();
    }
    return this.z8h;
  }
}
exports.FbAudioFade = FbAudioFade;
//# sourceMappingURL=FbAudioFade.js.map