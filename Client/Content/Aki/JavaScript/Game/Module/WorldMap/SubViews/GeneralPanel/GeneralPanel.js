"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeneralPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WorldMapDefine_1 = require("../../WorldMapDefine");
const PopupListItemPanel_1 = require("../Common/PopupListItemPanel");
const RewardItemBar_1 = require("../RewardItemBar");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class GeneralPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.u2o = undefined;
    this.H2o = undefined;
    this.RewardsView = undefined;
    this.Ieh = undefined;
    this.OnCreateDifficultyItem = () => new DifficultyItem();
    this.OnConfirmBtnClick = () => {
      this.HandleFastMoveAndTrack();
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
  OnStart() {
    this.H2o = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(16), this.OnCreateDifficultyItem);
    this.H2o.SetActive(false);
    super.OnStart();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(false);
    this.Ieh.SetUiActive(false);
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(false);
    this.GetItem(14).SetUIActive(false);
    this.GetText(36).SetUIActive(false);
    this.GetItem(25).SetUIActive(false);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.u2o = e;
    this.LayoutContext.MarkItem = e;
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaAndIconByConfigOrDynamicConfigMarkItem(this.LayoutContext);
    this.UpdateTopRightIconActive();
    this.Ieh.SetTxtRTxtColor("#ac8839");
    this.UpdateEnableFastMoveLayout();
    this.LYa();
  }
  LYa() {
    var e = this.u2o.MarkConfig;
    if (e.RelativeType === 1 && e.RelativeSubType === 5) {
      this.Zah();
    }
    if (this.u2o.TrackTarget === 109002516) {
      this.ehh();
    }
  }
  Zah() {
    var e = this.u2o.MarkConfig.RelativeId;
    var e = ModelManager_1.ModelManager.MingSuModel.GetDarkCoastDeliveryDataByLevelPlayId(e);
    var t = e.GetDarkCoastDeliveryGuardState();
    this.GetItem(14).SetUIActive(true);
    this.H2o.SetActive(true);
    this.H2o.RefreshByData([e]);
    var e = t === 3;
    var t = t === 4;
    this.GetItem(25).SetUIActive(e || t);
    this.GetText(36).SetUIActive(false);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(30), "DarkShoreBossRewardNotGet");
      this.GetText(30).SetColor(UE.Color.FromHex("#51340CFF"));
      this.GetSprite(34).SetColor(UE.Color.FromHex("#FFC9367F"));
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ComIconSign");
      this.SetSpriteByPath(e, this.GetSprite(35), false);
    }
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(30), "DarkShoreBossRewardGet");
      this.GetText(30).SetColor(UE.Color.FromHex("#00000099"));
      this.GetSprite(34).SetColor(UE.Color.FromHex("#3EC79C7F"));
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_AgreeFriend");
      this.SetSpriteByPath(e, this.GetSprite(35), false);
    }
  }
  ehh() {
    this.GetItem(14).SetUIActive(true);
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(true);
    this.Ieh.SetUiActive(true);
    this.Ieh.SetBtnHelpA2Active(false);
    this.Ieh.SetIconActive(false);
    var e = ModelManager_1.ModelManager.ExploreLevelModel.GetCountryExploreLevelData(WorldMapDefine_1.HUANG_LONG_COUNTRY_ID);
    var t = e !== undefined && e.CanLevelUp();
    this.GetItem(25).SetUIActive(t);
    var t = e.GetCurrentExploreLevelRewardData();
    this.Ieh.SetTxtLActive(true);
    this.Ieh.SetTxtLNewTxt("ExploreLv_Text");
    this.Ieh.SetTexIconActive(false);
    this.Ieh.SetIconActive(true);
    this.Ieh.SetIconSprite("SP_ComRoleMapLevel");
    this.Ieh.SetTxtRActive(true);
    this.Ieh.SetTxtRNewTxt("ExploreLv_Value", t.GetExploreLevel());
    this.Ieh.SetTxtRTxtColor("#ac8839");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(30), "ExploreRewardGet_Text");
    this.mZa();
  }
  mZa() {
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(true);
    this.GetItem(8).SetUIActive(true);
    var e = ModelManager_1.ModelManager.ExploreLevelModel.GetCountryExploreLevelData(WorldMapDefine_1.HUANG_LONG_COUNTRY_ID);
    var t = e.GetCurrentExploreLevelRewardData();
    var e = e.GetExploreLevelRewardData(t.GetExploreLevel() + 1);
    if (e) {
      var t = e.GetDropItemNumMap();
      var i = [];
      if (t) {
        for (var [r, a] of t) {
          r = [{
            IncId: 0,
            ItemId: r
          }, a];
          i.push(r);
        }
      }
      this.RewardsView.RebuildRewardsByData(i);
      this.RewardsView.SetTitleNewTxt("ExploreNextLv_Text");
    } else {
      this.RewardsView.RebuildRewardsByData([]);
      this.RewardsView.SetTitleNewTxt("ExploreLvFull_Text");
    }
  }
  OnBeforeDestroy() {
    this.H2o.ClearChildren();
    super.OnBeforeDestroy();
  }
}
exports.GeneralPanel = GeneralPanel;
class DifficultyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIText]];
  }
  Refresh(e, t, i) {
    var r = e.GetDarkCoastDeliveryGuardState() === 4 ? "T_MapDifficultyTick" : "T_MapDifficultyEmpty";
    var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(r);
    this.SetTextureByPath(r, this.GetTexture(1));
    this.GetText(0).SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "DarkShoreBossFirst_Text");
    this.GetItem(2).SetUIActive(true);
    this.GetText(3).SetUIActive(true);
    this.GetText(3).SetText(e.Config.RewardCount + "x");
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
//# sourceMappingURL=GeneralPanel.js.map