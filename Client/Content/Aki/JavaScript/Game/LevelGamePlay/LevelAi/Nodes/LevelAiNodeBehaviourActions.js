"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiNodeBehaviourActions = undefined;
const LevelAiPlan_1 = require("../LevelAiPlan");
const LevelAiRegistry_1 = require("../LevelAiRegistry");
const LevelAiStandaloneNode_1 = require("../LevelAiStandaloneNode");
const LevelAiTaskSuccess_1 = require("../Tasks/LevelAiTaskSuccess");
class LevelAiNodeBehaviourActions extends LevelAiStandaloneNode_1.LevelAiStandaloneNode {
  constructor() {
    super(...arguments);
    this.Actions = undefined;
    this.CanRecordPlanProgress = false;
    this.Cost = 0;
    this.ITe = false;
    this.TTe = new LevelAiPlan_1.LevelAiPlanStepId();
  }
  MakePlanExpansions(e, i) {
    var s;
    var t;
    var n;
    if (this.Actions !== undefined) {
      this.PrintDescription("Behaviour Actions Make Plan Expansions", ["LevelIndex", e.CurrentLevelIndex], ["StepIndex", e.CurrentStepIndex]);
      if (!this.ITe) {
        this.LTe();
      }
      if (!this.CanRecordPlanProgress) {
        this.TTe.Reset();
      }
      s = (n = e.MakePlanCopyWithAddedStep()).PlanCopy;
      t = n.OutAddedStep;
      n = n.OutAddedStepId;
      t.SubLevelIndex = e.AddLevel(s, n);
      e.SubmitCandidatePlan(s);
    }
  }
  GetNextSteps(e, i) {
    if (!this.TTe.Equal(LevelAiPlan_1.LevelAiPlanStepId.None)) {
      var s = this.TTe.LevelIndex;
      var t = this.TTe.StepIndex;
      if (e.IsExecutingPlan) {
        this.TTe.Reset();
      }
      if (s >= 0 && t >= 0) {
        e.AddNextStepsAfter(new LevelAiPlan_1.LevelAiPlanStepId(s, t - 1));
        return;
      }
    }
    s = e.GetStep(i);
    e.AddNextStepsAfter(new LevelAiPlan_1.LevelAiPlanStepId(s.SubLevelIndex));
  }
  OnSubLevelStepFinished(e, i, s, t, n) {
    if (t === 2) {
      this.TTe.CopyFrom(s);
    }
    return true;
  }
  LTe() {
    var e = new LevelAiTaskSuccess_1.LevelAiTaskSuccess();
    e.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description);
    e.Cost = this.Cost;
    this.NextNodes.push(e);
    var i = LevelAiRegistry_1.LevelAiRegistry.Instance();
    let s = e;
    for (let e = 0; e < this.Actions.length; ++e) {
      var t = this.Actions[e];
      var n = new (i.FindTaskCtor(t.Name))();
      n.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " 任务" + e, t.Params);
      s.NextNodes.push(n);
      s = n;
    }
    this.ITe = true;
  }
}
exports.LevelAiNodeBehaviourActions = LevelAiNodeBehaviourActions;
//# sourceMappingURL=LevelAiNodeBehaviourActions.js.map