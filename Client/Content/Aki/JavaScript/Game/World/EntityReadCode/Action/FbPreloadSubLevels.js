"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPreloadSubLevels = undefined;
class FbPreloadSubLevels {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.VTh = false;
    this.jTh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPreloadSubLevels(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get PreloadLevels() {
    if (!this.VTh) {
      this.VTh = true;
      this.jTh = new Array();
      var e = this.FbDataInternal.preloadLevelsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          this.jTh.push(this.FbDataInternal.preloadLevels(t));
        }
      }
    }
    return this.jTh;
  }
}
exports.FbPreloadSubLevels = FbPreloadSubLevels;
//# sourceMappingURL=FbPreloadSubLevels.js.map