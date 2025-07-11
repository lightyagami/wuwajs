"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFadeInScreen = undefined;
const FbEaseData_1 = require("./FbEaseData");
class FbFadeInScreen {
  constructor(t) {
    this.FbDataInternal = t;
    this.rCh = false;
    this.oCh = undefined;
    this.nCh = false;
    this.sCh = undefined;
    this.aCh = false;
    this.hCh = undefined;
    this.lCh = false;
    this._Ch = false;
  }
  static Create(t) {
    if (t) {
      return new FbFadeInScreen(t);
    }
  }
  get TypeOverride() {
    if (!this.rCh) {
      this.rCh = true;
      this.oCh = this.FbDataInternal.typeOverride();
    }
    return this.oCh;
  }
  get Ease() {
    if (!this.nCh) {
      this.nCh = true;
      this.sCh = FbEaseData_1.FbEaseData.Create(this.FbDataInternal.ease());
    }
    return this.sCh;
  }
  get ScreenType() {
    if (!this.aCh) {
      this.aCh = true;
      this.hCh = this.FbDataInternal.screenType();
    }
    return this.hCh;
  }
  get KeepFadeAfterTreeEnd() {
    if (!this.lCh) {
      this.lCh = true;
      this._Ch = this.FbDataInternal.keepFadeAfterTreeEnd();
    }
    return this._Ch;
  }
}
exports.FbFadeInScreen = FbFadeInScreen;
//# sourceMappingURL=FbFadeInScreen.js.map