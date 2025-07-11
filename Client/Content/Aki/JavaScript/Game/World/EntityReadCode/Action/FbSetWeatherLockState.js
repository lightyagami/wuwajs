"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetWeatherLockState = undefined;
class FbSetWeatherLockState {
  constructor(t) {
    this.FbDataInternal = t;
    this.ibh = false;
    this.rbh = undefined;
    this.g5h = false;
    this.f5h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetWeatherLockState(t);
    }
  }
  get LockState() {
    if (!this.ibh) {
      this.ibh = true;
      this.rbh = this.FbDataInternal.lockState();
    }
    return this.rbh;
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
exports.FbSetWeatherLockState = FbSetWeatherLockState;
//# sourceMappingURL=FbSetWeatherLockState.js.map