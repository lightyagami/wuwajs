"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObtainedRoleDevWeaponViewItemData = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevWeaponDevItemDataFactory_1 = require("./RoleDevWeaponDevItemDataFactory");
const RoleDevWeaponRecommendItemDataFactory_1 = require("./RoleDevWeaponRecommendItemDataFactory");
const RoleDevWeaponViewItemDataBase_1 = require("./RoleDevWeaponViewItemDataBase");
class ObtainedRoleDevWeaponViewItemData extends RoleDevWeaponViewItemDataBase_1.RoleDevWeaponViewItemDataBase {
  constructor() {
    super(...arguments);
    this.Upd = undefined;
    this.Bpd = undefined;
    this.fwd = false;
  }
  InitByRoleType(e) {
    var t;
    this.pie(e);
    this.Vpd(e);
    if (this.RoleDevViewModelInternal?.CheckRoleIdIsCreated(e)) {
      if (!this.fwd) {
        this.RoleDevViewModelInternal.SetRoleWeaponTabType(e, 2);
      }
    } else {
      t = this.fwd ? 1 : 2;
      this.RoleDevViewModelInternal.SetRoleWeaponTabType(e, t);
    }
  }
  pie(e) {
    e = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(e);
    this.fwd = !e || ModelManager_1.ModelManager.WeaponModel.IsWeaponHighQuality(e);
  }
  Vpd(e) {
    this.Upd = RoleDevWeaponDevItemDataFactory_1.RoleDevWeaponDevItemDataFactory.Create(e);
    this.Bpd = RoleDevWeaponRecommendItemDataFactory_1.RoleDevWeaponRecommendItemDataFactory.Create(e);
  }
  GetIsRoleObtained() {
    return true;
  }
  GetDevItemData() {
    return this.Upd;
  }
  GetRecommendItemData() {
    return this.Bpd;
  }
  GetIsWeaponHighQuality() {
    return this.fwd;
  }
}
exports.ObtainedRoleDevWeaponViewItemData = ObtainedRoleDevWeaponViewItemData;
//# sourceMappingURL=ObtainedRoleDevWeaponViewItemData.js.map