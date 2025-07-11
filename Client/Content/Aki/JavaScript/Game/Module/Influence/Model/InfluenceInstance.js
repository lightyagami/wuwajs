"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfluenceInstance = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class InfluenceInstance {
  constructor(e, t, r) {
    this.Kni = 0;
    this.Id = e;
    this.Qni = t;
    this.Kni = r;
  }
  get Relation() {
    return this.Kni;
  }
  SetRelation(e) {
    this.Kni = e;
  }
  get RewardIndex() {
    return this.Qni;
  }
  SetReceiveReward(e) {
    this.Qni = e;
  }
  GetCanReceiveReward() {
    var e = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(this.Id);
    if (e.ReputationReward.length === this.RewardIndex + 1) {
      return {
        IsReceived: true,
        Reward: e.ReputationReward[this.RewardIndex]
      };
    } else {
      return {
        IsReceived: false,
        Reward: e.ReputationReward[this.RewardIndex + 1]
      };
    }
  }
  GetReward() {
    return ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(this.Id).ReputationReward;
  }
}
exports.InfluenceInstance = InfluenceInstance;
//# sourceMappingURL=InfluenceInstance.js.map