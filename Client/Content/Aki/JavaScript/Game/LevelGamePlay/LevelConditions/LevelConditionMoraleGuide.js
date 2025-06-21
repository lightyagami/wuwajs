"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelConditionCheckNoMoraleAreaFinished = exports.LevelConditionOnMoraleTempExpItemShow = exports.LevelConditionCheckAnyMoraleAreaFinishWithReward = void 0;
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckAnyMoraleAreaFinishWithReward extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    return ModelManager_1.ModelManager.MoraleModel.AreaDataList.some(e => e.HighDifficultyFlagSomeActive() && e.IsExistBox())
  }
}
exports.LevelConditionCheckAnyMoraleAreaFinishWithReward = LevelConditionCheckAnyMoraleAreaFinishWithReward;
class LevelConditionOnMoraleTempExpItemShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r, ...a) {
    var [a] = a;
    return a
  }
}
exports.LevelConditionOnMoraleTempExpItemShow = LevelConditionOnMoraleTempExpItemShow;
class LevelConditionCheckNoMoraleAreaFinished extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    return ModelManager_1.ModelManager.MoraleModel.AreaDataList.every(e => !e.HighDifficultyFlagSomeActive())
  }
}
exports.LevelConditionCheckNoMoraleAreaFinished = LevelConditionCheckNoMoraleAreaFinished;
//# sourceMappingURL=LevelConditionMoraleGuide.js.map