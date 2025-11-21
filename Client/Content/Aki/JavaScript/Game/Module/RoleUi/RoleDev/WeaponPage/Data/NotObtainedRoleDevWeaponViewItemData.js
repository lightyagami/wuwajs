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
    this.tSd = undefined;
    this.iSd = undefined;
    this.jPd = false;
  }
  InitByRoleType(e) {
    this.pie(e);
    this.lSd(e);
    if (!this.RoleDevViewModelInternal?.CheckRoleIdIsCreated(e)) {
      this.RoleDevViewModelInternal?.SetRoleWeaponTabType(e, 1);
    }
  }
  pie(e) {
    if (ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProjectConfig(e)) {
      this.jPd = true;
    }
  }
  lSd(e) {
    this.tSd = RoleDevWeaponDevItemDataFactory_1.RoleDevWeaponDevItemDataFactory.Create(e);
    this.iSd = RoleDevWeaponRecommendItemDataFactory_1.RoleDevWeaponRecommendItemDataFactory.Create(e);
  }
  GetIsRoleObtained() {
    return false;
  }
  GetDevItemData() {
    return this.tSd;
  }
  GetRecommendItemData() {
    return this.iSd;
  }
  GetIsWeaponHighQuality() {
    return this.jPd;
  }
}
exports.NotObtainedRoleDevWeaponViewItemData = NotObtainedRoleDevWeaponViewItemData;
//# sourceMappingURL=NotObtainedRoleDevWeaponViewItemData.js.map