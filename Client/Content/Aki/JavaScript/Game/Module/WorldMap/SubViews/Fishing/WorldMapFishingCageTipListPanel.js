"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapFishingCageTipListPanel = undefined;
const WorldMapSecondaryTipListPanel_1 = require("../Common/TipList/WorldMapSecondaryTipListPanel");
const WorldMapFishingCageTipListItem_1 = require("./WorldMapFishingCageTipListItem");
class WorldMapFishingCageTipListPanel extends WorldMapSecondaryTipListPanel_1.WorldMapSecondaryTipListPanel {
  constructor() {
    super(...arguments);
    this.CreateListItem = () => new WorldMapFishingCageTipListItem_1.WorldMapFishingCageTipListItem();
  }
}
exports.WorldMapFishingCageTipListPanel = WorldMapFishingCageTipListPanel;
//# sourceMappingURL=WorldMapFishingCageTipListPanel.js.map