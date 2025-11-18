"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const FormationDataController_1 = require("../Abilities/FormationDataController");
const ActivityMoraleController_1 = require("../Activity/ActivityContent/Morale/ActivityMoraleController");
const MapDefine_1 = require("../Map/MapDefine");
const TrainingDegreeModel_1 = require("../TrainingDegree/TrainingDegreeModel");
const MoraleAreaData_1 = require("./Data/MoraleAreaData");
const MoraleBuffData_1 = require("./Data/MoraleBuffData");
class MoraleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.AreaDataMap = new Map();
    this.AreaDataList = [];
    this.ProgressRewardList = [];
    this.ProgressRewardMap = new Map();
    this.FlagMap = new Map();
    this.MarkIdToFlagId = new Map();
    this.BuffList = [];
    this.BuffMap = new Map();
    this.BuffActiveTipsList = [];
    this.IsInitData = false;
    this.UnlockFlagSet = new Set();
    this.PlayerMoraleAreaId = 0;
    this.ActiveAreaBuffSet = new Set();
    this.TipsAreaBuffSet = new Set();
    this.GamePlayFinishTeamBuffId = 632400160;
    this.UiEnterConfig = undefined;
    this.UiLoopConfig = undefined;
    this.ExploreBoxEntityIds = undefined;
    this.CacheAreaBuffIdList = [];
  }
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  OnLeaveLevel() {
    return true;
  }
  InitData() {
    if (!this.IsInitData) {
      this.IsInitData = true;
      this.n_u();
      this.O$1();
      this.q$1();
      this.TJ1();
      this.CheckCacheAreaBuffIdList();
    }
  }
  n_u() {
    this.UnlockFlagSet = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MoraleAreaUnlockFlagSet) ?? new Set();
    this.ActiveAreaBuffSet = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MoraleActiveAreaBuff) ?? new Set();
    this.TipsAreaBuffSet = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MoraleTipsAreaBuff) ?? new Set();
  }
  SaveLocalData() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MoraleAreaUnlockFlagSet, this.UnlockFlagSet);
  }
  O$1() {
    ConfigManager_1.ConfigManager.MoraleConfig.GetAllAreaConfigList().forEach(e => {
      e = MoraleAreaData_1.MoraleAreaData.Create(e);
      this.AreaDataMap.set(e.Id, e);
      this.AreaDataList.push(e);
      e.GetFlagList().forEach(e => {
        this.FlagMap.set(e.Id, e);
        if (e.Config.MarkId > 0) {
          this.MarkIdToFlagId.set(e.Config.MarkId, e.Id);
        }
      });
    });
    this.AreaDataList.sort((e, t) => e.Id - t.Id);
  }
  q$1() {
    const i = ConfigManager_1.ConfigManager.MoraleConfig.GetAllScoreConfigList();
    const o = this.GetCurrentProgressScore();
    i.forEach((e, t) => {
      var r = e.ScoreReward;
      var r = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(r)[0] ?? [{
        ItemId: 2,
        IncId: 0
      }, 0];
      var a = e.NeedScore;
      var t = t > 0 ? i[t - 1].NeedScore : 0;
      var e = {
        Id: e.Id,
        IsReceived: false,
        IsCanReceived: o >= a,
        ItemId: r[0].ItemId,
        ItemNum: r[1],
        TargetScore: a,
        LastTargetScore: t,
        IsInCurrentStage: o >= t && o < a,
        StartScore: o
      };
      this.ProgressRewardList.push(e);
      this.ProgressRewardMap.set(e.Id, e);
    });
    this.ProgressRewardList.sort((e, t) => e.Id - t.Id);
    this.s_u(o);
  }
  TJ1() {
    ConfigManager_1.ConfigManager.MoraleConfig.GetAllMoraleLvPowerConfigList().forEach(e => {
      e = MoraleBuffData_1.MoraleBuffData.Create(e);
      this.BuffMap.set(e.Id, e);
      this.BuffList.push(e);
    });
    this.BuffList.sort((e, t) => e.Id - t.Id);
    for (let e = 1; e < this.BuffList.length; e++) {
      var t = this.BuffList[e];
      var r = this.BuffList[e - 1];
      t.SetStartStageLv(r.EndStageLv + 1);
      t.SetIndex(e);
    }
  }
  GetAreaData(e) {
    return this.AreaDataMap.get(e);
  }
  async RequestProgressReward(e, t = false) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "领取城区进度奖励", ["Id", e], ["IsAll", t]);
    }
    if (t) {
      t = this.ProgressRewardList.filter(e => e.IsCanReceived).map(e => e.Id);
      await ControllerHolder_1.ControllerHolder.MoraleController?.RequestProgressReward(t);
    } else {
      await ControllerHolder_1.ControllerHolder.MoraleController?.RequestProgressReward([e]);
    }
  }
  ProtoProgressRewardResponse(e) {
    e.BVn.forEach(e => {
      if (this.ProgressRewardMap.has(e)) {
        (e = this.ProgressRewardMap.get(e)).IsCanReceived = false;
        e.IsReceived = true;
      }
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MoraleProgressRewardUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateMoraleScoreBox);
    ActivityMoraleController_1.ActivityMoraleController.RefreshActivityRedDot();
  }
  ProtoMoralePosResponse(e) {
    this.PlayerMoraleAreaId = e?.puu ?? 0;
  }
  GetProgressTotalScore() {
    var e = this.ProgressRewardList;
    return e[e.length - 1]?.TargetScore ?? 1;
  }
  IsFinishProgress() {
    return this.GetCurrentProgressScore() >= this.GetProgressTotalScore();
  }
  GetCurrentProgressScore() {
    return this.GetProgressScoreFormFlag() + this.GetProgressScoreFormBox();
  }
  GetProgressScoreFormFlag() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(50);
  }
  GetProgressScoreFormBox() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(52);
  }
  IsProgressScoreId(e) {
    return this.IsProgressScoreFlag(e) || this.IsProgressScoreBox(e);
  }
  IsProgressScoreFlag(e) {
    return e === 50;
  }
  IsProgressScoreBox(e) {
    return e === 52;
  }
  GetProgressRewardPercent() {
    return Math.min(1, this.GetCurrentProgressScore() / this.GetProgressTotalScore());
  }
  GetUnbreakableLvExp() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(47);
  }
  GetMoraleLvExp() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(48);
  }
  IsExistScoreBoxRewardCanGet() {
    return this.ProgressRewardList.some(e => e.IsCanReceived);
  }
  IsAllScoreBoxRewardReceived() {
    return this.ProgressRewardList.every(e => e.IsReceived);
  }
  RedDotScoreBox() {
    return this.IsExistScoreBoxRewardCanGet();
  }
  RedDotAreaBuff() {
    return !(this.ActiveAreaBuffSet.size > 0) && this.IsExistNewActiveAreaBuff();
  }
  RedDotFlagBox() {
    return this.AreaDataList.some(e => e.GetUiFlagList().some(e => e.HasBoxCanGet()));
  }
  IsExistNewActiveAreaBuff() {
    return !this.IsMoraleGameOver() && this.AreaDataList.some(e => e.IsNewActiveAreaBuff);
  }
  ClearNewActiveAreaBuff() {
    var e = this.AreaDataList.filter(e => e.IsNewActiveAreaBuff);
    if (!(e.length <= 0)) {
      e.forEach(e => {
        e.SetNewActiveAreaBuff(false);
        this.ActiveAreaBuffSet.add(e.Id);
      });
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateMoraleAreaBuff);
      ActivityMoraleController_1.ActivityMoraleController.RefreshActivityRedDot();
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MoraleActiveAreaBuff, this.ActiveAreaBuffSet);
    }
  }
  InitActivityData(e) {
    this.InitData();
    this.FlagMap.forEach(e => {
      e.SetActiveState(false);
      e.SetBoxReceivedCount(0);
    });
    e.sau.forEach(e => {
      var t = this.FlagMap.get(e.oau);
      if (t) {
        if (!this.UnlockFlagSet.has(t.Id)) {
          t.SetNewUnlockState(true);
        }
        this.UnlockFlagSet.add(t.Id);
        t.SetActiveState(true);
        t.SetBoxReceivedCount(e.nau);
      }
    });
    e.H91.forEach(e => {
      e = this.ProgressRewardMap.get(e);
      if (e) {
        e.IsCanReceived = false;
        e.IsReceived = true;
      }
    });
    e.Cuu.forEach(e => {
      var t = this.AreaDataMap.get(e.fuu);
      if (t) {
        t.UpdateExploreBoxReceived(e.guu);
      }
    });
  }
  ClearAllFlagNewUnlockState() {
    this.FlagMap.forEach(e => {
      e.SetNewUnlockState(false);
    });
  }
  GetFlagDataByMarkId(e) {
    e = this.MarkIdToFlagId.get(e);
    if (e !== undefined) {
      return this.FlagMap.get(e);
    }
  }
  UpdateProgressScore() {
    const t = this.GetCurrentProgressScore();
    this.ProgressRewardList.forEach(e => {
      e.StartScore = t;
      e.IsInCurrentStage = t >= e.LastTargetScore && t < e.TargetScore;
      if (!e.IsReceived && !e.IsCanReceived) {
        if (e.TargetScore <= t) {
          e.IsCanReceived = true;
        }
      }
    });
    this.s_u(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MoraleProgressScoreUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateMoraleScoreBox);
    ActivityMoraleController_1.ActivityMoraleController.RefreshActivityRedDot();
  }
  s_u(e) {
    var t = this.ProgressRewardList.length;
    var t = this.ProgressRewardList[t - 1];
    if (t && t.TargetScore <= e) {
      t.IsInCurrentStage = true;
    }
  }
  UpdateProgressScoreByFlag(e, t) {
    this.a_u("Morale_title_27", e, t);
  }
  UpdateProgressScoreByBox(e, t) {
    this.a_u("Morale_title_28", e, t);
  }
  a_u(e, t, r) {
    if (!(this.ProgressRewardList.length <= 0)) {
      const a = (r ?? this.GetCurrentProgressScore()) - t;
      UiManager_1.UiManager.OpenView("MoraleAreaProgressTips", {
        StartNum: a,
        AddNum: t,
        SourceDescKey: e,
        InfoList: this.ProgressRewardList.map(e => {
          return {
            TargetScore: e.TargetScore,
            LastTargetScore: e.LastTargetScore,
            StartScore: a
          };
        }),
        IsMultipleView: true
      });
    }
  }
  CheckProgressScoreChange(e, t, r) {
    this.UpdateProgressScore();
    if (this.IsProgressScoreFlag(e)) {
      this.UpdateProgressScoreByFlag(t, r);
    } else if (this.IsProgressScoreBox(e)) {
      this.UpdateProgressScoreByBox(t, r);
    }
  }
  GetStageProgressPercent(e) {
    var t = this.GetCurrentProgressScore();
    var r = e.LastTargetScore;
    if (t <= r) {
      return 0;
    } else {
      return (t - r) / (e.TargetScore - r);
    }
  }
  IsOccupyAllArea() {
    return this.AreaDataList.length > 0 && this.AreaDataList.every(e => e.IsAllUiFlagActive());
  }
  IsRichTargetMoraleLv(e) {
    return this.GetSumMoraleLv() >= e;
  }
  GetAllRoleAttrAddList() {
    var e = ModelManager_1.ModelManager.MoraleBattleModel?.GetMoraleLevel() ?? 0;
    var t = ModelManager_1.ModelManager.MoraleBattleModel?.GetTempMoraleLevel() ?? 0;
    var r = e + t;
    var a = ConfigManager_1.ConfigManager.MoraleConfig?.GetRoleAttrAddConfigByLv(r);
    if (!a) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Morale", 69, "通过士气等级得到属性成长配置-未找到", ["士气等级", e], ["临时士气等级", t], ["总士气等级", r]);
      }
      return [];
    }
    const i = ConfigManager_1.ConfigManager.MoraleConfig.GetAllAttrAddIdList();
    e = [a.LifeMaxRatio, a.AtkRatio, a.DefRatio];
    const o = [];
    e.forEach((e, t) => {
      if (!(e <= 10000)) {
        t = i[t];
        t = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(t);
        o.push({
          IconPath: t?.Icon ?? "",
          NameKey: t?.Name ?? "",
          Value: `+${(e - 10000) / 100}%`
        });
      }
    });
    return o;
  }
  GetStageBuffDataByLv(t) {
    var e = this.BuffList.find(e => e.StartStageLv <= t && e.EndStageLv >= t);
    return e || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "通过等级得到所在阶段Buff数据-未找到(BackEnd)", ["等级", t]), this.BuffList[this.BuffList.length - 1]);
  }
  GetStageBuffData() {
    var e = this.GetSumMoraleLv();
    return this.GetStageBuffDataByLv(e);
  }
  GetSumMoraleLv() {
    return (ModelManager_1.ModelManager.MoraleBattleModel?.GetMoraleLevel() ?? 0) + (ModelManager_1.ModelManager.MoraleBattleModel?.GetTempMoraleLevel() ?? 0);
  }
  GetInTheBattleBuffInfo() {
    return {
      TitleKey: "Morale_title_15",
      DescInfoList: [{
        DescKey: "Morale_title_23"
      }]
    };
  }
  GetBattleIsShowBuff() {
    return !!FormationDataController_1.FormationDataController.GetPlayerEntity(ModelManager_1.ModelManager.CreatureModel.GetPlayerId())?.GetComponent(203)?.HasBuff(this.GamePlayFinishTeamBuffId);
  }
  CheckSumLevelChanged(e, t) {
    e = this.GetBuffActiveTipsInfoListByLv(e, t);
    if (!(e.length <= 0) && !(this.BuffActiveTipsList.push(...e), t = "MoraleBuffActiveTips", UiManager_1.UiManager.IsViewOpen(t))) {
      UiManager_1.UiManager.OpenView(t);
    }
  }
  GetBuffActiveTipsInfoListByLv(e, t) {
    if (t <= e) {
      return [];
    }
    var r = [];
    for (const a of this.BuffList) {
      if (!(e >= a.EndStageLv)) {
        if (t < a.EndStageLv) {
          break;
        }
        r.push({
          BuffId: a.Id,
          State: a.GetActiveState()
        });
      }
    }
    return r;
  }
  GetMoraleBuffDataList() {
    var e = new TrainingDegreeModel_1.TrainingData();
    var t = new TrainingDegreeModel_1.TrainingData();
    var r = new TrainingDegreeModel_1.TrainingData();
    e.Icon = "SP_IconDeathExplore";
    e.NameId = "Morale_title_30";
    t.Icon = "SP_IconDeathKillEnemy";
    t.NameId = "Morale_title_31";
    r.Icon = "SP_IconDeathCapturePoint";
    r.NameId = "Morale_title_32";
    return [r, e, t];
  }
  IsExistAreaFlagRewardCanGet() {
    return this.AreaDataList.some(e => e.IsExistFlagRewardCanGet());
  }
  IsAllAreaFlagRewardReceived() {
    return this.AreaDataList.every(e => e.IsAllFlagRewardReceived());
  }
  IsAllAreaFlagActive() {
    return this.AreaDataList.every(e => e.IsAllFlagActive());
  }
  IsProgressScoreReachTarget() {
    var e = ConfigManager_1.ConfigManager.MoraleConfig.GetScoreProgressRichValue();
    return this.GetCurrentProgressScore() >= e && !this.IsMoraleGameOver();
  }
  IsMoraleGameOver() {
    var e = ConfigManager_1.ConfigManager.MoraleConfig.GetMoraleGameOverQuestId();
    return ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) >= Protocol_1.Aki.Protocol.hTs.a3_;
  }
  GetAllUnlockPlotList() {
    var e = this.AreaDataList.flatMap(e => e.GetUnlockPlotList());
    if (e.length > 2) {
      MathUtils_1.MathUtils.Shuffle(e);
    }
    return e;
  }
  GetAllNewUnlockPlotList() {
    return this.AreaDataList.flatMap(e => e.GetNewUnlockPlotList());
  }
  TryAddAreaBuffActiveState(t) {
    var e;
    if (this.IsInitData) {
      if ((e = this.AreaDataList.find(e => e.Config.BuffId === t)) && !e.IsNewActiveAreaBuff) {
        if (this.ActiveAreaBuffSet.has(e.Id)) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Morale", 69, "重复激活区域BuffId", ["BuffId", t]);
          }
        } else {
          e.SetNewActiveAreaBuff(true);
          this.UpdateAreaBuffActiveByAreaId(e.Id);
          if (this.ActiveAreaBuffSet.size <= 0) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateMoraleAreaBuff);
            ActivityMoraleController_1.ActivityMoraleController.RefreshActivityRedDot();
          }
        }
      }
    } else {
      this.CacheAreaBuffIdList.push(t);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Morale", 69, "缓存区域BuffId", ["BuffId", t]);
      }
    }
  }
  CheckCacheAreaBuffIdList() {
    if (this.CacheAreaBuffIdList.length <= 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Morale", 69, "缓存区域BuffId列表为空");
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Morale", 69, "检测缓存的区域BuffId列表", ["BuffIdList", this.CacheAreaBuffIdList]);
      }
      this.CacheAreaBuffIdList.forEach(e => {
        this.TryAddAreaBuffActiveState(e);
      });
      this.CacheAreaBuffIdList.length = 0;
    }
  }
  CheckAreaBuffRedDotState() {
    if (this.AreaDataList.some(e => e.IsNewActiveAreaBuff)) {
      this.ClearNewActiveAreaBuff();
    }
  }
  UpdateAreaBuffActiveByAreaId(e) {
    var t;
    if (this.TipsAreaBuffSet.has(e)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Morale", 69, "区域Buff已提示过", ["AreaId", e]);
      }
    } else if (t = this.AreaDataMap.get(e)) {
      t = t.Config.BuffActiveDesc;
      this.OpenViewAreaBuffActiveTips("Morale_title_38", t);
      this.TipsAreaBuffSet.add(e);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MoraleTipsAreaBuff, this.TipsAreaBuffSet);
    }
  }
  OpenViewAreaBuffActiveTips(e, t) {
    UiManager_1.UiManager.OpenView("MoraleAreaBuffActiveTips", {
      TitleKey: e,
      DescKey: t,
      IsMultipleView: true
    });
  }
  TrackAreaExploreBox(e) {
    if (!this.AreaDataMap.get(e)?.ExploreBoxIsAllGet()) {
      ControllerHolder_1.ControllerHolder.MoraleController.RequestGetExplorerBoxTrackList(e);
    }
  }
  ProtoMoraleTreasureBoxTraceResponse(e) {
    this.ExploreBoxEntityIds = e.PSs;
    if (!(e.PSs.length <= 0)) {
      this.CalcExploreBoxDistance();
      this.OpenMapTrackExploreBox();
    }
  }
  OpenMapTrackExploreBox(e) {
    var e = e ?? this.ExploreBoxEntityIds?.[0];
    if (e) {
      e = ModelManager_1.ModelManager.MapModel.CreateDyMarkByEntity(e, 35, 7591, MapDefine_1.BIG_WORLD_MAP_ID);
      ControllerHolder_1.ControllerHolder.MapController.RequestTrackMapMark({
        MarkType: 35,
        MarkId: e,
        Track: true,
        TrackMode: 0
      });
      e = {
        MarkId: e,
        MarkType: 35
      };
      ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, false, e);
    }
  }
  CheckExplorerBoxOpen(e) {
    const t = ModelManager_1.ModelManager.CreatureModel?.GetCreaturePbDataId(e);
    if (this.ExploreBoxEntityIds?.[0] !== t) {
      if ((e = this.ExploreBoxEntityIds?.findIndex(e => e === t)) && e !== -1) {
        this.ExploreBoxEntityIds?.splice(e, 1);
      }
    } else {
      this.ExploreBoxEntityIds?.shift();
      if (this.ExploreBoxEntityIds?.length) {
        this.CalcExploreBoxDistance();
        this.OpenMapTrackExploreBox();
      } else if ((e = ModelManager_1.ModelManager.MapModel.GetCurTrackMark())?.MarkType === 35) {
        ControllerHolder_1.ControllerHolder.MapController.RequestTrackMapMark({
          MarkType: 35,
          MarkId: e.MarkId,
          Track: false,
          TrackMode: 0
        });
      }
    }
  }
  CalcExploreBoxDistance() {
    if (this.ExploreBoxEntityIds && !(this.ExploreBoxEntityIds.length < 2)) {
      const i = MapDefine_1.BIG_WORLD_MAP_ID;
      const o = ModelManager_1.ModelManager.WorldMapModel.GetPlayerPosition();
      let r = Number.MAX_VALUE;
      let a = 0;
      var e;
      o.DivisionEqual(1000);
      this.ExploreBoxEntityIds.forEach((e, t) => {
        e = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, i);
        e.DivisionEqual(MapDefine_1.UNIT * 1000);
        e = Vector_1.Vector.DistSquared(o, e);
        if (e < r) {
          r = e;
          a = t;
        }
      });
      if (a > 0) {
        e = this.ExploreBoxEntityIds[a];
        this.ExploreBoxEntityIds.splice(a, 1);
        this.ExploreBoxEntityIds.unshift(e);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Morale", 69, "距离最近的宝箱", ["EntityId", this.ExploreBoxEntityIds[0]]);
      }
    }
  }
  TestSetOccupyAllArea() {
    this.AreaDataList.forEach(e => {
      e.GetUiFlagList().forEach(e => {
        e.SetActiveState(true);
      });
    });
    this.AreaDataList[0].GetUiFlagList()[0].SetNewUnlockState(true);
  }
  GetAllHighMonsterProgress() {
    return this.AreaDataList.reduce((e, t) => e + t.GetHighMonsterProgress(), 0);
  }
  GetAllHighMonsterProgressExcludeNew() {
    return this.AreaDataList.reduce((e, t) => e + t.GetHighMonsterProgressExcludeNew(), 0);
  }
  GetAllHighMonsterTotal() {
    return this.AreaDataList.reduce((e, t) => e + t.GetHighMonsterTotal(), 0);
  }
  GetRecommendHighFlagUnActiveArea() {
    return this.AreaDataList.find(e => e.HighDifficultyFlagSomeUnActive());
  }
}
exports.MoraleModel = MoraleModel;
//# sourceMappingURL=MoraleModel.js.map