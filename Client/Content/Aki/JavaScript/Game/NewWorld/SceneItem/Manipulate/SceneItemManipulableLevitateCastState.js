"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulableLevitateCastState = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Net_1 = require("../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const CameraController_1 = require("../../../Camera/CameraController");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
const SPHERE_TRACE_RADIUS = 50;
const PROFILE_KEY = "[SceneItemManipulableLevitateCastState.GetTraceResult]";
class SceneItemManipulableLevitateCastState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor(t, e) {
    super(t, e);
    this.xVs = undefined;
    this.Anr = -0;
    this.XWe = undefined;
    this.$We = undefined;
    this.bnr = 0;
    this.qnr = 0.033;
    this.Bnr = 0;
    this.Gnr = Vector_1.Vector.Create();
    this.PVs = 0;
    this.wsr = 0;
    this.Asr = Vector_1.Vector.Create();
    this.Psr = Vector_1.Vector.Create();
    this.xsr = Vector_1.Vector.Create();
    this.BVs = (t, e) => {
      this.SceneItem?.SetState(1, "LevitateCastState OnHit");
    };
    this.xVs = this.SceneItem.Config.ThrowCfg.MotionConfig;
    this.Anr = this.xVs.Velocity;
    this.XWe = Vector_1.Vector.Create();
    t = this.xVs.RenderTrajectoryConfig?.Time;
    this.bnr = t ? Math.min(t, this.xVs.MoveTime) : this.xVs.MoveTime;
    this.wsr = this.Anr * this.bnr;
    this.PVs = this.wsr;
    if (!StringUtils_1.StringUtils.IsEmpty(this.xVs.VelocityCurve)) {
      ResourceSystem_1.ResourceSystem.LoadAsync(this.xVs.VelocityCurve, UE.CurveFloat, t => {
        this.$We = t;
        t = this.GetCastPath(true);
        this.PVs = Vector_1.Vector.Dist(t[0], t[t.length - 1]);
      });
    }
  }
  OnEnter() {
    super.OnEnter();
    this.Bnr = 0;
    this.Gnr.DeepCopy(this.Asr);
    this.SceneItem.ActorComp.Owner.OnActorHit.Add(this.BVs);
    this.SceneItem.ActorComp.PhysicsMode = 0;
    this.SceneItem.ForceMoving = true;
  }
  OnExit() {
    this.SceneItem.ActorComp.Owner.OnActorHit.Remove(this.BVs);
    this.SceneItem.ForceMoving = false;
    this._Qs();
  }
  _Qs() {
    var t = Protocol_1.Aki.Protocol._$s.create();
    t.F4n = MathUtils_1.MathUtils.NumberToLong(this.SceneItem.ActorComp.CreatureData.GetCreatureDataId());
    Net_1.Net.Call(19973, t, t => {
      if (t?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 18979);
      }
    });
  }
  SetVelocityDirection(t) {
    this.XWe.DeepCopy(t);
  }
  OnTick(t) {
    this.UpdateLocation(t);
    this.UpdateRotationAccordingToVelocity();
    return true;
  }
  UpdateLocation(t) {
    this.Bnr += t;
    this.Bnr = Math.min(this.Bnr, this.bnr);
    t = this.wVs(this.Gnr, t);
    if (this.SceneItem.CurrentState === this && (this.SceneItem.ActorComp.SetActorLocation(t.ToUeVector(), "[SceneItemManipulableLevitateCastState.UpdateLocation]"), (this.Gnr = t).Equals(this.Psr) && this.SceneItem.CurrentState === this && this.SceneItem?.SetState(1, "LevitateCastState Finish"), this.Bnr >= this.bnr) && this.SceneItem.CurrentState === this) {
      this.SceneItem?.SetState(1, "LevitateCastState OverTime");
    }
  }
  wVs(t, e) {
    let i = Vector_1.Vector.Create();
    this.xsr.Multiply(this.Anr * e, i);
    if (this.$We?.IsValid()) {
      i.MultiplyEqual(this.$We.GetFloatValue(this.Bnr));
    }
    i.Set(Math.floor(i.X * 100) / 100, Math.floor(i.Y * 100) / 100, Math.floor(i.Z * 100) / 100);
    t.Addition(i, i);
    e = Vector_1.Vector.Distance(i, this.Asr);
    return i = e > this.wsr ? this.Psr : i;
  }
  GetCastPath(t = false) {
    if (t) {
      CameraController_1.CameraController.CameraRotator.Vector(this.xsr);
      this.Asr = Vector_1.Vector.Create(this.SceneItem.ActorComp.ActorLocation);
    } else {
      this.bVs();
    }
    var e = [];
    let i = Vector_1.Vector.Create(this.Asr);
    e.push(i);
    var s = this.bnr;
    for (let t = this.Bnr = 0; t < s; t += this.qnr) {
      this.Bnr += this.qnr;
      var a = this.wVs(i, this.qnr);
      i = a;
      e.push(a);
      if (a.Equals(this.Psr)) {
        break;
      }
    }
    return e;
  }
  koe() {
    SceneItemManipulableLevitateCastState.bsr = UE.NewObject(UE.TraceSphereElement.StaticClass());
    SceneItemManipulableLevitateCastState.bsr.WorldContextObject = this.SceneItem.ActorComp.Owner;
    SceneItemManipulableLevitateCastState.bsr.bIsSingle = true;
    SceneItemManipulableLevitateCastState.bsr.bIgnoreSelf = true;
    var t = UE.NewArray(UE.BuiltinByte);
    t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn);
    t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster);
    t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Destructible);
    var t = (0, puerts_1.$ref)(t);
    SceneItemManipulableLevitateCastState.bsr.SetObjectTypesQuery(t);
    var t = this.SceneItem?.Config?.ThrowCfg.MotionConfig;
    SceneItemManipulableLevitateCastState.bsr.Radius = t?.RayRadius || SPHERE_TRACE_RADIUS;
    SceneItemManipulableLevitateCastState.bsr.DrawTime = 5;
  }
  bVs() {
    this.Asr = Vector_1.Vector.Create(this.SceneItem.ActorComp.ActorLocation);
    var t = Vector_1.Vector.Create(0, 0, 0);
    CameraController_1.CameraController.CameraRotator.Vector(t);
    if (SceneItemManipulableLevitateCastState.bsr === undefined) {
      this.koe();
    }
    var e = Vector_1.Vector.Create(CameraController_1.CameraController.CameraLocation);
    var i = Vector_1.Vector.Create(e);
    i.AdditionEqual(t.MultiplyEqual(this.PVs));
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(SceneItemManipulableLevitateCastState.bsr, e);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(SceneItemManipulableLevitateCastState.bsr, i);
    var t = TraceElementCommon_1.TraceElementCommon.SphereTrace(SceneItemManipulableLevitateCastState.bsr, PROFILE_KEY);
    this.Psr = Vector_1.Vector.Create(i);
    if (t && SceneItemManipulableLevitateCastState.bsr.HitResult.bBlockingHit) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(SceneItemManipulableLevitateCastState.bsr.HitResult, 0, this.Psr);
    }
    this.wsr = Vector_1.Vector.Dist(this.Asr, this.Psr);
    this.xsr = Vector_1.Vector.Create(this.Psr);
    this.xsr.SubtractionEqual(this.Asr);
    this.xsr.Normalize();
  }
  IsNoLockCasting() {
    return true;
  }
}
(exports.SceneItemManipulableLevitateCastState = SceneItemManipulableLevitateCastState).bsr = undefined;
//# sourceMappingURL=SceneItemManipulableLevitateCastState.js.map