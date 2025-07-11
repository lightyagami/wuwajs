"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountryExploreScoreData = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
class CountryExploreScoreData {
  constructor() {
    this.CountryId = 0;
    this.AreaId = 0;
    this.Progress = 0;
    this.LastProgress = 0;
    this.Score = 0;
    this.aVt = false;
    this.hVt = undefined;
  }
  Initialize(e, t, r, i, s) {
    this.CountryId = e;
    this.AreaId = t;
    this.Progress = r;
    this.LastProgress = i;
    this.Score = s;
    this.aVt = false;
    this.hVt = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t);
  }
  SetReceived(e) {
    this.aVt = e;
  }
  GetIsReceived() {
    return this.aVt;
  }
  GetAreaNameTextId() {
    return this.hVt.Title;
  }
  GetAreaConfig() {
    return this.hVt;
  }
  CanReceive() {
    return this.GetAreaProgress() >= this.Progress && !this.aVt;
  }
  GetAreaProgress() {
    return ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(this.AreaId).GetProgress();
  }
}
exports.CountryExploreScoreData = CountryExploreScoreData;
//# sourceMappingURL=CountryExploreScoreData.js.map