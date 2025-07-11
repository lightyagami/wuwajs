"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuroEffectSystem = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const EffectSpecDataGetAll_1 = require("../../../Core/Define/ConfigQuery/EffectSpecDataGetAll");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneTeamDefine_1 = require("../../Module/SceneTeam/SceneTeamDefine");
const CharRenderingComponent_1 = require("../../Render/Character/Manager/CharRenderingComponent");
const EffectModelNiagara_1 = require("../../Render/Effect/Data/EffectModelNiagara");
const CustomMap_1 = require("../../World/Define/CustomMap");
const GameBudgetAllocatorConfigCreator_1 = require("../../World/Define/GameBudgetAllocatorConfigCreator");
const EffectAudioContext_1 = require("../EffectContext/EffectAudioContext");
const EffectContext_1 = require("../EffectContext/EffectContext");
const EffectRuntimeGhostEffectContext_1 = require("../EffectContext/EffectRuntimeGhostEffectContext");
const SkeletalMeshEffectContext_1 = require("../EffectContext/SkeletalMeshEffectContext");
const EffectAudioController_1 = require("../EffectSpec/EffectAudioController");
const TsEffectSystem_1 = require("../TsEffectSystem");
const KuroEffectActorHandle_1 = require("./KuroEffectActorHandle");
const KuroEffectHandle_1 = require("./KuroEffectHandle");
const KuroEffectNiagaraComponentHandle_1 = require("./KuroEffectNiagaraComponentHandle");
const MIN_NIAGARA_SIMULATION_TICK_TIME = 0.033;
const CHECK_EFFECT_OWNER_INTERVAL = 60000;
const EFFECT_SPEC_DATA_PATH = "../Config/Client/EffectData/";
class KuroEffectSystem {
  constructor() {
    this.PreviewInitState = false;
    this.Zdc = false;
    this.emc = new CustomMap_1.CustomMap();
    this.PNc = new CustomMap_1.CustomMap();
    this.xNc = new CustomMap_1.CustomMap();
    this.tmc = e => {
      cpp_1.FEffectSystem.OnUiSceneStateChange(e);
    };
    this.imc = e => {
      cpp_1.FEffectSystem.OnTickSystemPausedChange(e);
    };
    this.ZAc = new Array();
    this.kpe = () => {
      if (this.ZAc.length === 0) {
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          this.ZAc.push(new cpp_1.FSceneTeamItem());
        }
      }
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
      for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
        var r = t[e];
        var i = r?.EntityHandle;
        if (r?.IsMyRole() && i) {
          this.ZAc[e].EntityId = i.Id;
          this.ZAc[e].IsMyRole = true;
        } else {
          this.ZAc[e].EntityId = 0;
          this.ZAc[e].IsMyRole = false;
        }
      }
      cpp_1.FEffectSystem.OnPlayerEffectContainerFormationLoaded(this.ZAc);
    };
    this.rmc = new Array();
    this.omc = new Array();
    this._pe = CHECK_EFFECT_OWNER_INTERVAL;
    this.Tfe = () => {
      cpp_1.FEffectSystem.OnGlobalTimeScaleChange();
    };
    this.mna = () => {
      var e = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.NIAGARAQUALITY);
      if (e !== undefined) {
        if (Info_1.Info.IsPcPlatform()) {
          if (e < 1) {
            this.dna();
          } else {
            this.Cna();
          }
        } else if (e < 2) {
          this.dna();
        } else {
          this.Cna();
        }
      }
    };
  }
  Initialize() {
    if (Info_1.Info.IsGameRunning()) {
      cpp_1.FKuroTimerSystem.Initialize(GlobalData_1.GlobalData.GameInstance);
    }
    this.emc.Clear();
    return !!this.nmc() && (this.Zdc = true, EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, this.Tfe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetNiagaraQuality, this.mna), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AfterGameSettingsAppliedOnOpenLoading, this.mna), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGlobalUiSceneStateChanged, this.tmc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSetGamePaused, this.imc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.kpe), true);
  }
  nmc(e = false, t = false) {
    cpp_1.FKuroResourceSystem.Initialize(GlobalData_1.GlobalData.World, 1);
    if (!e) {
      this.smc();
    }
    let r = true;
    if (e && !t && cpp_1.FEffectSystem.HasEffectForSpecData()) {
      r = false;
    }
    t = new Array();
    if (r) {
      this.amc(e);
      this.hmc(t, e);
    }
    this.rmc.length = 0;
    this.omc.length = 0;
    return !!cpp_1.FEffectSystem.Initialize(GlobalData_1.GlobalData.GameInstance, t, Info_1.Info.IsGameRunning(), 0.1, 0.3, 0.3, true, UE.BP_EffectPreview_C.StaticClass(), r) && (cpp_1.FEffectSystem.InitStaticGlobalData(EffectEnvironment_1.EffectEnvironment.UseLog, Info_1.Info.IsInEditorTick(), PublicUtil_1.PublicUtil.UseDbConfig()), cpp_1.FEffectSystem.RegisterJsFunction(KuroEffectSystem.lmc, KuroEffectSystem._mc, KuroEffectSystem.cmc, KuroEffectSystem.umc, KuroEffectSystem.dmc, KuroEffectSystem.mmc, KuroEffectSystem.fmc, KuroEffectSystem.gmc, KuroEffectSystem.Cmc, KuroEffectSystem.pmc, KuroEffectSystem.vmc, KuroEffectSystem.ymc, KuroEffectSystem.Smc, KuroEffectSystem.Mmc, KuroEffectSystem.Emc, KuroEffectSystem.Imc, KuroEffectSystem.Tmc, KuroEffectSystem.bmc, KuroEffectSystem.Lmc, KuroEffectSystem.wmc, KuroEffectSystem.Rmc, KuroEffectSystem.Amc, KuroEffectSystem.Pmc, KuroEffectSystem.xmc, KuroEffectSystem.Umc, KuroEffectSystem.Dmc, KuroEffectSystem.j2c, KuroEffectSystem.H2c, KuroEffectSystem.$2c), true);
  }
  Clear() {
    this.Zdc = false;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.kpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSetGamePaused, this.imc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGlobalUiSceneStateChanged, this.tmc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AfterGameSettingsAppliedOnOpenLoading, this.mna);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetNiagaraQuality, this.mna);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerUiTimeDilation, this.Tfe);
    this.PreviewInitState = false;
    EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds = 0;
    for (const e of this.emc.GetItems()) {
      e.Clear();
    }
    this.emc.Clear();
    cpp_1.FEffectSystem.Clear();
    if (Info_1.Info.IsGameRunning()) {
      cpp_1.FKuroTimerSystem.Clear();
      cpp_1.FKuroResourceSystem.Clear();
    }
    return true;
  }
  ClearPool() {
    cpp_1.FEffectSystem.ClearPool(false);
    return true;
  }
  InitializeWithPreview(e) {
    return !!Info_1.Info.IsGameRunning() || !e && !!this.PreviewInitState || (e && this.PreviewInitState && cpp_1.FEffectSystem.HasInitialize() ? (e = new Array(), this.amc(true), this.hmc(e, true), cpp_1.FEffectSystem.RefreshEffectForSpecData(e, false), true) : this.Zdc ? (Log_1.Log.CheckError() && Log_1.Log.Error("RenderEffect", 36, "[特效框架]InitializeWithPreview时 FEffectSystem还未Clear,非法"), true) : (this.PreviewInitState = true, this.nmc(true, true)));
  }
  smc() {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.rmc.length = 0;
      this.omc.length = 0;
      var e = EffectSpecDataGetAll_1.configEffectSpecDataGetAll.GetConfigList(false);
      if (e) {
        for (const t of e) {
          this.omc.push(t);
        }
      }
    }
  }
  amc(e = false) {
    if (Info_1.Info.IsPlayInEditor && (e || !PublicUtil_1.PublicUtil.UseDbConfig())) {
      this.rmc.length = 0;
      this.omc.length = 0;
      e = UE.KismetSystemLibrary.GetProjectDirectory() + EFFECT_SPEC_DATA_PATH;
      if (UE.BlueprintPathsLibrary.DirectoryExists(e)) {
        try {
          var t;
          var r = UE.KuroStaticLibrary.LoadFilesRecursive(e, "*.json", true, false);
          var i = new Array();
          for (let e = 0; e < r.Num(); ++e) {
            i.push(r.Get(e));
          }
          for (const o of i) {
            if (!!o && !(o.length < 1)) {
              t = JSON.parse(o);
              this.rmc.push(t);
            }
          }
        } catch (e) {
          if (e instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("RenderEffect", 3, "读取EffectSpec.json异常", e, ["Name", this.constructor.name], ["error", e.message]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RenderEffect", 3, "读取EffectSpec.json异常", ["Name", this.constructor.name], ["error", e]);
          }
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("World", 3, "不存在EffectSpec配置文件目录", ["Path", e]);
      }
    }
  }
  hmc(e, t = false) {
    if (t || !PublicUtil_1.PublicUtil.UseDbConfig()) {
      for (const o of this.rmc) {
        var r = new cpp_1.FEffectSpecData();
        r.Id = o.Id;
        r.Path = new UE.FName(o.Path);
        r.SpecType = o.SpecType;
        r.EffectRegularType = o.EffectRegularType;
        r.LifeTime = o.LifeTime;
        e.push(r);
      }
    } else {
      for (const n of this.omc) {
        var i = new cpp_1.FEffectSpecData();
        i.Id = n.Id;
        i.SpecType = n.SpecType;
        i.EffectRegularType = n.EffectRegularType;
        i.LifeTime = n.LifeTime;
        e.push(i);
      }
    }
  }
  Tick(e) {
    this._pe -= e;
    if (this._pe < 0) {
      this._pe = CHECK_EFFECT_OWNER_INTERVAL;
      for (const t of this.emc.GetItems()) {
        if (t.IsLoop && !t.CheckOwner()) {
          this.StopEffectById(t.Id, "CheckOwner Failed", true);
        }
      }
    }
  }
  dna() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderEffect", 36, "Open Niagara Down Sampling");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Kuro.Niagara.SystemSimulation.TickDeltaTime " + MIN_NIAGARA_SIMULATION_TICK_TIME);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Kuro.Niagara.SystemSimulation.SpawnAlignment 0");
  }
  Cna() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderEffect", 36, "Close Niagara Down Sampling");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Kuro.Niagara.SystemSimulation.TickDeltaTime -1");
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Kuro.Niagara.SystemSimulation.SpawnAlignment 0");
  }
  SpawnEffectWithActor(e, t, r, i, o = true, n, f = true, a = 3) {
    var c = n ? this.Bmc(n) : undefined;
    var e = cpp_1.FEffectSystem.SpawnEffectWithActor(e, t, r, i, o, c, f, a);
    if (this.IsValid(e)) {
      if (this.emc.Contains(e)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RenderEffect", 36, "[特效框架]SpawnEffectWithActor 生成了一个已经存在的effectId", ["id", e]);
        }
        return 0;
      } else {
        (t = new KuroEffectHandle_1.KuroEffectHandle()).Init(n);
        this.emc.Set(e, t);
        t.OnAfterSpawn(e);
        return e;
      }
    } else {
      return 0;
    }
  }
  RemoveKuroEffectHandle(e) {
    if (this.emc.Contains(e) && (this.emc.Get(e)?.Clear(), this.emc.Remove(e), this.PNc.Contains(e) && this.PNc.Remove(e), this.xNc.Contains(e))) {
      this.xNc.Remove(e);
    }
  }
  GetEffectLruCount(e) {
    return cpp_1.FEffectSystem.GetEffectLruCount(e);
  }
  GetEffectLruCapacity() {
    return cpp_1.FEffectSystem.GetEffectLruCapacity();
  }
  SetEffectLruCapacity(e) {
    cpp_1.FEffectSystem.SetEffectLruCapacity(e);
  }
  GetEffectLruSize() {
    return cpp_1.FEffectSystem.GetEffectLruSize();
  }
  SpawnUnloopedEffect(e, t, r, i, o, n = 3, f, a, c, s = false, _ = false) {
    var p;
    if ((this.Zdc || Info_1.Info.IsPlayInEditor) && ((p = new KuroEffectHandle_1.KuroEffectHandle()).Init(o, f, a, c), c = o ? this.Bmc(o) : undefined, o = cpp_1.FEffectSystem.SpawnUnloopedEffect(e, t, r, i, c, n, s, _, f ? p.OnBeforeInitCallback : undefined, a ? p.OnEffectInitCallback : undefined, p.OnBeforePlayCallback, p.OnInitCallbackClear, p), this.IsValid(o))) {
      if (this.emc.Contains(o)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RenderEffect", 36, "[特效框架]SpawnUnloopedEffect 生成了一个已经存在的effectId", ["id", o]);
        }
        return 0;
      } else {
        this.emc.Set(o, p);
        p.OnAfterSpawn(o);
        return o;
      }
    } else {
      return 0;
    }
  }
  SpawnEffect(e, t, r, i, o, n = 3, f, a, c, s = false, _ = false) {
    var p;
    if ((this.Zdc || Info_1.Info.IsPlayInEditor) && ((p = new KuroEffectHandle_1.KuroEffectHandle()).Init(o, f, a, c), c = o ? this.Bmc(o) : undefined, o = cpp_1.FEffectSystem.SpawnEffect(e, t, r, i, c, n, s, _, f ? p.OnBeforeInitCallback : undefined, a ? p.OnEffectInitCallback : undefined, p.OnBeforePlayCallback, p.OnInitCallbackClear, p), this.IsValid(o))) {
      if (this.emc.Contains(o)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RenderEffect", 36, "[特效框架]SpawnEffect 生成了一个已经存在的effectId", ["id", o]);
        }
        return 0;
      } else {
        this.emc.Set(o, p);
        p.OnAfterSpawn(o);
        return o;
      }
    } else {
      return 0;
    }
  }
  DynamicRegisterSpawnCallback(e, t) {
    if ((this.Zdc || Info_1.Info.IsPlayInEditor) && this.emc.Contains(e)) {
      this.emc.Get(e)?.RegisterDynamicEffectInitCallback(t);
    }
  }
  AddFinishCallback(e, t) {
    if ((this.Zdc || Info_1.Info.IsPlayInEditor) && this.emc.Contains(e)) {
      this.emc.Get(e)?.AddFinishCallback(t);
    }
  }
  RemoveFinishCallback(e, t) {
    if ((this.Zdc || Info_1.Info.IsPlayInEditor) && this.emc.Contains(e)) {
      this.emc.Get(e)?.RemoveFinishCallback(t);
    }
  }
  ForceCheckPendingInit(e) {
    cpp_1.FEffectSystem.ForceCheckPendingInit(e);
  }
  SetEffectHidden(e, t, r = undefined, i = false) {
    cpp_1.FEffectSystem.SetEffectHidden(e, t, r, i);
  }
  StopEffectById(e, t, r, i) {
    return cpp_1.FEffectSystem.StopEffectById(e, t, r, i);
  }
  IsValid(e) {
    return cpp_1.FEffectSystem.IsValid(e);
  }
  GetEffectActor(t) {
    if (t !== 0) {
      let e = undefined;
      if (cpp_1.FEffectSystem.IsEffectActorValid(t)) {
        e = this.GetSureEffectActor(t);
      } else if (this.PNc.Contains(t)) {
        e = this.PNc.Get(t);
      } else {
        e = new KuroEffectActorHandle_1.KuroEffectActorHandle(t);
        this.PNc.Set(t, e);
      }
      return e;
    }
  }
  GetSureEffectActor(e) {
    return cpp_1.FEffectSystem.GetSureEffectActor(e);
  }
  GetNiagaraComponent(t) {
    if (t !== 0) {
      let e = this.GetSureNiagaraComponent(t);
      if (!e) {
        if (this.xNc.Contains(t)) {
          e = this.xNc.Get(t);
        } else {
          e = new KuroEffectNiagaraComponentHandle_1.KuroEffectNiagaraComponentHandle(t);
          this.xNc.Set(t, e);
        }
      }
      return e;
    }
  }
  GetSureNiagaraComponent(e) {
    return cpp_1.FEffectSystem.GetSureNiagaraComponent(e);
  }
  ReplayEffect(e, t, r) {
    cpp_1.FEffectSystem.ReplayEffect(e, t, r, !!r);
  }
  IsPlaying(e) {
    return cpp_1.FEffectSystem.IsPlaying(e);
  }
  SetHandleLifeCycle(e, t) {
    cpp_1.FEffectSystem.SetHandleLifeCycle(e, t);
  }
  SetTimeScale(e, t, r = false) {
    cpp_1.FEffectSystem.SetTimeScale(e, t, r);
  }
  SetAdditionTimeScale(e, t, r) {
    cpp_1.FEffectSystem.SetAdditionTimeScale(e, t, r);
  }
  SetAdditionTimeScaleEnable(e, t) {
    cpp_1.FEffectSystem.SetAdditionTimeScaleEnable(e, t);
  }
  GetAdditionTimeScaleEnable(e) {
    return cpp_1.FEffectSystem.GetAdditionTimeScaleEnable(e);
  }
  FreezeHandle(e, t, r = false) {
    cpp_1.FEffectSystem.FreezeHandle(e, t, r);
  }
  IsHandleFreeze(e) {
    return cpp_1.FEffectSystem.IsHandleFreeze(e);
  }
  HandleSeekToTime(e, t, r, i = false) {
    return cpp_1.FEffectSystem.HandleSeekToTime(e, t, r, i);
  }
  HandleSeekToTimeWithProcess(e, t, r = false, i = -1) {
    cpp_1.FEffectSystem.HandleSeekToTimeWithProcess(e, t, r, i);
  }
  GetSeekToTargetTime(e) {
    return cpp_1.FEffectSystem.GetSeekToTargetTime(e);
  }
  SetEffectNotRecord(e, t = true) {
    if (this.emc.Contains(e)) {
      this.emc.Get(e)?.SetNotRecord(t);
    }
  }
  GetPath(e) {
    return cpp_1.FEffectSystem.GetPath(e);
  }
  SetEffectDataByNiagaraParam(e, t, r) {
    var i;
    if (this.IsValid(e)) {
      if ((i = cpp_1.FEffectSystem.GetEffectModel(e)) instanceof EffectModelNiagara_1.default) {
        i.FloatParameters = t.FloatParameters;
        i.VectorParameters = t.VectorParameters;
        i.ColorParameters = t.ColorParameters;
      }
      cpp_1.FEffectSystem.SetThreeStageTime(e, t.StartTime, t.LoopTime, t.EndTime, r);
    }
  }
  SetEffectParameterNiagara(e, t) {
    var r;
    if (t) {
      r = new cpp_1.FKuroEffectNiagaraParameters();
      t.ToKuroEffectParameterNiagara(r);
      cpp_1.FEffectSystem.SetEffectParameterNiagara(e, r);
    }
  }
  SetEffectDataFloatConstParam(e, t, r) {
    cpp_1.FEffectSystem.SetEffectDataFloatConstParam(e, t, r);
  }
  SetEffectExtraState(e, t) {
    cpp_1.FEffectSystem.SetEffectExtraState(e, t);
  }
  SetEffectIgnoreVisibilityOptimize(e, t) {
    cpp_1.FEffectSystem.SetEffectIgnoreVisibilityOptimize(e, t);
  }
  SetEffectStoppingTime(e, t) {
    cpp_1.FEffectSystem.SetEffectStoppingTime(e, t);
  }
  GlobalStoppingPlayTime() {
    return cpp_1.FEffectSystem.GlobalStoppingPlayTime();
  }
  GlobalStoppingTime() {
    return cpp_1.FEffectSystem.GlobalStoppingTime();
  }
  SetGlobalStoppingTime(e, t) {
    cpp_1.FEffectSystem.SetGlobalStoppingTime(e, t);
  }
  AttachToEffectSkeletalMesh(e, t, r, i) {
    cpp_1.FEffectSystem.AttachToEffectSkeletalMesh(e, t, r, i);
  }
  AttachSkeletalMesh(e, t) {
    t = this.Bmc(t);
    cpp_1.FEffectSystem.AttachSkeletalMesh(e, t);
  }
  Bmc(e) {
    let t = undefined;
    if (e instanceof EffectRuntimeGhostEffectContext_1.EffectRuntimeGhostEffectContext) {
      (t = new cpp_1.FEffectRuntimeGhostEffectContext()).ContextType = 3;
    } else if (e instanceof EffectAudioContext_1.EffectAudioContext) {
      (t = new cpp_1.FEffectAudioContext()).ContextType = 2;
    } else if (e instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext) {
      (t = new cpp_1.FSkeletalMeshEffectContext()).ContextType = 1;
    } else if (e instanceof EffectContext_1.EffectContext) {
      (t = new cpp_1.FEffectContext()).ContextType = 0;
    }
    if (t) {
      e.ToKuroEffectContext(t);
    }
    return t;
  }
  CollectMaterialFloatCurve(e, t, r) {
    cpp_1.FEffectSystem.CollectMaterialFloatCurve(e, t, r);
  }
  CollectMaterialVectorCurve(e, t, r) {
    cpp_1.FEffectSystem.CollectMaterialVectorCurve(e, t, r);
  }
  CollectMaterialLinearColorCurve(e, t, r) {
    cpp_1.FEffectSystem.CollectMaterialLinearColorCurve(e, t, r);
  }
  GetEffectModel(e) {
    return cpp_1.FEffectSystem.GetEffectModel(e);
  }
  GetTotalPassTime(e) {
    return cpp_1.FEffectSystem.GetTotalPassTime(e);
  }
  GetPassTime(e) {
    return cpp_1.FEffectSystem.GetPassTime(e);
  }
  GetHideOnBurstSkill(e) {
    e = this.GetEffectModel(e);
    return !!e && e.HideOnBurstSkill;
  }
  RegisterCustomCheckOwnerFunc(e, t) {
    if (this.emc.Contains(e) && (e = this.emc.Get(e))) {
      e.OnCustomCheckOwner = t;
    }
  }
  SetEffectQualityLevel(e, t) {
    cpp_1.FEffectSystem.SetEffectQualityLevel(e, t);
  }
  TickHandleInEditor(e, t) {
    cpp_1.FEffectSystem.TickHandleInEditor(e, t);
    if (!Info_1.Info.IsGameRunning()) {
      if (this.emc.Contains(e) && (t = this.emc.Get(e)) && t.IsLoop && !t.CheckOwner() && this.GetSureEffectActor(t.Id)?.IsA(UE.BP_EffectPreview_C.StaticClass())) {
        this.StopEffectById(t.Id, "TickInEditor CheckOwner Failed", true);
      }
    }
  }
  GetLastPlayTime(e) {
    return cpp_1.FEffectSystem.GetLastPlayTime(e);
  }
  GetLastStopTime(e) {
    return cpp_1.FEffectSystem.GetLastStopTime(e);
  }
  UpdateBodyEffect(e, t, r, i) {
    cpp_1.FEffectSystem.UpdateBodyEffect(e, t, r, i);
  }
  DebugUpdate(e, t) {
    cpp_1.FEffectSystem.DebugUpdate(e, t);
  }
  GetEffectCount() {
    return cpp_1.FEffectSystem.GetEffectCount();
  }
  GetActiveEffectCount() {
    return cpp_1.FEffectSystem.GetActiveEffectCount();
  }
  DebugPrintAllErrorEffects() {
    cpp_1.FEffectSystem.DebugPrintAllErrorEffects();
  }
  DebugPrintCurrentImportanceEffects() {
    cpp_1.FEffectSystem.DebugPrintCurrentImportanceEffects();
  }
  DebugPrintEffect() {
    cpp_1.FEffectSystem.DebugPrintEffect();
  }
  GetPlayerEffectLruSize(e) {
    return cpp_1.FEffectSystem.GetPlayerEffectLruSize(e);
  }
  SetEffectStartRecording(e, t, r, i) {
    for (const n of this.emc.GetItems()) {
      var o;
      if (n && n.IsDone() && this.GetEffectModel(n.Id)?.IsValid()) {
        if (!n.GetNotRecord()) {
          if (o = this.GetSureEffectActor(n.Id)) {
            e.FromUeVector(o.D_K2_GetActorLocation());
            if (!(Vector_1.Vector.DistSquared(e, t) > r)) {
              i(n.Id, o);
            }
          }
        }
      }
    }
  }
  RefreshEffectSpecData(e) {
    var t = new Array();
    for (const i of e.values()) {
      var r = new cpp_1.FEffectSpecData();
      r.Id = i.Id;
      r.Path = new UE.FName(i.Path);
      r.SpecType = i.SpecType;
      r.EffectRegularType = i.EffectRegularType;
      r.LifeTime = i.LifeTime;
      t.push(r);
    }
    cpp_1.FEffectSystem.RefreshEffectForSpecData(t, true);
  }
  static lmc(e, t, r, i) {
    let o = t;
    if (e < 1) {
      if (!(o = o || i.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass()))) {
        o = i.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, new UE.Transform(), false);
        if (GlobalData_1.GlobalData.IsUiSceneOpen) {
          o.Init(5);
        } else {
          o.Init(7);
        }
        o.SetLogicOwner(i);
        o.AddComponentByCase(0, r);
      }
      o.SetDitherEffect(e, 1);
    } else if (o) {
      o.SetDitherEffect(1, 1);
    }
    return o;
  }
  static _mc(e, t) {
    let r = t;
    (r = r || e.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass()))?.ResetAllRenderingState();
    r?.K2_DestroyComponent(r);
  }
  static cmc(e) {
    if (e !== 0 && (e = EntitySystem_1.EntitySystem.Get(e))) {
      return e.GetComponent(3)?.Owner;
    } else {
      return undefined;
    }
  }
  static umc(e) {
    if (Info_1.Info.IsGameRunning() && e !== 0) {
      e = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e);
      if (e?.Valid) {
        e = e.Entity.GetComponent(0);
        if (e) {
          e = e?.GetModelConfig();
          if (e) {
            return e.ID;
          }
        }
      }
    }
    return 0;
  }
  static dmc(e) {
    return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.GetEffectDynamicGroup(e)?.GroupName;
  }
  static mmc(t, e) {
    return AudioSystem_1.AudioSystem.GetAkComponent(e, {
      OnCreated: e => {
        ControllerHolder_1.ControllerHolder.GameAudioController.SetRolePriority(t ? 0 : 2, e);
      }
    });
  }
  static fmc(e, t) {
    AudioSystem_1.AudioSystem.ExecuteAction(e, 0, {
      TransitionDuration: t
    });
  }
  static gmc(e, t) {
    return AudioSystem_1.AudioSystem.PostEvent(e, t);
  }
  static Cmc(e, t) {
    return AudioSystem_1.AudioSystem.PostEvent(e, t);
  }
  static pmc(e) {
    var t;
    return !!Info_1.Info.IsGameRunning() && !!(e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e))?.Valid && ((t = (e = e.Entity).GetComponent(0)).GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && !e.GetComponent(3).IsAutonomousProxy || !(t = ModelManager_1.ModelManager.CreatureModel.GetEntityId(t.GetSummonerId()), !(t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(0)) || t.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player || e.GetComponent(3).IsAutonomousProxy));
  }
  static vmc(e, t) {
    return !Info_1.Info.IsGameRunning() || !!t || !(t = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e))?.Valid || ((t = (e = t.Entity).GetComponent(0)).GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player || !!e.GetComponent(3).IsAutonomousProxy) && !(t = ModelManager_1.ModelManager.CreatureModel.GetEntityId(t.GetSummonerId()), (t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(0)) && t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && !e.GetComponent(3).IsAutonomousProxy);
  }
  static ymc(e) {
    return !Info_1.Info.IsGameRunning() || !(e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e))?.Valid || (e = e.Entity).GetComponent(0).GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player || !e.GetComponent(3).IsAutonomousProxy;
  }
  static Smc(e, t) {
    return ActorSystem_1.ActorSystem.Get(e, t);
  }
  static Mmc(e, t) {
    return ActorSystem_1.ActorSystem.Put(e, t);
  }
  static Emc(e, t) {
    if (e.IsA(UE.BP_EffectPreview_C.StaticClass())) {
      e.EffectView = t;
    }
  }
  static Imc(e) {
    return !!Info_1.Info.IsGameRunning() && !!(e = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e))?.Valid && (e = e.Entity.GetComponent(0)).GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && e.GetPlayerId() !== ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
  }
  static Tmc(e) {
    return !!Info_1.Info.IsMobilePlatform() && !!TsEffectSystem_1.MOBILE_EFFECT_BLACK_LIST.has(e);
  }
  static Zba(t, e, r, i) {
    let o = undefined;
    var n = t?.GetAttachParentActor();
    if (i.NeedDisableWithActor) {
      let e = 0;
      if ((e = t?.IsA(UE.EffectSystemActor.StaticClass()) ? t.GetOwnerEntityId() : e) > 0) {
        var t = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(3)?.Owner;
        if (t instanceof TsBaseCharacter_1.default) {
          return t.CharRenderingComponent;
        }
      }
    }
    if (i.LoopTime > 0 || i.NeedDisableWithActor) {
      if (e) {
        t = e.GetOwner();
        o = t?.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
      }
      o = o || n?.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
    }
    if (!o && !!i.NeedDisableWithActor && !(o = r && r !== n ? r.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass()) : o)) {
      if ((e = r?.GetOwner()) && e !== n) {
        o = e.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
      }
    }
    return o;
  }
  static bmc(e, t, r, i, o) {
    t = KuroEffectSystem.Zba(t, r, i, o);
    if (t) {
      t.RegisterBodyEffect(e);
    }
  }
  static Lmc(e, t, r, i, o) {
    t = KuroEffectSystem.Zba(t, r, i, o);
    if (t) {
      t.UnregisterBodyEffect(e);
    }
  }
}
(exports.KuroEffectSystem = KuroEffectSystem).wmc = (e, t) => {
  if (e !== 0) {
    e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(3)?.Owner;
    if (e instanceof TsBaseCharacter_1.default) {
      return e.CharRenderingComponent;
    }
  }
  if (t instanceof TsBaseCharacter_1.default) {
    return t.CharRenderingComponent;
  }
};
KuroEffectSystem.Rmc = e => {
  if (e) {
    if ((e = e.GetOwner()) instanceof TsBaseCharacter_1.default) {
      return e.CharRenderingComponent;
    } else {
      return e.GetComponentByClass(CharRenderingComponent_1.default.StaticClass()) || undefined;
    }
  }
};
KuroEffectSystem.Amc = e => UE.KuroRenderingRuntimeBPPluginBPLibrary.D_SpawnActorFromClass(e, UE.BP_MaterialControllerRenderActor_C.StaticClass(), new UE.TransformDouble());
KuroEffectSystem.Pmc = (e, t) => {
  var r;
  if (e) {
    r = t?.GetOwner();
    e = e.CharRenderingComponent;
    if (GlobalData_1.GlobalData.IsUiSceneOpen) {
      e.Init(5);
    } else {
      e.Init(7);
    }
    e.SetLogicOwner(r);
    e.AddComponentByCase(0, t);
    return e;
  }
};
KuroEffectSystem.xmc = (e, t) => {
  if (e && t) {
    return e.AddMaterialControllerData(t);
  } else {
    return -1;
  }
};
KuroEffectSystem.Umc = (e, t) => {
  if (e && t !== -1) {
    e.RemoveMaterialControllerData(t);
  }
};
KuroEffectSystem.Dmc = e => {
  if (e) {
    e.Destroy();
  }
};
KuroEffectSystem.j2c = (e, t, r) => e ? EffectAudioController_1.EffectAudioController.AddPlayEffectAudio(e, t, r) : 0;
KuroEffectSystem.H2c = (e, t, r, i) => e ? EffectAudioController_1.EffectAudioController.AddPlayEffectAudio(e, t, r, i) : 0;
KuroEffectSystem.$2c = (e, t) => {
  EffectAudioController_1.EffectAudioController.OnStopEffectAudio(e, t);
}; //# sourceMappingURL=KuroEffectSystem.js.map