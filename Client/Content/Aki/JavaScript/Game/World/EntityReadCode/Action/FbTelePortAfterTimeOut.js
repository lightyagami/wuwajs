"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTelePortAfterTimeOut = undefined;
class FbTelePortAfterTimeOut {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.P0h = false;
    this.U0h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbTelePortAfterTimeOut(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TimeOut() {
    if (!this.P0h) {
      this.P0h = true;
      this.U0h = this.FbDataInternal.timeOut();
    }
    return this.U0h;
  }
}
exports.FbTelePortAfterTimeOut = FbTelePortAfterTimeOut;
//# sourceMappingURL=FbTelePortAfterTimeOut.js.map