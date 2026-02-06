"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplashScreenController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const SplashScreenQueue_1 = require("./SplashScreenQueue");
class SplashScreenController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.Ore();
    return true;
  }
  static OnClear() {
    this.kre();
    return true;
  }
  static Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, this.JDe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BeforeLoadMap, this.SYi);
  }
  static kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, this.JDe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BeforeLoadMap, this.SYi);
  }
  static PushSplashScreenTask(e, r = false) {
    this.SplashScreenQueue.EnQueue(e);
    if (r) {
      this.TryRunSplashScreenTask();
    }
  }
  static FinishCurTask(e = 0) {
    if (this.SplashScreenQueue.FinishTask(e)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SplashScreenTask", 71, "FinishCurTask 尝试运行开屏动画任务");
      }
      this.TryRunSplashScreenTask();
    }
  }
  static TryRunSplashScreenTask() {
    var e;
    if (this.SplashScreenQueue.TaskQueue && this.SplashScreenQueue.TaskQueue.length !== 0) {
      if (ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed) {
        if (UiManager_1.UiManager.IsViewShow("BattleView")) {
          if (UiManager_1.UiManager.IsNormalContainerEmpty()) {
            if (e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity) {
              if ((e = e.GetComponent(217)).HasTag(-1371021686) || e.HasTag(1996802261)) {
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("SplashScreenTask", 71, "处于战斗中，不运行开屏动画任务");
                }
              } else if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("SplashScreenTask", 71, "处于副本中，不运行开屏动画任务");
                }
              } else {
                this.SplashScreenQueue.ProcessQueue();
              }
            } else if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SplashScreenTask", 71, "当前角色实体不存在，不运行开屏动画任务");
            }
          } else if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SplashScreenTask", 71, "待打开界面队列不为空，不运行开屏动画任务");
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SplashScreenTask", 71, "未在战斗主界面，不运行开屏动画任务");
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SplashScreenTask", 71, "世界未加载完成，且加载界面未关闭");
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SplashScreenTask", 71, "开屏任务队列为空");
    }
  }
  static ClearAllTasks() {
    this.SplashScreenQueue.ClearAllTask();
  }
}
exports.SplashScreenController = SplashScreenController;
(_a = SplashScreenController).SplashScreenQueue = new SplashScreenQueue_1.SplashScreenQueue();
SplashScreenController.FWe = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("SplashScreenTask", 71, "WorldDoneAndCloseLoading 尝试运行开屏动画任务");
  }
  _a.TryRunSplashScreenTask();
};
SplashScreenController.JDe = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("SplashScreenTask", 71, "ActiveBattleView 尝试运行开屏动画任务");
  }
  _a.TryRunSplashScreenTask();
};
SplashScreenController.SYi = () => {
  _a.ClearAllTasks();
}; //# sourceMappingURL=SplashScreenController.js.map