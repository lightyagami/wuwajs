"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowFadeInScreen = undefined;
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowFadeInScreen extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.jwu = undefined;
    this.yDe = () => {
      this.FinishExecute(true);
    };
  }
  Init(e) {
    this.jwu = e;
    return this;
  }
  OnExecute() {
    if (this.jwu) {
      ModelManager_1.ModelManager.PlotModel.IsFadeIn = true;
      ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent?.ExitCameraHook(false);
      if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelC" && this.jwu.TypeOverride !== undefined) {
        ModelManager_1.ModelManager.PlotModel.BlackScreenType = 1;
      } else {
        ModelManager_1.ModelManager.PlotModel.BlackScreenType = 0;
      }
      if (ModelManager_1.ModelManager.PlotModel.BlackScreenType === 0) {
        switch (this.jwu.ScreenType) {
          case IAction_1.EFadeInScreenShowType.White:
            ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 2;
            break;
          case IAction_1.EFadeInScreenShowType.Black:
            ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 1;
        }
        ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, () => {
          this.FinishExecute(true);
        }, this.jwu.Ease?.Duration, this.jwu.ScreenType, true, true, undefined);
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewBgFadeBlackScreen, true, this.yDe);
      }
    }
  }
}
exports.LevelFlowFadeInScreen = LevelFlowFadeInScreen;
//# sourceMappingURL=LevelFlowFadeInScreen.js.map