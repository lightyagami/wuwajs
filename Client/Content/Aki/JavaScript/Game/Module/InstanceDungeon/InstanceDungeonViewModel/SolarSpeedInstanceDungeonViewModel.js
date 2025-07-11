"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SolarSpeedInstanceDungeonViewModel = undefined;
const InstanceDungeonViewModelBase_1 = require("./InstanceDungeonViewModelBase");
class SolarSpeedInstanceDungeonViewModel extends InstanceDungeonViewModelBase_1.InstanceDungeonViewModelBase {
  OnCheckNeedOnTimer(e) {
    this.View.RefreshSolarSpeedInstance(0, true);
    return true;
  }
  OnTimerRefreshFunction(e) {
    this.View.RefreshSolarSpeedInstance(e);
  }
}
exports.SolarSpeedInstanceDungeonViewModel = SolarSpeedInstanceDungeonViewModel;
//# sourceMappingURL=SolarSpeedInstanceDungeonViewModel.js.map