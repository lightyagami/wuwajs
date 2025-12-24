"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneCharacterWaterEffect = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectParameterNiagara_1 = require("../../../Effect/EffectParameter/EffectParameterNiagara");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager");
const GlobalData_1 = require("../../../GlobalData");
const CharacterBuffIds_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const RenderDataManager_1 = require("../../Data/RenderDataManager");
const ONE_SECOND = 1000;
const FLYEFFECT_VELOCITY_XY_OFFSET_SCALE = 0.3;
const FLYEFFECT_RIPPLEWATER_XY_OFFSET_SCALE = 1.1;
const FLYEFFECT_SHORE_TRACE_START_OFFSET = 500;
const FLYEFFECT_SHORE_TRACE_END_OFFSET = -3000;
const WATER_NORMAL_DOT_CHECK = 0.2;
const MOTOR_EFFECT_SPEED_CLAMP = 100;
const MOTOR_DANQI = "/Game/Aki/Effect/DataAsset/Niagara/Common/Water/DA_Fx_SI3_Water_Moto_Danqi.DA_Fx_SI3_Water_Moto_Danqi";
const MOTOR_PUTONG = "/Game/Aki/Effect/DataAsset/Niagara/Common/Water/DA_Fx_SI3_Water_Moto_Putong.DA_Fx_SI3_Water_Moto_Putong";
const MOTOR_SHACHEN = "/Game/Aki/Effect/DataAsset/Niagara/Common/Snow/DA_Fx_Sl3_Moto_ShaChen.DA_Fx_Sl3_Moto_ShaChen";
const MOTOR_FALL_IN = "/Game/Aki/Effect/DataAsset/Niagara/Common/Water/DA_Fx_SI3_Water_Moto_Fall.DA_Fx_SI3_Water_Moto_Fall";
const MOTOR_SCREEN = "/Game/Aki/Effect/DataAsset/Niagara/Common/Snow/DA_Fx_Sl3_Motuo_Screen01.DA_Fx_Sl3_Motuo_Screen01";
class WaterEffectItem {
  constructor() {
    this.SpeedThreshold = 0;
    this.EffectDataPath = undefined;
    this.AudioEffectDataPath = undefined;
  }
  Init(t) {
    this.SpeedThreshold = t.Speed;
    this.EffectDataPath = t.EffectDataRef;
    this.AudioEffectDataPath = t.AudioEffectDataRef;
  }
}
class WaterEffectGroup {
  constructor() {
    this.WaterDepthThreshold = 0;
    this.EffectItems = [];
  }
  FindEffectAtSpeed(t) {
    let e = 0;
    for (; e < this.EffectItems.length && !(t < this.EffectItems[e].SpeedThreshold); ++e);
    if (e !== 0) {
      return this.EffectItems[e - 1];
    }
  }
  Init(e) {
    this.WaterDepthThreshold = e.WaterDepth;
    var i = e.EffectConfig.Num();
    this.EffectItems.length = i;
    for (let t = 0; t < i; t++) {
      this.EffectItems[t] = new WaterEffectItem();
      this.EffectItems[t].Init(e.EffectConfig.Get(t));
    }
  }
}
class WaterEffectSubConfig {
  constructor() {
    this.MoveEffects = [];
    this.FallEffects = [];
    this.JumpEffects = [];
    this.FlyEffects = [];
    this.FallJumpDepthThreshold = 0;
    this.TriggerInGrass = false;
    this.FlyEffectHeightThreshold = 0;
  }
  FindMoveEffect(t, e) {
    let i = 0;
    for (; i < this.MoveEffects.length && !(t < this.MoveEffects[i].WaterDepthThreshold); ++i);
    if (i !== 0) {
      return this.MoveEffects[i - 1].FindEffectAtSpeed(e);
    }
  }
  FindFallEffectAtSpeed(t) {
    let e = 0;
    for (; e < this.FallEffects.length && !(t < this.FallEffects[e].SpeedThreshold); ++e);
    if (e !== 0) {
      return this.FallEffects[e - 1];
    }
  }
  FindJumpEffectAtSpeed(t) {
    let e = 0;
    for (; e < this.JumpEffects.length && !(t < this.JumpEffects[e].SpeedThreshold); ++e);
    if (e !== 0) {
      return this.JumpEffects[e - 1];
    }
  }
  FindFlyEffectAtSpeed(t) {
    let e = 0;
    for (; e < this.FlyEffects.length && !(t < this.FlyEffects[e].SpeedThreshold); ++e);
    if (e !== 0) {
      return this.FlyEffects[e - 1];
    }
  }
  Init(e) {
    var i = e.MoveEffects.Num();
    this.MoveEffects.length = i;
    for (let t = 0; t < i; t++) {
      this.MoveEffects[t] = new WaterEffectGroup();
      this.MoveEffects[t].Init(e.MoveEffects.Get(t));
    }
    var s = e.FallEffects.Num();
    this.FallEffects.length = s;
    for (let t = 0; t < s; t++) {
      this.FallEffects[t] = new WaterEffectItem();
      this.FallEffects[t].Init(e.FallEffects.Get(t));
    }
    var h = e.JumpEffects.Num();
    this.JumpEffects.length = h;
    for (let t = 0; t < h; t++) {
      this.JumpEffects[t] = new WaterEffectItem();
      this.JumpEffects[t].Init(e.JumpEffects.Get(t));
    }
    var r = e.FlyEffects.Num();
    this.FlyEffects.length = r;
    for (let t = 0; t < r; t++) {
      this.FlyEffects[t] = new WaterEffectItem();
      this.FlyEffects[t].Init(e.FlyEffects.Get(t));
    }
    this.FallJumpDepthThreshold = e.FallJumpDepthThreshold;
    this.TriggerInGrass = e.TriggerInGrass;
    this.FlyEffectHeightThreshold = e.FlyEffectTriggerHeight;
  }
}
class VelocityHistoryCache {
  constructor() {
    this.VelocityHistory = [];
    this.VelocityHistoryArrayPtr = 0;
  }
  Initialize(e) {
    this.VelocityHistory.length = e;
    for (let t = 0; t < e; t++) {
      this.VelocityHistory[t] = Vector_1.Vector.Create(0, 0, 0);
    }
  }
  AddVelocity(t) {
    this.VelocityHistory[this.VelocityHistoryArrayPtr].Set(t.X, t.Y, t.Z);
    this.VelocityHistoryArrayPtr = (this.VelocityHistoryArrayPtr + 1) % this.VelocityHistory.length;
  }
  GetMaxVelocityDirection(t) {
    let e = 0;
    for (const i of this.VelocityHistory) {
      e = Math.max(e, i.DotProduct(t));
    }
    return e;
  }
  GetMaxVelocity() {
    let t = 0;
    for (const e of this.VelocityHistory) {
      t = Math.max(t, e.Size());
    }
    return t;
  }
}
class SceneCharacterWaterEffect {
  constructor() {
    this.Config = undefined;
    this.Owner = undefined;
    this.OwnerStateComponent = undefined;
    this.OwnerHeight = 0;
    this.IsReady = false;
    this.State = 0;
    this.CurrentSubConfig = undefined;
    this.InWaterSubConfig = new WaterEffectSubConfig();
    this.SwimIdleEffect = undefined;
    this.SwimNormalEffect = undefined;
    this.SwimFastEffect = undefined;
    this.OnMaterialSubConfig = new Map();
    this.Handle = 0;
    this.AudioEffectHandle = 0;
    this.HandlePath = undefined;
    this.MotorHandle = 0;
    this.MotorHandlePath = "";
    this.MotorScreenHandle = 0;
    this.CurrentSpeed = 0;
    this.CurrentWaterLocation = Vector_1.Vector.Create();
    this.CurrentWaterNormal = Vector_1.Vector.Create();
    this.CurrentWaterDepth = 0;
    this.VelocityHistory = new VelocityHistoryCache();
    this.CurrentToWaterHeight = 0;
    this.FlyWaterHandle = 0;
    this.IsTraceWater = false;
    this.IsBlackWave = false;
    this.EmptyUeTransform = new UE.TransformDouble();
    this.RippleSwim = undefined;
    this.ShoreTraceElement = undefined;
    this.ShoreTraceHandle = undefined;
    this.ShoreTraceDelegate = undefined;
    this.ShoreTraceTicker = 0;
    this.IsTracedShore = false;
    this.IsMotorState = false;
    this.FindNoWaterPhysicalMaterial = false;
    this.EIData = undefined;
    this.W61 = (t, e, i, s) => {
      if ((!this.ShoreTraceHandle || !(this.ShoreTraceHandle.Frame > i)) && (!this.ShoreTraceHandle || this.ShoreTraceHandle.Frame !== i || !(this.ShoreTraceHandle.Index > s))) {
        if (t) {
          if (this.IsTracedShore && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("RenderEffect", 83, "LLX  TraceChange True to False");
          }
          this.IsTracedShore = false;
        } else {
          if (!this.IsTracedShore) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("RenderEffect", 83, "LLX  TraceChange False to True");
            }
          }
          this.IsTracedShore = true;
        }
      }
    };
    this.IsEnabled = false;
  }
  Start(t) {
    if (this.Config?.IsValid() && t) {
      this.Owner = t;
      this.OwnerHeight = this.Owner.CapsuleComponent ? this.Owner.CapsuleComponent.CapsuleHalfHeight * 2 : 0;
      this.InWaterSubConfig.Init(this.Config.WaterEffectConfig);
      this.SwimIdleEffect = this.Config.SwimIdleEffectRef;
      this.SwimNormalEffect = this.Config.SwimNormalEffectRef;
      this.SwimFastEffect = this.Config.SwimFastEffectRef;
      var e = this.Config.MaterialEffectConfig.Num();
      for (let t = 0; t < e; t++) {
        var i;
        var s = this.Config.MaterialEffectConfig.GetKey(t);
        var h = this.Config.MaterialEffectConfig.Get(s);
        if (h) {
          (i = new WaterEffectSubConfig()).Init(h);
          this.OnMaterialSubConfig.set(s, i);
        }
      }
      this.VelocityHistory.Initialize(12);
      this.IsReady = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RenderEffect", 25, "WaterEffect Start", ["Owner", t.GetName()]);
      }
    }
  }
  Enable() {
    if (this.IsReady && (this.OwnerStateComponent = this.Owner.CharacterActorComponent?.Entity?.GetComponent(184), this.IsEnabled = true, this.ShoreTraceElement = UE.NewObject(UE.TraceSphereElement.StaticClass()), this.ShoreTraceElement.bIsSingle = true, this.ShoreTraceElement.bTraceComplex = false, this.ShoreTraceElement.bIgnoreSelf = true, this.ShoreTraceElement.WorldContextObject = this.Owner, this.ShoreTraceElement.Radius = 50, this.ShoreTraceElement.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water), UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.Kuro.InteractionEffect.IESystemDebugDraw") > 0 && (this.ShoreTraceElement.SetDrawDebugTrace(1), TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.ShoreTraceElement, new UE.LinearColor(255, 255, 0, 1)), TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.ShoreTraceElement, new UE.LinearColor(0, 255, 0, 1))), this.ShoreTraceDelegate = (0, puerts_1.toManualReleaseDelegate)(this.W61), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("RenderEffect", 25, "WaterEffect Enabled", ["Owner", this.Owner.GetName()]);
    }
  }
  Disable() {
    if (this.IsEnabled && (EffectSystem_1.EffectSystem.IsValid(this.Handle) && (EffectSystem_1.EffectSystem.StopEffectById(this.Handle, "[SceneCharacterWaterEffect.Disable]", true), this.Handle = 0), EffectSystem_1.EffectSystem.IsValid(this.AudioEffectHandle) && (EffectSystem_1.EffectSystem.StopEffectById(this.AudioEffectHandle, "[SceneCharacterWaterEffect.Disable]", true), this.AudioEffectHandle = 0), EffectSystem_1.EffectSystem.IsValid(this.MotorHandle) && (EffectSystem_1.EffectSystem.StopEffectById(this.MotorHandle, "[SceneCharacterWaterEffect.Disable]", true), this.MotorHandle = 0), EffectSystem_1.EffectSystem.IsValid(this.MotorScreenHandle) && (EffectSystem_1.EffectSystem.StopEffectById(this.MotorScreenHandle, "[SceneCharacterWaterEffect.Disable]", true), this.MotorScreenHandle = 0), this.IsEnabled = false, this.ShoreTraceElement?.Dispose(), (this.ShoreTraceElement = undefined, puerts_1.releaseManualReleaseDelegate)(this.W61), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("RenderEffect", 25, "WaterEffect Disabled", ["Owner", this.Owner.GetName()]);
    }
  }
  Tick() {
    if (this.IsEnabled) {
      var t;
      var e;
      var i = this.Owner.CharacterActorComponent?.Entity?.GetComponent(187);
      if (i) {
        var s = Vector_1.Vector.Create(this.CurrentWaterNormal.X, this.CurrentWaterNormal.Y, -this.CurrentWaterNormal.Z);
        if (i.GravityDirect.DotProduct(s) < WATER_NORMAL_DOT_CHECK) {
          return;
        }
      }
      if (this.Owner.CharacterActorComponent?.Entity?.GetComponent(183)?.GetBuffById(CharacterBuffIds_1.buffId.ElevatorBuff) === undefined && !this.Owner.CharacterActorComponent?.Entity?.GetComponent(215)?.HasTag(-1921814084)) {
        if (!!EffectSystem_1.EffectSystem.IsValid(this.Handle) && !this.IsBlackWave && !this.FindNoWaterPhysicalMaterial) {
          EffectSystem_1.EffectSystem.HandleSeekToTime(this.Handle, this.CurrentSpeed, false);
          i = EffectSystem_1.EffectSystem.GetEffectActor(this.Handle);
          (s = this.CurrentWaterLocation).X = this.Owner.D_K2_GetActorLocation().X;
          s.Y = this.Owner.D_K2_GetActorLocation().Y;
          i.D_K2_SetActorLocation(s.ToUeVector(true), false, undefined, true);
          s = this.CurrentWaterNormal.ToUeVector(true);
          e = this.Owner.D_GetActorForwardVector();
          t = UE.KismetMathLibrary.D_Cross_VectorVector(s, e);
          e = UE.KismetMathLibrary.D_Cross_VectorVector(t, s);
          i.K2_SetActorRotation(UE.KismetMathLibrary.D_MakeRotationFromAxes(e, t, s), true);
          if (EffectSystem_1.EffectSystem.IsValid(this.AudioEffectHandle)) {
            EffectSystem_1.EffectSystem.GetEffectActor(this.AudioEffectHandle).D_K2_SetActorLocation(this.CurrentWaterLocation.ToUeVector(true), false, undefined, true);
          }
        }
        if (this.OwnerHeight > 0) {
          i = MathUtils_1.MathUtils.Clamp(this.CurrentWaterDepth / this.OwnerHeight, 0, 1);
          AudioSystem_1.AudioSystem.SetRtpcValue("amb_water_depth", i, {
            Actor: this.Owner
          });
        }
      }
    }
  }
  IsMaterialInUse(t) {
    return !!this.OnMaterialSubConfig.has(t) && (!this.OnMaterialSubConfig.get(t).TriggerInGrass || RenderDataManager_1.RenderDataManager.Get().GetPlayerInGrass());
  }
  SetStateNone(t) {
    if (this.IsEnabled) {
      this.VelocityHistory.AddVelocity(t);
      this.CurrentSpeed = t.Size();
      if (this.State !== 0) {
        if (this.CurrentSubConfig) {
          this.OnCharacterJumpOutWater(t, this.CurrentWaterLocation, this.CurrentWaterNormal, this.CurrentSubConfig, this.CurrentWaterDepth);
        }
        this.StopEffect();
        this.CurrentSubConfig = undefined;
        this.State = 0;
      }
      if (this.MotorHandlePath === MOTOR_PUTONG || this.MotorHandlePath === MOTOR_DANQI) {
        this.StopMotorEffect();
      }
    }
  }
  SetStateInWater(t, e, i, s, h) {
    var r;
    if (this.IsEnabled) {
      if ((r = this.Owner.CharacterActorComponent?.Entity?.GetComponent(242)) && r.IsOnVehicle) {
        this.SetStateNone(i);
      } else {
        this.CurrentWaterDepth = t;
        this.CurrentWaterLocation.Set(s.X, s.Y, h);
        this.CurrentWaterNormal = e;
        this.VelocityHistory.AddVelocity(i);
        this.CurrentSpeed = i.Size();
        if (this.State === 0) {
          this.OnCharacterFallInWater(i, this.CurrentWaterLocation, e, this.InWaterSubConfig, t);
        }
        if ((r = this.OwnerStateComponent?.MoveState) === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim) {
          this.SpawnEffect(this.SwimNormalEffect, undefined, s, e);
        } else if (r === CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim) {
          this.SpawnEffect(this.SwimFastEffect, undefined, s, e);
        } else if (h = this.InWaterSubConfig.FindMoveEffect(t, this.CurrentSpeed)) {
          this.SpawnEffect(h.EffectDataPath, h.AudioEffectDataPath, s, e);
        } else if (t > this.InWaterSubConfig.FallJumpDepthThreshold && r === CharacterUnifiedStateTypes_1.ECharMoveState.Other) {
          this.SpawnEffect(this.SwimIdleEffect, undefined, s, e);
        } else {
          this.StopEffect();
        }
        this.CurrentSubConfig = this.InWaterSubConfig;
        this.State = 1;
      }
    }
  }
  SetStateInWaterEnviData(t, e, i) {
    var s;
    if (this.IsEnabled && t) {
      this.EIData = t;
      if ((s = this.Owner.CharacterActorComponent?.Entity?.GetComponent(242)) && s.IsOnVehicle && !this.IsMotorState) {
        this.SetStateNone(e);
      } else {
        this.CurrentWaterDepth = t.WaterDepth;
        this.CurrentWaterLocation.Set(i.X, i.Y, t.HitWaterLocation.Z);
        this.CurrentWaterNormal.Set(t.HitWaterNormal.X, t.HitWaterNormal.Y, t.HitWaterNormal.Z);
        this.VelocityHistory.AddVelocity(e);
        this.CurrentSpeed = e.Size();
        if (this.State === 0) {
          this.OnCharacterFallInWater(e, this.CurrentWaterLocation, this.CurrentWaterNormal, this.InWaterSubConfig, this.CurrentWaterDepth);
        }
        if (this.IsMotorState) {
          if (this.Owner.CharacterActorComponent?.Entity?.GetComponent(215)?.HasTag(232903598)) {
            if (!this.FindNoWaterPhysicalMaterial) {
              this.SpawnMotorEffect(MOTOR_DANQI, i);
              this.SpawnMotorScreenEffect();
            }
          } else if (this.VelocityHistory.GetMaxVelocity() > MOTOR_EFFECT_SPEED_CLAMP) {
            if (!this.FindNoWaterPhysicalMaterial) {
              this.SpawnMotorEffect(MOTOR_PUTONG, i);
            }
          } else {
            this.StopMotorEffect();
          }
          this.StopEffect();
        } else {
          if ((s = this.OwnerStateComponent?.MoveState) === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim) {
            this.SpawnEffect(this.SwimNormalEffect, undefined, i, this.CurrentWaterNormal);
          } else if (s === CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim) {
            this.SpawnEffect(this.SwimFastEffect, undefined, i, this.CurrentWaterNormal);
          } else {
            t = this.CurrentWaterNormal;
            this.CurrentWaterNormal.GetSafeNormal(t);
            e = e.DotProduct(t);
            t = Math.sqrt(this.CurrentSpeed * this.CurrentSpeed - e * e);
            if (e = this.InWaterSubConfig.FindMoveEffect(this.CurrentWaterDepth, t)) {
              this.SpawnEffect(e.EffectDataPath, e.AudioEffectDataPath, i, this.CurrentWaterNormal);
            } else if (this.CurrentWaterDepth > this.InWaterSubConfig.FallJumpDepthThreshold && s === CharacterUnifiedStateTypes_1.ECharMoveState.Other) {
              this.SpawnEffect(this.SwimIdleEffect, undefined, i, this.CurrentWaterNormal);
            } else {
              this.StopEffect();
            }
          }
          this.StopMotorEffect();
          this.CurrentSubConfig = this.InWaterSubConfig;
        }
        this.State = 1;
      }
    }
  }
  SetStateOnMaterialEnviData(t, e, i, s) {
    this.EIData = s;
    t = this.OnMaterialSubConfig.get(t);
    if (t) {
      this.CurrentWaterDepth = s.WaterDepth;
      this.CurrentWaterLocation.Set(i.X, i.Y, s.HitWaterLocation.Z);
      this.CurrentWaterNormal.Set(s.HitWaterNormal.X, s.HitWaterNormal.Y, s.HitWaterNormal.Z);
      this.VelocityHistory.AddVelocity(e);
      this.CurrentSpeed = e.Size();
      if (this.State === 0) {
        this.OnCharacterFallInWater(e, this.CurrentWaterLocation, this.CurrentWaterNormal, t, this.CurrentWaterDepth);
      }
      s = this.CurrentWaterNormal;
      this.CurrentWaterNormal.GetSafeNormal(s);
      s = e.DotProduct(s);
      s = Math.sqrt(this.CurrentSpeed * this.CurrentSpeed - s * s);
      if (s = t.FindMoveEffect(this.CurrentWaterDepth, s)) {
        this.SpawnEffect(s.EffectDataPath, s.AudioEffectDataPath, i, this.CurrentWaterNormal);
      }
      this.CurrentSubConfig = t;
      this.State = 2;
    } else {
      this.SetStateNone(e);
    }
  }
  SetWaterDataEnviDataCheckFly(t, e, i) {
    if (this.IsEnabled && t && this.Owner) {
      this.CurrentWaterDepth = t.WaterDepth;
      this.CurrentWaterNormal.Set(t.HitWaterNormal.X, t.HitWaterNormal.Y, t.HitWaterNormal.Z);
      this.CurrentToWaterHeight = t.CapsuleToWater;
      this.CurrentWaterLocation.Set(e.X, e.Y, t.HitWaterLocation.Z);
      this.IsTraceWater = t.bTraceWater;
      this.IsBlackWave = t.bTouchBlackWave;
      this.VelocityHistory.AddVelocity(i);
      this.CurrentSpeed = i.Size();
      const h = this.Owner.CharacterActorComponent?.Entity?.GetComponent(215);
      if (this.Owner.CharacterMovement && !this.IsBlackWave) {
        var s = this.OwnerStateComponent?.MoveState;
        this.IsMotorState = false;
        const h = this.Owner.CharacterActorComponent?.Entity?.GetComponent(215);
        if (h?.HasTag(346080557)) {
          this.IsMotorState = true;
        }
        if ((s === CharacterUnifiedStateTypes_1.ECharMoveState.Soar && !t.bInWater || this.IsMotorState && this.CurrentSpeed > MOTOR_EFFECT_SPEED_CLAMP && !h?.HasTag(1566606455)) && this.IsTraceWater) {
          s = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEQUALITY);
          if (!s || s < 2 || Info_1.Info.IsMobilePlatform()) {
            return;
          }
          this.OnCharacterFlyOnWater(i, this.InWaterSubConfig);
        }
      }
      if (this.IsMotorState && !h?.HasTag(1566606455) && this.VelocityHistory.GetMaxVelocity() > MOTOR_EFFECT_SPEED_CLAMP && (t.HitPhysicMaterialArray.Contains("DirtLand") || t.HitPhysicMaterialArray.Contains("SoilLand")) && !t.HitPhysicMaterialArray.Contains("Highway") && !t.bInWater) {
        this.SpawnMotorEffect(MOTOR_SHACHEN, e);
      } else if (this.MotorHandlePath === MOTOR_SHACHEN) {
        this.StopMotorEffect();
      }
      if (!this.IsMotorState || !h?.HasTag(232903598)) {
        if (EffectSystem_1.EffectSystem.IsValid(this.MotorScreenHandle)) {
          this.StopMotorScreenEffect();
        }
      }
      this.FindNoWaterPhysicalMaterial = t.HitPhysicMaterialArray.Contains("DynamicWater");
    }
  }
  SetStateOnMaterial(t, e, i, s, h, r) {
    if (this.IsEnabled) {
      if (t = this.OnMaterialSubConfig.get(t)) {
        this.CurrentWaterDepth = e;
        this.CurrentWaterLocation.Set(h.X, h.Y, r);
        this.CurrentWaterNormal = i;
        this.VelocityHistory.AddVelocity(s);
        this.CurrentSpeed = s.Size();
        if (this.State === 0) {
          this.OnCharacterFallInWater(s, this.CurrentWaterLocation, i, t, e);
        }
        if (r = t.FindMoveEffect(e, this.CurrentSpeed)) {
          this.SpawnEffect(r.EffectDataPath, r.AudioEffectDataPath, h, i);
        }
        this.CurrentSubConfig = t;
        this.State = 2;
      } else {
        this.SetStateNone(s);
      }
    }
  }
  OnCharacterFallInWater(t, e, i, s, h) {
    if (this.IsEnabled && !(h < s.FallJumpDepthThreshold) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderEffect", 25, "WaterEffect Spawn Fall In Water", ["Owner", this.Owner.GetName()], ["vel", this.VelocityHistory.GetMaxVelocityDirection(Vector_1.Vector.Create(-this.CurrentWaterNormal.X, -this.CurrentWaterNormal.Y, -this.CurrentWaterNormal.Z))]), h = s.FindFallEffectAtSpeed(this.VelocityHistory.GetMaxVelocityDirection(Vector_1.Vector.Create(-this.CurrentWaterNormal.X, -this.CurrentWaterNormal.Y, -this.CurrentWaterNormal.Z))))) {
      s = Vector_1.Vector.Create(e.X + t.X * this.Config.FallJumpPositionFix, e.Y + t.Y * this.Config.FallJumpPositionFix, e.Z);
      this.SpawnFallEffect(h.EffectDataPath, h.AudioEffectDataPath, s, i);
    }
  }
  OnCharacterJumpOutWater(t, e, i, s, h) {
    if (this.IsEnabled && !(h < s.FallJumpDepthThreshold) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderEffect", 25, "WaterEffect Spawn Jump Out of Water", ["Owner", this.Owner.GetName()]), h = s.FindJumpEffectAtSpeed(this.VelocityHistory.GetMaxVelocityDirection(this.CurrentWaterNormal)))) {
      s = Vector_1.Vector.Create(e.X + t.X * this.Config.FallJumpPositionFix, e.Y + t.Y * this.Config.FallJumpPositionFix, e.Z);
      this.SpawnFallEffect(h.EffectDataPath, h.AudioEffectDataPath, s, i);
    }
  }
  StopEffect() {
    const t = this.Handle;
    var e;
    if (t && EffectSystem_1.EffectSystem.IsValid(t)) {
      EffectSystem_1.EffectSystem.HandleSeekToTime(t, -1, false);
      if ((e = this.Config.TimeExistAfterDead * ONE_SECOND) > TimerSystem_1.MIN_TIME) {
        TimerSystem_1.TimerSystem.Delay(() => {
          if (EffectSystem_1.EffectSystem.IsValid(t)) {
            EffectSystem_1.EffectSystem.StopEffectById(t, "[SceneCharacterWaterEffect.StopEffect]", true);
          }
        }, e);
      } else {
        TimerSystem_1.TimerSystem.Next(() => {
          EffectSystem_1.EffectSystem.StopEffectById(t, "[SceneCharacterWaterEffect.StopEffect]", true);
        });
      }
    }
    this.Handle = 0;
    if (EffectSystem_1.EffectSystem.IsValid(this.AudioEffectHandle)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.AudioEffectHandle, "[SceneCharacterWaterEffect.StopEffect]", true);
    }
    this.AudioEffectHandle = 0;
  }
  StopMotorEffect() {
    var t = this.MotorHandle;
    if (t && EffectSystem_1.EffectSystem.IsValid(t) && EffectSystem_1.EffectSystem.IsValid(t)) {
      EffectSystem_1.EffectSystem.StopEffectById(t, "[SceneCharacterWaterEffect.StopMotorEffect]", false);
    }
    this.MotorHandle = 0;
    this.MotorHandlePath = "";
  }
  StopMotorScreenEffect() {
    const t = this.MotorScreenHandle;
    if (t && EffectSystem_1.EffectSystem.IsValid(t)) {
      TimerSystem_1.TimerSystem.Delay(() => {
        if (EffectSystem_1.EffectSystem.IsValid(t)) {
          EffectSystem_1.EffectSystem.StopEffectById(t, "[SceneCharacterWaterEffect.StopMotorScreenEffect]", false);
        }
      }, TimerSystem_1.MIN_TIME);
    }
    this.MotorScreenHandle = 0;
  }
  SpawnEffect(t, e, i, s) {
    if ((!EffectSystem_1.EffectSystem.IsValid(this.Handle) || this.HandlePath !== t) && !(this.StopEffect(), !t) && !this.IsBlackWave && !!this.EIData && !this.FindNoWaterPhysicalMaterial && !(this.EIData.CapsuleToBlock < this.EIData.CapsuleToWater)) {
      this.EmptyUeTransform.SetLocation(i.ToUeVector());
      this.Handle = EffectSystem_1.EffectSystem.SpawnEffect(this.Owner, this.EmptyUeTransform, t.ToAssetPathName(), "[SceneCharacterWaterEffect.SpawnEffect]", new EffectContext_1.EffectContext(undefined, this.Owner), 0);
      EffectSystem_1.EffectSystem.FreezeHandle(this.Handle, true);
      if (EffectSystem_1.EffectSystem.IsValid(this.Handle)) {
        this.HandlePath = t;
      }
      if (e && (i = e.ToAssetPathName()).length > 0) {
        this.AudioEffectHandle = EffectSystem_1.EffectSystem.SpawnEffect(this.Owner, this.EmptyUeTransform, i, "[SceneCharacterWaterEffect.SpawnEffect(Audio)]", new EffectContext_1.EffectContext(undefined, this.Owner), 0);
      }
    }
  }
  SpawnMotorEffect(t, e) {
    var i;
    var s;
    if (!this.IsBlackWave && !(this.VelocityHistory.GetMaxVelocity() < MOTOR_EFFECT_SPEED_CLAMP) && !!this.Owner && (!EffectSystem_1.EffectSystem.IsValid(this.MotorHandle) || this.MotorHandlePath !== t)) {
      this.StopMotorEffect();
      this.MotorHandle = EffectSystem_1.EffectSystem.SpawnEffect(this.Owner, this.EmptyUeTransform, t, "[SceneCharacterWaterEffect.SpawnMotorEffect]", new EffectContext_1.EffectContext(undefined, this.Owner), 0);
      if (EffectSystem_1.EffectSystem.IsValid(this.MotorHandle)) {
        (i = EffectSystem_1.EffectSystem.GetEffectActor(this.MotorHandle))?.K2_AttachToActor(this.Owner, undefined, 2, 2, 2, false);
        (s = new UE.TransformDouble()).SetLocation(new UE.VectorDouble(0, 0, -80));
        i?.D_K2_SetActorRelativeTransform(s, false, undefined, true);
        this.MotorHandlePath = t;
      }
    }
  }
  SpawnMotorScreenEffect() {
    if (!EffectSystem_1.EffectSystem.IsValid(this.MotorScreenHandle) && !(this.StopMotorScreenEffect(), this.IsBlackWave) && !(this.CurrentSpeed < MOTOR_EFFECT_SPEED_CLAMP) && !!this.Owner) {
      this.MotorScreenHandle = EffectSystem_1.EffectSystem.SpawnEffect(this.Owner, this.EmptyUeTransform, MOTOR_SCREEN, "[SceneCharacterWaterEffect.SpawnMotorEffect]", new EffectContext_1.EffectContext(undefined, this.Owner), 0);
      if (EffectSystem_1.EffectSystem.IsValid(this.MotorScreenHandle)) {
        EffectSystem_1.EffectSystem.GetEffectActor(this.MotorScreenHandle)?.K2_AttachToActor(this.Owner, undefined, 2, 2, 2, false);
      }
    }
  }
  SpawnFallEffect(t, e, i, s) {
    if (!t || this.IsBlackWave || this.FindNoWaterPhysicalMaterial) {
      return -1;
    }
    var h = this.Owner?.CharacterActorComponent?.Entity?.GetComponent(187);
    if (h) {
      var r = Vector_1.Vector.Create(this.CurrentWaterNormal.X, this.CurrentWaterNormal.Y, -this.CurrentWaterNormal.Z);
      if (h.GravityDirect.DotProduct(r) < WATER_NORMAL_DOT_CHECK) {
        return -1;
      }
      if (Math.abs(h.GravityDirect.Z) < 1 - MathCommon_1.MathCommon.ThreshPointOnPlane) {
        return -1;
      }
    }
    this.EmptyUeTransform.SetLocation(i.ToUeVector(true));
    this.EmptyUeTransform.SetRotation(UE.KismetMathLibrary.D_MakeRotFromZ(s.ToUeVector(true)).Quaternion());
    r = this.IsMotorState ? MOTOR_FALL_IN : t.ToAssetPathName();
    h = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, this.EmptyUeTransform, r, "[SceneCharacterWaterEffect.SpawnFallEffect]", new EffectContext_1.EffectContext(undefined, this.Owner));
    if (e && (i = e.ToAssetPathName()).length > 0) {
      EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, this.EmptyUeTransform, i, "[SceneCharacterWaterEffect.SpawnFallEffect(Audio)]", undefined, 0);
    }
    return h;
  }
  OnCharacterFlyOnWater(e, i) {
    if (this.IsEnabled && !this.FindNoWaterPhysicalMaterial && !(this.CurrentToWaterHeight > i.FlyEffectHeightThreshold)) {
      var t = i.FindFlyEffectAtSpeed(this.VelocityHistory.GetMaxVelocity());
      if (t) {
        var s = this.Owner?.CharacterActorComponent?.Entity?.GetComponent(187);
        if (s) {
          var h = Vector_1.Vector.Create(this.CurrentWaterNormal.X, this.CurrentWaterNormal.Y, -this.CurrentWaterNormal.Z);
          if (s.GravityDirect.DotProduct(h) < WATER_NORMAL_DOT_CHECK) {
            return;
          }
        }
        var h = Vector_1.Vector.Create(this.CurrentWaterLocation.X + e.X * FLYEFFECT_VELOCITY_XY_OFFSET_SCALE, this.CurrentWaterLocation.Y + e.Y * FLYEFFECT_VELOCITY_XY_OFFSET_SCALE, this.CurrentWaterLocation.Z);
        if (!this.RippleSwim && this.Owner) {
          this.RippleSwim = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetActorOfClass(this.Owner, UE.BP_RippleSwim_C.StaticClass());
        }
        if (this.RippleSwim) {
          r = this.RippleSwim.CurrentRippleCenter.GetSafeNormal(MathCommon_1.MathCommon.SmallNumber);
          h.X = this.CurrentWaterLocation.X + this.RippleSwim.CurrentRippleCenter.X + (this.IsMotorState ? 0 : r.X * this.RippleSwim.PlayerSize * FLYEFFECT_RIPPLEWATER_XY_OFFSET_SCALE);
          h.Y = this.CurrentWaterLocation.Y + this.RippleSwim.CurrentRippleCenter.Y + (this.IsMotorState ? 0 : r.Y * this.RippleSwim.PlayerSize * FLYEFFECT_RIPPLEWATER_XY_OFFSET_SCALE);
        }
        this.ShoreTraceTicker += 1;
        if (this.ShoreTraceTicker >= 3 && s) {
          this.ShoreTraceTicker = 0;
          (r = h).AdditionEqual(e.MultiplyEqual(0.1));
          this.ShoreTraceHandle = this.Q61(r);
        }
        var r = Rotator_1.Rotator.Create();
        if (s) {
          s = Vector_1.Vector.Create(-s.GravityDirect.X, -s.GravityDirect.Y, -s.GravityDirect.Z);
          MathUtils_1.MathUtils.LookRotationUpFirst(e, s, r);
        }
        r.Yaw = r.Yaw + 90;
        this.EmptyUeTransform.SetLocation(h.ToUeVector());
        this.EmptyUeTransform.SetRotation(r.ToUeRotator().Quaternion());
        if (!EffectSystem_1.EffectSystem.IsValid(this.FlyWaterHandle) && t.EffectDataPath) {
          this.FlyWaterHandle = EffectSystem_1.EffectSystem.SpawnEffect(this.Owner, this.EmptyUeTransform, t.EffectDataPath?.ToAssetPathName(), "[SceneCharacterWaterEffect.SpawnEffect(FlyWaterEffect)]", new EffectContext_1.EffectContext(undefined, this.Owner), 3);
          const a = EffectSystem_1.EffectSystem.GetEffectActor(this.FlyWaterHandle);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("RenderEffect", 83, "WaterEffect Spawn Fly on Water", ["WaterEffectActor", a?.D_K2_GetActorLocation()]);
          }
        }
        const a = EffectSystem_1.EffectSystem.GetEffectActor(this.FlyWaterHandle);
        if (a && this.IsTraceWater && !this.IsTracedShore) {
          a.D_K2_SetActorTransform(this.EmptyUeTransform, false, undefined, false);
          e = new EffectParameterNiagara_1.EffectParameterNiagara();
          e.UserParameterFloat = [];
          e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("DistanceToWater"), this.CurrentToWaterHeight]);
          let t = 1;
          if (i.FallJumpDepthThreshold > 0) {
            t = Math.min(0.8, this.CurrentWaterDepth / i.FallJumpDepthThreshold);
          }
          e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpriteScale"), t]);
          EffectSystem_1.EffectSystem.SetEffectParameterNiagara(this.FlyWaterHandle, e);
        }
      }
    }
  }
  Q61(t) {
    var e = this.Owner?.CharacterActorComponent?.Entity?.GetComponent(187);
    var i = Vector_1.Vector.Create(-FLYEFFECT_SHORE_TRACE_START_OFFSET * e.GravityDirect.X + t.X, -FLYEFFECT_SHORE_TRACE_START_OFFSET * e.GravityDirect.Y + t.Y, -FLYEFFECT_SHORE_TRACE_START_OFFSET * e.GravityDirect.Z + t.Z);
    var e = Vector_1.Vector.Create(-FLYEFFECT_SHORE_TRACE_END_OFFSET * e.GravityDirect.X + t.X, -FLYEFFECT_SHORE_TRACE_END_OFFSET * e.GravityDirect.Y + t.Y, -FLYEFFECT_SHORE_TRACE_END_OFFSET * e.GravityDirect.Z + t.Z);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.ShoreTraceElement, i);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.ShoreTraceElement, e);
    return TraceElementCommon_1.TraceElementCommon.AsyncSphereTrace(this.ShoreTraceElement, "WaterEffect_ShoreTrace", this.ShoreTraceDelegate);
  }
}
exports.SceneCharacterWaterEffect = SceneCharacterWaterEffect;
//# sourceMappingURL=SceneCharacterWaterEffect.js.map