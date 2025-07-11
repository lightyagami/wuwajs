"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckRoleSkillTargetLevel = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckRoleSkillTargetLevel extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, l) {
    return !!e.LimitParams && (e = (e = e.LimitParams.get("Level")) ? parseInt(e) : 0, ControllerHolder_1.ControllerHolder.RoleController.CheckRoleSkillTargetLevel(e));
  }
}
exports.LevelConditionCheckRoleSkillTargetLevel = LevelConditionCheckRoleSkillTargetLevel;
//# sourceMappingURL=LevelConditionCheckRoleSkillTargetLevel.js.map