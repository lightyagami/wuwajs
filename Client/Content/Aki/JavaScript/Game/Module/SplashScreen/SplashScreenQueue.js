"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplashScreenQueue = undefined;
const Log_1 = require("../../../Core/Common/Log");
const SplashScreenById_1 = require("../../../Core/Define/ConfigQuery/SplashScreenById");
class SplashScreenQueue {
  constructor() {
    this.TaskQueue = [];
    this.Pk_ = undefined;
    this.XI1 = false;
  }
  EnQueue(s) {
    if (this.IsTaskInQueue(s)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SplashScreenTask", 71, "[SplashScreenTask] 任务重复添加", ["TaskSourceModule", s.SourceModule], ["Status", s.Status]);
      }
    } else {
      this.TaskQueue.push(s);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SplashScreenTask", 71, "[SplashScreenTask] 添加任务", ["TaskSourceModule", s.SourceModule], ["Status", s.Status]);
      }
    }
  }
  ProcessQueueSingle() {
    if (this.IsSplashScreenTaskRunning()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SplashScreenTask", 71, "有其他开屏任务正在进行中");
      }
    } else if (this.TaskQueue && this.TaskQueue.length !== 0) {
      this.Pk_ = this.TaskQueue.shift();
      if (this.Pk_?.SplashScreenTimeType === 1) {
        if (this.XI1) {
          this.Pk_ = undefined;
          this.ProcessQueueSingle();
          return;
        }
        this.XI1 = true;
      }
      if (this.Pk_) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SplashScreenTask", 71, "[SplashScreenTask] 任务开始执行", ["TaskSourceModule", this.Pk_.SourceModule], ["Status", this.Pk_.Status]);
        }
        this.Pk_.Run();
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SplashScreenTask", 71, "开屏任务队列为空");
    }
  }
  FinishTask(s = 0) {
    if (this.Pk_) {
      if (s !== 0 && s !== this.Pk_.SourceModule) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SplashScreenTask", 71, "[SplashScreenTask] 当前执行任务名称与参数名称不一致，结束任务失败", ["finishTaskSourceModule", s], ["curTaskSourceModule", this.Pk_?.SourceModule]);
        }
        return false;
      } else {
        if (this.Pk_) {
          this.Pk_.FinishTask();
          this.Pk_ = undefined;
        }
        return true;
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SplashScreenTask", 71, "[SplashScreenTask] 当前没有正在执行的任务", ["finishTaskSourceModule", s]);
      }
      return false;
    }
  }
  ProcessQueue() {
    this.TaskQueue.sort((s, e) => {
      if (s.Type === 1 || e.Type === 1) {
        if (s.Type === 1) {
          return 1;
        } else {
          return -1;
        }
      } else {
        s = SplashScreenById_1.configSplashScreenById.GetConfig(s.SourceModule);
        return SplashScreenById_1.configSplashScreenById.GetConfig(e.SourceModule).Priority - s.Priority;
      }
    });
    this.ProcessQueueSingle();
  }
  IsSplashScreenTaskRunning() {
    return !!this.Pk_;
  }
  IsTaskInQueue(s) {
    for (const e of this.TaskQueue) {
      if (e.SourceModule === s.SourceModule) {
        return true;
      }
    }
    return false;
  }
  ClearAllTask() {
    if (this.Pk_) {
      this.Pk_.FailTask();
      this.Pk_ = undefined;
    }
    for (const s of this.TaskQueue) {
      s.CancelTask();
    }
    this.TaskQueue = [];
  }
}
exports.SplashScreenQueue = SplashScreenQueue;
//# sourceMappingURL=SplashScreenQueue.js.map