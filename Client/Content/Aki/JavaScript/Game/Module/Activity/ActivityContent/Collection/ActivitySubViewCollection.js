"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewCollection = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const QuestController_1 = require("../../../QuestNew/Controller/QuestController");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityProgressComponent_1 = require("../UniversalComponents/Content/ActivityProgressComponent");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalArea_1 = require("../UniversalComponents/Functional/ActivityFunctionalArea");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySubViewCollection extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.RNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.PNe = false;
    this.xNe = 0;
    this.wNe = t => {
      if (t === this.ActivityBaseData.Id) {
        this.BNe();
      }
    };
    this.DSe = t => {
      if (this.ActivityBaseData.QuestStateMap.get(t)) {
        this.bNe();
        this.qNe();
        this.GNe();
      }
    };
    this.NNe = () => {
      var t = this.ActivityBaseData.GetAllRewardQuestDataList();
      UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", t);
    };
    this.ONe = () => {
      switch (this.ActivityBaseData.GetProgressState()) {
        case 0:
          {
            const e = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
            var t = () => {
              var t = {
                MarkId: ModelManager_1.ModelManager.QuestNewModel.TryGetMapMarkIdByQuestId(e),
                MarkType: 12,
                OpenFogId: 0
              };
              WorldMapController_1.WorldMapController.OpenView(2, false, t);
            };
            if (!ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(e)) {
              QuestController_1.QuestNewController.RequestTrackQuest(e, true, 2, 0, t);
              break;
            }
            t();
            break;
          }
        case 1:
          var [t] = this.ActivityBaseData.GetCurrentProgress();
          var t = {
            MarkId: ConfigManager_1.ConfigManager.ActivityCollectionConfig.GetActivityCollectionConfig(t + 1).MarkId,
            MarkType: 0,
            OpenFogId: 0
          };
          WorldMapController_1.WorldMapController.OpenView(2, false, t);
          var t = this.ActivityBaseData.GetCurrentProgressQuestId();
          ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.ActivityBaseData.Id, t, 0, 0, 0);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id);
          break;
        case 2:
          t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CollectActivity_prompt_finish");
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    var t = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.LNe.CreateThenShowByActorAsync(t.GetOwner());
    var t = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    await this.DNe.CreateThenShowByActorAsync(t.GetOwner());
    var t = this.GetItem(2);
    this.RNe = new ActivityProgressComponent_1.ActivityProgressComponents();
    await this.RNe.CreateThenShowByActorAsync(t.GetOwner());
    var t = this.GetItem(3);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    await this.UNe.CreateThenShowByActorAsync(t.GetOwner());
    var t = this.GetItem(4);
    this.ANe = new ActivityFunctionalArea_1.ActivityFunctionalArea(this.ActivityBaseData);
    await this.ANe.CreateThenShowByActorAsync(t.GetOwner());
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(5));
  }
  OnStart() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    this.DNe.SetUiActive(false);
    this.kNe();
    this.OnRefreshView();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  OnRefreshView() {
    this.bNe();
    this.FNe();
    this.qNe();
    this.VNe();
    this.BNe();
    this.GNe();
  }
  GNe() {
    var t;
    if (this.ActivityBaseData.IsHasNewQuestRedDot()) {
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CollectionAtivity_NewQuest");
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
    }
  }
  OnTimer(t) {
    this.FNe();
  }
  bNe() {
    this.ActivityBaseData.RefreshRewardData();
  }
  FNe() {
    var [t, e] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(t);
    if (t) {
      this.LNe.SetTimeTextByText(e);
    }
    if (this.PNe) {
      this.RNe?.SetDescriptionByTextId("CollectionAtivity_AcceptQuestTime", this.HNe(this.xNe));
    }
  }
  qNe() {
    var [t] = this.ActivityBaseData.GetCurrentProgress();
    var e = this.ActivityBaseData.GetTotalProgress();
    var i = this.ActivityBaseData.GetCurrentProgressQuestId();
    var s = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(i)?.TidName;
    var r = s ? PublicUtil_1.PublicUtil.GetConfigTextByKey(s) : "";
    this.RNe?.SetProgressPercent(t / e);
    var s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ItemShow_Text");
    this.RNe?.SetProgressTextByText(StringUtils_1.StringUtils.Format(s, t.toString(), e.toString()));
    this.RNe?.SetTitleByTextId("CollectActivity_schedule");
    switch (this.ActivityBaseData.GetProgressState()) {
      case 0:
        var n = this.ActivityBaseData.GetPreShowGuideQuestName();
        this.RNe?.SetDescriptionByText(n);
        break;
      case 1:
        var o;
        var n = this.ActivityBaseData.QuestStateMap.get(i);
        if (n) {
          o = n.QuestUnlockStamp - TimeUtil_1.TimeUtil.GetServerTime();
          if (n.QuestState === 2 || o < 0) {
            this.RNe?.SetDescriptionByText(r);
            this.PNe = false;
          } else {
            this.xNe = n.QuestUnlockStamp;
            this.RNe?.SetDescriptionByTextId("CollectionAtivity_AcceptQuestTime", this.HNe(this.xNe));
            this.PNe = true;
          }
        }
        break;
      case 2:
        this.RNe?.SetDescriptionByTextId("CollectActivity_state_finish");
    }
  }
  HNe(t) {
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    var t = Math.max(t - e, TimeUtil_1.TimeUtil.Minute);
    var e = this.jNe(t);
    return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t, e[0], e[1]).CountDownText ?? "";
  }
  jNe(t) {
    if (t > CommonDefine_1.SECOND_PER_DAY) {
      return [3, 2];
    } else if (t > CommonDefine_1.SECOND_PER_HOUR) {
      return [2, 2];
    } else {
      return [1, 1];
    }
  }
  kNe() {
    var t = this.ActivityBaseData.GetPreviewReward();
    this.UNe.SetTitleByTextId("CollectActivity_reward");
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    this.UNe.RefreshItemLayout(t);
  }
  VNe() {
    var t = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!t);
    if (!t) {
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
    this.ANe.SetRewardButtonVisible(t);
    if (t) {
      this.ANe.SetRewardButtonFunction(this.NNe);
    }
    this.ANe.FunctionButton.SetUiActive(t);
    if (t) {
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CollectActivity_Button_ahead");
      this.ANe.FunctionButton.SetText(t);
      this.ANe.FunctionButton.SetFunction(this.ONe);
    }
  }
  BNe() {
    var t = this.ActivityBaseData.IsHasRewardRedPoint();
    this.ANe.SetRewardRedDotVisible(t);
    var t = this.ActivityBaseData.IsHasNewQuestRedDot();
    this.ANe.FunctionButton.SetRedDotVisible(t);
  }
  PlaySubViewSequence(t) {
    this.WNe();
  }
  WNe() {
    var [t] = this.ActivityBaseData.GetCurrentProgress();
    var t = "Shape0" + t;
    if (this.LevelSequencePlayer.GetCurrentSequence() === t) {
      this.LevelSequencePlayer.ReplaySequenceByKey(t);
    } else {
      this.LevelSequencePlayer.PlayLevelSequenceByName(t, false);
    }
  }
}
exports.ActivitySubViewCollection = ActivitySubViewCollection;
//# sourceMappingURL=ActivitySubViewCollection.js.map