"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.EffectSystem = exports.EFFECT_LIFETIME_FLOAT_TO_INT = exports.EFFECT_REASON_LENGTH_LIMIT = void 0;
const cpp_1 = require("cpp"),
  Info_1 = require("../../Core/Common/Info"),
  Lru_1 = require("../../Core/Container/Lru"),
  EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment"),
  KuroEffectSystem_1 = require("./KuroEffectSystem/KuroEffectSystem"),
  TsEffectSystem_1 = require("./TsEffectSystem");
exports.EFFECT_REASON_LENGTH_LIMIT = 4, exports.EFFECT_LIFETIME_FLOAT_TO_INT = 1e4;
class EffectSystem {
  static get Vdc() {
    return this.oCc || (this.oCc = new KuroEffectSystem_1.KuroEffectSystem), this.oCc
  }
  static get jdc() {
    return this.nCc || (this.nCc = new TsEffectSystem_1.TsEffectSystem), this.nCc
  }
  static Initialize() {
    if (this.Ndc = EffectEnvironment_1.EffectEnvironment.OpenCppOptimize, cpp_1.FEffectSystem.SetUseDebugDrawNew(this.Ndc), this.Ndc) {
      if (this.Vdc.Initialize()) return !0;
      this.Ndc = !1
    }
    return this.jdc.Initialize()
  }
  static Clear() {
    return (this.Ndc ? this.Vdc : this.jdc).Clear()
  }
  static InitializeWithPreview(t) {
    Info_1.Info.IsGameRunning() || this.Vdc.PreviewInitState || (this.Vdc.InitializeWithPreview(t) ? this.Ndc = EffectEnvironment_1.EffectEnvironment.OpenCppOptimize : this.Ndc = !1, this.jdc.InitializeWithPreview(t))
  }
  static Tick(t) {
    (this.Ndc ? this.Vdc : this.jdc).Tick(t)
  }
  static AfterTick(t) {
    this.Ndc || this.jdc.AfterTick(t)
  }
  static ClearPool() {
    (this.Ndc ? this.Vdc : this.jdc).ClearPool()
  }
  static InitHandleWhenEnable(t) {
    return !this.Ndc && this.jdc.InitHandleWhenEnable(t)
  }
  static SpawnChildEffect(t, i, s, e, h, a = !0, r, c, n) {
    if (!this.Ndc) return this.jdc.SpawnChildEffect(t, i, s, e, h, a, r, c, n)
  }
  static AddRemoveHandle(t, i) {
    this.Ndc || this.jdc.AddRemoveHandle(t, i)
  }
  static StopEffect(t, i, s, e) {
    return !this.Ndc && this.jdc.StopEffect(t, i, s, e)
  }
  static CreateEffectLru(t) {
    return this.Ndc ? new Lru_1.Lru(t) : this.jdc.CreateEffectLru(t)
  }
  static SpawnEffectWithActor(t, i, s, e, h = !0, a, r = !0, c = 3) {
    return this.Ndc ? this.Vdc.SpawnEffectWithActor(t, i, s, e, h, a, r, c) : this.jdc.SpawnEffectWithActor(t, void 0, i, s, e, h, a, void 0, void 0, r, void 0, c, void 0, !0)
  }
  static RemoveKuroEffectHandle(t) {
    this.Ndc && this.Vdc.RemoveKuroEffectHandle(t)
  }
  static GetEffectLruCount(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetEffectLruCount(t)
  }
  static GetEffectLruCapacity() {
    return (this.Ndc ? this.Vdc : this.jdc).GetEffectLruCapacity()
  }
  static SetEffectLruCapacity(t) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectLruCapacity(t)
  }
  static GetEffectLruSize() {
    return (this.Ndc ? this.Vdc : this.jdc).GetEffectLruSize()
  }
  static SpawnUnloopedEffect(t, i, s, e, h, a = 3, r, c, n, f = !1, o = !1) {
    return (this.Ndc ? this.Vdc : this.jdc).SpawnUnloopedEffect(t, i, s, e, h, a, r, c, n, f, o)
  }
  static SpawnEffect(t, i, s, e, h, a = 3, r, c, n, f = !1, o = !1) {
    return (this.Ndc ? this.Vdc : this.jdc).SpawnEffect(t, i, s, e, h, a, r, c, n, f, o)
  }
  static DynamicRegisterSpawnCallback(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).DynamicRegisterSpawnCallback(t, i)
  }
  static ForceCheckPendingInit(t) {
    (this.Ndc ? this.Vdc : this.jdc).ForceCheckPendingInit(t)
  }
  static SetEffectHidden(t, i, s = void 0, e = !1) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectHidden(t, i, s, e)
  }
  static StopEffectById(t, i, s, e) {
    return (this.Ndc ? this.Vdc : this.jdc).StopEffectById(t, i, s, e)
  }
  static IsValid(t) {
    return (this.Ndc ? this.Vdc : this.jdc).IsValid(t)
  }
  static AddFinishCallback(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).AddFinishCallback(t, i)
  }
  static RemoveFinishCallback(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).RemoveFinishCallback(t, i)
  }
  static GetEffectActor(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetEffectActor(t)
  }
  static GetSureEffectActor(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetSureEffectActor(t)
  }
  static GetNiagaraComponent(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetNiagaraComponent(t)
  }
  static GetSureNiagaraComponent(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetSureNiagaraComponent(t)
  }
  static ReplayEffect(t, i, s = void 0) {
    (this.Ndc ? this.Vdc : this.jdc).ReplayEffect(t, i, s)
  }
  static IsPlaying(t) {
    return (this.Ndc ? this.Vdc : this.jdc).IsPlaying(t)
  }
  static SetHandleLifeCycle(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).SetHandleLifeCycle(t, i)
  }
  static SetTimeScale(t, i, s = !1) {
    (this.Ndc ? this.Vdc : this.jdc).SetTimeScale(t, i, s)
  }
  static FreezeHandle(t, i, s = !1) {
    (this.Ndc ? this.Vdc : this.jdc).FreezeHandle(t, i, s)
  }
  static IsHandleFreeze(t) {
    return (this.Ndc ? this.Vdc : this.jdc).IsHandleFreeze(t)
  }
  static HandleSeekToTime(t, i, s, e = !1) {
    return (this.Ndc ? this.Vdc : this.jdc).HandleSeekToTime(t, i, s, e)
  }
  static HandleSeekToTimeWithProcess(t, i, s = !1, e = -1) {
    (this.Ndc ? this.Vdc : this.jdc).HandleSeekToTimeWithProcess(t, i, s, e)
  }
  static GetSeekToTargetTime(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetSeekToTargetTime(t)
  }
  static SetEffectNotRecord(t, i = !0) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectNotRecord(t, i)
  }
  static GetPath(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetPath(t)
  }
  static SetEffectDataByNiagaraParam(t, i, s) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectDataByNiagaraParam(t, i, s)
  }
  static SetEffectParameterNiagara(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectParameterNiagara(t, i)
  }
  static SetEffectDataFloatConstParam(t, i, s) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectDataFloatConstParam(t, i, s)
  }
  static SetEffectExtraState(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectExtraState(t, i)
  }
  static SetEffectIgnoreVisibilityOptimize(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectIgnoreVisibilityOptimize(t, i)
  }
  static SetEffectStoppingTime(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectStoppingTime(t, i)
  }
  static get GlobalStoppingPlayTime() {
    return this.Ndc ? this.Vdc.GlobalStoppingPlayTime() : this.jdc.GlobalStoppingPlayTime
  }
  static get GlobalStoppingTime() {
    return this.Ndc ? this.Vdc.GlobalStoppingTime() : this.jdc.GlobalStoppingTime
  }
  static SetGlobalStoppingTime(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).SetGlobalStoppingTime(t, i)
  }
  static AttachToEffectSkeletalMesh(t, i, s, e) {
    (this.Ndc ? this.Vdc : this.jdc).AttachToEffectSkeletalMesh(t, i, s, e)
  }
  static AttachSkeletalMesh(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).AttachSkeletalMesh(t, i)
  }
  static CollectMaterialFloatCurve(t, i, s) {
    (this.Ndc ? this.Vdc : this.jdc).CollectMaterialFloatCurve(t, i, s)
  }
  static CollectMaterialVectorCurve(t, i, s) {
    (this.Ndc ? this.Vdc : this.jdc).CollectMaterialVectorCurve(t, i, s)
  }
  static CollectMaterialLinearColorCurve(t, i, s) {
    (this.Ndc ? this.Vdc : this.jdc).CollectMaterialLinearColorCurve(t, i, s)
  }
  static GetEffectModel(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetEffectModel(t)
  }
  static GetTotalPassTime(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetTotalPassTime(t)
  }
  static GetPassTime(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetPassTime(t)
  }
  static GetHideOnBurstSkill(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetHideOnBurstSkill(t)
  }
  static RegisterCustomCheckOwnerFunc(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).RegisterCustomCheckOwnerFunc(t, i)
  }
  static SetEffectQualityLevel(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).SetEffectQualityLevel(t, i)
  }
  static TickHandleInEditor(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).TickHandleInEditor(t, i)
  }
  static GetLastPlayTime(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetLastPlayTime(t)
  }
  static GetLastStopTime(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetLastStopTime(t)
  }
  static UpdateBodyEffect(t, i, s, e) {
    (this.Ndc ? this.Vdc : this.jdc).UpdateBodyEffect(t, i, s, e)
  }
  static RegisterSyncTimeScaleHandle(t, i) {
    return !this.Ndc && this.jdc.RegisterSyncTimeScaleHandle(t, i)
  }
  static UnregisterSyncTimeScaleHandle(t, i) {
    return !this.Ndc && this.jdc.UnregisterSyncTimeScaleHandle(t, i)
  }
  static ClearOwnerEffectHandle(t, i) {
    this.Ndc || this.jdc.ClearOwnerEffectHandle(t, i)
  }
  static DebugUpdate(t, i) {
    (this.Ndc ? this.Vdc : this.jdc).DebugUpdate(t, i)
  }
  static GetEffectCount() {
    return (this.Ndc ? this.Vdc : this.jdc).GetEffectCount()
  }
  static GetActiveEffectCount() {
    return (this.Ndc ? this.Vdc : this.jdc).GetActiveEffectCount()
  }
  static DebugPrintAllErrorEffects() {
    (this.Ndc ? this.Vdc : this.jdc).DebugPrintAllErrorEffects()
  }
  static DebugPrintCurrentImportanceEffects() {
    (this.Ndc ? this.Vdc : this.jdc).DebugPrintCurrentImportanceEffects()
  }
  static DebugPrintEffect() {
    (this.Ndc ? this.Vdc : this.jdc).DebugPrintEffect()
  }
  static GetPlayerEffectLruSize(t) {
    return (this.Ndc ? this.Vdc : this.jdc).GetPlayerEffectLruSize(t)
  }
  static SetEffectStartRecording(t, i, s, e) {
    this.Ndc && this.Vdc.SetEffectStartRecording(t, i, s, e), this.jdc.SetEffectStartRecording(t, i, s, e)
  }
  static RefreshEffectSpecData(t) {
    this.Ndc && this.Vdc.RefreshEffectSpecData(t), this.jdc.RefreshEffectSpecData(t)
  }
}(exports.EffectSystem = EffectSystem).oCc = void 0, EffectSystem.nCc = void 0, EffectSystem.Ndc = !1;
//# sourceMappingURL=EffectSystem.js.map