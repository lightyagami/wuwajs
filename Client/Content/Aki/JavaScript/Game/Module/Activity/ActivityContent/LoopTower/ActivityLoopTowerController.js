"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityLoopTowerController = undefined;
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityLoopTowerData_1 = require("./ActivityLoopTowerData");
const ActivitySubViewLoopTower_1 = require("./ActivitySubViewLoopTower");
class ActivityLoopTowerController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityLoopTower";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewLoopTower_1.ActivitySubViewLoopTower();
  }
  OnCreateActivityData(e) {
    return new ActivityLoopTowerData_1.ActivityLoopTowerData();
  }
  OnRegisterNetEvent() {}
  OnUnRegisterNetEvent() {}
}
(exports.ActivityLoopTowerController = ActivityLoopTowerController).CurrentActivityId = 0;
//# sourceMappingURL=ActivityLoopTowerController.js.map