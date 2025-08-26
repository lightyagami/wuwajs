"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponHandBookFilter = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const CommonFilter_1 = require("./CommonFilter");
class WeaponHandBookFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments);
    this.GetWeaponType = e => {
      return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e).WeaponType;
    };
    this.GetItemQuality = e => {
      return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e).QualityId;
    };
  }
  OnInitFilterMap() {
    this.FilterMap.set(2, this.GetWeaponType);
    this.FilterMap.set(22, this.GetItemQuality);
  }
}
exports.WeaponHandBookFilter = WeaponHandBookFilter;
//# sourceMappingURL=WeaponHandBookFilter.js.map