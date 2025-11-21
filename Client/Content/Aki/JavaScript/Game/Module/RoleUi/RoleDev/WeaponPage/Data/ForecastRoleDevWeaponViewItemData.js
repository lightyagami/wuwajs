"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForecastRoleDevWeaponViewItemData = undefined;
const RoleDevWeaponDevItemDataFactory_1 = require("./RoleDevWeaponDevItemDataFactory");
const RoleDevWeaponViewItemDataBase_1 = require("./RoleDevWeaponViewItemDataBase");
class ForecastRoleDevWeaponViewItemData extends RoleDevWeaponViewItemDataBase_1.RoleDevWeaponViewItemDataBase {
  constructor() {
    super(...arguments);
    this.tSd = undefined;
    this.iSd = undefined;
    this.jPd = false;
  }
  InitByRoleType(e) {
    this.pie(e);
    this.lSd(e);
    this.RoleDevViewModelInternal?.SetRoleWeaponTabType(e, 1);
  }
  pie(e) {
    this.jPd = true;
  }
  lSd(e) {
    this.tSd = RoleDevWeaponDevItemDataFactory_1.RoleDevWeaponDevItemDataFactory.Create(e);
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
exports.ForecastRoleDevWeaponViewItemData = ForecastRoleDevWeaponViewItemData;
//# sourceMappingURL=ForecastRoleDevWeaponViewItemData.js.map