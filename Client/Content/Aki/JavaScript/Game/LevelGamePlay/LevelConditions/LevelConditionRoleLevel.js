"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionRoleLevel = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionRoleLevel extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var l;
    return !!e.LimitParams && !!(l = e.LimitParams.get("Level")) && !!(e = (e = e.LimitParams.get("RoleId")) ? parseInt(e) : ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId(), e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)) && !!(e = e.GetLevelData()).GetLevel() && e.GetLevel() >= parseInt(l);
  }
}
exports.LevelConditionRoleLevel = LevelConditionRoleLevel;
//# sourceMappingURL=LevelConditionRoleLevel.js.map