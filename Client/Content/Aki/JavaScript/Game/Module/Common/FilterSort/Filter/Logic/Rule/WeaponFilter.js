"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponFilter = undefined;
const CommonFilter_1 = require("./CommonFilter");
class WeaponFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments);
    this.GetWeaponType = t => {
      return t?.GetConfig().WeaponType ?? 0;
    };
    this.GetItemQuality = t => {
      return t?.GetQuality() ?? 0;
    };
  }
  OnInitFilterMap() {
    this.FilterMap.set(2, this.GetWeaponType);
    this.FilterMap.set(22, this.GetItemQuality);
  }
}
exports.WeaponFilter = WeaponFilter;
//# sourceMappingURL=WeaponFilter.js.map