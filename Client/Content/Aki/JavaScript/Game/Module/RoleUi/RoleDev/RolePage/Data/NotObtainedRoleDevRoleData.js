"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotObtainedRoleDevRoleData = undefined;
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
const NotObtainedRoleDevRoleDetailItemData_1 = require("./NotObtainedRoleDevRoleDetailItemData");
const RoleDevRoleViewItemDataBase_1 = require("./RoleDevRoleViewItemDataBase");
class NotObtainedRoleDevRoleData extends RoleDevRoleViewItemDataBase_1.RoleDevRoleViewItemDataBase {
  constructor() {
    super(...arguments);
    this.F7d = new NotObtainedRoleDevRoleDetailItemData_1.NotObtainedRoleDevRoleDetailItemData();
  }
  InitByRoleType(e) {
    this.N7d();
  }
  N7d() {
    this.F7d.InitByRoleId(this.RoleId);
  }
  GetRoleLevel() {
    return 1;
  }
  GetRoleBreachLevel() {
    return 0;
  }
  GetRoleGoalUpgradeLevel() {
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId).RoleLevel;
  }
  GetRoleGoalBreakLevel() {
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId).RoleBreachLevel;
  }
  GetMaxLevel() {
    return 0;
  }
  GetDetailItems() {
    return this.F7d.DetailItems;
  }
  GetRoleName() {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.RoleId).Name;
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetIsCanUpgrade() {
    return true;
  }
  GetIsCanBreach() {
    return true;
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
exports.NotObtainedRoleDevRoleData = NotObtainedRoleDevRoleData;
//# sourceMappingURL=NotObtainedRoleDevRoleData.js.map