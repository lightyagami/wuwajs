"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const CreateCharacterController_1 = require("../CreateCharacter/CreateCharacterController");
const GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil");
const PlotController_1 = require("../Plot/PlotController");
const SequenceController_1 = require("../Plot/Sequence/SequenceController");
const FRAME_PER_SECOND = 30;
class PlotBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static IsInSequence() {
    return ModelManager_1.ModelManager.PlotModel.IsInPlot && (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelA" || ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelB");
  }
  static SkipCurrentSequence() {}
  static PauseSequence() {}
  static ResumeSequence() {}
  static UseEnterMoveMode(e) {}
  static StartPlotTs(e) {
    if (ModelManager_1.ModelManager.PlotModel.IsInPlot && ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel !== "LevelD") {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 17, "当前正在播放其他剧情，不允许打断");
      }
    } else {
      ControllerHolder_1.ControllerHolder.FlowController.StartFlowByRes(e);
    }
  }
  static IsInPerformingPlot() {
    return !!ModelManager_1.ModelManager.PlotModel && (ModelManager_1.ModelManager.PlotModel.IsInInteraction || ModelManager_1.ModelManager.PlotModel.IsInPlot && ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel !== "LevelD");
  }
  static TriggerBlackSequence() {
    PlotController_1.PlotController.TriggerBlackSequence();
  }
  static ChangePlotWeather(e, t, r) {
    PlotController_1.PlotController.ChangeWeather(e, t, r);
  }
  static ChangePlotTimeOfDay(e, t, r, a) {
    PlotController_1.PlotController.ChangePlotTimeOfDay(e, t, r, a / FRAME_PER_SECOND);
  }
  static ExecuteSequenceEvents(e) {
    SequenceController_1.SequenceController.RunSequenceFrameEvents(e);
  }
  static ExecuteEntitySequenceEvents(e, t) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
    if (r?.IsInit) {
      r.Entity?.GetComponent(173)?.ExecuteEvent(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 26, "场景引用Sequence帧事件找不到实体", ["key", e], ["id", t]);
    }
  }
  static TriggerCutChange() {
    SequenceController_1.SequenceController.TriggerCutChange();
  }
  static OpenChapterUi(e, t) {
    GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.OpenChapterViewV2(e, t, true);
  }
  static ShowLogo(e) {
    SequenceController_1.SequenceController.ShowLogo(e);
  }
  static OpenUiView(e, t, r, a, n = true) {
    switch (ModelManager_1.ModelManager.WorldLevelModel.Sex) {
      case 0:
        SequenceController_1.SequenceController.OpenUiView(t, a, n);
        break;
      case 1:
        SequenceController_1.SequenceController.OpenUiView(e, r, n);
    }
  }
  static OpenUiViewInArray(e, t, r, a) {
    switch (ModelManager_1.ModelManager.WorldLevelModel.Sex) {
      case 0:
        var n = (0, puerts_1.$unref)(a);
        SequenceController_1.SequenceController.OpenUiViewForArray(t, n);
        break;
      case 1:
        n = (0, puerts_1.$unref)(r);
        SequenceController_1.SequenceController.OpenUiViewForArray(e, n);
    }
  }
  static PlayUiLevelSequence(e) {
    SequenceController_1.SequenceController.PlayUiLevelSequence(e);
  }
  static CloseUiView() {
    SequenceController_1.SequenceController.CloseUiView();
  }
  static PlaySpineAnim(e, t = true) {
    SequenceController_1.SequenceController.PlaySpineAnim(e, t);
  }
  static PlaySpineAnimForGender(e, t, r = true) {
    switch (ModelManager_1.ModelManager.WorldLevelModel.Sex) {
      case 0:
        SequenceController_1.SequenceController.PlaySpineAnim(t, r);
        break;
      case 1:
        SequenceController_1.SequenceController.PlaySpineAnim(e, r);
    }
  }
  static PlaySpineAnimForGenderInArray(e, t) {
    switch (ModelManager_1.ModelManager.WorldLevelModel.Sex) {
      case 0:
        var r = (0, puerts_1.$unref)(t);
        SequenceController_1.SequenceController.PlaySpineAnimInArray(r);
        break;
      case 1:
        r = (0, puerts_1.$unref)(e);
        SequenceController_1.SequenceController.PlaySpineAnimInArray(r);
    }
  }
  static CloseSpineAnim(e) {
    SequenceController_1.SequenceController.CloseSpineAnim(e);
  }
  static CloseSpineAnimInArray(e) {
    e = (0, puerts_1.$unref)(e);
    SequenceController_1.SequenceController.CloseSpineAnimInArray(e);
  }
  static AdditionSeqPlay(e, t, r, a) {
    if (e) {
      SequenceController_1.SequenceController.AdditionSeqPlay(e, t, r, a);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Level", 45, "AdditionSeqPlay 没找到LevelSequence");
    }
  }
  static AdditionSeqEnd() {
    SequenceController_1.SequenceController.AdditionSeqEnd();
  }
  static ShowNameInput() {
    CreateCharacterController_1.CreateCharacterController.TriggerInputName();
  }
  static AddBurstEyeRenderingMaterial(e) {
    CreateCharacterController_1.CreateCharacterController.AddBurstEyeRenderingMaterial(e);
  }
  static RemoveBurstEyeRenderingMaterial(e) {
    CreateCharacterController_1.CreateCharacterController.RemoveBurstEyeRenderingMaterial(e);
  }
  static AddInteractTagToInteractingGravityMachine() {
    ModelManager_1.ModelManager.GravityFlipModel.GravityFlipComp?.AddInteractTag();
  }
  static RemoveInteractTagFromInteractingGravityMachine() {
    ModelManager_1.ModelManager.GravityFlipModel.GravityFlipComp?.RemoveInteractTag();
  }
  static TriggerTagToInteractingGravityMachine(e) {
    var t = ModelManager_1.ModelManager.GravityFlipModel.GravityFlipEntity?.GetComponent(215);
    var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.TagName);
    if (t?.HasTag(e)) {
      t?.RemoveTag(e);
    }
    t?.AddTag(e);
  }
  static ShowBgIcon(e, t, r) {
    UiManager_1.UiManager.GetViewByName("PlotSubtitleView")?.SetIconBySequence(e, t, r);
  }
  static BindItemInspectActor(e) {
    var t = ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor;
    if (t?.IsValid() && (t = t.SequencePlayer.GetSpawnedActorByGuid(e.Guid, true))?.IsValid()) {
      ControllerHolder_1.ControllerHolder.ItemInspectController.BindItemInspectActor(t);
    }
  }
  static EnablePlotInteract(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EnableInteractPlot, e, false);
  }
  static EnableCameraShake(e, t) {
    ControllerHolder_1.ControllerHolder.SequenceController.EnableCameraShake(e, t);
  }
  static NeedFlowAdaption() {
    return !!GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.FlowAdaptation);
  }
}
exports.default = PlotBlueprintFunctionLibrary;
//# sourceMappingURL=PlotBlueprintFunctionLibrary.js.map