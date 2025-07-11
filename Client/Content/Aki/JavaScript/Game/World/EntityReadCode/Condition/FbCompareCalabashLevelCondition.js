"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareCalabashLevelCondition = undefined;
class FbCompareCalabashLevelCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
    this.nzh = false;
    this.szh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCompareCalabashLevelCondition(t);
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
  get CalabashLevel() {
    if (!this.nzh) {
      this.nzh = true;
      this.szh = this.FbDataInternal.calabashLevel();
    }
    return this.szh;
  }
}
exports.FbCompareCalabashLevelCondition = FbCompareCalabashLevelCondition;
//# sourceMappingURL=FbCompareCalabashLevelCondition.js.map