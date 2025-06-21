"use strict";
var __decorate = this && this.__decorate || function(o, e, a, r) {
  var l, t = arguments.length,
    n = t < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, a) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(o, e, a, r);
  else
    for (var d = o.length - 1; 0 <= d; d--)(l = o[d]) && (n = (t < 3 ? l(n) : 3 < t ? l(e, a, n) : l(e, a)) || n);
  return 3 < t && n && Object.defineProperty(e, a, n), n
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LoadMapController = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  LevelEventLockInputState_1 = require("../../LevelGamePlay/LevelEventLockInputState"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  BattleUiControl_1 = require("../../Module/BattleUi/BattleUiControl"),
  LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer"),
  LguiEventSystemManager_1 = require("../../Ui/LguiEventSystem/LguiEventSystemManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ELoadingPhase_1 = require("../Define/ELoadingPhase"),
  TaskGraph_1 = require("../Task/TaskGraph");
class LoadMapController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return !0
  }
  static OnClear() {
    return !0
  }
  static OnTick(o) {}
  static async OpenLoadingAsync() {
    var o = GlobalData_1.GlobalData.World.GetWorld(),
      e = UE.KuroLevelPlayLibrary.GetWorldInPackage(ModelManager_1.ModelManager.GameModeModel.MapPath),
      a = e?.K2_GetWorldSettings();
    if (!o?.IsValid() || !a?.IsValid()) throw new Error("LoadMapController加载场景: 目标或者原世界无效");
    var r = ModelManager_1.ModelManager.GameModeModel.LoadMapControllerDynamicStreamingLevels.get(ModelManager_1.ModelManager.GameModeModel.MapPath),
      r = r && 0 !== r.size;
    if (a.bEnableWorldPartition && !r) throw new Error("LoadMapController加载场景: 不允许直接从非WP到WP, 只能先从WP到非WP然后回*原*WP");
    r ? UE.NavigationSystemV1.DestroyStreamingDungeonNavSystem(o) : UE.NavigationSystemV1.CreateAndUseStreamingDungeonNavSystem(o, e, a.NavigationSystemConfig);
    r = ModelManager_1.ModelManager.GameModeModel;
    if (r.RenderAssetDone = !1, r.EndDataLayerChange(), !r.BornLocation || !r.BornRotator) throw new Error(`LoadMapController加载场景: 出生点坐标无效 ${r.BornLocation}, ` + r.BornRotator);
    r.CreatePromise(), ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(0, void 0, 1, !0), await ControllerHolder_1.ControllerHolder.GameModeController.OpenLoading()
  }
  static async CheckQuestResource() {
    ModelManager_1.ModelManager.QuestResourceModel.IsSeparateVideo && ModelManager_1.ModelManager.QuestResourceModel.NeedCheckQuestResource() && await ModelManager_1.ModelManager.QuestResourceModel.CheckQuestResource()
  }
  static jQ1() {
    ControllerHolder_1.ControllerHolder.GameModeController.InitStreamingSources(), ModelManager_1.ModelManager.GameModeModel.DisableStreamingSources()
  }
  static HQ1(o) {
    var e = GlobalData_1.GlobalData.World.GetWorld();
    e?.IsValid() && (o ? UE.KuroLevelPlayLibrary.FakeAddAlwaysLoadedActorsToWorld(e) : UE.KuroLevelPlayLibrary.FakeRemoveAlwaysLoadedActorsFromWorld(e))
  }
  static $Q1() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BeforeLoadMap), ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(GlobalData_1.GlobalData.World, "LoadMapController.PreLoadLevelInstance"), UE.Actor.SetKuroNetMode(1), UiManager_1.UiManager.LockOpen(), Net_1.Net.PauseAllNotifyCallback(), ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("LoadMapController.WorldPartitionLoadLevelInstance")
  }
  static WQ1() {
    Net_1.Net.ResumeAllNotifyCallback(), UiManager_1.UiManager.UnLockOpen(), LevelSequencePlayer_1.LevelSequencePlayer.SetBanned(!1), LguiEventSystemManager_1.LguiEventSystemManager.RefreshCurrentInputModule(), ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(ELoadingPhase_1.OPENLEVEL_END_PROGRESS)
  }
  static async LoadLevelInstanceAsync(l, o, t) {
    return new Promise((o, e) => {
      var a = (0, puerts_1.$ref)(!1);
      MathUtils_1.MathUtils.CommonTempVector.Reset(), MathUtils_1.MathUtils.CommonTempRotator.Reset();
      const r = UE.LevelStreamingDynamic.LoadLevelInstance(GlobalData_1.GlobalData.World, l, MathUtils_1.MathUtils.CommonTempVector.ToUeVectorOld(), MathUtils_1.MathUtils.CommonTempRotator.ToUeRotator(), a);
      r.bInitiallyLoaded = !0, r.bInitiallyVisible = t, r.SetShouldBeLoaded(!0), r.SetShouldBeVisible(t), (0, puerts_1.$unref)(a) || (Log_1.Log.CheckError() && Log_1.Log.Error("GameMode", 72, "LoadMapController加载场景:加载失败"), e(new Error("LoadMapController加载场景"))), ModelManager_1.ModelManager.GameModeModel.LoadMapControllerDynamicStreamingLevels.has(ModelManager_1.ModelManager.GameModeModel.LastMapPath) || ModelManager_1.ModelManager.GameModeModel.LoadMapControllerDynamicStreamingLevels.set(ModelManager_1.ModelManager.GameModeModel.LastMapPath, new Set), ModelManager_1.ModelManager.GameModeModel.LoadMapControllerDynamicStreamingLevels.get(ModelManager_1.ModelManager.GameModeModel.LastMapPath)?.add(r), t ? r.OnLevelShown.Add(() => {
        o(r), r.OnLevelShown.Clear()
      }) : o(r)
    })
  }
  static async LoadLevelsAsync() {
    var o = UE.KuroLevelPlayLibrary.GetWorldInPackage(ModelManager_1.ModelManager.GameModeModel.MapPath);
    if (o?.IsValid()) {
      var e = o.K2_GetWorldSettings();
      if (e?.IsValid()) {
        if (LoadMapController.$Q1(), ModelManager_1.ModelManager.GameModeModel.LoadMapControllerEnableWorldPartition = e.bEnableWorldPartition, e.bEnableWorldPartition) {
          LoadMapController.HQ1(!0);
          var a = ModelManager_1.ModelManager.GameModeModel.LoadMapControllerDynamicStreamingLevels.get(ModelManager_1.ModelManager.GameModeModel.MapPath);
          if (a)
            for (const d of a) d.IsValid() && (d.OnLevelShown.Clear(), d.SetShouldBeVisible(!1), d.SetShouldBeLoaded(!1)), a.delete(d)
        } else {
          LoadMapController.jQ1(), LoadMapController.HQ1(!1);
          var r = o.StreamingLevels,
            l = new Array;
          l.push(LoadMapController.LoadLevelInstanceAsync(ModelManager_1.ModelManager.GameModeModel.MapPath, !0, !0));
          for (let o = 0, e = r.Num(); o < e; ++o) {
            var t = r.Get(o),
              n = t.GetWorldAssetPackageFName();
            Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:", ["levelName ", n], ["bShouldBeLoaded ", t.bShouldBeLoaded], ["bShouldBeVisible ", t.bShouldBeVisible]), "" !== n.toString() && l.push(LoadMapController.LoadLevelInstanceAsync(n.toString(), t.bShouldBeLoaded, t.bShouldBeVisible))
          }
          await Promise.all(l)
        }
        LoadMapController.WQ1()
      }
    }
  }
  static async ApplyMaterialParameterCollectionAsync(o) {
    var e = ELoadingPhase_1.PRELOAD_END_PROGRESS - ELoadingPhase_1.OPENLEVEL_END_PROGRESS;
    ControllerHolder_1.ControllerHolder.GameModeController.ApplyMaterialParameterCollection(o.BRs), await ModelManager_1.ModelManager.GameModeModel.ApplyMaterialParameterCollectionPromise.Promise, ControllerHolder_1.ControllerHolder.LoadingController.AddProgress(.2 * e, ELoadingPhase_1.PRELOAD_END_PROGRESS)
  }
  static async CommonAndEntityPreloadAsync() {
    var o = ELoadingPhase_1.PRELOAD_END_PROGRESS - ELoadingPhase_1.OPENLEVEL_END_PROGRESS;
    ControllerHolder_1.ControllerHolder.GameModeController.CheckPreload(() => {
      ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("LoadMapController.WorldPartitionLoadLevelInstance"), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AfterLoadMap)
    }), await ModelManager_1.ModelManager.GameModeModel.PreloadPromise.Promise, ControllerHolder_1.ControllerHolder.LoadingController.AddProgress(.6 * o, ELoadingPhase_1.PRELOAD_END_PROGRESS)
  }
  static async LoadBattleViewAsync() {
    var o = ELoadingPhase_1.PRELOAD_END_PROGRESS - ELoadingPhase_1.OPENLEVEL_END_PROGRESS;
    await BattleUiControl_1.BattleUiControl.PreloadBattleViewFromLoading(ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel), ControllerHolder_1.ControllerHolder.LoadingController.AddProgress(.1 * o, ELoadingPhase_1.PRELOAD_END_PROGRESS)
  }
  static async ControllerPreloadAsync() {
    var o = ELoadingPhase_1.PRELOAD_END_PROGRESS - ELoadingPhase_1.OPENLEVEL_END_PROGRESS,
      e = this.Manager.Preload();
    if (0 !== e.length) {
      var a = new Array;
      for (const l of e) {
        const t = l[0];
        var r = l[1];
        r.Promise.then(o => {
          o || Log_1.Log.CheckError() && Log_1.Log.Error("GameMode", 72, "LoadMapController加载场景:执行Controller预加载失败", ["Name", t])
        }), a.push(r.Promise)
      }
      await Promise.all(a), ControllerHolder_1.ControllerHolder.LoadingController.AddProgress(.1 * o, ELoadingPhase_1.PRELOAD_END_PROGRESS), ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(ELoadingPhase_1.PRELOAD_END_PROGRESS)
    }
  }
  static async AfterJoinSceneAsync() {
    await ModelManager_1.ModelManager.GameModeModel.AfterJoinSceneNotifyPromise.Promise
  }
  static async LoadSubLevelsAsync(o) {
    ControllerHolder_1.ControllerHolder.GameModeController.LoadDataLayers(o), ControllerHolder_1.ControllerHolder.GameModeController.UpdateStreamingQualityLevel(), await ControllerHolder_1.ControllerHolder.SubLevelController.CheckLoadSubLevels(o), ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(ELoadingPhase_1.SETDATALAYER_AND_LOADSUBLEVEL_END_PROGRESS)
  }
  static async VoxelStreamingAsync() {
    ModelManager_1.ModelManager.GameModeModel.LoadMapControllerEnableWorldPartition && (ControllerHolder_1.ControllerHolder.GameModeController.InitStreamingSources(), ControllerHolder_1.ControllerHolder.WorldController.ManuallyClearStreamingPool(), ControllerHolder_1.ControllerHolder.GameModeController.AddOrRemoveRenderAssetsQueryViewInfo(ModelManager_1.ModelManager.GameModeModel.BornLocation, ResourceSystem_1.WAIT_RENDER_ASSET_DURATION), await ControllerHolder_1.ControllerHolder.GameModeController.CheckVoxelStreamingCompleted(ELoadingPhase_1.CHECK_VOXEL_STREAMING_END_PROGRESS - ELoadingPhase_1.SETDATALAYER_AND_LOADSUBLEVEL_END_PROGRESS, ELoadingPhase_1.CHECK_VOXEL_STREAMING_END_PROGRESS), ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(!1)), ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(ELoadingPhase_1.CHECK_VOXEL_STREAMING_END_PROGRESS)
  }
  static async StreamingAsync() {
    ModelManager_1.ModelManager.GameModeModel.LoadMapControllerEnableWorldPartition && (await ControllerHolder_1.ControllerHolder.GameModeController.CheckStreamingCompleted(ELoadingPhase_1.CHECK_STREAMING_END_PROGRESS - ELoadingPhase_1.CHECK_VOXEL_STREAMING_END_PROGRESS, ELoadingPhase_1.CHECK_STREAMING_END_PROGRESS), ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(!1), ControllerHolder_1.ControllerHolder.WorldController.ManuallyResetStreamingPool(), Info_1.Info.IsPlayInEditor && UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "kepm.wp.RecordActivateGridActor"), ModelManager_1.ModelManager.GameModeModel.StopIndependentStreaming()), ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(ELoadingPhase_1.CHECK_STREAMING_END_PROGRESS)
  }
  static async CreateEntityAsync() {
    ControllerHolder_1.ControllerHolder.CameraController.ReturnLockOnCameraMode(), ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(Protocol_1.Aki.Protocol.Nks.Proto_SceneInit), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:加载编队(开始)"), await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:加载编队(完成)"), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:等待场景战斗实体加载(开始)"), await ModelManager_1.ModelManager.BulletModel.WaitSceneBulletOwnerInit()?.Promise, Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:等待场景战斗实体加载(完成)"), ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(ELoadingPhase_1.CREATE_ENTITY_END_PROGRESS)
  }
  static async RenderAssetStreamingAsync() {
    let o = !0;
    (o = Info_1.Info.IsPlayInEditor ? UE.KuroEditorUtilityLibrary.GetGConfigEditorSettings("/Script/KuroEditorUtility.KuroEditorUtilitySetting", "WaitHLODResInLoading") : o) ? await ControllerHolder_1.ControllerHolder.GameModeController.CheckRenderAssetsStreamingCompleted(ModelManager_1.ModelManager.GameModeModel.BornLocation, "LoadMapController加载场景"): Log_1.Log.CheckInfo() && Log_1.Log.Info("World", 41, "LoadMapController加载场景:编辑器跳过等待Streaming阶段,加速进入场景。你可以在UGS勾选发布模式来恢复等待。", ["bWaitStreamingCompleted", o]), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FixBornLocation), ControllerHolder_1.ControllerHolder.GameModeController.FixBornLocation(), ControllerHolder_1.ControllerHolder.RoleTriggerController.UpdateTransform(), ModelManager_1.ModelManager.GameModeModel.LoadMapControllerEnableWorldPartition && ModelManager_1.ModelManager.GameModeModel.AttachStreamingSourcesToActor(ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTriggerOrUndefined())
  }
  static async WorldDoneAsync(o) {
    ModelManager_1.ModelManager.GameModeModel.WorldDone = !0, ModelManager_1.ModelManager.CreatureModel.SetIsLoadingScene(!1), ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(!0, !0, !0, !0), LevelEventLockInputState_1.LevelEventLockInputState.Unlock(), ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(), GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Broadcast(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldDone), ControllerHolder_1.ControllerHolder.RoleAudioController.SetUpdateAudioDynamicTrace(!0), ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 || o || await BattleUiControl_1.BattleUiControl.OpenBattleViewFromLoading(), o || (ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(Rotator_1.Rotator.ZeroRotator), ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ResetInitialCameraRotation()), ControllerHolder_1.ControllerHolder.LoadingController.SetProgress(ELoadingPhase_1.WORLD_DONE_END_PROGRESS)
  }
  static async LoadEndAsync(o) {
    ResourceSystem_1.ResourceSystem.SetLoadModeInGame(GlobalData_1.GlobalData.World, "LoadMapController.PreLoadLevelInstance"), ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(!1), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:关闭Loading界面(开始)"), await ControllerHolder_1.ControllerHolder.LoadingController.GameModeCloseLoading(), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:关闭Loading界面(完成)"), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:通知服务端加载完成（开始）"), await ControllerHolder_1.ControllerHolder.CreatureController.SceneLoadingFinishRequest(o), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 72, "LoadMapController加载场景:通知服务端加载完成（完成）"), ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee = !0, ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed = !0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldDoneAndCloseLoading), ModelManager_1.ModelManager.GameModeModel.ResetPromise(), ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 1
  }
  static async Load(e) {
    try {
      var o = new Map([
          [LoadMapController.OpenLoadingAsync.name, {
            Run: LoadMapController.OpenLoadingAsync.bind(LoadMapController)
          }],
          [LoadMapController.CheckQuestResource.name, {
            Run: LoadMapController.CheckQuestResource.bind(LoadMapController)
          }],
          [LoadMapController.LoadLevelsAsync.name, {
            Run: LoadMapController.LoadLevelsAsync.bind(LoadMapController)
          }],
          [LoadMapController.ApplyMaterialParameterCollectionAsync.name, {
            Run: LoadMapController.ApplyMaterialParameterCollectionAsync.bind(LoadMapController, e)
          }],
          [LoadMapController.CommonAndEntityPreloadAsync.name, {
            Run: LoadMapController.CommonAndEntityPreloadAsync.bind(LoadMapController)
          }],
          [LoadMapController.LoadBattleViewAsync.name, {
            Run: LoadMapController.LoadBattleViewAsync.bind(LoadMapController)
          }],
          [LoadMapController.ControllerPreloadAsync.name, {
            Run: LoadMapController.ControllerPreloadAsync.bind(LoadMapController)
          }],
          [LoadMapController.AfterJoinSceneAsync.name, {
            Run: LoadMapController.AfterJoinSceneAsync.bind(LoadMapController)
          }],
          [LoadMapController.LoadSubLevelsAsync.name, {
            Run: LoadMapController.LoadSubLevelsAsync.bind(LoadMapController, e)
          }],
          [LoadMapController.VoxelStreamingAsync.name, {
            Run: LoadMapController.VoxelStreamingAsync.bind(LoadMapController)
          }],
          [LoadMapController.StreamingAsync.name, {
            Run: LoadMapController.StreamingAsync.bind(LoadMapController)
          }],
          [LoadMapController.CreateEntityAsync.name, {
            Run: LoadMapController.CreateEntityAsync.bind(LoadMapController)
          }],
          [LoadMapController.RenderAssetStreamingAsync.name, {
            Run: LoadMapController.RenderAssetStreamingAsync.bind(LoadMapController)
          }],
          [LoadMapController.WorldDoneAsync.name, {
            Run: LoadMapController.WorldDoneAsync.bind(LoadMapController, !1)
          }],
          [LoadMapController.LoadEndAsync.name, {
            Run: LoadMapController.LoadEndAsync.bind(LoadMapController, e.BKn)
          }]
        ]),
        a = [
          [LoadMapController.OpenLoadingAsync.name, LoadMapController.LoadLevelsAsync.name],
          [LoadMapController.LoadLevelsAsync.name, LoadMapController.AfterJoinSceneAsync.name],
          [LoadMapController.LoadLevelsAsync.name, LoadMapController.LoadSubLevelsAsync.name],
          [LoadMapController.AfterJoinSceneAsync.name, LoadMapController.ApplyMaterialParameterCollectionAsync.name],
          [LoadMapController.AfterJoinSceneAsync.name, LoadMapController.CommonAndEntityPreloadAsync.name],
          [LoadMapController.AfterJoinSceneAsync.name, LoadMapController.LoadBattleViewAsync.name],
          [LoadMapController.AfterJoinSceneAsync.name, LoadMapController.ControllerPreloadAsync.name],
          [LoadMapController.LoadSubLevelsAsync.name, LoadMapController.VoxelStreamingAsync.name],
          [LoadMapController.VoxelStreamingAsync.name, LoadMapController.StreamingAsync.name],
          [LoadMapController.ControllerPreloadAsync.name, LoadMapController.CreateEntityAsync.name],
          [LoadMapController.CommonAndEntityPreloadAsync.name, LoadMapController.CreateEntityAsync.name],
          [LoadMapController.CreateEntityAsync.name, LoadMapController.RenderAssetStreamingAsync.name],
          [LoadMapController.RenderAssetStreamingAsync.name, LoadMapController.WorldDoneAsync.name],
          [LoadMapController.WorldDoneAsync.name, LoadMapController.LoadEndAsync.name]
        ];
      await new TaskGraph_1.TaskGraph(o, a).Run()
    } catch (o) {
      o instanceof Error ? Log_1.Log.CheckError() && Log_1.Log.ErrorWithStack("GameMode", 72, "TaskGraph执行异常", o, ["error", o.message]) : Log_1.Log.CheckError() && Log_1.Log.Error("GameMode", 72, "TaskGraph执行异常", ["error", o]), await ControllerHolder_1.ControllerHolder.GameModeController.Load(e)
    }
  }
}
__decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 打开Loading遮罩")], LoadMapController, "OpenLoadingAsync", null), __decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 检查任务资源数据")], LoadMapController, "CheckQuestResource", null), __decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景")], LoadMapController, "LoadLevelsAsync", null), __decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 应用MPC")], LoadMapController, "ApplyMaterialParameterCollectionAsync", null), __decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 预加载Common、Entity资源")], LoadMapController, "CommonAndEntityPreloadAsync", null), __decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: LoadBattleView")], LoadMapController, "LoadBattleViewAsync", null), __decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: Controller Preload")], LoadMapController, "ControllerPreloadAsync", null), __decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 等待AfterJoinSceneNotify")], LoadMapController, "AfterJoinSceneAsync", null), __decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 加载子关卡")], LoadMapController, "LoadSubLevelsAsync", null), __decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 检测体素流送")], LoadMapController, "VoxelStreamingAsync", null), __decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 检测场景流送")], LoadMapController, "StreamingAsync", null), __decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: 创建实体")], LoadMapController, "CreateEntityAsync", null), __decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: RenderAssets Streaming")], LoadMapController, "RenderAssetStreamingAsync", null), __decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: WorldDone")], LoadMapController, "WorldDoneAsync", null), __decorate([(0, Log_1.asyncWithLogDecorator)("GameMode", 72, "LoadMapController加载场景: Loading结束")], LoadMapController, "LoadEndAsync", null), exports.LoadMapController = LoadMapController;
//# sourceMappingURL=LoadMapController.js.map