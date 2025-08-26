"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponSkinHandBookSort = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const CommonSort_1 = require("./CommonSort");
class WeaponSkinHandBookSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.KDt = (o, n, r) => {
      o = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponSkinConfig(o).QualityId;
      n = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponSkinConfig(n).QualityId;
      if (o !== n) {
        return (o - n) * (r ? 1 : -1);
      } else {
        return 0;
      }
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.KDt);
  }
}
exports.WeaponSkinHandBookSort = WeaponSkinHandBookSort;
//# sourceMappingURL=WeaponSkinHandBookSort.js.map