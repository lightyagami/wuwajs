"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGravityFlipFixedPos = undefined;
class FbGravityFlipFixedPos {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.R0h = false;
    this.w0h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbGravityFlipFixedPos(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get GravityAndPosEntityId() {
    if (!this.R0h) {
      this.R0h = true;
      this.w0h = this.FbDataInternal.gravityAndPosEntityId();
    }
    return this.w0h;
  }
}
exports.FbGravityFlipFixedPos = FbGravityFlipFixedPos;
//# sourceMappingURL=FbGravityFlipFixedPos.js.map