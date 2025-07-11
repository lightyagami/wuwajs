"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectHandle = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const GameBudgetInterfaceController_1 = require("../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const PerformanceDecorators_1 = require("../../Core/Performance/PerformanceDecorators");
const TickSystem_1 = require("../../Core/Tick/TickSystem");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const TimeUtil_1 = require("../Common/TimeUtil");
const GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator");
const EEffectFlag_1 = require("./EEffectFlag");
const EffectActorHandle_1 = require("./EffectActorHandle");
const SkeletalMeshEffectContext_1 = require("./EffectContext/SkeletalMeshEffectContext");
const EffectModelMultiEffectSpec_1 = require("./EffectModelMultiEffectSpec");
const EffectModelGroupSpec_1 = require("./EffectSpec/EffectModelGroupSpec");
const EffectModelNiagaraSpec_1 = require("./EffectSpec/EffectModelNiagaraSpec");
const EffectSystem_1 = require("./EffectSystem");
const NiagaraComponentHandle_1 = require("./NiagaraComponentHandle");
const TsEffectActor_1 = require("./TsEffectActor");
const MAX_LOOP_EFFECT_WITHOUT_OWNER_TIME_OF_EXISTENCE = 600;
class EffectHandleInitCache {
  constructor() {
    this.WorldContext = undefined;
    this.Path = "";
    this.Reason = "";
    this.AutoPlay = false;
    this.BeforeInitCallback = undefined;
    this.Callback = undefined;
    this.BeforePlayCallback = undefined;
    this.EffectActorHandle = new EffectActorHandle_1.EffectActorHandle();
    this.StartTime = -1;
    this.TimeDiff = 0;
  }
  get Location() {
    return this.EffectActorHandle.GetActorLocation();
  }
}
class EffectHandle {
  constructor() {
    this.Id = 0;
    this.BornFrameCount = undefined;
    this.HoldObjectId = 0;
    this.Path = "";
    this.nx = undefined;
    this.NiagaraParameter = undefined;
    this.ExtraState = -1;
    this.tOn = false;
    this.TUn = false;
    this.Parent = undefined;
    this.zCe = false;
    this.CreateReason = "";
    this.StopReason = "";
    this.PlayReason = "";
    this.IsInitializing = false;
    this.IsExternalActor = false;
    this.IsPendingStop = false;
    this.IsPendingPlay = false;
    this.CreateSource = 0;
    this.SourceEntityId = undefined;
    this.IsPreview = false;
    this.InContainer = false;
    this.ege = undefined;
    this.EffectEnableRange = GameBudgetAllocatorConfigCreator_1.EFFECT_ENABLE_RANGE;
    this.tge = undefined;
    this.Sll = 1;
    this.bEl = false;
    this.ige = 0;
    this.gW = undefined;
    this.oge = undefined;
    this.cW = undefined;
    this.rge = undefined;
    this.nge = undefined;
    this.sge = undefined;
    this.mW = undefined;
    this.uW = undefined;
    this.age = undefined;
    this.qlh = true;
    this.InitCache = undefined;
    this.LifeTime = 0;
    this.CreateTime = 0;
    this.yW = undefined;
    this.hge = undefined;
    this.lge = undefined;
    this.phh = false;
    this.ScheduledAfterTick = undefined;
    this._ge = -1;
    this.uge = 0;
    this.cge = false;
    this.mge = false;
    this.TickSystemTick = t => {
      this.Tick(t * TimeUtil_1.TimeUtil.Millisecond);
    };
    this.Ipa = false;
    this.vF_ = false;
    this.iOn = false;
    this.rOn = () => {
      if (this.IsEffectValid) {
        this.OnVisibilityChanged(this.HandleVisible);
      }
    };
    this.gge = false;
    this.fge = (t, i) => {
      if (this.IsEffectValid() && i !== 2 && i !== 4) {
        if (this.InContainer && this.CreateSource === 1 && Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderEffect", 3, "回收到Lru的特效的actor被意外删除了", ["Path", this.Path]);
        }
        EffectSystem_1.EffectSystem.StopEffect(this, "[EffectHandle.OnActorDestroy] actor被意外销毁了", true, true);
      }
    };
    this.OnCustomCheckOwner = undefined;
    this.pge = undefined;
    this.Zga = undefined;
    this.Wk_ = false;
    this.cvu = new Set();
    this.dvu = 0;
    this.Rgl = t => {
      let i = true;
      if (i = this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec ? this.tge.TickDelayPlay(t) : i) {
        cpp_1.FKuroEffectSystemInterface.UnregisterEffectGroupPlayJsFunction(this.Id);
      }
    };
    this.Ugl = () => {
      this.PreStop();
    };
    this.Dgl = t => {
      this.tge?.GetLifeTime().UpdateLifeCycle(t);
    };
    this.Agl = () => {
      this.tge?.EnterStopping();
    };
    this.xgl = t => {
      if (this.tge instanceof EffectModelMultiEffectSpec_1.EffectModelMultiEffectSpec) {
        this.tge.AdjustNumber(t);
      }
    };
  }
  SetBornFrameCount() {
    this.BornFrameCount = UE.KismetSystemLibrary.GetFrameCount();
  }
  GetContext() {
    return this.GetRoot().nx;
  }
  SetContext(t) {
    this.nx = t;
  }
  GetOwnerEntityId() {
    var t = this.GetContext();
    if (t) {
      return t.EntityId;
    } else {
      return undefined;
    }
  }
  GetInteractionEffectComponent() {
    var t = this.GetOwnerEntityId();
    if (t) {
      t = EntitySystem_1.EntitySystem.Get(t);
      if (t) {
        return t.GetComponent(3)?.Owner?.GetComponentByClass(UE.KuroEnviInteractionComponent.StaticClass()) || undefined;
      }
    }
    t = this.GetContext()?.SourceObject;
    if (t instanceof UE.Actor && t?.IsValid()) {
      return t.GetComponentByClass(UE.KuroEnviInteractionComponent.StaticClass()) || undefined;
    }
  }
  SetEffectParameterNiagara(t) {
    if (t && this.ige & 4) {
      this.tge?.SetEffectParameterNiagara(t);
    } else {
      this.NiagaraParameter = t;
    }
  }
  SetEffectExtraState(t) {
    if (this.ige & 4) {
      this.ExtraState = t;
      this.tge?.SetExtraState(t);
    } else {
      this.ExtraState = t;
    }
  }
  get IgnoreVisibilityOptimize() {
    return (this.IsRoot() ? this : this.GetRoot()).tOn;
  }
  set IgnoreVisibilityOptimize(t) {
    if (this.tOn !== t && (t ? (this.OnVisibilityChanged(true, false), this.tOn = t) : (this.tOn = t, TimerSystem_1.TimerSystem.Next(this.rOn)), EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) && this.tge?.HasInitTickOptimize && this.ege) {
      cpp_1.FKuroEffectSystemInterface.IgnoreEffectVisibilityOptimize(this.ege, t);
    }
  }
  get StoppingTime() {
    return this.TUn;
  }
  set StoppingTime(t) {
    if (this.nx?.SourceObject instanceof UE.BP_EffectActor_C && this.IsRoot() && this.TUn !== t && (this.TUn = t, EffectSystem_1.EffectSystem.GlobalStoppingTime && this.GetEffectSpec()?.OnGlobalStoppingTimeChange(t), EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) && this.tge?.HasInitTickOptimize) {
      cpp_1.FKuroEffectSystemInterface.SetEffectStoppingTime(this.Id, this.TUn);
    }
  }
  OnGlobalStoppingTimeChange(t) {
    if (this.StoppingTime) {
      this.GetEffectSpec()?.OnGlobalStoppingTimeChange(t);
    }
  }
  GetRoot() {
    if (!this.Parent) {
      return this;
    }
    let t = this.Parent;
    while (t.Parent) {
      t = t.Parent;
    }
    return t;
  }
  SetNotRecord(t) {
    this.zCe = t;
  }
  GetNotRecord() {
    return this.zCe;
  }
  IsRoot() {
    return !this.Parent;
  }
  IsEffectValid() {
    return !(this.ige & 128) && !this.InContainer && !this.IsPendingStop;
  }
  IsDestroy() {
    return !!(this.ige & 128);
  }
  IsDone() {
    return !(this.ige & 128) && !!(this.ige & 2);
  }
  IsStop() {
    return this.tge?.GetStopFlag() ?? false;
  }
  IsPlaying() {
    return this.tge?.IsPlaying() ?? false;
  }
  get IsPendingInit() {
    return !(this.ige & 1) && this.InitCache !== undefined;
  }
  get IsEffectActorValid() {
    return !this.IsPendingInit && !this.IsInitializing;
  }
  IsStopping() {
    return this.tge?.IsStopping() ?? false;
  }
  GetEffectData() {
    return this.tge?.GetEffectModel();
  }
  GetEffectType() {
    return this.tge.GetEffectType();
  }
  get CreateFromPlayerEffectPool() {
    return this.CreateSource >= 2 && this.CreateSource <= 5;
  }
  GetEffectActor() {
    if (this.IsEffectActorValid) {
      return this.ege;
    } else {
      return this.InitCache.EffectActorHandle;
    }
  }
  GetSureEffectActor() {
    return this.ege;
  }
  GetNiagaraComponent() {
    if (!this.IsEffectActorValid) {
      return this.InitCache.EffectActorHandle.NiagaraComponent;
    }
    if (this.tge instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec) {
      return this.tge.GetNiagaraComponent();
    }
    if (this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec) {
      for (const i of this.tge.EffectSpecMap.values()) {
        var t = i.GetEffectSpec();
        if (t instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec) {
          return t.GetNiagaraComponent();
        }
      }
    }
  }
  GetSureNiagaraComponent() {
    if (this.IsEffectActorValid) {
      if (this.tge instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec) {
        return this.tge.GetSureNiagaraComponent();
      }
      if (this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec) {
        for (const i of this.tge.EffectSpecMap.values()) {
          var t = i.GetEffectSpec();
          if (t instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec) {
            return t.GetSureNiagaraComponent();
          }
        }
      }
    }
  }
  GetNiagaraComponents() {
    if (!this.IsEffectActorValid) {
      return this.InitCache.EffectActorHandle.NiagaraComponents;
    }
    if (this.tge instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec) {
      var t = this.tge.GetNiagaraComponent();
      if (t instanceof NiagaraComponentHandle_1.NiagaraComponentHandle) {
        return t;
      }
    } else if (this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec) {
      let t = undefined;
      for (const h of this.tge.EffectSpecMap.values()) {
        var i = h.GetEffectSpec();
        if (i instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec && (i = i.GetNiagaraComponent()) instanceof NiagaraComponentHandle_1.NiagaraComponentHandle) {
          (t = t || new Array()).push(i);
        }
      }
      if (t) {
        return t;
      }
    }
    var e = this.ege?.K2_GetComponentsByClass(UE.NiagaraComponent.StaticClass());
    var s = new Array();
    if (e) {
      for (let t = 0; t < e.Num(); t++) {
        s.push(e.Get(t));
      }
    }
    return s;
  }
  GetNiagaraParticleCount() {
    var t = this.GetNiagaraComponents();
    let i = 0;
    let e = 0;
    if (t instanceof Array) {
      for (const f of t) {
        if (f instanceof NiagaraComponentHandle_1.NiagaraComponentHandle) {
          break;
        }
        var s = (0, puerts_1.$ref)(undefined);
        var h = (0, puerts_1.$ref)(undefined);
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetNiagaraParticleCount(f, s, h);
        i += (0, puerts_1.$unref)(h);
        e += (0, puerts_1.$unref)(s);
      }
    }
    return [i, e];
  }
  SetEffectActor(t) {
    if (this.IsRoot()) {
      if (t) {
        if ((this.ege = t)?.IsValid() && t.IsA(UE.TsEffectActor_C.StaticClass())) {
          t.SetEffectHandle(this.Id, this.Path, this.GetEffectType());
        }
      } else {
        if (this.ege?.IsValid() && this.ege.IsA(UE.TsEffectActor_C.StaticClass())) {
          this.ege.SetEffectHandle();
        }
        this.ege = undefined;
      }
    } else {
      this.ege = t;
    }
  }
  GetEffectSpec() {
    return this.tge;
  }
  SetEffectSpec(t) {
    if (t) {
      (this.tge = t)?.SetHandle(this);
    } else {
      this.tge?.SetHandle(undefined);
      this.tge = undefined;
    }
  }
  GetTimeScale() {
    return this.GetEffectSpec().GetTimeScale();
  }
  GetGlobalTimeScale() {
    return this.GetEffectSpec().GetGlobalTimeScale();
  }
  SetTimeScale(t, i = false, e = false) {
    if (this.IsDone()) {
      this.GetEffectSpec()?.SetTimeScale(t, i, e);
    } else {
      this.Sll = t;
      this.bEl = e;
    }
  }
  GetIgnoreTimeScale() {
    return this.tge.GetIgnoreTimeScale();
  }
  ClearFinishCallback() {
    this.age = undefined;
  }
  AddFinishCallback(t) {
    if (t) {
      this.age ||= new Set();
      if (!this.age.has(t)) {
        if (EffectEnvironment_1.EffectEnvironment.UseLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RenderEffect", 36, "特效框架:AddFinishCallback", ["句柄Id", this.Id], ["Path", this.Path]);
        }
        this.age.add(t);
      }
    }
  }
  RemoveFinishCallback(t) {
    return !!t && !!this.age && this.age.delete(t);
  }
  Replay() {
    this.ige &= EEffectFlag_1.RESET_PLAY_FLAG;
    this.ige &= EEffectFlag_1.RESET_STOP_FLAG;
    this.ige &= EEffectFlag_1.RESET_PRESTOP_FLAG;
    this.qlh = true;
    this.tge.Replay();
    this.TUn = false;
    this.iOn = false;
    this.Zga = undefined;
    this.Sll = 1;
    this.bEl = false;
    this.tOn = false;
    this.Wk_ = false;
    this.vF_ = false;
    this.dvu = 0;
    this.cvu.clear();
  }
  AfterLeavePool() {
    this.Ipa = false;
    this.tge.FreezeEffect(false);
    this.InitCache = undefined;
    this.OnCustomCheckOwner = undefined;
    this.SetTimeScale(1, true);
  }
  Play(t) {
    this.oge?.Start();
    EffectHandle.Mge?.Start();
    if (!(this.ige & 16) && !(this.ige & 4)) {
      this.qlh = this.IsRoot() && this.tge.NeedVisibilityTest() && EffectEnvironment_1.EffectEnvironment.OpenVisibilityOptimize && !this.IsPreview && !Info_1.Info.IsInEditorTick();
      this.Pgl(4);
      this.tge.Play(t);
      if (this.IsRoot() && Info_1.Info.IsGameRunning() && GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen && !this.Ege) {
        this.RegisterTick();
      }
      this.ApplyEffectParameters();
      if (this.ExtraState > 0) {
        this.SetEffectExtraState(this.ExtraState);
      }
      if (this.vF_) {
        this.vF_ = false;
        this.FreezeEffect(true, false);
      }
    }
    EffectHandle.Mge?.Stop();
    this.oge?.Stop();
  }
  PreStop() {
    this.nge?.Start();
    if (!(this.ige & 8)) {
      this.tge.PreStop();
      this.Pgl(8);
    }
    this.nge?.Stop();
  }
  Stop(t, i) {
    this.rge?.Start();
    EffectHandle.Sge?.Start();
    if (!this.IsRoot() && i) {
      this.ExecuteStopCallback();
    }
    if (!(this.ige & 16)) {
      this.OnCustomCheckOwner = undefined;
      this.PreStop();
      if (this.IsRoot() && i) {
        if (!this.IsExternalActor && this.ege?.IsValid() && !this.IsPreview) {
          if (EffectEnvironment_1.EffectEnvironment.UseLog && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("RenderEffect", 36, "特效框架:EffectHandle Detach", ["句柄Id", this.Id], ["Path", this.Path]);
          }
          this.ege.K2_DetachFromActor();
          this.SetHidden(true, "EffectHandle.Stop");
          var e = (0, puerts_1.$ref)(undefined);
          this.ege.GetAttachedActors(e);
          var s = (0, puerts_1.$unref)(e);
          var h = s.Num();
          for (let t = 0; t < h; t++) {
            var f = s.Get(t);
            if (f.IsA(UE.TsEffectActor_C.StaticClass())) {
              f = f;
              EffectSystem_1.EffectSystem.SetEffectHidden(f.GetHandle(), true, "EffectHandle.Stop.HiddenChild");
            }
          }
          if (this.pge) {
            for (const o of this.pge) {
              if (o.IsValid()) {
                o.K2_DetachFromActor(1, 1, 1);
              }
            }
            this.pge = undefined;
          }
        }
        if (Info_1.Info.IsGameRunning() && GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen && this.Ege) {
          this.UnregisterTick();
        }
        this.GetEffectSpec()?.FreezeEffect(true);
        this.ClearOwnerEffectHandle();
        this.ClearOwnedEffectHandles();
        this.ExtraState = -1;
      }
      if (this.IsPlaying()) {
        this.tge.Stop(t, i);
        this.Pgl(16);
      }
    }
    EffectHandle.Sge?.Stop();
    this.rge?.Stop();
  }
  OnEnterPool() {
    this.tge?.OnEnterPool();
  }
  ExecuteStopCallback() {
    if (this.age) {
      if (EffectEnvironment_1.EffectEnvironment.UseLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RenderEffect", 3, "特效框架:执行特效完成回调", ["句柄Id", this.Id], ["IsRoot", this.IsRoot()], ["Path", this.Path], ["Count", this.age.size]);
      }
      this.sge?.Start();
      for (const t of this.age) {
        t(this.Id);
      }
      this.ClearFinishCallback();
      this.sge?.Stop();
    }
  }
  PendingInit(t, i, e, s, h = true, f, o, n) {
    this.InitCache = new EffectHandleInitCache();
    this.InitCache.WorldContext = t;
    this.InitCache.Path = i;
    this.InitCache.Reason = e;
    this.InitCache.AutoPlay = h;
    this.InitCache.BeforeInitCallback = f;
    this.InitCache.Callback = o;
    this.InitCache.BeforePlayCallback = n;
    this.InitCache.EffectActorHandle.Init(s, i);
    if (h) {
      this.yge();
    }
  }
  yge() {
    if (this.IsRoot()) {
      this.InitCache.StartTime = EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds;
      if (Info_1.Info.IsGameRunning() && GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen && !this.Ege) {
        this.RegisterTick();
      }
      this.GetEffectSpec()?.SetLifeCycle(this.LifeTime);
      this.GetEffectSpec()?.SetPlaying(true);
    }
  }
  InitEffectActorAfterPendingInit() {
    if (this.ege && this.InitCache && this.InitCache.EffectActorHandle) {
      this.InitCache.EffectActorHandle.InitEffectActor(this.ege, this);
      if (this.Ege && this.yW !== undefined) {
        this.InitTickOptimize();
        GameBudgetInterfaceController_1.GameBudgetInterfaceController.UpdateRegisterActor(this.lge, this.yW, this.ege);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderEffect", 36, "[EffectHandle]InitEffectActor Failed");
    }
  }
  PlayEffectAfterPendingInit() {
    if (!(this.InitCache.StartTime < 0) && !this.InitCache.AutoPlay) {
      this.PlayEffect("PlayEffectAfterPendingInit");
    }
  }
  ClearInitCache() {
    this.InitCache = undefined;
  }
  get IsLoop() {
    if (this.IsDone() && this.tge) {
      return this.tge.IsLoop;
    } else {
      return this.LifeTime < 0;
    }
  }
  async Init(t) {
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 3, "EffectHandle执行Init失败，因为effectData无效。", ["Path", this.Path]);
      }
      return 0;
    }
    if (this.IsDestroy()) {
      return 2;
    }
    if (Stats_1.Stat.Enable) {
      if (EffectEnvironment_1.EffectEnvironment.CloseEffectSubStat) {
        if (this.IsRoot()) {
          this.gW = Stats_1.Stat.Create("[EffectHandle.Tick]");
        }
      } else {
        this.gW = Stats_1.Stat.CreateNoFlameGraph("[EffectHandle.Tick] Path:" + this.Path);
      }
      this.cW = Stats_1.Stat.CreateNoFlameGraph("[EffectHandle.Start] Path:" + this.Path);
      this.oge = Stats_1.Stat.CreateNoFlameGraph("[EffectHandle.Play] Path:" + this.Path);
      this.nge = Stats_1.Stat.CreateNoFlameGraph("[EffectHandle.PreStop] Path:" + this.Path);
      this.rge = Stats_1.Stat.CreateNoFlameGraph("[EffectHandle.Stop] Path:" + this.Path);
      this.mW = Stats_1.Stat.CreateNoFlameGraph("[EffectHandle.End] Path:" + this.Path);
      this.sge = Stats_1.Stat.CreateNoFlameGraph("[EffectHandle.StopCallbackStat] Path:" + this.Path);
      this.uW = Stats_1.Stat.CreateNoFlameGraph("[EffectHandle.Clear] Path:" + this.Path);
      if (!EffectHandle.Ige) {
        EffectHandle.Ige = Stats_1.Stat.Create("[EffectHandle.Init]");
        EffectHandle.Tge = Stats_1.Stat.Create("[EffectHandle.Start]");
        EffectHandle.Mge = Stats_1.Stat.Create("[EffectHandle.Play]");
        EffectHandle.Sge = Stats_1.Stat.Create("[EffectHandle.Stop]");
      }
    }
    this.ige = 1;
    EffectHandle.Ige?.Start();
    t = this.tge.Init(t);
    EffectHandle.Ige?.Stop();
    return t;
  }
  Start() {
    this.cW?.Start();
    EffectHandle.Tge?.Start();
    this.Pgl(2);
    if (this.Sll !== 1) {
      this.SetTimeScale(this.Sll, true, this.bEl);
      this.Sll = 1;
      this.bEl = false;
    } else if (this.bEl) {
      this.SetTimeScale(1, true, true);
      this.bEl = false;
    }
    if (this.tge.Start()) {
      if (EffectEnvironment_1.EffectEnvironment.UseLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RenderEffect", 3, "特效框架:特效加载成功", ["句柄Id", this.Id], ["Path", this.Path], ["Location", this.GetEffectActor().D_K2_GetActorLocation()]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LoadEffect, this.Id);
      EffectHandle.Tge?.Stop();
      this.cW?.Stop();
      return true;
    } else {
      EffectHandle.Tge?.Stop();
      this.cW?.Stop();
      return false;
    }
  }
  End() {
    var t;
    this.mW?.Start();
    this.OnEnterPool();
    if (this.ige & 2) {
      if (this.ige & 32) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderEffect", 3, "重复执行End", ["Path", this.Path]);
        }
        this.mW?.Stop();
        return false;
      } else {
        t = this.tge.End();
        this.Pgl(32);
        this.mW?.Stop();
        return t;
      }
    } else {
      this.mW?.Stop();
      return true;
    }
  }
  Clear() {
    this.uW?.Start();
    if (this.ige & 64) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 3, "重复执行Clear", ["EffectHandle", this.constructor.name], ["Path", this.Path]);
      }
      this.uW?.Stop();
      return false;
    } else {
      if (this.IsRoot() && this.ege?.IsValid()) {
        this.ege.OnEndPlay.Clear();
      }
      this.InitCache = undefined;
      this.gW = undefined;
      this.oge = undefined;
      this.rge = undefined;
      this.sge = undefined;
      this.mW = undefined;
      this.age = undefined;
      if (this.tge.Clear()) {
        this.Pgl(64);
        this.uW?.Stop();
        return true;
      } else {
        this.uW?.Stop();
        return false;
      }
    }
  }
  Destroy() {
    this.Pgl(128);
    this.tge?.Destroy();
  }
  get Ege() {
    return this.yW !== undefined || this.hge !== undefined;
  }
  get TickWithoutGameBudget() {
    return this.hge !== undefined;
  }
  RegisterTick() {
    if (!Info_1.Info.IsInEditorTick()) {
      if (this.tge.GetEffectType() === 1) {
        this.hge = TickSystem_1.TickSystem.Add(this.TickSystemTick, "EffectHandle_" + this.Path + "_" + this.Id, 0, true);
        if (!this.phh) {
          this.phh = true;
          UE.KuroEffectLibrary.SetEffectActorSpawnInUIScene(this.ege, true, true);
        }
      } else {
        if (this.phh) {
          this.phh = false;
          UE.KuroEffectLibrary.SetEffectActorSpawnInUIScene(this.ege, false, true);
        }
        if (this.yW) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("RenderEffect", 24, "EffectHandle RegisterTick: 重复注册Tick", ["EffectHandle", this.constructor.name], ["Path", this.Path]);
          }
          this.UnregisterTick();
        }
        let t = undefined;
        t = (t = this.tge.NeedAlwaysTick() ? GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsAlwaysTickConfig : this.EffectEnableRange === GameBudgetAllocatorConfigCreator_1.EFFECT_ENABLE_RANGE ? this.tge.GetEffectType() === 3 ? GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsEffectGroupConfig : this.tge.GetEffectType() === 0 ? GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsFightEffectGroupConfig : GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsAlwaysTickConfig : GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.GetEffectDynamicGroup(this.EffectEnableRange)) || GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsEffectGroupConfig;
        this.lge = t.GroupName;
        this.yW = GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(t.GroupName, t.SignificanceGroup, this, this.ege);
        if (this.GetEffectSpec()?.IsUseBoundsCalculateDistance() && this.EffectEnableRange > GameBudgetAllocatorConfigCreator_1.EFFECT_USE_BOUNDS_RANGE) {
          GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetUseBoundsCalculateDistance(t.GroupName, this.yW, true);
        }
        this.InitTickOptimize();
      }
    }
  }
  UnregisterTick() {
    if (this.hge) {
      TickSystem_1.TickSystem.Remove(this.hge.Id);
      this.hge = undefined;
    } else {
      if (this.yW) {
        GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(this);
        this.yW = undefined;
      }
      this.ClearTickOptimize();
    }
  }
  ScheduledTick(t, i, e) {
    this.Tick(t);
  }
  OnEnabledChange(t, i) {
    if (this.IsRoot() && t && this.IsPendingInit) {
      EffectSystem_1.EffectSystem.InitHandleWhenEnable(this);
    }
    if (EffectEnvironment_1.EffectEnvironment.UseLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderEffect", 36, "特效框架:OnEnabledChange", ["句柄Id", this.Id], ["IsRoot", this.IsRoot()], ["Path", this.Path], ["Enable", t]);
    }
    this.tge?.EnableChanged(t);
  }
  SeekDelta(t, i, e = false) {
    if (this.tge?.IsValid()) {
      this.tge.SeekDelta(t, e, i);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderEffect", 36, "[EffectHandle]SeekDelta Failed", ["handleId", this.Id]);
    }
  }
  SeekTo(t, i) {
    if (this.tge?.IsValid()) {
      if (EffectEnvironment_1.EffectEnvironment.OpenTickOptimize && this.tge?.HasInitTickOptimize) {
        cpp_1.FKuroEffectSystemInterface.EffectSeekTo(this.Id, t, i);
      } else {
        this.tge.SeekTo(t, false, i);
      }
      return true;
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderEffect", 36, "[EffectHandle]SeekTo Failed", ["handleId", this.Id]);
      }
      return false;
    }
  }
  SeekToTimeWithProcess(t, i, e = false) {
    this._ge = t;
    this.uge = i;
    this.cge = e;
    this.mge = true;
    if (EffectEnvironment_1.EffectEnvironment.OpenTickOptimize && this.tge?.HasInitTickOptimize) {
      cpp_1.FKuroEffectSystemInterface.SetEffectSeekToTimeWithProcessInfo(this.Id, this._ge, this.uge, this.cge);
    }
  }
  GetSeekToTargetTime() {
    return this._ge;
  }
  LocationProxyFunction() {
    if (this.IsPendingInit) {
      var t = this.InitCache?.Location;
      if (t) {
        return t;
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RenderEffect", 36, "LocationProxy is undefined", ["handleId", this.Id], ["path", this.InitCache?.Path]);
      }
    }
    return Vector_1.Vector.ZeroVectorDouble;
  }
  ApplyEffectParameters() {
    if (this.NiagaraParameter) {
      this.tge.SetEffectParameterNiagara(this.NiagaraParameter);
      this.NiagaraParameter = undefined;
    }
  }
  Tick(t) {
    if ((this.gW?.Start(), !(this.ige & 16)) && this.IsDone()) {
      if (this.InDebugMode()) {
        this.DebugTick(t);
      } else if (this.ege?.IsValid() && this.tge?.IsValid()) {
        if (this.qlh && !this.IgnoreVisibilityOptimize && this.tge.IsReallyPlaying() && !this.tge.IsVisible()) {
          if (this.tge.NeedAlwaysTick()) {
            this.tge.Tick(t);
          }
          this.gW?.Stop();
          return;
        }
        if (this.Zga) {
          this._ge = this.Zga.CustomProcess;
          this.mge = true;
          this.Dge(t);
          this.gW?.Stop();
          return;
        }
        if (this.IsFreeze) {
          this.Dge(t);
          this.gW?.Stop();
          return;
        }
        this.tge.Tick(t);
      }
    }
    this.gW?.Stop();
  }
  RegisterActorDestroy() {
    if (this.IsRoot()) {
      this.ege.OnEndPlay.Add(this.fge);
    }
  }
  get IsFreeze() {
    return this.Ipa;
  }
  FreezeEffect(t, i) {
    if (!i && !(this.GetFlag() & 4) || EffectEnvironment_1.EffectEnvironment.OpenTickOptimize && !this.tge?.HasInitTickOptimize) {
      this.vF_ = t;
    } else if ((i || this.IsLoop) && this.Ipa !== t && (this.Ipa = t, this.GetEffectSpec()?.FreezeEffect(t), EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) && this.tge?.HasInitTickOptimize) {
      cpp_1.FKuroEffectSystemInterface.SetEffectIsFreeze(this.Id, t);
    }
  }
  Dge(t) {
    let i = t;
    var e;
    var s;
    if (this.mge) {
      if (e = this.GetEffectSpec()) {
        if ((s = this._ge - e.PassTime) == 0) {
          this.mge = false;
        } else {
          if (this.uge > 0) {
            i = this.uge;
          }
          if (Math.abs(s) < i) {
            e.SeekTo(this._ge, true, false, t);
            this.mge = false;
          } else {
            i *= Math.sign(s);
            e.SeekDelta(i, true, false, t);
          }
        }
      }
    } else if (this.cge) {
      this.GetEffectSpec()?.SeekTo(this._ge, true, false, t);
    }
  }
  PlayEffect(t) {
    if (t) {
      if (t.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "PlayEffect的Reason字符串长度必须大于等于限制字符数量", ["Reason", t], ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT]);
        }
      } else {
        this.PlayReason = t;
        if (this.IsPendingInit) {
          this.yge();
        } else if (this.IsDone()) {
          if (EffectEnvironment_1.EffectEnvironment.UseLog && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("RenderEffect", 3, "特效框架:播放特效", ["句柄Id", this.Id], ["IsRoot", this.IsRoot()], ["Path", this.Path], ["Reason", t]);
          }
          if (this.IsLoop && this.IsRoot()) {
            if (!this.nx || !this.nx.EntityId && !this.nx.SourceObject) {
              if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Render", 36, "特效框架:对应循环特效没有指定Owner,设置保底生命周期，保底时间为10分钟", ["句柄Id", this.Id], ["Path", this.Path], ["CreateReason", this.CreateReason]);
              }
              this.GetEffectSpec()?.SetLifeCycle(MAX_LOOP_EFFECT_WITHOUT_OWNER_TIME_OF_EXISTENCE);
            }
          }
          this.Play(t);
        } else {
          this.IsPendingPlay = true;
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 3, "PlayEffect的Reason不能使用undefined", ["Reason", t]);
    }
  }
  StopEffect(t, i = false, e = false) {
    this.Zga = undefined;
    if (t) {
      if (t.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "StopEffect的Reason字符串长度必须大于等于限制字符数量", ["Reason", t], ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT], ["Path", this.Path]);
        }
      } else if (this.IsEffectValid()) {
        if (this.IsRoot()) {
          if (!this.IsPendingInit && !this.GetRoot().IsDone() || i) {
            EffectSystem_1.EffectSystem.StopEffect(this, t, true, e);
          } else {
            this.tge.SetPlaying(false);
            this.tge.SetStopping(true);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "子特效不能调用StopEffect", ["Reason", t], ["Path", this.Path]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "EffectHandle已失效，不能调用StopEffect()", ["Reason", t], ["Path", this.Path]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 3, "StopEffect的Reason不能使用undefined", ["Reason", t], ["Path", this.Path]);
    }
  }
  DestroyEffect(t, i) {
    if (t) {
      if (t.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "DestroyEffect的Reason字符串长度必须大于等于限制字符数量", ["Reason", t], ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT], ["Path", this.Path]);
        }
      } else if (this.IsEffectValid()) {
        if (this.IsRoot()) {
          EffectSystem_1.EffectSystem.StopEffect(this, t, true, i);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "子特效不能调用DestroyEffect", ["Reason", t], ["Path", this.Path]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "EffectHandle已失效，不能调用DestroyEffect()", ["Reason", t], ["Path", this.Path]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 3, "DestroyEffect的Reason不能使用undefined", ["Reason", t], ["Path", this.Path]);
    }
  }
  get HandleVisible() {
    return !EffectEnvironment_1.EffectEnvironment.OpenVisibilityOptimize || this.iOn;
  }
  OnVisibilityChanged(t, i = true) {
    if (this.tge?.IsValid()) {
      if (i) {
        this.iOn = t;
      }
      this.tge.VisibilityChanged(t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("RenderEffect", 36, "特效框架:OnVisibilityChanged Failed", ["handleId", this.Id]);
    }
  }
  OnGlobalTimeScaleChange() {
    this.GetEffectSpec()?.OnGlobalTimeScaleChange();
  }
  OnWasRecentlyRenderedOnScreenChange(t) {
    if (EffectEnvironment_1.EffectEnvironment.OpenVisibilityOptimize && this.tge?.NeedVisibilityTest()) {
      this.OnVisibilityChanged(t);
    }
  }
  get DebugUpdate() {
    return this.gge;
  }
  set DebugUpdate(t) {
    if (!Info_1.Info.IsBuildShipping) {
      this.gge = t;
    }
  }
  InDebugMode() {
    return this.DebugUpdate;
  }
  DebugTick(t) {
    this.NiagaraDebugTick(t);
    if (!!this.tge?.IsValid() && !(this.tge instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec)) {
      this.tge.Tick(t);
    }
  }
  NiagaraDebugTick(t) {
    if (this.tge?.IsValid() && this.tge instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec) {
      this.tge.SetNiagaraSolo(true);
      this.tge.DebugTick(t);
    }
  }
  OnPlayFinished() {
    if (Info_1.Info.IsGameRunning()) {
      EffectSystem_1.EffectSystem.AddRemoveHandle(this, "[EffectLifeTime.PlayFinished] 播放完成");
    } else {
      EffectSystem_1.EffectSystem.StopEffect(this, "[EffectLifeTime.PlayFinished] 播放完成", true);
    }
  }
  CheckOwner() {
    if (this.OnCustomCheckOwner) {
      return this.OnCustomCheckOwner(this.Id);
    }
    if (this.nx) {
      if (this.nx.EntityId) {
        if (!EntitySystem_1.EntitySystem.Get(this.nx.EntityId)?.Valid) {
          return false;
        }
      }
      if (this.nx.SourceObject && !this.nx.SourceObject.IsValid()) {
        return false;
      }
    }
    return true;
  }
  AttachToEffectSkeletalMesh(t, i, e) {
    if (this.IsEffectActorValid) {
      if (this.ege) {
        this.ExecuteAttachToEffectSkeletalMesh(t, i, e);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RenderEffect", 36, "特效框架: 调用AttachToEffectActor时，EffectActor为空");
      }
    } else {
      this.InitCache?.EffectActorHandle.SetBeAttached(t, i, e);
    }
  }
  ExecuteAttachToEffectSkeletalMesh(t, i, e) {
    var s;
    if (t.IsValid() && (this.pge ||= new Array(), s = this.ege?.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass()))) {
      this.pge.push(t);
      t.K2_AttachToComponent(s, i, e, e, e, false);
    }
  }
  GetGlobalStoppingTime() {
    return EffectSystem_1.EffectSystem.GlobalStoppingTime;
  }
  GetGlobalStoppingPlayTime() {
    return EffectSystem_1.EffectSystem.GlobalStoppingPlayTime;
  }
  SetPublicToSequence(t) {
    if (this.tge instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec) {
      this.tge.SetPublicToSequence(t);
    } else if (this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec) {
      for (const i of this.tge.EffectSpecMap.values()) {
        i.SetPublicToSequence(t);
      }
    }
  }
  SetSimulateFromSequence(t) {
    this.Zga = t;
    this.FreezeEffect(true, true);
  }
  AttachSkeletalMesh(t) {
    var i = this.nx;
    if (!i || i.SkeletalMeshComp !== t.SkeletalMeshComp) {
      if (t.SkeletalMeshComp) {
        this.SetHidden(t.SkeletalMeshComp.bHiddenInGame, "EffectHandle.AttachSkeletalMesh");
      }
      this.GetEffectSpec()?.UnregisterBodyEffect();
      this.SetContext(t);
      this.GetEffectSpec()?.RegisterBodyEffect();
    }
  }
  SetHidden(t, i, e = false) {
    if (e) {
      this.Wk_ = t;
    }
    e = t || this.Wk_;
    this.GetEffectActor()?.SetActorHiddenInGame(e);
    if (EffectEnvironment_1.EffectEnvironment.UseLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderEffect", 36, "特效框架:显隐特效", ["句柄Id", this.Id], ["Path", this.Path], ["Hidden", t], ["LogicHidden", this.Wk_], ["Reason", i]);
    }
  }
  OnModifyEffectModel() {
    this.tge?.OnModifyEffectModel();
  }
  OnAfterCreateHandle() {
    if (this.nx && this.nx instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext && this.nx.IsSyncEffectTimeScale && this.nx.SkeletalMeshComp?.IsValid()) {
      var i = this.nx.SkeletalMeshComp.GetOwner();
      let t = 0;
      if (i instanceof TsEffectActor_1.default || i?.IsA(UE.EffectSystemActor.StaticClass())) {
        t = i.GetHandle();
      }
      if (EffectSystem_1.EffectSystem.RegisterSyncTimeScaleHandle(t, this.Id)) {
        this.dvu = t;
      }
    }
  }
  OnTimeScaleChange(t, i) {
    for (const e of this.cvu) {
      EffectSystem_1.EffectSystem.SetTimeScale(e, t, i);
    }
  }
  RegisterSyncTimeScaleHandle(t) {
    return !this.cvu.has(t) && (this.cvu.add(t), true);
  }
  UnregisterSyncTimeScaleHandle(t) {
    return !!this.cvu.has(t) && (this.cvu.delete(t), true);
  }
  ClearOwnerEffectHandle(t = false) {
    if (this.dvu !== 0) {
      if (!t) {
        EffectSystem_1.EffectSystem.UnregisterSyncTimeScaleHandle(this.dvu, this.Id);
      }
      this.dvu = 0;
    }
  }
  ClearOwnedEffectHandles() {
    if (!(this.cvu.size < 1)) {
      for (const t of this.cvu) {
        EffectSystem_1.EffectSystem.ClearOwnerEffectHandle(t, true);
      }
      this.cvu.clear();
    }
  }
  GetDebugErrorCode() {
    if (this.tge) {
      return this.tge.GetDebugErrorCode();
    } else {
      return 1;
    }
  }
  get IsImportanceEffect() {
    return this.EffectEnableRange > GameBudgetAllocatorConfigCreator_1.EFFECT_IMPORTANCE_ENABLE_RANGE;
  }
  GetFlag() {
    return this.ige;
  }
  CollectMaterialFloatCurve(t, i) {
    if (this.tge?.HasMaterialParameters()) {
      this.tge.CollectMaterialFloatCurve(t, i);
    } else if (this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec) {
      for (const e of this.tge.EffectSpecMap.values()) {
        e.CollectMaterialFloatCurve(t, i);
      }
    }
  }
  CollectMaterialVectorCurve(t, i) {
    if (this.tge?.HasMaterialParameters()) {
      this.tge.CollectMaterialVectorCurve(t, i);
    } else if (this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec) {
      for (const e of this.tge.EffectSpecMap.values()) {
        e.CollectMaterialVectorCurve(t, i);
      }
    }
  }
  CollectMaterialLinearColorCurve(t, i) {
    if (this.tge?.HasMaterialParameters()) {
      this.tge.CollectMaterialLinearColorCurve(t, i);
    } else if (this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec) {
      for (const e of this.tge.EffectSpecMap.values()) {
        e.CollectMaterialLinearColorCurve(t, i);
      }
    }
  }
  Pgl(t) {
    this.ige |= t;
    if (EffectEnvironment_1.EffectEnvironment.OpenTickOptimize && this.tge?.HasInitTickOptimize) {
      cpp_1.FKuroEffectSystemInterface.SetEffectHandleFlag(this.Id, this.ige);
    }
  }
  InitTickOptimize() {
    if (EffectEnvironment_1.EffectEnvironment.OpenTickOptimize && this.ege && this.tge && !this.tge.HasInitTickOptimize && this.tge.IsOverrideTick() && (this.tge.RegisterToKuroEffectSystem(), cpp_1.FKuroEffectSystemInterface.RegisterEffectJsObject(this.Id, this), this.wgl(), this.IsRoot() && cpp_1.FKuroEffectSystemInterface.OverrideEffectHandleTick(this.Id, this.lge, this.yW), cpp_1.FKuroEffectSystemInterface.InitEffectParameter(this.Id, this.ige, this.GetTimeScale(), this.GetIgnoreTimeScale(), this.TUn, this.tge.IsReallyPlaying(), this.tge.IsStopping(), this.IsFreeze, this._ge, this.uge, this.cge, this.mge), cpp_1.FKuroEffectSystemInterface.SetEffectInStoppingTime(this.Id, this.tge.InStoppingTime), this.tOn && cpp_1.FKuroEffectSystemInterface.IgnoreEffectVisibilityOptimize(this.ege, true), this.vF_)) {
      this.vF_ = false;
      this.FreezeEffect(true, false);
    }
  }
  wgl() {
    if (this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec) {
      cpp_1.FKuroEffectSystemInterface.RegisterEffectGroupPlayJsFunction(this.Id, this.Rgl);
    } else if (this.tge instanceof EffectModelMultiEffectSpec_1.EffectModelMultiEffectSpec) {
      cpp_1.FKuroEffectSystemInterface.RegisterMultiEffectAdjustNumJsFunction(this.Id, this.xgl);
    }
    cpp_1.FKuroEffectSystemInterface.RegisterEffectCommonJsFunction(this.Id, this.Ugl, this.Dgl, this.Agl);
  }
  ClearTickOptimize() {
    if (EffectEnvironment_1.EffectEnvironment.OpenTickOptimize && (this.tge?.UnregisterToKuroEffectSystem(), this.ege)) {
      cpp_1.FKuroEffectSystemInterface.IgnoreEffectVisibilityOptimize(this.ege, false);
    }
  }
}
(exports.EffectHandle = EffectHandle).Ige = undefined;
EffectHandle.Tge = undefined;
EffectHandle.Mge = undefined;
EffectHandle.Sge = undefined; //# sourceMappingURL=EffectHandle.js.map