"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTaskData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class FloroRanchTaskData {
  constructor(t) {
    this.Lo = undefined;
    this.Status = 1;
    this.P4e = true;
    this.Current = 0;
    this.Target = 0;
    this.RewardList = [];
    this.ReceiveDelegate = undefined;
    this.Lo = t;
    this.RewardList = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(t.DropId);
  }
  UpdateUnLockState(t) {
    this.P4e = t;
  }
  get IsUnLock() {
    return this.P4e;
  }
  get Id() {
    return this.Lo.Id;
  }
  get IsLimitTime() {
    return this.Lo.LimitTime;
  }
  get TabType() {
    return this.Lo.PageType;
  }
  get TaskName() {
    return this.Lo.RewardName;
  }
  get JumpId() {
    return this.Lo.JumpId;
  }
}
exports.FloroRanchTaskData = FloroRanchTaskData;
//# sourceMappingURL=FloroRanchTaskData.js.map