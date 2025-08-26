"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchMilestoneData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class FloroRanchMilestoneData {
  constructor(e) {
    this.Lo = undefined;
    this.VEu = false;
    this.VAu = false;
    this.RewardList = [];
    this.Lo = e;
    this.RewardList = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e.DropId);
  }
  set IsReceive(e) {
    this.VEu = e;
  }
  get IsReceive() {
    return this.VEu;
  }
  set IsFinished(e) {
    this.VAu = e;
  }
  get IsFinished() {
    return this.VAu;
  }
  get IsReceivable() {
    return this.VAu && !this.VEu;
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