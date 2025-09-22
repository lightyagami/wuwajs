"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponViewItemDataBase = undefined;
class RoleDevWeaponViewItemDataBase {
  constructor() {
    this.RoleIdInternal = 0;
    this.RoleTypeInternal = 0;
  }
  InitByRoleId(e, t) {
    this.RoleIdInternal = e;
    this.RoleTypeInternal = t;
    this.InitByRoleType(e);
  }
  get RoleId() {
    return this.RoleIdInternal;
  }
  get RoleType() {
    return this.RoleTypeInternal;
  }
  get IsRoleObtained() {
    return this.GetIsRoleObtained();
  }
  get DevItemData() {
    return this.GetDevItemData();
  }
  get RecommendItemData() {
    return this.GetRecommendItemData();
  }
  get IsWeaponHighQuality() {
    return this.GetIsWeaponHighQuality();
  }
  get IsRoleObtainedType() {
    return this.RoleType === 0;
  }
}
exports.RoleDevWeaponViewItemDataBase = RoleDevWeaponViewItemDataBase;
//# sourceMappingURL=RoleDevWeaponViewItemDataBase.js.map