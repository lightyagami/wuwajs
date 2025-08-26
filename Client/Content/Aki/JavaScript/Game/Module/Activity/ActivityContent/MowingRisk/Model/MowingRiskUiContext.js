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
    this.NewBuffToShowCache = [];
    this.AttachedModel = t;
  }
  Dispose() {}
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