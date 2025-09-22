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
    this.Upd = undefined;
    this.Bpd = undefined;
    this.fwd = false;
  }
  InitByRoleType(e) {
    this.pie(e);
    this.Vpd(e);
  }
  pie(e) {
    this.fwd = true;
  }
  Vpd(e) {
    this.Upd = RoleDevWeaponDevItemDataFactory_1.RoleDevWeaponDevItemDataFactory.Create(e);
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
exports.ForecastRoleDevWeaponViewItemData = ForecastRoleDevWeaponViewItemData;
//# sourceMappingURL=ForecastRoleDevWeaponViewItemData.js.map