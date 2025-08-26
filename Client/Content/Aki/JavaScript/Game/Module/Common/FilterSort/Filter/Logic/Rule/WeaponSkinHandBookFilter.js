"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponSkinHandBookFilter = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const CommonFilter_1 = require("./CommonFilter");
class WeaponSkinHandBookFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments);
    this.GetWeaponType = e => {
      return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponSkinConfig(e).WeaponSkinType;
    };
    this.GetItemQuality = e => {
      return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponSkinConfig(e).QualityId;
    };
  }
  OnInitFilterMap() {
    this.FilterMap.set(2, this.GetWeaponType);
    this.FilterMap.set(22, this.GetItemQuality);
  }
}
exports.WeaponSkinHandBookFilter = WeaponSkinHandBookFilter;
//# sourceMappingURL=WeaponSkinHandBookFilter.js.map