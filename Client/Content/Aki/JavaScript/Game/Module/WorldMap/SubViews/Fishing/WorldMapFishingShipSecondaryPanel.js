"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapFishingShipSecondaryPanel = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WorldMapSecondaryTipListPanel_1 = require("../Common/TipList/WorldMapSecondaryTipListPanel");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class WorldMapFishingShipSecondaryPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.Tn_ = undefined;
    this.OnConfirmBtnClick = () => {
      ControllerHolder_1.ControllerHolder.FishingController.FishingTeleportToBoat();
    };
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.Tn_ = new WorldMapSecondaryTipListPanel_1.WorldMapSecondaryTipListPanel();
    await this.Tn_.CreateThenShowByResourceIdAsync("PnlMapTipListItemA", this.LayoutContext.PanelProgressItem);
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.LayoutContext.AreaText.SetUIActive(false);
    this.LayoutContext.PanelListLayout.RootUIComp.SetUIActive(false);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.LayoutContext.MarkItem = e;
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(this.LayoutContext);
    this.LayoutContext.ConfirmButtonItem.SetLocalTextNew("Fishing_FastOnBoat");
    this.bn_();
    this.UpdateQuickGotoActive(false);
  }
  bn_() {
    var e = [this.An_()];
    this.Tn_.RefreshByData(e);
  }
  An_() {
    var e = ModelManager_1.ModelManager.DockyardModel.BackpackUseSize;
    var a = ModelManager_1.ModelManager.DockyardModel.BackpackSize;
    return {
      Name: ConfigManager_1.ConfigManager.TextConfig.GetMultiText("Fishing_MarkText1"),
      Desc: ConfigManager_1.ConfigManager.TextConfig.GetMultiText("Fishing_QTE_Count", e.toString(), a.toString())
    };
  }
}
exports.WorldMapFishingShipSecondaryPanel = WorldMapFishingShipSecondaryPanel;
//# sourceMappingURL=WorldMapFishingShipSecondaryPanel.js.map