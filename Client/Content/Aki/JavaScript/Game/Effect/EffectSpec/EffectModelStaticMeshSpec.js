"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectModelStaticMeshSpec = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper");
const EffectMaterialParameter_1 = require("../../Render/Effect/Data/Parameters/EffectMaterialParameter");
const EffectSpec_1 = require("./EffectSpec");
class EffectModelStaticMeshSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments);
    this.StaticMeshComponent = undefined;
    this.t0e = false;
    this.ModelParameter = undefined;
    this.ofe = undefined;
    this.rfe = undefined;
    this.nfe = false;
    this.sfe = undefined;
    this.o0e = false;
    this.CachedLocationCurve = undefined;
    this.CachedRotationCurve = undefined;
    this.CachedScaleCurve = undefined;
  }
  SetEffectParameterNiagara(t) {
    if (this.sfe && this.EffectModel.AcceptExternalNiagaraParameter) {
      if (t.MaterialParameterFloat) {
        for (var [i, s] of t.MaterialParameterFloat) {
          this.RemoveMaterialFloatCurveOrConst(i);
          this.CollectMaterialFloatConst(i, s);
        }
      }
      if (t.MaterialParameterColor) {
        for (var [h, e] of t.MaterialParameterColor) {
          this.RemoveMaterialLinearColorCurveOrConst(h);
          this.CollectMaterialLinearColorConst(h, e);
        }
      }
    }
  }
  OnInit() {
    if (!this.EffectModel?.StaticMeshRef) {
      return false;
    }
    this.ofe = this.EffectModel.StaticMeshRef;
    this.rfe = [];
    if (this.EffectModel.UseMultipleMaterialSlots) {
      var i = this.EffectModel.MaterialOverrideArrayRef.Num();
      for (let t = 0; t < i; t++) {
        this.rfe.push(this.EffectModel.MaterialOverrideArrayRef.Get(t));
      }
    } else if (this.EffectModel.MaterialOverrideRef) {
      this.rfe.push(this.EffectModel.MaterialOverrideRef);
    }
    this.nfe = this.EffectModel.MaterialFloatParameters.Num() > 0 || this.EffectModel.MaterialColorParameters.Num() > 0 || this.EffectModel.AcceptExternalNiagaraParameter;
    if (this.nfe) {
      this.sfe = [];
      for (const h of this.rfe) {
        this.sfe.push(UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this.Handle.GetSureEffectActor(), h));
      }
    }
    var t = this.Handle.GetSureEffectActor();
    var s = this.Handle.Parent;
    var s = s ? s.GetEffectSpec()?.GetSceneComponent() : t.K2_GetRootComponent();
    this.StaticMeshComponent = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(t, UE.StaticMeshComponent.StaticClass(), s, undefined, true, this.EffectModel);
    this.t0e = this.StaticMeshComponent.IsComponentTickEnabled();
    this.StaticMeshComponent.SetComponentTickEnabled(false);
    this.SceneComponent = this.StaticMeshComponent;
    this.StaticMeshComponent.SetIsUIScenePrimitive(this.GetEffectType() === 1);
    this.StaticMeshComponent.SetStaticMesh(this.ofe);
    this.StaticMeshComponent.bReceivesDecals = this.EffectModel.ReceiveDecal;
    this.StaticMeshComponent.CastShadow = this.EffectModel.CastShadow;
    this.StaticMeshComponent.MobileCastShadow = this.EffectModel.CastShadow;
    this.StaticMeshComponent.TranslucencySortPriority = this.EffectModel.TranslucencySortPriority;
    if (this.EffectModel.EnableCollision) {
      this.StaticMeshComponent.bUseDefaultCollision = true;
    } else {
      this.StaticMeshComponent.SetCollisionEnabled(0);
    }
    if (this.EffectModel.EnableScreenSizeCullRatioOverride) {
      this.StaticMeshComponent.bOverrideScreenSizeCullRatio = true;
      this.StaticMeshComponent.ScreenSizeCullRatioOverride = this.EffectModel.ScreenSizeCullRatio;
    }
    t.FinishAddComponent(this.StaticMeshComponent, s !== undefined, MathUtils_1.MathUtils.DefaultTransform);
    if (this.nfe) {
      for (let t = 0; t < this.sfe.length; t++) {
        this.StaticMeshComponent.SetMaterial(t, this.sfe[t]);
      }
    } else {
      for (let t = 0; t < this.rfe.length; t++) {
        this.StaticMeshComponent.SetMaterial(t, this.rfe[t]);
      }
    }
    this.ModelParameter = new EffectMaterialParameter_1.default(this.EffectModel.MaterialFloatParameters, this.EffectModel.MaterialColorParameters);
    this.CachedLocationCurve = this.EffectModel.Location;
    this.CachedRotationCurve = this.EffectModel.Rotation;
    this.CachedScaleCurve = this.EffectModel.Scale;
    this.o0e = this.CachedLocationCurve.bUseCurve || this.CachedRotationCurve.bUseCurve || this.CachedScaleCurve.bUseCurve;
    return true;
  }
  OnStart() {
    if (this.StaticMeshComponent) {
      this.StaticMeshComponent.SetVisibility(false);
      this.StaticMeshComponent.SetUseEnableBattle(true);
      this.StaticMeshComponent.SetUseEnableBattleMask(true);
    }
    return true;
  }
  OnTick(t) {
    if (this.StaticMeshComponent) {
      this.r0e(this.GetPlayInEditor());
    }
  }
  r0e(t) {
    if (this.StaticMeshComponent?.IsValid() && ((this.o0e || t) && UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransform(t, this.StaticMeshComponent, this.CachedLocationCurve, this.CachedRotationCurve, this.CachedScaleCurve, this.LifeTime.PassTime), this.nfe)) {
      for (const i of this.sfe) {
        if (t) {
          this.ModelParameter.Apply(i, this.LifeTime.PassTime, true);
        } else {
          this.ModelParameter.Tick(i, this.LifeTime.PassTime);
        }
      }
    }
  }
  OnEnd() {
    this.sfe = undefined;
    this.rfe = undefined;
    return !(this.StaticMeshComponent = undefined);
  }
  OnStop() {
    if (this.StaticMeshComponent?.IsValid()) {
      this.StaticMeshComponent.SetComponentTickEnabled(false);
      this.StaticMeshComponent.SetVisibility(false);
    }
  }
  OnPlay() {
    if (this.StaticMeshComponent?.IsValid()) {
      this.StaticMeshComponent.SetComponentTickEnabled(this.t0e);
      this.StaticMeshComponent.SetVisibility(true);
      this.r0e(true);
      if (this.GetHandle().GetEffectType() === 0) {
        this.StaticMeshComponent.SetRenderInBurst(true);
      } else {
        this.StaticMeshComponent.SetRenderInBurst(false);
      }
    }
  }
  OnEffectTypeChange() {
    if (this.StaticMeshComponent?.IsValid()) {
      this.StaticMeshComponent.SetIsUIScenePrimitive(this.GetEffectType() === 1);
    }
  }
  HasMaterialParameters() {
    return true;
  }
  GetMaterialParameters() {
    return this.ModelParameter;
  }
  IsOverrideTick() {
    return true;
  }
  RegisterToKuroEffectSystem() {
    if (this.Handle && this.StaticMeshComponent && this.EffectModel && this.sfe) {
      var t = this.Handle.GetSureEffectActor();
      if (t) {
        this.HasInitTickOptimize = true;
        var i = UE.NewArray(UE.MaterialInstanceDynamic);
        for (const s of this.sfe) {
          i.Add(s);
        }
        cpp_1.FKuroEffectSystemInterface.RegisterEffectStaticMeshHandle(this.Handle.Id, this.Handle.Parent?.Id ?? 0, this.EffectModel, t, this.StaticMeshComponent, i);
      }
    }
  }
}
exports.EffectModelStaticMeshSpec = EffectModelStaticMeshSpec;
//# sourceMappingURL=EffectModelStaticMeshSpec.js.map