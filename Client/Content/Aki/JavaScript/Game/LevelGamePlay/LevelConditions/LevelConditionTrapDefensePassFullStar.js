"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionTrapDefensePassFullStar = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionTrapDefensePassFullStar extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    e = Number(e.LimitParams.get("ChallengeId"));
    return !!ModelManager_1.ModelManager.TrapDefenseModel?.LevelDataFromIdMap.has(e) && ModelManager_1.ModelManager.TrapDefenseModel.LevelDataFromIdMap.get(e).IsFullStarPassed();
  }
}
exports.LevelConditionTrapDefensePassFullStar = LevelConditionTrapDefensePassFullStar;
//# sourceMappingURL=LevelConditionTrapDefensePassFullStar.js.map