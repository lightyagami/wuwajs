"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiPlanner = exports.PlanningContext = undefined;
const Log_1 = require("../../../Core/Common/Log");
const PriorityQueue_1 = require("../../../Core/Container/PriorityQueue");
const LevelAiPlan_1 = require("./LevelAiPlan");
class PlanningContext {
  constructor(t, i, e, s, n) {
    this.sTe = undefined;
    this.aTe = undefined;
    this.hTe = undefined;
    this.lTe = undefined;
    this._Te = undefined;
    this.sTe = t;
    this.aTe = i;
    this.hTe = e;
    this.lTe = s;
    this._Te = n;
  }
  get CurrentLevelIndex() {
    return this.lTe.LevelIndex;
  }
  get CurrentStepIndex() {
    return this.lTe.StepIndex;
  }
  MakePlanCopyWithAddedStep() {
    var t = this.hTe.MakeCopy();
    var i = t.Levels[this.lTe.LevelIndex];
    var e = new LevelAiPlan_1.LevelAiPlanStep(this.aTe, this._Te);
    i.Steps.push(e);
    var i = new LevelAiPlan_1.LevelAiPlanStepId(this.lTe.LevelIndex, i.Steps.length - 1);
    return {
      PlanCopy: t,
      OutAddedStep: e,
      OutAddedStepId: i
    };
  }
  AddLevel(t, i = LevelAiPlan_1.LevelAiPlanStepId.None) {
    return t.Levels.push(new LevelAiPlan_1.LevelAiPlanLevel(this._Te, i)) - 1;
  }
  SubmitCandidatePlanStep(t, i, e) {
    var s = this.hTe.MakeCopy();
    var t = new LevelAiPlan_1.LevelAiPlanStep(t, i, e);
    var i = s.Levels[this.lTe.LevelIndex];
    i.Steps.push(t);
    i.Cost += e;
    s.Cost += e;
    this.SubmitCandidatePlan(s);
  }
  SubmitCandidatePlan(t) {
    this.sTe.SubmitCandidatePlan(t);
  }
}
exports.PlanningContext = PlanningContext;
class LevelAiPlanner {
  constructor() {
    this.RIe = undefined;
    this.uTe = undefined;
    this.lTe = new LevelAiPlan_1.LevelAiPlanStepId();
    this.cTe = undefined;
    this.mTe = undefined;
    this.dTe = false;
    this.CTe = new PriorityQueue_1.PriorityQueue((t, i) => t.Cost - i.Cost);
    this.gTe = false;
    this.OnPlanningFinished = undefined;
  }
  get WasCanceled() {
    return this.dTe;
  }
  SetUp(t, i) {
    this.RIe = i;
    this.cTe = new LevelAiPlan_1.LevelAiPlan(t, this.RIe.WorldState.MakeCopy());
  }
  StartPlanning() {
    var t;
    if (!this.gTe) {
      t = this.cTe;
      this.Clear();
      this.CTe.Push(t);
      this.gTe = true;
      this.DoPlanning();
    }
  }
  CancelPlanning() {
    this.dTe = true;
    this.mTe = undefined;
    this.gTe = false;
  }
  DoPlanning() {
    if (!this.dTe) {
      while (true) {
        this.uTe = this.fTe();
        if (this.uTe === undefined) {
          this.pTe();
          return;
        }
        if (this.uTe.IsComplete()) {
          this.mTe = this.uTe;
          this.pTe();
          return;
        }
        this.vTe();
      }
    }
  }
  pTe() {
    this.MTe();
    this.CTe.Clear();
    this.OnPlanningFinished(this, this.mTe);
    this.gTe = false;
  }
  Clear() {
    this.MTe();
    this.cTe = undefined;
    this.CTe.Clear();
    this.mTe = undefined;
  }
  MTe() {
    this.uTe = undefined;
    this.lTe.Reset();
  }
  fTe() {
    if (!this.CTe.Empty) {
      return this.CTe.Pop();
    }
  }
  vTe() {
    if (!this.uTe.FindStepToAddAfter(this.lTe) || this.lTe.Equal(LevelAiPlan_1.LevelAiPlanStepId.None)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelAi", 29, "没有未完成的任务层", ["Owner", this.RIe.GetCreatureDataComponent().GetPbDataId()]);
      }
    } else {
      var t;
      var i = this.uTe.GetNextNodes(this.lTe);
      var e = this.uTe.GetWorldState(this.lTe);
      for (const s of i) {
        this.RIe.WorldStateProxy = e;
        if (LevelAiPlanner.ETe(s)) {
          t = new PlanningContext(this, s, this.uTe, this.lTe, e);
          s.MakePlanExpansions(t, e);
        }
      }
      this.MTe();
    }
  }
  static ETe(t) {
    return !!(t => {
      let i = 1;
      for (const s of t) {
        if (s) {
          var e = s.WrappedCheckCondition(0);
          if ((i = Math.min(i, e)) !== 1) {
            return false;
          }
        }
      }
      return true;
    })(t.Decorators);
  }
  SubmitCandidatePlan(t) {
    this.CTe.Push(t);
  }
}
exports.LevelAiPlanner = LevelAiPlanner;
//# sourceMappingURL=LevelAiPlanner.js.map