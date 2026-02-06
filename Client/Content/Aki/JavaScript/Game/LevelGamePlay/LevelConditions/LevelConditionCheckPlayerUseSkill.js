"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckPlayerUseSkill = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckPlayerUseSkill extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) {
      return false;
    }
    var l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
    if (!l) {
      return false;
    }
    l = l.GetComponent(42);
    if (!l || !l.CurrentSkill) {
      return false;
    }
    const a = l.CurrentSkill.SkillId;
    if (e.CheckType === 0) {
      return e.CheckSkills.every(e => a === e.SkillId);
    } else if (e.CheckType === 1) {
      return e.CheckSkills.some(e => a === e.SkillId);
    } else {
      return !e.CheckSkills.some(e => a === e.SkillId);
    }
  }
}
exports.LevelConditionCheckPlayerUseSkill = LevelConditionCheckPlayerUseSkill;
//# sourceMappingURL=LevelConditionCheckPlayerUseSkill.js.map