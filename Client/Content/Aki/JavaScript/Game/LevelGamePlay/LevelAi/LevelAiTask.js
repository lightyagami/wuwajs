"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiTask = undefined;
const LevelAiStandaloneNode_1 = require("./LevelAiStandaloneNode");
class LevelAiTask extends LevelAiStandaloneNode_1.LevelAiStandaloneNode {
  constructor() {
    super(...arguments);
    this.NotifyTick = false;
    this.NotifyTaskFinished = false;
    this.Params = undefined;
  }
  Serialize(e, s, t, i) {
    super.Serialize(e, s, t);
    this.Params = i;
  }
  MakePlanExpansions(e, s) {
    this.PrintDescription("Task Make Plan Expansions", ["LevelIndex", e.CurrentLevelIndex], ["StepIndex", e.CurrentStepIndex]);
    this.CreatePlanSteps(e, s.MakeCopy());
  }
  WrappedExecuteTask() {
    this.PrintDescription("Execute Task");
    return this.ExecuteTask();
  }
  WrappedAbortTask() {
    this.PrintDescription("Abort Task");
    return this.AbortTask();
  }
  WrappedTickTask(e) {
    if (this.NotifyTick) {
      this.TickTask(e);
    }
  }
  WrappedOnTaskFinished(e) {
    if (this.NotifyTaskFinished) {
      this.PrintDescription("Task Finished", ["Result", e]);
      this.OnTaskFinished(e);
    }
  }
  CreatePlanSteps(e, s) {
    e.SubmitCandidatePlanStep(this, s, 0);
  }
  FinishLatentTask(e) {
    var s = this.CharacterPlanComponent.FindActiveTaskInfo(this);
    if (s) {
      s.PlanInstance.OnTaskFinished(this, s.PlanStepId, e);
    }
  }
  ExecuteTask() {
    return 0;
  }
  AbortTask() {
    return 2;
  }
  TickTask(e) {}
  OnTaskFinished(e) {}
}
exports.LevelAiTask = LevelAiTask;
//# sourceMappingURL=LevelAiTask.js.map