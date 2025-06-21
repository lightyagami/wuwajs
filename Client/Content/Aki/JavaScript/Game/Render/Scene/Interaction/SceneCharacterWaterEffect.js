"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SceneCharacterWaterEffect = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
  EffectParameterNiagara_1 = require("../../../Effect/EffectParameter/EffectParameterNiagara"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager"),
  GlobalData_1 = require("../../../GlobalData"),
  CharacterBuffIds_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  RenderDataManager_1 = require("../../Data/RenderDataManager"),
  ONE_SECOND = 1e3,
  FLYEFFECT_VELOCITY_XY_OFFSET_SCALE = .3,
  FLYEFFECT_RIPPLEWATER_XY_OFFSET_SCALE = 1.1,
  FLYEFFECT_SHORE_TRACE_START_OFFSET = 500,
  FLYEFFECT_SHORE_TRACE_END_OFFSET = -3e3,
  WATER_NORMAL_DOT_CHECK = .2;
class WaterEffectItem {
  constructor() {
    this.SpeedThreshold = 0, this.EffectDataPath = void 0, this.AudioEffectDataPath = void 0
  }
  Init(t) {
    this.SpeedThreshold = t.Speed, this.EffectDataPath = t.EffectDataRef, this.AudioEffectDataPath = t.AudioEffectDataRef
  }
}
class WaterEffectGroup {
  constructor() {
    this.WaterDepthThreshold = 0, this.EffectItems = []
  }
  FindEffectAtSpeed(t) {
    let e = 0;
    for (; e < this.EffectItems.length && !(t < this.EffectItems[e].SpeedThreshold); ++e);
    if (0 !== e) return this.EffectItems[e - 1]
  }
  Init(e) {
    this.WaterDepthThreshold = e.WaterDepth;
    var i = e.EffectConfig.Num();
    this.EffectItems.length = i;
    for (let t = 0; t < i; t++) this.EffectItems[t] = new WaterEffectItem, this.EffectItems[t].Init(e.EffectConfig.Get(t))
  }
}
class WaterEffectSubConfig {
  constructor() {
    this.MoveEffects = [], this.FallEffects = [], this.JumpEffects = [], this.FlyEffects = [], this.FallJumpDepthThreshold = 0, this.TriggerInGrass = !1, this.FlyEffectHeightThreshold = 0
  }
  FindMoveEffect(t, e) {
    let i = 0;
    for (; i < this.MoveEffects.length && !(t < this.MoveEffects[i].WaterDepthThreshold); ++i);
    if (0 !== i) return this.MoveEffects[i - 1].FindEffectAtSpeed(e)
  }
  FindFallEffectAtSpeed(t) {
    let e = 0;
    for (; e < this.FallEffects.length && !(t < this.FallEffects[e].SpeedThreshold); ++e);
    if (0 !== e) return this.FallEffects[e - 1]
  }
  FindJumpEffectAtSpeed(t) {
    let e = 0;
    for (; e < this.JumpEffects.length && !(t < this.JumpEffects[e].SpeedThreshold); ++e);
    if (0 !== e) return this.JumpEffects[e - 1]
  }
  FindFlyEffectAtSpeed(t) {
    let e = 0;
    for (; e < this.FlyEffects.length && !(t < this.FlyEffects[e].SpeedThreshold); ++e);
    if (0 !== e) return this.FlyEffects[e - 1]
  }
  Init(e) {
    var i = e.MoveEffects.Num();
    this.MoveEffects.length = i;
    for (let t = 0; t < i; t++) this.MoveEffects[t] = new WaterEffectGroup, this.MoveEffects[t].Init(e.MoveEffects.Get(t));
    var s = e.FallEffects.Num();
    this.FallEffects.length = s;
    for (let t = 0; t < s; t++) this.FallEffects[t] = new WaterEffectItem, this.FallEffects[t].Init(e.FallEffects.Get(t));
    var h = e.JumpEffects.Num();
    this.JumpEffects.length = h;
    for (let t = 0; t < h; t++) this.JumpEffects[t] = new WaterEffectItem, this.JumpEffects[t].Init(e.JumpEffects.Get(t));
    var r = e.FlyEffects.Num();
    this.FlyEffects.length = r;
    for (let t = 0; t < r; t++) this.FlyEffects[t] = new WaterEffectItem, this.FlyEffects[t].Init(e.FlyEffects.Get(t));
    this.FallJumpDepthThreshold = e.FallJumpDepthThreshold, this.TriggerInGrass = e.TriggerInGrass, this.FlyEffectHeightThreshold = e.FlyEffectTriggerHeight
  }
}
class VelocityHistoryCache {
  constructor() {
    this.VelocityHistory = [], this.VelocityHistoryArrayPtr = 0
  }
  Initialize(e) {
    this.VelocityHistory.length = e;
    for (let t = 0; t < e; t++) this.VelocityHistory[t] = Vector_1.Vector.Create(0, 0, 0)
  }
  AddVelocity(t) {
    this.VelocityHistory[this.VelocityHistoryArrayPtr].Set(t.X, t.Y, t.Z), this.VelocityHistoryArrayPtr = (this.VelocityHistoryArrayPtr + 1) % this.VelocityHistory.length
  }
  GetMaxVelocityDirection(t) {
    let e = 0;
    for (const i of this.VelocityHistory) e = Math.max(e, i.DotProduct(t));
    return e
  }
  GetMaxVelocity() {
    let t = 0;
    for (const e of this.VelocityHistory) t = Math.max(t, e.Size());
    return t
  }
}
class SceneCharacterWaterEffect {
  constructor() {
    this.Config = void 0, this.Owner = void 0, this.OwnerStateComponent = void 0, this.OwnerHeight = 0, this.IsReady = !1, this.State = 0, this.CurrentSubConfig = void 0, this.InWaterSubConfig = new WaterEffectSubConfig, this.SwimIdleEffect = void 0, this.SwimNormalEffect = void 0, this.SwimFastEffect = void 0, this.OnMaterialSubConfig = new Map, this.Handle = 0, this.AudioEffectHandle = 0, this.HandlePath = void 0, this.CurrentSpeed = 0, this.CurrentWaterLocation = Vector_1.Vector.Create(), this.CurrentWaterNormal = Vector_1.Vector.Create(), this.CurrentWaterDepth = 0, this.VelocityHistory = new VelocityHistoryCache, this.CurrentToWaterHeight = 0, this.FlyWaterHandle = 0, this.IsTraceWater = !1, this.EmptyUeTransform = new UE.TransformDouble, this.RippleSwim = void 0, this.ShoreTraceElement = void 0, this.ShoreTraceHandle = void 0, this.ShoreTraceDelegate = void 0, this.ShoreTraceTicker = 0, this.IsTracedShore = !1, this.u61 = (t, e, i, s) => {
      this.ShoreTraceHandle && this.ShoreTraceHandle.Frame > i || this.ShoreTraceHandle && this.ShoreTraceHandle.Frame === i && this.ShoreTraceHandle.Index > s || (t ? (this.IsTracedShore && Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderEffect", 83, "LLX  TraceChange True to False"), this.IsTracedShore = !1) : (this.IsTracedShore || Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderEffect", 83, "LLX  TraceChange False to True"), this.IsTracedShore = !0))
    }, this.IsEnabled = !1
  }
  Start(t) {
    if (this.Config?.IsValid() && t) {
      this.Owner = t, this.OwnerHeight = this.Owner.CapsuleComponent ? 2 * this.Owner.CapsuleComponent.CapsuleHalfHeight : 0, this.InWaterSubConfig.Init(this.Config.WaterEffectConfig), this.SwimIdleEffect = this.Config.SwimIdleEffectRef, this.SwimNormalEffect = this.Config.SwimNormalEffectRef, this.SwimFastEffect = this.Config.SwimFastEffectRef;
      var e = this.Config.MaterialEffectConfig.Num();
      for (let t = 0; t < e; t++) {
        var i, s = this.Config.MaterialEffectConfig.GetKey(t),
          h = this.Config.MaterialEffectConfig.Get(s);
        h && ((i = new WaterEffectSubConfig).Init(h), this.OnMaterialSubConfig.set(s, i))
      }
      this.VelocityHistory.Initialize(12), this.IsReady = !0, Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderEffect", 25, "WaterEffect Start", ["Owner", t.GetName()])
    }
  }
  Enable() {
    this.IsReady && (this.OwnerStateComponent = this.Owner.CharacterActorComponent?.Entity?.GetComponent(175), this.IsEnabled = !0, this.ShoreTraceElement = UE.NewObject(UE.TraceSphereElement.StaticClass()), this.ShoreTraceElement.bIsSingle = !0, this.ShoreTraceElement.bTraceComplex = !1, this.ShoreTraceElement.bIgnoreSelf = !0, this.ShoreTraceElement.WorldContextObject = this.Owner, this.ShoreTraceElement.Radius = 50, this.ShoreTraceElement.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water), 0 < UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.Kuro.InteractionEffect.IESystemDebugDraw") && (this.ShoreTraceElement.SetDrawDebugTrace(1), TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.ShoreTraceElement, new UE.LinearColor(255, 255, 0, 1)), TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.ShoreTraceElement, new UE.LinearColor(0, 255, 0, 1))), this.ShoreTraceDelegate = (0, puerts_1.toManualReleaseDelegate)(this.u61), Log_1.Log.CheckInfo()) && Log_1.Log.Info("RenderEffect", 25, "WaterEffect Enabled", ["Owner", this.Owner.GetName()])
  }
  Disable() {
    this.IsEnabled && (EffectSystem_1.EffectSystem.IsValid(this.Handle) && (EffectSystem_1.EffectSystem.StopEffectById(this.Handle, "[SceneCharacterWaterEffect.Disable]", !0), this.Handle = 0), EffectSystem_1.EffectSystem.IsValid(this.AudioEffectHandle) && (EffectSystem_1.EffectSystem.StopEffectById(this.AudioEffectHandle, "[SceneCharacterWaterEffect.Disable]", !0), this.AudioEffectHandle = 0), this.IsEnabled = !1, this.ShoreTraceElement?.Dispose(), (this.ShoreTraceElement = void 0, puerts_1.releaseManualReleaseDelegate)(this.u61), Log_1.Log.CheckInfo()) && Log_1.Log.Info("RenderEffect", 25, "WaterEffect Disabled", ["Owner", this.Owner.GetName()])
  }
  Tick() {
    if (this.IsEnabled) {
      var t, e, i = this.Owner.CharacterActorComponent?.Entity?.GetComponent(178);
      if (i) {
        var s = Vector_1.Vector.Create(this.CurrentWaterNormal.X, this.CurrentWaterNormal.Y, -this.CurrentWaterNormal.Z);
        if (i.GravityDirect.DotProduct(s) < WATER_NORMAL_DOT_CHECK) return
      }
      void 0 !== (this.Owner.CharacterActorComponent?.Entity?.GetComponent(174))?.GetBuffById(CharacterBuffIds_1.buffId.ElevatorBuff) || (this.Owner.CharacterActorComponent?.Entity?.GetComponent(205))?.HasTag(-1921814084) || (EffectSystem_1.EffectSystem.IsValid(this.Handle) && (EffectSystem_1.EffectSystem.HandleSeekToTime(this.Handle, this.CurrentSpeed, !1), i = EffectSystem_1.EffectSystem.GetEffectActor(this.Handle), (s = this.CurrentWaterLocation).X = this.Owner.D_K2_GetActorLocation().X, s.Y = this.Owner.D_K2_GetActorLocation().Y, i.D_K2_SetActorLocation(s.ToUeVector(!0), !1, void 0, !0), s = this.CurrentWaterNormal.ToUeVector(!0), e = this.Owner.D_GetActorForwardVector(), t = UE.KismetMathLibrary.D_Cross_VectorVector(s, e), e = UE.KismetMathLibrary.D_Cross_VectorVector(t, s), i.K2_SetActorRotation(UE.KismetMathLibrary.D_MakeRotationFromAxes(e, t, s), !0), EffectSystem_1.EffectSystem.IsValid(this.AudioEffectHandle)) && EffectSystem_1.EffectSystem.GetEffectActor(this.AudioEffectHandle).D_K2_SetActorLocation(this.CurrentWaterLocation.ToUeVector(!0), !1, void 0, !0), 0 < this.OwnerHeight && (i = MathUtils_1.MathUtils.Clamp(this.CurrentWaterDepth / this.OwnerHeight, 0, 1), AudioSystem_1.AudioSystem.SetRtpcValue("amb_water_depth", i, {
        Actor: this.Owner
      })))
    }
  }
  IsMaterialInUse(t) {
    return !!this.OnMaterialSubConfig.has(t) && (!this.OnMaterialSubConfig.get(t).TriggerInGrass || RenderDataManager_1.RenderDataManager.Get().GetPlayerInGrass())
  }
  SetStateNone(t) {
    this.IsEnabled && (this.VelocityHistory.AddVelocity(t), this.CurrentSpeed = t.Size(), 0 !== this.State) && (this.CurrentSubConfig && this.OnCharacterJumpOutWater(t, this.CurrentWaterLocation, this.CurrentWaterNormal, this.CurrentSubConfig, this.CurrentWaterDepth), this.StopEffect(), this.CurrentSubConfig = void 0, this.State = 0)
  }
  SetStateInWater(t, e, i, s, h) {
    var r;
    this.IsEnabled && ((r = this.Owner.CharacterActorComponent?.Entity?.GetComponent(229)) && r.IsOnVehicle ? this.SetStateNone(i) : (this.CurrentWaterDepth = t, this.CurrentWaterLocation.Set(s.X, s.Y, h), this.CurrentWaterNormal = e, this.VelocityHistory.AddVelocity(i), this.CurrentSpeed = i.Size(), 0 === this.State && this.OnCharacterFallInWater(i, this.CurrentWaterLocation, e, this.InWaterSubConfig, t), (r = this.OwnerStateComponent?.MoveState) === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim ? this.SpawnEffect(this.SwimNormalEffect, void 0, s, e) : r === CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim ? this.SpawnEffect(this.SwimFastEffect, void 0, s, e) : (h = this.InWaterSubConfig.FindMoveEffect(t, this.CurrentSpeed)) ? this.SpawnEffect(h.EffectDataPath, h.AudioEffectDataPath, s, e) : t > this.InWaterSubConfig.FallJumpDepthThreshold && r === CharacterUnifiedStateTypes_1.ECharMoveState.Other ? this.SpawnEffect(this.SwimIdleEffect, void 0, s, e) : this.StopEffect(), this.CurrentSubConfig = this.InWaterSubConfig, this.State = 1))
  }
  SetStateInWaterEnviData(t, e, i) {
    var s;
    this.IsEnabled && t && ((s = this.Owner.CharacterActorComponent?.Entity?.GetComponent(229)) && s.IsOnVehicle ? this.SetStateNone(e) : (this.CurrentWaterDepth = t.WaterDepth, this.CurrentWaterLocation.Set(i.X, i.Y, t.HitWaterLocation.Z), this.CurrentWaterNormal.Set(t.HitWaterNormal.X, t.HitWaterNormal.Y, t.HitWaterNormal.Z), this.VelocityHistory.AddVelocity(e), this.CurrentSpeed = e.Size(), 0 === this.State && this.OnCharacterFallInWater(e, this.CurrentWaterLocation, this.CurrentWaterNormal, this.InWaterSubConfig, this.CurrentWaterDepth), (s = this.OwnerStateComponent?.MoveState) === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim ? this.SpawnEffect(this.SwimNormalEffect, void 0, i, this.CurrentWaterNormal) : s === CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim ? this.SpawnEffect(this.SwimFastEffect, void 0, i, this.CurrentWaterNormal) : (t = this.CurrentWaterNormal, this.CurrentWaterNormal.GetSafeNormal(t), e = e.DotProduct(t), t = Math.sqrt(this.CurrentSpeed * this.CurrentSpeed - e * e), (e = this.InWaterSubConfig.FindMoveEffect(this.CurrentWaterDepth, t)) ? this.SpawnEffect(e.EffectDataPath, e.AudioEffectDataPath, i, this.CurrentWaterNormal) : this.CurrentWaterDepth > this.InWaterSubConfig.FallJumpDepthThreshold && s === CharacterUnifiedStateTypes_1.ECharMoveState.Other ? this.SpawnEffect(this.SwimIdleEffect, void 0, i, this.CurrentWaterNormal) : this.StopEffect()), this.CurrentSubConfig = this.InWaterSubConfig, this.State = 1))
  }
  SetStateOnMaterialEnviData(t, e, i, s) {
    this.IsEnabled && s && ((t = this.OnMaterialSubConfig.get(t)) ? (this.CurrentWaterDepth = s.WaterDepth, this.CurrentWaterLocation.Set(i.X, i.Y, s.HitWaterLocation.Z), this.CurrentWaterNormal.Set(s.HitWaterNormal.X, s.HitWaterNormal.Y, s.HitWaterNormal.Z), this.VelocityHistory.AddVelocity(e), this.CurrentSpeed = e.Size(), 0 === this.State && this.OnCharacterFallInWater(e, this.CurrentWaterLocation, this.CurrentWaterNormal, t, this.CurrentWaterDepth), s = this.CurrentWaterNormal, this.CurrentWaterNormal.GetSafeNormal(s), s = e.DotProduct(s), s = Math.sqrt(this.CurrentSpeed * this.CurrentSpeed - s * s), (s = t.FindMoveEffect(this.CurrentWaterDepth, s)) && this.SpawnEffect(s.EffectDataPath, s.AudioEffectDataPath, i, this.CurrentWaterNormal), this.CurrentSubConfig = t, this.State = 2) : this.SetStateNone(e))
  }
  SetWaterDataEnviDataCheckFly(t, e, i) {
    this.IsEnabled && t && !Info_1.Info.IsMobilePlatform() && this.Owner && (this.CurrentWaterDepth = t.WaterDepth, this.CurrentWaterNormal.Set(t.HitWaterNormal.X, t.HitWaterNormal.Y, t.HitWaterNormal.Z), this.CurrentToWaterHeight = t.CapsuleToWater, this.CurrentWaterLocation.Set(e.X, e.Y, t.HitWaterLocation.Z), this.IsTraceWater = t.bTraceWater, !this.Owner.CharacterMovement || this.OwnerStateComponent?.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Soar || !this.IsTraceWater || !(e = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEQUALITY)) || e < 2 || t.bInWater || this.OnCharacterFlyOnWater(i, this.InWaterSubConfig))
  }
  SetStateOnMaterial(t, e, i, s, h, r) {
    this.IsEnabled && ((t = this.OnMaterialSubConfig.get(t)) ? (this.CurrentWaterDepth = e, this.CurrentWaterLocation.Set(h.X, h.Y, r), this.CurrentWaterNormal = i, this.VelocityHistory.AddVelocity(s), this.CurrentSpeed = s.Size(), 0 === this.State && this.OnCharacterFallInWater(s, this.CurrentWaterLocation, i, t, e), (r = t.FindMoveEffect(e, this.CurrentSpeed)) && this.SpawnEffect(r.EffectDataPath, r.AudioEffectDataPath, h, i), this.CurrentSubConfig = t, this.State = 2) : this.SetStateNone(s))
  }
  OnCharacterFallInWater(t, e, i, s, h) {
    this.IsEnabled && !(h < s.FallJumpDepthThreshold) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderEffect", 25, "WaterEffect Spawn Fall In Water", ["Owner", this.Owner.GetName()], ["vel", this.VelocityHistory.GetMaxVelocityDirection(Vector_1.Vector.Create(-this.CurrentWaterNormal.X, -this.CurrentWaterNormal.Y, -this.CurrentWaterNormal.Z))]), h = s.FindFallEffectAtSpeed(this.VelocityHistory.GetMaxVelocityDirection(Vector_1.Vector.Create(-this.CurrentWaterNormal.X, -this.CurrentWaterNormal.Y, -this.CurrentWaterNormal.Z)))) && (s = Vector_1.Vector.Create(e.X + t.X * this.Config.FallJumpPositionFix, e.Y + t.Y * this.Config.FallJumpPositionFix, e.Z), this.SpawnFallEffect(h.EffectDataPath, h.AudioEffectDataPath, s, i))
  }
  OnCharacterJumpOutWater(t, e, i, s, h) {
    this.IsEnabled && !(h < s.FallJumpDepthThreshold) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderEffect", 25, "WaterEffect Spawn Jump Out of Water", ["Owner", this.Owner.GetName()]), h = s.FindJumpEffectAtSpeed(this.VelocityHistory.GetMaxVelocityDirection(this.CurrentWaterNormal))) && (s = Vector_1.Vector.Create(e.X + t.X * this.Config.FallJumpPositionFix, e.Y + t.Y * this.Config.FallJumpPositionFix, e.Z), this.SpawnFallEffect(h.EffectDataPath, h.AudioEffectDataPath, s, i))
  }
  StopEffect() {
    const t = this.Handle;
    var e;
    t && EffectSystem_1.EffectSystem.IsValid(t) && (EffectSystem_1.EffectSystem.HandleSeekToTime(t, -1, !1), (e = this.Config.TimeExistAfterDead * ONE_SECOND) > TimerSystem_1.MIN_TIME ? TimerSystem_1.TimerSystem.Delay(() => {
      EffectSystem_1.EffectSystem.IsValid(t) && EffectSystem_1.EffectSystem.StopEffectById(t, "[SceneCharacterWaterEffect.StopEffect]", !0)
    }, e) : TimerSystem_1.TimerSystem.Next(() => {
      EffectSystem_1.EffectSystem.StopEffectById(t, "[SceneCharacterWaterEffect.StopEffect]", !0)
    })), this.Handle = 0, EffectSystem_1.EffectSystem.IsValid(this.AudioEffectHandle) && EffectSystem_1.EffectSystem.StopEffectById(this.AudioEffectHandle, "[SceneCharacterWaterEffect.StopEffect]", !0), this.AudioEffectHandle = 0
  }
  SpawnEffect(t, e, i, s) {
    EffectSystem_1.EffectSystem.IsValid(this.Handle) && this.HandlePath === t || (this.StopEffect(), t && (this.EmptyUeTransform.SetLocation(i.ToUeVector()), this.Handle = EffectSystem_1.EffectSystem.SpawnEffect(this.Owner, this.EmptyUeTransform, t.ToAssetPathName(), "[SceneCharacterWaterEffect.SpawnEffect]", new EffectContext_1.EffectContext(void 0, this.Owner), 0), EffectSystem_1.EffectSystem.FreezeHandle(this.Handle, !0), EffectSystem_1.EffectSystem.IsValid(this.Handle) && (this.HandlePath = t), e) && 0 < (i = e.ToAssetPathName()).length && (this.AudioEffectHandle = EffectSystem_1.EffectSystem.SpawnEffect(this.Owner, this.EmptyUeTransform, i, "[SceneCharacterWaterEffect.SpawnEffect(Audio)]", new EffectContext_1.EffectContext(void 0, this.Owner), 0)))
  }
  SpawnFallEffect(t, e, i, s) {
    if (!t) return -1;
    var h = this.Owner?.CharacterActorComponent?.Entity?.GetComponent(178);
    if (h) {
      var r = Vector_1.Vector.Create(this.CurrentWaterNormal.X, this.CurrentWaterNormal.Y, -this.CurrentWaterNormal.Z);
      if (h.GravityDirect.DotProduct(r) < WATER_NORMAL_DOT_CHECK) return -1;
      if (Math.abs(h.GravityDirect.Z) < 1 - MathCommon_1.MathCommon.ThreshPointOnPlane) return -1
    }
    this.EmptyUeTransform.SetLocation(i.ToUeVector(!0)), this.EmptyUeTransform.SetRotation(UE.KismetMathLibrary.D_MakeRotFromZ(s.ToUeVector(!0)).Quaternion());
    r = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, this.EmptyUeTransform, t.ToAssetPathName(), "[SceneCharacterWaterEffect.SpawnFallEffect]", new EffectContext_1.EffectContext(void 0, this.Owner));
    return e && 0 < (h = e.ToAssetPathName()).length && EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, this.EmptyUeTransform, h, "[SceneCharacterWaterEffect.SpawnFallEffect(Audio)]", void 0, 0), r
  }
  OnCharacterFlyOnWater(e, i) {
    if (this.IsEnabled && !(this.CurrentToWaterHeight > i.FlyEffectHeightThreshold)) {
      var t = i.FindFlyEffectAtSpeed(this.VelocityHistory.GetMaxVelocity());
      if (t) {
        var s = this.Owner?.CharacterActorComponent?.Entity?.GetComponent(178);
        if (s) {
          var h = Vector_1.Vector.Create(this.CurrentWaterNormal.X, this.CurrentWaterNormal.Y, -this.CurrentWaterNormal.Z);
          if (s.GravityDirect.DotProduct(h) < WATER_NORMAL_DOT_CHECK) return
        }
        var h = Vector_1.Vector.Create(this.CurrentWaterLocation.X + e.X * FLYEFFECT_VELOCITY_XY_OFFSET_SCALE, this.CurrentWaterLocation.Y + e.Y * FLYEFFECT_VELOCITY_XY_OFFSET_SCALE, this.CurrentWaterLocation.Z),
          r = (!this.RippleSwim && this.Owner && (this.RippleSwim = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetActorOfClass(this.Owner, UE.BP_RippleSwim_C.StaticClass())), this.RippleSwim && (r = this.RippleSwim.CurrentRippleCenter.GetSafeNormal(MathCommon_1.MathCommon.SmallNumber), h.X = this.CurrentWaterLocation.X + this.RippleSwim.CurrentRippleCenter.X + r.X * this.RippleSwim.PlayerSize * FLYEFFECT_RIPPLEWATER_XY_OFFSET_SCALE, h.Y = this.CurrentWaterLocation.Y + this.RippleSwim.CurrentRippleCenter.Y + r.Y * this.RippleSwim.PlayerSize * FLYEFFECT_RIPPLEWATER_XY_OFFSET_SCALE), this.ShoreTraceTicker += 1, 3 <= this.ShoreTraceTicker && s && (this.ShoreTraceTicker = 0, (r = h).AdditionEqual(e.MultiplyEqual(.1)), this.ShoreTraceHandle = this.c61(r)), Rotator_1.Rotator.Create());
        if (s && (s = Vector_1.Vector.Create(-s.GravityDirect.X, -s.GravityDirect.Y, -s.GravityDirect.Z), MathUtils_1.MathUtils.LookRotationUpFirst(e, s, r)), r.Yaw = r.Yaw + 90, this.EmptyUeTransform.SetLocation(h.ToUeVector()), this.EmptyUeTransform.SetRotation(r.ToUeRotator().Quaternion()), !EffectSystem_1.EffectSystem.IsValid(this.FlyWaterHandle) && t.EffectDataPath) {
          this.FlyWaterHandle = EffectSystem_1.EffectSystem.SpawnEffect(this.Owner, this.EmptyUeTransform, t.EffectDataPath?.ToAssetPathName(), "[SceneCharacterWaterEffect.SpawnEffect(FlyWaterEffect)]", new EffectContext_1.EffectContext(void 0, this.Owner), 3);
          const a = EffectSystem_1.EffectSystem.GetEffectActor(this.FlyWaterHandle);
          Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderEffect", 83, "WaterEffect Spawn Fly on Water", ["WaterEffectActor", a?.D_K2_GetActorLocation()])
        }
        const a = EffectSystem_1.EffectSystem.GetEffectActor(this.FlyWaterHandle);
        if (a && this.IsTraceWater && !this.IsTracedShore) {
          a.D_K2_SetActorTransform(this.EmptyUeTransform, !1, void 0, !1);
          e = new EffectParameterNiagara_1.EffectParameterNiagara;
          e.UserParameterFloat = [], e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("DistanceToWater"), this.CurrentToWaterHeight]);
          let t = 1;
          0 < i.FallJumpDepthThreshold && (t = Math.min(.8, this.CurrentWaterDepth / i.FallJumpDepthThreshold)), e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpriteScale"), t]), EffectSystem_1.EffectSystem.SetEffectParameterNiagara(this.FlyWaterHandle, e)
        }
      }
    }
  }
  c61(t) {
    var e = this.Owner?.CharacterActorComponent?.Entity?.GetComponent(178),
      i = Vector_1.Vector.Create(-FLYEFFECT_SHORE_TRACE_START_OFFSET * e.GravityDirect.X + t.X, -FLYEFFECT_SHORE_TRACE_START_OFFSET * e.GravityDirect.Y + t.Y, -FLYEFFECT_SHORE_TRACE_START_OFFSET * e.GravityDirect.Z + t.Z),
      e = Vector_1.Vector.Create(-FLYEFFECT_SHORE_TRACE_END_OFFSET * e.GravityDirect.X + t.X, -FLYEFFECT_SHORE_TRACE_END_OFFSET * e.GravityDirect.Y + t.Y, -FLYEFFECT_SHORE_TRACE_END_OFFSET * e.GravityDirect.Z + t.Z);
    return TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.ShoreTraceElement, i), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.ShoreTraceElement, e), TraceElementCommon_1.TraceElementCommon.AsyncSphereTrace(this.ShoreTraceElement, "WaterEffect_ShoreTrace", this.ShoreTraceDelegate)
  }
}
exports.SceneCharacterWaterEffect = SceneCharacterWaterEffect;
//# sourceMappingURL=SceneCharacterWaterEffect.js.map