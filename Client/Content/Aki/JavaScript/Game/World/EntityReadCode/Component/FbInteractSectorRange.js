"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInteractSectorRange = undefined;
class FbInteractSectorRange {
  constructor(t) {
    this.FbDataInternal = t;
    this.kDh = false;
    this.GDh = 0;
    this.ODh = false;
    this.FDh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbInteractSectorRange(t);
    }
  }
  get Begin() {
    if (!this.kDh) {
      this.kDh = true;
      this.GDh = this.FbDataInternal.begin();
    }
    return this.GDh;
  }
  get End() {
    if (!this.ODh) {
      this.ODh = true;
      this.FDh = this.FbDataInternal.end();
    }
    return this.FDh;
  }
}
exports.FbInteractSectorRange = FbInteractSectorRange;
//# sourceMappingURL=FbInteractSectorRange.js.map