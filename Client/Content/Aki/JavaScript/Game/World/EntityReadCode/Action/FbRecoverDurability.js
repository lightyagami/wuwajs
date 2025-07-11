"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRecoverDurability = undefined;
class FbRecoverDurability {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbRecoverDurability(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
}
exports.FbRecoverDurability = FbRecoverDurability;
//# sourceMappingURL=FbRecoverDurability.js.map