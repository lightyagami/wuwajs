"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectModelLightSpec = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Stats_1 = require("../../../Core/Common/Stats");
const EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment");
const EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper");
const EffectSpec_1 = require("./EffectSpec");
class EffectModelLightSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments);
    this.LightModel = undefined;
    this.LightComponent = undefined;
    this.t0e = false;
    this.NeedDestroy = false;
    this.HasTransformAnim = false;
    this.CachedLocationCurve = undefined;
    this.E0e = undefined;
    this.S0e = undefined;
  }
  static SetMaxFightLightNumber(t) {
    this.MaxFightLightNumber = t;
  }
  OnInit() {
    this.LightModel = this.EffectModel;
    var t = this.Handle.GetSureEffectActor();
    if (Stats_1.Stat.Enable && !EffectEnvironment_1.EffectEnvironment.CloseEffectSubStat) {
      this.E0e = Stats_1.Stat.CreateNoFlameGraph("[EffectModelLightSpec.Tick] Path:" + this.Handle.Path);
      this.S0e = Stats_1.Stat.Create("[EffectModelLightSpec.Tick.UpdateParameter]");
    }
    var i = this.Handle.Parent;
    var i = i ? i.GetEffectSpec()?.GetSceneComponent() : undefined;
    this.LightComponent = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(t, UE.PointLightComponent.StaticClass(), i, undefined, false, this.EffectModel);
    this.t0e = this.LightComponent.IsComponentTickEnabled();
    this.LightComponent.SetComponentTickEnabled(false);
    this.LightComponent.SetIsUIScenePrimitive(this.GetEffectType() === 1);
    this.LightComponent.SetVisibility(false);
    this.LightComponent.SetToonLightType(0);
    this.SceneComponent = this.LightComponent;
    this.CachedLocationCurve = this.EffectModel.Location;
    this.HasTransformAnim = this.CachedLocationCurve.bUseCurve;
    return true;
  }
  OnTick(t) {
    this.E0e?.Start();
    if (this.LightComponent?.IsValid() && this.LightComponent.IsVisible()) {
      this.S0e?.Start();
      this.r0e(this.GetPlayInEditor());
      this.S0e?.Stop();
    }
    this.E0e?.Stop();
  }
  r0e(t) {
    if (this.HasTransformAnim || t) {
      UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransformLocation(t, this.LightComponent, this.CachedLocationCurve, this.LifeTime.PassTime);
    }
    UE.KuroEffectLibrary.UpdateEffectModelLightSpec(this.EffectModel, this.LightComponent, t, this.LifeTime.PassTime, EffectModelLightSpec.y0e);
  }
  OnStop() {
    if (this.LightComponent?.IsValid()) {
      this.LightComponent.SetVisibility(false);
      this.LightComponent.SetComponentTickEnabled(false);
    }
  }
  OnEnd() {
    if (this.LightComponent?.IsValid()) {
      this.LightComponent.K2_DestroyComponent(this.LightComponent);
    }
    return true;
  }
  OnPlay() {
    if (this.LightComponent?.IsValid()) {
      this.LightComponent.SetVisibility(true);
      this.LightComponent.SetComponentTickEnabled(this.t0e);
      this.r0e(true);
    }
  }
  MarkDestroy() {
    this.NeedDestroy = true;
  }
  OnEffectTypeChange() {
    if (this.LightComponent?.IsValid()) {
      this.LightComponent.SetIsUIScenePrimitive(this.GetEffectType() === 1);
    }
  }
  IsOverrideTick() {
    return true;
  }
  RegisterToKuroEffectSystem() {
    var t;
    if (this.Handle && this.LightComponent && this.EffectModel && (t = this.Handle.GetSureEffectActor())) {
      this.HasInitTickOptimize = true;
      cpp_1.FKuroEffectSystemInterface.RegisterEffectCommonHandle(this.Handle.Id, this.Handle.Parent?.Id ?? 0, this.EffectModel, t, this.LightComponent);
    }
  }
}
(exports.EffectModelLightSpec = EffectModelLightSpec).I0e = 5;
EffectModelLightSpec.y0e = 2000;
EffectModelLightSpec.MaxFightLightNumber = EffectModelLightSpec.I0e; //# sourceMappingURL=EffectModelLightSpec.js.map