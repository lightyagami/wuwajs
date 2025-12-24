"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResMapEntrancePanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const RogueResDungeonConfigById_1 = require("../../../../Core/Define/ConfigQuery/RogueResDungeonConfigById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GenericLayoutAdd_1 = require("../../Util/GenericLayoutAdd");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RewardItemBar_1 = require("../../WorldMap/SubViews/RewardItemBar");
const TipsListView_1 = require("../../WorldMap/SubViews/TipsListView");
const WorldMapSecondaryUiLayoutA_1 = require("../../WorldMap/SubViews/WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../../WorldMap/SubViews/WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const ROGUE_SCORE_KEY = "rougeScore";
const ROGUE_TASK = "rougeTask";
const ROGUE_PROGRESS = "rougeProgress";
const ROGUE_TIME = "rogueTime";
class RogueResMapEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.RewardsView = undefined;
    this.tli = 0;
    this.u2o = undefined;
    this.U2o = undefined;
    this.IRe = undefined;
    this.Ftl = "{0}";
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
    var e = this.tli ? ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(this.tli) : undefined;
    if (e) {
      return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e);
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
      Log_1.Log.Error("InstanceDungeon", 77, "副本入口弹窗打开错误，副本入口表中找不到对应的地图标记Id！", ["MarkId", e.MarkConfigId]);
    }
  }
  OnCloseWorldMapSecondaryUi() {
    this?.U2o?.ClearChildren();
  }
  GetRemainTime() {
    var e = MathUtils_1.MathUtils.LongToNumber(ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskEndTime());
    return ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(e, this.Ftl) ?? "";
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
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().GetPreviewReward();
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
    if (!ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskIsEnd()) {
      this.h4i();
      this.qB1();
      if (this.IRe) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
      }
      this.IRe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
        this.h4i();
      }, 1000);
    }
    this.OB1();
    this.hea();
  }
  h4i() {
    if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData()) {
      let e = this.U2o.GetLayoutItemByKey(ROGUE_TIME);
      if (!e) {
        this.U2o.AddItemToLayout([ROGUE_TIME]);
        e = this.U2o.GetLayoutItemByKey(ROGUE_TIME);
      }
      e.SetIconVisible(false);
      e.SetStarVisible(false);
      var i = this.GetRemainTime();
      e.SetRightText(i);
      var i = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RogueRes_MapNote_4") ?? "", "");
      e.SetLeftText(i);
      e.SetHelpButtonVisible(false);
    }
  }
  OB1() {
    if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData()) {
      let e = this.U2o.GetLayoutItemByKey(ROGUE_PROGRESS);
      if (!e) {
        this.U2o.AddItemToLayout([ROGUE_PROGRESS]);
        e = this.U2o.GetLayoutItemByKey(ROGUE_PROGRESS);
      }
      e.SetIconVisible(false);
      e.SetStarVisible(false);
      var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId();
      var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetLatestDungeon(i);
      var i = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(i);
      var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Title);
      e.SetRightText(i);
      var i = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RogueRes_MapNote_1") ?? "", "");
      e.SetLeftText(i);
      e.SetHelpButtonVisible(false);
    }
  }
  qB1() {
    if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData()) {
      let e = this.U2o.GetLayoutItemByKey(ROGUE_TASK);
      if (!e) {
        this.U2o.AddItemToLayout([ROGUE_TASK]);
        e = this.U2o.GetLayoutItemByKey(ROGUE_TASK);
      }
      e.SetIconVisible(false);
      e.SetStarVisible(false);
      var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskCount();
      e.SetRightText(i[0] + "/" + i[1]);
      var i = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RogueRes_MapNote_2") ?? "", "");
      e.SetLeftText(i);
      e.SetHelpButtonVisible(false);
    }
  }
  hea() {
    var e;
    var i;
    if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData()) {
      this.U2o.AddItemToLayout([ROGUE_SCORE_KEY]);
      (e = this.U2o.GetLayoutItemByKey(ROGUE_SCORE_KEY)).SetIconVisible(false);
      e.SetStarVisible(false);
      i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId();
      i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetShopCount(i);
      i = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_Weekly_Rogue_Score") ?? "{0}", i[0] + "/" + i[1]);
      e.SetRightText(i);
      i = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RogueRes_MapNote_3") ?? "", "");
      e.SetLeftText(i);
      e.SetHelpButtonVisible(false);
    }
  }
}
exports.RogueResMapEntrancePanel = RogueResMapEntrancePanel;
//# sourceMappingURL=RogueResMapEntrancePanel.js.map