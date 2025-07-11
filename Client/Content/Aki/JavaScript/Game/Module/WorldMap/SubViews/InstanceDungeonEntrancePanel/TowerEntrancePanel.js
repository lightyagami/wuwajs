"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerEntrancePanel = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TowerController_1 = require("../../../TowerDetailUi/TowerController");
const RewardItemBar_1 = require("../RewardItemBar");
const TipsListView_1 = require("../TipsListView");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const REWARD_ID = 3331;
const TIME_KEY = "time";
const DIFFICULT_KEY = "difficult";
const SCORE_KEY = "score";
class TowerEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.U2o = undefined;
    this.RewardsView = undefined;
    this.IRe = undefined;
    this.B2o = 0;
    this.b2o = 0;
    this.q2o = () => {
      this.G2o();
      this.N2o(this.B2o);
      this.u3e();
    };
  }
  GetResourceId() {
    return "UiView_Map_Tower_Tip_Prefab";
  }
  OnStart() {
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(true);
    this.U2o = new TipsListView_1.TipsListView();
    this.U2o.Initialize(this.GetVerticalLayout(5));
    this.RewardsView = new RewardItemBar_1.RewardItemBar();
    this.RewardsView.SetRootActor(this.GetItem(8).GetOwner(), true);
    super.OnStart();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetItem(25).SetUIActive(false);
    this.GetItem(32).SetUIActive(false);
  }
  OnShowWorldMapSecondaryUi(e) {
    var i = (this.LayoutContext.MarkItem = e).MarkConfig.RelativeId;
    var e = e.MarkConfigId;
    var i = i !== 0 ? i : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(e);
    var e = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlowId(i);
    this.B2o = e;
    this.u3e();
    this.jqe();
    this.N2o(e);
    this.G2o();
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
    var i = this.UpdateQuickGoto();
    this.ConfirmButton.SetActive(!i);
    this.jm();
    this.IRe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.q2o();
    }, TimeUtil_1.TimeUtil.InverseMillisecond);
    this.b2o = MathUtils_1.MathUtils.LongToNumber(ModelManager_1.ModelManager.TowerModel.TowerEndTime) - TimeUtil_1.TimeUtil.GetServerTime();
  }
  jqe() {
    var e;
    var i;
    var r = [];
    for ([e, i] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(REWARD_ID)?.DropPreview) {
      var t = [{
        IncId: 0,
        ItemId: e
      }, i];
      r.push(t);
    }
    if (r === undefined || r.length === 0) {
      this.RewardsView.SetActive(false);
    } else {
      this.RewardsView.SetActive(true);
      this.RewardsView.RebuildRewardsByData(r);
    }
  }
  G2o() {
    var e = this.U2o.AddItemByKey(DIFFICULT_KEY);
    var i = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty();
    e.SetHelpButtonVisible(false);
    e.SetLeftText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerProcess") ?? "");
    var i = ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(i);
    e.SetRightText(i);
  }
  u3e() {
    var e = ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData();
    var i = this.U2o.AddItemByKey(TIME_KEY);
    var r = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ActiveRemainTime_Text") ?? "", "");
    i.SetLeftText(r);
    i.SetRightText(e.CountDownText ?? "");
    i.SetHelpButtonVisible(false);
    this.b2o--;
    if (this.b2o < 2) {
      TowerController_1.TowerController.RefreshTower();
    }
  }
  N2o(e) {
    var i;
    var r;
    var t;
    if (e >= 4) {
      e = this.U2o.AddItemByKey(SCORE_KEY);
      i = (t = ModelManager_1.ModelManager.TowerModel).GetMaxDifficulty();
      r = t.GetDifficultyMaxStars(i);
      t = t.GetDifficultyAllStars(i);
      e.SetHelpButtonVisible(false);
      e.SetLeftText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerScore") ?? "");
      e.SetRightText(r + "/" + t);
      e.SetStarVisible(true);
    }
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
}
exports.TowerEntrancePanel = TowerEntrancePanel;
//# sourceMappingURL=TowerEntrancePanel.js.map