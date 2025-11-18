"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSplineMoveTask = undefined;
const Log_1 = require("../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const SplineMoveTaskBase_1 = require("./SplineMoveTaskBase");
const CHARACTER_TRACE_DISTANCE = 50;
class CharacterSplineMoveTask extends SplineMoveTaskBase_1.SplineMoveTaskBase {
  constructor(e, t, i) {
    super(e);
    this.Spline = t;
    this.SplineData = i;
    this.gLe = undefined;
    this.RCl = false;
    this.il = 0;
    this.wXt = 0;
    this.B7 = undefined;
    this.xsa = (e, t) => {
      if (this.EntityHandle?.Entity?.Valid && t !== CharacterUnifiedStateTypes_1.ECharPositionState.Climb && (t = this.EntityHandle.Entity.GetComponent(45)) && t.IsMovingToLocation()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("AI", 42, "MoveWithSpline打断墙上移动");
        }
        t.MoveToLocationEnd(2);
      }
    };
  }
  static Create(e, t) {
    e = new CharacterSplineMoveTask(e, t.Spline, t.SplineData);
    e.gLe = t.EventParam;
    e.RCl = t.NoSyncPoint;
    e.B7 = t.Callback;
    return e;
  }
  OnStartTask() {
    var e;
    var t;
    super.OnStartTask();
    if (this.EntityHandle.Entity.GetComponent(0)?.IsNpc() && this.gLe?.NpcFollow) {
      this.EntityHandle.Entity.GetComponent(191)?.PauseAi("StartMoveWithSpline");
      EventSystem_1.EventSystem.EmitWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.StartMoveWithSpline, this.gLe, this.RCl, e => {
        this.EndTask(e);
      });
    } else if (this.gLe?.MoveOnWallConfig) {
      if (e = this.EntityHandle.Entity.GetComponent(307)) {
        (t = Vector_1.Vector.Create()).FromConfigVector(this.gLe?.MoveOnWallConfig.WallDetectDir);
        Rotator_1.Rotator.Create(t.Y, t.Z, t.X).Vector(t);
        e.EnterSplineClimb(this.Spline, t, e => {
          this.EndTask(e);
        });
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Movement", 82, "[CharacterSplineMoveTask] 样条跑墙失败，无SplineClimbComponent");
        }
        this.EndTask(false);
      }
    } else {
      this.LCl();
      this.ODe();
    }
  }
  OnEndTask(e) {
    super.OnEndTask(e);
    var t;
    var i;
    var s = this.EntityHandle.Entity.GetComponent(3);
    s?.Actor.CapsuleComponent.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer, 2);
    if (this.gLe?.CheckClimb && this.EntityHandle?.Entity?.Valid && EventSystem_1.EventSystem.HasWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.xsa)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.xsa);
    }
    s?.ClearInput();
    if (this.gLe?.MoveTarget.Type === "Player") {
      s = this.EntityHandle.Entity.GetComponent(45);
      t = this.EntityHandle.Entity.GetComponent(104);
      if (s) {
        s.StopMove(false);
        i = t?.MoveState;
        s.ResetMaxSpeed(i);
      }
      if (this.gLe?.CheckClimb && (s = this.EntityHandle.Entity.GetComponent(34)) && t && t.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
        s.KickWallExit();
      }
      (i = this.EntityHandle.Entity.GetComponent(62))?.ClearMoveVectorCache();
      i?.SetActive(true);
    }
    this.EntityHandle.Entity.GetComponent(45).IsSpecialMove = false;
    if (this.EntityHandle.Entity.GetComponent(0)?.IsNpc() && this.gLe?.NpcFollow) {
      this.EntityHandle.Entity.GetComponent(191)?.ResumeAi("StartMoveWithSpline");
    }
    this.B7?.(e);
  }
  nKl(e, t) {
    var i = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
    i.Set(e.X, e.Y, e.Z);
    var s = this.gLe.CheckClimb.Direction;
    var r = CharacterSplineMoveTask.Gco;
    var h = CharacterSplineMoveTask.jye;
    r.Set(s.Y ?? 0, s.Z ?? 0, s.X ?? 0);
    r.Vector(h);
    h.Normalize();
    h.MultiplyEqual(this.gLe.CheckClimb.Distance);
    var s = ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation;
    s.Set(e.X + h.X, e.Y + h.Y, e.Z + h.Z);
    var r = ModelManager_1.ModelManager.TraceElementModel.GetLineTrace();
    r.WorldContextObject = t.Owner;
    r.ActorsToIgnore.Empty();
    r.ActorsToIgnore.Add(t.Owner);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(r, i);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, s);
    var e = TraceElementCommon_1.TraceElementCommon.LineTrace(r, "MoveWithSplineDetectClimb");
    var h = r.HitResult;
    r.ClearCacheData();
    return [e, h];
  }
  sKl(e) {
    var t;
    var i;
    var s;
    var r = this.EntityHandle.Entity.GetComponent(1);
    var h = this.nKl(e, r.Owner);
    if (h[0]) {
      h = h[1];
      t = CharacterSplineMoveTask.jye;
      TraceElementCommon_1.TraceElementCommon.GetImpactNormal(h, 0, t);
      t.MultiplyEqual(CHARACTER_TRACE_DISTANCE);
      i = CharacterSplineMoveTask.RTe;
      TraceElementCommon_1.TraceElementCommon.GetImpactPoint(h, 0, i);
      i.AdditionEqual(t);
      s = (h = this.EntityHandle.Entity.GetComponent(181)).GetMeshTransform();
      r.SetActorLocation(i.ToUeVector(), "MoveWithSplineDetectClimb", true);
      h.SetModelBuffer(s, 10);
      (r = t).UnaryNegation(r);
      return this.EntityHandle.Entity.GetComponent(104)?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb || (this.EntityHandle.Entity.GetComponent(34)?.DetectClimbWithDirect(false, r.ToUeVector(), true) ?? false);
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("AI", 42, "MoveWithSpline上墙失败,射线检测不到墙面", ["loc", e]);
      }
      return false;
    }
  }
  ODe() {
    if (this.gLe?.CheckClimb) {
      var t = this.EntityHandle.Entity.GetComponent(1);
      let e = this.sKl(t.ActorLocationProxy);
      if (!e) {
        if ((o = this.gLe.CheckClimb.FallBackClimbPointId) && (o = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(o))?.Transform) {
          o = {
            X: o.Transform.Pos.X ?? 0,
            Y: o.Transform.Pos.Y ?? 0,
            Z: o.Transform.Pos.Z ?? 0
          };
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("AI", 42, "MoveWithSpline当前位置上墙失败，启用保底检测", ["CurrentLoc", t.ActorLocationProxy], ["DefaultLoc", o]);
          }
          e = this.sKl(o);
        }
      }
      if (!e) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("AI", 42, "MoveWithSpline上墙失败");
        }
        this.EndTask(false);
        return;
      }
    }
    var i = this.SplineData && this.SplineData.Points.length;
    var s = [];
    for (let e = this.il; e <= this.wXt; ++e) {
      s.push(Vector_1.Vector.Create(this.Spline.D_GetLocationAtSplinePoint(e, 1)));
    }
    var r = [];
    for (let e = this.il; e <= this.wXt; ++e) {
      var h;
      var a = e - this.il;
      var a = {
        Index: a,
        Position: s[a]
      };
      if (i && ((h = this.SplineData.Points[e])?.MoveSpeed && (a.MoveSpeed = h.MoveSpeed), h?.MoveState)) {
        a.MoveState = h.MoveState;
      }
      r.push(a);
    }
    var t = {
      Points: r,
      Navigation: this.SplineData?.IsNavigation ?? false,
      IsFly: this.gLe?.IsFollowStrictly ?? this.SplineData?.IsFloating ?? false,
      DebugMode: true,
      Loop: false,
      UseNearestPoint: true,
      Callback: e => {
        if (e === 1) {
          this.EndTask(true);
        } else {
          this.EndTask(false);
        }
      },
      ReturnFalseWhenNavigationFailed: false,
      NoAsyncPoint: this.RCl,
      StartIndex: this.gLe?.CheckClimb && r.length > 1 ? 1 : 0
    };
    if (this.SplineData?.CycleOption && this.SplineData.CycleOption.Type === IComponent_1.EPatrolCycleMode.Loop) {
      t.Loop = true;
      t.CircleMove = this.SplineData.CycleOption.IsCircle;
    }
    if (this.SplineData?.TurnSpeed) {
      t.TurnSpeed = this.SplineData.TurnSpeed;
    }
    var o = this.EntityHandle.Entity.GetComponent(45);
    if (o.IsMovingToLocation()) {
      o.MoveToLocationEnd(1);
    }
    this.EntityHandle.Entity.GetComponent(3)?.Actor.CapsuleComponent.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer, 0);
    o.MoveAlongPath(t);
    if (this.gLe?.CheckClimb && this.EntityHandle.Entity?.Valid && !EventSystem_1.EventSystem.HasWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.xsa)) {
      EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.xsa);
    }
  }
  LCl() {
    var e = this.Spline.GetNumberOfSplinePoints();
    this.il = this.gLe.StartPointIndex ? MathUtils_1.MathUtils.Clamp(this.gLe.StartPointIndex, 0, e - 1) : 0;
    this.wXt = this.gLe.EndPointIndex ? MathUtils_1.MathUtils.Clamp(this.gLe.EndPointIndex, 0, e - 1) : e - 1;
  }
}
(exports.CharacterSplineMoveTask = CharacterSplineMoveTask).Gco = Rotator_1.Rotator.Create();
CharacterSplineMoveTask.jye = Vector_1.Vector.Create();
CharacterSplineMoveTask.RTe = Vector_1.Vector.Create(); //# sourceMappingURL=CharacterSplineMoveTask.js.map