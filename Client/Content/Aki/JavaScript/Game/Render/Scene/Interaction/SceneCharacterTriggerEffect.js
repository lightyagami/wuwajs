"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SceneCharacterTriggerEffect = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
  EffectParameterNiagara_1 = require("../../../Effect/EffectParameter/EffectParameterNiagara"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  DELAY_OUT_BUSH_EFFECT = 1e3,
  BUSH_WALK_EFFCT = "/Game/Aki/Effect/DataAsset/Niagara/Common/Interaction/DA_Fx_HideOnBush_Loop.DA_Fx_HideOnBush_Loop",
  BUSH_OUT_EFFCT = "/Game/Aki/Effect/DataAsset/Niagara/Common/Interaction/DA_Fx_HideOnBush_Out.DA_Fx_HideOnBush_Out",
  BUSH_IN_EFFCT = "/Game/Aki/Effect/DataAsset/Niagara/Common/Interaction/DA_Fx_HideOnBush_RushIn.DA_Fx_HideOnBush_RushIn";
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
}
class SceneCharacterTriggerEffect {
  constructor() {
    this.Owner = void 0, this.OwnerStateComponent = void 0, this.CueComponent = void 0, this.Data = void 0, this.CacheHideOnBush = !1, this.CacheBushLUTIndex = 0, this.CacheHitBushLocation = Vector_1.Vector.Create(), this.CacheHitBushEffectParam = void 0, this.IsReady = !1, this.BushEffectHandle = 0, this.CurrentVelocity = new UE.VectorDouble, this.EmptyUeTransform = new UE.TransformDouble, this.VelocityHistory = new VelocityHistoryCache, this.IsEnabled = !1
  }
  Start(t) {
    t && (this.Owner = t, this.IsReady = !0, this.VelocityHistory.Initialize(12), Log_1.Log.CheckInfo()) && Log_1.Log.Info("RenderEffect", 83, "TriggerEffect Start", ["Owner", t.GetName()])
  }
  Enable() {
    this.IsReady && (this.OwnerStateComponent = this.Owner.CharacterActorComponent?.Entity?.GetComponent(175), this.IsEnabled = !0, Log_1.Log.CheckInfo()) && Log_1.Log.Info("RenderEffect", 83, "TriggerEffect Enabled", ["Owner", this.Owner.GetName()])
  }
  Disable() {
    this.IsEnabled && (EffectSystem_1.EffectSystem.IsValid(this.BushEffectHandle) && (EffectSystem_1.EffectSystem.StopEffectById(this.BushEffectHandle, "[SceneCharacterTriggerEffect.Disable]", !0), this.BushEffectHandle = 0), this.IsEnabled = !1, Log_1.Log.CheckInfo()) && Log_1.Log.Info("RenderEffect", 83, "TriggerEffect Disabled", ["Owner", this.Owner.GetName()])
  }
  Tick() {
    if (this.IsEnabled && this.Data && this.Owner) {
      if (this.CurrentVelocity = this.Owner.D_GetVelocity(), this.VelocityHistory.AddVelocity(Vector_1.Vector.Create(this.CurrentVelocity.X, this.CurrentVelocity.Y, this.CurrentVelocity.Z)), this.Data.bHideOnBush) {
        if (EffectSystem_1.EffectSystem.IsValid(this.BushEffectHandle)) {
          EffectSystem_1.EffectSystem.HandleSeekToTime(this.BushEffectHandle, this.CurrentVelocity.Size(), !1);
          var t = EffectSystem_1.EffectSystem.GetEffectActor(this.BushEffectHandle),
            e = (EffectSystem_1.EffectSystem.GetEffectModel(this.BushEffectHandle), new UE.VectorDouble(this.Owner.D_K2_GetActorLocation().X, this.Owner.D_K2_GetActorLocation().Y, this.Data.TriggerHitPoint.Z)),
            e = (t.D_K2_SetActorLocation(e, !1, void 0, !0), this.Owner.CharacterActorComponent?.Entity?.GetComponent(178));
          if (!e) return;
          var e = Vector_1.Vector.Create(-e.GravityDirect.X, -e.GravityDirect.Y, -e.GravityDirect.Z).ToUeVector(!0),
            i = this.Owner.D_GetActorForwardVector(),
            s = UE.KismetMathLibrary.D_Cross_VectorVector(e, i),
            i = UE.KismetMathLibrary.D_Cross_VectorVector(s, e);
          t.K2_SetActorRotation(UE.KismetMathLibrary.D_MakeRotationFromAxes(i, s, e), !0)
        } else this.EmptyUeTransform.SetLocation(new UE.VectorDouble(this.Data.TriggerHitPoint)), this.BushEffectHandle = EffectSystem_1.EffectSystem.SpawnEffect(this.Owner, this.EmptyUeTransform, BUSH_WALK_EFFCT, "[SceneCharacterTriggerEffect.SpawnEffect(BushEffect)]", new EffectContext_1.EffectContext(void 0, this.Owner), 3);
        EffectSystem_1.EffectSystem.IsValid(this.BushEffectHandle) && ((t = new EffectParameterNiagara_1.EffectParameterNiagara).UserParameterFloat = [], t.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("LUTIndex"), this.Data.HitBushLUTIndex]), EffectSystem_1.EffectSystem.SetEffectParameterNiagara(this.BushEffectHandle, t))
      }
      if (!this.Data.bHideOnBush && this.CacheHideOnBush) {
        i = new UE.VectorDouble(this.Owner.D_K2_GetActorLocation().X, this.Owner.D_K2_GetActorLocation().Y, this.CacheHitBushLocation.Z), s = (this.EmptyUeTransform.SetLocation(i), this.EmptyUeTransform.SetRotation(this.CurrentVelocity.ToOrientationQuat()), EffectSystem_1.EffectSystem.SpawnUnloopedEffect(this.Owner, this.EmptyUeTransform, BUSH_OUT_EFFCT, "[SceneCharacterFootprintEffect.SpawnRainFootEffect]")), e = this.Owner.CharacterActorComponent?.Entity?.GetComponent(178);
        if (!e) return;
        t = Vector_1.Vector.Create(-e.GravityDirect.X, -e.GravityDirect.Y, -e.GravityDirect.Z), i = this.CurrentVelocity.GetSafeNormal(MathCommon_1.MathCommon.SmallNumber), e = MathCommon_1.MathCommon.Clamp(t.DotProduct(Vector_1.Vector.Create(i.X, i.Y, i.Z)), 0, 1), e = MathCommon_1.MathCommon.Lerp(1, .3, e), t = new EffectParameterNiagara_1.EffectParameterNiagara;
        if (t.UserParameterFloat = [], t.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("VelocityStrength"), Math.max(this.CurrentVelocity.Size() / 500, .3) * e]), t.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("LUTIndex"), this.CacheBushLUTIndex]), this.CacheHitBushEffectParam && (t.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpawnCountScale"), this.CacheHitBushEffectParam.SpawnCountScale]), t.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("BushScale"), this.CacheHitBushEffectParam.SpawnSizeScale]), t.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("UVIndexBegin"), this.CacheHitBushEffectParam.UVIndexBegin]), t.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("UVIndexEnd"), this.CacheHitBushEffectParam.UVIndexEnd]), t.UserParameterVector?.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpawnBoxExtent"), this.CacheHitBushEffectParam.SpawnBoxExtent]), t.UserParameterVector?.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpawnBoxOffset"), this.CacheHitBushEffectParam.SpawnBoxOffset])), EffectSystem_1.EffectSystem.SetEffectParameterNiagara(s, t), EffectSystem_1.EffectSystem.IsValid(this.BushEffectHandle)) {
          const h = this.BushEffectHandle;
          TimerSystem_1.TimerSystem.Delay(() => {
            EffectSystem_1.EffectSystem.IsValid(h) && EffectSystem_1.EffectSystem.StopEffectById(h, "[SceneCharacterWaterEffect.StopEffect]", !0, !0)
          }, DELAY_OUT_BUSH_EFFECT)
        }
        this.BushEffectHandle = 0
      } else if (this.Data.bHideOnBush && !this.CacheHideOnBush && this.G1u()) {
        i = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(this.Owner, MathUtils_1.MathUtils.DefaultTransformDouble, BUSH_IN_EFFCT, "[SceneCharacterFootprintEffect.SpawnRainFootEffect]"), e = EffectSystem_1.EffectSystem.GetEffectActor(i);
        e && this.Data.HitBushActor.IsValid() && (e.K2_AttachToActor(this.Data.HitBushActor, void 0, 1, 1, 1, !1), e.D_K2_SetActorRelativeTransform(MathUtils_1.MathUtils.DefaultTransformDouble, !1, void 0, !0));
        let t = 1;
        this.OwnerStateComponent && this.OwnerStateComponent.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.RailSlide && (t = 2);
        s = new EffectParameterNiagara_1.EffectParameterNiagara;
        s.UserParameterFloat = [], s.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("LUTIndex"), this.Data.HitBushLUTIndex]), this.Data.BushIEParam && (s.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpawnCountScale"), this.Data.BushIEParam.SpawnCountScale * t]), s.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("BushScale"), this.Data.BushIEParam.SpawnSizeScale]), s.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("UVIndexBegin"), this.Data.BushIEParam.UVIndexBegin]), s.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("UVIndexEnd"), this.Data.BushIEParam.UVIndexEnd]), s.UserParameterVector?.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpawnBoxExtent"), this.Data.BushIEParam.SpawnBoxExtent]), s.UserParameterVector?.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpawnBoxOffset"), this.Data.BushIEParam.SpawnBoxOffset])), EffectSystem_1.EffectSystem.SetEffectParameterNiagara(i, s)
      }
      this.CacheHideOnBush = this.Data.bHideOnBush, this.CacheBushLUTIndex = this.Data.HitBushLUTIndex, this.CacheHitBushLocation = Vector_1.Vector.Create(this.Data.TriggerHitPoint.X, this.Data.TriggerHitPoint.Y, this.Data.TriggerHitPoint.Z), this.CacheHitBushEffectParam = this.Data.BushIEParam
    }
  }
  G1u() {
    if (!this.IsReady) return !1;
    let t = Vector_1.Vector.Create(0, 0, -1);
    var e = this.Owner.CharacterActorComponent?.Entity?.GetComponent(178);
    return e && (t = e.GravityDirect), 500 < this.VelocityHistory.GetMaxVelocityDirection(t)
  }
}
exports.SceneCharacterTriggerEffect = SceneCharacterTriggerEffect;
//# sourceMappingURL=SceneCharacterTriggerEffect.js.map