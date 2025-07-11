"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiAsyncTaskManager = undefined;
const UiAsyncTaskQueue_1 = require("./UiAsyncTaskQueue");
class UiAsyncTaskManager {
  constructor() {
    this.Rk_ = undefined;
  }
  async RunTask(s) {
    this.Rk_ ||= new Map();
    var e = s.Name;
    let t = this.Rk_.get(e);
    if (!t) {
      t = new UiAsyncTaskQueue_1.UiAsyncTaskQueue();
      this.Rk_.set(e, t);
    }
    t.EnQueue(s);
    t.ProcessQueue();
    return await s.Promise;
  }
  CancelAllTask() {
    if (this.Rk_ && this.Rk_.size !== 0) {
      for (const s of this.Rk_.values()) {
        s.Cancel();
      }
      this.Rk_.clear();
    }
  }
}
exports.UiAsyncTaskManager = UiAsyncTaskManager;
//# sourceMappingURL=UiAsyncTaskManager.js.map