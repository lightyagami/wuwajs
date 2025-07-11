"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetPlayerMoveControl = undefined;
class FbSetPlayerMoveControl {
  constructor(t) {
    this.FbDataInternal = t;
    this.e0h = false;
    this.t0h = 0;
    this.i0h = false;
    this.r0h = 0;
    this.o0h = false;
    this.n0h = 0;
    this.s0h = false;
    this.a0h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSetPlayerMoveControl(t);
    }
  }
  get Left() {
    if (!this.e0h) {
      this.e0h = true;
      this.t0h = this.FbDataInternal.left();
    }
    return this.t0h;
  }
  get Right() {
    if (!this.i0h) {
      this.i0h = true;
      this.r0h = this.FbDataInternal.right();
    }
    return this.r0h;
  }
  get Forward() {
    if (!this.o0h) {
      this.o0h = true;
      this.n0h = this.FbDataInternal.forward();
    }
    return this.n0h;
  }
  get Back() {
    if (!this.s0h) {
      this.s0h = true;
      this.a0h = this.FbDataInternal.back();
    }
    return this.a0h;
  }
}
exports.FbSetPlayerMoveControl = FbSetPlayerMoveControl;
//# sourceMappingURL=FbSetPlayerMoveControl.js.map