"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckTrackMoonPopularity = undefined;
class FbCheckTrackMoonPopularity {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
    this.vJh = false;
    this.yJh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCheckTrackMoonPopularity(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get Popularity() {
    if (!this.vJh) {
      this.vJh = true;
      this.yJh = this.FbDataInternal.popularity();
    }
    return this.yJh;
  }
}
exports.FbCheckTrackMoonPopularity = FbCheckTrackMoonPopularity;
//# sourceMappingURL=FbCheckTrackMoonPopularity.js.map