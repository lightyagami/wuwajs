"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCollect = undefined;
class FbCollect {
  constructor(t) {
    this.FbDataInternal = t;
    this.Hch = false;
    this.Wch = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCollect(t);
    }
  }
  get TargetEntity() {
    if (!this.Hch) {
      this.Hch = true;
      this.Wch = this.FbDataInternal.targetEntity();
    }
    return this.Wch;
  }
}
exports.FbCollect = FbCollect;
//# sourceMappingURL=FbCollect.js.map