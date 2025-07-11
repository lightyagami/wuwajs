"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectModelNiagaraSpec = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const TickProcessSystem_1 = require("../../../Core/Tick/TickProcessSystem");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper");
const SkeletalMeshEffectContext_1 = require("../EffectContext/SkeletalMeshEffectContext");
const NiagaraComponentHandle_1 = require("../NiagaraComponentHandle");
const EffectSpec_1 = require("./EffectSpec");
const niagaraCharBodyOpacityParameterName = new UE.FName("BodyOpacity");
const MAX_CHECK_NO_RENDERED_COUNT = 5;
class EffectModelNiagaraSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments);
    this.IsTickWhenPaused = false;
    this.T0e = undefined;
    this.t0e = false;
    this.IsEffectFinish = false;
    this.HasBoundsInternal = false;
    this.ExtraState = -1;
    this.L0e = undefined;
    this.D0e = false;
    this.R0e = false;
    this.U0e = true;
    this.A0e = true;
    this.xja = 0;
    this.P0e = -0;
    this.B$a = 0;
    this.opl = undefined;
    this.Bgl = false;
    this.b$a = false;
    this.Uoh = false;
    this.q$a = undefined;
    this.lbl = false;
    this.A$a = t => {
      this.B$a = 0;
      if (this.Uoh) {
        this.Uoh = false;
        if (this.T0e?.IsValid()) {
          UE.KuroEffectLibrary.DeactivateImmediateNiagaraComponent(this.T0e);
        }
      } else {
        if (this.Bgl) {
          this.Bgl = false;
          this.bgl();
        }
        if (!this.b$a) {
          if (this.q$a !== undefined && this.T0e?.IsValid()) {
            if (this.U0e) {
              this.U0e = false;
              if (this.T0e?.IsValid()) {
                cpp_1.FKuroEffectSystemInterface.SetNiagaraComponentPaused(this.T0e, this.q$a);
                this.R0e = this.q$a;
              }
            } else if ((this.R0e !== this.q$a || this.lbl) && this.T0e?.IsValid()) {
              cpp_1.FKuroEffectSystemInterface.SetNiagaraComponentPaused(this.T0e, this.q$a);
              this.R0e = this.q$a;
            }
            this.q$a = this.R0e;
            this.lbl = false;
          }
        }
      }
    };
    this.L0a = undefined;
    this.R0a = -1;
    this.D0a = -1;
    this.A0a = -1;
  }
  OnBodyEffectChanged(t, i) {
    var e = this.GetNiagaraComponent();
    e?.SetFloatParameter(niagaraCharBodyOpacityParameterName, t);
    e?.SetCastShadow(i && this.EffectModel.bCastShadow);
  }
  OnModifyEffectModel() {
    this.UpdateParameter(true);
  }
  SetEffectParameterNiagara(t) {
    var i = this.GetNiagaraComponent();
    if (this.IsPlaying() && i) {
      if (t.UserParameterFloat) {
        for (var [e, s] of t.UserParameterFloat) {
          i.SetFloatParameter(e, s);
        }
      }
      if (t.UserParameterColor) {
        for (var [a, h] of t.UserParameterColor) {
          i.SetColorParameter(a, h);
        }
      }
      if (t.UserParameterVector) {
        for (var [r, o] of t.UserParameterVector) {
          i.SetVectorParameter(r, o);
        }
      }
      if (t.UserParameterArrayVector) {
        for (var [f, c] of t.UserParameterArrayVector) {
          if (i instanceof NiagaraComponentHandle_1.NiagaraComponentHandle) {
            i.SetVectorArrayParameter(f, c);
          }
        }
      }
      if (t.MaterialParameterFloat) {
        for (var [n, E] of t.MaterialParameterFloat) {
          i.SetKuroNiagaraEmitterFloatParam(EffectModelNiagaraSpec.NoneEmitterString, n.toString(), E);
        }
      }
      if (t.MaterialParameterColor) {
        for (var [l, d] of t.MaterialParameterColor) {
          i.SetKuroNiagaraEmitterVectorParam(EffectModelNiagaraSpec.NoneEmitterString, l.toString(), new UE.Vector4(d));
        }
      }
    }
  }
  SetExtraState(t) {
    if (this.ExtraState !== t && (this.ExtraState = t, this.D0e = true, this.HasInitTickOptimize) && this.Handle) {
      cpp_1.FKuroEffectSystemInterface.SetNiagaraEffectExtraState(this.Handle.Id, this.ExtraState);
    }
  }
  OnInit() {
    var t = this.Handle.GetContext();
    if (!t || !(t.PlayFlag & 1)) {
      if (!this.L0e && this.EffectModel.NiagaraRef) {
        this.L0e = this.EffectModel.NiagaraRef;
      }
      t = this.L0e;
      if (!t) {
        return false;
      }
      if (!!Stats_1.Stat.Enable && !EffectModelNiagaraSpec.B0e && !EffectEnvironment_1.EffectEnvironment.CloseEffectSubStat) {
        EffectModelNiagaraSpec.B0e = Stats_1.Stat.Create("[EffectModelNiagaraSpec.Tick]");
        EffectModelNiagaraSpec.b0e = Stats_1.Stat.Create("[EffectModelNiagaraSpec.UpdateNiagara]");
        EffectModelNiagaraSpec.q0e = Stats_1.Stat.Create("[EffectModelNiagaraSpec.SetPaused]");
        EffectModelNiagaraSpec.S0e = Stats_1.Stat.Create("[EffectModelNiagaraSpec.Tick.UpdateParameter]");
        EffectModelNiagaraSpec.G0e = Stats_1.Stat.Create("[EffectModelNiagaraSpec.OnInit]");
      }
      EffectModelNiagaraSpec.G0e?.Start();
      var i = this.Handle.GetSureEffectActor();
      var e = this.Handle.Parent;
      var e = e ? e.GetEffectSpec()?.GetSceneComponent() : i.K2_GetRootComponent();
      var s = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(i, UE.NiagaraComponent.StaticClass(), e, undefined, true, this.EffectModel);
      this.SceneComponent = s;
      this.T0e = s;
      this.t0e = this.T0e.IsComponentTickEnabled();
      UE.KuroEffectLibrary.InitModelNiagaraSpec(this.T0e, this.GetEffectType() === 1, this.EffectModel.ReceiveDecal, this.EffectModel.TranslucencySortPriority);
      this.N0e();
      i.FinishAddComponent(this.T0e, e !== undefined, MathUtils_1.MathUtils.DefaultTransform);
      this.A0e = this.EffectModel.DeactivateOnStop;
      this.T0e.SetAsset(t);
      this.T0e.SetCastShadow(this.EffectModel.bCastShadow);
      this.IsTickWhenPaused = t.bEvenTickWhenPaused;
      if (!this.IsTickWhenPaused && (!!GlobalData_1.GlobalData.IsUiSceneLoading || !!GlobalData_1.GlobalData.IsUiSceneOpen)) {
        t.bEvenTickWhenPaused = this.IsTickWhenPaused = true;
      }
      EffectModelNiagaraSpec.G0e?.Stop();
    }
    return true;
  }
  OnTick(t) {
    EffectModelNiagaraSpec.B0e?.Start();
    if (this.T0e) {
      if (!this.Handle?.GetIgnoreTimeScale()) {
        EffectModelNiagaraSpec.b0e?.Start();
        this.k0e(t);
        EffectModelNiagaraSpec.b0e?.Stop();
      }
      EffectModelNiagaraSpec.S0e?.Start();
      this.UpdateParameter(false);
      EffectModelNiagaraSpec.S0e?.Stop();
      EffectModelNiagaraSpec.B0e?.Stop();
      this.U0a();
      if (!!Info_1.Info.IsGameRunning() && !this.Handle?.IsPreview && !TickSystem_1.TickSystem.IsPaused) {
        if (this.LifeTime.IsAfterStart && this.P0e > 0 && (this.P0e -= t, this.P0e <= 0)) {
          if (this.HasBounds()) {
            if (!this.Handle?.GetSureEffectActor()?.WasRecentlyRenderedOnScreen()) {
              this.Handle?.OnVisibilityChanged(false);
            }
          } else if (!this.T0e || UE.KuroRenderingRuntimeBPPluginBPLibrary.IsNiagaraComplete(this.T0e) || this.xja > MAX_CHECK_NO_RENDERED_COUNT) {
            if (!this.Handle?.GetSureEffectActor()?.WasRecentlyRenderedOnScreen()) {
              this.Handle?.OnVisibilityChanged(false);
            }
            this.HasBoundsInternal = true;
          } else {
            this.P0e = 1;
            this.xja++;
          }
        }
      }
    } else {
      EffectModelNiagaraSpec.B0e?.Stop();
    }
  }
  HasBounds() {
    return !!this.HasBoundsInternal || (this.T0e ? this.HasBoundsInternal = UE.KuroEffectLibrary.IsNiagaraComponentHasBound(this.T0e, 0.1) : this.HasBoundsInternal = true, this.HasBoundsInternal);
  }
  k0e(t) {
    var i;
    if (TickSystem_1.TickSystem.IsPaused && !this.Handle?.GetRoot().TickWithoutGameBudget || (i = this.GetTimeScale() * this.GetGlobalTimeScale()) == 0) {
      this.F0e(true);
    } else {
      this.F0e(false);
      if (i != 1) {
        UE.KuroEffectLibrary.SetNiagaraFrameDeltaTime(this.T0e, t);
      }
    }
  }
  UpdateParameter(t) {
    UE.KuroEffectLibrary.UpdateEffectModelNiagaraSpec(this.EffectModel, this.T0e, t || this.D0e, this.LifeTime.PassTime, this.ExtraState);
    this.D0e = false;
  }
  SetStoppingTime(t) {
    if (this.StoppingTimeInternal !== t) {
      super.SetStoppingTime(t);
      if (this.StoppingTimeInternal) {
        this.F0e(true, true);
      } else {
        this.F0e(false, true);
      }
    }
  }
  F0e(t, i = false) {
    EffectModelNiagaraSpec.q0e?.Start();
    if (t !== this.q$a) {
      this.q$a = t;
      this.lbl = i;
      if (!Info_1.Info.IsGameRunning() && this.Handle?.IsPreview) {
        this.A$a(0);
      } else if (this.B$a === 0) {
        this.B$a = TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(5, true, this.A$a);
      }
    }
    EffectModelNiagaraSpec.q0e?.Stop();
  }
  GetSkeletalMeshComp() {
    let t = undefined;
    var i = this.Handle?.GetContext();
    if (i) {
      if (i instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext) {
        t = i.SkeletalMeshComp;
      } else if (i.SourceObject instanceof UE.Actor) {
        t = i.SourceObject.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
      }
    }
    return t = (t = t === undefined && (i = this.Handle.GetSureEffectActor().GetParentComponent(), UE.KismetSystemLibrary.IsValid(i)) && (i = i.GetAttachParent(), UE.KismetSystemLibrary.IsValid(i)) && i.GetClass() === UE.SkeletalMeshComponent.StaticClass() ? i : t) === undefined && (i = this.Handle.GetSureEffectActor().RootComponent.GetAttachParent(), UE.KismetSystemLibrary.IsValid(i)) && i.GetClass() === UE.SkeletalMeshComponent.StaticClass() ? i : t;
  }
  N0e() {
    if (this.T0e) {
      if (!EffectModelNiagaraSpec.V0e) {
        EffectModelNiagaraSpec.V0e = true;
        UE.KuroEffectLibrary.SetOnSystemFinishedDelegate((0, puerts_1.toManualReleaseDelegate)(EffectModelNiagaraSpec.H0e));
      }
      UE.KuroEffectLibrary.RegisterOnSystemFinished(this.T0e);
      if (!EffectModelNiagaraSpec.j0e) {
        EffectModelNiagaraSpec.j0e = true;
        UE.KuroEffectLibrary.SetOnSystemPausedDelegate((0, puerts_1.toManualReleaseDelegate)(EffectModelNiagaraSpec.W0e));
      }
      UE.KuroEffectLibrary.RegisterOnSystemPaused(this.T0e);
    }
  }
  OnStart() {
    if (this.T0e) {
      EffectModelNiagaraSpec.K0e.set(this.T0e, this);
    }
    return true;
  }
  GetNiagaraComponent() {
    return this.opl || this.T0e;
  }
  GetSureNiagaraComponent() {
    return this.T0e;
  }
  OnParentInit() {
    this.OnBeginDelayPlay();
  }
  OnBeginDelayPlay() {
    if (!!Info_1.Info.IsGameRunning() && !this.Handle?.IsPreview && !this.opl) {
      this.opl = new NiagaraComponentHandle_1.NiagaraComponentHandle();
    }
  }
  OnPlay(t) {
    var i;
    this.IsEffectFinish = false;
    this.HasBoundsInternal = false;
    if (this.L0e && this.T0e?.IsValid()) {
      i = this.Handle?.GetContext();
      if (!this.EffectModel.HideForProtoPlayer || !i || !EffectModelNiagaraSpec.IsNeedQualityBias(i.EntityId)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TestEffectAddEffectRec, this.Handle.Path);
        this.F0e(false);
        if (EffectEnvironment_1.EffectEnvironment.OpenVisibilityOptimize && !this.Handle?.GetRoot().IgnoreVisibilityOptimize) {
          this.P0e = 1;
        }
        if (this.T0e.GetWorld().GetName()) {
          this.T0e.SetComponentTickEnabled(this.t0e);
        }
        if (GlobalData_1.GlobalData.IsUiSceneLoading || GlobalData_1.GlobalData.IsUiSceneOpen) {
          if (!this.IsTickWhenPaused) {
            this.L0e.bEvenTickWhenPaused = this.IsTickWhenPaused = true;
          }
        } else if (this.IsTickWhenPaused) {
          this.L0e.bEvenTickWhenPaused = this.IsTickWhenPaused = false;
        }
        if (Info_1.Info.IsGameRunning() && !this.Handle?.IsPreview) {
          this.Bgl = true;
          this.opl ||= new NiagaraComponentHandle_1.NiagaraComponentHandle();
          if (this.B$a === 0) {
            this.B$a = TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(5, true, this.A$a);
          }
        } else {
          this.bgl();
        }
      }
    }
  }
  bgl() {
    var t;
    if (this.T0e?.IsValid()) {
      this.T0e.SetVisibility(true, false);
      this.T0e.ResetOverrideParametersAndActivate();
      if (this.EffectModel?.IgnoreMobileSimulationOptimize) {
        UE.KuroEffectLibrary.SetNiagaraSimulationMinDeltaTime(this.T0e, -1);
      }
      if (this.T0e.HasAnyEmittersComplete() && (this.T0e.SetAsset(undefined), this.T0e.SetAsset(this.L0e), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("RenderEffect", 36, "彻底重启NiagaraComponent");
      }
      if (this.T0e.HasSkeletalMeshDataInterface()) {
        UE.KuroRenderingRuntimeBPPluginBPLibrary.SetNiagaraSkeletalMeshComponentWithoutWarning(this.T0e, EffectModelNiagaraSpec.SkeletalMeshString, this.GetSkeletalMeshComp());
      }
      if ((t = this.Handle?.GetContext()) && EffectModelNiagaraSpec.IsNeedQualityBias(t.EntityId)) {
        this.T0e.SetEmitterQualityLevelBias(EffectEnvironment_1.EffectEnvironment.EffectQualityBiasRemote);
      }
      if (this.GetHandle().GetEffectType() === 0) {
        this.T0e.SetRenderInBurst(true);
      } else {
        this.T0e.SetRenderInBurst(false);
      }
      this.UpdateParameter(true);
      if (this.opl) {
        this.opl.InitNiagaraComponent(this.T0e);
        this.opl = undefined;
      }
      this.oWl();
    } else {
      this.opl &&= undefined;
    }
  }
  OnPreStop() {
    if (this.T0e?.IsValid() && this.A0e) {
      this.b$a = true;
      this.T0e.Deactivate();
    }
  }
  OnStop(t, i) {
    if (this.B$a !== 0) {
      TickProcessSystem_1.TickProcessSystem.UnregisterTickProcess(this.B$a);
      this.B$a = 0;
    }
    this.w0a();
    if (this.T0e?.IsValid()) {
      if (i) {
        this.T0e.SetVisibility(false);
      }
      this.b$a = true;
      this.Uoh = true;
      this.T0e.SetComponentTickEnabled(false);
      if (!Info_1.Info.IsGameRunning() && this.Handle?.IsPreview) {
        this.A$a(0);
      } else if (this.B$a === 0) {
        this.B$a = TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(5, true, this.A$a);
      }
    }
  }
  SetNiagaraSolo(t) {
    if (this.T0e && this.T0e.GetForceSolo() !== t) {
      this.T0e.SetForceSolo(t);
      if (t) {
        this.T0e.Activate(true);
      } else {
        this.T0e.Deactivate();
      }
    }
  }
  DebugTick(t) {
    if (this.IsPlaying() && (this.LifeTime.Tick(t), this.T0e)) {
      this.F0e(false);
      this.T0e.AdvanceSimulation(1, t);
      this.F0e(true);
      this.UpdateParameter(false);
    }
  }
  OnEnd() {
    if (this.T0e && EffectModelNiagaraSpec.K0e.has(this.T0e)) {
      EffectModelNiagaraSpec.K0e.delete(this.T0e);
    }
    return true;
  }
  NeedVisibilityTest() {
    return true;
  }
  OnEnableChanged(t) {
    if (this.T0e?.IsValid() && this.IsPlaying()) {
      this.F0e(!t);
    }
  }
  OnReplay() {
    this.B$a = 0;
    this.b$a = false;
    this.Uoh = false;
    this.Bgl = false;
    this.q$a = undefined;
    this.U0e = true;
    this.R0e = false;
    this.IsEffectFinish = false;
    this.HasBoundsInternal = false;
    this.xja = 0;
    this.P0e = 0;
    this.w0a();
  }
  DebugErrorNiagaraPauseCount() {
    if (this.T0e && this.T0e.IsPaused() !== this.R0e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderEffect", 36, "NiagaraPauseError", ["CachePaused", this.R0e], ["UePause", this.T0e.IsPaused()], ["Path", this.Handle.Path]);
      }
      return 1;
    } else {
      return 0;
    }
  }
  static IsNeedQualityBias(t) {
    var i;
    return !!t && !!(t = ModelManager_1.ModelManager.CharacterModel.GetHandle(t))?.Valid && ((i = (t = t.Entity).GetComponent(0)).GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && !t.GetComponent(3).IsAutonomousProxy || !(i = ModelManager_1.ModelManager.CreatureModel.GetEntityId(i.GetSummonerId()), !(i = EntitySystem_1.EntitySystem.Get(i)?.GetComponent(0)) || i.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player || t.GetComponent(3).IsAutonomousProxy));
  }
  IsUseBoundsCalculateDistance() {
    return true;
  }
  OnEffectTypeChange() {
    if (this.T0e?.IsValid()) {
      this.T0e.SetIsUIScenePrimitive(this.GetEffectType() === 1);
    }
  }
  w0a() {
    this.L0a = undefined;
    this.R0a = -1;
    this.D0a = -1;
    this.A0a = -1;
  }
  SetPublicToSequence(t) {
    this.L0a = t;
  }
  U0a() {
    var t;
    var i;
    var e;
    var s;
    if (this.L0a && this.T0e?.IsValid()) {
      if (this.L0a.IsValid()) {
        s = this.L0a.FloatParameter0;
        t = this.L0a.FloatParameter1;
        i = this.L0a.FloatParameter2;
        if (this.R0a !== s) {
          this.R0a = s;
          e = this.L0a.FloatParameterName0;
          if (!StringUtils_1.StringUtils.IsEmpty(e)) {
            this.T0e.SetFloatParameter(new UE.FName(e), s);
          }
        }
        if (this.D0a !== t) {
          this.D0a = t;
          e = this.L0a.FloatParameterName1;
          if (!StringUtils_1.StringUtils.IsEmpty(e)) {
            this.T0e.SetFloatParameter(new UE.FName(e), t);
          }
        }
        if (this.A0a !== i) {
          this.A0a = i;
          s = this.L0a.FloatParameterName2;
          if (!StringUtils_1.StringUtils.IsEmpty(s)) {
            this.T0e.SetFloatParameter(new UE.FName(s), i);
          }
        }
      } else {
        this.w0a();
      }
    }
  }
  oWl() {
    var t;
    var i;
    var e;
    if (this.L0e && this.T0e?.IsValid() && (t = UE.KuroInteractionEffectSystem.GetKuroInteractionEffectSystem(this.T0e.GetWorld()), e = this.Handle?.GetOwnerEntityId(), i = this.Handle?.GetInteractionEffectComponent()) && i.IsValid() && ((e = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e))?.Valid && (e = e.Entity.GetComponent(0)?.GetModelConfig()) && (i.ModelConfigId = e.ID, i.bUseSPModelCharacterData && t && t?.RegisterSPModelCharacterEIComp(this.T0e, i), i.bUseSPModelShiftColor) && !UE.KismetSystemLibrary.GetPathName(this.L0e).includes("Aki/Effect/Niagara/NI_Common/") && i.SetNiagaraCompShiftColor(this.T0e), i.bCalEnviInteractionData) && t) {
      t?.RegisterNDIKuroRenderingEIComp(this.T0e, i);
    }
  }
  GetDebugErrorCode() {
    if (this.T0e?.IsValid) {
      if (this.U0e || this.T0e.IsPaused() === this.R0e) {
        return 0;
      } else {
        return 3;
      }
    } else {
      return 2;
    }
  }
  IsOverrideTick() {
    return true;
  }
  RegisterToKuroEffectSystem() {
    var t;
    if (this.Handle && this.T0e && this.EffectModel && (t = this.Handle.GetSureEffectActor())) {
      this.HasInitTickOptimize = true;
      cpp_1.FKuroEffectSystemInterface.RegisterEffectCommonHandle(this.Handle.Id, this.Handle.Parent?.Id ?? 0, this.EffectModel, t, this.T0e);
      cpp_1.FKuroEffectSystemInterface.SetNiagaraEffectExtraState(this.Handle.Id, this.ExtraState);
    }
  }
}
exports.EffectModelNiagaraSpec = EffectModelNiagaraSpec;
(_a = EffectModelNiagaraSpec).SkeletalMeshString = "UserSkeletalMesh";
EffectModelNiagaraSpec.NoneEmitterString = "None";
EffectModelNiagaraSpec.G0e = undefined;
EffectModelNiagaraSpec.B0e = undefined;
EffectModelNiagaraSpec.b0e = undefined;
EffectModelNiagaraSpec.q0e = undefined;
EffectModelNiagaraSpec.S0e = undefined;
EffectModelNiagaraSpec.K0e = new Map();
EffectModelNiagaraSpec.V0e = false;
EffectModelNiagaraSpec.j0e = false;
EffectModelNiagaraSpec.H0e = t => {
  if (EffectModelNiagaraSpec.K0e.has(t) && (t = EffectModelNiagaraSpec.K0e.get(t))) {
    t.IsEffectFinish = true;
  }
};
EffectModelNiagaraSpec.Q0e = 0;
EffectModelNiagaraSpec.W0e = (t, i) => {
  _a.Q0e++;
  if (EffectModelNiagaraSpec.K0e.has(t) && ((t = EffectModelNiagaraSpec.K0e.get(t)) && (t.R0e = i), Log_1.Log.CheckDebug())) {
    Log_1.Log.Debug("RenderEffect", 36, "OnSystemPausedDelegate", ["Count", _a.Q0e]);
  }
}; //# sourceMappingURL=EffectModelNiagaraSpec.js.map