"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponDevItemDataFactory = undefined;
const RoleDevUtils_1 = require("../../RoleDevUtils");
const ForecastRoleDevWeaponDevData_1 = require("./ForecastRoleDevWeaponDevData");
const NotObtainedRoleDevWeaponDevData_1 = require("./NotObtainedRoleDevWeaponDevData");
const ObtainedRoleDevWeaponDevData_1 = require("./ObtainedRoleDevWeaponDevData");
class RoleDevWeaponDevItemDataFactory {
  static Create(e) {
    let a = undefined;
    switch (RoleDevUtils_1.RoleDevUtils.GetRoleDevDataTypeByRoleId(e)) {
      case 0:
        (a = new ObtainedRoleDevWeaponDevData_1.ObtainedRoleDevWeaponDevData()).InitByRoleId(e, 0);
        break;
      case 2:
        (a = new ForecastRoleDevWeaponDevData_1.ForecastRoleDevWeaponDevData()).InitByRoleId(e, 2);
        break;
      default:
        (a = new NotObtainedRoleDevWeaponDevData_1.NotObtainedRoleDevWeaponDevData()).InitByRoleId(e, 1);
    }
    return a;
  }
}
exports.RoleDevWeaponDevItemDataFactory = RoleDevWeaponDevItemDataFactory;
//# sourceMappingURL=RoleDevWeaponDevItemDataFactory.js.map