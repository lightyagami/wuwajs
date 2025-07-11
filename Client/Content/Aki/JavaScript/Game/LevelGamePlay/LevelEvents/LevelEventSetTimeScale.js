"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetTimeScale = undefined;
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetTimeScale extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 57, "[LevelEventSetTimeScale]");
    }
    if (e) {
      if (e.Config.Type === "Global") {
        e = e.Config.Config;
        if (LevelEventSetTimeScale.pE1?.Valid()) {
          LevelEventSetTimeScale.pE1.Remove();
          LevelEventSetTimeScale.pE1 = undefined;
        }
        if (e.Type === "Open") {
          const t = e.Duration * TimeUtil_1.TimeUtil.InverseMillisecond;
          if (t > 0 && (ControllerHolder_1.ControllerHolder.CharacterController.EnterSelfCenteredMode(3, e.TimeScale, e.Duration), LevelEventSetTimeScale.pE1 = TimerSystem_1.GameplayTimerSystem.Delay(() => {
            ControllerHolder_1.ControllerHolder.CharacterController.ExitSelfCenteredMode(3);
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("LevelEvent", 57, "[LevelEventSetTimeScale] AutoClose", ["interval(ms)", t]);
            }
          }, t), Log_1.Log.CheckInfo())) {
            Log_1.Log.Info("LevelEvent", 57, "[LevelEventSetTimeScale] Open", ["interval(ms)", t]);
          }
        } else if (e.Type === "Close" && (e.TimeScaleCloseSource === 1 ? ControllerHolder_1.ControllerHolder.CharacterController.ExitSelfCenteredMode(3) : e.TimeScaleCloseSource === 2 ? ControllerHolder_1.ControllerHolder.CharacterController.ExitSkillSelfCenteredMode() : ControllerHolder_1.ControllerHolder.CharacterController.ExitAllSelfCenteredMode(), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("LevelEvent", 57, "[LevelEventSetTimeScale] Close", ["TimeScaleCloseSource", e.TimeScaleCloseSource ?? -1]);
        }
      }
    } else {
      this.FinishExecute(true);
    }
  }
}
(exports.LevelEventSetTimeScale = LevelEventSetTimeScale).pE1 = undefined;
//# sourceMappingURL=LevelEventSetTimeScale.js.map