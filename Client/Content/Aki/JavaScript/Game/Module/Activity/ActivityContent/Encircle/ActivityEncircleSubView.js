"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityEncircleSubView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
const ActivityEncircleController_1 = require("./ActivityEncircleController");
class ActivityEncircleSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.CommonInfoPanel = undefined;
    this.OTg = () => {
      var e;
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_ConnectBan");
      } else if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        UiManager_1.UiManager.OpenView("EncircleSelectLevelView");
      } else {
        e = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", e);
      }
    };
    this.GTg = e => {
      this.Nqe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EncircleDataUpdate, this.GTg);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EncircleDataUpdate, this.GTg);
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    e.push(this.CommonInfoPanel.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    await Promise.all(e);
    this.CommonInfoPanel.SetClickFunc(this.OTg);
    this.CommonInfoPanel.SetBtnText("Encircle_OpenBtn_Text");
  }
  OnRefreshView() {
    this.BNe();
  }
  BNe() {
    this.CommonInfoPanel.SetFunctionRedDotVisible(ActivityEncircleController_1.ActivityEncircleController.GetRedPointShow());
  }
  OnStart() {
    this.Nqe();
  }
  Nqe() {
    var e = ActivityEncircleController_1.ActivityEncircleController.GetEncircleData();
    this.GetText(2)?.SetText(e.GetCompleteChallengeCount().toString() + "/" + e.GetCurrentChallengeCount().toString());
  }
}
exports.ActivityEncircleSubView = ActivityEncircleSubView;
//# sourceMappingURL=ActivityEncircleSubView.js.map