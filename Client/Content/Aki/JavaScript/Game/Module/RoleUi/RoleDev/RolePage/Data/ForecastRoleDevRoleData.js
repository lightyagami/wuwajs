"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForecastRoleDevRoleData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
const ForecastRoleDevRoleDetailItemData_1 = require("./ForecastRoleDevRoleDetailItemData");
const RoleDevRoleViewItemDataBase_1 = require("./RoleDevRoleViewItemDataBase");
class ForecastRoleDevRoleData extends RoleDevRoleViewItemDataBase_1.RoleDevRoleViewItemDataBase {
  constructor() {
    super(...arguments);
    this.kNd = new ForecastRoleDevRoleDetailItemData_1.ForecastRoleDevRoleDetailItemData();
  }
  InitByRoleType(e) {
    this.ONd();
  }
  ONd() {
    this.kNd.InitByRoleId(this.RoleId);
  }
  GetRoleLevel() {
    return 1;
  }
  GetRoleBreachLevel() {
    return 0;
  }
  GetRoleGoalUpgradeLevel() {
    return ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(this.RoleId).RoleGoalLevel;
  }
  GetRoleGoalBreakLevel() {
    return 0;
  }
  GetMaxLevel() {
    return 0;
  }
  GetDetailItems() {
    return this.kNd.DetailItems;
  }
  GetRoleName() {
    return ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(this.RoleId).RoleName;
  }
  GetIsCanUpgrade() {
    return false;
  }
  GetIsCanBreach() {
    return false;
  }
  GetIsCall() {
    return !!RoleDevUtils_1.RoleDevUtils.IsHotRole(this.RoleId) && RoleDevUtils_1.RoleDevUtils.GetRoleGachaIds(this.RoleId).length > 0;
  }
  GetGachaId() {
    var e;
    if (RoleDevUtils_1.RoleDevUtils.IsHotRole(this.RoleId) && (e = RoleDevUtils_1.RoleDevUtils.GetRoleGachaIds(this.RoleId)).length > 0) {
      return e[0];
    } else {
      return 0;
    }
  }
  GetIsForecast() {
    return true;
  }
  get DetailItemData() {
    return this.kNd;
  }
}
exports.ForecastRoleDevRoleData = ForecastRoleDevRoleData;
//# sourceMappingURL=ForecastRoleDevRoleData.js.map