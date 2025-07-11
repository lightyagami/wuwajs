"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckMoraleLevelRange = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckMoraleLevelRange extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, a) {
    var r;
    return !!e && (r = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevel()) >= e.MinMoraleLevel && r <= e.MaxMoraleLevel;
  }
}
exports.LevelConditionCheckMoraleLevelRange = LevelConditionCheckMoraleLevelRange;
//# sourceMappingURL=LevelConditionCheckMoraleLevelRange.js.map