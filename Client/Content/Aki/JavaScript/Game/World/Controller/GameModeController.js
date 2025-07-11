"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameModeController = exports.LOG_STREAMING_STUCK_INTERVAL = undefined;
const cpp_1 = require("cpp");
const cpp_2 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Application_1 = require("../../../Core/Application/Application");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const LogProfiler_1 = require("../../../Core/Common/LogProfiler");
const Stats_1 = require("../../../Core/Common/Stats");
const Time_1 = require("../../../Core/Common/Time");
const AreaMpcById_1 = require("../../../Core/Define/ConfigQuery/AreaMpcById");
const DataLayerConfigById_1 = require("../../../Core/Define/ConfigQuery/DataLayerConfigById");
const InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const BaseConfigModel_1 = require("../../../Launcher/BaseConfig/BaseConfigModel");
const CloudGameManagerLauncher_1 = require("../../../Launcher/Platform/CloudGameManagerLauncher");
const ThinkDataLaunchReporter_1 = require("../../../Launcher/ThinkDataReport/ThinkDataLaunchReporter");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const LevelEventLockInputState_1 = require("../../LevelGamePlay/LevelEventLockInputState");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const BattleUiControl_1 = require("../../Module/BattleUi/BattleUiControl");
const BlackScreenController_1 = require("../../Module/BlackScreen/BlackScreenController");
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
const ExploreProgressDefine_1 = require("../../Module/ExploreProgress/ExploreProgressDefine");
const LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController");
const LoadingController_1 = require("../../Module/Loading/LoadingController");
const Heartbeat_1 = require("../../Module/Login/Heartbeat");
const LogReportController_1 = require("../../Module/LogReport/LogReportController");
const LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine");
const SeamlessTravelController_1 = require("../../Module/SeamlessTravel/SeamlessTravelController");
const TeleportController_1 = require("../../Module/Teleport/TeleportController");
const RoleAudioController_1 = require("../../NewWorld/Character/Role/RoleAudioController");
const PerfSightController_1 = require("../../PerfSight/PerfSightController");
const PreloadDefine_1 = require("../../Preload/PreloadDefine");
const RenderModuleController_1 = require("../../Render/Manager/RenderModuleController");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const LguiEventSystemManager_1 = require("../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiManager_1 = require("../../Ui/UiManager");
const ELoadingPhase_1 = require("../Define/ELoadingPhase");
const GameModePromise_1 = require("../Define/GameModePromise");
const WorldDefine_1 = require("../Define/WorldDefine");
const AsyncTask_1 = require("../Task/AsyncTask");
const LoadGroup_1 = require("../Task/LoadGroup");
const TaskSystem_1 = require("../Task/TaskSystem");
const WorldGlobal_1 = require("../WorldGlobal");
const PreloadController_1 = require("./PreloadController");
const PreloadControllerNew_1 = require("./PreloadControllerNew");
const WorldController_1 = require("./WorldController");
const TOP_CONSUMING_COUNT = 20;
const ONE_SECOND = 1000;
const GAME_MODE_CTRL_THINKING_INDEX = 21;
const LOW_MEMORY_AREA_ID = 33;
exports.LOG_STREAMING_STUCK_INTERVAL = 60000;
const cellProgress = (0, puerts_1.$ref)(0);
class GameModeController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    if (Info_1.Info.IsMobilePlatform() || Info_1.Info.IsGamepadPlatform()) {
      Application_1.Application.AddApplicationHandler(0, GameModeController.hra);
      Application_1.Application.AddApplicationHandler(1, GameModeController.Oje);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.uMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SlowStreamingBySoar, this.qJl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeArea, this.Hje);
    if (UE.KuroStaticLibrary.IsWithEditor()) {
      this._gr();
    }
    return true;
  }
  static OnClear() {
    if (Info_1.Info.IsMobilePlatform() || Info_1.Info.IsGamepadPlatform()) {
      Application_1.Application.RemoveApplicationHandler(0, GameModeController.hra);
      Application_1.Application.RemoveApplicationHandler(1, GameModeController.Oje);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, this.uMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SlowStreamingBySoar, this.qJl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeArea, this.Hje);
    this.Kta();
    return true;
  }
  static SetGameModeData(e, o) {
    var a;
    var r = ModelManager_1.ModelManager.GameModeModel;
    var t = InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e);
    if (t) {
      if (a = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapSourceConfig(t.MapConfigId)) {
        r.HasGameModeData = true;
        r.MapPath = a.MapPath.toString();
        r.IsMulti = o === Protocol_1.Aki.Protocol.e4s.Proto_Multi;
        r.Mode = o;
        r.InstanceType = t.InstType;
        r.MapConfig = a;
        r.MapId = t.MapConfigId ?? 0;
        r.LoadMapMode = a.LoadMapMode;
        r.SetInstanceDungeon(e);
        if (!Info_1.Info.IsBuildDevelopmentOrDebug) {
          ModelManager_1.ModelManager.CreatureModel.EnableEntityLog = r.InstanceType !== Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance;
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSetGameModeDataDone);
        return true;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 3, "[WorldGlobal.LoadMapFromInstanceDungeon] 不存在Id", ["MapConfigId", t.MapConfigId]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[GameModeController.InitGameModeData] 不存在副本表id:", ["id", e]);
      }
      return false;
    }
  }
  static async Load(r) {
    const t = ModelManager_1.ModelManager.GameModeModel;
    var e = t.Mode;
    const n = t.InstanceDungeon;
    var o = t.MapConfig;
    t.RenderAssetDone = false;
    t.EndDataLayerChange();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 3, "加载场景:开始", ["SceneMode", e], ["副本Id", n.Id], ["地图", o.MapId], ["MapPath", o.MapPath], ["出生点位置", t.BornLocation], ["出生点旋转", t.BornRotator], ["LoadingPhase", t.LoadingPhase]);
    }
    if (t.BornLocation) {
      if (t.BornRotator) {
        this.m6("GameModeController.Load: Start");
        t.LoadWorldProfiler.Restart();
        t.CreatePromise();
        const l = ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel;
        e = new AsyncTask_1.AsyncTask("GameModeController.Load", async () => {
          ModelManager_1.ModelManager.GameModeModel.OpenLoadingProfiler.Restart();
          t.LoadingPhase = 3;
          PerfSightController_1.PerfSightController.StartPersistentOrDungeon();
          cpp_1.FKuroPerfSightHelper.BeginExtTag("Load");
          cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.OpenLoading");
          LoadingController_1.LoadingController.SetProgress(0, undefined, 1, true);
          WorldController_1.WorldController.StartWorldOriginInLoadingMode("JoinScene");
          this.m6("GameModeController.Load:OpenLoading Start");
          await GameModeController.OpenLoading();
          this.m6("GameModeController.Load:OpenLoading End");
          t.LoadingPhase = 4;
          cpp_1.FKuroPerfSightHelper.EndExtTag("Load.OpenLoading");
          ModelManager_1.ModelManager.GameModeModel.OpenLoadingProfiler.Stop();
          if (ModelManager_1.ModelManager.QuestResourceModel.IsSeparateVideo && (Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 38, "开始检查任务资源"), ModelManager_1.ModelManager.QuestResourceModel.NeedCheckQuestResource() && (await ModelManager_1.ModelManager.QuestResourceModel.CheckQuestResource()), ModelManager_1.ModelManager.QuestResourceModel.UpdateServerQuestState(), Log_1.Log.CheckInfo())) {
            Log_1.Log.Info("QuestResource", 38, "完成检查任务资源");
          }
          t.OpenLevelProfiler.Restart();
          cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.OpenLevel");
          t.LoadingPhase = 5;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BeforeLoadMap);
          this.m6("GameModeController.Load:SetLoadModeInLoading Start");
          ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(GlobalData_1.GlobalData.World, "GameModeController.Load");
          this.m6("GameModeController.Load:SetLoadModeInLoading End");
          UE.Actor.SetKuroNetMode(1);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 10, "加载场景:暂停网络消息处理并缓存");
          }
          Net_1.Net.PauseAllNotifyCallback();
          UiManager_1.UiManager.LockOpen();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 3, "加载场景:加载地图(开始)");
          }
          ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("GameModeController.Load");
          this.m6("GameModeController.Load:OpenLevel Start");
          if (ModelManager_1.ModelManager.GameModeModel.IsSilentLogin) {
            if (GlobalData_1.GlobalData.IsRunWithEditorStartConfig()) {
              WorldGlobal_1.WorldGlobal.OpenLevel(ModelManager_1.ModelManager.GameModeModel.MapConfig.MapPath);
            } else {
              t.IsSilentLogin = false;
              GameModeController.InitAllPlayerStarts();
              t.OpenLevelPromise.SetResult(true);
              t.BeginLoadMapPromise.SetResult(true);
            }
          } else {
            if (l) {
              SeamlessTravelController_1.SeamlessTravelController.PreOpenLevel();
            }
            WorldGlobal_1.WorldGlobal.OpenLevel(ModelManager_1.ModelManager.GameModeModel.MapConfig.MapPath);
            if (l) {
              await SeamlessTravelController_1.SeamlessTravelController.PostOpenLevel();
            }
          }
          ModelManager_1.ModelManager.GameModeModel.ClearLoadMapControllerData();
          if (ModelManager_1.ModelManager.SeamlessTravelModel?.IsSeamlessTravel) {
            TimerSystem_1.TimerSystem.Next(() => {
              ControllerHolder_1.ControllerHolder.WorldController.ManuallyGarbageCollection(3);
              ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
            });
          } else {
            ControllerHolder_1.ControllerHolder.WorldController.ManuallyGarbageCollection(3);
            ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
          }
          await t.BeginLoadMapPromise.Promise;
          if (l && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载]等待进入目标场景(开始)"), await ModelManager_1.ModelManager.SeamlessTravelModel.EnterDestinationMapPromise.Promise, Log_1.Log.CheckInfo())) {
            Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载]等待进入目标场景(完成)");
          }
          ActorSystem_1.ActorSystem.State = 1;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 3, "加载场景:加载地图，BeginLoadMap完成");
          }
          await t.OpenLevelPromise.Promise;
          if (l) {
            SeamlessTravelController_1.SeamlessTravelController.PostLoadedLevel();
          }
          this.m6("GameModeController.Load:OpenLevel End");
          UiManager_1.UiManager.UnLockOpen();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 10, "加载场景:恢复网络消息处理");
          }
          Net_1.Net.ResumeAllNotifyCallback();
          LevelSequencePlayer_1.LevelSequencePlayer.SetBanned(false);
          LguiEventSystemManager_1.LguiEventSystemManager.RefreshCurrentInputModule();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 3, "加载场景:加载地图(完成)");
          }
          LoadingController_1.LoadingController.SetProgress(ELoadingPhase_1.OPENLEVEL_END_PROGRESS);
          t.LoadingPhase = 6;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 3, "加载场景:等待AfterJoinSceneNotify(开始)");
          }
          await t.AfterJoinSceneNotifyPromise.Promise;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 3, "加载场景:等待AfterJoinSceneNotify(完成)");
          }
          cpp_1.FKuroPerfSightHelper.EndExtTag("Load.OpenLevel");
          t.OpenLevelProfiler.Stop();
          {
            t.PreloadProfiler.Restart();
            cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.Preload");
            t.LoadingPhase = 7;
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("GameMode", 3, "加载场景:预加载(开始)");
            }
            this.m6("GameModeController.Load:Preload Start");
            var o = new LoadGroup_1.LoadGroup("Preload阶段");
            const a = ELoadingPhase_1.PRELOAD_END_PROGRESS - ELoadingPhase_1.OPENLEVEL_END_PROGRESS;
            o.Add("应用MPC", () => {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("GameMode", 3, "加载场景:应用MPC(开始)");
              }
              this.m6("GameModeController.Load:ApplyMaterialParameterCollection Start");
              t.PreloadApplyMaterialParameterCollectionProfiler.Restart();
              this.ApplyMaterialParameterCollection(r.BRs);
              return true;
            }, async () => t.ApplyMaterialParameterCollectionPromise.Promise, e => {
              if (e) {
                LoadingController_1.LoadingController.AddProgress(a * 0.2, ELoadingPhase_1.PRELOAD_END_PROGRESS);
              }
              t.PreloadApplyMaterialParameterCollectionProfiler.Stop();
              this.m6("GameModeController.Load:ApplyMaterialParameterCollection End");
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("GameMode", 3, "加载场景:应用MPC(完成)");
              }
              return true;
            });
            o.Add("预加载Common、Entity资源", () => {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("GameMode", 3, "加载场景:预加载公共资源、实体资源(开始)");
              }
              this.m6("GameModeController.Load:CommonAndEntityAsset Start");
              t.PreloadCommonAndEntityProfiler.Restart();
              this.CheckPreload(() => {
                ModelManager_1.ModelManager.WorldModel.SetMapDone(true);
                ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("GameModeController.Load");
                EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AfterLoadMap);
              });
              return true;
            }, async () => t.PreloadPromise.Promise, e => {
              if (e) {
                LoadingController_1.LoadingController.AddProgress(a * 0.6, ELoadingPhase_1.PRELOAD_END_PROGRESS);
              }
              t.PreloadCommonAndEntityProfiler.Stop();
              this.m6("GameModeController.Load:CommonAndEntityAsset End");
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("GameMode", 3, "加载场景:预加载公共资源、实体资源(完成)", ["结果", e]);
              }
              return true;
            });
            o.Add("LoadBattleView", () => {
              this.m6("GameModeController.Load:PreloadBattleViewFromLoading Start");
              return true;
            }, async () => {
              var e = ModelManager_1.ModelManager.SeamlessTravelModel?.IsSeamlessTravel ?? false;
              return BattleUiControl_1.BattleUiControl.PreloadBattleViewFromLoading(e);
            }, e => {
              if (e) {
                LoadingController_1.LoadingController.AddProgress(a * 0.1, ELoadingPhase_1.PRELOAD_END_PROGRESS);
              }
              this.m6("GameModeController.Load:PreloadBattleViewFromLoading End");
              return true;
            });
            o.Add("Controller Preload", () => {
              this.m6("GameModeController.Load:Controller Preload Start");
              t.PreloadControllerProfiler.Restart();
              return true;
            }, async () => {
              var e = this.Manager.Preload();
              if (e.length) {
                var o = new Array();
                for (const r of e) {
                  const t = r[0];
                  var a = r[1];
                  a.Promise.then(e => {
                    if (!e) {
                      if (Log_1.Log.CheckError()) {
                        Log_1.Log.Error("GameMode", 3, "加载场景:执行Controller预加载失败", ["Name", t]);
                      }
                    }
                  });
                  o.push(a.Promise);
                }
                await Promise.all(o);
              }
              return true;
            }, e => {
              if (e) {
                LoadingController_1.LoadingController.AddProgress(a * 0.1, ELoadingPhase_1.PRELOAD_END_PROGRESS);
              }
              t.PreloadControllerProfiler.Stop();
              this.m6("GameModeController.Load:Controller Preload End");
              return true;
            });
            await o.Run();
            this.m6("GameModeController.Load:Preload End");
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("GameMode", 3, "加载场景:预加载(完成)");
            }
            LoadingController_1.LoadingController.SetProgress(ELoadingPhase_1.PRELOAD_END_PROGRESS);
            t.LoadingPhase = 8;
            cpp_1.FKuroPerfSightHelper.EndExtTag("Load.Preload");
            t.PreloadProfiler.Stop();
          }
          t.LoadDataLayerAndSubLevelProfiler.Restart();
          cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.SetDataLayerAndLoadSubLevel");
          t.LoadingPhase = 9;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 3, "加载场景:检测加载DataLayer(开始)");
          }
          this.m6("GameModeController.Load:LoadDataLayer Start");
          t.LoadDataLayerProfiler.Restart();
          this.LoadDataLayers(r);
          t.LoadDataLayerProfiler.Stop();
          this.m6("GameModeController.Load:LoadDataLayer End");
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 3, "加载场景:检测加载DataLayer(结束)");
          }
          this.UpdateStreamingQualityLevel();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 3, "加载场景:检测加载子关卡(开始)");
          }
          this.m6("GameModeController.Load:LoadSubLevel Start");
          t.LoadSubLevelProfiler.Start();
          await ControllerHolder_1.ControllerHolder.SubLevelController.CheckLoadSubLevels(r);
          t.LoadSubLevelProfiler.Stop();
          this.m6("GameModeController.Load:LoadSubLevel End");
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 3, "加载场景:检测加载子关卡(结束)");
          }
          LoadingController_1.LoadingController.SetProgress(ELoadingPhase_1.SETDATALAYER_AND_LOADSUBLEVEL_END_PROGRESS);
          t.LoadingPhase = 10;
          cpp_1.FKuroPerfSightHelper.EndExtTag("Load.SetDataLayerAndLoadSubLevel");
          t.LoadDataLayerAndSubLevelProfiler.Stop();
          t.CheckVoxelStreamingSourceProfiler.Restart();
          this.InitStreamingSources();
          t.StartIndependentStreaming();
          cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.CheckVoxelStreaming");
          t.LoadingPhase = 11;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 3, "加载场景:检测体素流送(开始)");
          }
          ControllerHolder_1.ControllerHolder.WorldController.ManuallyClearStreamingPool();
          this.AddOrRemoveRenderAssetsQueryViewInfo(t.BornLocation, ResourceSystem_1.WAIT_RENDER_ASSET_DURATION);
          this.m6("GameModeController.Load:CheckVoxelStreamingCompleted Start");
          await this.CheckVoxelStreamingCompleted(ELoadingPhase_1.CHECK_VOXEL_STREAMING_END_PROGRESS - ELoadingPhase_1.SETDATALAYER_AND_LOADSUBLEVEL_END_PROGRESS, ELoadingPhase_1.CHECK_VOXEL_STREAMING_END_PROGRESS);
          this.m6("GameModeController.Load:CheckVoxelStreamingCompleted End");
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 3, "加载场景:检测体素流送(完成)");
          }
          ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
          LoadingController_1.LoadingController.SetProgress(ELoadingPhase_1.CHECK_VOXEL_STREAMING_END_PROGRESS);
          t.LoadingPhase = 12;
          cpp_1.FKuroPerfSightHelper.EndExtTag("Load.CheckVoxelStreaming");
          t.CheckVoxelStreamingSourceProfiler.Stop();
          if (t.PreAwakeEntityDuringLoad) {
            this.m6("GameModeController.Load:CreatePreAwakeEntity Start");
            await ControllerHolder_1.ControllerHolder.CreatureController.PreAwakeEntitiesFromPending(Protocol_1.Aki.Protocol.Nks.Proto_SceneInit);
          }
          t.CheckStreamingSourceProfiler.Restart();
          cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.CheckStreaming");
          t.LoadingPhase = 13;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 7, "加载场景:检测场景流送(开始)");
          }
          this.m6("GameModeController.Load:CheckStreamingCompleted Start");
          await this.CheckStreamingCompleted(ELoadingPhase_1.CHECK_STREAMING_END_PROGRESS - ELoadingPhase_1.CHECK_VOXEL_STREAMING_END_PROGRESS, ELoadingPhase_1.CHECK_STREAMING_END_PROGRESS);
          this.m6("GameModeController.Load:CheckStreamingCompleted End");
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 7, "加载场景:检测场景流送(完成)");
          }
          ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
          ControllerHolder_1.ControllerHolder.WorldController.ManuallyResetStreamingPool();
          if (Info_1.Info.IsPlayInEditor) {
            UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "kepm.wp.RecordActivateGridActor");
          }
          LoadingController_1.LoadingController.SetProgress(ELoadingPhase_1.CHECK_STREAMING_END_PROGRESS);
          t.LoadingPhase = 14;
          cpp_1.FKuroPerfSightHelper.EndExtTag("Load.CheckStreaming");
          t.StopIndependentStreaming();
          t.CheckStreamingSourceProfiler.Stop();
          {
            t.CreateEntitiesProfiler.Restart();
            cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.CreateEntity");
            t.LoadingPhase = 15;
            CameraController_1.CameraController.ReturnLockOnCameraMode();
            this.m6("GameModeController.Load:CreateEntities Start");
            ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(Protocol_1.Aki.Protocol.Nks.Proto_SceneInit);
            if (l && ModelManager_1.ModelManager.SeamlessTravelModel?.UseTreadmill && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载]等待地板消失(开始)"), await ModelManager_1.ModelManager.SeamlessTravelModel.TransitionFloorUnloadedPromise.Promise, Log_1.Log.CheckInfo())) {
              Log_1.Log.Info("SeamlessTravel", 50, "[无缝加载]等待地板消失(完成)");
            }
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("GameMode", 3, "加载场景:加载编队(开始)");
            }
            this.m6("GameModeController.Load:LoadFormation Start");
            await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
            this.m6("GameModeController.Load:LoadFormation End");
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("GameMode", 3, "加载场景:加载编队(完成)");
            }
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("GameMode", 17, "加载场景:等待场景战斗实体加载(开始)");
            }
            await ModelManager_1.ModelManager.BulletModel.WaitSceneBulletOwnerInit()?.Promise;
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("GameMode", 17, "加载场景:等待场景战斗实体加载(完成)");
            }
            t.CreateEntitiesProfiler.Stop();
            this.m6("GameModeController.Load:CreateEntities End");
            LoadingController_1.LoadingController.SetProgress(ELoadingPhase_1.CREATE_ENTITY_END_PROGRESS);
            cpp_1.FKuroPerfSightHelper.EndExtTag("Load.CreateEntity");
            cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.CheckRenderAssets");
            t.WaitRenderAssetsProfiler.Restart();
            let e = true;
            if (e = Info_1.Info.IsPlayInEditor ? UE.KuroEditorUtilityLibrary.GetGConfigEditorSettings("/Script/KuroEditorUtility.KuroEditorUtilitySetting", "WaitHLODResInLoading") : e) {
              await this.CheckRenderAssetsStreamingCompleted(t.BornLocation, "加载场景:");
            } else if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("World", 41, "加载场景:编辑器跳过等待Streaming阶段，加速进入场景。你可以在UGS勾选发布模式来恢复等待。", ["DoWaitStreamingCompleted", e]);
            }
            t.WaitRenderAssetsProfiler.Stop();
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FixBornLocation);
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("GameMode", 3, "加载场景:修正主控玩家地面位置(开始)");
            }
            if (l) {
              SeamlessTravelController_1.SeamlessTravelController.SetCurrentEntityAction(n);
              if (ModelManager_1.ModelManager.SeamlessTravelModel?.UseKeepKite && ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessTravelKeepKite?.IsActive) {
                ModelManager_1.ModelManager.SeamlessTravelModel.SeamlessTravelKeepKite?.UpdateKeepKite();
              }
            } else {
              this.FixBornLocation();
            }
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("GameMode", 3, "加载场景:修正主控玩家地面位置(完成)");
            }
            ControllerHolder_1.ControllerHolder.RoleTriggerController.UpdateTransform();
            t.AttachStreamingSourcesToActor(ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTriggerOrUndefined());
            t.LoadingPhase = 16;
            cpp_1.FKuroPerfSightHelper.EndExtTag("Load.CheckRenderAssets");
          }
          t.WorldDoneProfiler.Restart();
          cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.WorldDone");
          t.LoadingPhase = 17;
          t.WorldDone = true;
          ModelManager_1.ModelManager.CreatureModel.SetIsLoadingScene(false);
          ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(true, true, true, true);
          LevelEventLockInputState_1.LevelEventLockInputState.Unlock();
          InputDistributeController_1.InputDistributeController.RefreshInputTag();
          GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Broadcast();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 3, "加载场景:派发WorldDone事件通知");
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldDone);
          RoleAudioController_1.RoleAudioController.SetUpdateAudioDynamicTrace(true);
          if (!t.PlayTravelMp4) {
            this.m6("GameModeController.Load:OpenBattleViewFromLoading Start");
            t.OpenBattleViewProfiler.Restart();
            if (!ModelManager_1.ModelManager.SeamlessTravelModel?.IsSeamlessTravel) {
              await BattleUiControl_1.BattleUiControl.OpenBattleViewFromLoading();
            }
            t.OpenBattleViewProfiler.Stop();
            this.m6("GameModeController.Load:OpenBattleViewFromLoading End");
          }
          if (!l) {
            CameraController_1.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(Rotator_1.Rotator.ZeroRotator);
            CameraController_1.CameraController.FightCamera.LogicComponent.ResetInitialCameraRotation();
          }
          LoadingController_1.LoadingController.SetProgress(ELoadingPhase_1.WORLD_DONE_END_PROGRESS);
          t.LoadingPhase = 18;
          cpp_1.FKuroPerfSightHelper.EndExtTag("Load.WorldDone");
          t.WorldDoneProfiler.Stop();
          {
            ModelManager_1.ModelManager.GameModeModel.CloseLoadingProfiler.Restart();
            cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.CloseLoading");
            ResourceSystem_1.ResourceSystem.SetLoadModeInGame(GlobalData_1.GlobalData.World, "GameModeController.Load");
            ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
            t.LoadingPhase = 19;
            if (ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel) {
              await SeamlessTravelController_1.SeamlessTravelController.EndSeamlessTravel();
              ModelManager_1.ModelManager.LoadingModel.SetIsLoading(false);
            } else if (ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("GameMode", 45, "加载场景:关闭纯黑幕界面(开始)");
              }
              await LoadingController_1.LoadingController.GameModeCloseLoading();
              await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(7);
              ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen = false;
              ModelManager_1.ModelManager.GameModeModel.BlackScreenColor = IAction_1.EFadeInScreenShowType.Black;
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("GameMode", 45, "加载场景:关闭纯黑幕界面(完成)");
              }
            } else if (ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("GameMode", 3, "加载场景:等待CG结束(开始)");
              }
              await ModelManager_1.ModelManager.GameModeModel.VideoStartPromise.Promise;
              this.m6("GameModeController.Load:OpenBattleViewFromLoading Start");
              t.CloseLoadingPhaseOpenBattleViewProfiler.Restart();
              if (!ModelManager_1.ModelManager.SeamlessTravelModel?.IsSeamlessTravel) {
                await BattleUiControl_1.BattleUiControl.OpenBattleViewFromLoading();
              }
              t.CloseLoadingPhaseOpenBattleViewProfiler.Stop();
              this.m6("GameModeController.Load:OpenBattleViewFromLoading End");
              this.m6("GameModeController.Load:CloseLoading Start");
              await LoadingController_1.LoadingController.GameModeCloseLoading();
              this.m6("GameModeController.Load:CloseLoading End");
              GameModeController.SetTravelMp4(false, undefined);
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("GameMode", 3, "加载场景:等待CG结束(完成)");
              }
            } else if (ModelManager_1.ModelManager.GameModeModel.UseShowCenterText) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("GameMode", 45, "加载场景:关闭黑幕白字界面(开始)");
              }
              await LoadingController_1.LoadingController.GameModeCloseLoading();
              await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(7);
              ModelManager_1.ModelManager.GameModeModel.ShowCenterTextFlow = undefined;
              ModelManager_1.ModelManager.GameModeModel.UseShowCenterText = false;
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("GameMode", 45, "加载场景:关闭黑幕白字界面(完成)");
              }
            } else {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("GameMode", 3, "加载场景:关闭Loading界面(开始)");
              }
              this.m6("GameModeController.Load:CloseLoading Start");
              await LoadingController_1.LoadingController.GameModeCloseLoading();
              this.m6("GameModeController.Load:CloseLoading End");
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("GameMode", 3, "加载场景:关闭Loading界面(完成)");
              }
            }
            t.LoadingPhase = 20;
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("GameMode", 3, "加载场景:通知服务端加载完成（开始）");
            }
            this.m6("GameModeController.Load:SceneLoadingFinishRequest Start");
            await ControllerHolder_1.ControllerHolder.CreatureController.SceneLoadingFinishRequest(r.BKn);
            this.m6("GameModeController.Load:SceneLoadingFinishRequest End");
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("GameMode", 3, "加载场景:通知服务端加载完成（完成）");
            }
            WorldController_1.WorldController.EndWorldOriginInLoadingMode("JoinScene", ModelManager_1.ModelManager.GameModeModel.RoleLocation);
            PerfSightController_1.PerfSightController.MarkLevelLoadCompleted();
            ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = true;
            t.WorldDoneAndLoadingClosed = true;
            t.LoadingPhase = 1;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldDoneAndCloseLoading);
            t.ResetPromise();
            this.m6("GameModeController.Load: End");
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("GameMode", 3, "加载场景:加载完成");
            }
            let e = "Unknown";
            o = ModelManager_1.ModelManager.KuroSdkModel.GetBasicInfo();
            if (o) {
              e = o.ModelName;
            }
            if (CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("GameMode", 16, "CloudGame 进入游戏");
              }
              UE.KuroCloudGameWrapper.SendDataToPipeBinary("HotPatchEnterGame");
            }
            ModelManager_1.ModelManager.GameModeModel.CloseLoadingProfiler.Stop();
            ModelManager_1.ModelManager.GameModeModel.LoadWorldProfiler.Stop();
            this.PrintLoadDetail(t.BornLocation ?? new UE.VectorDouble());
            o = {
              ...new LogReportDefine_1.PlayerCommonLogData(),
              event_id: "3",
              i_inst_id: ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id.toString(),
              i_cost_time: ModelManager_1.ModelManager.GameModeModel.LoadWorldProfiler.Time.toString(),
              s_device_type: e
            };
            LogReportController_1.LogReportController.LogReport(o);
            cpp_1.FKuroPerfSightHelper.EndExtTag("Load.CloseLoading");
            cpp_1.FKuroPerfSightHelper.EndExtTag("Load");
          }
          return !(ModelManager_1.ModelManager.GameModeModel.ForceClientTravel = false);
        });
        TaskSystem_1.TaskSystem.AddTask(e);
        await TaskSystem_1.TaskSystem.Run();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameMode", 3, "加载场景:出生点旋转无效");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GameMode", 3, "加载场景:出生点坐标无效");
    }
  }
  static m6(e) {
    e = Stats_1.Stat.CreateNoFlameGraph(e);
    e.Start();
    e.Stop();
  }
  static async Change(e) {
    var o = e.E7n;
    const r = ModelManager_1.ModelManager.GameModeModel;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 3, "改变场景模式:开始", ["SceneMode", o], ["副本Id", r.InstanceDungeon.Id], ["地图", r.MapConfig.MapId], ["MapPath", r.MapConfig.MapPath]);
    }
    r.ChangeModeState = true;
    r.IsMulti = o === Protocol_1.Aki.Protocol.e4s.Proto_Multi;
    ModelManager_1.ModelManager.CreatureModel.SetSceneId(e.BKn);
    this.ChangeGameMode();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeMode);
    r.CreateChangeModePromise();
    o = new AsyncTask_1.AsyncTask("GameModeController.Change", async () => {
      var e = new LogProfiler_1.LogProfiler("改变场景模式");
      var o = e.CreateChild("打开Loading界面");
      var a = e.CreateChild("关闭Loading界面");
      e.Start();
      LoadingController_1.LoadingController.SetProgress(0, undefined, 1, true);
      this.PreventEntityFalling();
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.PreventEntityFalling);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 3, "改变场景模式:打开Loading界面(开始)");
      }
      o.Restart();
      await LoadingController_1.LoadingController.GameModeOpenLoading();
      o.Stop();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 3, "改变场景模式:打开Loading界面(完成)");
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 3, "改变场景模式:打开ChangeSceneModeEndNotify协议(开始)");
      }
      await r.ChangeSceneModeEndNotifyPromise.Promise;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 3, "改变场景模式:打开ChangeSceneModeEndNotify协议(完成)");
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 3, "改变场景模式:请求服务器SceneModeChangeFinishRequest(开始)");
      }
      var o = Protocol_1.Aki.Protocol.yfs.create();
      var o = await Net_1.Net.CallAsync(23311, o);
      if (o && o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 26681);
        return false;
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 3, "改变场景模式:请求服务器SceneModeChangeFinishRequest(完成)");
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 70, "改变场景模式:等待加载编队(开始)");
        }
        await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 70, "改变场景模式:等待加载编队(完成)");
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 70, "改变场景模式:检测场景流送(开始)", ["流送源Pos", r.StreamingSource?.D_K2_GetActorLocation()]);
        }
        this.m6("GameModeController.Change:CheckStreaming Start");
        await this.Pfr(r.ChangeSceneModeVoxelPromise, r.ChangeSceneModeStreamingPromise);
        this.m6("GameModeController.Change:CheckStreaming End");
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 70, "改变场景模式:检测场景流送(完成)");
        }
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.PreventEntityFalling);
        this.EnableEntityFalling();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 3, "改变场景模式:关闭Loading界面(开始)");
        }
        a.Start();
        await LoadingController_1.LoadingController.GameModeCloseLoading();
        a.Stop();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 3, "改变场景模式:关闭Loading界面(完成)");
        }
        r.ResetChangeModePromise();
        r.ChangeModeState = false;
        e.Stop();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeModeFinish);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 3, "改变场景模式:完成");
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("World", 3, "改变场景模式", ["MapPath", ModelManager_1.ModelManager.GameModeModel.MapPath], ["耗时", e.ToString()]);
        }
        return true;
      }
    });
    TaskSystem_1.TaskSystem.AddTask(o);
    await TaskSystem_1.TaskSystem.Run();
  }
  static PrintWorldPartitionDebugInfo(e, o, a, r, t) {
    if (e) {
      if (!UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass())) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GameMode", 70, "WorldPartitionSubsystem不存在");
        }
      }
      e.LogStreamingStuckInfo(o, a, r, t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GameMode", 70, "WorldPartitionStreamingSourceComponent不存在");
    }
  }
  static SwitchDataLayer(e, o, a) {
    if (ModelManager_1.ModelManager.AutoRunModel?.IsInLogicTreeGmMode()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("GameMode", 39, "切换DataLayer:遇到不应执行切换DataLayer的情况，使用伪切换DataLayer替代");
      }
      this.CKs(e, o, a);
    } else {
      this.Rfr(e, o, a);
    }
  }
  static async Rfr(e, o, a) {
    var r = ModelManager_1.ModelManager.GameModeModel;
    if (r.DataLayerSwitching) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameMode", 29, "当前正在切换DataLayer");
      }
      a?.(false);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 29, "切换DataLayer:(开始)", ["卸载的DataLayer", e?.join()], ["加载的DataLayer", o?.join()]);
      }
      r.BeginDataLayerChange();
      ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("SwitchDataLayerInternal");
      ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(GlobalData_1.GlobalData.World, "SwitchDataLayerInternal");
      if (e?.length || o?.length) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLevelEnvChange, 1);
      }
      if (e?.length) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 29, "切换DataLayer:卸载DataLayer(开始)");
        }
        for (const t of e) {
          GameModeController.Ufr(t);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 29, "切换DataLayer:卸载DataLayer(完成)");
        }
      }
      if (o?.length) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 29, "切换DataLayer:加载DataLayer(开始)");
        }
        for (const n of o) {
          GameModeController.Afr(n);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 29, "切换DataLayer:加载DataLayer(完成)");
        }
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 29, "切换DataLayer:检测场景流送(开始)");
      }
      this.m6("GameModeController.SwitchDataLayer:CheckStreaming Start");
      await this.Pfr(r.DataLayerChangeVoxelPromise, r.DataLayerChangeStreamingPromise);
      this.m6("GameModeController.SwitchDataLayer:CheckStreaming End");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 29, "切换DataLayer:检测场景流送(完成)");
      }
      ResourceSystem_1.ResourceSystem.SetLoadModeInGame(GlobalData_1.GlobalData.World, "SwitchDataLayerInternal");
      ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("SwitchDataLayerInternal");
      if (r.DataLayerSwitching) {
        ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(Protocol_1.Aki.Protocol.Nks.Proto_Normal);
        r.EndDataLayerChange();
        GameModeController.wfr();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 29, "切换DataLayer:(完成)");
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 29, "切换DataLayer:加载场景打断DataLayer切换");
      }
      a?.(true);
    }
  }
  static CKs(e, o, a) {
    if (ModelManager_1.ModelManager.GameModeModel.DataLayerSwitching) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("GameMode", 29, "伪切换DataLayer: 当前正在切换DataLayer");
      }
      a?.(false);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 29, "伪切换DataLayer:(开始)", ["卸载的DataLayer", e?.join()], ["加载的DataLayer", o?.join()]);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 39, "伪切换DataLayer:更新缓存的DataLayer变更信息");
      }
      ModelManager_1.ModelManager.AutoRunModel?.UpdateCachedDataLayerInfo(o, e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 39, "伪切换DataLayer:通知服务器切换完成");
      }
      GameModeController.wfr();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 29, "伪切换DataLayer:(完成)");
      }
      a?.(true);
    }
  }
  static IsInInstance() {
    return ModelManager_1.ModelManager.GameModeModel.InstanceType >= Protocol_1.Aki.Protocol.i4s.Proto_NormalInstance;
  }
  static CanLoadEntity() {
    var e = ModelManager_1.ModelManager.GameModeModel;
    return e.WorldDone && !e.IsTeleport && !e.ChangeModeState;
  }
  static BeforeLoadMap() {
    ModelManager_1.ModelManager.GameModeModel.BeginLoadMapPromise.SetResult(true);
  }
  static InitAllPlayerStarts() {
    var e = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
    UE.GameplayStatics.GetAllActorsOfClass(GlobalData_1.GlobalData.World, UE.PlayerStart.StaticClass(), e);
    ModelManager_1.ModelManager.GameModeModel.ClearPlayerStart();
    var o = (0, puerts_1.$unref)(e);
    if (o.Num() > 0) {
      for (let e = 0; e < o.Num(); ++e) {
        ModelManager_1.ModelManager.GameModeModel.AddPlayerStart(o.Get(e));
      }
    }
  }
  static AfterLoadMap() {
    GameModeController.InitAllPlayerStarts();
    ModelManager_1.ModelManager.GameModeModel.OpenLevelPromise.SetResult(true);
  }
  static OnTick(e) {
    var o;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti || ModelManager_1.ModelManager.CombatMessageModel.AnyEntityInFight) {
      Heartbeat_1.Heartbeat.SetHeartBeatMode(1);
    } else {
      Heartbeat_1.Heartbeat.SetHeartBeatMode(0);
    }
    if (ModelManager_1.ModelManager.GameModeModel.UseWorldPartition && ModelManager_1.ModelManager.GameModeModel.WorldDone && !ModelManager_1.ModelManager.GameModeModel.IsTeleport && Global_1.Global.BaseCharacter?.IsValid()) {
      o = Global_1.Global.BaseCharacter.D_GetTransform();
      ModelManager_1.ModelManager.GameModeModel.UpdateBornLocation(o.GetLocation());
    }
  }
  static PrintLoadDetail(e) {
    var o;
    var a;
    var r;
    var t;
    var n = ModelManager_1.ModelManager.GameModeModel.LoadWorldProfiler;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 3, "加载详情", ["MapPath", ModelManager_1.ModelManager.GameModeModel.MapPath], ["耗时", n.ToString()]);
    }
    var l = ModelManager_1.ModelManager.PreloadModel.ResourcesLoadTime;
    l.sort((e, o) => o[1] - e[1]);
    if (UE.KuroStaticLibrary.IsWithEditor()) {
      n = UE.KuroStaticLibrary.GetPIEStartTimeInSeconds();
      t = UE.KuroStaticLibrary.GetPlatformTimeInSeconds();
      o = (r = (e, o) => {
        var a;
        var r = e.indexOf(o);
        if (r !== -1) {
          a = e.indexOf(" ", r + o.length);
          return e.substring(r + o.length, a === -1 ? e.length : a);
        } else {
          return "";
        }
      })(a = UE.KismetSystemLibrary.GetCommandLine(), "-KuroPipelineTag=");
      a = (r = r(a, "-KuroTsSilentLoginTestFile=").replace(/\//g, "\\").split("\\"))[r.length - 1];
      r = {
        Version: BaseConfigController_1.BaseConfigController.GetVersionString(),
        LoadingTime: t - n,
        MapPath: ModelManager_1.ModelManager.GameModeModel.MapPath,
        BornLocation: e.ToString(),
        TestName: a,
        PipelineTag: o
      };
      t = JSON.stringify(r);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 76, "UE_TraceProfile_Event", ["value", t]);
      }
      if (cpp_2.FThinkingAnalyticsForPuerts.Track("UE_TraceProfile_Event", t, GAME_MODE_CTRL_THINKING_INDEX)) {
        TimerSystem_1.TimerSystem.Next(() => {
          cpp_2.FThinkingAnalyticsForPuerts.Flush(GAME_MODE_CTRL_THINKING_INDEX);
        });
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("GameMode", 76, "TraceProfile report fail");
      }
    }
    if (ModelManager_1.ModelManager.PreloadModel.LoadAssetOneByOneState) {
      for (let o = 0; o < TOP_CONSUMING_COUNT && !(o >= l.length); ++o) {
        var _ = l[o];
        let e = "";
        var i = _[1];
        e = i < ONE_SECOND ? i + " ms" : i / ONE_SECOND + " s";
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("World", 3, "资源耗时Top20", ["耗时", e], ["资源路径", _[0]]);
        }
      }
      ModelManager_1.ModelManager.PreloadModel.ClearResourcesLoadTime();
    }
  }
  static _gr() {
    var e = BaseConfigModel_1.BaseConfigModel.EntryJson?.TDCfg;
    var o = e?.URL ?? "https://cn-datareceiver.aki-game.com";
    var a = e?.AppID ?? "0d45e80772374d95a961daf5316265e3";
    if (!e) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("GameMode", 76, "Thinking Analytics init fail, TDCfg is empty");
      }
    }
    if (!UE.ThinkingAnalytics.HasInstanceInitialized(GAME_MODE_CTRL_THINKING_INDEX) && !(e = new UE.CreateInstanceParam(GAME_MODE_CTRL_THINKING_INDEX, o, a, UE.ThinkingAnalytics.GetMachineID(), "", "GameController", "", 1000, 0, 0, 0, true, false, false, true, ThinkDataLaunchReporter_1.EXIT_WAIT_TIME, ThinkDataLaunchReporter_1.MAX_PENDING_LOG, ThinkDataLaunchReporter_1.SEND_HTTP_TIMEOUT, true, ThinkDataLaunchReporter_1.CALIBRATE_INTERVAL, ThinkDataLaunchReporter_1.CALIBRATE_STOP_TIMER, true), UE.ThinkingAnalytics.CreateSimpleInstance(e))) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("GameMode", 76, "Thinking Analytics instance create fail");
      }
    }
  }
  static SetGamePaused(e, o, a = Time_1.Time.OriginTimeDilation) {
    Time_1.Time.OriginTimeDilation = a;
    var r = ModelManager_1.ModelManager.GameModeModel.GamePausedReasons;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 54, "时停:调用真时停", ["bPaused", e], ["reason", o], ["unPausedTimeDilation", a]);
    }
    if (ModelManager_1.ModelManager.GameModeModel.ForceDisableGamePaused) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 54, "时停:缓存真时停:由于强制设置时停");
      }
      if (!e) {
        if (r.has(o)) {
          r.delete(o);
        }
        return false;
      }
      if (!r.has(o)) {
        r.add(o);
      }
    }
    if (e) {
      if (r.has(o)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 54, "时停:已存在该时停");
        }
        return true;
      } else {
        r.add(o);
        TickSystem_1.TickSystem.IsPaused = true;
        GameModeController.SetTimeDilation(0, 1);
        Time_1.Time.LastPauseTimeFrame = Time_1.Time.Frame;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 54, "时停:执行真时停");
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSetGamePaused, true);
        return UE.GameplayStatics.SetGamePaused(GlobalData_1.GlobalData.World, true);
      }
    } else {
      if (r.has(o)) {
        r.delete(o);
      }
      return r.size !== 0 || (TickSystem_1.TickSystem.IsPaused = false, GameModeController.SetTimeDilation(a, 1), Time_1.Time.LastResumeTimeFrame = Time_1.Time.Frame, Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 54, "时停:解除真时停"), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSetGamePaused, false), UE.GameplayStatics.SetGamePaused(GlobalData_1.GlobalData.World, false));
    }
  }
  static ForceDisableGamePaused(e) {
    if (e) {
      ModelManager_1.ModelManager.GameModeModel.ForceDisableGamePaused = true;
      TickSystem_1.TickSystem.IsPaused = false;
      GameModeController.SetTimeDilation(Time_1.Time.OriginTimeDilation, 1);
      Time_1.Time.LastResumeTimeFrame = Time_1.Time.Frame;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 54, "时停:强制解除真时停", ["timeDilation", Time_1.Time.OriginTimeDilation]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSetGamePaused, false);
      return UE.GameplayStatics.SetGamePaused(GlobalData_1.GlobalData.World, false);
    } else {
      ModelManager_1.ModelManager.GameModeModel.ForceDisableGamePaused = false;
      if (ModelManager_1.ModelManager.GameModeModel.GamePausedReasons.size > 0) {
        TickSystem_1.TickSystem.IsPaused = true;
        GameModeController.SetTimeDilation(0, 1);
        Time_1.Time.LastPauseTimeFrame = Time_1.Time.Frame;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 54, "时停:恢复强制解除, Set中存在reason, 执行真时停");
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSetGamePaused, true);
        return UE.GameplayStatics.SetGamePaused(GlobalData_1.GlobalData.World, true);
      } else {
        GameModeController.SetTimeDilation(Time_1.Time.OriginTimeDilation, 1);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 54, "时停:恢复强制解除, Set中不存在reason, 不执行真时停", ["timeDilation", Time_1.Time.OriginTimeDilation]);
        }
        return true;
      }
    }
  }
  static SetTimeDilation(e, o = 0) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 54, "时停:调用假时停", ["timeDilation", e], ["timeDilationType", o]);
    }
    var a;
    var r;
    var t = ModelManager_1.ModelManager.GameModeModel.TimeDilationMap;
    if (e === 1) {
      t.delete(o);
    } else {
      t.set(o, e);
    }
    let n = 1;
    let l = 1;
    for ([a, r] of t) {
      n *= r;
      if (a !== 1) {
        l *= r;
      }
    }
    if (n < MathUtils_1.MathUtils.SmallNumber) {
      n = 0;
    }
    if (l < MathUtils_1.MathUtils.SmallNumber) {
      l = 0;
    }
    if (o !== 1) {
      Time_1.Time.OriginTimeDilation = l;
    }
    Time_1.Time.SetTimeDilation(n);
    ControllerHolder_1.ControllerHolder.TimeOfDayController.ChangeTimeScale(n);
    ControllerHolder_1.ControllerHolder.CharacterController.SetTimeDilation(n);
    ControllerHolder_1.ControllerHolder.FormationDataController.SetTimeDilation(n);
    ControllerHolder_1.ControllerHolder.BulletController.SetTimeDilation(n);
    CameraController_1.CameraController.SetTimeDilation(n);
    ControllerHolder_1.ControllerHolder.ComponentForceTickController.SetTimeDilation(n);
    EffectEnvironment_1.EffectEnvironment.GlobalTimeScale = n;
    e = Protocol_1.Aki.Protocol.GCs.create();
    e.dKn = n;
    Net_1.Net.Send(24035, e);
    if (n === 0) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PauseGame, 1);
    }
    if (n === 1) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PauseGame, 0);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TriggerUiTimeDilation);
  }
  static FixBornLocation(e = undefined) {
    var o;
    if (Global_1.Global.BaseCharacter && !Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(230)?.IsOnVehicle) {
      if (e) {
        Global_1.Global.BaseCharacter.CharacterActorComponent.TeleportAndFindStandLocation(e);
      } else {
        Global_1.Global.BaseCharacter.CharacterActorComponent.FixBornLocation("主控玩家.修正地面", true);
      }
      Global_1.Global.BaseCharacter.KuroSetMovementMode({
        Mode: 1,
        Context: "[GameModeController.FixBornLocation]"
      });
      if (o = (e = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity).GetComponent(177)) {
        o.MainAnimInstance?.SyncAnimStates(undefined);
      }
      e.GetComponent(178)?.StopAllAddMove();
      e.GetComponent(175)?.ResetCharState();
    }
  }
  static LoadDataLayers(e) {
    RenderModuleController_1.RenderModuleController.SetWorldPartitionDataLayerState("DatalayerRuntime_HideInLowMemDevice", !UE.KuroStaticLibrary.IsLowMemoryDevice());
    if (e?.bRs) {
      var o = [...ModelManager_1.ModelManager.GameModeModel.GetAllDataLayers()];
      for (const t of e.bRs) {
        var a;
        var r = DataLayerConfigById_1.configDataLayerConfigById.GetConfig(t);
        if (r) {
          r = r.DataLayer;
          if (ModelManager_1.ModelManager.GameModeModel.HasDataLayer(r)) {
            if ((a = o.indexOf(r)) >= 0) {
              o.splice(a, 1);
            }
          } else {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("GameMode", 3, "加载场景:加载DataLayer", ["DataLayer", r]);
            }
            GameModeController.Afr(r);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GameMode", 3, "加载场景:加载DataLayer失败,不存在的配置Id", ["DataLayerId:", t]);
        }
      }
      for (const n of o) {
        GameModeController.Ufr(n);
      }
    }
  }
  static Afr(e) {
    ModelManager_1.ModelManager.GameModeModel.AddDataLayer(e);
    RenderModuleController_1.RenderModuleController.SetWorldPartitionDataLayerState(e, true);
  }
  static Ufr(e) {
    ModelManager_1.ModelManager.GameModeModel.RemoveDataLayer(e);
    RenderModuleController_1.RenderModuleController.SetWorldPartitionDataLayerState(e, false);
  }
  static wfr() {
    var e = Protocol_1.Aki.Protocol.lms.create();
    e.r6n = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id;
    Net_1.Net.Call(24545, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27916);
      }
    });
  }
  static ApplyMaterialParameterCollection(e) {
    ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.clear();
    for (const a of Object.keys(e)) {
      var o = e[a];
      var o = AreaMpcById_1.configAreaMpcById.GetConfig(o).MpcData;
      if (o && o !== "None" && o !== "Empty") {
        ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.set(o, false);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameMode", 29, "加载场景: 未配置对应区域的MPCData", ["AreaId", a], ["MpcData", o]);
      }
    }
    if (ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.size === 0) {
      ModelManager_1.ModelManager.GameModeModel.ApplyMaterialParameterCollectionPromise.SetResult(true);
    } else {
      for (const r of ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.keys()) {
        ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.ItemMaterialControllerMPCData_C, e => {
          if (e?.IsValid()) {
            ModelManager_1.ModelManager.RenderModuleModel.UpdateItemMaterialParameterCollection(e);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("GameMode", 29, "加载场景: MPCData无效");
          }
          ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.set(r, true);
          GameModeController.Bfr();
        });
      }
    }
  }
  static Bfr() {
    let e = true;
    for (const o of ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.values()) {
      e = o && e;
    }
    if (e) {
      ModelManager_1.ModelManager.GameModeModel.ApplyMaterialParameterCollectionPromise.SetResult(true);
    }
  }
  static async Pfr(e, o) {
    var a;
    var r = ModelManager_1.ModelManager.GameModeModel;
    if (TimerSystem_1.TimerSystem.Has(r.CheckStreamingCompletedTimerId)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameMode", 29, "[CheckWorldPartitionStreamingCompleted] 重复检查场景流送", ["地图Id", r.MapConfig.MapId], ["副本Id", r.InstanceDungeon.Id]);
      }
    } else if (r.UseWorldPartition) {
      a = ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      r.CheckStreamingCompletedTimerId = this.ZQs(a, e);
      await e.Promise;
      TimerSystem_1.TimerSystem.Remove(r.CheckStreamingCompletedTimerId);
      a = ModelManager_1.ModelManager.GameModeModel.StreamingSource.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      r.CheckStreamingCompletedTimerId = this.ZQs(a, o);
      await o.Promise;
      TimerSystem_1.TimerSystem.Remove(r.CheckStreamingCompletedTimerId);
      r.CheckStreamingCompletedTimerId = undefined;
    }
  }
  static ZQs(r, t, n, l, _ = false) {
    var e = r.TargetGrids;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 60, "[CheckTargetStreamingCompleted] 检测参数", ["dataLayers", n !== undefined && n.Num() > 0 ? n.Get(0).toString() : undefined], ["targetGrids", e !== undefined && e.Num() > 0 ? e.Get(0).toString() : undefined]);
    }
    let i = false;
    let d = 0;
    const g = TimerSystem_1.TimerSystem.Forever(() => {
      function e(e = false) {
        if ((d += ResourceSystem_1.CHECK_STREAMING_INTERVAL) >= exports.LOG_STREAMING_STUCK_INTERVAL) {
          GameModeController.PrintWorldPartitionDebugInfo(r, n, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, e);
          d = 0;
        }
      }
      if (!i) {
        var o;
        var a = r.IsStreamingCompletedForLayers(n, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, true, cellProgress, false);
        if (l) {
          o = (0, puerts_1.$unref)(cellProgress);
          l(o);
        }
        if (!a) {
          e(i);
          return;
        }
        if ((i = _) && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 60, "加载场景:检测场景物理体(开始)");
        }
      }
      if (i) {
        if (!r.IsStreamingCompletedForLayers(n, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, cellProgress, true)) {
          e(i);
          return;
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GameMode", 60, "加载场景:检测场景物理体(结束)");
        }
      }
      TimerSystem_1.TimerSystem.Remove(g);
      t.SetResult(true);
    }, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
    return g;
  }
  static InitStreamingSources() {
    var e = ModelManager_1.ModelManager.GameModeModel;
    if (GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings().bEnableWorldPartition && e.BornLocation) {
      e.InitStreamingSources();
    }
  }
  static async CheckVoxelStreamingCompleted(o, a) {
    var e;
    var r;
    var t = ModelManager_1.ModelManager.GameModeModel;
    if (GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings().bEnableWorldPartition) {
      t.UseWorldPartition = true;
      if (e = t.BornLocation) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("World", 3, "[SoloGameMode.CheckVoxelStreamingCompleted] 玩家出生点。", ["Location", e]);
        }
        (e = ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass())).EnableStreamingSource();
        r = t.VoxelStreamingCompleted;
        t.CheckStreamingCompletedTimerId = this.ZQs(e, r, undefined, e => {
          LoadingController_1.LoadingController.AddProgress(Math.min(e * o, o), a);
        });
        await r.Promise;
        t.CheckStreamingCompletedTimerId = undefined;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameMode", 3, "[SoloGameMode.CheckVoxelStreamingCompleted] 无法找到出生点。", ["地图Id", t.MapConfig.MapId], ["副本Id", t.InstanceDungeon.Id]);
      }
    } else {
      t.UseWorldPartition = false;
      t.VoxelStreamingCompleted.SetResult(true);
      LoadingController_1.LoadingController.AddProgress(o, a);
    }
  }
  static async CheckStreamingCompleted(a, r) {
    var e = ModelManager_1.ModelManager.GameModeModel;
    ModelManager_1.ModelManager.WorldModel.CurEnvironmentInfo?.ResetInfo();
    if (e.UseWorldPartition) {
      var t = e.BornLocation;
      if (t) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("World", 7, "[SoloGameMode.CheckStreamingCompleted] 玩家出生点。", ["Location", t]);
        }
        var n = ModelManager_1.ModelManager.GameModeModel.StreamingSource.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
        n.EnableStreamingSource();
        var l = UE.NewArray(UE.BuiltinName);
        let o = ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(t, true, true);
        if (o) {
          t = (0, puerts_1.$ref)(undefined);
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(GlobalData_1.GlobalData.World, o, t);
          l.Add((0, puerts_1.$unref)(t));
        } else {
          let e = true;
          if (Info_1.Info.IsPlayInEditor) {
            e = UE.KuroEditorUtilityLibrary.GetGConfigEditorSettings("/Script/KuroEditorUtility.KuroEditorUtilitySetting", "WaitHLODResInLoading");
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("World", 41, "Wait HLOD data layers in loading", ["DoWaitHLODDataLayers", e]);
          }
          if (e) {
            for (const i of WorldDefine_1.dataLayerRuntimeHLOD) {
              var _ = (0, puerts_1.$ref)(undefined);
              o = FNameUtil_1.FNameUtil.GetDynamicFName(i);
              UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(GlobalData_1.GlobalData.World, o, _);
              l.Add((0, puerts_1.$unref)(_));
            }
          }
        }
        t = e.StreamingCompleted;
        e.CheckStreamingCompletedTimerId = this.ZQs(n, t, l, e => {
          LoadingController_1.LoadingController.AddProgress(Math.min(e * a, a), r);
        }, true);
        await t.Promise;
        e.CheckStreamingCompletedTimerId = undefined;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameMode", 3, "[SoloGameMode.CheckStreamingCompleted] 无法找到出生点。", ["地图Id", e.MapConfig.MapId], ["副本Id", e.InstanceDungeon.Id]);
      }
    } else {
      LoadingController_1.LoadingController.AddProgress(a, r);
      e.StreamingCompleted.SetResult(true);
    }
  }
  static AddOrRemoveRenderAssetsQueryViewInfo(e, o) {
    var a;
    if (GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings().bEnableWorldPartition) {
      if (e) {
        if ((a = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass()))?.IsValid()) {
          a.D_AddOrRemoveRenderAssetsQueryViewInfo(e, o);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "viewOrigin参数无效", ["坐标", e]);
      }
    }
  }
  static Kta(e, o, a) {
    var r = ModelManager_1.ModelManager.GameModeModel;
    if (r.CheckRenderAssetsStreamingCompletedTimerId?.Valid() && (TimerSystem_1.TimerSystem.Remove(r.CheckRenderAssetsStreamingCompletedTimerId), r.CheckRenderAssetsStreamingCompletedTimerId = undefined, e = e || UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass()), o = o || new UE.WorldPartitionStreamingQuerySource(), e.IsRenderAssetsStreamingCompleted(o, false, false, true), a) && Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 60, "检查渲染资源(异常结束)", ["是否超时:", false]);
    }
  }
  static async CheckRenderAssetsStreamingCompleted(o, a) {
    const r = ModelManager_1.ModelManager.GameModeModel;
    if (!GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings().bEnableWorldPartition) {
      return r.RenderAssetDone = true;
    }
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "viewOrigin参数无效", ["Reason", a], ["坐标", o]);
      }
      return false;
    }
    const t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass());
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 3, "检查渲染资源(开始)", ["Reason", a], ["坐标", o]);
    }
    const n = new UE.WorldPartitionStreamingQuerySource(o.op_ToVector(), ResourceSystem_1.RENDER_ASSETS_RADIUS, false, false, undefined, false, true, undefined);
    this.Kta(t, n, true);
    if (r.CheckRenderAssetsTimeoutId?.Valid()) {
      TimerSystem_1.TimerSystem.Remove(r.CheckRenderAssetsTimeoutId);
      r.CheckRenderAssetsTimeoutId = undefined;
    }
    const l = new GameModePromise_1.GameModePromise();
    let _ = false;
    if (!GlobalData_1.GlobalData.IsPlayInEditor) {
      r.CheckRenderAssetsTimeoutId = TimerSystem_1.TimerSystem.Delay(() => {
        if (!r.RenderAssetDone) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("World", 3, "检查渲染资源(完成)", ["Reason", a], ["是否超时:", true], ["坐标", o], ["画质", GameSettingsDeviceRender_1.GameSettingsDeviceRender.GameQualitySettingLevel], ["相机位置", CameraController_1.CameraController.CameraLocation.ToString()], ["相机旋转", CameraController_1.CameraController.CameraRotator.ToString()]);
          }
          this.Kta(t, n);
          r.RenderAssetDone = true;
          l.SetResult(true);
          this.AddOrRemoveRenderAssetsQueryViewInfo(o, 0);
        }
      }, ResourceSystem_1.RENDER_ASSETS_TIMEOUT, undefined, "GameModeController.CheckRenderAssetsStreamingCompleted", false);
    }
    r.CheckRenderAssetsStreamingCompletedTimerId = TimerSystem_1.TimerSystem.Forever(() => {
      var e;
      if (!r.RenderAssetDone) {
        e = t.IsRenderAssetsStreamingCompleted(n, _, false, false);
        _ = true;
        if (e) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("World", 3, "检查渲染资源(完成)", ["Reason", a], ["是否超时:", false]);
          }
          if (r.CheckRenderAssetsTimeoutId?.Valid()) {
            TimerSystem_1.TimerSystem.Remove(r.CheckRenderAssetsTimeoutId);
            r.CheckRenderAssetsTimeoutId = undefined;
          }
          TimerSystem_1.TimerSystem.Remove(r.CheckRenderAssetsStreamingCompletedTimerId);
          r.CheckRenderAssetsStreamingCompletedTimerId = undefined;
          r.RenderAssetDone = true;
          l.SetResult(true);
          this.AddOrRemoveRenderAssetsQueryViewInfo(o, 0);
        }
      }
    }, ResourceSystem_1.CHECK_RENDERASSETS_INTERVAL);
    return l.Promise;
  }
  static CheckPreload(o, a) {
    if (PreloadDefine_1.PreloadSetting.UseNewPreload) {
      PreloadControllerNew_1.PreloadControllerNew.DoPreload(e => {
        o?.(e);
      }).then(e => {
        ModelManager_1.ModelManager.GameModeModel.PreloadPromise.SetResult(e);
        a?.(e);
      });
    } else {
      PreloadController_1.PreloadController.DoPreload(e => {
        o?.(e);
      }, e => {
        ModelManager_1.ModelManager.GameModeModel.PreloadPromise.SetResult(e);
        a?.(e);
      });
    }
  }
  static async OpenLoading() {
    var e = new GameModePromise_1.GameModePromise();
    var o = ModelManager_1.ModelManager.GameModeModel;
    if (o) {
      (ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel ? (ModelManager_1.ModelManager.LoadingModel.SetIsLoading(true), e.SetResult(true), o.OpenLoadingEnd) : ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 45, "加载场景:播放CG(开始)"), await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(18, 5, ModelManager_1.ModelManager.GameModeModel.TravelMp4Path, () => {
        var e = Protocol_1.Aki.Protocol.D$_.create();
        e.x$_ = ModelManager_1.ModelManager.GameModeModel.TravelMp4Path ?? "";
        Net_1.Net.Call(26138, e, e => {
          if (!e || e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Teleport", 45, "播放CG完成请求失败", ["ErrorCode", e.Cvs]);
            }
          }
          ModelManager_1.ModelManager.GameModeModel.VideoStartPromise.SetResult(true);
        });
      }, false), o.OpenLoadingEnd.SetResult(true), BlackScreenController_1.BlackScreenController.RemoveBlackScreen("None", "LeaveScene"), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 45, "加载场景:播放CG(完成)"), e) : (ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 45, "加载场景:打开纯黑幕界面(开始)"), await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(7, 3, 1, ModelManager_1.ModelManager.GameModeModel.BlackScreenColor, false, false, undefined, true), BlackScreenController_1.BlackScreenController.RemoveBlackScreen("None", "LeaveScene"), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 45, "加载场景:打开纯黑幕界面(完成)")) : ModelManager_1.ModelManager.GameModeModel.UseShowCenterText ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 45, "加载场景:打开黑幕白字界面(开始)"), await TeleportController_1.TeleportController.TeleportWithCenterTextStart(ModelManager_1.ModelManager.GameModeModel.ShowCenterTextFlow), BlackScreenController_1.BlackScreenController.RemoveBlackScreen("None", "LeaveScene"), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 45, "加载场景:打开黑幕白字界面(完成)")) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "加载场景:打开Loading界面(开始)"), await LoadingController_1.LoadingController.GameModeOpenLoading(), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 3, "加载场景:打开Loading界面(完成)")), e.SetResult(true), o.OpenLoadingEnd)).SetResult(true);
    } else {
      e.SetResult(true);
    }
    return e.Promise;
  }
  static SetTravelMp4(e, o) {
    if (!e || !!o) {
      ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 = e;
      ModelManager_1.ModelManager.GameModeModel.TravelMp4Path = o;
    }
  }
  static ChangeGameMode() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 3, "[Game.ChangeMode] ChangeMode");
    }
    try {
      this.Manager.ChangeMode();
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Game", 3, "[Game.ChangeMode] 调用ControllerManager.ChangeMode异常。", e, ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Game", 3, "[Game.ChangeMode] 调用ControllerManager.ChangeMode异常。", ["error", e]);
      }
    }
    try {
      ModelManager_1.ModelManager.ChangeMode();
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Game", 3, "[Game.ChangeMode] 调用ModelManager.ChangeMode异常。", e, ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Game", 3, "[Game.ChangeMode] 调用ModelManager.ChangeMode异常。", ["error", e]);
      }
    }
  }
  static UpdateFoliageDataLayer() {
    var e;
    if (GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()?.bEnableWorldPartition) {
      e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GameQualitySettingLevel;
      UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateFoliageDataLayer(GlobalData_1.GlobalData.World, e.valueOf() < 0 ? 1 : e);
    }
  }
  static UpdateStreamingQualityLevel() {
    var e;
    var o;
    var a;
    if (GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()?.bEnableWorldPartition) {
      o = "wp.Runtime.ModifyQualityLevelStreamingValue " + ((e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetCurrentDeviceRenderFeature()?.StreamLevel ?? 0) === 0 ? 0.8 : 1);
      a = "wp.Runtime.CurStreamingQualityLevel " + e;
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, o);
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, a);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("World", 3, "UpdateStreamingQualityLevel", ["bEnableWorldPartition", true], ["modifyQualityLevelStreamingValue", o], ["curStreamingQualityLevel", a], ["streamLevel", e]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 3, "UpdateStreamingQualityLevel", ["bEnableWorldPartition", false], ["streamLevel", GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetCurrentDeviceRenderFeature()?.StreamLevel]);
    }
  }
}
exports.GameModeController = GameModeController;
(_a = GameModeController).hra = () => {
  var e;
  if (Net_1.Net.IsServerConnected() && ((e = Protocol_1.Aki.Protocol.GCs.create()).dKn = 0, Net_1.Net.Send(24035, e), Log_1.Log.CheckInfo())) {
    Log_1.Log.Info("GameMode", 54, "ApplicationHasDeactivated 发生时停协议", ["TimeDilation", Time_1.Time.TimeDilation]);
  }
};
GameModeController.Oje = () => {
  var e;
  if (Net_1.Net.IsServerConnected() && ((e = Protocol_1.Aki.Protocol.GCs.create()).dKn = Time_1.Time.TimeDilation, Net_1.Net.Send(24035, e), Log_1.Log.CheckInfo())) {
    Log_1.Log.Info("GameMode", 54, "ApplicationHasReactivated 发生时停协议", ["TimeDilation", Time_1.Time.TimeDilation]);
  }
};
GameModeController.uMe = () => {
  ModelManager_1.ModelManager.GameModeModel.RenderAssetDone = false;
};
GameModeController.nye = () => {
  _a.Hje();
};
GameModeController.Hje = () => {
  var e;
  if (UE.KuroStaticLibrary.IsLowMemoryDevice()) {
    e = ((e = ModelManager_1.ModelManager.AreaModel.AreaInfo) ? ModelManager_1.ModelManager.AreaModel.GetAreaId(e, ExploreProgressDefine_1.AREA_LEVEL) : 0) === LOW_MEMORY_AREA_ID ? 0.5 : 1;
    ModelManager_1.ModelManager.GameModeModel.ScaleStreamingSource(2, e);
  }
};
GameModeController.PreventEntityFalling = () => {
  ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = true;
  var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  if (e?.Valid && (e = e.Entity.GetComponent(3))?.Valid && e.Actor?.IsValid() && e.Actor.CharacterMovement?.IsValid()) {
    e.Actor.KuroSetMovementMode({
      Mode: 0,
      Context: "[GameModeController.PreventEntityFalling]"
    });
  }
};
GameModeController.EnableEntityFalling = () => {
  ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = false;
  var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  if (e?.Valid && (e = e.Entity.GetComponent(3))?.Valid && e.Actor?.IsValid() && e.Actor.CharacterMovement?.IsValid()) {
    e.Actor.KuroSetMovementMode({
      Mode: e.Actor.CharacterMovement.DefaultLandMovementMode,
      Context: "[GameModeController.EnableEntityFalling]"
    });
  }
};
GameModeController.qJl = e => {
  UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, e ? "wp.Runtime.EnableGridBlackList true" : "wp.Runtime.EnableGridBlackList false");
  UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, e ? "r.CLV.Freeze 1" : "r.CLV.Freeze 0");
}; //# sourceMappingURL=GameModeController.js.map