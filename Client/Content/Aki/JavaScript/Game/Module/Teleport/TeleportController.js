"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportController = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../Camera/CameraController");
const CameraUtility_1 = require("../../Camera/CameraUtility");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RoleAudioController_1 = require("../../NewWorld/Character/Role/RoleAudioController");
const RoleTriggerController_1 = require("../../NewWorld/Character/Role/RoleTriggerController");
const PerfSightController_1 = require("../../PerfSight/PerfSightController");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const GameModeController_1 = require("../../World/Controller/GameModeController");
const WorldController_1 = require("../../World/Controller/WorldController");
const WorldDefine_1 = require("../../World/Define/WorldDefine");
const AsyncTask_1 = require("../../World/Task/AsyncTask");
const TaskSystem_1 = require("../../World/Task/TaskSystem");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const GenericPromptController_1 = require("../GenericPrompt/GenericPromptController");
const LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
const TeleportSeamlessHelper_1 = require("./TeleportSeamlessHelper");
const TeleportTransitionHelper_1 = require("./TeleportTransitionHelper");
const SKIP_FALL_INJURE_TIME = 1000;
const DELAYCLOSETIME = 1500;
class TeleportController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(20412, this.AIo);
    Net_1.Net.Register(16809, this.Nkl);
    Net_1.Net.Register(29681, this.PIo);
    Net_1.Net.Register(16889, this.S3l);
    Net_1.Net.Register(21484, this.P$_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InitArea, this.Hlh);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(20412);
    Net_1.Net.UnRegister(16809);
    Net_1.Net.UnRegister(29681);
    Net_1.Net.UnRegister(16889);
    Net_1.Net.UnRegister(21484);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InitArea, this.Hlh);
    return true;
  }
  static OnTick(e) {
    if (ModelManager_1.ModelManager.TeleportModel.Treadmill) {
      ModelManager_1.ModelManager.TeleportModel.Treadmill.Tick(e);
    }
    if (ModelManager_1.ModelManager.TeleportModel.PostProcess) {
      ModelManager_1.ModelManager.TeleportModel.PostProcess.Tick(e);
    }
    if (ModelManager_1.ModelManager.TeleportModel.KeepMovementMode) {
      ModelManager_1.ModelManager.TeleportModel.KeepMovementMode.Tick(e);
    }
    if (!ModelManager_1.ModelManager.TeleportModel.IsTeleport) {
      if (TeleportController.xIo !== undefined) {
        this.AIo(TeleportController.xIo);
      }
    }
  }
  static CheckCanTeleport() {
    return ModelManager_1.ModelManager.TeleportModel.AllowTeleport;
  }
  static SetAllowTeleport(e, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 48, "设置是否允许传送", ["AllowTeleport", e], ["Reason", o]);
    }
    ModelManager_1.ModelManager.TeleportModel.AllowTeleport = e;
  }
  static async TeleportToPositionNoLoading(e, o, r, t = true) {
    if (Global_1.Global.BaseCharacter?.IsValid()) {
      if (this.QueryCanTeleportNoLoading(e)) {
        if (this.UseNewTeleport) {
          return ControllerHolder_1.ControllerHolder.TeleportControllerNew.TeleportPlayerWithoutLoading(r, e, o, undefined, t);
        } else {
          return this.wIo(e, o, undefined, r, t);
        }
      } else if (this.UseNewTeleport) {
        return ControllerHolder_1.ControllerHolder.TeleportControllerNew.TeleportPlayer(r, e, o, undefined, 0);
      } else {
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2;
        return this.BIo(e, o, undefined, r);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 29, "无加载传送:失败,找不到当前玩家", ["Reason", r]);
      }
      return false;
    }
  }
  static async TeleportToPositionWithGravityNoLoading(e, o, r, t, l = true) {
    if (Global_1.Global.BaseCharacter?.IsValid()) {
      if (this.QueryCanTeleportNoLoading(e)) {
        if (this.UseNewTeleport) {
          return ControllerHolder_1.ControllerHolder.TeleportControllerNew.TeleportPlayerWithoutLoading(t, e, o, r, l);
        } else {
          return this.wIo(e, o, r, t, l);
        }
      } else if (this.UseNewTeleport) {
        return ControllerHolder_1.ControllerHolder.TeleportControllerNew.TeleportPlayer(t, e, o, undefined, 0);
      } else {
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2;
        return this.BIo(e, o, r, t);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 29, "无加载传送:失败,找不到当前玩家", ["Reason", t]);
      }
      return false;
    }
  }
  static QueryCanTeleportNoLoading(e) {
    return ControllerHolder_1.ControllerHolder.TeleportControllerNew.QueryCanTeleportNoLoading(e);
  }
  static async TeleportToPosition(e, o, r, t) {
    if (!Global_1.Global.BaseCharacter?.IsValid()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Teleport", 29, "传送:传送时无主角，建议调整配置，避免在切换编队过程中传送", ["Reason", t]);
      }
    }
    var l = ModelManager_1.ModelManager.TeleportModel;
    if ((l.TeleportReason === Protocol_1.Aki.Protocol.v4s.SL_ || l.TeleportReason === Protocol_1.Aki.Protocol.v4s.Xvs || l.TeleportReason === Protocol_1.Aki.Protocol.v4s.Proto_Fall) && ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || l.TeleportReason === Protocol_1.Aki.Protocol.v4s.cVu && ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Teleport", 39, "传送:遇到不应执行传送的情况，使用伪传送替代", ["TeleportReason", l.TeleportReason], ["Reason", t]);
      }
      return TeleportController.bIo(t);
    } else if (this.UseNewTeleport) {
      return ControllerHolder_1.ControllerHolder.TeleportControllerNew.TeleportPlayer(t, e, o, r, 0);
    } else {
      return TeleportController.BIo(e, o, r, t);
    }
  }
  static async TeleportToPositionNoSync(e, o, r, t) {
    if (!Global_1.Global.BaseCharacter?.IsValid()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Teleport", 29, "传送:传送时无主角，建议调整配置，避免在切换编队过程中传送", ["Reason", t]);
      }
    }
    var l = ModelManager_1.ModelManager.TeleportModel;
    return (l.TeleportReason === Protocol_1.Aki.Protocol.v4s.SL_ || l.TeleportReason === Protocol_1.Aki.Protocol.v4s.Xvs) && !!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || l.TeleportReason === Protocol_1.Aki.Protocol.v4s.cVu && !!ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() || TeleportController.BIo(e, o, r, t, false);
  }
  static ShowTeleportConfirmBox(e = () => {}) {
    var o = ModelManager_1.ModelManager.InstanceDungeonModel.GetCurrentDungeonTelExitConfirmId();
    return o !== undefined && o > 0 && ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o)).FunctionMap.set(2, () => {
      e();
    }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o), true);
  }
  static SendTeleportTransferRequest(e) {
    if (!this.ShowTeleportConfirmBox(() => {
      this.t4_(e, () => {
        ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceDungeonInfo();
      });
    })) {
      this.t4_(e);
    }
  }
  static t4_(e, o) {
    ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId = e;
    ModelManager_1.ModelManager.LoadingModel.TargetTeleportId = e;
    this.SendTeleportTransferRequestById(e, o);
  }
  static SendTeleportTransferRequestById(e, o) {
    ModelManager_1.ModelManager.GameModeModel.IsTeleport = true;
    ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("SendTeleportTransferRequestById");
    e = Protocol_1.Aki.Protocol.mCs.create({
      s5n: e
    });
    Net_1.Net.Call(16317, e, e => {
      ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("SendTeleportTransferRequestById");
      if (GlobalData_1.GlobalData.World) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerIsTeleportCanNotDoTeleport) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ModelManager_1.ModelManager.GameModeModel.IsTeleport = false;
            ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId = undefined;
            if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneBlockSplitNotBlock) {
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20849);
            }
          } else {
            o?.();
          }
        }
      } else {
        ModelManager_1.ModelManager.GameModeModel.IsTeleport = false;
        ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId = undefined;
      }
    });
  }
  static SendTeleportTransferRequestByEntityId(e) {
    ModelManager_1.ModelManager.GameModeModel.IsTeleport = true;
    e = ConfigManager_1.ConfigManager.MapConfig.GetInstEntityTeleportConfigById(e);
    e = Protocol_1.Aki.Protocol.gvm.create({
      r6n: e.InstId,
      A5n: e.EntityConfigId
    });
    Net_1.Net.Call(25409, e, e => {
      if (GlobalData_1.GlobalData.World) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerIsTeleportCanNotDoTeleport && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.GameModeModel.IsTeleport = false;
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27916);
        }
      } else {
        ModelManager_1.ModelManager.GameModeModel.IsTeleport = false;
      }
    });
  }
  static async wIo(e, o, r, t, l = true, a = false, _ = 0, n = true) {
    if (!TeleportController.L3u(e, o, r, true, t, _)) {
      return false;
    }
    const i = ModelManager_1.ModelManager.TeleportModel;
    if (i.TeleportMode !== 4 && i.TeleportReason !== Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle) {
      this.qIo();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 29, "无加载传送:设置角色状态(开始)");
    }
    TeleportController.GIo(false, n);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 29, "无加载传送:设置角色状态(完成)");
    }
    ModelManager_1.ModelManager.GameModeModel.IsTeleport = false;
    i.CreatePromise();
    e = new AsyncTask_1.AsyncTask("TeleportToPositionNoLoadingImpl", async () => {
      ModelManager_1.ModelManager.TeleportModel.NeedRestoreCamera = l;
      if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() || !!ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
        this.q3u();
        ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 11;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 29, "无加载传送:检测体素流送(开始)");
        }
        await this.CheckLiveLocationStreamingCompleted(true);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 29, "无加载传送:检测体素流送(完成)");
        }
        ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 12;
        ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 13;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 29, "无加载传送:检测场景流送(开始)");
        }
        await this.CheckLiveLocationStreamingCompleted();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 29, "无加载传送:检测场景流送(完成)");
        }
        ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 14;
      }
      ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("TeleportToPositionCommon");
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 15;
      ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(Protocol_1.Aki.Protocol.Nks.Proto_Normal);
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 16;
      if (a && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 48, "无加载传送:通知服务器传送完成(开始)"), this.TeleportFinishRequest(), await i.TeleportFinishRequest.Promise, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Teleport", 48, "无加载传送:通知服务器传送完成(完成)");
      }
      RoleAudioController_1.RoleAudioController.SetUpdateAudioDynamicTrace(true);
      WorldController_1.WorldController.SetEnableWorldOriginTickCheck(t, true);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "无加载传送:处理完成事件(开始)");
      }
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 1;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportComplete);
      ModelManager_1.ModelManager.TeleportModel.NeedRestoreCamera = true;
      TeleportController.OIo(i.TeleportId);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "无加载传送:处理完成事件(完成)");
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "无加载传送:完成");
      }
      i.ResetTeleportData();
      return true;
    });
    TaskSystem_1.TaskSystem.AddTask(e);
    TaskSystem_1.TaskSystem.Run();
    return e.Promise;
  }
  static async bIo(e) {
    const o = ModelManager_1.ModelManager.TeleportModel;
    if (o.IsTeleport) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Teleport", 39, "伪传送:无法调用,正在传送中", ["Reason", e]);
      }
      return false;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 39, "伪传送:开始", ["原因", o.TeleportReason], ["Reason", e]);
    }
    o.IsTeleport = true;
    ModelManager_1.ModelManager.CharacterModel.ExitAllSelfCenteredMode();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 57, "传送:慢放解除", ["Reason", e]);
    }
    var r = new AsyncTask_1.AsyncTask("FakeTeleportToPositionImpl", async () => {
      o.CreatePromise();
      if (o.TeleportReason === Protocol_1.Aki.Protocol.v4s.cVu) {
        await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(6);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "伪传送:通知服务器传送完成(开始)");
      }
      this.TeleportFinishRequest();
      await o.TeleportFinishRequest.Promise;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotTeleportToPositionFinished);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "伪传送:通知服务器传送完成(完成)");
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "伪传送:完成", ["Reason", e]);
      }
      o.ResetTeleportData();
      return true;
    });
    TaskSystem_1.TaskSystem.AddTask(r);
    TaskSystem_1.TaskSystem.Run();
    return r.Promise;
  }
  static async BIo(e, o, r, t, l = true, a = 0) {
    if (!TeleportController.L3u(e, o, r, false, t, a)) {
      return false;
    }
    const _ = ModelManager_1.ModelManager.TeleportModel;
    _.CreatePromise();
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 3;
    await TeleportTransitionHelper_1.TeleportTransitionHelper.PlayTeleportTransition(_.TeleportReason, _.Option);
    if (ControllerHolder_1.ControllerHolder.TeleportControllerNew.BackToGameIfTargetPositionInvalid(_.TargetPosition, t)) {
      return false;
    }
    ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(GlobalData_1.GlobalData.World, t);
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 4;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 29, "传送:处理打开loading结束事件(开始)", ["Reason", t]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportOpenLoadingEnd);
    o = a !== 0 ? ModelManager_1.ModelManager.CreatureModel?.GetEntity(a) : ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
    if (o?.Entity && ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(o)?.Valid) {
      EventSystem_1.EventSystem.EmitWithTarget(o.Entity, EventDefine_1.EEventName.TeleportOpenLoadingEnd);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 29, "传送:处理打开loading结束事件(完成)");
    }
    const n = ModelManager_1.ModelManager.TeleportModel.TeleportMode === 2 || ModelManager_1.ModelManager.TeleportModel.TeleportMode === 1 || UE.KuroStaticLibrary.IsLowMemoryDevice();
    if (n) {
      ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
    }
    if (_.TeleportMode !== 4 && _.TeleportReason !== Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle) {
      this.qIo();
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.qIo);
    }
    r = new AsyncTask_1.AsyncTask("TeleportToPositionImpl", async () => {
      PerfSightController_1.PerfSightController.StartPersistentOrDungeon();
      cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport");
      cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CheckVoxelStreaming");
      ControllerHolder_1.ControllerHolder.GameModeController.ForceDisableGamePaused(true);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:时停解除(开始)", ["Reason", t]);
      }
      if (_.TeleportMode === 4) {
        await TeleportSeamlessHelper_1.TeleportSeamlessHelper.SeamlessTeleportStart();
      }
      ModelManager_1.ModelManager.GameModeModel.StartIndependentStreaming(_.TargetPosition.ToUeVector());
      this.q3u();
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 11;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:检测体素流送(开始)");
      }
      if (n) {
        ControllerHolder_1.ControllerHolder.WorldController.ManuallyClearStreamingPool();
      }
      await this.HIo(true);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:检测体素流送(完成)");
      }
      cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CheckVoxelStreaming");
      cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CheckStreaming");
      if (n) {
        ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
      }
      ControllerHolder_1.ControllerHolder.GameModeController.AddOrRemoveRenderAssetsQueryViewInfo(e, ResourceSystem_1.WAIT_RENDER_ASSET_DURATION);
      if (ModelManager_1.ModelManager.GameModeModel.PreAwakeEntityDuringLoad && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 80, "传送:预唤醒实体（开始）"), await ControllerHolder_1.ControllerHolder.CreatureController.PreAwakeEntitiesFromPending(Protocol_1.Aki.Protocol.Nks.Proto_SceneInit), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Teleport", 80, "传送:预唤醒实体（结束）");
      }
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 13;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 7, "传送:检测场景流送(开始)");
      }
      await this.HIo();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 7, "传送:检测场景流送(完成)");
      }
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 14;
      cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CheckStreaming");
      cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CheckRenderAssets");
      if (n) {
        ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
        ControllerHolder_1.ControllerHolder.WorldController.ManuallyResetStreamingPool();
      }
      ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("TeleportToPositionCommon");
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 15;
      ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(Protocol_1.Aki.Protocol.Nks.Proto_Normal);
      await ControllerHolder_1.ControllerHolder.GameModeController.CheckRenderAssetsStreamingCompleted(e, "传送:");
      cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CheckRenderAssets");
      if (_.TeleportMode === 4) {
        await TeleportSeamlessHelper_1.TeleportSeamlessHelper.SeamlessTeleportPreEnd();
      }
      cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.LoadTeam");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:等待编队加载(开始)");
      }
      await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:等待编队加载(完成)");
      }
      cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.LoadTeam");
      cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CloseLoading");
      if (_.TeleportMode !== 4 && _.TeleportReason !== Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.qIo);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:设置角色状态(开始)");
      }
      TeleportController.GIo();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:设置角色状态(完成)");
      }
      ModelManager_1.ModelManager.GameModeModel?.StopIndependentStreaming(ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTriggerOrUndefined());
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 16;
      ModelManager_1.ModelManager.GameModeModel.IsTeleport = false;
      RoleAudioController_1.RoleAudioController.SetUpdateAudioDynamicTrace(true);
      ResourceSystem_1.ResourceSystem.SetLoadModeInGame(GlobalData_1.GlobalData.World, t);
      if (n) {
        ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FixBornLocation);
      if (_.TeleportReason !== Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 48, "传送:更新载具状态(开始)"), await ControllerHolder_1.ControllerHolder.VehicleController.UpdatePlayerVehiclePerform(), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Teleport", 48, "传送:更新载具状态(完成)");
      }
      if (_.TeleportReason === Protocol_1.Aki.Protocol.v4s.Proto_BtRollbackFailed) {
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          ModelManager_1.ModelManager.TeleportModel.TeleportWaitRequest?.SetResult(true);
        }, DELAYCLOSETIME);
      } else {
        ModelManager_1.ModelManager.TeleportModel.TeleportWaitRequest?.SetResult(true);
      }
      await ModelManager_1.ModelManager.TeleportModel.TeleportWaitRequest?.Promise;
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 19;
      await TeleportTransitionHelper_1.TeleportTransitionHelper.WaitTeleportTransition(_.TeleportReason, _.Option);
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 20;
      cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CloseLoading");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:通知服务器前处理传送事件(开始)");
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BeforeTeleportComplete);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:通知服务器前处理传送事件(完成)");
      }
      if (l) {
        cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.TeleportFinishRequest");
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 29, "传送:通知服务器传送完成(开始)");
        }
        this.TeleportFinishRequest();
        await _.TeleportFinishRequest.Promise;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 29, "传送:通知服务器传送完成(完成)");
        }
        cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.TeleportFinishRequest");
      }
      cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.TeleportFinish");
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
      ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = true;
      _.IsTeleport = false;
      TeleportController.OIo(_.TeleportId);
      WorldController_1.WorldController.SetEnableWorldOriginTickCheck(t, true);
      PerfSightController_1.PerfSightController.MarkLevelLoadCompleted();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:处理完成事件(开始)");
      }
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 1;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotTeleportToPositionFinished);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportComplete, _.TeleportReason);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:处理完成事件(完成)");
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 45, "传送:更新游戏时停状态");
      }
      ControllerHolder_1.ControllerHolder.GameModeController.ForceDisableGamePaused(false);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:时停解除(完成)", ["Reason", t]);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:完成", ["Reason", t]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportAfterComplete);
      cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.TeleportFinish");
      cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport");
      _.ResetTeleportData();
      return true;
    });
    TaskSystem_1.TaskSystem.AddTask(r);
    TaskSystem_1.TaskSystem.Run();
    return r.Promise;
  }
  static L3u(e, o, r, t, l, a = 0) {
    var _ = ModelManager_1.ModelManager.TeleportModel;
    if (_.IsTeleport) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Teleport", 29, "重复调用传送接口, 当前正在传送中", ["Reason", l]);
      }
      return false;
    }
    _.TargetPosition.DeepCopy(e);
    _.TeleportEntityCreatureDataId = a;
    let n = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (a !== 0) {
      n = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
    }
    let i = undefined;
    if ((i = n ? ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(n) : i)?.Valid) {
      _.StartPosition.DeepCopy(i.ActorLocationProxy);
      _.StartRotation.DeepCopy(i.ActorRotationProxy);
      _.StartGravityDirect.DeepCopy(i.ActorGravityDirectProxy);
    }
    if (r) {
      _.TargetGravityDirect.DeepCopy(r);
    } else {
      _.TargetGravityDirect.DeepCopy(i?.ActorGravityDirectProxy ?? Vector_1.Vector.DownVectorProxy);
    }
    if (!_.TargetGravityDirect.Normalize()) {
      _.TargetGravityDirect.DeepCopy(Vector_1.Vector.DownVectorProxy);
    }
    if (MathUtils_1.MathUtils.IsNearlyEqual(_.TargetGravityDirect.Z, -1) && _.TargetGravityDirect.Inequality(Vector_1.Vector.DownVectorProxy)) {
      _.TargetGravityDirect.DeepCopy(Vector_1.Vector.DownVectorProxy);
    }
    if (o) {
      _.TargetRotation.DeepCopy(o);
    } else if (i?.Valid) {
      Quat_1.Quat.FindBetween(i.ActorGravityDirectProxy, _.TargetGravityDirect, MathUtils_1.MathUtils.CommonTempQuat);
      a = Quat_1.Quat.Create();
      MathUtils_1.MathUtils.CommonTempQuat.Multiply(i.ActorRotationProxy.Quaternion(), a);
      a.Rotator(_.TargetRotation);
    } else {
      _.TargetRotation.Reset();
    }
    r = _.TargetGravityDirect.Multiply(-1, Vector_1.Vector.Create());
    _.TargetRotation.Quaternion().GetForwardVector(MathUtils_1.MathUtils.CommonTempVector);
    MathUtils_1.MathUtils.LookRotationUpFirst(MathUtils_1.MathUtils.CommonTempVector, r, _.TargetRotation);
    ModelManager_1.ModelManager.CharacterModel.ExitAllSelfCenteredMode();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 57, "传送:慢放解除", ["Reason", l]);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 29, "传送:开始", ["传送实体", _.TeleportEntityCreatureDataId], ["开始位置", _.StartPosition], ["目标位置", _.TargetPosition], ["开始旋转", _.StartRotation], ["目标旋转", _.TargetRotation], ["开始重力方向", _.StartGravityDirect], ["目标重力方向", _.TargetGravityDirect], ["原因", _.TeleportReason], ["传送类型", _.CtxType], ["Reason", l]);
    }
    _.IsTeleport = true;
    ModelManager_1.ModelManager.GameModeModel.SetBornInfo(e, o);
    ModelManager_1.ModelManager.GameModeModel.IsTeleport = true;
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 2;
    ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("TeleportToPositionCommon");
    ModelManager_1.ModelManager.GameModeModel.RenderAssetDone = t;
    WorldController_1.WorldController.SetEnableWorldOriginTickCheck(l, false);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 29, "传送:处理开始事件(开始)", ["Reason", l]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportStart, true);
    if (i?.Valid) {
      EventSystem_1.EventSystem.EmitWithTarget(n.Entity, EventDefine_1.EEventName.TeleportStartEntity, true);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 29, "传送:处理开始事件(完成)");
    }
    return true;
  }
  static zQs(e, o) {
    const r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass());
    TeleportController.jIo = 3000;
    TeleportController.$ml = 0;
    const t = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      if (ModelManager_1.ModelManager.GameModeModel.StreamingSource?.IsValid()) {
        if (r && e.IsStreamingCompletedForLayers(undefined, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, undefined, false)) {
          TeleportController.jIo = 0;
          TimerSystem_1.GameplayTimerSystem.Remove(t);
          o.SetResult(true);
        } else {
          TeleportController.jIo += ResourceSystem_1.CHECK_STREAMING_INTERVAL;
          if (TeleportController.jIo > 3000 && (TeleportController.jIo = 0, Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("Teleport", 29, "无加载传送:流送中", ["WorldPartitionSubsystem", r ? "true" : "false"], ["StreamingSource", e.GetOwner().D_K2_GetActorLocation()]);
          }
          this.Xml(e, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
        }
      }
    }, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
    return t;
  }
  static Xml(e, o, r = false) {
    TeleportController.$ml += o;
    if (TeleportController.$ml > GameModeController_1.LOG_STREAMING_STUCK_INTERVAL) {
      ControllerHolder_1.ControllerHolder.GameModeController.PrintWorldPartitionDebugInfo(e, undefined, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, r);
      TeleportController.$ml = 0;
    }
  }
  static async CheckLiveLocationStreamingCompleted(e = false) {
    var o;
    var r;
    var t = ModelManager_1.ModelManager.TeleportModel;
    if (ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
      if (ModelManager_1.ModelManager.GameModeModel.StreamingSource?.IsValid() && !e) {
        ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(ModelManager_1.ModelManager.GameModeModel.StreamingSource.D_K2_GetActorLocation(), true, true);
      }
      r = e ? ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource : ModelManager_1.ModelManager.GameModeModel.StreamingSource;
      o = e ? t.VoxelStreamingCompleted : t.StreamingCompleted;
      r = r.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      t.CheckStreamingCompletedTimerId = this.zQs(r, o);
      await o.Promise;
      t.CheckStreamingCompletedTimerId = undefined;
    } else {
      (e ? t.VoxelStreamingCompleted : t.StreamingCompleted).SetResult(true);
    }
  }
  static ZQs(o, r, t, l = false) {
    var e = o.TargetGrids;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 60, "传送:检测参数", ["dataLayers", t !== undefined && t.Num() > 0 ? t.Get(0).toString() : undefined], ["targetGrids", e !== undefined && e.Num() > 0 ? e.Get(0).toString() : undefined]);
    }
    const a = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass());
    let _ = false;
    TeleportController.jIo = 3000;
    TeleportController.$ml = 0;
    const n = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      var e = () => {
        TeleportController.jIo += ResourceSystem_1.CHECK_STREAMING_INTERVAL;
        if (TeleportController.jIo > 3000 && (a && !a.IsStreamingEnable() && a.SetStreamingEnable(true), TeleportController.jIo = 0, Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Teleport", 29, "传送:流送中", ["WorldPartitionSubsystem", a ? "true" : "false"], ["StreamingSource", o.GetOwner().D_K2_GetActorLocation()]);
        }
        this.Xml(o, ResourceSystem_1.CHECK_STREAMING_INTERVAL, _);
      };
      if (a) {
        if (!_) {
          const r = o.IsStreamingCompletedForLayers(t, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, undefined, false);
          if (!r) {
            e();
            return;
          }
          if ((_ = l) && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 60, "传送:检测场景物理体(开始)");
          }
        }
        if (_) {
          const r = o.IsStreamingCompletedForLayers(t, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, undefined, true);
          if (!r) {
            e();
            return;
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 60, "传送:检测场景物理体(完成)");
          }
        }
        TeleportController.jIo = 0;
        TimerSystem_1.GameplayTimerSystem.Remove(n);
        r.SetResult(true);
      } else {
        e();
      }
    }, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
    return n;
  }
  static async HIo(e = false) {
    var r = ModelManager_1.ModelManager.TeleportModel;
    if (ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
      var t = r.TargetPosition.ToUeVector();
      let o = undefined;
      if (!e) {
        o = UE.NewArray(UE.BuiltinName);
        let e = ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(t, true, true);
        if (e) {
          t = (0, puerts_1.$ref)(undefined);
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(GlobalData_1.GlobalData.World, e, t);
          o.Add((0, puerts_1.$unref)(t));
        } else {
          for (const _ of WorldDefine_1.dataLayerRuntimeHLOD) {
            var l = (0, puerts_1.$ref)(undefined);
            e = FNameUtil_1.FNameUtil.GetDynamicFName(_);
            UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(GlobalData_1.GlobalData.World, e, l);
            o.Add((0, puerts_1.$unref)(l));
          }
        }
        ControllerHolder_1.ControllerHolder.GameModeController.AppendAllBaseDatalayers(o);
      }
      var t = e ? ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource : ModelManager_1.ModelManager.GameModeModel.StreamingSource;
      var a = e ? r.VoxelStreamingCompleted : r.StreamingCompleted;
      var t = t.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      r.CheckStreamingCompletedTimerId = this.ZQs(t, a, o, !e);
      await a.Promise;
      r.CheckStreamingCompletedTimerId = undefined;
    } else {
      (e ? r.VoxelStreamingCompleted : r.StreamingCompleted).SetResult(true);
    }
  }
  static q3u() {
    var e;
    if (UE.KuroStaticLibrary.IsLowMemoryDevice() && (e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass())) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 60, "清理卸载流送单元(开始)", ["PhysicalMemory", GameSettingsDeviceRender_1.GameSettingsDeviceRender.PhysicalGBRam]), e.FlushUnloadingStreamingCells(), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 60, "清理卸载流送单元(结束)");
    }
  }
  static TeleportFinishRequest() {
    var e = new Protocol_1.Aki.Protocol.pCs();
    Net_1.Net.Call(21130, e, e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:TeleportFinishRequestSetResult(开始)");
      }
      ModelManager_1.ModelManager.TeleportModel.TeleportFinishRequest.SetResult(true);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:TeleportFinishRequestSetResult(完成)");
      }
    });
  }
  static GIo(e = true, o = true) {
    var r;
    var t;
    var l;
    var a;
    var _ = ModelManager_1.ModelManager.TeleportModel;
    if (!_.TeleportEntityCreatureDataId || !(this.Fkl(_.TeleportEntityCreatureDataId, _.TargetPosition, _.TargetRotation, _.TargetGravityDirect), CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(_.TargetRotation.ToUeRotator()), CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(e), RoleTriggerController_1.RoleTriggerController.UpdateTransform(), o)) {
      if (r = (o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Entity.GetComponent(3)) {
        if (_.TeleportMode !== 4) {
          if (r.Actor.CharacterMovement) {
            r.Actor.KuroSetMovementMode({
              Mode: r.Actor.CharacterMovement.DefaultLandMovementMode,
              Context: "[TeleportController.SetCurrentEntityAction]"
            });
          }
          o.Entity.GetComponent(181)?.MainAnimInstance?.SyncAnimStates(undefined);
          r.SetInputRotator(_.TargetRotation);
          r.SetActorRotation(_.TargetRotation.ToUeRotator(), "TeleportController", false);
          r.MoveComp?.SetGravityDirectWithoutRotate(_.TargetGravityDirect);
          o.Entity.GetComponent(179)?.ResetCharState();
          r.TeleportAndFindStandLocation(_.TargetPosition);
          CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator());
          CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(e);
        } else {
          o?.Entity?.GetComponent(181)?.StopModelBuffer();
          e = Quat_1.Quat.Create();
          r.ActorQuatProxy.Inverse(MathUtils_1.MathUtils.CommonTempQuat);
          MathUtils_1.MathUtils.CommonTempQuat.Multiply(CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation.Quaternion(), e);
          t = Quat_1.Quat.Create();
          _.TargetRotation.Quaternion().Multiply(e, t);
          l = Vector_1.Vector.Create();
          r.ActorQuatProxy.Inverse(MathUtils_1.MathUtils.CommonTempQuat);
          MathUtils_1.MathUtils.CommonTempQuat.RotateVector(r.ActorVelocityProxy, l);
          a = Vector_1.Vector.Create();
          _.TargetRotation.Quaternion().RotateVector(l, a);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 39, "无缝传送:计算传送后信息", ["角色当前旋转", r.ActorRotationProxy], ["角色目标旋转", _.TargetRotation], ["相机当前旋转", CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation], ["相机目标旋转", t.Rotator()], ["相机相对角色旋转", e.Rotator()]);
          }
          r.SetInputRotator(_.TargetRotation);
          r.SetActorRotation(_.TargetRotation.ToUeRotator(), "TeleportController", false);
          r.MoveComp?.SetGravityDirectWithoutRotate(_.TargetGravityDirect);
          r.TeleportAndFindStandLocation(_.TargetPosition);
          r.MoveComp.SetForceSpeed(a);
          CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(t.Rotator().ToUeRotator());
          CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(false, true);
        }
        EventSystem_1.EventSystem.EmitWithTarget(o.Entity, EventDefine_1.EEventName.TeleportChangeLocation);
        RoleTriggerController_1.RoleTriggerController.UpdateTransform();
        TeleportController.WIo = TimerSystem_1.GameplayTimerSystem.Delay(() => {
          ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = false;
          TeleportController.WIo = undefined;
        }, SKIP_FALL_INJURE_TIME);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 29, "传送:失败,找不到当前实体");
      }
    }
  }
  static OIo(e) {
    if ((e &&= ConfigManager_1.ConfigManager.WorldMapConfig.GetTeleportEntityConfigId(e)) && (e = ModelManager_1.ModelManager.CreatureModel?.GetEntityData(e)?.AreaId)) {
      if (ModelManager_1.ModelManager.AreaModel.GetArea(e)) {
        if (e === ModelManager_1.ModelManager.AreaModel.AreaInfo?.AreaId) {
          ModelManager_1.ModelManager.AreaModel.SetAreaName(e, true);
        }
      } else {
        ModelManager_1.ModelManager.AreaModel.AddWatchArea(e);
      }
    }
  }
  static OnLeaveLevel() {
    TeleportController.jIo = 0;
    if (ModelManager_1.ModelManager.TeleportModel.CheckStreamingCompletedTimerId && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Teleport", 29, "传送:终止,离开关卡"), TimerSystem_1.GameplayTimerSystem.Has(ModelManager_1.ModelManager.TeleportModel.CheckStreamingCompletedTimerId))) {
      TimerSystem_1.GameplayTimerSystem.Remove(ModelManager_1.ModelManager.TeleportModel.CheckStreamingCompletedTimerId);
    }
    ModelManager_1.ModelManager.TeleportModel.CheckStreamingCompletedTimerId = undefined;
    ModelManager_1.ModelManager.TeleportModel.CheckPhysicsCompletedTimerId = undefined;
    ModelManager_1.ModelManager.TeleportModel.VoxelStreamingCompleted?.SetResult(true);
    ModelManager_1.ModelManager.TeleportModel.StreamingCompleted?.SetResult(true);
    return true;
  }
  static TeleportVehicle(e, o, r, t, l = false, a = undefined, _ = undefined) {
    if (o) {
      (o = ModelManager_1.ModelManager.TeleportModel).TeleportReason = a;
      o.Option = _;
      if (l && this.QueryCanTeleportNoLoading(r)) {
        TeleportController.wIo(r, t.ToUeRotator(), undefined, "TeleportVehicle", true, true, e);
      } else {
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
        TeleportController.BIo(r, t.ToUeRotator(), undefined, "TeleportVehicle", true, e);
      }
    } else {
      this.Fkl(e, r, t, Vector_1.Vector.DownVectorProxy);
    }
  }
  static Fkl(e, o, r, t) {
    var l;
    var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (a?.Valid) {
      (l = ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(a)).SetActorRotation(r.ToUeRotator(), "ResetLocationForZRangeNotify");
      l.MoveComp?.SetGravityDirectWithoutRotate(t);
      r = Vector_1.Vector.Create(o);
      if (t = a.Entity.GetComponent(3)) {
        t.FixBornLocation("ResetLocationForZRangeNotify", true, r, false, true);
      } else {
        l.SetActorLocation(r.ToUeVector(), "ResetLocationForZRangeNotify", false);
      }
      l.MoveComp?.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
      a.Entity.GetComponent(67)?.ClearReplaySamples();
      EventSystem_1.EventSystem.EmitWithTarget(a.Entity, EventDefine_1.EEventName.TeleportChangeLocation);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Entity", 14, "传送载具：设置载具实体位置", ["CreatureDataId", a.CreatureDataId], ["PbDataId", a.PbDataId], ["EntityId", a.Entity.Id], ["Location", r.ToString()]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 48, "传送载具：实体已无效", ["CreatureDataId", e]);
    }
  }
}
exports.TeleportController = TeleportController;
(_a = TeleportController).UseNewTeleport = false;
TeleportController.jIo = 0;
TeleportController.$ml = 0;
TeleportController.WIo = undefined;
TeleportController.xIo = undefined;
TeleportController.qIo = () => {
  if (TeleportController.WIo) {
    TimerSystem_1.GameplayTimerSystem.Remove(TeleportController.WIo);
    TeleportController.WIo = undefined;
  }
  ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = true;
  var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  if (e?.Valid && (e = e.Entity.GetComponent(3))?.Valid && e.Actor?.IsValid() && e.Actor.CharacterMovement?.IsValid()) {
    e.Actor.KuroSetMovementMode({
      Mode: 0,
      Context: "[TeleportController.PreventEntityPreTeleportFromFalling]"
    });
  }
};
TeleportController.AIo = e => {
  var o = e.cvs;
  var r = e.f5n;
  var t = ModelManager_1.ModelManager.TeleportModel;
  const l = e.l9_ ? Vector_1.Vector.Create(e.l9_).ToUeVector() : Vector_1.Vector.ZeroVectorDouble;
  var a = e.g8n ? Rotator_1.Rotator.Create(e.g8n.Y, e.g8n.Z, e.g8n.X).ToUeRotator() : Rotator_1.Rotator.ZeroRotator;
  var _ = e.ZE_ ? Vector_1.Vector.Create(e.ZE_) : Vector_1.Vector.DownVectorProxy;
  t.DisableAutoFade = e.FI_;
  t.TeleportReason = e.x9n;
  t.TeleportId = ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId;
  t.CtxType = o ? o.fvs : undefined;
  t.Option = r;
  t.TargetLocation = l;
  let n = "";
  try {
    n = JSON.stringify(o);
  } catch {
    n = "Context序列化解析失败";
  }
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("LevelEvent", 7, "服务端驱动执行传送", ["Context", n], ["Pos", e.l9_], ["Rot", e.g8n], ["Gravity", e.ZE_], ["Reason", e.x9n]);
  }
  if (ModelManager_1.ModelManager.TeleportModel.IsTeleport) {
    TeleportController.xIo = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Teleport", 29, "传送: 传送中，缓存TeleportNotify", ["被缓存传送的传送原因", t.TeleportReason]);
    }
  } else {
    TeleportController.xIo = undefined;
    TeleportTransitionHelper_1.TeleportTransitionHelper.InitTeleportMode();
    WorldController_1.WorldController.StartWorldOriginInLoadingMode("Teleport");
    TeleportController.TeleportToPosition(l, a, _, "OnTeleportNotify").finally(() => {
      ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
      WorldController_1.WorldController.EndWorldOriginInLoadingMode("Teleport", l);
    });
    ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId = undefined;
  }
};
TeleportController.Hlh = () => {
  ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId = undefined;
};
TeleportController.S3l = e => {
  if (ModelManager_1.ModelManager.PlayerInfoModel?.GetId() !== e.W5n) {
    GenericPromptController_1.GenericPromptController.ShowPromptByItsType(27, undefined, undefined, undefined, undefined, undefined, undefined, undefined, e.NI_);
  }
};
TeleportController.P$_ = o => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Teleport", 45, "收到上线播放CG请求", ["Name", o.x$_]);
  }
  LevelLoadingController_1.LevelLoadingController.OpenLoading(7, 2);
  ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 = true;
  LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(18, 5, o.x$_, () => {
    var e = Protocol_1.Aki.Protocol.D$_.create();
    e.x$_ = o.x$_;
    if (!o.x$_) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 45, "收到的CG名称不存在", ["Name", o.x$_]);
      }
    }
    Net_1.Net.Call(17997, e, e => {
      if (!e || e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 45, "播放CG完成请求失败", ["ErrorCode", e.Cvs]);
        }
      }
      ModelManager_1.ModelManager.TeleportModel.CgTeleportCompleted?.SetResult(true);
      ModelManager_1.ModelManager.GameModeModel.VideoStartPromise?.SetResult(true);
      LevelLoadingController_1.LevelLoadingController.CloseLoading(18);
      LevelLoadingController_1.LevelLoadingController.CloseLoading(7);
    });
  }, false);
};
TeleportController.PIo = e => {
  ModelManager_1.ModelManager.DeadReviveModel.SkipDeathAnim = false;
};
TeleportController.Nkl = e => {
  var o;
  var r;
  var t;
  var l;
  if (e.P5n) {
    o = MathUtils_1.MathUtils.LongToNumber(e.HI_);
    r = e.VI_.length > 0;
    t = new UE.VectorDouble(e.P5n.X, e.P5n.Y, e.P5n.Z);
    l = Rotator_1.Rotator.Create(e.g8n?.Pitch ?? 0, e.g8n?.Yaw ?? 0, e.g8n?.Roll ?? 0);
    if (TeleportController.UseNewTeleport) {
      if (r) {
        ControllerHolder_1.ControllerHolder.TeleportControllerNew.TeleportPlayerWithVehicle(o, t, l, undefined, e.$I_, e);
      } else {
        _a.Fkl(o, t, l, Vector_1.Vector.DownVectorProxy);
      }
    } else {
      _a.TeleportVehicle(o, r, t, l, e.$I_, e.x9n, e.f5n);
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Teleport", 18, "传送载具：目标位置错误");
  }
}; //# sourceMappingURL=TeleportController.js.map