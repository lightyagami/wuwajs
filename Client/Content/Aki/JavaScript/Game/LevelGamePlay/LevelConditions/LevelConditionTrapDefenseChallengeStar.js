"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionTrapDefenseChallengeStar = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionTrapDefenseChallengeStar extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var r = Number(e.LimitParams.get("ChallengeId"));
    var r = ModelManager_1.ModelManager.TrapDefenseModel.LevelDataFromIdMap.get(r);
    return !!r && (e = e.NeedNum, r.ReachTargetIndexList.length >= e);
  }
}
exports.LevelConditionTrapDefenseChallengeStar = LevelConditionTrapDefenseChallengeStar;
//# sourceMappingURL=LevelConditionTrapDefenseChallengeStar.js.map