"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionLockTodTime = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionLockTodTime extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    if (e) {
      switch (e.LockState) {
        case "Lock":
          ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.PauseTime();
          break;
        case "Unlock":
          ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.ResumeTime();
      }
    } else {
      this.FinishExecute(false);
    }
  }
  OnBackgroundExecute() {
    this.OnExecute();
    this.FinishExecute(true);
  }
}
exports.FlowActionLockTodTime = FlowActionLockTodTime;
//# sourceMappingURL=FlowActionLockTodTime.js.map