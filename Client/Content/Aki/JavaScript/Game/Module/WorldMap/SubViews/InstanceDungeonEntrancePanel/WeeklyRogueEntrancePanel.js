"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueEntrancePanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GenericLayoutAdd_1 = require("../../../Util/GenericLayoutAdd");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RewardItemBar_1 = require("../RewardItemBar");
const TipsListView_1 = require("../TipsListView");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const ROGUE_SCORE_KEY = "rougeScore";
const ROGUE_TIME = "rogueTime";
class WeeklyRogueEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.RewardsView = undefined;
    this.tli = 0;
    this.u2o = undefined;
    this.U2o = undefined;
    this.IRe = undefined;
    this.OnInstanceRefresh = (e, i, t, r) => {
      var a = new TipsListView_1.InstanceDungeonCostTip();
      a.SetRootActor(i.GetOwner(), true);
      return {
        Key: e,
        Value: a
      };
    };
  }
  get P2o() {
    if (this.tli) {
      return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(this.tli);
    } else {
      return undefined;
    }
  }
  GetResourceId() {
    return "UiView_InstanceEntranceTip_Prefab";
  }
  GetGuideFocusUiItem() {
    return this.GetButton(11).GetOwner().GetComponentByClass(UE.UIItem.StaticClass());
  }
  async OnBeforeStartAsync() {
    this.RewardsView = new RewardItemBar_1.RewardItemBar();
    await this.RewardsView.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
    return super.OnBeforeStartAsync();
  }
  OnStart() {
    this.GetVerticalLayout(5)?.RootUIComp.SetUIActive(true);
    this.U2o = new GenericLayoutAdd_1.GenericLayoutAdd(this.GetVerticalLayout(5), this.OnInstanceRefresh);
    super.OnStart();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetItem(32).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.U2o.ClearChildren();
    if (this.IRe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
    }
    super.OnBeforeDestroy();
  }
  OnShowWorldMapSecondaryUi(e) {
    var i;
    this.u2o = e;
    this.LayoutContext.MarkItem = e;
    this.tli = this.u2o.MarkConfigId;
    if (this.tli) {
      this.SHe();
      this.x2o();
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
      if ((i = this.P2o.UnLockCondition) && !ModelManager_1.ModelManager.FunctionModel.IsOpen(i)) {
        i = ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(i);
        i = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(i.OpenConditionId);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.HintText);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InstanceDungeon", 16, "副本入口弹窗打开错误，副本入口表中找不到对应的地图标记Id！", ["MarkId", e.MarkConfigId]);
    }
  }
  OnCloseWorldMapSecondaryUi() {
    this?.U2o?.ClearChildren();
  }
  GetRemainTime() {
    var e = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleRemainTime();
    var i = this.FOe(e);
    return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, i[0], i[1]).CountDownText ?? "";
  }
  SHe() {
    var e = this.P2o;
    if (e) {
      this.GetText(4).ShowTextNew(e.Description);
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIcon(this.LayoutContext);
      this.GetText(1).ShowTextNew(e.Name);
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
      this.GetItem(9).SetUIActive(!this.u2o.IsFogUnlock);
      this.GetText(10).ShowTextNew("Instance_Dungeon_Rcommand_Text");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(36), "Instance_RogueInstanceEntrance_Progress");
      e = this.UpdateQuickGoto();
      this.ConfirmButton.SetActive(!e);
    }
  }
  jqe() {
    var e = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetPreviewReward();
    if (e === undefined || e.length === 0) {
      this.GetItem(8).SetUIActive(false);
    } else {
      (e = e.slice(0, 5)).forEach(e => {
        e[1] = 0;
      });
      this.GetItem(8).SetUIActive(true);
      this.RewardsView.RebuildRewardsByData(e);
    }
  }
  x2o() {
    this.jqe();
    this.h4i();
    this.hea();
    if (this.IRe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
    }
    this.IRe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.h4i();
    }, 1000);
  }
  h4i() {
    if (ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData) {
      let e = this.U2o.GetLayoutItemByKey(ROGUE_TIME);
      if (!e) {
        this.U2o.AddItemToLayout([ROGUE_TIME]);
        e = this.U2o.GetLayoutItemByKey(ROGUE_TIME);
      }
      e.SetIconVisible(false);
      e.SetStarVisible(false);
      var i = this.GetRemainTime();
      e.SetRightText(i);
      var i = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_Rogue_Time") ?? "", "");
      e.SetLeftText(i);
      e.SetHelpButtonVisible(false);
    }
  }
  hea() {
    var e;
    var i = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData;
    if (i) {
      this.U2o.AddItemToLayout([ROGUE_SCORE_KEY]);
      (e = this.U2o.GetLayoutItemByKey(ROGUE_SCORE_KEY)).SetIconVisible(false);
      e.SetStarVisible(false);
      i = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("WeRogueMapScoreText") ?? "{0}", i.Score.toString(), i.GetCycleConfig().MaxScore.toString());
      e.SetRightText(i);
      i = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_Weekly_Rogue_Week_Score") ?? "", "");
      e.SetLeftText(i);
      e.SetHelpButtonVisible(false);
    }
  }
  FOe(e) {
    if (e > CommonDefine_1.SECOND_PER_DAY) {
      return [3, 2];
    } else if (e > CommonDefine_1.SECOND_PER_HOUR) {
      return [2, 1];
    } else if (e > CommonDefine_1.SECOND_PER_MINUTE) {
      return [1, 0];
    } else {
      return [0, 0];
    }
  }
}
exports.WeeklyRogueEntrancePanel = WeeklyRogueEntrancePanel;
//# sourceMappingURL=WeeklyRogueEntrancePanel.js.map