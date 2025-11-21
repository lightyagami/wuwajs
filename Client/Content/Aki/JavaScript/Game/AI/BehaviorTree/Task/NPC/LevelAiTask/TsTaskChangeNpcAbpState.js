"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
const DEFAULT_BLEND_TIME = 100;
class TsTaskChangeNpcAbpState extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.EntityId = 0;
    this.TargetState = "";
    this.Handle = undefined;
  }
  Constructor() {
    super.Constructor();
    this.Handle = undefined;
  }
  ReceiveExecuteAI(e, t) {
    var s = e.AiController;
    if (s) {
      const i = s.CharActorComp?.Entity?.GetComponent(190);
      if (i) {
        this.Handle = TimerSystem_1.TimerSystem.Delay(() => {
          this.Handle = undefined;
          i.PerformSwitchState(3, {
            TargetStateName: this.TargetState,
            IsNoTransition: false,
            Context: "TsTaskChangeNpcApbState"
          }, undefined, () => {
            this.FinishExecute(true);
          });
        }, DEFAULT_BLEND_TIME);
      } else {
        this.FinishExecute(true);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(true);
    }
  }
  OnAbort() {
    if (this.Handle) {
      TimerSystem_1.TimerSystem.Remove(this.Handle);
    }
    this.Handle = undefined;
  }
}
exports.default = TsTaskChangeNpcAbpState;
//# sourceMappingURL=TsTaskChangeNpcAbpState.js.map