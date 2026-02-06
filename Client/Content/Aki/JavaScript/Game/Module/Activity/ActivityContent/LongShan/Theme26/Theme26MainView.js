"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Theme26MainView = undefined;
const UiManager_1 = require("../../../../../Ui/UiManager");
const ActivityLongShanController_1 = require("../ActivityLongShanController");
const SevenHillsMainView_1 = require("../SevenHills/View/SevenHillsMainView");
class Theme26MainView extends SevenHillsMainView_1.SevenHillsMainView {
  constructor() {
    super(...arguments);
    this.OnClickStageItem = e => {
      UiManager_1.UiManager.OpenView("Theme26StageTaskView", [this.ActivityBaseData, e]);
    };
  }
  RefreshTitleIcon() {}
  GetExtraResourceId(e) {
    return ActivityLongShanController_1.ActivityLongShanController.GetActivityUiConfig(e.Id).MainViewId;
  }
}
exports.Theme26MainView = Theme26MainView;
//# sourceMappingURL=Theme26MainView.js.map