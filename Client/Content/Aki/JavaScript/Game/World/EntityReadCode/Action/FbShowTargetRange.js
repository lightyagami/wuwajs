"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbShowTargetRange = undefined;
class FbShowTargetRange {
  constructor(t) {
    this.FbDataInternal = t;
    this.jAh = false;
    this.HAh = undefined;
    this.WAh = false;
    this.QAh = false;
  }
  static Create(t) {
    if (t) {
      return new FbShowTargetRange(t);
    }
  }
  get RangeEntities() {
    if (!this.jAh) {
      this.jAh = true;
      this.HAh = new Array();
      var s = this.FbDataInternal.rangeEntitiesLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.HAh.push(this.FbDataInternal.rangeEntities(t));
        }
      }
    }
    return this.HAh;
  }
  get DelayShow() {
    if (!this.WAh) {
      this.WAh = true;
      this.QAh = this.FbDataInternal.delayShow();
    }
    return this.QAh;
  }
}
exports.FbShowTargetRange = FbShowTargetRange;
//# sourceMappingURL=FbShowTargetRange.js.map