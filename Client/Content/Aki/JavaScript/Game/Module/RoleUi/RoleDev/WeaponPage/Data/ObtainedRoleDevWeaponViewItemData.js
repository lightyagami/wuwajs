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
    this.tSd = undefined;
    this.iSd = undefined;
    this.jPd = false;
  }
  InitByRoleType(e) {
    var t;
    this.pie(e);
    this.lSd(e);
    if (this.RoleDevViewModelInternal?.CheckRoleIdIsCreated(e)) {
      if (!this.jPd) {
        this.RoleDevViewModelInternal.SetRoleWeaponTabType(e, 2);
      }
    } else {
      t = this.jPd ? 1 : 2;
      this.RoleDevViewModelInternal.SetRoleWeaponTabType(e, t);
    }
  }
  pie(e) {
    e = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(e);
    this.jPd = !e || ModelManager_1.ModelManager.WeaponModel.IsWeaponHighQuality(e);
  }
  lSd(e) {
    this.tSd = RoleDevWeaponDevItemDataFactory_1.RoleDevWeaponDevItemDataFactory.Create(e);
    this.iSd = RoleDevWeaponRecommendItemDataFactory_1.RoleDevWeaponRecommendItemDataFactory.Create(e);
  }
  GetIsRoleObtained() {
    return true;
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
exports.ObtainedRoleDevWeaponViewItemData = ObtainedRoleDevWeaponViewItemData;
//# sourceMappingURL=ObtainedRoleDevWeaponViewItemData.js.map