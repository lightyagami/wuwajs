"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObtainedRoleDevRoleData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
const ObtainedRoleDevRoleDetailItemData_1 = require("./ObtainedRoleDevRoleDetailItemData");
const RoleDevRoleViewItemDataBase_1 = require("./RoleDevRoleViewItemDataBase");
class ObtainedRoleDevRoleData extends RoleDevRoleViewItemDataBase_1.RoleDevRoleViewItemDataBase {
  constructor() {
    super(...arguments);
    this.O0d = undefined;
    this.r3d = undefined;
    this.kNd = new ObtainedRoleDevRoleDetailItemData_1.ObtainedRoleDevRoleDetailItemData();
  }
  InitByRoleType(e) {
    this.O0d = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    this.r3d = this.O0d?.GetLevelData();
    this.ONd();
  }
  ONd() {
    this.kNd.InitByRoleId(this.RoleId);
  }
  GetRoleLevel() {
    return this.r3d?.GetLevel() ?? 1;
  }
  GetRoleBreachLevel() {
    return this.r3d?.GetBreachLevel() ?? 0;
  }
  GetRoleGoalUpgradeLevel() {
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId).RoleLevel;
  }
  GetRoleGoalBreakLevel() {
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId).RoleBreachLevel;
  }
  GetMaxLevel() {
    return this.r3d?.GetRoleMaxLevel() ?? 90;
  }
  GetDetailItems() {
    return this.kNd.DetailItems;
  }
  GetRoleName() {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.RoleId).Name;
  }
  GetIsCanUpgrade() {
    return !this.r3d?.GetRoleNeedBreakUp();
  }
  GetIsCanBreach() {
    return (!this.RoleLevelIsMax && this.r3d?.GetRoleNeedBreakUp()) ?? false;
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
    return false;
  }
  get DetailItemData() {
    return this.kNd;
  }
}
exports.ObtainedRoleDevRoleData = ObtainedRoleDevRoleData;
//# sourceMappingURL=ObtainedRoleDevRoleData.js.map