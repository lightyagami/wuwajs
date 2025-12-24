"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventEnterMovieMode = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnterMovieMode extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var i = {
      BlendTime: e.BorderAnimDuration ?? CommonParamById_1.configCommonParamById.GetIntConfig("EnterMovieModeTimeThreshold") ?? 1,
      MovieCameraConfig: e.MovieCameraConfig,
      DelayDuration: e.EnableFuncConfig?.DelayDuration,
      IsEnableEsc: e.EnableFuncConfig?.IsEnableEsc,
      IsEnablePhoto: e.EnableFuncConfig?.IsEnablePhoto,
      IsAutoExitInFlowSequence: e.AutoExitInFlow,
      IsBanAdaptation: !GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.FlowAdaptation)
    };
    this.uhf(i, e.DurationType);
  }
  async uhf(e, t) {
    const i = new CustomPromise_1.CustomPromise();
    ControllerHolder_1.ControllerHolder.MovieModeController.EnterMovieMode(e, e => {
      i.SetResult();
    });
    if (t) {
      if (t.Type === "BorderAnimFinished") {
        await i.Promise;
      } else if (t.Type === "FixedTime") {
        await TimerSystem_1.GameplayTimerSystem.Wait(t.Duration * TimeUtil_1.TimeUtil.InverseMillisecond);
      }
    }
    this.FinishExecute(true);
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(true);
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddGuaranteeAction, this.Type, this.BaseContext, {
      Name: "ActionExitMovieMode"
    });
  }
}
exports.LevelEventEnterMovieMode = LevelEventEnterMovieMode;
//# sourceMappingURL=LevelEventEnterMovieMode.js.map