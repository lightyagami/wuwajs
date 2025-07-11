"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const AnimalStateMachineComponent_1 = require("../../../../NewWorld/Character/Animal/Component/AnimalStateMachineComponent");
const ServerGmController_1 = require("../../../../World/Controller/ServerGmController");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
class TsTaskSwitchAnimalState extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.State = 0;
    this.ReceiveExecuteTime = -0;
    this.WaitTime = -0;
  }
  Constructor() {
    super.Constructor();
    this.ReceiveExecuteTime = -0;
    this.WaitTime = -0;
  }
  ReceiveExecuteAI(e, t) {
    var r = e.AiController;
    if (r) {
      r = r.CharActorComp.Entity.GetComponent(14);
      if (ServerGmController_1.ServerGmController.AnimalDebug && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AI", 6, "AnimalDebug SwitchAnimalState", ["Tree", this.TreeAsset?.GetName()], ["CurrentState", r.CurrentState()], ["TargetState", this.State]);
      }
      if (r.CurrentState() === this.State) {
        this.FinishExecute(true);
      } else {
        r.SwitchState(AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetTsState(this.State));
        this.WaitTime = r.GetWaitTime();
        this.ReceiveExecuteTime = Time_1.Time.WorldTimeSeconds;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  ReceiveTickAI(e, t, r) {
    var i = e.AiController;
    if (i) {
      if (this.ReceiveExecuteTime + this.WaitTime < Time_1.Time.WorldTimeSeconds) {
        (i = i.CharActorComp.Entity.GetComponent(14)).SwitchState(AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetTsState(0));
        if (ServerGmController_1.ServerGmController.AnimalDebug && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AI", 6, "AnimalDebug SwitchAnimalState2", ["Tree", this.TreeAsset?.GetName()], ["CurrentState", i.CurrentState()]);
        }
        this.FinishExecute(true);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  ReceiveAbortAI(e, t) {
    e = e.AiController;
    if (e) {
      e.CharActorComp?.Entity?.GetComponent(14)?.SwitchState(AnimalStateMachineComponent_1.AnimalStateMachineComponent.GetTsState(0));
    }
    this.FinishAbort();
  }
}
exports.default = TsTaskSwitchAnimalState;
//# sourceMappingURL=TsTaskSwitchAnimalState.js.map