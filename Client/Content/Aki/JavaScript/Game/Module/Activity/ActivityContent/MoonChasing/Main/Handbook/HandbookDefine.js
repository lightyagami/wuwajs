"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandbookRewardData = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
class HandbookRewardData {
  constructor() {
    this.Id = 0;
    this.Goal = 0;
    this.Achieved = false;
    this.DropId = 0;
    this.cbe = [];
  }
  GetPreviewReward() {
    if (this.cbe.length === 0) {
      var t = [];
      if (this.DropId === 0) {
        return t;
      }
      var r;
      var e;
      var a = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(this.DropId)?.DropPreview;
      if (!a) {
        return t;
      }
      for ([r, e] of a) {
        var i = [{
          IncId: 0,
          ItemId: r
        }, e];
        t.push(i);
      }
      this.cbe = t;
    }
    return this.cbe;
  }
  GetState(t) {
    if (this.Achieved) {
      return 2;
    } else if (t < this.Goal) {
      return 0;
    } else {
      return 1;
    }
  }
}
exports.HandbookRewardData = HandbookRewardData;
//# sourceMappingURL=HandbookDefine.js.map