"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const ServerGmController_1 = require("../../../../World/Controller/ServerGmController");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
class TsTaskAnimalStopBornPerformance extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.GuaranteeTime = 15;
    this.ReceiveExecuteTime = -0;
  }
  Constructor() {
    super.Constructor();
    this.ReceiveExecuteTime = -0;
  }
  ReceiveExecuteAI(e, r) {
    var o = e.AiController;
    if (o) {
      o = o.CharActorComp.Entity.GetComponent(14);
      if (ServerGmController_1.ServerGmController.AnimalDebug && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AI", 6, "AnimalDebug StopBornPerformance1", ["Tree", this.TreeAsset?.GetName()], ["CurrentState", o.CurrentState()]);
      }
      if (o.CurrentTsState() !== 0) {
        this.FinishExecute(true);
      } else {
        o.GetState(0).InterruptBornPerformance(() => {
          this.FinishExecute(true);
        });
        this.ReceiveExecuteTime = Time_1.Time.WorldTimeSeconds;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  ReceiveTickAI(e, r, o) {
    var t = e.AiController;
    if (t) {
      if (this.ReceiveExecuteTime + this.GuaranteeTime < Time_1.Time.WorldTimeSeconds) {
        t = t.CharActorComp.Entity.GetComponent(14);
        if (ServerGmController_1.ServerGmController.AnimalDebug && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AI", 6, "AnimalDebug StopBornPerformance3", ["Tree", this.TreeAsset?.GetName()], ["CurrentState", t.CurrentState()]);
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
}
exports.default = TsTaskAnimalStopBornPerformance;
//# sourceMappingURL=TsTaskAnimalStopBornPerformance.js.map