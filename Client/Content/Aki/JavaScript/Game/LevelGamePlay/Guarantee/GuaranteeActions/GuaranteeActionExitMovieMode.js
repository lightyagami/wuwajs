"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuaranteeActionExitMovieMode = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionExitMovieMode extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    ControllerHolder_1.ControllerHolder.MovieModeController.ExitMovieMode({
      BlendTime: 1
    });
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 87, "保底退出电影模式");
    }
  }
  OnClear(e, o) {
    ModelManager_1.ModelManager.GeneralLogicTreeModel.AddGuaranteeActionsWhenLogicTreeRemove("ActionExitMovieMode", e, o);
  }
}
exports.GuaranteeActionExitMovieMode = GuaranteeActionExitMovieMode;
//# sourceMappingURL=GuaranteeActionExitMovieMode.js.map