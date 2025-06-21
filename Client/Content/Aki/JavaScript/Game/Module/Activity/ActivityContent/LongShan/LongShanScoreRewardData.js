"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LongShanScoreRewardData = void 0;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
class LongShanScoreRewardData {
  constructor() {
    this.Id = 0, this.Goal = 0, this.Achieved = !1, this.DropId = 0, this.cbe = [], this.GetCurrentScore = void 0
  }
  GetPreviewReward() {
    if (0 === this.cbe.length) {
      if (0 === this.DropId) return [];
      var t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.DropId);
      this.cbe = t
    }
    return this.cbe
  }
  GetState() {
    return this.Achieved ? 2 : !this.GetCurrentScore || this.GetCurrentScore() < this.Goal ? 1 : 0
  }
}
exports.LongShanScoreRewardData = LongShanScoreRewardData;
//# sourceMappingURL=LongShanScoreRewardData.js.map