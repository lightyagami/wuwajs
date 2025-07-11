"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapFishingDockSecondaryPanel = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class WorldMapFishingDockSecondaryPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.OnConfirmBtnClick = () => {
      if (ModelManager_1.ModelManager.FishingModel.IsOnShipVehicle()) {
        this.HandleTrack();
      } else {
        this.HandleTeleport();
      }
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
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonEnableClickByTeleportState(this.LayoutContext);
    this.Dn_();
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(this.LayoutContext);
    this.UpdateMultiMap();
    this.UpdateQuickGotoActive(false);
  }
  Dn_() {
    if (ModelManager_1.ModelManager.FishingModel.IsOnShipVehicle()) {
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithTrackStyle(this.LayoutContext);
    } else {
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
    }
  }
}
exports.WorldMapFishingDockSecondaryPanel = WorldMapFishingDockSecondaryPanel;
//# sourceMappingURL=WorldMapFishingDockSecondaryPanel.js.map