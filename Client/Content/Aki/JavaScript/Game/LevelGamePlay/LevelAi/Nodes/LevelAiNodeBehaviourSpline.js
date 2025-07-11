"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiNodeBehaviourSpline = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const GameSplineComponent_1 = require("../../Common/GameSplineComponent");
const LevelAiDecoratorCompareVar_1 = require("../Decorators/LevelAiDecoratorCompareVar");
const LevelAiPlan_1 = require("../LevelAiPlan");
const LevelAiRegistry_1 = require("../LevelAiRegistry");
const LevelAiStandaloneNode_1 = require("../LevelAiStandaloneNode");
const LevelAiTaskMoveAlong_1 = require("../Tasks/LevelAiTaskMoveAlong");
const LevelAiTaskSetVar_1 = require("../Tasks/LevelAiTaskSetVar");
const LevelAiTaskSuccess_1 = require("../Tasks/LevelAiTaskSuccess");
const MAX_DISTANCE = 200;
class SelfVarCompareParam {
  constructor(e, t) {
    this.Var1 = {
      Type: "Int",
      Source: "Self",
      Name: "DEFAULT_STATE"
    };
    this.Compare = "Eq";
    this.Var2 = {
      Type: "Int",
      Source: "Constant",
      Value: -1
    };
    this.Type = "CompareVar";
    this.Var1.Name = e;
    this.Var2.Value = t;
  }
}
class SelfVarSetParam {
  constructor(e, t) {
    this.VarLeft = {
      Type: "Int",
      Source: "Self",
      Name: "DEFAULT_STATE"
    };
    this.VarRight = {
      Type: "Int",
      Source: "Constant",
      Value: -1
    };
    this.VarLeft.Name = e;
    this.VarRight.Value = t;
  }
}
class LevelAiNodeBehaviourSpline extends LevelAiStandaloneNode_1.LevelAiStandaloneNode {
  constructor() {
    super(...arguments);
    this.SplineId = undefined;
    this.CanRecordPlanProgress = false;
    this.Cost = 0;
    this.DTe = false;
    this.TTe = new LevelAiPlan_1.LevelAiPlanStepId();
    this.jye = Vector_1.Vector.Create();
    this.RTe = Vector_1.Vector.Create();
  }
  MakePlanExpansions(e, t) {
    var i;
    var r;
    var s;
    if (this.SplineId !== undefined) {
      this.PrintDescription("Behaviour Spline Make Plan Expansions", ["LevelIndex", e.CurrentLevelIndex], ["StepIndex", e.CurrentStepIndex]);
      if (!this.DTe) {
        this.HC();
      }
      if (!this.CanRecordPlanProgress) {
        this.TTe.Reset();
      }
      i = (s = e.MakePlanCopyWithAddedStep()).PlanCopy;
      r = s.OutAddedStep;
      s = s.OutAddedStepId;
      r.SubLevelIndex = e.AddLevel(i, s);
      e.SubmitCandidatePlan(i);
    }
  }
  GetNextSteps(e, t) {
    if (!this.TTe.Equal(LevelAiPlan_1.LevelAiPlanStepId.None)) {
      var i = this.TTe.LevelIndex;
      var r = this.TTe.StepIndex;
      if (e.IsExecutingPlan) {
        this.TTe.Reset();
      }
      if (i >= 0 && r >= 0) {
        e.AddNextStepsAfter(new LevelAiPlan_1.LevelAiPlanStepId(i, r - 1));
        return;
      }
    }
    i = e.GetStep(t);
    e.AddNextStepsAfter(new LevelAiPlan_1.LevelAiPlanStepId(i.SubLevelIndex));
  }
  OnSubLevelStepFinished(e, t, i, r, s) {
    if (r === 2) {
      this.TTe.CopyFrom(i);
    }
    return true;
  }
  HC() {
    var a = new GameSplineComponent_1.GameSplineComponent(this.SplineId);
    if (a.Initialize()) {
      if (a.Option.Type !== IComponent_1.ESplineType.LevelAI) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelAi", 29, "[LevelAiTaskMoveWithSpline] SplineComponent配置类型不是LevelAI", ["EntityId", this.CreatureDataComponent.GetPbDataId()], ["SplineEntityId", this.SplineId]);
        }
      } else {
        var o = new LevelAiTaskSuccess_1.LevelAiTaskSuccess();
        o.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description);
        o.Cost = this.Cost;
        this.NextNodes.push(o);
        var n = a.GetNumberOfSplinePoints();
        let t = 0;
        var h = this.UTe(a.Option.Points, a);
        let i = false;
        let r = [];
        var l = "INTERNAL_PATROL_STATE";
        var v = a.Option.UsePathFinding ?? false;
        var _ = a.Option.IsPassEveryKeyPoint ?? false;
        let s = 0;
        for (let e = 0; e < n; ++e) {
          var p;
          var S;
          var A = e;
          var L = a.Option.Points[e];
          r.push(L);
          if (L.Actions && L.Actions.length !== 0 || A === n - 1) {
            L = this.ATe(a, r, t, A, v, _);
            if (h >= t && h <= A && !i) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("LevelAi", 42, "选择初始的移动状态", ["EntityId", this.CreatureDataComponent.GetPbDataId()], ["最近的点", h], ["当前状态", s]);
              }
              i = true;
              this.CharacterPlanComponent.WorldState.SetIntWorldState(l, s);
              this.CharacterPlanComponent.WorldStateProxy.SetIntWorldState(l, s);
            }
            p = new SelfVarCompareParam(l, s);
            (S = new LevelAiDecoratorCompareVar_1.LevelAiDecoratorCompareVar()).Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, "检查巡逻状态 " + s.toString(), p);
            L.First.Decorators.push(S);
            s++;
            p = A === n - 1 ? 0 : s;
            S = new SelfVarSetParam(l, p);
            (A = new LevelAiTaskSetVar_1.LevelAiTaskSetVar()).Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, "设置下个巡逻状态 " + p.toString(), S);
            L.Last.NextNodes.push(A);
            o.NextNodes.push(L.First);
            r = [];
            t = e + 1;
          }
        }
        this.DTe = true;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelAi", 42, "[LevelAiTaskMoveWithSpline] GameSplineComponent初始化失败", ["EntityId", this.CreatureDataComponent.GetPbDataId()], ["SplineEntityId", this.SplineId]);
    }
  }
  ATe(t, i, r, e, s, a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelAi", 42, "生成MoveAlongStep", ["EntityId", this.CreatureDataComponent.GetPbDataId()], ["startIndex", r], ["endIndex", e]);
    }
    var o = new LevelAiTaskMoveAlong_1.LevelAiTaskMoveAlong();
    o.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " 样条路径" + r + "到" + e);
    var n = [];
    for (let e = 0; e < i.length; e++) {
      var h = i[e];
      var l = {
        Index: e,
        Position: Vector_1.Vector.Create(),
        MoveSpeed: h.MoveSpeed,
        MoveState: h.MoveState,
        PosState: h.CharPositionState ? this.Yia(h.CharPositionState) : undefined
      };
      if (h.MoveState === IComponent_1.EPatrolMoveState.Sprint) {
        l.MoveState = IComponent_1.EPatrolMoveState.Run;
      }
      l.Position.DeepCopy(t.GetWorldLocationAtSplinePoint(r + e));
      n.push(l);
    }
    o.PathPoint = n;
    o.Navigation = s;
    o.ResetAllPoints = a;
    s = i[i.length - 1];
    if (s.Actions && s.Actions.length !== 0) {
      a = this.PTe(s.Actions, e);
      o.NextNodes.push(a.First);
      return {
        First: o,
        Last: a.Last
      };
    } else {
      return {
        First: o,
        Last: o
      };
    }
  }
  Yia(e) {
    switch (e) {
      case 0:
        return CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
      case 2:
        return CharacterUnifiedStateTypes_1.ECharPositionState.Air;
    }
    return CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
  }
  UTe(i, r) {
    var e = this.CreatureDataComponent.Entity.GetComponent(3);
    if (!e) {
      return 0;
    }
    let s = 0;
    let a = Number.MAX_VALUE;
    var o = e.ActorLocationProxy;
    var n = Vector_1.Vector.Create();
    for (let e = 0, t = i.length; e < t; e++) {
      n.DeepCopy(r.GetWorldLocationAtSplinePoint(e));
      this.jye.Set(n.X, n.Y, n.Z);
      var h = Vector_1.Vector.Dist(o, this.jye);
      if (h < a) {
        a = h;
        s = e;
      }
    }
    var t = Vector_1.Vector.Create();
    var l = Vector_1.Vector.Create();
    if (s === 0) {
      return 0;
    }
    if (s === i.length - 1) {
      var e = i[0].Position;
      var v = i[i.length - 1].Position;
      t.Set(e.X, e.Y, e.Z);
      l.Set(v.X, v.Y, v.Z);
      if (a < MAX_DISTANCE && Vector_1.Vector.Dist(t, l) < MAX_DISTANCE) {
        return 0;
      }
    }
    for (let e = 0; e < i.length - 1; e++) {
      t.DeepCopy(r.GetWorldLocationAtSplinePoint(e));
      l.DeepCopy(r.GetWorldLocationAtSplinePoint(e + 1));
      this.jye.Set(l.X, l.Y, l.Z);
      this.jye.Subtraction(t, this.jye);
      var _ = this.jye.Size();
      this.RTe.Set(o.X, o.Y, o.Z);
      this.RTe.Subtraction(l, this.RTe);
      if (!(this.jye.DotProduct(this.RTe) > 0) && !(this.RTe.Set(o.X, o.Y, o.Z), this.RTe.Subtraction(t, this.RTe), this.jye.DotProduct(this.RTe) < 0)) {
        this.jye.CrossProduct(this.RTe, this.jye);
        if ((_ = this.jye.Size() / _) < a) {
          a = _;
          s = e + 1;
        }
      }
    }
    return s;
  }
  PTe(t, i) {
    let r = undefined;
    let s = undefined;
    for (let e = 0; e < t.length; ++e) {
      var a = t[e];
      var a = this.xTe(a, i, e);
      if (e === 0) {
        r = a;
      } else {
        s.NextNodes.push(a);
      }
      s = a;
    }
    return {
      First: r,
      Last: s
    };
  }
  xTe(e, t, i) {
    var r = new (LevelAiRegistry_1.LevelAiRegistry.Instance().FindTaskCtor(e.Name))();
    r.Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " 样条点" + t + " 行为" + i, e.Params);
    return r;
  }
}
exports.LevelAiNodeBehaviourSpline = LevelAiNodeBehaviourSpline;
//# sourceMappingURL=LevelAiNodeBehaviourSpline.js.map