"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneCharacterTriggerEffect = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectParameterNiagara_1 = require("../../../Effect/EffectParameter/EffectParameterNiagara");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const DELAY_OUT_BUSH_EFFECT = 1000;
const BUSH_WALK_EFFCT = "/Game/Aki/Effect/DataAsset/Niagara/Common/Interaction/DA_Fx_HideOnBush_Loop.DA_Fx_HideOnBush_Loop";
const BUSH_OUT_EFFCT = "/Game/Aki/Effect/DataAsset/Niagara/Common/Interaction/DA_Fx_HideOnBush_Out.DA_Fx_HideOnBush_Out";
const BUSH_IN_EFFCT = "/Game/Aki/Effect/DataAsset/Niagara/Common/Interaction/DA_Fx_HideOnBush_RushIn.DA_Fx_HideOnBush_RushIn";
const SOARING_TREE_EFFCT = "/Game/Aki/Effect/DataAsset/Niagara/Common/Interaction/DA_Fx_SoaringTreeOut.DA_Fx_SoaringTreeOut";
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
}
class SceneCharacterTriggerEffect {
  constructor() {
    this.Owner = undefined;
    this.OwnerStateComponent = undefined;
    this.CueComponent = undefined;
    this.Data = undefined;
    this.CacheData = undefined;
    this.IsReady = false;
    this.BushEffectHandle = 0;
    this.CurrentVelocity = new UE.VectorDouble();
    this.EmptyUeTransform = new UE.TransformDouble();
    this.VelocityHistory = new VelocityHistoryCache();
    this.IsEnabled = false;
  }
  Start(t) {
    if (t && (this.Owner = t, this.IsReady = true, this.VelocityHistory.Initialize(12), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("RenderEffect", 83, "TriggerEffect Start", ["Owner", t.GetName()]);
    }
  }
  Enable() {
    if (this.IsReady && (this.OwnerStateComponent = this.Owner.CharacterActorComponent?.Entity?.GetComponent(184), this.IsEnabled = true, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("RenderEffect", 83, "TriggerEffect Enabled", ["Owner", this.Owner.GetName()]);
    }
  }
  Disable() {
    if (this.IsEnabled && (EffectSystem_1.EffectSystem.IsValid(this.BushEffectHandle) && (EffectSystem_1.EffectSystem.StopEffectById(this.BushEffectHandle, "[SceneCharacterTriggerEffect.Disable]", true), this.BushEffectHandle = 0), this.IsEnabled = false, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("RenderEffect", 83, "TriggerEffect Disabled", ["Owner", this.Owner.GetName()]);
    }
  }
  Tick() {
    if (this.IsEnabled && this.Owner) {
      this.CurrentVelocity = this.Owner.D_GetVelocity();
      this.VelocityHistory.AddVelocity(Vector_1.Vector.Create(this.CurrentVelocity.X, this.CurrentVelocity.Y, this.CurrentVelocity.Z));
      this.wYc();
      this.LYc();
      this.CacheData = this.Data;
    }
  }
  iSu() {
    if (!this.IsReady) {
      return false;
    }
    let t = Vector_1.Vector.Create(0, 0, -1);
    var e = this.Owner.CharacterActorComponent?.Entity?.GetComponent(187);
    if (e) {
      t = e.GravityDirect;
    }
    return this.VelocityHistory.GetMaxVelocityDirection(t) > 500;
  }
  wYc() {
    if (this.IsReady && this.Data && this.CacheData) {
      if (this.Data.bHideOnBush) {
        if (EffectSystem_1.EffectSystem.IsValid(this.BushEffectHandle)) {
          EffectSystem_1.EffectSystem.HandleSeekToTime(this.BushEffectHandle, this.CurrentVelocity.Size(), false);
          var e = EffectSystem_1.EffectSystem.GetEffectActor(this.BushEffectHandle);
          EffectSystem_1.EffectSystem.GetEffectModel(this.BushEffectHandle);
          var i = new UE.VectorDouble(this.Owner.D_K2_GetActorLocation().X, this.Owner.D_K2_GetActorLocation().Y, this.Data.TriggerHitPoint.Z);
          e.D_K2_SetActorLocation(i, false, undefined, true);
          var i = this.Owner.CharacterActorComponent?.Entity?.GetComponent(187);
          if (!i) {
            return;
          }
          var i = Vector_1.Vector.Create(-i.GravityDirect.X, -i.GravityDirect.Y, -i.GravityDirect.Z).ToUeVector(true);
          var s = this.Owner.D_GetActorForwardVector();
          var h = UE.KismetMathLibrary.D_Cross_VectorVector(i, s);
          var s = UE.KismetMathLibrary.D_Cross_VectorVector(h, i);
          e.K2_SetActorRotation(UE.KismetMathLibrary.D_MakeRotationFromAxes(s, h, i), true);
        } else {
          this.EmptyUeTransform.SetLocation(new UE.VectorDouble(this.Data.TriggerHitPoint));
          this.BushEffectHandle = EffectSystem_1.EffectSystem.SpawnEffect(this.Owner, this.EmptyUeTransform, BUSH_WALK_EFFCT, "[SceneCharacterTriggerEffect.SpawnEffect(BushEffect)]", new EffectContext_1.EffectContext(undefined, this.Owner), 3);
        }
        if (EffectSystem_1.EffectSystem.IsValid(this.BushEffectHandle)) {
          (e = new EffectParameterNiagara_1.EffectParameterNiagara()).UserParameterFloat = [];
          e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("LUTIndex"), this.Data.HitBushLUTIndex]);
          if (this.Data.BushIEParam) {
            e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("BushScale"), this.Data.BushIEParam.SpawnSizeScale]);
          }
          EffectSystem_1.EffectSystem.SetEffectParameterNiagara(this.BushEffectHandle, e);
        }
      }
      if (!this.Data.bHideOnBush && this.CacheData.bHideOnBush) {
        s = new UE.VectorDouble(this.Owner.D_K2_GetActorLocation().X, this.Owner.D_K2_GetActorLocation().Y, this.CacheData.TriggerHitPoint.Z);
        this.EmptyUeTransform.SetLocation(s);
        this.EmptyUeTransform.SetRotation(this.CurrentVelocity.ToOrientationQuat());
        h = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(this.Owner, this.EmptyUeTransform, BUSH_OUT_EFFCT, "[SceneCharacterFootprintEffect.SpawnRainFootEffect]");
        i = this.Owner.CharacterActorComponent?.Entity?.GetComponent(187);
        if (i) {
          e = Vector_1.Vector.Create(-i.GravityDirect.X, -i.GravityDirect.Y, -i.GravityDirect.Z);
          s = this.CurrentVelocity.GetSafeNormal(MathCommon_1.MathCommon.SmallNumber);
          i = MathCommon_1.MathCommon.Clamp(e.DotProduct(Vector_1.Vector.Create(s.X, s.Y, s.Z)), 0, 1);
          i = MathCommon_1.MathCommon.Lerp(1, 0.3, i);
          e = new EffectParameterNiagara_1.EffectParameterNiagara();
          e.UserParameterFloat = [];
          e.UserParameterVector = [];
          e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("VelocityStrength"), Math.max(this.CurrentVelocity.Size() / 500, 0.3) * i]);
          e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("LUTIndex"), this.CacheData.HitBushLUTIndex]);
          e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpawnCountScale"), this.CacheData.BushIEParam.SpawnCountScale]);
          e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("BushScale"), this.CacheData.BushIEParam.SpawnSizeScale]);
          e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("UVIndexBegin"), this.CacheData.BushIEParam.UVIndexBegin]);
          e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("UVIndexEnd"), this.CacheData.BushIEParam.UVIndexEnd]);
          e.UserParameterVector.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpawnBoxExtent"), this.CacheData.BushIEParam.SpawnBoxExtent]);
          e.UserParameterVector.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpawnBoxOffset"), this.CacheData.BushIEParam.SpawnBoxOffset]);
          EffectSystem_1.EffectSystem.SetEffectParameterNiagara(h, e);
          if (EffectSystem_1.EffectSystem.IsValid(this.BushEffectHandle)) {
            const t = this.BushEffectHandle;
            TimerSystem_1.TimerSystem.Delay(() => {
              if (EffectSystem_1.EffectSystem.IsValid(t)) {
                EffectSystem_1.EffectSystem.StopEffectById(t, "[SceneCharacterWaterEffect.StopEffect]", true, true);
              }
            }, DELAY_OUT_BUSH_EFFECT);
          }
          this.BushEffectHandle = 0;
        }
      } else if (this.Data.bHideOnBush && !this.CacheData.bHideOnBush && this.iSu()) {
        s = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(this.Owner, MathUtils_1.MathUtils.DefaultTransformDouble, BUSH_IN_EFFCT, "[SceneCharacterFootprintEffect.SpawnRainFootEffect]");
        i = EffectSystem_1.EffectSystem.GetEffectActor(s);
        if (i && this.Data.HitBushActor.IsValid()) {
          i.K2_AttachToActor(this.Data.HitBushActor, undefined, 1, 1, 1, false);
          i.D_K2_SetActorRelativeTransform(MathUtils_1.MathUtils.DefaultTransformDouble, false, undefined, true);
        }
        let t = 1;
        h = this.Owner.CharacterActorComponent?.Entity?.GetComponent(183);
        if (h && h.HasBuff(640018019)) {
          t = 3;
        }
        e = new EffectParameterNiagara_1.EffectParameterNiagara();
        e.UserParameterFloat = [];
        e.UserParameterVector = [];
        e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("LUTIndex"), this.Data.HitBushLUTIndex]);
        if (this.Data.BushIEParam) {
          e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpawnCountScale"), this.Data.BushIEParam.SpawnCountScale * t]);
          e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("BushScale"), this.Data.BushIEParam.SpawnSizeScale]);
          e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("UVIndexBegin"), this.Data.BushIEParam.UVIndexBegin]);
          e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("UVIndexEnd"), this.Data.BushIEParam.UVIndexEnd]);
          e.UserParameterVector.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpawnBoxExtent"), this.Data.BushIEParam.SpawnBoxExtent]);
          e.UserParameterVector.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpawnBoxOffset"), this.Data.BushIEParam.SpawnBoxOffset]);
        }
        EffectSystem_1.EffectSystem.SetEffectParameterNiagara(s, e);
      }
    }
  }
  LYc() {
    if (this.IsReady && this.Data && this.CacheData && !this.Data.OverlapTriggerMesh && this.CacheData.OverlapTriggerMesh && this.CacheData.OverlapTriggerParam0.X === 2) {
      var h = new UE.VectorDouble(this.Owner.D_K2_GetActorLocation().X, this.Owner.D_K2_GetActorLocation().Y, this.Owner.D_K2_GetActorLocation().Z);
      this.EmptyUeTransform.SetLocation(h);
      this.EmptyUeTransform.SetRotation(this.CurrentVelocity.ToOrientationQuat());
      var h = this.Owner.CharacterActorComponent?.Entity?.GetComponent(187);
      if (h) {
        let t = 0;
        let e = 0;
        let i = 1;
        let s = 1;
        if (this.OwnerStateComponent?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Soar) {
          t = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(this.Owner, this.EmptyUeTransform, SOARING_TREE_EFFCT, "[SceneEffect.SpawnTriggerSoaringTreeEffect]");
          e = Math.max(this.CurrentVelocity.Size() / 500, 1);
          i = this.CacheData.BushIEParam.SoaringSpawnSizeScale;
          s = this.CacheData.BushIEParam.SoaringSpawnCountScale;
        } else {
          t = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(this.Owner, this.EmptyUeTransform, BUSH_OUT_EFFCT, "[SceneEffect.SpawnTriggerBushEffect]");
          e = Math.max(this.CurrentVelocity.Size() / 500, 0.3);
        }
        h = new EffectParameterNiagara_1.EffectParameterNiagara();
        h.UserParameterFloat = [];
        h.UserParameterVector = [];
        h.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("VelocityStrength"), e]);
        h.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("LUTIndex"), this.CacheData.HitBushLUTIndex]);
        h.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpawnCountScale"), this.CacheData.BushIEParam.SpawnCountScale]);
        h.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("BushScale"), this.CacheData.BushIEParam.SpawnSizeScale]);
        h.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("SoaringScale"), i]);
        h.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("SoaringCountScale"), s]);
        h.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("UVIndexBegin"), this.CacheData.BushIEParam.UVIndexBegin]);
        h.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("UVIndexEnd"), this.CacheData.BushIEParam.UVIndexEnd]);
        h.UserParameterVector.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpawnBoxExtent"), this.CacheData.BushIEParam.SpawnBoxExtent]);
        h.UserParameterVector.push([FNameUtil_1.FNameUtil.GetDynamicFName("SpawnBoxOffset"), this.CacheData.BushIEParam.SpawnBoxOffset]);
        EffectSystem_1.EffectSystem.SetEffectParameterNiagara(t, h);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RenderEffect", 83, "SoarEffect DebugMessage", ["UVIndexBegin", this.CacheData.BushIEParam.UVIndexBegin], ["UVIndexEnd", this.CacheData.BushIEParam.UVIndexEnd], ["SoaringScale", this.CacheData.BushIEParam.SoaringSpawnSizeScale], ["SoaringCountScale", this.CacheData.BushIEParam.SoaringSpawnCountScale]);
        }
      }
    }
  }
}
exports.SceneCharacterTriggerEffect = SceneCharacterTriggerEffect;
//# sourceMappingURL=SceneCharacterTriggerEffect.js.map