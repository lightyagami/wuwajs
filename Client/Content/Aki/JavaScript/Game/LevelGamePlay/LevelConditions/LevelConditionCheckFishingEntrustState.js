"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckFishingEntrustState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const NONE_OR_FINISHED = -1;
class LevelConditionCheckFishingEntrustState extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, t) {
    var r = Number(e.LimitParams.get("EntrustId"));
    var e = Number(e.LimitParams.get("EntrustState"));
    if (isNaN(r) || isNaN(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 74, "CheckFishingEntrustState条件参数错误, 无法解析为数值");
      }
      return false;
    } else if ((r = ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(r)) === undefined) {
      return e === NONE_OR_FINISHED;
    } else {
      return r === e;
    }
  }
}
exports.LevelConditionCheckFishingEntrustState = LevelConditionCheckFishingEntrustState;
//# sourceMappingURL=LevelConditionCheckFishingEntrustState.js.map