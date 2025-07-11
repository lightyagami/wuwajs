"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionFadeOutScreen = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController");
const PlotModel_1 = require("../PlotModel");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionFadeOutScreen extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments);
    this.yDe = () => {
      this.FinishExecute(true);
    };
  }
  OnExecute() {
    ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(false);
    var e = this.ActionInfo.Params;
    ModelManager_1.ModelManager.PlotModel.IsFadeIn = false;
    ModelManager_1.ModelManager.PlotModel.LastPlotAspect = PlotModel_1.INVALID_NUM;
    if (ModelManager_1.ModelManager.PlotModel.BlackScreenType === 1 && ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelC") {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewBgFadeBlackScreen, false, this.yDe);
    } else {
      Global_1.Global.CharacterCameraManager.FadeAmount = 0;
      LevelLoadingController_1.LevelLoadingController.CloseLoading(0, this.yDe, e?.Ease?.Duration);
    }
  }
  OnBackgroundExecute() {
    ModelManager_1.ModelManager.PlotModel.IsFadeIn = false;
    this.FinishExecute(true);
  }
}
exports.FlowActionFadeOutScreen = FlowActionFadeOutScreen;
//# sourceMappingURL=FlowActionFadeOutScreen.js.map