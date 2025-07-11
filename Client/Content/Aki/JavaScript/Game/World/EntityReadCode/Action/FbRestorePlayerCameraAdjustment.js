"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRestorePlayerCameraAdjustment = undefined;
const FbResetFocusConfig_1 = require("./FbResetFocusConfig");
class FbRestorePlayerCameraAdjustment {
  constructor(e) {
    this.FbDataInternal = e;
    this.obh = false;
    this.nbh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbRestorePlayerCameraAdjustment(e);
    }
  }
  get ResetFocus() {
    if (!this.obh) {
      this.obh = true;
      this.nbh = FbResetFocusConfig_1.FbResetFocusConfig.Create(this.FbDataInternal.resetFocus());
    }
    return this.nbh;
  }
}
exports.FbRestorePlayerCameraAdjustment = FbRestorePlayerCameraAdjustment;
//# sourceMappingURL=FbRestorePlayerCameraAdjustment.js.map