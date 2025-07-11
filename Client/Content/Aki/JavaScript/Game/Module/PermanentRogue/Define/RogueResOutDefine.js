"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueTaskRewardTabData = exports.RogueDungeonParam = exports.RogueIllustratedTabData = undefined;
class RogueIllustratedTabData {
  constructor() {
    this.TabType = 0;
    this.Icon = "";
    this.TabName = "";
    this.Index = 1;
    this.Config = undefined;
  }
}
exports.RogueIllustratedTabData = RogueIllustratedTabData;
class RogueDungeonParam {
  constructor() {
    this.SeasonId = 0;
    this.DungeonList = [];
  }
}
exports.RogueDungeonParam = RogueDungeonParam;
class RogueTaskRewardTabData {
  constructor() {
    this.NameTextId = undefined;
    this.Index = -1;
    this.ClickedCallback = undefined;
    this.RefreshRedDot = undefined;
  }
}
exports.RogueTaskRewardTabData = RogueTaskRewardTabData;
//# sourceMappingURL=RogueResOutDefine.js.map