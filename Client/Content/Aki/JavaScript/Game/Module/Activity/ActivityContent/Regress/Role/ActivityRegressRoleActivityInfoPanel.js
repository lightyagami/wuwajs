"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressRoleActivityInfoPanel = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper");
class ActivityRegressRoleActivityInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Bda = undefined;
    this.ema = () => {
      var e = this.Lo.GachaId;
      if (!ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("RecallActivity_Tips_01");
      }
      ActivityRegressHelper_1.ActivityRegressHelper.ReportRecallLog1024(2);
      ControllerHolder_1.ControllerHolder.GachaController.OpenGachaView(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    var e = this.GetItem(3);
    this.Bda = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(undefined);
    await this.Bda.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnStart() {
    this.Bda.FunctionButton.SetFunction(this.ema);
    this.Bda.FunctionButton.SetLocalTextNew("RecallActivity_Go");
  }
  RefreshData(e) {
    this.Lo = e;
  }
}
exports.ActivityRegressRoleActivityInfoPanel = ActivityRegressRoleActivityInfoPanel;
//# sourceMappingURL=ActivityRegressRoleActivityInfoPanel.js.map