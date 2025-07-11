"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityAttachTarget = undefined;
class FbEntityAttachTarget {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.x7h = false;
    this.R7h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityAttachTarget(t);
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
  get AttachPoint() {
    if (!this.x7h) {
      this.x7h = true;
      this.R7h = this.FbDataInternal.attachPoint();
    }
    return this.R7h;
  }
}
exports.FbEntityAttachTarget = FbEntityAttachTarget;
//# sourceMappingURL=FbEntityAttachTarget.js.map