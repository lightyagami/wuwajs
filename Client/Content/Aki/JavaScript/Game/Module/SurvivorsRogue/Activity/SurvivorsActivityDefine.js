"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorRewardTaskTabData = exports.SurvivorsMilestoneData = exports.SurvivorsLevelInfo = exports.SurvivorsTalentAreaData = exports.SurvivorsTalentNode = exports.effectShowTypeColorRecord = undefined;
exports.effectShowTypeColorRecord = {
  [1]: "364c83ff",
  2: "603683ff",
  3: "36837dff"
};
class SurvivorsTalentNode {
  constructor(s, t, r, i, o, e) {
    this.NodeId = s;
    this.AreaId = t;
    this.PreNodeIds = r;
    this.EffectId = i;
    this.IndexId = o;
    this.IndexSortId = e;
    this.Status = -1;
  }
}
exports.SurvivorsTalentNode = SurvivorsTalentNode;
class SurvivorsTalentAreaData {
  constructor() {
    this.AreaId = 0;
    this.NodeIds = [];
  }
}
exports.SurvivorsTalentAreaData = SurvivorsTalentAreaData;
class SurvivorsLevelInfo {
  constructor() {
    this.LevelId = 0;
    this.InstId = 0;
    this.RoleId = 0;
    this.IsEndless = false;
    this.IsSaveFile = false;
    this.Batch = 0;
    this.MaxBatch = 0;
  }
}
exports.SurvivorsLevelInfo = SurvivorsLevelInfo;
class SurvivorsMilestoneData {
  constructor(s, t, r, i, o = false) {
    this.Id = s;
    this.SortId = t;
    this.Goal = r;
    this.DropId = i;
    this.IsGot = o;
  }
  IsReceivable(s) {
    return this.IsAchieved(s) && !this.IsGot;
  }
  IsAchieved(s) {
    return this.Goal <= s;
  }
}
exports.SurvivorsMilestoneData = SurvivorsMilestoneData;
class SurvivorRewardTaskTabData {
  constructor() {
    this.NameTextId = undefined;
    this.Index = -1;
    this.Type = 0;
    this.ClickedCallback = undefined;
    this.RefreshRedDot = undefined;
  }
}
exports.SurvivorRewardTaskTabData = SurvivorRewardTaskTabData;
//# sourceMappingURL=SurvivorsActivityDefine.js.map