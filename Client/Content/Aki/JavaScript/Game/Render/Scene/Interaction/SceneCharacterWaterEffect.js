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
const SceneCharacterVehicleEffect_1 = require("./SceneCharacterVehicleEffect");
const ONE_SECOND = 1000;
const FLYEFFECT_VELOCITY_XY_OFFSET_SCALE = 0.3;
const FLYEFFECT_RIPPLEWATER_XY_OFFSET_SCALE = 1.1;
const FLYEFFECT_SHORE_TRACE_START_OFFSET = 500;
const FLYEFFECT_SHORE_TRACE_END_OFFSET = -3000;
const WATER_NORMAL_DOT_CHECK = 0.2;
const MOTOR_EFFECT_SPEED_CLAMP = 100;
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
    let i = 0;
    for (; i < this.EffectItems.length && !(t < this.EffectItems[i].SpeedThreshold); ++i);
    if (i !== 0) {
      return this.EffectItems[i - 1];
    }
  }
  Init(i) {
    this.WaterDepthThreshold = i.WaterDepth;
    var e = i.EffectConfig.Num();
    this.EffectItems.length = e;
    for (let t = 0; t < e; t++) {
      this.EffectItems[t] = new WaterEffectItem();
      this.EffectItems[t].Init(i.EffectConfig.Get(t));
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
  FindMoveEffect(t, i) {
    let e = 0;
    for (; e < this.MoveEffects.length && !(t < this.MoveEffects[e].WaterDepthThreshold); ++e);
    if (e !== 0) {
      return this.MoveEffects[e - 1].FindEffectAtSpeed(i);
    }
  }
  FindFallEffectAtSpeed(t) {
    let i = 0;
    for (; i < this.FallEffects.length && !(t < this.FallEffects[i].SpeedThreshold); ++i);
    if (i !== 0) {
      return this.FallEffects[i - 1];
    }
  }
  FindJumpEffectAtSpeed(t) {
    let i = 0;
    for (; i < this.JumpEffects.length && !(t < this.JumpEffects[i].SpeedThreshold); ++i);
    if (i !== 0) {
      return this.JumpEffects[i - 1];
    }
  }
  FindFlyEffectAtSpeed(t) {
    let i = 0;
    for (; i < this.FlyEffects.length && !(t < this.FlyEffects[i].SpeedThreshold); ++i);
    if (i !== 0) {
      return this.FlyEffects[i - 1];
    }
  }
  Init(i) {
    var e = i.MoveEffects.Num();
    this.MoveEffects.length = e;
    for (let t = 0; t < e; t++) {
      this.MoveEffects[t] = new WaterEffectGroup();
      this.MoveEffects[t].Init(i.MoveEffects.Get(t));
    }
    var s = i.FallEffects.Num();
    this.FallEffects.length = s;
    for (let t = 0; t < s; t++) {
      this.FallEffects[t] = new WaterEffectItem();
      this.FallEffects[t].Init(i.FallEffects.Get(t));
    }
    var h = i.JumpEffects.Num();
    this.JumpEffects.length = h;
    for (let t = 0; t < h; t++) {
      this.JumpEffects[t] = new WaterEffectItem();
      this.JumpEffects[t].Init(i.JumpEffects.Get(t));
    }
    var r = i.FlyEffects.Num();
    this.FlyEffects.length = r;
    for (let t = 0; t < r; t++) {
      this.FlyEffects[t] = new WaterEffectItem();
      this.FlyEffects[t].Init(i.FlyEffects.Get(t));
    }
    this.FallJumpDepthThreshold = i.FallJumpDepthThreshold;
    this.TriggerInGrass = i.TriggerInGrass;
    this.FlyEffectHeightThreshold = i.FlyEffectTriggerHeight;
  }
}
class VelocityHistoryCache {
  constructor() {
    this.VelocityHistory = [];
    this.VelocityHistoryArrayPtr = 0;
  }
  Initialize(i) {
    this.VelocityHistory.length = i;
    for (let t = 0; t < i; t++) {
      this.VelocityHistory[t] = Vector_1.Vector.Create(0, 0, 0);
    }
  }
  AddVelocity(t) {
    this.VelocityHistory[this.VelocityHistoryArrayPtr].Set(t.X, t.Y, t.Z);
    this.VelocityHistoryArrayPtr = (this.VelocityHistoryArrayPtr + 1) % this.VelocityHistory.length;
  }
  GetMaxVelocityDirection(t) {
    let i = 0;
    for (const e of this.VelocityHistory) {
      i = Math.max(i, e.DotProduct(t));
    }
    return i;
  }
  GetMaxVelocity() {
    let t = 0;
    for (const i of this.VelocityHistory) {
      t = Math.max(t, i.Size());
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
    this.VehicleEffect = undefined;
    this.W61 = (t, i, e, s) => {
      if ((!this.ShoreTraceHandle || !(this.ShoreTraceHandle.Frame > e)) && (!this.ShoreTraceHandle || this.ShoreTraceHandle.Frame !== e || !(this.ShoreTraceHandle.Index > s))) {
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
      this.VehicleEffect = new SceneCharacterVehicleEffect_1.SceneCharacterVehicleEffect();
      this.VehicleEffect.Start(t);
      this.VehicleEffect.Enable();
      var i = this.Config.MaterialEffectConfig.Num();
      for (let t = 0; t < i; t++) {
        var e;
        var s = this.Config.MaterialEffectConfig.GetKey(t);
        var h = this.Config.MaterialEffectConfig.Get(s);
        if (h) {
          (e = new WaterEffectSubConfig()).Init(h);
          this.OnMaterialSubConfig.set(s, e);
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
    if (this.IsReady && (this.OwnerStateComponent = this.Owner.CharacterActorComponent?.Entity?.GetComponent(186), this.IsEnabled = true, this.ShoreTraceElement = UE.NewObject(UE.TraceSphereElement.StaticClass()), this.ShoreTraceElement.bIsSingle = true, this.ShoreTraceElement.bTraceComplex = false, this.ShoreTraceElement.bIgnoreSelf = true, this.ShoreTraceElement.WorldContextObject = this.Owner, this.ShoreTraceElement.Radius = 50, this.ShoreTraceElement.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water), UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.Kuro.InteractionEffect.IESystemDebugDraw") > 0 && (this.ShoreTraceElement.SetDrawDebugTrace(1), TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.ShoreTraceElement, new UE.LinearColor(255, 255, 0, 1)), TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.ShoreTraceElement, new UE.LinearColor(0, 255, 0, 1))), this.ShoreTraceDelegate = (0, puerts_1.toManualReleaseDelegate)(this.W61), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("RenderEffect", 25, "WaterEffect Enabled", ["Owner", this.Owner.GetName()]);
    }
  }
  Disable() {
    if (this.IsEnabled && (EffectSystem_1.EffectSystem.IsValid(this.Handle) && (EffectSystem_1.EffectSystem.StopEffectById(this.Handle, "[SceneCharacterWaterEffect.Disable]", true), this.Handle = 0), EffectSystem_1.EffectSystem.IsValid(this.AudioEffectHandle) && (EffectSystem_1.EffectSystem.StopEffectById(this.AudioEffectHandle, "[SceneCharacterWaterEffect.Disable]", true), this.AudioEffectHandle = 0), this.VehicleEffect && this.VehicleEffect.Disable(), this.IsEnabled = false, this.ShoreTraceElement?.Dispose(), (this.ShoreTraceElement = undefined, puerts_1.releaseManualReleaseDelegate)(this.W61), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("RenderEffect", 25, "WaterEffect Disabled", ["Owner", this.Owner.GetName()]);
    }
  }
  Tick() {
    if (this.IsEnabled) {
      if (this.VehicleEffect) {
        this.VehicleEffect.Tick();
      }
      var t;
      var i;
      var e = this.Owner.CharacterActorComponent?.Entity?.GetComponent(189);
      if (e) {
        var s = Vector_1.Vector.Create(this.CurrentWaterNormal.X, this.CurrentWaterNormal.Y, -this.CurrentWaterNormal.Z);
        if (e.GravityDirect.DotProduct(s) < WATER_NORMAL_DOT_CHECK) {
          return;
        }
      }
      if (this.Owner.CharacterActorComponent?.Entity?.GetComponent(185)?.GetBuffById(CharacterBuffIds_1.buffId.ElevatorBuff) === undefined && !this.Owner.CharacterActorComponent?.Entity?.GetComponent(217)?.HasTag(-1921814084)) {
        if (!!EffectSystem_1.EffectSystem.IsValid(this.Handle) && !this.IsBlackWave && !this.FindNoWaterPhysicalMaterial) {
          EffectSystem_1.EffectSystem.HandleSeekToTime(this.Handle, this.CurrentSpeed, false);
          e = EffectSystem_1.EffectSystem.GetEffectActor(this.Handle);
          (s = this.CurrentWaterLocation).X = this.Owner.D_K2_GetActorLocation().X;
          s.Y = this.Owner.D_K2_GetActorLocation().Y;
          e.D_K2_SetActorLocation(s.ToUeVector(true), false, undefined, true);
          s = this.CurrentWaterNormal.ToUeVector(true);
          i = this.Owner.D_GetActorForwardVector();
          t = UE.KismetMathLibrary.D_Cross_VectorVector(s, i);
          i = UE.KismetMathLibrary.D_Cross_VectorVector(t, s);
          e.K2_SetActorRotation(UE.KismetMathLibrary.D_MakeRotationFromAxes(i, t, s), true);
          if (EffectSystem_1.EffectSystem.IsValid(this.AudioEffectHandle)) {
            EffectSystem_1.EffectSystem.GetEffectActor(this.AudioEffectHandle).D_K2_SetActorLocation(this.CurrentWaterLocation.ToUeVector(true), false, undefined, true);
          }
        }
        if (this.OwnerHeight > 0) {
          e = MathUtils_1.MathUtils.Clamp(this.CurrentWaterDepth / this.OwnerHeight, 0, 1);
          AudioSystem_1.AudioSystem.SetRtpcValue("amb_water_depth", e, {
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
    if (this.IsEnabled && (this.VelocityHistory.AddVelocity(t), this.CurrentSpeed = t.Size(), this.State !== 0 && (this.CurrentSubConfig && this.OnCharacterJumpOutWater(t, this.CurrentWaterLocation, this.CurrentWaterNormal, this.CurrentSubConfig, this.CurrentWaterDepth), this.StopEffect(), this.CurrentSubConfig = undefined, this.State = 0), this.VehicleEffect)) {
      this.VehicleEffect.IsVehicleWaterState = false;
    }
  }
  SetStateInWater(t, i, e, s, h) {
    var r;
    if (this.IsEnabled) {
      if ((r = this.Owner.CharacterActorComponent?.Entity?.GetComponent(242)) && r.IsOnVehicle) {
        this.SetStateNone(e);
      } else {
        this.CurrentWaterDepth = t;
        this.CurrentWaterLocation.Set(s.X, s.Y, h);
        this.CurrentWaterNormal = i;
        this.VelocityHistory.AddVelocity(e);
        this.CurrentSpeed = e.Size();
        if (this.State === 0) {
          this.OnCharacterFallInWater(e, this.CurrentWaterLocation, i, this.InWaterSubConfig, t);
        }
        if ((r = this.OwnerStateComponent?.MoveState) === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim) {
          this.SpawnEffect(this.SwimNormalEffect, undefined, s, false);
        } else if (r === CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim) {
          this.SpawnEffect(this.SwimFastEffect, undefined, s, false);
        } else if (h = this.InWaterSubConfig.FindMoveEffect(t, this.CurrentSpeed)) {
          this.SpawnEffect(h.EffectDataPath, h.AudioEffectDataPath, s, false);
        } else if (t > this.InWaterSubConfig.FallJumpDepthThreshold && r === CharacterUnifiedStateTypes_1.ECharMoveState.Other) {
          this.SpawnEffect(this.SwimIdleEffect, undefined, s, false);
        } else {
          this.StopEffect();
        }
        this.CurrentSubConfig = this.InWaterSubConfig;
        this.State = 1;
      }
    }
  }
  SetStateInWaterEnviData(t, i, e) {
    var s;
    if (this.IsEnabled && t) {
      this.EIData = t;
      if ((s = this.Owner.CharacterActorComponent?.Entity?.GetComponent(242)) && s.IsOnVehicle && !this.IsMotorState) {
        this.SetStateNone(i);
      } else {
        this.CurrentWaterDepth = t.WaterDepth;
        this.CurrentWaterLocation.Set(e.X, e.Y, t.HitWaterLocation.Z);
        this.CurrentWaterNormal.Set(t.HitWaterNormal.X, t.HitWaterNormal.Y, t.HitWaterNormal.Z);
        this.VelocityHistory.AddVelocity(i);
        this.CurrentSpeed = i.Size();
        if (this.State === 0) {
          this.OnCharacterFallInWater(i, this.CurrentWaterLocation, this.CurrentWaterNormal, this.InWaterSubConfig, this.CurrentWaterDepth);
        }
        if (this.IsMotorState) {
          if (this.VehicleEffect) {
            this.VehicleEffect.IsVehicleWaterState = true;
            this.VehicleEffect.SetStateInWaterEnviData(t);
          }
          this.StopEffect();
        } else {
          if ((s = this.OwnerStateComponent?.MoveState) === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim) {
            this.SpawnEffect(this.SwimNormalEffect, undefined, e, false);
          } else if (s === CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim) {
            this.SpawnEffect(this.SwimFastEffect, undefined, e, false);
          } else {
            t = this.CurrentWaterNormal;
            this.CurrentWaterNormal.GetSafeNormal(t);
            i = i.DotProduct(t);
            t = Math.sqrt(this.CurrentSpeed * this.CurrentSpeed - i * i);
            if (i = this.InWaterSubConfig.FindMoveEffect(this.CurrentWaterDepth, t)) {
              this.SpawnEffect(i.EffectDataPath, i.AudioEffectDataPath, e, false);
            } else if (this.CurrentWaterDepth > this.InWaterSubConfig.FallJumpDepthThreshold && s === CharacterUnifiedStateTypes_1.ECharMoveState.Other) {
              this.SpawnEffect(this.SwimIdleEffect, undefined, e, false);
            } else {
              this.StopEffect();
            }
          }
          if (this.VehicleEffect) {
            this.VehicleEffect.IsVehicleWaterState = false;
          }
          this.CurrentSubConfig = this.InWaterSubConfig;
        }
        this.State = 1;
      }
    }
  }
  SetStateOnMaterialEnviData(t, i, e, s) {
    this.EIData = s;
    t = this.OnMaterialSubConfig.get(t);
    if (t) {
      if (this.VehicleEffect) {
        this.VehicleEffect.IsVehicleWaterState = false;
      }
      if (this.OwnerStateComponent?.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Soar) {
        this.CurrentWaterDepth = s.WaterDepth;
        this.CurrentWaterLocation.Set(e.X, e.Y, s.HitWaterLocationWithOffset.Z);
        this.CurrentWaterNormal.Set(s.HitWaterNormal.X, s.HitWaterNormal.Y, s.HitWaterNormal.Z);
        this.VelocityHistory.AddVelocity(i);
        this.CurrentSpeed = i.Size();
        if (this.State === 0) {
          this.OnCharacterFallInWater(i, this.CurrentWaterLocation, this.CurrentWaterNormal, t, this.CurrentWaterDepth);
        }
        s = this.CurrentWaterNormal;
        this.CurrentWaterNormal.GetSafeNormal(s);
        s = i.DotProduct(s);
        s = Math.sqrt(this.CurrentSpeed * this.CurrentSpeed - s * s);
        if (s = t.FindMoveEffect(this.CurrentWaterDepth, s)) {
          this.SpawnEffect(s.EffectDataPath, s.AudioEffectDataPath, e, true);
        }
        this.CurrentSubConfig = t;
        this.State = 2;
      }
    } else {
      this.SetStateNone(i);
    }
  }
  SetWaterDataEnviDataCheckFly(t, i, e) {
    if (this.IsEnabled && t && this.Owner) {
      this.CurrentWaterDepth = t.WaterDepth;
      this.CurrentWaterNormal.Set(t.HitWaterNormal.X, t.HitWaterNormal.Y, t.HitWaterNormal.Z);
      this.CurrentToWaterHeight = t.CapsuleToWater;
      this.CurrentWaterLocation.Set(i.X, i.Y, t.HitWaterLocation.Z);
      this.IsTraceWater = t.bTraceWater;
      this.IsBlackWave = t.bTouchBlackWave;
      this.VelocityHistory.AddVelocity(e);
      this.CurrentSpeed = e.Size();
      if (this.Owner.CharacterMovement && !this.IsBlackWave) {
        var i = this.OwnerStateComponent?.MoveState;
        this.IsMotorState = false;
        var s = this.Owner.CharacterActorComponent?.Entity?.GetComponent(217);
        if (s?.HasTag(346080557)) {
          this.IsMotorState = true;
        }
        var i = i === CharacterUnifiedStateTypes_1.ECharMoveState.Soar && !t.bInWater || this.IsMotorState && this.CurrentSpeed > MOTOR_EFFECT_SPEED_CLAMP && !s?.HasTag(1566606455) || s?.HasTag(146914653) && s?.HasTag(225676701);
        if (i && this.IsTraceWater) {
          s = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEQUALITY);
          if (!s || s < 2 || Info_1.Info.IsMobilePlatform()) {
            return;
          }
          this.OnCharacterFlyOnWater(e, this.InWaterSubConfig);
        }
      }
      this.FindNoWaterPhysicalMaterial = t.HitPhysicMaterialArray.Contains("DynamicWater");
      if (this.VehicleEffect) {
        this.VehicleEffect.UpdateVehicleEffectData(t, this.IsMotorState, this.VelocityHistory.GetMaxVelocity(), this.IsBlackWave);
      }
    }
  }
  SetStateOnMaterial(t, i, e, s, h, r) {
    if (this.IsEnabled) {
      if (t = this.OnMaterialSubConfig.get(t)) {
        this.CurrentWaterDepth = i;
        this.CurrentWaterLocation.Set(h.X, h.Y, r);
        this.CurrentWaterNormal = e;
        this.VelocityHistory.AddVelocity(s);
        this.CurrentSpeed = s.Size();
        if (this.State === 0) {
          this.OnCharacterFallInWater(s, this.CurrentWaterLocation, e, t, i);
        }
        if (r = t.FindMoveEffect(i, this.CurrentSpeed)) {
          this.SpawnEffect(r.EffectDataPath, r.AudioEffectDataPath, h, true);
        }
        this.CurrentSubConfig = t;
        this.State = 2;
      } else {
        this.SetStateNone(s);
      }
    }
  }
  OnCharacterFallInWater(t, i, e, s, h) {
    if (this.IsEnabled && !(h < s.FallJumpDepthThreshold) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderEffect", 25, "WaterEffect Spawn Fall In Water", ["Owner", this.Owner.GetName()], ["vel", this.VelocityHistory.GetMaxVelocityDirection(Vector_1.Vector.Create(-this.CurrentWaterNormal.X, -this.CurrentWaterNormal.Y, -this.CurrentWaterNormal.Z))]), h = s.FindFallEffectAtSpeed(this.VelocityHistory.GetMaxVelocityDirection(Vector_1.Vector.Create(-this.CurrentWaterNormal.X, -this.CurrentWaterNormal.Y, -this.CurrentWaterNormal.Z))))) {
      s = Vector_1.Vector.Create(i.X + t.X * this.Config.FallJumpPositionFix, i.Y + t.Y * this.Config.FallJumpPositionFix, i.Z);
      this.SpawnFallEffect(h.EffectDataPath, h.AudioEffectDataPath, s, e);
    }
  }
  OnCharacterJumpOutWater(t, i, e, s, h) {
    if (this.IsEnabled && !(h < s.FallJumpDepthThreshold) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderEffect", 25, "WaterEffect Spawn Jump Out of Water", ["Owner", this.Owner.GetName()]), h = s.FindJumpEffectAtSpeed(this.VelocityHistory.GetMaxVelocityDirection(this.CurrentWaterNormal)))) {
      s = Vector_1.Vector.Create(i.X + t.X * this.Config.FallJumpPositionFix, i.Y + t.Y * this.Config.FallJumpPositionFix, i.Z);
      this.SpawnFallEffect(h.EffectDataPath, h.AudioEffectDataPath, s, e);
    }
  }
  StopEffect() {
    const t = this.Handle;
    var i;
    if (t && EffectSystem_1.EffectSystem.IsValid(t)) {
      EffectSystem_1.EffectSystem.HandleSeekToTime(t, -1, false);
      if ((i = this.Config.TimeExistAfterDead * ONE_SECOND) > TimerSystem_1.MIN_TIME) {
        TimerSystem_1.TimerSystem.Delay(() => {
          if (EffectSystem_1.EffectSystem.IsValid(t)) {
            EffectSystem_1.EffectSystem.StopEffectById(t, "[SceneCharacterWaterEffect.StopEffect]", true);
          }
        }, i);
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
  SpawnEffect(t, i, e, s) {
    if ((!EffectSystem_1.EffectSystem.IsValid(this.Handle) || this.HandlePath !== t) && !(this.StopEffect(), !t) && !this.IsBlackWave && !!this.EIData && !this.FindNoWaterPhysicalMaterial && (!!s || !(this.EIData.CapsuleToBlock < this.EIData.CapsuleToWater))) {
      this.EmptyUeTransform.SetLocation(e.ToUeVector());
      this.Handle = EffectSystem_1.EffectSystem.SpawnEffect(this.Owner, this.EmptyUeTransform, t.ToAssetPathName(), "[SceneCharacterWaterEffect.SpawnEffect]", new EffectContext_1.EffectContext(undefined, this.Owner), 0);
      EffectSystem_1.EffectSystem.FreezeHandle(this.Handle, true);
      if (EffectSystem_1.EffectSystem.IsValid(this.Handle)) {
        this.HandlePath = t;
      }
      if (i && (s = i.ToAssetPathName()).length > 0) {
        this.AudioEffectHandle = EffectSystem_1.EffectSystem.SpawnEffect(this.Owner, this.EmptyUeTransform, s, "[SceneCharacterWaterEffect.SpawnEffect(Audio)]", new EffectContext_1.EffectContext(undefined, this.Owner), 0);
      }
    }
  }
  SpawnFallEffect(t, i, e, s) {
    if (!t || this.IsBlackWave || this.FindNoWaterPhysicalMaterial) {
      return -1;
    }
    var h = this.Owner?.CharacterActorComponent?.Entity?.GetComponent(189);
    if (h) {
      var r = Vector_1.Vector.Create(this.CurrentWaterNormal.X, this.CurrentWaterNormal.Y, -this.CurrentWaterNormal.Z);
      if (h.GravityDirect.DotProduct(r) < WATER_NORMAL_DOT_CHECK) {
        return -1;
      }
      if (Math.abs(h.GravityDirect.Z) < 1 - MathCommon_1.MathCommon.ThreshPointOnPlane) {
        return -1;
      }
    }
    if (this.IsMotorState && this.VehicleEffect) {
      this.VehicleEffect.OnFallInWater(e, s);
      return -1;
    }
    this.EmptyUeTransform.SetLocation(e.ToUeVector(true));
    this.EmptyUeTransform.SetRotation(UE.KismetMathLibrary.D_MakeRotFromZ(s.ToUeVector(true)).Quaternion());
    r = t.ToAssetPathName();
    h = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, this.EmptyUeTransform, r, "[SceneCharacterWaterEffect.SpawnFallEffect]", new EffectContext_1.EffectContext(undefined, this.Owner));
    if (i && (e = i.ToAssetPathName()).length > 0) {
      EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, this.EmptyUeTransform, e, "[SceneCharacterWaterEffect.SpawnFallEffect(Audio)]", undefined, 0);
    }
    return h;
  }
  OnCharacterFlyOnWater(i, e) {
    if (this.IsEnabled && !this.FindNoWaterPhysicalMaterial && !(this.CurrentToWaterHeight > e.FlyEffectHeightThreshold)) {
      var t = e.FindFlyEffectAtSpeed(this.VelocityHistory.GetMaxVelocity());
      if (t) {
        var s = this.Owner?.CharacterActorComponent?.Entity?.GetComponent(189);
        if (s) {
          var h = Vector_1.Vector.Create(this.CurrentWaterNormal.X, this.CurrentWaterNormal.Y, -this.CurrentWaterNormal.Z);
          if (s.GravityDirect.DotProduct(h) < WATER_NORMAL_DOT_CHECK) {
            return;
          }
        }
        var h = Vector_1.Vector.Create(this.CurrentWaterLocation.X + i.X * FLYEFFECT_VELOCITY_XY_OFFSET_SCALE, this.CurrentWaterLocation.Y + i.Y * FLYEFFECT_VELOCITY_XY_OFFSET_SCALE, this.CurrentWaterLocation.Z);
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
          (r = h).AdditionEqual(i.MultiplyEqual(0.1));
          this.ShoreTraceHandle = this.Q61(r);
        }
        var r = Rotator_1.Rotator.Create();
        if (s) {
          s = Vector_1.Vector.Create(-s.GravityDirect.X, -s.GravityDirect.Y, -s.GravityDirect.Z);
          MathUtils_1.MathUtils.LookRotationUpFirst(i, s, r);
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
          i = new EffectParameterNiagara_1.EffectParameterNiagara();
          i.UserParameterFloat = [];
          i.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("DistanceToWater"), this.CurrentToWaterHeight]);
          let t = 1;
          if (e.FallJumpDepthThreshold > 0) {
            t = Math.min(0.8, this.CurrentWaterDepth / e.FallJumpDepthThreshold);
          }
          i.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpriteScale"), t]);
          EffectSystem_1.EffectSystem.SetEffectParameterNiagara(this.FlyWaterHandle, i);
        }
      }
    }
  }
  Q61(t) {
    var i = this.Owner?.CharacterActorComponent?.Entity?.GetComponent(189);
    var e = Vector_1.Vector.Create(-FLYEFFECT_SHORE_TRACE_START_OFFSET * i.GravityDirect.X + t.X, -FLYEFFECT_SHORE_TRACE_START_OFFSET * i.GravityDirect.Y + t.Y, -FLYEFFECT_SHORE_TRACE_START_OFFSET * i.GravityDirect.Z + t.Z);
    var i = Vector_1.Vector.Create(-FLYEFFECT_SHORE_TRACE_END_OFFSET * i.GravityDirect.X + t.X, -FLYEFFECT_SHORE_TRACE_END_OFFSET * i.GravityDirect.Y + t.Y, -FLYEFFECT_SHORE_TRACE_END_OFFSET * i.GravityDirect.Z + t.Z);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.ShoreTraceElement, e);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.ShoreTraceElement, i);
    return TraceElementCommon_1.TraceElementCommon.AsyncSphereTrace(this.ShoreTraceElement, "WaterEffect_ShoreTrace", this.ShoreTraceDelegate);
  }
}
exports.SceneCharacterWaterEffect = SceneCharacterWaterEffect;
//# sourceMappingURL=SceneCharacterWaterEffect.js.map