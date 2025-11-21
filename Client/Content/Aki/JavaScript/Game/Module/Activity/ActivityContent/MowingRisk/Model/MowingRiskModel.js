"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingRiskModel = undefined;
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityMowingRiskController_1 = require("../Controller/ActivityMowingRiskController");
const MowingRiskDefine_1 = require("../MowingRiskDefine");
const MowingRiskConfigContext_1 = require("./MowingRiskConfigContext");
const MowingRiskProtocolContext_1 = require("./MowingRiskProtocolContext");
const MowingRiskUiContext_1 = require("./MowingRiskUiContext");
const RiskHarvestDifficultyById_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestDifficultyById");
const RiskHarvestInstById_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestInstById");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
class MowingRiskModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.UVa = undefined;
    this.xVa = undefined;
    this.PVa = undefined;
    this.RVd = false;
    this.wVa = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, this.BuildActivityRewardViewData());
    };
    this.oth = (t, e) => t.BuffType === e.BuffType ? t.Id - e.Id : e.BuffType - t.BuffType;
    this.InstanceSubViewResourceId = "UiItem_CheckpointsMowing";
  }
  InitContext() {
    if (!this.RVd) {
      this.RVd = true;
      this.UVa = new MowingRiskConfigContext_1.MowingRiskConfigContext();
      this.xVa = new MowingRiskProtocolContext_1.MowingRiskProtocolContext();
      this.PVa = new MowingRiskUiContext_1.MowingRiskUiContext(this);
    }
  }
  OnClear() {
    this.UVa?.Dispose();
    this.xVa?.Dispose();
    this.PVa?.Dispose();
    return true;
  }
  SyncProtocolRiskHarvestEndNotify(t) {
    this.xVa?.ParseRiskHarvestEndNotify(t);
  }
  SyncProtocolRiskHarvestInstUpdateNotify(t) {
    this.xVa?.ParseRiskHarvestInstUpdateNotify(t);
  }
  SyncProtocolRiskHarvestArtifactNotify(t) {
    this.xVa?.ParseRiskHarvestArtifactNotify(t);
  }
  SyncProtocolRiskHarvestBuffUpdateNotify(t) {
    this.xVa?.ParseRiskHarvestBuffUpdateNotify(t);
    this.PVa?.SyncNewBuff(t.lE_);
  }
  SyncProtocolRiskHarvestBuffUnlockNotify(t) {
    this.xVa?.ParseRiskHarvestBuffUnlockNotify(t);
  }
  SyncProtocolRiskHarvestActivityUpdateNotify(t) {
    this.xVa?.ParseRiskHarvestActivityUpdateNotify(t);
  }
  ResetBuffViewCache() {
    this.CurrentBuffViewType = 0;
    this.CurrentChosenOverviewBuffId = undefined;
    this.CurrentChosenProgressIndex = undefined;
  }
  ResetCacheInBattle() {
    this.xVa.ResetCacheInBattle();
    this.PVa.ResetCacheInBattle();
  }
  GetBuffTypeByBuffId(t) {
    return this.UVa.GetBuffTypeById(t);
  }
  GetRiskHarvestInstConfigByInstanceId(t) {
    t = this.UVa.GetIdByInstanceId(t);
    return RiskHarvestInstById_1.configRiskHarvestInstById.GetConfig(t);
  }
  GetDifficultyConfigByInstanceId(t) {
    t = this.UVa.GetIdByInstanceId(t);
    t = RiskHarvestInstById_1.configRiskHarvestInstById.GetConfig(t).Difficulty;
    return RiskHarvestDifficultyById_1.configRiskHarvestDifficultyById.GetConfig(t);
  }
  GetMonsterRatioByInstanceId(t) {
    return this.GetDifficultyConfigByInstanceId(t).MonsterRatio;
  }
  GetRecordScoreById(t) {
    return this.xVa.GetScoreById(t);
  }
  GetMaxScoreByInstanceId(t) {
    t = this.UVa.GetIdByInstanceId(t);
    return this.GetMaxScoreById(t);
  }
  GetMaxScoreById(t) {
    t = RiskHarvestInstById_1.configRiskHarvestInstById.GetConfig(t);
    if (t) {
      return t.MaxScore;
    } else {
      return 0;
    }
  }
  GetProgressOverallPercentage(t, e) {
    return this.UVa.GetProgressOverallPercentage(t, e);
  }
  BuildBuffIntroduceDataInOverviewById(t) {
    var e = this.UVa;
    var i = this.xVa.IsBuffUnlocked(t);
    var r = this.xVa.GetBuffCountInBattleById(t);
    return {
      BackgroundPath: e.GetBuffIntroduceBackgroundPath(t),
      LevelTextId: i && r !== undefined ? "RiskHarvest_LV" : undefined,
      LevelTextArgs: i && r !== undefined ? [r.toString()] : undefined,
      NameTextId: i ? e.GetBuffNameTextIdById(t) : "RiskHarvest_TitleUnlock",
      TipsTextId: i ? e.GetBuffDescriptionTextIdById(t) : "riskharvest_BuffunlockDesc",
      TipsArgs: i ? e.GetBuffDescriptionArgsById(t) : [],
      IconPath: i ? e.GetBuffIconPathById(t) : undefined,
      HexColor: e.GetBuffHexColorById(t),
      IsUnlock: i
    };
  }
  BuildBuffIntroduceDataInProgressById(t) {
    var e = this.UVa;
    return {
      BackgroundPath: e.GetBuffIntroduceBackgroundPath(t),
      LevelTextId: undefined,
      LevelTextArgs: undefined,
      NameTextId: e.GetBuffNameTextIdById(t),
      TipsTextId: e.GetBuffDescriptionTextIdById(t),
      TipsArgs: e.GetBuffDescriptionArgsById(t),
      IconPath: e.GetBuffIconPathById(t),
      HexColor: e.GetBuffHexColorById(t),
      IsUnlock: this.xVa.IsBuffUnlocked(t)
    };
  }
  BuildBuffItemDataById(t) {
    var e = this.UVa;
    var i = this.xVa.IsBuffUnlocked(t);
    return {
      BuffId: t,
      QualityPath: e.GetBuffQualityPathById(t),
      IconPath: i ? e.GetBuffIconPathById(t) : undefined,
      NameTextId: i ? e.GetBuffNameTextIdById(t) : "RiskHarvest_TitleUnlock",
      IsShowBackground: true,
      IsChosen: t === this.CurrentChosenOverviewBuffId,
      IsUnlock: i,
      LevelContent: this.wZa(t)
    };
  }
  BuildSuperBuffUnitDataListById(e) {
    var i = this.xVa.ArtifactBasicBuffTotalCount;
    var r = this.UVa;
    var s = r.GetArtifactConfig(e).BuffGroup;
    var n = [];
    for (let t = 0; t < s.length; t++) {
      var a = s[t];
      var o = r.GetBuffThresholdByArtifactIdAndIndex(e, t);
      var a = {
        Index: t,
        BuffId: a,
        IsChosen: t === this.CurrentChosenProgressIndex,
        IsActive: o <= i,
        IconPath: r.GetBuffIconPathById(t),
        NameTextId: r.GetBuffNameTextIdById(a),
        ThresholdCount: o
      };
      n.push(a);
    }
    return n;
  }
  sbc(t) {
    var e = [];
    for (const i of t) {
      e.push(this.BuildBuffItemDataById(i.Id));
    }
    return e;
  }
  BuildOverviewViewData() {
    var t;
    var e;
    var i;
    if (this.CurrentChosenOverviewBuffId !== undefined) {
      t = [];
      e = this.CurrentBuffViewUsage === 0;
      if ((i = this.GetSuperBuffConfigsAfterSort()).length > 0) {
        t.push({
          GroupNameTextId: "riskharvest_superbuff",
          BuffItemList: this.sbc(i),
          ShowUnlockText: e
        });
      }
      if ((i = this.GetBasicBuffConfigsAfterSort()).length > 0) {
        t.push({
          GroupNameTextId: "riskharvest_normalbuff",
          BuffItemList: this.sbc(i),
          ShowUnlockText: e
        });
      }
      return {
        IntroduceData: this.BuildBuffIntroduceDataInOverviewById(this.CurrentChosenOverviewBuffId),
        BuffGroupData: t
      };
    }
  }
  BuildProgressViewData() {
    var t = this.xVa;
    var e = this.UVa;
    var i = t.ArtifactId;
    var t = t.ArtifactBasicBuffTotalCount;
    var r = e.GetBuffMaxCountByArtifactId(i);
    var s = e.GetBuffIdByArtifactIdAndIndex(i, this.CurrentChosenProgressIndex);
    return {
      ArtifactId: i,
      CurBasicBuffCount: t,
      MaxBasicBuffCount: r,
      CountTextId: "PrefabTextItem_1333511122_Text",
      CountTextArgs: [t.toString(), r.toString()],
      ProgressPercentage: e.GetProgressOverallPercentage(i, t),
      SuperBuffList: this.BuildSuperBuffUnitDataListById(i),
      IntroduceData: this.BuildBuffIntroduceDataInProgressById(s)
    };
  }
  BuildCaptionViewData() {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(MowingRiskDefine_1.MOWING_RISK_ENTRANCE_ID);
    return {
      TitleTextId: t?.Name ?? "",
      IconPath: t?.TitleSprite ?? ""
    };
  }
  BuildInstanceDetailDataByInstanceId(t) {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
    var i = this.UVa.GetIdByInstanceId(t);
    return {
      TitleTextId: e?.MapName ?? "",
      ContentTextId: e?.DungeonDesc ?? "",
      AttributeList: [{
        AttributeTextId: e?.MonsterTips
      }],
      LockData: i !== undefined && this.xVa.IsInstanceUnlockedById(i) ? undefined : this.BuildInstanceLockDataByInstanceId(t)
    };
  }
  BuildInstanceDetailLockDataByInstanceId(t) {
    var e = this.UVa.GetIdByInstanceId(t);
    if (e !== undefined && this.xVa.IsInstanceUnlockedById(e)) {
      return undefined;
    } else {
      return this.BuildInstanceLockDataByInstanceId(t);
    }
  }
  BuildInstanceLockDataByInstanceId(t) {
    var t = this.UVa.GetIdByInstanceId(t);
    var e = {
      IsUnlock: false
    };
    if (t !== undefined) {
      e.LockDescriptionTextId = this.hlh(t);
      e.LockDescriptionTextArgs = this.llh(t);
    }
    return e;
  }
  BuildInstanceRecommendDataByInstanceId(t) {
    t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(t, ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
    return {
      TextId: "RecommendLevel",
      TextArgs: [t.toString()],
      RecommendLevel: t
    };
  }
  BuildInstanceTotalScore() {
    return "" + this.xVa.TotalScore;
  }
  BuildInBattleBuffDataById(t) {
    var e = this.UVa;
    return {
      IconPath: e.GetBuffIconPathById(t),
      TitleTextId: e.GetBuffNameTextIdById(t)
    };
  }
  BuildInBattleRootData() {
    var t = this.xVa;
    var e = this.UVa;
    var i = t.ArtifactId;
    var t = t.ArtifactBasicBuffTotalCount;
    return {
      LevelText: e.GetProgressLevel(i, t).toString(),
      ProgressPercentage: e.GetProgressPartialPercentage(i, t)
    };
  }
  BuildActivityRewardViewData() {
    var t = [];
    var e = this.bVa(0);
    if (e) {
      t.push(e);
    }
    var e = this.bVa(1);
    if (e) {
      t.push(e);
    }
    var e = this.bVa(2);
    if (e) {
      t.push(e);
    }
    var e = {
      DataPageList: t,
      Source: "MowingRisk"
    };
    return e;
  }
  BuildNewBuffTipsDataById(t) {
    var e = this.UVa;
    return {
      IsGolden: e.IsNewBuffGoldenById(t),
      NameTextId: e.GetBuffNameTextIdById(t),
      NameHexColor: e.GetNewBuffNameHexColorById(t),
      IconPath: e.GetBuffIconPathById(t),
      DescriptionTextId: e.GetBuffDescriptionTextIdById(t),
      DescriptionArgs: e.GetBuffDescriptionArgsById(t),
      QualityTexPath: e.GetNewBuffQualityTexPathById(t)
    };
  }
  BuildInstanceSubtitleTextIdByInstanceId(t) {
    t = this.UVa.GetIdByInstanceId(t);
    if (t !== undefined) {
      return this.hlh(t);
    }
  }
  BuildInstanceSubtitleTextArgsByInstanceId(t) {
    t = this.UVa.GetIdByInstanceId(t);
    if (t !== undefined) {
      return this.llh(t);
    }
  }
  CheckInstanceFinishedByInstanceId(t) {
    var e;
    var t = this.UVa.GetIdByInstanceId(t);
    return t !== undefined && !!this.xVa.IsInstanceUnlockedById(t) && (e = this.xVa.GetScoreById(t), this.GetMaxScoreById(t) <= e);
  }
  IsSuperBuffById(t) {
    return this.UVa.IsSuperBuffByBuffId(t);
  }
  IsBuffGottenInBattleById(t) {
    var e = this.xVa;
    var i = this.UVa;
    return !!e.BasicBuffInfoInBattle.has(t) || !!i.IsSuperBuffByBuffId(t) && this.UVa.IsSuperBuffAvailable(e.ArtifactId, t, e.ArtifactBasicBuffTotalCount);
  }
  GetBasicBuffConfigListInBattle() {
    var t = this.xVa;
    var e = this.UVa;
    var i = [];
    for (const s of t.BasicBuffInfoInBattle.keys()) {
      var r = e.GetBuffConfigById(s);
      if (r) {
        i.push(r);
      }
    }
    return i;
  }
  GetSuperBuffConfigListInBattle() {
    var t = this.xVa;
    var e = this.UVa;
    var i = [];
    var r = e.GetArtifactConfig(t.ArtifactId);
    var s = t.ArtifactBasicBuffTotalCount;
    for (let t = 0; t < r.BuffGroup.length; t++) {
      var n = r.BuffGroup[t];
      if (r.BasicBuffGroup[t] <= s && (n = e.GetBuffConfigById(n))) {
        i.push(n);
      }
    }
    return i;
  }
  GetBuffConfigList() {
    return this.UVa.GetBuffConfigListByActivityId(this.xVa.Id);
  }
  GetBasicBuffConfigListBeforeBattle() {
    return this.GetBuffConfigList().filter(t => t.BuffProgress > 0);
  }
  GetSuperBuffConfigListBeforeBattle() {
    return this.GetBuffConfigList().filter(t => t.BuffProgress === 0);
  }
  IsBuffAvailableInActivity(t) {
    return this.xVa.Id === t.ActivityId;
  }
  IsInstanceUnlockedByInstanceId(t) {
    t = this.UVa.GetIdByInstanceId(t);
    return t !== undefined && this.xVa.IsInstanceUnlockedById(t);
  }
  IsInstanceNewById(t) {
    return this.UVa.IsInstanceNewCache.get(t) ?? false;
  }
  SetInstanceOldById(t) {
    var e = this.UVa.IsInstanceNewCache;
    e.set(t, false);
    this.UVa.IsInstanceNewCache = e;
  }
  SetCurrentInstancesOld() {
    var t;
    var e = this.xVa.InstanceInfo;
    var i = this.UVa.IsInstanceNewCache;
    for ([t] of e) {
      if (this.xVa.IsInstancePassUnlockTimeById(t)) {
        i.set(t, false);
      }
    }
    this.UVa.IsInstanceNewCache = i;
  }
  RecordBuffId(t) {
    this.xVa.RecordBuffId(t);
  }
  GetRecordBuffIdSet() {
    return this.xVa.GetRecordBuffIdSet();
  }
  HasBuffIdRecord(t) {
    return this.GetRecordBuffIdSet().has(t);
  }
  RecordProgressPanelBasicBuffCount(t) {
    this.xVa.RecordProgressPanelBasicBuffCount(t);
  }
  GetProgressPanelBasicBuffCountRecord() {
    return this.xVa.GetProgressPanelBasicBuffCountRecord();
  }
  bVa(t) {
    var e = this.GVa(t);
    if (e && e.length !== 0) {
      return {
        TabName: this.qVa(t),
        TabTips: t === 1 ? this.OVa() : undefined,
        DataList: e
      };
    }
  }
  GVa(t) {
    switch (t) {
      case 0:
        return this.kVa();
      case 1:
        return this.NVa();
      case 2:
        return this.M6_();
      default:
        return [];
    }
  }
  kVa() {
    var t = [];
    for (const i of this.UVa.GetRiskHarvestInstByActivityId(this.xVa.Id)) {
      var e = this.VVa(i);
      var e = {
        NameText: "",
        NameTextId: i.Desc,
        RewardList: ConfigManager_1.ConfigManager.RewardConfig?.GetDropPackagePreviewItemList(i.Reward),
        RewardState: e,
        RewardButtonText: this.Vea(e),
        RewardButtonRedDot: e === 1,
        ClickFunction: () => {
          ActivityMowingRiskController_1.ActivityMowingRiskController.Instance.RequestRiskHarvestInstRewardRequest(i.Id).then(this.wVa);
        }
      };
      t.push(e);
    }
    return t;
  }
  NVa() {
    var t = [];
    for (const i of this.UVa.GetRiskHarvestScoreRewardByActivityId(this.xVa.Id)) {
      var e = this.HVa(i);
      var e = {
        NameText: "",
        NameTextId: i.Desc,
        RewardList: ConfigManager_1.ConfigManager.RewardConfig?.GetDropPackagePreviewItemList(i.Reward),
        RewardState: e,
        RewardButtonText: this.Vea(e),
        RewardButtonRedDot: e === 1,
        ClickFunction: () => {
          ActivityMowingRiskController_1.ActivityMowingRiskController.Instance.RequestRiskHarvestScoreRewardRequest(i.Id).then(this.wVa);
        }
      };
      t.push(e);
    }
    return t;
  }
  M6_() {
    var e = [];
    for (const o of this.UVa.GetRiskHarvestInstByActivityId(this.xVa.Id)) {
      var i = o.StarRewardList;
      var r = i.length;
      for (let t = 0; t < r; t++) {
        var s = i[t];
        var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(o.InstanceID);
        var a = this.E6_(o, t);
        var n = {
          NameText: "",
          NameTextId: o.StarRewardDesc,
          NameTextArgs: [MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.MapName) ?? "", this.sX_(o, t).toString()],
          RewardList: ConfigManager_1.ConfigManager.RewardConfig?.GetDropPackagePreviewItemList(s.Item2),
          RewardState: a,
          RewardButtonText: this.Vea(a),
          RewardButtonRedDot: a === 1,
          ClickFunction: () => {
            ActivityMowingRiskController_1.ActivityMowingRiskController.Instance.RequestRiskHarvestStarRewardRequest(o.Id, t).then(this.wVa);
          }
        };
        e.push(n);
      }
    }
    return e;
  }
  GetRewardCount() {
    let e = 0;
    let t = 0;
    for (const s of this.UVa.GetRiskHarvestInstByActivityId(this.xVa.Id)) {
      if (this.VVa(s) === 2) {
        e++;
      }
      t++;
      var i = s.StarRewardList;
      var r = i.length;
      for (let t = 0; t < r; t++) {
        if (this.E6_(s, t) === 2) {
          e++;
        }
      }
      t += r;
    }
    for (const n of this.UVa.GetRiskHarvestScoreRewardByActivityId(this.xVa.Id)) {
      if (this.HVa(n) === 2) {
        e++;
      }
      t++;
    }
    return [e, t];
  }
  VVa(t) {
    var e = this.xVa.InstanceInfo.get(t.Id);
    if (e === undefined || !e.K6n || e.SMs < t.RewardScore) {
      return 0;
    } else if (e.mLs) {
      return 2;
    } else {
      return 1;
    }
  }
  E6_(t, e) {
    var i;
    var t = this.xVa.InstanceInfo.get(t.Id);
    if (t === undefined || !t.K6n || !(i = t.oX_) || e < 0 || e >= i.length || (e = (i = i[e]).rX_, t.SMs < e)) {
      return 0;
    } else if (i.mU_ === Protocol_1.Aki.Protocol.gU_.Proto_RiskHarvestRewarded) {
      return 2;
    } else {
      return 1;
    }
  }
  HVa(t) {
    var e = this.xVa;
    if (e.TotalScore < t.Score) {
      return 0;
    } else if (e.HasScoreRewarded(t.Id)) {
      return 2;
    } else {
      return 1;
    }
  }
  sX_(t, e) {
    var t = this.xVa.InstanceInfo.get(t.Id);
    if (t === undefined || !(t = t.oX_) || e < 0 || e >= t.length) {
      return 0;
    } else {
      return t[e].rX_;
    }
  }
  Vea(t) {
    switch (t) {
      case 2:
      case 1:
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerDefence_Getbt1") ?? "";
      case 0:
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerDefence_Getbt3") ?? "";
      default:
        return "";
    }
  }
  qVa(t) {
    switch (t) {
      case 0:
        return ConfigManager_1.ConfigManager.TextConfig?.GetTextById("BossRushLevelRewardText") ?? "";
      case 1:
        return ConfigManager_1.ConfigManager.TextConfig?.GetTextById("RiskHarvest_PointTap") ?? "";
      case 2:
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RiskHarvest_StarRewardTap") ?? "";
      default:
        return "";
    }
  }
  OVa() {
    return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RiskHarvest_InstanceToppoint"), this.xVa.TotalScore.toString());
  }
  wZa(t) {
    t = this.xVa.GetBuffCountInBattleById(t);
    if (t !== undefined) {
      return StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("OverSeaServerLv"), t.toString());
    }
  }
  hlh(t) {
    if (this.xVa.IsInstanceUnlockedById(t)) {
      return this.GetInstanceUnlockTextIdById(t);
    } else {
      return this.GetInstanceLockTextIdById(t);
    }
  }
  GetInstanceUnlockTextIdById(t) {
    if (RiskHarvestInstById_1.configRiskHarvestInstById.GetConfig(t).Accumulate) {
      return "RiskHarvest_TotleScore";
    } else {
      return "RiskHarvest_InstanceToppoint";
    }
  }
  GetInstanceLockTextIdByInstanceId(t) {
    t = this.UVa.GetIdByInstanceId(t);
    if (t === undefined) {
      return "";
    } else {
      return this.GetInstanceLockTextIdById(t);
    }
  }
  GetInstanceLockTextIdById(t) {
    if (this.xVa.IsInstancePassUnlockTimeById(t)) {
      return "RiskHarvest_Unlock";
    } else {
      return "Text_ActiveToOpenTime_Text";
    }
  }
  llh(t) {
    var e;
    var i;
    if (this.xVa.IsInstanceUnlockedById(t)) {
      e = this.xVa.GetScoreById(t);
      (i = []).push(e.toString());
      return i;
    } else {
      return this.GetLockTextArgsById(t);
    }
  }
  GetLockTextArgsById(t) {
    var e = [];
    var i = this.xVa.GetInstanceUnlockTimestampById(t);
    var r = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    if (r < i) {
      i = i - r;
      r = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(i * TimeUtil_1.TimeUtil.Millisecond);
      e.push(r.CountDownText);
    } else {
      i = this.UVa.GetScoreToUnlockById(t);
      e.push(i.toString());
    }
    return e;
  }
  GetLockTextArgsByInstanceId(t) {
    t = this.UVa.GetIdByInstanceId(t);
    if (t !== undefined) {
      return this.GetLockTextArgsById(t);
    }
  }
  get ActivityData() {
    return this.xVa;
  }
  get CurrentBuffViewUsage() {
    return this.PVa.CurrentBuffViewUsage;
  }
  set CurrentBuffViewUsage(t) {
    this.PVa.CurrentBuffViewUsage = t;
  }
  get CurrentBuffViewType() {
    return this.PVa.CurrentBuffViewType;
  }
  set CurrentBuffViewType(t) {
    this.PVa.CurrentBuffViewType = t;
  }
  get CurrentChosenOverviewBuffId() {
    let t = this.PVa.CurrentChosenOverviewBuffId;
    if (t === undefined) {
      t = this.GetDefaultChosenOverviewBuffId();
      this.PVa.CurrentChosenOverviewBuffId = t;
    }
    return t;
  }
  set CurrentChosenOverviewBuffId(t) {
    this.PVa.CurrentChosenOverviewBuffId = t;
  }
  GetDefaultChosenOverviewBuffId() {
    var t = this.GetBasicBuffConfigListBeforeBattle();
    if (!t || !(t.length > 0)) {
      t = this.GetSuperBuffConfigsAfterSort();
    }
    return this.wVd(t);
  }
  GetBasicBuffConfigsAfterSort() {
    var t = this.CurrentBuffViewUsage === 1 ? this.GetBasicBuffConfigListInBattle() : this.GetBasicBuffConfigListBeforeBattle();
    t.sort(this.oth);
    return t;
  }
  GetSuperBuffConfigsAfterSort() {
    var t = this.CurrentBuffViewUsage === 1 ? this.GetSuperBuffConfigListInBattle() : this.GetSuperBuffConfigListBeforeBattle();
    t.sort(this.oth);
    return t;
  }
  wVd(t) {
    if (t.length === 0) {
      return 0;
    }
    let e = t[0];
    for (const i of t) {
      if (i.BuffType > e.BuffType || i.BuffType === e.BuffType && i.Id < e.Id) {
        e = i;
      }
    }
    return e.Id;
  }
  get CurrentChosenProgressIndex() {
    let t = this.PVa.CurrentChosenProgressIndex;
    if (t === undefined) {
      t = 0;
      this.PVa.CurrentChosenProgressIndex = t;
    }
    return t;
  }
  set CurrentChosenProgressIndex(t) {
    this.PVa.CurrentChosenProgressIndex = t;
  }
  get CurrentHelpButtonId() {
    return this.xVa.GetHelpId();
  }
  get CurrentInstanceId() {
    return ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId;
  }
  get IsNewInstanceOpen() {
    var t;
    var e;
    var i;
    var r = this.UVa.IsInstanceNewCache;
    var s = new Map();
    for ([t, e] of r) {
      var n = this.xVa.GetInstanceUnlockTimestampById(t);
      var a = s.get(n) ?? true;
      var o = this.xVa.IsInstancePassUnlockTimeById(t);
      s.set(n, a && !this.xVa.IsInstancePlayedById(t) && e && o);
    }
    for ([, i] of s) {
      if (i) {
        return true;
      }
    }
    return false;
  }
  get IsPreQuestFinished() {
    return this.xVa.GetPreGuideQuestFinishState();
  }
  get UnFinishPreGuideQuestId() {
    return this.xVa.GetUnFinishPreGuideQuestId();
  }
  get ActivityTitleTextId() {
    return this.xVa.LocalConfig?.Title ?? "";
  }
  get ActivityDescriptionTextId() {
    return this.xVa.LocalConfig?.Desc ?? "";
  }
  get HasAnyReward() {
    return this.HasAnyInstanceReward || this.HasAnyScoreReward || this.HasAnyStarReward;
  }
  get HasAnyInstanceReward() {
    for (const t of this.UVa.GetRiskHarvestInstByActivityId(this.xVa.Id)) {
      if (this.VVa(t) === 1) {
        return true;
      }
    }
    return false;
  }
  get HasAnyScoreReward() {
    for (const t of this.UVa.GetRiskHarvestScoreRewardByActivityId(this.xVa.Id)) {
      if (this.HVa(t) === 1) {
        return true;
      }
    }
    return false;
  }
  get HasAnyStarReward() {
    for (const i of this.UVa.GetRiskHarvestInstByActivityId(this.xVa.Id)) {
      var e = i.StarRewardList.length;
      for (let t = 0; t < e; t++) {
        if (this.E6_(i, t) === 1) {
          return true;
        }
      }
    }
    return false;
  }
  get MapMarkId() {
    return MowingRiskDefine_1.MOWING_RISK_MAP_MARK_ID;
  }
  get MapMarkType() {
    return 6;
  }
  get NextNewBuffId() {
    return this.PVa.NewBuffToShowCache.shift();
  }
}
exports.MowingRiskModel = MowingRiskModel;
//# sourceMappingURL=MowingRiskModel.js.map