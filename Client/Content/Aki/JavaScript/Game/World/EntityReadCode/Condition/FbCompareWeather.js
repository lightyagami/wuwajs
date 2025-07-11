"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareWeather = undefined;
class FbCompareWeather {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
    this.Szh = false;
    this.Mzh = undefined;
    this.ebh = false;
    this.tbh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCompareWeather(t);
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
  get Weather() {
    if (!this.Szh) {
      this.Szh = true;
      this.Mzh = this.FbDataInternal.weather();
    }
    return this.Mzh;
  }
  get WeatherId() {
    if (!this.ebh) {
      this.ebh = true;
      this.tbh = this.FbDataInternal.weatherId();
    }
    return this.tbh;
  }
}
exports.FbCompareWeather = FbCompareWeather;
//# sourceMappingURL=FbCompareWeather.js.map