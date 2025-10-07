"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckSurvivorRogueHasWeaponBond = exports.LevelConditionCheckSurvivorRogueTalentCanUnlock = exports.LevelConditionOnSurvivorsRoguePopViewRefresh = exports.LevelConditionOnSurvivorsRogueComboBuffShow = exports.LevelConditionOnSurvivorsRogueEndlessToggleShow = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnSurvivorsRogueEndlessToggleShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o, ...r) {
    var [r] = r;
    return r;
  }
}
exports.LevelConditionOnSurvivorsRogueEndlessToggleShow = LevelConditionOnSurvivorsRogueEndlessToggleShow;
class LevelConditionOnSurvivorsRogueComboBuffShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o, ...r) {
    var [r] = r;
    return r;
  }
}
exports.LevelConditionOnSurvivorsRogueComboBuffShow = LevelConditionOnSurvivorsRogueComboBuffShow;
class LevelConditionOnSurvivorsRoguePopViewRefresh extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o, ...r) {
    var [r] = r;
    return r === Number(e.LimitParams.get("Type"));
  }
}
exports.LevelConditionOnSurvivorsRoguePopViewRefresh = LevelConditionOnSurvivorsRoguePopViewRefresh;
class LevelConditionCheckSurvivorRogueTalentCanUnlock extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    return ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData?.GetTalentTreeRed() ?? false;
  }
}
exports.LevelConditionCheckSurvivorRogueTalentCanUnlock = LevelConditionCheckSurvivorRogueTalentCanUnlock;
class LevelConditionCheckSurvivorRogueHasWeaponBond extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    return ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetWeaponGridDataList().some(e => e.BondPosition);
  }
}
exports.LevelConditionCheckSurvivorRogueHasWeaponBond = LevelConditionCheckSurvivorRogueHasWeaponBond;
//# sourceMappingURL=LevelConditionSurvivorsRogueGuide.js.map