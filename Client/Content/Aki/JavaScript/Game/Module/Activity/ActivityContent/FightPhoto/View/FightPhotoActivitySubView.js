"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoActivitySubView = undefined;
const UE = require("ue");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../../View/SubView/ActivitySubViewGeneralInfo");
class FightPhotoActivitySubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = undefined;
    this.g6e = () => {
      UiManager_1.UiManager.OpenView("FightPhotoRewardView", this.ActivityBaseData);
    };
    this.tWt = () => {
      var i;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        UiManager_1.UiManager.OpenView("FightPhotoLoadingView", this.ActivityBaseData);
      } else {
        i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIItem]];
    this.BtnBindInfo = [[3, this.g6e]];
  }
  async OnBeforeStartAsync() {
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    var i = [this.CommonInfoPanel.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())];
    await Promise.all(i);
    this.CommonInfoPanel?.SetBtnText("LongShanStage_Join01");
    this.CommonInfoPanel?.SetClickFunc(this.tWt);
  }
  OnRefreshView() {
    this.CommonInfoPanel?.OnRefreshView();
    this.GetText(1)?.SetText(this.ActivityBaseData.GetFinishedLevelNum().toString());
    this.GetText(2)?.SetText("/" + this.ActivityBaseData.GetTotalLevelNum().toString());
    var i = this.ActivityBaseData.GetFinishedTaskNum();
    var t = this.ActivityBaseData.GetTotalTaskNum();
    this.GetText(4)?.SetText(i + "/" + t);
    this.GetItem(5)?.SetUIActive(this.ActivityBaseData.IsTaskHasRedDot());
    this.CommonInfoPanel?.SetFunctionRedDotVisible(this.ActivityBaseData.IsLevelHasRedDot());
  }
}
exports.FightPhotoActivitySubView = FightPhotoActivitySubView;
//# sourceMappingURL=FightPhotoActivitySubView.js.map