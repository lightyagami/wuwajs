"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.KuroEffectSystem = void 0;
const cpp_1 = require("cpp"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  EffectSpecDataGetAll_1 = require("../../../Core/Define/ConfigQuery/EffectSpecDataGetAll"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneTeamDefine_1 = require("../../Module/SceneTeam/SceneTeamDefine"),
  CharRenderingComponent_1 = require("../../Render/Character/Manager/CharRenderingComponent"),
  EffectModelNiagara_1 = require("../../Render/Effect/Data/EffectModelNiagara"),
  CustomMap_1 = require("../../World/Define/CustomMap"),
  GameBudgetAllocatorConfigCreator_1 = require("../../World/Define/GameBudgetAllocatorConfigCreator"),
  EffectAudioContext_1 = require("../EffectContext/EffectAudioContext"),
  EffectContext_1 = require("../EffectContext/EffectContext"),
  EffectRuntimeGhostEffectContext_1 = require("../EffectContext/EffectRuntimeGhostEffectContext"),
  SkeletalMeshEffectContext_1 = require("../EffectContext/SkeletalMeshEffectContext"),
  EffectAudioController_1 = require("../EffectSpec/EffectAudioController"),
  TsEffectSystem_1 = require("../TsEffectSystem"),
  KuroEffectActorHandle_1 = require("./KuroEffectActorHandle"),
  KuroEffectHandle_1 = require("./KuroEffectHandle"),
  KuroEffectNiagaraComponentHandle_1 = require("./KuroEffectNiagaraComponentHandle"),
  MIN_NIAGARA_SIMULATION_TICK_TIME = .033,
  CHECK_EFFECT_OWNER_INTERVAL = 6e4,
  EFFECT_SPEC_DATA_PATH = "../Config/Client/EffectData/";
class KuroEffectSystem {
  constructor() {
    this.PreviewInitState = !1, this.Zdc = !1, this.emc = new CustomMap_1.CustomMap, this.PNc = new CustomMap_1.CustomMap, this.xNc = new CustomMap_1.CustomMap, this.tmc = e => {
      cpp_1.FEffectSystem.OnUiSceneStateChange(e)
    }, this.imc = e => {
      cpp_1.FEffectSystem.OnTickSystemPausedChange(e)
    }, this.ZAc = new Array, this.kpe = () => {
      if (0 === this.ZAc.length)
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) this.ZAc.push(new cpp_1.FSceneTeamItem);
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
      for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        var r = t[e],
          i = r?.EntityHandle;
        r?.IsMyRole() && i ? (this.ZAc[e].EntityId = i.Id, this.ZAc[e].IsMyRole = !0) : (this.ZAc[e].EntityId = 0, this.ZAc[e].IsMyRole = !1)
      }
      cpp_1.FEffectSystem.OnPlayerEffectContainerFormationLoaded(this.ZAc)
    }, this.rmc = new Array, this.omc = new Array, this._pe = CHECK_EFFECT_OWNER_INTERVAL, this.Tfe = () => {
      cpp_1.FEffectSystem.OnGlobalTimeScaleChange()
    }, this.mna = () => {
      var e = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.NIAGARAQUALITY);
      void 0 !== e && (Info_1.Info.IsPcPlatform() ? e < 1 ? this.dna() : this.Cna() : e < 2 ? this.dna() : this.Cna())
    }
  }
  Initialize() {
    return Info_1.Info.IsGameRunning() && cpp_1.FKuroTimerSystem.Initialize(GlobalData_1.GlobalData.GameInstance), this.emc.Clear(), !!this.nmc() && (this.Zdc = !0, EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, this.Tfe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetNiagaraQuality, this.mna), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AfterGameSettingsAppliedOnOpenLoading, this.mna), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGlobalUiSceneStateChanged, this.tmc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSetGamePaused, this.imc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.kpe), !0)
  }
  nmc(e = !1, t = !1) {
    cpp_1.FKuroResourceSystem.Initialize(GlobalData_1.GlobalData.World, 1), e || this.smc();
    let r = !0;
    e && !t && cpp_1.FEffectSystem.HasEffectForSpecData() && (r = !1);
    t = new Array;
    return r && (this.amc(e), this.hmc(t, e)), this.rmc.length = 0, this.omc.length = 0, !!cpp_1.FEffectSystem.Initialize(GlobalData_1.GlobalData.GameInstance, t, Info_1.Info.IsGameRunning(), .1, .3, .3, !0, UE.BP_EffectPreview_C.StaticClass(), r) && (cpp_1.FEffectSystem.InitStaticGlobalData(EffectEnvironment_1.EffectEnvironment.UseLog, Info_1.Info.IsInEditorTick(), PublicUtil_1.PublicUtil.UseDbConfig()), cpp_1.FEffectSystem.RegisterJsFunction(KuroEffectSystem.lmc, KuroEffectSystem._mc, KuroEffectSystem.cmc, KuroEffectSystem.umc, KuroEffectSystem.dmc, KuroEffectSystem.mmc, KuroEffectSystem.fmc, KuroEffectSystem.gmc, KuroEffectSystem.Cmc, KuroEffectSystem.pmc, KuroEffectSystem.vmc, KuroEffectSystem.ymc, KuroEffectSystem.Smc, KuroEffectSystem.Mmc, KuroEffectSystem.Emc, KuroEffectSystem.Imc, KuroEffectSystem.Tmc, KuroEffectSystem.bmc, KuroEffectSystem.Lmc, KuroEffectSystem.wmc, KuroEffectSystem.Rmc, KuroEffectSystem.Amc, KuroEffectSystem.Pmc, KuroEffectSystem.xmc, KuroEffectSystem.Umc, KuroEffectSystem.Dmc, KuroEffectSystem.j2c, KuroEffectSystem.H2c, KuroEffectSystem.$2c), !0)
  }
  Clear() {
    this.Zdc = !1, EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.kpe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSetGamePaused, this.imc), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGlobalUiSceneStateChanged, this.tmc), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AfterGameSettingsAppliedOnOpenLoading, this.mna), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetNiagaraQuality, this.mna), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerUiTimeDilation, this.Tfe), this.PreviewInitState = !1, EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds = 0;
    for (const e of this.emc.GetItems()) e.Clear();
    return this.emc.Clear(), cpp_1.FEffectSystem.Clear(), Info_1.Info.IsGameRunning() && (cpp_1.FKuroTimerSystem.Clear(), cpp_1.FKuroResourceSystem.Clear()), !0
  }
  ClearPool() {
    return cpp_1.FEffectSystem.ClearPool(!1), !0
  }
  InitializeWithPreview(e) {
    return !!Info_1.Info.IsGameRunning() || !(e || !this.PreviewInitState) || (e && this.PreviewInitState && cpp_1.FEffectSystem.HasInitialize() ? (e = new Array, this.amc(!0), this.hmc(e, !0), cpp_1.FEffectSystem.RefreshEffectForSpecData(e, !1), !0) : this.Zdc ? (Log_1.Log.CheckError() && Log_1.Log.Error("RenderEffect", 36, "[特效框架]InitializeWithPreview时 FEffectSystem还未Clear,非法"), !0) : (this.PreviewInitState = !0, this.nmc(!0, !0)))
  }
  smc() {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.rmc.length = 0, this.omc.length = 0;
      var e = EffectSpecDataGetAll_1.configEffectSpecDataGetAll.GetConfigList(!1);
      if (e)
        for (const t of e) this.omc.push(t)
    }
  }
  amc(e = !1) {
    if (Info_1.Info.IsPlayInEditor && (e || !PublicUtil_1.PublicUtil.UseDbConfig())) {
      this.rmc.length = 0, this.omc.length = 0;
      e = UE.KismetSystemLibrary.GetProjectDirectory() + EFFECT_SPEC_DATA_PATH;
      if (UE.BlueprintPathsLibrary.DirectoryExists(e)) try {
        var t, r = UE.KuroStaticLibrary.LoadFilesRecursive(e, "*.json", !0, !1),
          i = new Array;
        for (let e = 0; e < r.Num(); ++e) i.push(r.Get(e));
        for (const o of i) !o || o.length < 1 || (t = JSON.parse(o), this.rmc.push(t))
      } catch (e) {
        e instanceof Error ? Log_1.Log.CheckError() && Log_1.Log.ErrorWithStack("RenderEffect", 3, "读取EffectSpec.json异常", e, ["Name", this.constructor.name], ["error", e.message]) : Log_1.Log.CheckError() && Log_1.Log.Error("RenderEffect", 3, "读取EffectSpec.json异常", ["Name", this.constructor.name], ["error", e])
      } else Log_1.Log.CheckWarn() && Log_1.Log.Warn("World", 3, "不存在EffectSpec配置文件目录", ["Path", e])
    }
  }
  hmc(e, t = !1) {
    if (t || !PublicUtil_1.PublicUtil.UseDbConfig())
      for (const o of this.rmc) {
        var r = new cpp_1.FEffectSpecData;
        r.Id = o.Id, r.Path = new UE.FName(o.Path), r.SpecType = o.SpecType, r.EffectRegularType = o.EffectRegularType, r.LifeTime = o.LifeTime, e.push(r)
      } else
        for (const f of this.omc) {
          var i = new cpp_1.FEffectSpecData;
          i.Id = f.Id, i.SpecType = f.SpecType, i.EffectRegularType = f.EffectRegularType, i.LifeTime = f.LifeTime, e.push(i)
        }
  }
  Tick(e) {
    if (this._pe -= e, this._pe < 0) {
      this._pe = CHECK_EFFECT_OWNER_INTERVAL;
      for (const t of this.emc.GetItems()) t.IsLoop && !t.CheckOwner() && this.StopEffectById(t.Id, "CheckOwner Failed", !0)
    }
  }
  dna() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderEffect", 36, "Open Niagara Down Sampling"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Kuro.Niagara.SystemSimulation.TickDeltaTime " + MIN_NIAGARA_SIMULATION_TICK_TIME), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Kuro.Niagara.SystemSimulation.SpawnAlignment 0")
  }
  Cna() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderEffect", 36, "Close Niagara Down Sampling"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Kuro.Niagara.SystemSimulation.TickDeltaTime -1"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Kuro.Niagara.SystemSimulation.SpawnAlignment 0")
  }
  SpawnEffectWithActor(e, t, r, i, o = !0, f, n = !0, a = 3) {
    var c = f ? this.Bmc(f) : void 0,
      e = cpp_1.FEffectSystem.SpawnEffectWithActor(e, t, r, i, o, c, n, a);
    return this.IsValid(e) ? this.emc.Contains(e) ? (Log_1.Log.CheckWarn() && Log_1.Log.Warn("RenderEffect", 36, "[特效框架]SpawnEffectWithActor 生成了一个已经存在的effectId", ["id", e]), 0) : ((t = new KuroEffectHandle_1.KuroEffectHandle).Init(f), this.emc.Set(e, t), t.OnAfterSpawn(e), e) : 0
  }
  RemoveKuroEffectHandle(e) {
    this.emc.Contains(e) && (this.emc.Get(e)?.Clear(), this.emc.Remove(e), this.PNc.Contains(e) && this.PNc.Remove(e), this.xNc.Contains(e)) && this.xNc.Remove(e)
  }
  GetEffectLruCount(e) {
    return cpp_1.FEffectSystem.GetEffectLruCount(e)
  }
  GetEffectLruCapacity() {
    return cpp_1.FEffectSystem.GetEffectLruCapacity()
  }
  SetEffectLruCapacity(e) {
    cpp_1.FEffectSystem.SetEffectLruCapacity(e)
  }
  GetEffectLruSize() {
    return cpp_1.FEffectSystem.GetEffectLruSize()
  }
  SpawnUnloopedEffect(e, t, r, i, o, f = 3, n, a, c, s = !1, _ = !1) {
    var p;
    return (this.Zdc || Info_1.Info.IsPlayInEditor) && ((p = new KuroEffectHandle_1.KuroEffectHandle).Init(o, n, a, c), c = o ? this.Bmc(o) : void 0, o = cpp_1.FEffectSystem.SpawnUnloopedEffect(e, t, r, i, c, f, s, _, n ? p.OnBeforeInitCallback : void 0, a ? p.OnEffectInitCallback : void 0, p.OnBeforePlayCallback, p.OnInitCallbackClear, p), this.IsValid(o)) ? this.emc.Contains(o) ? (Log_1.Log.CheckWarn() && Log_1.Log.Warn("RenderEffect", 36, "[特效框架]SpawnUnloopedEffect 生成了一个已经存在的effectId", ["id", o]), 0) : (this.emc.Set(o, p), p.OnAfterSpawn(o), o) : 0
  }
  SpawnEffect(e, t, r, i, o, f = 3, n, a, c, s = !1, _ = !1) {
    var p;
    return (this.Zdc || Info_1.Info.IsPlayInEditor) && ((p = new KuroEffectHandle_1.KuroEffectHandle).Init(o, n, a, c), c = o ? this.Bmc(o) : void 0, o = cpp_1.FEffectSystem.SpawnEffect(e, t, r, i, c, f, s, _, n ? p.OnBeforeInitCallback : void 0, a ? p.OnEffectInitCallback : void 0, p.OnBeforePlayCallback, p.OnInitCallbackClear, p), this.IsValid(o)) ? this.emc.Contains(o) ? (Log_1.Log.CheckWarn() && Log_1.Log.Warn("RenderEffect", 36, "[特效框架]SpawnEffect 生成了一个已经存在的effectId", ["id", o]), 0) : (this.emc.Set(o, p), p.OnAfterSpawn(o), o) : 0
  }
  DynamicRegisterSpawnCallback(e, t) {
    (this.Zdc || Info_1.Info.IsPlayInEditor) && this.emc.Contains(e) && this.emc.Get(e)?.RegisterDynamicEffectInitCallback(t)
  }
  AddFinishCallback(e, t) {
    (this.Zdc || Info_1.Info.IsPlayInEditor) && this.emc.Contains(e) && this.emc.Get(e)?.AddFinishCallback(t)
  }
  RemoveFinishCallback(e, t) {
    (this.Zdc || Info_1.Info.IsPlayInEditor) && this.emc.Contains(e) && this.emc.Get(e)?.RemoveFinishCallback(t)
  }
  ForceCheckPendingInit(e) {
    cpp_1.FEffectSystem.ForceCheckPendingInit(e)
  }
  SetEffectHidden(e, t, r = void 0, i = !1) {
    cpp_1.FEffectSystem.SetEffectHidden(e, t, r, i)
  }
  StopEffectById(e, t, r, i) {
    return cpp_1.FEffectSystem.StopEffectById(e, t, r, i)
  }
  IsValid(e) {
    return cpp_1.FEffectSystem.IsValid(e)
  }
  GetEffectActor(t) {
    if (0 !== t) {
      let e = void 0;
      return cpp_1.FEffectSystem.IsEffectActorValid(t) ? e = this.GetSureEffectActor(t) : this.PNc.Contains(t) ? e = this.PNc.Get(t) : (e = new KuroEffectActorHandle_1.KuroEffectActorHandle(t), this.PNc.Set(t, e)), e
    }
  }
  GetSureEffectActor(e) {
    return cpp_1.FEffectSystem.GetSureEffectActor(e)
  }
  GetNiagaraComponent(t) {
    if (0 !== t) {
      let e = this.GetSureNiagaraComponent(t);
      return e || (this.xNc.Contains(t) ? e = this.xNc.Get(t) : (e = new KuroEffectNiagaraComponentHandle_1.KuroEffectNiagaraComponentHandle(t), this.xNc.Set(t, e))), e
    }
  }
  GetSureNiagaraComponent(e) {
    return cpp_1.FEffectSystem.GetSureNiagaraComponent(e)
  }
  ReplayEffect(e, t, r) {
    cpp_1.FEffectSystem.ReplayEffect(e, t, r, !!r)
  }
  IsPlaying(e) {
    return cpp_1.FEffectSystem.IsPlaying(e)
  }
  SetHandleLifeCycle(e, t) {
    cpp_1.FEffectSystem.SetHandleLifeCycle(e, t)
  }
  SetTimeScale(e, t, r = !1) {
    cpp_1.FEffectSystem.SetTimeScale(e, t, r)
  }
  FreezeHandle(e, t, r = !1) {
    cpp_1.FEffectSystem.FreezeHandle(e, t, r)
  }
  IsHandleFreeze(e) {
    return cpp_1.FEffectSystem.IsHandleFreeze(e)
  }
  HandleSeekToTime(e, t, r, i = !1) {
    return cpp_1.FEffectSystem.HandleSeekToTime(e, t, r, i)
  }
  HandleSeekToTimeWithProcess(e, t, r = !1, i = -1) {
    cpp_1.FEffectSystem.HandleSeekToTimeWithProcess(e, t, r, i)
  }
  GetSeekToTargetTime(e) {
    return cpp_1.FEffectSystem.GetSeekToTargetTime(e)
  }
  SetEffectNotRecord(e, t = !0) {
    this.emc.Contains(e) && this.emc.Get(e)?.SetNotRecord(t)
  }
  GetPath(e) {
    return cpp_1.FEffectSystem.GetPath(e)
  }
  SetEffectDataByNiagaraParam(e, t, r) {
    var i;
    this.IsValid(e) && ((i = cpp_1.FEffectSystem.GetEffectModel(e)) instanceof EffectModelNiagara_1.default && (i.FloatParameters = t.FloatParameters, i.VectorParameters = t.VectorParameters, i.ColorParameters = t.ColorParameters), cpp_1.FEffectSystem.SetThreeStageTime(e, t.StartTime, t.LoopTime, t.EndTime, r))
  }
  SetEffectParameterNiagara(e, t) {
    var r;
    t && (r = new cpp_1.FKuroEffectNiagaraParameters, t.ToKuroEffectParameterNiagara(r), cpp_1.FEffectSystem.SetEffectParameterNiagara(e, r))
  }
  SetEffectDataFloatConstParam(e, t, r) {
    cpp_1.FEffectSystem.SetEffectDataFloatConstParam(e, t, r)
  }
  SetEffectExtraState(e, t) {
    cpp_1.FEffectSystem.SetEffectExtraState(e, t)
  }
  SetEffectIgnoreVisibilityOptimize(e, t) {
    cpp_1.FEffectSystem.SetEffectIgnoreVisibilityOptimize(e, t)
  }
  SetEffectStoppingTime(e, t) {
    cpp_1.FEffectSystem.SetEffectStoppingTime(e, t)
  }
  GlobalStoppingPlayTime() {
    return cpp_1.FEffectSystem.GlobalStoppingPlayTime()
  }
  GlobalStoppingTime() {
    return cpp_1.FEffectSystem.GlobalStoppingTime()
  }
  SetGlobalStoppingTime(e, t) {
    cpp_1.FEffectSystem.SetGlobalStoppingTime(e, t)
  }
  AttachToEffectSkeletalMesh(e, t, r, i) {
    cpp_1.FEffectSystem.AttachToEffectSkeletalMesh(e, t, r, i)
  }
  AttachSkeletalMesh(e, t) {
    t = this.Bmc(t);
    cpp_1.FEffectSystem.AttachSkeletalMesh(e, t)
  }
  Bmc(e) {
    let t = void 0;
    return e instanceof EffectRuntimeGhostEffectContext_1.EffectRuntimeGhostEffectContext ? (t = new cpp_1.FEffectRuntimeGhostEffectContext).ContextType = 3 : e instanceof EffectAudioContext_1.EffectAudioContext ? (t = new cpp_1.FEffectAudioContext).ContextType = 2 : e instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext ? (t = new cpp_1.FSkeletalMeshEffectContext).ContextType = 1 : e instanceof EffectContext_1.EffectContext && ((t = new cpp_1.FEffectContext).ContextType = 0), t && e.ToKuroEffectContext(t), t
  }
  CollectMaterialFloatCurve(e, t, r) {
    cpp_1.FEffectSystem.CollectMaterialFloatCurve(e, t, r)
  }
  CollectMaterialVectorCurve(e, t, r) {
    cpp_1.FEffectSystem.CollectMaterialVectorCurve(e, t, r)
  }
  CollectMaterialLinearColorCurve(e, t, r) {
    cpp_1.FEffectSystem.CollectMaterialLinearColorCurve(e, t, r)
  }
  GetEffectModel(e) {
    return cpp_1.FEffectSystem.GetEffectModel(e)
  }
  GetTotalPassTime(e) {
    return cpp_1.FEffectSystem.GetTotalPassTime(e)
  }
  GetPassTime(e) {
    return cpp_1.FEffectSystem.GetPassTime(e)
  }
  GetHideOnBurstSkill(e) {
    e = this.GetEffectModel(e);
    return !!e && e.HideOnBurstSkill
  }
  RegisterCustomCheckOwnerFunc(e, t) {
    this.emc.Contains(e) && (e = this.emc.Get(e)) && (e.OnCustomCheckOwner = t)
  }
  SetEffectQualityLevel(e, t) {
    cpp_1.FEffectSystem.SetEffectQualityLevel(e, t)
  }
  TickHandleInEditor(e, t) {
    cpp_1.FEffectSystem.TickHandleInEditor(e, t), Info_1.Info.IsGameRunning() || this.emc.Contains(e) && (t = this.emc.Get(e)) && t.IsLoop && !t.CheckOwner() && this.GetSureEffectActor(t.Id)?.IsA(UE.BP_EffectPreview_C.StaticClass()) && this.StopEffectById(t.Id, "TickInEditor CheckOwner Failed", !0)
  }
  GetLastPlayTime(e) {
    return cpp_1.FEffectSystem.GetLastPlayTime(e)
  }
  GetLastStopTime(e) {
    return cpp_1.FEffectSystem.GetLastStopTime(e)
  }
  UpdateBodyEffect(e, t, r, i) {
    cpp_1.FEffectSystem.UpdateBodyEffect(e, t, r, i)
  }
  DebugUpdate(e, t) {
    cpp_1.FEffectSystem.DebugUpdate(e, t)
  }
  GetEffectCount() {
    return cpp_1.FEffectSystem.GetEffectCount()
  }
  GetActiveEffectCount() {
    return cpp_1.FEffectSystem.GetActiveEffectCount()
  }
  DebugPrintAllErrorEffects() {
    cpp_1.FEffectSystem.DebugPrintAllErrorEffects()
  }
  DebugPrintCurrentImportanceEffects() {
    cpp_1.FEffectSystem.DebugPrintCurrentImportanceEffects()
  }
  DebugPrintEffect() {
    cpp_1.FEffectSystem.DebugPrintEffect()
  }
  GetPlayerEffectLruSize(e) {
    return cpp_1.FEffectSystem.GetPlayerEffectLruSize(e)
  }
  SetEffectStartRecording(e, t, r, i) {
    for (const f of this.emc.GetItems()) {
      var o;
      f && f.IsDone() && this.GetEffectModel(f.Id)?.IsValid() && (f.GetNotRecord() || (o = this.GetSureEffectActor(f.Id)) && (e.FromUeVector(o.D_K2_GetActorLocation()), Vector_1.Vector.DistSquared(e, t) > r || i(f.Id, o)))
    }
  }
  RefreshEffectSpecData(e) {
    var t = new Array;
    for (const i of e.values()) {
      var r = new cpp_1.FEffectSpecData;
      r.Id = i.Id, r.Path = new UE.FName(i.Path), r.SpecType = i.SpecType, r.EffectRegularType = i.EffectRegularType, r.LifeTime = i.LifeTime, t.push(r)
    }
    cpp_1.FEffectSystem.RefreshEffectForSpecData(t, !0)
  }
  static lmc(e, t, r, i) {
    let o = t;
    return e < 1 ? ((o = o || i.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass())) || (o = i.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), !1, new UE.Transform, !1), GlobalData_1.GlobalData.IsUiSceneOpen ? o.Init(5) : o.Init(7), o.SetLogicOwner(i), o.AddComponentByCase(0, r)), o.SetDitherEffect(e, 1)) : o && o.SetDitherEffect(1, 1), o
  }
  static _mc(e, t) {
    let r = t;
    (r = r || e.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass()))?.ResetAllRenderingState(), r?.K2_DestroyComponent(r)
  }
  static cmc(e) {
    return 0 !== e && (e = EntitySystem_1.EntitySystem.Get(e)) ? e.GetComponent(3)?.Owner : void 0
  }
  static umc(e) {
    if (Info_1.Info.IsGameRunning() && 0 !== e) {
      e = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e);
      if (e?.Valid) {
        e = e.Entity.GetComponent(0);
        if (e) {
          e = e?.GetModelConfig();
          if (e) return e.ID
        }
      }
    }
    return 0
  }
  static dmc(e) {
    return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.GetEffectDynamicGroup(e)?.GroupName
  }
  static mmc(t, e) {
    return AudioSystem_1.AudioSystem.GetAkComponent(e, {
      OnCreated: e => {
        ControllerHolder_1.ControllerHolder.GameAudioController.SetRolePriority(t ? 0 : 2, e)
      }
    })
  }
  static fmc(e, t) {
    AudioSystem_1.AudioSystem.ExecuteAction(e, 0, {
      TransitionDuration: t
    })
  }
  static gmc(e, t) {
    return AudioSystem_1.AudioSystem.PostEvent(e, t)
  }
  static Cmc(e, t) {
    return AudioSystem_1.AudioSystem.PostEvent(e, t)
  }
  static pmc(e) {
    var t;
    return !!Info_1.Info.IsGameRunning() && !(!(e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e))?.Valid || ((t = (e = e.Entity).GetComponent(0)).GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player || e.GetComponent(3).IsAutonomousProxy) && (t = ModelManager_1.ModelManager.CreatureModel.GetEntityId(t.GetSummonerId()), !(t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(0)) || t.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player || e.GetComponent(3).IsAutonomousProxy))
  }
  static vmc(e, t) {
    return !(Info_1.Info.IsGameRunning() && !t && (t = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e))?.Valid && ((t = (e = t.Entity).GetComponent(0)).GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && !e.GetComponent(3).IsAutonomousProxy || (t = ModelManager_1.ModelManager.CreatureModel.GetEntityId(t.GetSummonerId()), (t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(0)) && t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && !e.GetComponent(3).IsAutonomousProxy)))
  }
  static ymc(e) {
    return !Info_1.Info.IsGameRunning() || !(e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e))?.Valid || (e = e.Entity).GetComponent(0).GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player || !e.GetComponent(3).IsAutonomousProxy
  }
  static Smc(e, t) {
    return ActorSystem_1.ActorSystem.Get(e, t)
  }
  static Mmc(e, t) {
    return ActorSystem_1.ActorSystem.Put(e, t)
  }
  static Emc(e, t) {
    e.IsA(UE.BP_EffectPreview_C.StaticClass()) && (e.EffectView = t)
  }
  static Imc(e) {
    return !!Info_1.Info.IsGameRunning() && !!(e = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e))?.Valid && (e = e.Entity.GetComponent(0)).GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && e.GetPlayerId() !== ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
  }
  static Tmc(e) {
    return !(!Info_1.Info.IsMobilePlatform() || !TsEffectSystem_1.MOBILE_EFFECT_BLACK_LIST.has(e))
  }
  static Zba(t, e, r, i) {
    let o = void 0;
    var f = t?.GetAttachParentActor();
    if (i.NeedDisableWithActor) {
      let e = 0;
      if (0 < (e = t?.IsA(UE.EffectSystemActor.StaticClass()) ? t.GetOwnerEntityId() : e)) {
        var t = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(3)?.Owner;
        if (t instanceof TsBaseCharacter_1.default) return t.CharRenderingComponent
      }
    }
    return (0 < i.LoopTime || i.NeedDisableWithActor) && (e && (t = e.GetOwner(), o = t?.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass())), o = o || f?.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass())), o || !i.NeedDisableWithActor || (o = r && r !== f ? r.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass()) : o) || (e = r?.GetOwner()) && e !== f && (o = e.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass())), o
  }
  static bmc(e, t, r, i, o) {
    t = KuroEffectSystem.Zba(t, r, i, o);
    t && t.RegisterBodyEffect(e)
  }
  static Lmc(e, t, r, i, o) {
    t = KuroEffectSystem.Zba(t, r, i, o);
    t && t.UnregisterBodyEffect(e)
  }
}(exports.KuroEffectSystem = KuroEffectSystem).wmc = (e, t) => {
  if (0 !== e) {
    e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(3)?.Owner;
    if (e instanceof TsBaseCharacter_1.default) return e.CharRenderingComponent
  }
  if (t instanceof TsBaseCharacter_1.default) return t.CharRenderingComponent
}, KuroEffectSystem.Rmc = e => {
  if (e) return (e = e.GetOwner()) instanceof TsBaseCharacter_1.default ? e.CharRenderingComponent : e.GetComponentByClass(CharRenderingComponent_1.default.StaticClass()) || void 0
}, KuroEffectSystem.Amc = e => UE.KuroRenderingRuntimeBPPluginBPLibrary.D_SpawnActorFromClass(e, UE.BP_MaterialControllerRenderActor_C.StaticClass(), new UE.TransformDouble), KuroEffectSystem.Pmc = (e, t) => {
  var r;
  if (e) return r = t?.GetOwner(), e = e.CharRenderingComponent, GlobalData_1.GlobalData.IsUiSceneOpen ? e.Init(5) : e.Init(7), e.SetLogicOwner(r), e.AddComponentByCase(0, t), e
}, KuroEffectSystem.xmc = (e, t) => {
  return e && t ? e.AddMaterialControllerData(t) : -1
}, KuroEffectSystem.Umc = (e, t) => {
  e && -1 !== t && e.RemoveMaterialControllerData(t)
}, KuroEffectSystem.Dmc = e => {
  e && e.Destroy()
}, KuroEffectSystem.j2c = (e, t, r) => e ? EffectAudioController_1.EffectAudioController.AddPlayEffectAudio(e, t, r) : 0, KuroEffectSystem.H2c = (e, t, r, i) => e ? EffectAudioController_1.EffectAudioController.AddPlayEffectAudio(e, t, r, i) : 0, KuroEffectSystem.$2c = (e, t) => {
  EffectAudioController_1.EffectAudioController.OnStopEffectAudio(e, t)
};
//# sourceMappingURL=KuroEffectSystem.js.map