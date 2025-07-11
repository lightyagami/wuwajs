"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetMoveSpeed = undefined;
class FbSetMoveSpeed {
  constructor(e) {
    this.FbDataInternal = e;
    this.qmh = false;
    this.H8o = 0;
  }
  static Create(e) {
    if (e) {
      return new FbSetMoveSpeed(e);
    }
  }
  get Speed() {
    if (!this.qmh) {
      this.qmh = true;
      this.H8o = this.FbDataInternal.speed();
    }
    return this.H8o;
  }
}
exports.FbSetMoveSpeed = FbSetMoveSpeed;
//# sourceMappingURL=FbSetMoveSpeed.js.map