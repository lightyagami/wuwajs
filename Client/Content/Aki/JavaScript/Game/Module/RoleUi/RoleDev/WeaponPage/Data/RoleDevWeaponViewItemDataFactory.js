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
  static Create(e, a) {
    var t = RoleDevUtils_1.RoleDevUtils.GetRoleDevDataTypeByRoleId(e);
    let o = undefined;
    switch (t) {
      case 0:
        o = new ObtainedRoleDevWeaponViewItemData_1.ObtainedRoleDevWeaponViewItemData();
        break;
      case 1:
        o = new NotObtainedRoleDevWeaponViewItemData_1.NotObtainedRoleDevWeaponViewItemData();
        break;
      case 2:
        o = new ForecastRoleDevWeaponViewItemData_1.ForecastRoleDevWeaponViewItemData();
        break;
      default:
        o = new NotObtainedRoleDevWeaponViewItemData_1.NotObtainedRoleDevWeaponViewItemData();
    }
    o.InitByRoleId(e, t, a);
    return o;
  }
}
exports.RoleDevWeaponViewItemDataFactory = RoleDevWeaponViewItemDataFactory;
//# sourceMappingURL=RoleDevWeaponViewItemDataFactory.js.map