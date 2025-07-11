"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingInstanceDungeonViewModel = undefined;
const ActivityMowingController_1 = require("../../Activity/ActivityContent/Mowing/ActivityMowingController");
const InstanceDungeonViewModelBase_1 = require("./InstanceDungeonViewModelBase");
class MowingInstanceDungeonViewModel extends InstanceDungeonViewModelBase_1.InstanceDungeonViewModelBase {
  OnCheckNeedOnTimer(e) {
    var n = ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
    return !!n && !n.GetActivityLevelUnlockState(e);
  }
  OnTimerRefreshFunction(e) {
    this.View.RefreshMowingInstance();
  }
}
exports.MowingInstanceDungeonViewModel = MowingInstanceDungeonViewModel;
//# sourceMappingURL=MowingInstanceDungeonViewModel.js.map