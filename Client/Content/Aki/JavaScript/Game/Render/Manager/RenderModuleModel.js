"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderModuleModel = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const WorldGlobal_1 = require("../../World/WorldGlobal");
const CharRenderShell_1 = require("../Character/Manager/CharRenderShell");
const RenderDataManager_1 = require("../Data/RenderDataManager");
const DebugDrawManager_1 = require("../DebugDraw/DebugDrawManager");
const EffectManagerBusinessProxy_1 = require("../Effect/EffectManagerBusinessProxy");
const SceneInteractionManager_1 = require("../Scene/Interaction/SceneInteractionManager");
const ItemMaterialManager_1 = require("../Scene/Item/MaterialController/ItemMaterialManager");
const ItemMaterialParameterCollectionController_1 = require("../Scene/Item/MaterialController/ItemMaterialParameterCollectionController");
const RenderModuleConfig_1 = require("./RenderModuleConfig");
const mpcForGameplayNameBurstTime = new UE.FName("BurstTime");
class RenderModuleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.F1r = [];
    this.V1r = new Map();
    this.H1r = new Map();
    this.j1r = undefined;
    this.W1r = 5;
    this.K1r = 5;
    this.Q1r = false;
    this.X1r = false;
    this.mMd = undefined;
    this.fMd = 16;
    this.gMd = -this.fMd;
    this.CMd = false;
    this.$1r = 0;
    this.Ixd = false;
    this.imc = e => {
      if (!e && this.Ixd) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Render", 36, "退出真时停时仍然开启CharRenderShell的强制Tick");
        }
        this.DisableForceTickCharRenderShell("RenderModuleModel OnSetGamePaused");
      }
    };
    this.Enl = () => {
      UE.KuroRenderingRuntimeBPPluginBPLibrary.StopSomeWeatherBeforeTeleport(GlobalData_1.GlobalData.World);
    };
    this.Inl = () => {
      TimerSystem_1.TimerSystem.Delay(() => {
        UE.KuroRenderingRuntimeBPPluginBPLibrary.ResumeSomeWeatherAfterTeleport(GlobalData_1.GlobalData.World);
      }, 100);
    };
    this.cKl = false;
    this.Yyn = e => {
      if (e && !this.cKl && (UE.KuroRenderingRuntimeBPPluginBPLibrary.SetDisableEffectPostProcessVolume(GlobalData_1.GlobalData.World, true, 4), this.cKl = true, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Render", 25, "进入大招禁用特效后处理");
      }
      if (!e && this.cKl && (UE.KuroRenderingRuntimeBPPluginBPLibrary.SetDisableEffectPostProcessVolume(GlobalData_1.GlobalData.World, false, 1), this.cKl = false, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Render", 25, "退出大招启用特效后处理");
      }
      if (!e) {
        TimerSystem_1.TimerSystem.Next(() => {
          Global_1.Global.BaseCharacter?.CharRenderingComponent?.RefreshMaterialController();
        });
      }
      this.CMd = e;
      this.gMd = 0;
    };
    this.BPr = e => {
      if (!e && this.cKl && (UE.KuroRenderingRuntimeBPPluginBPLibrary.SetDisableEffectPostProcessVolume(GlobalData_1.GlobalData.World, false, 1), this.cKl = false, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Render", 25, "退出镜头启用特效后处理");
      }
      if (!e) {
        TimerSystem_1.TimerSystem.Next(() => {
          Global_1.Global.BaseCharacter?.CharRenderingComponent?.RefreshMaterialController();
        });
      }
    };
    this.cdu = (e, t) => {
      if (e === 2) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.DisableGlobalGITransition 1");
      } else if (t === 2) {
        TimerSystem_1.TimerSystem.Delay(() => {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.DisableGlobalGITransition 0");
        }, 500);
      }
    };
  }
  GetCurrentKeyState(e) {
    if (e === this.j1r) {
      return this.W1r;
    } else {
      return 0;
    }
  }
  GetIdleClearAtmosphere(e) {
    return e === this.j1r && this.Q1r;
  }
  SetBattleState(e, t, r = false) {
    this.j1r = e;
    this.W1r = t;
    this.K1r = t;
    if (this.W1r === 4) {
      this.Q1r = true;
      this.W1r = 0;
    } else {
      this.Q1r = false;
    }
    this.X1r = r;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderBattle", 11, "BOSS战设置战斗状态Inner", ["key", e], ["state", t]);
    }
  }
  IsStateInstantTransition() {
    return this.X1r;
  }
  Y1r(e) {
    if (e === 4) {
      return "无状态";
    } else if (e === 0) {
      return "静止状态";
    } else if (e === 1) {
      return "战斗1阶段";
    } else if (e === 2) {
      return "战斗2阶段";
    } else if (e === 3) {
      return "战斗3阶段";
    } else {
      return "错误";
    }
  }
  GetWuYinQuBattleDebugInfo() {
    var e = UE.NewArray(UE.BuiltinString);
    const t = new Array();
    t.push(this.GetCurrentBattleKey() + "," + this.Y1r(this.K1r));
    this.H1r.forEach(e => {
      if (UE.KismetSystemLibrary.IsValid(e)) {
        e = e.GetKey() + "," + this.Y1r(e.GetCurrentBattleState());
        t.push(e);
      }
    });
    WorldGlobal_1.WorldGlobal.ToUeStringArray(t, e);
    return e;
  }
  GetBattleState(e) {
    if (this.j1r === e) {
      return this.W1r;
    } else {
      return 0;
    }
  }
  GetCurrentBattleKey() {
    return this.j1r;
  }
  AddBattleReference(e) {
    this.$1r++;
    if (this.$1r > 0) {
      this.SetStreamingSourceState(e, true);
    }
  }
  GetSnowIntensity() {
    return RenderDataManager_1.RenderDataManager.Get()?.GetSnowIntensity();
  }
  GetRainIntensity() {
    return RenderDataManager_1.RenderDataManager.Get()?.GetRainIntensity();
  }
  DecBattleReference() {
    this.$1r--;
    if (this.$1r <= 0) {
      this.SetStreamingSourceState(new UE.VectorDouble(0, 0, 0), false);
    }
  }
  SetStreamingSourceState(e, t) {}
  GetWuYinQuBattleActorByName(e) {
    if (this.H1r.has(e)) {
      return this.H1r.get(e);
    }
  }
  AddWuYinQuBattleActor(e) {
    var t;
    if (UE.KismetSystemLibrary.IsValid(e)) {
      t = e.GetKey();
      return !e.IsInitialize() && this.GetWuYinQuBattleActorByName(t) === undefined && !!e.Init() && (this.H1r.set(t, e), true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderBattle", 11, "无音区actor添加失败1");
      }
      return false;
    }
  }
  RemoveWuYinQuBattleActor(e) {
    if (UE.KismetSystemLibrary.IsValid(e)) {
      e = e.GetKey();
      return !!this.H1r.has(e) && (this.H1r.delete(e), true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderBattle", 11, "无音区actor移除失败1");
      }
      return false;
    }
  }
  AddTickableObject(e) {
    RenderModuleConfig_1.RenderStats.StatRenderModuleModelAddTickable.Start();
    if (this.F1r.indexOf(e, 0) < 0) {
      this.F1r.push(e);
    }
    RenderModuleConfig_1.RenderStats.StatRenderModuleModelAddTickable.Stop();
  }
  RemoveTickableObject(e) {
    e = this.F1r.indexOf(e, 0);
    if (!(e < 0)) {
      if (this.F1r.length <= 2) {
        this.F1r.splice(e, 1);
      } else {
        this.F1r[e] = this.F1r[this.F1r.length - 1];
        this.F1r.pop();
      }
    }
  }
  AddCharRenderShell(e) {
    var t = new CharRenderShell_1.CharRenderShell();
    t.Init(e);
    this.V1r.set(e, t);
  }
  RemoveCharRenderShell(e) {
    this.V1r.get(e)?.Clear();
    return this.V1r.delete(e);
  }
  get ForceTickCharRenderShell() {
    return this.Ixd;
  }
  DisableForceTickCharRenderShell(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 36, "关闭CharRenderShell的强制Tick", ["Reason", e]);
    }
    this.Ixd = false;
  }
  EnableForceTickCharRenderShell(e) {
    if (TickSystem_1.TickSystem.IsPaused) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Render", 36, "开启CharRenderShell的强制Tick", ["Reason", e]);
      }
      this.Ixd = true;
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 36, "只有真时停环境下才能开启CharRenderShell的强制Tick", ["Reason", e]);
    }
  }
  Tick(r) {
    const t = r * 0.001;
    RenderModuleConfig_1.RenderStats.StatRenderModuleModelTickTickable?.Start();
    this.F1r.forEach(e => {
      try {
        e.Tick(t);
      } catch (e) {
        if (e instanceof Error && Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Render", 25, "TickableObject Tick执行异常", e, ["error", e.message]);
        }
      }
    });
    RenderModuleConfig_1.RenderStats.StatRenderModuleModelTickTickable?.Stop();
    if (!CharRenderShell_1.CharRenderShell.CharRenderShellGameBudgetOptimize || Info_1.Info.IsInEditorTick() || this.Ixd) {
      RenderModuleConfig_1.RenderStats.StatRenderModuleModelTickRenderShell?.Start();
      this.V1r.forEach(e => {
        try {
          e.Tick(t);
        } catch (e) {
          if (e instanceof Error && Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Render", 25, "RenderShell Tick执行异常", e, ["error", e.message]);
          }
        }
      });
      RenderModuleConfig_1.RenderStats.StatRenderModuleModelTickRenderShell?.Stop();
    } else if (Info_1.Info.IsGameRunning() && (GlobalData_1.GlobalData.IsUiSceneOpen || GlobalData_1.GlobalData.IsUiSceneLoading || CameraController_1.CameraController.IsSequenceCameraInCinematic() || ModelManager_1.ModelManager.PlotModel?.IsInPlot)) {
      RenderModuleConfig_1.RenderStats.StatRenderModuleModelTickRenderShell?.Start();
      this.V1r.forEach(e => {
        try {
          if (e.IsAlwaysTick) {
            e.Tick(t);
          }
        } catch (e) {
          if (e instanceof Error && Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Render", 25, "RenderShell Tick执行异常", e, ["error", e.message]);
          }
        }
      });
      RenderModuleConfig_1.RenderStats.StatRenderModuleModelTickRenderShell?.Stop();
    }
    if (!TickSystem_1.TickSystem.IsPaused) {
      this.H1r.forEach(t => {
        try {
          var e;
          if (UE.KismetSystemLibrary.IsValid(t)) {
            e = t.Key?.toString();
            if (this.j1r === e) {
              if (this.W1r !== t.GetCurrentBattleState()) {
                t.ChangeState(this.W1r, this.IsStateInstantTransition());
              }
            } else if (t.GetCurrentBattleState() !== 0) {
              t.ChangeState(0, this.IsStateInstantTransition());
            }
            t.Tick(r);
          }
        } catch (e) {
          if (e instanceof Error && Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Render", 25, "WuYinQuBattleActor 执行异常", e, ["error", e.message], ["object", t.GetName()]);
          }
        }
      });
    }
    try {
      RenderDataManager_1.RenderDataManager.Get().TickForce(r);
      if (!TickSystem_1.TickSystem.IsPaused) {
        RenderDataManager_1.RenderDataManager.Get().Tick(r);
      }
    } catch (e) {
      if (e instanceof Error && Log_1.Log.CheckError()) {
        Log_1.Log.ErrorWithStack("Render", 25, "RenderDataManager Tick执行异常", e, ["error", e.message]);
      }
    }
    try {
      if (!TickSystem_1.TickSystem.IsPaused) {
        SceneInteractionManager_1.SceneInteractionManager.Tick(r);
      }
    } catch (e) {
      if (e instanceof Error && Log_1.Log.CheckError()) {
        Log_1.Log.ErrorWithStack("Render", 25, "SceneInteractionManager Tick执行异常", e, ["error", e.message]);
      }
    }
    try {
      ItemMaterialManager_1.ItemMaterialManager.Tick(r);
    } catch (e) {
      if (e instanceof Error && Log_1.Log.CheckError()) {
        Log_1.Log.ErrorWithStack("Render", 25, "ItemMaterialManager Tick执行异常", e, ["error", e.message]);
      }
    }
    try {
      if (!TickSystem_1.TickSystem.IsPaused) {
        DebugDrawManager_1.DebugDrawManager.Tick(r);
      }
    } catch (e) {
      if (e instanceof Error && Log_1.Log.CheckError()) {
        Log_1.Log.ErrorWithStack("Render", 25, "DebugDrawManager Tick执行异常", e, ["error", e.message]);
      }
    }
    try {
      if (Info_1.Info.IsGameRunning() && this.gMd > -this.fMd && this.gMd < this.fMd) {
        this.gMd += this.CMd ? t : -t;
        UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.World, this.mMd, mpcForGameplayNameBurstTime, this.gMd);
      }
    } catch (e) {
      if (e instanceof Error && Log_1.Log.CheckError()) {
        Log_1.Log.ErrorWithStack("Render", 25, "MpcForGameplay设置异常", e, ["error", e.message]);
      }
    }
  }
  OnInit() {
    this.$1r = 0;
    this.F1r = [];
    this.V1r = new Map();
    this.H1r = new Map();
    this.j1r = undefined;
    this.W1r = 0;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderBattle", 11, "初始化BOSS战渲染模块");
    }
    RenderDataManager_1.RenderDataManager.Get();
    EffectManagerBusinessProxy_1.EffectManagerBusinessProxy.Get();
    SceneInteractionManager_1.SceneInteractionManager.Initialize();
    ItemMaterialManager_1.ItemMaterialManager.Initialize();
    DebugDrawManager_1.DebugDrawManager.Initialize();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.Enl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Inl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterOrExitUltraSkill, this.Yyn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSequenceCameraStatus, this.BPr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CameraModeChanged, this.cdu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSetGamePaused, this.imc);
    ResourceSystem_1.ResourceSystem.LoadAsync("/Game/Aki/Render/Shaders/PostProcess/DistortionWave/MPC_ForGamePlay.MPC_ForGamePlay", UE.MaterialParameterCollection, e => {
      this.mMd = e;
    });
    return true;
  }
  OnClear() {
    this.J1r();
    this.F1r = [];
    this.V1r = new Map();
    this.H1r = new Map();
    this.j1r = undefined;
    this.W1r = 0;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderBattle", 11, "清理BOSS战渲染模块");
    }
    RenderDataManager_1.RenderDataManager.Get().Destroy();
    DebugDrawManager_1.DebugDrawManager.Destroy();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.Enl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Inl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterOrExitUltraSkill, this.Yyn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSequenceCameraStatus, this.BPr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CameraModeChanged, this.cdu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSetGamePaused, this.imc);
    return true;
  }
  OnLeaveLevel() {
    this.J1r();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderBattle", 11, "BOSS战渲染模块离开关卡");
    }
    return true;
  }
  J1r() {
    this.F1r = [];
    this.V1r = new Map();
    this.H1r = new Map();
    this.j1r = undefined;
    this.W1r = 0;
    this.$1r = 0;
  }
  EnableGlobalData(e) {
    return -1;
  }
  EnableActorData(e, t) {
    if (t && e) {
      return ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(t, e);
    } else {
      return -1;
    }
  }
  DisableGlobal(e) {}
  DisableAllGlobal() {}
  DisableActorData(e) {
    ItemMaterialManager_1.ItemMaterialManager.DisableActorData(e);
  }
  DisableAllActorData() {
    ItemMaterialManager_1.ItemMaterialManager.DisableAllActorData();
  }
  UpdateItemMaterialParameterCollection(e) {
    ItemMaterialParameterCollectionController_1.ItemMaterialParameterCollectionController.UpdateMaterialParameterCollection(e, RenderDataManager_1.RenderDataManager.Get().GetSceneInteractionMaterialParameterCollection());
  }
}
exports.RenderModuleModel = RenderModuleModel;
//# sourceMappingURL=RenderModuleModel.js.map