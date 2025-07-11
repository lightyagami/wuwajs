"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRecallCaptionPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityRecallCaptionPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.B6e = () => {
      UiManager_1.UiManager.CloseView("ActivityRegressMainView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[3, this.B6e]];
  }
  RefreshData(e) {
    var i = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.Title);
  }
}
exports.ActivityRecallCaptionPanel = ActivityRecallCaptionPanel;
//# sourceMappingURL=ActivityRegressCaptionPanel.js.map