"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiPlan = exports.LevelAiPlanLevel = exports.LevelAiPlanStep = exports.SubNodesInfo = exports.LevelAiPlanStepId = undefined;
const Log_1 = require("../../../Core/Common/Log");
class LevelAiPlanStepId {
  constructor(t = -1, e = -1) {
    this.LevelIndex = t;
    this.StepIndex = e;
  }
  Reset() {
    this.LevelIndex = -1;
    this.StepIndex = -1;
  }
  CopyFrom(t) {
    this.LevelIndex = t.LevelIndex;
    this.StepIndex = t.StepIndex;
  }
  Equal(t) {
    return this.LevelIndex === t.LevelIndex && this.StepIndex === t.StepIndex;
  }
  static Equal(t, e) {
    return t.LevelIndex === e.LevelIndex && t.StepIndex === e.StepIndex;
  }
}
(exports.LevelAiPlanStepId = LevelAiPlanStepId).None = new LevelAiPlanStepId(-1, -1);
class SubNodesInfo {
  constructor() {
    this.SubDecorators = new Array();
    this.LastFrameSubNodesTicked = -1;
    this.SubNodesExecuting = false;
  }
}
exports.SubNodesInfo = SubNodesInfo;
class LevelAiPlanStep {
  constructor(t, e, s = 0, i = -1) {
    this.Node = t;
    this.WorldState = e;
    this.SubNodesInfo = new SubNodesInfo();
    this.SubLevelIndex = i;
    this.Cost = Math.max(0, s);
  }
}
exports.LevelAiPlanStep = LevelAiPlanStep;
class LevelAiPlanLevel {
  constructor(t, e = LevelAiPlanStepId.None) {
    this.Steps = new Array();
    this.WorldStateAtLevelStart = t;
    this.RootSubNodesInfo = new SubNodesInfo();
    this.ParentStepId = new LevelAiPlanStepId();
    this.ParentStepId.CopyFrom(e);
    this.Cost = 0;
  }
  MakeCopy() {
    var e = new LevelAiPlanLevel(this.WorldStateAtLevelStart, this.ParentStepId);
    e.Steps.length = this.Steps.length;
    for (let t = 0; t < this.Steps.length; ++t) {
      e.Steps[t] = this.Steps[t];
    }
    e.Cost = this.Cost;
    return e;
  }
}
exports.LevelAiPlanLevel = LevelAiPlanLevel;
class LevelAiPlan {
  constructor(t, e) {
    this.Levels = new Array();
    this.yIe = t;
    if (e) {
      this.Levels.push(new LevelAiPlanLevel(e));
    }
    this.Cost = 0;
  }
  HasLevel(t) {
    return t < this.Levels.length && this.Levels[t] !== undefined;
  }
  HasStep(t, e = 0) {
    var s;
    return !!this.HasLevel(t.LevelIndex) && !!this.HasLevel(e) && (t.LevelIndex === e ? (s = this.Levels[e], t.StepIndex < s.Steps.length && s.Steps[t.StepIndex] !== undefined) : t.LevelIndex !== 0 && this.HasStep(this.Levels[t.LevelIndex].ParentStepId, e));
  }
  GetStep(t) {
    if (t) {
      var e = this.Levels[t.LevelIndex];
      if (e) {
        return e.Steps[t.StepIndex];
      }
    }
  }
  IsComplete() {
    for (let t = 0; t < this.Levels.length; ++t) {
      if (!this.IsLevelComplete(t)) {
        return false;
      }
    }
    return true;
  }
  IsLevelComplete(t) {
    var e;
    return !!this.HasLevel(t) && (t = this.Levels[t]).Steps.length !== 0 && !(e = t.Steps.length - 1, (e = (t = t.Steps[e]).SubLevelIndex !== -1) || t.Node !== undefined && !t.Node.PlanNextNodesAfterThis ? e && !this.IsLevelComplete(t.SubLevelIndex) : t.Node.NextNodes.length !== 0);
  }
  FindStepToAddAfter(e) {
    for (let t = this.Levels.length - 1; t >= 0; --t) {
      var s;
      if (!this.IsLevelComplete(t)) {
        s = this.Levels[t];
        e.LevelIndex = t;
        e.StepIndex = s.Steps.length ? s.Steps.length - 1 : -1;
        return true;
      }
    }
    e.Reset();
    return false;
  }
  GetNextNodes(t) {
    var e;
    var s = this.Levels[t.LevelIndex];
    if (t.StepIndex === -1) {
      if (s.ParentStepId.Equal(LevelAiPlanStepId.None)) {
        return this.yIe.StartNodes.values();
      } else if (e = this.GetStep(s.ParentStepId)) {
        return e.Node.NextNodes.values();
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelAi", 29, "子层的父节点未定义");
        }
        return;
      }
    } else {
      return s.Steps[t.StepIndex].Node.NextNodes.values();
    }
  }
  GetWorldState(t) {
    var e = this.Levels[t.LevelIndex];
    if (t.StepIndex === -1) {
      return e.WorldStateAtLevelStart;
    } else {
      return e.Steps[t.StepIndex].WorldState;
    }
  }
  MakeCopy() {
    var e = new LevelAiPlan(this.yIe, undefined);
    e.Levels.length = this.Levels.length;
    for (let t = 0; t < this.Levels.length; ++t) {
      e.Levels[t] = this.Levels[t].MakeCopy();
    }
    e.Cost = this.Cost;
    return e;
  }
  GetSubNodesAtPlanStep(e, s) {
    if (this.HasStep(e)) {
      let t = e;
      while (true) {
        var i = this.Levels[t.LevelIndex];
        var r = i.Steps[t.StepIndex];
        s.push(r.SubNodesInfo);
        s.push(i.RootSubNodesInfo);
        if (!(t.LevelIndex > 0)) {
          break;
        }
        t = i.ParentStepId;
      }
    }
  }
}
exports.LevelAiPlan = LevelAiPlan;
//# sourceMappingURL=LevelAiPlan.js.map