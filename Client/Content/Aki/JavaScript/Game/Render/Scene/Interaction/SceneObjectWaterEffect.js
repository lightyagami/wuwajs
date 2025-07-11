"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneObjectWaterEffect = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const RenderConfig_1 = require("../../Config/RenderConfig");
const EffectGlobal_1 = require("../../Effect/EffectGlobal");
const PROFILE_KEY = "SceneObjectWaterEffect_Update";
class SceneObjectWaterEffect {
  constructor() {
    this.Config = undefined;
    this.ActorToAttach = undefined;
    this.IsReady = false;
    this.Radius = 0;
    this.Transform = undefined;
    this.Effect = "";
    this.TriggerOnce = false;
    this.EnableSurfaceEffect = false;
    this.WaterSurfaceEffect = "";
    this.TimeAfterSurfaceEffectStop = 0;
    this.bsr = undefined;
    this.Handle = 0;
    this.SurfaceHandle = 0;
    this.WasHitWater = false;
    this.LastPosition = undefined;
    this.WaterHeight = 0;
    this.TempUeVector = undefined;
    this.TempVector = undefined;
    this.TempVector1 = undefined;
    this.TempPosition = undefined;
    this.IsEnabled = false;
  }
  koe() {
    var t = UE.NewObject(UE.TraceSphereElement.StaticClass());
    t.WorldContextObject = GlobalData_1.GlobalData.World;
    t.bIsSingle = false;
    t.bIgnoreSelf = true;
    t.Radius = this.Radius;
    t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
    if (EffectGlobal_1.EffectGlobal.SceneObjectWaterEffectShowDebugTrace) {
      t.DrawTime = 5;
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(t, ColorUtils_1.ColorUtils.LinearGreen);
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(t, ColorUtils_1.ColorUtils.LinearRed);
      t.SetDrawDebugTrace(2);
    } else {
      t.SetDrawDebugTrace(0);
    }
    this.bsr = t;
  }
  Start(t, e) {
    if (t && e && (this.Config = t, this.ActorToAttach = e, this.Radius = this.Config.Radius, t = UE.KismetMathLibrary.Conv_TransformToTransformDouble(this.Config.Transform), this.Transform = t, this.Effect = this.Config.Effect.ToAssetPathName(), this.TriggerOnce = this.Config.TriggerOnce, this.EnableSurfaceEffect = this.Config.EnableSurfaceEffect, this.TimeAfterSurfaceEffectStop = this.Config.TimeAfterSurfaceEffectStop, !this.TriggerOnce && this.EnableSurfaceEffect && (this.WaterSurfaceEffect = this.Config.WaterSurfaceEffect.ToAssetPathName()), this.TempUeVector = new UE.Vector(), this.TempVector = Vector_1.Vector.Create(), this.TempVector1 = Vector_1.Vector.Create(), this.TempPosition = Vector_1.Vector.Create(), this.LastPosition = Vector_1.Vector.Create(), this.IsReady = true, this.koe(), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("RenderEffect", 25, "SceneObjectWaterEffect Start");
    }
  }
  GetActorLocation() {
    this.TempVector.FromUeVector(this.ActorToAttach.D_K2_GetComponentLocation());
  }
  AfterRegistered() {
    if (this.IsReady) {
      this.WasHitWater = false;
      this.GetActorLocation();
      this.LastPosition.DeepCopy(this.TempVector);
      this.IsEnabled = true;
    }
  }
  BeforeUnregistered() {
    if (this.IsEnabled) {
      this.StopEffect();
      this.IsEnabled = false;
    }
  }
  Update(t) {
    if (this.IsEnabled && this.ActorToAttach?.IsValid()) {
      let e = false;
      this.GetActorLocation();
      var i = this.bsr;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, this.LastPosition);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, this.TempVector);
      var s = TraceElementCommon_1.TraceElementCommon.SphereTrace(i, PROFILE_KEY);
      const r = i.HitResult;
      if (s && r?.bBlockingHit) {
        const r = i.HitResult;
        var h = r.GetHitCount();
        for (let t = 0; t < h; t++) {
          var o = r.Components.Get(t).GetCollisionProfileName();
          if (RenderConfig_1.RenderConfig.WaterCollisionProfileName.op_Equality(o)) {
            this.WaterHeight = r.ImpactPointZ_Array.Get(t);
            this.TempPosition.DeepCopy(this.TempVector);
            this.TempPosition.Z = this.WaterHeight;
            e = true;
            break;
          }
        }
      }
      if (e !== this.WasHitWater && (this.SpawnFallEffect(this.Effect, this.TempPosition), this.TriggerOnce)) {
        this.StopEffect();
        this.IsEnabled = false;
      }
      if (this.EnableSurfaceEffect && e && this.WasHitWater) {
        if (!EffectSystem_1.EffectSystem.IsValid(this.SurfaceHandle)) {
          this.SpawnEffect(this.WaterSurfaceEffect);
        }
        if (EffectSystem_1.EffectSystem.IsValid(this.SurfaceHandle)) {
          this.TempVector.Subtraction(this.LastPosition, this.TempVector1);
          s = this.TempVector1.Size() / t;
          EffectSystem_1.EffectSystem.HandleSeekToTime(this.SurfaceHandle, s, false);
          EffectSystem_1.EffectSystem.GetEffectActor(this.SurfaceHandle).D_K2_SetActorLocation(this.TempPosition.ToUeVector(true), false, undefined, true);
        }
      } else if (this.SurfaceHandle) {
        this.StopEffect();
      }
      this.WasHitWater = e;
      this.LastPosition.DeepCopy(this.TempVector);
    }
  }
  StopEffect() {
    if (EffectSystem_1.EffectSystem.IsValid(this.SurfaceHandle)) {
      EffectSystem_1.EffectSystem.HandleSeekToTime(this.SurfaceHandle, 0, false);
      EffectSystem_1.EffectSystem.SetHandleLifeCycle(this.SurfaceHandle, this.TimeAfterSurfaceEffectStop);
    }
    this.SurfaceHandle = 0;
  }
  SpawnEffect(t) {
    if (t) {
      this.StopEffect();
      this.SurfaceHandle = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.Transform, t, "[SceneObjectWaterEffect.SpawnEffect]", undefined, 3, t => {
        EffectSystem_1.EffectSystem.FreezeHandle(t, true);
        EffectSystem_1.EffectSystem.SetHandleLifeCycle(this.SurfaceHandle, 10);
      });
    }
  }
  SpawnFallEffect(t, e) {
    this.Handle = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, new UE.TransformDouble(e.ToUeVector()), t, "[SceneObjectWaterEffect.SpawnFallEffect]");
  }
}
exports.SceneObjectWaterEffect = SceneObjectWaterEffect;
//# sourceMappingURL=SceneObjectWaterEffect.js.map