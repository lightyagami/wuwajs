"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashInstance = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
class CalabashInstance {
  constructor() {
    this.Wft = 0;
    this.UQ = 10;
    this.Kft = 0;
    this.Qft = 0;
    this.$2m = 0;
    this.Xft = new Map();
    this.$ft = new Map();
    this.Yft = new Set();
  }
  SetBaseInfo(t) {
    this.CalabashCurrentLevel = t.F6n;
    this.CalabashCurrentExp = t.U8n;
    this.CalabashMaxLevel = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashMaxLevel();
    this.IdentifyGuaranteeCount = t.vLs;
    this.LowCostIdentifyGuaranteeCount = t.IBm;
    this.SetUnlockCalabashDevelopRewards(t.fLs);
  }
  SetConfigInfo(t) {
    for (const s of Object.keys(t.SLs)) {
      var e = Number.parseInt(s);
      this.Xft.set(e, t.SLs[s]);
    }
  }
  set CalabashCurrentLevel(t) {
    this.Wft = t;
  }
  get CalabashCurrentLevel() {
    return this.Wft;
  }
  set CalabashMaxLevel(t) {
    this.UQ = t;
  }
  get CalabashMaxLevel() {
    return this.UQ;
  }
  set CalabashCurrentExp(t) {
    this.Kft = t;
  }
  get CalabashCurrentExp() {
    return this.Kft;
  }
  set IdentifyGuaranteeCount(t) {
    this.Qft = t;
  }
  get IdentifyGuaranteeCount() {
    return this.Qft;
  }
  set LowCostIdentifyGuaranteeCount(t) {
    this.$2m = t;
  }
  get LowCostIdentifyGuaranteeCount() {
    return this.$2m;
  }
  SetUnlockCalabashDevelopRewards(t) {
    this.$ft.clear();
    for (const e of t.values()) {
      this.$ft.set(e.TIs, e.CLs);
    }
  }
  SetUnlockCalabashDevelopReward(t) {
    this.$ft.set(t.TIs, t.CLs);
  }
  GetUnlockCalabashDevelopRewards() {
    return this.$ft;
  }
  SetRewardedLevelsSet(t) {
    this.Yft.clear();
    for (const e of t) {
      this.Yft.add(e);
    }
  }
  IsRewardedByLevel(t) {
    return this.Yft.has(t);
  }
  GetCatchGainByLevel(t) {
    return this.Xft.get(t);
  }
}
exports.CalabashInstance = CalabashInstance;
//# sourceMappingURL=CalabashInstance.js.map