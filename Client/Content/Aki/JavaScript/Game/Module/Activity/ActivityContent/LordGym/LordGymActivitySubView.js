"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymActivitySubView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
class LordGymActivitySubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = undefined;
    this.tWt = () => {
      var e;
      this.ActivityBaseData.ReadRedDot();
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        e = {
          MarkId: CommonParamById_1.configCommonParamById.GetIntConfig("LordGymActivityJumpMarkId"),
          MarkType: 19
        };
        ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, false, e);
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
    var e = [this.CommonInfoPanel.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())];
    await Promise.all(e);
    this.CommonInfoPanel?.SetBtnText("LongShanStage_Join01");
    this.CommonInfoPanel?.SetClickFunc(this.tWt);
  }
  OnRefreshView() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshActivityTab, this.ActivityBaseData.Id);
    this.CommonInfoPanel.SetFunctionRedDotVisible(this.ActivityBaseData.CheckRedDot());
    this.CommonInfoPanel?.OnRefreshView();
  }
}
exports.LordGymActivitySubView = LordGymActivitySubView;
//# sourceMappingURL=LordGymActivitySubView.js.map