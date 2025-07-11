"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressConfig = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ConditionGroupById_1 = require("../../../../../Core/Define/ConfigQuery/ConditionGroupById");
const RegressBaseByEntryType_1 = require("../../../../../Core/Define/ConfigQuery/RegressBaseByEntryType");
const RegressBonusRewardByGrade_1 = require("../../../../../Core/Define/ConfigQuery/RegressBonusRewardByGrade");
const RegressDoubleDropByGrade_1 = require("../../../../../Core/Define/ConfigQuery/RegressDoubleDropByGrade");
const RegressEntryByEntryType_1 = require("../../../../../Core/Define/ConfigQuery/RegressEntryByEntryType");
const RegressInvestigationByInvestigationTypeAndIfGlobal_1 = require("../../../../../Core/Define/ConfigQuery/RegressInvestigationByInvestigationTypeAndIfGlobal");
const RegressQuestById_1 = require("../../../../../Core/Define/ConfigQuery/RegressQuestById");
const RegressSignRewardByGradeAndActivityId_1 = require("../../../../../Core/Define/ConfigQuery/RegressSignRewardByGradeAndActivityId");
const RewardConfigById_1 = require("../../../../../Core/Define/ConfigQuery/RewardConfigById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
const LauncherNetworkDetectionController_1 = require("../../../../../Launcher/NetworkDetection/LauncherNetworkDetectionController");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class ActivityRegressConfig extends ConfigBase_1.ConfigBase {
  GetRegressSignRewards(e, r) {
    var i = RegressSignRewardByGradeAndActivityId_1.configRegressSignRewardByGradeAndActivityId.GetConfigList(r, e);
    if (i === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityRecall", 63, "回归活动->获取回流签到奖励配置失败,请检查配置表RegressSignReward", ["activityId:", e], ["grade:", r]);
    }
    return i;
  }
  GetRegressQuestionnaireConfig(e) {
    var r = LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.IsGlobalPlayer();
    var i = RegressInvestigationByInvestigationTypeAndIfGlobal_1.configRegressInvestigationByInvestigationTypeAndIfGlobal.GetConfig(e, r);
    if (i === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityRecall", 63, "回归活动->获取回流调查问卷配置失败,请检查配置表RegressInvestigation", ["type:", e], ["ifGlobal:", r]);
    }
    return i;
  }
  GetRegressBaseConfigListByType(e) {
    var r;
    if (e !== 4) {
      if ((r = RegressBaseByEntryType_1.configRegressBaseByEntryType.GetConfigList(Number(e))) === undefined && Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityRecall", 63, "[回流活动]ActivityRecallConfig.GetRecallBaseConfigByType->", ["获取回流基础配置失败,请检查配置表RegressBase: entryType:", e]);
      }
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityRecall", 63, "[回流活动]ActivityRecallConfig.GetRecallBaseConfigByType->", ["获取回流基础配置失败,请检查传入参数,请传入新角色1类型来获取配置，EntryType:", e]);
    }
  }
  GetRewardConfig(e) {
    var r = RewardConfigById_1.configRewardConfigById.GetConfig(e);
    if (r !== undefined) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityRecall", 63, "[回流活动]ActivityRecallConfig.GetRewardConfig->", ["获取回归奖励配置失败,请检查配置表奖励档次|RewardConfig: rewardGroupId:", e]);
    }
  }
  GetRegressQuestConfig(e) {
    return RegressQuestById_1.configRegressQuestById.GetConfig(e);
  }
  GetRegressBonusRewardConfigList(e) {
    return RegressBonusRewardByGrade_1.configRegressBonusRewardByGrade.GetConfigList(e);
  }
  GetRegressRoleEntryConfigTuple() {
    var e = this.GetSortedOpenRegressEntryConfigList();
    return [e[0], e[1]];
  }
  GetSortedOpenRegressEntryConfigList() {
    var e = this.GetRegressEntryConfigByType(3);
    var e = Array.from(e);
    e.sort((e, r) => {
      if (e === undefined || r === undefined) {
        const i = e ? 1 : 0;
        const t = r ? 1 : 0;
        return t - i;
      }
      const i = ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(e)[0] ? 1 : 0;
      const t = ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(r)[0] ? 1 : 0;
      if (t === i) {
        return e.Id - r.Id;
      } else {
        return t - i;
      }
    });
    return e;
  }
  GetSortedOpenRegressBaseConfigList() {
    var e = [];
    for (const r of ModelManager_1.ModelManager.ActivityRegressModel.GetLastestRegressBaseConfigList(3)) {
      if (ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(r)[0]) {
        e.push(r);
      }
    }
    return e;
  }
  GetRegressEntrySingleConfigByType(e) {
    return this.GetRegressEntryConfigByType(e)[0];
  }
  GetRegressEntryConfigByType(e) {
    if (e === 4) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityRecall", 63, "[回流活动]ActivityRecallConfig.GetRegressEntryConfigByType->", ["获取回流配置失败,请检查传入参数,请传入新角色1类型来获取配置,RegressEntry:entryType:", e]);
      }
    } else {
      var r = RegressEntryByEntryType_1.configRegressEntryByEntryType.GetConfigList(Number(e));
      if (r !== undefined) {
        return r;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityRecall", 63, "[回流活动]ActivityRecallConfig.GetRegressEntryConfigByType->", ["获取回流配置失败,请检查配置表RegressEntry: entryType:", e]);
      }
    }
  }
  GetUnlockRegressEntryViewConfigList() {
    var e;
    var r = [];
    var i = this.GetRegressEntrySingleConfigByType(1);
    r.push(i);
    var i = this.GetRegressEntrySingleConfigByType(2);
    r.push(i);
    var [i, t] = this.GetRegressRoleEntryConfigTuple();
    var [n] = ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(i);
    let o = false;
    if (t !== undefined) {
      [e] = ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(t);
      o = e;
    }
    if ((n || o) && (n && r.push(i), !n) && o) {
      r.push(t);
    }
    return r;
  }
  GetDoubleDropConfig(e) {
    return RegressDoubleDropByGrade_1.configRegressDoubleDropByGrade.GetConfig(e);
  }
  GetConditionGroup(e) {
    return ConditionGroupById_1.configConditionGroupById.GetConfig(e);
  }
}
exports.ActivityRegressConfig = ActivityRegressConfig;
//# sourceMappingURL=ActivityRegressConfig.js.map