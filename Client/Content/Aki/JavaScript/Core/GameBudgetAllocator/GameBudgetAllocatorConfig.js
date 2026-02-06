"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameBudgetAllocatorConfig = exports.TsGameBudgetAllocatorTickIntervalDetailConfig = exports.TsGameBudgetGroupConfigCache = exports.TsGameBudgetGroupConfig = undefined;
class TsGameBudgetGroupConfig {
  constructor(t, s) {
    this.GroupName = t;
    this.SignificanceGroup = s;
  }
}
exports.TsGameBudgetGroupConfig = TsGameBudgetGroupConfig;
class TsGameBudgetGroupConfigCache {
  constructor(t) {
    this.ueGroupConfig = t;
    this.GroupName = t.GroupName;
    this.SignificanceGroup = t.SignificanceGroup;
    this.DefaultDisableActorTickDistance = t.DisableActorTickDistance;
    this.DefaultDisableActorTickStrategy = t.DisableActorTickStrategy;
  }
}
exports.TsGameBudgetGroupConfigCache = TsGameBudgetGroupConfigCache;
class TsGameBudgetAllocatorTickIntervalDetailConfig {
  constructor(t, s, o, i, e, r = 0, h = 0) {
    this.GlobalMode = t;
    this.ActorMode = s;
    this.MaxInterval = o;
    this.TickReductionStartSize = i;
    this.TickReductionIntervalSize = e;
    this.TickReductionStartScreenRatio = r;
    this.TickReductionIntervalScreenRatio = h;
  }
}
exports.TsGameBudgetAllocatorTickIntervalDetailConfig = TsGameBudgetAllocatorTickIntervalDetailConfig;
class GameBudgetAllocatorConfig {
  constructor() {
    this.Default = undefined;
    this.Normal_Render = undefined;
    this.Normal_NotRendered = undefined;
    this.Normal_Fighting = undefined;
    this.Fighting_Rendered = undefined;
    this.Fighting_NotRendered = undefined;
    this.Fighting_Fighting = undefined;
    this.Cutscene_Rendered = undefined;
    this.Cutscene_NotRendered = undefined;
  }
}
exports.GameBudgetAllocatorConfig = GameBudgetAllocatorConfig;
//# sourceMappingURL=GameBudgetAllocatorConfig.js.map