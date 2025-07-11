"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectModelGroupSpec = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment");
const EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper");
const EffectSystem_1 = require("../EffectSystem");
const EffectSpec_1 = require("./EffectSpec");
class EffectModelGroupSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments);
    this.EffectSpecMap = new Map();
    this.d0e = new Set();
    this.C0e = new Array();
    this.g0e = new Array();
    this.GroupComponent = undefined;
    this.HasTransformAnim = false;
    this.CachedLocationCurve = undefined;
    this.CachedRotationCurve = undefined;
    this.CachedScaleCurve = undefined;
    this.f0e = undefined;
    this.p0e = undefined;
    this.v0e = undefined;
    this.M0e = undefined;
  }
  SetEffectType(t) {
    super.SetEffectType(t);
    for (const s of this.EffectSpecMap.values()) {
      s.GetEffectSpec().SetEffectType(t);
    }
  }
  SetEffectParameterNiagara(t) {
    for (var [, s] of this.EffectSpecMap) {
      s.SetEffectParameterNiagara(t);
    }
  }
  SetTimeScale(t, s = false, e = false) {
    super.SetTimeScale(t, s, e);
    for (const i of this.EffectSpecMap.values()) {
      i.SetTimeScale(t, s, e);
    }
  }
  SetExtraState(t) {
    for (const s of this.EffectSpecMap.values()) {
      s.GetEffectSpec().SetExtraState(t);
    }
  }
  ShouldRegisterBodyEffect() {
    for (const t of this.EffectSpecMap.values()) {
      if (!t.GetEffectSpec().ShouldRegisterBodyEffect()) {
        return false;
      }
    }
    return true;
  }
  OnInit() {
    if (Stats_1.Stat.Enable && !EffectEnvironment_1.EffectEnvironment.CloseEffectSubStat) {
      this.f0e = Stats_1.Stat.CreateNoFlameGraph("[EffectModelGroupSpec.Tick] Path:" + this.Handle.Path);
      this.p0e = Stats_1.Stat.Create("[EffectModelGroupSpec.Tick.SuperTick]");
      this.v0e = Stats_1.Stat.Create("[EffectModelGroupSpec.Tick.GroupTickHandle]");
      this.M0e = Stats_1.Stat.Create("[EffectModelGroupSpec.OnTick]");
    }
    this.InitPromise = new CustomPromise_1.CustomPromise();
    const s = this.Handle.GetSureEffectActor();
    if (s?.IsValid()) {
      var t = this.Handle.Parent;
      var t = t ? t.GetEffectSpec()?.GetSceneComponent() : undefined;
      var t = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(s, UE.SceneComponent.StaticClass(), t, undefined, false, this.EffectModel);
      this.GroupComponent = t;
      this.GroupComponent.SetComponentTickEnabled(false);
      this.SceneComponent = t;
      var e = this.EffectModel.EffectData.Num();
      const f = this.EffectModel.EffectData;
      let o = e;
      for (let t = 0; t < e; ++t) {
        const h = f.GetKey(t);
        if (!h?.IsValid()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RenderEffect", 3, "特效框架:EffectModelGroupSpec.Init失败，原因:EffectData存在无效的子特效", ["句柄Id", this.Handle.Id], ["Path", this.Handle.Path]);
          }
          this.InitPromise.SetResult(0);
          return false;
        }
        const s = this.Handle.GetSureEffectActor();
        var r = UE.KismetSystemLibrary.GetPathName(h);
        let i = false;
        r = EffectSystem_1.EffectSystem.SpawnChildEffect(s, this.Handle, s, r, this.Handle.CreateReason, false, this.Handle.GetContext(), undefined, (t, s) => {
          o--;
          switch (t) {
            case 1:
            case 2:
              this.EffectSpecMap.delete(s);
              break;
            case 0:
              i = true;
              break;
            case 5:
              var e = f.Get(h);
              if (e > 0) {
                this.C0e.push([s, e]);
                this.d0e.add(s);
              }
          }
          if (i) {
            this.C0e.length = 0;
            this.d0e.clear();
            this.InitPromise.SetResult(0);
          } else if (!o) {
            this.InitPromise.SetResult(5);
          }
        });
        if (EffectSystem_1.EffectSystem.IsValid(r?.Id ?? 0)) {
          this.EffectSpecMap.set(r.Id, r);
          this.Un1(r);
          r?.GetEffectSpec()?.OnParentInit();
        }
      }
    } else {
      this.InitPromise.SetResult(2);
    }
    return true;
  }
  Un1(t) {
    if (t && this.Handle?.IsFreeze) {
      t.FreezeEffect(true, true);
    }
  }
  OnStart() {
    let t = false;
    for (const s of this.EffectSpecMap.values()) {
      if (!s.Start()) {
        t = true;
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderEffect", 3, "EffectHandle执行Start失败", ["Path", s.Path]);
        }
      }
    }
    this.CachedLocationCurve = this.EffectModel.Location;
    this.CachedRotationCurve = this.EffectModel.Rotation;
    this.CachedScaleCurve = this.EffectModel.Scale;
    this.HasTransformAnim = this.CachedLocationCurve.bUseCurve || this.CachedRotationCurve.bUseCurve || this.CachedScaleCurve.bUseCurve;
    return !t;
  }
  OnEnd() {
    let t = false;
    for (const s of this.EffectSpecMap.values()) {
      if (!s.End()) {
        t = true;
      }
    }
    return !t;
  }
  OnClear() {
    let t = false;
    for (const s of this.EffectSpecMap.values()) {
      if (!s.Clear()) {
        t = true;
      }
    }
    for (const e of this.EffectSpecMap.values()) {
      EffectSystem_1.EffectSystem.StopEffect(e, "[EffectModelGroupSpec.OnClear]", true);
    }
    this.f0e = undefined;
    this.M0e = undefined;
    this.v0e = undefined;
    this.p0e = undefined;
    this.d0e.clear();
    this.C0e.length = 0;
    this.g0e.length = 0;
    return !t;
  }
  Destroy() {
    super.Destroy();
    for (const t of this.EffectSpecMap.values()) {
      t.Destroy();
    }
    this.EffectSpecMap.clear();
  }
  Tick(t) {
    this.f0e?.Start();
    this.p0e?.Start();
    super.Tick(t);
    this.p0e?.Stop();
    for (const s of this.EffectSpecMap.values()) {
      this.v0e?.Start();
      s.Tick(t);
      this.v0e?.Stop();
    }
    this.f0e?.Stop();
  }
  TickDelayPlay(s) {
    if (this.g0e.length > 0) {
      for (let t = 0; t < this.g0e.length; ++t) {
        var e = this.g0e[t];
        var i = e[1] - s;
        if ((e[1] = i) <= 0) {
          i = e[0];
          this.g0e.splice(t, 1);
          this.EffectSpecMap.get(i)?.Play("[EffectModelGroupSpec.OnTick] 延迟播放");
          t--;
        }
      }
    }
    return !(this.g0e.length > 0);
  }
  OnTick(t) {
    this.M0e?.Start();
    this.TickDelayPlay(t);
    if (this.HasTransformAnim && this.GroupComponent?.IsValid() && this.IsPlaying()) {
      UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransform(this.GetPlayInEditor(), this.GroupComponent, this.CachedLocationCurve, this.CachedRotationCurve, this.CachedScaleCurve, this.LifeTime.PassTime);
    }
    this.M0e?.Stop();
  }
  OnBodyEffectChanged(t, s) {
    for (const e of this.EffectSpecMap.values()) {
      e.GetEffectSpec().UpdateBodyEffect(t, true, s);
    }
  }
  SetStopping(t) {
    super.SetStopping(t);
    for (const s of this.EffectSpecMap.values()) {
      s.GetEffectSpec()?.SetStopping(t);
    }
  }
  OnPlay(t) {
    for (var [s, e] of this.EffectSpecMap) {
      if (!this.d0e.has(s)) {
        e.Play(t);
      }
    }
    if (this.C0e.length) {
      this.g0e.length = 0;
      for (const o of this.C0e) {
        var i;
        this.g0e.push([o[0], o[1]]);
        if (this.EffectSpecMap.has(o[0]) && (i = this.EffectSpecMap.get(o[0])) && (i = i.GetEffectSpec())) {
          i.OnBeginDelayPlay();
        }
      }
    }
    if (this.GroupComponent) {
      UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransform(true, this.GroupComponent, this.CachedLocationCurve, this.CachedRotationCurve, this.CachedScaleCurve, this.LifeTime.PassTime);
    }
  }
  OnReplay() {
    for (const t of this.EffectSpecMap.values()) {
      t.Replay();
    }
  }
  OnEnterPool() {
    for (const t of this.EffectSpecMap.values()) {
      t.OnEnterPool();
    }
  }
  OnStop(t, s) {
    for (const e of this.EffectSpecMap.values()) {
      e.Stop(t, s);
    }
  }
  OnPreStop() {
    for (const t of this.EffectSpecMap.values()) {
      t.PreStop();
    }
  }
  OnEnableChanged(t) {
    for (const s of this.EffectSpecMap.values()) {
      s.OnEnabledChange(t, 0);
    }
  }
  NeedVisibilityTest() {
    for (const t of this.EffectSpecMap.values()) {
      if (t.GetEffectSpec()?.NeedVisibilityTest()) {
        return true;
      }
    }
    return false;
  }
  VisibilityChanged(t) {
    super.VisibilityChanged(t);
    for (const s of this.EffectSpecMap.values()) {
      s.OnVisibilityChanged(t);
    }
  }
  SeekTo(t, s, e) {
    super.SeekTo(t, s, e);
    for (const i of this.EffectSpecMap.values()) {
      i.GetEffectSpec()?.SeekTo(t, s, e);
    }
  }
  SeekDelta(t, s, e) {
    super.SeekDelta(t, s, e);
    for (const i of this.EffectSpecMap.values()) {
      i.GetEffectSpec()?.SeekDelta(t, s, e);
    }
  }
  DebugErrorNiagaraPauseCount() {
    let t = 0;
    for (const s of this.EffectSpecMap.values()) {
      t += s.GetEffectSpec()?.DebugErrorNiagaraPauseCount() ?? 0;
    }
    return t;
  }
  NeedAlwaysTick() {
    for (const t of this.EffectSpecMap.values()) {
      if (t.GetEffectSpec()?.NeedAlwaysTick()) {
        return true;
      }
    }
    return false;
  }
  IsVisible() {
    for (const t of this.EffectSpecMap.values()) {
      if (t.GetEffectSpec()?.IsVisible()) {
        return true;
      }
    }
    return this.Visible;
  }
  IsUseBoundsCalculateDistance() {
    for (const t of this.EffectSpecMap.values()) {
      if (t.GetEffectSpec()?.IsUseBoundsCalculateDistance()) {
        return true;
      }
    }
    return false;
  }
  FreezeEffect(t) {
    super.FreezeEffect(t);
    for (const s of this.EffectSpecMap.values()) {
      s.FreezeEffect(t, true);
    }
  }
  OnModifyEffectModel() {
    super.OnModifyEffectModel();
    for (const t of this.EffectSpecMap.values()) {
      t.OnModifyEffectModel();
    }
  }
  GetDebugErrorCode() {
    for (const s of this.EffectSpecMap.values()) {
      var t = s.GetDebugErrorCode();
      if (t !== 0) {
        return t;
      }
    }
    return 0;
  }
  SetStoppingTime(t) {
    if (this.StoppingTimeInternal !== t) {
      super.SetStoppingTime(t);
      for (const s of this.EffectSpecMap.values()) {
        s.GetEffectSpec()?.SetStoppingTime(t);
      }
    }
  }
  IsOverrideTick() {
    return true;
  }
  RegisterToKuroEffectSystem() {
    if (this.Handle && this.GroupComponent && this.EffectModel) {
      var t = this.Handle.GetSureEffectActor();
      if (t) {
        this.HasInitTickOptimize = true;
        var s = UE.NewArray(UE.BuiltinInt);
        for (const e of this.EffectSpecMap) {
          s.Add(e[0]);
          e[1].InitTickOptimize();
        }
        cpp_1.FKuroEffectSystemInterface.RegisterEffectGroupHandle(this.Handle.Id, this.Handle.Parent?.Id ?? 0, this.EffectModel, t, this.GroupComponent, s);
      }
    }
  }
  UnregisterToKuroEffectSystem() {
    super.UnregisterToKuroEffectSystem();
    for (const t of this.EffectSpecMap.values()) {
      t.ClearTickOptimize();
    }
  }
}
exports.EffectModelGroupSpec = EffectModelGroupSpec;
//# sourceMappingURL=EffectModelGroupSpec.js.map