"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnterLeaveRadius = undefined;
class FbEnterLeaveRadius {
  constructor(t) {
    this.FbDataInternal = t;
    this.Cmh = false;
    this.gmh = 0;
    this.fmh = false;
    this.pmh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbEnterLeaveRadius(t);
    }
  }
  get EnterRadius() {
    if (!this.Cmh) {
      this.Cmh = true;
      this.gmh = this.FbDataInternal.enterRadius();
    }
    return this.gmh;
  }
  get LeaveRadius() {
    if (!this.fmh) {
      this.fmh = true;
      this.pmh = this.FbDataInternal.leaveRadius();
    }
    return this.pmh;
  }
}
exports.FbEnterLeaveRadius = FbEnterLeaveRadius;
//# sourceMappingURL=FbEnterLeaveRadius.js.map