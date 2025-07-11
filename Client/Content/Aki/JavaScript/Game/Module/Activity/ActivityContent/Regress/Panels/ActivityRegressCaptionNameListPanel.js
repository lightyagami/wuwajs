"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressCaptionNameListPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const ActivityRegressCaptionPanel_1 = require("./ActivityRegressCaptionPanel");
class ActivityRegressCaptionNameListPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Kda = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Kda = new ActivityRegressCaptionPanel_1.ActivityRecallCaptionPanel();
    var e = this.GetItem(0).GetOwner();
    await this.Kda.CreateThenShowByActorAsync(e);
  }
  OnAfterShow() {}
  RefreshData(e) {}
}
exports.ActivityRegressCaptionNameListPanel = ActivityRegressCaptionNameListPanel;
//# sourceMappingURL=ActivityRegressCaptionNameListPanel.js.map