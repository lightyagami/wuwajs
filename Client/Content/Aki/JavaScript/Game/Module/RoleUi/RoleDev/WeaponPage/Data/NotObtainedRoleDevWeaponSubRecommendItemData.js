"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotObtainedRoleDevWeaponSubRecommendItemData = undefined;
const RoleDevWeaponSubRecommendItemDataBase_1 = require("./RoleDevWeaponSubRecommendItemDataBase");
class NotObtainedRoleDevWeaponSubRecommendItemData extends RoleDevWeaponSubRecommendItemDataBase_1.RoleDevWeaponSubRecommendItemDataBase {
  InitByWeaponType(e, t, o) {}
  GetIsEquipped() {
    return false;
  }
  GetNotObtained() {
    return true;
  }
}
exports.NotObtainedRoleDevWeaponSubRecommendItemData = NotObtainedRoleDevWeaponSubRecommendItemData;
//# sourceMappingURL=NotObtainedRoleDevWeaponSubRecommendItemData.js.map