"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuaranteeActionBlackScreenFadeOut = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionBlackScreenFadeOut extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    if (ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 45, "保底黑幕结束");
      }
      ModelManager_1.ModelManager.PlotModel.IsFadeIn = false;
      Global_1.Global.CharacterCameraManager.FadeAmount = 0;
      ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0, () => {
        ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 0;
      }, 1);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 45, "执行到了保底黑幕结束,但因为不需要保底被return");
    }
  }
}
exports.GuaranteeActionBlackScreenFadeOut = GuaranteeActionBlackScreenFadeOut;
//# sourceMappingURL=GuaranteeActionBlackScreenFadeOut.js.map