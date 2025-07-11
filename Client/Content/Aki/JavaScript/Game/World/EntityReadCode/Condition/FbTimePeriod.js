"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTimePeriod = undefined;
class FbTimePeriod {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
    this.vzh = false;
    this.yzh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTimePeriod(t);
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
  get TimePeriod() {
    if (!this.vzh) {
      this.vzh = true;
      this.yzh = this.FbDataInternal.timePeriod();
    }
    return this.yzh;
  }
}
exports.FbTimePeriod = FbTimePeriod;
//# sourceMappingURL=FbTimePeriod.js.map