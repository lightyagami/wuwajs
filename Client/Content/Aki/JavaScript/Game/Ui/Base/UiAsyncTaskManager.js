"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiAsyncTaskManager = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const UiAsyncTaskQueue_1 = require("./UiAsyncTaskQueue");
class UiAsyncTaskManager {
  constructor(s = false) {
    this.ShowLogInfo = s;
    this.Rk_ = undefined;
  }
  async RunTask(s) {
    this.Rk_ ||= new Map();
    var e = s.Name;
    let r = this.Rk_.get(e);
    if (!r) {
      (r = new UiAsyncTaskQueue_1.UiAsyncTaskQueue()).RunAfterCallback = this.Ufd.bind(this);
      this.Rk_.set(e, r);
    }
    r.EnQueue(s);
    r.ProcessQueue();
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
  Ufd() {}
}
exports.UiAsyncTaskManager = UiAsyncTaskManager;
//# sourceMappingURL=UiAsyncTaskManager.js.map