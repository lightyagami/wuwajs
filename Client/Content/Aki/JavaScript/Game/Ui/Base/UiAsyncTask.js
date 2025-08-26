"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiAsyncTask = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
class UiAsyncTask {
  constructor(s, i, t, o) {
    this.Name = s;
    this.jEr = i;
    this.Lk_ = t;
    this.LogInfo = o;
    this.h0i = 0;
    this.wk_ = false;
    this.WEr = new CustomPromise_1.CustomPromise();
  }
  get Promise() {
    return this.WEr.Promise;
  }
  get Status() {
    return this.h0i;
  }
  async Run() {
    if (this.h0i !== 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiAsyncTask", 43, "[UiAsyncTask] 任务被重复执行", ["TaskName", this.Name], ["Status", this.Status]);
      }
    } else {
      try {
        this.h0i = 1;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiAsyncTask", 43, "[UiAsyncTask] 任务开始执行", ["TaskName", this.Name]);
        }
        await this.jEr();
        if (this.wk_) {
          this.h0i = 3;
          this.WEr.SetResult(false);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("UiAsyncTask", 43, "[UiAsyncTask] 任务在执行过程中被取消", ["TaskName", this.Name]);
          }
        } else {
          this.h0i = 2;
          this.WEr.SetResult(true);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("UiAsyncTask", 43, "[UiAsyncTask] 任务完成", ["TaskName", this.Name]);
          }
        }
      } catch (s) {
        this.h0i = 4;
        this.WEr.SetResult(false);
        if (s instanceof Error) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("UiAsyncTask", 43, "[UiAsyncTask] 任务执行异常", ["TaskName", this.Name], ["error", s.message]);
          }
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiAsyncTask", 43, "[UiAsyncTask] 任务执行异常", ["TaskName", this.Name], ["error", String(s)]);
        }
      }
    }
  }
  Cancel() {
    if (this.h0i === 0 || this.h0i === 1) {
      this.wk_ = true;
      this.Lk_?.();
      if (this.h0i === 0 && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiAsyncTask", 43, "[UiAsyncTask] 任务在执行之前被取消", ["TaskName", this.Name]);
      }
    }
  }
}
exports.UiAsyncTask = UiAsyncTask;
//# sourceMappingURL=UiAsyncTask.js.map