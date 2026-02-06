"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityNewPlayerSupportStartupView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const SplashScreenController_1 = require("../../../../SplashScreen/SplashScreenController");
const ActivityController_1 = require("../../../ActivityController");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class ActivityNewPlayerSupportStartupView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.AMo = () => {
      this.tJf();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.AMo]];
  }
  OnBeforeShow() {
    var e = ActivityControllerHolder_1.ActivityControllerHolder.ActivityNewPlayerSupportController.ActivityData;
    SplashScreenController_1.SplashScreenController.FinishCurTask(6);
    e.RecordActivityFirstShow();
    e.AlreadyStartView = true;
  }
  tJf() {
    this.CloseMe();
    var e = ActivityControllerHolder_1.ActivityControllerHolder.ActivityNewPlayerSupportController.ActivityData.Id;
    if (e !== 0) {
      ActivityController_1.ActivityController.OpenActivityById(e);
    }
  }
}
exports.ActivityNewPlayerSupportStartupView = ActivityNewPlayerSupportStartupView;
//# sourceMappingURL=ActivityNewPlayerSupportStartupView.js.map