"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDisableAllPlayerOperation = undefined;
class FbDisableAllPlayerOperation {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Dyh = false;
    this.Byh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDisableAllPlayerOperation(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get DisplayMode() {
    if (!this.Dyh) {
      this.Dyh = true;
      this.Byh = this.FbDataInternal.displayMode();
    }
    return this.Byh;
  }
}
exports.FbDisableAllPlayerOperation = FbDisableAllPlayerOperation;
//# sourceMappingURL=FbDisableAllPlayerOperation.js.map