"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectSpec = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectLifeTime_1 = require("../EffectLifeTime");
const SMALLER_ONE = 0.99;
const LARGER_ONE = 1.01;
const MAX_WAIT_TIME_SCALE_ZERO_TIME = 10000;
const MAX_WAIT_TIME_SCALE_VALUE = 0.1;
class EffectSpec {
  constructor() {
    this.Handle = undefined;
    this.afe = undefined;
    this.LifeTime = new EffectLifeTime_1.EffectLifeTime(this);
    this.InitPromise = undefined;
    this.EffectModel = undefined;
    this.hfe = false;
    this.SceneComponent = undefined;
    this.lfe = false;
    this.Stopping = false;
    this.StopFlag = false;
    this._fe = false;
    this.LastPlayTime = 0;
    this.bge = 1;
    this.qEl = false;
    this.StoppingTimeInternal = false;
    this.LastStopTime = 0;
    this.ufe = 3;
    this.cfe = false;
    this.xhl = false;
    this.BodyEffectVisible = true;
    this.BodyEffectOpacity = 1;
    this.mfe = false;
    this.ae = -0;
    this.dfe = -0;
    this.Cfe = -0;
    this.gW = undefined;
    this.gfe = undefined;
    this.ffe = undefined;
    this.pfe = undefined;
    this.Visible = false;
    this.Enable = true;
    this.HasInitTickOptimize = false;
  }
  GetHandle() {
    return this.Handle;
  }
  SetHandle(t) {
    this.Handle = t;
  }
  GetProxyHandle() {
    return this.afe;
  }
  SetProxyHandle(t) {
    this.afe = t;
  }
  GetEffectModel() {
    return this.EffectModel;
  }
  GetPlayInEditor() {
    return this.hfe;
  }
  SetPlayInEditor(t) {
    this.hfe = t;
  }
  GetSceneComponent() {
    return this.SceneComponent;
  }
  SetPlaying(t) {
    if (this.lfe !== t && (this.lfe = t, EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) && this.Handle && this.HasInitTickOptimize) {
      cpp_1.FKuroEffectSystemInterface.SetEffectHandleIsPlaying(this.Handle.Id, this.lfe);
    }
  }
  SetStopping(t) {
    if (this.Stopping !== t) {
      this.Stopping = t;
      if (Info_1.Info.IsPlayInEditor && this.Stopping) {
        this.LastStopTime = EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds;
      }
      if (EffectEnvironment_1.EffectEnvironment.OpenTickOptimize && this.Handle && this.HasInitTickOptimize) {
        cpp_1.FKuroEffectSystemInterface.SetEffectHandleIsStopping(this.Handle.Id, this.Stopping);
      } else if (this.Stopping) {
        this.LifeTime.WhenEnterStopping();
      }
    }
  }
  SetStopFlag(t) {
    this.StopFlag = t;
  }
  GetStopFlag() {
    return this.StopFlag;
  }
  DebugErrorNiagaraPauseCount() {
    return 0;
  }
  SetEffectParameterNiagara(t) {}
  SetExtraState(t) {}
  GetTimeScale() {
    if (this.StoppingTimeInternal) {
      return 0;
    } else {
      return this.bge;
    }
  }
  GetGlobalTimeScale() {
    if (this.ufe === 1 || this.GetIgnoreGlobalTimeScale() || this.qEl) {
      return 1;
    } else {
      return EffectEnvironment_1.EffectEnvironment.GlobalTimeScale;
    }
  }
  SetTimeScale(t, i = false, s = false) {
    var e;
    if ((this.bge !== t || i) && (this.GetIgnoreTimeScale() || (this.qEl = s, i = t * this.GetGlobalTimeScale(), this.Handle?.IsRoot() && ((e = this.Handle?.GetSureEffectActor()) && (e.CustomTimeDilation = i, e.IsA(UE.TsEffectActor_C.StaticClass())) && e.SetTimeScale(i), this.Handle.OnTimeScaleChange(t, s)), this.Handle?.StoppingTime) || (this.LifeTime.SetTimeScale(i), t < MAX_WAIT_TIME_SCALE_VALUE && this.bge >= MAX_WAIT_TIME_SCALE_VALUE && this.Handle?.IsRoot ? this.LifeTime.RegisterWaitMiniTimeScale(MAX_WAIT_TIME_SCALE_ZERO_TIME) : t >= MAX_WAIT_TIME_SCALE_VALUE && this.bge < MAX_WAIT_TIME_SCALE_VALUE && this.Handle?.IsRoot && this.LifeTime.UnregisterWaitMiniTimeScale()), EffectEnvironment_1.EffectEnvironment.UseLog && Log_1.Log.CheckDebug() && Log_1.Log.Debug("RenderEffect", 36, "特效框架:Spec SetTimeScale", ["句柄Id", this.Handle?.Id], ["Path", this.Handle?.Path], ["timeScale", t]), this.bge = t, EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) && this.Handle && this.HasInitTickOptimize) {
      cpp_1.FKuroEffectSystemInterface.SetEffectTimeScale(this.Handle.Id, this.bge, this.qEl);
    }
  }
  OnGlobalTimeScaleChange() {
    if (!this.Handle?.StoppingTime && !this.GetIgnoreTimeScale()) {
      this.LifeTime.SetTimeScale(this.bge * this.GetGlobalTimeScale());
      this.SetTimeScale(this.bge, true);
    }
    this.LifeTime.OnGlobalTimeScaleChange();
  }
  get InStoppingTime() {
    return this.StoppingTimeInternal;
  }
  OnGlobalStoppingTimeChange(t) {
    this.SetStoppingTime(false);
    if (t) {
      this.LifeTime.UnregisterWaitMiniTimeScale();
      this.LifeTime.SetTimeScale(0);
    } else {
      this.SetTimeScale(this.bge, true);
    }
  }
  SetStoppingTime(t) {
    if (this.StoppingTimeInternal !== t && (this.StoppingTimeInternal = t, EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) && this.HasInitTickOptimize && this.Handle) {
      cpp_1.FKuroEffectSystemInterface.SetEffectInStoppingTime(this.Handle.Id, this.StoppingTimeInternal);
    }
  }
  EnterStopping() {
    var t;
    this.SetStoppingTime(true);
    if (!this.GetIgnoreTimeScale()) {
      if (this.Handle?.IsRoot() && (t = this.Handle?.GetSureEffectActor()) && (t.CustomTimeDilation = 0, t.IsA(UE.TsEffectActor_C.StaticClass()))) {
        t.SetTimeScale(0);
      }
    }
  }
  SetLifeCycle(t) {
    if (!(t < 0)) {
      this.LifeTime.SetLifeCycle(t);
    }
  }
  GetLastPlayTime() {
    return this.LastPlayTime;
  }
  GetLastStopTime() {
    return this.LastStopTime;
  }
  IsPlaying() {
    return this.lfe || this.Stopping;
  }
  IsStopping() {
    return this.Stopping;
  }
  IsReallyPlaying() {
    return this.lfe;
  }
  IsClear() {
    return !!(this.ige & 64);
  }
  IsValid() {
    return !!(this.ige & 2) && !this.IsClear();
  }
  get ige() {
    return this.Handle?.GetFlag() ?? 0;
  }
  GetTotalPassTime() {
    return this.LifeTime.TotalPassTime;
  }
  get PassTime() {
    return this.LifeTime.PassTime;
  }
  GetEffectType() {
    return this.ufe;
  }
  SetEffectType(t) {
    if (this.ufe !== t) {
      this.ufe = t;
      this.OnEffectTypeChange();
    }
  }
  OnEffectTypeChange() {}
  GetLifeTime() {
    return this.LifeTime;
  }
  get IsLoop() {
    return this.LifeTime.IsLoop;
  }
  GetIgnoreTimeScale() {
    return this.cfe;
  }
  GetIgnoreGlobalTimeScale() {
    return this.xhl;
  }
  Zba() {
    let t = undefined;
    var i = this.Handle?.GetSureEffectActor()?.GetAttachParentActor();
    var s = this.Handle.GetContext();
    var e = s;
    if (this.EffectModel.NeedDisableWithActor && s?.EntityId) {
      var h = EntitySystem_1.EntitySystem.Get(s.EntityId)?.GetComponent(3)?.Owner;
      if (h instanceof TsBaseCharacter_1.default) {
        return h.CharRenderingComponent;
      }
    }
    if (this.EffectModel.LoopTime > 0 || this.EffectModel.NeedDisableWithActor) {
      if (e) {
        h = e.SkeletalMeshComp?.GetOwner();
        t = h?.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
      }
      t = t || i?.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
    }
    if (!t && !!this.EffectModel.NeedDisableWithActor && !(e = s?.SourceObject, t = e && e !== i ? e.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass()) : t)) {
      if ((h = s?.SourceObject?.GetOwner()) && h !== i) {
        t = h.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
      }
    }
    return t;
  }
  ShouldRegisterBodyEffect() {
    return true;
  }
  RegisterBodyEffect() {
    var t;
    if (this.ShouldRegisterBodyEffect() && (this.BodyEffectOpacity = 1, this.BodyEffectVisible = true, t = this.Zba())) {
      t.RegisterBodyEffect(this.Handle.Id);
    }
  }
  UnregisterBodyEffect() {
    var t = this.Zba();
    if (t) {
      t.UnregisterBodyEffect(this.Handle.Id);
    }
  }
  UpdateBodyEffect(t, i, s) {
    if (!Info_1.Info.IsInEditorTick()) {
      this.BodyEffectOpacity = t;
      if (this.Handle.IsRoot() && this.BodyEffectVisible !== i) {
        this.BodyEffectVisible = i;
        this.Handle.SetHidden(!i, "UpdateBodyEffect");
      }
      if (i) {
        this.OnBodyEffectChanged(this.BodyEffectOpacity, s);
      }
    }
  }
  GetHideOnBurstSkill() {
    return this.mfe;
  }
  async Init(t) {
    this.EffectModel = t;
    if (Stats_1.Stat.Enable && !EffectEnvironment_1.EffectEnvironment.CloseEffectSubStat) {
      this.gW = Stats_1.Stat.CreateNoFlameGraph("[EffectSpec.Tick] Path:" + this.Handle.Path);
      this.gfe = Stats_1.Stat.CreateNoFlameGraph("[EffectSpec.Tick.RefreshTime] Path:" + this.Handle.Path);
      this.ffe = Stats_1.Stat.CreateNoFlameGraph("[EffectSpec.LiftTick] Path:" + this.Handle.Path);
      this.pfe = Stats_1.Stat.CreateNoFlameGraph("[EffectSpec.OnTickStat] Path:" + this.Handle.Path);
    }
    this.cfe = t.IgnoreTimeDilation;
    this.xhl = t.IgnoreGlobalTimeDilation;
    if (!this.Handle.IsRoot()) {
      if (t.IsA(UE.EffectModelGroup_C.StaticClass())) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderEffect", 3, "子特效不能是DA_Fx_Group", ["父特效Path", this.Handle.GetRoot().Path], ["Path", this.Handle.Path]);
        }
        return 0;
      }
      this.SetEffectType(this.Handle.Parent.GetEffectSpec().GetEffectType());
      this.SetTimeScale(this.Handle.Parent.GetTimeScale());
    }
    this.mfe = t.HideOnBurstSkill;
    this.ae = t.StartTime;
    this.dfe = t.LoopTime;
    this.Cfe = t.EndTime;
    this._fe = this.OnTick !== EffectSpec.prototype.OnTick;
    if (this.OnInit()) {
      if (this.InitPromise) {
        return await this.InitPromise.Promise;
      } else {
        return 5;
      }
    } else {
      return 0;
    }
  }
  Start() {
    return !!this.OnStart();
  }
  Tick(i) {
    this.gW?.Start();
    if (this.IsPlaying()) {
      if (this.Handle?.GetGlobalStoppingTime() && this.Handle.GetRoot().StoppingTime) {
        if (this.StoppingTimeInternal) {
          this.gW?.Stop();
          return;
        }
        if (this.LifeTime.IsAfterStart && this.LifeTime.TotalPassTime >= this.Handle.GetGlobalStoppingPlayTime()) {
          this.EnterStopping();
          this.gW?.Stop();
        }
      }
      let t = i;
      var s;
      var e;
      this.gfe?.Start();
      if (!this.GetIgnoreTimeScale() && (s = this.GetGlobalTimeScale(), e = this.GetTimeScale(), s < SMALLER_ONE || s > LARGER_ONE || e < SMALLER_ONE || e > LARGER_ONE)) {
        t = i * s * e;
      }
      this.gfe?.Stop();
      if (this._fe) {
        this.pfe?.Start();
        this.OnTick(t);
        this.pfe?.Stop();
      }
      this.ffe?.Start();
      this.LifeTime.Tick(t);
      this.ffe?.Stop();
    }
    this.gW?.Stop();
  }
  IsVisible() {
    return !this.HasBounds() || !this.LifeTime.IsAfterStart || !!this.Handle?.IgnoreVisibilityOptimize || this.Visible;
  }
  HasBounds() {
    return true;
  }
  IsEnable() {
    return this.Enable;
  }
  VisibilityChanged(t) {
    this.Visible = t;
  }
  EnableChanged(t) {
    this.Enable = t;
    this.OnEnableChanged(t);
  }
  End() {
    return !(this.ige & 2) || (this.ige & 32 ? (Log_1.Log.CheckError() && Log_1.Log.Error("RenderEffect", 3, "重复执行End", ["EffectSpec", this.constructor.name], ["Path", this.Handle.Path]), false) : this.OnEnd());
  }
  Clear() {
    var t;
    if (this.ige & 64) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 3, "重复执行Clear", ["EffectSpec", this.constructor.name], ["Path", this.Handle.Path]);
      }
      return false;
    } else {
      t = this.OnClear();
      if (this.SceneComponent?.IsValid()) {
        this.SceneComponent.K2_DestroyComponent(this.Handle.GetSureEffectActor());
      }
      this.SceneComponent = undefined;
      this.SetPlaying(false);
      this.SetStopping(false);
      this.EffectModel = undefined;
      this.LifeTime.Clear();
      this.Handle = undefined;
      this.hfe = false;
      this._fe = false;
      return t;
    }
  }
  Destroy() {}
  OnInit() {
    return true;
  }
  OnStart() {
    return true;
  }
  OnEnd() {
    return true;
  }
  OnClear() {
    return true;
  }
  OnTick(t) {}
  OnReplay() {}
  OnParentInit() {}
  OnBeginDelayPlay() {}
  OnPlay(t) {}
  OnCanStop() {
    return true;
  }
  OnPreStop() {}
  OnStop(t, i) {}
  NeedVisibilityTest() {
    return false;
  }
  OnBodyEffectChanged(t, i) {}
  OnEnableChanged(t) {}
  Replay() {
    this.bge = 1;
    this.LifeTime.OnReplay();
    this.Visible = false;
    this.Enable = true;
    this.StoppingTimeInternal = false;
    this.HasInitTickOptimize = false;
    this.qEl = false;
    this.LastPlayTime = 0;
    this.LastStopTime = 0;
    this.OnReplay();
    this.SetStopping(false);
  }
  Play(t) {
    var i;
    var s;
    this.SetPlaying(true);
    if (this.IsValid() && (this.LifeTime.SetTime(this.ae, this.dfe, this.Cfe), this.Handle?.StoppingTime || this.GetIgnoreTimeScale() || this.LifeTime.SetTimeScale(this.bge * this.GetGlobalTimeScale()), (i = this.Handle?.GetContext()?.EntityId) && ((s = this.Handle?.GetSureEffectActor()) && s.IsA(UE.TsEffectActor_C.StaticClass()) ? s.OwnerEntityId = i : s && s.IsA(UE.EffectSystemActor.StaticClass()) && s.SetOwnerEntityId(i)), this.LastPlayTime = EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BeforePlayEffect, this.Handle.Id, t), this.OnPlay(t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AfterPlayEffect, this.Handle.Id, t), this.Handle.IsRoot())) {
      this.RegisterBodyEffect();
    }
  }
  CanStop() {
    return this.OnCanStop();
  }
  PreStop() {
    if (!(this.ige & 8)) {
      this.OnPreStop();
    }
  }
  Stop(t, i) {
    if (!(this.ige & 16)) {
      this.SetPlaying(false);
      if (this.Stopping) {
        this.SetStopping(false);
      } else {
        this.LastStopTime = EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds;
      }
      if (i) {
        this.LifeTime.Clear();
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FinishEffect, this.Handle.Id, t, i);
      if (this.IsValid()) {
        this.OnStop(t, i);
      }
    }
  }
  OnEnterPool() {}
  OnSeekTime(t) {}
  SeekTo(t, i = true, s = false, e = 0) {
    e = e !== 0 ? e : t - this.LifeTime.GetPassTime;
    this.OnSeekTime(e);
    if (t === this.LifeTime.GetPassTime || !this.LifeTime.SeekTo(t, s, false, i)) {
      if (this._fe) {
        this.OnTick(e > 0 ? e : 0);
      }
    }
  }
  SeekDelta(t, i = true, s = false, e = 0) {
    t = this.LifeTime.PassTime + t;
    this.SeekTo(t, i, s);
    if (this._fe && e !== 0) {
      this.OnTick(e);
    }
  }
  SetThreeStageTime(t, i, s, e) {
    this.LifeTime.SetTime(t, i, s);
    if (e) {
      this.LifeTime.Clear();
    }
  }
  NeedAlwaysTick() {
    return false;
  }
  IsUseBoundsCalculateDistance() {
    return false;
  }
  FreezeEffect(t) {
    if (t) {
      this.OnEnterFreeze();
    } else {
      this.OnExitFreeze();
    }
  }
  OnEnterFreeze() {}
  OnExitFreeze() {}
  OnModifyEffectModel() {}
  GetDebugErrorCode() {
    return 0;
  }
  HasMaterialParameters() {
    return false;
  }
  GetMaterialParameters() {}
  CollectMaterialFloatCurve(t, i) {
    var s;
    if (this.HasMaterialParameters()) {
      if (this.HasInitTickOptimize && this.Handle) {
        cpp_1.FKuroEffectSystemInterface.CollectEffectFloatCurve(this.Handle.Id, t, i);
      } else if (s = this.GetMaterialParameters()) {
        s.CollectFloatCurve(t, i);
      }
    }
  }
  CollectMaterialVectorCurve(t, i) {
    var s;
    if (this.HasMaterialParameters()) {
      if (this.HasInitTickOptimize && this.Handle) {
        cpp_1.FKuroEffectSystemInterface.CollectEffectVectorCurve(this.Handle.Id, t, i);
      } else if (s = this.GetMaterialParameters()) {
        s.CollectVectorCurve(t, i);
      }
    }
  }
  CollectMaterialLinearColorCurve(t, i) {
    var s;
    if (this.HasMaterialParameters()) {
      if (this.HasInitTickOptimize && this.Handle) {
        cpp_1.FKuroEffectSystemInterface.CollectEffectLinearColorCurve(this.Handle.Id, t, i);
      } else if (s = this.GetMaterialParameters()) {
        s.CollectLinearColorCurve(t, i);
      }
    }
  }
  CollectMaterialFloatConst(t, i) {
    var s;
    if (this.HasMaterialParameters()) {
      if (this.HasInitTickOptimize && this.Handle) {
        cpp_1.FKuroEffectSystemInterface.CollectEffectFloatConst(this.Handle.Id, t, i);
      } else if (s = this.GetMaterialParameters()) {
        s.CollectFloatConst(t, i);
      }
    }
  }
  CollectMaterialVectorConst(t, i) {
    var s;
    if (this.HasMaterialParameters()) {
      if (this.HasInitTickOptimize && this.Handle) {
        cpp_1.FKuroEffectSystemInterface.CollectEffectVectorConst(this.Handle.Id, t, i);
      } else if (s = this.GetMaterialParameters()) {
        s.CollectVectorConst(t, i);
      }
    }
  }
  CollectMaterialLinearColorConst(t, i) {
    var s;
    if (this.HasMaterialParameters()) {
      if (this.HasInitTickOptimize && this.Handle) {
        cpp_1.FKuroEffectSystemInterface.CollectEffectLinearColorConst(this.Handle.Id, t, i);
      } else if (s = this.GetMaterialParameters()) {
        s.CollectLinearColorConst(t, i);
      }
    }
  }
  RemoveMaterialFloatCurveOrConst(t) {
    var i;
    if (this.HasMaterialParameters()) {
      if (this.HasInitTickOptimize && this.Handle) {
        cpp_1.FKuroEffectSystemInterface.RemoveEffectFloatCurveOrConst(this.Handle.Id, t);
      } else if (i = this.GetMaterialParameters()) {
        i.RemoveFloatCurveOrConst(t);
      }
    }
  }
  RemoveMaterialVectorCurveOrConst(t) {
    var i;
    if (this.HasMaterialParameters()) {
      if (this.HasInitTickOptimize && this.Handle) {
        cpp_1.FKuroEffectSystemInterface.RemoveEffectVectorCurveOrConst(this.Handle.Id, t);
      } else if (i = this.GetMaterialParameters()) {
        i.RemoveVectorCurveOrConst(t);
      }
    }
  }
  RemoveMaterialLinearColorCurveOrConst(t) {
    var i;
    if (this.HasMaterialParameters()) {
      if (this.HasInitTickOptimize && this.Handle) {
        cpp_1.FKuroEffectSystemInterface.RemoveEffectLinearColorCurveOrConst(this.Handle.Id, t);
      } else if (i = this.GetMaterialParameters()) {
        i.RemoveLinearColorCurveOrConst(t);
      }
    }
  }
  IsOverrideTick() {
    return false;
  }
  RegisterToKuroEffectSystem() {
    var t;
    if (this.Handle && this.EffectModel && (t = this.Handle.GetSureEffectActor())) {
      this.HasInitTickOptimize = true;
      cpp_1.FKuroEffectSystemInterface.RegisterEffectBaseHandle(this.Handle.Id, this.Handle.Parent?.Id ?? 0, this.EffectModel, t);
    }
  }
  UnregisterToKuroEffectSystem() {
    if (this.Handle) {
      this.HasInitTickOptimize = false;
      cpp_1.FKuroEffectSystemInterface.UnregisterEffectHandle(this.Handle.Id);
    }
  }
}
exports.EffectSpec = EffectSpec;
//# sourceMappingURL=EffectSpec.js.map