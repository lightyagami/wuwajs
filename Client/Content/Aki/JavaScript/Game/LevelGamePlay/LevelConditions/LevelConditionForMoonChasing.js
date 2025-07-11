"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionForMoonChasingCheckMainlineTaskDone = exports.LevelConditionForMoonChasingOpenInteractive = exports.LevelConditionForMoonChasingCheckTaskState = exports.LevelConditionForMoonChasingCheckHasNotFinishedTask = exports.LevelConditionForMoonChasingCheckNeedBranch = exports.LevelConditionForMoonChasingCheckHasCanLevelUpBuilding = exports.LevelConditionForMoonChasingCheckTargetBuiltCount = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionForMoonChasingCheckTargetBuiltCount extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var e = e.LimitParams;
    var o = e.get("TargetBuiltCount");
    var e = e.get("Op");
    return o !== undefined && e !== undefined && (o = parseInt(o), this.CheckCompareValue(e, ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuiltBuildingCount(), o));
  }
}
exports.LevelConditionForMoonChasingCheckTargetBuiltCount = LevelConditionForMoonChasingCheckTargetBuiltCount;
class LevelConditionForMoonChasingCheckHasCanLevelUpBuilding extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    return ModelManager_1.ModelManager.MoonChasingBuildingModel.GetFirstCanLevelUpBuildingId() !== undefined;
  }
}
exports.LevelConditionForMoonChasingCheckHasCanLevelUpBuilding = LevelConditionForMoonChasingCheckHasCanLevelUpBuilding;
class LevelConditionForMoonChasingCheckNeedBranch extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = e.LimitParams.get("TargetRewardId");
    if (e === undefined) {
      return false;
    }
    e = parseInt(e);
    e = ModelManager_1.ModelManager.MoonChasingRewardModel.GetTaskDataById(e);
    if (e === undefined) {
      return false;
    }
    let o = false;
    for (const a of ConfigManager_1.ConfigManager.TaskConfig.GetAllBranchLineTask()) {
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(a.TaskId) === 1) {
        o = true;
        break;
      }
    }
    return e.IsFinished && o;
  }
}
exports.LevelConditionForMoonChasingCheckNeedBranch = LevelConditionForMoonChasingCheckNeedBranch;
class LevelConditionForMoonChasingCheckHasNotFinishedTask extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    for (const o of ModelManager_1.ModelManager.MoonChasingBusinessModel.GetHelpEditTeamDataList()) {
      if (o.GetTeamDataUnLockState() === 1) {
        return true;
      }
    }
    return false;
  }
}
exports.LevelConditionForMoonChasingCheckHasNotFinishedTask = LevelConditionForMoonChasingCheckHasNotFinishedTask;
class LevelConditionForMoonChasingCheckTaskState extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var e = e.LimitParams;
    var o = e.get("TargetState");
    var a = e.get("TargetCount");
    var e = e.get("Op");
    if (o === undefined || a === undefined || e === undefined) {
      return false;
    }
    var r = parseInt(o);
    var o = parseInt(a);
    let t = 0;
    for (const i of ModelManager_1.ModelManager.MoonChasingBusinessModel.GetHelpEditTeamDataList()) {
      if (i.GetTeamDataUnLockState() === r) {
        ++t;
      }
    }
    return this.CheckCompareValue(e, t, o);
  }
}
exports.LevelConditionForMoonChasingCheckTaskState = LevelConditionForMoonChasingCheckTaskState;
class LevelConditionForMoonChasingOpenInteractive extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    return true;
  }
}
exports.LevelConditionForMoonChasingOpenInteractive = LevelConditionForMoonChasingOpenInteractive;
class LevelConditionForMoonChasingCheckMainlineTaskDone extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = e.LimitParams.get("MainLineId");
    return e !== undefined && ModelManager_1.ModelManager.MoonChasingTaskModel.GetMainLineState(parseInt(e)) === 3;
  }
}
exports.LevelConditionForMoonChasingCheckMainlineTaskDone = LevelConditionForMoonChasingCheckMainlineTaskDone;
//# sourceMappingURL=LevelConditionForMoonChasing.js.map