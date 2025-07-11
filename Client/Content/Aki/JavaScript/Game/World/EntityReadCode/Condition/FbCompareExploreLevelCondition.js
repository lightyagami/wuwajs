"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareExploreLevelCondition = undefined;
class FbCompareExploreLevelCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
    this.Muh = false;
    this.jGi = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCompareExploreLevelCondition(t);
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
  get Level() {
    if (!this.Muh) {
      this.Muh = true;
      this.jGi = this.FbDataInternal.level();
    }
    return this.jGi;
  }
}
exports.FbCompareExploreLevelCondition = FbCompareExploreLevelCondition;
//# sourceMappingURL=FbCompareExploreLevelCondition.js.map