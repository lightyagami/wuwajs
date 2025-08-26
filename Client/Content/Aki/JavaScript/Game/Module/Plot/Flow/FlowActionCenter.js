"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowAction = exports.FlowActionCenter = undefined;
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const FlowActionAddPlayBubble_1 = require("../FlowActions/FlowActionAddPlayBubble");
const FlowActionAwakeEntity_1 = require("../FlowActions/FlowActionAwakeEntity");
const FlowActionBeginFlowTemplate_1 = require("../FlowActions/FlowActionBeginFlowTemplate");
const FlowActionCameraLookAt_1 = require("../FlowActions/FlowActionCameraLookAt");
const FlowActionChangeActorTalker_1 = require("../FlowActions/FlowActionChangeActorTalker");
const FlowActionChangeEntityPerformanceState_1 = require("../FlowActions/FlowActionChangeEntityPerformanceState");
const FlowActionChangeEntitySelfState_1 = require("../FlowActions/FlowActionChangeEntitySelfState");
const FlowActionChangeEntityState_1 = require("../FlowActions/FlowActionChangeEntityState");
const FlowActionChangeFormation_1 = require("../FlowActions/FlowActionChangeFormation");
const FlowActionChangeInteractOptionText_1 = require("../FlowActions/FlowActionChangeInteractOptionText");
const FlowActionChangeState_1 = require("../FlowActions/FlowActionChangeState");
const FlowActionChangeTrapDefenseMiniMap_1 = require("../FlowActions/FlowActionChangeTrapDefenseMiniMap");
const FlowActionCloseFlowTemplate_1 = require("../FlowActions/FlowActionCloseFlowTemplate");
const FlowActionDestroyEntity_1 = require("../FlowActions/FlowActionDestroyEntity");
const FlowActionFadeInScreen_1 = require("../FlowActions/FlowActionFadeInScreen");
const FlowActionFadeOutScreen_1 = require("../FlowActions/FlowActionFadeOutScreen");
const FlowActionFinishState_1 = require("../FlowActions/FlowActionFinishState");
const FlowActionFinishTalk_1 = require("../FlowActions/FlowActionFinishTalk");
const FlowActionHideByRangeInFlow_1 = require("../FlowActions/FlowActionHideByRangeInFlow");
const FlowActionJumpTalk_1 = require("../FlowActions/FlowActionJumpTalk");
const FlowActionLeisureInteract_1 = require("../FlowActions/FlowActionLeisureInteract");
const FlowActionLevelSyncAction_1 = require("../FlowActions/FlowActionLevelSyncAction");
const FlowActionLockTodTime_1 = require("../FlowActions/FlowActionLockTodTime");
const FlowActionOpenQuestChapterView_1 = require("../FlowActions/FlowActionOpenQuestChapterView");
const FlowActionOpenSimpleGameplay_1 = require("../FlowActions/FlowActionOpenSimpleGameplay");
const FlowActionOpenSystemBoard_1 = require("../FlowActions/FlowActionOpenSystemBoard");
const FlowActionPlayMovie_1 = require("../FlowActions/FlowActionPlayMovie");
const FlowActionPlaySequenceData_1 = require("../FlowActions/FlowActionPlaySequenceData");
const FlowActionPlaySpine_1 = require("../FlowActions/FlowActionPlaySpine");
const FlowActionPreEnableSubLevel_1 = require("../FlowActions/FlowActionPreEnableSubLevel");
const FlowActionServerAction_1 = require("../FlowActions/FlowActionServerAction");
const FlowActionSetAudioState_1 = require("../FlowActions/FlowActionSetAudioState");
const FlowActionSetCameraAnim_1 = require("../FlowActions/FlowActionSetCameraAnim");
const FlowActionSetEntityVisible_1 = require("../FlowActions/FlowActionSetEntityVisible");
const FlowActionSetFlowTemplate_1 = require("../FlowActions/FlowActionSetFlowTemplate");
const FlowActionSetHeadIconVisible_1 = require("../FlowActions/FlowActionSetHeadIconVisible");
const FlowActionSetNpcGroupPerform_1 = require("../FlowActions/FlowActionSetNpcGroupPerform");
const FlowActionSetPlayerPos_1 = require("../FlowActions/FlowActionSetPlayerPos");
const FlowActionSetPlotMode_1 = require("../FlowActions/FlowActionSetPlotMode");
const FlowActionSetTime_1 = require("../FlowActions/FlowActionSetTime");
const FLowActionShowAllHidedGroupInFlow_1 = require("../FlowActions/FLowActionShowAllHidedGroupInFlow");
const FlowActionShowCenterText_1 = require("../FlowActions/FlowActionShowCenterText");
const FlowActionShowTalk_1 = require("../FlowActions/FlowActionShowTalk");
const FlowActionStopUiScreenEffect_1 = require("../FlowActions/FlowActionStopUiScreenEffect");
const FlowActionSwitchSubLevels_1 = require("../FlowActions/FlowActionSwitchSubLevels");
const FlowActionTakePlotPhoto_1 = require("../FlowActions/FlowActionTakePlotPhoto");
const FlowActionUnlockEntity_1 = require("../FlowActions/FlowActionUnlockEntity");
const FlowActionWait_1 = require("../FlowActions/FlowActionWait");
class FlowActionCenter extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.EXi = new Map();
  }
  OnInit() {
    this.LTe();
  }
  OnDestroy() {
    this.EXi?.clear();
  }
  LTe() {
    this.SXi("ShowTalk", FlowActionShowTalk_1.FlowActionShowTalk);
    this.SXi("ChangeState", FlowActionChangeState_1.FlowActionChangeState);
    this.SXi("FinishState", FlowActionFinishState_1.FlowActionFinishState);
    this.SXi("JumpTalk", FlowActionJumpTalk_1.FlowActionJumpTalk);
    this.SXi("FinishTalk", FlowActionFinishTalk_1.FlowActionFinishTalk);
    this.SXi("PlaySequenceData", FlowActionPlaySequenceData_1.FlowActionPlaySequenceData);
    this.SXi("SetPlotMode", FlowActionSetPlotMode_1.FlowActionSetPlotMode);
    this.SXi("ShowCenterText", FlowActionShowCenterText_1.FlowActionShowCenterText);
    this.SXi("SetHeadIconVisible", FlowActionSetHeadIconVisible_1.FlowActionSetHeadIconVisible);
    this.SXi("Wait", FlowActionWait_1.FlowActionWait);
    this.SXi("PlayMovie", FlowActionPlayMovie_1.FlowActionPlayMovie);
    this.SXi("ChangeInteractOptionText", FlowActionChangeInteractOptionText_1.FlowActionChangeInteractOptionText, true);
    this.SXi("FadeInScreen", FlowActionFadeInScreen_1.FlowActionFadeInScreen);
    this.SXi("FadeOutScreen", FlowActionFadeOutScreen_1.FlowActionFadeOutScreen);
    this.SXi("BeginFlowTemplate", FlowActionBeginFlowTemplate_1.FlowActionBeginFlowTemplate);
    this.SXi("SetFlowTemplate", FlowActionSetFlowTemplate_1.FlowActionSetFlowTemplate);
    this.SXi("CloseFlowTemplate", FlowActionCloseFlowTemplate_1.FlowActionCloseFlowTemplate);
    this.SXi("SetPlayerPos", FlowActionSetPlayerPos_1.FlowActionSetPlayerPos);
    this.SXi("AwakeEntity", FlowActionAwakeEntity_1.FlowActionAwakeEntity);
    this.SXi("DestroyEntity", FlowActionDestroyEntity_1.FlowActionDestroyEntity);
    this.SXi("PlayerLookAt", FlowActionLevelSyncAction_1.FlowActionLevelSyncAction, true);
    this.SXi("PostAkEvent", FlowActionLevelSyncAction_1.FlowActionLevelSyncAction, true);
    this.SXi("CameraLookAt", FlowActionCameraLookAt_1.FlowActionCameraLookAt);
    this.SXi("PlayBubble", FlowActionLevelSyncAction_1.FlowActionLevelSyncAction, true);
    this.SXi("AddPlayBubble", FlowActionAddPlayBubble_1.FlowActionAddPlayBubble, true);
    this.SXi("SetCameraAnim", FlowActionSetCameraAnim_1.FlowActionSetCameraAnim, true);
    this.SXi("TakePlotPhoto", FlowActionTakePlotPhoto_1.FlowActionTakePlotPhoto);
    this.SXi("SetTime", FlowActionSetTime_1.FlowActionSetTime, true);
    this.SXi("HideByRangeInFlow", FlowActionHideByRangeInFlow_1.FlowActionHideByRangeInFlow, true);
    this.SXi("ShowAllHidedGroupInFlow", FLowActionShowAllHidedGroupInFlow_1.FlowActionShowAllHidedGroupInFlow, true);
    this.SXi("ChangeActorTalker", FlowActionChangeActorTalker_1.FlowActionChangeActorTalker, true);
    this.SXi("SetWeather", FlowActionServerAction_1.FlowActionServerAction);
    this.SXi("SetTimeLockState", FlowActionLockTodTime_1.FlowActionLockTodTime, true);
    this.SXi("SetWeatherLockState", FlowActionServerAction_1.FlowActionServerAction);
    this.SXi("PromptQuestChapterUI", FlowActionOpenQuestChapterView_1.FlowActionOpenQuestChapterView);
    this.SXi("OpenSystemBoard", FlowActionOpenSystemBoard_1.FlowActionOpenSystemBoard);
    this.SXi("ChangeEntityState", FlowActionChangeEntityState_1.FlowActionChangeEntityState);
    this.SXi("UnlockEntity", FlowActionUnlockEntity_1.FlowActionUnlockEntity, true);
    this.SXi("AdjustPlayerCamera", FlowActionLevelSyncAction_1.FlowActionLevelSyncAction, true);
    this.SXi("RestorePlayerCameraAdjustment", FlowActionLevelSyncAction_1.FlowActionLevelSyncAction, true);
    this.SXi("ChangeEntityPrefabPerformance", FlowActionChangeEntityPerformanceState_1.FlowActionChangeEntityPerformanceState, true);
    this.SXi("ChangeSelfEntityState", FlowActionChangeEntitySelfState_1.FlowActionChangeEntitySelfState, true);
    this.SXi("SetEntityVisible", FlowActionSetEntityVisible_1.FlowActionSetEntityVisible);
    this.SXi("ChangePhantomFormation", FlowActionChangeFormation_1.FlowActionChangeFormation);
    this.SXi("RestorePhantomFormation", FlowActionChangeFormation_1.FlowActionChangeFormation);
    this.SXi("AddTrialCharacter", FlowActionChangeFormation_1.FlowActionChangeFormation);
    this.SXi("RemoveTrialCharacter", FlowActionChangeFormation_1.FlowActionChangeFormation);
    this.SXi("SwitchSubLevels", FlowActionSwitchSubLevels_1.FlowActionSwitchSubLevels);
    this.SXi("LeisureInteract", FlowActionLeisureInteract_1.FlowActionLeisureInteract);
    this.SXi("SetSpineAnimation", FlowActionPlaySpine_1.FlowActionPlaySpine, true);
    this.SXi("SetAudioState", FlowActionSetAudioState_1.FlowActionSetAudioState, true);
    this.SXi("StopUiScreenEffect", FlowActionStopUiScreenEffect_1.FlowActionStopUiScreenEffect, true);
    this.SXi("OpenSimpleGameplay", FlowActionOpenSimpleGameplay_1.FlowActionOpenSimpleGameplay);
    this.SXi("FlowDefineNpcGroupPerform", FlowActionSetNpcGroupPerform_1.FlowActionSetNpcGroupPerform);
    this.SXi("TrapDefenseChangeMiniMap", FlowActionChangeTrapDefenseMiniMap_1.FlowActionChangeTrapDefenseMiniMap, true);
    this.SXi("ClientPreEnableSubLevels", FlowActionPreEnableSubLevel_1.FlowActionPreEnableSubLevel);
  }
  SXi(t, o, e = false) {
    var i;
    if (!this.EXi.has(t)) {
      (i = new FlowAction()).Init(t, o, e);
      this.EXi.set(t, i);
    }
  }
  GetFlowAction(t) {
    return this.EXi.get(t);
  }
}
exports.FlowActionCenter = FlowActionCenter;
class FlowAction {
  constructor() {
    this.Type = "";
    this.ActionClass = undefined;
    this.IsAutoFinish = false;
    this.ActionInstanceList = undefined;
  }
  Init(t, o, e = false) {
    this.Type = t;
    this.ActionClass = o;
    this.IsAutoFinish = e;
    this.ActionInstanceList = new Array();
    t = this.dZ();
    this.ActionInstanceList.push(t);
  }
  dZ() {
    var t = new this.ActionClass();
    t.Type = this.Type;
    return t;
  }
  GetAction() {
    var t = this.yXi();
    t.Owner = this;
    return t;
  }
  yXi() {
    if (this.IsAutoFinish) {
      return this.ActionInstanceList[0];
    } else if (this.ActionInstanceList.length <= 0) {
      return this.dZ();
    } else {
      return this.ActionInstanceList.pop();
    }
  }
  RecycleAction(t) {
    t.Owner = undefined;
    if (!this.IsAutoFinish) {
      this.ActionInstanceList.push(t);
    }
  }
}
exports.FlowAction = FlowAction;
//# sourceMappingURL=FlowActionCenter.js.map