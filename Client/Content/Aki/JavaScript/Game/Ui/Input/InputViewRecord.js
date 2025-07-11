"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputViewRecord = undefined;
class InputViewRecord {
  constructor() {
    this.bmr = new Map();
  }
  Add(t) {
    var r = this.bmr.get(t);
    var r = r ? r + 1 : 1;
    this.bmr.set(t, r);
    return r;
  }
  Remove(t) {
    var r = this.bmr.get(t);
    if (r === undefined) {
      return 0;
    } else {
      if ((r = r - 1) > 0) {
        this.bmr.set(t, r);
      } else {
        this.bmr.delete(t);
      }
      return r;
    }
  }
  Has(t) {
    t = this.bmr.get(t);
    return !!t && t > 0;
  }
  HasAny() {
    for (const t of this.bmr.values()) {
      if (t > 0) {
        return true;
      }
    }
    return false;
  }
  Size() {
    return this.bmr.size;
  }
  Clear() {
    this.bmr.clear();
  }
}
exports.InputViewRecord = InputViewRecord;
//# sourceMappingURL=InputViewRecord.js.map