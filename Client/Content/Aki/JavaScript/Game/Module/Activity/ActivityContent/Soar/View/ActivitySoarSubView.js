"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySoarSubView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../../View/SubView/ActivitySubViewGeneralInfo");
class ActivitySoarSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = undefined;
    this.MHd = false;
    this.tWt = () => {
      this.ActivityBaseData.SaveFirstClick();
      UiManager_1.UiManager.OpenView("QuestView", this.ActivityBaseData.GetQuestId());
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UINiagara]];
  }
  async OnBeforeStartAsync() {
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    await this.CommonInfoPanel.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.CommonInfoPanel.SetBtnText("LongShanStage_Join01");
    this.CommonInfoPanel.SetClickFunc(this.tWt);
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0;
    this.GetItem(5)?.SetUIActive(i);
    this.GetItem(4)?.SetUIActive(!i);
  }
  OnRefreshView() {
    var i = ModelManager_1.ModelManager.FunctionModel.IsOpen(10026010);
    this.GetItem(2)?.SetUIActive(!i);
    this.GetSprite(1)?.SetUIActive(i);
    this.GetUiNiagara(7)?.SetUIActive(i);
    var e = i ? "JinZhouFly_FunctionUnLock" : "JinZhouFly_FunctionLock";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e);
    var e = i ? "JinZhouFly_FunctionUnLockDes" : "JinZhouFly_FunctionLockDes";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e);
    this.CommonInfoPanel?.OnRefreshView();
    var i = this.ActivityBaseData.RedPointShowState;
    this.CommonInfoPanel?.SetFunctionRedDotVisible(i);
    var e = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(this.ActivityBaseData.GetQuestId());
    if (e) {
      (i = this.CommonInfoPanel?.GetFunctional()).FunctionButton.SetUiActive(false);
      i.SetPanelConditionVisible(false);
      i.SetActivatePanelConditionVisible(true);
      i.SetActivateTextByTextId("DangoMonopoly_title_21");
    }
  }
  OnTimer(i) {
    if (!this.MHd && !this.ActivityBaseData.CheckIfInShowTime()) {
      this.MHd = true;
      ModelManager_1.ModelManager.ActivityModel.RefreshShowingActivities();
    }
  }
}
exports.ActivitySoarSubView = ActivitySoarSubView;
//# sourceMappingURL=ActivitySoarSubView.js.map