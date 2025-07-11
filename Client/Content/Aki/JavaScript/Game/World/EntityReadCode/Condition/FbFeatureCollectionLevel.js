"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFeatureCollectionLevel = undefined;
class FbFeatureCollectionLevel {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.tgh = false;
    this.FFe = 0;
    this._ch = false;
    this.cch = undefined;
    this.Muh = false;
    this.jGi = 0;
  }
  static Create(t) {
    if (t) {
      return new FbFeatureCollectionLevel(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get Level() {
    if (!this.Muh) {
      this.Muh = true;
      this.jGi = this.FbDataInternal.level();
    }
    return this.jGi;
  }
}
exports.FbFeatureCollectionLevel = FbFeatureCollectionLevel;
//# sourceMappingURL=FbFeatureCollectionLevel.js.map