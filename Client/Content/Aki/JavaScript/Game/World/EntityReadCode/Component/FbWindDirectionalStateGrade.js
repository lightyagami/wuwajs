"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbWindDirectionalStateGrade = undefined;
class FbWindDirectionalStateGrade {
  constructor(t) {
    this.FbDataInternal = t;
    this.Bch = false;
    this.Cbo = undefined;
    this.qmh = false;
    this.H8o = 0;
    this.iOc = false;
    this.rOc = 0;
  }
  static Create(t) {
    if (t) {
      return new FbWindDirectionalStateGrade(t);
    }
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get Speed() {
    if (!this.qmh) {
      this.qmh = true;
      this.H8o = this.FbDataInternal.speed();
    }
    return this.H8o;
  }
  get Strength() {
    if (!this.iOc) {
      this.iOc = true;
      this.rOc = this.FbDataInternal.strength();
    }
    return this.rOc;
  }
}
exports.FbWindDirectionalStateGrade = FbWindDirectionalStateGrade;
//# sourceMappingURL=FbWindDirectionalStateGrade.js.map