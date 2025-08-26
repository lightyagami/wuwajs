"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotController = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterBuffIds_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
const PerfSightController_1 = require("../../PerfSight/PerfSightController");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputDistributeDefine_1 = require("../../Ui/InputDistribute/InputDistributeDefine");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const PlotFormation_1 = require("./PlotFormation");
const PlotSwitchSubLevel_1 = require("./PlotSwitchSubLevel");
const PlotAspectTransformView_1 = require("./PlotView/PlotAspectTransformView");
const PlotViewManager_1 = require("./PlotView/PlotViewManager");
const SequenceController_1 = require("./Sequence/SequenceController");
class PlotController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    this.EYi = false;
    ResourceSystem_1.ResourceSystem.LoadAsync(ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.PlotGoBattleMaterialPath, UE.PD_CharacterControllerData_C, e => {
      if (e) {
        ModelManager_1.ModelManager.PlotModel.GoBattleMaterial = e;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Plot", 26, "剧情切人效果资产加载失败", ["path", ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.PlotGoBattleMaterialPath]);
      }
    });
    return true;
  }
  static OnTick(e) {
    this.TickAll(e);
    if (ModelManager_1.ModelManager.PlotModel) {
      ModelManager_1.ModelManager.PlotModel.PlotWeather.OnTick(e);
      ModelManager_1.ModelManager.PlotModel.PlotTemplate.OnTick(e);
      ModelManager_1.ModelManager.PlotModel.PlotCleanRange.OnTick(e);
    }
  }
  static AddTickPriority2(e) {
    this.Pnd++;
    this.Dnd.set(this.Pnd, e);
    return this.Pnd;
  }
  static RemoveTickPriority2(e) {
    this.xnd.delete(e);
    this.Dnd.delete(e);
  }
  static NextPriority2(e) {
    e = this.AddTickPriority2(e);
    this.xnd.add(e);
    return e;
  }
  static AddAfterTick(e) {
    this.Xad++;
    this.Yad.set(this.Xad, e);
    return this.Xad;
  }
  static RemoveAfterTick(e) {
    this.zad.delete(e);
    this.Yad.delete(e);
  }
  static NextAfterTick(e) {
    e = this.AddAfterTick(e);
    this.zad.add(e);
    return e;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BeforeLoadMap, PlotController.SYi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, PlotController.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, PlotController.OnChangeRole);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStartLoadingState, PlotController.hMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, PlotController.Zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveOnlineWorld, PlotController.Mze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, PlotController.dLe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreePrepareRollback, PlotController.BMc);
    this.PlotViewManager.RegisterEvent();
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BeforeLoadMap, PlotController.SYi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, PlotController.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, PlotController.OnChangeRole);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStartLoadingState, PlotController.hMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, PlotController.Zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveOnlineWorld, PlotController.Mze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, PlotController.dLe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreePrepareRollback, PlotController.BMc);
    this.PlotViewManager.UnRegisterEvent();
  }
  static OnClear() {
    return true;
  }
  static TogglePlotStreamingSource(e) {
    var t = ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera;
    if (!this.O01?.IsValid()) {
      this.O01 = ModelManager_1.ModelManager.GameModeModel?.CreateShapedStreamingSource(t);
    }
    var t = this.O01?.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
    if (e) {
      t?.EnableStreamingSource();
    } else {
      t?.DisableStreamingSource();
    }
  }
  static ChangeFormation() {
    this.yYi.ChangeFormation();
  }
  static async CheckFormation() {
    return this.yYi.CheckFormationPromise();
  }
  static async CheckSwitchSubLevel() {
    return this.Vwu.CheckSwitchSubLevelPromise();
  }
  static OnStartPlotNetwork(e) {
    if (PerfSightController_1.PerfSightController.IsEnable) {
      cpp_1.FKuroPerfSightHelper.BeginExtTag("Plot");
      this.qwa = `Plot_${e.FlowListName}_${e.FlowId}`;
      cpp_1.FKuroPerfSightHelper.BeginExtTag(this.qwa);
    }
    ModelManager_1.ModelManager.PlotModel.IsInPlot = true;
    ModelManager_1.ModelManager.PlotModel.PlotStartFrame = Time_1.Time.Frame;
    ModelManager_1.ModelManager.PlotModel.FlowListName = e.FlowListName;
    ModelManager_1.ModelManager.PlotModel.CurContext = e.Context;
    ModelManager_1.ModelManager.PlotModel.IsServerNotify = e.IsServerNotify;
    ModelManager_1.ModelManager.PlotModel.IsAsync = e.IsAsync;
    ModelManager_1.ModelManager.PlotModel.KeepBgAudio = e.KeepMusic;
    ModelManager_1.ModelManager.PlotModel.PlotResult.Reset();
    ModelManager_1.ModelManager.PlotModel.PlotResult.FlowListName = e.FlowListName;
    ModelManager_1.ModelManager.PlotModel.PlotResult.FlowId = e.FlowId;
    ModelManager_1.ModelManager.PlotModel.PlotResult.StateId = e.StateId;
    ModelManager_1.ModelManager.PlotModel.PlotResult.FlowIncId = e.FlowIncId;
    if (!e.IsBackground && (e.PlotLevel === "LevelA" || e.PlotLevel === "LevelB")) {
      ModelManager_1.ModelManager.PlotModel.SetInPlotGameBudget(true);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotNetworkStart, e);
  }
  static OnEndPlotNetwork() {
    if (PerfSightController_1.PerfSightController.IsEnable) {
      cpp_1.FKuroPerfSightHelper.EndExtTag("Plot");
      cpp_1.FKuroPerfSightHelper.EndExtTag(this.qwa);
      this.qwa = "";
    }
    ModelManager_1.ModelManager.PlotModel.KeepBgAudio = false;
    ModelManager_1.ModelManager.PlotModel.ResetAudioState();
    ModelManager_1.ModelManager.PlotModel.IsInPlot = false;
    ModelManager_1.ModelManager.PlotModel.FinishMontage();
    SequenceController_1.SequenceController.ManualFinish();
    ModelManager_1.ModelManager.PlotModel.SetRender(false);
    ModelManager_1.ModelManager.PlotModel.SetInPlotGameBudget(false);
    ModelManager_1.ModelManager.PlotModel.FinishTemplate();
    ModelManager_1.ModelManager.PlotModel.PlotWeather.OnPlotEnd();
    ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.OnPlotEnd();
    ModelManager_1.ModelManager.PlotModel.PlotCleanRange.Close();
    ModelManager_1.ModelManager.PlotModel.GrayOptionMap.clear();
    ModelManager_1.ModelManager.PlotModel.PlotConfig.DisableInput = false;
    ModelManager_1.ModelManager.PlotModel.IsTipsViewShowed = false;
    ModelManager_1.ModelManager.PlotModel.CurTalkItem = undefined;
    ModelManager_1.ModelManager.PlotModel.CurShowTalk = undefined;
    this.RemoveAspectTransformView();
    Global_1.Global.CharacterCameraManager.FadeAmount = 0;
    CameraController_1.CameraController.ExitDialogMode();
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
    this.TogglePlotProtect(false);
    this.EnableViewControl(false);
    var e = ModelManager_1.ModelManager.PlotModel.PlotResult;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotNetworkEnd, e);
    ControllerHolder_1.ControllerHolder.PreloadControllerNew.RemovePlot(e.FlowListName, e.FlowId, e.StateId);
    e.Reset();
    ModelManager_1.ModelManager.PlotModel.ClearContext();
    ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Clear();
    if (ModelManager_1.ModelManager.PlotModel.PlotPendingList.length > 0) {
      ModelManager_1.ModelManager.PlotModel.IsBackInteractionAfterFlow = false;
      this.EndInteraction(true);
    } else if (ModelManager_1.ModelManager.PlotModel.IsBackInteractionAfterFlow) {
      ModelManager_1.ModelManager.PlotModel.IsBackInteractionAfterFlow = false;
      this.TriggerInteraction();
    }
  }
  static CloseAllUi() {
    this.PlotViewManager.ClosePlotView();
  }
  static ClearUi() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ClearPlotSubtitle);
  }
  static HideUi(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HidePlotUi, e);
  }
  static GetCurrentViewName() {
    return this.PlotViewManager.GetCurrentViewName();
  }
  static OpenPlotView(e, t, o) {
    this.PlotViewManager.OpenPlotView(e, t, o);
  }
  static OpenCurrentPlotView(e, t) {
    let o = undefined;
    switch (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel) {
      case "LevelA":
      case "LevelB":
        o = "PlotSubtitleView";
        break;
      case "LevelC":
        o = "PlotView";
        break;
      case "LevelD":
        o = "PlotViewHUD";
    }
    if (o) {
      this.PlotViewManager.OpenPlotView(o, e, t);
    } else {
      e?.(true);
    }
  }
  static WaitViewCallback(e) {
    this.PlotViewManager.WaitOpenCallback(e);
  }
  static RemoveViewCallback(e) {
    this.PlotViewManager.RemoveCallback(e);
  }
  static HandleShowCenterText(e) {
    var t = e ? "PlotTransitionViewPop" : "PlotTransitionView";
    if (UiManager_1.UiManager.IsViewShow(t)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdatePlotCenterText);
    } else if (!UiManager_1.UiManager.IsViewOpen(t)) {
      if (e) {
        UiManager_1.UiManager.OpenView(t, undefined, () => {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdatePlotCenterText);
        });
      } else {
        UiManager_1.UiManager.OpenViewByPlot(t, undefined, () => {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdatePlotCenterText);
        });
      }
    }
  }
  static ShowTipsView(e, t) {
    return !ModelManager_1.ModelManager.PlotModel.IsTipsViewShowed && (ModelManager_1.ModelManager.PlotModel.IsTipsViewShowed = true, ModelManager_1.ModelManager.PlotModel.CurTalkItem = e, this.PlotViewManager.OpenPlotView("PlotTipsView", undefined, t), true);
  }
  static ShowSystemOption(e, o) {
    const r = e;
    if (r.OptionConfig.Type === "RogueRandomEvent") {
      e = {
        BindId: r.OptionConfig.EventId,
        SelectCallback: t => {
          o(r.Options.findIndex(e => e.TypeParams.OptionId === t), r.Options.find(e => e.TypeParams.OptionId === t).Actions);
        }
      };
      UiManager_1.UiManager.OpenView("RoguelikeRandomEventView", e);
    } else if (r.OptionConfig.Type === "GravityControl") {
      if (UiManager_1.UiManager.IsViewOpen("GravityFlipView")) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGravityFlipAnimFinish);
      } else {
        e = {
          SelectCallback: e => {
            o(e, []);
          }
        };
        UiManager_1.UiManager.OpenView("GravityFlipView", e);
      }
    } else if (r.OptionConfig.Type === "PermanentRogueRandomEvent" && (e = r.OptionConfig)) {
      e = {
        BindId: e.EventId,
        SelectCallback: t => {
          o(r.Options.findIndex(e => e.TypeParams.OptionId === t), r.Options.find(e => e.TypeParams.OptionId === t).Actions);
        }
      };
      UiManager_1.UiManager.OpenView("RoguelikeRandomEventView", e);
    }
  }
  static HandleSeqPlayerInput(e, t) {
    var o;
    var r;
    if (GlobalData_1.GlobalData.GameInstance && (o = Global_1.Global.BaseCharacter, r = Global_1.Global.CharacterController, o !== undefined) && r !== undefined) {
      if (!e) {
        ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag);
      }
      ModelManager_1.ModelManager.InteractionModel.SetInteractionHintDisable(e);
      r.SetIgnoreLookInput(t);
    }
  }
  static TogglePlotProtect(e) {
    if (this.EYi !== e) {
      if (this.EYi = e) {
        ModelManager_1.ModelManager.PlotModel.SaveCharacterLockOn();
      } else {
        ModelManager_1.ModelManager.PlotModel.RevertCharacterLockOn();
      }
    }
    if (e) {
      this.ProtectCurrentRole();
    } else {
      this.IYi();
    }
  }
  static ProtectCurrentRole() {
    var e;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t && !this.TYi.has(t.Id)) {
      this.TYi.add(t.Id);
      e = t?.Entity?.GetComponent(175);
      if (t = t?.Entity?.GetComponent(206)) {
        if (!t.HasTag(this.LYi)) {
          t.AddTag(this.LYi);
        }
        if (!t.HasTag(this.DYi)) {
          t.AddTag(this.DYi);
        }
      }
      e?.AddBuff(CharacterBuffIds_1.buffId.StoryInvincibleCommon, {
        InstigatorId: e.CreatureDataId,
        Reason: "PlotController.ProtectCurrentRole"
      });
    }
  }
  static IYi() {
    for (const t of this.TYi) {
      var e = EntitySystem_1.EntitySystem.Get(t);
      this.RYi(e, true);
    }
    this.TYi.clear();
  }
  static RYi(e, t) {
    var o = e?.GetComponent(175);
    var e = e?.GetComponent(206);
    if (t) {
      e?.RemoveTag(this.LYi);
      e?.RemoveTag(this.DYi);
    }
    o?.RemoveBuff(CharacterBuffIds_1.buffId.StoryInvincibleCommon, -1, "PlotController.RemoveProtect");
  }
  static IsEnableInteract() {
    return !ModelManager_1.ModelManager.PlotModel.IsInPlot || ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelD" || ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "Prompt";
  }
  static NeedInputRefresh() {
    return ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() || ModelManager_1.ModelManager.PlotModel.PlotPendingList.length > 0;
  }
  static TriggerInteraction(t = true) {
    if (ModelManager_1.ModelManager.PlotModel.IsInPlot) {
      return (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelD" || ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "Prompt") && (ModelManager_1.ModelManager.PlotModel.IsInInteraction = true, this.SetBackInteractionAfterFlow(), ControllerHolder_1.ControllerHolder.FlowController.FinishFlow("触发交互结束剧情"), true);
    }
    ModelManager_1.ModelManager.PlotModel.IsInInteraction = true;
    ModelManager_1.ModelManager.PlotModel.PlotConfig.SetMode({
      Mode: "LevelC",
      IsSwitchMainRole: false,
      UseFlowCamera: true
    }, true);
    ModelManager_1.ModelManager.PlotModel.ApplyPlotConfig();
    var e = ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
    if (e) {
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
      if (!o) {
        this.EndInteraction();
        return false;
      }
      var r = o.Entity.GetComponent(198);
      if (!r) {
        this.EndInteraction();
        return false;
      }
      if (!r.IsPawnInteractive()) {
        this.EndInteraction();
        return false;
      }
      ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity = o;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Interaction", 36, "设置当前交互目标", ["EntityId", e]);
      }
      EventSystem_1.EventSystem.EmitWithTarget(o.Entity, EventDefine_1.EEventName.OnInteractPlotStart);
      const l = r.GetInteractController();
      ModelManager_1.ModelManager.PlotModel.InteractController = l;
      this.OpenPlotView("PlotView", e => {
        if (t && e && ModelManager_1.ModelManager.PlotModel.IsInInteraction) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TriggerPlotInteraction, l);
        }
        if (e) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotInteractViewOpen);
        } else {
          this.EndInteraction();
        }
      });
    } else {
      this.EndInteraction();
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 17, "交互目标为空");
      }
    }
    return true;
  }
  static EndInteractionByInteractController(e) {
    if (ModelManager_1.ModelManager.PlotModel.InteractController === e) {
      this.EndInteraction();
    }
  }
  static EndInteraction(e = false, t = false) {
    if (ModelManager_1.ModelManager.PlotModel.IsInInteraction || t) {
      ModelManager_1.ModelManager.PlotModel.IsInInteraction = false;
      ModelManager_1.ModelManager.PlotModel.InteractController = undefined;
      if (e) {
        this.ClearUi();
      } else {
        ModelManager_1.ModelManager.PlotModel.ResetAudioState();
        CameraController_1.CameraController.ExitDialogMode();
        this.CloseAllUi();
        InputDistributeController_1.InputDistributeController.RefreshInputTag();
        this.TogglePlotProtect(false);
      }
      if (ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity) {
        EventSystem_1.EventSystem.EmitWithTarget(ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity.Entity, EventDefine_1.EEventName.OnInteractPlotEnd);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Interaction", 36, "清空当前交互目标", ["EntityId", ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity.Id]);
        }
        ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity = undefined;
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Interaction", 36, "当前交互目标为空");
      }
    }
  }
  static SetBackInteractionAfterFlow() {
    ModelManager_1.ModelManager.PlotModel.IsBackInteractionAfterFlow = true;
  }
  static GetTalkItemsOfFlow(e) {
    if (e) {
      var t = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(e.FlowListName, e.FlowId, e.StateId);
      if (t) {
        t = t.find(e => e.Name === "ShowTalk");
        if (t) {
          return t.Params.TalkItems;
        }
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Level", 7, "[PlotController.StartPlotNetwork] 无法找到对应剧情的ShowTalk行为", ["FlowListName", e.FlowListName], ["FlowId", e.FlowId], ["StateId", e.StateId]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Level", 7, "[PlotController.StartPlotNetwork] 无法找到对应剧情的状态", ["FlowListName", e.FlowListName], ["FlowId", e.FlowId], ["StateId", e.StateId]);
      }
    }
  }
  static GetTalkItemsOfCenterText(e) {
    if (e) {
      var t = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(e.FlowListName, e.FlowId, e.StateId);
      if (t) {
        t = t.find(e => e.Name === "ShowCenterText");
        if (t) {
          return t.Params.TidCenterText;
        }
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Level", 45, "[PlotController.StartPlotNetwork] 无法找到对应剧情的ShowCenterText行为", ["FlowListName", e.FlowListName], ["FlowId", e.FlowId], ["StateId", e.StateId]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Level", 45, "[PlotController.StartPlotNetwork] 无法找到对应剧情的状态", ["FlowListName", e.FlowListName], ["FlowId", e.FlowId], ["StateId", e.StateId]);
      }
    }
  }
  static GetTalkItemsOfCenterTextForTeleport() {
    var e = ModelManager_1.ModelManager.PlotModel.PlayFlow;
    if (e) {
      var t = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(e.FlowListName, e.FlowId, e.StateId);
      if (!t || t.length <= 0) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Level", 45, "[PlotController.StartPlotNetwork] 无法找到对应剧情的状态", ["FlowListName", e.FlowListName], ["FlowId", e.FlowId], ["StateId", e.StateId]);
        }
      } else {
        t = t[0];
        if (t) {
          if (t.Name === "ShowCenterText") {
            return t.Params;
          }
          if (t.Name === "ShowTalk") {
            t = t.Params;
            if (t && t.TalkItems.length > 0) {
              if (t.TalkItems[0].Type === "CenterText") {
                return {
                  ...t.TalkItems[0].CenterTextConfig,
                  TextId: t.TalkItems[0].TextId ?? 1,
                  TidCenterText: t.TalkItems[0].TidTalk
                };
              }
            }
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Level", 45, "[PlotController.StartPlotNetwork] 无法找到对应剧情的ShowCenterText行为", ["FlowListName", e.FlowListName], ["FlowId", e.FlowId], ["StateId", e.StateId]);
        }
      }
    }
  }
  static TriggerBlackSequence() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TriggerBlackSequence);
  }
  static ChangeWeather(e, t, o) {
    if (ModelManager_1.ModelManager.PlotModel.IsInPlot || GlobalData_1.GlobalData.IsPlayInEditor) {
      ModelManager_1.ModelManager.PlotModel.PlotWeather.ChangeWeather(e, t, o);
    }
  }
  static ChangePlotTimeOfDay(e, t, o = 0, r = 0) {
    if (ModelManager_1.ModelManager.PlotModel.IsInPlot || GlobalData_1.GlobalData.IsPlayInEditor) {
      ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.SetTimeDuration(e, t, o, r);
    }
  }
  static EnableViewControl(e) {
    ModelManager_1.ModelManager.PlotModel.CanControlView = e;
    ModelManager_1.ModelManager.PlotModel.UpdateLastViewControl();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotEnableControlView, e);
  }
  static UZu() {
    return ModelManager_1.ModelManager.PlotModel.GetLastViewControl();
  }
  static UpdateViewControl(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 45, "[ViewControl]UpdateViewControl", ["value", e]);
    }
    ModelManager_1.ModelManager.PlotModel.CanControlView = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotEnableControlView, e);
  }
  static ResetViewControl() {
    var e = this.UZu();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 45, "[ViewControl]ResetViewControl", ["value", e]);
    }
    this.EnableViewControl(e);
  }
  static HideSummonedEntity() {
    ModelManager_1.ModelManager.SceneTeamModel?.GetTeamEntities().forEach(e => {
      if (e?.Valid) {
        for (const o of e.Entity.GetComponent(0).CustomServerEntityIds) {
          var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
          if (t?.Valid) {
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t.Entity, false, "剧情隐藏伴生物");
          }
        }
      }
    });
  }
  static TestOpenTick(e) {
    this.TestId = this.AddTick(e);
  }
  static TestCloseTick() {
    this.RemoveTick(this.TestId);
  }
  static AddTick(e) {
    this.UYi++;
    this.AYi++;
    this.PYi.set(this.UYi, e);
    return this.UYi;
  }
  static RemoveTick(e) {
    if (this.PYi.delete(e)) {
      this.AYi--;
    }
  }
  static TickAll(o) {
    if (!(this.AYi <= 0)) {
      this.PYi.forEach((e, t) => {
        try {
          e(o);
        } catch (e) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 26, "PlotModel Tick 异常", ["name", t], ["error", e]);
          }
        }
      });
    }
  }
  static RequestChangeRole() {
    let e = -1;
    for (const o of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)) {
      var t = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(o.GetConfigId);
      if (t) {
        if (ModelManager_1.ModelManager.RoleModel.IsMainRole(t)) {
          if (ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === undefined) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 45, "RequestChangeRole:性别信息丢失", ["id", o.GetCreatureDataId()]);
            }
          } else if (ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleById(t)?.Gender !== ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 45, "RequestChangeRole:非对应性别主角", ["id", o.GetCreatureDataId()]);
            }
          } else {
            if (!o.IsDead()) {
              e = o.GetCreatureDataId();
              break;
            }
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 45, "RequestChangeRole:主角角色已死亡", ["id", o.GetCreatureDataId()]);
            }
          }
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 45, "RequestChangeRole:非主角角色", ["id", o.GetCreatureDataId()]);
        }
      }
    }
    if (e === -1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 45, "RequestChangeRole:主角ID不存在", ["id", e]);
      }
    } else {
      ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(e, {
        GoBattleInvincible: true,
        CanUseGoBattleSkill: false
      });
    }
  }
  static RestoreChangeRole() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(e)?.GetGroup(1)?.GetCurrentRole();
    if (e) {
      ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(e.CreatureDataId, {
        GoBattleInvincible: true,
        CanUseGoBattleSkill: false
      });
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 45, "RestoreChangeRole: 找不到切回角色");
    }
  }
  static ManualAdaptAspectRatio(e) {
    var t = ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera.GetCineCameraComponent();
    var o = (0, puerts_1.$ref)(0);
    var r = (0, puerts_1.$ref)(0);
    Global_1.Global.CharacterController.GetViewportSize(o, r);
    var o = (0, puerts_1.$unref)(o);
    var o = o / (0, puerts_1.$unref)(r);
    ModelManager_1.ModelManager.PlotModel.PlotAspectTransformView?.EnableOnce(e);
    t.bConstrainAspectRatio = false;
    if (t.Filmback.SensorWidth / t.Filmback.SensorHeight < o) {
      t.Filmback.SensorWidth = t.Filmback.SensorHeight * o;
    } else {
      t.Filmback.SensorHeight = t.Filmback.SensorWidth / o;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Test", 26, "打印宽高尺寸.ManualAdaptAspectRatio");
    }
  }
  static async CreateAspectTransformView() {
    if (!ModelManager_1.ModelManager.PlotModel.PlotAspectTransformView) {
      ModelManager_1.ModelManager.PlotModel.PlotAspectTransformView = new PlotAspectTransformView_1.PlotAspectTransformView();
      await ModelManager_1.ModelManager.PlotModel.PlotAspectTransformView.CreateThenShowByResourceIdAsync("UiView_BlackFadeScreen_Prefab", UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Float));
    }
  }
  static RemoveAspectTransformView() {
    if (ModelManager_1.ModelManager.PlotModel.PlotAspectTransformView) {
      ModelManager_1.ModelManager.PlotModel.PlotAspectTransformView.CloseMeAsync();
      ModelManager_1.ModelManager.PlotModel.PlotAspectTransformView = undefined;
    }
  }
}
exports.PlotController = PlotController;
(_a = PlotController).PlotViewManager = new PlotViewManager_1.PlotViewManager();
PlotController.yYi = new PlotFormation_1.PlotFormation();
PlotController.Vwu = new PlotSwitchSubLevel_1.PlotSwitchSubLevel();
PlotController.LYi = 1659230325;
PlotController.DYi = 426183687;
PlotController.EYi = false;
PlotController.TYi = new Set();
PlotController.UYi = 0;
PlotController.PYi = new Map();
PlotController.AYi = 0;
PlotController.qwa = "";
PlotController.Dnd = new Map();
PlotController.xnd = new Set();
PlotController.Pnd = 0;
PlotController.TickPriority2 = o => {
  if (!(_a.Dnd.size <= 0)) {
    _a.Dnd.forEach((e, t) => {
      try {
        e(o);
      } catch (e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 26, "PlotController TickPriority2 异常", ["name", t], ["error", e]);
        }
      }
    });
    if (_a.xnd.size > 0) {
      _a.xnd.forEach(e => {
        _a.Dnd.delete(e);
      });
      _a.xnd.clear();
    }
  }
};
PlotController.Yad = new Map();
PlotController.zad = new Set();
PlotController.Xad = 0;
PlotController.AfterTick = o => {
  if (!(_a.Yad.size <= 0)) {
    _a.Yad.forEach((e, t) => {
      e(o);
    });
    if (_a.zad.size > 0) {
      _a.zad.forEach(e => {
        _a.Yad.delete(e);
      });
      _a.zad.clear();
    }
  }
};
PlotController.O01 = undefined;
PlotController.SYi = () => {
  if (ModelManager_1.ModelManager.PlotModel.IsInPlot) {
    ModelManager_1.ModelManager.PlotModel.PlotResult.ResultCode = 1;
    ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow("加载地图前跳过当前剧情", false);
  }
};
PlotController.nye = () => {
  if (!ModelManager_1.ModelManager.PlotModel.IsInPlot) {
    PlotController.RYi(ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity, false);
  }
};
PlotController.hMe = () => {
  PlotController.EndInteraction();
};
PlotController.Mze = () => {
  if (ModelManager_1.ModelManager.PlotModel.IsInPlot) {
    ControllerHolder_1.ControllerHolder.FlowController.FinishFlow("退出联机时退出剧情");
    ControllerHolder_1.ControllerHolder.FlowController.ClearOnLeaveOnlineWorld();
  }
};
PlotController.Zpe = e => {
  if (e && ControllerHolder_1.ControllerHolder.FlowController.IsInShowTalk() && ModelManager_1.ModelManager.PlotModel.PlotConfig.SkipTalkWhenFighting) {
    ControllerHolder_1.ControllerHolder.FlowController.FinishFlow("战斗状态改变结束剧情");
  }
};
PlotController.OnChangeRole = (e, t) => {
  if (ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()) {
    PlotController.ProtectCurrentRole();
  } else {
    PlotController.RYi(e.Entity, false);
  }
};
PlotController.dLe = () => {
  if (ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType === 3) {
    PlotController.ProtectCurrentRole();
  }
};
PlotController.BMc = e => {
  if (ModelManager_1.ModelManager.PlotModel.IsInPlot && ModelManager_1.ModelManager.PlotModel.CurContext?.Type === 6 && ModelManager_1.ModelManager.PlotModel.CurContext.TreeConfigId === e) {
    ControllerHolder_1.ControllerHolder.FlowController.FinishFlow("任务树回退打断剧情");
  }
};
PlotController.TestId = 0; //# sourceMappingURL=PlotController.js.map