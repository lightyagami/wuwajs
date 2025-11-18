"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscReferenceCount = undefined;
class KscReferenceCount {
  constructor() {
    this._jd = new Map();
  }
  AddRef(e) {
    this._jd.set(e, this.GetCount(e) + 1);
  }
  SubRef(e) {
    this._jd.set(e, this.GetCount(e) - 1);
  }
  IsEmptyRef(e) {
    return this.GetCount(e) === 0;
  }
  IsLessZero(e) {
    return this.GetCount(e) < 0;
  }
  IsGreaterZero(e) {
    return this.GetCount(e) > 0;
  }
  SetEmptyRef(e) {
    this._jd.set(e, 0);
  }
  Clear() {
    this._jd.clear();
  }
  GetCount(e) {
    return this._jd.get(e) ?? 0;
  }
}
exports.KscReferenceCount = KscReferenceCount;
//# sourceMappingURL=KscReferenceCount.js.map