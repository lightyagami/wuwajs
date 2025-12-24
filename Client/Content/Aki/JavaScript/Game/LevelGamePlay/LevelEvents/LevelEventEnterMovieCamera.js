"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventEnterMovieCamera = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnterMovieCamera extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
  }
  ExecuteNew(e, s) {
    if (e) {
      this.OPt = e;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 57, "[电影镜头]通过LevelEvent进入电影镜头", ["Type", e.MovieCameraConfig.Type]);
      }
      if (this.OPt.MovieCameraConfig.Type === "Common") {
        e = this.OPt.MovieCameraConfig;
        const t = e.RowName;
        const o = e.SpecElementIndex ?? -1;
        ModelManager_1.ModelManager.CameraModel?.PlayMovieCamera(t, o, e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Event", 57, "[电影镜头]通过LevelEvent进入常规电影镜头结果", ["success", e], ["RowName", t], ["InitialIndex", o]);
          }
          this.FinishExecute(e);
        });
      } else if (this.OPt.MovieCameraConfig.Type === "Spec") {
        const n = this.OPt.MovieCameraConfig.RowName;
        ModelManager_1.ModelManager.CameraModel?.PlaySpecialMovieCamera(n, e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Event", 57, "[电影镜头]通过LevelEvent进入特殊电影镜头结果", ["success", e], ["RowName", n]);
          }
          this.FinishExecute(e);
        });
      } else {
        this.FinishExecute(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventEnterMovieCamera = LevelEventEnterMovieCamera;
//# sourceMappingURL=LevelEventEnterMovieCamera.js.map