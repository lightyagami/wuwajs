"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewTheme26 = undefined;
const UiManager_1 = require("../../../../../Ui/UiManager");
const ActivitySubViewSevenHills_1 = require("../SevenHills/View/ActivitySubViewSevenHills");
class ActivitySubViewTheme26 extends ActivitySubViewSevenHills_1.ActivitySubViewSevenHills {
  constructor() {
    super(...arguments);
    this.OnConfirmBtnClick = () => {
      UiManager_1.UiManager.OpenView("Theme26MainView", this.ActivityBaseData);
    };
  }
}
exports.ActivitySubViewTheme26 = ActivitySubViewTheme26;
//# sourceMappingURL=ActivitySubViewTheme26.js.map