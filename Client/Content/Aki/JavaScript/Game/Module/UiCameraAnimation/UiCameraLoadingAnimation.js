"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraLoadingAnimation = undefined;
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent");
const UiCameraManager_1 = require("../UiCamera/UiCameraManager");
class UiCameraLoadingAnimation {
  constructor() {
    this.Cce = 0;
    this.uAo = -0;
    this.jPo = -0;
    this.WPo = -0;
    this.KPo = -0;
    this.QPo = -0;
    this.IsPlaying = false;
    this.XPo = undefined;
    this.XUo = undefined;
    this.$Po = undefined;
  }
  Initialize() {}
  Play(i, t, s) {
    this.XUo = UiCameraManager_1.UiCameraManager.Get();
    this.$Po = this.XUo.GetUiCameraComponent(UiCameraPostEffectComponent_1.UiCameraPostEffectComponent);
    this.Cce = 0;
    this.uAo = i;
    this.KPo = this.$Po.GetManualFocusDistance();
    this.QPo = this.$Po.GetCurrentAperture();
    this.jPo = t;
    this.WPo = s;
    this.IsPlaying = true;
  }
  Stop() {
    this.uAo = 0;
    this.IsPlaying = false;
    this.XPo = undefined;
  }
  Tick(i) {
    var t;
    var s;
    if (this.uAo && this.IsPlaying) {
      if (this.Cce >= this.uAo) {
        this.XPo?.SetResult();
        this.Stop();
      } else {
        t = MathUtils_1.MathUtils.Lerp(this.KPo, this.jPo, this.Cce / this.uAo);
        s = MathUtils_1.MathUtils.Lerp(this.QPo, this.WPo, this.Cce / this.uAo);
        this.$Po.SetCameraFocalDistance(t);
        this.$Po.SetCameraAperture(s);
        this.Cce += 10;
      }
    }
  }
}
exports.UiCameraLoadingAnimation = UiCameraLoadingAnimation;
//# sourceMappingURL=UiCameraLoadingAnimation.js.map