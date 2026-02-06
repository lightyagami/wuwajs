"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashModel = exports.CalabashDevelopRewardData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const PhantomFetterGroupById_1 = require("../../../Core/Define/ConfigQuery/PhantomFetterGroupById");
const RefineRecommendByCost_1 = require("../../../Core/Define/ConfigQuery/RefineRecommendByCost");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CalabashInstance_1 = require("./CalabashInstance");
class CalabashDevelopRewardData {
  constructor(e, t) {
    this.DevelopReward = e;
    this.SkillName = t;
    this.Jft = false;
    this.zft = 0;
    this.Zft = new Map();
  }
  set UnlockData(e) {
    this.Jft = e;
  }
  get UnlockData() {
    return this.Jft;
  }
  set RewardNumData(e) {
    this.zft = e;
  }
  get RewardNumData() {
    return this.zft;
  }
  get DevelopRewardData() {
    return this.DevelopReward;
  }
  get RewardSumNumData() {
    return this.DevelopRewardData.DevelopCondition.length;
  }
  SetUnlockConditionMap(e) {
    for (const t of e) {
      this.Zft.set(t.dLs, t.mLs);
    }
  }
  GetUnlockConditionMap() {
    return this.Zft;
  }
  get UnlockSize() {
    return this.Zft.size;
  }
  CheckCanGetReward() {
    for (const e of this.Zft.values()) {
      if (!e) {
        return true;
      }
    }
    return false;
  }
}
exports.CalabashDevelopRewardData = CalabashDevelopRewardData;
class CalabashModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.OnlyShowBattleFettersTab = false;
    this.OnlyMonsterCostShowMaxLevel = undefined;
    this.OnlyShowPhantomFetterGroupIdList = undefined;
    this.Me = undefined;
    this.ept = undefined;
    this.tpt = undefined;
    this.ipt = undefined;
    this.HideVisionRecoveryConfirmBox = false;
    this.opt = new Array();
    this.DirectionalFusionTime = 0;
    this.DirectionalFusionTimeMax = 0;
    this.DirectionalFusionTargetFetterGroup = 0;
  }
  OnInit() {
    this.DirectionalFusionTimeMax = CommonParamById_1.configCommonParamById.GetIntConfig("PhantomDirectRefiningWeekTimes") ?? 0;
    return true;
  }
  rpt() {
    this.CalabashInstance = new CalabashInstance_1.CalabashInstance();
    this.npt();
    this.InitMonsterIdRecord();
  }
  npt() {
    var e = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopList();
    this.ept ||= new Map();
    for (const a of e) {
      var t = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(a.MonsterInfoId);
      var t = new CalabashDevelopRewardData(a, t.Name);
      if (a.IsShow) {
        this.ept.set(a.MonsterId, t);
      }
    }
  }
  UpdateCalabashDevelopRewardData() {
    for (const t of this.GetUnlockCalabashDevelopRewards()) {
      var e = this.ept.get(t[0]);
      e.UnlockData = true;
      e.SetUnlockConditionMap(t[1]);
      e.RewardNumData = t[1].length;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HasCalabashExp);
  }
  GetCalabashDevelopRewardSortData() {
    var e = new Array();
    for (const t of this.ept.values()) {
      e.push(t);
    }
    e.sort((e, t) => e.DevelopReward.SortId - t.DevelopReward.SortId);
    return e;
  }
  SetCalabashInstanceBaseInfo(e) {
    if (!this.CalabashInstance) {
      this.rpt();
    }
    this.CalabashInstance.SetBaseInfo(e);
  }
  SetCalabashInstanceConfigInfo(e) {
    if (!this.CalabashInstance) {
      this.rpt();
    }
    this.CalabashInstance.SetConfigInfo(e);
  }
  InitMonsterIdRecord() {
    this.ipt = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashCollect) ?? [];
    this.tpt = new Set();
    for (const e of this.ipt) {
      this.tpt.add(e);
    }
  }
  SetCalabashLevel(e) {
    this.CalabashInstance.CalabashCurrentLevel = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashLevelUpdate);
  }
  GetCalabashLevel() {
    return this.CalabashInstance.CalabashCurrentLevel;
  }
  GetCalabashMaxLevel() {
    return this.CalabashInstance.CalabashMaxLevel;
  }
  GetIdentifyGuaranteeCount() {
    return this.CalabashInstance.IdentifyGuaranteeCount;
  }
  GetLowCostIdentifyGuaranteeCount() {
    return this.CalabashInstance.LowCostIdentifyGuaranteeCount;
  }
  GetLeftIntensifyCaptureGuarantee() {
    var e = this.CalabashInstance.CalabashCurrentLevel;
    var e = ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(e)?.IntensifyCaptureGuarantee ?? 0;
    var t = ModelManager_1.ModelManager.CalabashModel?.GetIdentifyGuaranteeCount() ?? 0;
    return Math.max(e - t, 0);
  }
  GetLeftLowCostIntensifyCaptureGuarantee() {
    var e = this.CalabashInstance.CalabashCurrentLevel;
    var e = ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(e)?.LowCostIntensifyCaptureGuarantee ?? 0;
    var t = ModelManager_1.ModelManager.CalabashModel?.GetLowCostIdentifyGuaranteeCount() ?? 0;
    return Math.max(e - t, 0);
  }
  SetCurrentExp(e) {
    this.CalabashInstance.CalabashCurrentExp = e;
  }
  GetCurrentExp() {
    return this.CalabashInstance.CalabashCurrentExp;
  }
  SetUnlockCalabashDevelopReward(e) {
    this.CalabashInstance.SetUnlockCalabashDevelopReward(e);
  }
  GetUnlockCalabashDevelopRewards() {
    return this.CalabashInstance.GetUnlockCalabashDevelopRewards();
  }
  CheckCalabashMonsterUnlocked(e) {
    e = this.ept.get(e);
    return !!e && e.UnlockData;
  }
  GetMonsterName(e) {
    return "CalabashCatchGain_" + e;
  }
  GetCalabashDevelopRewardInfoData(e) {
    var t = this.ept.get(e);
    if (t) {
      var a = new Array();
      for (const n of t.DevelopReward.DevelopCondition) {
        var r = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConditionById(n);
        var r = {
          IsUnlock: t.GetUnlockConditionMap().get(r.Id) !== undefined,
          Info: r.Description,
          Num: ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConditionRewardExp(r)
        };
        a.push(r);
      }
      return a;
    }
  }
  GetCalabashDevelopRewardExpByMonsterId(e) {
    let t = 0;
    var a = this.ept.get(e);
    if (a) {
      for (const n of a.DevelopReward.DevelopCondition) {
        var r = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConditionById(n);
        if (a.GetUnlockConditionMap().get(r.Id)) {
          t += ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConditionRewardExp(r);
        }
      }
    }
    return t;
  }
  GetCalabashAllSchedule() {
    let e = 0;
    for (const t of this.ept.values()) {
      e += t.RewardSumNumData;
    }
    return e;
  }
  GetCalabashOwnSchedule() {
    let e = 0;
    for (const t of this.ept.values()) {
      e += t.UnlockSize;
    }
    return e;
  }
  set CalabashInstance(e) {
    this.Me = e;
  }
  get CalabashInstance() {
    return this.Me;
  }
  get CalabashUnlockTipsList() {
    return this.opt;
  }
  SetCalabashLevelsReward(e) {
    this.CalabashInstance.SetRewardedLevelsSet(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GetCalabashReward);
  }
  GetCurrentExpByLevel(e) {
    if (e < this.CalabashInstance.CalabashCurrentLevel) {
      return ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(e).LevelUpExp;
    } else if (e === this.CalabashInstance.CalabashCurrentLevel) {
      return this.CalabashInstance.CalabashCurrentExp;
    } else {
      return 0;
    }
  }
  GetMaxExpByLevel(e) {
    return ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(e).LevelUpExp;
  }
  GetReceiveRewardStateByLevel(e) {
    if (e === 0) {
      return 0;
    } else if (this.CalabashInstance.IsRewardedByLevel(e)) {
      return 3;
    } else if (e > this.CalabashInstance.CalabashCurrentLevel) {
      return 1;
    } else {
      return 2;
    }
  }
  IsLimitToLevelUp(e) {
    return e === this.CalabashInstance.CalabashCurrentLevel && (e = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(e), this.CalabashInstance.CalabashCurrentExp >= e.LevelUpExp);
  }
  GetCatchGainByLevel(e) {
    return this.CalabashInstance.GetCatchGainByLevel(e) ?? 0;
  }
  CheckCanReceiveReward() {
    if (this.CalabashInstance !== undefined) {
      for (let e = 1; e <= this.CalabashInstance.CalabashCurrentLevel; ++e) {
        if (this.GetReceiveRewardStateByLevel(e) === 2) {
          return true;
        }
      }
    }
    return false;
  }
  RecordMonsterId(e) {
    return !this.tpt?.has(e) && (this.tpt?.add(e), this.ipt?.push(e), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashCollect, this.ipt), true);
  }
  CheckMonsterIdInRecord(e) {
    return this.tpt.has(e);
  }
  CheckSimpleStateSave() {
    if (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashCollectIsSimpleDetail) === undefined) {
      this.SaveIfSimpleState(true);
    }
  }
  GetIfSimpleState() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashCollectIsSimpleDetail);
  }
  SaveIfSimpleState(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashCollectIsSimpleDetail);
    if (t === undefined || t !== e) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashCollectIsSimpleDetail, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeCalabashCollectSimplyState);
    }
  }
  GetViewTabList() {
    var e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("CalabashRootView");
    if (this.OnlyShowBattleFettersTab) {
      return e.filter(e => e.ChildViewName === "PhantomBattleFettersTabView");
    }
    const t = [];
    e.forEach(e => {
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(e.FunctionId)) {
        t.push(e);
      }
    });
    return t;
  }
  GetPhantomFetterGroupList() {
    if (!this.OnlyShowBattleFettersTab) {
      return ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterGroupList());
    }
    var e = [];
    for (const a of this.OnlyShowPhantomFetterGroupIdList ?? []) {
      var t = PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(a);
      if (t) {
        e.push(t);
      }
    }
    return e;
  }
  GmClearData() {
    this.opt.length = 0;
  }
  GetVisionRefineRecommendAttributes(e, t) {
    var a = RefineRecommendByCost_1.configRefineRecommendByCost.GetConfigList(e);
    if (a) {
      for (const r of a) {
        if (r.FetterArray.includes(t)) {
          return r.PropertyArray;
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Calabash", 75, "获取洗炼推荐配置失败, 请检查配置表", ["cost", e]);
    }
    return [];
  }
  ClearOnlyShowData() {
    this.OnlyShowBattleFettersTab = false;
    this.OnlyMonsterCostShowMaxLevel = undefined;
  }
  SetDirectionalFusionTargetFetter(e) {
    this.DirectionalFusionTargetFetterGroup = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SelectDirectionalFusionTarget);
  }
}
exports.CalabashModel = CalabashModel;
//# sourceMappingURL=CalabashModel.js.map