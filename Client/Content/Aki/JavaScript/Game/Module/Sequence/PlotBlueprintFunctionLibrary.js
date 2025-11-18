"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
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
  static ChangePlotWeather(e, r, t) {
    PlotController_1.PlotController.ChangeWeather(e, r, t);
  }
  static ChangePlotTimeOfDay(e, r, t, a) {
    PlotController_1.PlotController.ChangePlotTimeOfDay(e, r, t, a / FRAME_PER_SECOND);
  }
  static ExecuteSequenceEvents(e) {
    SequenceController_1.SequenceController.RunSequenceFrameEvents(e);
  }
  static ExecuteEntitySequenceEvents(e, r) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
    if (t?.IsInit) {
      t.Entity?.GetComponent(168)?.ExecuteEvent(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 26, "场景引用Sequence帧事件找不到实体", ["key", e], ["id", r]);
    }
  }
  static TriggerCutChange() {
    SequenceController_1.SequenceController.TriggerCutChange();
  }
  static OpenChapterUi(e, r) {
    GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.OpenChapterViewV2(e, r, true);
  }
  static ShowLogo(e) {
    SequenceController_1.SequenceController.ShowLogo(e);
  }
  static OpenUiView(e, r, t, a, n = true) {
    switch (ModelManager_1.ModelManager.WorldLevelModel.Sex) {
      case 0:
        SequenceController_1.SequenceController.OpenUiView(r, a, n);
        break;
      case 1:
        SequenceController_1.SequenceController.OpenUiView(e, t, n);
    }
  }
  static OpenUiViewInArray(e, r, t, a) {
    switch (ModelManager_1.ModelManager.WorldLevelModel.Sex) {
      case 0:
        var n = (0, puerts_1.$unref)(a);
        SequenceController_1.SequenceController.OpenUiViewForArray(r, n);
        break;
      case 1:
        n = (0, puerts_1.$unref)(t);
        SequenceController_1.SequenceController.OpenUiViewForArray(e, n);
    }
  }
  static PlayUiLevelSequence(e) {
    SequenceController_1.SequenceController.PlayUiLevelSequence(e);
  }
  static CloseUiView() {
    SequenceController_1.SequenceController.CloseUiView();
  }
  static PlaySpineAnim(e, r = true) {
    SequenceController_1.SequenceController.PlaySpineAnim(e, r);
  }
  static PlaySpineAnimForGender(e, r, t = true) {
    switch (ModelManager_1.ModelManager.WorldLevelModel.Sex) {
      case 0:
        SequenceController_1.SequenceController.PlaySpineAnim(r, t);
        break;
      case 1:
        SequenceController_1.SequenceController.PlaySpineAnim(e, t);
    }
  }
  static PlaySpineAnimForGenderInArray(e, r) {
    switch (ModelManager_1.ModelManager.WorldLevelModel.Sex) {
      case 0:
        var t = (0, puerts_1.$unref)(r);
        SequenceController_1.SequenceController.PlaySpineAnimInArray(t);
        break;
      case 1:
        t = (0, puerts_1.$unref)(e);
        SequenceController_1.SequenceController.PlaySpineAnimInArray(t);
    }
  }
  static CloseSpineAnim(e) {
    SequenceController_1.SequenceController.CloseSpineAnim(e);
  }
  static CloseSpineAnimInArray(e) {
    e = (0, puerts_1.$unref)(e);
    SequenceController_1.SequenceController.CloseSpineAnimInArray(e);
  }
  static AdditionSeqPlay(e, r, t, a) {
    if (e) {
      SequenceController_1.SequenceController.AdditionSeqPlay(e, r, t, a);
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
    var r = ModelManager_1.ModelManager.GravityFlipModel.GravityFlipEntity?.GetComponent(209);
    var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.TagName);
    if (r?.HasTag(e)) {
      r?.RemoveTag(e);
    }
    r?.AddTag(e);
  }
  static ShowBgIcon(e, r, t) {
    UiManager_1.UiManager.GetViewByName("PlotSubtitleView")?.SetIconBySequence(e, r, t);
  }
  static BindItemInspectActor(e) {
    var r = ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor;
    if (r?.IsValid() && (r = r.SequencePlayer.GetSpawnedActorByGuid(e.Guid, true))?.IsValid()) {
      ControllerHolder_1.ControllerHolder.ItemInspectController.BindItemInspectActor(r);
    }
  }
}
exports.default = PlotBlueprintFunctionLibrary;
//# sourceMappingURL=PlotBlueprintFunctionLibrary.js.map