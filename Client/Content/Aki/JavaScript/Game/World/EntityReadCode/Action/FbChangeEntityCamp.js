"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeEntityCamp = undefined;
class FbChangeEntityCamp {
  constructor(t) {
    this.FbDataInternal = t;
    this.Hch = false;
    this.Wch = 0;
    this.qwh = false;
    this.kwh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbChangeEntityCamp(t);
    }
  }
  get TargetEntity() {
    if (!this.Hch) {
      this.Hch = true;
      this.Wch = this.FbDataInternal.targetEntity();
    }
    return this.Wch;
  }
  get Camp() {
    if (!this.qwh) {
      this.qwh = true;
      this.kwh = this.FbDataInternal.camp();
    }
    return this.kwh;
  }
}
exports.FbChangeEntityCamp = FbChangeEntityCamp;
//# sourceMappingURL=FbChangeEntityCamp.js.map