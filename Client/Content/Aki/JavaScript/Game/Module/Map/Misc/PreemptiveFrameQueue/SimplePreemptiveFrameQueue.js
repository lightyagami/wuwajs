"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimplePreemptiveFrameQueue = undefined;
class SimplePreemptiveFrameQueue {
  constructor(s, t = 0) {
    this.PerFrameTaskLimit = s;
    this.ExecuteFrameInterval = t;
    this.Tasks = [];
    this.dlh = undefined;
    this.Clh = 0;
    this.EnableFlush = false;
    this.m8_ = 0;
    this.m8_ = this.ExecuteFrameInterval;
  }
  AddTask(s) {
    let t = 0;
    while (t < this.Tasks.length && this.Tasks[t].Priority < s.Priority) {
      t++;
    }
    this.Tasks.splice(t, 0, s);
    if (this.IsTaskComplete() && !this.OnExecutionInterval) {
      this.m8_ = this.ExecuteFrameInterval;
    }
  }
  CancelTask(t) {
    var s = this.Tasks.findIndex(s => s === t);
    if (s > -1) {
      t.Cancel?.();
      this.Tasks.splice(s, 1);
    }
  }
  Process() {
    if (this.OnExecutionInterval) {
      ++this.m8_;
    } else {
      if (this.m8_ >= this.ExecuteFrameInterval) {
        this.m8_ = 0;
      }
      if (this.IsTaskComplete()) {
        for (this.Clh = 0; this.Tasks.length > 0 && this.Clh < this.PerFrameTaskLimit;) {
          this.dlh = this.ShiftNextTask();
          if (this.dlh) {
            this.dlh.Execute();
            if (!this.EnableFlush) {
              this.Clh++;
            }
            if (!this.IsTaskComplete()) {
              break;
            }
            this.OnTaskComplete(this.dlh);
          }
        }
        if (!this.Tasks.length) {
          this.dlh = undefined;
        }
        if (this.Clh) {
          this.OnLateExecuteTasksFrame();
        }
      } else {
        this.dlh.FrameExecute?.();
      }
    }
  }
  ShiftNextTask() {
    if (this.Tasks.length > 0) {
      return this.Tasks.shift();
    }
  }
  OnTaskComplete(s) {}
  OnLateExecuteTasksFrame() {}
  IsTaskComplete() {
    return !this.dlh || (this.dlh.IsComplete?.() ?? true);
  }
  get OnExecutionInterval() {
    return this.m8_ < this.ExecuteFrameInterval;
  }
  Dispose() {
    this.dlh?.Cancel?.();
    this.dlh = undefined;
    this.Tasks.length = 0;
  }
}
exports.SimplePreemptiveFrameQueue = SimplePreemptiveFrameQueue;
//# sourceMappingURL=SimplePreemptiveFrameQueue.js.map