"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleAreaData = void 0;
const Macro_1 = require("../../../../Core/Preprocessor/Macro"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MoraleAreaFlagData_1 = require("./MoraleAreaFlagData");
class MoraleAreaData {
  constructor(t) {
    this.Id = 0, this.KH1 = [], this.XH1 = [], this.YH1 = new Map, this.zH1 = new Map, this.Config = void 0, this.ExploreBoxReceivedCount = 0, this.ExploreBoxTotalCount = 0, this.IsNewActiveAreaBuff = !1, this.Config = t, this.Id = t.Id, this.ExploreBoxTotalCount = t.exploreboxLength()
  }
  static Create(t) {
    t = new MoraleAreaData(t);
    return t.AU(), t
  }
  AU() {
    ConfigManager_1.ConfigManager.MoraleConfig.GetFlagConfigListByAreaId(this.Id).forEach(t => {
      t = MoraleAreaFlagData_1.MoraleAreaFlagData.Create(t);
      this.KH1.push(t), this.YH1.set(t.Id, t), t.TypeConfig.ShowUiMap && (this.XH1.push(t), t.AreaPlotDataList.forEach(t => {
        this.zH1.set(t.Id, t)
      }))
    }), this.XH1.sort((t, e) => t.Id - e.Id)
  }
  GetFlag(t) {
    return this.YH1.get(t)
  }
  GetFlagList() {
    return this.KH1
  }
  GetAllPlotIdList() {
    return this.Config.PlotIdList
  }
  GetPlotData(t) {
    return this.zH1.get(t)
  }
  GetActiveFlagNum() {
    return this.KH1.filter(t => t.IsActive).length
  }
  GetTotalFlagNum() {
    return this.KH1.length
  }
  IsAllFlagActive() {
    return this.GetActiveFlagNum() === this.GetTotalFlagNum()
  }
  GetUiFlagList() {
    return this.XH1
  }
  GetUiActiveFlagNum() {
    return this.XH1.filter(t => t.IsActive).length
  }
  GetUiTotalFlagNum() {
    return this.XH1.length
  }
  IsAllUiFlagActive() {
    return this.XH1.every(t => t.IsActive)
  }
  GetAreaFlagActiveNum(e) {
    return this.KH1.filter(t => t.IsFlagType(e) && t.IsActive).length
  }
  GetAreaFlagTotalNum(e) {
    return this.KH1.filter(t => t.IsFlagType(e)).length
  }
  IsExistFlagRewardCanGet() {
    return this.XH1.some(t => t.HasBoxCanGet())
  }
  IsAllFlagRewardReceived() {
    return this.XH1.filter(t => t.HasBox).every(t => t.IsGetBox)
  }
  GetUnlockPlotList() {
    return this.XH1.filter(t => t.IsActive && !t.IsNewUnlock).flatMap(t => t.AreaPlotDataList)
  }
  GetNewUnlockPlotList() {
    return this.XH1.filter(t => t.IsNewUnlock).flatMap(t => t.AreaPlotDataList)
  }
  UpdateExploreBoxReceived(t) {
    this.ExploreBoxReceivedCount = t
  }
  IsExistBox() {
    return 0 < this.ExploreBoxTotalCount || this.XH1.some(t => t.HasBox)
  }
  GetAllFlagBoxReceivedCount() {
    return this.XH1.reduce((t, e) => t + e.BoxReceivedCount, 0)
  }
  GetAllFlagBoxTotalCount() {
    return this.XH1.reduce((t, e) => t + e.BoxTotalCount, 0)
  }
  GetAllBoxReceivedCount() {
    return this.GetAllFlagBoxReceivedCount() + this.ExploreBoxReceivedCount
  }
  GetAllBoxTotalCount() {
    return this.GetAllFlagBoxTotalCount() + this.ExploreBoxTotalCount
  }
  IsPlayerInArea() {
    var t = ModelManager_1.ModelManager.MoraleModel?.PlayerMoraleAreaId;
    return this.Id === t
  }
  GetDefaultSelectFlagId() {
    if (ConfigManager_1.ConfigManager.MoraleConfig.GetMoraleSelectHighLevelFlag()) {
      const t = this.XH1.find(t => t.IsHighDifficultyChallenge());
      if (t) return t.Id
    }
    const t = this.XH1.find(t => !t.IsActive);
    return (t || this.XH1[this.XH1.length - 1]).Id
  }
  IsAreaBuffActive() {
    return !!(ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.GetComponent(209))?.HasBuff(this.Config.BuffId)
  }
  SetNewActiveAreaBuff(t) {
    this.IsNewActiveAreaBuff = t
  }
  HighDifficultyFlagSomeActive() {
    return this.XH1.some(t => t.IsActive && t.IsHighDifficultyChallenge())
  }
  HighDifficultyFlagSomeUnActive() {
    return this.XH1.some(t => !t.IsActive && t.IsHighDifficultyChallenge())
  }
  HighDifficultyFlagSomeNewActive() {
    return this.XH1.some(t => t.IsNewUnlock && t.IsHighDifficultyChallenge())
  }
  ExploreBoxIsAllGet() {
    return this.ExploreBoxReceivedCount >= this.ExploreBoxTotalCount
  }
  GetHighMonsterProgress() {
    return this.XH1.filter(t => t.IsActive && t.IsHighDifficultyChallenge()).length
  }
  GetHighMonsterProgressExcludeNew() {
    return this.XH1.filter(t => t.IsActive && !t.IsNewUnlock && t.IsHighDifficultyChallenge()).length
  }
  GetHighMonsterTotal() {
    return this.XH1.filter(t => t.IsHighDifficultyChallenge()).length
  }
}
exports.MoraleAreaData = MoraleAreaData;
//# sourceMappingURL=MoraleAreaData.js.map