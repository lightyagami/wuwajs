"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowEnterMovieMode = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowEnterMovieMode extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
  }
  Init(e) {
    this.OPt = e;
    return this;
  }
  OnExecute() {
    var e;
    if (this.OPt === undefined) {
      this.FinishExecute(false);
    } else {
      e = {
        BlendTime: this.OPt.BorderAnimDuration ?? CommonParamById_1.configCommonParamById.GetIntConfig("EnterMovieModeTimeThreshold") ?? 1,
        MovieCameraConfig: this.OPt.MovieCameraConfig,
        DelayDuration: this.OPt.EnableFuncConfig?.DelayDuration,
        IsEnableEsc: this.OPt.EnableFuncConfig?.IsEnableEsc,
        IsEnablePhoto: this.OPt.EnableFuncConfig?.IsEnablePhoto,
        IsAutoExitInFlowSequence: this.OPt.AutoExitInFlow
      };
      this.L1f(e, this.OPt.DurationType);
    }
  }
  async L1f(e, o) {
    const i = new CustomPromise_1.CustomPromise();
    ControllerHolder_1.ControllerHolder.MovieModeController.EnterMovieMode(e, e => {
      i.SetResult();
    });
    if (o) {
      if (o.Type === "BorderAnimFinished") {
        await i.Promise;
      } else if (o.Type === "FixedTime") {
        await TimerSystem_1.GameplayTimerSystem.Wait(o.Duration * TimeUtil_1.TimeUtil.InverseMillisecond);
      }
    }
    this.FinishExecute(true);
  }
}
exports.LevelFlowEnterMovieMode = LevelFlowEnterMovieMode;
//# sourceMappingURL=LevelFlowEnterMovieMode.js.map