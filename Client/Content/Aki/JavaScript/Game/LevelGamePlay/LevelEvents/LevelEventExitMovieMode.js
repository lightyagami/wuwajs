"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventExitMovieMode = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventExitMovieMode extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, i) {
    var o = {
      BlendTime: e.BorderAnimDuration ?? CommonParamById_1.configCommonParamById.GetIntConfig("ExitMovieModeTimeThreshold") ?? 1,
      BlackFadeInTime: e.FadeOutMaskConfig?.TransitionTime
    };
    this.P1f(o, e.DurationType);
  }
  async P1f(e, i) {
    const o = new CustomPromise_1.CustomPromise();
    ControllerHolder_1.ControllerHolder.MovieModeController.ExitMovieMode(e, e => {
      o.SetResult();
    });
    if (i) {
      if (i.Type === "BorderAnimFinished") {
        await o.Promise;
      } else if (i.Type === "FixedTime") {
        await TimerSystem_1.GameplayTimerSystem.Wait(i.Duration * TimeUtil_1.TimeUtil.InverseMillisecond);
      }
    }
    this.FinishExecute(true);
  }
  ExecuteInGm(e, i) {
    this.FinishExecute(true);
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemGuaranteeAction, this.Type, this.BaseContext, {
      Name: "ActionExitMovieMode"
    });
  }
}
exports.LevelEventExitMovieMode = LevelEventExitMovieMode;
//# sourceMappingURL=LevelEventExitMovieMode.js.map