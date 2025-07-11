"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckFishingTechUnlock = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckFishingTechUnlock extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    var n = Number(e.LimitParams.get("FishingTechId"));
    if (!n || isNaN(n)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 74, "CheckFishingTechUnlock条件参数错误, 无法解析为数值");
      }
      return false;
    } else {
      e = (e.LimitParams.get("ReverseUnlockCheck") ?? "FALSE").toUpperCase() === "TRUE";
      return ModelManager_1.ModelManager.FishingModel.GetFishingTechUnlock(n) !== e;
    }
  }
}
exports.LevelConditionCheckFishingTechUnlock = LevelConditionCheckFishingTechUnlock;
//# sourceMappingURL=LevelConditionCheckFishingTechUnlock.js.map