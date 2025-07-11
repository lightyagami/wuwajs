"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetReviveRegion = undefined;
class FbSetReviveRegion {
  constructor(t) {
    this.FbDataInternal = t;
    this.u0h = false;
    this.d0h = undefined;
    this.m0h = false;
    this.C0h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSetReviveRegion(t);
    }
  }
  get SetReviveType() {
    if (!this.u0h) {
      this.u0h = true;
      this.d0h = this.FbDataInternal.setReviveType();
    }
    return this.d0h;
  }
  get ReviveId() {
    if (!this.m0h) {
      this.m0h = true;
      this.C0h = this.FbDataInternal.reviveId();
    }
    return this.C0h;
  }
}
exports.FbSetReviveRegion = FbSetReviveRegion;
//# sourceMappingURL=FbSetReviveRegion.js.map