"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleAreaFlagData = void 0;
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class MoraleAreaFlagData {
  constructor(t) {
    this.Id = 0, this.AreaId = 0, this.AreaPlotDataList = [], this.AreaPlotDataMap = new Map, this.IsActive = !1, this.HasBox = !1, this.BoxReceivedCount = 0, this.BoxTotalCount = 0, this.Config = void 0, this.TypeConfig = void 0, this.IsSelect = !1, this.IsNewUnlock = !1, this.Id = t.Id, this.AreaId = t.FlagAreaId, this.Config = t, this.TypeConfig = ConfigManager_1.ConfigManager.MoraleConfig.GetFlagTypeConfig(t.FlagType), this.HasBox = 0 < t.BoxRewardId, this.BoxTotalCount = t.treasureboxentitysLength()
  }
  get IsGetBox() {
    return !(this.BoxTotalCount <= 0) && this.BoxReceivedCount >= this.BoxTotalCount
  }
  static Create(t) {
    t = new MoraleAreaFlagData(t);
    return t.AU(), t
  }
  AU() {
    this.JH1()
  }
  JH1() {
    this.TypeConfig.ShowUiMap && this.Config.FlagPlotList.forEach(t => {
      var e = {
        Id: t,
        FlagId: this.Id,
        AreaId: this.AreaId
      };
      this.AreaPlotDataMap.set(t, e), this.AreaPlotDataList.push(e)
    })
  }
  SetActiveState(t) {
    this.IsActive = t
  }
  SetBoxReceivedCount(t) {
    this.BoxReceivedCount = t
  }
  HasBoxCanGet() {
    return !!this.HasBox && !!this.IsActive && !this.IsGetBox && 0 < this.BoxTotalCount
  }
  SetSelectState(t) {
    this.IsSelect = t
  }
  IsFlagType(t) {
    return this.TypeConfig.TypeId === t
  }
  IsHighDifficultyChallenge() {
    return this.IsFlagType(2)
  }
  GetMapMoraleLvItemData() {
    var t = this.Config.MaxMonsterLv;
    let e = "",
      a = "";
    switch (ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevelDiffType(t)) {
      case 0:
        e = "#494A4AFF", a = "#A1A0A0FF";
        break;
      case 1:
        e = "#5C4421FF", a = "#B09A58FF";
        break;
      case 2:
        e = "#6A3838FF", a = "#C38484FF"
    }
    return {
      TitleId: "Morale_title_13",
      Lv: t,
      LvColor: e,
      BgColor: a
    }
  }
  IsLowMoraleLv() {
    var t;
    return !ModelManager_1.ModelManager.MoraleModel.IsRichTargetMoraleLv(this.Config.MaxMonsterLv) && (t = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleMaxLevel(), ModelManager_1.ModelManager.MoraleModel.GetSumMoraleLv() < t)
  }
  SetNewUnlockState(t) {
    this.IsNewUnlock = t
  }
}
exports.MoraleAreaFlagData = MoraleAreaFlagData;
//# sourceMappingURL=MoraleAreaFlagData.js.map