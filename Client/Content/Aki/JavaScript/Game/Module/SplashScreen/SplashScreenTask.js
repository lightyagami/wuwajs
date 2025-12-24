"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplashScreenTask = undefined;
const Log_1 = require("../../../Core/Common/Log");
const SplashScreenById_1 = require("../../../Core/Define/ConfigQuery/SplashScreenById");
class SplashScreenTask {
  constructor(s, e, a) {
    this.SourceModule = s;
    this.Type = e;
    this.jEr = a;
    this.h0i = 0;
    if ((this.SplashScreenTimeType = 0) === e) {
      a = SplashScreenById_1.configSplashScreenById.GetConfig(s);
      this.SplashScreenTimeType = a.Type;
    }
  }
  get Status() {
    return this.h0i;
  }
  Run() {
    if (this.h0i !== 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SplashScreenTask", 71, "[SplashScreenTask] 任务被重复执行", ["TaskSourceModule", this.SourceModule], ["Status", this.Status]);
      }
    } else {
      try {
        this.h0i = 1;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SplashScreenTask", 71, "[SplashScreenTask] 任务开始执行", ["TaskSourceModule", this.SourceModule]);
        }
        this.jEr();
      } catch (s) {
        this.h0i = 4;
        if (s instanceof Error) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SplashScreenTask", 71, "[SplashScreenTask] 任务执行异常", ["TaskSourceModule", this.SourceModule], ["error", s.message]);
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SplashScreenTask", 71, "[SplashScreenTask] 任务执行异常", ["TaskSourceModule", this.SourceModule], ["error", String(s)]);
        }
      }
    }
  }
  FinishTask() {
    this.h0i = 2;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SplashScreenTask", 71, "[SplashScreenTask] 任务完成", ["TaskSourceModule", this.SourceModule]);
    }
  }
  CancelTask() {
    this.h0i = 3;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SplashScreenTask", 71, "[SplashScreenTask] 任务取消", ["TaskSourceModule", this.SourceModule]);
    }
  }
  FailTask() {
    this.h0i = 4;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SplashScreenTask", 71, "[SplashScreenTask] 任务失败", ["TaskSourceModule", this.SourceModule]);
    }
  }
}
exports.SplashScreenTask = SplashScreenTask;
//# sourceMappingURL=SplashScreenTask.js.map