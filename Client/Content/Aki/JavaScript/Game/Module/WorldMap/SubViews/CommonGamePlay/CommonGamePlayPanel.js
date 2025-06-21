"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CommonGamePlayPanel = void 0;
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  RewardItemBar_1 = require("../RewardItemBar"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper"),
  MapMoraleLvItem_1 = require("./MapMoraleLvItem"),
  MapMoraleWarnItem_1 = require("./MapMoraleWarnItem");
class CommonGamePlayPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments), this.MapMoraleLvItem = void 0, this.MapMoraleWarnItem = void 0, this.RewardsView = void 0
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab"
  }
  async OnBeforeShowWorldMapSecondaryUiAsync(e) {
    void 0 !== e.View && void 0 !== e.View.LoadingPromise && await e.View.LoadingPromise, await this.yz1(e) || this.mau()
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(), this.GetItem(6).SetUIActive(!1), this.GetItem(14).SetUIActive(!1), this.bmu(!1)
  }
  bmu(e) {
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(e)
  }
  OnShowWorldMapSecondaryUi(e) {
    this.LayoutContext.MarkItem = e, this.UpdateEnableFastMoveLayout(), this.UpdateMultiMap(), WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext), WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext), WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(this.LayoutContext), WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext), WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext), WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDownStateIcon(this.LayoutContext), this.UpdateTopRightIconActive(), this.UpdateDeliveryPropLayout() || this.UpdateMoraleFlagReward(e)
  }
  UpdateMoraleFlagReward(e) {
    !e.IsMoraleFlag() || !(e = ModelManager_1.ModelManager.MoraleModel?.GetFlagDataByMarkId(e.MarkId)) || (e = e.Config.BoxRewardId) <= 0 || (this.bmu(!0), this.GetItem(8).SetUIActive(!0), this.RewardsView?.RebuildRewardsByData(this.GetItemListByDropId(e)), this.RewardsView?.SetTitleNewTxt("Morale_title_18"))
  }
  async yz1(e) {
    if (!e.IsMoraleFlag()) return !1;
    e = ModelManager_1.ModelManager.MoraleModel?.GetFlagDataByMarkId(e.MarkId);
    if (!e) return !1;
    this.MapMoraleLvItem ? this.MapMoraleLvItem?.SetActive(!0) : (this.MapMoraleLvItem = new MapMoraleLvItem_1.MapMoraleLvItem, await this.MapMoraleLvItem.Init(this.GetItem(43)), this.MapMoraleWarnItem = new MapMoraleWarnItem_1.MapMoraleWarnItem, await this.MapMoraleWarnItem.Init(this.GetItem(44))), this.MapMoraleLvItem.UpdateData(e.GetMapMoraleLvItemData());
    var a = e.IsLowMoraleLv(),
      a = (this.MapMoraleWarnItem.SetActive(a), a && this.MapMoraleWarnItem.UpdateTitle("Morale_title_7"), e.HasBoxCanGet()),
      a = (this.GetItem(25).SetUIActive(a), this.GetText(30).ShowTextNew("Morale_title_9"), e.IsHighDifficultyChallenge());
    return this.GetItem(45).SetUIActive(a), this.UiBgItem?.ShowMoraleBg(a), WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.SetTitleUseChangeColor(this.LayoutContext, a), await this.CreateRewardItemBar(), !0
  }
  mau() {
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.SetTitleUseChangeColor(this.LayoutContext, !1), this.GetItem(45).SetUIActive(!1), this.MapMoraleLvItem?.SetActive(!1), this.MapMoraleWarnItem?.SetActive(!1), this.UiBgItem?.ShowMoraleBg(!1)
  }
  async CreateRewardItemBar() {
    var e;
    this.RewardsView || (this.RewardsView = new RewardItemBar_1.RewardItemBar, e = this.GetItem(8).GetOwner(), await this.RewardsView.CreateThenShowByActorAsync(e))
  }
}
exports.CommonGamePlayPanel = CommonGamePlayPanel;
//# sourceMappingURL=CommonGamePlayPanel.js.map