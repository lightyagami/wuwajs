"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTask = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
class SkipTask {
  constructor() {
    this.cp = false;
    this.Lqi = undefined;
  }
  Initialize() {
    this.OnAddEvents();
    this.OnInitialize();
  }
  Destroy() {
    this.poi();
    this.OnDestroyed();
    this.OnRemoveEvents();
  }
  Run(...t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SkipInterface", 10, "开始跳转任务", ["Name", this.constructor.name]);
    }
    this.foi(...t);
  }
  async AsyncRun(...t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SkipInterface", 10, "开始跳转任务", ["Name", this.constructor.name]);
    }
    this.Lqi = new CustomPromise_1.CustomPromise();
    this.foi(...t);
    return this.Lqi.Promise;
  }
  GetIsRunning() {
    return this.cp;
  }
  Finish() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SkipInterface", 10, "结束跳转任务", ["Name", this.constructor.name]);
    }
    if (this.Lqi) {
      this.Lqi.SetResult(0);
    }
    this.OnFinished();
    this.poi();
  }
  Stop() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SkipInterface", 10, "停止跳转任务", ["Name", this.constructor.name]);
    }
    if (this.Lqi) {
      this.Lqi.SetResult(1);
    }
    this.OnStopped();
    this.poi();
  }
  foi(...t) {
    this.cp = true;
    this.OnRun(...t);
  }
  poi() {
    this.cp = false;
    this.Lqi = undefined;
  }
  OnInitialize() {}
  OnRun() {}
  OnFinished() {}
  OnStopped() {}
  OnDestroyed() {}
  OnAddEvents() {}
  OnRemoveEvents() {}
}
exports.SkipTask = SkipTask;
//# sourceMappingURL=SkipTask.js.map