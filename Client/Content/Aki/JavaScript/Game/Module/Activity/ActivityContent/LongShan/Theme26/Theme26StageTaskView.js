"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Theme26StageTaskView = undefined;
const ActivityLongShanController_1 = require("../ActivityLongShanController");
const SevenHillsStageTaskView_1 = require("../SevenHills/View/SevenHillsStageTaskView");
class Theme26StageTaskView extends SevenHillsStageTaskView_1.SevenHillsStageTaskView {
  constructor() {
    super(...arguments);
    this.IsRefreshNow = false;
  }
  RefreshTitleIcon() {}
  GetExtraResourceId(e) {
    return ActivityLongShanController_1.ActivityLongShanController.GetActivityUiConfig(e[0].Id).RewardViewId;
  }
}
exports.Theme26StageTaskView = Theme26StageTaskView;
//# sourceMappingURL=Theme26StageTaskView.js.map