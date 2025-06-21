"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivitySubViewMorale = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  MoraleDefine_1 = require("../../../Morale/MoraleDefine"),
  MoraleScoreProgressActivityPanel_1 = require("../../../Morale/View/MoraleScoreProgressActivityPanel"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo"),
  RecommendQuestTipsSubPanel_1 = require("../DirectTrain/SubView/RecommendQuestTipsSubPanel");
class ActivitySubViewMorale extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments), this.ActivityBaseData = void 0, this.CommonInfoPanel = void 0, this.ScoreProgressPanel = void 0, this.FinishTipsSubPanel = void 0, this.Jk_ = () => {
      var e;
      this.ActivityBaseData.GetPreGuideQuestFinishState() ? UiManager_1.UiManager.OpenView("MoraleAreaSumView") : (e = this.ActivityBaseData.GetUnFinishPreGuideQuestId(), UiManager_1.UiManager.OpenView("QuestView", e))
    }, this.Peu = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(MoraleDefine_1.MORALE_ACTIVITY_CLOSE_HELP_ID)
    }, this.xeu = e => {
      "MoraleAreaSumView" === e && this.UpdateTipsFinishNeedGetReward()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(), this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo, this.CommonInfoPanel.SetData(this.ActivityBaseData), this.CommonInfoPanel.SetClickFunc(this.Jk_), this.CommonInfoPanel.HideRemainTime();
    var e = this.GetItem(0).GetOwner(),
      e = (await this.CommonInfoPanel.CreateThenShowByActorAsync(e), this.CommonInfoPanel.SetBtnText("Morale_title_19"), this.ScoreProgressPanel = new MoraleScoreProgressActivityPanel_1.MoraleScoreProgressActivityPanel, await this.ScoreProgressPanel.Init(this.GetItem(4)), this.GetItem(5));
    this.FinishTipsSubPanel = new RecommendQuestTipsSubPanel_1.RecommendQuestTipsSubPanel, await this.FinishTipsSubPanel.CreateByActorAsync(e.GetOwner()), this.FinishTipsSubPanel.SetTipsTxtByTextId("Morale_title_33"), this.FinishTipsSubPanel.BindClickBtnTipsCallBack(this.Peu)
  }
  OnStart() {}
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.xeu), this.CommonInfoPanel?.GetFunctional()?.FunctionButton?.BindRedDot("Morale")
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.xeu), this.CommonInfoPanel?.GetFunctional()?.FunctionButton?.UnBindGivenUid(0)
  }
  OnRefreshView() {
    this.GetText(2)?.ShowTextNew("Morale_title_20"), this.ScoreProgressPanel.UpdateData(), this.UpdateTipsFinishNeedGetReward(), this.UpdateGuideQuestState()
  }
  UpdateTipsFinishNeedGetReward() {
    var e = this.Ouu();
    this.FinishTipsSubPanel.SetActive(e)
  }
  Ouu() {
    return !!this.ActivityBaseData.IsUnLock() && !!this.ActivityBaseData.GetPreGuideQuestFinishState() && ModelManager_1.ModelManager.MoraleModel.IsProgressScoreReachTarget()
  }
  UpdateGuideQuestState() {
    var e, i;
    this.ActivityBaseData.IsUnLock() && (e = this.ActivityBaseData.GetPreGuideQuestFinishState(), this.GetItem(3).SetUIActive(e), e || (this.CommonInfoPanel.SetBtnText("Morale_title_36"), e = this.ActivityBaseData.GetPreShowGuideQuestName(), (i = this.CommonInfoPanel?.GetFunctional())?.FunctionButton?.SetUiActive(!0), i?.SetPanelConditionVisible(!0), i?.SetLockSpriteVisible(!1), i?.SetLockConditionButtonVisible(!1), i?.SetLockTextByTextId("Morale_title_35", e)))
  }
}
exports.ActivitySubViewMorale = ActivitySubViewMorale;
//# sourceMappingURL=ActivitySubViewMorale.js.map