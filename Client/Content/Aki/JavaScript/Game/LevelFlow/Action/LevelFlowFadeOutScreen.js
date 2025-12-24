"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowFadeOutScreen = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const PlotModel_1 = require("../../Module/Plot/PlotModel");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowFadeOutScreen extends LevelFlowActionBase_1.LevelFlowActionBase {
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
    var e;
    if (this.jwu) {
      e = this.jwu;
      ModelManager_1.ModelManager.PlotModel.IsFadeIn = false;
      if (ModelManager_1.ModelManager.PlotModel.BlackScreenType === 1 && ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelC") {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotViewBgFadeBlackScreen, false, this.yDe);
      } else {
        Global_1.Global.CharacterCameraManager.FadeAmount = 0;
        ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0, () => {
          this.FinishExecute(true);
          ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 0;
          ModelManager_1.ModelManager.PlotModel.LastPlotAspect = PlotModel_1.INVALID_NUM;
          ModelManager_1.ModelManager.PlotModel.LastPlotColor = PlotModel_1.INVALID_NUM;
        }, e?.Ease?.Duration);
      }
    } else {
      this.FinishExecute(false);
    }
  }
}
exports.LevelFlowFadeOutScreen = LevelFlowFadeOutScreen;
//# sourceMappingURL=LevelFlowFadeOutScreen.js.map