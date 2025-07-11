"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchMilestoneData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class FloroRanchMilestoneData {
  constructor(e) {
    this.Lo = undefined;
    this.LEu = false;
    this.fAu = false;
    this.RewardList = [];
    this.Lo = e;
    this.RewardList = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e.DropId);
  }
  set IsReceive(e) {
    this.LEu = e;
  }
  get IsReceive() {
    return this.LEu;
  }
  set IsFinished(e) {
    this.fAu = e;
  }
  get IsFinished() {
    return this.fAu;
  }
  get IsReceivable() {
    return this.fAu && !this.LEu;
  }
  get Id() {
    return this.Lo.Id;
  }
  get Goal() {
    return this.Lo.NeedNum;
  }
}
exports.FloroRanchMilestoneData = FloroRanchMilestoneData;
//# sourceMappingURL=FloroRanchMilestoneData.js.map