"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventFadeOutScreen = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const PlotModel_1 = require("../../Module/Plot/PlotModel");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventFadeOutScreen extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.yDe = () => {
      this.FinishExecute(true);
    };
  }
  ExecuteNew(e, r) {
    if (e) {
      e = e;
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
    }
  }
  ExecuteInGm(e, r) {
    ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0, () => {
      this.FinishExecute(true);
      ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 0;
    }, 0);
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemGuaranteeAction, this.Type, this.BaseContext, {
      Name: "ActionBlackScreenFadeOut"
    });
  }
}
exports.LevelEventFadeOutScreen = LevelEventFadeOutScreen;
//# sourceMappingURL=LevelEventFadeOutScreen.js.map