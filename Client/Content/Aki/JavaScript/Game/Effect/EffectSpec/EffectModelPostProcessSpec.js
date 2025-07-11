"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectModelPostProcessSpec = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Stats_1 = require("../../../Core/Common/Stats");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper");
const EffectSpec_1 = require("./EffectSpec");
const materialCameraCameraForwardRightParameterName = new UE.FName("CameraForwardRight");
class EffectModelPostProcessSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments);
    this.PostProcessComponent = undefined;
    this.t0e = false;
    this.ModelParameter = undefined;
    this.NeedUpdateVolume = false;
    this.MaterialIndex = 0;
    this.X0e = undefined;
    this.o0e = false;
    this.CachedLocationCurve = undefined;
    this.$0e = undefined;
    this.Y0e = undefined;
    this.J0e = 0;
    this.tAn = new UE.FName("EffectActorLocation");
    this.iAn = new UE.LinearColor();
    this.ytl = false;
  }
  ShouldRegisterBodyEffect() {
    return false;
  }
  OnInit() {
    this.X0e = new UE.Vector2D(0.5, 0.5);
    this.MaterialIndex = -1;
    if (Stats_1.Stat.Enable && !EffectEnvironment_1.EffectEnvironment.CloseEffectSubStat) {
      this.$0e = Stats_1.Stat.CreateNoFlameGraph("[EffectModelPostProcessSpec.Tick] Path:" + this.Handle.Path);
      if (!EffectModelPostProcessSpec.S0e) {
        EffectModelPostProcessSpec.S0e = Stats_1.Stat.Create("[EffectModelPostProcessSpec.Tick.UpdateParameter]");
        EffectModelPostProcessSpec.z0e = Stats_1.Stat.Create("[EffectModelPostProcessSpec.Tick.UpdateBlendWeight]");
      }
    }
    var t = this.Handle.GetSureEffectActor();
    var s = this.Handle.Parent;
    var s = s ? s.GetEffectSpec()?.GetSceneComponent() : undefined;
    var s = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(t, UE.KuroPostProcessComponent.StaticClass(), s, undefined, false, this.EffectModel);
    this.PostProcessComponent = s;
    this.SceneComponent = s;
    this.t0e = this.PostProcessComponent.IsComponentTickEnabled();
    this.PostProcessComponent.SetComponentTickEnabled(false);
    this.PostProcessComponent.bUpdateOverrideWithTOD = !this.EffectModel.OverrideTOD;
    this.CachedLocationCurve = this.EffectModel.Location;
    this.o0e = this.CachedLocationCurve?.bUseCurve;
    if (this.EffectModel.bEnablePostprocessMaterial && this.EffectModel.PostprocessMaterial) {
      this.Y0e = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(t, this.EffectModel.PostprocessMaterial);
    }
    return true;
  }
  OnStart() {
    if (this.PostProcessComponent) {
      this.PostProcessComponent.bEnabled = false;
    }
    return true;
  }
  OnTick(t) {
    this.$0e?.Start();
    if (!!this.PostProcessComponent && !this.ytl) {
      EffectModelPostProcessSpec.S0e?.Start();
      this.r0e(false);
      EffectModelPostProcessSpec.S0e?.Stop();
      EffectModelPostProcessSpec.z0e?.Start();
      this.Z0e();
      EffectModelPostProcessSpec.z0e?.Stop();
    }
    this.$0e?.Stop();
  }
  r0e(t) {
    if (this.PostProcessComponent?.IsValid() && ((this.o0e || t) && UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransformLocation(t, this.PostProcessComponent, this.CachedLocationCurve, this.LifeTime.PassTime), this.X0e = UE.KuroEffectLibrary.UpdateEffectModelPostProcessSpec(this.EffectModel, this.PostProcessComponent, t, this.LifeTime.PassTime, Global_1.Global.CharacterController, Global_1.Global.BaseCharacter, this.Handle.GetSureEffectActor(), this.X0e), this.Y0e) && (t || UE.KuroRenderingRuntimeBPPluginBPLibrary.IsPostprocessMaterialActive(this.PostProcessComponent, this.J0e))) {
      UE.KuroEffectLibrary.UpdateEffectModelPostProcessMaterial(this.EffectModel, this.Y0e, t, this.LifeTime.PassTime);
      t = this.PostProcessComponent.D_K2_GetComponentLocation();
      this.iAn.R = t.X;
      this.iAn.G = t.Y;
      this.iAn.B = t.Z;
      this.Y0e.SetVectorParameterValue(this.tAn, this.iAn);
    }
  }
  OnEnterPool() {}
  OnStop(t, s) {
    if (this.PostProcessComponent?.IsValid()) {
      if (this.Y0e) {
        UE.KuroRenderingRuntimeBPPluginBPLibrary.RemovePostprocessMaterial(this.PostProcessComponent, this.J0e);
      }
      this.PostProcessComponent.SetComponentTickEnabled(false);
      this.PostProcessComponent.bEnabled = false;
    }
  }
  OnEnd() {
    if (this.PostProcessComponent?.IsValid()) {
      this.PostProcessComponent.K2_DestroyComponent(this.PostProcessComponent);
      this.PostProcessComponent = undefined;
    }
    if (this.Y0e) {
      if (!Info_1.Info.IsGameRunning()) {
        UE.KuroStaticLibrary.DestroyObject(this.Y0e);
      }
      this.Y0e = undefined;
    }
    return true;
  }
  static IsNeedPostEffect(t, s) {
    return !t || !!s || !(s = ModelManager_1.ModelManager.CharacterModel.GetHandle(t))?.Valid || ((s = (t = s.Entity).GetComponent(0)).GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player || !!t.GetComponent(3).IsAutonomousProxy) && !(s = ModelManager_1.ModelManager.CreatureModel.GetEntityId(s.GetSummonerId()), (s = EntitySystem_1.EntitySystem.Get(s)?.GetComponent(0)) && s.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && !t.GetComponent(3).IsAutonomousProxy);
  }
  static IsDisableInUltraSkill(t) {
    return !t || !(t = ModelManager_1.ModelManager.CharacterModel.GetHandle(t))?.Valid || (t = t.Entity).GetComponent(0).GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player || !t.GetComponent(3).IsAutonomousProxy;
  }
  OnPlay() {
    var t;
    var s;
    var e;
    if (!!this.PostProcessComponent?.IsValid() && (!(t = this.Handle?.GetContext()) || !(this.ytl = t.DisablePostProcess || !EffectModelPostProcessSpec.IsNeedPostEffect(t.EntityId, this.EffectModel.VisibleForProtoPlayer), this.ytl))) {
      this.PostProcessComponent.SetComponentTickEnabled(this.t0e);
      this.PostProcessComponent.SetPriority(this.EffectModel.WeatherPriority);
      if (this.Y0e && (this.J0e = UE.KuroRenderingRuntimeBPPluginBPLibrary.AddPostprocessMaterial(this.PostProcessComponent, this.Y0e, this.EffectModel.WeatherPriority, this.EffectModel.UiScenePrimitive), Global_1.Global.CharacterCameraManager)) {
        s = Global_1.Global.CharacterCameraManager.GetActorForwardVector();
        e = new UE.Vector(0, 0, 1);
        s = UE.Vector.CrossProduct(s, e);
        e = UE.Vector.CrossProduct(e, s);
        this.Y0e.SetVectorParameterValue(materialCameraCameraForwardRightParameterName, new UE.LinearColor(e.X, e.Y, s.X, s.Y));
      }
      this.r0e(true);
      this.Z0e();
      if (this.GetEffectType() === 0 && EffectModelPostProcessSpec.IsDisableInUltraSkill(t?.EntityId)) {
        this.PostProcessComponent.bIsEffectVolume = true;
      }
    }
  }
  Z0e() {
    let t = 0;
    var e = Global_1.Global.CharacterCameraManager;
    if (this.PostProcessComponent?.IsValid()) {
      t = this.EffectModel.UseVolumeHardnessCurve ? this.EffectModel.VolumeHardnessCurve.bUseCurve ? UE.KuroCurveLibrary.GetValue_Float(this.EffectModel.VolumeHardnessCurve, this.LifeTime.PassTime) : this.EffectModel.VolumeHardnessCurve.Constant : this.EffectModel.VolumeHardness;
      var i = Math.max(t, 0.0001);
      let s = i;
      if (this.EffectModel.EnableVolume) {
        let t = undefined;
        t = e ? e.D_GetCameraLocation() : (r = (0, puerts_1.$ref)(Vector_1.Vector.ZeroVector), h = (0, puerts_1.$ref)(new UE.Rotator(0, 0, 0)), UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLevelEditorCameraLocationAndForward(this.Handle.GetSureEffectActor(), r, h), UE.KismetMathLibrary.WD_LocalToWorld(this.Handle.GetSureEffectActor(), (0, puerts_1.$unref)(r)));
        if (!e) {
          UE.KismetSystemLibrary.D_DrawDebugSphere(this.Handle.GetSureEffectActor(), this.PostProcessComponent.D_K2_GetComponentLocation(), this.EffectModel.VolumeRadius, 30, new UE.LinearColor(0, 1, 0, 0.8), 0, 0);
        }
        var h = this.PostProcessComponent.D_K2_GetComponentLocation();
        var r = UE.KismetMathLibrary.D_Subtract_VectorVector(t, h);
        var e = r.Size();
        s = UE.KismetMathLibrary.D_Vector_GetAbsMax(r) >= this.EffectModel.VolumeRadius || e >= this.EffectModel.VolumeRadius ? (this.PostProcessComponent.bEnabled = false, 0) : (h = MathCommon_1.MathCommon.Clamp((this.EffectModel.VolumeRadius - e) / this.EffectModel.VolumeRadius, 0, 1), Math.min(h / i, 1));
      }
      this.PostProcessComponent.BlendWeight = s;
      this.PostProcessComponent.bEnabled = s > 0;
    }
  }
  UpdateRadialBlur(t, s) {
    var e;
    var i = Global_1.Global.CharacterController;
    var h = Global_1.Global.BaseCharacter;
    let r = this.EffectModel.ScreenPosition;
    if (this.EffectModel.UseWorldPosition) {
      if (i && h && (h = h.D_K2_GetActorLocation(), e = (0, puerts_1.$ref)(new UE.Vector2D(0, 0)), UE.GameplayStatics.D_ProjectWorldToScreen(i, h, e, false))) {
        i = UE.WidgetLayoutLibrary.GetViewportSize(this.Handle.GetSureEffectActor());
        r = UE.KismetMathLibrary.Divide_Vector2DVector2D((0, puerts_1.$unref)(e), i);
        this.X0e = r;
      } else {
        r = this.X0e;
      }
    }
    s.KuroRadialBlurIntensity = t;
    s.KuroRadialBlurCenter = r;
    s.KuroRadialBlurMask = this.EffectModel.RadialBlurMask;
    s.KuroRadialBlurMaskScale = this.EffectModel.RadialBlurMaskScale;
    s.KuroRadialBlurHardness = UE.KuroCurveLibrary.GetValue_Float(this.EffectModel.RadialBlurHardness, this.LifeTime.PassTime);
    s.KuroRadialBlurRadius = UE.KuroCurveLibrary.GetValue_Float(this.EffectModel.RadialBlurRadius, this.LifeTime.PassTime);
  }
  NeedAlwaysTick() {
    return true;
  }
  OnReplay() {
    if (this.X0e) {
      this.X0e.X = 0.5;
      this.X0e.Y = 0.5;
    }
    this.ytl = false;
  }
  IsOverrideTick() {
    return true;
  }
  RegisterToKuroEffectSystem() {
    var t;
    if (this.Handle && this.PostProcessComponent && this.EffectModel && (t = this.Handle.GetSureEffectActor())) {
      this.HasInitTickOptimize = true;
      cpp_1.FKuroEffectSystemInterface.RegisterEffectPostProcessHandle(this.Handle.Id, this.Handle.Parent?.Id ?? 0, this.EffectModel, t, this.PostProcessComponent, this.ytl, this.J0e, this.Y0e, this.tAn);
    }
  }
}
(exports.EffectModelPostProcessSpec = EffectModelPostProcessSpec).S0e = undefined;
EffectModelPostProcessSpec.z0e = undefined; //# sourceMappingURL=EffectModelPostProcessSpec.js.map