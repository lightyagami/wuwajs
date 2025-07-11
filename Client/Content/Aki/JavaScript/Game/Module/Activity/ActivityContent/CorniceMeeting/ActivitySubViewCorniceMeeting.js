"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewCorniceMeeting = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiManager_1 = require("../../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
class ActivitySubViewCorniceMeeting extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.Q6a = undefined;
    this.K6a = () => {
      var e;
      if (this.ActivityBaseData?.IsUnLock()) {
        if (e = ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig?.GetCorniceMeetingQuest(this.ActivityBaseData.Id)) {
          if (ModelManager_1.ModelManager.QuestNewModel?.GetQuestState(e.QuestId) === 3) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("ActivityCorniceMeetingQuestFinish");
          } else {
            UiManager_1.UiManager.OpenView("QuestView", e.QuestId);
          }
        }
      } else if ((e = this.ActivityBaseData.GetUnFinishPreGuideQuestId()) > 0) {
        this.ActivityBaseData.SavePreQuestRedDot(e);
        UiManager_1.UiManager.OpenView("QuestView", e);
      }
    };
    this.eje = e => {
      var i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
      if (i > 0) {
        this.ActivityBaseData.SavePreQuestRedDot(i);
        UiManager_1.UiManager.OpenView("QuestView", i);
      } else {
        UiManager_1.UiManager.OpenView("CorniceMeetingMainView");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem]];
    this.BtnBindInfo = [[1, this.K6a]];
  }
  async OnBeforeStartAsync() {
    this.Q6a = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.Q6a.SetData(this.ActivityBaseData);
    this.Q6a.SetClickFunc(this.eje);
    await this.Q6a.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnBeforeShow() {
    if (this.ActivityBaseData.GetUnFinishPreGuideQuestId() > 0) {
      this.Q6a.SetBtnText("ActivityCorniceMeetingGoToQuest");
    } else {
      this.Q6a.SetBtnText("PrefabTextItem_2701983798_Text");
    }
    var e = this.ActivityBaseData;
    if (e.NeedTailQuest) {
      e = ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig?.GetCorniceMeetingQuest(this.ActivityBaseData.Id);
      RedDotController_1.RedDotController.BindRedDot("QuestViewItem", this.GetItem(2), undefined, e.QuestId);
    }
  }
  OnBeforeHide() {
    RedDotController_1.RedDotController.UnBindGivenUi("QuestViewItem", this.GetItem(2));
  }
  OnRefreshView() {
    var e = this.ActivityBaseData;
    var i = e.GetUnFinishPreGuideQuestId();
    this.Q6a?.SetFunctionRedDotVisible(e.RedPointShowState);
    this.GetButton(1)?.RootUIComp.SetUIActive(e.IsUnlockTailQuest() && e.IsUnLock() && i <= 0);
  }
}
exports.ActivitySubViewCorniceMeeting = ActivitySubViewCorniceMeeting;
//# sourceMappingURL=ActivitySubViewCorniceMeeting.js.map