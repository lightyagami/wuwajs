"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponViewItemDataBase = undefined;
class RoleDevWeaponViewItemDataBase {
  constructor() {
    this.RoleIdInternal = 0;
    this.RoleTypeInternal = 0;
    this.RoleDevViewModelInternal = undefined;
  }
  InitByRoleId(e, t, s) {
    this.RoleIdInternal = e;
    this.RoleTypeInternal = t;
    this.RoleDevViewModelInternal = s;
    this.InitByRoleType(e, s);
  }
  CheckTabType() {}
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
  get TabType() {
    return this.RoleDevViewModelInternal.GetRoleWeaponTabType(this.RoleId);
  }
  set TabType(e) {
    this.RoleDevViewModelInternal.SetRoleWeaponTabType(this.RoleId, e);
  }
}
exports.RoleDevWeaponViewItemDataBase = RoleDevWeaponViewItemDataBase;
//# sourceMappingURL=RoleDevWeaponViewItemDataBase.js.map