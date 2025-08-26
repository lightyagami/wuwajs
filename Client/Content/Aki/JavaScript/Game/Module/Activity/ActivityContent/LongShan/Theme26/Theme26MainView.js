"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Theme26MainView = undefined;
const UiManager_1 = require("../../../../../Ui/UiManager");
const SevenHillsMainView_1 = require("../SevenHills/View/SevenHillsMainView");
class Theme26MainView extends SevenHillsMainView_1.SevenHillsMainView {
  constructor() {
    super(...arguments);
    this.OnClickStageItem = e => {
      UiManager_1.UiManager.OpenView("Theme26StageTaskView", [this.ActivityBaseData, e]);
    };
  }
  RefreshTitleIcon() {}
}
exports.Theme26MainView = Theme26MainView;
//# sourceMappingURL=Theme26MainView.js.map