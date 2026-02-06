"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowRestorePlayerCameraAdjustment = undefined;
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ConfigCurveUtils_1 = require("../../Utils/ConfigCurveUtils");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowRestorePlayerCameraAdjustment extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
    this.TDe = undefined;
  }
  Init(e) {
    this.OPt = e;
    return this;
  }
  OnExecute() {
    if (!this.OPt) {
      this.FinishExecute(false);
    }
    var e;
    var t;
    var r = Global_1.Global.BaseCharacter;
    if (r && this.OPt?.ResetFocus) {
      e = this.OPt.ResetFocus.FadeInTime;
      t = ConfigCurveUtils_1.ConfigCurveUtils.CreateCurveByBaseCurve(this.OPt.ResetFocus.FadeInCurve);
      r.GetEntityNoBlueprint().GetComponent(34).ResetPitch(e, t);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 38, "离开相机调整");
    }
    var r = this.OPt?.ResetFocus?.FadeInTime;
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.RestoreCameraFromAdjust(r);
    if (r && r > 0) {
      this.TDe = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.FinishExecute(true);
      }, r * MathUtils_1.MathUtils.SecondToMillisecond);
    } else {
      this.FinishExecute(true);
    }
  }
  OnComplete(e) {
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
}
exports.LevelFlowRestorePlayerCameraAdjustment = LevelFlowRestorePlayerCameraAdjustment;
//# sourceMappingURL=LevelFlowRestorePlayerCameraAdjustment.js.map