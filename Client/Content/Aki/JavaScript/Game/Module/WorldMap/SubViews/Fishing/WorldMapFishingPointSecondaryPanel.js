"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapFishingPointSecondaryPanel = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WorldMapSecondaryTipListPanel_1 = require("../Common/TipList/WorldMapSecondaryTipListPanel");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class WorldMapFishingPointSecondaryPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.Tn_ = undefined;
    this.OnConfirmBtnClick = () => {
      ControllerHolder_1.ControllerHolder.FishingController.RequestFishingEntrustTrace(0);
      ModelManager_1.ModelManager.FishingQuestModel.TraceItem(0);
      this.Close();
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
    this.LayoutContext.PanelListLayout.RootUIComp.SetUIActive(false);
  }
  OnShowWorldMapSecondaryUi(e) {
    var a = (this.LayoutContext.MarkItem = e).TrackTarget;
    var a = ModelManager_1.ModelManager.FishingModel.GetFishingPointNameLocalKey(a);
    var a = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(a);
    var r = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(e.MarkConfig.MarkTitle, a);
    this.LayoutContext.Title.SetText(r);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIcon(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByServerMarkItem(this.LayoutContext);
    var r = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(e.MarkConfig.MarkDesc, a);
    this.LayoutContext.DescriptionText.SetText(r);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithStopDetectionStyle(this.LayoutContext);
    this.bn_();
    this.UpdateQuickGotoActive(false);
  }
  bn_() {
    var e = [this.An_(), this.Bn_(), this.qn_()];
    this.Tn_.RefreshByData(e);
  }
  An_() {
    var e = this.LayoutContext.MarkItem.TrackTarget;
    var e = ModelManager_1.ModelManager.FishingModel.GetFishingPointCapacityInfoTuple(e)[0];
    return {
      Name: ConfigManager_1.ConfigManager.TextConfig.GetMultiText("Fishing_MarkText4"),
      Desc: e.toString()
    };
  }
  Bn_() {
    var e = this.LayoutContext.MarkItem.TrackTarget;
    var e = ModelManager_1.ModelManager.FishingModel.GetFishingPointTechNameLocalKey(e);
    return {
      Name: ConfigManager_1.ConfigManager.TextConfig.GetMultiText("Fishing_MarkText2"),
      Desc: ConfigManager_1.ConfigManager.TextConfig.GetMultiText(e)
    };
  }
  qn_() {
    var e = this.LayoutContext.MarkItem.TrackTarget;
    var e = ModelManager_1.ModelManager.FishingModel.GetFishingPointAppearTimeLocalKey(e);
    return {
      Name: ConfigManager_1.ConfigManager.TextConfig.GetMultiText("Fishing_MarkText3"),
      Desc: ConfigManager_1.ConfigManager.TextConfig.GetMultiText(e)
    };
  }
}
exports.WorldMapFishingPointSecondaryPanel = WorldMapFishingPointSecondaryPanel;
//# sourceMappingURL=WorldMapFishingPointSecondaryPanel.js.map