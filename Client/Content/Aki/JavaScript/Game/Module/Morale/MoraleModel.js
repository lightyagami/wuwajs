"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleModel = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Macro_1 = require("../../../Core/Preprocessor/Macro"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  FormationDataController_1 = require("../Abilities/FormationDataController"),
  ActivityMoraleController_1 = require("../Activity/ActivityContent/Morale/ActivityMoraleController"),
  MapDefine_1 = require("../Map/MapDefine"),
  TrainingDegreeModel_1 = require("../TrainingDegree/TrainingDegreeModel"),
  MoraleAreaData_1 = require("./Data/MoraleAreaData"),
  MoraleBuffData_1 = require("./Data/MoraleBuffData");
class MoraleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.AreaDataMap = new Map, this.AreaDataList = [], this.ProgressRewardList = [], this.ProgressRewardMap = new Map, this.FlagMap = new Map, this.MarkIdToFlagId = new Map, this.BuffList = [], this.BuffMap = new Map, this.BuffActiveTipsList = [], this.IsInitData = !1, this.UnlockFlagSet = new Set, this.PlayerMoraleAreaId = 0, this.ActiveAreaBuffSet = new Set, this.GamePlayFinishTeamBuffId = 632400160, this.UiEnterConfig = void 0, this.UiLoopConfig = void 0, this.ExploreBoxEntityIds = void 0
  }
  OnInit() {
    return !0
  }
  OnClear() {
    return !0
  }
  OnLeaveLevel() {
    return !0
  }
  InitData() {
    this.IsInitData || (this.IsInitData = !0, this.anu(), this.e$1(), this.t$1(), this.sz1())
  }
  anu() {
    this.UnlockFlagSet = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MoraleAreaUnlockFlagSet) ?? new Set, this.ActiveAreaBuffSet = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MoraleActiveAreaBuff) ?? new Set
  }
  SaveLocalData() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MoraleAreaUnlockFlagSet, this.UnlockFlagSet), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MoraleActiveAreaBuff, this.ActiveAreaBuffSet)
  }
  e$1() {
    ConfigManager_1.ConfigManager.MoraleConfig.GetAllAreaConfigList().forEach(e => {
      e = MoraleAreaData_1.MoraleAreaData.Create(e);
      this.AreaDataMap.set(e.Id, e), this.AreaDataList.push(e), e.GetFlagList().forEach(e => {
        this.FlagMap.set(e.Id, e), 0 < e.Config.MarkId && this.MarkIdToFlagId.set(e.Config.MarkId, e.Id)
      })
    }), this.AreaDataList.sort((e, r) => e.Id - r.Id)
  }
  t$1() {
    const i = ConfigManager_1.ConfigManager.MoraleConfig.GetAllScoreConfigList(),
      o = this.GetCurrentProgressScore();
    i.forEach((e, r) => {
      var t = e.ScoreReward,
        t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(t)[0] ?? [{
          ItemId: 2,
          IncId: 0
        }, 0],
        a = e.NeedScore,
        r = 0 < r ? i[r - 1].NeedScore : 0,
        e = {
          Id: e.Id,
          IsReceived: !1,
          IsCanReceived: o >= a,
          ItemId: t[0].ItemId,
          ItemNum: t[1],
          TargetScore: a,
          LastTargetScore: r,
          IsInCurrentStage: o >= r && o < a,
          StartScore: o
        };
      this.ProgressRewardList.push(e), this.ProgressRewardMap.set(e.Id, e)
    }), this.ProgressRewardList.sort((e, r) => e.Id - r.Id), this.hnu(o)
  }
  sz1() {
    ConfigManager_1.ConfigManager.MoraleConfig.GetAllMoraleLvPowerConfigList().forEach(e => {
      e = MoraleBuffData_1.MoraleBuffData.Create(e);
      this.BuffMap.set(e.Id, e), this.BuffList.push(e)
    }), this.BuffList.sort((e, r) => e.Id - r.Id);
    for (let e = 1; e < this.BuffList.length; e++) {
      var r = this.BuffList[e],
        t = this.BuffList[e - 1];
      r.SetStartStageLv(t.EndStageLv + 1), r.SetIndex(e)
    }
  }
  GetAreaData(e) {
    return this.AreaDataMap.get(e)
  }
  async RequestProgressReward(e, r = !1) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "领取城区进度奖励", ["Id", e], ["IsAll", r]), r ? (r = this.ProgressRewardList.filter(e => e.IsCanReceived).map(e => e.Id), await ControllerHolder_1.ControllerHolder.MoraleController?.RequestProgressReward(r)) : await ControllerHolder_1.ControllerHolder.MoraleController?.RequestProgressReward([e])
  }
  ProtoProgressRewardResponse(e) {
    e.BVn.forEach(e => {
      this.ProgressRewardMap.has(e) && ((e = this.ProgressRewardMap.get(e)).IsCanReceived = !1, e.IsReceived = !0)
    }), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MoraleProgressRewardUpdate), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateMoraleScoreBox), ActivityMoraleController_1.ActivityMoraleController.RefreshActivityRedDot()
  }
  ProtoMoralePosResponse(e) {
    this.PlayerMoraleAreaId = e?.Vnu ?? 0
  }
  GetProgressTotalScore() {
    var e = this.ProgressRewardList;
    return e[e.length - 1]?.TargetScore ?? 1
  }
  IsFinishProgress() {
    return this.GetCurrentProgressScore() >= this.GetProgressTotalScore()
  }
  GetCurrentProgressScore() {
    return this.GetProgressScoreFormFlag() + this.GetProgressScoreFormBox()
  }
  GetProgressScoreFormFlag() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(50)
  }
  GetProgressScoreFormBox() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(52)
  }
  IsProgressScoreId(e) {
    return this.IsProgressScoreFlag(e) || this.IsProgressScoreBox(e)
  }
  IsProgressScoreFlag(e) {
    return 50 === e
  }
  IsProgressScoreBox(e) {
    return 52 === e
  }
  GetProgressRewardPercent() {
    return Math.min(1, this.GetCurrentProgressScore() / this.GetProgressTotalScore())
  }
  GetUnbreakableLvExp() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(47)
  }
  GetMoraleLvExp() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(48)
  }
  IsExistScoreBoxRewardCanGet() {
    return this.ProgressRewardList.some(e => e.IsCanReceived)
  }
  IsAllScoreBoxRewardReceived() {
    return this.ProgressRewardList.every(e => e.IsReceived)
  }
  RedDotScoreBox() {
    return this.IsExistScoreBoxRewardCanGet()
  }
  RedDotAreaBuff() {
    return !(0 < this.ActiveAreaBuffSet.size) && this.IsExistNewActiveAreaBuff()
  }
  RedDotFlagBox() {
    return this.AreaDataList.some(e => e.GetUiFlagList().some(e => e.HasBoxCanGet()))
  }
  IsExistNewActiveAreaBuff() {
    return this.AreaDataList.some(e => e.IsNewActiveAreaBuff)
  }
  ClearNewActiveAreaBuff() {
    var e = this.AreaDataList.filter(e => e.IsNewActiveAreaBuff);
    e.length <= 0 || (e.forEach(e => {
      e.SetNewActiveAreaBuff(!1), this.ActiveAreaBuffSet.add(e.Id)
    }), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateMoraleAreaBuff), ActivityMoraleController_1.ActivityMoraleController.RefreshActivityRedDot())
  }
  InitActivityData(e) {
    this.InitData(), this.FlagMap.forEach(e => {
      e.SetActiveState(!1), e.SetBoxReceivedCount(0)
    }), e.nru.forEach(e => {
      var r = this.FlagMap.get(e.rru);
      r && (this.UnlockFlagSet.has(r.Id) || r.SetNewUnlockState(!0), this.UnlockFlagSet.add(r.Id), r.SetActiveState(!0), r.SetBoxReceivedCount(e.oru))
    }), e.a91.forEach(e => {
      e = this.ProgressRewardMap.get(e);
      e && (e.IsCanReceived = !1, e.IsReceived = !0)
    }), e.Nnu.forEach(e => {
      var r = this.AreaDataMap.get(e.Gnu);
      r && r.UpdateExploreBoxReceived(e.Fnu)
    })
  }
  ClearAllFlagNewUnlockState() {
    this.FlagMap.forEach(e => {
      e.SetNewUnlockState(!1)
    })
  }
  GetFlagDataByMarkId(e) {
    e = this.MarkIdToFlagId.get(e);
    if (void 0 !== e) return this.FlagMap.get(e)
  }
  UpdateProgressScore() {
    const r = this.GetCurrentProgressScore();
    this.ProgressRewardList.forEach(e => {
      e.StartScore = r, e.IsInCurrentStage = r >= e.LastTargetScore && r < e.TargetScore, e.IsReceived || e.IsCanReceived || e.TargetScore <= r && (e.IsCanReceived = !0)
    }), this.hnu(r), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MoraleProgressScoreUpdate), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateMoraleScoreBox), ActivityMoraleController_1.ActivityMoraleController.RefreshActivityRedDot()
  }
  hnu(e) {
    var r = this.ProgressRewardList.length,
      r = this.ProgressRewardList[r - 1];
    r && r.TargetScore <= e && (r.IsInCurrentStage = !0)
  }
  UpdateProgressScoreByFlag(e, r) {
    this.lnu("Morale_title_27", e, r)
  }
  UpdateProgressScoreByBox(e, r) {
    this.lnu("Morale_title_28", e, r)
  }
  lnu(e, r, t) {
    if (!(this.ProgressRewardList.length <= 0)) {
      const a = (t ?? this.GetCurrentProgressScore()) - r;
      UiManager_1.UiManager.OpenView("MoraleAreaProgressTips", {
        StartNum: a,
        AddNum: r,
        SourceDescKey: e,
        InfoList: this.ProgressRewardList.map(e => {
          return {
            TargetScore: e.TargetScore,
            LastTargetScore: e.LastTargetScore,
            StartScore: a
          }
        }),
        IsMultipleView: !0
      })
    }
  }
  CheckProgressScoreChange(e, r, t) {
    this.UpdateProgressScore(), this.IsProgressScoreFlag(e) ? this.UpdateProgressScoreByFlag(r, t) : this.IsProgressScoreBox(e) && this.UpdateProgressScoreByBox(r, t)
  }
  GetStageProgressPercent(e) {
    var r = this.GetCurrentProgressScore(),
      t = e.LastTargetScore;
    return r <= t ? 0 : (r - t) / (e.TargetScore - t)
  }
  IsOccupyAllArea() {
    return 0 < this.AreaDataList.length && this.AreaDataList.every(e => e.IsAllUiFlagActive())
  }
  IsRichTargetMoraleLv(e) {
    return this.GetSumMoraleLv() >= e
  }
  GetAllRoleAttrAddList() {
    var e = ModelManager_1.ModelManager.MoraleBattleModel?.GetMoraleLevel() ?? 0,
      r = ModelManager_1.ModelManager.MoraleBattleModel?.GetTempMoraleLevel() ?? 0,
      t = e + r,
      a = ConfigManager_1.ConfigManager.MoraleConfig?.GetRoleAttrAddConfigByLv(t);
    if (!a) return Log_1.Log.CheckError() && Log_1.Log.Error("Morale", 69, "通过士气等级得到属性成长配置-未找到", ["士气等级", e], ["临时士气等级", r], ["总士气等级", t]), [];
    const i = ConfigManager_1.ConfigManager.MoraleConfig.GetAllAttrAddIdList();
    e = [a.LifeMaxRatio, a.AtkRatio, a.DefRatio];
    const o = [];
    return e.forEach((e, r) => {
      e <= 1e4 || (r = i[r], r = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(r), o.push({
        IconPath: r?.Icon ?? "",
        NameKey: r?.Name ?? "",
        Value: `+${(e-1e4)/100}%`
      }))
    }), o
  }
  GetStageBuffDataByLv(r) {
    var e = this.BuffList.find(e => e.StartStageLv <= r && e.EndStageLv >= r);
    return e || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "通过等级得到所在阶段Buff数据-未找到(BackEnd)", ["等级", r]), this.BuffList[this.BuffList.length - 1])
  }
  GetStageBuffData() {
    var e = this.GetSumMoraleLv();
    return this.GetStageBuffDataByLv(e)
  }
  GetSumMoraleLv() {
    return (ModelManager_1.ModelManager.MoraleBattleModel?.GetMoraleLevel() ?? 0) + (ModelManager_1.ModelManager.MoraleBattleModel?.GetTempMoraleLevel() ?? 0)
  }
  GetInTheBattleBuffInfo() {
    return {
      TitleKey: "Morale_title_15",
      DescInfoList: [{
        DescKey: "Morale_title_23"
      }]
    }
  }
  GetBattleIsShowBuff() {
    return !!(FormationDataController_1.FormationDataController.GetPlayerEntity(ModelManager_1.ModelManager.CreatureModel.GetPlayerId())?.GetComponent(199))?.HasBuff(this.GamePlayFinishTeamBuffId)
  }
  CheckSumLevelChanged(e, r) {
    e = this.GetBuffActiveTipsInfoListByLv(e, r);
    e.length <= 0 || (this.BuffActiveTipsList.push(...e), r = "MoraleBuffActiveTips", UiManager_1.UiManager.IsViewOpen(r)) || UiManager_1.UiManager.OpenView(r)
  }
  GetBuffActiveTipsInfoListByLv(e, r) {
    if (r <= e) return [];
    var t = [];
    for (const a of this.BuffList)
      if (!(e >= a.EndStageLv)) {
        if (r < a.EndStageLv) break;
        t.push({
          BuffId: a.Id,
          State: a.GetActiveState()
        })
      } return t
  }
  GetMoraleBuffDataList() {
    var e = new TrainingDegreeModel_1.TrainingData,
      r = new TrainingDegreeModel_1.TrainingData,
      t = new TrainingDegreeModel_1.TrainingData;
    return e.Icon = "SP_IconDeathExplore", e.NameId = "Morale_title_30", r.Icon = "SP_IconDeathKillEnemy", r.NameId = "Morale_title_31", t.Icon = "SP_IconDeathCapturePoint", t.NameId = "Morale_title_32", [t, e, r]
  }
  IsExistAreaFlagRewardCanGet() {
    return this.AreaDataList.some(e => e.IsExistFlagRewardCanGet())
  }
  IsAllAreaFlagRewardReceived() {
    return this.AreaDataList.every(e => e.IsAllFlagRewardReceived())
  }
  IsAllAreaFlagActive() {
    return this.AreaDataList.every(e => e.IsAllFlagActive())
  }
  IsProgressScoreReachTarget() {
    var e = ConfigManager_1.ConfigManager.MoraleConfig.GetScoreProgressRichValue();
    return this.GetCurrentProgressScore() >= e && !this.IsMoraleGameOver()
  }
  IsMoraleGameOver() {
    var e = ConfigManager_1.ConfigManager.MoraleConfig.GetMoraleGameOverQuestId();
    return ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) >= Protocol_1.Aki.Protocol.hTs.a3_
  }
  GetAllUnlockPlotList() {
    var e = this.AreaDataList.flatMap(e => e.GetUnlockPlotList());
    return 2 < e.length && MathUtils_1.MathUtils.Shuffle(e), e
  }
  GetAllNewUnlockPlotList() {
    return this.AreaDataList.flatMap(e => e.GetNewUnlockPlotList())
  }
  TryAddAreaBuffActiveState(r) {
    var e;
    this.ActiveAreaBuffSet.has(r) || (e = this.AreaDataList.find(e => e.Config.BuffId === r)) && !e.IsNewActiveAreaBuff && (e.SetNewActiveAreaBuff(!0), this.UpdateAreaBuffActiveByAreaId(e.Id), this.ActiveAreaBuffSet.size <= 0) && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateMoraleAreaBuff), ActivityMoraleController_1.ActivityMoraleController.RefreshActivityRedDot())
  }
  UpdateAreaBuffActiveByAreaId(e) {
    var e = this.AreaDataMap.get(e);
    e && (e = e.Config.BuffActiveDesc, this.OpenViewAreaBuffActiveTips("Morale_title_38", e))
  }
  OpenViewAreaBuffActiveTips(e, r) {
    UiManager_1.UiManager.OpenView("MoraleAreaBuffActiveTips", {
      TitleKey: e,
      DescKey: r,
      IsMultipleView: !0
    })
  }
  TrackAreaExploreBox(e) {
    this.AreaDataMap.get(e)?.ExploreBoxIsAllGet() || ControllerHolder_1.ControllerHolder.MoraleController.RequestGetExplorerBoxTrackList(e)
  }
  ProtoMoraleTreasureBoxTraceResponse(e) {
    this.ExploreBoxEntityIds = e.PSs, e.PSs.length <= 0 || (this.CalcExploreBoxDistance(), this.OpenMapTrackExploreBox())
  }
  OpenMapTrackExploreBox(e) {
    var e = e ?? this.ExploreBoxEntityIds?.[0];
    e && (e = ModelManager_1.ModelManager.MapModel.CreateDyMarkByEntity(e, 35, 7591, MapDefine_1.BIG_WORLD_MAP_ID), ControllerHolder_1.ControllerHolder.MapController.RequestTrackMapMark({
      MarkType: 35,
      MarkId: e,
      Track: !0,
      TrackMode: 0
    }), e = {
      MarkId: e,
      MarkType: 35
    }, ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, !1, e))
  }
  CheckExplorerBoxOpen(e) {
    const r = ModelManager_1.ModelManager.CreatureModel?.GetCreaturePbDataId(e);
    this.ExploreBoxEntityIds?.[0] !== r ? (e = this.ExploreBoxEntityIds?.findIndex(e => e === r)) && -1 !== e && this.ExploreBoxEntityIds?.splice(e, 1) : (this.ExploreBoxEntityIds?.shift(), this.ExploreBoxEntityIds?.length ? (this.CalcExploreBoxDistance(), this.OpenMapTrackExploreBox()) : 35 === (e = ModelManager_1.ModelManager.MapModel.GetCurTrackMark())?.MarkType && ControllerHolder_1.ControllerHolder.MapController.RequestTrackMapMark({
      MarkType: 35,
      MarkId: e.MarkId,
      Track: !1,
      TrackMode: 0
    }))
  }
  CalcExploreBoxDistance() {
    if (this.ExploreBoxEntityIds && !(this.ExploreBoxEntityIds.length < 2)) {
      const i = MapDefine_1.BIG_WORLD_MAP_ID,
        o = ModelManager_1.ModelManager.WorldMapModel.GetPlayerPosition();
      let t = Number.MAX_VALUE,
        a = 0;
      var e;
      o.DivisionEqual(1e3), this.ExploreBoxEntityIds.forEach((e, r) => {
        e = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(e, i), e.DivisionEqual(1e3 * MapDefine_1.UNIT), e = Vector_1.Vector.DistSquared(o, e);
        e < t && (t = e, a = r)
      }), 0 < a && (e = this.ExploreBoxEntityIds[a], this.ExploreBoxEntityIds.splice(a, 1), this.ExploreBoxEntityIds.unshift(e)), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "距离最近的宝箱", ["EntityId", this.ExploreBoxEntityIds[0]])
    }
  }
  TestSetOccupyAllArea() {
    this.AreaDataList.forEach(e => {
      e.GetUiFlagList().forEach(e => {
        e.SetActiveState(!0)
      })
    }), this.AreaDataList[0].GetUiFlagList()[0].SetNewUnlockState(!0)
  }
  GetAllHighMonsterProgress() {
    return this.AreaDataList.reduce((e, r) => e + r.GetHighMonsterProgress(), 0)
  }
  GetAllHighMonsterProgressExcludeNew() {
    return this.AreaDataList.reduce((e, r) => e + r.GetHighMonsterProgressExcludeNew(), 0)
  }
  GetAllHighMonsterTotal() {
    return this.AreaDataList.reduce((e, r) => e + r.GetHighMonsterTotal(), 0)
  }
  GetRecommendHighFlagUnActiveArea() {
    return this.AreaDataList.find(e => e.HighDifficultyFlagSomeUnActive())
  }
}
exports.MoraleModel = MoraleModel;
//# sourceMappingURL=MoraleModel.js.map