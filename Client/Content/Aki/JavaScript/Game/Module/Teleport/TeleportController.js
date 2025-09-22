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
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
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
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
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
const CustomMovementDefine_1 = require("../../NewWorld/Character/Common/Component/Move/CustomMovementDefine");
const RoleAudioController_1 = require("../../NewWorld/Character/Role/RoleAudioController");
const RoleTriggerController_1 = require("../../NewWorld/Character/Role/RoleTriggerController");
const PerfSightController_1 = require("../../PerfSight/PerfSightController");
const ScreenEffectSystem_1 = require("../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const GameModeController_1 = require("../../World/Controller/GameModeController");
const WorldController_1 = require("../../World/Controller/WorldController");
const WorldDefine_1 = require("../../World/Define/WorldDefine");
const AsyncTask_1 = require("../../World/Task/AsyncTask");
const TaskSystem_1 = require("../../World/Task/TaskSystem");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const DeadReviveController_1 = require("../DeadRevive/DeadReviveController");
const GenericPromptController_1 = require("../GenericPrompt/GenericPromptController");
const LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
const PlotData_1 = require("../Plot/PlotData");
const SeamlessTravelDefine_1 = require("../SeamlessTravel/SeamlessTravelDefine");
const SeamlessTravelKeepKite_1 = require("../SeamlessTravel/SeamlessTravelKeepKite");
const SeamlessTravelKeepMovementMode_1 = require("../SeamlessTravel/SeamlessTravelKeepMovementMode");
const SeamlessTravelPostProcess_1 = require("../SeamlessTravel/SeamlessTravelPostProcess");
const SeamlessTravelSceneEffect_1 = require("../SeamlessTravel/SeamlessTravelSceneEffect");
const SeamlessTravelScreenEffect_1 = require("../SeamlessTravel/SeamlessTravelScreenEffect");
const SeamlessTravelTreadmill_1 = require("../SeamlessTravel/SeamlessTravelTreadmill");
const TeleportDefine_1 = require("../Teleport/TeleportDefine");
const DISTANCE_THRESHOLD_1 = 3000;
const DISTANCE_THRESHOLD_2 = MathUtils_1.MathUtils.MaxFloat;
const SKIP_FALL_INJURE_TIME = 1000;
const DELAYCLOSETIME = 1500;
class TeleportController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(21467, this.AIo);
    Net_1.Net.Register(23787, this.Nkl);
    Net_1.Net.Register(21372, this.PIo);
    Net_1.Net.Register(24101, this.S3l);
    Net_1.Net.Register(20080, this.P$_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InitArea, this.Hlh);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(21467);
    Net_1.Net.UnRegister(23787);
    Net_1.Net.UnRegister(21372);
    Net_1.Net.UnRegister(24101);
    Net_1.Net.UnRegister(20080);
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
  static async TeleportToPositionNoLoading(e, o, r, t = true, l = false) {
    if (Global_1.Global.BaseCharacter?.IsValid()) {
      if (this.QueryCanTeleportNoLoading(e, l)) {
        l = new TeleportDefine_1.TeleportContext(undefined, undefined, 0);
        return this.wIo(e, o, undefined, r, l, t);
      } else {
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2;
        return this.BIo(e, o, undefined, r, new TeleportDefine_1.TeleportContext());
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 29, "无加载传送:失败,找不到当前玩家", ["Reason", r]);
      }
      return false;
    }
  }
  static async TeleportToPositionWithGravityNoLoading(e, o, r, t, l = true, a = false) {
    if (Global_1.Global.BaseCharacter?.IsValid()) {
      if (this.QueryCanTeleportNoLoading(e, a)) {
        a = new TeleportDefine_1.TeleportContext(undefined, undefined, 0);
        return this.wIo(e, o, r, t, a, l);
      } else {
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2;
        return this.BIo(e, o, r, t, new TeleportDefine_1.TeleportContext());
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 29, "无加载传送:失败,找不到当前玩家", ["Reason", t]);
      }
      return false;
    }
  }
  static QueryCanTeleportNoLoading(e, o = false) {
    var r = Global_1.Global.BaseCharacter;
    if (r?.IsValid()) {
      return (o ? UE.VectorDouble.Dist2D(r.CharacterActorComponent.ActorLocation, e) : UE.VectorDouble.Dist(r.CharacterActorComponent.ActorLocation, e)) < (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !ModelManager_1.ModelManager.GameModeModel.UseWorldPartition ? DISTANCE_THRESHOLD_2 : DISTANCE_THRESHOLD_1);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 29, "查询是否可以无加载传送:失败,找不到当前玩家");
      }
      return false;
    }
  }
  static async TeleportToPosition(e, o, r, t, l) {
    if (!Global_1.Global.BaseCharacter?.IsValid()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Teleport", 29, "传送:传送时无主角，建议调整配置，避免在切换编队过程中传送", ["Reason", t]);
      }
    }
    let a = l;
    if (((a = a || new TeleportDefine_1.TeleportContext()).TeleportReason === Protocol_1.Aki.Protocol.v4s.SL_ || a.TeleportReason === Protocol_1.Aki.Protocol.v4s.Xvs || a.TeleportReason === Protocol_1.Aki.Protocol.v4s.Proto_Fall) && ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || a.TeleportReason === Protocol_1.Aki.Protocol.v4s.cVu && ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Teleport", 39, "传送:遇到不应执行传送的情况，使用伪传送替代", ["TeleportReason", a.TeleportReason], ["Reason", t]);
      }
      return TeleportController.bIo(a, t);
    } else {
      return TeleportController.BIo(e, o, r, t, a);
    }
  }
  static async TeleportToPositionNoSync(e, o, r, t, l) {
    if (!Global_1.Global.BaseCharacter?.IsValid()) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Teleport", 29, "传送:传送时无主角，建议调整配置，避免在切换编队过程中传送", ["Reason", t]);
      }
    }
    let a = l;
    return ((a = a || new TeleportDefine_1.TeleportContext()).TeleportReason === Protocol_1.Aki.Protocol.v4s.SL_ || a.TeleportReason === Protocol_1.Aki.Protocol.v4s.Xvs) && !!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || a.TeleportReason === Protocol_1.Aki.Protocol.v4s.cVu && !!ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() || TeleportController.BIo(e, o, r, t, a, false);
  }
  static ShowTeleportConfirmBox(e = () => {}) {
    var o = ModelManager_1.ModelManager.InstanceDungeonModel.GetCurrentDungeonTelExitConfirmId();
    return o !== undefined && o > 0 && ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o)).FunctionMap.set(2, () => {
      e();
    }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o), true);
  }
  static SendTeleportTransferRequest(e) {
    if (!this.ShowTeleportConfirmBox(() => {
      ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceDungeonInfo();
      this.t4_(e);
    })) {
      this.t4_(e);
    }
  }
  static t4_(e) {
    ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId = e;
    ModelManager_1.ModelManager.LoadingModel.TargetTeleportId = e;
    this.SendTeleportTransferRequestById(e);
  }
  static SendTeleportTransferRequestById(e) {
    ModelManager_1.ModelManager.GameModeModel.IsTeleport = true;
    e = Protocol_1.Aki.Protocol.mCs.create({
      s5n: e
    });
    Net_1.Net.Call(16308, e, e => {
      if (GlobalData_1.GlobalData.World) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerIsTeleportCanNotDoTeleport && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.GameModeModel.IsTeleport = false;
          ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId = undefined;
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25681);
        }
      } else {
        ModelManager_1.ModelManager.GameModeModel.IsTeleport = false;
        ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId = undefined;
      }
    });
  }
  static async wIo(e, o, r, t, l, a = true, _ = false, n = 0, i = true) {
    if (!TeleportController.L3u(e, o, r, true, t, l, n)) {
      return false;
    }
    const g = ModelManager_1.ModelManager.TeleportModel;
    if (g.TeleportMode !== 4 && l.TeleportReason !== Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle) {
      this.qIo();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 29, "无加载传送:设置角色状态(开始)");
    }
    TeleportController.GIo(false, i);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 29, "无加载传送:设置角色状态(完成)");
    }
    ModelManager_1.ModelManager.GameModeModel.IsTeleport = false;
    g.CreatePromise();
    e = new AsyncTask_1.AsyncTask("TeleportToPositionNoLoadingImpl", async () => {
      ModelManager_1.ModelManager.TeleportModel.NeedRestoreCamera = a;
      if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() || !!ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
        this.q3u();
        ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 11;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 29, "无加载传送:检测体素流送(开始)");
        }
        await this.NIo(true);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 29, "无加载传送:检测体素流送(完成)");
        }
        ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 12;
        ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 13;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 29, "无加载传送:检测场景流送(开始)");
        }
        await this.NIo();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 29, "无加载传送:检测场景流送(完成)");
        }
        ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 14;
      }
      ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("TeleportToPositionCommon");
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 15;
      ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(Protocol_1.Aki.Protocol.Nks.Proto_Normal);
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 16;
      if (_ && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 48, "无加载传送:通知服务器传送完成(开始)"), this.kIo(), await g.TeleportFinishRequest.Promise, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Teleport", 48, "无加载传送:通知服务器传送完成(完成)");
      }
      g.ResetPromise();
      g.TeleportEntityCreatureDataId = 0;
      g.IsTeleport = false;
      RoleAudioController_1.RoleAudioController.SetUpdateAudioDynamicTrace(true);
      WorldController_1.WorldController.SetEnableWorldOriginTickCheck(t, true);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "无加载传送:处理完成事件(开始)");
      }
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 1;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportComplete, l.TeleportCallSource);
      ModelManager_1.ModelManager.TeleportModel.NeedRestoreCamera = true;
      TeleportController.OIo(l.TeleportId);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "无加载传送:处理完成事件(完成)");
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "无加载传送:完成");
      }
      ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
      return true;
    });
    TaskSystem_1.TaskSystem.AddTask(e);
    TaskSystem_1.TaskSystem.Run();
    return e.Promise;
  }
  static async bIo(e, o) {
    const r = ModelManager_1.ModelManager.TeleportModel;
    if (r.IsTeleport) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Teleport", 39, "伪传送:无法调用,正在传送中", ["Reason", o]);
      }
      return false;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 39, "伪传送:开始", ["原因", e.TeleportReason], ["Reason", o]);
    }
    r.IsTeleport = true;
    ModelManager_1.ModelManager.CharacterModel.ExitAllSelfCenteredMode();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 57, "传送:慢放解除", ["Reason", o]);
    }
    var t = new AsyncTask_1.AsyncTask("FakeTeleportToPositionImpl", async () => {
      r.CreatePromise();
      if (e.TeleportReason === Protocol_1.Aki.Protocol.v4s.cVu) {
        await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(6);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "伪传送:通知服务器传送完成(开始)");
      }
      this.kIo();
      await r.TeleportFinishRequest.Promise;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotTeleportToPositionFinished);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "伪传送:通知服务器传送完成(完成)");
      }
      r.ResetPromise();
      r.IsTeleport = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "伪传送:完成", ["Reason", o]);
      }
      ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
      return true;
    });
    TaskSystem_1.TaskSystem.AddTask(t);
    TaskSystem_1.TaskSystem.Run();
    return t.Promise;
  }
  static async BIo(e, o, r, t, l, a = true, _ = 0) {
    if (!TeleportController.L3u(e, o, r, false, t, l, _)) {
      return false;
    }
    const n = ModelManager_1.ModelManager.TeleportModel;
    n.CreatePromise();
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 3;
    switch (l.TeleportReason) {
      case Protocol_1.Aki.Protocol.v4s.Proto_Fall:
        await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(0, n.TeleportMode);
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_Rouge:
      case Protocol_1.Aki.Protocol.v4s.Proto_AbyssTeleport:
        break;
      case Protocol_1.Aki.Protocol.v4s.SL_:
      case Protocol_1.Aki.Protocol.v4s.Xvs:
      case Protocol_1.Aki.Protocol.v4s.Proto_Transfer:
        if (l.Option) {
          switch (l.Option.p5n) {
            case Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4:
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Teleport", 45, "TransitionType.PlayMp4开始");
              }
              ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = false;
              if (l.Option.q$_.WNc) {
                ModelManager_1.ModelManager.GameModeModel.Mp4FadeOutScreenColor = l.Option.q$_.QNc?.$Nc === Protocol_1.Aki.Protocol.QNc.Proto_Mp4BackgroundColorWhite ? IAction_1.EMovieBackgroundType.White : IAction_1.EMovieBackgroundType.Black;
                await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(0, 3, 1, l.Option.q$_.QNc?.HNc === Protocol_1.Aki.Protocol.QNc.Proto_Mp4BackgroundColorWhite ? IAction_1.EFadeInScreenShowType.White : IAction_1.EFadeInScreenShowType.Black, false, false, undefined, true);
                ModelManager_1.ModelManager.GameModeModel.NeedOpenBlackScreenWhenTeleportDungeon = true;
              } else {
                ModelManager_1.ModelManager.GameModeModel.NeedOpenBlackScreenWhenTeleportDungeon = false;
              }
              await this.FIo(l.Option.q$_.y5n, () => {
                var e = Protocol_1.Aki.Protocol.D$_.create();
                e.x$_ = l.Option.q$_.y5n;
                Net_1.Net.Call(15815, e, e => {
                  if (!e || e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
                    if (Log_1.Log.CheckInfo()) {
                      Log_1.Log.Info("Teleport", 45, "播放CG完成请求失败", ["ErrorCode", e.Cvs]);
                    }
                  }
                  ModelManager_1.ModelManager.TeleportModel.CgTeleportCompleted?.SetResult(true);
                });
              }, l.TeleportReason === Protocol_1.Aki.Protocol.v4s.Xvs);
              break;
            case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Teleport", 45, "TransitionType.CenterText开始");
              }
              ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = false;
              this.TeleportWithCenterTextStart(l.Option.E5n);
              break;
            case Protocol_1.Aki.Protocol.p5n.Proto_PlayEffect:
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Teleport", 45, "TransitionType.PlayEffect开始");
              }
              if (l.Option.q$_.y5n !== "") {
                ResourceSystem_1.ResourceSystem.LoadAsync(l.Option.q$_.y5n, UE.EffectScreenPlayData_C, e => {
                  ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(e);
                }, 102);
              }
              break;
            case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Teleport", 50, "TransitionType.Seamless开始");
              }
              this.SeamlessTeleportPreStart();
              break;
            case Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen:
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Teleport", 45, "TransitionType.FadeInScreen开始");
              }
              ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen = true;
              ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = false;
              if (l.Option.EIl === 0) {
                ModelManager_1.ModelManager.GameModeModel.BlackScreenColor = IAction_1.EFadeInScreenShowType.White;
              } else {
                ModelManager_1.ModelManager.GameModeModel.BlackScreenColor = IAction_1.EFadeInScreenShowType.Black;
              }
              await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(7, 3, 1, ModelManager_1.ModelManager.GameModeModel.BlackScreenColor, false, false, undefined, true);
              break;
            case Protocol_1.Aki.Protocol.p5n.Proto_WithCharacterDisplay:
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Teleport", 7, "TransitionType.RoleLoading开始");
              }
              ModelManager_1.ModelManager.LoadingModel?.SetRoleLoadingConfig(l.Option.Th1?.bh1);
              await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, n.TeleportMode);
              break;
            case Protocol_1.Aki.Protocol.p5n.Proto_WithCustomLoading:
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Teleport", 71, "TransitionType.CustomLoading开始", ["id", l.Option.zed?.v9n]);
              }
              ModelManager_1.ModelManager.LoadingModel?.SetSpecifiedLoadingConfigId(l.Option.zed?.v9n);
              await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, n.TeleportMode);
              break;
            case Protocol_1.Aki.Protocol.p5n.Proto_WithSpine:
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Teleport", 87, "TransitionType.SpecialTransition开始");
              }
              await this.TeleportWithSpecialTransition(l.Option.BAd, "TeleportController");
              break;
            default:
              if (!ModelManager_1.ModelManager.TeleportModel.DisableAutoFade || ModelManager_1.ModelManager.TeleportModel.TeleportMode !== 3) {
                await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, n.TeleportMode);
              }
          }
        } else {
          if (ModelManager_1.ModelManager.TeleportModel.DisableAutoFade && ModelManager_1.ModelManager.TeleportModel.TeleportMode === 3) {
            break;
          }
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, n.TeleportMode);
        }
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle:
        if (l.Option && l.Option.p5n === Protocol_1.Aki.Protocol.p5n.Proto_CenterText) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 48, "TransitionType.CenterText开始");
          }
          await this.TeleportWithCenterTextStart(l.Option.E5n);
        } else if (l.Option && l.Option.p5n === Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen) {
          ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen = true;
          ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = false;
          if (l.Option.EIl === 0) {
            ModelManager_1.ModelManager.GameModeModel.BlackScreenColor = IAction_1.EFadeInScreenShowType.White;
          } else {
            ModelManager_1.ModelManager.GameModeModel.BlackScreenColor = IAction_1.EFadeInScreenShowType.Black;
          }
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(7, 3, 1, ModelManager_1.ModelManager.GameModeModel.BlackScreenColor, false, false, undefined, true);
        } else {
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, n.TeleportMode);
        }
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_GravityFlip:
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 31, "传送:重力翻转传送开始");
        }
        break;
      default:
        if (!ModelManager_1.ModelManager.TeleportModel.DisableAutoFade || ModelManager_1.ModelManager.TeleportModel.TeleportMode !== 3) {
          await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(6, n.TeleportMode);
        }
    }
    ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(GlobalData_1.GlobalData.World, t);
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 4;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 29, "传送:处理打开loading结束事件(开始)", ["Reason", t]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportOpenLoadingEnd);
    o = _ !== 0 ? ModelManager_1.ModelManager.CreatureModel?.GetEntity(_) : ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
    if (o?.Entity && ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(o)?.Valid) {
      EventSystem_1.EventSystem.EmitWithTarget(o.Entity, EventDefine_1.EEventName.TeleportOpenLoadingEnd);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 29, "传送:处理打开loading结束事件(完成)");
    }
    const i = ModelManager_1.ModelManager.TeleportModel.TeleportMode === 2 || ModelManager_1.ModelManager.TeleportModel.TeleportMode === 1;
    if (i) {
      ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
    }
    if (n.TeleportMode !== 4 && l.TeleportReason !== Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle) {
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
      if (n.TeleportMode === 4) {
        await this.SeamlessTeleportStart();
      }
      ModelManager_1.ModelManager.GameModeModel.StartIndependentStreaming(n.TargetPosition.ToUeVector());
      this.q3u();
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 11;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:检测体素流送(开始)");
      }
      if (i) {
        ControllerHolder_1.ControllerHolder.WorldController.ManuallyClearStreamingPool();
      }
      await this.HIo(true);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:检测体素流送(完成)");
      }
      cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CheckVoxelStreaming");
      cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.CheckStreaming");
      if (i) {
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
      if (i) {
        ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
        ControllerHolder_1.ControllerHolder.WorldController.ManuallyResetStreamingPool();
      }
      ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("TeleportToPositionCommon");
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 15;
      ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(Protocol_1.Aki.Protocol.Nks.Proto_Normal);
      await ControllerHolder_1.ControllerHolder.GameModeController.CheckRenderAssetsStreamingCompleted(e, "传送:");
      cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CheckRenderAssets");
      if (n.TeleportMode === 4) {
        await this.SeamlessTeleportPreEnd();
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
      if (n.TeleportMode !== 4 && l.TeleportReason !== Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle) {
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
      if (i) {
        ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FixBornLocation);
      if (l.TeleportReason !== Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 48, "传送:更新载具状态(开始)"), await ControllerHolder_1.ControllerHolder.VehicleController.UpdatePlayerVehiclePerform(), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Teleport", 48, "传送:更新载具状态(完成)");
      }
      if (l?.TeleportReason === Protocol_1.Aki.Protocol.v4s.Proto_BtRollbackFailed) {
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          ModelManager_1.ModelManager.TeleportModel.TeleportWaitRequest?.SetResult(true);
        }, DELAYCLOSETIME);
      } else {
        ModelManager_1.ModelManager.TeleportModel.TeleportWaitRequest?.SetResult(true);
      }
      await ModelManager_1.ModelManager.TeleportModel.TeleportWaitRequest?.Promise;
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 19;
      switch (l.TeleportReason) {
        case Protocol_1.Aki.Protocol.v4s.Proto_Fall:
          await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(0);
          break;
        case Protocol_1.Aki.Protocol.v4s.SL_:
        case Protocol_1.Aki.Protocol.v4s.Xvs:
        case Protocol_1.Aki.Protocol.v4s.Proto_Transfer:
          if (l.Option) {
            switch (l.Option.p5n) {
              case Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4:
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Teleport", 45, "传送:CG传送完成(开始)");
                }
                await n.CgTeleportCompleted?.Promise;
                await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(7);
                ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 = false;
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Teleport", 45, "传送:CG传送完成(完成)");
                }
                break;
              case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Teleport", 45, "传送:黑幕白字传送完成(开始)");
                }
                await n.CgTeleportCompleted?.Promise;
                await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(7);
                ModelManager_1.ModelManager.GameModeModel.UseShowCenterText = false;
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Teleport", 45, "传送:黑幕白字传送完成(完成)");
                }
                break;
              case Protocol_1.Aki.Protocol.p5n.Proto_PlayEffect:
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Teleport", 45, "TransitionType.PlayEffect结束");
                }
                break;
              case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
                await this.SeamlessTeleportEnd();
                break;
              case Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen:
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Teleport", 45, "传送:纯黑幕传送完成(开始)");
                }
                await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(7);
                ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen = false;
                ModelManager_1.ModelManager.GameModeModel.BlackScreenColor = IAction_1.EFadeInScreenShowType.Black;
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Teleport", 45, "传送:纯黑幕传送完成(完成)");
                }
                break;
              case Protocol_1.Aki.Protocol.p5n.Proto_WithSpine:
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Teleport", 87, "传送:特殊过渡效果传送完成(开始)");
                }
                await ControllerHolder_1.ControllerHolder.SpecialTransitionController.CloseSpecialTransitionLoading();
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Teleport", 87, "传送:特殊过渡效果传送完成(完成)");
                }
                break;
              default:
                await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(6);
            }
          } else {
            await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(6);
          }
          break;
        case Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle:
          if (l.Option && l.Option.p5n === Protocol_1.Aki.Protocol.p5n.Proto_CenterText) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Teleport", 48, "传送:黑幕白字传送完成(开始)");
            }
            await n.CgTeleportCompleted?.Promise;
            await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(7);
            ModelManager_1.ModelManager.GameModeModel.UseShowCenterText = false;
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Teleport", 48, "传送:黑幕白字传送完成(完成)");
            }
          } else if (l.Option && l.Option.p5n === Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Teleport", 79, "传送:黑幕白字传送完成(开始)");
            }
            await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(7);
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Teleport", 79, "传送:黑幕白字传送完成(完成)");
            }
          } else {
            await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(6);
          }
          break;
        case Protocol_1.Aki.Protocol.v4s.Proto_GravityFlip:
          CameraUtility_1.CameraUtility.ResetFocus();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 31, "传送:重力翻转传送完成");
          }
          break;
        default:
          await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(6);
      }
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 20;
      cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.CloseLoading");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:通知服务器前处理传送事件(开始)");
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BeforeTeleportComplete);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:通知服务器前处理传送事件(完成)");
      }
      if (a) {
        cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.TeleportFinishRequest");
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 29, "传送:通知服务器传送完成(开始)");
        }
        this.kIo();
        await n.TeleportFinishRequest.Promise;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 29, "传送:通知服务器传送完成(完成)");
        }
        cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.TeleportFinishRequest");
      }
      cpp_1.FKuroPerfSightHelper.BeginExtTag("Teleport.TeleportFinish");
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
      ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = true;
      n.IsTeleport = false;
      TeleportController.OIo(l.TeleportId);
      n.ResetPromise();
      WorldController_1.WorldController.SetEnableWorldOriginTickCheck(t, true);
      PerfSightController_1.PerfSightController.MarkLevelLoadCompleted();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 29, "传送:处理完成事件(开始)");
      }
      ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 1;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotTeleportToPositionFinished);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportComplete, l.TeleportCallSource, l.TeleportReason);
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
      ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TeleportAfterComplete);
      cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport.TeleportFinish");
      cpp_1.FKuroPerfSightHelper.EndExtTag("Teleport");
      return true;
    });
    TaskSystem_1.TaskSystem.AddTask(r);
    TaskSystem_1.TaskSystem.Run();
    return r.Promise;
  }
  static L3u(e, o, r, t, l, a, _ = 0) {
    var n = ModelManager_1.ModelManager.TeleportModel;
    if (n.IsTeleport) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Teleport", 29, "重复调用传送接口, 当前正在传送中", ["Reason", l]);
      }
      return false;
    }
    n.TeleportEntityCreatureDataId = _;
    let i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    let g = undefined;
    if (i = _ !== 0 ? ModelManager_1.ModelManager.CreatureModel.GetEntity(_) : i) {
      g = ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(i);
    }
    n.CallSource = a.TeleportCallSource;
    if (g?.Valid) {
      n.StartPosition.DeepCopy(g.ActorLocationProxy);
      n.StartRotation.DeepCopy(g.ActorRotationProxy);
      n.StartGravityDirect.DeepCopy(g.ActorGravityDirectProxy);
    }
    n.TargetPosition.DeepCopy(e);
    if (r) {
      n.TargetGravityDirect.DeepCopy(r);
    } else {
      n.TargetGravityDirect.DeepCopy(g?.ActorGravityDirectProxy ?? Vector_1.Vector.DownVectorProxy);
    }
    if (!n.TargetGravityDirect.Normalize()) {
      n.TargetGravityDirect.DeepCopy(Vector_1.Vector.DownVectorProxy);
    }
    if (MathUtils_1.MathUtils.IsNearlyEqual(n.TargetGravityDirect.Z, -1) && n.TargetGravityDirect.Inequality(Vector_1.Vector.DownVectorProxy)) {
      n.TargetGravityDirect.DeepCopy(Vector_1.Vector.DownVectorProxy);
    }
    if (o) {
      n.TargetRotation.DeepCopy(o);
    } else if (g?.Valid) {
      Quat_1.Quat.FindBetween(g.ActorGravityDirectProxy, n.TargetGravityDirect, MathUtils_1.MathUtils.CommonTempQuat);
      _ = Quat_1.Quat.Create();
      MathUtils_1.MathUtils.CommonTempQuat.Multiply(g.ActorRotationProxy.Quaternion(), _);
      _.Rotator(n.TargetRotation);
    } else {
      n.TargetRotation.Reset();
    }
    r = n.TargetGravityDirect.Multiply(-1, Vector_1.Vector.Create());
    n.TargetRotation.Quaternion().GetForwardVector(MathUtils_1.MathUtils.CommonTempVector);
    MathUtils_1.MathUtils.LookRotationUpFirst(MathUtils_1.MathUtils.CommonTempVector, r, n.TargetRotation);
    ModelManager_1.ModelManager.CharacterModel.ExitAllSelfCenteredMode();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 57, "传送:慢放解除", ["Reason", l]);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 29, "传送:开始", ["传送实体", n.TeleportEntityCreatureDataId], ["开始位置", n.StartPosition], ["目标位置", n.TargetPosition], ["开始旋转", n.StartRotation], ["目标旋转", n.TargetRotation], ["开始重力方向", n.StartGravityDirect], ["目标重力方向", n.TargetGravityDirect], ["原因", a.TeleportReason], ["传送类型", a.CtxType], ["Reason", l]);
    }
    n.IsTeleport = true;
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
    if (g?.Valid) {
      EventSystem_1.EventSystem.EmitWithTarget(i.Entity, EventDefine_1.EEventName.TeleportStartEntity, true);
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
  static async NIo(e = false) {
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
      if (e) {
        UE.NewSet(UE.BuiltinName).Add(WorldDefine_1.voxelGridName);
      } else {
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
  static kIo() {
    var e = new Protocol_1.Aki.Protocol.pCs();
    Net_1.Net.Call(15195, e, e => {
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
          o.Entity.GetComponent(178)?.MainAnimInstance?.SyncAnimStates(undefined);
          r.SetInputRotator(_.TargetRotation);
          r.SetActorRotation(_.TargetRotation.ToUeRotator(), "TeleportController", false);
          r.MoveComp?.SetGravityDirectWithoutRotate(_.TargetGravityDirect);
          o.Entity.GetComponent(176)?.ResetCharState();
          r.TeleportAndFindStandLocation(_.TargetPosition);
          CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator());
          CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(e);
        } else {
          o?.Entity?.GetComponent(178)?.StopModelBuffer();
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
        if (_.CallSource === 1) {
          DeadReviveController_1.DeadReviveController.PlayerReviveEnded();
        }
        o.Entity.GetComponent(192)?.ResetDrowning();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 29, "传送:失败,找不到当前实体");
      }
    }
  }
  static KIo(e) {
    var o;
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() || Global_1.Global.BaseCharacter?.IsValid() && (o = Global_1.Global.BaseCharacter.CharacterActorComponent, o = UE.VectorDouble.Dist(o.ActorLocation, e), e = CommonParamById_1.configCommonParamById.GetIntConfig("TeleportRatingRange") ? CommonParamById_1.configCommonParamById.GetIntConfig("TeleportRatingRange") : DISTANCE_THRESHOLD_1, Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 45, "QueryDefaultTeleportMode", ["threshold", e]), o < e)) {
      return 3;
    } else {
      return 2;
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
  static async FIo(e, o, r = false) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 45, "传送:CG传送开始(视频)");
    }
    ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 = true;
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(18, 5, e, o, r);
  }
  static async TeleportWithCenterTextStart(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 45, "传送:CG传送开始(黑幕白字)");
    }
    ModelManager_1.ModelManager.GameModeModel.UseShowCenterText = true;
    if (e) {
      ModelManager_1.ModelManager.PlotModel.PlayFlow = new PlotData_1.PlotFlow(e.v5n, e.M5n, e.S5n);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 45, "transitionFlow为空");
    }
    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(7, 0);
    ModelManager_1.ModelManager.PlotModel.ShowCenterTextForTeleport();
  }
  static SeamlessTeleportPreStart() {
    const r = ModelManager_1.ModelManager.TeleportModel;
    r.IsInSeamlessTeleport = true;
    const e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
    r.UseTreadmill = false;
    r.UseKeepMovementMode = false;
    if (r.SeamlessConfig?.LeastTime) {
      r.UseTreadmill = true;
    }
    let o = undefined;
    let t = undefined;
    if (r.SeamlessConfig?.KeepMovementStateFeatures?.KeepKite && (l = e.GetComponent(100))?.GetIsHooking() && l.GetCurrentTarget()?.GetHookInteractType() === "KiteHook") {
      r.UseTreadmill = false;
      r.UseKeepKite = true;
      r.UseKeepMovementMode = true;
      o = 6;
      t = CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_KITE;
    }
    if (!r.UseKeepMovementMode) {
      if (l = SeamlessTravelKeepMovementMode_1.SeamlessTravelKeepMovementMode.GetCurrentKeepableMovementMode(r.SeamlessConfig)) {
        r.UseTreadmill = false;
        r.UseKeepMovementMode = true;
        o = l[0];
        t = l[1];
      }
    }
    if (r.UseTreadmill) {
      r.Treadmill = new SeamlessTravelTreadmill_1.SeamlessTravelTreadmill();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "传送:地板资产加载(开始)");
      }
      r.Treadmill.Init(r.SeamlessConfig, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:地板资产加载(完成)");
        }
        r.TreadmillLoaded?.SetResult(e);
        e = Vector_1.Vector.Create();
        if (r.SeamlessConfig?.IsTeleportInPlace) {
          e.DeepCopy(r.StartPosition);
        } else {
          e.DeepCopy(r.TargetPosition);
          e.Z += SeamlessTravelTreadmill_1.DEFAULT_SEAMLESS_TRANSITION_HEIGHT;
        }
        r.Treadmill.ResetLockOnLocation(e, r.StartGravityDirect);
      });
    }
    if (r.UseKeepKite) {
      const a = e.GetComponent(100);
      var l = a.GetCurrentTargetEntity().Entity;
      r.KeepKite = new SeamlessTravelKeepKite_1.SeamlessTravelKeepKite();
      r.KeepKite.SetInitData(l, e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SeamlessTravel", 39, "传送:风筝资产加载(开始)");
      }
      r.KeepKite.Init(r.SeamlessConfig, o => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SeamlessTravel", 39, "传送:风筝资产加载(完成)");
        }
        if (a?.GetIsHooking() && a.GetCurrentTarget()?.GetHookInteractType() === "KiteHook") {
          a.GetCurrentTargetEntity().Entity?.Disable("传送隐藏风筝声骸");
          a.SetIsHookEndByInterrupt(true);
          e?.GetComponent(40)?.EndSkill(210130, "传送停止勾风筝技能");
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SeamlessTravel", 50, "传送:伪风筝显形(开始)");
        }
        r.KeepKite?.AppearEffect(e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("SeamlessTravel", 50, "传送:伪风筝显形(完成)");
          }
          r.KiteAppeared?.SetResult(o);
        });
      });
    }
    if (r.UseKeepMovementMode) {
      r.KeepMovementMode = new SeamlessTravelKeepMovementMode_1.SeamlessTravelKeepMovementMode();
      r.KeepMovementMode.SetInitDataWithTargetMode(o, t);
      r.KeepMovementMode.Init(r.SeamlessConfig, () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 50, "传送:保持运动模式开始");
        }
        r.KeepMovementMode?.AppearEffect();
      });
    }
    if (r.SeamlessConfig?.TransitionWeatherDaPath) {
      r.PostProcess = new SeamlessTravelPostProcess_1.SeamlessTravelPostProcess();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "传送:后处理资产加载(开始)");
      }
      r.PostProcess.Init(r.SeamlessConfig, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:后处理资产加载(完成)");
        }
        if (e) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 50, "传送:后处理混入(开始)");
          }
          r.PostProcess?.AppearEffect(e => {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Teleport", 50, "传送:后处理混入(完成)");
            }
            r.PostProcessBlendedIn?.SetResult(e);
          });
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Teleport", 39, "传送:后处理资产加载(失败)");
          }
          r.PostProcessBlendedIn?.SetResult(false);
        }
      });
    }
    if (r.SeamlessConfig?.EffectPath) {
      r.ScreenEffect = new SeamlessTravelScreenEffect_1.SeamlessTravelScreenEffect();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "传送:屏幕特效资产加载(开始)");
      }
      r.ScreenEffect.Init(r.SeamlessConfig, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:屏幕特效资产加载(完成)");
        }
        if (e) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 39, "传送:屏幕特效Start(开始)");
          }
          r.ScreenEffect?.AppearEffect(e => {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Teleport", 39, "传送:屏幕特效Start(完成)");
            }
            r.ScreenEffectStarted.SetResult(e);
          });
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Teleport", 39, "传送:屏幕特效资产加载(失败)");
          }
          r.ScreenEffectStarted.SetResult(false);
        }
      });
    }
    if (r.SeamlessConfig?.SceneEffectDaPath) {
      r.SceneEffect = new SeamlessTravelSceneEffect_1.SeamlessTravelSceneEffect();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 39, "传送:场景特效资产加载(开始)");
      }
      r.SceneEffect.Init(r.SeamlessConfig, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:场景特效资产加载(完成)");
        }
        if (e) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 39, "传送:场景特效Start(开始)");
          }
          r.SceneEffect?.AppearEffect(e => {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Teleport", 39, "传送:场景特效Start(完成)");
            }
            r.SceneEffectStarted.SetResult(e);
          });
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Teleport", 39, "传送:场景特效资产加载(失败)");
          }
          r.SceneEffectStarted.SetResult(false);
        }
      });
    }
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(4, [12, 23]);
  }
  static async SeamlessTeleportStart() {
    const r = ModelManager_1.ModelManager.TeleportModel;
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
    if (r.SeamlessConfig?.EffectPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 50, "传送:等待屏幕特效Start(开始)"), await r.ScreenEffectStarted.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 50, "传送:等待屏幕特效Start(完成)");
    }
    if (r.SeamlessConfig?.SceneEffectDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 50, "传送:等待场景特效Start(开始)"), await r.SceneEffectStarted.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 50, "传送:等待场景特效Start(完成)");
    }
    if (r.SeamlessConfig?.TransitionWeatherDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "传送:等待后处理混入(开始)"), await r.PostProcessBlendedIn.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 39, "传送:等待后处理混入(完成)");
    }
    if (r.UseKeepKite && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "传送:等待风筝出现(开始)"), await r.KiteAppeared.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 39, "传送:等待风筝出现(完成)");
    }
    const t = () => {
      var e = r.SeamlessConfig.LeastTime * MathUtils_1.MathUtils.SecondToMillisecond;
      if (e < TimerSystem_1.MIN_TIME) {
        r.LeastTimeFinished?.SetResult(true);
      } else {
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          r.LeastTimeFinished?.SetResult(true);
        }, e);
      }
    };
    if (r.UseTreadmill) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 50, "传送:等待地板资产加载完成(开始)");
      }
      await r.TreadmillLoaded.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 50, "传送:等待地板资产加载完成(完成)");
      }
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 50, "传送:地板显形(开始)");
        }
        r.Treadmill.AppearEffect(() => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 50, "传送:地板显形(完成)");
          }
          r.TreadmillAppeared?.SetResult(true);
          t();
        });
        var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(3);
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(178)?.StopModelBuffer();
        var o = Vector_1.Vector.Create();
        r.Treadmill.GetLockOnLocation(o);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "无缝传送:计算中间场景信息", ["角色中间位置", o], ["角色当前旋转", e.ActorRotationProxy], ["相机当前旋转", CameraController_1.CameraController.FightCamera.LogicComponent.CameraRotation]);
        }
        e.TeleportAndFindStandLocation(o);
        CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(false, true);
      });
    } else {
      t();
    }
  }
  static async SeamlessTeleportPreEnd() {
    const e = ModelManager_1.ModelManager.TeleportModel;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 50, "传送:等待过渡最小停留时长(开始)");
    }
    await e.LeastTimeFinished.Promise;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 50, "传送:等待过渡最小停留时长(完成)");
    }
    if (e.UseTreadmill && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 50, "传送:地板隐形(开始)"), e.Treadmill.DisappearEffect(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 50, "传送:地板隐形(完成)");
      }
      e.TreadmillDisappeared.SetResult(true);
    }), Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 50, "传送:等待地板隐形(开始)"), await e.TreadmillDisappeared.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Teleport", 50, "传送:等待地板隐形(完成)");
    }
  }
  static async SeamlessTeleportEnd() {
    const o = ModelManager_1.ModelManager.TeleportModel;
    if (o.IsInSeamlessTeleport) {
      if (o.SeamlessConfig?.EffectPath) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:屏幕特效结束(开始)");
        }
        o.ScreenEffect?.DisappearEffect(e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 39, "传送:屏幕特效结束(完成)");
          }
          o.ScreenEffectEnded?.SetResult(e);
        });
      }
      if (o.SeamlessConfig?.SceneEffectDaPath) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:屏幕特效结束(开始)");
        }
        o.SceneEffect?.DisappearEffect(e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 39, "传送:屏幕特效结束(完成)");
          }
          o.SceneEffectEnded?.SetResult(e);
        });
      }
      if (o.SeamlessConfig?.TransitionWeatherDaPath) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 50, "传送:后处理混出(开始)");
        }
        o.PostProcess?.DisappearEffect(e => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Teleport", 50, "传送:后处理混出(完成)");
          }
          o.PostProcessBlendedOut?.SetResult(e);
        });
      }
      if (o.SeamlessConfig?.TransitionWeatherDaPath && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Teleport", 39, "传送:等待后处理混出(开始)"), await o.PostProcessBlendedOut.Promise, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Teleport", 39, "传送:等待后处理混出(完成)");
      }
      if (o.SeamlessConfig?.EffectPath) {
        await o.ScreenEffectEnded?.Promise;
      }
      if (o.SeamlessConfig?.SceneEffectDaPath) {
        await o.SceneEffectEnded?.Promise;
      }
      if (o.UseKeepKite) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 39, "传送:保持风筝关闭");
        }
        o.KeepKite?.DisappearEffect();
      }
      if (o.UseKeepMovementMode) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Teleport", 39, "传送:保持运动模式关闭");
        }
        o.KeepMovementMode?.DisappearEffect();
      }
      this.FinishSeamlessTeleport();
    }
  }
  static FinishSeamlessTeleport() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SeamlessTravelFinishBeforeShowUI);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(4);
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
    var e = ModelManager_1.ModelManager.TeleportModel;
    if (e.IsInSeamlessTeleport) {
      e.Treadmill?.Destroy();
      e.Treadmill = undefined;
      e.PostProcess?.Destroy();
      e.PostProcess = undefined;
      e.ScreenEffect?.Destroy();
      e.ScreenEffect = undefined;
      e.SceneEffect?.Destroy();
      e.SceneEffect = undefined;
      e.KeepKite?.Destroy();
      e.KeepKite = undefined;
      e.KeepMovementMode?.Destroy();
      e.KeepMovementMode = undefined;
      e.UseTreadmill = false;
      e.UseKeepKite = false;
      e.UseKeepMovementMode = false;
      e.SeamlessEndHandle = undefined;
      e.IsInSeamlessTeleport = false;
      e.SeamlessConfig = undefined;
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
    }
  }
  static ParseTeleportTransitionOptionToPb(e) {
    var o;
    var r = Protocol_1.Aki.Protocol.t4s.create();
    switch (e?.Type) {
      case IAction_1.ETeleportTransitionType.PlayMp4:
        r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_PlayMp4;
        r.q$_.y5n = e.Mp4Path;
        break;
      case IAction_1.ETeleportTransitionType.PlayEffect:
        r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_PlayEffect;
        r.q$_.y5n = e.EffectDaPath;
        break;
      case IAction_1.ETeleportTransitionType.CenterText:
        r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_CenterText;
        r.E5n = Protocol_1.Aki.Protocol.M4s.create();
        r.E5n.M5n = e.CenterTextFlow.FlowId;
        r.E5n.v5n = e.CenterTextFlow.FlowListName;
        r.E5n.S5n = e.CenterTextFlow.StateId;
        break;
      case IAction_1.ETeleportTransitionType.Seamless:
        r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_Seamless;
        r.R$s = Protocol_1.Aki.Protocol.w$s.create();
        r.R$s.ra1 = !!e.IsTeleportInPlace;
        r.R$s.oa1 = e.TransitionWeatherDaPath;
        r.R$s.D$s = e.EffectDaPath;
        r.R$s.A$s = e.LeastTime;
        r.R$s.U$s = e.EffectExpandTime;
        r.R$s.P$s = e.EffectCollapseTime;
        r.R$s.ra1 = !!e.IsTeleportInPlace;
        r.R$s.cta = !!e.FloorSettings;
        if (e.FloorSettings) {
          (o = Protocol_1.Aki.Protocol.Eta.create()).Cta = e.FloorSettings.MaterialPath;
          o.mta = e.FloorSettings.MeshPath;
          o.gta = e.FloorSettings.Scale.X ?? 1;
          o.fta = e.FloorSettings.Scale.Y ?? 1;
          o.vta = e.FloorSettings.ShowTime;
          o.pta = e.FloorSettings.DisappearTime;
          r.R$s.dta = o;
        }
        if (e.KeepMovementStates?.length) {
          var t = [];
          for (const l of e.KeepMovementStates) {
            if (l === "Kite") {
              t.push(Protocol_1.Aki.Protocol.xG1.Proto_Kite);
            }
          }
          r.R$s.PG1 = t;
        }
        break;
      case IAction_1.ETeleportTransitionType.FadeInScreen:
        r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen;
        r.EIl = e.ScreenType === IAction_1.EFadeInScreenShowType.Black ? 1 : 0;
        break;
      case IAction_1.ETeleportTransitionType.CustomScreen:
        this.nBd(r, e);
        break;
      default:
        r.p5n = Protocol_1.Aki.Protocol.p5n.Proto_Empty;
    }
    return r;
  }
  static TeleportVehicle(e, o, r, t, l = false, a = undefined, _ = undefined) {
    if (o) {
      o = new TeleportDefine_1.TeleportContext(a, undefined, 0, undefined, _);
      if (l && this.QueryCanTeleportNoLoading(r)) {
        TeleportController.wIo(r, t.ToUeRotator(), undefined, "TeleportVehicle", o, true, true, e);
      } else {
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
        TeleportController.BIo(r, t.ToUeRotator(), undefined, "TeleportVehicle", o, true, e);
      }
    } else {
      this.Fkl(e, r, t, Vector_1.Vector.DownVectorProxy);
    }
  }
  static async TeleportElevator(e, o, r, t = undefined) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    return !!e && (e = e.CreatureDataId, o ? (o = new TeleportDefine_1.TeleportContext(undefined, undefined, 0), ModelManager_1.ModelManager.TeleportModel.TeleportMode = 4, TeleportController.wIo(r, t?.ToUeRotator(), undefined, "TeleportElevator", o, true, false, e, false)) : (this.Fkl(e, r, t ?? Rotator_1.Rotator.Create(0, 0, 0), Vector_1.Vector.DownVectorProxy), true));
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
  static K8c(e, o, r) {
    switch (e.p5n) {
      case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 0;
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 4;
        if (ModelManager_1.ModelManager.TeleportModel.SeamlessEndHandle) {
          TimerSystem_1.GameplayTimerSystem.Remove(ModelManager_1.ModelManager.TeleportModel.SeamlessEndHandle);
          ModelManager_1.ModelManager.TeleportModel.SeamlessEndHandle = undefined;
        }
        ModelManager_1.ModelManager.TeleportModel.SeamlessConfig = new SeamlessTravelDefine_1.SeamlessTravelContext();
        ModelManager_1.ModelManager.TeleportModel.SeamlessConfig.ParseConfig(o.Option.R$s);
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_WithCharacterDisplay:
      case Protocol_1.Aki.Protocol.p5n.Proto_WithCustomLoading:
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
        break;
      case Protocol_1.Aki.Protocol.p5n.Proto_WithSpine:
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 6;
        break;
      default:
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = this.KIo(r);
    }
  }
  static nBd(e, o) {
    e.p5n = Protocol_1.Aki.Protocol.p5n.Proto_WithSpine;
    e.BAd = Protocol_1.Aki.Protocol.BAd.create();
    e.BAd.kAd = Protocol_1.Aki.Protocol.kAd.create();
    if (o.ScreenType.Type === IAction_1.ECustomScreenType.Spine) {
      (e.BAd.kAd.FAd = Protocol_1.Aki.Protocol.FAd.create()).VAd = o.ScreenType.SpineId;
    } else if (o.ScreenType.Type === IAction_1.ECustomScreenType.BackgroundImage) {
      (e.BAd.kAd.NAd = Protocol_1.Aki.Protocol.NAd.create()).jAd = o.ScreenType.BackgroundImagePath;
    }
    if (o.FadeInEffect) {
      e.BAd.OAd = Protocol_1.Aki.Protocol.OAd.create();
    }
    if (o.FadeOutEffect) {
      e.BAd.qAd = Protocol_1.Aki.Protocol.qAd.create();
    }
    if (o.KeepTime) {
      e.BAd.Zps = o.KeepTime;
    }
    if (o.CustomShowUi) {
      e.BAd.GAd = Protocol_1.Aki.Protocol.GAd.create();
    }
  }
  static async TeleportWithSpecialTransition(e, o) {
    if (e) {
      try {
        await ControllerHolder_1.ControllerHolder.SpecialTransitionController.OpenSpecialTransitionLoadingByTeleportPb(e);
      } catch (e) {
        if (e instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Teleport", 87, "TeleportWithSpecialTransition执行异常", e, ["error", e.message], ["tag", o]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Teleport", 87, "TeleportWithSpecialTransition执行异常", ["error", e], ["tag", o]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Teleport", 87, "TransitionWithSpineLoadingPb为空", ["tag", o]);
    }
  }
}
exports.TeleportController = TeleportController;
(_a = TeleportController).jIo = 0;
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
  ModelManager_1.ModelManager.TeleportModel.DisableAutoFade = e.FI_;
  var t = ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId;
  var l = new TeleportDefine_1.TeleportContext(e.x9n, t, undefined, o ? o.fvs : undefined, r);
  const a = e.l9_ ? Vector_1.Vector.Create(e.l9_).ToUeVector() : Vector_1.Vector.ZeroVectorDouble;
  var t = e.g8n ? Rotator_1.Rotator.Create(e.g8n.Y, e.g8n.Z, e.g8n.X).ToUeRotator() : Rotator_1.Rotator.ZeroRotator;
  var _ = e.ZE_ ? Vector_1.Vector.Create(e.ZE_) : Vector_1.Vector.DownVectorProxy;
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
      Log_1.Log.Debug("Teleport", 29, "传送: 传送中，缓存TeleportNotify", ["被缓存传送的传送原因", l.TeleportReason]);
    }
  } else {
    TeleportController.xIo = undefined;
    switch (l.TeleportReason) {
      case Protocol_1.Aki.Protocol.v4s.SL_:
      case Protocol_1.Aki.Protocol.v4s.Xvs:
        if (r && r.p5n !== 0) {
          _a.K8c(r, l, a);
        } else {
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = _a.KIo(a);
        }
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_Transfer:
        if (r && r.p5n !== 0) {
          _a.K8c(r, l, a);
        } else {
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
        }
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_BtRollbackFailed:
        if (r?.p5n === Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen) {
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = 3;
        } else {
          ModelManager_1.ModelManager.TeleportModel.TeleportMode = _a.KIo(a);
        }
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_Drown:
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2;
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_Fall:
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 3;
        break;
      case Protocol_1.Aki.Protocol.v4s.Proto_FlowStart:
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2;
        break;
      default:
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
    }
    WorldController_1.WorldController.StartWorldOriginInLoadingMode("Teleport");
    TeleportController.TeleportToPosition(a, t, _, "OnTeleportNotify", l).finally(() => {
      ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
      WorldController_1.WorldController.EndWorldOriginInLoadingMode("Teleport", a);
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
  var e = Protocol_1.Aki.Protocol.D$_.create();
  e.x$_ = o.x$_;
  if (!e.x$_) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Teleport", 45, "收到的CG名称不存在", ["Name", o.x$_]);
    }
  }
  LevelLoadingController_1.LevelLoadingController.OpenLoading(7, 2);
  _a.FIo(o.x$_, () => {
    var e = Protocol_1.Aki.Protocol.D$_.create();
    e.x$_ = o.x$_;
    Net_1.Net.Call(15815, e, e => {
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
  });
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
    _a.TeleportVehicle(o, r, t, l, e.$I_, e.x9n, e.f5n);
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Teleport", 18, "传送载具：目标位置错误");
  }
}; //# sourceMappingURL=TeleportController.js.map