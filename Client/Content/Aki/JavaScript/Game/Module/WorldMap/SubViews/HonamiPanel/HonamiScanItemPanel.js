"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiScanItemPanel = undefined;
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class HonamiScanItemPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  OnStart() {
    this.GetVerticalLayout(16).SetActive(false);
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(false);
    this.GetItem(14).SetUIActive(false);
    super.OnStart();
  }
  OnShowWorldMapSecondaryUi(e) {
    this.LayoutContext.MarkItem = e;
    this.UpdateEnableFastMoveLayout();
    this.UpdateMultiMap();
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconByServerMarkItem(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByServerMarkItem(this.LayoutContext);
    this.qEi();
    this.sCo();
    this.UpdateTopRightIconActive();
  }
  UpdateEnableFastMoveLayout() {
    this.ConfirmButton.SetActive(false);
    this.ConfirmButton.SetEnableClick(false);
    this.UpdateQuickGotoActive(true);
  }
  sCo() {
    var e = this.LayoutContext.MarkItem;
    this.LayoutContext.DescriptionText.ShowTextNew(e.GetDescriptionText());
  }
  qEi() {
    var e = this.LayoutContext.MarkItem;
    this.LayoutContext.Title.SetText(e.GetTitleText());
  }
}
exports.HonamiScanItemPanel = HonamiScanItemPanel;
//# sourceMappingURL=HonamiScanItemPanel.js.map