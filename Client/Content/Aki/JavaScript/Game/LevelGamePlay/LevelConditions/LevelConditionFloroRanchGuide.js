"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnFloroRanchStageStartTaskFinish = exports.LevelConditionCheckFloroRanchLevel = exports.LevelConditionOnFloroRanchSettleViewOpenWithEndlessMode = exports.LevelConditionCheckFloroRanchHasTechCanUnlock = exports.LevelConditionCheckFloroRanchRound = exports.LevelConditionOnFloroRanchCardCountReachTarget = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnFloroRanchCardCountReachTarget extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = e.LimitParams.get("TargetCount");
    return e !== undefined && !isNaN(Number(e)) && ModelManager_1.ModelManager.FloroRanchGamePlayModel.OwnCardEntityCount >= Number(e);
  }
}
exports.LevelConditionOnFloroRanchCardCountReachTarget = LevelConditionOnFloroRanchCardCountReachTarget;
class LevelConditionCheckFloroRanchRound extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = e.LimitParams.get("Round");
    return e !== undefined && !isNaN(Number(e)) && ModelManager_1.ModelManager.FloroRanchGamePlayModel.TotalDayCount >= Number(e);
  }
}
exports.LevelConditionCheckFloroRanchRound = LevelConditionCheckFloroRanchRound;
class LevelConditionCheckFloroRanchHasTechCanUnlock extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var o = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    return !!o && o.HasAnyTechPointCanUnlock();
  }
}
exports.LevelConditionCheckFloroRanchHasTechCanUnlock = LevelConditionCheckFloroRanchHasTechCanUnlock;
class LevelConditionOnFloroRanchSettleViewOpenWithEndlessMode extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var [o] = o;
    return o;
  }
}
exports.LevelConditionOnFloroRanchSettleViewOpenWithEndlessMode = LevelConditionOnFloroRanchSettleViewOpenWithEndlessMode;
class LevelConditionCheckFloroRanchLevel extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = e.LimitParams.get("TargetLevel");
    return e !== undefined && !isNaN(Number(e)) && ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId === Number(e);
  }
}
exports.LevelConditionCheckFloroRanchLevel = LevelConditionCheckFloroRanchLevel;
class LevelConditionOnFloroRanchStageStartTaskFinish extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var [o] = o;
    return o;
  }
}
exports.LevelConditionOnFloroRanchStageStartTaskFinish = LevelConditionOnFloroRanchStageStartTaskFinish;
//# sourceMappingURL=LevelConditionFloroRanchGuide.js.map