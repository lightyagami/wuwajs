"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotFormation = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class PlotFormation {
  ChangeFormation() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "[剧情加载等待] 剧情切编队-开始");
    }
    ModelManager_1.ModelManager.PlotModel.InSeamlessFormation = true;
  }
  async CheckFormationPromise() {
    var o;
    if (ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
      ModelManager_1.ModelManager.PlotModel.InSeamlessFormation = false;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "GM推进中，检查剧情编队完成通过");
      }
    } else {
      if (ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise) {
        ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(12, 3, undefined, 0);
        await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise.Promise;
      }
      if ((o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Entity?.IsInit) {
        o.Entity.EnableByKey(1, true);
      } else {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("编队准备好了，但当前出战角色却没了");
      }
      ModelManager_1.ModelManager.PlotModel.InSeamlessFormation = false;
      ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(12);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "检查剧情编队完成通过");
      }
    }
  }
}
exports.PlotFormation = PlotFormation;
//# sourceMappingURL=PlotFormation.js.map