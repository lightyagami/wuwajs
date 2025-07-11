"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventEnterSequenceCamera = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnterSequenceCamera extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    if (e) {
      if (e.ShouldEnter) {
        ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(3);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelEvent", 26, "通过事件进入剧情相机");
        }
      } else {
        ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(1);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelEvent", 26, "通过事件退出剧情相机");
        }
      }
    }
  }
}
exports.LevelEventEnterSequenceCamera = LevelEventEnterSequenceCamera;
//# sourceMappingURL=LevelEventEnterSequenceCamera.js.map