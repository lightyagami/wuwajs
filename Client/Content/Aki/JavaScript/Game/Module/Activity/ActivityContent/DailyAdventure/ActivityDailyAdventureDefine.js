"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DAILY_ADVENTURE_PT_CONFIGID = exports.DailyAdventureRewardData = exports.DailyAdventureTaskData = undefined;
class DailyAdventureTaskData {
  constructor() {
    this.TaskId = 0;
    this.TaskState = 1;
    this.CurrentProgress = 0;
    this.TargetProgress = 0;
  }
}
exports.DailyAdventureTaskData = DailyAdventureTaskData;
class DailyAdventureRewardData {
  constructor() {
    this.RewardId = 0;
    this.Point = 0;
    this.RewardState = 1;
  }
  RefreshState(t, s) {
    if (t) {
      this.RewardState = 2;
    } else if (s !== undefined) {
      this.RewardState = s >= this.Point ? 0 : 1;
    }
  }
}
exports.DailyAdventureRewardData = DailyAdventureRewardData;
exports.DAILY_ADVENTURE_PT_CONFIGID = 13; //# sourceMappingURL=ActivityDailyAdventureDefine.js.map