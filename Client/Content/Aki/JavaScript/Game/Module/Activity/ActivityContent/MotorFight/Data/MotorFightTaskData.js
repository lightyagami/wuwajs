"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightTaskData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class MotorFightTaskData {
  constructor(t) {
    this.Lo = undefined;
    this.Current = 0;
    this.Target = 0;
    this.Status = 1;
    this.RewardList = [];
    this.Lo = t;
    this.RewardList = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(t.DropId);
  }
  get IsFinished() {
    return this.Status === 2;
  }
  get IsUnclaimed() {
    return this.Status === 0;
  }
  get IsDoing() {
    return this.Status === 1;
  }
  get Id() {
    return this.Lo.Id;
  }
  get TaskName() {
    return this.Lo.TaskName;
  }
}
exports.MotorFightTaskData = MotorFightTaskData;
//# sourceMappingURL=MotorFightTaskData.js.map