"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionFadeInScreen = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionFadeInScreen extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments);
    this.yDe = () => {
      this.FinishExecute(true);
    };
  }
  OnExecute() {
    ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(false);
    var e = this.ActionInfo.Params;
    ModelManager_1.ModelManager.PlotModel.IsFadeIn = true;
    ModelManager_1.ModelManager.PlotModel.BlackScreenType = 1;
    if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelC" && e.TypeOverride !== undefined) {
      ModelManager_1.ModelManager.PlotModel.BlackScreenType = 1;
    } else {
      ModelManager_1.ModelManager.PlotModel.BlackScreenType = 0;
    }
    if (ModelManager_1.ModelManager.PlotModel.BlackScreenType === 0) {
      LevelLoadingController_1.LevelLoadingController.OpenLoading(0, 3, this.yDe, e?.Ease?.Duration, e?.ScreenType ? e.ScreenType : LevelLoadingController_1.LevelLoadingController.CameraFade.ColorSearch());
    } else {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewBgFadeBlackScreen, true, this.yDe);
    }
    this.RecordAction();
  }
  OnBackgroundExecute() {
    ModelManager_1.ModelManager.PlotModel.IsFadeIn = true;
    this.FinishExecute(true);
  }
  OnRollback(e, o) {
    LevelLoadingController_1.LevelLoadingController.CloseLoading(0);
  }
}
exports.FlowActionFadeInScreen = FlowActionFadeInScreen;
//# sourceMappingURL=FlowActionFadeInScreen.js.map