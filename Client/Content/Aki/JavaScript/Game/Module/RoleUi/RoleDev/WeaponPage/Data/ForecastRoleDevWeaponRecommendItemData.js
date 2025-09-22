"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForecastRoleDevWeaponRecommendItemData = undefined;
const RoleDevUtils_1 = require("../../RoleDevUtils");
const RoleDevWeaponRecommendItemDataBase_1 = require("./RoleDevWeaponRecommendItemDataBase");
class ForecastRoleDevWeaponRecommendItemData extends RoleDevWeaponRecommendItemDataBase_1.RoleDevWeaponRecommendItemDataBase {
  InitByRoleType(e) {
    this.SubRecommendItemsInternal.length = 0;
  }
  GetWeaponConfigId() {
    return 0;
  }
  GetWeaponName() {
    return "";
  }
  GetWeaponLevel() {
    return 1;
  }
  GetWeaponGoalUpgradeLevel() {
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId)?.WeaponLevel ?? 0;
  }
  GetIsCall() {
    return false;
  }
  GetGachaId() {
    return 0;
  }
  GetIsWeaponHighQuality() {
    return false;
  }
  GetIsObtained() {
    return false;
  }
  GetIsForecast() {
    return true;
  }
}
exports.ForecastRoleDevWeaponRecommendItemData = ForecastRoleDevWeaponRecommendItemData;
//# sourceMappingURL=ForecastRoleDevWeaponRecommendItemData.js.map