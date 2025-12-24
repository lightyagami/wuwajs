"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../Core/Actor/ActorSystem");
const Application_1 = require("../Core/Application/Application");
const AudioController_1 = require("../Core/Audio/AudioController");
const AudioSystem_1 = require("../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../Core/Common/CustomPromise");
const Info_1 = require("../Core/Common/Info");
const Log_1 = require("../Core/Common/Log");
const LogAnalyzer_1 = require("../Core/Common/LogAnalyzer");
const Stats_1 = require("../Core/Common/Stats");
const Time_1 = require("../Core/Common/Time");
const Core_1 = require("../Core/Core");
const Http_1 = require("../Core/Http/Http");
const Net_1 = require("../Core/Net/Net");
const ResourceSystem_1 = require("../Core/Resource/ResourceSystem");
const TickProcessSystem_1 = require("../Core/Tick/TickProcessSystem");
const TickSystem_1 = require("../Core/Tick/TickSystem");
const MathUtils_1 = require("../Core/Utils/MathUtils");
const UiTextTranslationUtils_1 = require("../Core/Utils/UiTextTranslationUtils");
const LauncherLogUpload_1 = require("../Launcher/LogUpload/LauncherLogUpload");
const CloudGameManagerLauncher_1 = require("../Launcher/Platform/CloudGameManagerLauncher");
const SoPatchStatic_1 = require("../Launcher/SoPatch/SoPatchStatic");
const TestModuleBridge_1 = require("./Bridge/TestModuleBridge");
const AsyncUtil_1 = require("./Common/AsyncUtil");
const EventCSharpBridge_1 = require("./Common/Event/EventCSharpBridge");
const EventDefine_1 = require("./Common/Event/EventDefine");
const EventSystem_1 = require("./Common/Event/EventSystem");
const LocalStorage_1 = require("./Common/LocalStorage");
const StatDefine_1 = require("./Common/StatDefine");
const TimeUtil_1 = require("./Common/TimeUtil");
const NetEventDispatcher_1 = require("./CsNet/NetEventDispatcher");
const EffectSystem_1 = require("./Effect/EffectSystem");
const GameSettingsDeviceRender_1 = require("./GameSettings/GameSettingsDeviceRender");
const GameSettingsManager_1 = require("./GameSettings/GameSettingsManager");
const GameUtils_1 = require("./GameUtils");
const Global_1 = require("./Global");
const GlobalData_1 = require("./GlobalData");
const InputController_1 = require("./Input/InputController");
const InputSettings_1 = require("./InputSettings/InputSettings");
const InputSettingsManager_1 = require("./InputSettings/InputSettingsManager");
const CloudGameManager_1 = require("./Manager/CloudGameManager");
const ConfigManager_1 = require("./Manager/ConfigManager");
const ConfigManagerCreator_1 = require("./Manager/ConfigManagerCreator");
const ControllerManager_1 = require("./Manager/ControllerManager");
const ControllerRegisterManager_1 = require("./Manager/ControllerRegisterManager");
const ModelManager_1 = require("./Manager/ModelManager");
const ModelManagerCreator_1 = require("./Manager/ModelManagerCreator");
const PakManager_1 = require("./Manager/PakManager");
const SwitcherManager_1 = require("./Manager/SwitcherManager");
const ThirdPartySdkManager_1 = require("./Manager/ThirdPartySdkManager");
const UiPopFrameViewRegisterCenter_1 = require("./Manager/UiPopFrameViewRegisterCenter");
const UiTabViewManager_1 = require("./Manager/UiTabViewManager");
const UiViewManager_1 = require("./Manager/UiViewManager");
const CombatMessageController_1 = require("./Module/CombatMessage/CombatMessageController");
const GameMainViewRegisterCenter_1 = require("./Module/GameMainView/GameMainViewRegisterCenter");
const HoldingHandsController_1 = require("./Module/HoldHands/HoldingHandsController");
const HudUnitController_1 = require("./Module/HudUnit/HudUnitController");
const HudUnitHandleManager_1 = require("./Module/HudUnit/HudUnitHandleManager");
const Heartbeat_1 = require("./Module/Login/Heartbeat");
const ThinkingAnalyticsReporter_1 = require("./Module/LogReport/ThinkingAnalyticsReporter");
const LogUploadHelper_1 = require("./Module/LogUpload/LogUploadHelper");
const PlotController_1 = require("./Module/Plot/PlotController");
const UiCameraAnimationManager_1 = require("./Module/UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("./Module/UiComponent/UiSceneManager");
const NavigationRegisterCenter_1 = require("./Module/UiNavigation/New/NavigationRegisterCenter");
const BulletController_1 = require("./NewWorld/Bullet/BulletController");
const FightLibrary_1 = require("./NewWorld/Character/Common/Blueprint/Utils/FightLibrary");
const UeMovementTickManageComponent_1 = require("./NewWorld/Common/Component/UeMovementTickManageComponent");
const UeSkeletalTickManageComponent_1 = require("./NewWorld/Common/Component/UeSkeletalTickManageComponent");
const VehiclePathMoveController_1 = require("./NewWorld/Vehicle/Controller/VehiclePathMoveController");
const RedDotSystem_1 = require("./RedDot/RedDotSystem");
const TickScoreController_1 = require("./TickScore/TickScoreController");
const UiTimeDilation_1 = require("./Ui/Base/UiTimeDilation");
const InputManager_1 = require("./Ui/Input/InputManager");
const TouchFingerManager_1 = require("./Ui/TouchFinger/TouchFingerManager");
const UiManager_1 = require("./Ui/UiManager");
const RichTextUtils_1 = require("./Utils/RichTextUtils");
const ComponentForceTickController_1 = require("./World/Controller/ComponentForceTickController");
const GameModeController_1 = require("./World/Controller/GameModeController");
const GameBudgetAllocatorConfigCreator_1 = require("./World/Define/GameBudgetAllocatorConfigCreator");
const EnvironmentalPerceptionController_1 = require("./World/Enviroment/EnvironmentalPerceptionController");
const TaskSystem_1 = require("./World/Task/TaskSystem");
class Game {
  static *Start(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 1, "启动 Game");
    }
    GlobalData_1.GlobalData.Init(e);
    TimeUtil_1.TimeUtil.SetServerTimeStamp(Date.now());
    CloudGameManager_1.CloudGameManager.Init();
    EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.InitializeEnvironment();
    InputController_1.InputController.InitializeEnvironment();
    EventCSharpBridge_1.EventCSharpBridge.InitializeEnvironment();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 70, "Game Http线程睡眠时间调整");
    }
    Http_1.Http.SetHttpThreadActiveMinimumSleepTimeInSeconds(0.005);
    Http_1.Http.SetHttpThreadIdleMinimumSleepTimeInSeconds(0.033);
    ThinkingAnalyticsReporter_1.ThinkingAnalyticsReporter.Init();
    if (!CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch) {
      LocalStorage_1.LocalStorage.Initialize();
    }
    yield GameUtils_1.GameUtils.WaitFrame();
    ConfigManagerCreator_1.ConfigManagerCreator.Init();
    yield GameUtils_1.GameUtils.WaitFrame();
    if (CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch) {
      yield CloudGameManager_1.CloudGameManager.WaitForUser();
      LocalStorage_1.LocalStorage.Initialize();
    }
    InputSettings_1.InputSettings.Initialize();
    InputSettingsManager_1.InputSettingsManager.Initialize();
    InputManager_1.InputManager.Init();
    UiSceneManager_1.UiSceneManager.Initialize();
    Global_1.Global.InitEvent();
    UiTextTranslationUtils_1.UiTextTranslationUtils.Initialize();
    RichTextUtils_1.RichTextUtils.Initialize();
    SwitcherManager_1.SwitcherManager.Initialize();
    TouchFingerManager_1.TouchFingerManager.Initialize();
    EffectSystem_1.EffectSystem.Initialize();
    TaskSystem_1.TaskSystem.Initialize();
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.InitializeBaseInfo();
    GameSettingsManager_1.GameSettingsManager.Initialize();
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.Initialize();
    TickScoreController_1.TickScoreController.Init();
    AsyncUtil_1.AsyncUtil.InitializeEnvironment();
    TimeUtil_1.TimeUtil.Init(ConfigManager_1.ConfigManager.TextConfig);
    if (!Info_1.Info.IsBuildShipping) {
      this.rve();
      if (GlobalData_1.GlobalData.IsPlayInEditor) {
        this.nve();
      }
      this.sve = (0, puerts_1.toManualReleaseDelegate)(this.ave);
      UE.KuroStaticLibrary.RegisterCustomCommandProcessor("aki", this.sve);
    }
    yield GameUtils_1.GameUtils.WaitFrame();
    UE.GASBPLibrary.EnsureGameplayTagDataTableLoaded();
    GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.CreateConfigs();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DoLeaveLevel, Game.hve);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearSceneBegin, Game.ora);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReconnectClearData, Game.lve);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BeforeTravelMap, Game.uve);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EndTravelMap, Game.cve);
    Application_1.Application.AddEditorPreEndPIEHandler(Game._ve);
    if (Game.o_l) {
      (0, StatDefine_1.InitStatConsoleCommand)();
    }
  }
  static *ModuleStart() {
    ThirdPartySdkManager_1.ThirdPartySdkManager.Init();
    yield GameUtils_1.GameUtils.WaitFrame();
    ModelManagerCreator_1.ModelManagerCreator.Init();
    yield GameUtils_1.GameUtils.WaitFrame();
    ControllerRegisterManager_1.ControllerRegisterManager.Init();
    ControllerManager_1.ControllerManager.Init();
    UiViewManager_1.UiViewManager.Init();
    GameMainViewRegisterCenter_1.GameMainViewRegisterCenter.Init();
    UiPopFrameViewRegisterCenter_1.UiPopFrameViewRegisterCenter.Init();
    UiTabViewManager_1.UiTabViewManager.Init();
    HudUnitHandleManager_1.HudUnitHandleManager.Init();
    FightLibrary_1.FightLibrary.Init();
    PakManager_1.PakManager.Init();
    UiTimeDilation_1.UiTimeDilation.Init();
    NavigationRegisterCenter_1.NavigationRegisterCenter.Init();
    Net_1.Net.NetEventDispatcher = new NetEventDispatcher_1.NetEventDispatcher();
    Net_1.Net.NetEventDispatcher.Init();
    LauncherLogUpload_1.LauncherLogUpload.SetParams(LogUploadHelper_1.LogUploadHelper.CreateParams());
  }
  static TickerStart() {
    Core_1.Core.RegisterPreTick(() => {
      UeMovementTickManageComponent_1.UeMovementTickController.TickManagers();
    });
    TickSystem_1.TickSystem.Add(this.TickPriority2, "GamePriority2", 0, true, 2);
    TickSystem_1.TickSystem.Add(this.TickPriority1, "GamePriority1", 0, true, 1);
    TickSystem_1.TickSystem.Add(this.r6, "Game", 0, true);
    TickSystem_1.TickSystem.Add(this.AfterTickPriority1, "GamePriority1", 4, true, 1);
    TickSystem_1.TickSystem.Add(this.AfterTick, "Game", 4, true);
    TickSystem_1.TickSystem.Add(this.AfterCameraTick, "Game", 5, true);
    TickSystem_1.TickSystem.SetGamePrerequisiteTickFunction(0, 2);
    Heartbeat_1.Heartbeat.RegisterTick();
  }
  static Shutdown() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 24, "Game.Shutdown Start");
    }
    LogAnalyzer_1.LogAnalyzer.Clear();
    TickProcessSystem_1.TickProcessSystem.Clear();
    ThirdPartySdkManager_1.ThirdPartySdkManager.Clear();
    PakManager_1.PakManager.Clear();
    Net_1.Net.NetEventDispatcher?.Clear();
    EventCSharpBridge_1.EventCSharpBridge.DestroyEnvironment();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 24, "Game.Shutdown PerformanceManager.Destroy Finished");
    }
    TickSystem_1.TickSystem.Destroy();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 24, "Game.Shutdown TickSystem.Destroy Finished");
    }
    UiTimeDilation_1.UiTimeDilation.Destroy();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 24, "Game.Shutdown UiTimeDilation.Destroy Finished");
    }
    ControllerManager_1.ControllerManager.Clear();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 24, "Game.Shutdown ControllerManager.Clear Finished");
    }
    ModelManagerCreator_1.ModelManagerCreator.Clear();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 24, "Game.Shutdown ModelManagerCreator.Clear Finished");
    }
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.Clear();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 24, "Game.Shutdown GameSettingsRenderManager.Clear Finished");
    }
    TaskSystem_1.TaskSystem.Clear();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 24, "Game.Shutdown TaskSystem.Clear Finished");
    }
    EffectSystem_1.EffectSystem.Clear();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 24, "Game.Shutdown EffectSystem.Clear Finished");
    }
    UiTextTranslationUtils_1.UiTextTranslationUtils.Destroy();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 24, "Game.Shutdown UiTextTranslationUtils.Destroy Finished");
    }
    RichTextUtils_1.RichTextUtils.Destroy();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 24, "Game.Shutdown RichTextUtils.Destroy Finished");
    }
    InputSettingsManager_1.InputSettingsManager.Clear();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 63, "Game.Shutdown InputSettingsManager.Clear Finished");
    }
    Application_1.Application.RemoveEditorPreEndPIEHandler(Game._ve);
    Application_1.Application.Destroy();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 24, "Game.Shutdown Application.Destroy Finished");
    }
    GameSettingsManager_1.GameSettingsManager.Clear();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 24, "Game.Shutdown GameSettingsManager.Clear Finished");
    }
    AsyncUtil_1.AsyncUtil.DestroyEnvironment();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 36, "Game.Shutdown AsyncUtil.DestroyEnvironment Finished");
    }
  }
  static LockLoad() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 16, "[Game.EndTravelMap] SetActorPermanentExtraStatic true");
    }
  }
  static UnlockLoad() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 16, "[Game.EndTravelMap] SetActorPermanentExtraStatic false");
    }
  }
  static mve() {
    var e = ModelManager_1.ModelManager.GameModeModel;
    if (e && e.MapId > 0) {
      try {
        ControllerManager_1.ControllerManager.LeaveLevel();
      } catch (e) {
        if (e instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Game", 3, "[Game.LeaveLevel] 调用ControllerManager.LeaveLevel异常。", e, ["error", e.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Game", 3, "[Game.LeaveLevel] 调用ControllerManager.LeaveLevel异常。", ["error", e]);
        }
      }
      try {
        ModelManager_1.ModelManager.LeaveLevel();
      } catch (e) {
        if (e instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Game", 3, "[Game.LeaveLevel] 调用ModelManager.LeaveLevel异常。", e, ["error", e.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Game", 3, "[Game.LeaveLevel] 调用ModelManager.LeaveLevel异常。", ["error", e]);
        }
      }
    }
  }
  static dve() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 3, "[Game.LeaveLevel] LeaveLevel");
    }
    try {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ClearWorld);
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Game", 3, "[Game.LeaveLevel] 调用EventSystem.Emit(EEventName.ClearWorld)异常。", e, ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Game", 3, "[Game.LeaveLevel] 调用EventSystem.Emit(EEventName.ClearWorld)异常。", ["error", e]);
      }
    }
  }
  static Cve(r, ...e) {
    try {
      r.Tick(...e);
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Game", 19, "Error when execute", e, ["this type", r.constructor.name], ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Game", 19, "Error when execute", ["this type", r.constructor.name], ["error", e]);
      }
    }
  }
  static async rve() {
    var e = await TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports();
    if (e) {
      e.TsTestEntrance.Init();
    }
  }
  static async nve() {
    var e = await TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports();
    if (e) {
      e.EditorMetrics.Init();
    }
  }
}
exports.Game = Game;
(_a = Game).gve = Stats_1.Stat.Create("UI");
Game.fve = Stats_1.Stat.Create("Effect");
Game.pve = Stats_1.Stat.Create("Other");
Game.vve = Stats_1.Stat.Create("TickScore");
Game.sve = undefined;
Game.o_l = true;
Game.hve = () => {
  Game.dve();
};
Game.lve = () => {
  Game.Shutdown();
};
Game._ve = () => {
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPreEndPIE);
  Game.Shutdown();
};
Game.uve = () => {};
Game.cve = () => {
  Game.UnlockLoad();
};
Game.ora = async () => {
  if (GlobalData_1.GlobalData.IsSceneClearing) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Game", 16, "[Game.ClearSceneAsync]: Duplicate ClearSceneAsync");
    }
    return false;
  }
  GlobalData_1.GlobalData.ClearSceneDone = new CustomPromise_1.CustomPromise();
  var e = ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel;
  EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsClearSceneBegin, e);
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Game", 16, "[Game.ClearSceneAsync] 场景清理操作开始", ["无缝加载", e]);
  }
  await UiManager_1.UiManager.ClearAsync(e).catch(e => {
    if (e instanceof Error) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.ErrorWithStack("Game", 16, "[Game.LeaveLevel] 调用 UiManager.ClearAsync 异常。", e, ["error", e.message]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Game", 16, "[Game.LeaveLevel] 调用 UiManager.ClearAsync 异常。", ["error", e]);
    }
  });
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Game", 16, "[Game.ClearSceneAsync] UiManager.ClearAsync清理操作完成");
  }
  try {
    AudioController_1.AudioController.Clear();
  } catch (e) {
    if (e instanceof Error) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.ErrorWithStack("Game", 21, "[Game.LeaveLevel] 调用AudioController.Clear异常。", e, ["error", e.message]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Game", 21, "[Game.LeaveLevel] 调用AudioController.Clear异常。", ["error", e]);
    }
  }
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Game", 16, "[Game.ClearSceneAsync] AudioController.Clear清理操作完成");
  }
  try {
    Game.mve();
  } catch (e) {
    if (e instanceof Error) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.ErrorWithStack("Game", 3, "[Game.LeaveLevel] 调用Game.ClearControllerAndModel异常。", e, ["error", e.message]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Game", 3, "[Game.LeaveLevel] 调用Game.ClearControllerAndModel异常。", ["error", e]);
    }
  }
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Game", 16, "[Game.ClearSceneAsync] Game.ClearControllerAndModel清理操作完成");
  }
  try {
    EffectSystem_1.EffectSystem.ClearPool();
    ActorSystem_1.ActorSystem.Clear();
    ActorSystem_1.ActorSystem.State = 0;
  } catch (e) {
    if (e instanceof Error) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.ErrorWithStack("Game", 21, "[Game.LeaveLevel] 调用ActorSystem.Clear异常。", e, ["error", e.message]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Game", 21, "[Game.LeaveLevel] 调用ActorSystem.Clear异常。", ["error", e]);
    }
  }
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Game", 16, "[Game.ClearSceneAsync] 场景清理操作完成", ["无缝加载", e]);
  }
  Game.LockLoad();
  GlobalData_1.GlobalData.ClearSceneDone.SetResult();
  return !(GlobalData_1.GlobalData.ClearSceneDone = undefined);
};
Game.TickPriority2 = e => {
  if (!Core_1.Core.ForbiddenTickPriority && !TickSystem_1.TickSystem.IsPaused) {
    PlotController_1.PlotController.TickPriority2(e);
    HoldingHandsController_1.HoldingHandsController.TickPriority2(e);
    if (UeSkeletalTickManageComponent_1.UeSkeletalTickController.EnabledNewSkelTickTiming) {
      UeSkeletalTickManageComponent_1.UeSkeletalTickController.TickManagers(e * MathUtils_1.MathUtils.MillisecondToSecond);
    }
    CombatMessageController_1.CombatMessageController.TickPriority1(e);
    VehiclePathMoveController_1.VehiclePathMoveController.TickPriority1(e);
    ComponentForceTickController_1.ComponentForceTickController.MoveTickPriority1(e);
  }
};
Game.TickPriority1 = e => {
  if (Core_1.Core.ForbiddenTickPriority) {
    UeSkeletalTickManageComponent_1.UeSkeletalTickController.TickManagersStep2();
  } else {
    if (!TickSystem_1.TickSystem.IsPaused) {
      UeMovementTickManageComponent_1.UeMovementTickController.TickManagersPriority1(e);
    }
    UeSkeletalTickManageComponent_1.UeSkeletalTickController.TickManagersStep2();
    TickSystem_1.TickSystem.SetTickFunctionCompletionCallbackInMainThread(0, 1);
  }
};
Game.r6 = e => {
  if (Core_1.Core.ForbiddenTickPriority && !TickSystem_1.TickSystem.IsPaused) {
    VehiclePathMoveController_1.VehiclePathMoveController.TickPriority1(e);
    ComponentForceTickController_1.ComponentForceTickController.MoveTickPriority1(e);
  }
  if (!TickSystem_1.TickSystem.IsPaused && !UeSkeletalTickManageComponent_1.UeSkeletalTickController.EnabledNewSkelTickTiming) {
    UeSkeletalTickManageComponent_1.UeSkeletalTickController.TickManagers(e * MathUtils_1.MathUtils.MillisecondToSecond);
  }
  Game.gve.Start();
  Game.Cve(UiManager_1.UiManager, e);
  Game.Cve(UiSceneManager_1.UiSceneManager);
  Game.Cve(UiCameraAnimationManager_1.UiCameraAnimationManager, e);
  Game.Cve(RedDotSystem_1.RedDotSystem, e);
  Game.gve.Stop();
  ControllerManager_1.ControllerManager.Tick(e);
  Game.fve.Start();
  Game.Cve(EffectSystem_1.EffectSystem, e);
  Game.fve.Stop();
  Game.pve.Start();
  Game.Cve(TimeUtil_1.TimeUtil, e);
  Game.pve.Stop();
  Game.pve.Start();
  Game.Cve(AudioController_1.AudioController, e);
  Game.pve.Stop();
  Game.pve.Start();
  Game.Cve(AudioSystem_1.AudioSystem, e);
  Game.pve.Stop();
  if (cpp_1.KuroApplication.IniPlatformNameIncludeEditor() === "Android") {
    Game.Cve(SoPatchStatic_1.SoPatchStatic, e);
  }
  if (!TickSystem_1.TickSystem.IsPaused) {
    Game.vve.Start();
    Game.Cve(TickScoreController_1.TickScoreController, e);
    Game.vve.Stop();
  }
  ResourceSystem_1.ResourceSystem.UpdateDelayCallback();
};
Game.AfterTickPriority1 = e => {
  Time_1.Time.AfterTickPriority1(e);
  UeSkeletalTickManageComponent_1.UeSkeletalTickController.DealCompleteSkeletalComp();
};
Game.AfterTick = e => {
  if (!TickSystem_1.TickSystem.IsPaused) {
    UeSkeletalTickManageComponent_1.UeSkeletalTickController.AfterTickManagers(e * MathUtils_1.MathUtils.MillisecondToSecond);
    BulletController_1.BulletController.AfterTick(e);
    ComponentForceTickController_1.ComponentForceTickController.AfterTick(e);
  }
  EffectSystem_1.EffectSystem.AfterTick(e);
  CombatMessageController_1.CombatMessageController.AfterTick(e);
  PlotController_1.PlotController.AfterTick(e);
  GameModeController_1.GameModeController.AfterTick(e);
};
Game.AfterCameraTick = e => {
  UiManager_1.UiManager.AfterTick(e);
  if (!TickSystem_1.TickSystem.IsPaused) {
    HudUnitController_1.HudUnitController.AfterTick(e);
  }
};
Game.ave = e => {
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RunGm, e);
}; //# sourceMappingURL=Game.js.map