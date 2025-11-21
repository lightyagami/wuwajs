"use strict";

var CharacterSplineClimbComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var n = arguments.length;
  var r = n < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, e, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (h = t[o]) {
        r = (n < 3 ? h(r) : n > 3 ? h(i, e, r) : h(i, e)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(i, e, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSplineClimbComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const SplineCurve_1 = require("../../../../../../Core/Utils/Curve/SplineCurve");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const Quat_1 = require("../../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../../GlobalData");
const ColorUtils_1 = require("../../../../../Utils/ColorUtils");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("./CustomMovementDefine");
class SplineClimbParams {
  constructor(i) {
    this.Tags = [];
    this.InterruptSkills = [];
    this.SampleLength = 200;
    this.SampleInterval = 50;
    this.TraceLength = 1500;
    this.TraceStartOffset = -200;
    this.ExtraWallRadius = 2.5;
    this.DebugDraw = false;
    if (i) {
      this.Tags = GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(i.期间Tag);
      for (let t = 0; t < i.打断技能.Num(); t++) {
        this.InterruptSkills.push(i.打断技能.Get(t));
      }
      this.SampleLength = i.采样长度;
      this.SampleInterval = i.采样间隔;
      this.TraceLength = i.检测距离;
      this.TraceStartOffset = i.检测起始偏移;
      this.ExtraWallRadius = i.离墙额外距离;
      this.DebugDraw = i.DebugDraw;
    }
  }
}
class SplineRuntime {
  constructor() {
    this.SourceSplineUe = undefined;
    this.SourceSpline = new SplineCurve_1.SplineCurve();
    this.WallSpline = new SplineCurve_1.SplineCurve();
    this.DistanceInSource = 0;
    this.DistanceInWallSpline = 0;
    this.InitialUpdate = false;
  }
}
let CharacterSplineClimbComponent = CharacterSplineClimbComponent_1 = class CharacterSplineClimbComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.oRe = undefined;
    this.RWr = undefined;
    this.Lie = undefined;
    this.Gce = undefined;
    this.D2d = undefined;
    this.U2d = undefined;
    this.x2d = Vector_1.Vector.Create();
    this.rRe = undefined;
    this.B2d = 0;
    this.mWi = undefined;
    this.k2d = false;
    this.DKd = 0;
    this.SJd = false;
    this.jIm = false;
    this.ZQl = Transform_1.Transform.Create();
    this.O2d = Vector_1.Vector.Create();
    this.Due = Vector_1.Vector.Create();
    this.Ele = Rotator_1.Rotator.Create();
    this.Mme = Transform_1.Transform.Create();
    this.cz = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.pz = Vector_1.Vector.Create();
    this.e7o = Quat_1.Quat.Create();
    this.q2d = t => {
      this.SRa(t);
    };
    this.bpr = () => {
      this.ExitSplineClimb("OnTeleportStart", true, false);
    };
    this.Jze = () => {
      this.ExitSplineClimb("OnRoleDead", true, false);
    };
    this.ero = (t, i, e) => {
      var s = this.OPt?.InterruptSkills.includes(i);
      if (t === this.Entity.Id && s) {
        this.ExitSplineClimb("使用技能" + i, true, false);
      } else if (!s) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 82, "[CharacterSplineClimbComponent] 样条跑墙期间使用技能", ["SkillId", i]);
        }
      }
    };
    this.xsa = (t, i) => {
      this.SJd = true;
    };
  }
  get OPt() {
    CharacterSplineClimbComponent_1.k2u ||= CharacterSplineClimbComponent_1.wX1();
    return CharacterSplineClimbComponent_1.k2u;
  }
  OnStart() {
    this.Hte = this.Entity.CheckGetComponent(3);
    this.RWr = this.Entity.CheckGetComponent(34);
    this.oRe = this.Entity.CheckGetComponent(181);
    this.Lie = this.Entity.CheckGetComponent(209);
    this.Gce = this.Entity.CheckGetComponent(182);
    this.rRe = this.oRe?.MainAnimInstance;
    return true;
  }
  OnEnd() {
    this.kre();
    return true;
  }
  OnTick() {
    if (this.SJd) {
      this.ExitSplineClimb("位置状态改变", true, false);
      this.SJd = false;
    }
  }
  EnterSplineClimb(t, i, e) {
    if (this.k2d) {
      this.ExitSplineClimb("重复进入", false);
    }
    this.x2d.DeepCopy(i);
    this.G2d(t);
    this.F2d();
    this.B2d = 0;
    this.Hte?.Actor.KuroSetMovementMode({
      Mode: 6,
      CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SPLINE_CLIMB,
      Context: "[CharacterSplineClimbComponent.EnterSplineClimb]"
    });
    for (const s of this.OPt.Tags) {
      this.Lie?.AddTag(s);
    }
    this.Ore();
    i = this.Entity?.GetComponent(39);
    if (i) {
      i.StopAllSkills("开始样条跑墙");
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, "[CharacterSplineClimbComponent] 开始样条跑墙");
    this.D2d = e;
    this.k2d = true;
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      CharacterSplineClimbComponent_1.wX1();
    }
    if (this.nz1()) {
      this.Gce?.SetLockedRotation(false);
    }
    if (this.RWr) {
      this.DKd = this.RWr.Disable("样条跑墙开始");
    }
    this.Due.DeepCopy(this.Hte.ActorLocationProxy);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Movement", 82, "开始样条跑墙", ["SourceLength", this.U2d?.SourceSpline.GetSplineLength()], ["DistanceInSource", this.U2d?.DistanceInSource], ["SourceLengthUe", this.U2d?.SourceSplineUe?.GetSplineLength()], ["SplineLocation", this.U2d?.SourceSpline.SplineTransform.GetLocation()]);
    }
  }
  ExitSplineClimb(t, i = true, e = true) {
    this.kre();
    if (this.RWr) {
      this.RWr.Enable(this.DKd, "样条跑墙结束");
      this.DKd = 0;
    }
    var s;
    var h = this.Entity.GetComponent(179).PositionState;
    var e = !e || this.nz1();
    var n = i && e && (h === CharacterUnifiedStateTypes_1.ECharPositionState.Air || h === CharacterUnifiedStateTypes_1.ECharPositionState.Climb);
    var i = i && h === CharacterUnifiedStateTypes_1.ECharPositionState.Climb;
    if (n) {
      if (GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, this.Hte.ActorVelocityProxy) > 0) {
        this.cz.DeepCopy(this.Hte.ActorVelocityProxy);
        GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Hte, this.cz);
        this.Gce.SetForceSpeed(this.cz);
      }
      (h = this.cz).DeepCopy(this.O2d);
      if (!h.IsNearlyZero()) {
        if (Math.abs(h.Y) > MathUtils_1.MathUtils.SmallNumber) {
          n = Vector_1.Vector.DotProduct(h, this.Gce.GravityUp);
          s = this.fz;
          this.Gce.GravityUp.Multiply(n, s);
          h.SubtractionEqual(s);
          MathUtils_1.MathUtils.LookRotationUpFirst(h, this.Gce.GravityUp, this.e7o);
          (n = this.Hte.ActorTransform).SetRotation(this.e7o.ToUeQuat());
          this.RWr.SetCharacterTransformAndBuffer(n, 300);
        }
      }
    }
    if (i) {
      if (e) {
        this.Hte?.Actor.KuroSetMovementMode({
          Mode: 3,
          Context: "[CharacterSplineClimbComponent.ExitSplineClimb]"
        });
      } else {
        this.Hte?.Actor.KuroSetMovementMode({
          Mode: 6,
          CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_CLIMB,
          Context: "[CharacterSplineClimbComponent.ExitSplineClimb]"
        });
        this.RWr?.KickWallExit();
      }
    }
    for (const r of this.OPt.Tags) {
      this.Lie?.RemoveTag(r);
    }
    this.k2d = false;
    this.SJd = false;
    if (this.nz1()) {
      this.Gce?.SetLockedRotation(true);
    }
    this.D2d?.(true);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Movement", 82, "退出样条跑墙", ["reason", t], ["DistanceInSource", this.U2d?.DistanceInSource], ["WallSplineLength", this.U2d?.WallSpline?.GetSplineLength()], ["DistanceOnWall", this.U2d?.DistanceInWallSpline], ["bChangeState", i]);
    }
  }
  G2d(t) {
    this.U2d = new SplineRuntime();
    this.U2d.SourceSplineUe = t;
    var i = this.U2d.SourceSpline;
    i.Init(t.SplineCurves.Position, t.SplineCurves.ReparamTable.Points, t.SplineCurves.Rotation, t.SplineCurves.Scale);
    i.SetSplineTransform(Transform_1.Transform.Create(t.D_K2_GetComponentToWorld()), false);
  }
  F2d() {
    var t = this.U2d.SourceSplineUe.D_FindInputKeyClosestToWorldLocationInGravity(this.Hte.ActorLocation, this.Hte.ActorGravityDirectProxy.ToUeVectorOld(), 800);
    var t = this.U2d.SourceSplineUe.GetDistanceAlongSplineAtSplineInputKey(t);
    this.U2d.DistanceInSource = t;
  }
  Ore() {
    if (!this.jIm) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.bpr);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.ero);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveSplineClimb, this.q2d);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.xsa);
      this.jIm = true;
    }
  }
  kre() {
    if (this.jIm) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.bpr);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.ero);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveSplineClimb, this.q2d);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.Jze);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.xsa);
      this.jIm = false;
    }
  }
  SRa(e) {
    var s = this.U2d;
    if (this.k2d && s && s.SourceSpline) {
      let i = s.WallSpline.GetSplineLength();
      var h = s.SourceSpline.GetSplineLength();
      if (!s.InitialUpdate && s.DistanceInSource >= h && s.DistanceInWallSpline >= i - 0.1) {
        this.ExitSplineClimb("样条结束");
      } else {
        if (s.InitialUpdate || s.DistanceInWallSpline >= i - 0.1) {
          var n = s.DistanceInWallSpline - i;
          var r = this.OPt.SampleLength;
          if (!this.N2d(s.SourceSpline, s.WallSpline, s.DistanceInSource, Math.min(h, s.DistanceInSource + r), this.x2d)) {
            this.ExitSplineClimb("无法投影");
            return;
          }
          s.DistanceInSource += r;
          s.DistanceInWallSpline = n;
          i = s.WallSpline.GetSplineLength();
        }
        s.WallSpline.GetTransformAtDistanceAlongSpline(s.DistanceInWallSpline, 1, this.ZQl);
        let t = this.Gce.CharacterMovement.AnimRootMotionVelocity.Size();
        if (t <= 100) {
          t = 500;
        }
        s.DistanceInWallSpline = Math.min(s.DistanceInWallSpline + t * e, i - 0.1);
        this.Due.DeepCopy(this.ZQl.GetLocation());
        this.Due.Subtraction(this.Hte.ActorLocationProxy, this.O2d);
        this.Hte.AddActorWorldOffset(this.O2d.ToUeVector(), "[CharacterSplineClimbComponent] 沿样条跑墙", true);
        this.V2d(this.ZQl, this.Ele);
        this.Gce.SmoothCharacterRotation(this.Ele, 800, e, false, "[SplineClimb] 沿样条跑墙");
        this.j2d(this.ZQl, e);
        this.oRe?.ConsumeRootMotion();
        this.RWr?.SetLastSafeLocation(this.Hte.ActorLocationProxy);
        s.InitialUpdate = false;
      }
    }
  }
  V2d(t, i) {
    this.pz.DeepCopy(this.Hte.ActorGravityDirectProxy);
    this.pz.UnaryNegation(this.pz);
    t.GetRotation().GetUpVector(this.fz);
    this.fz.UnaryNegation(this.fz);
    if (this.nz1()) {
      MathUtils_1.MathUtils.LookRotationUpFirst(this.fz, this.pz, i);
    } else {
      MathUtils_1.MathUtils.LookRotationForwardFirst(this.fz, this.pz, i);
    }
  }
  N2d(i, t, e, s, h) {
    var n = [];
    var r = [];
    var o = i.GetSplineLength();
    var s = s - e;
    if (s < 10) {
      t.InitPoints(n);
    }
    var a = this.OPt.SampleInterval;
    var l = s / a;
    var m = this.RWr.GetClimbRadius();
    var _ = this.OPt.TraceStartOffset;
    var C = this.OPt.TraceLength;
    var p = this.OPt.ExtraWallRadius;
    for (let t = 0; t <= l; t++) {
      var v = e + t * a;
      var c = Math.min(v, o - 0.1);
      var S = this.Mme;
      i.GetTransformAtDistanceAlongSpline(c, 1, S);
      this.mWi ||= this.wTu();
      this.mWi.Radius = m;
      var u = this.cz;
      h.GetSafeNormal(u);
      u.MultiplyEqual(_);
      u.AdditionEqual(S.GetLocation());
      var E = this.fz;
      h.GetSafeNormal(E);
      E.MultiplyEqual(C);
      E.AdditionEqual(S.GetLocation());
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.mWi, u);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.mWi, E);
      var u = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.mWi, "CharacterSplineClimbComponent.BuildWallSpline");
      if (u && this.mWi.HitResult) {
        var E = this.cz;
        TraceElementCommon_1.TraceElementCommon.GetImpactPoint(this.mWi.HitResult, 0, E);
        var u = this.fz;
        TraceElementCommon_1.TraceElementCommon.GetImpactNormal(this.mWi.HitResult, 0, u);
        var f = new SplineCurve_1.InterpCurvePointVector(5);
        f.InVal = t;
        u.MultiplyEqual(m + p);
        E.AdditionEqual(u);
        u.Normalize();
        f.OutVal.DeepCopy(E);
        var E = this.cz;
        i.GetDirectionAtDistanceAlongSpline(c, 1, E);
        var c = new SplineCurve_1.InterpCurvePointQuat(0);
        c.InVal = t;
        MathUtils_1.MathUtils.LookRotationUpFirst(E, u, c.OutVal);
        c.LeaveTangent.DeepCopy(c.OutVal);
        c.ArriveTangent.DeepCopy(c.OutVal);
        var b = Vector_1.Vector.DotProduct(E, u);
        u.MultiplyEqual(b);
        E.SubtractionEqual(u);
        E.Normalize();
        f.ArriveTangent.DeepCopy(E);
        f.LeaveTangent.DeepCopy(E);
        n.push(f);
        r.push(c);
        if (GlobalData_1.GlobalData.IsPlayInEditor && this.OPt.DebugDraw) {
          b = f.OutVal.ToUeVector();
          UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, b, 5, 12, ColorUtils_1.ColorUtils.LinearYellow, 5);
          const h = f.ArriveTangent.ToUeVector();
          UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, b, b.op_Addition(h.op_Multiply(20)), ColorUtils_1.ColorUtils.LinearRed, 5);
          UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, S.GetLocation().ToUeVector(), 2, 12, ColorUtils_1.ColorUtils.LinearBlue, 5);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Movement", 82, "[CharacterSplineClimbComponent] 未检测到墙壁", ["distance", v], ["maxDistance", o]);
      }
      if (o <= v) {
        break;
      }
    }
    t.InitPoints(n, r);
    return !(n.length < 1);
  }
  wTu() {
    var t = UE.NewObject(UE.TraceSphereElement.StaticClass());
    t.bIsSingle = true;
    t.bIgnoreSelf = true;
    t.WorldContextObject = this.Hte.Owner;
    t.Radius = 2;
    t.bTraceComplex = false;
    t.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    t.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet);
    return t;
  }
  j2d(t, i) {
    var t = t.GetRotation();
    var e = this.cz;
    t.GetForwardVector(e);
    var t = this.H2d(e);
    this.B2d = MathUtils_1.MathUtils.InterpTo(this.B2d, t, i, 4);
    this.rRe.FastClimbMix = this.B2d;
  }
  H2d(t) {
    var i = this.Hte.ActorRightProxy;
    let e = Vector_1.Vector.DotProduct(t, i);
    i = -Vector_1.Vector.DotProduct(t, this.Hte.ActorGravityDirectProxy);
    return e = i < 0 ? e < 0 ? -1 : 1 : e;
  }
  static wX1() {
    var t = "/Game/Aki/Data/Level/SplineClimb/DA_SplineClimb_Common.DA_SplineClimb_Common";
    var i = ResourceSystem_1.ResourceSystem.Load(t, UE.BP_SplineClimbConfig_C);
    if (i?.IsValid()) {
      i = new SplineClimbParams(i);
      return CharacterSplineClimbComponent_1.k2u = i;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 82, "[CharacterSplineClimbComponent] 获取样条跑墙DA参数失败", ["DaPath", t]);
      }
      return new SplineClimbParams();
    }
  }
  nz1() {
    return this.Lie !== undefined && this.Lie.HasTag(-869438579);
  }
};
CharacterSplineClimbComponent.k2u = undefined;
CharacterSplineClimbComponent = CharacterSplineClimbComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(307)], CharacterSplineClimbComponent);
exports.CharacterSplineClimbComponent = CharacterSplineClimbComponent; //# sourceMappingURL=CharacterSplineClimbComponent.js.map