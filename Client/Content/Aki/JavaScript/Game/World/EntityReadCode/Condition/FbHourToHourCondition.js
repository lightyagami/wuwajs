"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHourToHourCondition = undefined;
const FbHour_1 = require("./FbHour");
class FbHourToHourCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.lzh = false;
    this._zh = undefined;
    this.ODh = false;
    this.FDh = undefined;
    this._ch = false;
    this.cch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHourToHourCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Start() {
    if (!this.lzh) {
      this.lzh = true;
      this._zh = FbHour_1.FbHour.Create(this.FbDataInternal.start());
    }
    return this._zh;
  }
  get End() {
    if (!this.ODh) {
      this.ODh = true;
      this.FDh = FbHour_1.FbHour.Create(this.FbDataInternal.end());
    }
    return this.FDh;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
}
exports.FbHourToHourCondition = FbHourToHourCondition;
//# sourceMappingURL=FbHourToHourCondition.js.map