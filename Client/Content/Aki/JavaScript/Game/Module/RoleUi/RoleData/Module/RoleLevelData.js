"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleLevelData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RoleModuleDataBase_1 = require("./RoleModuleDataBase");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class RoleLevelData extends RoleModuleDataBase_1.RoleModuleDataBase {
  constructor() {
    super(...arguments);
    this.Level = 0;
    this.BreachLevel = 0;
    this.Exp = 0;
  }
  SetLevel(e) {
    this.Level = e;
  }
  GetLevel() {
    return this.Level;
  }
  SetExp(e) {
    this.Exp = e;
  }
  GetExp() {
    return this.Exp;
  }
  SetBreachLevel(e) {
    this.BreachLevel = e;
  }
  GetBreachLevel() {
    return this.BreachLevel;
  }
  GetRoleMaxLevel() {
    return this.GetRoleConfig().MaxLevel;
  }
  GetRoleIsMaxLevel() {
    return this.Level >= this.GetRoleMaxLevel();
  }
  GetCurrentMaxExp() {
    return this.$1o(this.Level + 1);
  }
  GetLevelUpNeedExp() {
    var e = this.$1o(this.Level + 1);
    return Math.max(0, e - this.Exp);
  }
  $1o(e) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleLevelConsume(this.GetRoleConfig().LevelConsumeId, e);
    if (e) {
      return e.ExpCount;
    } else {
      return 1;
    }
  }
  GetMaxBreachLevel() {
    var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleBreachList(this.GetRoleConfig().BreachId);
    var t = r.length;
    let a = 0;
    for (let e = 0; e < t; e++) {
      var i = r[e];
      if (i.BreachLevel > a) {
        a = i.BreachLevel;
      }
    }
    return a;
  }
  GetCurrentMaxLevel() {
    var e = this.GetBreachConfig(this.BreachLevel);
    if (e) {
      return e.MaxLevel;
    } else {
      return 0;
    }
  }
  GetBreachConfig(e) {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleBreachConfig(this.GetRoleConfig().BreachId, e);
  }
  GetRoleNeedBreakUp() {
    return this.Level >= this.GetCurrentMaxLevel() && this.Level < this.GetRoleMaxLevel();
  }
  GetExpPercentage() {
    var e;
    if (this.GetRoleIsMaxLevel()) {
      return 1;
    } else if (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleLevelConsume(this.GetRoleConfig().LevelConsumeId, this.Level + 1)) {
      return this.Exp / e.ExpCount;
    } else {
      return 0;
    }
  }
  IsEnoughBreachConsume() {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleBreachConfig(this.GetRoleConfig().BreachId, this.BreachLevel + 1);
    if (e) {
      if (!ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(e.ConditionId.toString(), undefined, false)) {
        return false;
      }
      for (const r of e.BreachConsume) {
        if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r[0]) < r[1]) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
exports.RoleLevelData = RoleLevelData;
//# sourceMappingURL=RoleLevelData.js.map