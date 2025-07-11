"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFixShowTargetRange = undefined;
class FbFixShowTargetRange {
  constructor(t) {
    this.FbDataInternal = t;
    this.jAh = false;
    this.HAh = undefined;
    this.WAh = false;
    this.QAh = false;
  }
  static Create(t) {
    if (t) {
      return new FbFixShowTargetRange(t);
    }
  }
  get RangeEntities() {
    if (!this.jAh) {
      this.jAh = true;
      this.HAh = new Array();
      var i = this.FbDataInternal.rangeEntitiesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
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
exports.FbFixShowTargetRange = FbFixShowTargetRange;
//# sourceMappingURL=FbFixShowTargetRange.js.map