"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingRiskUiContext = undefined;
class MowingRiskUiContext {
  constructor(t) {
    this.AttachedModel = undefined;
    this.CurrentBuffViewUsage = 0;
    this.CurrentBuffViewType = 0;
    this.CurrentChosenOverviewBuffId = undefined;
    this.CurrentChosenProgressIndex = undefined;
    this.CurrentBasicBuffConfigs = [];
    this.CurrentSuperBuffConfigs = [];
    this.NewBuffToShowCache = [];
    this.oth = (t, s) => t.BuffType === s.BuffType ? t.Id - s.Id : s.BuffType - t.BuffType;
    this.AttachedModel = t;
  }
  Dispose() {}
  SyncCurrentShowingBuffConfigs() {
    if (this.CurrentBuffViewUsage === 1) {
      this.CurrentBasicBuffConfigs = this.AttachedModel.GetBasicBuffConfigListInBattle();
      this.CurrentBasicBuffConfigs.sort(this.oth);
      this.CurrentSuperBuffConfigs = this.AttachedModel.GetSuperBuffConfigListInBattle();
    } else {
      this.CurrentBasicBuffConfigs = this.AttachedModel.GetBasicBuffConfigListBeforeBattle();
      this.CurrentBasicBuffConfigs.sort(this.oth);
      this.CurrentSuperBuffConfigs = this.AttachedModel.GetSuperBuffConfigListBeforeBattle();
    }
  }
  SyncNewBuff(t) {
    for (const s of t) {
      if (!this.NewBuffToShowCache.includes(s)) {
        this.NewBuffToShowCache.push(s);
      }
    }
  }
  ResetCacheInBattle() {
    this.NewBuffToShowCache.length = 0;
  }
}
exports.MowingRiskUiContext = MowingRiskUiContext;
//# sourceMappingURL=MowingRiskUiContext.js.map