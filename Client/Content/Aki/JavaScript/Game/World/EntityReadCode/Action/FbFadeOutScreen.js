"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFadeOutScreen = undefined;
const FbEaseData_1 = require("./FbEaseData");
class FbFadeOutScreen {
  constructor(e) {
    this.FbDataInternal = e;
    this.nCh = false;
    this.sCh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbFadeOutScreen(e);
    }
  }
  get Ease() {
    if (!this.nCh) {
      this.nCh = true;
      this.sCh = FbEaseData_1.FbEaseData.Create(this.FbDataInternal.ease());
    }
    return this.sCh;
  }
}
exports.FbFadeOutScreen = FbFadeOutScreen;
//# sourceMappingURL=FbFadeOutScreen.js.map