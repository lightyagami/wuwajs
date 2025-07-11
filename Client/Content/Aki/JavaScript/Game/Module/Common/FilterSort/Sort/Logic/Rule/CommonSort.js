"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonSort = undefined;
class CommonSort {
  constructor() {
    this.gU = false;
    this.SortMap = new Map();
  }
  InitSortMap() {
    if (!this.gU) {
      this.gU = true;
      this.OnInitSortMap();
    }
  }
  GetSortFunctionByRuleId(t) {
    return this.SortMap.get(t);
  }
}
exports.CommonSort = CommonSort;
//# sourceMappingURL=CommonSort.js.map