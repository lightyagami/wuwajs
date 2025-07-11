"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsGroupRewardData = undefined;
class RacingBetsGroupRewardData {
  constructor(t) {
    this.Id = 0;
    this.avt = [];
    this.Id = t;
  }
  AddRewardData(e) {
    if (!this.avt.find(t => t.Id === e.Id)) {
      this.avt.push(e);
    }
  }
  GetRewardDataList() {
    this.avt.sort((t, e) => t.CanReceiveReward() && !e.CanReceiveReward() ? -1 : !t.CanReceiveReward() && e.CanReceiveReward() ? 1 : !t.IsTaskReceived() && e.IsTaskReceived() ? -1 : t.IsTaskReceived() && !e.IsTaskReceived() ? 1 : t.Id - e.Id);
    return this.avt;
  }
  CanReceiveRewards() {
    for (const t of this.avt) {
      if (t.CanReceiveReward()) {
        return true;
      }
    }
    return false;
  }
}
exports.RacingBetsGroupRewardData = RacingBetsGroupRewardData;
//# sourceMappingURL=RacingBetsGroupRewardData.js.map