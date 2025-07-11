"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffItemInfo = undefined;
class BuffItemInfo {
  constructor() {
    this.SortId = 0;
    this.Priority = 0;
    this.BuffCueConfig = undefined;
    this.SingleBuff = undefined;
    this.BuffHandleSet = new Set();
    this.BuffItem = undefined;
  }
  static GenSortId() {
    this.o6++;
    return this.o6;
  }
  Clear() {
    this.SingleBuff = undefined;
    this.BuffHandleSet.clear();
    this.BuffItem = undefined;
  }
}
(exports.BuffItemInfo = BuffItemInfo).o6 = 0;
BuffItemInfo.Compare = (t, s) => {
  var i = s.Priority - t.Priority;
  if (i == 0) {
    return s.SortId - t.SortId;
  } else {
    return i;
  }
}; //# sourceMappingURL=BuffItemInfo.js.map