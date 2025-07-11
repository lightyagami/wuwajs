"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbWait = undefined;
class FbWait {
  constructor(t) {
    this.FbDataInternal = t;
    this.G1h = false;
    this.O1h = 0;
    this.Fph = false;
    this.Nph = 0;
    this.bch = false;
    this.Lch = false;
  }
  static Create(t) {
    if (t) {
      return new FbWait(t);
    }
  }
  get Min() {
    if (!this.G1h) {
      this.G1h = true;
      this.O1h = this.FbDataInternal.min();
    }
    return this.O1h;
  }
  get Time() {
    if (!this.Fph) {
      this.Fph = true;
      this.Nph = this.FbDataInternal.time();
    }
    return this.Nph;
  }
  get BanInput() {
    if (!this.bch) {
      this.bch = true;
      this.Lch = this.FbDataInternal.banInput();
    }
    return this.Lch;
  }
}
exports.FbWait = FbWait;
//# sourceMappingURL=FbWait.js.map