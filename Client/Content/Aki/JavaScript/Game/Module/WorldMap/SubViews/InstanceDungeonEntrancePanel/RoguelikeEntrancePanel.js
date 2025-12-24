"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeEntrancePanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityRogueController_1 = require("../../../Activity/ActivityContent/RougeActivity/ActivityRogueController");
const GenericLayoutAdd_1 = require("../../../Util/GenericLayoutAdd");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RewardItemBar_1 = require("../RewardItemBar");
const TipsListView_1 = require("../TipsListView");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const ROGUE_SCORE_KEY = "rougeScore";
const ROGUE_TIME = "rogueTime";
const ROGUE_ACHIEVEMENT_PROGRESS = "rogueAchievementProgress";
const ROGUE_DIFFICULTY_PROGRESS = "rogueDifficultyProgress";
class RoguelikeEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.tli = 0;
    this.u2o = undefined;
    this.U2o = undefined;
    this.IRe = undefined;
    this.RewardsView = undefined;
    this.OnInstanceRefresh = (e, t, i, r) => {
      var o = new TipsListView_1.InstanceDungeonCostTip();
      o.SetRootActor(t.GetOwner(), true);
      return {
        Key: e,
        Value: o
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
    this.u2o = e;
    var t = (this.LayoutContext.MarkItem = e).MarkConfig.RelativeId;
    var i = e.MarkConfigId;
    this.tli = t !== 0 ? t : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(i);
    if (this.tli) {
      this.SHe();
      this.x2o();
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
      if ((t = this.P2o.UnLockCondition) && !ModelManager_1.ModelManager.FunctionModel.IsOpen(t)) {
        i = ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(t);
        t = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(i.OpenConditionId);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.HintText);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InstanceDungeon", 16, "副本入口弹窗打开错误，副本入口表中找不到对应的地图标记Id！", ["MarkId", e.MarkConfigId]);
    }
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
      this.LayoutContext?.SetConfirmBtnActive(!e);
    }
  }
  jqe() {
    var e = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()?.GetPreviewReward();
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
    var e = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetInstanceDungeonEntranceFlowId(this.tli);
    this.jqe();
    if (e === 6) {
      if (ModelManager_1.ModelManager.RoguelikeModel?.CheckRogueIsOpen()) {
        this.h4i();
        this.sea();
        this.aea();
        this.hea();
        if (this.IRe) {
          TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
        }
        this.IRe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
          this.h4i();
        }, 1000);
      } else {
        this.WTt();
      }
    }
  }
  WTt() {
    this.U2o.AddItemToLayout([ROGUE_SCORE_KEY]);
    var e = this.U2o.GetLayoutItemByKey(ROGUE_SCORE_KEY);
    e.SetIconVisible(false);
    e.SetStarVisible(false);
    e.SetRightText("");
    e.SetLeftText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Rogue_Function_End_Tip"));
    e.SetHelpButtonVisible(false);
  }
  h4i() {
    if (ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()?.SeasonData) {
      let e = this.U2o.GetLayoutItemByKey(ROGUE_TIME);
      if (!e) {
        this.U2o.AddItemToLayout([ROGUE_TIME]);
        e = this.U2o.GetLayoutItemByKey(ROGUE_TIME);
      }
      e.SetIconVisible(false);
      e.SetStarVisible(false);
      var t = this.GetRemainTime();
      e.SetRightText(t);
      var t = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_Rogue_Time") ?? "", "");
      e.SetLeftText(t);
      e.SetHelpButtonVisible(false);
    }
  }
  sea() {
    var t = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()?.SeasonData;
    if (t) {
      this.U2o.AddItemToLayout([ROGUE_DIFFICULTY_PROGRESS]);
      var i = this.U2o.GetLayoutItemByKey(ROGUE_DIFFICULTY_PROGRESS);
      i.SetIconVisible(false);
      i.SetStarVisible(false);
      var t = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueSeasonConfigById(t.UHn);
      var t = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetConfig(t.InstanceDungeonEntrance);
      let e = 0;
      for (const r of t.InstanceDungeonList) {
        if (!ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(r)) {
          e = r;
          break;
        }
      }
      if (e === 0) {
        e = t.InstanceDungeonList.pop();
      }
      t = ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(e);
      i.SetRightText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.DifficultyDesc[0]));
      t = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_Rogue_Difficulty_Process") ?? "", "");
      i.SetLeftText(t);
      i.SetHelpButtonVisible(false);
    }
  }
  aea() {
    var e = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()?.SeasonData;
    if (e) {
      this.U2o.AddItemToLayout([ROGUE_ACHIEVEMENT_PROGRESS]);
      var r = this.U2o.GetLayoutItemByKey(ROGUE_ACHIEVEMENT_PROGRESS);
      r.SetIconVisible(false);
      r.SetStarVisible(false);
      var e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(e.UHn);
      var e = ModelManager_1.ModelManager.AchievementModel.GetAchievementCategoryGroups(e.Achievement);
      let t = 0;
      let i = 0;
      e.forEach(e => {
        e = ModelManager_1.ModelManager.AchievementModel.GetAchievementGroupData(e.GetId());
        if (e) {
          t += e.GetCurrentProgress();
          i += e.GetMaxProgress();
        }
      });
      e = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_Rogue_Score") ?? "{0}/{1}", t.toString(), i.toString());
      r.SetRightText(e);
      e = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_Rogue_Achievement_Count") ?? "", "");
      r.SetLeftText(e);
      r.SetHelpButtonVisible(false);
    }
  }
  hea() {
    var e;
    var t;
    var i = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()?.SeasonData;
    if (i) {
      this.U2o.AddItemToLayout([ROGUE_SCORE_KEY]);
      (e = this.U2o.GetLayoutItemByKey(ROGUE_SCORE_KEY)).SetIconVisible(false);
      e.SetStarVisible(false);
      t = ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId()?.WeekTokenMaxCount ?? 1;
      i = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_Rogue_Score") ?? "{0}/{1}", i.yqs.toString(), t.toString());
      e.SetRightText(i);
      t = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_Rogue_Week_Score") ?? "", "");
      e.SetLeftText(t);
      e.SetHelpButtonVisible(false);
    }
  }
  OnCloseWorldMapSecondaryUi() {
    this?.U2o?.ClearChildren();
  }
  GetGuideFocusUiItem() {
    return this.GetButton(11).GetOwner().GetComponentByClass(UE.UIItem.StaticClass());
  }
  GetRemainTime() {
    var e = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData();
    var t = e.CheckIfInShowTime();
    var i = e.CheckIfInOpenTime();
    if (!i && !t) {
      return ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("ActiveClose");
    }
    var t = e.EndOpenTime;
    var r = e.EndShowTime;
    let o = 0;
    o = e.EndOpenTime !== 0 && i ? t : r;
    e = TimeUtil_1.TimeUtil.GetServerTime();
    i = Math.max(o - e, 1);
    t = this.FOe(i);
    return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(i, t[0], t[1]).CountDownText ?? "";
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
exports.RoguelikeEntrancePanel = RoguelikeEntrancePanel;
//# sourceMappingURL=RoguelikeEntrancePanel.js.map