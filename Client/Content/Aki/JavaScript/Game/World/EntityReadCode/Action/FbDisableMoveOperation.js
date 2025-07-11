"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDisableMoveOperation = undefined;
class FbDisableMoveOperation {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.o0h = false;
    this.n0h = false;
    this.s0h = false;
    this.a0h = false;
    this.e0h = false;
    this.t0h = false;
    this.i0h = false;
    this.r0h = false;
    this.Qyh = false;
    this.Kyh = false;
    this.$yh = false;
    this.Xyh = false;
    this.Yyh = false;
    this.zyh = false;
  }
  static Create(t) {
    if (t) {
      return new FbDisableMoveOperation(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
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
  get ForceWalk() {
    if (!this.Qyh) {
      this.Qyh = true;
      this.Kyh = this.FbDataInternal.forceWalk();
    }
    return this.Kyh;
  }
  get ForceJog() {
    if (!this.$yh) {
      this.$yh = true;
      this.Xyh = this.FbDataInternal.forceJog();
    }
    return this.Xyh;
  }
  get ForbidSprint() {
    if (!this.Yyh) {
      this.Yyh = true;
      this.zyh = this.FbDataInternal.forbidSprint();
    }
    return this.zyh;
  }
}
exports.FbDisableMoveOperation = FbDisableMoveOperation;
//# sourceMappingURL=FbDisableMoveOperation.js.map