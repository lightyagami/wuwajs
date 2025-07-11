"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbForceOccupations = undefined;
class FbForceOccupations {
  constructor(t) {
    this.FbDataInternal = t;
    this.sEh = false;
    this.aEh = undefined;
    this.hEh = false;
    this.lEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbForceOccupations(t);
    }
  }
  get OccupationType() {
    if (!this.sEh) {
      this.sEh = true;
      this.aEh = this.FbDataInternal.occupationType();
    }
    return this.aEh;
  }
  get Occupations() {
    if (!this.hEh) {
      this.hEh = true;
      this.lEh = new Array();
      var s = this.FbDataInternal.occupationsLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.lEh.push(this.FbDataInternal.occupations(t));
        }
      }
    }
    return this.lEh;
  }
}
exports.FbForceOccupations = FbForceOccupations;
//# sourceMappingURL=FbForceOccupations.js.map