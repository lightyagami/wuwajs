"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscReferenceCount = undefined;
class KscReferenceCount {
  constructor() {
    this.e4d = new Map();
  }
  AddRef(e) {
    this.e4d.set(e, this.GetCount(e) + 1);
  }
  SubRef(e) {
    this.e4d.set(e, this.GetCount(e) - 1);
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
    this.e4d.set(e, 0);
  }
  Clear() {
    this.e4d.clear();
  }
  GetCount(e) {
    return this.e4d.get(e) ?? 0;
  }
}
exports.KscReferenceCount = KscReferenceCount;
//# sourceMappingURL=KscReferenceCount.js.map