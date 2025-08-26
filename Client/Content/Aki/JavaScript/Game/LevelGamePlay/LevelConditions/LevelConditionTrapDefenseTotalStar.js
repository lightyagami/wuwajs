"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionTrapDefenseTotalStar = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionTrapDefenseTotalStar extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var r = Number(e.LimitParams.get("ActivityId"));
    return ModelManager_1.ModelManager.TrapDefenseModel?.GetActivityId() === r && (r = e.NeedNum, ModelManager_1.ModelManager.TrapDefenseModel.GetAllGetStarByLevel() >= r);
  }
}
exports.LevelConditionTrapDefenseTotalStar = LevelConditionTrapDefenseTotalStar;
//# sourceMappingURL=LevelConditionTrapDefenseTotalStar.js.map