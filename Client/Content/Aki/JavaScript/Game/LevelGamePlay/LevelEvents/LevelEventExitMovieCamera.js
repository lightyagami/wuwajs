"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventExitMovieCamera = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventExitMovieCamera extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, a) {
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 57, "[电影镜头]通过LevelEvent离开电影镜头");
      }
      ModelManager_1.ModelManager.CameraModel?.StopMovieCamera(e => {
        this.FinishExecute(e);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Event", 57, "[电影镜头]通过LevelEvent离开电影镜头结果", ["success", e]);
        }
      }, "关卡事件,停止电影镜头");
    } else {
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventExitMovieCamera = LevelEventExitMovieCamera;
//# sourceMappingURL=LevelEventExitMovieCamera.js.map