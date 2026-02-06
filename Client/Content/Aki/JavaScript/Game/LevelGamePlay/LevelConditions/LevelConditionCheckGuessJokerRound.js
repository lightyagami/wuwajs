"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckGuessJokerRound = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckGuessJokerRound extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    var n;
    var r;
    var l;
    var i;
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 95, "LevelConditionCheckExploreSkillFlag配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    } else {
      n = Number(e.LimitParams.get("Round"));
      r = ModelManager_1.ModelManager.GuessJokerGamePlayModel.RoundNumber;
      e = Number(e.LimitParams.get("Tutorial")) === 1;
      l = ModelManager_1.ModelManager.GuessJokerGamePlayModel.IsInFirstTutorial();
      i = r === n && e === l;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelCondition", 95, "[testlevelcondition]猜鬼牌", ["roundNumber", n], ["currentRound", r], ["isNeedTutorial", e], ["isInTutorial", l], ["result", i]);
      }
      return i;
    }
  }
}
exports.LevelConditionCheckGuessJokerRound = LevelConditionCheckGuessJokerRound;
//# sourceMappingURL=LevelConditionCheckGuessJokerRound.js.map