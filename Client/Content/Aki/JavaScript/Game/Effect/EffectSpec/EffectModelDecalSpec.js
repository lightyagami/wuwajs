"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectModelDecalSpec = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const ModelManager_1 = require("../../Manager/ModelManager");
const EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper");
const EffectMaterialParameter_1 = require("../../Render/Effect/Data/Parameters/EffectMaterialParameter");
const EffectSpec_1 = require("./EffectSpec");
class EffectModelDecalSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments);
    this.DecalComponent = undefined;
    this.t0e = false;
    this.ModelParameters = undefined;
    this.i0e = undefined;
    this.o0e = false;
    this.CachedLocationCurve = undefined;
    this.CachedRotationCurve = undefined;
    this.CachedScaleCurve = undefined;
  }
  OnInit() {
    this.i0e = this.EffectModel.DecalMaterialRef;
    let t = this.i0e;
    if (!t) {
      return false;
    }
    if (this.EffectModel.MaterialFloatParameters.Num() > 0 || this.EffectModel.MaterialColorParameters.Num() > 0) {
      t = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this.Handle.GetSureEffectActor(), t);
    }
    this.CachedLocationCurve = this.EffectModel.Location;
    this.CachedRotationCurve = this.EffectModel.Rotation;
    this.CachedScaleCurve = this.EffectModel.Scale;
    this.o0e = this.CachedLocationCurve.bUseCurve || this.CachedRotationCurve.bUseCurve || this.CachedScaleCurve.bUseCurve;
    var i = this.Handle.GetSureEffectActor();
    var e = new UE.Transform();
    var s = this.Handle.Parent;
    var s = s ? s.GetEffectSpec()?.GetSceneComponent() : i.K2_GetRootComponent();
    this.DecalComponent = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(i, UE.DecalComponent.StaticClass(), s, e, false, this.EffectModel);
    this.SceneComponent = this.DecalComponent;
    this.t0e = this.DecalComponent.IsComponentTickEnabled();
    this.DecalComponent.SetComponentTickEnabled(false);
    this.DecalComponent.DecalMaterial = t;
    this.DecalComponent.SetIsUIScenePrimitive(this.GetEffectType() === 1);
    this.DecalComponent.DecalSize = new UE.Vector(100, 100, 100);
    this.DecalComponent.ZFadingFactor = this.EffectModel.ZfadingFactor;
    this.DecalComponent.ZFadingPower = this.EffectModel.ZfadingPower;
    this.DecalComponent.SetVisibility(false);
    this.ModelParameters = new EffectMaterialParameter_1.default(this.EffectModel.MaterialFloatParameters, this.EffectModel.MaterialColorParameters);
    return true;
  }
  OnTick(t) {
    if (this.IsPlaying() && this.DecalComponent?.IsValid()) {
      this.r0e(this.GetPlayInEditor());
    }
  }
  OnEffectTypeChange() {
    if (this.DecalComponent?.IsValid()) {
      this.DecalComponent.SetIsUIScenePrimitive(this.GetEffectType() === 1);
    }
  }
  r0e(t) {
    if (this.o0e || t) {
      UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransform(t, this.DecalComponent, this.CachedLocationCurve, this.CachedRotationCurve, this.CachedScaleCurve, this.LifeTime.PassTime);
    }
    var i = this.DecalComponent.DecalMaterial;
    if (i instanceof UE.MaterialInstanceDynamic) {
      if (t) {
        this.ModelParameters.Apply(i, this.LifeTime.PassTime, true);
      } else {
        this.ModelParameters.Tick(i, this.LifeTime.PassTime);
      }
    }
  }
  oxl() {
    var t = this.Handle?.GetOwnerEntityId();
    var i = this.Handle?.GetInteractionEffectComponent();
    if (t && (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(t))?.Valid && i && (t = t.Entity.GetComponent(0)?.GetModelConfig())) {
      i.ModelConfigId = t.ID;
      i.SetDecalCompShiftColor(this.DecalComponent);
    }
  }
  OnEnd() {
    if (this.DecalComponent?.IsValid()) {
      this.DecalComponent.K2_DestroyComponent(this.DecalComponent);
      this.DecalComponent = undefined;
    }
    return !(this.i0e = undefined);
  }
  OnStop(t, i) {
    if (this.DecalComponent?.IsValid()) {
      this.DecalComponent.SetComponentTickEnabled(false);
    }
  }
  OnPlay() {
    if (this.DecalComponent?.IsValid()) {
      this.DecalComponent.SetComponentTickEnabled(this.t0e);
      this.DecalComponent.SetVisibility(true);
      this.r0e(true);
      this.oxl();
    }
  }
  IsUseBoundsCalculateDistance() {
    return true;
  }
  HasMaterialParameters() {
    return true;
  }
  GetMaterialParameters() {
    return this.ModelParameters;
  }
  IsOverrideTick() {
    return true;
  }
  RegisterToKuroEffectSystem() {
    var t;
    if (this.Handle && this.DecalComponent && this.EffectModel && (t = this.Handle.GetSureEffectActor())) {
      this.HasInitTickOptimize = true;
      cpp_1.FKuroEffectSystemInterface.RegisterEffectCommonHandle(this.Handle.Id, this.Handle.Parent?.Id ?? 0, this.EffectModel, t, this.DecalComponent);
    }
  }
}
exports.EffectModelDecalSpec = EffectModelDecalSpec;
//# sourceMappingURL=EffectModelDecalSpec.js.map