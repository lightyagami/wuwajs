"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplineMoveTaskBase = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class SplineMoveTaskBase {
  constructor(e) {
    this.EntityHandle = e;
    this.NHc = 0;
  }
  StartTask() {
    if (!(this.NHc & 1)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 39, "[SplineMoveTaskBase] StartTask", ["EntityId", this.EntityHandle.Id]);
      }
      if (ControllerHolder_1.ControllerHolder.SplineMoveTaskController.RegisterTask(this)) {
        this.OnStartTask();
        this.NHc |= 1;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 39, "[SplineMoveTaskBase] Task注册失败，停止", ["EntityId", this.EntityHandle.Id]);
      }
    }
  }
  EndTask(e) {
    if (!(this.NHc & 2)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 39, "[SplineMoveTaskBase] EndTask", ["EntityId", this.EntityHandle.Id], ["Success", e]);
      }
      ControllerHolder_1.ControllerHolder.SplineMoveTaskController.UnregisterTask(this);
      this.OnEndTask(e);
      this.NHc |= 2;
    }
  }
  TickTask(e) {
    this.OnTickTask(e);
  }
  OnStartTask() {}
  OnEndTask(e) {}
  OnTickTask(e) {}
}
exports.SplineMoveTaskBase = SplineMoveTaskBase;
//# sourceMappingURL=SplineMoveTaskBase.js.map