"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckFormationAnyRoleDead = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckFormationAnyRoleDead extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
      if (r.IsDead()) {
        return true;
      }
    }
    return false;
  }
}
exports.LevelConditionCheckFormationAnyRoleDead = LevelConditionCheckFormationAnyRoleDead;
//# sourceMappingURL=LevelConditionCheckFormationAnyRoleDead.js.map