"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbResetEntityPos = undefined;
class FbResetEntityPos {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbResetEntityPos(t);
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
exports.FbResetEntityPos = FbResetEntityPos;
//# sourceMappingURL=FbResetEntityPos.js.map