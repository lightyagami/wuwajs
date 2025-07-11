"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraFadeLoading = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const BlackScreenFadeController_1 = require("../BlackScreen/BlackScreenFadeController");
const INTERLUDE_FADE_IN_TIME = 1;
const INTERLUDE_FADE_OUT_TIME = 1;
const INTERLUDE_LIMIT_TIME = 30;
class CameraFadeLoading {
  constructor() {
    this.ipi = false;
    this.opi = new UE.LinearColor(0, 0, 0, 1);
    this.kti = new UE.LinearColor(1, 1, 1, 1);
  }
  EnterInterlude(e = INTERLUDE_FADE_IN_TIME, a = false, r = true, t = undefined, i = IAction_1.EFadeInScreenShowType.Black, o) {
    e = MathUtils_1.MathUtils.Clamp(e, 0, INTERLUDE_LIMIT_TIME);
    this.rpi(e * TimeUtil_1.TimeUtil.InverseMillisecond, a, r, t, i, o);
  }
  ExitInterlude(e = INTERLUDE_FADE_OUT_TIME, a) {
    e = MathUtils_1.MathUtils.Clamp(e, 0, INTERLUDE_LIMIT_TIME);
    this.npi(e * TimeUtil_1.TimeUtil.InverseMillisecond, a);
  }
  IsInFade() {
    return this.ipi;
  }
  IsInFadeOut() {
    return ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeHidePromise !== undefined;
  }
  rpi(e = 1, a = false, r = true, t = undefined, i = IAction_1.EFadeInScreenShowType.Black, o) {
    if (!this.ipi) {
      this.ipi = true;
      var _ = Global_1.Global.CharacterCameraManager;
      if (i) {
        switch (i) {
          case IAction_1.EFadeInScreenShowType.White:
            _.FadeColor = this.kti;
            break;
          case IAction_1.EFadeInScreenShowType.Black:
            _.FadeColor = this.opi;
        }
      }
      BlackScreenFadeController_1.BlackScreenFadeController.ChangeColor(i);
      this.spi(e, a, r, t).finally(o);
    }
  }
  npi(e = 1, a) {
    this.api(e).finally(() => {
      this.ipi = false;
      a?.();
    });
  }
  async spi(e, a = false, r = true, t = undefined) {
    BlackScreenFadeController_1.BlackScreenFadeController.AddFadeBlackScreen(e, a, r, t, "CameraFadeLoading:FadeIn");
    await ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeShowPromise?.Promise;
  }
  async api(e) {
    BlackScreenFadeController_1.BlackScreenFadeController.RemoveFadeBlackScreen(e, "CameraFadeLoading:FadeOut");
    await ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeHidePromise?.Promise;
  }
  ColorSearch() {
    if (Global_1.Global.CharacterCameraManager.FadeColor.R >= 0.5 && Global_1.Global.CharacterCameraManager.FadeColor.G >= 0.5 && Global_1.Global.CharacterCameraManager.FadeColor.B >= 0.5) {
      return IAction_1.EFadeInScreenShowType.White;
    } else {
      return IAction_1.EFadeInScreenShowType.Black;
    }
  }
  SetColor(e) {
    if (!this.IsInFade()) {
      return false;
    }
    var a = Global_1.Global.CharacterCameraManager;
    if (e) {
      switch (e) {
        case IAction_1.EFadeInScreenShowType.White:
          a.FadeColor = this.kti;
          break;
        case IAction_1.EFadeInScreenShowType.Black:
          a.FadeColor = this.opi;
      }
    }
    BlackScreenFadeController_1.BlackScreenFadeController.ChangeColor(e);
    return true;
  }
}
exports.CameraFadeLoading = CameraFadeLoading;
//# sourceMappingURL=CameraFadeLoading.js.map