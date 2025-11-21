"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponRecommendItemDataFactory = undefined;
const RoleDevUtils_1 = require("../../RoleDevUtils");
const ForecastRoleDevWeaponRecommendItemData_1 = require("./ForecastRoleDevWeaponRecommendItemData");
const NotObtainedRoleDevWeaponRecommendItemData_1 = require("./NotObtainedRoleDevWeaponRecommendItemData");
const ObtainedRoleDevWeaponRecommendItemData_1 = require("./ObtainedRoleDevWeaponRecommendItemData");
class RoleDevWeaponRecommendItemDataFactory {
  static Create(e) {
    let a = undefined;
    switch (RoleDevUtils_1.RoleDevUtils.GetRoleDevDataTypeByRoleId(e)) {
      case 0:
        (a = new ObtainedRoleDevWeaponRecommendItemData_1.ObtainedRoleDevWeaponRecommendItemData()).InitByRoleId(e);
        break;
      case 2:
        (a = new ForecastRoleDevWeaponRecommendItemData_1.ForecastRoleDevWeaponRecommendItemData()).InitByRoleId(e);
        break;
      default:
        (a = new NotObtainedRoleDevWeaponRecommendItemData_1.NotObtainedRoleDevWeaponRecommendItemData()).InitByRoleId(e);
    }
    return a;
  }
}
exports.RoleDevWeaponRecommendItemDataFactory = RoleDevWeaponRecommendItemDataFactory;
//# sourceMappingURL=RoleDevWeaponRecommendItemDataFactory.js.map