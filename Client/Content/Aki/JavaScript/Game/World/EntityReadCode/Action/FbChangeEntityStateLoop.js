"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeEntityStateLoop = undefined;
class FbChangeEntityStateLoop {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.Fch = false;
    this.Nch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbChangeEntityStateLoop(t);
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
  get Circulation() {
    if (!this.Fch) {
      this.Fch = true;
      this.Nch = this.FbDataInternal.circulation();
    }
    return this.Nch;
  }
}
exports.FbChangeEntityStateLoop = FbChangeEntityStateLoop;
//# sourceMappingURL=FbChangeEntityStateLoop.js.map