"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaveHoleSecondaryPanel = undefined;
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class CaveHoleSecondaryPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.OnConfirmBtnClick = () => {
      this.HandleTrack();
    };
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(false);
    this.GetItem(14).SetUIActive(false);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.LayoutContext.MarkItem = e;
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithTrackStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
    this.UpdateTopRightIconActive();
    this.UpdateRightDownIconActive();
    e = this.UpdateQuickGoto();
    this.ConfirmButton.SetActive(!e);
  }
}
exports.CaveHoleSecondaryPanel = CaveHoleSecondaryPanel;
//# sourceMappingURL=CaveHoleSecondaryPanel.js.map