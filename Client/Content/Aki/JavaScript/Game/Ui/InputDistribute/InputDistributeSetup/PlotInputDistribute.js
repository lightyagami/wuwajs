"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotInputDistribute = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PlotController_1 = require("../../../Module/Plot/PlotController");
const InputDistributeDefine_1 = require("../InputDistributeDefine");
const InputDistributeSetup_1 = require("./InputDistributeSetup");
class PlotInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
  OnRefresh() {
    var e = ModelManager_1.ModelManager.PlotModel;
    return !!PlotController_1.PlotController.NeedInputRefresh() && !(e.TimeLimitedOptionTag ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 26, "[InputDistribute] 剧情限时选项仅允许移动输入"), this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.CameraInputTag, InputDistributeDefine_1.inputDistributeTagDefine.FightInputRoot.AxisInput.MoveInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag]), 0) : !e.PlotConfig.DisableInput && !ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() || (Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 10, "[InputDistribute]刷新剧情输入Tag时，除了视角旋转和鼠标输入,其他输入都会被禁止"), this.SetInputDistributeTags([InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.MouseInputTag, InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag]), 0));
  }
}
exports.PlotInputDistribute = PlotInputDistribute;
//# sourceMappingURL=PlotInputDistribute.js.map