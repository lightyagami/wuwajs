"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeFilter = undefined;
const CommonFilter_1 = require("./CommonFilter");
class ComposeFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments);
    this.GetComposeMenuList = e => {
      if (e.MainType === 1 || e.MainType === 2) {
        return e.SubType;
      } else {
        return 0;
      }
    };
  }
  OnInitFilterMap() {
    this.FilterMap.set(12, this.GetComposeMenuList);
  }
}
exports.ComposeFilter = ComposeFilter;
//# sourceMappingURL=ComposeFilter.js.map