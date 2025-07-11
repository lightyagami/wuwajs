"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnableTemporaryTeleport = undefined;
class FbEnableTemporaryTeleport {
  constructor(t) {
    this.FbDataInternal = t;
    this.Jch = false;
    this.l7 = false;
    this.ILh = false;
    this.TLh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbEnableTemporaryTeleport(t);
    }
  }
  get Enable() {
    if (!this.Jch) {
      this.Jch = true;
      this.l7 = this.FbDataInternal.enable();
    }
    return this.l7;
  }
  get RangeEntity() {
    if (!this.ILh) {
      this.ILh = true;
      this.TLh = this.FbDataInternal.rangeEntity();
    }
    return this.TLh;
  }
}
exports.FbEnableTemporaryTeleport = FbEnableTemporaryTeleport;
//# sourceMappingURL=FbEnableTemporaryTeleport.js.map