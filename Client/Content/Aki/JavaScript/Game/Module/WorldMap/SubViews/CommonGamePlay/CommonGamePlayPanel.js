"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonGamePlayPanel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelPlay_1 = require("../../../LevelPlay/LevelPlay");
const MapHelper_1 = require("../../../Map/MapHelper");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RewardItemBar_1 = require("../RewardItemBar");
const SceneGameplayTipGrid_1 = require("../SceneGameplayPanel/SceneGameplayTipGrid");
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
    this.O2o = undefined;
    this.k2o = undefined;
    this.Ymt = undefined;
    this.F2o = undefined;
    this.V2o = undefined;
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  async OnBeforeShowWorldMapSecondaryUiAsync(e) {
    if (e.View !== undefined && e.View.LoadingPromise !== undefined) {
      await e.View.LoadingPromise;
    }
    if (!(await this.GJ1(e))) {
      this.rmu();
    }
    if (!this.xYc(e)) {
      this.UYc();
    }
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
      this.hDu(true);
      this.GetItem(8).SetUIActive(true);
      this.RewardsView?.RebuildRewardsByData(this.GetItemListByDropId(e));
      this.RewardsView?.SetTitleNewTxt("Morale_title_18");
    }
  }
  async GJ1(e) {
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
    var i = e.IsLowMoraleLv();
    this.MapMoraleWarnItem.SetActive(i);
    if (i) {
      this.MapMoraleWarnItem.UpdateTitle("Morale_title_7");
    }
    var i = e.HasBoxCanGet();
    this.GetItem(25).SetUIActive(i);
    this.GetText(30).ShowTextNew("Morale_title_9");
    var i = e.IsHighDifficultyChallenge();
    this.GetItem(45).SetUIActive(i);
    this.UiBgItem?.ShowMoraleBg(i);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.SetTitleUseChangeColor(this.LayoutContext, i);
    await this.CreateRewardItemBar();
    return true;
  }
  rmu() {
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.SetTitleUseChangeColor(this.LayoutContext, false);
    this.GetItem(45).SetUIActive(false);
    this.MapMoraleLvItem?.SetActive(false);
    this.MapMoraleWarnItem?.SetActive(false);
    this.UiBgItem?.ShowMoraleBg(false);
  }
  UYc() {
    this.O2o?.SetUiActive(false);
    this.k2o?.SetUiActive(false);
    this.hDu(false);
  }
  xYc(e) {
    return !!e.IsNightMareFlag() && (this.Ymt = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(e.MarkConfig.RelativeId), this.Ymt || (this.Ymt = new LevelPlay_1.LevelPlayInfo(e.MarkConfig.RelativeId), this.Ymt.InitConfig()), this.InitNightMareRewards(e), true);
  }
  async CreateRewardItemBar() {
    var e;
    if (!this.RewardsView) {
      this.RewardsView = new RewardItemBar_1.RewardItemBar();
      e = this.GetItem(8).GetOwner();
      await this.RewardsView.CreateThenShowByActorAsync(e);
    }
  }
  InitNightMareRewards(e) {
    var [i, t, a, r, s] = MapHelper_1.MapHelper.GetDoubleRestAndMaxTimes(e);
    if (i) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(20), r, t, a);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(42), s);
      this.GetText(42).SetUIActive(i);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(42), "Double_reward_tips_02");
    }
    this.GetItem(19).SetUIActive(i);
    if (!this.O2o) {
      r = this.GetItem(8).GetOwner();
      t = this.GetVerticalLayout(7).RootUIComp;
      this.k2o = new SceneGameplayTipGrid_1.SceneGameplayTipGrid();
      this.k2o.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(r, t));
      this.O2o = new SceneGameplayTipGrid_1.SceneGameplayTipGrid();
      this.O2o.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(r, t));
    }
    this.k2o?.SetBtnPreviewVisible(false);
    this.F2o = e.MarkConfig?.Reward ? ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(e.MarkConfig?.Reward) : undefined;
    this.V2o = this.Ymt.FirstRewardId ? ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(this.Ymt.FirstRewardId) : undefined;
    var a = this.Ymt.IsFirstPass;
    if (a) {
      this.BYc(this.k2o, undefined, "");
    } else {
      this.BYc(this.k2o, this.V2o, "FirstReward");
    }
    this.BYc(this.O2o, this.F2o, "ProbReward", i);
  }
  BYc(e, i, t, a = false) {
    var r;
    if (i) {
      if (r = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetNightMareShowReward(i.RewardIdCalabash)) {
        e.Refresh(r, t, false, false, a);
        e.SetUiActive(true);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneGameplay", 5, "读取不到奖励配置", ["兑换奖励ID", i.Id]);
        }
        e.SetUiActive(false);
      }
      this.hDu(true);
    } else {
      e.SetUiActive(false);
    }
  }
  OnBeforeDestroy() {
    if (this.O2o) {
      this.AddChild(this.O2o);
      this.O2o = undefined;
    }
    if (this.k2o) {
      this.AddChild(this.k2o);
      this.k2o = undefined;
    }
    this.F2o = undefined;
    this.V2o = undefined;
    ModelManager_1.ModelManager.CalabashModel.ClearOnlyShowData();
    super.OnBeforeDestroy();
  }
}
exports.CommonGamePlayPanel = CommonGamePlayPanel;
//# sourceMappingURL=CommonGamePlayPanel.js.map