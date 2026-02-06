"use strict";

var __decorate = this && this.__decorate || function (o, e, a, r) {
  var l;
  var t = arguments.length;
  var n = t < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, a) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(o, e, a, r);
  } else {
    for (var d = o.length - 1; d >= 0; d--) {
      if (l = o[d]) {
        n = (t < 3 ? l(n) : t > 3 ? l(e, a, n) : l(e, a)) || n;
      }
    }
  }
  if (t > 3 && n) {
    Object.defineProperty(e, a, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadMapController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const LoadModeManager_1 = require("../../../Core/Performance/LoadMode/LoadModeManager");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate");
const ResourceUpdateManager_1 = require("../../../Launcher/Update/ResourceDiffUpdate/ResourceUpdateManager");
const EventCSharpBridge_1 = require("../../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const LevelEventLockInputState_1 = require("../../LevelGamePlay/LevelEventLockInputState");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const BattleUiControl_1 = require("../../Module/BattleUi/BattleUiControl");
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
const LguiEventSystemManager_1 = require("../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiManager_1 = require("../../Ui/UiManager");
const ELoadingPhase_1 = require("../Define/ELoadingPhase");
const TaskGraph_1 = require("../Task/TaskGraph");
class LoadMapController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return true;
  }
  static OnClear() {
    return true;
  }
  static OnTick(o) {}
  static async OpenLoadingAsync() {
    var o = GlobalData_1.GlobalData.World.GetWorld();
    var e = UE.KuroLevelPlayLibrary.GetWorldInPackage(ModelManager_1.ModelManager.GameModeModel.MapPath);
    var a = e?.K2_GetWorldSettings();
    if (!o?.IsValid() || !a?.IsValid()) {
      throw new Error("LoadMapController加载场景: 目标或者原世界无效");
    }
    var r = ModelManager_1.ModelManager.GameModeModel.LoadMapControllerDynamicStreamingLevels.get(ModelManager_1.ModelManager.GameModeModel.MapPath);
    var r = r && r.size !== 0;
    if (a.bEnableWorldPartition && !r) {
      throw new Error("LoadMapController加载场景: 不允许直接从非WP到WP, 只能先从WP到非WP然后回*原*WP");
    }
    if (r) {
      UE.NavigationSystemV1.DestroyStreamingDungeonNavSystem(o);
    } else {
      UE.NavigationSystemV1.CreateAndUseStreamingDungeonNavSystem(o, e, a.NavigationSystemConfig);
    }
    r = ModelManager_1.ModelManager.GameModeModel;
    r.RenderAssetDone = false;
    r.EndDataLayerChange();
    if (!r.BornLocation || !r.BornRotator) {
      throw new Error(`LoadMapController加载场景: 出生点坐标无效 ${r.BornLocation}, ${r.BornRotator}`);
    }
    r.CreatePromise();
    ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(0, undefined, 1, true);
    await ControllerHolder_1.ControllerHolder.GameModeController.OpenLoading();
  }
  static async CheckQuestResource() {
    if (VideoResUpdate_1.VideoResUpdate.GetIsGrayBoxHit() && ModelManager_1.ModelManager.QuestResourceModel.IsSeparateVideo && ModelManager_1.ModelManager.QuestResourceModel.NeedCheckQuestResource()) {
      await ModelManager_1.ModelManager.QuestResourceModel.CheckQuestResource();
    }
    if (ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("QuestResource", 70, "开始检查可选下载资源"), await ControllerHolder_1.ControllerHolder.ResourceManagerController.CheckOptResDownload(), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("QuestResource", 70, "完成检查可选下载资源");
    }
  }
  static AK1() {
    ControllerHolder_1.ControllerHolder.GameModeController.InitStreamingSources();
    ModelManager_1.ModelManager.GameModeModel.DisableStreamingSources();
  }
  static PK1(o) {
    var e = GlobalData_1.GlobalData.World.GetWorld();
    if (e?.IsValid()) {
      if (o) {
        UE.KuroLevelPlayLibrary.FakeAddAlwaysLoadedActorsToWorld(e);
      } else {
        UE.KuroLevelPlayLibrary.FakeRemoveAlwaysLoadedActorsFromWorld(e);
      }
    }
  }
  static xK1() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BeforeLoadMap);
    LoadModeManager_1.LoadModeManager.SetLoadModeByReason("Loading", "PreLoadLevelInstance");
    UE.Actor.SetKuroNetMode(1);
    UiManager_1.UiManager.LockOpen();
    Net_1.Net.PauseAllNotifyCallback();
    ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("LoadMapController.WorldPartitionLoadLevelInstance");
  }
  static UK1() {
    Net_1.Net.ResumeAllNotifyCallback();
    UiManager_1.UiManager.UnLockOpen();
    LevelSequencePlayer_1.LevelSequencePlayer.SetBanned(false);
    LguiEventSystemManager_1.LguiEventSystemManager.RefreshCurrentInputModule();
    ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(ELoadingPhase_1.OPENLEVEL_END_PROGRESS);
  }
  static async LoadLevelInstanceAsync(l, o, t) {
    return new Promise((o, e) => {
      var a = (0, puerts_1.$ref)(false);
      MathUtils_1.MathUtils.CommonTempVector.Reset();
      MathUtils_1.MathUtils.CommonTempRotator.Reset();
      const r = UE.LevelStreamingDynamic.LoadLevelInstance(GlobalData_1.GlobalData.World, l, MathUtils_1.MathUtils.CommonTempVector.ToUeVectorOld(), MathUtils_1.MathUtils.CommonTempRotator.ToUeRotator(), a);
      r.bInitiallyLoaded = true;
      r.bInitiallyVisible = t;
      r.SetShouldBeLoaded(true);
      r.SetShouldBeVisible(t);
      if (!(0, puerts_1.$unref)(a)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GameMode", 72, "LoadMapController加载场景:加载失败");
        }
        e(new Error("LoadMapController加载场景"));
      }
      if (!ModelManager_1.ModelManager.GameModeModel.LoadMapControllerDynamicStreamingLevels.has(ModelManager_1.ModelManager.GameModeModel.LastMapPath)) {
        ModelManager_1.ModelManager.GameModeModel.LoadMapControllerDynamicStreamingLevels.set(ModelManager_1.ModelManager.GameModeModel.LastMapPath, new Set());
      }
      ModelManager_1.ModelManager.GameModeModel.LoadMapControllerDynamicStreamingLevels.get(ModelManager_1.ModelManager.GameModeModel.LastMapPath)?.add(r);
      if (t) {
        r.OnLevelShown.Add(() => {
          o(r);
          r.OnLevelShown.Clear();
        });
      } else {
        o(r);
      }
    });
  }
  static async LoadLevelsAsync() {
    var o = UE.KuroLevelPlayLibrary.GetWorldInPackage(ModelManager_1.ModelManager.GameModeModel.MapPath);
    if (o?.IsValid()) {
      var e = o.K2_GetWorldSettings();
      if (e?.IsValid()) {
        LoadMapController.xK1();
        ModelManager_1.ModelManager.GameModeModel.LoadMapControllerEnableWorldPartition = e.bEnableWorldPartition;
        if (e.bEnableWorldPartition) {
          LoadMapController.PK1(true);
          var a = ModelManager_1.ModelManager.GameModeModel.LoadMapControllerDynamicStreamingLevels.get(ModelManager_1.ModelManager.GameModeModel.MapPath);
          if (a) {
            for (const d of a) {
              if (d.IsValid()) {
                d.OnLevelShown.Clear();
                d.SetShouldBeVisible(false);
                d.SetShouldBeLoaded(false);
              }
              a.delete(d);
            }
          }
        } else {
          LoadMapController.AK1();
          LoadMapController.PK1(false);
          var r = o.StreamingLevels;
          var l = new Array();
          l.push(LoadMapController.LoadLevelInstanceAsync(ModelManager_1.ModelManager.GameModeModel.MapPath, true, true));
          for (let o = 0, e = r.Num(); o < e; ++o) {
            var t = r.Get(o);
            var n = t.GetWorldAssetPackageFName();
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:", ["levelName ", n], ["bShouldBeLoaded ", t.bShouldBeLoaded], ["bShouldBeVisible ", t.bShouldBeVisible]);
            }
            if (n.toString() !== "") {
              l.push(LoadMapController.LoadLevelInstanceAsync(n.toString(), t.bShouldBeLoaded, t.bShouldBeVisible));
            }
          }
          await Promise.all(l);
        }
        LoadMapController.UK1();
      }
    }
  }
  static async ApplyMaterialParameterCollectionAsync(o) {
    var e = ELoadingPhase_1.PRELOAD_END_PROGRESS - ELoadingPhase_1.OPENLEVEL_END_PROGRESS;
    ControllerHolder_1.ControllerHolder.GameModeController.ApplyMaterialParameterCollection(o.BRs);
    await ModelManager_1.ModelManager.GameModeModel.ApplyMaterialParameterCollectionPromise.Promise;
    ControllerHolder_1.ControllerHolder.LoadingController.AddProgress(e * 0.2, ELoadingPhase_1.PRELOAD_END_PROGRESS);
  }
  static async CommonAndEntityPreloadAsync() {
    var o = ELoadingPhase_1.PRELOAD_END_PROGRESS - ELoadingPhase_1.OPENLEVEL_END_PROGRESS;
    ControllerHolder_1.ControllerHolder.GameModeController.CheckPreload(() => {
      ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("LoadMapController.WorldPartitionLoadLevelInstance");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AfterLoadMap);
      EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsAfterLoadMap);
    });
    await ModelManager_1.ModelManager.GameModeModel.PreloadPromise.Promise;
    ControllerHolder_1.ControllerHolder.LoadingController.AddProgress(o * 0.6, ELoadingPhase_1.PRELOAD_END_PROGRESS);
  }
  static async LoadBattleViewAsync() {
    var o = ELoadingPhase_1.PRELOAD_END_PROGRESS - ELoadingPhase_1.OPENLEVEL_END_PROGRESS;
    await BattleUiControl_1.BattleUiControl.PreloadBattleViewFromLoading(ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel);
    ControllerHolder_1.ControllerHolder.LoadingController.AddProgress(o * 0.1, ELoadingPhase_1.PRELOAD_END_PROGRESS);
  }
  static async ControllerPreloadAsync() {
    var o = ELoadingPhase_1.PRELOAD_END_PROGRESS - ELoadingPhase_1.OPENLEVEL_END_PROGRESS;
    var e = this.Manager.Preload();
    if (e.length !== 0) {
      var a = new Array();
      for (const l of e) {
        const t = l[0];
        var r = l[1];
        r.Promise.then(o => {
          if (!o) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("GameMode", 72, "LoadMapController加载场景:执行Controller预加载失败", ["Name", t]);
            }
          }
        });
        a.push(r.Promise);
      }
      await Promise.all(a);
      ControllerHolder_1.ControllerHolder.LoadingController.AddProgress(o * 0.1, ELoadingPhase_1.PRELOAD_END_PROGRESS);
      ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(ELoadingPhase_1.PRELOAD_END_PROGRESS);
    }
  }
  static async AfterJoinSceneAsync() {
    await ModelManager_1.ModelManager.GameModeModel.AfterJoinSceneNotifyPromise.Promise;
  }
  static async LoadSubLevelsAsync(o) {
    ControllerHolder_1.ControllerHolder.GameModeController.LoadDataLayers(o);
    ControllerHolder_1.ControllerHolder.GameModeController.UpdateStreamingQualityLevel();
    await ControllerHolder_1.ControllerHolder.SubLevelController.CheckLoadSubLevels(o);
    ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(ELoadingPhase_1.SETDATALAYER_AND_LOADSUBLEVEL_END_PROGRESS);
  }
  static async VoxelStreamingAsync() {
    if (ModelManager_1.ModelManager.GameModeModel.LoadMapControllerEnableWorldPartition) {
      ControllerHolder_1.ControllerHolder.GameModeController.InitStreamingSources();
      ControllerHolder_1.ControllerHolder.ResourceManagerController.InitBlockDownloadState();
      ControllerHolder_1.ControllerHolder.WorldController.ManuallyClearStreamingPool();
      ControllerHolder_1.ControllerHolder.GameModeController.AddOrRemoveRenderAssetsQueryViewInfo(ModelManager_1.ModelManager.GameModeModel.BornLocation, ResourceSystem_1.WAIT_RENDER_ASSET_DURATION);
      await ControllerHolder_1.ControllerHolder.GameModeController.CheckVoxelStreamingCompleted(ELoadingPhase_1.CHECK_VOXEL_STREAMING_END_PROGRESS - ELoadingPhase_1.SETDATALAYER_AND_LOADSUBLEVEL_END_PROGRESS, ELoadingPhase_1.CHECK_VOXEL_STREAMING_END_PROGRESS);
      ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
    }
    ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(ELoadingPhase_1.CHECK_VOXEL_STREAMING_END_PROGRESS);
  }
  static async StreamingAsync() {
    if (ModelManager_1.ModelManager.GameModeModel.LoadMapControllerEnableWorldPartition) {
      await ControllerHolder_1.ControllerHolder.GameModeController.CheckStreamingCompleted(ELoadingPhase_1.CHECK_STREAMING_END_PROGRESS - ELoadingPhase_1.CHECK_VOXEL_STREAMING_END_PROGRESS, ELoadingPhase_1.CHECK_STREAMING_END_PROGRESS);
      ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
      ControllerHolder_1.ControllerHolder.WorldController.ManuallyResetStreamingPool();
      if (Info_1.Info.IsPlayInEditor) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "kepm.wp.RecordActivateGridActor");
      }
      ModelManager_1.ModelManager.GameModeModel.StopIndependentStreaming();
    }
    ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(ELoadingPhase_1.CHECK_STREAMING_END_PROGRESS);
  }
  static async CreateEntityAsync() {
    ControllerHolder_1.ControllerHolder.CameraController.ReturnLockOnCameraMode();
    ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(Protocol_1.Aki.Protocol.Nks.Proto_SceneInit);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:加载编队(开始)");
    }
    await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:加载编队(完成)");
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:等待场景战斗实体加载(开始)");
    }
    await ModelManager_1.ModelManager.BulletModel.WaitSceneBulletOwnerInit()?.Promise;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:等待场景战斗实体加载(完成)");
    }
    ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(ELoadingPhase_1.CREATE_ENTITY_END_PROGRESS);
  }
  static async RenderAssetStreamingAsync() {
    let o = true;
    if (o = Info_1.Info.IsPlayInEditor ? UE.KuroEditorUtilityLibrary.GetGConfigEditorSettings("/Script/KuroEditorUtility.KuroEditorUtilitySetting", "WaitHLODResInLoading") : o) {
      await ControllerHolder_1.ControllerHolder.GameModeController.CheckRenderAssetsStreamingCompleted(ModelManager_1.ModelManager.GameModeModel.BornLocation, "LoadMapController加载场景");
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 41, "LoadMapController加载场景:编辑器跳过等待Streaming阶段,加速进入场景。你可以在UGS勾选发布模式来恢复等待。", ["bWaitStreamingCompleted", o]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FixBornLocation);
    ControllerHolder_1.ControllerHolder.GameModeController.FixBornLocation();
    ControllerHolder_1.ControllerHolder.RoleTriggerController.UpdateTransform();
    if (ModelManager_1.ModelManager.GameModeModel.LoadMapControllerEnableWorldPartition) {
      ModelManager_1.ModelManager.GameModeModel.AttachStreamingSourcesToActor(ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTriggerOrUndefined());
    }
  }
  static async WorldDoneAsync(o) {
    ModelManager_1.ModelManager.GameModeModel.WorldDone = true;
    ModelManager_1.ModelManager.CreatureModel.SetIsLoadingScene(false);
    ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(true, true, true, true);
    LevelEventLockInputState_1.LevelEventLockInputState.Unlock();
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Broadcast();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldDone);
    ControllerHolder_1.ControllerHolder.RoleAudioController.SetUpdateAudioDynamicTrace(true);
    if (!ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 && !o) {
      await BattleUiControl_1.BattleUiControl.OpenBattleViewFromLoading();
    }
    if (!o) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(Rotator_1.Rotator.ZeroRotator);
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ResetInitialCameraRotation();
    }
    ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(ELoadingPhase_1.WORLD_DONE_END_PROGRESS);
  }
  static async LoadEndAsync(o) {
    LoadModeManager_1.LoadModeManager.ResetLoadModeByReason("PreLoadLevelInstance");
    ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(false);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:关闭Loading界面(开始)");
    }
    await ControllerHolder_1.ControllerHolder.LoadingController.GameModeCloseLoading();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:关闭Loading界面(完成)");
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:通知服务端加载完成（开始）");
    }
    await ControllerHolder_1.ControllerHolder.CreatureController.SceneLoadingFinishRequest(o);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:通知服务端加载完成（完成）");
    }
    ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = true;
    ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldDoneAndCloseLoading);
    ModelManager_1.ModelManager.GameModeModel.ResetPromise();
    ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 1;
  }
  static async Load(e) {
    try {
      var o = new Map([[LoadMapController.OpenLoadingAsync.name, {
        Run: LoadMapController.OpenLoadingAsync.bind(LoadMapController)
      }], [LoadMapController.CheckQuestResource.name, {
        Run: LoadMapController.CheckQuestResource.bind(LoadMapController)
      }], [LoadMapController.LoadLevelsAsync.name, {
        Run: LoadMapController.LoadLevelsAsync.bind(LoadMapController)
      }], [LoadMapController.ApplyMaterialParameterCollectionAsync.name, {
        Run: LoadMapController.ApplyMaterialParameterCollectionAsync.bind(LoadMapController, e)
      }], [LoadMapController.CommonAndEntityPreloadAsync.name, {
        Run: LoadMapController.CommonAndEntityPreloadAsync.bind(LoadMapController)
      }], [LoadMapController.LoadBattleViewAsync.name, {
        Run: LoadMapController.LoadBattleViewAsync.bind(LoadMapController)
      }], [LoadMapController.ControllerPreloadAsync.name, {
        Run: LoadMapController.ControllerPreloadAsync.bind(LoadMapController)
      }], [LoadMapController.AfterJoinSceneAsync.name, {
        Run: LoadMapController.AfterJoinSceneAsync.bind(LoadMapController)
      }], [LoadMapController.LoadSubLevelsAsync.name, {
        Run: LoadMapController.LoadSubLevelsAsync.bind(LoadMapController, e)
      }], [LoadMapController.VoxelStreamingAsync.name, {
        Run: LoadMapController.VoxelStreamingAsync.bind(LoadMapController)
      }], [LoadMapController.StreamingAsync.name, {
        Run: LoadMapController.StreamingAsync.bind(LoadMapController)
      }], [LoadMapController.CreateEntityAsync.name, {
        Run: LoadMapController.CreateEntityAsync.bind(LoadMapController)
      }], [LoadMapController.RenderAssetStreamingAsync.name, {
        Run: LoadMapController.RenderAssetStreamingAsync.bind(LoadMapController)
      }], [LoadMapController.WorldDoneAsync.name, {
        Run: LoadMapController.WorldDoneAsync.bind(LoadMapController, false)
      }], [LoadMapController.LoadEndAsync.name, {
        Run: LoadMapController.LoadEndAsync.bind(LoadMapController, e.BKn)
      }]]);
      var a = [[LoadMapController.OpenLoadingAsync.name, LoadMapController.LoadLevelsAsync.name], [LoadMapController.LoadLevelsAsync.name, LoadMapController.AfterJoinSceneAsync.name], [LoadMapController.LoadLevelsAsync.name, LoadMapController.LoadSubLevelsAsync.name], [LoadMapController.AfterJoinSceneAsync.name, LoadMapController.ApplyMaterialParameterCollectionAsync.name], [LoadMapController.AfterJoinSceneAsync.name, LoadMapController.CommonAndEntityPreloadAsync.name], [LoadMapController.AfterJoinSceneAsync.name, LoadMapController.LoadBattleViewAsync.name], [LoadMapController.AfterJoinSceneAsync.name, LoadMapController.ControllerPreloadAsync.name], [LoadMapController.LoadSubLevelsAsync.name, LoadMapController.VoxelStreamingAsync.name], [LoadMapController.VoxelStreamingAsync.name, LoadMapController.StreamingAsync.name], [LoadMapController.ControllerPreloadAsync.name, LoadMapController.CreateEntityAsync.name], [LoadMapController.CommonAndEntityPreloadAsync.name, LoadMapController.CreateEntityAsync.name], [LoadMapController.CreateEntityAsync.name, LoadMapController.RenderAssetStreamingAsync.name], [LoadMapController.RenderAssetStreamingAsync.name, LoadMapController.WorldDoneAsync.name], [LoadMapController.WorldDoneAsync.name, LoadMapController.LoadEndAsync.name]];
      await new TaskGraph_1.TaskGraph(o, a).Run();
    } catch (o) {
      if (o instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("GameMode", 72, "TaskGraph执行异常", o, ["error", o.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameMode", 72, "TaskGraph执行异常", ["error", o]);
      }
      await ControllerHolder_1.ControllerHolder.GameModeController.Load(e);
    }
  }
}
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 打开Loading遮罩")], LoadMapController, "OpenLoadingAsync", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 检查任务资源数据")], LoadMapController, "CheckQuestResource", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景")], LoadMapController, "LoadLevelsAsync", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 应用MPC")], LoadMapController, "ApplyMaterialParameterCollectionAsync", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 预加载Common、Entity资源")], LoadMapController, "CommonAndEntityPreloadAsync", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: LoadBattleView")], LoadMapController, "LoadBattleViewAsync", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: Controller Preload")], LoadMapController, "ControllerPreloadAsync", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 等待AfterJoinSceneNotify")], LoadMapController, "AfterJoinSceneAsync", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 加载子关卡")], LoadMapController, "LoadSubLevelsAsync", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 检测体素流送")], LoadMapController, "VoxelStreamingAsync", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 检测场景流送")], LoadMapController, "StreamingAsync", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 创建实体")], LoadMapController, "CreateEntityAsync", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: RenderAssets Streaming")], LoadMapController, "RenderAssetStreamingAsync", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: WorldDone")], LoadMapController, "WorldDoneAsync", null);
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: Loading结束")], LoadMapController, "LoadEndAsync", null);
exports.LoadMapController = LoadMapController; //# sourceMappingURL=LoadMapController.js.map