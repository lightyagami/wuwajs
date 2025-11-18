"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotModel = exports.PlotConfig = exports.COLOR_BLACK = exports.COLOR_WHITE = exports.INVALID_NUM = exports.INTERLUDE_FADE_OUT = exports.INTERLUDE_FADE_IN = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const ExternalSourceSettingById_1 = require("../../../Core/Define/ConfigQuery/ExternalSourceSettingById");
const PlotAudioById_1 = require("../../../Core/Define/ConfigQuery/PlotAudioById");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const UiManager_1 = require("../../Ui/UiManager");
const LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
const PlotAudioModel_1 = require("./PlotAudioModel");
const PlotCleanRange_1 = require("./PlotCleanRange");
const PlotController_1 = require("./PlotController");
const PlotData_1 = require("./PlotData");
const PlotGlobalConfig_1 = require("./PlotGlobalConfig");
const PlotMontage_1 = require("./PlotMontage");
const PlotTemplate_1 = require("./PlotTemplate");
const PlotTextReplacer_1 = require("./PlotTextReplacer");
const PlotTimeOfDay_1 = require("./PlotTimeOfDay");
const PlotWeather_1 = require("./PlotWeather");
exports.INTERLUDE_FADE_IN = 1;
exports.INTERLUDE_FADE_OUT = 1;
exports.INVALID_NUM = -1;
exports.COLOR_WHITE = 0;
exports.COLOR_BLACK = 1;
const AUDIO_STATE_PLOT_LEVEL_GROUP = "plot_level";
const AUDIO_STATE_NOT_PLOT = "none";
const PLOT_END_AUDIO_EVENT = "plot_controller_end_plot";
const CAN_SKIP = true;
const audioStatePlotLevel = {
  LevelA: "level_a",
  LevelB: "level_b",
  LevelC: "level_c",
  LevelD: "level_d",
  Prompt: "level_d"
};
class PlotConfig {
  constructor() {
    this.DisableInput = false;
    this.CanSkip = false;
    this.CanSkipDebug = false;
    this.CanInteractive = false;
    this.CanPause = false;
    this.CameraMode = undefined;
    this.IsAutoPlay = false;
    this.IsAutoPlayCache = false;
    this.PlotLevel = undefined;
    this.SubtitleLevel = undefined;
    this.ShouldSwitchMainRole = false;
    this.PauseTime = false;
    this.SkipTalkWhenFighting = false;
    this.SkipHiddenBlackScreenAtEnd = false;
    this.IsGmPlayPlotOnce = false;
    this.IsPreStreaming = false;
    this.IsSkipConfirmBoxShow = true;
  }
  SetMode(t, e = false) {
    this.SkipHiddenBlackScreenAtEnd = t.DisableAutoFadeOut;
    if (this.IsGmPlayPlotOnce) {
      this.IsGmPlayPlotOnce = false;
      this.SkipHiddenBlackScreenAtEnd = false;
    }
    switch (t.Mode) {
      case "LevelA":
        this.CameraMode = 0;
        this.CanInteractive = false;
        this.CanSkip = CAN_SKIP && !t.NoSkip || this.CanSkipDebug;
        this.DisableInput = true;
        this.CanPause = false;
        this.PlotLevel = "LevelA";
        this.IsAutoPlay = true;
        this.ShouldSwitchMainRole = false;
        this.PauseTime = true;
        this.SkipTalkWhenFighting = false;
        PlotController_1.PlotController.TogglePlotProtect(true);
        PlotController_1.PlotController.EnableViewControl(false);
        break;
      case "LevelB":
        this.CameraMode = 0;
        this.CanInteractive = true;
        this.CanSkip = CAN_SKIP && !t.NoSkip || this.CanSkipDebug;
        this.DisableInput = true;
        this.CanPause = true;
        this.IsAutoPlay = this.IsAutoPlayCache;
        this.PlotLevel = "LevelB";
        this.ShouldSwitchMainRole = false;
        this.PauseTime = true;
        this.SkipTalkWhenFighting = false;
        PlotController_1.PlotController.TogglePlotProtect(true);
        PlotController_1.PlotController.EnableViewControl(false);
        break;
      case "LevelC":
        if (t.UseFlowCamera === undefined) {
          this.CameraMode = 2;
        } else {
          this.CameraMode = t.UseFlowCamera ? 2 : 1;
        }
        this.CanInteractive = true;
        this.CanSkip = CAN_SKIP && !t.NoSkip || this.CanSkipDebug;
        this.DisableInput = true;
        this.CanPause = !e;
        this.IsAutoPlay = this.IsAutoPlayCache;
        this.PlotLevel = "LevelC";
        this.ShouldSwitchMainRole = t.IsSwitchMainRole;
        this.PauseTime = !e;
        this.SkipTalkWhenFighting = false;
        PlotController_1.PlotController.TogglePlotProtect(true);
        PlotController_1.PlotController.EnableViewControl(ControllerHolder_1.ControllerHolder.FlowController.CheckViewControlBeginForC());
        PlotController_1.PlotController.HideSummonedEntity();
        break;
      case "LevelD":
        this.CameraMode = 1;
        this.CanInteractive = false;
        this.CanSkip = false;
        this.DisableInput = false;
        this.CanPause = false;
        this.IsAutoPlay = true;
        this.ShouldSwitchMainRole = false;
        this.PlotLevel = "LevelD";
        this.PauseTime = false;
        this.SkipTalkWhenFighting = t.Interruptible;
        this.SkipHiddenBlackScreenAtEnd = true;
        PlotController_1.PlotController.EnableViewControl(false);
        break;
      case "Prompt":
        this.CameraMode = 1;
        this.CanInteractive = false;
        this.CanSkip = false;
        this.DisableInput = false;
        this.CanPause = false;
        this.IsAutoPlay = this.IsAutoPlayCache;
        this.PlotLevel = "Prompt";
        this.PauseTime = false;
        this.SkipTalkWhenFighting = t.Interruptible;
        this.SkipHiddenBlackScreenAtEnd = true;
        PlotController_1.PlotController.EnableViewControl(false);
    }
    if (t.SubtitleStyle) {
      if (t.SubtitleStyle.Type === IAction_1.ESubtitleStyle.LevelA) {
        this.SubtitleLevel = "LevelA";
      }
    } else {
      this.SubtitleLevel = this.PlotLevel;
    }
  }
}
exports.PlotConfig = PlotConfig;
class PlotModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.IsInPlot = false;
    this.IsInInteraction = false;
    this.IsBackInteractionAfterFlow = false;
    this.CurrentInteractEntity = undefined;
    this.PlotStartFrame = 0;
    this.FlowListName = "";
    this.IsServerNotify = false;
    this.IsAsync = false;
    this.PlotConfig = new PlotConfig();
    this.PlotResult = new PlotData_1.PlotResultInfo();
    this.TmpPlotResult = new PlotData_1.PlotResultInfo();
    this.qYi = undefined;
    this.PlotPendingList = new Array();
    this.GrayOptionMap = new Map();
    this.CurContext = undefined;
    this.GYi = false;
    this.NYi = undefined;
    this.jZ = undefined;
    this.WZ = undefined;
    this.bmu = undefined;
    this.OYi = undefined;
    this.PlotTemplate = new PlotTemplate_1.PlotTemplate();
    this.KeepBgAudio = false;
    this.kYi = false;
    this.CenterText = new PlotData_1.PlotCenterText();
    this.FYi = false;
    this.PlotGlobalConfig = new PlotGlobalConfig_1.PlotGlobalConfig();
    this.PlotTextReplacer = new PlotTextReplacer_1.PlotTextReplacer();
    this.PlotWeather = new PlotWeather_1.PlotWeather();
    this.PlotTimeOfDay = new PlotTimeOfDay_1.PlotTimeOfDay();
    this.PlotCleanRange = new PlotCleanRange_1.PlotCleanRange();
    this.InteractController = undefined;
    this.IsGmCanSkip = false;
    this.IsMuteAllPlot = false;
    this.IsChangeLevelCToLevelB = false;
    this.IsFadeIn = false;
    this.BlackScreenType = undefined;
    this.IsShowingHeadIcon = false;
    this.PlayFlow = undefined;
    this.HangViewHud = false;
    this.TranslucentHud = false;
    this.HasSetRender = false;
    this.HasSetGameBudget = false;
    this.CurTalkItem = undefined;
    this.InOptions = false;
    this.TimeLimitedOptionTag = false;
    this.CurShowTalk = undefined;
    this.GoBattleMaterial = undefined;
    this.InSeamlessFormation = false;
    this.IsTipsViewShowed = false;
    this.OptionEnable = true;
    this.InDigitalScreen = false;
    this.CanClick = false;
    this.CanControlView = false;
    this.rHu = false;
    this.LastPlotColor = exports.INVALID_NUM;
    this.LastPlotAspect = exports.INVALID_NUM;
    this.BlackScreenNowAspect = exports.INVALID_NUM;
    this.BlackScreenLastAspect = exports.INVALID_NUM;
    this.MapPlotLevelSort = new Map([["LevelA", 1], ["LevelB", 2], ["LevelC", 3], ["LevelD", 4], ["Prompt", 5]]);
    this.PlotAspectTransformView = undefined;
    this.HasLoadEventType = false;
    this.OnShowCenterTextFinished = () => {
      this.PlayFlow = undefined;
      if (ModelManager_1.ModelManager.TeleportModel.CgTeleportCompleted && (ModelManager_1.ModelManager.TeleportModel.CgTeleportCompleted.SetResult(true), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Teleport", 45, "ModelManager.TeleportModel!.CgTeleportCompleted!.SetResult(true)");
      }
    };
  }
  OnInit() {
    this.PlotConfig.IsAutoPlay = true;
    this.IsInPlot = false;
    this.IsInInteraction = false;
    this.IsBackInteractionAfterFlow = false;
    this.kYi = false;
    this.PlotGlobalConfig.Init();
    this.PlotWeather.Init();
    this.ResetAudioState();
    return true;
  }
  OnClear() {
    this.PlotTextReplacer.Clear();
    this.PlotWeather.Clear();
    return true;
  }
  CheckCanPlayNow(t) {
    if (t.StateActions) {
      if (!this.IsInPlot) {
        return true;
      }
      if ((this.PlotConfig.PlotLevel === "Prompt" || t.PlotLevel !== "Prompt") && this.PendingPlot(t)) {
        if (this.PlotConfig.PlotLevel === "LevelD" || this.PlotConfig.PlotLevel === "Prompt") {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 26, "打断当前DE级剧情", ["Level", this.PlotConfig.PlotLevel], ["FlowIncId", this.PlotResult.FlowIncId], ["FlowListName", this.PlotResult.FlowListName], ["FlowId", this.PlotResult.FlowId], ["PlotState", this.PlotResult.StateId]);
          }
          if (this.IsServerNotify) {
            ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow("被别的剧情打断当前的D级剧情", false);
          } else {
            ControllerHolder_1.ControllerHolder.FlowController.FinishFlow("客户端剧情被新的剧情中断");
          }
        }
      } else {
        this.c3d(t);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 7, "[PlotModel.PlotSetupHandle] 无法找到对应剧情状态", ["PlotStateId", t.StateId]);
    }
    return false;
  }
  c3d(t) {
    var e;
    var i;
    if (t.BlockAudio) {
      t = PlotAudioById_1.configPlotAudioById.GetConfig(t.BlockAudio);
      e = ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(t.ExternalSourceSetting);
      t = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(t);
      i = (0, AudioSystem_1.parseAudioEventPath)(e.SubtitleEvent);
      AudioSystem_1.AudioSystem.PostEvent(i, undefined, {
        ExternalSourceName: e.SubtitleSrc,
        ExternalSourceMediaName: t
      });
    }
  }
  IsInHighLevelPlot() {
    return this.IsInPlot && this.PlotConfig.PlotLevel !== "LevelD" && this.PlotConfig.PlotLevel !== "Prompt";
  }
  IsInOverLevel(t) {
    var e = this.MapPlotLevelSort.get(this.PlotConfig.PlotLevel);
    var t = this.MapPlotLevelSort.get(t);
    return e !== undefined && t !== undefined && e < t;
  }
  IsInSequencePlot() {
    return this.IsInPlot && (this.PlotConfig.PlotLevel === "LevelA" || this.PlotConfig.PlotLevel === "LevelB");
  }
  PendingPlot(e) {
    for (let t = this.PlotPendingList.length - 1; t >= 0; t--) {
      var i = this.PlotPendingList[t];
      if (i.PlotLevel !== "Prompt" && e.PlotLevel === "Prompt") {
        return false;
      }
      if (i.PlotLevel !== "LevelD" && i.PlotLevel !== "Prompt") {
        break;
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "缓存队列中的D级剧情被中断/后台播放", ["FlowIncId", i.FlowIncId], ["FlowListName", i.FlowListName], ["FlowId", i.FlowId], ["PlotState", i.StateId], ["IsServer", i.IsServerNotify]);
      }
      if (i.IsServerNotify) {
        i.IsBackground = true;
      } else {
        this.PlotPendingList.pop();
      }
    }
    this.PlotPendingList.push(e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "剧情被缓存", ["FlowIncId", e.FlowIncId], ["FlowListName", e.FlowListName], ["FlowId", e.FlowId], ["PlotState", e.StateId]);
    }
    return true;
  }
  SetPendingPlotState(t, e, i, o) {
    for (const r of this.PlotPendingList) {
      if (r.FlowIncId === t) {
        r.IsBackground = i;
        r.IsBreakdown = e;
        r.IsServerEnd = o;
        return true;
      }
    }
    return false;
  }
  CenterTextTransition(t, e) {
    if (this.FYi === t) {
      if (e) {
        e();
      }
    } else if (this.FYi = t) {
      LevelLoadingController_1.LevelLoadingController.OpenLoading(10, 3, () => {
        PlotController_1.PlotController.ClearUi();
        UiManager_1.UiManager.OpenViewByPlot("PlotTransitionView", undefined, e);
      }, 0.5);
    } else {
      UiManager_1.UiManager.CloseView("PlotTransitionView", () => {
        LevelLoadingController_1.LevelLoadingController.CloseLoading(10, e, 0.5);
      });
    }
  }
  ShowTalkCenterText(t, e) {
    if (t) {
      this.CenterText.Text = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t.TidTalk);
      this.CenterText.AudioId = t.PlayVoice ? t.TidTalk : "";
      this.CenterText.Config = t.CenterTextConfig;
      this.CenterText.AutoClose = true;
      this.CenterText.TalkAkEvent = t.TalkAkEvent;
      this.CenterText.TalkEndAkEvent = t.TalkEndAkEvent;
      this.CenterText.UniversalTone = t.UniversalTone;
      this.CenterText.Callback = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdatePlotCenterText);
    } else {
      e();
    }
  }
  ShowCenterText(t, e) {
    if (t) {
      this.CenterText.Text = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t.TidCenterText);
      this.CenterText.AudioId = "";
      this.CenterText.Config = t;
      this.CenterText.AutoClose = true;
      this.CenterText.Callback = e;
      PlotController_1.PlotController.HandleShowCenterText(false);
    }
  }
  ShowCenterTextForTeleport() {
    var t;
    if (this.PlayFlow && (t = PlotController_1.PlotController.GetTalkItemsOfCenterTextForTeleport()) && t.TidCenterText) {
      this.CenterText.Text = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t.TidCenterText);
      this.CenterText.Config = t;
      this.CenterText.Callback = this.OnShowCenterTextFinished;
      PlotController_1.PlotController.HandleShowCenterText(false);
    }
  }
  ApplyPlotConfig(t = false) {
    this.HYi();
    this.jYi();
    this.WYi(t);
    this.KYi();
    this.QYi();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotConfigChanged);
  }
  SetRender(t) {
    if (this.HasSetRender !== t) {
      if (this.HasSetRender = t) {
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.SetSequenceFrameRateLimit();
      } else {
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancleSequenceFrameRateLimit();
      }
    }
  }
  SetInPlotGameBudget(t) {
    if (this.HasSetGameBudget !== t) {
      this.HasSetGameBudget = t;
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetPlotMode(t);
    }
  }
  jYi() {
    this.PlotTimeOfDay.OnPlotStart(this.PlotConfig.PauseTime);
  }
  IsInTemplate() {
    return this.PlotTemplate.IsInTemplate;
  }
  FinishTemplate() {
    if (this.PlotTemplate.IsInTemplate) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Plot", 26, "没有配置关闭模板，已做保底处理，请策划修改", ["FlowListName", this.PlotResult.FlowListName], ["FlowId", this.PlotResult.FlowId], ["PlotState", this.PlotResult.StateId]);
      }
      this.PlotTemplate.EndTemplateNew();
    }
  }
  SetTemplatePlayerTransform(t) {
    if (this.PlotTemplate.IsInTemplate) {
      this.PlotTemplate.SetTemplatePlayerTransform(t);
    }
  }
  StartPlotTemplate(t, e, i) {
    this.PlotTemplate.StartTemplateNew(t, e, i);
  }
  SetPlotTemplate(t, e) {
    this.PlotTemplate.SetTemplateNew(t).finally(e);
  }
  EndPlotTemplate(t, e) {
    this.PlotTemplate.EndTemplateNew(t).finally(e);
  }
  SetActorName(t) {
    if (this.PlotTemplate.IsInTemplate) {
      this.PlotTemplate.SetActorName(t);
    }
  }
  PlayCameraAnim(t) {
    if (this.PlotTemplate.IsInTemplate && this.PlotConfig.CameraMode === 3) {
      this.PlotTemplate.PlayCameraAnimCompatible(t);
    }
  }
  HYi() {
    var t;
    var e;
    if (this.PlotConfig.PlotLevel !== "LevelD" && this.PlotConfig.PlotLevel !== "Prompt" && Global_1.Global.BaseCharacter && (t = Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(40), (e = Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity.GetComponent(302)) && (e.CanSkillInterrupt = false), t?.Valid && t.StopAllSkills("PlotModel.StopMainCharacterSkill"), e)) {
      e.CanSkillInterrupt = true;
    }
  }
  KYi() {
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
  }
  SwitchCameraMode(t) {
    this.PlotConfig.CameraMode = t;
    this.WYi();
  }
  WYi(t = false) {
    if (GlobalData_1.GlobalData.World) {
      switch (this.PlotConfig.CameraMode) {
        case 0:
          var e = CameraController_1.CameraController.SequenceCamera.GetComponent(10);
          if (e?.GetIsInCinematic() && !e?.GetIfNeedWaitInPlot()) {
            e.StopSequence();
          }
          break;
        case 1:
          CameraController_1.CameraController.ExitDialogMode();
          if (this.PlotConfig.PlotLevel !== "LevelD" && this.PlotConfig.PlotLevel !== "Prompt") {
            CameraController_1.CameraController.ExitCameraMode(1, 0, 0, 0);
          }
          break;
        case 2:
          e = ControllerHolder_1.ControllerHolder.FlowController.GetCameraOffsetConfig();
          CameraController_1.CameraController.EnterDialogueMode(ControllerHolder_1.ControllerHolder.FlowController.GetInteractPoint(), t, e?.CenterOffsetPercent, e?.OffsetZ);
          CameraController_1.CameraController.ExitCameraMode(1, 0, 0, 0);
          break;
        case 3:
          if (CameraController_1.CameraController.SequenceCamera.PlayerComponent.GetIsInCinematic()) {
            CameraController_1.CameraController.SequenceCamera.PlayerComponent.StopSequence();
          }
          CameraController_1.CameraController.SequenceCamera.DisplayComponent.CineCamera.ResetSeqCineCamSetting();
          CameraController_1.CameraController.ExitDialogMode();
          CameraController_1.CameraController.EnterCameraMode(1, 0, 0, PlotTemplate_1.BEGIN_WAIT_TIME);
      }
    }
  }
  QYi() {
    if (this.PlotConfig.PlotLevel === "LevelD" || this.PlotConfig.PlotLevel === "Prompt") {
      this.ResetAudioState();
    } else {
      this.kYi = true;
    }
    if (this.PlotConfig.PlotLevel) {
      AudioSystem_1.AudioSystem.SetState(AUDIO_STATE_PLOT_LEVEL_GROUP, audioStatePlotLevel[this.PlotConfig.PlotLevel]);
    }
  }
  ResetAudioState() {
    this.kYi &&= false;
    AudioSystem_1.AudioSystem.SetState(AUDIO_STATE_PLOT_LEVEL_GROUP, AUDIO_STATE_NOT_PLOT);
    AudioSystem_1.AudioSystem.PostEvent(PLOT_END_AUDIO_EVENT);
  }
  MarkGrayOption(t, e) {
    if (!this.GrayOptionMap.has(t)) {
      this.GrayOptionMap.set(t, new Set());
    }
    t = this.GrayOptionMap.get(t);
    if (!t.has(e)) {
      t.add(e);
    }
  }
  IsOptionGray(t, e) {
    return !!this.GrayOptionMap.has(t) && !!this.GrayOptionMap.get(t).has(e);
  }
  CheckOptionCondition(t, e) {
    if (t.HiddenOption) {
      return false;
    }
    if (!t.PreCondition) {
      return true;
    }
    let i = false;
    var o = this.CurContext?.Type === 13 ? this.CurContext.FinalContext : this.CurContext;
    switch (t.PreCondition.Type) {
      case "PreOption":
        i = this.YYi(t, e);
        break;
      case "Condition":
        i = ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(t.PreCondition.Conditions, undefined, o);
    }
    return i;
  }
  YYi(t, e) {
    let i = true;
    for (const r of t.PreCondition.PreOptions) {
      var o = this.GrayOptionMap.get(e.Id);
      i = i && !!o && o.has(r);
    }
    return i;
  }
  GetOptionIndex(t, e) {
    return this.CurShowTalk?.TalkItems.find(t => t.Id === e)?.Options?.indexOf(t) ?? -1;
  }
  SaveCharacterLockOn() {
    var t;
    if (this.JYi() && (t = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint(), EntitySystem_1.EntitySystem.Get(t)?.GetComponent(209)?.HasTag(-1150819426))) {
      this.GYi = true;
    }
  }
  RevertCharacterLockOn() {
    if (this.GYi) {
      this.GYi = false;
      this.JYi()?.EnterLockDirection();
    }
  }
  JYi() {
    var t = Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint();
    if (t) {
      t = EntitySystem_1.EntitySystem.Get(t)?.GetComponent(32);
      if (t?.Valid) {
        return t;
      }
    }
  }
  ClearContext() {
    this.CurContext?.Release();
    this.CurContext = undefined;
  }
  HandlePlayMontage(t) {
    this.qYi ||= new PlotMontage_1.PlotMontage();
    this.qYi.StartPlayMontage(t);
  }
  FinishMontage() {
    if (this.qYi) {
      this.qYi.StopAllMontage();
    }
  }
  InitPlotTemplate() {
    this.NYi = new Map();
    let t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.FlowTemplateCameraConfigPath);
    if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
      t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.FlowTemplateCameraConfigPath);
    }
    var e = (0, puerts_1.$ref)("");
    UE.KuroStaticLibrary.LoadFileToString(e, t);
    if (e = (0, puerts_1.$unref)(e)) {
      for (const i of JSON.parse(e).List) {
        this.NYi.set(i.Id, i);
      }
    }
  }
  InitMontageConfig() {
    this.jZ = new Map();
    let t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.MontageConfigPath);
    if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
      t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.MontageConfigPath);
    }
    var e = (0, puerts_1.$ref)("");
    UE.KuroStaticLibrary.LoadFileToString(e, t);
    if (e = (0, puerts_1.$unref)(e)) {
      for (const i of JSON.parse(e).Montages) {
        this.jZ.set(i.Id, i);
      }
    }
  }
  GetMontageConfig(t) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.jZ ||= new Map();
      if (!this.jZ.get(t)) {
        var e = ConfigManager_1.ConfigManager.PlotMontageConfig.GetPlotMontageConfig(t);
        if (!e) {
          return;
        }
        e = {
          Id: e.Id,
          ActionMontage: e.ActionMontage,
          ExpressionMontage: e.ExpressionMontage,
          MouthSequence: e.MouthSequence
        };
        this.jZ.set(t, e);
      }
    } else if (!this.jZ) {
      this.InitMontageConfig();
    }
    return this.jZ.get(t);
  }
  QZ() {
    this.WZ = new Map();
    let t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.AbpMontageConfigPath);
    if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
      t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.AbpMontageConfigPath);
    }
    var e = (0, puerts_1.$ref)("");
    UE.KuroStaticLibrary.LoadFileToString(e, t);
    if (e = (0, puerts_1.$unref)(e)) {
      for (const i of JSON.parse(e).Montages) {
        this.WZ.set(i.Id, i);
      }
    }
  }
  GetAbpMontageConfig(t) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.WZ ||= new Map();
      if (!this.WZ.get(t)) {
        var e = ConfigManager_1.ConfigManager.PlotMontageConfig.GetPlotAbpMontageConfig(t);
        if (!e) {
          return;
        }
        e = {
          Id: e.Id,
          ActionMontage: e.Montage,
          ExpressionMontage: "",
          MouthSequence: "",
          InitState: e.InitState,
          EndState: e.EndState
        };
        this.WZ.set(t, e);
      }
    } else if (!this.WZ) {
      this.QZ();
    }
    return this.WZ.get(t);
  }
  Rmu() {
    this.bmu = new Map();
    let t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.AbpStateConfigPath);
    if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
      t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.AbpStateConfigPath);
    }
    var e = (0, puerts_1.$ref)("");
    UE.KuroStaticLibrary.LoadFileToString(e, t);
    if (e = (0, puerts_1.$unref)(e)) {
      for (const i of JSON.parse(e)) {
        this.bmu.set(i.Abp, i);
      }
    }
  }
  GetAbpStateConfig(t) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.bmu ||= new Map();
      if (!this.bmu.get(t)) {
        var e = ConfigManager_1.ConfigManager.PlotMontageConfig.GetAbpStateConfig(t);
        if (!e) {
          return;
        }
        e = {
          Abp: e.Abp,
          State1: e.State1,
          State2: e.State2
        };
        this.bmu.set(t, e);
      }
    } else if (!this.bmu) {
      this.Rmu();
    }
    return this.bmu.get(t);
  }
  zYi() {
    this.OYi = new Map();
    let t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.AbpOverlayMontageConfigPath);
    if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
      t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.AbpOverlayMontageConfigPath);
    }
    var e = (0, puerts_1.$ref)("");
    UE.KuroStaticLibrary.LoadFileToString(e, t);
    if (e = (0, puerts_1.$unref)(e)) {
      for (const i of JSON.parse(e).Montages) {
        this.OYi.set(i.Id, i);
      }
    }
  }
  GetOverlayAbpMontageConfig(t) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.OYi ||= new Map();
      if (!this.OYi.get(t)) {
        var e = ConfigManager_1.ConfigManager.PlotMontageConfig.GetOverlayAbpMontageConfig(t);
        if (!e) {
          return;
        }
        e = {
          Id: e.Id,
          ActionMontage: e.Montage,
          ExpressionMontage: "",
          MouthSequence: ""
        };
        this.OYi.set(t, e);
      }
    } else if (!this.OYi) {
      this.zYi();
    }
    return this.OYi.get(t);
  }
  GetPlotTemplateConfig(t) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.NYi ||= new Map();
      if (!this.NYi.get(t)) {
        var e = ConfigManager_1.ConfigManager.CameraTemplateConfig.GetCameraTemplateConfig(t);
        if (!e) {
          return;
        }
        e = {
          Id: e.Id,
          Name: e.Name,
          Amount: e.Amount,
          Enable: e.Enable,
          Template: e.Template,
          CameraType: e.CameraType,
          ActorDataArray: JSON.parse(e.ActorDataArray),
          CameraData: JSON.parse(e.CameraData)
        };
        this.NYi.set(t, e);
      }
    } else if (!this.NYi) {
      this.InitPlotTemplate();
    }
    return this.NYi.get(t);
  }
  UpdateLastViewControl() {
    this.rHu = this.CanControlView;
  }
  GetLastViewControl() {
    return this.rHu;
  }
}
exports.PlotModel = PlotModel;
//# sourceMappingURL=PlotModel.js.map