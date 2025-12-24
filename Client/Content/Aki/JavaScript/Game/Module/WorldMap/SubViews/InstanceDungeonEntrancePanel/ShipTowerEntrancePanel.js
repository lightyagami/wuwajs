"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerEntrancePanel = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ShipTowerDefine_1 = require("../../../ShipTower/ShipTowerDefine");
const RewardItemBar_1 = require("../RewardItemBar");
const TipsListView_1 = require("../TipsListView");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const TIME_KEY = "time";
const REWARD_PROGRESS_KEY = "score";
class ShipTowerEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.U2o = undefined;
    this.RewardsView = undefined;
    this.IRe = undefined;
    this.Tec = false;
    this.q2o = () => {
      this.u3e();
    };
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(true);
    this.U2o = new TipsListView_1.TipsListView();
    this.U2o.Initialize(this.GetVerticalLayout(5));
    this.RewardsView = new RewardItemBar_1.RewardItemBar();
    var e = this.GetItem(8);
    await this.RewardsView.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnStart() {
    super.OnStart();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetItem(25)?.SetUIActive(false);
    this.GetItem(32)?.SetUIActive(false);
    this.RewardsView.SetActive(false);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.LayoutContext.MarkItem = e;
    this.jqe();
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
    e = this.UpdateQuickGoto();
    this.LayoutContext?.SetConfirmBtnActive(!e);
    e = ModelManager_1.ModelManager.ShipTowerModel.IsOpen();
    this.bec(e);
  }
  u3e() {
    var e = ModelManager_1.ModelManager.ShipTowerModel.GetSeasonCountDownData();
    var i = this.U2o.AddItemByKey(TIME_KEY);
    var r = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("GhostShipTimeProgress_Text") ?? "", "");
    i.SetLeftText(r);
    i.SetRightText(e.CountDownText ?? "");
    i.SetHelpButtonVisible(false);
    if (ModelManager_1.ModelManager.ShipTowerModel?.TimeIsOver()) {
      this.Lec();
    }
  }
  bec(e) {
    this.GetItem(14).SetUIActive(e);
    this.jm();
    if (e) {
      this.u3e();
      this.jG_();
      this.IRe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
        this.q2o();
      }, TimeUtil_1.TimeUtil.InverseMillisecond);
    }
  }
  async Lec() {
    if (!this.Tec) {
      this.Tec = true;
      await ModelManager_1.ModelManager.ShipTowerModel.CheckInitProto();
      this.jG_();
      this.u3e();
      this.Tec = false;
    }
  }
  jG_() {
    var e = this.U2o.AddItemByKey(REWARD_PROGRESS_KEY);
    var i = ModelManager_1.ModelManager.ShipTowerModel.GetRewardProgressText(false);
    var r = ModelManager_1.ModelManager.ShipTowerModel.GetCurrentStageSeasonName();
    e.SetHelpButtonVisible(false);
    e.SetLeftText(r);
    e.SetRightText(i);
    e.SetStarVisible(false);
  }
  OnCloseWorldMapSecondaryUi() {
    this.U2o.Clear();
    this.jm();
  }
  jm() {
    if (this.IRe && TimerSystem_1.GameplayTimerSystem.Has(this.IRe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
      this.IRe = undefined;
    }
  }
  OnBeforeDestroy() {
    this.jm();
    this.RewardsView.Destroy();
    this.U2o.Clear();
    super.OnBeforeDestroy();
  }
  jqe() {
    var e;
    var i;
    var r = CommonParamById_1.configCommonParamById.GetIntConfig("GhostShipReward") ?? 1;
    var t = [];
    for ([e, i] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(r)?.DropPreview) {
      var a = [{
        IncId: 0,
        ItemId: e
      }, i];
      t.push(a);
    }
    if (t === undefined || t.length === 0) {
      this.RewardsView.SetActive(false);
    } else {
      this.RewardsView.SetActive(true);
      this.RewardsView.RebuildRewardsByData(t);
      this.RewardsView.SetTitleNewTxt(ShipTowerDefine_1.shipTowerTextKey.MapMarkRewardTitle);
    }
  }
}
exports.ShipTowerEntrancePanel = ShipTowerEntrancePanel;
//# sourceMappingURL=ShipTowerEntrancePanel.js.map