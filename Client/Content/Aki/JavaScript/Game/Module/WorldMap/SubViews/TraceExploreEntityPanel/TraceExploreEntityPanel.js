"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TraceExploreEntityPanel = undefined;
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class TraceExploreEntityPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetItem(6).SetUIActive(false);
    this.GetItem(14).SetUIActive(false);
    this.hDu(false);
  }
  hDu(e) {
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(e);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.LayoutContext.MarkItem = e;
    this.UpdateEnableFastMoveLayout();
    this.UpdateMultiMap();
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByServerMarkItem(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDownStateIcon(this.LayoutContext);
    this.UpdateTopRightIconActive();
  }
}
exports.TraceExploreEntityPanel = TraceExploreEntityPanel;
//# sourceMappingURL=TraceExploreEntityPanel.js.map