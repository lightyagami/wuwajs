"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbItemGetUiConfigSpecialQuest = undefined;
class FbItemGetUiConfigSpecialQuest {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._uh = false;
    this.cuh = undefined;
    this.uuh = false;
    this.duh = false;
  }
  static Create(t) {
    if (t) {
      return new FbItemGetUiConfigSpecialQuest(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Title() {
    if (!this._uh) {
      this._uh = true;
      this.cuh = this.FbDataInternal.title();
    }
    return this.cuh;
  }
  get ShowDetail() {
    if (!this.uuh) {
      this.uuh = true;
      this.duh = this.FbDataInternal.showDetail();
    }
    return this.duh;
  }
}
exports.FbItemGetUiConfigSpecialQuest = FbItemGetUiConfigSpecialQuest;
//# sourceMappingURL=FbItemGetUiConfigSpecialQuest.js.map