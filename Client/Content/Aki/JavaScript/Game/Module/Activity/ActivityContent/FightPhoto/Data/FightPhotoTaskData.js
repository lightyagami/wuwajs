"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoTaskData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class FightPhotoTaskData {
  constructor(t) {
    this.Lo = undefined;
    this.Status = 1;
    this.RewardList = [];
    this.Lo = t;
    this.RewardList = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(t.RewardId);
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
  get TabType() {
    return this.Lo.TabId;
  }
  get TaskName() {
    return this.Lo.Title;
  }
}
exports.FightPhotoTaskData = FightPhotoTaskData;
//# sourceMappingURL=FightPhotoTaskData.js.map