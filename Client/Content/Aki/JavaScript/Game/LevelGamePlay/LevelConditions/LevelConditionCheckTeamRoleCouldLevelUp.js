"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckTeamRoleCouldLevelUp = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTeamRoleCouldLevelUp extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    let o = false;
    for (const l of ModelManager_1.ModelManager.RoleModel.GetRoleCostExpList()) {
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(l.Id) > 0) {
        o = true;
        break;
      }
    }
    if (o) {
      for (const n of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)) {
        var r = n.GetConfigId;
        var r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r).GetLevelData();
        if (r.GetLevel() < r.GetCurrentMaxLevel()) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.LevelConditionCheckTeamRoleCouldLevelUp = LevelConditionCheckTeamRoleCouldLevelUp;
//# sourceMappingURL=LevelConditionCheckTeamRoleCouldLevelUp.js.map