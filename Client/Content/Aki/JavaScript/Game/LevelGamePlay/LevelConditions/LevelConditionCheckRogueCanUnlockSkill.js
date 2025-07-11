"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckRogueCanUnlockSkill = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckRogueCanUnlockSkill extends LevelGeneralBase_1.LevelConditionBase {
  Check() {
    return ModelManager_1.ModelManager.RoguelikeModel.CheckHasCanUnlockSkill();
  }
}
exports.LevelConditionCheckRogueCanUnlockSkill = LevelConditionCheckRogueCanUnlockSkill;
//# sourceMappingURL=LevelConditionCheckRogueCanUnlockSkill.js.map