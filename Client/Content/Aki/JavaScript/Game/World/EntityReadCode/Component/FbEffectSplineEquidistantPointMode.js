"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEffectSplineEquidistantPointMode = undefined;
class FbEffectSplineEquidistantPointMode {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._9h = false;
    this.c9h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbEffectSplineEquidistantPointMode(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Space() {
    if (!this._9h) {
      this._9h = true;
      this.c9h = this.FbDataInternal.space();
    }
    return this.c9h;
  }
}
exports.FbEffectSplineEquidistantPointMode = FbEffectSplineEquidistantPointMode;
//# sourceMappingURL=FbEffectSplineEquidistantPointMode.js.map