"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLimitPlayerMove = undefined;
class FbLimitPlayerMove {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Pyh = false;
    this.Uyh = false;
  }
  static Create(t) {
    if (t) {
      return new FbLimitPlayerMove(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get IsOnlyForward() {
    if (!this.Pyh) {
      this.Pyh = true;
      this.Uyh = this.FbDataInternal.isOnlyForward();
    }
    return this.Uyh;
  }
}
exports.FbLimitPlayerMove = FbLimitPlayerMove;
//# sourceMappingURL=FbLimitPlayerMove.js.map