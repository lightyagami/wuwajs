"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiAsyncTaskQueue = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Queue_1 = require("../../../Core/Container/Queue");
class UiAsyncTaskQueue {
  constructor() {
    this.TaskQueue = undefined;
    this.Ak_ = false;
    this.wk_ = false;
    this.Pk_ = undefined;
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
        this.Pk_ = this.TaskQueue.Pop();
        if (this.Pk_) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("UiAsyncTask", 43, "[UiAsyncTask] 任务开始执行", ["TaskName", this.Pk_.Name], ["Status", this.Pk_.Status]);
          }
          await this.Pk_.Run();
          this.Pk_ = undefined;
        }
      }
      this.Ak_ = false;
    }
  }
  Cancel() {
    this.wk_ = true;
    this.Pk_?.Cancel();
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