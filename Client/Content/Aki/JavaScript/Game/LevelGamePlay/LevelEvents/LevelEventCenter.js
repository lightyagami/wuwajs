"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventCenter = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const GlobalData_1 = require("../../GlobalData");
const LevelEventSetClientEntityVisibleSave_1 = require("../LevelConditions/LevelEventSetClientEntityVisibleSave");
const LevelEventChangePhantomFormation_1 = require("../LevelEventChangePhantomFormation");
const LevelEventRestorePhantomFormation_1 = require("../LevelEventRestorePhantomFormation");
const LevelGameplayActionsDefine_1 = require("../LevelGameplayActionsDefine");
const LevelEventRunDemoActorCustomEvent_1 = require("./DemoInteract/LevelEventRunDemoActorCustomEvent");
const LevelEventSetDemoActorVar_1 = require("./DemoInteract/LevelEventSetDemoActorVar");
const LevelEventAddBuffToEntity_1 = require("./LevelEventAddBuffToEntity");
const LevelEventAddBuffToPlayer_1 = require("./LevelEventAddBuffToPlayer");
const LevelEventAddBuffToTriggeredEntity_1 = require("./LevelEventAddBuffToTriggeredEntity");
const LevelEventAddInputTag_1 = require("./LevelEventAddInputTag");
const LevelEventAddTrialCharacter_1 = require("./LevelEventAddTrialCharacter");
const LevelEventAdjustPlayerCamera_1 = require("./LevelEventAdjustPlayerCamera");
const LevelEventAdjustTodTime_1 = require("./LevelEventAdjustTodTime");
const LevelEventBvbPlayDialog_1 = require("./LevelEventBvbPlayDialog");
const LevelEventBvbPlayerOperationConstraint_1 = require("./LevelEventBvbPlayerOperationConstraint");
const LevelEventCameraLookAtPosition_1 = require("./LevelEventCameraLookAtPosition");
const LevelEventCaptureRequest_1 = require("./LevelEventCaptureRequest");
const LevelEventChangeEntityPerformanceState_1 = require("./LevelEventChangeEntityPerformanceState");
const LevelEventChangeEntityState_1 = require("./LevelEventChangeEntityState");
const LevelEventChangeNpcPerformState_1 = require("./LevelEventChangeNpcPerformState");
const LevelEventChangeSelfEntityState_1 = require("./LevelEventChangeSelfEntityState");
const LevelEventChangeToVision_1 = require("./LevelEventChangeToVision");
const LevelEventCharacterMove_1 = require("./LevelEventCharacterMove");
const LevelEventCheckBattleState_1 = require("./LevelEventCheckBattleState");
const LevelEventClaimDungeonReward_1 = require("./LevelEventClaimDungeonReward");
const LevelEventClaimLevelPlayReward_1 = require("./LevelEventClaimLevelPlayReward");
const LevelEventClientChangeTeamPosition_1 = require("./LevelEventClientChangeTeamPosition");
const LevelEventClientSetPlayerPos_1 = require("./LevelEventClientSetPlayerPos");
const LevelEventCloseWalkingOverlayMontage_1 = require("./LevelEventCloseWalkingOverlayMontage");
const LevelEventCollect_1 = require("./LevelEventCollect");
const LevelEventCommonTip2_1 = require("./LevelEventCommonTip2");
const LevelEventCompleteGuide_1 = require("./LevelEventCompleteGuide");
const LevelEventDeliverQuestBehavior_1 = require("./LevelEventDeliverQuestBehavior");
const LevelEventDestroySelf_1 = require("./LevelEventDestroySelf");
const LevelEventDisableEntityLookAt_1 = require("./LevelEventDisableEntityLookAt");
const LevelEventEnableAi_1 = require("./LevelEventEnableAi");
const LevelEventEnableEntityLookAt_1 = require("./LevelEventEnableEntityLookAt");
const LevelEventEnableHostility_1 = require("./LevelEventEnableHostility");
const LevelEventEnableKey4Func_1 = require("./LevelEventEnableKey4Func");
const LevelEventEnableSplineMoveModel_1 = require("./LevelEventEnableSplineMoveModel");
const LevelEventEndPrompt_1 = require("./LevelEventEndPrompt");
const LevelEventEnterOrbitalCamera_1 = require("./LevelEventEnterOrbitalCamera");
const LevelEventEnterSequenceCamera_1 = require("./LevelEventEnterSequenceCamera");
const LevelEventEnterVehicleNpc_1 = require("./LevelEventEnterVehicleNpc");
const LevelEventEntityLookAt_1 = require("./LevelEventEntityLookAt");
const LevelEventEntityTurnTo_1 = require("./LevelEventEntityTurnTo");
const LevelEventExecClientBattleAction_1 = require("./LevelEventExecClientBattleAction");
const LevelEventExecution_1 = require("./LevelEventExecution");
const LevelEventExitDungeon_1 = require("./LevelEventExitDungeon");
const LevelEventExitOrbitalCamera_1 = require("./LevelEventExitOrbitalCamera");
const LevelEventFadeInScreen_1 = require("./LevelEventFadeInScreen");
const LevelEventFadeOutScreen_1 = require("./LevelEventFadeOutScreen");
const LevelEventFakePlayerInput_1 = require("./LevelEventFakePlayerInput");
const LevelEventFocusOnMapMark_1 = require("./LevelEventFocusOnMapMark");
const LevelEventForceLockOnSpecialTagTarget_1 = require("./LevelEventForceLockOnSpecialTagTarget");
const LevelEventGuideTrigger_1 = require("./LevelEventGuideTrigger");
const LevelEventHideTargetRange_1 = require("./LevelEventHideTargetRange");
const LevelEventHighlightExploreUi_1 = require("./LevelEventHighlightExploreUi");
const LevelEventInteractFan_1 = require("./LevelEventInteractFan");
const LevelEventInteractGravityFlip_1 = require("./LevelEventInteractGravityFlip");
const LevelEventInterludeActions_1 = require("./LevelEventInterludeActions");
const LevelEventLeisureInteract_1 = require("./LevelEventLeisureInteract");
const LevelEventLockEntity_1 = require("./LevelEventLockEntity");
const LevelEventLog_1 = require("./LevelEventLog");
const LevelEventModifyActorMaterial_1 = require("./LevelEventModifyActorMaterial");
const LevelEventMoveJigsawItem_1 = require("./LevelEventMoveJigsawItem");
const LevelEventMoveWithSpline_1 = require("./LevelEventMoveWithSpline");
const LevelEventOpenChapterUi_1 = require("./LevelEventOpenChapterUi");
const LevelEventOpenQte_1 = require("./LevelEventOpenQte");
const LevelEventOpenSimpleGameplay_1 = require("./LevelEventOpenSimpleGameplay");
const LevelEventOpenSystem_1 = require("./LevelEventOpenSystem");
const LevelEventPickupDropItem_1 = require("./LevelEventPickupDropItem");
const LevelEventPlayBubble_1 = require("./LevelEventPlayBubble");
const LevelEventPlayDynamicSettlement_1 = require("./LevelEventPlayDynamicSettlement");
const LevelEventPlayerLoockAt_1 = require("./LevelEventPlayerLoockAt");
const LevelEventPlayGuestAnimation_1 = require("./LevelEventPlayGuestAnimation");
const LevelEventPlayLevelSequence_1 = require("./LevelEventPlayLevelSequence");
const LevelEventPlayMontage_1 = require("./LevelEventPlayMontage");
const LevelEventPlayRegisteredMontage_1 = require("./LevelEventPlayRegisteredMontage");
const LevelEventPlayWalkingOverlayMontage_1 = require("./LevelEventPlayWalkingOverlayMontage");
const LevelEventPlotInterludeAction_1 = require("./LevelEventPlotInterludeAction");
const LevelEventPostAkEvent_1 = require("./LevelEventPostAkEvent");
const LevelEventPreload_1 = require("./LevelEventPreload");
const LevelEventPrompt_1 = require("./LevelEventPrompt");
const LevelEventRefreshInputTag_1 = require("./LevelEventRefreshInputTag");
const LevelEventReignsSetPropertyVisible_1 = require("./LevelEventReignsSetPropertyVisible");
const LevelEventRemoveBuffFromCreature_1 = require("./LevelEventRemoveBuffFromCreature");
const LevelEventRemoveNpcGroupPerform_1 = require("./LevelEventRemoveNpcGroupPerform");
const LevelEventResetAiBehaviorTree_1 = require("./LevelEventResetAiBehaviorTree");
const LevelEventResetPlayerCameraFocus_1 = require("./LevelEventResetPlayerCameraFocus");
const LevelEventRestoreCameraLookAtPosition_1 = require("./LevelEventRestoreCameraLookAtPosition");
const LevelEventRestoreFromVision_1 = require("./LevelEventRestoreFromVision");
const LevelEventRestorePlayerCameraAdjustment_1 = require("./LevelEventRestorePlayerCameraAdjustment");
const LevelEventRogueReceiveReward_1 = require("./LevelEventRogueReceiveReward");
const LevelEventRunAction_1 = require("./LevelEventRunAction");
const LevelEventSceneItemMove_1 = require("./LevelEventSceneItemMove");
const LevelEventSendAiEvent_1 = require("./LevelEventSendAiEvent");
const LevelEventSendGameplayEventToPlayer_1 = require("./LevelEventSendGameplayEventToPlayer");
const LevelEventSetActorVisible_1 = require("./LevelEventSetActorVisible");
const LevelEventSetAiBehaviorTree_1 = require("./LevelEventSetAiBehaviorTree");
const LevelEventSetBattleState_1 = require("./LevelEventSetBattleState");
const LevelEventSetClientEntityVisible_1 = require("./LevelEventSetClientEntityVisible");
const LevelEventSetExploreState_1 = require("./LevelEventSetExploreState");
const LevelEventSetInteractionLockState_1 = require("./LevelEventSetInteractionLockState");
const LevelEventSetNpcGroupPerform_1 = require("./LevelEventSetNpcGroupPerform");
const LevelEventSetNpcPosition_1 = require("./LevelEventSetNpcPosition");
const LevelEventSetPlayerMoveControl_1 = require("./LevelEventSetPlayerMoveControl");
const LevelEventSetPlayerOperation_1 = require("./LevelEventSetPlayerOperation");
const LevelEventSetRegionConfig_1 = require("./LevelEventSetRegionConfig");
const LevelEventSetSkillButtonEffect_1 = require("./LevelEventSetSkillButtonEffect");
const LevelEventSetSubLevelsVisible_1 = require("./LevelEventSetSubLevelsVisible");
const LevelEventSetTeleControl_1 = require("./LevelEventSetTeleControl");
const LevelEventSetTimeScale_1 = require("./LevelEventSetTimeScale");
const LevelEventSettlementDungeon_1 = require("./LevelEventSettlementDungeon");
const LevelEventSetupSeqCamera_1 = require("./LevelEventSetupSeqCamera");
const LevelEventSetWuYinQuState_1 = require("./LevelEventSetWuYinQuState");
const LevelEventShowPlotPhoto_1 = require("./LevelEventShowPlotPhoto");
const LevelEventShowTargetRange_1 = require("./LevelEventShowTargetRange");
const LevelEventSpawnEffect_1 = require("./LevelEventSpawnEffect");
const LevelEventSpawnEffectV2_1 = require("./LevelEventSpawnEffectV2");
const LevelEventSpawnTraceEffect_1 = require("./LevelEventSpawnTraceEffect");
const LevelEventSportsState_1 = require("./LevelEventSportsState");
const LevelEventStartRailSlide_1 = require("./LevelEventStartRailSlide");
const LevelEventsToggleScanSplineEffect_1 = require("./LevelEventsToggleScanSplineEffect");
const LevelEventStopSceneItemMove_1 = require("./LevelEventStopSceneItemMove");
const LevelEventStopUiScreenEffect_1 = require("./LevelEventStopUiScreenEffect");
const LevelEventSubmitQuestBehavior_1 = require("./LevelEventSubmitQuestBehavior");
const LevelEventSwitchDataLayers_1 = require("./LevelEventSwitchDataLayers");
const LevelEventSwitchSubLevels_1 = require("./LevelEventSwitchSubLevels");
const LevelEventSystemFunction_1 = require("./LevelEventSystemFunction");
const LevelEventTeleportDungeon_1 = require("./LevelEventTeleportDungeon");
const LevelEventTimeTrackControl_1 = require("./LevelEventTimeTrackControl");
const LevelEventToggleAirWall_1 = require("./LevelEventToggleAirWall");
const LevelEventToggleMapMarkState_1 = require("./LevelEventToggleMapMarkState");
const LevelEventTrapDefenseChangeMiniMap_1 = require("./LevelEventTrapDefenseChangeMiniMap");
const LevelEventTrapDefensePlayerOperationConstraint_1 = require("./LevelEventTrapDefensePlayerOperationConstraint");
const LevelEventTriggerCameraShake_1 = require("./LevelEventTriggerCameraShake");
const LevelEventTriggerSpecificScanEffect_1 = require("./LevelEventTriggerSpecificScanEffect");
const LevelEventUnlockDungeonEntry_1 = require("./LevelEventUnlockDungeonEntry");
const LevelEventUnlockEntity_1 = require("./LevelEventUnlockEntity");
const LevelEventUsePhantomSkill_1 = require("./LevelEventUsePhantomSkill");
const LevelEventVehicleMoveWithPathLine_1 = require("./LevelEventVehicleMoveWithPathLine");
const LevelEventVehiclePlayPassengerVoice_1 = require("./LevelEventVehiclePlayPassengerVoice");
const LevelEventVehicleSprint_1 = require("./LevelEventVehicleSprint");
const LevelEventVehicleWaterfallMove_1 = require("./LevelEventVehicleWaterfallMove");
const LevelEventWaitSceneRefEntityPlaySequence_1 = require("./LevelEventWaitSceneRefEntityPlaySequence");
const LevelEventWaitTime_1 = require("./LevelEventWaitTime");
const DEFAULT = 1;
const LEVEL_1 = 4;
const LEVEL_2 = 8;
const LEVEL_MAX = 1024;
class LevelEventCenter {
  static AU() {
    this.FLe = new Map();
    this.VLe = new Array();
    this.HLe = new Map();
    this.jLe = new Set();
    this.WLe = new Map();
    this.KLe = new Map();
  }
  static RegistEvents() {
    this.AU();
    var e = LevelEventCenter.QLe;
    e("PlayerLookAt", LevelEventPlayerLoockAt_1.LevelEventPlayerLoockAt);
    e("CameraLookAt", LevelEventCameraLookAtPosition_1.LevelEventCameraLookAtPosition, LEVEL_1);
    e("StopCameraLookAt", LevelEventRestoreCameraLookAtPosition_1.LevelEventRestoreCameraLookAtPosition);
    e(LevelGameplayActionsDefine_1.ActionCaptureRequest.name, LevelEventCaptureRequest_1.LevelEventCaptureRequest, LEVEL_2);
    e(LevelGameplayActionsDefine_1.ActionExecution.name, LevelEventExecution_1.LevelEventExecution, LEVEL_2);
    e(LevelGameplayActionsDefine_1.ActionSendGameplayEvent.name, LevelEventSendGameplayEventToPlayer_1.LevelEventSendGameplayEventToPlayer);
    e(LevelGameplayActionsDefine_1.ActionSubmitQuestBehavior.name, LevelEventSubmitQuestBehavior_1.LevelEventSubmitQuestBehavior);
    e(LevelGameplayActionsDefine_1.ActionDeliverQuestBehavior.name, LevelEventDeliverQuestBehavior_1.LevelEventDeliverQuestBehavior);
    e("Log", LevelEventLog_1.LevelEventLog);
    e("Wait", LevelEventWaitTime_1.LevelEventWaitTime, LEVEL_2, true);
    e("LeisureInteract", LevelEventLeisureInteract_1.LevelEventLeisureInteract, LEVEL_1);
    e("Prompt", LevelEventPrompt_1.LevelEventPrompt);
    e("GuideTrigger", LevelEventGuideTrigger_1.LevelEventGuideTrigger, LEVEL_2, true);
    e("CompleteGuide", LevelEventCompleteGuide_1.LevelEventCompleteGuide, LEVEL_1);
    e("OpenSystemBoard", LevelEventOpenSystem_1.LevelEventOpenSystem, LEVEL_1);
    e("AddBuffToEntity", LevelEventAddBuffToEntity_1.LevelEventAddBuffToEntity, LEVEL_1);
    e("AddBuffToPlayer", LevelEventAddBuffToPlayer_1.LevelEventAddBuffToPlayer);
    e("RemoveBuffFromEntity", LevelEventRemoveBuffFromCreature_1.LevelEventRemoveBuffFromCreature, LEVEL_1);
    e("SetForceLock", LevelEventForceLockOnSpecialTagTarget_1.LevelEventForceLockOnSpecialTagTarget);
    e("SetWuYinQuState", LevelEventSetWuYinQuState_1.LevelEventSetWuYinQuState);
    e("SetPlayerMoveControl", LevelEventSetPlayerMoveControl_1.LevelEventSetPlayerMoveControl);
    e("PlayEffect", LevelEventSpawnEffect_1.LevelEventSpawnEffect);
    e("PlayEffect2", LevelEventSpawnEffectV2_1.LevelEventSpawnEffectV2);
    e("ClaimLevelPlayReward", LevelEventClaimLevelPlayReward_1.LevelEventClaimLevelPlayReward);
    e("PromptQuestChapterUI", LevelEventOpenChapterUi_1.LevelEventOpenChapterUi);
    e("InterludeActions", LevelEventInterludeActions_1.LevelEventInterludeActions, LEVEL_1);
    e("AddBuffToTriggeredEntity", LevelEventAddBuffToTriggeredEntity_1.LevelEventAddBuffToTriggeredEntity);
    e("SetTime", LevelEventAdjustTodTime_1.LevelEventAdjustTodTime, LEVEL_1);
    e("SetBattleState", LevelEventSetBattleState_1.LevelEventSetBattleState, LEVEL_1);
    e("WaitBattleCondition", LevelEventCheckBattleState_1.LevelEventCheckBattleState, LEVEL_2);
    e("EnableHostility", LevelEventEnableHostility_1.LevelEventEnableHostility, LEVEL_2);
    e("RunActions", LevelEventRunAction_1.LevelEventRunAction, LEVEL_1);
    e("EntityLookAt", LevelEventEntityLookAt_1.LevelEventEntityLookAt, LEVEL_1);
    e("CommonTip", LevelEventPrompt_1.LevelEventPrompt);
    e("EndCommonTip", LevelEventEndPrompt_1.LevelEventEndPrompt);
    e("ClaimDungeonReward", LevelEventClaimDungeonReward_1.LevelEventClaimDungeonReward);
    e("TraceSpline", LevelEventSpawnTraceEffect_1.LevelEventSpawnTraceEffect);
    e("ToggleScanSplineEffect", LevelEventsToggleScanSplineEffect_1.LevelEventToggleScanSplineEffect);
    e("PostAkEvent", LevelEventPostAkEvent_1.LevelEventPostAkEvent);
    e("MoveSceneItem", LevelEventSceneItemMove_1.LevelEventSceneItemMove, LEVEL_1, true);
    e("StopSceneItemMove", LevelEventStopSceneItemMove_1.LevelEventStopSceneItemMove);
    e("SendAiEvent", LevelEventSendAiEvent_1.LevelEventSendAiEvent);
    e("UnlockDungeonEntry", LevelEventUnlockDungeonEntry_1.LevelEventUnlockDungeonEntry);
    e("TeleportDungeon", LevelEventTeleportDungeon_1.LevelEventTeleportDungeon, DEFAULT);
    e("LimitPlayerOperation", LevelEventAddInputTag_1.LevelEventAddInputTag);
    e("UnLimitPlayerOperation", LevelEventRefreshInputTag_1.LevelEventRefreshInputTag);
    e("FadeInScreen", LevelEventFadeInScreen_1.LevelEventFadeInScreen, LEVEL_1);
    e("FadeOutScreen", LevelEventFadeOutScreen_1.LevelEventFadeOutScreen, LEVEL_1);
    e("ChangePhantom", LevelEventChangeToVision_1.LevelEventChangeToVision);
    e("RestorePhantom", LevelEventRestoreFromVision_1.LevelEventRestoreFromVision);
    e("TakePlotPhoto", LevelEventShowPlotPhoto_1.LevelEventShowPlotPhoto, DEFAULT);
    e("OpenSimpleGameplay", LevelEventOpenSimpleGameplay_1.LevelEventOpenSimpleGameplay);
    e("SwitchSubLevels", LevelEventSwitchSubLevels_1.LevelEventSwitchLevels, LEVEL_1);
    e("ClientPreEnableSubLevels", LevelEventSetSubLevelsVisible_1.LevelEventSetSubLevelsVisible, LEVEL_1);
    e("AdjustPlayerCamera", LevelEventAdjustPlayerCamera_1.LevelEventAdjustPlayerCamera, LEVEL_1);
    e("RestorePlayerCameraAdjustment", LevelEventRestorePlayerCameraAdjustment_1.LevelEventRestorePlayerCameraAdjustment);
    e("ResetPlayerCameraFocus", LevelEventResetPlayerCameraFocus_1.LevelEventResetPlayerCameraFocus);
    e("UsePhantomSkill", LevelEventUsePhantomSkill_1.LevelEventUsePhantomSkill);
    e("EnterOrbitalCamera", LevelEventEnterOrbitalCamera_1.LevelEventEnterOrbitalCamera);
    e("ExitOrbitalCamera", LevelEventExitOrbitalCamera_1.LevelEventExitOrbitalCamera);
    e("EnableSplineMoveModel", LevelEventEnableSplineMoveModel_1.LevelEventEnableSplineMoveModel);
    e("SetSportsState", LevelEventSportsState_1.LevelEventSportsState);
    e("EnableActor", LevelEventSetActorVisible_1.LevelEventSetActorVisible);
    e("PlayLevelSequence", LevelEventPlayLevelSequence_1.LevelEventPlayLevelSequence);
    e("ModifyActorMaterial", LevelEventModifyActorMaterial_1.LevelEventModifyActorMaterial);
    e("EnableAI", LevelEventEnableAi_1.LevelEventEnableAi);
    e("SetExploreState", LevelEventSetExploreState_1.LevelEventSetExploreState);
    e("ToggleAirWall", LevelEventToggleAirWall_1.LevelEventToggleAirWall);
    e("TriggerCameraShake", LevelEventTriggerCameraShake_1.LevelEventTriggerCameraShake);
    e("HideTargetRange", LevelEventHideTargetRange_1.LevelEventHideTargetRange, LEVEL_1);
    e("ShowTargetRange", LevelEventShowTargetRange_1.LevelEventShowTargetRange, LEVEL_1);
    e("ExitDungeon", LevelEventExitDungeon_1.LevelEventExitDungeon, LEVEL_1);
    e("ToggleMapMarkState", LevelEventToggleMapMarkState_1.LevelEventToggleMapMarkState, LEVEL_1);
    e("FocusOnMapMark", LevelEventFocusOnMapMark_1.LevelEventFocusOnMapMark, LEVEL_1);
    e("SettlementDungeon", LevelEventSettlementDungeon_1.LevelEventSettlementDungeon, LEVEL_1);
    e("AddTrialCharacter", LevelEventAddTrialCharacter_1.LevelEventAddTrialCharacter, LEVEL_1);
    e("SetPlayerOperationRestriction", LevelEventSetPlayerOperation_1.LevelEventSetPlayerOperation);
    e("ChangePhantomFormation", LevelEventChangePhantomFormation_1.LevelEventChangePhantomFormation, LEVEL_1);
    e("RestorePhantomFormation", LevelEventRestorePhantomFormation_1.LevelEventRestorePhantomFormation, LEVEL_1);
    e("ChangeEntityPrefabPerformance", LevelEventChangeEntityPerformanceState_1.LevelEventChangeEntityPerformanceState);
    e("SetJigsawItem", LevelEventMoveJigsawItem_1.LevelEventMoveJigsawItem);
    e("PlayRegisteredMontage", LevelEventPlayRegisteredMontage_1.LevelEventPlayRegisteredMontage, LEVEL_2, true);
    e("ToggleHighlightExploreUi", LevelEventHighlightExploreUi_1.LevelEventHighlightExploreUi);
    e("SetRegionConfig", LevelEventSetRegionConfig_1.LevelEventSetRegionConfig, LEVEL_1, true);
    e("Collect", LevelEventCollect_1.LevelEventCollect);
    e("PlayDynamicSettlement", LevelEventPlayDynamicSettlement_1.LevelEventPlayDynamicSettlement, LEVEL_1);
    e("SetInteractionLockState", LevelEventSetInteractionLockState_1.LevelEventSetInteractionLockState);
    e("SetTeleControl", LevelEventSetTeleControl_1.LevelEventSetTeleControl);
    e("OpenQte", LevelEventOpenQte_1.LevelEventOpenQte);
    e("Preload", LevelEventPreload_1.LevelEventPreload);
    e("RogueReceiveReward", LevelEventRogueReceiveReward_1.LevelEventRogueReceiveReward);
    e("SetEntityClientVisibleSave", LevelEventSetClientEntityVisibleSave_1.LevelEventSetClientEntityVisibleSave);
    e("EntityTurnTo", LevelEventEntityTurnTo_1.LevelEventEntityTurnTo, LEVEL_2);
    e("GuestOperateUiAnimation", LevelEventPlayGuestAnimation_1.LevelEventGuestAnimation);
    e("TriggerSpecificScanEffect", LevelEventTriggerSpecificScanEffect_1.LevelEventTriggerSpecificScanEffect);
    e("ExecClientBattleAction", LevelEventExecClientBattleAction_1.LevelEventExecClientBattleAction);
    e("OpenSystemFunction", LevelEventSystemFunction_1.LevelEventSystemFunction);
    e("StopUiScreenEffect", LevelEventStopUiScreenEffect_1.LevelEventStopUiScreenEffect, LEVEL_1);
    e("EnableKey4Func", LevelEventEnableKey4Func_1.LevelEventEnableKey4Func);
    e("SetEntityClientVisible", LevelEventSetClientEntityVisible_1.LevelEventSetClientEntityVisible);
    e("ClientSetPlayerPos", LevelEventClientSetPlayerPos_1.LevelEventClientSetPlayerPos);
    e("LockEntity", LevelEventLockEntity_1.LevelEventLockEntity, LEVEL_1);
    e("UnlockEntity", LevelEventUnlockEntity_1.LevelEventUnlockEntity);
    e("DestroySelf", LevelEventDestroySelf_1.LevelEventDestroySelf);
    e("PlayerInput", LevelEventFakePlayerInput_1.LevelEventFakePlayerInput);
    e("SlideRailStart", LevelEventStartRailSlide_1.LevelEventStartRailSlide);
    e("ClientChangeTeamPosition", LevelEventClientChangeTeamPosition_1.LevelEventClientChangeTeamPosition, LEVEL_1);
    e("OverrideAiBehaviorTree", LevelEventSetAiBehaviorTree_1.LevelEventSetAiBehaviorTree);
    e("RestoreAiBehaviorTree", LevelEventResetAiBehaviorTree_1.LevelEventResetAiBehaviorTree);
    e("EnableEntityLookAt", LevelEventEnableEntityLookAt_1.LevelEventEnableEntityLookAt);
    e("DisableEntityLookAt", LevelEventDisableEntityLookAt_1.LevelEventDisableEntityLookAt);
    e("PlayWalkingOverlayMontage", LevelEventPlayWalkingOverlayMontage_1.LevelEventPlayWalkingOverlayMontage);
    e("CloseWalkingOverlayMontage", LevelEventCloseWalkingOverlayMontage_1.LevelEventCloseWalkingOverlayMontage);
    e("ChangeEntityState", LevelEventChangeEntityState_1.LevelEventChangeEntityState);
    e("ChangeSelfEntityState", LevelEventChangeSelfEntityState_1.LevelEventChangeSelfEntityState);
    e("ChangeNpcPerformState", LevelEventChangeNpcPerformState_1.LevelEventChangeNpcPerformState);
    e("SwitchDataLayers", LevelEventSwitchDataLayers_1.LevelEventSwitchDataLayers);
    e("WaitUntilLevelSequenceReachMark", LevelEventWaitSceneRefEntityPlaySequence_1.LevelEventWaitSceneRefEntityPlaySequence, LEVEL_1);
    e(LevelGameplayActionsDefine_1.ActionSetNpcPosition.name, LevelEventSetNpcPosition_1.LevelEventSetNpcPosition);
    e(LevelGameplayActionsDefine_1.ActionPlotInterludeAction.name, LevelEventPlotInterludeAction_1.LevelEventPlotInterludeAction, LEVEL_1);
    e(LevelGameplayActionsDefine_1.ActionSetSeqCameraTransform.name, LevelEventSetupSeqCamera_1.LevelEventSetupSeqCamera);
    e(LevelGameplayActionsDefine_1.ActionEnterSequenceCamera.name, LevelEventEnterSequenceCamera_1.LevelEventEnterSequenceCamera);
    e(LevelGameplayActionsDefine_1.ActionPickupDropItem.name, LevelEventPickupDropItem_1.LevelEventPickupDropItem, LEVEL_1, true);
    e(LevelGameplayActionsDefine_1.ActionTimeTrackControl.name, LevelEventTimeTrackControl_1.LevelEventTimeTrackControl, LEVEL_1);
    e(LevelGameplayActionsDefine_1.ActionInteractFan.name, LevelEventInteractFan_1.LevelEventInteractFan);
    e(LevelGameplayActionsDefine_1.ActionInteractGravityFlip.name, LevelEventInteractGravityFlip_1.LevelEventInteractGravityFlip);
    e("PlayMontage", LevelEventPlayMontage_1.LevelEventPlayMontage, LEVEL_1);
    e("PlayBubble", LevelEventPlayBubble_1.LevelEventPlayBubble, LEVEL_2);
    e("MoveWithSpline", LevelEventMoveWithSpline_1.LevelEventMoveWithSpline, LEVEL_1);
    e("CharacterMoveToPoint", LevelEventCharacterMove_1.LevelEventCharacterMove, LEVEL_1);
    e("VehicleEnterNpc", LevelEventEnterVehicleNpc_1.LevelEventEnterVehicleNpc);
    e("VehicleWaterfallClimbing", LevelEventVehicleWaterfallMove_1.LevelEventVehicleWaterfallMove, LEVEL_1);
    e("VehiclePlayPassengerVoice", LevelEventVehiclePlayPassengerVoice_1.LevelEventVehiclePlayPassengerVoice);
    e("VehicleMoveWithPathLine", LevelEventVehicleMoveWithPathLine_1.LevelEventVehicleMoveWithPathLine);
    e("VehicleSprint", LevelEventVehicleSprint_1.LevelEventVehicleSprint);
    if (Info_1.Info.IsPlayInEditor) {
      e("SetActorVar", LevelEventSetDemoActorVar_1.LevelEventSetDemoActorVar);
      e("RunActorCustomEvent", LevelEventRunDemoActorCustomEvent_1.LevelEventRunDemoActorCustomEvent);
    }
    e("BvbPlayDialog", LevelEventBvbPlayDialog_1.LevelEventBvbPlayDialog, LEVEL_1);
    e("BvbPlayerOperationConstraint", LevelEventBvbPlayerOperationConstraint_1.LevelEventBvbPlayerOperationConstraint, LEVEL_1);
    e("TrapDefensePlayerOperationConstraint", LevelEventTrapDefensePlayerOperationConstraint_1.LevelEventTrapDefensePlayerOperationConstraint, LEVEL_1);
    e("CommonTip2", LevelEventCommonTip2_1.LevelEventCommonTip2, LEVEL_1);
    e("SetTimeScale", LevelEventSetTimeScale_1.LevelEventSetTimeScale);
    e("ReignsSetPropertyVisible", LevelEventReignsSetPropertyVisible_1.LevelEventReignsSetPropertyVisible);
    e("TrapDefenseChangeMiniMap", LevelEventTrapDefenseChangeMiniMap_1.LevelEventTrapDefenseChangeMiniMap);
    e("SetSkillButtonEffect", LevelEventSetSkillButtonEffect_1.LevelEventSetSkillButtonEffect);
    e("SetNpcGroupPerform", LevelEventSetNpcGroupPerform_1.LevelEventSetNpcGroupPerform);
    e("RemoveNpcGroupPerform", LevelEventRemoveNpcGroupPerform_1.LevelEventRemoveNpcGroupPerform);
  }
  static GetEvent(t) {
    var n = this.HLe.get(t);
    if (n) {
      if (n.length > 0) {
        if (this.jLe.has(t)) {
          (e = n.pop()).Reset();
          return e;
        } else {
          return n[0];
        }
      }
      if (this.WLe.has(t)) {
        var e;
        var v = this.WLe.get(t);
        for (let e = 0; e < LEVEL_1; e++) {
          var l = new v(e);
          l.Type = t;
          n.push(l);
        }
        if (GlobalData_1.GlobalData.IsPlayInEditor && (e = this.KLe.get(t) + LEVEL_1, this.KLe.set(t, e), e > LEVEL_MAX) && Log_1.Log.CheckError()) {
          Log_1.Log.Error("Level", 7, "动态扩容超上限，请检查", ["Type", t], ["Capacity", e]);
        }
        return n.pop();
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Level", 7, "事件组容量不足，建议扩容，请检查！！！", ["Type", t]);
      }
    }
  }
  static XLe(e) {
    var t;
    if (this.jLe.has(e.Type) && (t = this.HLe.get(e.Type)) && !t.includes(e)) {
      t.push(e);
    }
  }
  static AddToTickList(e, t) {
    var n = t.GroupId;
    if (e) {
      let e = this.FLe.get(n);
      if (!e) {
        e = new Array();
        this.FLe.set(n, e);
      }
      if (!e.includes(t)) {
        e.push(t);
      }
    } else if (!this.VLe.includes(t)) {
      this.VLe.push(t);
    }
  }
  static RemoveEventGroup(e) {
    e = this.FLe.get(e);
    if (e) {
      for (const t of e) {
        t.Release();
      }
    }
  }
  static Tick(t) {
    if (this.VLe !== undefined && this.FLe !== undefined) {
      while (this.VLe.length > 0) {
        var e;
        var n = this.VLe.pop();
        var v = this.FLe.get(n.GroupId);
        if (v && ((e = v.indexOf(n)) !== -1 && v.splice(e, 1), v.length === 0)) {
          this.FLe.delete(n.GroupId);
        }
        n.Reset();
        this.XLe(n);
      }
      for (const i of this.FLe.values()) {
        var l = i.length;
        for (let e = 0; e < l; e++) {
          var r = i[e];
          if (r.Tick(t)) {
            r.Finish();
          }
        }
      }
    }
  }
  static IsNeedTick(e) {
    return this.jLe.has(e);
  }
  static HasAction(e) {
    return this.HLe.has(e);
  }
}
(exports.LevelEventCenter = LevelEventCenter).HLe = undefined;
LevelEventCenter.FLe = undefined;
LevelEventCenter.VLe = undefined;
LevelEventCenter.jLe = undefined;
LevelEventCenter.WLe = undefined;
LevelEventCenter.KLe = undefined;
LevelEventCenter.QLe = (n, v, l = DEFAULT, e = false) => {
  if (!LevelEventCenter.HLe.has(n)) {
    let t = undefined;
    if (e) {
      t = new Array();
      for (let e = 0; e < l; e++) {
        var r = new v(e);
        r.Type = n;
        t.push(r);
      }
    } else {
      t = new Array(l);
      for (let e = 0; e < l; e++) {
        var i = new v(e);
        i.Type = n;
        t[e] = i;
      }
    }
    LevelEventCenter.HLe.set(n, t);
    if (l > 1 && (LevelEventCenter.jLe.add(n), LevelEventCenter.KLe.set(n, l), e)) {
      LevelEventCenter.WLe.set(n, v);
    }
  }
}; //# sourceMappingURL=LevelEventCenter.js.map