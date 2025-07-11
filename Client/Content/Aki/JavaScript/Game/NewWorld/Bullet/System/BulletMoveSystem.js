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
    this.mie = t / TimeUtil_1.TimeUtil.InverseMillisecond;
    let e = 0;
    for (const r of ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap().values()) {
      if (PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest) {
        e = cpp_1.KuroTime.GetMilliseconds64();
      }
      var l;
      var o = r.GetBulletInfo();
      if (!o.NeedDestroy && o.IsInit && !o.IsFrozen) {
        if (!BulletUtil_1.BulletUtil.CheckBulletAttackerExist(o)) {
          BulletController_1.BulletController.DestroyBullet(o.BulletEntityId, false);
          continue;
        }
        if (StatDefine_1.BATTLESTAT_ENABLED) {
          BulletController_1.BulletController.GetBulletMoveTickStat(o.BulletRowName).Start();
        }
        try {
          this.dXs(o, t);
          if (o.BulletDataMain.Execution.MovementReplaced) {
            o.ActionLogicComponent.ActionTickMovement(t);
          } else {
            this.NWo(o);
            l = o.Actor.CustomTimeDilation * o.Entity.TimeDilation;
            this.OWo(o, l);
            this.kWo(o, l);
            this.FWo(o);
            o.ApplyCacheLocationAndRotation();
          }
          o.MoveInfo.LastFramePosition.FromUeVector(o.ActorComponent.ActorLocationProxy);
        } catch (t) {
          if (t instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("Bullet", 17, "BulletMoveTick Error", t, ["BulletEntityId", o.BulletEntityId], ["BulletRowName", o.BulletRowName], ["error", t.message]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 17, "BulletMoveTick Error", ["EntityId", o.BulletEntityId], ["BulletRowName", o.BulletRowName], ["error", t]);
          }
        }
        if (StatDefine_1.BATTLESTAT_ENABLED) {
          BulletController_1.BulletController.GetBulletMoveTickStat(o.BulletRowName).Stop();
        }
      }
      if (PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest) {
        PerformanceController_1.PerformanceController.CollectTickPerformanceInfo("Bullet", true, cpp_1.KuroTime.GetMilliseconds64() - e, 1, o.BornFrameCount);
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
  OWo(t, e) {
    switch (t.BulletDataMain.Move.Trajectory) {
      case 0:
        break;
      case 2:
        this.VWo(t);
        break;
      case 1:
        this.HWo(t, e);
        break;
      case 3:
        this.jWo(t, e);
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
        l = (o = a.Entity.GetComponent(178)).ActorComp.ActorLocation;
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
  HWo(e, l) {
    var o = e.BulletDataMain.Move;
    var r = o.TrackParams.length;
    if (!(r < 1)) {
      var a = this.KWo(e);
      let t = undefined;
      if (r > 1) {
        r = a?.Entity?.GetComponent(178);
        if (!r?.Valid) {
          return;
        }
        var i = BulletPool_1.BulletPool.CreateVector();
        var _ = BulletPool_1.BulletPool.CreateVector();
        var u = o.TrackParams[1];
        i.FromUeVector(u);
        var u = i.Z;
        i.Z = 0;
        var s = r.ActorComp;
        MathUtils_1.MathUtils.TransformPosition(s.ActorLocationProxy, s.ActorRotationProxy, s.ActorScaleProxy, i, _);
        var r = r.GetHeightAboveGround(4000);
        s.ActorUpProxy.Multiply(r + s.ScaledHalfHeight - u, i);
        _.SubtractionEqual(i);
        t = _.ToUeVector();
        if (Info_1.Info.IsBuildDevelopmentOrDebug && ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(e.AttackerId)) {
          UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.GameInstance, t, 20, 10, ColorUtils_1.ColorUtils.LinearGreen, 2, 4);
        }
        BulletPool_1.BulletPool.RecycleVector(i);
        BulletPool_1.BulletPool.RecycleVector(_);
      } else {
        r = e.BulletDataMain?.Move.TrackTargetBone;
        t = BulletUtil_1.BulletUtil.GetTargetLocation(a, StringUtils_1.StringUtils.IsNothing(r) ? e.SkillBoneName : FNameUtil_1.FNameUtil.GetDynamicFName(r), e);
      }
      if (t) {
        if (a?.Entity.GetComponent(205)?.HasTag(1008164187)) {
          e.OnTargetInValid();
        } else if (o.TrackParams[0].X !== 0) {
          this.XWo(e, t, l);
        } else if (o.TrackParams[0].Y !== 0 || o.TrackParams[0].Z !== 0) {
          this.$Wo(e, t);
        }
      }
    }
  }
  XWo(e, l, o) {
    var r = BulletPool_1.BulletPool.CreateVector();
    r.FromUeVector(l);
    r.SubtractionEqual(e.ActorComponent.ActorLocationProxy);
    r.Normalize(MathCommon_1.MathCommon.KindaSmallNumber);
    var a = Vector_1.Vector.DotProduct(r, e.ActorComponent.ActorForwardProxy);
    var a = Math.acos(a) * MathCommon_1.MathCommon.RadToDeg;
    BulletPool_1.BulletPool.RecycleVector(r);
    if (!(a <= 0)) {
      var r = e.BulletDataMain.Move;
      var i = r.TrackParams[0].X;
      let t = 0;
      t = r.TrackCurves.length > 0 ? BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(e.LiveTime / TimeUtil_1.TimeUtil.InverseMillisecond, e.Duration, r.TrackCurves[0]).X * this.mie * i : i * this.mie;
      r = Math.min(a, t);
      i = UE.KismetMathLibrary.D_FindLookAtRotation(e.ActorComponent.ActorLocation, l);
      l = e.MoveInfo;
      l.TraceRotator.Set(i.Pitch, i.Yaw, e.ActorComponent.ActorRotation.Roll);
      a = MathUtils_1.MathUtils.IsNearlyZero(a, MathCommon_1.MathCommon.KindaSmallNumber) ? MathCommon_1.MathCommon.KindaSmallNumber : a;
      i = Rotator_1.Rotator.Create();
      Rotator_1.Rotator.Lerp(e.ActorComponent.ActorRotationProxy, l.TraceRotator, r * o / a, i);
      e.SetActorRotation(i);
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
  jWo(t, e) {
    var l = t.MoveInfo;
    var o = BulletPool_1.BulletPool.CreateVector();
    var r = t.BulletDataMain.Move;
    var e = r.Speed * this.mie * e * MathCommon_1.MathCommon.RadToDeg / r.TrackParams[0].X;
    var a = BulletPool_1.BulletPool.CreateVector();
    a.FromUeVector(l.RoundCenter);
    var i = BulletPool_1.BulletPool.CreateVector();
    var _ = r.TrackParams.length > 1 ? r.TrackParams[1] : undefined;
    const u = t.AttackerMoveComp?.IsStandardGravity ?? true;
    if (_) {
      var s = r.TrackParams[0];
      if (r.TrackTarget === 0 || r.TrackTarget === 10) {
        if ((n = BulletUtil_1.BulletUtil.GetCurrentRole(t))?.Valid) {
          BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(s, _, l.RoundOnceAxis, o, n, u ? undefined : t.AttackerMoveComp.GravityUp);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 20, "围绕中心旋转子弹获取不到当前玩家控制的角色", ["Id", t.BulletRowName], ["Attacker", t.AttackerActorComp.Actor.GetName()]);
        }
      } else if ((n = this.KWo(t))?.Valid) {
        BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(s, _, l.RoundOnceAxis, o, n, u ? undefined : t.AttackerMoveComp.GravityUp);
      } else {
        BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(s, _, l.RoundOnceAxis, o, undefined, u ? undefined : t.AttackerMoveComp.GravityUp);
      }
      l.AroundAngle += e;
      o.RotateAngleAxis(l.AroundAngle, l.RoundOnceAxis, i);
      i.MultiplyEqual(s.X);
      a.AdditionEqual(i);
      o.RotateAngleAxis(l.AroundAngle + 90, l.RoundOnceAxis, i);
      var n = BulletPool_1.BulletPool.CreateRotator();
      MathUtils_1.MathUtils.LookRotationUpFirst(i, l.RoundOnceAxis, n);
      t.SetActorRotation(n);
      BulletPool_1.BulletPool.RecycleRotator(n);
    } else {
      o.FromUeVector(t.ActorComponent.ActorLocationProxy);
      o.SubtractionEqual(l.RoundCenter);
      o.RotateAngleAxis(e, l.RoundOnceAxis, i);
      a.AdditionEqual(i);
      const u = t.AttackerMoveComp?.IsStandardGravity ?? true;
      if (u) {
        t.SetActorRotation(UE.KismetMathLibrary.D_FindLookAtRotation(t.ActorComponent.ActorLocation, a.ToUeVector()));
      } else {
        (_ = BulletPool_1.BulletPool.CreateVector()).FromUeVector(t.GetActorLocation());
        _.SubtractionEqual(l.RoundCenter);
        _.Normalize();
        s = BulletPool_1.BulletPool.CreateRotator();
        MathUtils_1.MathUtils.LookRotationUpFirst(_, l.RoundOnceAxis, s);
        t.SetActorRotation(s);
        BulletPool_1.BulletPool.RecycleRotator(s);
        BulletPool_1.BulletPool.RecycleVector(_);
      }
    }
    if (r.TrackTarget !== 0 && r.TrackTarget !== 10 && (n = this.KWo(t)?.Entity)) {
      e = BulletPool_1.BulletPool.CreateVector();
      t.SetTargetById(n.Id);
      this.YWo(t, t.TargetActorComp, e);
      a.AdditionEqual(e);
      l.RoundCenter.AdditionEqual(e);
      BulletPool_1.BulletPool.RecycleVector(e);
    }
    t.SetActorLocation(a);
    BulletPool_1.BulletPool.RecycleVector(o);
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
      (i = t.MoveInfo).BulletSpeedZ += i.Gravity * this.mie;
      i.BulletSpeed = Math.sqrt(Math.pow(i.BulletSpeed2D, 2) + Math.pow(i.BulletSpeedZ, 2));
      e = BulletPool_1.BulletPool.CreateVector();
      l = BulletPool_1.BulletPool.CreateVector();
      i.GravityMoveForward.Multiply(i.BulletSpeed2D, e);
      (t.AttackerMoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy).Multiply(i.BulletSpeedZ, l);
      e.AdditionEqual(l);
      e.Normalize();
      o = i.GravityMoveRotator;
      e.Rotation(o);
      if (!(r = t.BulletDataMain.Move).InitVelocityRot.IsNearlyZero()) {
        (a = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(o);
        MathUtils_1.MathUtils.ComposeRotator(r.InitVelocityRot, a, o);
        BulletPool_1.BulletPool.RecycleRotator(a);
      }
      BulletPool_1.BulletPool.RecycleVector(e);
      BulletPool_1.BulletPool.RecycleVector(l);
      if (i.ActorRotateParabola) {
        t.SetActorRotation(i.GravityMoveRotator);
      }
    }
  }
  S3c(t) {
    var e;
    var l = t.BulletDataMain.Move.TrackParams;
    if (!!l && !(l.length < 2)) {
      (l = t.MoveInfo).BulletSpeedZ += l.Gravity * this.mie * l.BulletSpeedRatio;
      l.BulletSpeed = Math.sqrt(Math.pow(l.BulletSpeed2D, 2) + Math.pow(l.BulletSpeedZ, 2));
      (e = l.GravityMoveRotator).Set(Math.atan(l.BulletSpeedZ / l.BulletSpeed2D) * MathCommon_1.MathCommon.RadToDeg, e.Yaw, e.Roll);
      if (l.ActorRotateParabola) {
        t.SetActorRotation(e);
      }
    }
  }
  kWo(t, e) {
    var l = t.MoveInfo;
    var o = t.BulletDataMain.Move;
    let r = 0;
    r = o.SpeedCurve ? (Info_1.Info.IsBuildDevelopmentOrDebug && !o.SpeedCurve.IsValid() && UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Obj Refs Name=DelayBulletSpeed"), BulletStaticFunction_1.BulletStaticFunction.CompCurveFloat(t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond, t.Duration, o.SpeedCurve) * l.BulletSpeed) : l.BulletSpeed;
    let a = t.Duration;
    var i;
    var _;
    var u;
    var s = BulletPool_1.BulletPool.CreateVector();
    switch (o.Trajectory) {
      case 2:
        if (o.TrackParams.length > 0 && o.TrackParams[0].X > 0) {
          a = o.TrackParams[0].X;
        }
        var n;
        var B;
        var h = BulletUtil_1.BulletUtil.GetTargetLocation(t.TargetActorComp, t.SkillBoneName, t);
        if (h) {
          n = a - (Time_1.Time.WorldTime - t.GenerateTime) / TimeUtil_1.TimeUtil.InverseMillisecond;
          n = MathUtils_1.MathUtils.IsNearlyZero(n, MathCommon_1.MathCommon.KindaSmallNumber) ? MathCommon_1.MathCommon.KindaSmallNumber : n;
          (B = BulletPool_1.BulletPool.CreateVector()).FromUeVector(h);
          r = Vector_1.Vector.Dist(t.ActorComponent.ActorLocationProxy, B) / n;
          BulletPool_1.BulletPool.RecycleVector(B);
          if (r < o.Speed) {
            r = o.Speed;
          }
          l.UpdateDirVector.Set(r * this.mie * e, 0, 0);
          t.ActorRotateVector(l.UpdateDirVector, s);
        } else {
          r = l.BulletSpeed;
          l.BeginSpeedRotator.Vector(s);
          s.MultiplyEqual(r * this.mie * e);
        }
        break;
      case 5:
      case 4:
        l.GravityMoveRotator.Quaternion().RotateVector(Vector_1.Vector.ForwardVectorProxy, s);
        s.MultiplyEqual(r * this.mie * e);
        break;
      case 1:
        t.GetActorForward(s);
        s.MultiplyEqual(r * this.mie * e);
        break;
      case 3:
        BulletPool_1.BulletPool.RecycleVector(s);
        return;
      case 6:
        this.QWo(t);
        BulletPool_1.BulletPool.RecycleVector(s);
        return;
      default:
        l.BeginSpeedRotator.Vector(s);
        s.MultiplyEqual(r * this.mie * e);
    }
    s.MultiplyEqual(l.BulletSpeedRatio);
    if (!l.BaseAdditiveAccelerate.IsZero()) {
      i = BulletPool_1.BulletPool.CreateVector();
      l.V0.Multiply(this.mie, i);
      _ = BulletPool_1.BulletPool.CreateVector();
      l.AdditiveAccelerate.Multiply(this.mie * 0.5 * this.mie, _);
      i.AdditionEqual(_);
      s.AdditionEqual(i);
      u = BulletPool_1.BulletPool.CreateVector();
      l.AdditiveAccelerate.Multiply(this.mie, u);
      l.V0.AdditionEqual(u);
      BulletPool_1.BulletPool.RecycleVector(i);
      BulletPool_1.BulletPool.RecycleVector(_);
      BulletPool_1.BulletPool.RecycleVector(u);
    }
    l.BulletSpeedDir.FromUeVector(s);
    this.JWo(t, s);
    if (BulletConstant_1.BulletConstant.OpenMoveLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Bullet", 20, "OnTickMove", ["Bullet", t.BulletRowName], ["finalDirMove", s], ["Location", t.GetActorLocation()]);
    }
    BulletPool_1.BulletPool.RecycleVector(s);
    this.zWo(t, l, o.TrackTarget);
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
        }, CombatMessage_1.CombatNet.Send(28319, t.Attacker, r), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Bullet", 20, "修改子弹目标请求", ["新的目标id", e], ["CreatureId", o]);
        }
        t.TargetIdLast = e;
      }
    }
  }
}
(exports.BulletMoveSystem = BulletMoveSystem).gW = Stats_1.Stat.Create("BulletMoveTick");
//# sourceMappingURL=BulletMoveSystem.js.map