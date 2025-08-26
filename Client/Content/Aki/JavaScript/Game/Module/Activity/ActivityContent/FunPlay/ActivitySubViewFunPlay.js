"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewFunPlay = undefined;
const UE = require("ue");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
class ActivitySubViewFunPlay extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = undefined;
    this.tWt = () => {
      this.ActivityBaseData.SetClickRedDotState();
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        UiManager_1.UiManager.OpenView("ActivityFunPlayView", this.ActivityBaseData);
      } else {
        UiManager_1.UiManager.OpenView("QuestView", this.ActivityBaseData.GetUnFinishPreGuideQuestId());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    this.CommonInfoPanel.SetClickFunc(this.tWt);
    var i = this.GetItem(0).GetOwner();
    await this.CommonInfoPanel.CreateThenShowByActorAsync(i);
    this.CommonInfoPanel.SetBtnText("PrefabTextItem_708485707_Text");
  }
  OnRefreshView() {
    this.CommonInfoPanel?.SetFunctionRedDotVisible(this.ActivityBaseData.CheckRedDot());
  }
}
exports.ActivitySubViewFunPlay = ActivitySubViewFunPlay;
//# sourceMappingURL=ActivitySubViewFunPlay.js.map