"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotObtainedRoleDevWeaponViewItemData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const RoleDevWeaponDevItemDataFactory_1 = require("./RoleDevWeaponDevItemDataFactory");
const RoleDevWeaponRecommendItemDataFactory_1 = require("./RoleDevWeaponRecommendItemDataFactory");
const RoleDevWeaponViewItemDataBase_1 = require("./RoleDevWeaponViewItemDataBase");
class NotObtainedRoleDevWeaponViewItemData extends RoleDevWeaponViewItemDataBase_1.RoleDevWeaponViewItemDataBase {
  constructor() {
    super(...arguments);
    this.Upd = undefined;
    this.Bpd = undefined;
    this.fwd = false;
  }
  InitByRoleType(e) {
    this.pie(e);
    this.Vpd(e);
    if (!this.RoleDevViewModelInternal?.CheckRoleIdIsCreated(e)) {
      this.RoleDevViewModelInternal?.SetRoleWeaponTabType(e, 1);
    }
  }
  pie(e) {
    if (ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProjectConfig(e)) {
      this.fwd = true;
    }
  }
  Vpd(e) {
    this.Upd = RoleDevWeaponDevItemDataFactory_1.RoleDevWeaponDevItemDataFactory.Create(e);
    this.Bpd = RoleDevWeaponRecommendItemDataFactory_1.RoleDevWeaponRecommendItemDataFactory.Create(e);
  }
  GetIsRoleObtained() {
    return false;
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
exports.NotObtainedRoleDevWeaponViewItemData = NotObtainedRoleDevWeaponViewItemData;
//# sourceMappingURL=NotObtainedRoleDevWeaponViewItemData.js.map