"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDailyTaskBase = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
class FloroRanchDailyTaskBase {
  constructor() {
    this.TaskId = 0;
    this.c_u = false;
    this.at_ = false;
    this.eud = false;
    this.d_u = undefined;
    this.TaskId = FloroRanchDailyTaskBase.f_r++;
  }
  get IsExecuting() {
    return this.c_u;
  }
  get IsPause() {
    return this.at_;
  }
  BindCompleteCallBack(s) {
    this.d_u = s;
  }
  Execute() {
    this.c_u = true;
    this.OnAddEventListener();
    this.OnExecute();
  }
  Tick(s) {
    if (this.c_u) {
      this.OnTick(s);
    }
  }
  Complete(s) {
    if (this.c_u) {
      this.c_u = false;
      this.OnRemoveEventListener();
      this.OnComplete();
      this.d_u(this.TaskId, s);
    }
  }
  AsyncComplete(s) {
    this.eud = true;
    if (this.c_u && !this.at_) {
      this.Complete(s);
    }
  }
  ForceFinish() {
    if (this.c_u) {
      this.c_u = false;
      this.OnRemoveEventListener();
    }
  }
  tud() {
    return this.c_u && !this.at_ && this.eud;
  }
  Pause() {
    if (this.c_u) {
      this.c_u = false;
      this.at_ = true;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 78, "Pause 任务未执行 只能暂停正在执行的任务！", ["taskId", this.TaskId]);
    }
  }
  Resume() {
    if (this.at_) {
      this.c_u = true;
      this.at_ = false;
      if (this.tud()) {
        this.Complete();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 78, "Resume 任务未暂停 不能恢复！", ["taskId", this.TaskId]);
    }
  }
  OnExecute() {}
  OnAddEventListener() {}
  OnTick(s) {}
  OnRemoveEventListener() {}
  OnComplete() {}
}
(exports.FloroRanchDailyTaskBase = FloroRanchDailyTaskBase).f_r = 0;
//# sourceMappingURL=FloroRanchDailyTaskBase.js.map