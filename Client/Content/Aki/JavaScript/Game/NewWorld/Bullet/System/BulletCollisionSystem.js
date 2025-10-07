"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletCollisionSystem = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const PerformanceController_1 = require("../../../../Core/Performance/PerformanceController");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const SpaceUtils_1 = require("../../../../Core/Utils/SpaceUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const IMatch_1 = require("../../../../UniverseEditor/Interface/IMatch");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const StatDefine_1 = require("../../../Common/StatDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SceneTeamController_1 = require("../../../Module/SceneTeam/SceneTeamController");
const CombatLog_1 = require("../../../Utils/CombatLog");
const BulletConstant_1 = require("../../Bullet/BulletConstant");
const BulletStaticFunction_1 = require("../../Bullet/BulletStaticMethod/BulletStaticFunction");
const BulletTypes_1 = require("../../Bullet/BulletTypes");
const ExtraEffectBaseTypes_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectBaseTypes");
const ExtraEffectDamageFilter_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectDamageFilter");
const ExtraEffectSnapModifier_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectSnapModifier");
const RoleAudioController_1 = require("../../Character/Role/RoleAudioController");
const BulletActionInitHit_1 = require("../Action/BulletActionInitHit");
const BulletController_1 = require("../BulletController");
const BulletCollisionUtil_1 = require("../BulletStaticMethod/BulletCollisionUtil");
const BulletHitCountUtil_1 = require("../BulletStaticMethod/BulletHitCountUtil");
const BulletUtil_1 = require("../BulletUtil");
const BulletEntity_1 = require("../Entity/BulletEntity");
const BulletCollisionInfo_1 = require("../Model/BulletCollisionInfo");
const BulletInfo_1 = require("../Model/BulletInfo");
const BulletPool_1 = require("../Model/BulletPool");
const BulletTraceElementPool_1 = require("../Model/BulletTraceElementPool");
const BulletSystemBase_1 = require("./BulletSystemBase");
const PROFILE_UPDATETRACE_BOX = "BulletMoveUpdateTraceBox";
const PROFILE_UPDATETRACE_SPHERE = "BulletMoveUpdateTraceSphere";
const PROFILE_UPDATE_TRACE_DEFAULT = "BulletMoveUpdateTraceDefault";
const PROFILE_OBSTACLES = "BulletMoveObstacles";
const PROFILE_TICKTRACE = "BulletOnTickTrace";
const MIN_DELTA_TIME = 16.7;
const BIG_BULLET_SEARCH_SCENE_ITME_MIN_TIME = 100;
class BulletCollisionSystem extends BulletSystemBase_1.BulletSystemBase {
  constructor() {
    super(...arguments);
    this.Pjo = Transform_1.Transform.Create();
    this.xjo = Vector_1.Vector.Create();
    this.wjo = Vector_1.Vector.Create();
    this.a7o = undefined;
    this.Bjo = undefined;
    this.bjo = undefined;
    this.qjo = undefined;
    this.mie = 0;
    this.sIa = 0;
    this.Gjo = Vector_1.Vector.Create();
    this.Njo = Vector_1.Vector.Create();
  }
  get Ojo() {
    return this.a7o.ActionLogicComponent;
  }
  OnTick(t) {
    let e = 0;
    BulletCollisionSystem.gW.Start();
    this.mie = t / TimeUtil_1.TimeUtil.InverseMillisecond;
    for (const l of ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap().values()) {
      if (PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest) {
        e = cpp_1.KuroTime.GetMilliseconds64();
      }
      var i = l.GetBulletInfo();
      if (!i.NeedDestroy && i.IsInit && (StatDefine_1.BATTLESTAT_ENABLED && BulletController_1.BulletController.GetBulletCollisionTickStat(i.BulletRowName).Start(), this.kjo(t, i), StatDefine_1.BATTLESTAT_ENABLED)) {
        BulletController_1.BulletController.GetBulletCollisionTickStat(i.BulletRowName).Stop();
      }
      if (PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest) {
        PerformanceController_1.PerformanceController.CollectTickPerformanceInfo("Bullet", false, cpp_1.KuroTime.GetMilliseconds64() - e, 1, i.BornFrameCount);
      }
    }
    this.a7o = undefined;
    this.Bjo = undefined;
    this.bjo = undefined;
    this.qjo = undefined;
    this.sIa = 0;
    BulletCollisionSystem.gW.Stop();
  }
  kjo(t, e) {
    this.a7o = e;
    this.Bjo = e.CollisionInfo;
    this.bjo = e.BulletDataMain.Base.Shape;
    if (this.bjo === 4) {
      this.qjo = e.RayInfo;
      this.sIa = e.BulletDataMain.Base.HitActorType;
      this.Fjo(t);
      this.sIa = 0;
    }
    this.Vjo();
    if (e.AttackerMoveComp?.IsStandardGravity ?? true) {
      this.y3c();
    } else {
      this.Hjo();
    }
    this.jjo();
    this.Wjo(t);
    if (ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(this.a7o.Attacker.Id)) {
      BulletCollisionUtil_1.BulletCollisionUtil.ShowBulletDeBugDraw(e);
    }
  }
  Fjo(t) {
    var e = this.a7o;
    if (!e.NeedDestroy && e.CollisionInfo.IsStartup) {
      this.Bjo.UpdateTraceSphere ||= BulletTraceElementPool_1.BulletTraceElementPool.GetTraceSphereElement(ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(this.a7o.BulletDataMain.Logic.ProfileName.toString(), this.a7o.BulletRowName), e.AttackerId, this.Bjo.IgnoreQueries);
      var i = this.Bjo.UpdateTraceSphere;
      this.qjo.IsBlock = false;
      this.qjo.StartPoint.FromUeVector(this.a7o.ActorComponent.ActorLocationProxy);
      this.qjo.EndPoint.FromUeVector(this.a7o.ActorComponent.ActorForwardProxy);
      this.qjo.Length += this.qjo.Speed * t;
      this.qjo.Length = Math.min(this.qjo.Length, this.a7o.Size.Y);
      this.qjo.EndPoint.MultiplyEqual(this.qjo.Length);
      this.qjo.EndPoint.AdditionEqual(this.qjo.StartPoint);
      i.SetStartLocation(this.qjo.StartPoint.X, this.qjo.StartPoint.Y, this.qjo.StartPoint.Z);
      i.SetEndLocation(this.qjo.EndPoint.X, this.qjo.EndPoint.Y, this.qjo.EndPoint.Z);
      i.Radius = e.Size.Z;
      this.Bjo.ClearHitActorData();
      this.Bjo.HasSearchedHitActorsCurFrame = true;
      var t = TraceElementCommon_1.TraceElementCommon.SphereTrace(i, PROFILE_TICKTRACE);
      if (t) {
        var l = new Array();
        var o = i.HitResult.GetHitCount();
        for (let t = 0; t < o; t++) {
          l.push({
            Distance: i.HitResult.DistanceArray.Get(t),
            Index: t
          });
        }
        if (l.length > 0) {
          l.sort((t, e) => t.Distance - e.Distance);
          var s = i.HitResult.Actors;
          var r = i.HitResult.Components;
          for (const h of l) {
            var a = s.Get(h.Index);
            var n = r.Get(h.Index);
            this.Kjo(a, n);
            if (this.Bjo.ArrayHitActorData.length > 0) {
              this.qjo.IsBlock = true;
              this.qjo.Length = h.Distance;
              this.qjo.EndPoint.FromUeVector(this.a7o.ActorComponent.ActorForwardProxy);
              this.qjo.EndPoint.MultiplyEqual(this.qjo.Length);
              this.qjo.EndPoint.AdditionEqual(this.qjo.StartPoint);
              return;
            }
          }
        }
      }
    }
  }
  Vjo() {
    var t = this.a7o.LiveTimeAddDelta - this.Bjo.ActiveDelayMs;
    if (!this.Bjo.IsPassDelay && this.Bjo.ActiveDelayMs > 0 && t >= 0 && (this.Bjo.IsPassDelay = true, this.Bjo.IsStartup = true, this.Bjo.IsProcessOpen = true, BulletConstant_1.BulletConstant.OpenCollisionLog) && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 20, "Bullet.UpdateInterval.Delay", ["IdName", this.a7o.BulletRowName], ["Actor", this.a7o.Actor?.GetName()], ["ActiveTime", t]);
    }
  }
  Hjo() {
    var t;
    var e;
    var i;
    var l;
    if (this.a7o.IsTensile && (e = this.a7o.AttackerActorComp)?.Actor) {
      t = this.a7o.ActorComponent;
      (i = BulletPool_1.BulletPool.CreateVector()).FromUeVector(e.Actor.Mesh.D_K2_GetComponentToWorld().GetLocation());
      (l = this.Pjo).Set(i, e.ActorQuatProxy, e.ActorScaleProxy);
      BulletPool_1.BulletPool.RecycleVector(i);
      e = BulletPool_1.BulletPool.CreateVector();
      l.TransformPosition(this.a7o.BornLocationOffset, e);
      i = this.a7o.AttackerMoveComp?.IsStandardGravity ?? true ? BulletUtil_1.BulletUtil.FindLookAtRotDoubleStandard(t.ActorLocationProxy, e.ToUeVector(), true) : BulletUtil_1.BulletUtil.FindLookAtRotDouble(t.ActorLocationProxy, e.ToUeVector(), true, this.a7o.AttackerMoveComp?.GravityUp.ToUeVector() ?? Vector_1.Vector.UpVectorDouble);
      (l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(this.a7o.InitPosition);
      l.AdditionEqual(e);
      l.DivisionEqual(2);
      e.SubtractionEqual(this.a7o.InitPosition);
      this.xjo.FromUeVector(this.a7o.Size);
      this.xjo.X += e.Size() / 2;
      if (this.Bjo.CollisionComponent instanceof UE.BoxComponent) {
        this.Bjo.CollisionComponent.D_SetBoxExtent(this.xjo.ToUeVector(), false);
      }
      t.SetActorLocationAndRotation(l.ToUeVector(), i);
      BulletPool_1.BulletPool.RecycleVector(l);
      BulletPool_1.BulletPool.RecycleVector(e);
    }
  }
  y3c() {
    var t;
    var e;
    var i;
    var l;
    if (this.a7o.IsTensile && (e = this.a7o.AttackerActorComp)?.Actor) {
      t = this.a7o.ActorComponent;
      (i = BulletPool_1.BulletPool.CreateVector()).FromUeVector(e.Actor.Mesh.D_GetRelativeTransform().GetLocation());
      i.AdditionEqual(e.ActorLocationProxy);
      (l = this.Pjo).SetRotation(e.ActorQuatProxy);
      l.SetScale3D(e.ActorScaleProxy);
      l.SetLocation(i);
      BulletPool_1.BulletPool.RecycleVector(i);
      e = BulletPool_1.BulletPool.CreateVector();
      l.TransformPosition(this.a7o.BornLocationOffset, e);
      i = UE.KismetMathLibrary.D_FindLookAtRotation(t.ActorLocation, e.ToUeVector());
      (l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(this.a7o.InitPosition);
      l.AdditionEqual(e);
      l.DivisionEqual(2);
      e.SubtractionEqual(this.a7o.InitPosition);
      this.xjo.FromUeVector(this.a7o.Size);
      this.xjo.X += e.Size() / 2;
      if (this.Bjo.CollisionComponent instanceof UE.BoxComponent) {
        this.Bjo.CollisionComponent.D_SetBoxExtent(this.xjo.ToUeVector(), false);
      }
      t.SetActorLocationAndRotation(l.ToUeVector(), i);
      BulletPool_1.BulletPool.RecycleVector(l);
      BulletPool_1.BulletPool.RecycleVector(e);
    }
  }
  jjo() {
    var t;
    var e;
    if (!this.Bjo.FinalScale.Equals(Vector_1.Vector.OneVectorProxy)) {
      t = this.a7o.BulletDataMain;
      if (this.Bjo.CollisionComponent || this.Bjo.RegionComponent || t.Base.Shape === 7) {
        if (t.Scale.ScaleCurve) {
          this.wjo.FromUeVector(BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(this.a7o.LiveTime, this.a7o.Duration * TimeUtil_1.TimeUtil.InverseMillisecond, t.Scale.ScaleCurve));
          this.wjo.MultiplyEqual(this.Bjo.FinalScale);
        } else {
          Vector_1.Vector.Lerp(Vector_1.Vector.OneVectorProxy, this.Bjo.FinalScale, this.a7o.LiveTime / (TimeUtil_1.TimeUtil.InverseMillisecond * this.a7o.Duration), this.wjo);
        }
        this.a7o.BaseSize.Multiply(this.wjo, this.a7o.Size);
        if (this.Bjo.CollisionComponent) {
          if (t.Base.Shape === 3 && t.Scale.ShapeSwitch) {
            e = this.a7o.BaseSize.X - this.a7o.BaseSize.Y;
            this.a7o.Size.Y = this.a7o.Size.X - e;
          }
          BulletCollisionUtil_1.BulletCollisionUtil.UpdateCollisionExtend(t.Base.Shape, this.Bjo.CollisionComponent, this.a7o.Size, this.Bjo.CenterLocalLocation, t.Base.Rotator);
        } else if (this.Bjo.RegionComponent) {
          BulletCollisionUtil_1.BulletCollisionUtil.UpdateRegionExtend(t.Base.Shape, this.Bjo.RegionComponent, this.a7o.Size);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "更新子弹缩放时，子弹没有碰撞组件，且不是大球体", ["BulletEntityId", this.a7o.BulletEntityId], ["BulletRowName", this.a7o.BulletRowName]);
      }
    }
  }
  Wjo(t) {
    if (this.a7o.FrozenTime && (BulletUtil_1.BulletUtil.BulletFrozen(this.a7o), this.a7o.FrozenTime -= t, this.a7o.FrozenTime <= 0)) {
      BulletUtil_1.BulletUtil.BulletUnfrozen(this.a7o);
      this.a7o.FrozenTime = undefined;
    }
  }
  OnAfterTick(t) {
    BulletCollisionSystem.fW.Start();
    this.mie = t / TimeUtil_1.TimeUtil.InverseMillisecond;
    var e = ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap();
    let i = 0;
    BulletInfo_1.BulletInfo.InAfterTick = true;
    for (const o of e.values()) {
      if (PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest) {
        i = cpp_1.KuroTime.GetMilliseconds64();
      }
      var l = o.GetBulletInfo();
      if (!l.NeedDestroy && l.IsInit) {
        if (!BulletUtil_1.BulletUtil.CheckBulletAttackerExist(l)) {
          BulletController_1.BulletController.DestroyBullet(l.BulletEntityId, false);
          continue;
        }
        if (StatDefine_1.BATTLESTAT_ENABLED) {
          BulletController_1.BulletController.GetBulletCollisionAfterTickStat(l.BulletRowName).Start();
        }
        this.Qjo(t, l);
        if (StatDefine_1.BATTLESTAT_ENABLED) {
          BulletController_1.BulletController.GetBulletCollisionAfterTickStat(l.BulletRowName).Stop();
        }
      }
      if (PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest) {
        PerformanceController_1.PerformanceController.CollectTickPerformanceInfo("Bullet", false, cpp_1.KuroTime.GetMilliseconds64() - i, 1, l.BornFrameCount);
      }
    }
    BulletInfo_1.BulletInfo.InAfterTick = false;
    this.a7o = undefined;
    this.Bjo = undefined;
    this.bjo = undefined;
    this.qjo = undefined;
    BulletCollisionSystem.fW.Stop();
  }
  Qjo(b, i) {
    this.a7o = i;
    this.Bjo = i.CollisionInfo;
    this.bjo = i.BulletDataMain.Base.Shape;
    if (this.Xjo() && this.sSa()) {
      this.sIa = i.BulletDataMain.Base.HitActorType;
      if (this.bjo === 7) {
        this.$jo();
      } else {
        var t = this.Yjo();
        if (!i.HasCheckedPosition) {
          if (t && i.BulletDataMain.Logic.DestroyOnHitObstacle) {
            this.Jjo();
          }
          i.CheckedPosition();
        }
        this.zjo();
        if (!this.Bjo.HasSearchedHitActorsCurFrame) {
          var t = (0, puerts_1.$ref)(undefined);
          this.Bjo.CollisionComponent?.GetOverlappingComponents(t);
          var e = (0, puerts_1.$unref)(t);
          if (e) {
            var l = e.Num();
            for (let t = 0; t < l; t++) {
              var o = e.Get(t);
              var s = o.GetOwner();
              this.Kjo(s, o);
            }
          }
        }
      }
      this.Bjo.IsInProcessHit = true;
      var r;
      var t = this.a7o.GetCollisionLocation();
      var a = this.Bjo.ArrayHitActorData;
      var n = a.length;
      if (n > 1) {
        for (let t = 0; t < n; t++) {
          var h = a[t];
          var _ = BulletCollisionInfo_1.bulletHitPriorityList[h.Type];
          h.Priority = _ !== undefined ? _ - t : 0;
        }
        a.sort((t, e) => e.Priority - t.Priority);
      }
      if (this.Bjo.IsProcessOpen) {
        var u = i.BulletDataMain.Base.IntervalAfterHit;
        var B = this.Bjo.IntervalMs;
        if (B <= 0) {
          let t = 1;
          for (const H of a) {
            if (this.cXs(H, t)) {
              t++;
            }
          }
        } else if (u) {
          var c = i.LiveTime - this.Bjo.ActiveDelayMs;
          var v = this.Bjo.ActiveLengthMs <= 0 ? i.LiveTimeAddDelta - this.Bjo.ActiveDelayMs : Math.min(i.LiveTimeAddDelta - this.Bjo.ActiveDelayMs, this.Bjo.ActiveLengthMs + MathUtils_1.MathUtils.SmallNumber);
          var f = Math.floor((v - c) / B) + 1;
          var C = this.Bjo.ObjectsHitCurrent;
          for (let e = 0; e < f; e++) {
            var m = e === 0;
            let t = 1;
            for (const R of this.Bjo.ArrayHitActorData) {
              var E = R.Entity?.Id;
              if (E) {
                var d = C.get(E);
                if (d !== undefined) {
                  d = d + B;
                  if (v < d) {
                    continue;
                  }
                  i.LiveTimeCurHit = Math.max(d, c);
                  C.delete(E);
                } else {
                  i.LiveTimeCurHit = c;
                }
                d = i.BulletDataMain.Base.MultiDamageId;
                if (d && d.length > 0) {
                  var U = i.BulletDataMain.Base.MultiBeHitEffect;
                  var P = U?.length ?? 0;
                  var g = i.BulletDataMain.Base.MultiHitEffectWeakness;
                  var p = g?.length ?? 0;
                  var E = BulletHitCountUtil_1.BulletHitCountUtil.GetHitCountByVictim(i, E);
                  if (d.length <= E) {
                    return;
                  }
                  this.Bjo.BeHitEffect = E < P ? U[E] : FNameUtil_1.FNameUtil.NONE;
                  this.Bjo.WeaknessBeHitEffect = E < p ? g[E] : FNameUtil_1.FNameUtil.NONE;
                  this.Bjo.DamageId = d[E];
                }
                if (this.mXs(R, t, m)) {
                  t++;
                }
              } else if (e === 0 && this.cXs(R, t)) {
                t++;
              }
            }
          }
        } else {
          let t = this.Bjo.StageInterval - this.Bjo.LastStageInterval;
          if (t > 0) {
            var T = this.Bjo.LastStageInterval;
            this.Bjo.LastStageInterval = this.Bjo.StageInterval;
            if (B < MIN_DELTA_TIME) {
              t = 1;
            }
            for (let e = 0; e < t; e++) {
              this.Bjo.AllowedEnergy = true;
              this.Bjo.ObjectsHitCurrent.clear();
              var M = e === 0;
              let t = 1;
              var S = i.BulletDataMain.Base.MultiDamageId;
              if (S && S.length > 0) {
                var I = i.BulletDataMain.Base.MultiBeHitEffect;
                var y = I?.length ?? 0;
                var L = i.BulletDataMain.Base.MultiHitEffectWeakness;
                var q = L?.length ?? 0;
                var A = T + e;
                if (S.length <= A) {
                  continue;
                }
                this.Bjo.DamageId = S[A];
                this.Bjo.BeHitEffect = A < y ? I[A] : FNameUtil_1.FNameUtil.NONE;
                this.Bjo.WeaknessBeHitEffect = A < q ? L[A] : FNameUtil_1.FNameUtil.NONE;
              }
              for (const k of a) {
                if (this.mXs(k, t, M)) {
                  t++;
                }
              }
            }
          }
        }
      }
      for (const D of this.Bjo.LastArrayHitActorData) {
        if (D.IsValidHit) {
          if (!!(r = D.Actor) && (!(r = this.Bjo.MapHitActorData.get(r)) || !r.IsValidHit)) {
            BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(this.a7o, D);
          }
        }
      }
      this.Bjo.LastFramePosition.FromUeVector(t);
      this.Bjo.IsInProcessHit = false;
      this.Bjo.UpdateLastHitActorData();
    } else {
      if (this.Bjo.LastArrayHitActorData.length > 0) {
        this.Bjo.IsInProcessHit = true;
        for (const N of this.Bjo.LastArrayHitActorData) {
          if (N.IsValidHit) {
            BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(this.a7o, N);
          }
        }
        this.Bjo.IsInProcessHit = false;
        this.Bjo.ClearLastHitActorData();
      }
      if (this.Bjo.ArrayHitActor.length > 0) {
        this.Bjo.ClearHitActorData();
      }
      this.Bjo.LastFramePosition.FromUeVector(this.a7o.GetCollisionLocation());
    }
  }
  cXs(t, e) {
    if (this.Zjo(t)) {
      t.ValidProcessIndex = e;
      t.IsValidHit = true;
      if (this.Bjo.LastMapHitActorData.get(t.Actor)?.IsValidHit) {
        t.IsContinueHit = true;
      }
      this.eWo(t);
      return true;
    } else {
      t.IsValidHit = false;
      return t.IsContinueHit = false;
    }
  }
  mXs(t, e, i) {
    if (this.Zjo(t)) {
      t.ValidProcessIndex = e;
      if (i) {
        t.IsValidHit = true;
        if (this.Bjo.LastMapHitActorData.get(t.Actor)?.IsValidHit) {
          t.IsContinueHit = true;
        }
      } else if (!t.IsValidHit) {
        t.IsValidHit = true;
        t.IsContinueHit = true;
      }
      this.eWo(t);
      return true;
    } else {
      if (i) {
        t.IsValidHit = false;
        t.IsContinueHit = false;
      } else if (t.IsValidHit) {
        if ((e = this.Bjo.LastMapHitActorData.get(t.Actor))?.IsValidHit) {
          e.IsValidHit = false;
          BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(this.a7o, t);
        }
        t.IsValidHit = false;
        t.IsContinueHit = false;
      }
      return false;
    }
  }
  Xjo() {
    var t = this.a7o;
    return !((t.CloseCollision || t.NeedDestroy || !t.CollisionInfo.IsStartup || t.ActorComponent.Owner?.IsActorBeingDestroyed()) ?? t.IsFrozen) && !t.IsTensile;
  }
  sSa() {
    var e = this.a7o;
    var i = this.Bjo;
    if (!i.IsProcessOpen) {
      return false;
    }
    if (i.ActiveLengthMs > 0 && e.LiveTime - i.ActiveDelayMs > i.ActiveLengthMs) {
      return false;
    }
    if (i.IntervalMs > 0 && !e.BulletDataMain.Base.IntervalAfterHit) {
      let t = e.LiveTimeAddDelta - i.ActiveDelayMs;
      if (i.ActiveLengthMs > 0) {
        t = Math.min(t, i.ActiveLengthMs + MathUtils_1.MathUtils.SmallNumber);
      }
      i.StageInterval = Math.floor(t / i.IntervalMs) + 1;
      if (i.StageInterval - i.LastStageInterval <= 0) {
        return false;
      }
    }
    return true;
  }
  tWo(t) {
    var e;
    return !!t.ActorComponent.NeedDetach || (e = (e = t.MoveInfo).BulletSpeed * e.BulletSpeedRatio) != 0 && !(e * this.mie < t.Size.X);
  }
  Yjo() {
    if (this.bjo === 4 || this.Bjo.RegionComponent) {
      return false;
    }
    var t = this.a7o;
    var e = this.Bjo.NeedHitObstacles;
    var i = t.BulletDataMain.Base.IsOversizeForTrace;
    let l = true;
    let o = true;
    l = this.Bjo.HasObstaclesCollision ? (o = e, this.tWo(t)) : (o = false, e ? !i : this.tWo(t));
    this.Bjo.ClearHitActorData();
    var s = BulletPool_1.BulletPool.CreateVector();
    s.FromUeVector(t.GetCollisionLocation());
    if (this.Bjo.LastFramePosition.Equals(s)) {
      s.AdditionEqual(t.ActorComponent.ActorForwardProxy);
    }
    if (o) {
      this.iWo(t, s);
    }
    if (!l) {
      BulletPool_1.BulletPool.RecycleVector(s);
      return false;
    }
    let r = !(this.Bjo.HasSearchedHitActorsCurFrame = true);
    let a = undefined;
    let n = undefined;
    switch (t.BulletDataMain.Base.Shape) {
      case 0:
        this.Bjo.UpdateTraceBox ||= BulletTraceElementPool_1.BulletTraceElementPool.GetTraceBoxElement(ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(t.BulletDataMain.Logic.ProfileName.toString(), t.BulletRowName), t.AttackerId, this.Bjo.IgnoreQueries);
        n = this.Bjo.UpdateTraceBox;
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(n, this.Bjo.LastFramePosition);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, s);
        TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(n, t.Size);
        TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(n, t.CollisionRotator);
        if (r = TraceElementCommon_1.TraceElementCommon.BoxTrace(n, PROFILE_UPDATETRACE_BOX)) {
          a = n.HitResult;
        }
        break;
      case 1:
        this.Bjo.UpdateTraceSphere ||= BulletTraceElementPool_1.BulletTraceElementPool.GetTraceSphereElement(ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(t.BulletDataMain.Logic.ProfileName.toString(), t.BulletRowName), t.AttackerId, this.Bjo.IgnoreQueries);
        (n = this.Bjo.UpdateTraceSphere).Radius = t.Size.X;
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(n, this.Bjo.LastFramePosition);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, s);
        if (r = TraceElementCommon_1.TraceElementCommon.SphereTrace(n, PROFILE_UPDATETRACE_SPHERE)) {
          a = n.HitResult;
        }
        break;
      case 3:
        this.Bjo.UpdateTraceBox ||= BulletTraceElementPool_1.BulletTraceElementPool.GetTraceBoxElement(ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(t.BulletDataMain.Logic.ProfileName.toString(), t.BulletRowName), t.AttackerId, this.Bjo.IgnoreQueries);
        n = this.Bjo.UpdateTraceBox;
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(n, this.Bjo.LastFramePosition);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, s);
        var h = BulletPool_1.BulletPool.CreateVector();
        h.Set(this.a7o.Size.X, this.a7o.Size.X, this.a7o.Size.Z);
        TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(n, h);
        BulletPool_1.BulletPool.RecycleVector(h);
        TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(n, t.CollisionRotator);
        if (r = TraceElementCommon_1.TraceElementCommon.BoxTrace(n, PROFILE_UPDATETRACE_BOX)) {
          a = n.HitResult;
        }
        break;
      case 2:
        this.Bjo.UpdateTraceBox ||= BulletTraceElementPool_1.BulletTraceElementPool.GetTraceBoxElement(ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(t.BulletDataMain.Logic.ProfileName.toString(), t.BulletRowName), t.AttackerId, this.Bjo.IgnoreQueries);
        n = this.Bjo.UpdateTraceBox;
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(n, this.Bjo.LastFramePosition);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, s);
        TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(n, BulletCollisionUtil_1.BulletCollisionUtil.GetSectorExtent(this.a7o.Size, this.Bjo.CenterLocalLocation));
        TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(n, t.CollisionRotator);
        if (r = TraceElementCommon_1.TraceElementCommon.BoxTrace(n, PROFILE_UPDATETRACE_BOX)) {
          a = n.HitResult;
        }
        break;
      default:
        this.Bjo.UpdateTraceLine ||= BulletTraceElementPool_1.BulletTraceElementPool.GetTraceLineElement(ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(t.BulletDataMain.Logic.ProfileName.toString(), t.BulletRowName), t.AttackerId, this.Bjo.IgnoreQueries);
        n = this.Bjo.UpdateTraceLine;
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(n, this.Bjo.LastFramePosition);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, s);
        if (r = TraceElementCommon_1.TraceElementCommon.LineTrace(n, PROFILE_UPDATE_TRACE_DEFAULT)) {
          a = n.HitResult;
        }
    }
    if (BulletConstant_1.BulletConstant.OpenMoveLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Bullet", 20, "BulletCollisionSystem TraceHighSpeed", ["Bullet", t.BulletRowName], ["Last", this.Bjo.LastFramePosition], ["Current", s]);
    }
    BulletPool_1.BulletPool.RecycleVector(s);
    if (r) {
      var _ = a.GetHitCount();
      if (!(_ <= 0)) {
        if (_ === 1) {
          this.Kjo(a.Actors.Get(0), a.Components.Get(0), undefined, a, 0);
        } else {
          var u = new Array();
          var B = a.Components;
          var c = a.Actors;
          var v = a.LocationX_Array;
          var f = a.LocationY_Array;
          var C = a.LocationZ_Array;
          for (let t = 0; t < _; t++) {
            var m = BulletPool_1.BulletPool.CreateBulletHitTempResult();
            m.Index = t;
            m.ImpactPoint.X = v.Get(t);
            m.ImpactPoint.Y = f.Get(t);
            m.ImpactPoint.Z = C.Get(t);
            m.DistSquared = Vector_1.Vector.DistSquared(m.ImpactPoint, this.Bjo.LastFramePosition);
            m.Component = B.Get(t);
            m.Actor = c.Get(t);
            u.push(m);
          }
          if (u.length > 0) {
            u.sort((t, e) => t.DistSquared - e.DistSquared);
          }
          for (const E of u) {
            this.Kjo(E.Actor, E.Component, E, a);
            BulletPool_1.BulletPool.RecycleBulletHitTempResult(E);
          }
        }
      }
    }
    return true;
  }
  Jjo() {
    var e = this.a7o;
    if (e.BulletDataMain.Move.BoneNameString !== "") {
      var t = BulletPool_1.BulletPool.CreateVector();
      t.FromUeVector(e.AttackerActorComp.ActorLocationProxy);
      var i = BulletPool_1.BulletPool.CreateVector();
      i.FromUeVector(e.InitPosition);
      i.Z = t.Z;
      var l = Math.sqrt(e.AttackerActorComp.ScaledRadius);
      if (Vector_1.Vector.DistSquared2D(t, i) < l) {
        BulletPool_1.BulletPool.RecycleVector(t);
        BulletPool_1.BulletPool.RecycleVector(i);
      } else {
        l = BulletTraceElementPool_1.BulletTraceElementPool.GetTraceLineElement(ModelManager_1.ModelManager.BulletModel.ObjectTypeObstacles, e.AttackerId, this.Bjo.IgnoreQueries);
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(l, t);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(l, i);
        BulletPool_1.BulletPool.RecycleVector(t);
        BulletPool_1.BulletPool.RecycleVector(i);
        t = TraceElementCommon_1.TraceElementCommon.LineTrace(l, "BulletCheckPosition");
        if (t) {
          var i = l.HitResult;
          var o = i.GetHitCount();
          var s = i.Components;
          var r = i.Actors;
          for (let t = 0; t < o; t++) {
            var a = r.Get(t);
            var n = e.AttackerActorComp.Actor.BasePlatform;
            if (!n || a !== n) {
              this.Kjo(a, s.Get(t));
            }
          }
        }
        BulletTraceElementPool_1.BulletTraceElementPool.RecycleTraceLineElement(l);
      }
    }
  }
  $jo() {
    this.Bjo.HasSearchedHitActorsCurFrame = true;
    var e = [];
    this.cth(this.bjo, this.a7o.ActorComponent.ActorLocation, this.a7o.Size, e);
    if (e.length > 0) {
      var i = this.a7o.BulletDataMain.Base;
      let t = i.BigRangeHitSceneItem;
      if (t && (this.a7o.CollisionInfo.IntervalMs < BIG_BULLET_SEARCH_SCENE_ITME_MIN_TIME || i.IntervalAfterHit)) {
        CombatLog_1.CombatLog.Error("Bullet", this.a7o?.Entity, "大范围子弹对场景物件生效必须配置【作用间隔】大于0.1秒且不能勾选【作用间隔基于个体】", ["BulletRowName", this.a7o?.BulletRowName]);
        t = false;
      }
      BulletCollisionSystem.oWo.Start();
      for (const l of e) {
        this.rWo(l, t);
      }
      BulletCollisionSystem.oWo.Stop();
    }
  }
  rWo(t, e) {
    var i;
    var e = this.aSa(t, e);
    if (e !== 0 && (i = t.Entity.GetComponent(1))?.ActorLocationProxy) {
      this.hSa(t, i, e);
    }
  }
  aSa(t, e) {
    var i;
    if (t?.IsInit && (t = t.Entity) && (i = t.GetComponent(0))) {
      if ((i = i.GetEntityType()) === Protocol_1.Aki.Protocol.kks.Proto_Player || i === Protocol_1.Aki.Protocol.kks.Proto_Monster || i === Protocol_1.Aki.Protocol.kks.Proto_Vision) {
        return this.aIa(1);
      } else if (e && i === Protocol_1.Aki.Protocol.kks.Proto_SceneItem && t.GetComponent(155)) {
        return this.aIa(3);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  zjo() {
    var e = this.Bjo.RegionDetectComponent;
    var i = this.Bjo.RegionComponent;
    var l = this.a7o.BulletDataMain.Base.BigRangeSearchType;
    if (e && i) {
      this.Bjo.HasSearchedHitActorsCurFrame = true;
      var o = [];
      this.cth(this.bjo, this.a7o.IsCollisionRelativeLocationZero ? this.a7o.ActorComponent.ActorLocation : i.D_K2_GetComponentLocation(), this.a7o.Size, o);
      if (o.length > 0) {
        i = this.a7o.BulletDataMain.Base;
        let t = i.BigRangeHitSceneItem;
        if (t && (this.a7o.CollisionInfo.IntervalMs < BIG_BULLET_SEARCH_SCENE_ITME_MIN_TIME || i.IntervalAfterHit)) {
          CombatLog_1.CombatLog.Error("Bullet", this.a7o?.Entity, "大范围子弹对场景物件生效必须配置【作用间隔】大于0.1秒且不能勾选【作用间隔基于个体】", ["BulletRowName", this.a7o?.BulletRowName]);
          t = false;
        }
        BulletCollisionSystem.oWo.Start();
        for (const s of o) {
          this.sWo(s, e, t, l);
        }
        BulletCollisionSystem.oWo.Stop();
      }
    }
  }
  sWo(e, i, l, o) {
    l = this.aSa(e, l);
    if (l !== 0) {
      var s = e.Entity.GetComponent(1);
      var r = s?.ActorLocation;
      if (r) {
        let t = i.Detect(r, BulletConstant_1.BulletConstant.RegionKey);
        if (!t && o === 1 && l === 1) {
          var a = s;
          var r = a.GetMapPartCollision();
          if (r.size > 0) {
            for (var [n, h] of r.entries()) {
              if (a.GetPartHitConf(n) && a.IsPartComponentEnable(n) && i.Detect(h.D_K2_GetComponentLocation(), BulletConstant_1.BulletConstant.RegionKey)) {
                t = true;
                break;
              }
            }
          }
        }
        if (t) {
          this.hSa(e, s, l);
        }
      }
    }
  }
  iWo(t, e) {
    var i = t.MoveInfo;
    if (t.CollisionInfo.HasObstaclesCollision) {
      this.Bjo.ObstaclesTraceElement ||= BulletTraceElementPool_1.BulletTraceElementPool.GetTraceSphereElement(ModelManager_1.ModelManager.BulletModel.ObjectTypeObstacles, t.AttackerId, this.Bjo.IgnoreQueries);
      var l;
      var o;
      var s = this.Bjo.ObstaclesTraceElement;
      var t = t.BulletDataMain.Obstacle;
      s.Radius = t.Radius;
      if (i.ObstaclesOffset.IsZero()) {
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, this.Bjo.LastFramePosition);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, e);
      } else {
        t = BulletPool_1.BulletPool.CreateVector();
        l = BulletPool_1.BulletPool.CreateVector();
        o = UE.KismetMathLibrary.FindLookAtRotation(this.Bjo.LastFramePosition.ToUeVectorOld(), e.ToUeVectorOld());
        BulletCollisionSystem.aWo.SetRotation(o.Quaternion());
        BulletCollisionSystem.aWo.SetLocation(this.Bjo.LastFramePosition);
        BulletCollisionSystem.aWo.TransformPosition(i.ObstaclesOffset, t);
        BulletCollisionSystem.aWo.SetLocation(e);
        BulletCollisionSystem.aWo.TransformPosition(i.ObstaclesOffset, l);
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, t);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, l);
        BulletPool_1.BulletPool.RecycleVector(t);
        BulletPool_1.BulletPool.RecycleVector(l);
      }
      if (TraceElementCommon_1.TraceElementCommon.SphereTrace(s, PROFILE_OBSTACLES)) {
        var r = s.HitResult;
        var a = r.Components;
        var n = r.Actors;
        var h = r.GetHitCount();
        for (let t = 0; t < h; t++) {
          this.hWo(n.Get(t), a.Get(t), r, t);
        }
      }
    }
  }
  lWo(t) {
    let e = this.Bjo.MapBulletConditionResult.get(t);
    if (!e) {
      e = BulletPool_1.BulletPool.CreateBulletConditionResult();
      this.Bjo.MapBulletConditionResult.set(t, e);
    }
    return !e.KeepDisable && (!e.HasConstResult || !!e.ConstResult) && !(e.ConstResult = this._Wo(t), e.HasConstResult = true, !e.ConstResult);
  }
  uWo(t) {
    var e = t.ConditionResult;
    if (e) {
      return t.Type !== 0 && !!this.cWo(t) || !(e.KeepDisable = true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "生成HitActorData前没有经过PreCheckCondition");
      }
      return false;
    }
  }
  cWo(t) {
    return this.a7o.BulletDataMain.Base.Shape !== 4 || t.Type !== 1 || !!this.qjo.BlockByCharacter;
  }
  Zjo(t) {
    if (t.Actor?.IsValid()) {
      var e = t.ConditionResult;
      if (e) {
        return !e.KeepDisable && (this.mWo(t) ? this.dWo(t) : !(e.KeepDisable = true));
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "生成HitActorData前没有经过PreCheckCondition");
      }
      for (const i of this.Bjo.MapBulletConditionResult.keys()) {
        if (i === t.Actor && Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 17, "MapBulletConditionResult有该actor的数据");
        }
        break;
      }
    }
    return false;
  }
  _Wo(t) {
    var e;
    return !!t && !(e = this.a7o.BulletDataMain, t === this.a7o.Actor) && (!!e.Base.HitConditionTagId || !!(this.a7o.BulletCamp & BulletActionInitHit_1.SELF_NUMBER) || t !== this.a7o.AttackerActorComp.Actor);
  }
  mWo(t) {
    if (t.Type === 0) {
      return false;
    }
    if (!t.Actor?.IsValid()) {
      return false;
    }
    if (t.EntityHandle && !t.EntityHandle.Valid) {
      return false;
    }
    if (t.Type === 1) {
      var e = this.a7o.Attacker.GetComponent(56)?.GetAttributeHolder() ?? this.a7o.Attacker;
      if (ExtraEffectDamageFilter_1.DamageFilter.ApplyEffects(e, t.Entity, this.a7o.BulletInitParams.BulletRowName, this.a7o.Tags, this.a7o.BulletInitParams.SkillId, this.a7o.CollisionInfo.DamageId, this.a7o.BulletInitParams.BattleFlags)) {
        return false;
      }
    }
    return true;
  }
  dWo(t) {
    return !!this.CWo(t) && !!this.gWo(t) && !!this.fWo(t);
  }
  CWo(t) {
    var e = this.a7o.BulletDataMain;
    var i = e.Base.HitConditionTagId;
    if (i) {
      return BulletUtil_1.BulletUtil.DoesEntityContainsTag(t.Entity, i);
    } else {
      return !(i = e.Base.BanHitTagId) || !BulletUtil_1.BulletUtil.DoesEntityContainsTag(t.Entity, i);
    }
  }
  gWo(t) {
    if (this.a7o.CloseCollision) {
      return true;
    }
    switch (this.a7o.BulletDataMain.Base.Shape) {
      case 3:
        var e = this.a7o.CenterLocation;
        var i = this.a7o.AttackerMoveComp?.IsStandardGravity ?? true ? undefined : this.a7o.AttackerMoveComp.GravityUp;
        var l = t.Components;
        if (!l || !l.length) {
          return true;
        }
        for (const r of l) {
          if (SpaceUtils_1.SpaceUtils.IsComponentInRingArea(e, this.a7o.Size, r, i)) {
            return true;
          }
        }
        return false;
      case 2:
        var o = this.a7o.CenterLocation;
        var s = BulletPool_1.BulletPool.CreateRotator();
        s.FromUeRotator(this.a7o.CollisionInfo.CollisionTransform.Rotator());
        var l = t.Components;
        if (!l || !l.length) {
          return true;
        }
        for (const a of l) {
          if (SpaceUtils_1.SpaceUtils.IsComponentInSectorArea(o, this.a7o.Size, s.Quaternion(), a)) {
            BulletPool_1.BulletPool.RecycleRotator(s);
            return true;
          }
        }
        BulletPool_1.BulletPool.RecycleRotator(s);
        return false;
      default:
        return true;
    }
  }
  fWo(t) {
    var e = t.Type;
    return e !== 1 && e !== 7 || (e = t.Entity.GetComponent(1), BulletUtil_1.BulletUtil.AttackedCondition(this.a7o, e));
  }
  Kjo(i, l, o, s, r) {
    if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 17, "触发碰撞", ["BulletRowName", this.a7o.BulletRowName], ["Actor", i.GetName()], ["Component", l.GetName()], ["Bone", s?.BoneNameArray?.Num() ?? 0]);
    }
    if (this.lWo(i)) {
      let t = this.Bjo.MapHitActorData.get(i);
      let e = false;
      if (t) {
        if (t.HasComponent(l)) {
          return;
        }
      } else {
        e = true;
        if (!(t = this.pWo(i, l))) {
          return;
        }
      }
      if (this.vWo(t, l)) {
        t.AddComponent(l);
        if (s && t.Type === 4) {
          if (o) {
            t.AddHitTempResult(o, s.BoneNameArray.Get(r));
          } else {
            t.AddHitResult(s, r);
          }
        }
        if (e) {
          l = this.Bjo.MapBulletConditionResult.get(i);
          t.ConditionResult = l;
          if (this.uWo(t)) {
            this.Bjo.AddHitActorData(i, t);
            if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Bullet", 17, "碰撞通过预检测", ["BulletRowName", this.a7o.BulletRowName], ["actor", i.GetName()], ["type", t.Type]);
            }
          } else {
            BulletPool_1.BulletPool.RecycleBulletHitActorData(t);
          }
        }
      } else if (e) {
        BulletPool_1.BulletPool.RecycleBulletHitActorData(t);
      }
    }
  }
  hWo(e, t, i, l) {
    if (this.Bjo.HasObstaclesCollision && !this.a7o.NeedDestroy && this.a7o.BulletDataMain.Move.FollowType !== 2) {
      var o = ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(e);
      if (!(o?.Entity?.GetComponent(155) ?? o?.Entity?.GetComponent(163)) && (!e || !(e instanceof UE.KuroEntityActor) && !UE.KuroStaticLibrary.IsImplementInterface(e.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) && !(e instanceof UE.TriggerVolume)) {
        o = this.Bjo.MapHitActorData.get(e);
        if (!o) {
          o = this.MWo(e);
          let t = this.Bjo.MapBulletConditionResult.get(e);
          if (!t) {
            t = BulletPool_1.BulletPool.CreateBulletConditionResult();
            this.Bjo.MapBulletConditionResult.set(e, t);
            t.HasConstResult = true;
            t.ConstResult = true;
          }
          o.ConditionResult = t;
          o.AddHitResult(i, l);
          this.Bjo.AddHitActorData(e, o);
        }
        if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Bullet", 20, "触发碰撞 障碍物检测", ["Bullet", this.a7o?.BulletRowName], ["Actor", e.GetName()]);
        }
      }
    }
  }
  hSa(e, i, l) {
    var o = i.Owner;
    if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 17, "触发碰撞（大范围子弹）", ["BulletRowName", this.a7o.BulletRowName], ["Actor", o.GetName()], ["entityId", e.Id]);
    }
    if (this.lWo(o)) {
      var s = this.Bjo.MapHitActorData.get(o);
      if (!s) {
        (s = BulletPool_1.BulletPool.CreateBulletHitActorData()).Actor = o;
        s.EntityHandle = e;
        if ((s.Type = l) === 1) {
          var r = i;
          var a = r.GetMapPartCollision();
          if (a.size === 0) {
            s.AddComponent(r.Actor.CapsuleComponent);
          } else {
            let t = false;
            for (var [n, h] of a.entries()) {
              if (r.GetPartHitConf(n) && r.IsPartComponentEnable(n)) {
                s.AddComponent(h);
                t = true;
              }
            }
            if (!t) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Bullet", 17, "大范围子弹搜索到多部位的实体，没找到合适的碰撞部位", ["BulletRowName", this.a7o.BulletRowName], ["Actor", o.GetName()], ["entityId", e.Id]);
              }
              BulletPool_1.BulletPool.RecycleBulletHitActorData(s);
              return;
            }
          }
        } else {
          if (l !== 3) {
            BulletPool_1.BulletPool.RecycleBulletHitActorData(s);
            return;
          }
          {
            let t = false;
            a = i;
            l = a.GetMainCollisionActor()?.GetComponentByClass(UE.PrimitiveComponent.StaticClass());
            if (l) {
              s.AddComponent(l);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Bullet", 17, "大范围子弹搜索到场景物", ["BulletRowName", this.a7o.BulletRowName], ["Actor", o.GetName()], ["entityId", e.Id]);
              }
              t = true;
            } else if (i = a.GetPrimitiveComponent()) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Bullet", 17, "大范围子弹搜索到场景物，没找到MainCollisionActor,用BaseItem的PrimitiveComponent代替", ["BulletRowName", this.a7o.BulletRowName], ["Actor", o.GetName()], ["entityId", e.Id]);
              }
              s.AddComponent(i);
              t = true;
            }
            if (!t) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Bullet", 17, "大范围子弹搜索到场景物件，没找到合适的碰撞体", ["BulletRowName", this.a7o.BulletRowName], ["Actor", o.GetName()], ["entityId", e.Id]);
              }
              BulletPool_1.BulletPool.RecycleBulletHitActorData(s);
              return;
            }
          }
        }
        l = this.Bjo.MapBulletConditionResult.get(o);
        s.ConditionResult = l;
        if (this.uWo(s)) {
          this.Bjo.AddHitActorData(o, s);
          if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Bullet", 17, "碰撞通过预检测", ["BulletRowName", this.a7o.BulletRowName], ["actor", o.GetName()], ["type", s.Type]);
          }
        } else {
          BulletPool_1.BulletPool.RecycleBulletHitActorData(s);
        }
      }
    }
  }
  vWo(t, e) {
    if (t.Type === 1) {
      t = t.Entity.GetComponent(3);
      e = e.GetName();
      if (t.IsPartHit && (e === BulletConstant_1.BulletConstant.MoveCylinder || !t.IsPartComponentEnable(e))) {
        return false;
      }
    }
    return true;
  }
  pWo(e, t) {
    var i = BulletPool_1.BulletPool.CreateBulletHitActorData();
    if (i.Actor = e) {
      let t = undefined;
      if (e instanceof UE.KuroEntityActor) {
        t = e.EntityId;
      } else if (UE.KuroStaticLibrary.IsImplementInterface(e.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
        t = e.GetEntityId();
      }
      if (t !== undefined) {
        var l = ModelManager_1.ModelManager.CharacterModel.GetHandle(t);
        if ((i.EntityHandle = l)?.Valid) {
          var l = l.Entity;
          var o = l.GetComponent(0);
          var s = o?.GetEntityType();
          if (s === Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
            i.Type = this.aIa(3);
            return i;
          }
          if (s === Protocol_1.Aki.Protocol.kks.HI_) {
            i.Type = this.aIa(7);
            return i;
          }
          if (s === Protocol_1.Aki.Protocol.kks.Proto_Npc) {
            i.Type = this.aIa(5);
            return i;
          }
          if (s === Protocol_1.Aki.Protocol.kks.Proto_Animal && o.GetEntityCamp() === 2) {
            i.Type = this.aIa(6);
            return i;
          }
          if (l.GetComponent(3)) {
            i.Type = this.aIa(1);
            return i;
          }
        } else {
          s = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(t);
          if (s && s instanceof BulletEntity_1.BulletEntity) {
            i.Type = this.aIa(2);
            i.BulletEntityId = t;
            return i;
          }
        }
        i.Type = 0;
        return i;
      }
    }
    o = ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(e);
    if (o?.Valid) {
      i.EntityHandle = o;
      i.Type = this.aIa(3);
      return i;
    } else if (this.Bjo.HasObstaclesCollision) {
      return undefined;
    } else {
      if (this.a7o.BulletDataMain.Logic.IgnoreWater && BulletConstant_1.BulletConstant.ProfileNameWater.op_Equality(t.GetCollisionProfileName())) {
        i.Type = 0;
      } else {
        i.Type = this.aIa(4);
      }
      return i;
    }
  }
  aIa(t) {
    if (this.sIa === 0 || t === this.sIa) {
      return t;
    } else {
      return 0;
    }
  }
  MWo(t) {
    var e = BulletPool_1.BulletPool.CreateBulletHitActorData();
    e.Actor = t;
    e.Type = 4;
    e.FromObstaclesCollision = true;
    return e;
  }
  eWo(t) {
    var e = this.a7o;
    if (!e.NeedDestroy) {
      BulletCollisionSystem.EWo.Start();
      var i = this.SWo(t);
      try {
        i?.Start();
        switch (t.Type) {
          case 1:
            this.yWo(t);
            break;
          case 2:
            this.IWo(t);
            break;
          case 3:
            this.TWo(t);
            break;
          case 7:
            this.Wr_(t);
            break;
          case 4:
            this.LWo(t);
            break;
          case 5:
          case 6:
            if (t.EntityHandle?.Valid) {
              break;
            }
            EventSystem_1.EventSystem.EmitWithTarget(t.Entity, EventDefine_1.EEventName.BulletHitSpecialCharacter, e);
            return;
        }
        if (BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountTotal(this.a7o)) {
          BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(this.a7o, 8, "[BulletCollisionSystem.ProcessHit]");
          this.a7o.ChildInfo?.SetIsNumberNotEnough(true);
          BulletController_1.BulletController.DestroyBullet(e.BulletEntityId, false);
        }
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Bullet", 17, "Bullet ProcessHit Error", t, ["BulletEntityId", this.a7o.BulletEntityId], ["BulletRowName", this.a7o.BulletRowName], ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 17, "Bullet ProcessHit Error", ["BulletEntityId", this.a7o.BulletEntityId], ["BulletRowName", this.a7o.BulletRowName], ["error", t]);
        }
      } finally {
        i?.Stop();
      }
      BulletCollisionSystem.EWo.Stop();
    }
  }
  SWo(t) {
    var e;
    if (Stats_1.Stat.Enable && t.Entity) {
      e = t.Entity.Id;
      t = t.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
      return Stats_1.Stat.CreateNoFlameGraph(`HitEntityId${e}PbDataId${t}`);
    }
  }
  yWo(t) {
    var e;
    if (t.EntityHandle?.Valid) {
      if ((e = t.Entity.GetComponent(69))?.Valid && e.IsMultiPart) {
        this.DWo(t);
      } else {
        this.RWo(t);
      }
    }
  }
  DWo(s) {
    var r = s.Entity.GetComponent(3);
    this.UWo(s.Entity);
    var a = this.a7o;
    if (this.AWo(s) && BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(a, s.Entity)) {
      var n = r.Entity;
      var h = r.ActorForwardProxy;
      var _ = n.GetComponent(69);
      var u = [];
      var B = [];
      var c = [];
      let i = false;
      var v = new Map();
      let l = 0;
      var f = s.Components;
      let o = undefined;
      for (let t = 0, e = f.length; t < e; t++) {
        var C = f[t];
        const d = C.GetName();
        if (d !== BulletConstant_1.BulletConstant.MoveCylinder) {
          var m = _.GetPart(d);
          if (!u.includes(m) && !B.includes(m) && !c.includes(m)) {
            if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Bullet", 20, "子弹击中部位", ["部位", d], ["子弹ID", a.BulletRowName]);
            }
            if (m?.Active) {
              m.HitBoneName = d;
              if (m.IsShield) {
                var E = BulletPool_1.BulletPool.CreateVector();
                BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(C, a, E);
                v.set(d, E);
                if (this.CheckAngle(m.BlockAngle, a, E, h)) {
                  u.push(m);
                  l = t;
                  break;
                }
              } else if (m.SeparateDamage) {
                B.push(m);
                if (m.IsWeakness) {
                  E = BulletPool_1.BulletPool.CreateVector();
                  BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(C, a, E);
                  v.set(d, E);
                }
              } else {
                c.push(m);
                if (m.IsWeakness) {
                  m = BulletPool_1.BulletPool.CreateVector();
                  BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(C, a, m);
                  v.set(d, m);
                }
                i = true;
              }
            } else {
              i = true;
            }
            m = BulletCollisionUtil_1.BulletCollisionUtil.CalcPartDistance(C, a);
            if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Bullet", 20, "命中特效 选择", ["boneName", d], ["cos", m], ["bulletRowName", a.BulletRowName]);
            }
            if (o === undefined || m < o) {
              o = m;
              l = t;
            }
          }
        }
      }
      let e = false;
      if (u.length > 0) {
        BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(a, n);
      } else {
        for (const P of B) {
          if (!BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(a, n)) {
            break;
          }
          if (P.IsWeakness && (P.IsWeaknessHit = this.CheckWeakness(P, a, v.get(P.HitBoneName), h), P.IsWeaknessHit)) {
            e = true;
          }
          BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(a, n);
        }
        if (c.length > 0) {
          let t = undefined;
          for (const g of c) {
            if (g.IsWeakness && (g.IsWeaknessHit = this.CheckWeakness(g, a, v.get(g.HitBoneName), h), g.IsWeaknessHit)) {
              t = g;
              break;
            }
          }
          if (t) {
            c.length = 0;
            e = true;
            c.push(t);
          }
        }
      }
      if (BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(a, n)) {
        if (i) {
          BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(a, n);
        }
      } else {
        i = false;
      }
      r = f[l];
      const d = r.GetName();
      const U = BulletPool_1.BulletPool.CreateVector();
      if (v.has(d)) {
        U.FromUeVector(v.get(d));
      } else {
        BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(r, a, U);
      }
      if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Bullet", 20, "命中特效 最终", ["boneName", d], ["bulletRowName", a.BulletRowName]);
      }
      r = this.a7o.BulletDataMain;
      let t = true;
      if (!this.Bjo.StopHit) {
        t = this.PWo(s, r, U, i, d, u, B, c, e);
      }
      this.Bjo.StopHit = false;
      if (!t) {
        BulletUtil_1.BulletUtil.SummonBullet(this.a7o, 1, s.Entity, false, U, a.CollisionInfo.LastFramePosition);
        if (a.BulletInitParams.SyncType === 0) {
          this.$ba(r.Logic.DestroyOnHitCharacter, a.BulletEntityId, "本地子弹");
        }
      }
      for (const [, U] of v) {
        BulletPool_1.BulletPool.RecycleVector(U);
      }
      BulletPool_1.BulletPool.RecycleVector(U);
    }
  }
  CheckWeakness(t, e, i, l) {
    return !!t && !!t.IsWeakness && (!t.WeaknessTypeSet || t.WeaknessTypeSet.size === 0 || !!t.WeaknessTypeSet.has(e.BulletDataMain.Logic.Type)) && this.CheckAngle(t.WeaknessAngle, e, i, l);
  }
  CheckAngle(t, e, i, l) {
    var o;
    var s;
    return t === 0 || ((s = (o = e.Entity).Data.Logic.HitDirectionType) === 1 ? (o.GetComponent(1).ActorLocationProxy.Subtraction(i, this.Gjo), this.Gjo.Normalize(MathCommon_1.MathCommon.KindaSmallNumber)) : s === 0 ? (this.Gjo.FromUeVector(e.AttackerActorComp.ActorLocationProxy), this.Gjo.SubtractionEqual(i), this.Gjo.Normalize(MathCommon_1.MathCommon.KindaSmallNumber)) : this.Gjo.FromUeVector(Vector_1.Vector.ForwardVectorProxy), this.Njo.FromUeVector(l), t >= 0 && this.Njo.MultiplyEqual(-1), Vector_1.Vector.DotProduct(this.Gjo, this.Njo) >= Math.cos(t));
  }
  UWo(e) {
    if (e.GetComponent(17)) {
      if (!this.Bjo.CharacterEntityMap.has(e)) {
        this.Bjo.CharacterEntityMap.set(e, -1);
      }
      var i = this.a7o.BulletDataMain;
      if (i.Base.ContinuesCollision && (this.Bjo.HaveCharacterInBullet = true, BulletUtil_1.BulletUtil.SummonBullet(this.a7o, 1, e, true), BulletCollisionUtil_1.BulletCollisionUtil.EntityEnter(this.a7o, e), i.Execution.GeIdApplyToVictim)) {
        var l;
        var o = this.a7o.Attacker.CheckGetComponent(175);
        var s = e.CheckGetComponent(175);
        var r = e.CheckGetComponent(206);
        let t = true;
        if (t = e.GetComponent(0).IsRole() && !e.GetComponent(3).IsRoleAndCtrlByMe ? false : t) {
          for (const a of i.Execution.GeIdApplyToVictim) {
            if (!s.GetBuffApplyTarget(a, o.CreatureDataId)?.HasBuff(a)) {
              s.AddBuff(a, {
                InstigatorId: o.CreatureDataId,
                Level: this.a7o.SkillLevel,
                PreMessageId: this.a7o.ContextId,
                Reason: `子弹${i.BulletRowName}命中`,
                BulletMessageId: this.a7o.ContextId
              });
            }
          }
        }
        if (!r.HasTag(-648310348)) {
          r = i.TimeScale.TimeScaleOnHit;
          if (i.TimeScale.AreaTimeScale) {
            if (!(this.Bjo.CharacterEntityMap.get(e) > 0)) {
              if (l = e.GetComponent(123)) {
                l = l.SetTimeScale(r.优先级, r.时间膨胀值, r.时间膨胀变化曲线, this.a7o.Duration, 2);
                this.Bjo.CharacterEntityMap.set(e, l);
              } else {
                this.Bjo.CharacterEntityMap.set(e, 0);
              }
            }
          } else {
            this.Bjo.CharacterEntityMap.set(e, 0);
          }
        }
      }
    }
  }
  $ba(t, e, i) {
    if (t && (BulletController_1.BulletController.DestroyBullet(e, false), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Bullet", 20, "子弹碰撞单位销毁", ["Info", i]);
    }
  }
  RWo(i) {
    var l = i.Entity;
    var o = i.Entity.GetComponent(3);
    var s = this.a7o;
    this.UWo(i.Entity);
    if (this.AWo(i) && BulletHitCountUtil_1.BulletHitCountUtil.HitCountCondition(s, i.Entity)) {
      var r = s.BulletDataMain;
      if (this.xWo(i.Entity)) {
        UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(o.Actor, GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-63529668), undefined);
        if (this.a7o?.Attacker && l) {
          _ = [this.a7o.Attacker, l, this.a7o.BulletInitParams.SkillId, BigInt(this.a7o.BulletRowName ?? -1)];
          SceneTeamController_1.SceneTeamController.EmitEvent(l, EventDefine_1.EEventName.CharLimitDodge, ..._);
        }
        BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(s, 10, "极限闪避");
        this.$ba(r.Logic.DestroyOnHitCharacter, s.BulletEntityId, "极限闪避");
      } else {
        var l = BulletPool_1.BulletPool.CreateVector();
        var a = i.Components;
        var n = a.length;
        let t = undefined;
        if (n > 0) {
          let e = 0;
          let i = undefined;
          for (let t = 0; t < n; t++) {
            var h = BulletCollisionUtil_1.BulletCollisionUtil.CalcPartDistance(a[t], s);
            if (i === undefined || h < e) {
              e = h;
              i = t;
            }
          }
          var _ = a[i];
          t = _.GetName();
          BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(_, s, l);
        } else {
          l.FromUeVector(o.GetSocketLocation(BulletConstant_1.BulletConstant.HitCase));
        }
        let e = true;
        if (!this.Bjo.StopHit) {
          e = this.PWo(i, r, l, true, t);
        }
        this.Bjo.StopHit = false;
        if (!e) {
          BulletUtil_1.BulletUtil.SummonBullet(this.a7o, 1, i.Entity, false, l, s.CollisionInfo.LastFramePosition);
          if (s.BulletInitParams.SyncType === 0) {
            this.$ba(r.Logic.DestroyOnHitCharacter, s.BulletEntityId, "本地子弹");
          }
        }
        BulletPool_1.BulletPool.RecycleVector(l);
      }
    }
  }
  xWo(t) {
    return !!this.a7o.BulletDataMain.Logic.CanDodge && !!BulletUtil_1.BulletUtil.DoesEntityContainsTag(t, -549410347) && !BulletUtil_1.BulletUtil.DoesEntityContainsTag(t, -1221493771);
  }
  PWo(t, e, i, l, o, s, r, a, n = false) {
    var h = this.a7o;
    var _ = h.AttackerActorComp;
    var u = t.Entity.GetComponent(3);
    var B = this.Bjo;
    const c = B.DamageId;
    const v = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(c);
    var f = c > 0 ? v.CalculateType : -1;
    let C = undefined;
    C = n && FNameUtil_1.FNameUtil.IsNothing(B.WeaknessBeHitEffect) ? B.WeaknessBeHitEffect : B.BeHitEffect;
    var m = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(h.Attacker, C);
    var m = new BulletTypes_1.HitInformation(h.Attacker, t.Entity, m, Number(h.BulletRowName), UE.KismetMathLibrary.D_TransformRotation(_.Actor.Mesh.D_K2_GetComponentToWorld(), e.Base.AttackDirection.ToUeRotator()), BulletUtil_1.BulletUtil.ShakeTest(h, t.Entity.GetComponent(1)), FNameUtil_1.FNameUtil.GetDynamicFName(o) ?? FNameUtil_1.FNameUtil.NONE, i, h.SkillLevel, e, this.a7o.BulletRowName, c, e.Logic.Data, h.BulletEntityId, f, !!h.Attacker.GetComponent(61)?.ShouldOptimize);
    GlobalData_1.GlobalData.BpEventManager.子弹命中前.Broadcast(this.a7o.BulletEntityId, t.Entity.Id);
    EventSystem_1.EventSystem.EmitWithTarget(h.Entity, EventDefine_1.EEventName.BulletHit, m, undefined);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BulletHit, m, undefined);
    this.Ojo.ActionHit(t);
    if (!this.wWo(u)) {
      return false;
    }
    var o = u.Entity.Id;
    B.ObjectsHitCurrent.set(o, h.LiveTimeCurHit);
    this.BWo(e.Base.IntervalAfterHit, h, o);
    var f = t.Entity.GetComponent(61);
    BulletCollisionUtil_1.BulletCollisionUtil.PlayHitEffect(h, u, m.HitPart.toString(), n, m.HitPosition, m.HitEffectRotation, f);
    BulletCollisionUtil_1.BulletCollisionUtil.PlayHitMesh(h, t.Entity, m.HitPart, m.HitPosition, m.HitEffectRotation);
    u.Entity.GetComponent(61).OnHit(m, h.Entity, B.AllowedEnergy, l, s, r, a, n);
    var o = e.Execution.SendGameplayEventTagToAttacker;
    if (o.TagName !== StringUtils_1.NONE_STRING) {
      (f = new UE.GameplayEventData()).Target = u.Actor;
      f.Instigator = h.Actor;
      UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(h.AttackerActorComp.Actor, o, f);
    }
    var l = e.Execution.SendGameplayEventTagToVictim;
    if (l.TagName !== StringUtils_1.NONE_STRING) {
      t.Entity.GetComponent(17).SendGameplayEventToActor(l);
    }
    var E = _.Entity.CheckGetComponent(175);
    var s = m.ReBulletData.Execution;
    for (const P of s.SendGeIdToAttacker) {
      E.AddBuff(P, {
        InstigatorId: E.CreatureDataId,
        Level: h.SkillLevel,
        PreMessageId: h.ContextId,
        Reason: `子弹${h.BulletRowName}命中后对攻击者应用GE添加`,
        BulletMessageId: h.ContextId
      });
    }
    var d = u.Entity.GetComponent(175);
    if (d?.Valid) {
      for (const g of s.SendGeIdToVictim) {
        d.AddBuff(g, {
          InstigatorId: E.CreatureDataId,
          Level: h.SkillLevel,
          Reason: `子弹${h.BulletRowName}命中后对受击者应用GE添加`,
          PreMessageId: h.ContextId,
          BulletMessageId: h.ContextId
        });
      }
      if (d.HasBuffTrigger(16)) {
        r = _.Entity.GetComponent(40);
        const c = B.DamageId;
        const v = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(c);
        a = c > 0 ? v : undefined;
        n = new ExtraEffectBaseTypes_1.RequirementPayload();
        n.SkillId = Number(h.BulletInitParams.SkillId ?? -1);
        o = r.GetSkill(n.SkillId);
        n.SkillGenre = o ? o.SkillInfo.SkillGenre : -1;
        n.BattleFlags = h.BulletInitParams.BattleFlags ?? [];
        if (a) {
          n.DamageType = a.Type;
          n.DamageSubTypes = a.SubType;
          n.CalculateType = a.CalculateType;
          n.SmashType = a.SmashType;
          n.ElementType = ExtraEffectSnapModifier_1.ModifyDamageElement.ApplyEffects(E, a.Id) ?? a.Element;
        }
        n.BulletId = BigInt(h.BulletRowName);
        n.BulletTags = h.Tags ?? [];
        d.TriggerEvents(16, E, n);
      }
    }
    if (B.AllowedEnergy) {
      for (const p of s.EnergyRecoverGeIds) {
        E.AddBuff(p, {
          InstigatorId: E.CreatureDataId,
          Level: h.SkillLevel,
          PreMessageId: h.ContextId,
          Reason: `子弹${h.BulletRowName}命中后对攻击者应用能量恢复类GE`,
          BulletMessageId: h.ContextId
        });
      }
      B.AllowedEnergy = false;
    }
    if (s.SendGeIdToRoleInGame) {
      var U = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.CheckGetComponent(175);
      if (U) {
        for (const T of s.SendGeIdToRoleInGame) {
          U.AddBuff(T, {
            InstigatorId: E.CreatureDataId,
            Level: h.SkillLevel,
            PreMessageId: h.ContextId,
            Reason: `子弹${h.BulletRowName}命中后对场上角色应用GE添加`,
            BulletMessageId: h.ContextId
          });
        }
      }
    }
    BulletUtil_1.BulletUtil.SummonBullet(this.a7o, 1, t.Entity, false, i, B.LastFramePosition, false);
    this.$ba(e.Logic.DestroyOnHitCharacter, h.BulletEntityId, "结算时");
    return true;
  }
  BWo(e, i, l) {
    if (e) {
      e = i.EntityHitCount;
      let t = true;
      var o;
      var s;
      var r = e.get(l);
      for ([o, s] of e) {
        if (o !== l && r <= s) {
          t = false;
          break;
        }
      }
      if (t) {
        this.Bjo.AllowedEnergy = true;
      }
      if (BulletConstant_1.BulletConstant.OpenCollisionLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Bullet", 20, "RoleHit", ["BulletId", i.BulletRowName], ["Stage", this.Bjo.StageInterval], ["AllowedEnergy", this.Bjo.AllowedEnergy], ["EntityId", i.Entity.Id]);
      }
    }
  }
  wWo(t) {
    var e;
    var i;
    var l;
    var o = this.a7o.AttackerActorComp;
    return !!o?.Valid && !!t?.Valid && (i = o.Entity, l = t.Entity, e = (i = i.GetComponent(0)).IsRole() || i.IsVision(), i = i.GetSummonerPlayerId(), (l = l.GetComponent(0)).IsRole() || l.IsVision() ? t.IsAutonomousProxy : e ? o.IsAutonomousProxy : i > 0 ? i === ModelManager_1.ModelManager.PlayerInfoModel.GetId() : t.IsAutonomousProxy);
  }
  dtd(t, e) {
    if (t && e) {
      t = t.GetComponent(203)?.GetInteractionMainActor();
      if (t) {
        var i = t.ReferenceActors;
        if (i) {
          var l = i.Num();
          for (let t = 0; t < l; t++) {
            var o = i.GetKey(t);
            if (i.Get(o) === e) {
              return o;
            }
          }
        }
      }
    }
  }
  IWo(t) {
    if (!t.IsContinueHit && this.a7o) {
      t = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(t.BulletEntityId);
      if (t && (this.bWo(t), this.a7o.IsAutonomousProxy)) {
        var e = this.a7o.BulletDataMain;
        var i = t.GetBulletInfo();
        if (i.IsTensile) {
          var l = i.Attacker;
          if (l && this.xWo(l) && !this.qWo(l)) {
            RoleAudioController_1.RoleAudioController.PlayRoleAudio(l, 2004);
            o = l.GetComponent(3);
            if ((0, RegisterComponent_1.isComponentInstance)(o, 3) && (UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(o.Actor, GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-63529668), undefined), BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(this.a7o, 10, "极限闪避"), this.$ba(e.Logic.DestroyOnHitCharacter, this.a7o.BulletEntityId, "闪避子弹"), this.a7o.Attacker)) {
              o = [this.a7o.Attacker, l, this.a7o.BulletInitParams.SkillId, BigInt(this.a7o.BulletRowName ?? -1)];
              SceneTeamController_1.SceneTeamController.EmitEvent(l, EventDefine_1.EEventName.CharLimitDodge, ...o);
            }
            if (l.GetComponent(0).GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster && (e = this.a7o.AttackerBuffComp)?.Valid) {
              e.AddTagWithReturnHandle([-2043183300], this.a7o.Duration);
            }
            BulletController_1.BulletController.DestroyBullet(t.Id, false);
          }
        } else {
          if (i.IsShield) {
            if (i.Attacker?.Valid && BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(this.a7o, i.Attacker)) {
              t.GetComponent(13)?.ActionHitBullet(this.a7o);
              return;
            } else {
              return undefined;
            }
          }
          var o = (this.a7o.BulletDataMain.Execution.ReboundBitMask & i.BulletDataMain.Logic.ReboundChannel) > 0;
          var l = BulletUtil_1.BulletUtil.CheckSupport(i, this.a7o.AttackerCamp);
          if (o || l) {
            if (l) {
              t.GetComponent(13).ActionSupport(this.a7o.Entity);
            } else if (o && i.AttackerCamp === 0 && BulletUtil_1.BulletUtil.AttackedCampCondition(this.a7o, i.AttackerActorComp)) {
              this.Ojo.ActionRebound(i);
              BulletController_1.BulletController.DestroyBullet(this.a7o.BulletEntityId, false);
              EventSystem_1.EventSystem.EmitWithTarget(i.Attacker, EventDefine_1.EEventName.BulletRebound, this.a7o.Attacker, this.a7o.BulletInitParams.SkillId);
            }
          }
        }
      }
    }
  }
  bWo(t) {
    var e = t.GetBulletInfo();
    var i = e.BulletDataMain;
    var l = this.a7o.BulletDataMain;
    if (!!l.Base.ContinuesCollision && !!l.TimeScale.ForceBulletTimeScaleInArea && !i.TimeScale.TimeScaleWithAttacker && !i.Base.ContinuesCollision && !this.Bjo.BulletEntityMap.get(t)) {
      BulletCollisionUtil_1.BulletCollisionUtil.EntityEnter(this.a7o, t);
      i = l.TimeScale.TimeScaleOnHit;
      l = BulletUtil_1.BulletUtil.SetTimeScale(e, i.优先级, i.时间膨胀值, i.时间膨胀变化曲线, this.a7o.Duration, 2);
      this.Bjo.BulletEntityMap.set(t, l);
    }
  }
  qWo(t) {
    var e = t.GetComponent(3);
    return !BulletUtil_1.BulletUtil.AttackedCondition(this.a7o, e) || !BulletHitCountUtil_1.BulletHitCountUtil.HitCountCondition(this.a7o, t);
  }
  TWo(e) {
    var l = this.a7o;
    var i = this.dtd(e.Entity, e.Actor);
    if (this.AWo(e, i)) {
      var o = l.BulletDataMain;
      if (e.EntityHandle?.Valid) {
        var s = e.Entity;
        var r = BulletPool_1.BulletPool.CreateVector();
        if (e.HitResult) {
          r.Set(e.HitResult.ImpactPointX[0], e.HitResult.ImpactPointY[0], e.HitResult.ImpactPointZ[0]);
        } else {
          var a = e.Components;
          var n = a.length;
          if (n > 0) {
            let e = 0;
            let i = undefined;
            for (let t = 0; t < n; t++) {
              var h = BulletCollisionUtil_1.BulletCollisionUtil.CalcPartDistance(a[t], l);
              if (i === undefined || h < e) {
                e = h;
                i = t;
              }
            }
            BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointSceneItem(a[i], l, r);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 20, "命中场景物获取不到碰撞体", ["bulletRowName", l.BulletRowName], ["SceneItemId", e.Entity.GetComponent(0).GetCreatureDataId()]);
          }
        }
        var _ = s.Id;
        var u = l.AttackerActorComp;
        var B = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(this.a7o.Attacker, l.CollisionInfo.BeHitEffect);
        GlobalData_1.GlobalData.BpEventManager.子弹命中前.Broadcast(l.BulletEntityId, _);
        var c = l.BulletEntityId;
        var v = l.CollisionInfo.DamageId;
        var f = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(v);
        var f = v > 0 ? f.CalculateType : -1;
        var B = new BulletTypes_1.HitInformation(l.Attacker, undefined, B, Number(l.BulletRowName), UE.KismetMathLibrary.D_TransformRotation(u.Actor.Mesh.D_K2_GetComponentToWorld(), o.Base.AttackDirection.ToUeRotator()), false, i ? FNameUtil_1.FNameUtil.GetDynamicFName(i) : undefined, r, 0, o, this.a7o.BulletRowName, v, o.Logic.Data, c, f, !!l.Attacker.GetComponent(61)?.ShouldOptimize);
        BulletUtil_1.BulletUtil.SummonBullet(l, 1, e.Entity, false);
        this.Ojo.ActionHitObstacles(e);
        EventSystem_1.EventSystem.EmitWithTarget(l.Entity, EventDefine_1.EEventName.BulletHit, B, undefined);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BulletHit, B, undefined);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Bullet", 20, "HitSceneItem", ["BulletId", l.BulletRowName], ["EntityId", c], ["VitimEntityId", _]);
        }
        let t = IMatch_1.EBulletPenetrationType.Penetrable;
        u = s.GetComponent(155);
        if (u) {
          BulletCollisionUtil_1.BulletCollisionUtil.EntityEnter(this.a7o, e.Entity);
          v = u.OnSceneItemHit(B, e);
          f = (t = (t = u.GetPenetrationType()) === undefined ? IMatch_1.EBulletPenetrationType.Penetrable : t) === IMatch_1.EBulletPenetrationType.Penetrable ? o.Logic.DestroyOnHitCharacter : o.Logic.DestroyOnHitObstacle;
          if (v && f) {
            BulletController_1.BulletController.DestroyBullet(l.BulletEntityId, false);
          }
        } else if (o.Logic.DestroyOnHitCharacter) {
          BulletStaticFunction_1.BulletStaticFunction.BulletHitEffect(this.a7o, r.ToUeVector());
          BulletController_1.BulletController.DestroyBullet(l.BulletEntityId, false);
        }
        BulletPool_1.BulletPool.RecycleVector(r);
        this.Bjo.ObjectsHitCurrent.set(_, l.LiveTimeCurHit);
        if (i) {
          this.Bjo.SceneItemPartsHitCurrent.add(i);
        }
        this.BWo(o.Base.IntervalAfterHit, l, _);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Bullet", 20, "HitSceneItem victim entity invalid", ["BulletId", l.BulletRowName]);
      }
    }
  }
  Wr_(e) {
    if (e.EntityHandle?.Valid) {
      var l = this.a7o;
      this.UWo(e.Entity);
      if (this.AWo(e) && BulletHitCountUtil_1.BulletHitCountUtil.HitCountCondition(l, e.Entity)) {
        var i = e.Entity;
        var o = i.Id;
        var s = i.GetComponent(1);
        var r = l.AttackerActorComp;
        var a = l.BulletDataMain;
        var n = BulletPool_1.BulletPool.CreateVector();
        var h = e.Components;
        var _ = h.length;
        let t = undefined;
        if (_ > 0) {
          let e = 0;
          let i = undefined;
          for (let t = 0; t < _; t++) {
            var u = BulletCollisionUtil_1.BulletCollisionUtil.CalcPartDistance(h[t], l);
            if (i === undefined || u < e) {
              e = u;
              i = t;
            }
          }
          var B = h[i];
          t = B.GetName();
          BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(B, l, n);
        } else {
          n.DeepCopy(s.ActorLocationProxy);
        }
        B = l.CollisionInfo.DamageId;
        s = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(B);
        s = B > 0 ? s.CalculateType : -1;
        r = new BulletTypes_1.HitInformation(l.Attacker, i, undefined, Number(l.BulletRowName), UE.KismetMathLibrary.D_TransformRotation(r.Actor.Mesh.D_K2_GetComponentToWorld(), a.Base.AttackDirection.ToUeRotator()), BulletUtil_1.BulletUtil.ShakeTest(l, i.GetComponent(1)), FNameUtil_1.FNameUtil.GetDynamicFName(t) ?? FNameUtil_1.FNameUtil.NONE, n, l.SkillLevel, a, this.a7o.BulletRowName, B, a.Logic.Data, l.BulletEntityId, s, !!l.Attacker.GetComponent(61)?.ShouldOptimize);
        GlobalData_1.GlobalData.BpEventManager.子弹命中前.Broadcast(this.a7o.BulletEntityId, i.Id);
        EventSystem_1.EventSystem.EmitWithTarget(l.Entity, EventDefine_1.EEventName.BulletHit, r, undefined);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BulletHit, r, undefined);
        this.Ojo.ActionHit(e);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Bullet", 48, "HitVehicle", ["BulletId", l.BulletRowName]);
        }
        BulletPool_1.BulletPool.RecycleVector(n);
        this.Bjo.ObjectsHitCurrent.set(o, l.LiveTimeCurHit);
        BulletCollisionUtil_1.BulletCollisionUtil.PlayVehicleHitEffect(l, r.HitPosition, r.HitEffectRotation);
        i.GetComponent(276).OnHit(r, l);
        BulletUtil_1.BulletUtil.SummonBullet(this.a7o, 1, e.Entity, false, n, l.CollisionInfo.LastFramePosition, false);
        this.$ba(a.Logic.DestroyOnHitCharacter, l.BulletEntityId, "结算时");
      }
    }
  }
  LWo(t) {
    var e;
    if (!t.IsContinueHit) {
      e = BulletPool_1.BulletPool.CreateVector();
      if (t.HitResult) {
        e.Set(t.HitResult.ImpactPointX[0], t.HitResult.ImpactPointY[0], t.HitResult.ImpactPointZ[0]);
      } else {
        e.FromUeVector(this.a7o.ActorComponent.ActorLocationProxy);
      }
      BulletUtil_1.BulletUtil.SummonBullet(this.a7o, 2, t.Entity, false);
      this.Ojo.ActionHitObstacles(t);
      BulletStaticFunction_1.BulletStaticFunction.BulletHitEffect(this.a7o, e.ToUeVector());
      BulletPool_1.BulletPool.RecycleVector(e);
      if (this.a7o.BulletDataMain.Logic.DestroyOnHitObstacle) {
        BulletController_1.BulletController.DestroyBullet(this.a7o.BulletEntityId, false);
      }
    }
  }
  AWo(t, e = undefined) {
    return !!e && (!this.Bjo.SceneItemPartHitEntityId || t.Entity.Id === this.Bjo.SceneItemPartHitEntityId) && !this.Bjo.SceneItemPartsHitCurrent.has(e) || !this.Bjo.ObjectsHitCurrent.has(t.Entity.Id);
  }
  cth(t, e, i, l) {
    let o = 0;
    switch (t) {
      case 6:
        o = i.Size();
        break;
      case 7:
        o = i.X;
        break;
      case 8:
      case 9:
        o = Math.sqrt(i.X * i.X + i.Z * i.Z);
    }
    ControllerHolder_1.ControllerHolder.WorldController.GetEntitiesInRangeWithLocation(e, o, 255, l, true);
  }
}
(exports.BulletCollisionSystem = BulletCollisionSystem).gW = Stats_1.Stat.Create("BulletCollisionTick");
BulletCollisionSystem.oWo = Stats_1.Stat.Create("BulletCollisionRegionSearchEntity");
BulletCollisionSystem.fW = Stats_1.Stat.Create("BulletCollisionAfterTick");
BulletCollisionSystem.aWo = Transform_1.Transform.Create();
BulletCollisionSystem.EWo = Stats_1.Stat.Create("BulletProcessHit"); //# sourceMappingURL=BulletCollisionSystem.js.map