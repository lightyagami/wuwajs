"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookFilter = undefined;
const CommonFilter_1 = require("./CommonFilter");
class CookFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments);
    this.GetCookTypeList = t => {
      if (t.MainType === 0) {
        return t.EffectType;
      } else {
        return 0;
      }
    };
    this.GetCookMenuList = t => {
      if (t.MainType === 0) {
        return t.SubType;
      } else {
        return 0;
      }
    };
  }
  OnInitFilterMap() {
    this.FilterMap.set(10, this.GetCookMenuList);
    this.FilterMap.set(11, this.GetCookTypeList);
  }
}
exports.CookFilter = CookFilter;
//# sourceMappingURL=CookFilter.js.map