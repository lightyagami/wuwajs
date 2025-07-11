"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DarkCoastDeliveryLevelData = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
class DarkCoastDeliveryLevelData {
  constructor(t, e, s) {
    this.Id = 0;
    this.Config = undefined;
    this.THs = 0;
    this.Goal = 0;
    this.gQa = false;
    this.fQa = false;
    this.DKi = false;
    this.pQa = false;
    this.vQa = undefined;
    this.Config = t;
    this.Id = t.Id;
    this.Goal = e;
    this.THs = s;
  }
  MQa() {
    var t;
    var e;
    this.vQa = [];
    for ([t, e] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(this.THs)) {
      this.vQa.push([{
        ItemId: t,
        IncId: 0
      }, e]);
    }
  }
  SetDefeatedGuardState(t) {
    this.gQa = t;
  }
  SetReceivedGuardRewardState(t) {
    this.fQa = t;
  }
  SetIsUnLockState(t) {
    this.DKi = this.Id <= t;
  }
  GetIsUnLock() {
    return this.DKi;
  }
  SetReceiveRewardState(t) {
    this.pQa = t;
  }
  GetDarkCoastDeliveryGuardState() {
    if (this.fQa) {
      return 4;
    } else if (this.gQa) {
      return 3;
    } else if (this.DKi) {
      return 1;
    } else {
      return 0;
    }
  }
  GetDarkCoastDeliveryRewardState() {
    if (this.pQa) {
      return 2;
    } else if (this.DKi) {
      return 1;
    } else {
      return 0;
    }
  }
  GetRewardItems() {
    if (this.vQa === undefined) {
      this.MQa();
    }
    return this.vQa;
  }
}
exports.DarkCoastDeliveryLevelData = DarkCoastDeliveryLevelData;
//# sourceMappingURL=DarkCoastDeliveryLevelData.js.map