"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHeadStyleWeakSignal = undefined;
class FbHeadStyleWeakSignal {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHeadStyleWeakSignal(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
}
exports.FbHeadStyleWeakSignal = FbHeadStyleWeakSignal;
//# sourceMappingURL=FbHeadStyleWeakSignal.js.map