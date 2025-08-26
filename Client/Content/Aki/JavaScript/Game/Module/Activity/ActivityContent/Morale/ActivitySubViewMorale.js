"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewMorale = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const MoraleDefine_1 = require("../../../Morale/MoraleDefine");
const MoraleScoreProgressActivityPanel_1 = require("../../../Morale/View/MoraleScoreProgressActivityPanel");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
const RecommendQuestTipsSubPanel_1 = require("../DirectTrain/SubView/RecommendQuestTipsSubPanel");
class ActivitySubViewMorale extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = undefined;
    this.ScoreProgressPanel = undefined;
    this.FinishTipsSubPanel = undefined;
    this.Jk_ = () => {
      var e;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        UiManager_1.UiManager.OpenView("MoraleAreaSumView");
      } else {
        e = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", e);
      }
    };
    this.Jtu = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(MoraleDefine_1.MORALE_ACTIVITY_CLOSE_HELP_ID);
    };
    this.Ztu = e => {
      if (e === "MoraleAreaSumView") {
        this.UpdateTipsFinishNeedGetReward();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    this.CommonInfoPanel.SetClickFunc(this.Jk_);
    var e = this.GetItem(0).GetOwner();
    await this.CommonInfoPanel.CreateThenShowByActorAsync(e);
    this.CommonInfoPanel.HideRemainTime();
    this.CommonInfoPanel.SetBtnText("Morale_title_19");
    this.ScoreProgressPanel = new MoraleScoreProgressActivityPanel_1.MoraleScoreProgressActivityPanel();
    await this.ScoreProgressPanel.Init(this.GetItem(4));
    var e = this.GetItem(5);
    this.FinishTipsSubPanel = new RecommendQuestTipsSubPanel_1.RecommendQuestTipsSubPanel();
    await this.FinishTipsSubPanel.CreateByActorAsync(e.GetOwner());
    this.FinishTipsSubPanel.SetTipsTxtByTextId("Morale_title_33");
    this.FinishTipsSubPanel.BindClickBtnTipsCallBack(this.Jtu);
  }
  OnStart() {}
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.Ztu);
    this.CommonInfoPanel?.GetFunctional()?.FunctionButton?.BindRedDot("Morale");
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.Ztu);
    this.CommonInfoPanel?.GetFunctional()?.FunctionButton?.UnBindGivenUid(0);
  }
  OnRefreshView() {
    this.GetText(2)?.ShowTextNew("Morale_title_20");
    this.ScoreProgressPanel.UpdateData();
    this.UpdateTipsFinishNeedGetReward();
    this.UpdateGuideQuestState();
  }
  UpdateTipsFinishNeedGetReward() {
    var e = this.lIu();
    this.FinishTipsSubPanel.SetActive(e);
  }
  lIu() {
    return !!this.ActivityBaseData.IsUnLock() && !!this.ActivityBaseData.GetPreGuideQuestFinishState() && ModelManager_1.ModelManager.MoraleModel.IsProgressScoreReachTarget();
  }
  UpdateGuideQuestState() {
    var e;
    var i;
    if (this.ActivityBaseData.IsUnLock()) {
      e = this.ActivityBaseData.GetPreGuideQuestFinishState();
      this.GetItem(3).SetUIActive(e);
      if (!e) {
        this.CommonInfoPanel.SetBtnText("Morale_title_36");
        e = this.ActivityBaseData.GetPreShowGuideQuestName();
        (i = this.CommonInfoPanel?.GetFunctional())?.FunctionButton?.SetUiActive(true);
        i?.SetPanelConditionVisible(true);
        i?.SetLockSpriteVisible(false);
        i?.SetLockConditionButtonVisible(false);
        i?.SetLockTextByTextId("Morale_title_35", e);
      }
    }
  }
}
exports.ActivitySubViewMorale = ActivitySubViewMorale;
//# sourceMappingURL=ActivitySubViewMorale.js.map