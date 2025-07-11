"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeOfDayLoadingView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const TimeOfDayAnimController_1 = require("../TimeOfDayAnimController");
const TimeOfDayController_1 = require("../TimeOfDayController");
class TimeOfDayLoadingView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnAfterShow() {
    UiLayer_1.UiLayer.SetShowNormalMaskLayer(false);
    TimeOfDayController_1.TimeOfDayController.ResumeTimeScale();
    if (TimeOfDayAnimController_1.TimeOfDayAnimController.CallBack) {
      TimeOfDayAnimController_1.TimeOfDayAnimController.CallBack();
    }
    UiManager_1.UiManager.CloseView("TimeOfDayLoadingView");
  }
}
exports.TimeOfDayLoadingView = TimeOfDayLoadingView;
//# sourceMappingURL=TimeOfDayLoadingView.js.map