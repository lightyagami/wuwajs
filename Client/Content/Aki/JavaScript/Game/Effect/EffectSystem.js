"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectSystem = exports.EFFECT_LIFETIME_FLOAT_TO_INT = exports.EFFECT_REASON_LENGTH_LIMIT = undefined;
const cpp_1 = require("cpp");
const Info_1 = require("../../Core/Common/Info");
const Lru_1 = require("../../Core/Container/Lru");
const EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment");
const KuroEffectSystem_1 = require("./KuroEffectSystem/KuroEffectSystem");
const TsEffectSystem_1 = require("./TsEffectSystem");
exports.EFFECT_REASON_LENGTH_LIMIT = 4;
exports.EFFECT_LIFETIME_FLOAT_TO_INT = 10000;
class EffectSystem {
  static get Vdc() {
    this.oCc ||= new KuroEffectSystem_1.KuroEffectSystem();
    return this.oCc;
  }
  static get jdc() {
    this.nCc ||= new TsEffectSystem_1.TsEffectSystem();
    return this.nCc;
  }
  static Initialize() {
    this.Ndc = EffectEnvironment_1.EffectEnvironment.OpenCppOptimize;
    cpp_1.FEffectSystem.SetUseDebugDrawNew(this.Ndc);
    if (this.Ndc) {
      if (this.Vdc.Initialize()) {
        return true;
      }
      this.Ndc = false;
    }
    return this.jdc.Initialize();
  }
  static Clear() {
    return (this.Ndc ? this.Vdc : this.jdc).Clear();
  }
  static InitializeWithPreview(t) {
    if (!Info_1.Info.IsGameRunning() && !this.Vdc.PreviewInitState) {
      if (this.Vdc.InitializeWithPreview(t)) {
        this.Ndc = EffectEnvironment_1.EffectEnvironment.OpenCppOptimize;
      } else {
        this.Ndc = false;
      }
      this.jdc.InitializeWithPreview(t);
    }
  }
  static Tick(t) {
    (this.Ndc ? this.Vdc : this.jdc).Tick(t);
  }
  static AfterTick(t) {
    if (!this.Ndc) {
      this.jdc.AfterTick(t);
    }
  }
  static ClearPool() {
    (this.Ndc ? this.Vdc : this.jdc).ClearPool();
  }
  static InitHandleWhenEnable(t) {
    return !this.Ndc && this.jdc.InitHandleWhenEnable(t);
  }
  static SpawnChildEffect(t, i, s, e, h, a = true, r, c, n) {
    if (!this.Ndc) {
      return this.jdc.SpawnChildEffect(t, i, s, e, h, a, r, c, n);
    }
  }
  static AddRemoveHandle(t, i) {
    if (!this.Ndc) {
      this.jdc.AddRemoveHandle(t, i);
    }
  }
  static StopEffect(t, i, s, e) {
    return !this.Ndc && this.jdc.StopEffect(t, i, s, e);
  }
  static CreateEffectLru(t) {
    if (this.Ndc) {
      return new Lru_1.Lru(t);
    } else {
      return this.jdc.CreateEffectLru(t);
    }
  }
  static SpawnEffectWithActor(t, i, s, e, h = true, a, r = true, c = 3) {
    if (this.Ndc) {
      return this.Vdc.SpawnEffectWithActor(t, i, s, e, h, a, r, c);
    } else {
      return this.jdc.SpawnEffectWithActor(t, undefined, i, s, e, h, a, undefined, undefined, r, undefined, c, undefined, true);
    }
  }
  static RemoveKuroEffectHandle(t) {
    if (this.Ndc) {
      this.Vdc.RemoveKuroEffectHandle(t);
    }
  }
  static GetEffectLruCount(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetEffectLruCount(t);
  }
  static GetEffectLruCapacity() {
    return (this.Ndc ? this.Vdc : this.jdc).GetEffectLruCapacity();
  }
  static SetEffectLruCapacity(t) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectLruCapacity(t);
  }
  static GetEffectLruSize() {
    return (this.Ndc ? this.Vdc : this.jdc).GetEffectLruSize();
  }
  static SpawnUnloopedEffect(t, i, s, e, h, a = 3, r, c, n, f = false, o = false) {
    return (this.Ndc ? this.Vdc : this.jdc).SpawnUnloopedEffect(t, i, s, e, h, a, r, c, n, f, o);
  }
  static SpawnEffect(t, i, s, e, h, a = 3, r, c, n, f = false, o = false) {
    return (this.Ndc ? this.Vdc : this.jdc).SpawnEffect(t, i, s, e, h, a, r, c, n, f, o);
  }
  static DynamicRegisterSpawnCallback(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).DynamicRegisterSpawnCallback(t, i);
  }
  static ForceCheckPendingInit(t) {
    (this.Ndc ? this.Vdc : this.jdc).ForceCheckPendingInit(t);
  }
  static SetEffectHidden(t, i, s = undefined, e = false) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectHidden(t, i, s, e);
  }
  static StopEffectById(t, i, s, e) {
    return (this.Ndc ? this.Vdc : this.jdc).StopEffectById(t, i, s, e);
  }
  static IsValid(t) {
    return (this.Ndc ? this.Vdc : this.jdc).IsValid(t);
  }
  static AddFinishCallback(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).AddFinishCallback(t, i);
  }
  static RemoveFinishCallback(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).RemoveFinishCallback(t, i);
  }
  static GetEffectActor(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetEffectActor(t);
  }
  static GetSureEffectActor(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetSureEffectActor(t);
  }
  static GetNiagaraComponent(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetNiagaraComponent(t);
  }
  static GetSureNiagaraComponent(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetSureNiagaraComponent(t);
  }
  static ReplayEffect(t, i, s = undefined) {
    (this.Ndc ? this.Vdc : this.jdc).ReplayEffect(t, i, s);
  }
  static IsPlaying(t) {
    return (this.Ndc ? this.Vdc : this.jdc).IsPlaying(t);
  }
  static SetHandleLifeCycle(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).SetHandleLifeCycle(t, i);
  }
  static SetTimeScale(t, i, s = false) {
    (this.Ndc ? this.Vdc : this.jdc).SetTimeScale(t, i, s);
  }
  static SetAdditionTimeScale(t, i, s) {
    if (this.Ndc) {
      this.Vdc.SetAdditionTimeScale(t, i, s);
    }
  }
  static SetAdditionTimeScaleEnable(t, i) {
    if (this.Ndc) {
      this.Vdc.SetAdditionTimeScaleEnable(t, i);
    }
  }
  static GetAdditionTimeScaleEnable(t) {
    return !!this.Ndc && this.Vdc.GetAdditionTimeScaleEnable(t);
  }
  static FreezeHandle(t, i, s = false) {
    (this.Ndc ? this.Vdc : this.jdc).FreezeHandle(t, i, s);
  }
  static IsHandleFreeze(t) {
    return (this.Ndc ? this.Vdc : this.jdc).IsHandleFreeze(t);
  }
  static HandleSeekToTime(t, i, s, e = false) {
    return (this.Ndc ? this.Vdc : this.jdc).HandleSeekToTime(t, i, s, e);
  }
  static HandleSeekToTimeWithProcess(t, i, s = false, e = -1) {
    (this.Ndc ? this.Vdc : this.jdc).HandleSeekToTimeWithProcess(t, i, s, e);
  }
  static GetSeekToTargetTime(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetSeekToTargetTime(t);
  }
  static SetEffectNotRecord(t, i = true) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectNotRecord(t, i);
  }
  static GetPath(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetPath(t);
  }
  static SetEffectDataByNiagaraParam(t, i, s) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectDataByNiagaraParam(t, i, s);
  }
  static SetEffectParameterNiagara(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectParameterNiagara(t, i);
  }
  static SetEffectDataFloatConstParam(t, i, s) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectDataFloatConstParam(t, i, s);
  }
  static SetEffectExtraState(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectExtraState(t, i);
  }
  static SetEffectIgnoreVisibilityOptimize(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectIgnoreVisibilityOptimize(t, i);
  }
  static SetEffectStoppingTime(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectStoppingTime(t, i);
  }
  static get GlobalStoppingPlayTime() {
    if (this.Ndc) {
      return this.Vdc.GlobalStoppingPlayTime();
    } else {
      return this.jdc.GlobalStoppingPlayTime;
    }
  }
  static get GlobalStoppingTime() {
    if (this.Ndc) {
      return this.Vdc.GlobalStoppingTime();
    } else {
      return this.jdc.GlobalStoppingTime;
    }
  }
  static SetGlobalStoppingTime(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).SetGlobalStoppingTime(t, i);
  }
  static AttachToEffectSkeletalMesh(t, i, s, e) {
    (this.Ndc ? this.Vdc : this.jdc).AttachToEffectSkeletalMesh(t, i, s, e);
  }
  static AttachSkeletalMesh(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).AttachSkeletalMesh(t, i);
  }
  static CollectMaterialFloatCurve(t, i, s) {
    (this.Ndc ? this.Vdc : this.jdc).CollectMaterialFloatCurve(t, i, s);
  }
  static CollectMaterialVectorCurve(t, i, s) {
    (this.Ndc ? this.Vdc : this.jdc).CollectMaterialVectorCurve(t, i, s);
  }
  static CollectMaterialLinearColorCurve(t, i, s) {
    (this.Ndc ? this.Vdc : this.jdc).CollectMaterialLinearColorCurve(t, i, s);
  }
  static GetEffectModel(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetEffectModel(t);
  }
  static GetTotalPassTime(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetTotalPassTime(t);
  }
  static GetPassTime(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetPassTime(t);
  }
  static GetHideOnBurstSkill(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetHideOnBurstSkill(t);
  }
  static RegisterCustomCheckOwnerFunc(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).RegisterCustomCheckOwnerFunc(t, i);
  }
  static SetEffectQualityLevel(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectQualityLevel(t, i);
  }
  static TickHandleInEditor(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).TickHandleInEditor(t, i);
  }
  static GetLastPlayTime(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetLastPlayTime(t);
  }
  static GetLastStopTime(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetLastStopTime(t);
  }
  static UpdateBodyEffect(t, i, s, e) {
    (this.Ndc ? this.Vdc : this.jdc).UpdateBodyEffect(t, i, s, e);
  }
  static RegisterSyncTimeScaleHandle(t, i) {
    return !this.Ndc && this.jdc.RegisterSyncTimeScaleHandle(t, i);
  }
  static UnregisterSyncTimeScaleHandle(t, i) {
    return !this.Ndc && this.jdc.UnregisterSyncTimeScaleHandle(t, i);
  }
  static ClearOwnerEffectHandle(t, i) {
    if (!this.Ndc) {
      this.jdc.ClearOwnerEffectHandle(t, i);
    }
  }
  static DebugUpdate(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).DebugUpdate(t, i);
  }
  static GetEffectCount() {
    return (this.Ndc ? this.Vdc : this.jdc).GetEffectCount();
  }
  static GetActiveEffectCount() {
    return (this.Ndc ? this.Vdc : this.jdc).GetActiveEffectCount();
  }
  static DebugPrintAllErrorEffects() {
    (this.Ndc ? this.Vdc : this.jdc).DebugPrintAllErrorEffects();
  }
  static DebugPrintCurrentImportanceEffects() {
    (this.Ndc ? this.Vdc : this.jdc).DebugPrintCurrentImportanceEffects();
  }
  static DebugPrintEffect() {
    (this.Ndc ? this.Vdc : this.jdc).DebugPrintEffect();
  }
  static GetPlayerEffectLruSize(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetPlayerEffectLruSize(t);
  }
  static SetEffectStartRecording(t, i, s, e) {
    if (this.Ndc) {
      this.Vdc.SetEffectStartRecording(t, i, s, e);
    }
    this.jdc.SetEffectStartRecording(t, i, s, e);
  }
  static RefreshEffectSpecData(t) {
    if (this.Ndc) {
      this.Vdc.RefreshEffectSpecData(t);
    }
    this.jdc.RefreshEffectSpecData(t);
  }
}
(exports.EffectSystem = EffectSystem).oCc = undefined;
EffectSystem.nCc = undefined;
EffectSystem.Ndc = false; //# sourceMappingURL=EffectSystem.js.map