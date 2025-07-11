"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonFilter = undefined;
class CommonFilter {
  constructor() {
    this.gU = false;
    this.FilterMap = new Map();
  }
  InitFilterMap() {
    if (!this.gU) {
      this.gU = true;
      this.OnInitFilterMap();
    }
  }
  GetFilterFunction(t) {
    return this.FilterMap.get(t);
  }
  DefaultFilterList() {
    return [];
  }
}
exports.CommonFilter = CommonFilter;
//# sourceMappingURL=CommonFilter.js.map