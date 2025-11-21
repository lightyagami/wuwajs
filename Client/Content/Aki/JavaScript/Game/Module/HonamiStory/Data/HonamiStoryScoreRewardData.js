"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryScoreRewardData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class HonamiStoryScoreRewardData {
  constructor(t) {
    this.ConfigId = 0;
    this.Cbo = 0;
    this.ConfigId = t;
  }
  rTo() {
    return ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryScoreRewardConfig(this.ConfigId);
  }
  UpdateState(t) {
    this.Cbo = t;
  }
  get State() {
    return this.Cbo;
  }
  get Id() {
    return this.rTo().Id;
  }
  get Name() {
    return this.rTo().Name;
  }
  get LockTip() {
    return this.rTo().LockTip;
  }
  get Score() {
    return this.rTo().Score;
  }
  get DropId() {
    return this.rTo().DropId;
  }
}
exports.HonamiStoryScoreRewardData = HonamiStoryScoreRewardData;
//# sourceMappingURL=HonamiStoryScoreRewardData.js.map