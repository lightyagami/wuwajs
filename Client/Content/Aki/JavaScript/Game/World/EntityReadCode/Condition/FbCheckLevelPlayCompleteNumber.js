"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckLevelPlayCompleteNumber = undefined;
class FbCheckLevelPlayCompleteNumber {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Ezh = false;
    this.Izh = 0;
    this._ch = false;
    this.cch = undefined;
    this.Tzh = false;
    this.bzh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCheckLevelPlayCompleteNumber(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get LevelId() {
    if (!this.Ezh) {
      this.Ezh = true;
      this.Izh = this.FbDataInternal.levelId();
    }
    return this.Izh;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get Number() {
    if (!this.Tzh) {
      this.Tzh = true;
      this.bzh = this.FbDataInternal.number();
    }
    return this.bzh;
  }
}
exports.FbCheckLevelPlayCompleteNumber = FbCheckLevelPlayCompleteNumber;
//# sourceMappingURL=FbCheckLevelPlayCompleteNumber.js.map