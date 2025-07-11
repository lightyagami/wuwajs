"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonGamePlayPanel = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RewardItemBar_1 = require("../RewardItemBar");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const MapMoraleLvItem_1 = require("./MapMoraleLvItem");
const MapMoraleWarnItem_1 = require("./MapMoraleWarnItem");
class CommonGamePlayPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.MapMoraleLvItem = undefined;
    this.MapMoraleWarnItem = undefined;
    this.RewardsView = undefined;
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  async OnBeforeShowWorldMapSecondaryUiAsync(e) {
    if (e.View !== undefined && e.View.LoadingPromise !== undefined) {
      await e.View.LoadingPromise;
    }
    if (!(await this.dJ1(e))) {
      this.ydu();
    }
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetItem(6).SetUIActive(false);
    this.GetItem(14).SetUIActive(false);
    this.xUu(false);
  }
  xUu(e) {
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(e);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.LayoutContext.MarkItem = e;
    this.UpdateEnableFastMoveLayout();
    this.UpdateMultiMap();
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDownStateIcon(this.LayoutContext);
    this.UpdateTopRightIconActive();
    if (!this.UpdateDeliveryPropLayout()) {
      this.UpdateMoraleFlagReward(e);
    }
  }
  UpdateMoraleFlagReward(e) {
    if (!!e.IsMoraleFlag() && !!(e = ModelManager_1.ModelManager.MoraleModel?.GetFlagDataByMarkId(e.MarkId)) && !((e = e.Config.BoxRewardId) <= 0)) {
      this.xUu(true);
      this.GetItem(8).SetUIActive(true);
      this.RewardsView?.RebuildRewardsByData(this.GetItemListByDropId(e));
      this.RewardsView?.SetTitleNewTxt("Morale_title_18");
    }
  }
  async dJ1(e) {
    if (!e.IsMoraleFlag()) {
      return false;
    }
    e = ModelManager_1.ModelManager.MoraleModel?.GetFlagDataByMarkId(e.MarkId);
    if (!e) {
      return false;
    }
    if (this.MapMoraleLvItem) {
      this.MapMoraleLvItem?.SetActive(true);
    } else {
      this.MapMoraleLvItem = new MapMoraleLvItem_1.MapMoraleLvItem();
      await this.MapMoraleLvItem.Init(this.GetItem(43));
      this.MapMoraleWarnItem = new MapMoraleWarnItem_1.MapMoraleWarnItem();
      await this.MapMoraleWarnItem.Init(this.GetItem(44));
    }
    this.MapMoraleLvItem.UpdateData(e.GetMapMoraleLvItemData());
    var a = e.IsLowMoraleLv();
    this.MapMoraleWarnItem.SetActive(a);
    if (a) {
      this.MapMoraleWarnItem.UpdateTitle("Morale_title_7");
    }
    var a = e.HasBoxCanGet();
    this.GetItem(25).SetUIActive(a);
    this.GetText(30).ShowTextNew("Morale_title_9");
    var a = e.IsHighDifficultyChallenge();
    this.GetItem(45).SetUIActive(a);
    this.UiBgItem?.ShowMoraleBg(a);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.SetTitleUseChangeColor(this.LayoutContext, a);
    await this.CreateRewardItemBar();
    return true;
  }
  ydu() {
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.SetTitleUseChangeColor(this.LayoutContext, false);
    this.GetItem(45).SetUIActive(false);
    this.MapMoraleLvItem?.SetActive(false);
    this.MapMoraleWarnItem?.SetActive(false);
    this.UiBgItem?.ShowMoraleBg(false);
  }
  async CreateRewardItemBar() {
    var e;
    if (!this.RewardsView) {
      this.RewardsView = new RewardItemBar_1.RewardItemBar();
      e = this.GetItem(8).GetOwner();
      await this.RewardsView.CreateThenShowByActorAsync(e);
    }
  }
}
exports.CommonGamePlayPanel = CommonGamePlayPanel;
//# sourceMappingURL=CommonGamePlayPanel.js.map