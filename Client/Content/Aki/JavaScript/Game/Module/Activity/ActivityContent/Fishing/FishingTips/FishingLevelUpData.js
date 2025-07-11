"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingLevelUpData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class FishingLevelUpData {
  constructor(t, i) {
    this.AddExp = 0;
    this.LastExp = 0;
    this.LastLevel = 0;
    this.CurrentLevel = 0;
    this.d1_ = [];
    this.m1_();
    this.AddExp = i - t;
    this.LastLevel = this.C1_(t);
    this.CurrentLevel = this.C1_(i);
    this.LastExp = t - this.d1_[this.LastLevel - 1];
  }
  m1_() {
    var t = ConfigManager_1.ConfigManager.FishingConfig?.GetAllFishingReputation();
    if (t) {
      for (const i of t) {
        this.d1_.push(i.Exp);
      }
    }
  }
  C1_(s) {
    let e = 0;
    for (let t = 0, i = this.d1_.length; t < i; t++) {
      if (s < this.d1_[t]) {
        return e;
      }
      e = t + 1;
    }
    return e;
  }
  GetMaxExpByLevel(t) {
    if (t >= this.d1_.length) {
      return this.d1_[this.d1_.length - 1] - this.d1_[this.d1_.length - 2];
    } else if (t <= 0) {
      return 0;
    } else {
      return this.d1_[t] - this.d1_[t - 1];
    }
  }
  IsLevelUp() {
    return this.CurrentLevel > this.LastLevel;
  }
  IsCurrentLevelMax() {
    return this.CurrentLevel === this.d1_.length;
  }
}
exports.FishingLevelUpData = FishingLevelUpData;
//# sourceMappingURL=FishingLevelUpData.js.map