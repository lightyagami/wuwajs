"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOpenGravity = undefined;
class FbOpenGravity {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.S0h = false;
    this.M0h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbOpenGravity(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get PositionEntityId() {
    if (!this.S0h) {
      this.S0h = true;
      this.M0h = this.FbDataInternal.positionEntityId();
    }
    return this.M0h;
  }
}
exports.FbOpenGravity = FbOpenGravity;
//# sourceMappingURL=FbOpenGravity.js.map