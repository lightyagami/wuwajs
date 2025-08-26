"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscReferenceCount = undefined;
class KscReferenceCount {
  constructor() {
    this.Dfd = new Map();
  }
  AddRef(e) {
    this.Dfd.set(e, this.GetCount(e) + 1);
  }
  SubRef(e) {
    this.Dfd.set(e, this.GetCount(e) - 1);
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
    this.Dfd.set(e, 0);
  }
  Clear() {
    this.Dfd.clear();
  }
  GetCount(e) {
    return this.Dfd.get(e) ?? 0;
  }
}
exports.KscReferenceCount = KscReferenceCount;
//# sourceMappingURL=KscReferenceCount.js.map