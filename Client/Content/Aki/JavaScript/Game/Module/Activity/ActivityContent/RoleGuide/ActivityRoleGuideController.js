"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoleGuideController = undefined;
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityRoleGuideData_1 = require("./ActivityRoleGuideData");
const ActivitySubViewRoleGuide_1 = require("./ActivitySubViewRoleGuide");
class ActivityRoleGuideController extends ActivityControllerBase_1.ActivityControllerBase {
  OnAddEvents() {}
  OnRemoveEvents() {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityRoleGuide";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewRoleGuide_1.ActivitySubViewRoleGuide();
  }
  OnCreateActivityData(e) {
    ActivityRoleGuideController.CurrentActivityId = e.s5n;
    return new ActivityRoleGuideData_1.ActivityRoleGuideData();
  }
  OnOpenView(e) {}
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
}
(exports.ActivityRoleGuideController = ActivityRoleGuideController).CurrentActivityId = 0;
//# sourceMappingURL=ActivityRoleGuideController.js.map