"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckCurrentCharacter = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckCurrentCharacter extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e) {
    var r;
    return !!e && (e = e, r = ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId(), r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(r)?.Id, r = e.RoleId === r, e.Compare === "Eq" ? r : !r);
  }
}
exports.LevelConditionCheckCurrentCharacter = LevelConditionCheckCurrentCharacter;
//# sourceMappingURL=LevelConditionCheckCurrentCharacter.js.map