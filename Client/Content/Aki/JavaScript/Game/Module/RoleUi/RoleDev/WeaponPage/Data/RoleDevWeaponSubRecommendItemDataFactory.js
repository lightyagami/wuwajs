"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponSubRecommendItemDataFactory = undefined;
const NotObtainedRoleDevWeaponSubRecommendItemData_1 = require("./NotObtainedRoleDevWeaponSubRecommendItemData");
const ObtainedRoleDevWeaponSubRecommendItemData_1 = require("./ObtainedRoleDevWeaponSubRecommendItemData");
class RoleDevWeaponSubRecommendItemDataFactory {
  static Create(e, t, a = true) {
    let o = undefined;
    (o = new (a ? ObtainedRoleDevWeaponSubRecommendItemData_1.ObtainedRoleDevWeaponSubRecommendItemData : NotObtainedRoleDevWeaponSubRecommendItemData_1.NotObtainedRoleDevWeaponSubRecommendItemData)()).InitByWeaponId(e, t, a);
    return o;
  }
}
exports.RoleDevWeaponSubRecommendItemDataFactory = RoleDevWeaponSubRecommendItemDataFactory;
//# sourceMappingURL=RoleDevWeaponSubRecommendItemDataFactory.js.map