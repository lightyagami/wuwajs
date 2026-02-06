"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressConfig = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ConditionGroupById_1 = require("../../../../../Core/Define/ConfigQuery/ConditionGroupById");
const GachaRoleDevelopInsByDungeonDetection_1 = require("../../../../../Core/Define/ConfigQuery/GachaRoleDevelopInsByDungeonDetection");
const GachaRoleDevelopInsById_1 = require("../../../../../Core/Define/ConfigQuery/GachaRoleDevelopInsById");
const GachaRoleDevelopInsByRoleId_1 = require("../../../../../Core/Define/ConfigQuery/GachaRoleDevelopInsByRoleId");
const RegressBaseByEntryType_1 = require("../../../../../Core/Define/ConfigQuery/RegressBaseByEntryType");
const RegressBonusRewardByGrade_1 = require("../../../../../Core/Define/ConfigQuery/RegressBonusRewardByGrade");
const RegressDisposableRewardById_1 = require("../../../../../Core/Define/ConfigQuery/RegressDisposableRewardById");
const RegressDoubleDropByGrade_1 = require("../../../../../Core/Define/ConfigQuery/RegressDoubleDropByGrade");
const RegressEntryByEntryType_1 = require("../../../../../Core/Define/ConfigQuery/RegressEntryByEntryType");
const RegressInvestigationByInvestigationTypeAndIfGlobal_1 = require("../../../../../Core/Define/ConfigQuery/RegressInvestigationByInvestigationTypeAndIfGlobal");
const RegressQuestById_1 = require("../../../../../Core/Define/ConfigQuery/RegressQuestById");
const RegressRecommendAll_1 = require("../../../../../Core/Define/ConfigQuery/RegressRecommendAll");
const RegressRecommendByActivityGroup_1 = require("../../../../../Core/Define/ConfigQuery/RegressRecommendByActivityGroup");
const RegressRecommendById_1 = require("../../../../../Core/Define/ConfigQuery/RegressRecommendById");
const RegressRecommendByType_1 = require("../../../../../Core/Define/ConfigQuery/RegressRecommendByType");
const RegressSignRewardByGradeAndActivityId_1 = require("../../../../../Core/Define/ConfigQuery/RegressSignRewardByGradeAndActivityId");
const RegressTrialRoleAll_1 = require("../../../../../Core/Define/ConfigQuery/RegressTrialRoleAll");
const RewardConfigById_1 = require("../../../../../Core/Define/ConfigQuery/RewardConfigById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
const LauncherNetworkDetectionController_1 = require("../../../../../Launcher/NetworkDetection/LauncherNetworkDetectionController");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class ActivityRegressConfig extends ConfigBase_1.ConfigBase {
  GetRegressSignRewards(e, r) {
    var o = RegressSignRewardByGradeAndActivityId_1.configRegressSignRewardByGradeAndActivityId.GetConfigList(r, e);
    if (o === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityRecall", 63, "回归活动->获取回流签到奖励配置失败,请检查配置表RegressSignReward", ["activityId:", e], ["grade:", r]);
    }
    var n = [];
    for (const i of o ?? []) {
      if (i.Version > 0) {
        n.push(i);
      }
    }
    return n;
  }
  GetRegressQuestionnaireConfig(e) {
    var r = LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.IsGlobalPlayer();
    var o = RegressInvestigationByInvestigationTypeAndIfGlobal_1.configRegressInvestigationByInvestigationTypeAndIfGlobal.GetConfig(e, r);
    if (o === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityRecall", 63, "回归活动->获取回流调查问卷配置失败,请检查配置表RegressInvestigation", ["type:", e], ["ifGlobal:", r]);
    }
    return o;
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
    var r = [];
    for (const o of RegressBonusRewardByGrade_1.configRegressBonusRewardByGrade.GetConfigList(e) ?? []) {
      if (o.Version > 0) {
        r.push(o);
      }
    }
    return r;
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
        const o = e ? 1 : 0;
        const n = r ? 1 : 0;
        return n - o;
      }
      const o = ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(e)[0] ? 1 : 0;
      const n = ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(r)[0] ? 1 : 0;
      if (n === o) {
        return e.Id - r.Id;
      } else {
        return n - o;
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
    var o = this.GetRegressEntrySingleConfigByType(1);
    r.push(o);
    var o = this.GetRegressEntrySingleConfigByType(2);
    r.push(o);
    var [o, n] = this.GetRegressRoleEntryConfigTuple();
    var [i] = ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(o);
    let s = false;
    if (n !== undefined) {
      [e] = ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(n);
      s = e;
    }
    if ((i || s) && (i && r.push(o), !i) && s) {
      r.push(n);
    }
    return r;
  }
  GetDoubleDropConfig(e) {
    return RegressDoubleDropByGrade_1.configRegressDoubleDropByGrade.GetConfig(e);
  }
  GetConditionGroup(e) {
    return ConditionGroupById_1.configConditionGroupById.GetConfig(e);
  }
  GetRegressRecommend(e) {
    return RegressRecommendById_1.configRegressRecommendById.GetConfig(e);
  }
  GetAllRegressRecommend() {
    return RegressRecommendAll_1.configRegressRecommendAll.GetConfigList();
  }
  GetRegressRecommendByType(e) {
    return RegressRecommendByType_1.configRegressRecommendByType.GetConfigList(e);
  }
  GetRegressRecommendByGroup(e) {
    return RegressRecommendByActivityGroup_1.configRegressRecommendByActivityGroup.GetConfigList(e);
  }
  GetRegressDisposableReward(e) {
    return RegressDisposableRewardById_1.configRegressDisposableRewardById.GetConfig(e);
  }
  GetGachaRoleDevelopIns(e) {
    return GachaRoleDevelopInsById_1.configGachaRoleDevelopInsById.GetConfig(e);
  }
  GetGachaRoleDevelopInsByRoleId(e) {
    return GachaRoleDevelopInsByRoleId_1.configGachaRoleDevelopInsByRoleId.GetConfigList(e);
  }
  GetGachaRoleDevelopInsByDungeonId(e) {
    return GachaRoleDevelopInsByDungeonDetection_1.configGachaRoleDevelopInsByDungeonDetection.GetConfig(e);
  }
  GetTrialRoleAll() {
    return RegressTrialRoleAll_1.configRegressTrialRoleAll.GetConfigList();
  }
  GetTrialRoleUnlockDesc() {
    var e = new Map();
    for (const o of this.GetTrialRoleAll() ?? []) {
      var r = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(o.ConditionGroup).HintText;
      e.set(o.TrialRoleGroupId, r);
    }
    return e;
  }
}
exports.ActivityRegressConfig = ActivityRegressConfig;
//# sourceMappingURL=ActivityRegressConfig.js.map