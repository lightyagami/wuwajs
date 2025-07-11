"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeOfDayAnimController = undefined;
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const TimeOfDayController_1 = require("./TimeOfDayController");
const TimeOfDayModel_1 = require("./TimeOfDayModel");
class TimeOfDayAnimController {
  static PlayTimeAnimation(e, i, r) {
    TimeOfDayAnimController.CallBack = r;
    UiLayer_1.UiLayer.SetShowNormalMaskLayer(true);
    TimeOfDayController_1.TimeOfDayController.PauseTime();
    TimeOfDayController_1.TimeOfDayController.SyncGlobalGameTime(TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(i));
    UiManager_1.UiManager.OpenView("TimeOfDayLoadingView");
  }
}
(exports.TimeOfDayAnimController = TimeOfDayAnimController).TickId = 0;
TimeOfDayAnimController.PrePromise = undefined;
TimeOfDayAnimController.CallBack = () => {}; //# sourceMappingURL=TimeOfDayAnimController.js.map