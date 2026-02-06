"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckEncircleCurrentChallengeId = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EncirclePlayLevelController_1 = require("../../Module/Activity/ActivityContent/Encircle/EncirclePlayLevelController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEncircleCurrentChallengeId extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, l) {
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 95, "LevelConditionCheckEncircleCurrentChallengeId配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    } else {
      return !!(e = Number(e.LimitParams.get("ChallengeId"))) && EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().GetCurrentChallengeId() === e;
    }
  }
}
exports.LevelConditionCheckEncircleCurrentChallengeId = LevelConditionCheckEncircleCurrentChallengeId;
//# sourceMappingURL=LevelConditionCheckEncircleCurrentChallengeId.js.map