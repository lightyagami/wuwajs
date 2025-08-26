"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiAsyncTaskQueue = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Queue_1 = require("../../../Core/Container/Queue");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
class UiAsyncTaskQueue {
  constructor() {
    this.TaskQueue = undefined;
    this.Ak_ = false;
    this.wk_ = false;
    this.CurrentRunningTask = undefined;
    this.RunAfterCallback = undefined;
  }
  EnQueue(s) {
    this.TaskQueue ||= new Queue_1.Queue();
    this.TaskQueue.Push(s);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiAsyncTask", 43, "[UiAsyncTask] 添加任务", ["TaskName", s.Name], ["Status", s.Status]);
    }
  }
  async ProcessQueue() {
    if (!this.wk_ && !this.Ak_ && this.TaskQueue && this.TaskQueue.Size !== 0) {
      for (this.Ak_ = true; this.TaskQueue.Size > 0;) {
        this.CurrentRunningTask = this.TaskQueue.Pop();
        if (this.CurrentRunningTask) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("UiAsyncTask", 43, "[UiAsyncTask] 任务开始执行", ["TaskName", this.CurrentRunningTask.Name], ["Status", this.CurrentRunningTask.Status]);
          }
          await this.CurrentRunningTask.Run();
          this.CurrentRunningTask = undefined;
          this.RunAfterCallback?.();
        }
      }
      this.Ak_ = false;
    }
  }
  Cancel() {
    this.wk_ = true;
    this.CurrentRunningTask?.Cancel();
    if (this.TaskQueue) {
      for (let s = 0; s < this.TaskQueue.Size; s++) {
        this.TaskQueue.Get(s)?.Cancel();
      }
      this.TaskQueue.Clear();
    }
  }
}
exports.UiAsyncTaskQueue = UiAsyncTaskQueue;
//# sourceMappingURL=UiAsyncTaskQueue.js.map