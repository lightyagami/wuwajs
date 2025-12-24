"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerEntrancePanel = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RewardItemBar_1 = require("../RewardItemBar");
const TipsListView_1 = require("../TipsListView");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const TIME_KEY = "time";
const NORMAL_KEY = "normal";
const ENDLESS_KEY = "endless";
class WheelTowerEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.U2o = undefined;
    this.RewardsView = undefined;
    this.IRe = undefined;
    this.q2o = () => {
      this.G2o();
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
    this.LayoutContext.MarkItem = e;
    this.u3e();
    this.G2o();
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
    e = this.UpdateQuickGoto();
    this.LayoutContext?.SetConfirmBtnActive(!e);
    this.jm();
    this.IRe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.q2o();
    }, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  G2o() {
    var e = ModelManager_1.ModelManager.WheelTowerModel;
    var i = this.U2o.AddItemByKey(NORMAL_KEY);
    i.SetHelpButtonVisible(false);
    i.SetLeftText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("WheelBattleMode_NormalProgress") ?? "");
    i.SetStarVisible(false);
    var r = e.ActivityData.GetCurrentRewardProgress(1);
    var t = e.ActivityData.GetTotalRewardProgress(1);
    i.SetRightText(r + "/" + t);
    var i = this.U2o.AddItemByKey(ENDLESS_KEY);
    i.SetHelpButtonVisible(false);
    i.SetLeftText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("WheelBattleMode_EndlessProgress") ?? "");
    i.SetStarVisible(false);
    var r = e.ActivityData.GetCurrentRewardProgress(2);
    var t = e.ActivityData.GetTotalRewardProgress(2);
    i.SetRightText(r + "/" + t);
  }
  u3e() {
    var e = ModelManager_1.ModelManager.WheelTowerModel.GetSeasonCountDownData();
    var i = this.U2o.AddItemByKey(TIME_KEY);
    var r = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ActiveRemainTime_Text") ?? "", "");
    i.SetLeftText(r);
    i.SetRightText(e.CountDownText ?? "");
    i.SetHelpButtonVisible(false);
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
exports.WheelTowerEntrancePanel = WheelTowerEntrancePanel;
//# sourceMappingURL=WheelTowerEntrancePanel.js.map