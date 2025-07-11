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
    super.OnStartTask();
    if (this.EntityHandle.Entity.GetComponent(0)?.IsNpc() && this.gLe?.NpcFollow) {
      this.EntityHandle.Entity.GetComponent(187)?.PauseAi("StartMoveWithSpline");
      EventSystem_1.EventSystem.EmitWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.StartMoveWithSpline, this.gLe, this.RCl, e => {
        this.EndTask(e);
      });
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
      t = this.EntityHandle.Entity.GetComponent(101);
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
      this.EntityHandle.Entity.GetComponent(187)?.ResumeAi("StartMoveWithSpline");
    }
    this.B7?.(e);
  }
  nKl(e, t) {
    var i = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
    i.Set(e.X, e.Y, e.Z);
    var s = this.gLe.CheckClimb.Direction;
    var r = CharacterSplineMoveTask.Gco;
    var a = CharacterSplineMoveTask.jye;
    r.Set(s.Y ?? 0, s.Z ?? 0, s.X ?? 0);
    r.Vector(a);
    a.Normalize();
    a.MultiplyEqual(this.gLe.CheckClimb.Distance);
    var s = ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation;
    s.Set(e.X + a.X, e.Y + a.Y, e.Z + a.Z);
    var r = ModelManager_1.ModelManager.TraceElementModel.GetLineTrace();
    r.WorldContextObject = t.Owner;
    r.ActorsToIgnore.Empty();
    r.ActorsToIgnore.Add(t.Owner);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(r, i);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, s);
    var e = TraceElementCommon_1.TraceElementCommon.LineTrace(r, "MoveWithSplineDetectClimb");
    var a = r.HitResult;
    r.ClearCacheData();
    return [e, a];
  }
  sKl() {
    var e = this.EntityHandle.Entity.GetComponent(1);
    var t = e.ActorLocationProxy;
    let i = this.nKl(t, e.Owner);
    if (!i[0]) {
      var s = this.gLe.CheckClimb.FallBackClimbPointId;
      if (s && (s = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(s))?.Transform && (s = {
        X: s.Transform.Pos.X ?? 0,
        Y: s.Transform.Pos.Y ?? 0,
        Z: s.Transform.Pos.Z ?? 0
      }, i = this.nKl(s, e.Owner), Log_1.Log.CheckWarn())) {
        Log_1.Log.Warn("AI", 42, "MoveWithSpline当前位置射线检测不到墙面，启用保底检测", ["Result", i[0]], ["CurrentLoc", t], ["DefaultLoc", s]);
      }
      if (!i[0]) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("AI", 42, "MoveWithSpline上墙失败,射线检测不到墙面");
        }
        return false;
      }
    }
    var t = i[1];
    var s = CharacterSplineMoveTask.jye;
    TraceElementCommon_1.TraceElementCommon.GetImpactNormal(t, 0, s);
    s.MultiplyEqual(CHARACTER_TRACE_DISTANCE);
    var r = CharacterSplineMoveTask.RTe;
    TraceElementCommon_1.TraceElementCommon.GetImpactPoint(t, 0, r);
    r.AdditionEqual(s);
    var t = this.EntityHandle.Entity.GetComponent(177);
    var a = t.GetMeshTransform();
    e.SetActorLocation(r.ToUeVector(), "MoveWithSplineDetectClimb", true);
    t.SetModelBuffer(a, 10);
    var e = s;
    e.UnaryNegation(e);
    var r = this.EntityHandle.Entity.GetComponent(101);
    if (r?.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Climb && !this.EntityHandle.Entity.GetComponent(34)?.DetectClimbWithDirect(false, e.ToUeVector(), true)) {
      return false;
    }
    return true;
  }
  ODe() {
    if (this.gLe?.CheckClimb && !this.sKl()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("AI", 42, "MoveWithSpline上墙失败");
      }
      this.EndTask(false);
      return;
    }
    var t = this.SplineData && this.SplineData.Points.length;
    var i = [];
    for (let e = this.il; e <= this.wXt; ++e) {
      i.push(Vector_1.Vector.Create(this.Spline.D_GetLocationAtSplinePoint(e, 1)));
    }
    var s = [];
    for (let e = this.il; e <= this.wXt; ++e) {
      var r;
      var a = e - this.il;
      var a = {
        Index: a,
        Position: i[a]
      };
      if (t && ((r = this.SplineData.Points[e])?.MoveSpeed && (a.MoveSpeed = r.MoveSpeed), r?.MoveState)) {
        a.MoveState = r.MoveState;
      }
      s.push(a);
    }
    var e = {
      Points: s,
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
      StartIndex: this.gLe?.CheckClimb && s.length > 1 ? 1 : 0
    };
    if (this.SplineData?.CycleOption && this.SplineData.CycleOption.Type === IComponent_1.EPatrolCycleMode.Loop) {
      e.Loop = true;
      e.CircleMove = this.SplineData.CycleOption.IsCircle;
    }
    if (this.SplineData?.TurnSpeed) {
      e.TurnSpeed = this.SplineData.TurnSpeed;
    }
    var h = this.EntityHandle.Entity.GetComponent(45);
    if (h.IsMovingToLocation()) {
      h.MoveToLocationEnd(1);
    }
    this.EntityHandle.Entity.GetComponent(3)?.Actor.CapsuleComponent.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer, 0);
    h.MoveAlongPath(e);
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