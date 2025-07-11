"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMovieBackgroundFadeData = undefined;
class FbMovieBackgroundFadeData {
  constructor(t) {
    this.FbDataInternal = t;
    this.Fdh = false;
    this.Ndh = undefined;
    this.Vdh = false;
    this.jdh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMovieBackgroundFadeData(t);
    }
  }
  get FadeInBackgroundType() {
    if (!this.Fdh) {
      this.Fdh = true;
      this.Ndh = this.FbDataInternal.fadeInBackgroundType();
    }
    return this.Ndh;
  }
  get FadeOutBackgroundType() {
    if (!this.Vdh) {
      this.Vdh = true;
      this.jdh = this.FbDataInternal.fadeOutBackgroundType();
    }
    return this.jdh;
  }
}
exports.FbMovieBackgroundFadeData = FbMovieBackgroundFadeData;
//# sourceMappingURL=FbMovieBackgroundFadeData.js.map