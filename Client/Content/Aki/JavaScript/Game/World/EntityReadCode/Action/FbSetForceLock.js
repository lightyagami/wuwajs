"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetForceLock = undefined;
class FbSetForceLock {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.$ph = false;
    this.Xph = false;
  }
  static Create(t) {
    if (t) {
      return new FbSetForceLock(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get IsLocked() {
    if (!this.$ph) {
      this.$ph = true;
      this.Xph = this.FbDataInternal.isLocked();
    }
    return this.Xph;
  }
}
exports.FbSetForceLock = FbSetForceLock;
//# sourceMappingURL=FbSetForceLock.js.map