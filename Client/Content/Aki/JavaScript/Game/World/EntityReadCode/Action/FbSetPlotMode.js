"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetPlotMode = undefined;
const FbFadeInScreen_1 = require("./FbFadeInScreen");
class FbSetPlotMode {
  constructor(t) {
    this.FbDataInternal = t;
    this.Lmh = false;
    this.NMr = undefined;
    this.Omh = false;
    this.Fmh = false;
    this.Nmh = false;
    this.Vmh = false;
    this.jmh = false;
    this.Hmh = false;
    this.Wmh = false;
    this.Qmh = false;
    this.Kmh = false;
    this.$mh = false;
    this.Xmh = false;
    this.Ymh = false;
    this.zmh = false;
    this.Jmh = false;
    this.Zmh = false;
    this.eCh = undefined;
    this.tCh = false;
    this.iCh = false;
  }
  static Create(t) {
    if (t) {
      return new FbSetPlotMode(t);
    }
  }
  get Mode() {
    if (!this.Lmh) {
      this.Lmh = true;
      this.NMr = this.FbDataInternal.mode();
    }
    return this.NMr;
  }
  get IsSwitchMainRole() {
    if (!this.Omh) {
      this.Omh = true;
      this.Fmh = this.FbDataInternal.isSwitchMainRole();
    }
    return this.Fmh;
  }
  get UseFlowCamera() {
    if (!this.Nmh) {
      this.Nmh = true;
      this.Vmh = this.FbDataInternal.useFlowCamera();
    }
    return this.Vmh;
  }
  get Interruptible() {
    if (!this.jmh) {
      this.jmh = true;
      this.Hmh = this.FbDataInternal.interruptible();
    }
    return this.Hmh;
  }
  get NoSkip() {
    if (!this.Wmh) {
      this.Wmh = true;
      this.Qmh = this.FbDataInternal.noSkip();
    }
    return this.Qmh;
  }
  get DisableAutoFadeOut() {
    if (!this.Kmh) {
      this.Kmh = true;
      this.$mh = this.FbDataInternal.disableAutoFadeOut();
    }
    return this.$mh;
  }
  get WaitForPlayerMotionEnd() {
    if (!this.Xmh) {
      this.Xmh = true;
      this.Ymh = this.FbDataInternal.waitForPlayerMotionEnd();
    }
    return this.Ymh;
  }
  get NoUiEnterAnimation() {
    if (!this.zmh) {
      this.zmh = true;
      this.Jmh = this.FbDataInternal.noUiEnterAnimation();
    }
    return this.Jmh;
  }
  get FastFadeIn() {
    if (!this.Zmh) {
      this.Zmh = true;
      this.eCh = FbFadeInScreen_1.FbFadeInScreen.Create(this.FbDataInternal.fastFadeIn());
    }
    return this.eCh;
  }
  get KeepMainRolePose() {
    if (!this.tCh) {
      this.tCh = true;
      this.iCh = this.FbDataInternal.keepMainRolePose();
    }
    return this.iCh;
  }
}
exports.FbSetPlotMode = FbSetPlotMode;
//# sourceMappingURL=FbSetPlotMode.js.map