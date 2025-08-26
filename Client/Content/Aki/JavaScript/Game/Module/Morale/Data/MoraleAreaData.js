"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleAreaData = undefined;
const Macro_1 = require("../../../../Core/Preprocessor/Macro");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MoraleAreaFlagData_1 = require("./MoraleAreaFlagData");
class MoraleAreaData {
  constructor(t) {
    this.Id = 0;
    this.P$1 = [];
    this.x$1 = [];
    this.U$1 = new Map();
    this.D$1 = new Map();
    this.Config = undefined;
    this.ExploreBoxReceivedCount = 0;
    this.ExploreBoxTotalCount = 0;
    this.IsNewActiveAreaBuff = false;
    this.Config = t;
    this.Id = t.Id;
    this.ExploreBoxTotalCount = t.exploreboxLength();
  }
  static Create(t) {
    t = new MoraleAreaData(t);
    t.AU();
    return t;
  }
  AU() {
    ConfigManager_1.ConfigManager.MoraleConfig.GetFlagConfigListByAreaId(this.Id).forEach(t => {
      t = MoraleAreaFlagData_1.MoraleAreaFlagData.Create(t);
      this.P$1.push(t);
      this.U$1.set(t.Id, t);
      if (t.TypeConfig.ShowUiMap) {
        this.x$1.push(t);
        t.AreaPlotDataList.forEach(t => {
          this.D$1.set(t.Id, t);
        });
      }
    });
    this.x$1.sort((t, e) => t.Id - e.Id);
  }
  GetFlag(t) {
    return this.U$1.get(t);
  }
  GetFlagList() {
    return this.P$1;
  }
  GetAllPlotIdList() {
    return this.Config.PlotIdList;
  }
  GetPlotData(t) {
    return this.D$1.get(t);
  }
  GetActiveFlagNum() {
    return this.P$1.filter(t => t.IsActive).length;
  }
  GetTotalFlagNum() {
    return this.P$1.length;
  }
  IsAllFlagActive() {
    return this.GetActiveFlagNum() === this.GetTotalFlagNum();
  }
  GetUiFlagList() {
    return this.x$1;
  }
  GetUiActiveFlagNum() {
    return this.x$1.filter(t => t.IsActive).length;
  }
  GetUiTotalFlagNum() {
    return this.x$1.length;
  }
  IsAllUiFlagActive() {
    return this.x$1.every(t => t.IsActive);
  }
  GetAreaFlagActiveNum(e) {
    return this.P$1.filter(t => t.IsFlagType(e) && t.IsActive).length;
  }
  GetAreaFlagTotalNum(e) {
    return this.P$1.filter(t => t.IsFlagType(e)).length;
  }
  IsExistFlagRewardCanGet() {
    return this.x$1.some(t => t.HasBoxCanGet());
  }
  IsAllFlagRewardReceived() {
    return this.x$1.filter(t => t.HasBox).every(t => t.IsGetBox);
  }
  GetUnlockPlotList() {
    return this.x$1.filter(t => t.IsActive && !t.IsNewUnlock).flatMap(t => t.AreaPlotDataList);
  }
  GetNewUnlockPlotList() {
    return this.x$1.filter(t => t.IsNewUnlock).flatMap(t => t.AreaPlotDataList);
  }
  UpdateExploreBoxReceived(t) {
    this.ExploreBoxReceivedCount = t;
  }
  IsExistBox() {
    return this.ExploreBoxTotalCount > 0 || this.x$1.some(t => t.HasBox);
  }
  GetAllFlagBoxReceivedCount() {
    return this.x$1.reduce((t, e) => t + e.BoxReceivedCount, 0);
  }
  GetAllFlagBoxTotalCount() {
    return this.x$1.reduce((t, e) => t + e.BoxTotalCount, 0);
  }
  GetAllBoxReceivedCount() {
    return this.GetAllFlagBoxReceivedCount() + this.ExploreBoxReceivedCount;
  }
  GetAllBoxTotalCount() {
    return this.GetAllFlagBoxTotalCount() + this.ExploreBoxTotalCount;
  }
  IsPlayerInArea() {
    var t = ModelManager_1.ModelManager.MoraleModel?.PlayerMoraleAreaId;
    return this.Id === t;
  }
  GetDefaultSelectFlagId() {
    if (ConfigManager_1.ConfigManager.MoraleConfig.GetMoraleSelectHighLevelFlag()) {
      const t = this.x$1.find(t => t.IsHighDifficultyChallenge());
      if (t) {
        return t.Id;
      }
    }
    const t = this.x$1.find(t => !t.IsActive);
    return (t || this.x$1[this.x$1.length - 1]).Id;
  }
  IsAreaBuffActive() {
    return !!ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.GetComponent(210)?.HasBuff(this.Config.BuffId) || !!ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(ModelManager_1.ModelManager.CreatureModel.GetPlayerId())?.GetComponent(200)?.HasBuff(this.Config.BuffId);
  }
  SetNewActiveAreaBuff(t) {
    this.IsNewActiveAreaBuff = t;
  }
  HighDifficultyFlagSomeActive() {
    return this.x$1.some(t => t.IsActive && t.IsHighDifficultyChallenge());
  }
  HighDifficultyFlagSomeUnActive() {
    return this.x$1.some(t => !t.IsActive && t.IsHighDifficultyChallenge());
  }
  HighDifficultyFlagSomeNewActive() {
    return this.x$1.some(t => t.IsNewUnlock && t.IsHighDifficultyChallenge());
  }
  ExploreBoxIsAllGet() {
    return this.ExploreBoxReceivedCount >= this.ExploreBoxTotalCount;
  }
  GetHighMonsterProgress() {
    return this.x$1.filter(t => t.IsActive && t.IsHighDifficultyChallenge()).length;
  }
  GetHighMonsterProgressExcludeNew() {
    return this.x$1.filter(t => t.IsActive && !t.IsNewUnlock && t.IsHighDifficultyChallenge()).length;
  }
  GetHighMonsterTotal() {
    return this.x$1.filter(t => t.IsHighDifficultyChallenge()).length;
  }
}
exports.MoraleAreaData = MoraleAreaData;
//# sourceMappingURL=MoraleAreaData.js.map