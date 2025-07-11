"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetWeather = undefined;
class FbSetWeather {
  constructor(t) {
    this.FbDataInternal = t;
    this.ebh = false;
    this.tbh = 0;
    this.g5h = false;
    this.f5h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetWeather(t);
    }
  }
  get WeatherId() {
    if (!this.ebh) {
      this.ebh = true;
      this.tbh = this.FbDataInternal.weatherId();
    }
    return this.tbh;
  }
  get AreaIds() {
    if (!this.g5h) {
      this.g5h = true;
      this.f5h = new Array();
      var e = this.FbDataInternal.areaIdsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          this.f5h.push(this.FbDataInternal.areaIds(t));
        }
      }
    }
    return this.f5h;
  }
}
exports.FbSetWeather = FbSetWeather;
//# sourceMappingURL=FbSetWeather.js.map