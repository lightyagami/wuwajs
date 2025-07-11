"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvignonActivitySubView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../../View/SubView/ActivitySubViewGeneralInfo");
class AvignonActivitySubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = undefined;
    this.tWt = () => {
      ModelManager_1.ModelManager.AvignonModel.ReadRedDot();
      UiManager_1.UiManager.OpenView("AvignonActivityMainView", this.ActivityBaseData);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    var e = [this.CommonInfoPanel.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())];
    await Promise.all(e);
    this.CommonInfoPanel?.SetBtnText("LongShanStage_Join01");
    this.CommonInfoPanel?.SetClickFunc(this.tWt);
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0;
    this.GetItem(1)?.SetUIActive(e);
    this.GetItem(2)?.SetUIActive(!e);
  }
  OnRefreshView() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshActivityTab, this.ActivityBaseData.Id);
    this.CommonInfoPanel.SetFunctionRedDotVisible(ModelManager_1.ModelManager.AvignonModel.CheckRedDot() || this.ActivityBaseData.HasStageRewardRedDot());
    this.CommonInfoPanel?.OnRefreshView();
  }
}
exports.AvignonActivitySubView = AvignonActivitySubView;
//# sourceMappingURL=AvignonActivitySubView.js.map