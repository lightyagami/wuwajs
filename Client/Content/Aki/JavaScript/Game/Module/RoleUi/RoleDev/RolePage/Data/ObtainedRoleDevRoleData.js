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
    this.ovd = undefined;
    this.a9d = undefined;
    this.F7d = new ObtainedRoleDevRoleDetailItemData_1.ObtainedRoleDevRoleDetailItemData();
  }
  InitByRoleType(e) {
    this.ovd = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    this.a9d = this.ovd?.GetLevelData();
    this.N7d();
  }
  N7d() {
    this.F7d.InitByRoleId(this.RoleId);
  }
  GetRoleLevel() {
    return this.a9d?.GetLevel() ?? 1;
  }
  GetRoleBreachLevel() {
    return this.a9d?.GetBreachLevel() ?? 0;
  }
  GetRoleGoalUpgradeLevel() {
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId).RoleLevel;
  }
  GetRoleGoalBreakLevel() {
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId).RoleBreachLevel;
  }
  GetMaxLevel() {
    return this.a9d?.GetRoleMaxLevel() ?? 90;
  }
  GetDetailItems() {
    return this.F7d.DetailItems;
  }
  GetRoleName() {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.RoleId).Name;
  }
  GetIsCanUpgrade() {
    return !this.a9d?.GetRoleNeedBreakUp();
  }
  GetIsCanBreach() {
    return (!this.RoleLevelIsMax && this.a9d?.GetRoleNeedBreakUp()) ?? false;
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
    return this.F7d;
  }
}
exports.ObtainedRoleDevRoleData = ObtainedRoleDevRoleData;
//# sourceMappingURL=ObtainedRoleDevRoleData.js.map