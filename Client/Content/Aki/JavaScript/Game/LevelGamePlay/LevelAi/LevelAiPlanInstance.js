"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiPlanInstance = exports.GetNextStepsContext = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const LevelAiDefines_1 = require("./LevelAiDefines");
const LevelAiPlan_1 = require("./LevelAiPlan");
const LevelAiPlanner_1 = require("./LevelAiPlanner");
class GetNextStepsContext {
  constructor(t, i, e) {
    this.IIe = t;
    this.IsExecutingPlan = i;
    this.TIe = e;
    this.LIe = 0;
  }
  SubmitPlanStep(t) {
    this.TIe.push(t);
    ++this.LIe;
  }
  AddNextStepsAfter(i) {
    if (!this.IIe.HasLevel(i.LevelIndex)) {
      return 0;
    }
    var e = this.LIe;
    var s = this.IIe.Levels[i.LevelIndex];
    for (let t = i.StepIndex + 1; t < s.Steps.length; ++t) {
      var r = s.Steps[t];
      var h = new LevelAiPlan_1.LevelAiPlanStepId(i.LevelIndex, t);
      r.Node.GetNextSteps(this, h);
      if (this.LIe - e > 0) {
        return this.LIe - e;
      }
    }
    if (s.ParentStepId.Equal(LevelAiPlan_1.LevelAiPlanStepId.None)) {
      return this.LIe - e;
    } else {
      return this.AddNextStepsAfter(s.ParentStepId);
    }
  }
  GetNumSubmittedSteps() {
    return this.LIe;
  }
  GetStep(t) {
    return this.IIe.GetStep(t);
  }
}
exports.GetNextStepsContext = GetNextStepsContext;
class LevelAiPlanInstance {
  constructor() {
    this.DIe = 0;
    this.RIe = undefined;
    this.UIe = new Array();
    this.AIe = new Array();
    this.PIe = new Array();
    this.xIe = undefined;
    this.wIe = undefined;
    this.BIe = false;
    this.kC = true;
    this.bIe = undefined;
    this.qIe = (t, i) => {
      var e;
      if (this.RIe && t === this.wIe) {
        e = t.WasCanceled;
        t.Clear();
        this.wIe = undefined;
        if (e) {
          this.Stop();
        } else if (this.DIe === 1) {
          if (i) {
            if (!this.GIe(i)) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("LevelAi", 29, "[OnPlanningTaskFinished] 执行规划失败");
              }
              this.Stop();
            }
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("LevelAi", 29, "[OnPlanningTaskFinished] 没有有效的规划");
            }
            this.Stop();
          }
        }
      }
    };
  }
  Initialize(t) {
    this.RIe = t;
  }
  IsPlanning() {
    return this.wIe !== undefined;
  }
  HasPlan() {
    return this.xIe !== undefined && this.BIe;
  }
  HasActiveTasks() {
    return this.UIe.length > 0 || this.AIe.length > 0 || this.PIe.length > 0;
  }
  HasActivePlan() {
    return this.HasPlan() && this.HasActiveTasks();
  }
  CanLoop() {
    return this.kC && !this.RIe.Paused;
  }
  Start() {
    if (this.DIe === 1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelAi", 29, "[Start] 执行中，忽略开始调用");
      }
    } else {
      this.DIe = 1;
      this.bIe = undefined;
      this.NIe();
      this.CancelActivePlanning();
      this.OIe();
    }
  }
  Tick(t) {
    if (this.DIe === 1 && !this.HasActivePlan() && !this.IsPlanning()) {
      this.OIe();
    }
    if (this.DIe === 1 && !this.HasActivePlan() && this.IsPlanning()) {
      this.wIe.DoPlanning();
    }
    if (this.HasActivePlan()) {
      this.kIe(t);
    }
  }
  Stop() {
    if (this.DIe !== 1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelAi", 29, "[Stop] 未执行，忽略停止调用");
      }
    } else {
      this.CancelActivePlanning();
      this.AbortCurrentPlan();
    }
  }
  Pause() {
    if (this.DIe !== 1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelAi", 29, "[Pause] 未执行，忽略Pause调用");
      }
    } else {
      if (!this.IsPlanning() && this.HasActiveTasks()) {
        this.bIe = this.xIe;
      }
      this.CancelActivePlanning();
      this.AbortCurrentPlan();
    }
  }
  Resume() {
    if (this.DIe === 1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelAi", 29, "[Resume] 执行中，忽略Resume调用");
      }
    } else {
      this.DIe = 1;
      this.NIe();
      this.CancelActivePlanning();
      if (this.FIe()) {
        this.GIe(this.bIe);
      } else {
        this.OIe();
      }
      this.bIe = undefined;
    }
  }
  RecheckCurrentPlan() {
    let t = undefined;
    for (this.BIe ? t = this.UIe.concat() : (t = new Array(), this.VIe(t, new LevelAiPlan_1.LevelAiPlanStepId(0), false)); t.length > 0;) {
      var i = t.pop();
      if (!this.HIe(i, false, true)) {
        return false;
      }
    }
    return true;
  }
  RePlan() {
    if (this.DIe !== 1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelAi", 29, "[RePlan] 未执行，忽略RePlan调用");
      }
    } else {
      this.AbortCurrentPlan();
      if (!this.IsPlanning()) {
        this.OIe();
      }
    }
  }
  AbortCurrentPlan() {
    if (this.HasPlan()) {
      for (let t = this.AIe.length - 1; t >= 0; --t) {
        var i = this.AIe[t];
        this.AIe.splice(t, 1);
        this.jIe(i, 2);
      }
      if (this.UIe.length > 0) {
        for (let t = this.UIe.length - 1; t >= 0; --t) {
          this.WIe(this.UIe[t]);
        }
      } else {
        this.KIe();
      }
    }
  }
  CancelActivePlanning() {
    if (this.IsPlanning() && (this.wIe.CancelPlanning(), this.wIe)) {
      this.wIe.Clear();
      this.wIe = undefined;
    }
  }
  OIe() {
    if (this.IsPlanning()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelAi", 29, "[StartPlanning] 规划中，重复调用");
      }
    } else if (this.RIe && this.RIe.GetCurrentLevelAiAsset()) {
      this.wIe = new LevelAiPlanner_1.LevelAiPlanner();
      this.wIe.SetUp(this.RIe.GetCurrentLevelAiAsset(), this.RIe);
      this.wIe.OnPlanningFinished = this.qIe;
      this.wIe.StartPlanning();
    }
  }
  GIe(t) {
    return !!t && !!this.RIe && !!this.RIe.GetCurrentLevelAiAsset() && !(LevelAiDefines_1.LEVEL_AI_DEBUG_MODE && Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelAi", 29, "Start Execute Plan"), this.QIe(t), this.RecheckCurrentPlan() ? (t = this.VIe(this.AIe, new LevelAiPlan_1.LevelAiPlanStepId(0)) > 0, this.BIe = true, t ? this.XIe() : this.$Ie(), 0) : (this.NIe(), 1));
  }
  XIe() {
    var t = new Array();
    for (; this.AIe.length > 0;) {
      var i = this.AIe[0];
      if (i === undefined) {
        return;
      }
      if (t.includes(i)) {
        break;
      }
      this.AIe.splice(0, 1);
      this.YIe(i);
      t.push(i);
    }
  }
  YIe(i) {
    if (!this.HasPlan()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelAi", 29, "[StartExecuteTask] 当前没有规划");
      }
      return 1;
    }
    var t = this.xIe.GetStep(i).Node;
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelAi", 29, "[StartExecuteTask] 执行了非Task节点");
      }
      return 1;
    }
    if (LevelAiDefines_1.LEVEL_AI_DEBUG_MODE && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelAi", 29, "Start Execute Task");
    }
    var e = new Array();
    this.JIe(e, i);
    for (let t = e.length - 1; t >= 0; --t) {
      var s = e[t];
      if (!this.zIe(s, 2)) {
        this.jIe(i, 2);
        this.AbortCurrentPlan();
        return 1;
      }
      this.ZIe(s);
    }
    this.UIe.push(i);
    var r = t.WrappedExecuteTask();
    if (r !== 3) {
      this.OnTaskFinished(t, i, r);
    }
    return r;
  }
  kIe(i) {
    this.XIe();
    var t = t => {
      if (this.HIe(t, true, false)) {
        this.eTe(t).WrappedTickTask(i);
        return true;
      } else {
        this.AbortCurrentPlan();
        return false;
      }
    };
    for (const e of this.UIe.concat()) {
      if (this.UIe.includes(e) && !t(e)) {
        return;
      }
    }
  }
  HIe(t, i, e) {
    var s = i || e;
    var r = new Array();
    this.tTe(r, t);
    for (let t = r.length - 1; t >= 0; --t) {
      var h = r[t];
      if (s) {
        if (!this.zIe(h, e ? 1 : 2)) {
          return false;
        }
      }
    }
    return true;
  }
  WIe(t) {
    var i = this.eTe(t);
    var e = this.UIe.indexOf(t);
    this.UIe.splice(e, 1);
    this.UIe.push(t);
    var e = i.WrappedAbortTask();
    if (e !== 2) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelAi", 29, "[AbortExecutingPlanStep] 失败");
      }
    } else if (e === 2) {
      this.OnTaskFinished(i, t, e);
    }
  }
  OnTaskFinished(t, i, e) {
    if (t) {
      if (this.HasPlan()) {
        t.WrappedOnTaskFinished(e);
        this.iTe(i, e);
        if (e === 0) {
          this.VIe(this.AIe, i);
        }
        this.jIe(i, e);
        t = this.UIe.indexOf(i);
        this.UIe.splice(t, 1);
        if (e === 0) {
          if (!this.HasActiveTasks()) {
            this.$Ie();
          }
        } else if (e === 2) {
          t = this.UIe.indexOf(i);
          this.PIe.splice(t, 1);
          if (!this.HasActiveTasks()) {
            this.KIe();
          }
        } else {
          this.AbortCurrentPlan();
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelAi", 29, "[OnTaskFinished] Plan无效");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelAi", 29, "[OnTaskFinished] Task无效");
    }
  }
  NotifyEventBasedDecoratorCondition(t, i) {
    return !!this.HasActivePlan() && !i && (t.PrintDescription("[NotifyEventBasedDecoratorCondition] Decorator通知RePlan"), this.RePlan(), true);
  }
  iTe(t, i) {
    var e;
    var s;
    var r;
    if (this.UIe.length !== 0 && !(e = (s = this.xIe.Levels[t.LevelIndex]).ParentStepId, s = i === 0 && t.StepIndex === s.Steps.length - 1, e.Equal(LevelAiPlan_1.LevelAiPlanStepId.None))) {
      if ((r = this.xIe.GetStep(e)).Node && r.Node.OnSubLevelStepFinished(this, e, t, i, s)) {
        this.iTe(e, i);
      }
    }
  }
  KIe() {
    if (this.CanLoop()) {
      this.DIe = 1;
    } else {
      this.DIe = 3;
    }
    this.NIe();
  }
  $Ie() {
    if (this.CanLoop()) {
      this.DIe = 1;
    } else {
      this.DIe = 2;
    }
    this.NIe();
  }
  QIe(t) {
    if (this.xIe) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelAi", 29, "[OnPlanningTaskFinished] 初始化规划失败，当前规划正在运行");
      }
    } else {
      this.xIe = t;
      for (const i of this.xIe.Levels) {
        for (const e of i.Steps) {
          e.SubNodesInfo.SubDecorators.length = 0;
          for (const s of e.Node.Decorators) {
            e.SubNodesInfo.SubDecorators.push(s);
          }
        }
      }
    }
  }
  NIe() {
    if (this.xIe) {
      for (const t of this.xIe.Levels) {
        for (const i of t.Steps) {
          i.SubNodesInfo.SubDecorators.length = 0;
        }
      }
      this.xIe = undefined;
    }
    this.UIe.length = 0;
    this.AIe.length = 0;
    this.PIe.length = 0;
    this.BIe = false;
  }
  eTe(t) {
    return this.xIe.GetStep(t).Node;
  }
  VIe(t, i, e = true) {
    e = new GetNextStepsContext(this.xIe, e, t);
    e.AddNextStepsAfter(i);
    return e.GetNumSubmittedSteps();
  }
  JIe(i, e) {
    if (this.xIe && this.xIe.HasStep(e)) {
      let t = e;
      while (true) {
        var s = this.xIe.Levels[t.LevelIndex];
        var r = s.Steps[t.StepIndex];
        if (r.SubNodesInfo.SubNodesExecuting || (i.push(r.SubNodesInfo), !(t.LevelIndex > 0))) {
          break;
        }
        t = s.ParentStepId;
      }
    }
  }
  tTe(i, e) {
    if (this.xIe && this.xIe.HasStep(e)) {
      let t = e;
      while (true) {
        var s = this.xIe.Levels[t.LevelIndex];
        var r = s.Steps[t.StepIndex];
        if (r.SubNodesInfo.LastFrameSubNodesTicked === Time_1.Time.Frame || !(i.push(r.SubNodesInfo), t.LevelIndex > 0)) {
          break;
        }
        t = s.ParentStepId;
      }
    }
  }
  oTe(e, t) {
    if (this.xIe && this.xIe.HasStep(t)) {
      let i = t;
      while (true) {
        var s = this.xIe.Levels[i.LevelIndex];
        var r = s.Steps[i.StepIndex];
        if (r.SubNodesInfo.SubNodesExecuting) {
          e.push(r.SubNodesInfo);
          let t = true;
          for (const h of this.AIe) {
            if (h.LevelIndex !== i.LevelIndex || !(h.StepIndex <= i.StepIndex)) {
              if (this.xIe.HasStep(h, i.LevelIndex)) {
                t = false;
              }
            }
          }
          if (t && i.LevelIndex > 0) {
            i = s.ParentStepId;
            continue;
          }
        }
        break;
      }
    }
  }
  rTe(i, e) {
    if (this.xIe && this.xIe.HasStep(e)) {
      let t = e;
      while (true) {
        var s = this.xIe.Levels[t.LevelIndex];
        var r = s.Steps[t.StepIndex];
        if (!r.SubNodesInfo.SubNodesExecuting || !(i.push(r.SubNodesInfo), t.LevelIndex > 0)) {
          break;
        }
        t = s.ParentStepId;
      }
    }
  }
  zIe(t, i) {
    if (!this.xIe) {
      return false;
    }
    for (const e of t.SubDecorators) {
      if (e.WrappedCheckCondition(i) === 0) {
        return false;
      }
    }
    return true;
  }
  ZIe(t) {
    var i;
    if (t.SubNodesExecuting) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelAi", 29, "[StartSubNodesInSubNodeGroup] 错误的调用，子节点执行中");
      }
    } else {
      t.SubNodesExecuting = true;
      for (const e of t.SubDecorators) {
        if (i = e) {
          i.WrappedExecutionStart();
        }
      }
    }
  }
  jIe(t, i) {
    var e = new Array();
    switch (i) {
      case 0:
        this.oTe(e, t);
        break;
      case 1:
      case 2:
        this.rTe(e, t);
        break;
      case 3:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelAi", 29, "[FinishSubNodesAtPlanStep] 错误的调用，结束时节点状态为InProgress");
        }
    }
    for (const s of e) {
      this.nTe(s, i);
    }
  }
  nTe(t, i) {
    if (t.SubNodesExecuting) {
      t.SubNodesExecuting = false;
      var e;
      var s = t.SubDecorators;
      for (let t = s.length - 1; t >= 0; --t) {
        if (e = s[t]) {
          e.WrappedExecutionFinish(i);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelAi", 29, "[FinishSubNodesInSubNodeGroup] 错误的调用，子节点非执行中");
    }
  }
  FindActiveTaskInfo(i) {
    var t;
    if (this.HasActivePlan()) {
      t = undefined;
      if (t = (t = this.UIe.find(t => i === this.eTe(t))) || this.PIe.find(t => i === this.eTe(t))) {
        return {
          PlanInstance: this,
          PlanStepId: t
        };
      } else {
        return undefined;
      }
    }
  }
  FindActiveDecoratorInfo(s) {
    if (this.HasActivePlan()) {
      const r = new Array();
      var t;
      var i = t => {
        r.length = 0;
        this.xIe.GetSubNodesAtPlanStep(t, r);
        for (const i of r) {
          for (const e of i.SubDecorators) {
            return e === s;
          }
        }
        return false;
      };
      if (t = this.UIe.find(i)) {
        return {
          PlanInstance: this,
          PlanStepId: t
        };
      } else if (t = this.PIe.find(i)) {
        return {
          PlanInstance: this,
          PlanStepId: t
        };
      } else {
        return undefined;
      }
    }
  }
  FIe() {
    return this.bIe !== undefined;
  }
}
exports.LevelAiPlanInstance = LevelAiPlanInstance;
//# sourceMappingURL=LevelAiPlanInstance.js.map