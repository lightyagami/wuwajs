"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObtainedRoleDevWeaponSubRecommendItemData = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevWeaponSubRecommendItemDataBase_1 = require("./RoleDevWeaponSubRecommendItemDataBase");
class ObtainedRoleDevWeaponSubRecommendItemData extends RoleDevWeaponSubRecommendItemDataBase_1.RoleDevWeaponSubRecommendItemDataBase {
  InitByWeaponType(e, a, t) {}
  GetIsEquipped() {
    return ModelManager_1.ModelManager.WeaponModel?.GetWeaponIdByRoleDataId(this.RoleId) === this.WeaponId;
  }
  GetNotObtained() {
    return !ModelManager_1.ModelManager.WeaponModel?.GetWeaponInstanceByRoleId(this.RoleId);
  }
}
exports.ObtainedRoleDevWeaponSubRecommendItemData = ObtainedRoleDevWeaponSubRecommendItemData;
//# sourceMappingURL=ObtainedRoleDevWeaponSubRecommendItemData.js.map