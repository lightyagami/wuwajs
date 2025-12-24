"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FragmentMemorySubView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const FragmentMemoryData_1 = require("../../../FragmentMemory/FragmentMemoryData");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const HIDEVIEW01DELAY = 600;
const HIDEVIEWDELAY = 600;
const FRAGMENTMEMORYMASK = "FragmentMemoryMask";
const START01 = "Start01";
class FragmentMemorySubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.YPn = undefined;
    this.JPn = undefined;
    this.zPn = () => {
      var e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeActivityViewNeedBlurState, false);
      ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(this.ActivityBaseData);
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        const t = ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryActivityById(this.ActivityBaseData.Id);
        const i = ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(t.TopicId);
        if (i) {
          this.LevelSequencePlayer?.PlaySequencePurely("HideView01");
          UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, true);
          TimerSystem_1.GameplayTimerSystem.Delay(() => {
            ModelManager_1.ModelManager.FragmentMemoryModel.SaveTopicOpened(t.TopicId);
            ModelManager_1.ModelManager.FragmentMemoryModel.MemoryFragmentMainViewTryPlayAnimation = "Start02";
            var e = new FragmentMemoryData_1.FragmentMemoryMainViewOpenData();
            e.FragmentMemoryTopicData = i;
            UiManager_1.UiManager.OpenView("MemoryFragmentMainView", e);
            UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, false);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id);
          }, HIDEVIEW01DELAY);
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("FragmentMemory", 27, "FragmentMemorySubView.OnFragmentMemoryButtonClick", ["topicData is null", t.TopicId]);
        }
      } else {
        e = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", e);
      }
    };
    this.ZPn = () => {
      ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(this.ActivityBaseData);
      const e = ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryActivityById(this.ActivityBaseData.Id);
      this.LevelSequencePlayer?.PlaySequencePurely("HideView02");
      UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, true);
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        UiManager_1.UiManager.OpenView("MemoryDetailView", e?.TopicId);
        UiLayer_1.UiLayer.SetShowMaskLayer(FRAGMENTMEMORYMASK, false);
      }, HIDEVIEWDELAY);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    var t = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    var i = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    var r = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await Promise.all([this.LNe.CreateThenShowByActorAsync(e.GetOwner()), this.DNe.CreateThenShowByActorAsync(t.GetOwner()), this.UNe.CreateThenShowByActorAsync(i.GetOwner()), this.ANe.CreateThenShowByActorAsync(r.GetOwner())]);
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    this.YPn = new ButtonItem_1.ButtonItem(this.GetItem(4));
    this.JPn = new ButtonItem_1.ButtonItem(this.GetItem(5));
    this.YPn.SetFunction(this.zPn);
    this.JPn.SetFunction(this.ZPn);
  }
  OnSequenceClose(e) {}
  OnStart() {}
  OnBeforeShow() {
    this.XGn();
  }
  OnBeforeHide() {
    ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation = "";
    this._Dn();
  }
  OnRefreshView() {
    if (this.ActivityBaseData.LocalConfig) {
      this.Pqe();
      this.mGe();
      this.jqe();
      this.VNe();
      this._Oe();
      this.ZGe();
      this.KGn();
      this.QGn();
      this.XGn();
      this.K8e();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id);
    }
  }
  XGn() {
    if (StringUtils_1.StringUtils.IsEmpty(ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation)) {
      if (this.LevelSequencePlayer?.GetCurrentSequence() === START01) {
        this.LevelSequencePlayer?.StopSequenceByKey(START01);
        this.LevelSequencePlayer?.ReplaySequenceByKey(START01);
      } else {
        this.LevelSequencePlayer?.PlaySequencePurely(START01);
      }
    } else {
      this.LevelSequencePlayer?.PlaySequencePurely(ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation);
      ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation = "";
    }
  }
  K8e() {
    var e = this.ActivityBaseData;
    this.YPn?.UnBindRedDot();
    this.YPn?.BindRedDot("FragmentMemoryTopic", e.GetCurrentTopicId());
  }
  _Dn() {
    this.YPn?.UnBindRedDot();
  }
  _Oe() {
    var e = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!e);
    if (!e) {
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
  }
  ZGe() {
    var e = this.ActivityBaseData.IsUnLock();
    this.YPn.SetActive(e);
    this.JPn.SetActive(e);
  }
  mGe() {
    this.LNe.SetActivityBaseData(this.ActivityBaseData);
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    var [e, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(e);
    if (e) {
      this.LNe.SetTimeTextByText(t);
    }
  }
  OnTimer(e) {
    this.mGe();
  }
  Pqe() {
    var e = this.ActivityBaseData.LocalConfig;
    var t = e.DescTheme;
    var e = e.Desc;
    var i = !StringUtils_1.StringUtils.IsEmpty(t);
    this.LNe.SetSubTitleVisible(i);
    if (i) {
      this.LNe.SetSubTitleByTextId(t);
    }
    this.DNe.SetContentByTextId(e);
  }
  jqe() {
    var e = this.ActivityBaseData.GetPreviewReward();
    this.UNe.SetTitleByTextId("FragmentMemoryCollectReward");
    this.UNe.RefreshItemLayout(e);
  }
  VNe() {
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FragmentMemoryEnterText");
    this.ANe.FunctionButton.SetText(e);
  }
  KGn() {
    var e = this.ActivityBaseData.IsUnLock();
    this.YPn?.SetActive(e);
  }
  QGn() {
    var e = this.ActivityBaseData.GetPreGuideQuestFinishState();
    var t = this.ActivityBaseData.IsUnLock();
    this.JPn?.SetActive(t && e);
  }
}
exports.FragmentMemorySubView = FragmentMemorySubView;
//# sourceMappingURL=FragmentMemorySubView.js.map