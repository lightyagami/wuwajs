"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectModelSkeletalMeshSpec = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const TickProcessSystem_1 = require("../../../Core/Tick/TickProcessSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../GlobalData");
const RenderConfig_1 = require("../../Render/Config/RenderConfig");
const EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper");
const EffectSpec_1 = require("./EffectSpec");
class EffectModelSkeletalMeshSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments);
    this.SkeletalMeshComponent = undefined;
    this.CharRenderingComponent = undefined;
    this.t0e = false;
    this.tfe = undefined;
    this.ife = undefined;
    this.o0e = false;
    this.CachedLocationCurve = undefined;
    this.CachedRotationCurve = undefined;
    this.CachedScaleCurve = undefined;
    this.HideCounter = 0;
    this.B$a = 0;
    this.DHr = 1;
    this.A$a = t => {
      this.B$a = 0;
      if (this.SkeletalMeshComponent?.IsValid()) {
        this.SkeletalMeshComponent.SetPlayRate(this.DHr);
      }
    };
  }
  OnBodyEffectChanged(t, i) {
    var s;
    if (this.SkeletalMeshComponent) {
      if (t < 1) {
        if (!this.CharRenderingComponent) {
          s = this.Handle.GetSureEffectActor();
          this.CharRenderingComponent = s.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
          if (!this.CharRenderingComponent) {
            this.CharRenderingComponent = s.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, new UE.Transform(), false);
            if (GlobalData_1.GlobalData.IsUiSceneOpen) {
              this.CharRenderingComponent.Init(5);
            } else {
              this.CharRenderingComponent.Init(7);
            }
          }
          this.CharRenderingComponent.SetLogicOwner(s);
          this.CharRenderingComponent.AddComponentByCase(0, this.SkeletalMeshComponent);
        }
        this.CharRenderingComponent.SetDitherEffect(t, 1);
      } else if (this.CharRenderingComponent) {
        this.CharRenderingComponent.SetDitherEffect(1, 1);
      }
      this.SkeletalMeshComponent.SetCastShadow(i);
    }
  }
  OnInit() {
    if (!this.tfe && this.EffectModel.SkeletalMeshRef) {
      this.tfe = this.EffectModel.SkeletalMeshRef;
    }
    if (!this.ife && this.EffectModel.AnimationRef) {
      this.ife = this.EffectModel.AnimationRef;
    }
    var t;
    var i;
    var s = this.tfe;
    var e = this.ife;
    if (s && e) {
      e = this.Handle.GetSureEffectActor();
      t = (t = this.Handle.Parent) ? t.GetEffectSpec()?.GetSceneComponent() : e.K2_GetRootComponent();
      i = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(e, UE.SkeletalMeshComponent.StaticClass(), t, undefined, true, this.EffectModel);
      this.SceneComponent = i;
      if (this.GetEffectType() === 1) {
        i.SetTickableWhenPaused(true);
      }
      i.SetIsUIScenePrimitive(this.GetEffectType() === 1);
      i.SetSkeletalMesh(s, true);
      i.SetUpdateAnimationInEditor(true);
      if (this.EffectModel.EnableCollision) {
        i.SetCollisionProfileName(RenderConfig_1.RenderConfig.PhysicsActor);
      } else {
        i.SetCollisionEnabled(0);
      }
      if (this.EffectModel.ForbidCastToonShadow) {
        i.bForbidCastToonShadow = true;
      }
      e.FinishAddComponent(i, t !== undefined, MathUtils_1.MathUtils.DefaultTransform);
      i.SetVisibility(false);
      this.SkeletalMeshComponent = i;
      if (this.Handle?.IsFreeze) {
        this.OnEnterFreeze();
      }
      this.t0e = this.SkeletalMeshComponent.IsComponentTickEnabled();
      this.SkeletalMeshComponent.SetComponentTickEnabled(false);
      this.SkeletalMeshComponent.SetExcludeFromLightAttachmentGroup(true);
      this.SkeletalMeshComponent.SetCastShadow(this.EffectModel.CastShadow);
      this.CachedLocationCurve = this.EffectModel.Location;
      this.CachedRotationCurve = this.EffectModel.Rotation;
      this.CachedScaleCurve = this.EffectModel.Scale;
      this.o0e = this.CachedLocationCurve.bUseCurve || this.CachedRotationCurve.bUseCurve || this.CachedScaleCurve.bUseCurve;
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 36, "特效框架: SkeletalMeshSpec Init失败", ["Id", this.Handle?.Id], ["Path", this.Handle?.Path]);
      }
      return false;
    }
  }
  SetStoppingTime(t) {
    if (this.StoppingTimeInternal !== t) {
      super.SetStoppingTime(t);
      if (!this.GetIgnoreTimeScale()) {
        this.DHr = t ? 0 : 1;
        if (this.B$a === 0) {
          this.B$a = TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(5, false, this.A$a);
        }
      }
    }
  }
  OnTick(t) {
    if (this.SkeletalMeshComponent?.IsValid()) {
      this.r0e(this.GetPlayInEditor());
    }
  }
  OnEffectTypeChange() {
    if (this.SkeletalMeshComponent?.IsValid() && (this.SkeletalMeshComponent.SetIsUIScenePrimitive(this.GetEffectType() === 1), this.GetEffectType() === 1)) {
      this.SkeletalMeshComponent.SetTickableWhenPaused(true);
    }
  }
  r0e(t) {
    if (this.o0e || t) {
      UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransform(t, this.SkeletalMeshComponent, this.CachedLocationCurve, this.CachedRotationCurve, this.CachedScaleCurve, this.LifeTime.PassTime);
    }
  }
  OnStop() {
    var t;
    if (this.B$a !== 0) {
      TickProcessSystem_1.TickProcessSystem.UnregisterTickProcess(this.B$a);
      this.B$a = 0;
    }
    if (this.SkeletalMeshComponent?.IsValid()) {
      if (!this.CharRenderingComponent) {
        t = this.Handle.GetSureEffectActor();
        this.CharRenderingComponent = t.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
      }
      this.CharRenderingComponent?.ResetAllRenderingState();
      this.CharRenderingComponent?.K2_DestroyComponent(this.CharRenderingComponent);
      this.CharRenderingComponent = undefined;
      this.SkeletalMeshComponent.SetVisibility(false);
      this.SkeletalMeshComponent.SetComponentTickEnabled(false);
      this.SkeletalMeshComponent.Stop();
      UE.KuroAnimLibrary.EndAnimNotifyStates(this.SkeletalMeshComponent.AnimScriptInstance);
    }
  }
  OnReplay() {
    this.B$a = 0;
    this.DHr = 1;
  }
  OnPlay() {
    if (this.SkeletalMeshComponent?.IsValid()) {
      this.SkeletalMeshComponent.SetComponentTickEnabled(this.t0e);
      if (Info_1.Info.IsGameRunning()) {
        this.HideCounter = this.EffectModel.HideFrames + 1;
        this.TickHideState();
      } else {
        this.SkeletalMeshComponent.SetVisibility(true);
      }
      this.SkeletalMeshComponent.SetHiddenInGame(false);
      this.SkeletalMeshComponent.SetPlayRate(1);
      this.SkeletalMeshComponent.PlayAnimation(this.ife, this.EffectModel.Looping);
      this.r0e(true);
      if (this.GetHandle().GetEffectType() === 0) {
        this.SkeletalMeshComponent.SetRenderInBurst(true);
      } else {
        this.SkeletalMeshComponent.SetRenderInBurst(false);
      }
    }
  }
  OnEnd() {
    if (this.SkeletalMeshComponent) {
      this.SkeletalMeshComponent.Stop();
    }
    return true;
  }
  TickHideState() {
    if (this.Handle.IsPlaying()) {
      this.HideCounter--;
      if (this.HideCounter === 0) {
        this.SkeletalMeshComponent?.SetVisibility(true);
      } else {
        this.SkeletalMeshComponent?.SetVisibility(false);
        TimerSystem_1.TimerSystem.Next(() => {
          this.TickHideState();
        });
      }
    }
  }
  OnEnterFreeze() {
    if (this.SkeletalMeshComponent) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderEffect", 36, "[EffectModelSkeletalMeshSpec]OnEnterFreeze", ["handleId", this.Handle?.Id]);
      }
      this.SkeletalMeshComponent.SetKuroOnlyTickOutside(true);
    }
  }
  OnExitFreeze() {
    if (this.SkeletalMeshComponent) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderEffect", 36, "[EffectModelSkeletalMeshSpec]OnExitFreeze", ["handleId", this.Handle?.Id]);
      }
      this.SkeletalMeshComponent.SetKuroOnlyTickOutside(false);
      this.SkeletalMeshComponent.SetComponentTickEnabled(true);
    }
  }
  OnSeekTime(t) {
    if (this.SkeletalMeshComponent && this.Handle?.IsFreeze) {
      this.SkeletalMeshComponent.KuroTickComponentOutside(t);
    }
  }
  IsOverrideTick() {
    return true;
  }
  RegisterToKuroEffectSystem() {
    var t;
    if (this.Handle && this.SkeletalMeshComponent && this.EffectModel && (t = this.Handle.GetSureEffectActor())) {
      this.HasInitTickOptimize = true;
      cpp_1.FKuroEffectSystemInterface.RegisterEffectCommonHandle(this.Handle.Id, this.Handle.Parent?.Id ?? 0, this.EffectModel, t, this.SkeletalMeshComponent);
    }
  }
}
exports.EffectModelSkeletalMeshSpec = EffectModelSkeletalMeshSpec;
//# sourceMappingURL=EffectModelSkeletalMeshSpec.js.map