"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelConditionCheckMoraleLevelRange = void 0;
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckMoraleLevelRange extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, a) {
    var r;
    return !!e && (r = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevel()) >= e.MinMoraleLevel && r <= e.MaxMoraleLevel
  }
}
exports.LevelConditionCheckMoraleLevelRange = LevelConditionCheckMoraleLevelRange;
//# sourceMappingURL=LevelConditionCheckMoraleLevelRange.js.map