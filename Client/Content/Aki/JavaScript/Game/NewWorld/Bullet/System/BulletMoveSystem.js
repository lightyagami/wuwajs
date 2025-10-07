"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletMoveSystem = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const PerformanceController_1 = require("../../../../Core/Performance/PerformanceController");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const StatDefine_1 = require("../../../Common/StatDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const BulletStaticFunction_1 = require("../../Bullet/BulletStaticMethod/BulletStaticFunction");
const BulletConstant_1 = require("../BulletConstant");
const BulletController_1 = require("../BulletController");
const BulletUtil_1 = require("../BulletUtil");
const BulletPool_1 = require("../Model/BulletPool");
const BulletSystemBase_1 = require("./BulletSystemBase");
const MIN_HEIGHT_FOLLOW_TARGET = 1200;
class BulletMoveSystem extends BulletSystemBase_1.BulletSystemBase {
  constructor() {
    super(...arguments);
    this.mie = 0;
  }
  OnTick(t) {
    BulletMoveSystem.gW.Start();
    let e = 0;
    for (const r of ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap().values()) {
      if (PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest) {
        e = cpp_1.KuroTime.GetMilliseconds64();
      }
      var l = r.GetBulletInfo();
      var o = l.Actor.CustomTimeDilation * l.Entity.TimeDilation;
      this.mie = t * TimeUtil_1.TimeUtil.Millisecond * o;
      if (!l.NeedDestroy && l.IsInit && !l.IsFrozen) {
        if (!BulletUtil_1.BulletUtil.CheckBulletAttackerExist(l)) {
          BulletController_1.BulletController.DestroyBullet(l.BulletEntityId, false);
          continue;
        }
        if (StatDefine_1.BATTLESTAT_ENABLED) {
          BulletController_1.BulletController.GetBulletMoveTickStat(l.BulletRowName).Start();
        }
        try {
          this.dXs(l, t);
          if (l.BulletDataMain.Execution.MovementReplaced) {
            l.ActionLogicComponent.ActionTickMovement(t);
          } else {
            this.NWo(l);
            this.OWo(l);
            this.kWo(l);
            this.FWo(l);
            l.ApplyCacheLocationAndRotation();
          }
          l.MoveInfo.LastFramePosition.FromUeVector(l.ActorComponent.ActorLocationProxy);
        } catch (t) {
          if (t instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("Bullet", 17, "BulletMoveTick Error", t, ["BulletEntityId", l.BulletEntityId], ["BulletRowName", l.BulletRowName], ["error", t.message]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 17, "BulletMoveTick Error", ["EntityId", l.BulletEntityId], ["BulletRowName", l.BulletRowName], ["error", t]);
          }
        }
        if (StatDefine_1.BATTLESTAT_ENABLED) {
          BulletController_1.BulletController.GetBulletMoveTickStat(l.BulletRowName).Stop();
        }
      }
      if (PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest) {
        PerformanceController_1.PerformanceController.CollectTickPerformanceInfo("Bullet", true, cpp_1.KuroTime.GetMilliseconds64() - e, 1, l.BornFrameCount);
      }
    }
    BulletMoveSystem.gW.Stop();
  }
  dXs(e, l) {
    if (e.CreateFrame !== 0 && e.CreateFrame !== Time_1.Time.Frame) {
      var o = e.Actor;
      var r = e.Entity.TimeDilation;
      let t = e.LiveTime;
      var a = e.LiveTimeRatio;
      if (a > 0) {
        if (o?.IsValid()) {
          t += l * o.CustomTimeDilation * r * a;
        } else {
          t += l * r * a;
        }
      }
      if (e.Duration >= 0 && (o = e.Duration * TimeUtil_1.TimeUtil.InverseMillisecond, t > o)) {
        t = o;
      }
      e.LiveTimeAddDelta = t;
    }
  }
  NWo(t) {
    var e = t.MoveInfo;
    if (e.BaseAdditiveAccelerate.IsZero() && e.AdditiveAccelerateCurve) {
      t = BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(t.LiveTime / TimeUtil_1.TimeUtil.InverseMillisecond, t.Duration, e.AdditiveAccelerateCurve);
      e.AdditiveAccelerate.Set(e.BaseAdditiveAccelerate.X * t.X, e.BaseAdditiveAccelerate.Y * t.Y, e.BaseAdditiveAccelerate.Z * t.Z);
    }
  }
  OWo(t) {
    switch (t.BulletDataMain.Move.Trajectory) {
      case 0:
        break;
      case 2:
        this.VWo(t);
        break;
      case 1:
        this.HWo(t);
        break;
      case 3:
        this.jWo(t);
        break;
      case 5:
      case 4:
        if (t.AttackerMoveComp?.IsStandardGravity ?? true) {
          this.S3c(t);
        } else {
          this.WWo(t);
        }
    }
  }
  KWo(t) {
    let e = undefined;
    switch (t.BulletDataMain.Move.TrackTarget) {
      case 6:
      case 2:
      case 7:
      case 8:
      case 5:
      case 9:
      case 4:
        e = t.TargetActorComp;
        break;
      case 1:
        e = BulletUtil_1.BulletUtil.GetCurrentRole(t);
        break;
      case 3:
        if (t.BulletInitParams.FromRemote) {
          return t.TargetActorComp;
        }
        e = t.GetLockOnTargetDynamic();
        this.OnChangeTargetRequest(t, e?.Entity ? e?.Entity.Id : -1);
        break;
      case 11:
        e = this.vu1(t);
    }
    return e;
  }
  vu1(t) {
    var e = t.Target;
    if (e) {
      if ((e = e.GetComponent(0))?.IsRole()) {
        if ((e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e.GetPlayerId(), {
          ParamType: 2,
          IsControl: true
        })) && e.EntityHandle?.Valid) {
          t.SetTargetById(e.EntityHandle.Id);
          return t.TargetActorComp;
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 20, "找不到技能目标的主控角色", ["TeamItem", e === undefined], ["TeamItemValid", e?.EntityHandle?.Valid]);
          }
          return;
        }
      } else {
        return t.TargetActorComp;
      }
    }
  }
  QWo(t) {
    var e;
    var l;
    var o;
    var r = t.MoveInfo;
    var a = this.KWo(t);
    if (a?.Valid) {
      e = BulletPool_1.BulletPool.CreateVector();
      if (r.FollowTargetBottom) {
        l = (o = a.Entity.GetComponent(179)).ActorComp.ActorLocation;
        e.Set(l.X, l.Y, l.Z - o.GetHeightAboveGround(Math.min(r.MinFollowHeight, MIN_HEIGHT_FOLLOW_TARGET)) - o.ActorComp.HalfHeight);
      } else {
        l = t.BulletDataMain?.Move.TrackTargetBone;
        o = BulletUtil_1.BulletUtil.GetTargetLocation(a, FNameUtil_1.FNameUtil.GetDynamicFName(l) ?? FNameUtil_1.FNameUtil.EMPTY, t);
        e.FromUeVector(o);
      }
      if (r.SpeedFollowTarget < 1) {
        Vector_1.Vector.Lerp(t.ActorComponent.ActorLocationProxy, e, r.SpeedFollowTarget, r.LocationFollowTarget);
        t.SetActorLocation(r.LocationFollowTarget);
      } else {
        t.SetActorLocation(e);
      }
      BulletPool_1.BulletPool.RecycleVector(e);
    }
  }
  VWo(t) {
    var e = this.KWo(t);
    var e = BulletUtil_1.BulletUtil.GetTargetLocation(e, t.SkillBoneName, t);
    if (e) {
      t.SetActorRotation(UE.KismetMathLibrary.D_FindLookAtRotation(t.ActorComponent.ActorLocation, e));
    }
  }
  HWo(e) {
    var l = e.BulletDataMain.Move;
    var o = l.TrackParams.length;
    if (!(o < 1)) {
      var r = this.KWo(e);
      let t = undefined;
      if (o > 1) {
        o = r?.Entity?.GetComponent(179);
        if (!o?.Valid) {
          return;
        }
        var a = BulletPool_1.BulletPool.CreateVector();
        var i = BulletPool_1.BulletPool.CreateVector();
        var _ = l.TrackParams[1];
        a.FromUeVector(_);
        var _ = a.Z;
        a.Z = 0;
        var u = o.ActorComp;
        MathUtils_1.MathUtils.TransformPosition(u.ActorLocationProxy, u.ActorRotationProxy, u.ActorScaleProxy, a, i);
        var o = o.GetHeightAboveGround(4000);
        u.ActorUpProxy.Multiply(o + u.ScaledHalfHeight - _, a);
        i.SubtractionEqual(a);
        t = i.ToUeVector();
        if (Info_1.Info.IsBuildDevelopmentOrDebug && ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(e.AttackerId)) {
          UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.GameInstance, t, 20, 10, ColorUtils_1.ColorUtils.LinearGreen, 2, 4);
        }
        BulletPool_1.BulletPool.RecycleVector(a);
        BulletPool_1.BulletPool.RecycleVector(i);
      } else {
        o = e.BulletDataMain?.Move.TrackTargetBone;
        t = BulletUtil_1.BulletUtil.GetTargetLocation(r, StringUtils_1.StringUtils.IsNothing(o) ? e.SkillBoneName : FNameUtil_1.FNameUtil.GetDynamicFName(o), e);
      }
      if (t) {
        if (r?.Entity.GetComponent(206)?.HasTag(1008164187)) {
          e.OnTargetInValid();
        } else if (l.TrackParams[0].X !== 0) {
          this.XWo(e, t);
        } else if (l.TrackParams[0].Y !== 0 || l.TrackParams[0].Z !== 0) {
          this.$Wo(e, t);
        }
      }
    }
  }
  XWo(e, l) {
    var o = BulletPool_1.BulletPool.CreateVector();
    o.FromUeVector(l);
    o.SubtractionEqual(e.ActorComponent.ActorLocationProxy);
    o.Normalize(MathCommon_1.MathCommon.KindaSmallNumber);
    var r = Vector_1.Vector.DotProduct(o, e.ActorComponent.ActorForwardProxy);
    var r = Math.acos(r) * MathCommon_1.MathCommon.RadToDeg;
    BulletPool_1.BulletPool.RecycleVector(o);
    if (!(r <= 0)) {
      var o = e.BulletDataMain.Move;
      var a = o.TrackParams[0].X;
      let t = 0;
      t = o.TrackCurves.length > 0 ? BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(e.LiveTime / TimeUtil_1.TimeUtil.InverseMillisecond, e.Duration, o.TrackCurves[0]).X * this.mie * a : a * this.mie;
      o = Math.min(r, t);
      a = UE.KismetMathLibrary.D_FindLookAtRotation(e.ActorComponent.ActorLocation, l);
      l = e.MoveInfo;
      l.TraceRotator.Set(a.Pitch, a.Yaw, e.ActorComponent.ActorRotation.Roll);
      r = MathUtils_1.MathUtils.IsNearlyZero(r, MathCommon_1.MathCommon.KindaSmallNumber) ? MathCommon_1.MathCommon.KindaSmallNumber : r;
      a = Rotator_1.Rotator.Create();
      Rotator_1.Rotator.Lerp(e.ActorComponent.ActorRotationProxy, l.TraceRotator, o / r, a);
      e.SetActorRotation(a);
    }
  }
  $Wo(t, e) {
    var l = t.BulletDataMain.Move;
    var o = l.TrackParams[0].Y;
    var r = l.TrackParams[0].Z;
    var a = t.ActorComponent;
    var e = UE.KismetMathLibrary.D_FindLookAtRotation(a.ActorLocation, e);
    var i = e.Pitch - a.ActorRotationProxy.Pitch;
    let _ = e.Yaw - a.ActorRotationProxy.Yaw;
    if (Math.abs(_) > MathCommon_1.MathCommon.FlatAngle) {
      _ = (MathCommon_1.MathCommon.FlatAngle * 2 - Math.abs(_)) * Math.sign(_) * -1;
    }
    let u = 0;
    let s = 0;
    s = Math.abs(_) > r * this.mie ? r * this.mie * Math.sign(_) : _;
    if (l.TrackCurves.length > 0) {
      e = BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(t.LiveTime / TimeUtil_1.TimeUtil.InverseMillisecond, t.Duration, l.TrackCurves[0]);
      s = e.Z * this.mie * r * Math.sign(_);
      u = e.Y * this.mie * o * Math.sign(i);
    }
    u = Math.abs(i) > o * this.mie ? o * this.mie * Math.sign(i) : i;
    if (Math.abs(s) > Math.abs(_)) {
      s = _;
    }
    if (Math.abs(u) > Math.abs(i)) {
      u = i;
    }
    l = a.ActorRotationProxy;
    r = t.MoveInfo;
    r.TraceRotator.Set(l.Pitch + u, l.Yaw + s, l.Roll);
    t.SetActorRotation(r.TraceRotator);
  }
  jWo(t) {
    var e = t.MoveInfo;
    var l = BulletPool_1.BulletPool.CreateVector();
    var o = t.BulletDataMain.Move;
    var r = o.Speed * this.mie * MathCommon_1.MathCommon.RadToDeg / o.TrackParams[0].X;
    var a = BulletPool_1.BulletPool.CreateVector();
    a.FromUeVector(e.RoundCenter);
    var i = BulletPool_1.BulletPool.CreateVector();
    var _ = o.TrackParams.length > 1 ? o.TrackParams[1] : undefined;
    const u = t.AttackerMoveComp?.IsStandardGravity ?? true;
    if (_) {
      var s = o.TrackParams[0];
      if (o.TrackTarget === 0 || o.TrackTarget === 10) {
        if ((n = BulletUtil_1.BulletUtil.GetCurrentRole(t))?.Valid) {
          BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(s, _, e.RoundOnceAxis, l, n, u ? undefined : t.AttackerMoveComp.GravityUp);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 20, "围绕中心旋转子弹获取不到当前玩家控制的角色", ["Id", t.BulletRowName], ["Attacker", t.AttackerActorComp.Actor.GetName()]);
        }
      } else if ((n = this.KWo(t))?.Valid) {
        BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(s, _, e.RoundOnceAxis, l, n, u ? undefined : t.AttackerMoveComp.GravityUp);
      } else {
        BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(s, _, e.RoundOnceAxis, l, undefined, u ? undefined : t.AttackerMoveComp.GravityUp);
      }
      e.AroundAngle += r;
      l.RotateAngleAxis(e.AroundAngle, e.RoundOnceAxis, i);
      i.MultiplyEqual(s.X);
      a.AdditionEqual(i);
      l.RotateAngleAxis(e.AroundAngle + 90, e.RoundOnceAxis, i);
      var n = BulletPool_1.BulletPool.CreateRotator();
      MathUtils_1.MathUtils.LookRotationUpFirst(i, e.RoundOnceAxis, n);
      t.SetActorRotation(n);
      BulletPool_1.BulletPool.RecycleRotator(n);
    } else {
      l.FromUeVector(t.ActorComponent.ActorLocationProxy);
      l.SubtractionEqual(e.RoundCenter);
      l.RotateAngleAxis(r, e.RoundOnceAxis, i);
      a.AdditionEqual(i);
      const u = t.AttackerMoveComp?.IsStandardGravity ?? true;
      if (u) {
        t.SetActorRotation(UE.KismetMathLibrary.D_FindLookAtRotation(t.ActorComponent.ActorLocation, a.ToUeVector()));
      } else {
        (_ = BulletPool_1.BulletPool.CreateVector()).FromUeVector(t.GetActorLocation());
        _.SubtractionEqual(e.RoundCenter);
        _.Normalize();
        s = BulletPool_1.BulletPool.CreateRotator();
        MathUtils_1.MathUtils.LookRotationUpFirst(_, e.RoundOnceAxis, s);
        t.SetActorRotation(s);
        BulletPool_1.BulletPool.RecycleRotator(s);
        BulletPool_1.BulletPool.RecycleVector(_);
      }
    }
    if (o.TrackTarget !== 0 && o.TrackTarget !== 10 && (n = this.KWo(t)?.Entity)) {
      r = BulletPool_1.BulletPool.CreateVector();
      t.SetTargetById(n.Id);
      this.YWo(t, t.TargetActorComp, r);
      a.AdditionEqual(r);
      e.RoundCenter.AdditionEqual(r);
      BulletPool_1.BulletPool.RecycleVector(r);
    }
    t.SetActorLocation(a);
    BulletPool_1.BulletPool.RecycleVector(l);
    BulletPool_1.BulletPool.RecycleVector(a);
    BulletPool_1.BulletPool.RecycleVector(i);
  }
  YWo(t, e, l) {
    e = e.ActorLocationProxy;
    l.FromUeVector(e);
    t = t.MoveInfo;
    l.SubtractionEqual(t.RoundCenterLastLocation);
    t.RoundCenterLastLocation.FromUeVector(e);
  }
  WWo(t) {
    var e;
    var l;
    var o;
    var r;
    var a;
    var i = t.BulletDataMain.Move.TrackParams;
    if (!!i && !(i.length < 2)) {
      i = this.mie;
      (e = t.MoveInfo).BulletSpeedZ += e.Gravity * i * e.BulletSpeedRatio;
      e.BulletSpeed = Math.sqrt(Math.pow(e.BulletSpeed2D, 2) + Math.pow(e.BulletSpeedZ, 2));
      i = BulletPool_1.BulletPool.CreateVector();
      l = BulletPool_1.BulletPool.CreateVector();
      e.GravityMoveForward.Multiply(e.BulletSpeed2D, i);
      (t.AttackerMoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy).Multiply(e.BulletSpeedZ, l);
      i.AdditionEqual(l);
      i.Normalize();
      o = e.GravityMoveRotator;
      i.Rotation(o);
      if (!(r = t.BulletDataMain.Move).InitVelocityRot.IsNearlyZero()) {
        (a = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(o);
        MathUtils_1.MathUtils.ComposeRotator(r.InitVelocityRot, a, o);
        BulletPool_1.BulletPool.RecycleRotator(a);
      }
      BulletPool_1.BulletPool.RecycleVector(i);
      BulletPool_1.BulletPool.RecycleVector(l);
      if (e.ActorRotateParabola) {
        t.SetActorRotation(e.GravityMoveRotator);
      }
    }
  }
  S3c(t) {
    var e;
    var l = t.BulletDataMain.Move.TrackParams;
    if (!!l && !(l.length < 2)) {
      l = this.mie;
      (e = t.MoveInfo).BulletSpeedZ += e.Gravity * l * e.BulletSpeedRatio;
      e.BulletSpeed = Math.sqrt(Math.pow(e.BulletSpeed2D, 2) + Math.pow(e.BulletSpeedZ, 2));
      (l = e.GravityMoveRotator).Set(Math.atan(e.BulletSpeedZ / e.BulletSpeed2D) * MathCommon_1.MathCommon.RadToDeg, l.Yaw, l.Roll);
      if (e.ActorRotateParabola) {
        t.SetActorRotation(l);
      }
    }
  }
  kWo(t) {
    var e = t.MoveInfo;
    var l = t.BulletDataMain.Move;
    let o = 0;
    o = l.SpeedCurve ? (Info_1.Info.IsBuildDevelopmentOrDebug && !l.SpeedCurve.IsValid() && UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Obj Refs Name=DelayBulletSpeed"), BulletStaticFunction_1.BulletStaticFunction.CompCurveFloat(t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond, t.Duration, l.SpeedCurve) * e.BulletSpeed) : e.BulletSpeed;
    let r = t.Duration;
    var a;
    var i;
    var _;
    var u = BulletPool_1.BulletPool.CreateVector();
    switch (l.Trajectory) {
      case 2:
        if (l.TrackParams.length > 0 && l.TrackParams[0].X > 0) {
          r = l.TrackParams[0].X;
        }
        var s;
        var n;
        var B = BulletUtil_1.BulletUtil.GetTargetLocation(t.TargetActorComp, t.SkillBoneName, t);
        if (B) {
          s = r - (Time_1.Time.WorldTime - t.GenerateTime) / TimeUtil_1.TimeUtil.InverseMillisecond;
          s = MathUtils_1.MathUtils.IsNearlyZero(s, MathCommon_1.MathCommon.KindaSmallNumber) ? MathCommon_1.MathCommon.KindaSmallNumber : s;
          (n = BulletPool_1.BulletPool.CreateVector()).FromUeVector(B);
          o = Vector_1.Vector.Dist(t.ActorComponent.ActorLocationProxy, n) / s;
          BulletPool_1.BulletPool.RecycleVector(n);
          if (o < l.Speed) {
            o = l.Speed;
          }
          e.UpdateDirVector.Set(o * this.mie, 0, 0);
          t.ActorRotateVector(e.UpdateDirVector, u);
        } else {
          o = e.BulletSpeed;
          e.BeginSpeedRotator.Vector(u);
          u.MultiplyEqual(o * this.mie);
        }
        break;
      case 5:
      case 4:
        e.GravityMoveRotator.Quaternion().RotateVector(Vector_1.Vector.ForwardVectorProxy, u);
        u.MultiplyEqual(o * this.mie);
        break;
      case 1:
        t.GetActorForward(u);
        u.MultiplyEqual(o * this.mie);
        break;
      case 3:
        BulletPool_1.BulletPool.RecycleVector(u);
        return;
      case 6:
        this.QWo(t);
        BulletPool_1.BulletPool.RecycleVector(u);
        return;
      default:
        e.BeginSpeedRotator.Vector(u);
        u.MultiplyEqual(o * this.mie);
    }
    u.MultiplyEqual(e.BulletSpeedRatio);
    if (!e.BaseAdditiveAccelerate.IsZero()) {
      a = BulletPool_1.BulletPool.CreateVector();
      e.V0.Multiply(this.mie, a);
      i = BulletPool_1.BulletPool.CreateVector();
      e.AdditiveAccelerate.Multiply(this.mie * 0.5 * this.mie, i);
      a.AdditionEqual(i);
      u.AdditionEqual(a);
      _ = BulletPool_1.BulletPool.CreateVector();
      e.AdditiveAccelerate.Multiply(this.mie, _);
      e.V0.AdditionEqual(_);
      BulletPool_1.BulletPool.RecycleVector(a);
      BulletPool_1.BulletPool.RecycleVector(i);
      BulletPool_1.BulletPool.RecycleVector(_);
    }
    e.BulletSpeedDir.FromUeVector(u);
    this.JWo(t, u);
    if (BulletConstant_1.BulletConstant.OpenMoveLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Bullet", 20, "OnTickMove", ["Bullet", t.BulletRowName], ["finalDirMove", u], ["Location", t.GetActorLocation()]);
    }
    BulletPool_1.BulletPool.RecycleVector(u);
    this.zWo(t, e, l.TrackTarget);
  }
  zWo(t, e, l) {
    if (l === 10 && (l = t.BulletDataMain.Move.Trajectory) !== 5 && l !== 4) {
      (l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(BulletUtil_1.BulletUtil.GetTargetLocation(undefined, FNameUtil_1.FNameUtil.NONE, t));
      e = e.BulletSpeedDir.SizeSquared();
      if (Vector_1.Vector.DistSquared(t.GetActorLocation(), l) < e) {
        t.IsTimeNotEnough = true;
        t?.SetActorLocation(l);
        BulletController_1.BulletController.DestroyBullet(t.BulletEntityId, false);
      }
      BulletPool_1.BulletPool.RecycleVector(l);
    }
  }
  JWo(t, e) {
    var l;
    var o = t.MoveInfo;
    if (o.IsOnBaseMovement) {
      (l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(o.LastBaseMovementSpeed);
      l.MultiplyEqual(this.mie);
      e.AdditionEqual(l);
      BulletPool_1.BulletPool.RecycleVector(l);
    }
    if (!e.Equals(Vector_1.Vector.ZeroVectorProxy)) {
      o = BulletPool_1.BulletPool.CreateVector();
      t.ActorComponent.ActorLocationProxy.Addition(e, o);
      t.SetActorLocation(o);
      BulletPool_1.BulletPool.RecycleVector(o);
    }
  }
  FWo(t) {
    var e;
    var l = t.BulletDataMain.Move;
    var o = l.FollowType;
    if (o === 0 || o === 3) {
      (o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(l.FollowSkeletonRotLimit);
      if (o.IsZero()) {
        BulletPool_1.BulletPool.RecycleVector(o);
      } else {
        l = t.MoveInfo;
        e = t.ActorComponent.ActorRotationProxy;
        if (o.X < 1) {
          l.FollowBoneBulletRotator.Roll = e.Roll;
        } else {
          l.FollowBoneBulletRotator.Roll = 0;
        }
        if (o.Y < 1) {
          l.FollowBoneBulletRotator.Pitch = e.Pitch;
        } else {
          l.FollowBoneBulletRotator.Pitch = 0;
        }
        if (o.Z < 1) {
          l.FollowBoneBulletRotator.Yaw = e.Yaw;
        } else {
          l.FollowBoneBulletRotator.Yaw = t.AttackerActorComp.ActorRotationProxy.Yaw;
        }
        BulletPool_1.BulletPool.RecycleVector(o);
        t.SetActorRotation(l.FollowBoneBulletRotator);
      }
    }
  }
  OnChangeTargetRequest(t, e) {
    var l;
    var o;
    var r;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && !t.BulletInitParams.FromRemote) {
      if (t.BulletDataMain.Base.SyncType !== 1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 20, "动态改变目标的子弹必须设置 基础设置.网络同步类型 为 网络同步子弹", ["BulletId", t.BulletRowName], ["Attacker", t.AttackerActorComp?.Actor?.GetName()]);
        }
      } else {
        if (t.TargetIdLast !== e && (l = ModelManager_1.ModelManager.BulletModel.GetBulletHandleById(t.BulletEntityId), o = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e), (r = Protocol_1.Aki.Protocol.Ce_.create()).Ajn = {
          K8n: undefined,
          uVn: l,
          CVn: MathUtils_1.MathUtils.NumberToLong(o)
        }, CombatMessage_1.CombatNet.Send(23923, t.Attacker, r), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Bullet", 20, "修改子弹目标请求", ["新的目标id", e], ["CreatureId", o]);
        }
        t.TargetIdLast = e;
      }
    }
  }
}
(exports.BulletMoveSystem = BulletMoveSystem).gW = Stats_1.Stat.Create("BulletMoveTick");
//# sourceMappingURL=BulletMoveSystem.js.map