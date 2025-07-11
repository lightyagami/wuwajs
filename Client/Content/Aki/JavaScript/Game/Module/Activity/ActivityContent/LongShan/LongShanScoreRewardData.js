"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LongShanScoreRewardData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
class LongShanScoreRewardData {
  constructor() {
    this.Id = 0;
    this.Goal = 0;
    this.Achieved = false;
    this.DropId = 0;
    this.cbe = [];
    this.GetCurrentScore = undefined;
  }
  GetPreviewReward() {
    if (this.cbe.length === 0) {
      if (this.DropId === 0) {
        return [];
      }
      var t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.DropId);
      this.cbe = t;
    }
    return this.cbe;
  }
  GetState() {
    if (this.Achieved) {
      return 2;
    } else if (!this.GetCurrentScore || this.GetCurrentScore() < this.Goal) {
      return 1;
    } else {
      return 0;
    }
  }
}
exports.LongShanScoreRewardData = LongShanScoreRewardData;
//# sourceMappingURL=LongShanScoreRewardData.js.map