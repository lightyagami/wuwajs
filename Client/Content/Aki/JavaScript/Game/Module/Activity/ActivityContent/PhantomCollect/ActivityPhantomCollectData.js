"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPhantomCollectData = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityPhantomCollectController_1 = require("./ActivityPhantomCollectController");
class ActivityPhantomCollectData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.PhantomCollectRewardList = undefined;
  }
  PhraseEx(t) {
    if (t === undefined || !!t.$ps) {
      this.PhantomCollectRewardList = t?.$ps?.Aps;
    }
  }
  GetPhantomCollectRewardList() {
    return this.PhantomCollectRewardList ?? [];
  }
  GetPhantomCollectRewardById(e) {
    return this.PhantomCollectRewardList?.find(t => t.h5n === e);
  }
  GetCollectPhantomList() {
    var t = ConfigManager_1.ConfigManager.ActivityPhantomCollectConfig?.GetPhantomCollectConfig(ActivityPhantomCollectController_1.ActivityPhantomCollectController.ActivityId);
    if (t === undefined) {
      return [];
    } else {
      return t.Phantoms;
    }
  }
  GetExDataRedPointShowState() {
    let e = false;
    this.PhantomCollectRewardList?.forEach(t => {
      if (t.Y4n === Protocol_1.Aki.Protocol.zps.CMs) {
        e = true;
      }
    });
    return e;
  }
  GetCollectPhantomCount() {
    var t = this.GetCollectPhantomList();
    let e = 0;
    t.forEach(t => {
      if (ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomIsUnlock(t)) {
        e++;
      }
    });
    return e;
  }
  UpadatePhantomCollectReward(e) {
    var t;
    if (this.PhantomCollectRewardList !== undefined && (t = this.PhantomCollectRewardList.findIndex(t => t.h5n === e.h5n)) !== -1) {
      this.PhantomCollectRewardList[t] = e;
    }
  }
}
exports.ActivityPhantomCollectData = ActivityPhantomCollectData;
//# sourceMappingURL=ActivityPhantomCollectData.js.map