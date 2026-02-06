"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuaranteeActionCenter = undefined;
const GuaranteeActionBlackScreenFadeOut_1 = require("./GuaranteeActions/GuaranteeActionBlackScreenFadeOut");
const GuaranteeActionDisableKey4Func_1 = require("./GuaranteeActions/GuaranteeActionDisableKey4Func");
const GuaranteeActionDisableSplineMoveModel_1 = require("./GuaranteeActions/GuaranteeActionDisableSplineMoveModel");
const GuaranteeActionEnablePlayerMoveControl_1 = require("./GuaranteeActions/GuaranteeActionEnablePlayerMoveControl");
const GuaranteeActionExitMovieMode_1 = require("./GuaranteeActions/GuaranteeActionExitMovieMode");
const GuaranteeActionExitOrbitalCamera_1 = require("./GuaranteeActions/GuaranteeActionExitOrbitalCamera");
const GuaranteeActionPreload_1 = require("./GuaranteeActions/GuaranteeActionPreload");
const GuaranteeActionRestorePlayerCameraAdjustment_1 = require("./GuaranteeActions/GuaranteeActionRestorePlayerCameraAdjustment");
const GuaranteeActionStopEffect_1 = require("./GuaranteeActions/GuaranteeActionStopEffect");
const GuaranteeActionStopGamepadShake_1 = require("./GuaranteeActions/GuaranteeActionStopGamepadShake");
const GuaranteeActionUnLimitPlayerOperation_1 = require("./GuaranteeActions/GuaranteeActionUnLimitPlayerOperation");
class GuaranteeActionCenter {
  static RegGuaranteeActions() {
    var e = GuaranteeActionCenter.tIe;
    e("RestorePlayerCameraAdjustment", GuaranteeActionRestorePlayerCameraAdjustment_1.GuaranteeActionRestorePlayerCameraAdjustment);
    e("EnablePlayerMoveControl", GuaranteeActionEnablePlayerMoveControl_1.GuaranteeActionEnablePlayerMoveControl);
    e("UnLimitPlayerOperation", GuaranteeActionUnLimitPlayerOperation_1.GuaranteeActionUnLimitPlayerOperation);
    e("ExitOrbitalCamera", GuaranteeActionExitOrbitalCamera_1.GuaranteeActionExitOrbitalCamera);
    e("ActionBlackScreenFadeOut", GuaranteeActionBlackScreenFadeOut_1.GuaranteeActionBlackScreenFadeOut);
    e("DisableSplineMoveModel", GuaranteeActionDisableSplineMoveModel_1.GuaranteeActionDisableSplineMoveModel);
    e("StopEffect", GuaranteeActionStopEffect_1.GuaranteeActionStopEffect, 2);
    e("Preload", GuaranteeActionPreload_1.GuaranteeActionPreload);
    e("DisableKey4Func", GuaranteeActionDisableKey4Func_1.GuaranteeActionDisableKey4Func);
    e("ActionExitMovieMode", GuaranteeActionExitMovieMode_1.GuaranteeActionExitMovieMode);
    e("StopGamepadShake", GuaranteeActionStopGamepadShake_1.GuaranteeActionStopGamepadShake);
  }
  static GetGuaranteeAction(e) {
    e = GuaranteeActionCenter.iIe.get(e);
    if (e) {
      return new e();
    }
  }
  static GetActionFilterMode(e) {
    return this.oIe.get(e) ?? 0;
  }
}
(exports.GuaranteeActionCenter = GuaranteeActionCenter).iIe = new Map();
GuaranteeActionCenter.oIe = new Map();
GuaranteeActionCenter.tIe = (e, t, a = 1) => {
  if (!GuaranteeActionCenter.iIe.has(e)) {
    GuaranteeActionCenter.iIe.set(e, t);
  }
  if (!GuaranteeActionCenter.oIe.has(e)) {
    GuaranteeActionCenter.oIe.set(e, a);
  }
}; //# sourceMappingURL=GuaranteeActionCenter.js.map