"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAutoConfig = undefined;
class FbAutoConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.QRh = false;
    this.KRh = false;
    this.W6h = false;
    this.e6o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbAutoConfig(t);
    }
  }
  get IsCircle() {
    if (!this.QRh) {
      this.QRh = true;
      this.KRh = this.FbDataInternal.isCircle();
    }
    return this.KRh;
  }
  get Interval() {
    if (!this.W6h) {
      this.W6h = true;
      this.e6o = this.FbDataInternal.interval();
    }
    return this.e6o;
  }
}
exports.FbAutoConfig = FbAutoConfig;
//# sourceMappingURL=FbAutoConfig.js.map