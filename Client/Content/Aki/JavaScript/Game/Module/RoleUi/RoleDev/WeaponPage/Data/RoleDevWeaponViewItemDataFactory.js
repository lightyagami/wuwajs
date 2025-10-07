"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponViewItemDataFactory = undefined;
const RoleDevUtils_1 = require("../../RoleDevUtils");
const ForecastRoleDevWeaponViewItemData_1 = require("./ForecastRoleDevWeaponViewItemData");
const NotObtainedRoleDevWeaponViewItemData_1 = require("./NotObtainedRoleDevWeaponViewItemData");
const ObtainedRoleDevWeaponViewItemData_1 = require("./ObtainedRoleDevWeaponViewItemData");
class RoleDevWeaponViewItemDataFactory {
  static Create(e) {
    var a = RoleDevUtils_1.RoleDevUtils.GetRoleDevDataTypeByRoleId(e);
    let t = undefined;
    switch (a) {
      case 0:
        t = new ObtainedRoleDevWeaponViewItemData_1.ObtainedRoleDevWeaponViewItemData();
        break;
      case 1:
        t = new NotObtainedRoleDevWeaponViewItemData_1.NotObtainedRoleDevWeaponViewItemData();
        break;
      case 2:
        t = new ForecastRoleDevWeaponViewItemData_1.ForecastRoleDevWeaponViewItemData();
        break;
      default:
        t = new NotObtainedRoleDevWeaponViewItemData_1.NotObtainedRoleDevWeaponViewItemData();
    }
    t.InitByRoleId(e, a);
    return t;
  }
}
exports.RoleDevWeaponViewItemDataFactory = RoleDevWeaponViewItemDataFactory;
//# sourceMappingURL=RoleDevWeaponViewItemDataFactory.js.map