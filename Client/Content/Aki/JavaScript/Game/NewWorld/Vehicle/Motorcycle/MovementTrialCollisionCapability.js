"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovementTrailCollisionCapability = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Pool_1 = require("../../../../Core/Container/Pool");
const PriorityQueue_1 = require("../../../../Core/Container/PriorityQueue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const MAX_DISTANCE = 1700;
const DEBUG_KEY = "MovementTrailCollision";
class BoxComponentProxy {
  constructor(t = undefined) {
    this.BoxComponent = t;
  }
}
class TrailSegment {
  constructor() {
    this.Box = undefined;
    this.SpawnTime = 0;
    this.Start = Vector_1.Vector.ZeroVectorProxy;
    this.End = Vector_1.Vector.ZeroVectorProxy;
  }
}
class MovementTrailCollisionCapability {
  constructor(t = undefined, i = undefined, e = undefined) {
    this.Invoker = t;
    this.Owner = i;
    this.KuroTrailCollisionAsset = e;
    this.IgnoreInvoker = true;
    this.f$g = undefined;
    this.g$g = undefined;
    this.C$g = undefined;
    this.p$g = false;
    this.v$g = false;
    this.TDe = undefined;
    this.AZl = Vector_1.Vector.Create();
    this.y$g = Vector_1.Vector.Create();
    this.Pln = -1;
    this.TickActive = t => {
      this.S$g(Time_1.Time.WorldTime);
    };
    this.$cg = () => {
      this.p$g = false;
      this.v$g = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 72, DEBUG_KEY + " OnMotorcycleWaterDetectedStart");
      }
    };
    this.Kcg = () => {
      if (this.v$g) {
        this.v$g = false;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 72, DEBUG_KEY + " OnMotorcycleWaterDetectedEnd");
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Vehicle", 72, "检查BroadcastWaterDetectedTick逻辑，未调用Start就开始End");
      }
    };
    this.Ycg = (t, i, e) => {
      var s;
      if (this.v$g) {
        if (this.KuroTrailCollisionAsset?.IsValid()) {
          if (this.Invoker?.IsValid()) {
            if (ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(DEBUG_KEY) > 0 && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Vehicle", 72, "OnMotorcycleWaterDetectedTick", ["location", i], ["normal", e]);
            }
            this.AZl.DeepCopy(i);
            if (this.p$g) {
              s = Vector_1.Vector.DistSquared(this.AZl, this.y$g);
              if (this.KuroTrailCollisionAsset.TeleportDistance > MathCommon_1.MathCommon.KindaSmallNumber && s > this.KuroTrailCollisionAsset.TeleportDistance * this.KuroTrailCollisionAsset.TeleportDistance) {
                this.ResetTrail();
              } else if (!(this.KuroTrailCollisionAsset.StepDistance > MathCommon_1.MathCommon.KindaSmallNumber) || !(s < this.KuroTrailCollisionAsset.StepDistance * this.KuroTrailCollisionAsset.StepDistance)) {
                this.M$g(this.y$g, this.AZl, e);
              }
            } else {
              this.p$g = true;
              this.y$g.DeepCopy(i);
              s = Vector_1.Vector.Create(this.Invoker.GetActorForwardVector());
              this.M$g(this.AZl.Subtraction(s, Vector_1.Vector.Create()), this.AZl.Addition(s, Vector_1.Vector.Create()), e);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Vehicle", 72, DEBUG_KEY + " HandleWaterDetectedTick Invoker无效");
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Vehicle", 72, DEBUG_KEY + " HandleWaterDetectedTick KuroTrailCollisionAsset无效");
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Vehicle", 72, DEBUG_KEY + " 检查BroadcastWaterDetectedTick逻辑，未调用Start就开始Tick");
      }
    };
  }
  ResetTrail() {
    this.p$g = false;
    this.y$g.Reset();
    this.AZl.Reset();
    if (this.f$g) {
      for (const t of this.f$g) {
        this.E$g(t);
      }
    }
    this.f$g?.clear();
    this.g$g?.Clear();
  }
  Activate() {
    var t;
    if (this.KuroTrailCollisionAsset?.IsValid()) {
      this.C$g = new Pool_1.Pool(this.KuroTrailCollisionAsset.MaxSegments, () => {
        var t;
        if (this.Owner?.IsValid() && this.KuroTrailCollisionAsset?.IsValid() && (t = this.Owner.D_AddComponentByClass(UE.BoxComponent.StaticClass(), false, undefined, false))?.IsValid()) {
          t.SetHiddenInGame(true);
          this.I$g(t);
          t.K2_DetachFromComponent(1, 1, 1, false);
          return new BoxComponentProxy(t);
        } else {
          return MovementTrailCollisionCapability.T$g;
        }
      }, t => {
        if (t.BoxComponent?.IsValid()) {
          t.BoxComponent.SetCollisionEnabled(0);
        }
      });
      this.f$g = new Set();
      this.g$g = new PriorityQueue_1.PriorityQueue((t, i) => t.SpawnTime - i.SpawnTime);
      this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(this.TickActive, this.KuroTrailCollisionAsset.StepInterval);
      if (this.Invoker?.IsValid() && (t = ActorUtils_1.ActorUtils.GetEntityByActor(this.Invoker))?.Valid && t.Entity?.Valid) {
        EventSystem_1.EventSystem.AddWithTarget(t.Entity, EventDefine_1.EEventName.MotorcycleWaterDetectedStart2, this.$cg);
        EventSystem_1.EventSystem.AddWithTarget(t.Entity, EventDefine_1.EEventName.MotorcycleWaterDetectedEnd2, this.Kcg);
        EventSystem_1.EventSystem.AddWithTarget(t.Entity, EventDefine_1.EEventName.MotorcycleWaterDetectedTick2, this.Ycg);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 72, DEBUG_KEY + " 没有配置KuroTrailCollisionAsset");
    }
  }
  Deactivate() {
    var t;
    this.ResetTrail();
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
    }
    if (this.Invoker?.IsValid() && (t = ActorUtils_1.ActorUtils.GetEntityByActor(this.Invoker))?.Valid && t.Entity?.Valid) {
      EventSystem_1.EventSystem.RemoveWithTarget(t.Entity, EventDefine_1.EEventName.MotorcycleWaterDetectedStart2, this.$cg);
      EventSystem_1.EventSystem.RemoveWithTarget(t.Entity, EventDefine_1.EEventName.MotorcycleWaterDetectedEnd2, this.Kcg);
      EventSystem_1.EventSystem.RemoveWithTarget(t.Entity, EventDefine_1.EEventName.MotorcycleWaterDetectedTick2, this.Ycg);
    }
  }
  ShouldTickActive() {
    return !!this.f$g && this.f$g.size > 0;
  }
  M$g(t, i, e) {
    var s;
    if (this.KuroTrailCollisionAsset?.IsValid()) {
      if (this.f$g && this.C$g) {
        if (!(Time_1.Time.WorldTime - this.Pln < this.KuroTrailCollisionAsset.StepInterval)) {
          this.Pln = Time_1.Time.WorldTime;
          if (i.Subtraction(t, Vector_1.Vector.Create()).Normalize() && (this.f$g.size >= this.KuroTrailCollisionAsset.MaxSegments && (s = this.g$g?.Top) && this.E$g(s), (s = this.C$g.Get() ?? this.C$g.Create())?.BoxComponent?.IsValid())) {
            this.R$g(s.BoxComponent, t, i, e);
            this.b$g(s, t, i);
            this.y$g.DeepCopy(this.AZl);
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 72, DEBUG_KEY + " SpawnOrExtendSegment Segments 或BoxPool 无效");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 72, DEBUG_KEY + " SpawnOrExtendSegment KuroTrailCollisionAsset 无效");
    }
  }
  R$g(t, i, e, s) {
    var o;
    if (t?.IsValid()) {
      e.Subtraction(i, MathUtils_1.MathUtils.CommonTempVector);
      o = MathUtils_1.MathUtils.CommonTempVector.Size();
      if (MathUtils_1.MathUtils.CommonTempVector.Normalize()) {
        if (s.Normalize()) {
          i.Addition(e, MathUtils_1.MathUtils.CommonTempVector2);
          MathUtils_1.MathUtils.CommonTempVector2.MultiplyEqual(0.5);
          i = Vector_1.Vector.Create();
          MathUtils_1.MathUtils.CommonTempVector.Subtraction(s.Multiply(MathUtils_1.MathUtils.CommonTempVector.DotProduct(s), Vector_1.Vector.Create()), i);
          if (i.Normalize()) {
            Vector_1.Vector.CrossProduct(s, i, MathUtils_1.MathUtils.CommonTempVector);
            e = UE.KismetMathLibrary.MakeRotationFromAxes(i.ToUeVectorOld(), MathUtils_1.MathUtils.CommonTempVector.ToUeVectorOld(), s.ToUeVectorOld());
            this.L$g(t, MathUtils_1.MathUtils.CommonTempVector2.ToUeVector(), e, o);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Vehicle", 72, DEBUG_KEY + " UpdateBoxSegment 水面法线和移动方向平行");
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Vehicle", 72, DEBUG_KEY + " UpdateBoxSegment normal 无效");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 72, DEBUG_KEY + " UpdateBoxSegment dir 无效");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 72, DEBUG_KEY + " UpdateBoxSegment Box无效");
    }
  }
  L$g(t, i, e, s) {
    if (t?.IsValid() && this.KuroTrailCollisionAsset?.IsValid()) {
      t.D_K2_SetWorldLocation(i, false, undefined, false);
      t.K2_SetWorldRotation(e, false, undefined, false);
      t.SetBoxExtent(new UE.Vector(s * 0.5 + this.KuroTrailCollisionAsset.PaddingAlong, this.KuroTrailCollisionAsset.HalfWidth, this.KuroTrailCollisionAsset.HalfHeight), true);
      t.SetCollisionEnabled(1);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 72, DEBUG_KEY + " UpdateBoxShapeAndCollision Box或者KuroTrailCollisionAsset无效");
    }
  }
  E$g(t) {
    if (t.Box?.BoxComponent?.IsValid()) {
      t.Box.BoxComponent.SetCollisionEnabled(0);
      this.C$g?.Put(t.Box);
    }
    t.Box = undefined;
    return !!this.f$g && !!this.g$g && this.f$g.delete(t) && this.g$g.Remove(t);
  }
  b$g(t, i, e) {
    var s;
    if (t?.BoxComponent?.IsValid()) {
      (s = new TrailSegment()).SpawnTime = Time_1.Time.WorldTime;
      s.Start = Vector_1.Vector.Create(i);
      s.End = Vector_1.Vector.Create(e);
      s.Box = t;
      this.f$g?.add(s);
      this.g$g?.Push(s);
      if (ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(DEBUG_KEY) > 0 && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 72, DEBUG_KEY + " SpawnSegment", ["start", i], ["end", e], ["time", s.SpawnTime], ["segments", this.f$g]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 72, DEBUG_KEY + " SpawnSegment BoxComponent无效");
    }
  }
  I$g(t) {
    if (t?.IsValid() && this.KuroTrailCollisionAsset?.IsValid()) {
      t.SetMobility(this.KuroTrailCollisionAsset.Mobility);
      t.SetCollisionProfileName(this.KuroTrailCollisionAsset.CollisionProfileName.Name);
      t.SetGenerateOverlapEvents(this.KuroTrailCollisionAsset.bGenerateOverlapEvents);
      t.bKuroOverlapNotify = this.KuroTrailCollisionAsset.bKuroOverlapNotify;
      t.bKuroPassiveCollisionUpdateOverlapsWhenEnterOverlap = this.KuroTrailCollisionAsset.bKuroPassiveCollisionUpdateOverlapsWhenEnterOverlap;
      t.bKuroPassiveCollision = this.KuroTrailCollisionAsset.bKuroPassiveCollision;
      if (this.KuroTrailCollisionAsset.bIgnoreOwner && this.Owner?.IsValid()) {
        t.IgnoreActorWhenMoving(this.Owner, true);
      }
      if (this.IgnoreInvoker && this.Invoker?.IsValid()) {
        t.IgnoreActorWhenMoving(this.Invoker, true);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 72, DEBUG_KEY + " ApplyCollisionSetup Box或者KuroTrailCollisionAsset无效");
    }
  }
  S$g(t) {
    if (this.KuroTrailCollisionAsset?.IsValid() && !(this.KuroTrailCollisionAsset.TTLSeconds < MathCommon_1.MathCommon.KindaSmallNumber) && this.f$g && !(this.f$g.size <= 0) && this.Invoker?.IsValid() && this.Owner?.IsValid()) {
      var i = ActorUtils_1.ActorUtils.GetEntityByActor(this.Invoker);
      if (i?.Valid && i.Entity?.Valid) {
        var e = i.Entity.CheckGetComponent(1);
        if (e) {
          MathUtils_1.MathUtils.CommonTempVector.FromUeVector(this.Owner.D_K2_GetActorLocation());
          GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(e, MathUtils_1.MathUtils.CommonTempVector);
          var s;
          var o = MAX_DISTANCE * MAX_DISTANCE;
          var h = this.KuroTrailCollisionAsset.StepDistance * this.KuroTrailCollisionAsset.StepDistance;
          for (const r of this.f$g) {
            if (r.Box?.BoxComponent?.IsValid()) {
              if (ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel(DEBUG_KEY) > 0) {
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Vehicle", 72, DEBUG_KEY + " TrimByTTL", ["segment", r]);
                }
                UE.KismetSystemLibrary.DrawDebugBox(this.Owner, r.Box.BoxComponent.K2_GetComponentLocation(), r.Box.BoxComponent.BoxExtent, ColorUtils_1.ColorUtils.LinearGreen, r.Box.BoxComponent.K2_GetComponentRotation());
              }
              MathUtils_1.MathUtils.CommonTempVector2.DeepCopy(r.End);
              GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(e, MathUtils_1.MathUtils.CommonTempVector2);
              if (o < (s = Vector_1.Vector.DistSquared(MathUtils_1.MathUtils.CommonTempVector, MathUtils_1.MathUtils.CommonTempVector2))) {
                this.E$g(r);
              } else if (this.v$g && !this.Invoker.bHidden && s < h) {
                r.SpawnTime = t;
              } else if (t - r.SpawnTime > this.KuroTrailCollisionAsset.TTLSeconds * MathUtils_1.MathUtils.SecondToMillisecond) {
                this.E$g(r);
              }
            } else {
              this.E$g(r);
            }
          }
        }
      }
    }
  }
}
(exports.MovementTrailCollisionCapability = MovementTrailCollisionCapability).T$g = new BoxComponentProxy(undefined);
//# sourceMappingURL=MovementTrialCollisionCapability.js.map