"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbClock = undefined;
class FbClock {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
    this.lzh = false;
    this._zh = 0;
    this.ODh = false;
    this.FDh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbClock(t);
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
  get Start() {
    if (!this.lzh) {
      this.lzh = true;
      this._zh = this.FbDataInternal.start();
    }
    return this._zh;
  }
  get End() {
    if (!this.ODh) {
      this.ODh = true;
      this.FDh = this.FbDataInternal.end();
    }
    return this.FDh;
  }
}
exports.FbClock = FbClock;
//# sourceMappingURL=FbClock.js.map