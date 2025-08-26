"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponHandBookSort = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const CommonSort_1 = require("./CommonSort");
class WeaponHandBookSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.KDt = (o, r, e) => {
      var n = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(o).QualityId;
      var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(r).QualityId;
      if (n !== t) {
        return (n - t) * (e ? 1 : -1);
      } else {
        return r - o;
      }
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.KDt);
  }
}
exports.WeaponHandBookSort = WeaponHandBookSort;
//# sourceMappingURL=WeaponHandBookSort.js.map