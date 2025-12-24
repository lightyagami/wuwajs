"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapTravelQuestPanel = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PopupListItemPanel_1 = require("../Common/PopupListItemPanel");
const RewardItemBar_1 = require("../RewardItemBar");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class MapTravelQuestPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.u2o = undefined;
    this.RewardsView = undefined;
    this.Ieh = undefined;
    this.OnConfirmBtnClick = () => {
      this.HandleTrack();
    };
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  async OnBeforeStartAsync() {
    this.RewardsView = new RewardItemBar_1.RewardItemBar();
    await this.RewardsView.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
    this.Ieh = new PopupListItemPanel_1.PopupListItemPanel();
    await this.Ieh.CreateThenShowByActorAsync(this.GetItem(6).GetOwner());
    return super.OnBeforeStartAsync();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(false);
    this.GetText(36).SetUIActive(false);
    this.GetItem(14).SetUIActive(false);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.u2o = e;
    this.LayoutContext.MarkItem = e;
    this.Ieh.SetUiActive(false);
    this.LayoutContext?.SetConfirmBtnActive(false);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithTrackStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaAndIconByConfigOrDynamicConfigMarkItem(this.LayoutContext);
    this.UpdateQuickGotoActive(true);
    this.LYa();
  }
  LYa() {
    var e;
    var a = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfigByMapMarkId(this.u2o.MarkId);
    if (a && (e = a.QuestId, e = (e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e)) === 1 || e === 2, this.GetItem(14).SetUIActive(e), this.GetItem(37).SetUIActive(e), e)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(38), a.MapDesc);
    }
  }
}
exports.MapTravelQuestPanel = MapTravelQuestPanel;
//# sourceMappingURL=MapTravelQuestPanel.js.map