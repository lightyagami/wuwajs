"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AwakeEntity = exports.AudioState = exports.AppointedVehicle = exports.AirPassageMove = exports.AdjustTodTime = exports.AdjustPlayerCamera = exports.AdjustHorizontalCamera = exports.AdjustFixedCamera = exports.AdjustFirstPersonCamera = exports.AdjustDialogCamera = exports.AdjustBasicCamera = exports.AdjustAxisLockCamera = exports.AddTrialFollowShooter = exports.AddTrialCharacter = exports.AddTime = exports.AddPlayBubble = exports.AddOrSubAlertValueChangeSpeed = exports.AddOrSubAlertValue = exports.AddGuestCharacter = exports.AddFlowInteractOption = exports.AddBuffToTriggeredEntity = exports.AddBuffToPlayer = exports.AddBuffToFollowShooter = exports.AddBuffToEntity = exports.ActorTurnToTalkerData = exports.ActorTurnToPositionData = exports.ActorTurnToPlayerData = exports.ActorTurnToEntityData = exports.ActorTurnToEmptyData = exports.ActorTurnTo = exports.ActorLookAtUnLock = exports.ActorLookAtTalkerData = exports.ActorLookAtPositionData = exports.ActorLookAtPlayerData = exports.ActorLookAtOtherActor = exports.ActorLookAtEntityData = exports.ActorLookAtEmptyData = exports.ActorLookAtData = exports.ActorLookAt = exports.ActorInitialState = exports.ActorInitialMontage = exports.ActiveRange = exports.ActiveAntiGravitySafePoint = exports.ActivateResetPoint = exports.ActionMontage = exports.ActionInfo = exports.AcceptFishingEntrust = exports.AcceptCurrentQuest = exports.AccelerateSkiConfig = exports.AbsolutePos2 = undefined;
exports.ChangeTargetEntityPrefabPerformance = exports.ChangeState = exports.ChangeSelfEntityState = exports.ChangeSelfEntityPrefabPerformance = exports.ChangeRandomState = exports.ChangePhantomFormation = exports.ChangePhantom = exports.ChangeOtherState = exports.ChangeNpcPerformState = exports.ChangeLiftTarget = exports.ChangeInteractOptionText = exports.ChangeFlowTemplate = exports.ChangeFightTeam = exports.ChangeEntityStateLoop = exports.ChangeEntityStateDirectly = exports.ChangeEntityStateBatchDirectly = exports.ChangeEntityState = exports.ChangeEntityPrefabPerformance = exports.ChangeEntityCamp = exports.ChangeBehaviorState = exports.ChangeActorTalker = exports.ChangeActorState = exports.ChangeActorMaterialData = exports.ChangeActorMPC = exports.CatapultParam = exports.Catapult = exports.CaptionParam = exports.CameraTransition = exports.CameraSetting = exports.CameraPosAndRot = exports.CameraLookAt = exports.CameraGaze = exports.CameraDepthOfField = exports.CameraData = exports.CallFunction = exports.CallByCondition = exports.CalculateVar = exports.BvbSendSystemEvent = exports.BubbleIndex = exports.BubbleData = exports.BrokenRock = exports.Bounce = exports.BlendFunction = exports.BlackCatWarning = exports.BeginFlowTemplate = exports.BattleSettlement = exports.BaseCurve = exports.BadBuKingChallengeTip = exports.AxisLockScreenConfig = exports.AwakeWithTransformVar = undefined;
exports.CreatePrefab = exports.ControlTrackingSelf = exports.ControlTrackingOther = exports.ConstantCameraShake = exports.Conditions = exports.Condition = exports.CompleteGuide = exports.CompleteChildQuest = exports.CommonTipTriggerDelegation = exports.CommonTipReachChallenge = exports.CommonTipPrepareCountdown = exports.CommonTipMissionComplete = exports.CommonTipId = exports.CommonTipGeneralFloatingTip = exports.CommonTipFirstComplete = exports.CommonTipEnterInRange = exports.CommonTipChallengeSuccess = exports.CommonTipChallengeFail = exports.CommonTipChallengeCondition = exports.CommonTip2PrepareCountdown = exports.CommonTip2 = exports.CommonTip = exports.ColorPiece = exports.Collect = exports.CloseTraceSpline = exports.CloseSplineMove = exports.CloseSkiConfig = exports.CloseGlobalTimeScale = exports.CloseFlowTemplate = exports.CloseAirWall = exports.ClientTpRelativeEntityPos = exports.ClientSetPlayerPos = exports.ClientPreEnableSubLevels = exports.ClearPlayBubble = exports.ClearFishingCabinInSaleItems = exports.ClearEntityVisibleTag = exports.ClaimLevelPlayReward = exports.ClaimDungeonReward = exports.CipherGameplay = exports.CheckClimb = exports.CharacterMoveToPoint = exports.CharacterLookAtUnlockData = exports.CharacterLookAtPositionData = exports.CharacterLookAtPlayerData = exports.CharacterLookAtEntityData = exports.CharacterLookAtEmptyData = exports.CharacterLookAt = exports.CharacterGroupNew = exports.ChangeTimer = exports.ChangeTeamPosition = undefined;
exports.EnableLevelPlay = exports.EnableHostility = exports.EnableFunction = exports.EnableCameraOperation = exports.EnableAoiNotify = exports.EnableAllPlayerOperation = exports.EnableAlertUi = exports.EnableAlertArea = exports.EnableActor = exports.EnableAI = exports.EffectPlayerPos2 = exports.EffectEntityPos2 = exports.EaseData = exports.DurationInteract = exports.DreamlessWarning = exports.DoCalculate = exports.DisableUiOperation = exports.DisableSkillOperation = exports.DisableSectionalSkillOperation = exports.DisableSceneInteractionOperation = exports.DisableMoveOperation = exports.DisableModulePlayerOperation = exports.DisableMapMark = exports.DisableExploreSkill = exports.DisableCameraOperation = exports.DisableAllPlayerOperation = exports.DisableAlertAreaQuestCondition = exports.DisableAlertAreaDungeonCondition = exports.DetectTrigger = exports.DetectBattleTag = exports.DetectBattleMonsterOnGround = exports.DestroySelf = exports.DestroyQuestItem = exports.DestroyQuest = exports.DestroyPrefab = exports.DestroyFishingBoat = exports.DestroyEntity = exports.DestroyAllChild = exports.Destroy = exports.DelayRemoveAfterSkillFinish = exports.DaolingAuthentication = exports.DangoAbyssReceiveReward = exports.DangoAbyssGotoNextFloor = exports.DangoAbyssCreateRewardTreasureBox = exports.DangoAbyssActivatePortal = exports.CycleMoveToPoints = exports.CustomJson = exports.CustomAlertValueChangeSpeed = exports.CustomAlertValue = exports.CurrentVehicle = undefined;
exports.FixTeleControllerPos = exports.FixShowTargetRange = exports.FixFoundationRelation = exports.FishingRoulette = exports.FishingBoatVehicle = exports.FireBulletTrackTarget = exports.FireBulletTrackPosition = exports.FireBulletForwardFront = exports.FireBulletEffect = exports.FireBullet = exports.FinishTalk = exports.FinishState = exports.FinishDungeon = exports.FinishDoInteract = exports.FinishCondition = exports.FailurePoseInteract = exports.FadeOutScreen = exports.FadeInScreen = exports.FaceToPos = exports.ExitVehicleTeleport = exports.ExitVehicleStandUp = exports.ExitVehicleLaunch = exports.ExitOrbitalCamera = exports.ExitDungeon = exports.ExecRiskHarvestEffect = exports.ExecResurrection = exports.ExecBattleAction = exports.ExecAlertSystemAction = exports.EntityVarContext = exports.EntityTurnTo = exports.EntityTemplateContext = exports.EntitySplineMoveTarget = exports.EntityPos2 = exports.EntityLookAt = exports.EnterOrbitalCameraControlByMove = exports.EnterOrbitalCamera = exports.EnterNpcVehicle = exports.EndState = exports.EndFlowTemplate = exports.EnableUiOperation = exports.EnableTemporaryTeleport = exports.EnableSystem = exports.EnableSubLevelTransitionWithSceneCapture = exports.EnableSplineMoveModel = exports.EnableSkillOperation = exports.EnableSectionalUi = exports.EnableSceneInteractionOperation = exports.EnableNearbyTracking = exports.EnableMoveOperation = exports.EnableLevelPlayConfig = undefined;
exports.JigsawConfig = exports.ItemGetUiConfigSpecialQuest = exports.ItemFoundationMatch = exports.ItemData = exports.Invoke = exports.InterludeActions = exports.InteractOption = exports.InteractFlow = exports.InteractActions = exports.Interact = exports.ICenterTextTypeWriter = exports.ICenterTextShowAll = exports.ICenterTextFadeOut = exports.HookLockInteract = exports.HideWorldMonsterAndMonsterTreasureGroup = exports.HideWorldMonsterAndMonsterTreasure = exports.HideWorldEntityAndLevelPlayGroup = exports.HideWorldEntityAndLevelPlay = exports.HideTargetRange = exports.HideSpecifyEntityGroup = exports.HideSpecificEntities = exports.HideMapMark = exports.HideHighlightExploreSkillIcon = exports.HideGroup = exports.HideByRangeInFlow = exports.HeadStyleWeakSignal = exports.HeadStyleWarning = exports.HeadStyleVoiceOnly = exports.HeadStyleNormal = exports.HeadStyleMonsterDisplay = exports.GuideTrigger = exports.GuestOperateUiAnimation = exports.GravityFlipFixedPos = exports.Glide = exports.GetUp = exports.GetRewardByInteract = exports.GetItem = exports.GameplayPose3Interact = exports.GameplayPose2Interact = exports.GameplayPose1Interact = exports.ForceOccupations = exports.FocusOnMapMark = exports.FlowTemplateMode = exports.FlowInfo = exports.FlowIndex = exports.FlowActorUnit = exports.FlowActorIndexData = exports.FloorSettings = exports.FixedTime = exports.FixedPos = undefined;
exports.NpcFollowConfig = exports.NotifyMonsterPlayStandbyTags = exports.NotifyMonsterPerception = exports.NewMoveWithSpline = exports.NearestEntity = exports.Mp4BackgroundColor = exports.MowingTowerGotoNextFloor = exports.MovieBackgroundFadeData = exports.MoveWithSpline = exports.MoveToRelativePosition = exports.MoveToPosA = exports.MoveToPoint = exports.MoveSceneItem = exports.MoveJigsawItem = exports.MorseCode = exports.MontageRegistered = exports.MontageParam = exports.MontageId = exports.MontageData = exports.MontageAsset = exports.ModifyTargetSceneItemAttributeTag = exports.ModifySelfSceneItemAttributeTag = exports.ModifySceneItemAttributeTag = exports.ModifyAlertValue = exports.ModifyActorMaterial = exports.MinAlertValue = exports.MaxAlertValue = exports.MaskTransition = exports.ManualOccupations = exports.Manipulate = exports.Log = exports.LockEntity = exports.LinearOverRangeCameraShake = exports.LimitPlayerUI = exports.LimitPlayerOperation = exports.LimitPlayerMoveNew = exports.LimitPlayerMove = exports.LimitPlayerMouse = exports.LimitPlayerCamera = exports.LimitPlayerBlockAll = exports.LimitPlayerAction = exports.LifePointMaxStepRewardRuleItem = exports.LifePointColorBoard = exports.LifePoint = exports.LevelPlayVarContext = exports.LeisureInteract = exports.KiteHookInteract = exports.JumpTalk = exports.JigsawPiece = exports.JigsawItemEntity = undefined;
exports.PlayerLookAt = exports.PlayerInput = exports.PlayerEntity = exports.PlayVoicePassengersConfig = exports.PlaySpineAnimation = exports.PlaySequenceData = exports.PlayRegisteredMontage = exports.PlayMovie = exports.PlayMontage = exports.PlayLevelSequence = exports.PlayGuestUiAnimation = exports.PlayGuestCartethyia = exports.PlayFlow = exports.PlayEffect = exports.PlayDynamicSettlement = exports.PlayCustomSequence = exports.PlayCommonEffect = exports.PlayBubble = exports.PieceIndex = exports.PhotographConfig = exports.PerformerRangeBoundaryActionTrigger = exports.PerformerAiSplineMove = exports.PerformerAiMoveToPosition = exports.PerformerAiMoveToPlayer = exports.PerformerAiMoveToEntity = exports.PerformerAiMoveTo = exports.PerceptionNotifyGatherToPlayer = exports.PerceptionNotifyGatherToEntity = exports.PathLineMove = exports.OptionLockTip = exports.OpenTraceSpline = exports.OpenSystemFunction = exports.OpenSystemBoardWithReturn = exports.OpenSystemBoard = exports.OpenSplineMove = exports.OpenSoaringChallengeResultWithReturn = exports.OpenSkiConfig = exports.OpenSimpleGameplay = exports.OpenQteAction = exports.OpenPanelQteQte = exports.OpenLevelQte = exports.OpenGravity = exports.OpenGlobalTimeScale = exports.OpenFishingItemDeliveryWithReturn = exports.OpenConfirmBoxWithReturn = exports.OpenAirWall = exports.NumberVar = exports.NpcSitDown = exports.NpcNewSplineMoveTarget = exports.NpcLeisureInteract = undefined;
exports.RestorePlayerCameraAdjustment = exports.RestorePhantomFormation = exports.RestorePhantom = exports.ResetTeleControlEntity = exports.ResetPlayerFocusToFixedDirection = exports.ResetPlayerFocusToDefaultDirection = exports.ResetPlayerCameraFocus = exports.ResetLevelPlay = exports.ResetFocusConfig = exports.ResetEntityPos = exports.ResetEntity = exports.RenjuChess = exports.RemoveTrialFollowShooter = exports.RemoveTrialCharacter = exports.RemovePreloadResourceTrialCharacter = exports.RemovePreloadResourcePhantomCharacter = exports.RemovePreloadResourceAction = exports.RemoveGuestCharacter = exports.RemoveFlowInteractOption = exports.RemoveBuffToTriggeredEntity = exports.RemoveBuffFromPlayer = exports.RemoveBuffFromEntity = exports.RemainStarWarning = exports.ReduceTime = exports.RecoverDurability = exports.RecordTimeStampType = exports.RecordTalkSequenceTransition = exports.RecordDungeonEvent = exports.RandomVar = exports.RandomPrefabConfig = exports.RacingTrackMove = exports.QuestVarContext = exports.PunishReport = exports.PromptQuestChapterUI = exports.Prompt = exports.PreloadTrialCharacterForSkill = exports.PreloadSubLevels = exports.PreloadPhantomCharacterForSkill = exports.PreloadFlows = exports.PreloadAction = exports.PrefabConfig = exports.PostAkEventTargeted = exports.PostAkEventGlobal = exports.PostAkEvent = exports.PosRot = exports.PosAndRot = exports.PosA = exports.PlayerSplineMoveTarget = exports.PlayerPos2 = exports.PlayerNewSplineMoveTarget = undefined;
exports.SetPlotMode = exports.SetPlayerPos = exports.SetPlayerOperationRestriction = exports.SetPlayerMoveControl = exports.SetPieceState = exports.SetNumberVar = exports.SetMoveSpeed = exports.SetMonsterMoveTarget = exports.SetJigsawItem = exports.SetJigsawFoundation = exports.SetInteractionLockState = exports.SetHeadIconVisible = exports.SetGlobalTimeScale = exports.SetForceLock = exports.SetFlowTemplate = exports.SetExploreState = exports.SetEntityVisible = exports.SetEntityTag = exports.SetEntityPos = exports.SetEntityClientVisibleSave = exports.SetEntityClientVisible = exports.SetCameraMode = exports.SetCameraAnim = exports.SetBehaviorIsPaused = exports.SetBattleTags = exports.SetBattleTagConfig = exports.SetBattleTag = exports.SetBattleState = exports.SetAudioState = exports.SetAreaTimeUnLock = exports.SetAreaTimeState = exports.SetAreaTimeLock = exports.SetAreaState = exports.SetAlertUiVisible = exports.ServerSetPlayerPos = exports.ServerForceEnableLevelPlay = exports.SequenceFrameEvent = exports.SendNpcMail = exports.SendAiEvent = exports.SelfEntity = exports.SceneItemNewSplineMoveTarget = exports.SafePos = exports.RunActions = exports.RotatorEntity = exports.RogueSelectRoom = exports.RogueRoleSelectRoom = exports.RogueReceiveReward = exports.RoguePrefabConfig = exports.RogueGotoNextFloor = exports.RogueActivatePortal = undefined;
exports.StateInfo = exports.StartFlowTemplate = exports.StandControl2 = exports.StandControl = exports.SpawnEntity = exports.SpawnChild = exports.SoaringChallengeSettlement = exports.Soar = exports.SlideTrackMove = exports.SlideRailStart = exports.SlideConfig = exports.SlashTowerPrefabConfig = exports.SlashAndTowerTip = exports.SlashAndTowerGotoNextFloor = exports.SkillBlackboardVector = exports.SkiConfig = exports.SitOnGround = exports.SitDown = exports.SimpleMove = exports.SignalDevice2 = exports.SignalDevice = exports.SignalBreakGameplay = exports.ShowTargetRange = exports.ShowTalkOutline = exports.ShowTalkFrameEventPosition = exports.ShowTalkFrameEvent = exports.ShowTalk = exports.ShowSpecificEntities = exports.ShowMessage = exports.ShowMapMark = exports.ShowHighlightExploreSkillIcon = exports.ShowHidedGroup = exports.ShowCenterText = exports.SetupMoraleSystem = exports.SettlementDungeon = exports.SetWuYinQuState = exports.SetWeatherLockState = exports.SetWeather = exports.SetVar = exports.SetTimeScale = exports.SetTimeLockState = exports.SetTime = exports.SetTeleControl = exports.SetSportsState = exports.SetSpineAnimation = exports.SetReviveRegion = exports.SetResetPosition = exports.SetRegionMpc = exports.SetRegionConfig = exports.SetPosA = undefined;
exports.TeleportTransitionWithFadeInScreen = exports.TeleportTransitionWithEffect = exports.TeleportTransitionWithCharacterDisplay = exports.TeleportTransitionWithCenterText = exports.TeleportTransitionInSeamlessType = exports.TeleportTransitionInDigitalScreen = exports.TeleportToLatestResetPointDirectly = exports.TeleportToLatestResetPoint = exports.TeleportToAndEnterVehicle = exports.TeleportToAndEnterFishingBoat = exports.TeleportDungeonPos = exports.TeleportDungeonFunction = exports.TeleportDungeon = exports.TelePortAfterTimeOut = exports.TeleControlConfig = exports.TargetEntity = exports.TalkSequenceTransition = exports.TalkOptionRogueRandomEvent = exports.TalkOptionQteSucceedDelayExec = exports.TalkOptionQteSucceed = exports.TalkOptionQteFailedDelayExec = exports.TalkOptionQteFailed = exports.TalkOptionPreOption = exports.TalkOptionCondition = exports.TalkOption = exports.TalkItem = exports.TalkBackgroundSpineImage = exports.TalkBackgroundImageByMcGender = exports.TalkBackgroundImage = exports.TalkBackgroundIcon = exports.TalkBackgroundClean = exports.TakePlotPhoto = exports.SyncVarToActorState = exports.SwitchSubLevelsDirectly = exports.SwitchSubLevels = exports.SwitchPermission = exports.SwitchDataLayers = exports.SuperCatapult = exports.SundialPuzzleGameplay = exports.SummonVehicle = exports.SummonEntity = exports.StopSceneItemMove = exports.StopNewMoveWithSplineAtTargetPoint = exports.StopNewMoveWithSplineAtStartPoint = exports.StopNewMoveWithSplineAtEndPoint = exports.StopNewMoveWithSplineAtCurrentPos = exports.StopNewMoveWithSpline = exports.StopGuestUiAnimation = exports.StopGuestCartethyia = exports.StopCameraLookAt = undefined;
exports.UnionExitVehicleType = exports.UnionExecBattleOption = exports.UnionEnterOrbitalCameraOption = exports.UnionEnableSubLevelTransition = exports.UnionEffectPos2 = exports.UnionDynamicSettlementConfig = exports.UnionDungeonEventType = exports.UnionDisableAlertCondition = exports.UnionDetectBattleTagType = exports.UnionDetectBattleConditionType = exports.UnionDelayRemoveConfig = exports.UnionControlTrackingType = exports.UnionCommonTipOption = exports.UnionCommonTip2Option = exports.UnionClientTeleportConfig = exports.UnionCharacterLookAtData = exports.UnionChangeTimer = exports.UnionChangeEntityState = exports.UnionChangeEntityPrefabPerformance = exports.UnionCenterTextShowAnim = exports.UnionCameraShakeConfig = exports.UnionCameraOperation = exports.UnionBattleStatePerceptionBehavior = exports.UnionAwakePosOption = exports.UnionAlertValueChangeSpeed = exports.UnionAlertSystemOption = exports.UnionAdjustPlayerCameraOption = exports.UnionActorTurnToData = exports.UnionActorLookAtData = exports.UnionActionParams1 = exports.UnionActionParams0 = exports.UniformMotion = exports.UnLockDangoCollectSystemItem = exports.UnLockCookSystemItem = exports.UnLimitPlayerOperation = exports.TypeFunction = exports.TriggeredEntity = exports.TriggerCameraShake = exports.TriggerActions = exports.Transform = exports.TraceSpline = exports.TowerDungeonPrefabConfig = exports.ToggleTimerPauseState = exports.ToggleScanSplineEffect = exports.ToggleMapMarkState = exports.ToggleHighlightExploreUi = exports.ToggleAirWall = exports.TextStyle = exports.TeleportVehicle = exports.TeleportTransitionWithMp4 = undefined;
exports.UnionStopGuestUiAnimationType = exports.UnionStateOption = exports.UnionSportState = exports.UnionSplineMoveTarget = exports.UnionSplineMovePattern = exports.UnionSplineMoveModel = exports.UnionSkillOperation = exports.UnionSkiConfig = exports.UnionSetTimeScale = exports.UnionSetTeleControlConfig = exports.UnionSetSpineAnimation = exports.UnionSetPlayerOperationRestriction = exports.UnionSetJigsawItem = exports.UnionSetJigsawFoundation = exports.UnionSetGlobalTimeScale = exports.UnionSetAreaTimeType = exports.UnionSetAlertValueType = exports.UnionSceneInteractionOperation = exports.UnionRogueSelectRoom = exports.UnionResetPlayerFocusType = exports.UnionResetEntityConfig = exports.UnionRemovePreloadResourceConfig = exports.UnionPreloadObjectTypeConfig = exports.UnionPrefabConfig = exports.UnionPostAkEvent = exports.UnionPos2 = exports.UnionPlayGuestUiAnimationType = exports.UnionPerformerAiMoveToConfig = exports.UnionOpenSystemBoardWithReturn = exports.UnionOpenQteConfig = exports.UnionNpcLeisureInteractOp = exports.UnionNewSplineMoveTarget = exports.UnionMoveToPointType = exports.UnionMoveSceneItem = exports.UnionMoveOperation = exports.UnionMontageConfig = exports.UnionModifySceneItemAttributeTag = exports.UnionModifyActorMaterialType = exports.UnionLimitPlayOperation = exports.UnionLevelSequenceTransition = exports.UnionLeisureInteractOption = exports.UnionItemGetUiConfig = exports.UnionInteractOption = exports.UnionHighlightExploreSkillIcon = exports.UnionHideRangeConfig = exports.UnionHideGroupConfig = exports.UnionHeadStyle = exports.UnionGuestOperateUiAnimation = exports.UnionFireBullet = exports.UnionExploreState = undefined;
exports.VehicleNewSplineMoveTarget = exports.VehicleMoveWithPathLine = exports.VehicleExitPlayer = exports.VehicleExitPathMove = exports.VehicleExitNpc = exports.VehicleEntity = exports.VehicleEnteringPlayerTarget = exports.VehicleEnteringNpcTarget = exports.VehicleEnterPathMove = exports.VehicleEnter = exports.VehicleCruisingParams = exports.VariableMotion = exports.UsePhantomSkill = exports.UnlockTeleportTrigger = exports.UnlockSystemItem = exports.UnlockPlotPhotoAtlas = exports.UnlockPhotoMemoryCollectSystemItem = exports.UnlockNounAtlas = exports.UnlockGeographicalAtlas = exports.UnlockEntity = exports.UnlockDungeonEntry = exports.UnlockCookSystemCookBook = exports.UnlockAtlasSystemItem = exports.UnlockAchievementSystemItem = exports.UniversalTone = exports.UnionVehicleEnteringTarget = exports.UnionVehicleControlType = exports.UnionVarContext = exports.UnionVar = exports.UnionUnlockSystemOption = exports.UnionUnlockCookSystemOption = exports.UnionUnlockAtlasSystemOption = exports.UnionUiOperation = exports.UnionUiGame = exports.UnionToggleScanSplineEffect = exports.UnionToggleMapMarkState = exports.UnionToggleAirWall = exports.UnionTeleportTransitionOption = exports.UnionTeleportToLatestResetPointOption = exports.UnionTeleportToAndEnterVehicleType = exports.UnionTeleportConfig = exports.UnionTeammateTeleportConfig = exports.UnionTargetVehicle = exports.UnionTargetEntity = exports.UnionTalkOptionPreCondition = exports.UnionTalkOptionParam = exports.UnionTalkBackground = exports.UnionSwitchSubLevels = exports.UnionSummonEntityType = exports.UnionStopNewMoveWithSplineType = undefined;
exports.WhiteCatWarning = exports.WaitBattleCondition = exports.Wait = exports.VehicleWaterfallClimbing = exports.VehicleWaterfallClimbGravityConfig = exports.VehicleSprint = exports.VehiclePlayPassengerVoice = undefined;
var absolute_pos2_js_1 = require("./fb-action/absolute-pos2.js");
Object.defineProperty(exports, "AbsolutePos2", {
  enumerable: true,
  get: function () {
    return absolute_pos2_js_1.AbsolutePos2;
  }
});
var accelerate_ski_config_js_1 = require("./fb-action/accelerate-ski-config.js");
Object.defineProperty(exports, "AccelerateSkiConfig", {
  enumerable: true,
  get: function () {
    return accelerate_ski_config_js_1.AccelerateSkiConfig;
  }
});
var accept_current_quest_js_1 = require("./fb-action/accept-current-quest.js");
Object.defineProperty(exports, "AcceptCurrentQuest", {
  enumerable: true,
  get: function () {
    return accept_current_quest_js_1.AcceptCurrentQuest;
  }
});
var accept_fishing_entrust_js_1 = require("./fb-action/accept-fishing-entrust.js");
Object.defineProperty(exports, "AcceptFishingEntrust", {
  enumerable: true,
  get: function () {
    return accept_fishing_entrust_js_1.AcceptFishingEntrust;
  }
});
var action_info_js_1 = require("./fb-action/action-info.js");
Object.defineProperty(exports, "ActionInfo", {
  enumerable: true,
  get: function () {
    return action_info_js_1.ActionInfo;
  }
});
var action_montage_js_1 = require("./fb-action/action-montage.js");
Object.defineProperty(exports, "ActionMontage", {
  enumerable: true,
  get: function () {
    return action_montage_js_1.ActionMontage;
  }
});
var activate_reset_point_js_1 = require("./fb-action/activate-reset-point.js");
Object.defineProperty(exports, "ActivateResetPoint", {
  enumerable: true,
  get: function () {
    return activate_reset_point_js_1.ActivateResetPoint;
  }
});
var active_anti_gravity_safe_point_js_1 = require("./fb-action/active-anti-gravity-safe-point.js");
Object.defineProperty(exports, "ActiveAntiGravitySafePoint", {
  enumerable: true,
  get: function () {
    return active_anti_gravity_safe_point_js_1.ActiveAntiGravitySafePoint;
  }
});
var active_range_js_1 = require("./fb-action/active-range.js");
Object.defineProperty(exports, "ActiveRange", {
  enumerable: true,
  get: function () {
    return active_range_js_1.ActiveRange;
  }
});
var actor_initial_montage_js_1 = require("./fb-action/actor-initial-montage.js");
Object.defineProperty(exports, "ActorInitialMontage", {
  enumerable: true,
  get: function () {
    return actor_initial_montage_js_1.ActorInitialMontage;
  }
});
var actor_initial_state_js_1 = require("./fb-action/actor-initial-state.js");
Object.defineProperty(exports, "ActorInitialState", {
  enumerable: true,
  get: function () {
    return actor_initial_state_js_1.ActorInitialState;
  }
});
var actor_look_at_js_1 = require("./fb-action/actor-look-at.js");
Object.defineProperty(exports, "ActorLookAt", {
  enumerable: true,
  get: function () {
    return actor_look_at_js_1.ActorLookAt;
  }
});
var actor_look_at_data_js_1 = require("./fb-action/actor-look-at-data.js");
Object.defineProperty(exports, "ActorLookAtData", {
  enumerable: true,
  get: function () {
    return actor_look_at_data_js_1.ActorLookAtData;
  }
});
var actor_look_at_empty_data_js_1 = require("./fb-action/actor-look-at-empty-data.js");
Object.defineProperty(exports, "ActorLookAtEmptyData", {
  enumerable: true,
  get: function () {
    return actor_look_at_empty_data_js_1.ActorLookAtEmptyData;
  }
});
var actor_look_at_entity_data_js_1 = require("./fb-action/actor-look-at-entity-data.js");
Object.defineProperty(exports, "ActorLookAtEntityData", {
  enumerable: true,
  get: function () {
    return actor_look_at_entity_data_js_1.ActorLookAtEntityData;
  }
});
var actor_look_at_other_actor_js_1 = require("./fb-action/actor-look-at-other-actor.js");
Object.defineProperty(exports, "ActorLookAtOtherActor", {
  enumerable: true,
  get: function () {
    return actor_look_at_other_actor_js_1.ActorLookAtOtherActor;
  }
});
var actor_look_at_player_data_js_1 = require("./fb-action/actor-look-at-player-data.js");
Object.defineProperty(exports, "ActorLookAtPlayerData", {
  enumerable: true,
  get: function () {
    return actor_look_at_player_data_js_1.ActorLookAtPlayerData;
  }
});
var actor_look_at_position_data_js_1 = require("./fb-action/actor-look-at-position-data.js");
Object.defineProperty(exports, "ActorLookAtPositionData", {
  enumerable: true,
  get: function () {
    return actor_look_at_position_data_js_1.ActorLookAtPositionData;
  }
});
var actor_look_at_talker_data_js_1 = require("./fb-action/actor-look-at-talker-data.js");
Object.defineProperty(exports, "ActorLookAtTalkerData", {
  enumerable: true,
  get: function () {
    return actor_look_at_talker_data_js_1.ActorLookAtTalkerData;
  }
});
var actor_look_at_un_lock_js_1 = require("./fb-action/actor-look-at-un-lock.js");
Object.defineProperty(exports, "ActorLookAtUnLock", {
  enumerable: true,
  get: function () {
    return actor_look_at_un_lock_js_1.ActorLookAtUnLock;
  }
});
var actor_turn_to_js_1 = require("./fb-action/actor-turn-to.js");
Object.defineProperty(exports, "ActorTurnTo", {
  enumerable: true,
  get: function () {
    return actor_turn_to_js_1.ActorTurnTo;
  }
});
var actor_turn_to_empty_data_js_1 = require("./fb-action/actor-turn-to-empty-data.js");
Object.defineProperty(exports, "ActorTurnToEmptyData", {
  enumerable: true,
  get: function () {
    return actor_turn_to_empty_data_js_1.ActorTurnToEmptyData;
  }
});
var actor_turn_to_entity_data_js_1 = require("./fb-action/actor-turn-to-entity-data.js");
Object.defineProperty(exports, "ActorTurnToEntityData", {
  enumerable: true,
  get: function () {
    return actor_turn_to_entity_data_js_1.ActorTurnToEntityData;
  }
});
var actor_turn_to_player_data_js_1 = require("./fb-action/actor-turn-to-player-data.js");
Object.defineProperty(exports, "ActorTurnToPlayerData", {
  enumerable: true,
  get: function () {
    return actor_turn_to_player_data_js_1.ActorTurnToPlayerData;
  }
});
var actor_turn_to_position_data_js_1 = require("./fb-action/actor-turn-to-position-data.js");
Object.defineProperty(exports, "ActorTurnToPositionData", {
  enumerable: true,
  get: function () {
    return actor_turn_to_position_data_js_1.ActorTurnToPositionData;
  }
});
var actor_turn_to_talker_data_js_1 = require("./fb-action/actor-turn-to-talker-data.js");
Object.defineProperty(exports, "ActorTurnToTalkerData", {
  enumerable: true,
  get: function () {
    return actor_turn_to_talker_data_js_1.ActorTurnToTalkerData;
  }
});
var add_buff_to_entity_js_1 = require("./fb-action/add-buff-to-entity.js");
Object.defineProperty(exports, "AddBuffToEntity", {
  enumerable: true,
  get: function () {
    return add_buff_to_entity_js_1.AddBuffToEntity;
  }
});
var add_buff_to_follow_shooter_js_1 = require("./fb-action/add-buff-to-follow-shooter.js");
Object.defineProperty(exports, "AddBuffToFollowShooter", {
  enumerable: true,
  get: function () {
    return add_buff_to_follow_shooter_js_1.AddBuffToFollowShooter;
  }
});
var add_buff_to_player_js_1 = require("./fb-action/add-buff-to-player.js");
Object.defineProperty(exports, "AddBuffToPlayer", {
  enumerable: true,
  get: function () {
    return add_buff_to_player_js_1.AddBuffToPlayer;
  }
});
var add_buff_to_triggered_entity_js_1 = require("./fb-action/add-buff-to-triggered-entity.js");
Object.defineProperty(exports, "AddBuffToTriggeredEntity", {
  enumerable: true,
  get: function () {
    return add_buff_to_triggered_entity_js_1.AddBuffToTriggeredEntity;
  }
});
var add_flow_interact_option_js_1 = require("./fb-action/add-flow-interact-option.js");
Object.defineProperty(exports, "AddFlowInteractOption", {
  enumerable: true,
  get: function () {
    return add_flow_interact_option_js_1.AddFlowInteractOption;
  }
});
var add_guest_character_js_1 = require("./fb-action/add-guest-character.js");
Object.defineProperty(exports, "AddGuestCharacter", {
  enumerable: true,
  get: function () {
    return add_guest_character_js_1.AddGuestCharacter;
  }
});
var add_or_sub_alert_value_js_1 = require("./fb-action/add-or-sub-alert-value.js");
Object.defineProperty(exports, "AddOrSubAlertValue", {
  enumerable: true,
  get: function () {
    return add_or_sub_alert_value_js_1.AddOrSubAlertValue;
  }
});
var add_or_sub_alert_value_change_speed_js_1 = require("./fb-action/add-or-sub-alert-value-change-speed.js");
Object.defineProperty(exports, "AddOrSubAlertValueChangeSpeed", {
  enumerable: true,
  get: function () {
    return add_or_sub_alert_value_change_speed_js_1.AddOrSubAlertValueChangeSpeed;
  }
});
var add_play_bubble_js_1 = require("./fb-action/add-play-bubble.js");
Object.defineProperty(exports, "AddPlayBubble", {
  enumerable: true,
  get: function () {
    return add_play_bubble_js_1.AddPlayBubble;
  }
});
var add_time_js_1 = require("./fb-action/add-time.js");
Object.defineProperty(exports, "AddTime", {
  enumerable: true,
  get: function () {
    return add_time_js_1.AddTime;
  }
});
var add_trial_character_js_1 = require("./fb-action/add-trial-character.js");
Object.defineProperty(exports, "AddTrialCharacter", {
  enumerable: true,
  get: function () {
    return add_trial_character_js_1.AddTrialCharacter;
  }
});
var add_trial_follow_shooter_js_1 = require("./fb-action/add-trial-follow-shooter.js");
Object.defineProperty(exports, "AddTrialFollowShooter", {
  enumerable: true,
  get: function () {
    return add_trial_follow_shooter_js_1.AddTrialFollowShooter;
  }
});
var adjust_axis_lock_camera_js_1 = require("./fb-action/adjust-axis-lock-camera.js");
Object.defineProperty(exports, "AdjustAxisLockCamera", {
  enumerable: true,
  get: function () {
    return adjust_axis_lock_camera_js_1.AdjustAxisLockCamera;
  }
});
var adjust_basic_camera_js_1 = require("./fb-action/adjust-basic-camera.js");
Object.defineProperty(exports, "AdjustBasicCamera", {
  enumerable: true,
  get: function () {
    return adjust_basic_camera_js_1.AdjustBasicCamera;
  }
});
var adjust_dialog_camera_js_1 = require("./fb-action/adjust-dialog-camera.js");
Object.defineProperty(exports, "AdjustDialogCamera", {
  enumerable: true,
  get: function () {
    return adjust_dialog_camera_js_1.AdjustDialogCamera;
  }
});
var adjust_first_person_camera_js_1 = require("./fb-action/adjust-first-person-camera.js");
Object.defineProperty(exports, "AdjustFirstPersonCamera", {
  enumerable: true,
  get: function () {
    return adjust_first_person_camera_js_1.AdjustFirstPersonCamera;
  }
});
var adjust_fixed_camera_js_1 = require("./fb-action/adjust-fixed-camera.js");
Object.defineProperty(exports, "AdjustFixedCamera", {
  enumerable: true,
  get: function () {
    return adjust_fixed_camera_js_1.AdjustFixedCamera;
  }
});
var adjust_horizontal_camera_js_1 = require("./fb-action/adjust-horizontal-camera.js");
Object.defineProperty(exports, "AdjustHorizontalCamera", {
  enumerable: true,
  get: function () {
    return adjust_horizontal_camera_js_1.AdjustHorizontalCamera;
  }
});
var adjust_player_camera_js_1 = require("./fb-action/adjust-player-camera.js");
Object.defineProperty(exports, "AdjustPlayerCamera", {
  enumerable: true,
  get: function () {
    return adjust_player_camera_js_1.AdjustPlayerCamera;
  }
});
var adjust_tod_time_js_1 = require("./fb-action/adjust-tod-time.js");
Object.defineProperty(exports, "AdjustTodTime", {
  enumerable: true,
  get: function () {
    return adjust_tod_time_js_1.AdjustTodTime;
  }
});
var air_passage_move_js_1 = require("./fb-action/air-passage-move.js");
Object.defineProperty(exports, "AirPassageMove", {
  enumerable: true,
  get: function () {
    return air_passage_move_js_1.AirPassageMove;
  }
});
var appointed_vehicle_js_1 = require("./fb-action/appointed-vehicle.js");
Object.defineProperty(exports, "AppointedVehicle", {
  enumerable: true,
  get: function () {
    return appointed_vehicle_js_1.AppointedVehicle;
  }
});
var audio_state_js_1 = require("./fb-action/audio-state.js");
Object.defineProperty(exports, "AudioState", {
  enumerable: true,
  get: function () {
    return audio_state_js_1.AudioState;
  }
});
var awake_entity_js_1 = require("./fb-action/awake-entity.js");
Object.defineProperty(exports, "AwakeEntity", {
  enumerable: true,
  get: function () {
    return awake_entity_js_1.AwakeEntity;
  }
});
var awake_with_transform_var_js_1 = require("./fb-action/awake-with-transform-var.js");
Object.defineProperty(exports, "AwakeWithTransformVar", {
  enumerable: true,
  get: function () {
    return awake_with_transform_var_js_1.AwakeWithTransformVar;
  }
});
var axis_lock_screen_config_js_1 = require("./fb-action/axis-lock-screen-config.js");
Object.defineProperty(exports, "AxisLockScreenConfig", {
  enumerable: true,
  get: function () {
    return axis_lock_screen_config_js_1.AxisLockScreenConfig;
  }
});
var bad_bu_king_challenge_tip_js_1 = require("./fb-action/bad-bu-king-challenge-tip.js");
Object.defineProperty(exports, "BadBuKingChallengeTip", {
  enumerable: true,
  get: function () {
    return bad_bu_king_challenge_tip_js_1.BadBuKingChallengeTip;
  }
});
var base_curve_js_1 = require("./fb-action/base-curve.js");
Object.defineProperty(exports, "BaseCurve", {
  enumerable: true,
  get: function () {
    return base_curve_js_1.BaseCurve;
  }
});
var battle_settlement_js_1 = require("./fb-action/battle-settlement.js");
Object.defineProperty(exports, "BattleSettlement", {
  enumerable: true,
  get: function () {
    return battle_settlement_js_1.BattleSettlement;
  }
});
var begin_flow_template_js_1 = require("./fb-action/begin-flow-template.js");
Object.defineProperty(exports, "BeginFlowTemplate", {
  enumerable: true,
  get: function () {
    return begin_flow_template_js_1.BeginFlowTemplate;
  }
});
var black_cat_warning_js_1 = require("./fb-action/black-cat-warning.js");
Object.defineProperty(exports, "BlackCatWarning", {
  enumerable: true,
  get: function () {
    return black_cat_warning_js_1.BlackCatWarning;
  }
});
var blend_function_js_1 = require("./fb-action/blend-function.js");
Object.defineProperty(exports, "BlendFunction", {
  enumerable: true,
  get: function () {
    return blend_function_js_1.BlendFunction;
  }
});
var bounce_js_1 = require("./fb-action/bounce.js");
Object.defineProperty(exports, "Bounce", {
  enumerable: true,
  get: function () {
    return bounce_js_1.Bounce;
  }
});
var broken_rock_js_1 = require("./fb-action/broken-rock.js");
Object.defineProperty(exports, "BrokenRock", {
  enumerable: true,
  get: function () {
    return broken_rock_js_1.BrokenRock;
  }
});
var bubble_data_js_1 = require("./fb-action/bubble-data.js");
Object.defineProperty(exports, "BubbleData", {
  enumerable: true,
  get: function () {
    return bubble_data_js_1.BubbleData;
  }
});
var bubble_index_js_1 = require("./fb-action/bubble-index.js");
Object.defineProperty(exports, "BubbleIndex", {
  enumerable: true,
  get: function () {
    return bubble_index_js_1.BubbleIndex;
  }
});
var bvb_send_system_event_js_1 = require("./fb-action/bvb-send-system-event.js");
Object.defineProperty(exports, "BvbSendSystemEvent", {
  enumerable: true,
  get: function () {
    return bvb_send_system_event_js_1.BvbSendSystemEvent;
  }
});
var calculate_var_js_1 = require("./fb-action/calculate-var.js");
Object.defineProperty(exports, "CalculateVar", {
  enumerable: true,
  get: function () {
    return calculate_var_js_1.CalculateVar;
  }
});
var call_by_condition_js_1 = require("./fb-action/call-by-condition.js");
Object.defineProperty(exports, "CallByCondition", {
  enumerable: true,
  get: function () {
    return call_by_condition_js_1.CallByCondition;
  }
});
var call_function_js_1 = require("./fb-action/call-function.js");
Object.defineProperty(exports, "CallFunction", {
  enumerable: true,
  get: function () {
    return call_function_js_1.CallFunction;
  }
});
var camera_data_js_1 = require("./fb-action/camera-data.js");
Object.defineProperty(exports, "CameraData", {
  enumerable: true,
  get: function () {
    return camera_data_js_1.CameraData;
  }
});
var camera_depth_of_field_js_1 = require("./fb-action/camera-depth-of-field.js");
Object.defineProperty(exports, "CameraDepthOfField", {
  enumerable: true,
  get: function () {
    return camera_depth_of_field_js_1.CameraDepthOfField;
  }
});
var camera_gaze_js_1 = require("./fb-action/camera-gaze.js");
Object.defineProperty(exports, "CameraGaze", {
  enumerable: true,
  get: function () {
    return camera_gaze_js_1.CameraGaze;
  }
});
var camera_look_at_js_1 = require("./fb-action/camera-look-at.js");
Object.defineProperty(exports, "CameraLookAt", {
  enumerable: true,
  get: function () {
    return camera_look_at_js_1.CameraLookAt;
  }
});
var camera_pos_and_rot_js_1 = require("./fb-action/camera-pos-and-rot.js");
Object.defineProperty(exports, "CameraPosAndRot", {
  enumerable: true,
  get: function () {
    return camera_pos_and_rot_js_1.CameraPosAndRot;
  }
});
var camera_setting_js_1 = require("./fb-action/camera-setting.js");
Object.defineProperty(exports, "CameraSetting", {
  enumerable: true,
  get: function () {
    return camera_setting_js_1.CameraSetting;
  }
});
var camera_transition_js_1 = require("./fb-action/camera-transition.js");
Object.defineProperty(exports, "CameraTransition", {
  enumerable: true,
  get: function () {
    return camera_transition_js_1.CameraTransition;
  }
});
var caption_param_js_1 = require("./fb-action/caption-param.js");
Object.defineProperty(exports, "CaptionParam", {
  enumerable: true,
  get: function () {
    return caption_param_js_1.CaptionParam;
  }
});
var catapult_js_1 = require("./fb-action/catapult.js");
Object.defineProperty(exports, "Catapult", {
  enumerable: true,
  get: function () {
    return catapult_js_1.Catapult;
  }
});
var catapult_param_js_1 = require("./fb-action/catapult-param.js");
Object.defineProperty(exports, "CatapultParam", {
  enumerable: true,
  get: function () {
    return catapult_param_js_1.CatapultParam;
  }
});
var change_actor_mpc_js_1 = require("./fb-action/change-actor-mpc.js");
Object.defineProperty(exports, "ChangeActorMPC", {
  enumerable: true,
  get: function () {
    return change_actor_mpc_js_1.ChangeActorMPC;
  }
});
var change_actor_material_data_js_1 = require("./fb-action/change-actor-material-data.js");
Object.defineProperty(exports, "ChangeActorMaterialData", {
  enumerable: true,
  get: function () {
    return change_actor_material_data_js_1.ChangeActorMaterialData;
  }
});
var change_actor_state_js_1 = require("./fb-action/change-actor-state.js");
Object.defineProperty(exports, "ChangeActorState", {
  enumerable: true,
  get: function () {
    return change_actor_state_js_1.ChangeActorState;
  }
});
var change_actor_talker_js_1 = require("./fb-action/change-actor-talker.js");
Object.defineProperty(exports, "ChangeActorTalker", {
  enumerable: true,
  get: function () {
    return change_actor_talker_js_1.ChangeActorTalker;
  }
});
var change_behavior_state_js_1 = require("./fb-action/change-behavior-state.js");
Object.defineProperty(exports, "ChangeBehaviorState", {
  enumerable: true,
  get: function () {
    return change_behavior_state_js_1.ChangeBehaviorState;
  }
});
var change_entity_camp_js_1 = require("./fb-action/change-entity-camp.js");
Object.defineProperty(exports, "ChangeEntityCamp", {
  enumerable: true,
  get: function () {
    return change_entity_camp_js_1.ChangeEntityCamp;
  }
});
var change_entity_prefab_performance_js_1 = require("./fb-action/change-entity-prefab-performance.js");
Object.defineProperty(exports, "ChangeEntityPrefabPerformance", {
  enumerable: true,
  get: function () {
    return change_entity_prefab_performance_js_1.ChangeEntityPrefabPerformance;
  }
});
var change_entity_state_js_1 = require("./fb-action/change-entity-state.js");
Object.defineProperty(exports, "ChangeEntityState", {
  enumerable: true,
  get: function () {
    return change_entity_state_js_1.ChangeEntityState;
  }
});
var change_entity_state_batch_directly_js_1 = require("./fb-action/change-entity-state-batch-directly.js");
Object.defineProperty(exports, "ChangeEntityStateBatchDirectly", {
  enumerable: true,
  get: function () {
    return change_entity_state_batch_directly_js_1.ChangeEntityStateBatchDirectly;
  }
});
var change_entity_state_directly_js_1 = require("./fb-action/change-entity-state-directly.js");
Object.defineProperty(exports, "ChangeEntityStateDirectly", {
  enumerable: true,
  get: function () {
    return change_entity_state_directly_js_1.ChangeEntityStateDirectly;
  }
});
var change_entity_state_loop_js_1 = require("./fb-action/change-entity-state-loop.js");
Object.defineProperty(exports, "ChangeEntityStateLoop", {
  enumerable: true,
  get: function () {
    return change_entity_state_loop_js_1.ChangeEntityStateLoop;
  }
});
var change_fight_team_js_1 = require("./fb-action/change-fight-team.js");
Object.defineProperty(exports, "ChangeFightTeam", {
  enumerable: true,
  get: function () {
    return change_fight_team_js_1.ChangeFightTeam;
  }
});
var change_flow_template_js_1 = require("./fb-action/change-flow-template.js");
Object.defineProperty(exports, "ChangeFlowTemplate", {
  enumerable: true,
  get: function () {
    return change_flow_template_js_1.ChangeFlowTemplate;
  }
});
var change_interact_option_text_js_1 = require("./fb-action/change-interact-option-text.js");
Object.defineProperty(exports, "ChangeInteractOptionText", {
  enumerable: true,
  get: function () {
    return change_interact_option_text_js_1.ChangeInteractOptionText;
  }
});
var change_lift_target_js_1 = require("./fb-action/change-lift-target.js");
Object.defineProperty(exports, "ChangeLiftTarget", {
  enumerable: true,
  get: function () {
    return change_lift_target_js_1.ChangeLiftTarget;
  }
});
var change_npc_perform_state_js_1 = require("./fb-action/change-npc-perform-state.js");
Object.defineProperty(exports, "ChangeNpcPerformState", {
  enumerable: true,
  get: function () {
    return change_npc_perform_state_js_1.ChangeNpcPerformState;
  }
});
var change_other_state_js_1 = require("./fb-action/change-other-state.js");
Object.defineProperty(exports, "ChangeOtherState", {
  enumerable: true,
  get: function () {
    return change_other_state_js_1.ChangeOtherState;
  }
});
var change_phantom_js_1 = require("./fb-action/change-phantom.js");
Object.defineProperty(exports, "ChangePhantom", {
  enumerable: true,
  get: function () {
    return change_phantom_js_1.ChangePhantom;
  }
});
var change_phantom_formation_js_1 = require("./fb-action/change-phantom-formation.js");
Object.defineProperty(exports, "ChangePhantomFormation", {
  enumerable: true,
  get: function () {
    return change_phantom_formation_js_1.ChangePhantomFormation;
  }
});
var change_random_state_js_1 = require("./fb-action/change-random-state.js");
Object.defineProperty(exports, "ChangeRandomState", {
  enumerable: true,
  get: function () {
    return change_random_state_js_1.ChangeRandomState;
  }
});
var change_self_entity_prefab_performance_js_1 = require("./fb-action/change-self-entity-prefab-performance.js");
Object.defineProperty(exports, "ChangeSelfEntityPrefabPerformance", {
  enumerable: true,
  get: function () {
    return change_self_entity_prefab_performance_js_1.ChangeSelfEntityPrefabPerformance;
  }
});
var change_self_entity_state_js_1 = require("./fb-action/change-self-entity-state.js");
Object.defineProperty(exports, "ChangeSelfEntityState", {
  enumerable: true,
  get: function () {
    return change_self_entity_state_js_1.ChangeSelfEntityState;
  }
});
var change_state_js_1 = require("./fb-action/change-state.js");
Object.defineProperty(exports, "ChangeState", {
  enumerable: true,
  get: function () {
    return change_state_js_1.ChangeState;
  }
});
var change_target_entity_prefab_performance_js_1 = require("./fb-action/change-target-entity-prefab-performance.js");
Object.defineProperty(exports, "ChangeTargetEntityPrefabPerformance", {
  enumerable: true,
  get: function () {
    return change_target_entity_prefab_performance_js_1.ChangeTargetEntityPrefabPerformance;
  }
});
var change_team_position_js_1 = require("./fb-action/change-team-position.js");
Object.defineProperty(exports, "ChangeTeamPosition", {
  enumerable: true,
  get: function () {
    return change_team_position_js_1.ChangeTeamPosition;
  }
});
var change_timer_js_1 = require("./fb-action/change-timer.js");
Object.defineProperty(exports, "ChangeTimer", {
  enumerable: true,
  get: function () {
    return change_timer_js_1.ChangeTimer;
  }
});
var character_group_new_js_1 = require("./fb-action/character-group-new.js");
Object.defineProperty(exports, "CharacterGroupNew", {
  enumerable: true,
  get: function () {
    return character_group_new_js_1.CharacterGroupNew;
  }
});
var character_look_at_js_1 = require("./fb-action/character-look-at.js");
Object.defineProperty(exports, "CharacterLookAt", {
  enumerable: true,
  get: function () {
    return character_look_at_js_1.CharacterLookAt;
  }
});
var character_look_at_empty_data_js_1 = require("./fb-action/character-look-at-empty-data.js");
Object.defineProperty(exports, "CharacterLookAtEmptyData", {
  enumerable: true,
  get: function () {
    return character_look_at_empty_data_js_1.CharacterLookAtEmptyData;
  }
});
var character_look_at_entity_data_js_1 = require("./fb-action/character-look-at-entity-data.js");
Object.defineProperty(exports, "CharacterLookAtEntityData", {
  enumerable: true,
  get: function () {
    return character_look_at_entity_data_js_1.CharacterLookAtEntityData;
  }
});
var character_look_at_player_data_js_1 = require("./fb-action/character-look-at-player-data.js");
Object.defineProperty(exports, "CharacterLookAtPlayerData", {
  enumerable: true,
  get: function () {
    return character_look_at_player_data_js_1.CharacterLookAtPlayerData;
  }
});
var character_look_at_position_data_js_1 = require("./fb-action/character-look-at-position-data.js");
Object.defineProperty(exports, "CharacterLookAtPositionData", {
  enumerable: true,
  get: function () {
    return character_look_at_position_data_js_1.CharacterLookAtPositionData;
  }
});
var character_look_at_unlock_data_js_1 = require("./fb-action/character-look-at-unlock-data.js");
Object.defineProperty(exports, "CharacterLookAtUnlockData", {
  enumerable: true,
  get: function () {
    return character_look_at_unlock_data_js_1.CharacterLookAtUnlockData;
  }
});
var character_move_to_point_js_1 = require("./fb-action/character-move-to-point.js");
Object.defineProperty(exports, "CharacterMoveToPoint", {
  enumerable: true,
  get: function () {
    return character_move_to_point_js_1.CharacterMoveToPoint;
  }
});
var check_climb_js_1 = require("./fb-action/check-climb.js");
Object.defineProperty(exports, "CheckClimb", {
  enumerable: true,
  get: function () {
    return check_climb_js_1.CheckClimb;
  }
});
var cipher_gameplay_js_1 = require("./fb-action/cipher-gameplay.js");
Object.defineProperty(exports, "CipherGameplay", {
  enumerable: true,
  get: function () {
    return cipher_gameplay_js_1.CipherGameplay;
  }
});
var claim_dungeon_reward_js_1 = require("./fb-action/claim-dungeon-reward.js");
Object.defineProperty(exports, "ClaimDungeonReward", {
  enumerable: true,
  get: function () {
    return claim_dungeon_reward_js_1.ClaimDungeonReward;
  }
});
var claim_level_play_reward_js_1 = require("./fb-action/claim-level-play-reward.js");
Object.defineProperty(exports, "ClaimLevelPlayReward", {
  enumerable: true,
  get: function () {
    return claim_level_play_reward_js_1.ClaimLevelPlayReward;
  }
});
var clear_entity_visible_tag_js_1 = require("./fb-action/clear-entity-visible-tag.js");
Object.defineProperty(exports, "ClearEntityVisibleTag", {
  enumerable: true,
  get: function () {
    return clear_entity_visible_tag_js_1.ClearEntityVisibleTag;
  }
});
var clear_fishing_cabin_in_sale_items_js_1 = require("./fb-action/clear-fishing-cabin-in-sale-items.js");
Object.defineProperty(exports, "ClearFishingCabinInSaleItems", {
  enumerable: true,
  get: function () {
    return clear_fishing_cabin_in_sale_items_js_1.ClearFishingCabinInSaleItems;
  }
});
var clear_play_bubble_js_1 = require("./fb-action/clear-play-bubble.js");
Object.defineProperty(exports, "ClearPlayBubble", {
  enumerable: true,
  get: function () {
    return clear_play_bubble_js_1.ClearPlayBubble;
  }
});
var client_pre_enable_sub_levels_js_1 = require("./fb-action/client-pre-enable-sub-levels.js");
Object.defineProperty(exports, "ClientPreEnableSubLevels", {
  enumerable: true,
  get: function () {
    return client_pre_enable_sub_levels_js_1.ClientPreEnableSubLevels;
  }
});
var client_set_player_pos_js_1 = require("./fb-action/client-set-player-pos.js");
Object.defineProperty(exports, "ClientSetPlayerPos", {
  enumerable: true,
  get: function () {
    return client_set_player_pos_js_1.ClientSetPlayerPos;
  }
});
var client_tp_relative_entity_pos_js_1 = require("./fb-action/client-tp-relative-entity-pos.js");
Object.defineProperty(exports, "ClientTpRelativeEntityPos", {
  enumerable: true,
  get: function () {
    return client_tp_relative_entity_pos_js_1.ClientTpRelativeEntityPos;
  }
});
var close_air_wall_js_1 = require("./fb-action/close-air-wall.js");
Object.defineProperty(exports, "CloseAirWall", {
  enumerable: true,
  get: function () {
    return close_air_wall_js_1.CloseAirWall;
  }
});
var close_flow_template_js_1 = require("./fb-action/close-flow-template.js");
Object.defineProperty(exports, "CloseFlowTemplate", {
  enumerable: true,
  get: function () {
    return close_flow_template_js_1.CloseFlowTemplate;
  }
});
var close_global_time_scale_js_1 = require("./fb-action/close-global-time-scale.js");
Object.defineProperty(exports, "CloseGlobalTimeScale", {
  enumerable: true,
  get: function () {
    return close_global_time_scale_js_1.CloseGlobalTimeScale;
  }
});
var close_ski_config_js_1 = require("./fb-action/close-ski-config.js");
Object.defineProperty(exports, "CloseSkiConfig", {
  enumerable: true,
  get: function () {
    return close_ski_config_js_1.CloseSkiConfig;
  }
});
var close_spline_move_js_1 = require("./fb-action/close-spline-move.js");
Object.defineProperty(exports, "CloseSplineMove", {
  enumerable: true,
  get: function () {
    return close_spline_move_js_1.CloseSplineMove;
  }
});
var close_trace_spline_js_1 = require("./fb-action/close-trace-spline.js");
Object.defineProperty(exports, "CloseTraceSpline", {
  enumerable: true,
  get: function () {
    return close_trace_spline_js_1.CloseTraceSpline;
  }
});
var collect_js_1 = require("./fb-action/collect.js");
Object.defineProperty(exports, "Collect", {
  enumerable: true,
  get: function () {
    return collect_js_1.Collect;
  }
});
var color_piece_js_1 = require("./fb-action/color-piece.js");
Object.defineProperty(exports, "ColorPiece", {
  enumerable: true,
  get: function () {
    return color_piece_js_1.ColorPiece;
  }
});
var common_tip_js_1 = require("./fb-action/common-tip.js");
Object.defineProperty(exports, "CommonTip", {
  enumerable: true,
  get: function () {
    return common_tip_js_1.CommonTip;
  }
});
var common_tip2_js_1 = require("./fb-action/common-tip2.js");
Object.defineProperty(exports, "CommonTip2", {
  enumerable: true,
  get: function () {
    return common_tip2_js_1.CommonTip2;
  }
});
var common_tip2_prepare_countdown_js_1 = require("./fb-action/common-tip2-prepare-countdown.js");
Object.defineProperty(exports, "CommonTip2PrepareCountdown", {
  enumerable: true,
  get: function () {
    return common_tip2_prepare_countdown_js_1.CommonTip2PrepareCountdown;
  }
});
var common_tip_challenge_condition_js_1 = require("./fb-action/common-tip-challenge-condition.js");
Object.defineProperty(exports, "CommonTipChallengeCondition", {
  enumerable: true,
  get: function () {
    return common_tip_challenge_condition_js_1.CommonTipChallengeCondition;
  }
});
var common_tip_challenge_fail_js_1 = require("./fb-action/common-tip-challenge-fail.js");
Object.defineProperty(exports, "CommonTipChallengeFail", {
  enumerable: true,
  get: function () {
    return common_tip_challenge_fail_js_1.CommonTipChallengeFail;
  }
});
var common_tip_challenge_success_js_1 = require("./fb-action/common-tip-challenge-success.js");
Object.defineProperty(exports, "CommonTipChallengeSuccess", {
  enumerable: true,
  get: function () {
    return common_tip_challenge_success_js_1.CommonTipChallengeSuccess;
  }
});
var common_tip_enter_in_range_js_1 = require("./fb-action/common-tip-enter-in-range.js");
Object.defineProperty(exports, "CommonTipEnterInRange", {
  enumerable: true,
  get: function () {
    return common_tip_enter_in_range_js_1.CommonTipEnterInRange;
  }
});
var common_tip_first_complete_js_1 = require("./fb-action/common-tip-first-complete.js");
Object.defineProperty(exports, "CommonTipFirstComplete", {
  enumerable: true,
  get: function () {
    return common_tip_first_complete_js_1.CommonTipFirstComplete;
  }
});
var common_tip_general_floating_tip_js_1 = require("./fb-action/common-tip-general-floating-tip.js");
Object.defineProperty(exports, "CommonTipGeneralFloatingTip", {
  enumerable: true,
  get: function () {
    return common_tip_general_floating_tip_js_1.CommonTipGeneralFloatingTip;
  }
});
var common_tip_id_js_1 = require("./fb-action/common-tip-id.js");
Object.defineProperty(exports, "CommonTipId", {
  enumerable: true,
  get: function () {
    return common_tip_id_js_1.CommonTipId;
  }
});
var common_tip_mission_complete_js_1 = require("./fb-action/common-tip-mission-complete.js");
Object.defineProperty(exports, "CommonTipMissionComplete", {
  enumerable: true,
  get: function () {
    return common_tip_mission_complete_js_1.CommonTipMissionComplete;
  }
});
var common_tip_prepare_countdown_js_1 = require("./fb-action/common-tip-prepare-countdown.js");
Object.defineProperty(exports, "CommonTipPrepareCountdown", {
  enumerable: true,
  get: function () {
    return common_tip_prepare_countdown_js_1.CommonTipPrepareCountdown;
  }
});
var common_tip_reach_challenge_js_1 = require("./fb-action/common-tip-reach-challenge.js");
Object.defineProperty(exports, "CommonTipReachChallenge", {
  enumerable: true,
  get: function () {
    return common_tip_reach_challenge_js_1.CommonTipReachChallenge;
  }
});
var common_tip_trigger_delegation_js_1 = require("./fb-action/common-tip-trigger-delegation.js");
Object.defineProperty(exports, "CommonTipTriggerDelegation", {
  enumerable: true,
  get: function () {
    return common_tip_trigger_delegation_js_1.CommonTipTriggerDelegation;
  }
});
var complete_child_quest_js_1 = require("./fb-action/complete-child-quest.js");
Object.defineProperty(exports, "CompleteChildQuest", {
  enumerable: true,
  get: function () {
    return complete_child_quest_js_1.CompleteChildQuest;
  }
});
var complete_guide_js_1 = require("./fb-action/complete-guide.js");
Object.defineProperty(exports, "CompleteGuide", {
  enumerable: true,
  get: function () {
    return complete_guide_js_1.CompleteGuide;
  }
});
var condition_js_1 = require("./fb-action/condition.js");
Object.defineProperty(exports, "Condition", {
  enumerable: true,
  get: function () {
    return condition_js_1.Condition;
  }
});
var conditions_js_1 = require("./fb-action/conditions.js");
Object.defineProperty(exports, "Conditions", {
  enumerable: true,
  get: function () {
    return conditions_js_1.Conditions;
  }
});
var constant_camera_shake_js_1 = require("./fb-action/constant-camera-shake.js");
Object.defineProperty(exports, "ConstantCameraShake", {
  enumerable: true,
  get: function () {
    return constant_camera_shake_js_1.ConstantCameraShake;
  }
});
var control_tracking_other_js_1 = require("./fb-action/control-tracking-other.js");
Object.defineProperty(exports, "ControlTrackingOther", {
  enumerable: true,
  get: function () {
    return control_tracking_other_js_1.ControlTrackingOther;
  }
});
var control_tracking_self_js_1 = require("./fb-action/control-tracking-self.js");
Object.defineProperty(exports, "ControlTrackingSelf", {
  enumerable: true,
  get: function () {
    return control_tracking_self_js_1.ControlTrackingSelf;
  }
});
var create_prefab_js_1 = require("./fb-action/create-prefab.js");
Object.defineProperty(exports, "CreatePrefab", {
  enumerable: true,
  get: function () {
    return create_prefab_js_1.CreatePrefab;
  }
});
var current_vehicle_js_1 = require("./fb-action/current-vehicle.js");
Object.defineProperty(exports, "CurrentVehicle", {
  enumerable: true,
  get: function () {
    return current_vehicle_js_1.CurrentVehicle;
  }
});
var custom_alert_value_js_1 = require("./fb-action/custom-alert-value.js");
Object.defineProperty(exports, "CustomAlertValue", {
  enumerable: true,
  get: function () {
    return custom_alert_value_js_1.CustomAlertValue;
  }
});
var custom_alert_value_change_speed_js_1 = require("./fb-action/custom-alert-value-change-speed.js");
Object.defineProperty(exports, "CustomAlertValueChangeSpeed", {
  enumerable: true,
  get: function () {
    return custom_alert_value_change_speed_js_1.CustomAlertValueChangeSpeed;
  }
});
var custom_json_js_1 = require("./fb-action/custom-json.js");
Object.defineProperty(exports, "CustomJson", {
  enumerable: true,
  get: function () {
    return custom_json_js_1.CustomJson;
  }
});
var cycle_move_to_points_js_1 = require("./fb-action/cycle-move-to-points.js");
Object.defineProperty(exports, "CycleMoveToPoints", {
  enumerable: true,
  get: function () {
    return cycle_move_to_points_js_1.CycleMoveToPoints;
  }
});
var dango_abyss_activate_portal_js_1 = require("./fb-action/dango-abyss-activate-portal.js");
Object.defineProperty(exports, "DangoAbyssActivatePortal", {
  enumerable: true,
  get: function () {
    return dango_abyss_activate_portal_js_1.DangoAbyssActivatePortal;
  }
});
var dango_abyss_create_reward_treasure_box_js_1 = require("./fb-action/dango-abyss-create-reward-treasure-box.js");
Object.defineProperty(exports, "DangoAbyssCreateRewardTreasureBox", {
  enumerable: true,
  get: function () {
    return dango_abyss_create_reward_treasure_box_js_1.DangoAbyssCreateRewardTreasureBox;
  }
});
var dango_abyss_goto_next_floor_js_1 = require("./fb-action/dango-abyss-goto-next-floor.js");
Object.defineProperty(exports, "DangoAbyssGotoNextFloor", {
  enumerable: true,
  get: function () {
    return dango_abyss_goto_next_floor_js_1.DangoAbyssGotoNextFloor;
  }
});
var dango_abyss_receive_reward_js_1 = require("./fb-action/dango-abyss-receive-reward.js");
Object.defineProperty(exports, "DangoAbyssReceiveReward", {
  enumerable: true,
  get: function () {
    return dango_abyss_receive_reward_js_1.DangoAbyssReceiveReward;
  }
});
var daoling_authentication_js_1 = require("./fb-action/daoling-authentication.js");
Object.defineProperty(exports, "DaolingAuthentication", {
  enumerable: true,
  get: function () {
    return daoling_authentication_js_1.DaolingAuthentication;
  }
});
var delay_remove_after_skill_finish_js_1 = require("./fb-action/delay-remove-after-skill-finish.js");
Object.defineProperty(exports, "DelayRemoveAfterSkillFinish", {
  enumerable: true,
  get: function () {
    return delay_remove_after_skill_finish_js_1.DelayRemoveAfterSkillFinish;
  }
});
var destroy_js_1 = require("./fb-action/destroy.js");
Object.defineProperty(exports, "Destroy", {
  enumerable: true,
  get: function () {
    return destroy_js_1.Destroy;
  }
});
var destroy_all_child_js_1 = require("./fb-action/destroy-all-child.js");
Object.defineProperty(exports, "DestroyAllChild", {
  enumerable: true,
  get: function () {
    return destroy_all_child_js_1.DestroyAllChild;
  }
});
var destroy_entity_js_1 = require("./fb-action/destroy-entity.js");
Object.defineProperty(exports, "DestroyEntity", {
  enumerable: true,
  get: function () {
    return destroy_entity_js_1.DestroyEntity;
  }
});
var destroy_fishing_boat_js_1 = require("./fb-action/destroy-fishing-boat.js");
Object.defineProperty(exports, "DestroyFishingBoat", {
  enumerable: true,
  get: function () {
    return destroy_fishing_boat_js_1.DestroyFishingBoat;
  }
});
var destroy_prefab_js_1 = require("./fb-action/destroy-prefab.js");
Object.defineProperty(exports, "DestroyPrefab", {
  enumerable: true,
  get: function () {
    return destroy_prefab_js_1.DestroyPrefab;
  }
});
var destroy_quest_js_1 = require("./fb-action/destroy-quest.js");
Object.defineProperty(exports, "DestroyQuest", {
  enumerable: true,
  get: function () {
    return destroy_quest_js_1.DestroyQuest;
  }
});
var destroy_quest_item_js_1 = require("./fb-action/destroy-quest-item.js");
Object.defineProperty(exports, "DestroyQuestItem", {
  enumerable: true,
  get: function () {
    return destroy_quest_item_js_1.DestroyQuestItem;
  }
});
var destroy_self_js_1 = require("./fb-action/destroy-self.js");
Object.defineProperty(exports, "DestroySelf", {
  enumerable: true,
  get: function () {
    return destroy_self_js_1.DestroySelf;
  }
});
var detect_battle_monster_on_ground_js_1 = require("./fb-action/detect-battle-monster-on-ground.js");
Object.defineProperty(exports, "DetectBattleMonsterOnGround", {
  enumerable: true,
  get: function () {
    return detect_battle_monster_on_ground_js_1.DetectBattleMonsterOnGround;
  }
});
var detect_battle_tag_js_1 = require("./fb-action/detect-battle-tag.js");
Object.defineProperty(exports, "DetectBattleTag", {
  enumerable: true,
  get: function () {
    return detect_battle_tag_js_1.DetectBattleTag;
  }
});
var detect_trigger_js_1 = require("./fb-action/detect-trigger.js");
Object.defineProperty(exports, "DetectTrigger", {
  enumerable: true,
  get: function () {
    return detect_trigger_js_1.DetectTrigger;
  }
});
var disable_alert_area_dungeon_condition_js_1 = require("./fb-action/disable-alert-area-dungeon-condition.js");
Object.defineProperty(exports, "DisableAlertAreaDungeonCondition", {
  enumerable: true,
  get: function () {
    return disable_alert_area_dungeon_condition_js_1.DisableAlertAreaDungeonCondition;
  }
});
var disable_alert_area_quest_condition_js_1 = require("./fb-action/disable-alert-area-quest-condition.js");
Object.defineProperty(exports, "DisableAlertAreaQuestCondition", {
  enumerable: true,
  get: function () {
    return disable_alert_area_quest_condition_js_1.DisableAlertAreaQuestCondition;
  }
});
var disable_all_player_operation_js_1 = require("./fb-action/disable-all-player-operation.js");
Object.defineProperty(exports, "DisableAllPlayerOperation", {
  enumerable: true,
  get: function () {
    return disable_all_player_operation_js_1.DisableAllPlayerOperation;
  }
});
var disable_camera_operation_js_1 = require("./fb-action/disable-camera-operation.js");
Object.defineProperty(exports, "DisableCameraOperation", {
  enumerable: true,
  get: function () {
    return disable_camera_operation_js_1.DisableCameraOperation;
  }
});
var disable_explore_skill_js_1 = require("./fb-action/disable-explore-skill.js");
Object.defineProperty(exports, "DisableExploreSkill", {
  enumerable: true,
  get: function () {
    return disable_explore_skill_js_1.DisableExploreSkill;
  }
});
var disable_map_mark_js_1 = require("./fb-action/disable-map-mark.js");
Object.defineProperty(exports, "DisableMapMark", {
  enumerable: true,
  get: function () {
    return disable_map_mark_js_1.DisableMapMark;
  }
});
var disable_module_player_operation_js_1 = require("./fb-action/disable-module-player-operation.js");
Object.defineProperty(exports, "DisableModulePlayerOperation", {
  enumerable: true,
  get: function () {
    return disable_module_player_operation_js_1.DisableModulePlayerOperation;
  }
});
var disable_move_operation_js_1 = require("./fb-action/disable-move-operation.js");
Object.defineProperty(exports, "DisableMoveOperation", {
  enumerable: true,
  get: function () {
    return disable_move_operation_js_1.DisableMoveOperation;
  }
});
var disable_scene_interaction_operation_js_1 = require("./fb-action/disable-scene-interaction-operation.js");
Object.defineProperty(exports, "DisableSceneInteractionOperation", {
  enumerable: true,
  get: function () {
    return disable_scene_interaction_operation_js_1.DisableSceneInteractionOperation;
  }
});
var disable_sectional_skill_operation_js_1 = require("./fb-action/disable-sectional-skill-operation.js");
Object.defineProperty(exports, "DisableSectionalSkillOperation", {
  enumerable: true,
  get: function () {
    return disable_sectional_skill_operation_js_1.DisableSectionalSkillOperation;
  }
});
var disable_skill_operation_js_1 = require("./fb-action/disable-skill-operation.js");
Object.defineProperty(exports, "DisableSkillOperation", {
  enumerable: true,
  get: function () {
    return disable_skill_operation_js_1.DisableSkillOperation;
  }
});
var disable_ui_operation_js_1 = require("./fb-action/disable-ui-operation.js");
Object.defineProperty(exports, "DisableUiOperation", {
  enumerable: true,
  get: function () {
    return disable_ui_operation_js_1.DisableUiOperation;
  }
});
var do_calculate_js_1 = require("./fb-action/do-calculate.js");
Object.defineProperty(exports, "DoCalculate", {
  enumerable: true,
  get: function () {
    return do_calculate_js_1.DoCalculate;
  }
});
var dreamless_warning_js_1 = require("./fb-action/dreamless-warning.js");
Object.defineProperty(exports, "DreamlessWarning", {
  enumerable: true,
  get: function () {
    return dreamless_warning_js_1.DreamlessWarning;
  }
});
var duration_interact_js_1 = require("./fb-action/duration-interact.js");
Object.defineProperty(exports, "DurationInteract", {
  enumerable: true,
  get: function () {
    return duration_interact_js_1.DurationInteract;
  }
});
var ease_data_js_1 = require("./fb-action/ease-data.js");
Object.defineProperty(exports, "EaseData", {
  enumerable: true,
  get: function () {
    return ease_data_js_1.EaseData;
  }
});
var effect_entity_pos2_js_1 = require("./fb-action/effect-entity-pos2.js");
Object.defineProperty(exports, "EffectEntityPos2", {
  enumerable: true,
  get: function () {
    return effect_entity_pos2_js_1.EffectEntityPos2;
  }
});
var effect_player_pos2_js_1 = require("./fb-action/effect-player-pos2.js");
Object.defineProperty(exports, "EffectPlayerPos2", {
  enumerable: true,
  get: function () {
    return effect_player_pos2_js_1.EffectPlayerPos2;
  }
});
var enable_ai_js_1 = require("./fb-action/enable-ai.js");
Object.defineProperty(exports, "EnableAI", {
  enumerable: true,
  get: function () {
    return enable_ai_js_1.EnableAI;
  }
});
var enable_actor_js_1 = require("./fb-action/enable-actor.js");
Object.defineProperty(exports, "EnableActor", {
  enumerable: true,
  get: function () {
    return enable_actor_js_1.EnableActor;
  }
});
var enable_alert_area_js_1 = require("./fb-action/enable-alert-area.js");
Object.defineProperty(exports, "EnableAlertArea", {
  enumerable: true,
  get: function () {
    return enable_alert_area_js_1.EnableAlertArea;
  }
});
var enable_alert_ui_js_1 = require("./fb-action/enable-alert-ui.js");
Object.defineProperty(exports, "EnableAlertUi", {
  enumerable: true,
  get: function () {
    return enable_alert_ui_js_1.EnableAlertUi;
  }
});
var enable_all_player_operation_js_1 = require("./fb-action/enable-all-player-operation.js");
Object.defineProperty(exports, "EnableAllPlayerOperation", {
  enumerable: true,
  get: function () {
    return enable_all_player_operation_js_1.EnableAllPlayerOperation;
  }
});
var enable_aoi_notify_js_1 = require("./fb-action/enable-aoi-notify.js");
Object.defineProperty(exports, "EnableAoiNotify", {
  enumerable: true,
  get: function () {
    return enable_aoi_notify_js_1.EnableAoiNotify;
  }
});
var enable_camera_operation_js_1 = require("./fb-action/enable-camera-operation.js");
Object.defineProperty(exports, "EnableCameraOperation", {
  enumerable: true,
  get: function () {
    return enable_camera_operation_js_1.EnableCameraOperation;
  }
});
var enable_function_js_1 = require("./fb-action/enable-function.js");
Object.defineProperty(exports, "EnableFunction", {
  enumerable: true,
  get: function () {
    return enable_function_js_1.EnableFunction;
  }
});
var enable_hostility_js_1 = require("./fb-action/enable-hostility.js");
Object.defineProperty(exports, "EnableHostility", {
  enumerable: true,
  get: function () {
    return enable_hostility_js_1.EnableHostility;
  }
});
var enable_level_play_js_1 = require("./fb-action/enable-level-play.js");
Object.defineProperty(exports, "EnableLevelPlay", {
  enumerable: true,
  get: function () {
    return enable_level_play_js_1.EnableLevelPlay;
  }
});
var enable_level_play_config_js_1 = require("./fb-action/enable-level-play-config.js");
Object.defineProperty(exports, "EnableLevelPlayConfig", {
  enumerable: true,
  get: function () {
    return enable_level_play_config_js_1.EnableLevelPlayConfig;
  }
});
var enable_move_operation_js_1 = require("./fb-action/enable-move-operation.js");
Object.defineProperty(exports, "EnableMoveOperation", {
  enumerable: true,
  get: function () {
    return enable_move_operation_js_1.EnableMoveOperation;
  }
});
var enable_nearby_tracking_js_1 = require("./fb-action/enable-nearby-tracking.js");
Object.defineProperty(exports, "EnableNearbyTracking", {
  enumerable: true,
  get: function () {
    return enable_nearby_tracking_js_1.EnableNearbyTracking;
  }
});
var enable_scene_interaction_operation_js_1 = require("./fb-action/enable-scene-interaction-operation.js");
Object.defineProperty(exports, "EnableSceneInteractionOperation", {
  enumerable: true,
  get: function () {
    return enable_scene_interaction_operation_js_1.EnableSceneInteractionOperation;
  }
});
var enable_sectional_ui_js_1 = require("./fb-action/enable-sectional-ui.js");
Object.defineProperty(exports, "EnableSectionalUi", {
  enumerable: true,
  get: function () {
    return enable_sectional_ui_js_1.EnableSectionalUi;
  }
});
var enable_skill_operation_js_1 = require("./fb-action/enable-skill-operation.js");
Object.defineProperty(exports, "EnableSkillOperation", {
  enumerable: true,
  get: function () {
    return enable_skill_operation_js_1.EnableSkillOperation;
  }
});
var enable_spline_move_model_js_1 = require("./fb-action/enable-spline-move-model.js");
Object.defineProperty(exports, "EnableSplineMoveModel", {
  enumerable: true,
  get: function () {
    return enable_spline_move_model_js_1.EnableSplineMoveModel;
  }
});
var enable_sub_level_transition_with_scene_capture_js_1 = require("./fb-action/enable-sub-level-transition-with-scene-capture.js");
Object.defineProperty(exports, "EnableSubLevelTransitionWithSceneCapture", {
  enumerable: true,
  get: function () {
    return enable_sub_level_transition_with_scene_capture_js_1.EnableSubLevelTransitionWithSceneCapture;
  }
});
var enable_system_js_1 = require("./fb-action/enable-system.js");
Object.defineProperty(exports, "EnableSystem", {
  enumerable: true,
  get: function () {
    return enable_system_js_1.EnableSystem;
  }
});
var enable_temporary_teleport_js_1 = require("./fb-action/enable-temporary-teleport.js");
Object.defineProperty(exports, "EnableTemporaryTeleport", {
  enumerable: true,
  get: function () {
    return enable_temporary_teleport_js_1.EnableTemporaryTeleport;
  }
});
var enable_ui_operation_js_1 = require("./fb-action/enable-ui-operation.js");
Object.defineProperty(exports, "EnableUiOperation", {
  enumerable: true,
  get: function () {
    return enable_ui_operation_js_1.EnableUiOperation;
  }
});
var end_flow_template_js_1 = require("./fb-action/end-flow-template.js");
Object.defineProperty(exports, "EndFlowTemplate", {
  enumerable: true,
  get: function () {
    return end_flow_template_js_1.EndFlowTemplate;
  }
});
var end_state_js_1 = require("./fb-action/end-state.js");
Object.defineProperty(exports, "EndState", {
  enumerable: true,
  get: function () {
    return end_state_js_1.EndState;
  }
});
var enter_npc_vehicle_js_1 = require("./fb-action/enter-npc-vehicle.js");
Object.defineProperty(exports, "EnterNpcVehicle", {
  enumerable: true,
  get: function () {
    return enter_npc_vehicle_js_1.EnterNpcVehicle;
  }
});
var enter_orbital_camera_js_1 = require("./fb-action/enter-orbital-camera.js");
Object.defineProperty(exports, "EnterOrbitalCamera", {
  enumerable: true,
  get: function () {
    return enter_orbital_camera_js_1.EnterOrbitalCamera;
  }
});
var enter_orbital_camera_control_by_move_js_1 = require("./fb-action/enter-orbital-camera-control-by-move.js");
Object.defineProperty(exports, "EnterOrbitalCameraControlByMove", {
  enumerable: true,
  get: function () {
    return enter_orbital_camera_control_by_move_js_1.EnterOrbitalCameraControlByMove;
  }
});
var entity_look_at_js_1 = require("./fb-action/entity-look-at.js");
Object.defineProperty(exports, "EntityLookAt", {
  enumerable: true,
  get: function () {
    return entity_look_at_js_1.EntityLookAt;
  }
});
var entity_pos2_js_1 = require("./fb-action/entity-pos2.js");
Object.defineProperty(exports, "EntityPos2", {
  enumerable: true,
  get: function () {
    return entity_pos2_js_1.EntityPos2;
  }
});
var entity_spline_move_target_js_1 = require("./fb-action/entity-spline-move-target.js");
Object.defineProperty(exports, "EntitySplineMoveTarget", {
  enumerable: true,
  get: function () {
    return entity_spline_move_target_js_1.EntitySplineMoveTarget;
  }
});
var entity_template_context_js_1 = require("./fb-action/entity-template-context.js");
Object.defineProperty(exports, "EntityTemplateContext", {
  enumerable: true,
  get: function () {
    return entity_template_context_js_1.EntityTemplateContext;
  }
});
var entity_turn_to_js_1 = require("./fb-action/entity-turn-to.js");
Object.defineProperty(exports, "EntityTurnTo", {
  enumerable: true,
  get: function () {
    return entity_turn_to_js_1.EntityTurnTo;
  }
});
var entity_var_context_js_1 = require("./fb-action/entity-var-context.js");
Object.defineProperty(exports, "EntityVarContext", {
  enumerable: true,
  get: function () {
    return entity_var_context_js_1.EntityVarContext;
  }
});
var exec_alert_system_action_js_1 = require("./fb-action/exec-alert-system-action.js");
Object.defineProperty(exports, "ExecAlertSystemAction", {
  enumerable: true,
  get: function () {
    return exec_alert_system_action_js_1.ExecAlertSystemAction;
  }
});
var exec_battle_action_js_1 = require("./fb-action/exec-battle-action.js");
Object.defineProperty(exports, "ExecBattleAction", {
  enumerable: true,
  get: function () {
    return exec_battle_action_js_1.ExecBattleAction;
  }
});
var exec_resurrection_js_1 = require("./fb-action/exec-resurrection.js");
Object.defineProperty(exports, "ExecResurrection", {
  enumerable: true,
  get: function () {
    return exec_resurrection_js_1.ExecResurrection;
  }
});
var exec_risk_harvest_effect_js_1 = require("./fb-action/exec-risk-harvest-effect.js");
Object.defineProperty(exports, "ExecRiskHarvestEffect", {
  enumerable: true,
  get: function () {
    return exec_risk_harvest_effect_js_1.ExecRiskHarvestEffect;
  }
});
var exit_dungeon_js_1 = require("./fb-action/exit-dungeon.js");
Object.defineProperty(exports, "ExitDungeon", {
  enumerable: true,
  get: function () {
    return exit_dungeon_js_1.ExitDungeon;
  }
});
var exit_orbital_camera_js_1 = require("./fb-action/exit-orbital-camera.js");
Object.defineProperty(exports, "ExitOrbitalCamera", {
  enumerable: true,
  get: function () {
    return exit_orbital_camera_js_1.ExitOrbitalCamera;
  }
});
var exit_vehicle_launch_js_1 = require("./fb-action/exit-vehicle-launch.js");
Object.defineProperty(exports, "ExitVehicleLaunch", {
  enumerable: true,
  get: function () {
    return exit_vehicle_launch_js_1.ExitVehicleLaunch;
  }
});
var exit_vehicle_stand_up_js_1 = require("./fb-action/exit-vehicle-stand-up.js");
Object.defineProperty(exports, "ExitVehicleStandUp", {
  enumerable: true,
  get: function () {
    return exit_vehicle_stand_up_js_1.ExitVehicleStandUp;
  }
});
var exit_vehicle_teleport_js_1 = require("./fb-action/exit-vehicle-teleport.js");
Object.defineProperty(exports, "ExitVehicleTeleport", {
  enumerable: true,
  get: function () {
    return exit_vehicle_teleport_js_1.ExitVehicleTeleport;
  }
});
var face_to_pos_js_1 = require("./fb-action/face-to-pos.js");
Object.defineProperty(exports, "FaceToPos", {
  enumerable: true,
  get: function () {
    return face_to_pos_js_1.FaceToPos;
  }
});
var fade_in_screen_js_1 = require("./fb-action/fade-in-screen.js");
Object.defineProperty(exports, "FadeInScreen", {
  enumerable: true,
  get: function () {
    return fade_in_screen_js_1.FadeInScreen;
  }
});
var fade_out_screen_js_1 = require("./fb-action/fade-out-screen.js");
Object.defineProperty(exports, "FadeOutScreen", {
  enumerable: true,
  get: function () {
    return fade_out_screen_js_1.FadeOutScreen;
  }
});
var failure_pose_interact_js_1 = require("./fb-action/failure-pose-interact.js");
Object.defineProperty(exports, "FailurePoseInteract", {
  enumerable: true,
  get: function () {
    return failure_pose_interact_js_1.FailurePoseInteract;
  }
});
var finish_condition_js_1 = require("./fb-action/finish-condition.js");
Object.defineProperty(exports, "FinishCondition", {
  enumerable: true,
  get: function () {
    return finish_condition_js_1.FinishCondition;
  }
});
var finish_do_interact_js_1 = require("./fb-action/finish-do-interact.js");
Object.defineProperty(exports, "FinishDoInteract", {
  enumerable: true,
  get: function () {
    return finish_do_interact_js_1.FinishDoInteract;
  }
});
var finish_dungeon_js_1 = require("./fb-action/finish-dungeon.js");
Object.defineProperty(exports, "FinishDungeon", {
  enumerable: true,
  get: function () {
    return finish_dungeon_js_1.FinishDungeon;
  }
});
var finish_state_js_1 = require("./fb-action/finish-state.js");
Object.defineProperty(exports, "FinishState", {
  enumerable: true,
  get: function () {
    return finish_state_js_1.FinishState;
  }
});
var finish_talk_js_1 = require("./fb-action/finish-talk.js");
Object.defineProperty(exports, "FinishTalk", {
  enumerable: true,
  get: function () {
    return finish_talk_js_1.FinishTalk;
  }
});
var fire_bullet_js_1 = require("./fb-action/fire-bullet.js");
Object.defineProperty(exports, "FireBullet", {
  enumerable: true,
  get: function () {
    return fire_bullet_js_1.FireBullet;
  }
});
var fire_bullet_effect_js_1 = require("./fb-action/fire-bullet-effect.js");
Object.defineProperty(exports, "FireBulletEffect", {
  enumerable: true,
  get: function () {
    return fire_bullet_effect_js_1.FireBulletEffect;
  }
});
var fire_bullet_forward_front_js_1 = require("./fb-action/fire-bullet-forward-front.js");
Object.defineProperty(exports, "FireBulletForwardFront", {
  enumerable: true,
  get: function () {
    return fire_bullet_forward_front_js_1.FireBulletForwardFront;
  }
});
var fire_bullet_track_position_js_1 = require("./fb-action/fire-bullet-track-position.js");
Object.defineProperty(exports, "FireBulletTrackPosition", {
  enumerable: true,
  get: function () {
    return fire_bullet_track_position_js_1.FireBulletTrackPosition;
  }
});
var fire_bullet_track_target_js_1 = require("./fb-action/fire-bullet-track-target.js");
Object.defineProperty(exports, "FireBulletTrackTarget", {
  enumerable: true,
  get: function () {
    return fire_bullet_track_target_js_1.FireBulletTrackTarget;
  }
});
var fishing_boat_vehicle_js_1 = require("./fb-action/fishing-boat-vehicle.js");
Object.defineProperty(exports, "FishingBoatVehicle", {
  enumerable: true,
  get: function () {
    return fishing_boat_vehicle_js_1.FishingBoatVehicle;
  }
});
var fishing_roulette_js_1 = require("./fb-action/fishing-roulette.js");
Object.defineProperty(exports, "FishingRoulette", {
  enumerable: true,
  get: function () {
    return fishing_roulette_js_1.FishingRoulette;
  }
});
var fix_foundation_relation_js_1 = require("./fb-action/fix-foundation-relation.js");
Object.defineProperty(exports, "FixFoundationRelation", {
  enumerable: true,
  get: function () {
    return fix_foundation_relation_js_1.FixFoundationRelation;
  }
});
var fix_show_target_range_js_1 = require("./fb-action/fix-show-target-range.js");
Object.defineProperty(exports, "FixShowTargetRange", {
  enumerable: true,
  get: function () {
    return fix_show_target_range_js_1.FixShowTargetRange;
  }
});
var fix_tele_controller_pos_js_1 = require("./fb-action/fix-tele-controller-pos.js");
Object.defineProperty(exports, "FixTeleControllerPos", {
  enumerable: true,
  get: function () {
    return fix_tele_controller_pos_js_1.FixTeleControllerPos;
  }
});
var fixed_pos_js_1 = require("./fb-action/fixed-pos.js");
Object.defineProperty(exports, "FixedPos", {
  enumerable: true,
  get: function () {
    return fixed_pos_js_1.FixedPos;
  }
});
var fixed_time_js_1 = require("./fb-action/fixed-time.js");
Object.defineProperty(exports, "FixedTime", {
  enumerable: true,
  get: function () {
    return fixed_time_js_1.FixedTime;
  }
});
var floor_settings_js_1 = require("./fb-action/floor-settings.js");
Object.defineProperty(exports, "FloorSettings", {
  enumerable: true,
  get: function () {
    return floor_settings_js_1.FloorSettings;
  }
});
var flow_actor_index_data_js_1 = require("./fb-action/flow-actor-index-data.js");
Object.defineProperty(exports, "FlowActorIndexData", {
  enumerable: true,
  get: function () {
    return flow_actor_index_data_js_1.FlowActorIndexData;
  }
});
var flow_actor_unit_js_1 = require("./fb-action/flow-actor-unit.js");
Object.defineProperty(exports, "FlowActorUnit", {
  enumerable: true,
  get: function () {
    return flow_actor_unit_js_1.FlowActorUnit;
  }
});
var flow_index_js_1 = require("./fb-action/flow-index.js");
Object.defineProperty(exports, "FlowIndex", {
  enumerable: true,
  get: function () {
    return flow_index_js_1.FlowIndex;
  }
});
var flow_info_js_1 = require("./fb-action/flow-info.js");
Object.defineProperty(exports, "FlowInfo", {
  enumerable: true,
  get: function () {
    return flow_info_js_1.FlowInfo;
  }
});
var flow_template_mode_js_1 = require("./fb-action/flow-template-mode.js");
Object.defineProperty(exports, "FlowTemplateMode", {
  enumerable: true,
  get: function () {
    return flow_template_mode_js_1.FlowTemplateMode;
  }
});
var focus_on_map_mark_js_1 = require("./fb-action/focus-on-map-mark.js");
Object.defineProperty(exports, "FocusOnMapMark", {
  enumerable: true,
  get: function () {
    return focus_on_map_mark_js_1.FocusOnMapMark;
  }
});
var force_occupations_js_1 = require("./fb-action/force-occupations.js");
Object.defineProperty(exports, "ForceOccupations", {
  enumerable: true,
  get: function () {
    return force_occupations_js_1.ForceOccupations;
  }
});
var gameplay_pose1_interact_js_1 = require("./fb-action/gameplay-pose1-interact.js");
Object.defineProperty(exports, "GameplayPose1Interact", {
  enumerable: true,
  get: function () {
    return gameplay_pose1_interact_js_1.GameplayPose1Interact;
  }
});
var gameplay_pose2_interact_js_1 = require("./fb-action/gameplay-pose2-interact.js");
Object.defineProperty(exports, "GameplayPose2Interact", {
  enumerable: true,
  get: function () {
    return gameplay_pose2_interact_js_1.GameplayPose2Interact;
  }
});
var gameplay_pose3_interact_js_1 = require("./fb-action/gameplay-pose3-interact.js");
Object.defineProperty(exports, "GameplayPose3Interact", {
  enumerable: true,
  get: function () {
    return gameplay_pose3_interact_js_1.GameplayPose3Interact;
  }
});
var get_item_js_1 = require("./fb-action/get-item.js");
Object.defineProperty(exports, "GetItem", {
  enumerable: true,
  get: function () {
    return get_item_js_1.GetItem;
  }
});
var get_reward_by_interact_js_1 = require("./fb-action/get-reward-by-interact.js");
Object.defineProperty(exports, "GetRewardByInteract", {
  enumerable: true,
  get: function () {
    return get_reward_by_interact_js_1.GetRewardByInteract;
  }
});
var get_up_js_1 = require("./fb-action/get-up.js");
Object.defineProperty(exports, "GetUp", {
  enumerable: true,
  get: function () {
    return get_up_js_1.GetUp;
  }
});
var glide_js_1 = require("./fb-action/glide.js");
Object.defineProperty(exports, "Glide", {
  enumerable: true,
  get: function () {
    return glide_js_1.Glide;
  }
});
var gravity_flip_fixed_pos_js_1 = require("./fb-action/gravity-flip-fixed-pos.js");
Object.defineProperty(exports, "GravityFlipFixedPos", {
  enumerable: true,
  get: function () {
    return gravity_flip_fixed_pos_js_1.GravityFlipFixedPos;
  }
});
var guest_operate_ui_animation_js_1 = require("./fb-action/guest-operate-ui-animation.js");
Object.defineProperty(exports, "GuestOperateUiAnimation", {
  enumerable: true,
  get: function () {
    return guest_operate_ui_animation_js_1.GuestOperateUiAnimation;
  }
});
var guide_trigger_js_1 = require("./fb-action/guide-trigger.js");
Object.defineProperty(exports, "GuideTrigger", {
  enumerable: true,
  get: function () {
    return guide_trigger_js_1.GuideTrigger;
  }
});
var head_style_monster_display_js_1 = require("./fb-action/head-style-monster-display.js");
Object.defineProperty(exports, "HeadStyleMonsterDisplay", {
  enumerable: true,
  get: function () {
    return head_style_monster_display_js_1.HeadStyleMonsterDisplay;
  }
});
var head_style_normal_js_1 = require("./fb-action/head-style-normal.js");
Object.defineProperty(exports, "HeadStyleNormal", {
  enumerable: true,
  get: function () {
    return head_style_normal_js_1.HeadStyleNormal;
  }
});
var head_style_voice_only_js_1 = require("./fb-action/head-style-voice-only.js");
Object.defineProperty(exports, "HeadStyleVoiceOnly", {
  enumerable: true,
  get: function () {
    return head_style_voice_only_js_1.HeadStyleVoiceOnly;
  }
});
var head_style_warning_js_1 = require("./fb-action/head-style-warning.js");
Object.defineProperty(exports, "HeadStyleWarning", {
  enumerable: true,
  get: function () {
    return head_style_warning_js_1.HeadStyleWarning;
  }
});
var head_style_weak_signal_js_1 = require("./fb-action/head-style-weak-signal.js");
Object.defineProperty(exports, "HeadStyleWeakSignal", {
  enumerable: true,
  get: function () {
    return head_style_weak_signal_js_1.HeadStyleWeakSignal;
  }
});
var hide_by_range_in_flow_js_1 = require("./fb-action/hide-by-range-in-flow.js");
Object.defineProperty(exports, "HideByRangeInFlow", {
  enumerable: true,
  get: function () {
    return hide_by_range_in_flow_js_1.HideByRangeInFlow;
  }
});
var hide_group_js_1 = require("./fb-action/hide-group.js");
Object.defineProperty(exports, "HideGroup", {
  enumerable: true,
  get: function () {
    return hide_group_js_1.HideGroup;
  }
});
var hide_highlight_explore_skill_icon_js_1 = require("./fb-action/hide-highlight-explore-skill-icon.js");
Object.defineProperty(exports, "HideHighlightExploreSkillIcon", {
  enumerable: true,
  get: function () {
    return hide_highlight_explore_skill_icon_js_1.HideHighlightExploreSkillIcon;
  }
});
var hide_map_mark_js_1 = require("./fb-action/hide-map-mark.js");
Object.defineProperty(exports, "HideMapMark", {
  enumerable: true,
  get: function () {
    return hide_map_mark_js_1.HideMapMark;
  }
});
var hide_specific_entities_js_1 = require("./fb-action/hide-specific-entities.js");
Object.defineProperty(exports, "HideSpecificEntities", {
  enumerable: true,
  get: function () {
    return hide_specific_entities_js_1.HideSpecificEntities;
  }
});
var hide_specify_entity_group_js_1 = require("./fb-action/hide-specify-entity-group.js");
Object.defineProperty(exports, "HideSpecifyEntityGroup", {
  enumerable: true,
  get: function () {
    return hide_specify_entity_group_js_1.HideSpecifyEntityGroup;
  }
});
var hide_target_range_js_1 = require("./fb-action/hide-target-range.js");
Object.defineProperty(exports, "HideTargetRange", {
  enumerable: true,
  get: function () {
    return hide_target_range_js_1.HideTargetRange;
  }
});
var hide_world_entity_and_level_play_js_1 = require("./fb-action/hide-world-entity-and-level-play.js");
Object.defineProperty(exports, "HideWorldEntityAndLevelPlay", {
  enumerable: true,
  get: function () {
    return hide_world_entity_and_level_play_js_1.HideWorldEntityAndLevelPlay;
  }
});
var hide_world_entity_and_level_play_group_js_1 = require("./fb-action/hide-world-entity-and-level-play-group.js");
Object.defineProperty(exports, "HideWorldEntityAndLevelPlayGroup", {
  enumerable: true,
  get: function () {
    return hide_world_entity_and_level_play_group_js_1.HideWorldEntityAndLevelPlayGroup;
  }
});
var hide_world_monster_and_monster_treasure_js_1 = require("./fb-action/hide-world-monster-and-monster-treasure.js");
Object.defineProperty(exports, "HideWorldMonsterAndMonsterTreasure", {
  enumerable: true,
  get: function () {
    return hide_world_monster_and_monster_treasure_js_1.HideWorldMonsterAndMonsterTreasure;
  }
});
var hide_world_monster_and_monster_treasure_group_js_1 = require("./fb-action/hide-world-monster-and-monster-treasure-group.js");
Object.defineProperty(exports, "HideWorldMonsterAndMonsterTreasureGroup", {
  enumerable: true,
  get: function () {
    return hide_world_monster_and_monster_treasure_group_js_1.HideWorldMonsterAndMonsterTreasureGroup;
  }
});
var hook_lock_interact_js_1 = require("./fb-action/hook-lock-interact.js");
Object.defineProperty(exports, "HookLockInteract", {
  enumerable: true,
  get: function () {
    return hook_lock_interact_js_1.HookLockInteract;
  }
});
var icenter_text_fade_out_js_1 = require("./fb-action/icenter-text-fade-out.js");
Object.defineProperty(exports, "ICenterTextFadeOut", {
  enumerable: true,
  get: function () {
    return icenter_text_fade_out_js_1.ICenterTextFadeOut;
  }
});
var icenter_text_show_all_js_1 = require("./fb-action/icenter-text-show-all.js");
Object.defineProperty(exports, "ICenterTextShowAll", {
  enumerable: true,
  get: function () {
    return icenter_text_show_all_js_1.ICenterTextShowAll;
  }
});
var icenter_text_type_writer_js_1 = require("./fb-action/icenter-text-type-writer.js");
Object.defineProperty(exports, "ICenterTextTypeWriter", {
  enumerable: true,
  get: function () {
    return icenter_text_type_writer_js_1.ICenterTextTypeWriter;
  }
});
var interact_js_1 = require("./fb-action/interact.js");
Object.defineProperty(exports, "Interact", {
  enumerable: true,
  get: function () {
    return interact_js_1.Interact;
  }
});
var interact_actions_js_1 = require("./fb-action/interact-actions.js");
Object.defineProperty(exports, "InteractActions", {
  enumerable: true,
  get: function () {
    return interact_actions_js_1.InteractActions;
  }
});
var interact_flow_js_1 = require("./fb-action/interact-flow.js");
Object.defineProperty(exports, "InteractFlow", {
  enumerable: true,
  get: function () {
    return interact_flow_js_1.InteractFlow;
  }
});
var interact_option_js_1 = require("./fb-action/interact-option.js");
Object.defineProperty(exports, "InteractOption", {
  enumerable: true,
  get: function () {
    return interact_option_js_1.InteractOption;
  }
});
var interlude_actions_js_1 = require("./fb-action/interlude-actions.js");
Object.defineProperty(exports, "InterludeActions", {
  enumerable: true,
  get: function () {
    return interlude_actions_js_1.InterludeActions;
  }
});
var invoke_js_1 = require("./fb-action/invoke.js");
Object.defineProperty(exports, "Invoke", {
  enumerable: true,
  get: function () {
    return invoke_js_1.Invoke;
  }
});
var item_data_js_1 = require("./fb-action/item-data.js");
Object.defineProperty(exports, "ItemData", {
  enumerable: true,
  get: function () {
    return item_data_js_1.ItemData;
  }
});
var item_foundation_match_js_1 = require("./fb-action/item-foundation-match.js");
Object.defineProperty(exports, "ItemFoundationMatch", {
  enumerable: true,
  get: function () {
    return item_foundation_match_js_1.ItemFoundationMatch;
  }
});
var item_get_ui_config_special_quest_js_1 = require("./fb-action/item-get-ui-config-special-quest.js");
Object.defineProperty(exports, "ItemGetUiConfigSpecialQuest", {
  enumerable: true,
  get: function () {
    return item_get_ui_config_special_quest_js_1.ItemGetUiConfigSpecialQuest;
  }
});
var jigsaw_config_js_1 = require("./fb-action/jigsaw-config.js");
Object.defineProperty(exports, "JigsawConfig", {
  enumerable: true,
  get: function () {
    return jigsaw_config_js_1.JigsawConfig;
  }
});
var jigsaw_item_entity_js_1 = require("./fb-action/jigsaw-item-entity.js");
Object.defineProperty(exports, "JigsawItemEntity", {
  enumerable: true,
  get: function () {
    return jigsaw_item_entity_js_1.JigsawItemEntity;
  }
});
var jigsaw_piece_js_1 = require("./fb-action/jigsaw-piece.js");
Object.defineProperty(exports, "JigsawPiece", {
  enumerable: true,
  get: function () {
    return jigsaw_piece_js_1.JigsawPiece;
  }
});
var jump_talk_js_1 = require("./fb-action/jump-talk.js");
Object.defineProperty(exports, "JumpTalk", {
  enumerable: true,
  get: function () {
    return jump_talk_js_1.JumpTalk;
  }
});
var kite_hook_interact_js_1 = require("./fb-action/kite-hook-interact.js");
Object.defineProperty(exports, "KiteHookInteract", {
  enumerable: true,
  get: function () {
    return kite_hook_interact_js_1.KiteHookInteract;
  }
});
var leisure_interact_js_1 = require("./fb-action/leisure-interact.js");
Object.defineProperty(exports, "LeisureInteract", {
  enumerable: true,
  get: function () {
    return leisure_interact_js_1.LeisureInteract;
  }
});
var level_play_var_context_js_1 = require("./fb-action/level-play-var-context.js");
Object.defineProperty(exports, "LevelPlayVarContext", {
  enumerable: true,
  get: function () {
    return level_play_var_context_js_1.LevelPlayVarContext;
  }
});
var life_point_js_1 = require("./fb-action/life-point.js");
Object.defineProperty(exports, "LifePoint", {
  enumerable: true,
  get: function () {
    return life_point_js_1.LifePoint;
  }
});
var life_point_color_board_js_1 = require("./fb-action/life-point-color-board.js");
Object.defineProperty(exports, "LifePointColorBoard", {
  enumerable: true,
  get: function () {
    return life_point_color_board_js_1.LifePointColorBoard;
  }
});
var life_point_max_step_reward_rule_item_js_1 = require("./fb-action/life-point-max-step-reward-rule-item.js");
Object.defineProperty(exports, "LifePointMaxStepRewardRuleItem", {
  enumerable: true,
  get: function () {
    return life_point_max_step_reward_rule_item_js_1.LifePointMaxStepRewardRuleItem;
  }
});
var limit_player_action_js_1 = require("./fb-action/limit-player-action.js");
Object.defineProperty(exports, "LimitPlayerAction", {
  enumerable: true,
  get: function () {
    return limit_player_action_js_1.LimitPlayerAction;
  }
});
var limit_player_block_all_js_1 = require("./fb-action/limit-player-block-all.js");
Object.defineProperty(exports, "LimitPlayerBlockAll", {
  enumerable: true,
  get: function () {
    return limit_player_block_all_js_1.LimitPlayerBlockAll;
  }
});
var limit_player_camera_js_1 = require("./fb-action/limit-player-camera.js");
Object.defineProperty(exports, "LimitPlayerCamera", {
  enumerable: true,
  get: function () {
    return limit_player_camera_js_1.LimitPlayerCamera;
  }
});
var limit_player_mouse_js_1 = require("./fb-action/limit-player-mouse.js");
Object.defineProperty(exports, "LimitPlayerMouse", {
  enumerable: true,
  get: function () {
    return limit_player_mouse_js_1.LimitPlayerMouse;
  }
});
var limit_player_move_js_1 = require("./fb-action/limit-player-move.js");
Object.defineProperty(exports, "LimitPlayerMove", {
  enumerable: true,
  get: function () {
    return limit_player_move_js_1.LimitPlayerMove;
  }
});
var limit_player_move_new_js_1 = require("./fb-action/limit-player-move-new.js");
Object.defineProperty(exports, "LimitPlayerMoveNew", {
  enumerable: true,
  get: function () {
    return limit_player_move_new_js_1.LimitPlayerMoveNew;
  }
});
var limit_player_operation_js_1 = require("./fb-action/limit-player-operation.js");
Object.defineProperty(exports, "LimitPlayerOperation", {
  enumerable: true,
  get: function () {
    return limit_player_operation_js_1.LimitPlayerOperation;
  }
});
var limit_player_ui_js_1 = require("./fb-action/limit-player-ui.js");
Object.defineProperty(exports, "LimitPlayerUI", {
  enumerable: true,
  get: function () {
    return limit_player_ui_js_1.LimitPlayerUI;
  }
});
var linear_over_range_camera_shake_js_1 = require("./fb-action/linear-over-range-camera-shake.js");
Object.defineProperty(exports, "LinearOverRangeCameraShake", {
  enumerable: true,
  get: function () {
    return linear_over_range_camera_shake_js_1.LinearOverRangeCameraShake;
  }
});
var lock_entity_js_1 = require("./fb-action/lock-entity.js");
Object.defineProperty(exports, "LockEntity", {
  enumerable: true,
  get: function () {
    return lock_entity_js_1.LockEntity;
  }
});
var log_js_1 = require("./fb-action/log.js");
Object.defineProperty(exports, "Log", {
  enumerable: true,
  get: function () {
    return log_js_1.Log;
  }
});
var manipulate_js_1 = require("./fb-action/manipulate.js");
Object.defineProperty(exports, "Manipulate", {
  enumerable: true,
  get: function () {
    return manipulate_js_1.Manipulate;
  }
});
var manual_occupations_js_1 = require("./fb-action/manual-occupations.js");
Object.defineProperty(exports, "ManualOccupations", {
  enumerable: true,
  get: function () {
    return manual_occupations_js_1.ManualOccupations;
  }
});
var mask_transition_js_1 = require("./fb-action/mask-transition.js");
Object.defineProperty(exports, "MaskTransition", {
  enumerable: true,
  get: function () {
    return mask_transition_js_1.MaskTransition;
  }
});
var max_alert_value_js_1 = require("./fb-action/max-alert-value.js");
Object.defineProperty(exports, "MaxAlertValue", {
  enumerable: true,
  get: function () {
    return max_alert_value_js_1.MaxAlertValue;
  }
});
var min_alert_value_js_1 = require("./fb-action/min-alert-value.js");
Object.defineProperty(exports, "MinAlertValue", {
  enumerable: true,
  get: function () {
    return min_alert_value_js_1.MinAlertValue;
  }
});
var modify_actor_material_js_1 = require("./fb-action/modify-actor-material.js");
Object.defineProperty(exports, "ModifyActorMaterial", {
  enumerable: true,
  get: function () {
    return modify_actor_material_js_1.ModifyActorMaterial;
  }
});
var modify_alert_value_js_1 = require("./fb-action/modify-alert-value.js");
Object.defineProperty(exports, "ModifyAlertValue", {
  enumerable: true,
  get: function () {
    return modify_alert_value_js_1.ModifyAlertValue;
  }
});
var modify_scene_item_attribute_tag_js_1 = require("./fb-action/modify-scene-item-attribute-tag.js");
Object.defineProperty(exports, "ModifySceneItemAttributeTag", {
  enumerable: true,
  get: function () {
    return modify_scene_item_attribute_tag_js_1.ModifySceneItemAttributeTag;
  }
});
var modify_self_scene_item_attribute_tag_js_1 = require("./fb-action/modify-self-scene-item-attribute-tag.js");
Object.defineProperty(exports, "ModifySelfSceneItemAttributeTag", {
  enumerable: true,
  get: function () {
    return modify_self_scene_item_attribute_tag_js_1.ModifySelfSceneItemAttributeTag;
  }
});
var modify_target_scene_item_attribute_tag_js_1 = require("./fb-action/modify-target-scene-item-attribute-tag.js");
Object.defineProperty(exports, "ModifyTargetSceneItemAttributeTag", {
  enumerable: true,
  get: function () {
    return modify_target_scene_item_attribute_tag_js_1.ModifyTargetSceneItemAttributeTag;
  }
});
var montage_asset_js_1 = require("./fb-action/montage-asset.js");
Object.defineProperty(exports, "MontageAsset", {
  enumerable: true,
  get: function () {
    return montage_asset_js_1.MontageAsset;
  }
});
var montage_data_js_1 = require("./fb-action/montage-data.js");
Object.defineProperty(exports, "MontageData", {
  enumerable: true,
  get: function () {
    return montage_data_js_1.MontageData;
  }
});
var montage_id_js_1 = require("./fb-action/montage-id.js");
Object.defineProperty(exports, "MontageId", {
  enumerable: true,
  get: function () {
    return montage_id_js_1.MontageId;
  }
});
var montage_param_js_1 = require("./fb-action/montage-param.js");
Object.defineProperty(exports, "MontageParam", {
  enumerable: true,
  get: function () {
    return montage_param_js_1.MontageParam;
  }
});
var montage_registered_js_1 = require("./fb-action/montage-registered.js");
Object.defineProperty(exports, "MontageRegistered", {
  enumerable: true,
  get: function () {
    return montage_registered_js_1.MontageRegistered;
  }
});
var morse_code_js_1 = require("./fb-action/morse-code.js");
Object.defineProperty(exports, "MorseCode", {
  enumerable: true,
  get: function () {
    return morse_code_js_1.MorseCode;
  }
});
var move_jigsaw_item_js_1 = require("./fb-action/move-jigsaw-item.js");
Object.defineProperty(exports, "MoveJigsawItem", {
  enumerable: true,
  get: function () {
    return move_jigsaw_item_js_1.MoveJigsawItem;
  }
});
var move_scene_item_js_1 = require("./fb-action/move-scene-item.js");
Object.defineProperty(exports, "MoveSceneItem", {
  enumerable: true,
  get: function () {
    return move_scene_item_js_1.MoveSceneItem;
  }
});
var move_to_point_js_1 = require("./fb-action/move-to-point.js");
Object.defineProperty(exports, "MoveToPoint", {
  enumerable: true,
  get: function () {
    return move_to_point_js_1.MoveToPoint;
  }
});
var move_to_pos_a_js_1 = require("./fb-action/move-to-pos-a.js");
Object.defineProperty(exports, "MoveToPosA", {
  enumerable: true,
  get: function () {
    return move_to_pos_a_js_1.MoveToPosA;
  }
});
var move_to_relative_position_js_1 = require("./fb-action/move-to-relative-position.js");
Object.defineProperty(exports, "MoveToRelativePosition", {
  enumerable: true,
  get: function () {
    return move_to_relative_position_js_1.MoveToRelativePosition;
  }
});
var move_with_spline_js_1 = require("./fb-action/move-with-spline.js");
Object.defineProperty(exports, "MoveWithSpline", {
  enumerable: true,
  get: function () {
    return move_with_spline_js_1.MoveWithSpline;
  }
});
var movie_background_fade_data_js_1 = require("./fb-action/movie-background-fade-data.js");
Object.defineProperty(exports, "MovieBackgroundFadeData", {
  enumerable: true,
  get: function () {
    return movie_background_fade_data_js_1.MovieBackgroundFadeData;
  }
});
var mowing_tower_goto_next_floor_js_1 = require("./fb-action/mowing-tower-goto-next-floor.js");
Object.defineProperty(exports, "MowingTowerGotoNextFloor", {
  enumerable: true,
  get: function () {
    return mowing_tower_goto_next_floor_js_1.MowingTowerGotoNextFloor;
  }
});
var mp4_background_color_js_1 = require("./fb-action/mp4-background-color.js");
Object.defineProperty(exports, "Mp4BackgroundColor", {
  enumerable: true,
  get: function () {
    return mp4_background_color_js_1.Mp4BackgroundColor;
  }
});
var nearest_entity_js_1 = require("./fb-action/nearest-entity.js");
Object.defineProperty(exports, "NearestEntity", {
  enumerable: true,
  get: function () {
    return nearest_entity_js_1.NearestEntity;
  }
});
var new_move_with_spline_js_1 = require("./fb-action/new-move-with-spline.js");
Object.defineProperty(exports, "NewMoveWithSpline", {
  enumerable: true,
  get: function () {
    return new_move_with_spline_js_1.NewMoveWithSpline;
  }
});
var notify_monster_perception_js_1 = require("./fb-action/notify-monster-perception.js");
Object.defineProperty(exports, "NotifyMonsterPerception", {
  enumerable: true,
  get: function () {
    return notify_monster_perception_js_1.NotifyMonsterPerception;
  }
});
var notify_monster_play_standby_tags_js_1 = require("./fb-action/notify-monster-play-standby-tags.js");
Object.defineProperty(exports, "NotifyMonsterPlayStandbyTags", {
  enumerable: true,
  get: function () {
    return notify_monster_play_standby_tags_js_1.NotifyMonsterPlayStandbyTags;
  }
});
var npc_follow_config_js_1 = require("./fb-action/npc-follow-config.js");
Object.defineProperty(exports, "NpcFollowConfig", {
  enumerable: true,
  get: function () {
    return npc_follow_config_js_1.NpcFollowConfig;
  }
});
var npc_leisure_interact_js_1 = require("./fb-action/npc-leisure-interact.js");
Object.defineProperty(exports, "NpcLeisureInteract", {
  enumerable: true,
  get: function () {
    return npc_leisure_interact_js_1.NpcLeisureInteract;
  }
});
var npc_new_spline_move_target_js_1 = require("./fb-action/npc-new-spline-move-target.js");
Object.defineProperty(exports, "NpcNewSplineMoveTarget", {
  enumerable: true,
  get: function () {
    return npc_new_spline_move_target_js_1.NpcNewSplineMoveTarget;
  }
});
var npc_sit_down_js_1 = require("./fb-action/npc-sit-down.js");
Object.defineProperty(exports, "NpcSitDown", {
  enumerable: true,
  get: function () {
    return npc_sit_down_js_1.NpcSitDown;
  }
});
var number_var_js_1 = require("./fb-action/number-var.js");
Object.defineProperty(exports, "NumberVar", {
  enumerable: true,
  get: function () {
    return number_var_js_1.NumberVar;
  }
});
var open_air_wall_js_1 = require("./fb-action/open-air-wall.js");
Object.defineProperty(exports, "OpenAirWall", {
  enumerable: true,
  get: function () {
    return open_air_wall_js_1.OpenAirWall;
  }
});
var open_confirm_box_with_return_js_1 = require("./fb-action/open-confirm-box-with-return.js");
Object.defineProperty(exports, "OpenConfirmBoxWithReturn", {
  enumerable: true,
  get: function () {
    return open_confirm_box_with_return_js_1.OpenConfirmBoxWithReturn;
  }
});
var open_fishing_item_delivery_with_return_js_1 = require("./fb-action/open-fishing-item-delivery-with-return.js");
Object.defineProperty(exports, "OpenFishingItemDeliveryWithReturn", {
  enumerable: true,
  get: function () {
    return open_fishing_item_delivery_with_return_js_1.OpenFishingItemDeliveryWithReturn;
  }
});
var open_global_time_scale_js_1 = require("./fb-action/open-global-time-scale.js");
Object.defineProperty(exports, "OpenGlobalTimeScale", {
  enumerable: true,
  get: function () {
    return open_global_time_scale_js_1.OpenGlobalTimeScale;
  }
});
var open_gravity_js_1 = require("./fb-action/open-gravity.js");
Object.defineProperty(exports, "OpenGravity", {
  enumerable: true,
  get: function () {
    return open_gravity_js_1.OpenGravity;
  }
});
var open_level_qte_js_1 = require("./fb-action/open-level-qte.js");
Object.defineProperty(exports, "OpenLevelQte", {
  enumerable: true,
  get: function () {
    return open_level_qte_js_1.OpenLevelQte;
  }
});
var open_panel_qte_qte_js_1 = require("./fb-action/open-panel-qte-qte.js");
Object.defineProperty(exports, "OpenPanelQteQte", {
  enumerable: true,
  get: function () {
    return open_panel_qte_qte_js_1.OpenPanelQteQte;
  }
});
var open_qte_action_js_1 = require("./fb-action/open-qte-action.js");
Object.defineProperty(exports, "OpenQteAction", {
  enumerable: true,
  get: function () {
    return open_qte_action_js_1.OpenQteAction;
  }
});
var open_simple_gameplay_js_1 = require("./fb-action/open-simple-gameplay.js");
Object.defineProperty(exports, "OpenSimpleGameplay", {
  enumerable: true,
  get: function () {
    return open_simple_gameplay_js_1.OpenSimpleGameplay;
  }
});
var open_ski_config_js_1 = require("./fb-action/open-ski-config.js");
Object.defineProperty(exports, "OpenSkiConfig", {
  enumerable: true,
  get: function () {
    return open_ski_config_js_1.OpenSkiConfig;
  }
});
var open_soaring_challenge_result_with_return_js_1 = require("./fb-action/open-soaring-challenge-result-with-return.js");
Object.defineProperty(exports, "OpenSoaringChallengeResultWithReturn", {
  enumerable: true,
  get: function () {
    return open_soaring_challenge_result_with_return_js_1.OpenSoaringChallengeResultWithReturn;
  }
});
var open_spline_move_js_1 = require("./fb-action/open-spline-move.js");
Object.defineProperty(exports, "OpenSplineMove", {
  enumerable: true,
  get: function () {
    return open_spline_move_js_1.OpenSplineMove;
  }
});
var open_system_board_js_1 = require("./fb-action/open-system-board.js");
Object.defineProperty(exports, "OpenSystemBoard", {
  enumerable: true,
  get: function () {
    return open_system_board_js_1.OpenSystemBoard;
  }
});
var open_system_board_with_return_js_1 = require("./fb-action/open-system-board-with-return.js");
Object.defineProperty(exports, "OpenSystemBoardWithReturn", {
  enumerable: true,
  get: function () {
    return open_system_board_with_return_js_1.OpenSystemBoardWithReturn;
  }
});
var open_system_function_js_1 = require("./fb-action/open-system-function.js");
Object.defineProperty(exports, "OpenSystemFunction", {
  enumerable: true,
  get: function () {
    return open_system_function_js_1.OpenSystemFunction;
  }
});
var open_trace_spline_js_1 = require("./fb-action/open-trace-spline.js");
Object.defineProperty(exports, "OpenTraceSpline", {
  enumerable: true,
  get: function () {
    return open_trace_spline_js_1.OpenTraceSpline;
  }
});
var option_lock_tip_js_1 = require("./fb-action/option-lock-tip.js");
Object.defineProperty(exports, "OptionLockTip", {
  enumerable: true,
  get: function () {
    return option_lock_tip_js_1.OptionLockTip;
  }
});
var path_line_move_js_1 = require("./fb-action/path-line-move.js");
Object.defineProperty(exports, "PathLineMove", {
  enumerable: true,
  get: function () {
    return path_line_move_js_1.PathLineMove;
  }
});
var perception_notify_gather_to_entity_js_1 = require("./fb-action/perception-notify-gather-to-entity.js");
Object.defineProperty(exports, "PerceptionNotifyGatherToEntity", {
  enumerable: true,
  get: function () {
    return perception_notify_gather_to_entity_js_1.PerceptionNotifyGatherToEntity;
  }
});
var perception_notify_gather_to_player_js_1 = require("./fb-action/perception-notify-gather-to-player.js");
Object.defineProperty(exports, "PerceptionNotifyGatherToPlayer", {
  enumerable: true,
  get: function () {
    return perception_notify_gather_to_player_js_1.PerceptionNotifyGatherToPlayer;
  }
});
var performer_ai_move_to_js_1 = require("./fb-action/performer-ai-move-to.js");
Object.defineProperty(exports, "PerformerAiMoveTo", {
  enumerable: true,
  get: function () {
    return performer_ai_move_to_js_1.PerformerAiMoveTo;
  }
});
var performer_ai_move_to_entity_js_1 = require("./fb-action/performer-ai-move-to-entity.js");
Object.defineProperty(exports, "PerformerAiMoveToEntity", {
  enumerable: true,
  get: function () {
    return performer_ai_move_to_entity_js_1.PerformerAiMoveToEntity;
  }
});
var performer_ai_move_to_player_js_1 = require("./fb-action/performer-ai-move-to-player.js");
Object.defineProperty(exports, "PerformerAiMoveToPlayer", {
  enumerable: true,
  get: function () {
    return performer_ai_move_to_player_js_1.PerformerAiMoveToPlayer;
  }
});
var performer_ai_move_to_position_js_1 = require("./fb-action/performer-ai-move-to-position.js");
Object.defineProperty(exports, "PerformerAiMoveToPosition", {
  enumerable: true,
  get: function () {
    return performer_ai_move_to_position_js_1.PerformerAiMoveToPosition;
  }
});
var performer_ai_spline_move_js_1 = require("./fb-action/performer-ai-spline-move.js");
Object.defineProperty(exports, "PerformerAiSplineMove", {
  enumerable: true,
  get: function () {
    return performer_ai_spline_move_js_1.PerformerAiSplineMove;
  }
});
var performer_range_boundary_action_trigger_js_1 = require("./fb-action/performer-range-boundary-action-trigger.js");
Object.defineProperty(exports, "PerformerRangeBoundaryActionTrigger", {
  enumerable: true,
  get: function () {
    return performer_range_boundary_action_trigger_js_1.PerformerRangeBoundaryActionTrigger;
  }
});
var photograph_config_js_1 = require("./fb-action/photograph-config.js");
Object.defineProperty(exports, "PhotographConfig", {
  enumerable: true,
  get: function () {
    return photograph_config_js_1.PhotographConfig;
  }
});
var piece_index_js_1 = require("./fb-action/piece-index.js");
Object.defineProperty(exports, "PieceIndex", {
  enumerable: true,
  get: function () {
    return piece_index_js_1.PieceIndex;
  }
});
var play_bubble_js_1 = require("./fb-action/play-bubble.js");
Object.defineProperty(exports, "PlayBubble", {
  enumerable: true,
  get: function () {
    return play_bubble_js_1.PlayBubble;
  }
});
var play_common_effect_js_1 = require("./fb-action/play-common-effect.js");
Object.defineProperty(exports, "PlayCommonEffect", {
  enumerable: true,
  get: function () {
    return play_common_effect_js_1.PlayCommonEffect;
  }
});
var play_custom_sequence_js_1 = require("./fb-action/play-custom-sequence.js");
Object.defineProperty(exports, "PlayCustomSequence", {
  enumerable: true,
  get: function () {
    return play_custom_sequence_js_1.PlayCustomSequence;
  }
});
var play_dynamic_settlement_js_1 = require("./fb-action/play-dynamic-settlement.js");
Object.defineProperty(exports, "PlayDynamicSettlement", {
  enumerable: true,
  get: function () {
    return play_dynamic_settlement_js_1.PlayDynamicSettlement;
  }
});
var play_effect_js_1 = require("./fb-action/play-effect.js");
Object.defineProperty(exports, "PlayEffect", {
  enumerable: true,
  get: function () {
    return play_effect_js_1.PlayEffect;
  }
});
var play_flow_js_1 = require("./fb-action/play-flow.js");
Object.defineProperty(exports, "PlayFlow", {
  enumerable: true,
  get: function () {
    return play_flow_js_1.PlayFlow;
  }
});
var play_guest_cartethyia_js_1 = require("./fb-action/play-guest-cartethyia.js");
Object.defineProperty(exports, "PlayGuestCartethyia", {
  enumerable: true,
  get: function () {
    return play_guest_cartethyia_js_1.PlayGuestCartethyia;
  }
});
var play_guest_ui_animation_js_1 = require("./fb-action/play-guest-ui-animation.js");
Object.defineProperty(exports, "PlayGuestUiAnimation", {
  enumerable: true,
  get: function () {
    return play_guest_ui_animation_js_1.PlayGuestUiAnimation;
  }
});
var play_level_sequence_js_1 = require("./fb-action/play-level-sequence.js");
Object.defineProperty(exports, "PlayLevelSequence", {
  enumerable: true,
  get: function () {
    return play_level_sequence_js_1.PlayLevelSequence;
  }
});
var play_montage_js_1 = require("./fb-action/play-montage.js");
Object.defineProperty(exports, "PlayMontage", {
  enumerable: true,
  get: function () {
    return play_montage_js_1.PlayMontage;
  }
});
var play_movie_js_1 = require("./fb-action/play-movie.js");
Object.defineProperty(exports, "PlayMovie", {
  enumerable: true,
  get: function () {
    return play_movie_js_1.PlayMovie;
  }
});
var play_registered_montage_js_1 = require("./fb-action/play-registered-montage.js");
Object.defineProperty(exports, "PlayRegisteredMontage", {
  enumerable: true,
  get: function () {
    return play_registered_montage_js_1.PlayRegisteredMontage;
  }
});
var play_sequence_data_js_1 = require("./fb-action/play-sequence-data.js");
Object.defineProperty(exports, "PlaySequenceData", {
  enumerable: true,
  get: function () {
    return play_sequence_data_js_1.PlaySequenceData;
  }
});
var play_spine_animation_js_1 = require("./fb-action/play-spine-animation.js");
Object.defineProperty(exports, "PlaySpineAnimation", {
  enumerable: true,
  get: function () {
    return play_spine_animation_js_1.PlaySpineAnimation;
  }
});
var play_voice_passengers_config_js_1 = require("./fb-action/play-voice-passengers-config.js");
Object.defineProperty(exports, "PlayVoicePassengersConfig", {
  enumerable: true,
  get: function () {
    return play_voice_passengers_config_js_1.PlayVoicePassengersConfig;
  }
});
var player_entity_js_1 = require("./fb-action/player-entity.js");
Object.defineProperty(exports, "PlayerEntity", {
  enumerable: true,
  get: function () {
    return player_entity_js_1.PlayerEntity;
  }
});
var player_input_js_1 = require("./fb-action/player-input.js");
Object.defineProperty(exports, "PlayerInput", {
  enumerable: true,
  get: function () {
    return player_input_js_1.PlayerInput;
  }
});
var player_look_at_js_1 = require("./fb-action/player-look-at.js");
Object.defineProperty(exports, "PlayerLookAt", {
  enumerable: true,
  get: function () {
    return player_look_at_js_1.PlayerLookAt;
  }
});
var player_new_spline_move_target_js_1 = require("./fb-action/player-new-spline-move-target.js");
Object.defineProperty(exports, "PlayerNewSplineMoveTarget", {
  enumerable: true,
  get: function () {
    return player_new_spline_move_target_js_1.PlayerNewSplineMoveTarget;
  }
});
var player_pos2_js_1 = require("./fb-action/player-pos2.js");
Object.defineProperty(exports, "PlayerPos2", {
  enumerable: true,
  get: function () {
    return player_pos2_js_1.PlayerPos2;
  }
});
var player_spline_move_target_js_1 = require("./fb-action/player-spline-move-target.js");
Object.defineProperty(exports, "PlayerSplineMoveTarget", {
  enumerable: true,
  get: function () {
    return player_spline_move_target_js_1.PlayerSplineMoveTarget;
  }
});
var pos_a_js_1 = require("./fb-action/pos-a.js");
Object.defineProperty(exports, "PosA", {
  enumerable: true,
  get: function () {
    return pos_a_js_1.PosA;
  }
});
var pos_and_rot_js_1 = require("./fb-action/pos-and-rot.js");
Object.defineProperty(exports, "PosAndRot", {
  enumerable: true,
  get: function () {
    return pos_and_rot_js_1.PosAndRot;
  }
});
var pos_rot_js_1 = require("./fb-action/pos-rot.js");
Object.defineProperty(exports, "PosRot", {
  enumerable: true,
  get: function () {
    return pos_rot_js_1.PosRot;
  }
});
var post_ak_event_js_1 = require("./fb-action/post-ak-event.js");
Object.defineProperty(exports, "PostAkEvent", {
  enumerable: true,
  get: function () {
    return post_ak_event_js_1.PostAkEvent;
  }
});
var post_ak_event_global_js_1 = require("./fb-action/post-ak-event-global.js");
Object.defineProperty(exports, "PostAkEventGlobal", {
  enumerable: true,
  get: function () {
    return post_ak_event_global_js_1.PostAkEventGlobal;
  }
});
var post_ak_event_targeted_js_1 = require("./fb-action/post-ak-event-targeted.js");
Object.defineProperty(exports, "PostAkEventTargeted", {
  enumerable: true,
  get: function () {
    return post_ak_event_targeted_js_1.PostAkEventTargeted;
  }
});
var prefab_config_js_1 = require("./fb-action/prefab-config.js");
Object.defineProperty(exports, "PrefabConfig", {
  enumerable: true,
  get: function () {
    return prefab_config_js_1.PrefabConfig;
  }
});
var preload_action_js_1 = require("./fb-action/preload-action.js");
Object.defineProperty(exports, "PreloadAction", {
  enumerable: true,
  get: function () {
    return preload_action_js_1.PreloadAction;
  }
});
var preload_flows_js_1 = require("./fb-action/preload-flows.js");
Object.defineProperty(exports, "PreloadFlows", {
  enumerable: true,
  get: function () {
    return preload_flows_js_1.PreloadFlows;
  }
});
var preload_phantom_character_for_skill_js_1 = require("./fb-action/preload-phantom-character-for-skill.js");
Object.defineProperty(exports, "PreloadPhantomCharacterForSkill", {
  enumerable: true,
  get: function () {
    return preload_phantom_character_for_skill_js_1.PreloadPhantomCharacterForSkill;
  }
});
var preload_sub_levels_js_1 = require("./fb-action/preload-sub-levels.js");
Object.defineProperty(exports, "PreloadSubLevels", {
  enumerable: true,
  get: function () {
    return preload_sub_levels_js_1.PreloadSubLevels;
  }
});
var preload_trial_character_for_skill_js_1 = require("./fb-action/preload-trial-character-for-skill.js");
Object.defineProperty(exports, "PreloadTrialCharacterForSkill", {
  enumerable: true,
  get: function () {
    return preload_trial_character_for_skill_js_1.PreloadTrialCharacterForSkill;
  }
});
var prompt_js_1 = require("./fb-action/prompt.js");
Object.defineProperty(exports, "Prompt", {
  enumerable: true,
  get: function () {
    return prompt_js_1.Prompt;
  }
});
var prompt_quest_chapter_ui_js_1 = require("./fb-action/prompt-quest-chapter-ui.js");
Object.defineProperty(exports, "PromptQuestChapterUI", {
  enumerable: true,
  get: function () {
    return prompt_quest_chapter_ui_js_1.PromptQuestChapterUI;
  }
});
var punish_report_js_1 = require("./fb-action/punish-report.js");
Object.defineProperty(exports, "PunishReport", {
  enumerable: true,
  get: function () {
    return punish_report_js_1.PunishReport;
  }
});
var quest_var_context_js_1 = require("./fb-action/quest-var-context.js");
Object.defineProperty(exports, "QuestVarContext", {
  enumerable: true,
  get: function () {
    return quest_var_context_js_1.QuestVarContext;
  }
});
var racing_track_move_js_1 = require("./fb-action/racing-track-move.js");
Object.defineProperty(exports, "RacingTrackMove", {
  enumerable: true,
  get: function () {
    return racing_track_move_js_1.RacingTrackMove;
  }
});
var random_prefab_config_js_1 = require("./fb-action/random-prefab-config.js");
Object.defineProperty(exports, "RandomPrefabConfig", {
  enumerable: true,
  get: function () {
    return random_prefab_config_js_1.RandomPrefabConfig;
  }
});
var random_var_js_1 = require("./fb-action/random-var.js");
Object.defineProperty(exports, "RandomVar", {
  enumerable: true,
  get: function () {
    return random_var_js_1.RandomVar;
  }
});
var record_dungeon_event_js_1 = require("./fb-action/record-dungeon-event.js");
Object.defineProperty(exports, "RecordDungeonEvent", {
  enumerable: true,
  get: function () {
    return record_dungeon_event_js_1.RecordDungeonEvent;
  }
});
var record_talk_sequence_transition_js_1 = require("./fb-action/record-talk-sequence-transition.js");
Object.defineProperty(exports, "RecordTalkSequenceTransition", {
  enumerable: true,
  get: function () {
    return record_talk_sequence_transition_js_1.RecordTalkSequenceTransition;
  }
});
var record_time_stamp_type_js_1 = require("./fb-action/record-time-stamp-type.js");
Object.defineProperty(exports, "RecordTimeStampType", {
  enumerable: true,
  get: function () {
    return record_time_stamp_type_js_1.RecordTimeStampType;
  }
});
var recover_durability_js_1 = require("./fb-action/recover-durability.js");
Object.defineProperty(exports, "RecoverDurability", {
  enumerable: true,
  get: function () {
    return recover_durability_js_1.RecoverDurability;
  }
});
var reduce_time_js_1 = require("./fb-action/reduce-time.js");
Object.defineProperty(exports, "ReduceTime", {
  enumerable: true,
  get: function () {
    return reduce_time_js_1.ReduceTime;
  }
});
var remain_star_warning_js_1 = require("./fb-action/remain-star-warning.js");
Object.defineProperty(exports, "RemainStarWarning", {
  enumerable: true,
  get: function () {
    return remain_star_warning_js_1.RemainStarWarning;
  }
});
var remove_buff_from_entity_js_1 = require("./fb-action/remove-buff-from-entity.js");
Object.defineProperty(exports, "RemoveBuffFromEntity", {
  enumerable: true,
  get: function () {
    return remove_buff_from_entity_js_1.RemoveBuffFromEntity;
  }
});
var remove_buff_from_player_js_1 = require("./fb-action/remove-buff-from-player.js");
Object.defineProperty(exports, "RemoveBuffFromPlayer", {
  enumerable: true,
  get: function () {
    return remove_buff_from_player_js_1.RemoveBuffFromPlayer;
  }
});
var remove_buff_to_triggered_entity_js_1 = require("./fb-action/remove-buff-to-triggered-entity.js");
Object.defineProperty(exports, "RemoveBuffToTriggeredEntity", {
  enumerable: true,
  get: function () {
    return remove_buff_to_triggered_entity_js_1.RemoveBuffToTriggeredEntity;
  }
});
var remove_flow_interact_option_js_1 = require("./fb-action/remove-flow-interact-option.js");
Object.defineProperty(exports, "RemoveFlowInteractOption", {
  enumerable: true,
  get: function () {
    return remove_flow_interact_option_js_1.RemoveFlowInteractOption;
  }
});
var remove_guest_character_js_1 = require("./fb-action/remove-guest-character.js");
Object.defineProperty(exports, "RemoveGuestCharacter", {
  enumerable: true,
  get: function () {
    return remove_guest_character_js_1.RemoveGuestCharacter;
  }
});
var remove_preload_resource_action_js_1 = require("./fb-action/remove-preload-resource-action.js");
Object.defineProperty(exports, "RemovePreloadResourceAction", {
  enumerable: true,
  get: function () {
    return remove_preload_resource_action_js_1.RemovePreloadResourceAction;
  }
});
var remove_preload_resource_phantom_character_js_1 = require("./fb-action/remove-preload-resource-phantom-character.js");
Object.defineProperty(exports, "RemovePreloadResourcePhantomCharacter", {
  enumerable: true,
  get: function () {
    return remove_preload_resource_phantom_character_js_1.RemovePreloadResourcePhantomCharacter;
  }
});
var remove_preload_resource_trial_character_js_1 = require("./fb-action/remove-preload-resource-trial-character.js");
Object.defineProperty(exports, "RemovePreloadResourceTrialCharacter", {
  enumerable: true,
  get: function () {
    return remove_preload_resource_trial_character_js_1.RemovePreloadResourceTrialCharacter;
  }
});
var remove_trial_character_js_1 = require("./fb-action/remove-trial-character.js");
Object.defineProperty(exports, "RemoveTrialCharacter", {
  enumerable: true,
  get: function () {
    return remove_trial_character_js_1.RemoveTrialCharacter;
  }
});
var remove_trial_follow_shooter_js_1 = require("./fb-action/remove-trial-follow-shooter.js");
Object.defineProperty(exports, "RemoveTrialFollowShooter", {
  enumerable: true,
  get: function () {
    return remove_trial_follow_shooter_js_1.RemoveTrialFollowShooter;
  }
});
var renju_chess_js_1 = require("./fb-action/renju-chess.js");
Object.defineProperty(exports, "RenjuChess", {
  enumerable: true,
  get: function () {
    return renju_chess_js_1.RenjuChess;
  }
});
var reset_entity_js_1 = require("./fb-action/reset-entity.js");
Object.defineProperty(exports, "ResetEntity", {
  enumerable: true,
  get: function () {
    return reset_entity_js_1.ResetEntity;
  }
});
var reset_entity_pos_js_1 = require("./fb-action/reset-entity-pos.js");
Object.defineProperty(exports, "ResetEntityPos", {
  enumerable: true,
  get: function () {
    return reset_entity_pos_js_1.ResetEntityPos;
  }
});
var reset_focus_config_js_1 = require("./fb-action/reset-focus-config.js");
Object.defineProperty(exports, "ResetFocusConfig", {
  enumerable: true,
  get: function () {
    return reset_focus_config_js_1.ResetFocusConfig;
  }
});
var reset_level_play_js_1 = require("./fb-action/reset-level-play.js");
Object.defineProperty(exports, "ResetLevelPlay", {
  enumerable: true,
  get: function () {
    return reset_level_play_js_1.ResetLevelPlay;
  }
});
var reset_player_camera_focus_js_1 = require("./fb-action/reset-player-camera-focus.js");
Object.defineProperty(exports, "ResetPlayerCameraFocus", {
  enumerable: true,
  get: function () {
    return reset_player_camera_focus_js_1.ResetPlayerCameraFocus;
  }
});
var reset_player_focus_to_default_direction_js_1 = require("./fb-action/reset-player-focus-to-default-direction.js");
Object.defineProperty(exports, "ResetPlayerFocusToDefaultDirection", {
  enumerable: true,
  get: function () {
    return reset_player_focus_to_default_direction_js_1.ResetPlayerFocusToDefaultDirection;
  }
});
var reset_player_focus_to_fixed_direction_js_1 = require("./fb-action/reset-player-focus-to-fixed-direction.js");
Object.defineProperty(exports, "ResetPlayerFocusToFixedDirection", {
  enumerable: true,
  get: function () {
    return reset_player_focus_to_fixed_direction_js_1.ResetPlayerFocusToFixedDirection;
  }
});
var reset_tele_control_entity_js_1 = require("./fb-action/reset-tele-control-entity.js");
Object.defineProperty(exports, "ResetTeleControlEntity", {
  enumerable: true,
  get: function () {
    return reset_tele_control_entity_js_1.ResetTeleControlEntity;
  }
});
var restore_phantom_js_1 = require("./fb-action/restore-phantom.js");
Object.defineProperty(exports, "RestorePhantom", {
  enumerable: true,
  get: function () {
    return restore_phantom_js_1.RestorePhantom;
  }
});
var restore_phantom_formation_js_1 = require("./fb-action/restore-phantom-formation.js");
Object.defineProperty(exports, "RestorePhantomFormation", {
  enumerable: true,
  get: function () {
    return restore_phantom_formation_js_1.RestorePhantomFormation;
  }
});
var restore_player_camera_adjustment_js_1 = require("./fb-action/restore-player-camera-adjustment.js");
Object.defineProperty(exports, "RestorePlayerCameraAdjustment", {
  enumerable: true,
  get: function () {
    return restore_player_camera_adjustment_js_1.RestorePlayerCameraAdjustment;
  }
});
var rogue_activate_portal_js_1 = require("./fb-action/rogue-activate-portal.js");
Object.defineProperty(exports, "RogueActivatePortal", {
  enumerable: true,
  get: function () {
    return rogue_activate_portal_js_1.RogueActivatePortal;
  }
});
var rogue_goto_next_floor_js_1 = require("./fb-action/rogue-goto-next-floor.js");
Object.defineProperty(exports, "RogueGotoNextFloor", {
  enumerable: true,
  get: function () {
    return rogue_goto_next_floor_js_1.RogueGotoNextFloor;
  }
});
var rogue_prefab_config_js_1 = require("./fb-action/rogue-prefab-config.js");
Object.defineProperty(exports, "RoguePrefabConfig", {
  enumerable: true,
  get: function () {
    return rogue_prefab_config_js_1.RoguePrefabConfig;
  }
});
var rogue_receive_reward_js_1 = require("./fb-action/rogue-receive-reward.js");
Object.defineProperty(exports, "RogueReceiveReward", {
  enumerable: true,
  get: function () {
    return rogue_receive_reward_js_1.RogueReceiveReward;
  }
});
var rogue_role_select_room_js_1 = require("./fb-action/rogue-role-select-room.js");
Object.defineProperty(exports, "RogueRoleSelectRoom", {
  enumerable: true,
  get: function () {
    return rogue_role_select_room_js_1.RogueRoleSelectRoom;
  }
});
var rogue_select_room_js_1 = require("./fb-action/rogue-select-room.js");
Object.defineProperty(exports, "RogueSelectRoom", {
  enumerable: true,
  get: function () {
    return rogue_select_room_js_1.RogueSelectRoom;
  }
});
var rotator_entity_js_1 = require("./fb-action/rotator-entity.js");
Object.defineProperty(exports, "RotatorEntity", {
  enumerable: true,
  get: function () {
    return rotator_entity_js_1.RotatorEntity;
  }
});
var run_actions_js_1 = require("./fb-action/run-actions.js");
Object.defineProperty(exports, "RunActions", {
  enumerable: true,
  get: function () {
    return run_actions_js_1.RunActions;
  }
});
var safe_pos_js_1 = require("./fb-action/safe-pos.js");
Object.defineProperty(exports, "SafePos", {
  enumerable: true,
  get: function () {
    return safe_pos_js_1.SafePos;
  }
});
var scene_item_new_spline_move_target_js_1 = require("./fb-action/scene-item-new-spline-move-target.js");
Object.defineProperty(exports, "SceneItemNewSplineMoveTarget", {
  enumerable: true,
  get: function () {
    return scene_item_new_spline_move_target_js_1.SceneItemNewSplineMoveTarget;
  }
});
var self_entity_js_1 = require("./fb-action/self-entity.js");
Object.defineProperty(exports, "SelfEntity", {
  enumerable: true,
  get: function () {
    return self_entity_js_1.SelfEntity;
  }
});
var send_ai_event_js_1 = require("./fb-action/send-ai-event.js");
Object.defineProperty(exports, "SendAiEvent", {
  enumerable: true,
  get: function () {
    return send_ai_event_js_1.SendAiEvent;
  }
});
var send_npc_mail_js_1 = require("./fb-action/send-npc-mail.js");
Object.defineProperty(exports, "SendNpcMail", {
  enumerable: true,
  get: function () {
    return send_npc_mail_js_1.SendNpcMail;
  }
});
var sequence_frame_event_js_1 = require("./fb-action/sequence-frame-event.js");
Object.defineProperty(exports, "SequenceFrameEvent", {
  enumerable: true,
  get: function () {
    return sequence_frame_event_js_1.SequenceFrameEvent;
  }
});
var server_force_enable_level_play_js_1 = require("./fb-action/server-force-enable-level-play.js");
Object.defineProperty(exports, "ServerForceEnableLevelPlay", {
  enumerable: true,
  get: function () {
    return server_force_enable_level_play_js_1.ServerForceEnableLevelPlay;
  }
});
var server_set_player_pos_js_1 = require("./fb-action/server-set-player-pos.js");
Object.defineProperty(exports, "ServerSetPlayerPos", {
  enumerable: true,
  get: function () {
    return server_set_player_pos_js_1.ServerSetPlayerPos;
  }
});
var set_alert_ui_visible_js_1 = require("./fb-action/set-alert-ui-visible.js");
Object.defineProperty(exports, "SetAlertUiVisible", {
  enumerable: true,
  get: function () {
    return set_alert_ui_visible_js_1.SetAlertUiVisible;
  }
});
var set_area_state_js_1 = require("./fb-action/set-area-state.js");
Object.defineProperty(exports, "SetAreaState", {
  enumerable: true,
  get: function () {
    return set_area_state_js_1.SetAreaState;
  }
});
var set_area_time_lock_js_1 = require("./fb-action/set-area-time-lock.js");
Object.defineProperty(exports, "SetAreaTimeLock", {
  enumerable: true,
  get: function () {
    return set_area_time_lock_js_1.SetAreaTimeLock;
  }
});
var set_area_time_state_js_1 = require("./fb-action/set-area-time-state.js");
Object.defineProperty(exports, "SetAreaTimeState", {
  enumerable: true,
  get: function () {
    return set_area_time_state_js_1.SetAreaTimeState;
  }
});
var set_area_time_un_lock_js_1 = require("./fb-action/set-area-time-un-lock.js");
Object.defineProperty(exports, "SetAreaTimeUnLock", {
  enumerable: true,
  get: function () {
    return set_area_time_un_lock_js_1.SetAreaTimeUnLock;
  }
});
var set_audio_state_js_1 = require("./fb-action/set-audio-state.js");
Object.defineProperty(exports, "SetAudioState", {
  enumerable: true,
  get: function () {
    return set_audio_state_js_1.SetAudioState;
  }
});
var set_battle_state_js_1 = require("./fb-action/set-battle-state.js");
Object.defineProperty(exports, "SetBattleState", {
  enumerable: true,
  get: function () {
    return set_battle_state_js_1.SetBattleState;
  }
});
var set_battle_tag_js_1 = require("./fb-action/set-battle-tag.js");
Object.defineProperty(exports, "SetBattleTag", {
  enumerable: true,
  get: function () {
    return set_battle_tag_js_1.SetBattleTag;
  }
});
var set_battle_tag_config_js_1 = require("./fb-action/set-battle-tag-config.js");
Object.defineProperty(exports, "SetBattleTagConfig", {
  enumerable: true,
  get: function () {
    return set_battle_tag_config_js_1.SetBattleTagConfig;
  }
});
var set_battle_tags_js_1 = require("./fb-action/set-battle-tags.js");
Object.defineProperty(exports, "SetBattleTags", {
  enumerable: true,
  get: function () {
    return set_battle_tags_js_1.SetBattleTags;
  }
});
var set_behavior_is_paused_js_1 = require("./fb-action/set-behavior-is-paused.js");
Object.defineProperty(exports, "SetBehaviorIsPaused", {
  enumerable: true,
  get: function () {
    return set_behavior_is_paused_js_1.SetBehaviorIsPaused;
  }
});
var set_camera_anim_js_1 = require("./fb-action/set-camera-anim.js");
Object.defineProperty(exports, "SetCameraAnim", {
  enumerable: true,
  get: function () {
    return set_camera_anim_js_1.SetCameraAnim;
  }
});
var set_camera_mode_js_1 = require("./fb-action/set-camera-mode.js");
Object.defineProperty(exports, "SetCameraMode", {
  enumerable: true,
  get: function () {
    return set_camera_mode_js_1.SetCameraMode;
  }
});
var set_entity_client_visible_js_1 = require("./fb-action/set-entity-client-visible.js");
Object.defineProperty(exports, "SetEntityClientVisible", {
  enumerable: true,
  get: function () {
    return set_entity_client_visible_js_1.SetEntityClientVisible;
  }
});
var set_entity_client_visible_save_js_1 = require("./fb-action/set-entity-client-visible-save.js");
Object.defineProperty(exports, "SetEntityClientVisibleSave", {
  enumerable: true,
  get: function () {
    return set_entity_client_visible_save_js_1.SetEntityClientVisibleSave;
  }
});
var set_entity_pos_js_1 = require("./fb-action/set-entity-pos.js");
Object.defineProperty(exports, "SetEntityPos", {
  enumerable: true,
  get: function () {
    return set_entity_pos_js_1.SetEntityPos;
  }
});
var set_entity_tag_js_1 = require("./fb-action/set-entity-tag.js");
Object.defineProperty(exports, "SetEntityTag", {
  enumerable: true,
  get: function () {
    return set_entity_tag_js_1.SetEntityTag;
  }
});
var set_entity_visible_js_1 = require("./fb-action/set-entity-visible.js");
Object.defineProperty(exports, "SetEntityVisible", {
  enumerable: true,
  get: function () {
    return set_entity_visible_js_1.SetEntityVisible;
  }
});
var set_explore_state_js_1 = require("./fb-action/set-explore-state.js");
Object.defineProperty(exports, "SetExploreState", {
  enumerable: true,
  get: function () {
    return set_explore_state_js_1.SetExploreState;
  }
});
var set_flow_template_js_1 = require("./fb-action/set-flow-template.js");
Object.defineProperty(exports, "SetFlowTemplate", {
  enumerable: true,
  get: function () {
    return set_flow_template_js_1.SetFlowTemplate;
  }
});
var set_force_lock_js_1 = require("./fb-action/set-force-lock.js");
Object.defineProperty(exports, "SetForceLock", {
  enumerable: true,
  get: function () {
    return set_force_lock_js_1.SetForceLock;
  }
});
var set_global_time_scale_js_1 = require("./fb-action/set-global-time-scale.js");
Object.defineProperty(exports, "SetGlobalTimeScale", {
  enumerable: true,
  get: function () {
    return set_global_time_scale_js_1.SetGlobalTimeScale;
  }
});
var set_head_icon_visible_js_1 = require("./fb-action/set-head-icon-visible.js");
Object.defineProperty(exports, "SetHeadIconVisible", {
  enumerable: true,
  get: function () {
    return set_head_icon_visible_js_1.SetHeadIconVisible;
  }
});
var set_interaction_lock_state_js_1 = require("./fb-action/set-interaction-lock-state.js");
Object.defineProperty(exports, "SetInteractionLockState", {
  enumerable: true,
  get: function () {
    return set_interaction_lock_state_js_1.SetInteractionLockState;
  }
});
var set_jigsaw_foundation_js_1 = require("./fb-action/set-jigsaw-foundation.js");
Object.defineProperty(exports, "SetJigsawFoundation", {
  enumerable: true,
  get: function () {
    return set_jigsaw_foundation_js_1.SetJigsawFoundation;
  }
});
var set_jigsaw_item_js_1 = require("./fb-action/set-jigsaw-item.js");
Object.defineProperty(exports, "SetJigsawItem", {
  enumerable: true,
  get: function () {
    return set_jigsaw_item_js_1.SetJigsawItem;
  }
});
var set_monster_move_target_js_1 = require("./fb-action/set-monster-move-target.js");
Object.defineProperty(exports, "SetMonsterMoveTarget", {
  enumerable: true,
  get: function () {
    return set_monster_move_target_js_1.SetMonsterMoveTarget;
  }
});
var set_move_speed_js_1 = require("./fb-action/set-move-speed.js");
Object.defineProperty(exports, "SetMoveSpeed", {
  enumerable: true,
  get: function () {
    return set_move_speed_js_1.SetMoveSpeed;
  }
});
var set_number_var_js_1 = require("./fb-action/set-number-var.js");
Object.defineProperty(exports, "SetNumberVar", {
  enumerable: true,
  get: function () {
    return set_number_var_js_1.SetNumberVar;
  }
});
var set_piece_state_js_1 = require("./fb-action/set-piece-state.js");
Object.defineProperty(exports, "SetPieceState", {
  enumerable: true,
  get: function () {
    return set_piece_state_js_1.SetPieceState;
  }
});
var set_player_move_control_js_1 = require("./fb-action/set-player-move-control.js");
Object.defineProperty(exports, "SetPlayerMoveControl", {
  enumerable: true,
  get: function () {
    return set_player_move_control_js_1.SetPlayerMoveControl;
  }
});
var set_player_operation_restriction_js_1 = require("./fb-action/set-player-operation-restriction.js");
Object.defineProperty(exports, "SetPlayerOperationRestriction", {
  enumerable: true,
  get: function () {
    return set_player_operation_restriction_js_1.SetPlayerOperationRestriction;
  }
});
var set_player_pos_js_1 = require("./fb-action/set-player-pos.js");
Object.defineProperty(exports, "SetPlayerPos", {
  enumerable: true,
  get: function () {
    return set_player_pos_js_1.SetPlayerPos;
  }
});
var set_plot_mode_js_1 = require("./fb-action/set-plot-mode.js");
Object.defineProperty(exports, "SetPlotMode", {
  enumerable: true,
  get: function () {
    return set_plot_mode_js_1.SetPlotMode;
  }
});
var set_pos_a_js_1 = require("./fb-action/set-pos-a.js");
Object.defineProperty(exports, "SetPosA", {
  enumerable: true,
  get: function () {
    return set_pos_a_js_1.SetPosA;
  }
});
var set_region_config_js_1 = require("./fb-action/set-region-config.js");
Object.defineProperty(exports, "SetRegionConfig", {
  enumerable: true,
  get: function () {
    return set_region_config_js_1.SetRegionConfig;
  }
});
var set_region_mpc_js_1 = require("./fb-action/set-region-mpc.js");
Object.defineProperty(exports, "SetRegionMpc", {
  enumerable: true,
  get: function () {
    return set_region_mpc_js_1.SetRegionMpc;
  }
});
var set_reset_position_js_1 = require("./fb-action/set-reset-position.js");
Object.defineProperty(exports, "SetResetPosition", {
  enumerable: true,
  get: function () {
    return set_reset_position_js_1.SetResetPosition;
  }
});
var set_revive_region_js_1 = require("./fb-action/set-revive-region.js");
Object.defineProperty(exports, "SetReviveRegion", {
  enumerable: true,
  get: function () {
    return set_revive_region_js_1.SetReviveRegion;
  }
});
var set_spine_animation_js_1 = require("./fb-action/set-spine-animation.js");
Object.defineProperty(exports, "SetSpineAnimation", {
  enumerable: true,
  get: function () {
    return set_spine_animation_js_1.SetSpineAnimation;
  }
});
var set_sports_state_js_1 = require("./fb-action/set-sports-state.js");
Object.defineProperty(exports, "SetSportsState", {
  enumerable: true,
  get: function () {
    return set_sports_state_js_1.SetSportsState;
  }
});
var set_tele_control_js_1 = require("./fb-action/set-tele-control.js");
Object.defineProperty(exports, "SetTeleControl", {
  enumerable: true,
  get: function () {
    return set_tele_control_js_1.SetTeleControl;
  }
});
var set_time_js_1 = require("./fb-action/set-time.js");
Object.defineProperty(exports, "SetTime", {
  enumerable: true,
  get: function () {
    return set_time_js_1.SetTime;
  }
});
var set_time_lock_state_js_1 = require("./fb-action/set-time-lock-state.js");
Object.defineProperty(exports, "SetTimeLockState", {
  enumerable: true,
  get: function () {
    return set_time_lock_state_js_1.SetTimeLockState;
  }
});
var set_time_scale_js_1 = require("./fb-action/set-time-scale.js");
Object.defineProperty(exports, "SetTimeScale", {
  enumerable: true,
  get: function () {
    return set_time_scale_js_1.SetTimeScale;
  }
});
var set_var_js_1 = require("./fb-action/set-var.js");
Object.defineProperty(exports, "SetVar", {
  enumerable: true,
  get: function () {
    return set_var_js_1.SetVar;
  }
});
var set_weather_js_1 = require("./fb-action/set-weather.js");
Object.defineProperty(exports, "SetWeather", {
  enumerable: true,
  get: function () {
    return set_weather_js_1.SetWeather;
  }
});
var set_weather_lock_state_js_1 = require("./fb-action/set-weather-lock-state.js");
Object.defineProperty(exports, "SetWeatherLockState", {
  enumerable: true,
  get: function () {
    return set_weather_lock_state_js_1.SetWeatherLockState;
  }
});
var set_wu_yin_qu_state_js_1 = require("./fb-action/set-wu-yin-qu-state.js");
Object.defineProperty(exports, "SetWuYinQuState", {
  enumerable: true,
  get: function () {
    return set_wu_yin_qu_state_js_1.SetWuYinQuState;
  }
});
var settlement_dungeon_js_1 = require("./fb-action/settlement-dungeon.js");
Object.defineProperty(exports, "SettlementDungeon", {
  enumerable: true,
  get: function () {
    return settlement_dungeon_js_1.SettlementDungeon;
  }
});
var setup_morale_system_js_1 = require("./fb-action/setup-morale-system.js");
Object.defineProperty(exports, "SetupMoraleSystem", {
  enumerable: true,
  get: function () {
    return setup_morale_system_js_1.SetupMoraleSystem;
  }
});
var show_center_text_js_1 = require("./fb-action/show-center-text.js");
Object.defineProperty(exports, "ShowCenterText", {
  enumerable: true,
  get: function () {
    return show_center_text_js_1.ShowCenterText;
  }
});
var show_hided_group_js_1 = require("./fb-action/show-hided-group.js");
Object.defineProperty(exports, "ShowHidedGroup", {
  enumerable: true,
  get: function () {
    return show_hided_group_js_1.ShowHidedGroup;
  }
});
var show_highlight_explore_skill_icon_js_1 = require("./fb-action/show-highlight-explore-skill-icon.js");
Object.defineProperty(exports, "ShowHighlightExploreSkillIcon", {
  enumerable: true,
  get: function () {
    return show_highlight_explore_skill_icon_js_1.ShowHighlightExploreSkillIcon;
  }
});
var show_map_mark_js_1 = require("./fb-action/show-map-mark.js");
Object.defineProperty(exports, "ShowMapMark", {
  enumerable: true,
  get: function () {
    return show_map_mark_js_1.ShowMapMark;
  }
});
var show_message_js_1 = require("./fb-action/show-message.js");
Object.defineProperty(exports, "ShowMessage", {
  enumerable: true,
  get: function () {
    return show_message_js_1.ShowMessage;
  }
});
var show_specific_entities_js_1 = require("./fb-action/show-specific-entities.js");
Object.defineProperty(exports, "ShowSpecificEntities", {
  enumerable: true,
  get: function () {
    return show_specific_entities_js_1.ShowSpecificEntities;
  }
});
var show_talk_js_1 = require("./fb-action/show-talk.js");
Object.defineProperty(exports, "ShowTalk", {
  enumerable: true,
  get: function () {
    return show_talk_js_1.ShowTalk;
  }
});
var show_talk_frame_event_js_1 = require("./fb-action/show-talk-frame-event.js");
Object.defineProperty(exports, "ShowTalkFrameEvent", {
  enumerable: true,
  get: function () {
    return show_talk_frame_event_js_1.ShowTalkFrameEvent;
  }
});
var show_talk_frame_event_position_js_1 = require("./fb-action/show-talk-frame-event-position.js");
Object.defineProperty(exports, "ShowTalkFrameEventPosition", {
  enumerable: true,
  get: function () {
    return show_talk_frame_event_position_js_1.ShowTalkFrameEventPosition;
  }
});
var show_talk_outline_js_1 = require("./fb-action/show-talk-outline.js");
Object.defineProperty(exports, "ShowTalkOutline", {
  enumerable: true,
  get: function () {
    return show_talk_outline_js_1.ShowTalkOutline;
  }
});
var show_target_range_js_1 = require("./fb-action/show-target-range.js");
Object.defineProperty(exports, "ShowTargetRange", {
  enumerable: true,
  get: function () {
    return show_target_range_js_1.ShowTargetRange;
  }
});
var signal_break_gameplay_js_1 = require("./fb-action/signal-break-gameplay.js");
Object.defineProperty(exports, "SignalBreakGameplay", {
  enumerable: true,
  get: function () {
    return signal_break_gameplay_js_1.SignalBreakGameplay;
  }
});
var signal_device_js_1 = require("./fb-action/signal-device.js");
Object.defineProperty(exports, "SignalDevice", {
  enumerable: true,
  get: function () {
    return signal_device_js_1.SignalDevice;
  }
});
var signal_device2_js_1 = require("./fb-action/signal-device2.js");
Object.defineProperty(exports, "SignalDevice2", {
  enumerable: true,
  get: function () {
    return signal_device2_js_1.SignalDevice2;
  }
});
var simple_move_js_1 = require("./fb-action/simple-move.js");
Object.defineProperty(exports, "SimpleMove", {
  enumerable: true,
  get: function () {
    return simple_move_js_1.SimpleMove;
  }
});
var sit_down_js_1 = require("./fb-action/sit-down.js");
Object.defineProperty(exports, "SitDown", {
  enumerable: true,
  get: function () {
    return sit_down_js_1.SitDown;
  }
});
var sit_on_ground_js_1 = require("./fb-action/sit-on-ground.js");
Object.defineProperty(exports, "SitOnGround", {
  enumerable: true,
  get: function () {
    return sit_on_ground_js_1.SitOnGround;
  }
});
var ski_config_js_1 = require("./fb-action/ski-config.js");
Object.defineProperty(exports, "SkiConfig", {
  enumerable: true,
  get: function () {
    return ski_config_js_1.SkiConfig;
  }
});
var skill_blackboard_vector_js_1 = require("./fb-action/skill-blackboard-vector.js");
Object.defineProperty(exports, "SkillBlackboardVector", {
  enumerable: true,
  get: function () {
    return skill_blackboard_vector_js_1.SkillBlackboardVector;
  }
});
var slash_and_tower_goto_next_floor_js_1 = require("./fb-action/slash-and-tower-goto-next-floor.js");
Object.defineProperty(exports, "SlashAndTowerGotoNextFloor", {
  enumerable: true,
  get: function () {
    return slash_and_tower_goto_next_floor_js_1.SlashAndTowerGotoNextFloor;
  }
});
var slash_and_tower_tip_js_1 = require("./fb-action/slash-and-tower-tip.js");
Object.defineProperty(exports, "SlashAndTowerTip", {
  enumerable: true,
  get: function () {
    return slash_and_tower_tip_js_1.SlashAndTowerTip;
  }
});
var slash_tower_prefab_config_js_1 = require("./fb-action/slash-tower-prefab-config.js");
Object.defineProperty(exports, "SlashTowerPrefabConfig", {
  enumerable: true,
  get: function () {
    return slash_tower_prefab_config_js_1.SlashTowerPrefabConfig;
  }
});
var slide_config_js_1 = require("./fb-action/slide-config.js");
Object.defineProperty(exports, "SlideConfig", {
  enumerable: true,
  get: function () {
    return slide_config_js_1.SlideConfig;
  }
});
var slide_rail_start_js_1 = require("./fb-action/slide-rail-start.js");
Object.defineProperty(exports, "SlideRailStart", {
  enumerable: true,
  get: function () {
    return slide_rail_start_js_1.SlideRailStart;
  }
});
var slide_track_move_js_1 = require("./fb-action/slide-track-move.js");
Object.defineProperty(exports, "SlideTrackMove", {
  enumerable: true,
  get: function () {
    return slide_track_move_js_1.SlideTrackMove;
  }
});
var soar_js_1 = require("./fb-action/soar.js");
Object.defineProperty(exports, "Soar", {
  enumerable: true,
  get: function () {
    return soar_js_1.Soar;
  }
});
var soaring_challenge_settlement_js_1 = require("./fb-action/soaring-challenge-settlement.js");
Object.defineProperty(exports, "SoaringChallengeSettlement", {
  enumerable: true,
  get: function () {
    return soaring_challenge_settlement_js_1.SoaringChallengeSettlement;
  }
});
var spawn_child_js_1 = require("./fb-action/spawn-child.js");
Object.defineProperty(exports, "SpawnChild", {
  enumerable: true,
  get: function () {
    return spawn_child_js_1.SpawnChild;
  }
});
var spawn_entity_js_1 = require("./fb-action/spawn-entity.js");
Object.defineProperty(exports, "SpawnEntity", {
  enumerable: true,
  get: function () {
    return spawn_entity_js_1.SpawnEntity;
  }
});
var stand_control_js_1 = require("./fb-action/stand-control.js");
Object.defineProperty(exports, "StandControl", {
  enumerable: true,
  get: function () {
    return stand_control_js_1.StandControl;
  }
});
var stand_control2_js_1 = require("./fb-action/stand-control2.js");
Object.defineProperty(exports, "StandControl2", {
  enumerable: true,
  get: function () {
    return stand_control2_js_1.StandControl2;
  }
});
var start_flow_template_js_1 = require("./fb-action/start-flow-template.js");
Object.defineProperty(exports, "StartFlowTemplate", {
  enumerable: true,
  get: function () {
    return start_flow_template_js_1.StartFlowTemplate;
  }
});
var state_info_js_1 = require("./fb-action/state-info.js");
Object.defineProperty(exports, "StateInfo", {
  enumerable: true,
  get: function () {
    return state_info_js_1.StateInfo;
  }
});
var stop_camera_look_at_js_1 = require("./fb-action/stop-camera-look-at.js");
Object.defineProperty(exports, "StopCameraLookAt", {
  enumerable: true,
  get: function () {
    return stop_camera_look_at_js_1.StopCameraLookAt;
  }
});
var stop_guest_cartethyia_js_1 = require("./fb-action/stop-guest-cartethyia.js");
Object.defineProperty(exports, "StopGuestCartethyia", {
  enumerable: true,
  get: function () {
    return stop_guest_cartethyia_js_1.StopGuestCartethyia;
  }
});
var stop_guest_ui_animation_js_1 = require("./fb-action/stop-guest-ui-animation.js");
Object.defineProperty(exports, "StopGuestUiAnimation", {
  enumerable: true,
  get: function () {
    return stop_guest_ui_animation_js_1.StopGuestUiAnimation;
  }
});
var stop_new_move_with_spline_js_1 = require("./fb-action/stop-new-move-with-spline.js");
Object.defineProperty(exports, "StopNewMoveWithSpline", {
  enumerable: true,
  get: function () {
    return stop_new_move_with_spline_js_1.StopNewMoveWithSpline;
  }
});
var stop_new_move_with_spline_at_current_pos_js_1 = require("./fb-action/stop-new-move-with-spline-at-current-pos.js");
Object.defineProperty(exports, "StopNewMoveWithSplineAtCurrentPos", {
  enumerable: true,
  get: function () {
    return stop_new_move_with_spline_at_current_pos_js_1.StopNewMoveWithSplineAtCurrentPos;
  }
});
var stop_new_move_with_spline_at_end_point_js_1 = require("./fb-action/stop-new-move-with-spline-at-end-point.js");
Object.defineProperty(exports, "StopNewMoveWithSplineAtEndPoint", {
  enumerable: true,
  get: function () {
    return stop_new_move_with_spline_at_end_point_js_1.StopNewMoveWithSplineAtEndPoint;
  }
});
var stop_new_move_with_spline_at_start_point_js_1 = require("./fb-action/stop-new-move-with-spline-at-start-point.js");
Object.defineProperty(exports, "StopNewMoveWithSplineAtStartPoint", {
  enumerable: true,
  get: function () {
    return stop_new_move_with_spline_at_start_point_js_1.StopNewMoveWithSplineAtStartPoint;
  }
});
var stop_new_move_with_spline_at_target_point_js_1 = require("./fb-action/stop-new-move-with-spline-at-target-point.js");
Object.defineProperty(exports, "StopNewMoveWithSplineAtTargetPoint", {
  enumerable: true,
  get: function () {
    return stop_new_move_with_spline_at_target_point_js_1.StopNewMoveWithSplineAtTargetPoint;
  }
});
var stop_scene_item_move_js_1 = require("./fb-action/stop-scene-item-move.js");
Object.defineProperty(exports, "StopSceneItemMove", {
  enumerable: true,
  get: function () {
    return stop_scene_item_move_js_1.StopSceneItemMove;
  }
});
var summon_entity_js_1 = require("./fb-action/summon-entity.js");
Object.defineProperty(exports, "SummonEntity", {
  enumerable: true,
  get: function () {
    return summon_entity_js_1.SummonEntity;
  }
});
var summon_vehicle_js_1 = require("./fb-action/summon-vehicle.js");
Object.defineProperty(exports, "SummonVehicle", {
  enumerable: true,
  get: function () {
    return summon_vehicle_js_1.SummonVehicle;
  }
});
var sundial_puzzle_gameplay_js_1 = require("./fb-action/sundial-puzzle-gameplay.js");
Object.defineProperty(exports, "SundialPuzzleGameplay", {
  enumerable: true,
  get: function () {
    return sundial_puzzle_gameplay_js_1.SundialPuzzleGameplay;
  }
});
var super_catapult_js_1 = require("./fb-action/super-catapult.js");
Object.defineProperty(exports, "SuperCatapult", {
  enumerable: true,
  get: function () {
    return super_catapult_js_1.SuperCatapult;
  }
});
var switch_data_layers_js_1 = require("./fb-action/switch-data-layers.js");
Object.defineProperty(exports, "SwitchDataLayers", {
  enumerable: true,
  get: function () {
    return switch_data_layers_js_1.SwitchDataLayers;
  }
});
var switch_permission_js_1 = require("./fb-action/switch-permission.js");
Object.defineProperty(exports, "SwitchPermission", {
  enumerable: true,
  get: function () {
    return switch_permission_js_1.SwitchPermission;
  }
});
var switch_sub_levels_js_1 = require("./fb-action/switch-sub-levels.js");
Object.defineProperty(exports, "SwitchSubLevels", {
  enumerable: true,
  get: function () {
    return switch_sub_levels_js_1.SwitchSubLevels;
  }
});
var switch_sub_levels_directly_js_1 = require("./fb-action/switch-sub-levels-directly.js");
Object.defineProperty(exports, "SwitchSubLevelsDirectly", {
  enumerable: true,
  get: function () {
    return switch_sub_levels_directly_js_1.SwitchSubLevelsDirectly;
  }
});
var sync_var_to_actor_state_js_1 = require("./fb-action/sync-var-to-actor-state.js");
Object.defineProperty(exports, "SyncVarToActorState", {
  enumerable: true,
  get: function () {
    return sync_var_to_actor_state_js_1.SyncVarToActorState;
  }
});
var take_plot_photo_js_1 = require("./fb-action/take-plot-photo.js");
Object.defineProperty(exports, "TakePlotPhoto", {
  enumerable: true,
  get: function () {
    return take_plot_photo_js_1.TakePlotPhoto;
  }
});
var talk_background_clean_js_1 = require("./fb-action/talk-background-clean.js");
Object.defineProperty(exports, "TalkBackgroundClean", {
  enumerable: true,
  get: function () {
    return talk_background_clean_js_1.TalkBackgroundClean;
  }
});
var talk_background_icon_js_1 = require("./fb-action/talk-background-icon.js");
Object.defineProperty(exports, "TalkBackgroundIcon", {
  enumerable: true,
  get: function () {
    return talk_background_icon_js_1.TalkBackgroundIcon;
  }
});
var talk_background_image_js_1 = require("./fb-action/talk-background-image.js");
Object.defineProperty(exports, "TalkBackgroundImage", {
  enumerable: true,
  get: function () {
    return talk_background_image_js_1.TalkBackgroundImage;
  }
});
var talk_background_image_by_mc_gender_js_1 = require("./fb-action/talk-background-image-by-mc-gender.js");
Object.defineProperty(exports, "TalkBackgroundImageByMcGender", {
  enumerable: true,
  get: function () {
    return talk_background_image_by_mc_gender_js_1.TalkBackgroundImageByMcGender;
  }
});
var talk_background_spine_image_js_1 = require("./fb-action/talk-background-spine-image.js");
Object.defineProperty(exports, "TalkBackgroundSpineImage", {
  enumerable: true,
  get: function () {
    return talk_background_spine_image_js_1.TalkBackgroundSpineImage;
  }
});
var talk_item_js_1 = require("./fb-action/talk-item.js");
Object.defineProperty(exports, "TalkItem", {
  enumerable: true,
  get: function () {
    return talk_item_js_1.TalkItem;
  }
});
var talk_option_js_1 = require("./fb-action/talk-option.js");
Object.defineProperty(exports, "TalkOption", {
  enumerable: true,
  get: function () {
    return talk_option_js_1.TalkOption;
  }
});
var talk_option_condition_js_1 = require("./fb-action/talk-option-condition.js");
Object.defineProperty(exports, "TalkOptionCondition", {
  enumerable: true,
  get: function () {
    return talk_option_condition_js_1.TalkOptionCondition;
  }
});
var talk_option_pre_option_js_1 = require("./fb-action/talk-option-pre-option.js");
Object.defineProperty(exports, "TalkOptionPreOption", {
  enumerable: true,
  get: function () {
    return talk_option_pre_option_js_1.TalkOptionPreOption;
  }
});
var talk_option_qte_failed_js_1 = require("./fb-action/talk-option-qte-failed.js");
Object.defineProperty(exports, "TalkOptionQteFailed", {
  enumerable: true,
  get: function () {
    return talk_option_qte_failed_js_1.TalkOptionQteFailed;
  }
});
var talk_option_qte_failed_delay_exec_js_1 = require("./fb-action/talk-option-qte-failed-delay-exec.js");
Object.defineProperty(exports, "TalkOptionQteFailedDelayExec", {
  enumerable: true,
  get: function () {
    return talk_option_qte_failed_delay_exec_js_1.TalkOptionQteFailedDelayExec;
  }
});
var talk_option_qte_succeed_js_1 = require("./fb-action/talk-option-qte-succeed.js");
Object.defineProperty(exports, "TalkOptionQteSucceed", {
  enumerable: true,
  get: function () {
    return talk_option_qte_succeed_js_1.TalkOptionQteSucceed;
  }
});
var talk_option_qte_succeed_delay_exec_js_1 = require("./fb-action/talk-option-qte-succeed-delay-exec.js");
Object.defineProperty(exports, "TalkOptionQteSucceedDelayExec", {
  enumerable: true,
  get: function () {
    return talk_option_qte_succeed_delay_exec_js_1.TalkOptionQteSucceedDelayExec;
  }
});
var talk_option_rogue_random_event_js_1 = require("./fb-action/talk-option-rogue-random-event.js");
Object.defineProperty(exports, "TalkOptionRogueRandomEvent", {
  enumerable: true,
  get: function () {
    return talk_option_rogue_random_event_js_1.TalkOptionRogueRandomEvent;
  }
});
var talk_sequence_transition_js_1 = require("./fb-action/talk-sequence-transition.js");
Object.defineProperty(exports, "TalkSequenceTransition", {
  enumerable: true,
  get: function () {
    return talk_sequence_transition_js_1.TalkSequenceTransition;
  }
});
var target_entity_js_1 = require("./fb-action/target-entity.js");
Object.defineProperty(exports, "TargetEntity", {
  enumerable: true,
  get: function () {
    return target_entity_js_1.TargetEntity;
  }
});
var tele_control_config_js_1 = require("./fb-action/tele-control-config.js");
Object.defineProperty(exports, "TeleControlConfig", {
  enumerable: true,
  get: function () {
    return tele_control_config_js_1.TeleControlConfig;
  }
});
var tele_port_after_time_out_js_1 = require("./fb-action/tele-port-after-time-out.js");
Object.defineProperty(exports, "TelePortAfterTimeOut", {
  enumerable: true,
  get: function () {
    return tele_port_after_time_out_js_1.TelePortAfterTimeOut;
  }
});
var teleport_dungeon_js_1 = require("./fb-action/teleport-dungeon.js");
Object.defineProperty(exports, "TeleportDungeon", {
  enumerable: true,
  get: function () {
    return teleport_dungeon_js_1.TeleportDungeon;
  }
});
var teleport_dungeon_function_js_1 = require("./fb-action/teleport-dungeon-function.js");
Object.defineProperty(exports, "TeleportDungeonFunction", {
  enumerable: true,
  get: function () {
    return teleport_dungeon_function_js_1.TeleportDungeonFunction;
  }
});
var teleport_dungeon_pos_js_1 = require("./fb-action/teleport-dungeon-pos.js");
Object.defineProperty(exports, "TeleportDungeonPos", {
  enumerable: true,
  get: function () {
    return teleport_dungeon_pos_js_1.TeleportDungeonPos;
  }
});
var teleport_to_and_enter_fishing_boat_js_1 = require("./fb-action/teleport-to-and-enter-fishing-boat.js");
Object.defineProperty(exports, "TeleportToAndEnterFishingBoat", {
  enumerable: true,
  get: function () {
    return teleport_to_and_enter_fishing_boat_js_1.TeleportToAndEnterFishingBoat;
  }
});
var teleport_to_and_enter_vehicle_js_1 = require("./fb-action/teleport-to-and-enter-vehicle.js");
Object.defineProperty(exports, "TeleportToAndEnterVehicle", {
  enumerable: true,
  get: function () {
    return teleport_to_and_enter_vehicle_js_1.TeleportToAndEnterVehicle;
  }
});
var teleport_to_latest_reset_point_js_1 = require("./fb-action/teleport-to-latest-reset-point.js");
Object.defineProperty(exports, "TeleportToLatestResetPoint", {
  enumerable: true,
  get: function () {
    return teleport_to_latest_reset_point_js_1.TeleportToLatestResetPoint;
  }
});
var teleport_to_latest_reset_point_directly_js_1 = require("./fb-action/teleport-to-latest-reset-point-directly.js");
Object.defineProperty(exports, "TeleportToLatestResetPointDirectly", {
  enumerable: true,
  get: function () {
    return teleport_to_latest_reset_point_directly_js_1.TeleportToLatestResetPointDirectly;
  }
});
var teleport_transition_in_digital_screen_js_1 = require("./fb-action/teleport-transition-in-digital-screen.js");
Object.defineProperty(exports, "TeleportTransitionInDigitalScreen", {
  enumerable: true,
  get: function () {
    return teleport_transition_in_digital_screen_js_1.TeleportTransitionInDigitalScreen;
  }
});
var teleport_transition_in_seamless_type_js_1 = require("./fb-action/teleport-transition-in-seamless-type.js");
Object.defineProperty(exports, "TeleportTransitionInSeamlessType", {
  enumerable: true,
  get: function () {
    return teleport_transition_in_seamless_type_js_1.TeleportTransitionInSeamlessType;
  }
});
var teleport_transition_with_center_text_js_1 = require("./fb-action/teleport-transition-with-center-text.js");
Object.defineProperty(exports, "TeleportTransitionWithCenterText", {
  enumerable: true,
  get: function () {
    return teleport_transition_with_center_text_js_1.TeleportTransitionWithCenterText;
  }
});
var teleport_transition_with_character_display_js_1 = require("./fb-action/teleport-transition-with-character-display.js");
Object.defineProperty(exports, "TeleportTransitionWithCharacterDisplay", {
  enumerable: true,
  get: function () {
    return teleport_transition_with_character_display_js_1.TeleportTransitionWithCharacterDisplay;
  }
});
var teleport_transition_with_effect_js_1 = require("./fb-action/teleport-transition-with-effect.js");
Object.defineProperty(exports, "TeleportTransitionWithEffect", {
  enumerable: true,
  get: function () {
    return teleport_transition_with_effect_js_1.TeleportTransitionWithEffect;
  }
});
var teleport_transition_with_fade_in_screen_js_1 = require("./fb-action/teleport-transition-with-fade-in-screen.js");
Object.defineProperty(exports, "TeleportTransitionWithFadeInScreen", {
  enumerable: true,
  get: function () {
    return teleport_transition_with_fade_in_screen_js_1.TeleportTransitionWithFadeInScreen;
  }
});
var teleport_transition_with_mp4_js_1 = require("./fb-action/teleport-transition-with-mp4.js");
Object.defineProperty(exports, "TeleportTransitionWithMp4", {
  enumerable: true,
  get: function () {
    return teleport_transition_with_mp4_js_1.TeleportTransitionWithMp4;
  }
});
var teleport_vehicle_js_1 = require("./fb-action/teleport-vehicle.js");
Object.defineProperty(exports, "TeleportVehicle", {
  enumerable: true,
  get: function () {
    return teleport_vehicle_js_1.TeleportVehicle;
  }
});
var text_style_js_1 = require("./fb-action/text-style.js");
Object.defineProperty(exports, "TextStyle", {
  enumerable: true,
  get: function () {
    return text_style_js_1.TextStyle;
  }
});
var toggle_air_wall_js_1 = require("./fb-action/toggle-air-wall.js");
Object.defineProperty(exports, "ToggleAirWall", {
  enumerable: true,
  get: function () {
    return toggle_air_wall_js_1.ToggleAirWall;
  }
});
var toggle_highlight_explore_ui_js_1 = require("./fb-action/toggle-highlight-explore-ui.js");
Object.defineProperty(exports, "ToggleHighlightExploreUi", {
  enumerable: true,
  get: function () {
    return toggle_highlight_explore_ui_js_1.ToggleHighlightExploreUi;
  }
});
var toggle_map_mark_state_js_1 = require("./fb-action/toggle-map-mark-state.js");
Object.defineProperty(exports, "ToggleMapMarkState", {
  enumerable: true,
  get: function () {
    return toggle_map_mark_state_js_1.ToggleMapMarkState;
  }
});
var toggle_scan_spline_effect_js_1 = require("./fb-action/toggle-scan-spline-effect.js");
Object.defineProperty(exports, "ToggleScanSplineEffect", {
  enumerable: true,
  get: function () {
    return toggle_scan_spline_effect_js_1.ToggleScanSplineEffect;
  }
});
var toggle_timer_pause_state_js_1 = require("./fb-action/toggle-timer-pause-state.js");
Object.defineProperty(exports, "ToggleTimerPauseState", {
  enumerable: true,
  get: function () {
    return toggle_timer_pause_state_js_1.ToggleTimerPauseState;
  }
});
var tower_dungeon_prefab_config_js_1 = require("./fb-action/tower-dungeon-prefab-config.js");
Object.defineProperty(exports, "TowerDungeonPrefabConfig", {
  enumerable: true,
  get: function () {
    return tower_dungeon_prefab_config_js_1.TowerDungeonPrefabConfig;
  }
});
var trace_spline_js_1 = require("./fb-action/trace-spline.js");
Object.defineProperty(exports, "TraceSpline", {
  enumerable: true,
  get: function () {
    return trace_spline_js_1.TraceSpline;
  }
});
var transform_js_1 = require("./fb-action/transform.js");
Object.defineProperty(exports, "Transform", {
  enumerable: true,
  get: function () {
    return transform_js_1.Transform;
  }
});
var trigger_actions_js_1 = require("./fb-action/trigger-actions.js");
Object.defineProperty(exports, "TriggerActions", {
  enumerable: true,
  get: function () {
    return trigger_actions_js_1.TriggerActions;
  }
});
var trigger_camera_shake_js_1 = require("./fb-action/trigger-camera-shake.js");
Object.defineProperty(exports, "TriggerCameraShake", {
  enumerable: true,
  get: function () {
    return trigger_camera_shake_js_1.TriggerCameraShake;
  }
});
var triggered_entity_js_1 = require("./fb-action/triggered-entity.js");
Object.defineProperty(exports, "TriggeredEntity", {
  enumerable: true,
  get: function () {
    return triggered_entity_js_1.TriggeredEntity;
  }
});
var type_function_js_1 = require("./fb-action/type-function.js");
Object.defineProperty(exports, "TypeFunction", {
  enumerable: true,
  get: function () {
    return type_function_js_1.TypeFunction;
  }
});
var un_limit_player_operation_js_1 = require("./fb-action/un-limit-player-operation.js");
Object.defineProperty(exports, "UnLimitPlayerOperation", {
  enumerable: true,
  get: function () {
    return un_limit_player_operation_js_1.UnLimitPlayerOperation;
  }
});
var un_lock_cook_system_item_js_1 = require("./fb-action/un-lock-cook-system-item.js");
Object.defineProperty(exports, "UnLockCookSystemItem", {
  enumerable: true,
  get: function () {
    return un_lock_cook_system_item_js_1.UnLockCookSystemItem;
  }
});
var un_lock_dango_collect_system_item_js_1 = require("./fb-action/un-lock-dango-collect-system-item.js");
Object.defineProperty(exports, "UnLockDangoCollectSystemItem", {
  enumerable: true,
  get: function () {
    return un_lock_dango_collect_system_item_js_1.UnLockDangoCollectSystemItem;
  }
});
var uniform_motion_js_1 = require("./fb-action/uniform-motion.js");
Object.defineProperty(exports, "UniformMotion", {
  enumerable: true,
  get: function () {
    return uniform_motion_js_1.UniformMotion;
  }
});
var union_action_params0_js_1 = require("./fb-action/union-action-params0.js");
Object.defineProperty(exports, "UnionActionParams0", {
  enumerable: true,
  get: function () {
    return union_action_params0_js_1.UnionActionParams0;
  }
});
var union_action_params1_js_1 = require("./fb-action/union-action-params1.js");
Object.defineProperty(exports, "UnionActionParams1", {
  enumerable: true,
  get: function () {
    return union_action_params1_js_1.UnionActionParams1;
  }
});
var union_actor_look_at_data_js_1 = require("./fb-action/union-actor-look-at-data.js");
Object.defineProperty(exports, "UnionActorLookAtData", {
  enumerable: true,
  get: function () {
    return union_actor_look_at_data_js_1.UnionActorLookAtData;
  }
});
var union_actor_turn_to_data_js_1 = require("./fb-action/union-actor-turn-to-data.js");
Object.defineProperty(exports, "UnionActorTurnToData", {
  enumerable: true,
  get: function () {
    return union_actor_turn_to_data_js_1.UnionActorTurnToData;
  }
});
var union_adjust_player_camera_option_js_1 = require("./fb-action/union-adjust-player-camera-option.js");
Object.defineProperty(exports, "UnionAdjustPlayerCameraOption", {
  enumerable: true,
  get: function () {
    return union_adjust_player_camera_option_js_1.UnionAdjustPlayerCameraOption;
  }
});
var union_alert_system_option_js_1 = require("./fb-action/union-alert-system-option.js");
Object.defineProperty(exports, "UnionAlertSystemOption", {
  enumerable: true,
  get: function () {
    return union_alert_system_option_js_1.UnionAlertSystemOption;
  }
});
var union_alert_value_change_speed_js_1 = require("./fb-action/union-alert-value-change-speed.js");
Object.defineProperty(exports, "UnionAlertValueChangeSpeed", {
  enumerable: true,
  get: function () {
    return union_alert_value_change_speed_js_1.UnionAlertValueChangeSpeed;
  }
});
var union_awake_pos_option_js_1 = require("./fb-action/union-awake-pos-option.js");
Object.defineProperty(exports, "UnionAwakePosOption", {
  enumerable: true,
  get: function () {
    return union_awake_pos_option_js_1.UnionAwakePosOption;
  }
});
var union_battle_state_perception_behavior_js_1 = require("./fb-action/union-battle-state-perception-behavior.js");
Object.defineProperty(exports, "UnionBattleStatePerceptionBehavior", {
  enumerable: true,
  get: function () {
    return union_battle_state_perception_behavior_js_1.UnionBattleStatePerceptionBehavior;
  }
});
var union_camera_operation_js_1 = require("./fb-action/union-camera-operation.js");
Object.defineProperty(exports, "UnionCameraOperation", {
  enumerable: true,
  get: function () {
    return union_camera_operation_js_1.UnionCameraOperation;
  }
});
var union_camera_shake_config_js_1 = require("./fb-action/union-camera-shake-config.js");
Object.defineProperty(exports, "UnionCameraShakeConfig", {
  enumerable: true,
  get: function () {
    return union_camera_shake_config_js_1.UnionCameraShakeConfig;
  }
});
var union_center_text_show_anim_js_1 = require("./fb-action/union-center-text-show-anim.js");
Object.defineProperty(exports, "UnionCenterTextShowAnim", {
  enumerable: true,
  get: function () {
    return union_center_text_show_anim_js_1.UnionCenterTextShowAnim;
  }
});
var union_change_entity_prefab_performance_js_1 = require("./fb-action/union-change-entity-prefab-performance.js");
Object.defineProperty(exports, "UnionChangeEntityPrefabPerformance", {
  enumerable: true,
  get: function () {
    return union_change_entity_prefab_performance_js_1.UnionChangeEntityPrefabPerformance;
  }
});
var union_change_entity_state_js_1 = require("./fb-action/union-change-entity-state.js");
Object.defineProperty(exports, "UnionChangeEntityState", {
  enumerable: true,
  get: function () {
    return union_change_entity_state_js_1.UnionChangeEntityState;
  }
});
var union_change_timer_js_1 = require("./fb-action/union-change-timer.js");
Object.defineProperty(exports, "UnionChangeTimer", {
  enumerable: true,
  get: function () {
    return union_change_timer_js_1.UnionChangeTimer;
  }
});
var union_character_look_at_data_js_1 = require("./fb-action/union-character-look-at-data.js");
Object.defineProperty(exports, "UnionCharacterLookAtData", {
  enumerable: true,
  get: function () {
    return union_character_look_at_data_js_1.UnionCharacterLookAtData;
  }
});
var union_client_teleport_config_js_1 = require("./fb-action/union-client-teleport-config.js");
Object.defineProperty(exports, "UnionClientTeleportConfig", {
  enumerable: true,
  get: function () {
    return union_client_teleport_config_js_1.UnionClientTeleportConfig;
  }
});
var union_common_tip2_option_js_1 = require("./fb-action/union-common-tip2-option.js");
Object.defineProperty(exports, "UnionCommonTip2Option", {
  enumerable: true,
  get: function () {
    return union_common_tip2_option_js_1.UnionCommonTip2Option;
  }
});
var union_common_tip_option_js_1 = require("./fb-action/union-common-tip-option.js");
Object.defineProperty(exports, "UnionCommonTipOption", {
  enumerable: true,
  get: function () {
    return union_common_tip_option_js_1.UnionCommonTipOption;
  }
});
var union_control_tracking_type_js_1 = require("./fb-action/union-control-tracking-type.js");
Object.defineProperty(exports, "UnionControlTrackingType", {
  enumerable: true,
  get: function () {
    return union_control_tracking_type_js_1.UnionControlTrackingType;
  }
});
var union_delay_remove_config_js_1 = require("./fb-action/union-delay-remove-config.js");
Object.defineProperty(exports, "UnionDelayRemoveConfig", {
  enumerable: true,
  get: function () {
    return union_delay_remove_config_js_1.UnionDelayRemoveConfig;
  }
});
var union_detect_battle_condition_type_js_1 = require("./fb-action/union-detect-battle-condition-type.js");
Object.defineProperty(exports, "UnionDetectBattleConditionType", {
  enumerable: true,
  get: function () {
    return union_detect_battle_condition_type_js_1.UnionDetectBattleConditionType;
  }
});
var union_detect_battle_tag_type_js_1 = require("./fb-action/union-detect-battle-tag-type.js");
Object.defineProperty(exports, "UnionDetectBattleTagType", {
  enumerable: true,
  get: function () {
    return union_detect_battle_tag_type_js_1.UnionDetectBattleTagType;
  }
});
var union_disable_alert_condition_js_1 = require("./fb-action/union-disable-alert-condition.js");
Object.defineProperty(exports, "UnionDisableAlertCondition", {
  enumerable: true,
  get: function () {
    return union_disable_alert_condition_js_1.UnionDisableAlertCondition;
  }
});
var union_dungeon_event_type_js_1 = require("./fb-action/union-dungeon-event-type.js");
Object.defineProperty(exports, "UnionDungeonEventType", {
  enumerable: true,
  get: function () {
    return union_dungeon_event_type_js_1.UnionDungeonEventType;
  }
});
var union_dynamic_settlement_config_js_1 = require("./fb-action/union-dynamic-settlement-config.js");
Object.defineProperty(exports, "UnionDynamicSettlementConfig", {
  enumerable: true,
  get: function () {
    return union_dynamic_settlement_config_js_1.UnionDynamicSettlementConfig;
  }
});
var union_effect_pos2_js_1 = require("./fb-action/union-effect-pos2.js");
Object.defineProperty(exports, "UnionEffectPos2", {
  enumerable: true,
  get: function () {
    return union_effect_pos2_js_1.UnionEffectPos2;
  }
});
var union_enable_sub_level_transition_js_1 = require("./fb-action/union-enable-sub-level-transition.js");
Object.defineProperty(exports, "UnionEnableSubLevelTransition", {
  enumerable: true,
  get: function () {
    return union_enable_sub_level_transition_js_1.UnionEnableSubLevelTransition;
  }
});
var union_enter_orbital_camera_option_js_1 = require("./fb-action/union-enter-orbital-camera-option.js");
Object.defineProperty(exports, "UnionEnterOrbitalCameraOption", {
  enumerable: true,
  get: function () {
    return union_enter_orbital_camera_option_js_1.UnionEnterOrbitalCameraOption;
  }
});
var union_exec_battle_option_js_1 = require("./fb-action/union-exec-battle-option.js");
Object.defineProperty(exports, "UnionExecBattleOption", {
  enumerable: true,
  get: function () {
    return union_exec_battle_option_js_1.UnionExecBattleOption;
  }
});
var union_exit_vehicle_type_js_1 = require("./fb-action/union-exit-vehicle-type.js");
Object.defineProperty(exports, "UnionExitVehicleType", {
  enumerable: true,
  get: function () {
    return union_exit_vehicle_type_js_1.UnionExitVehicleType;
  }
});
var union_explore_state_js_1 = require("./fb-action/union-explore-state.js");
Object.defineProperty(exports, "UnionExploreState", {
  enumerable: true,
  get: function () {
    return union_explore_state_js_1.UnionExploreState;
  }
});
var union_fire_bullet_js_1 = require("./fb-action/union-fire-bullet.js");
Object.defineProperty(exports, "UnionFireBullet", {
  enumerable: true,
  get: function () {
    return union_fire_bullet_js_1.UnionFireBullet;
  }
});
var union_guest_operate_ui_animation_js_1 = require("./fb-action/union-guest-operate-ui-animation.js");
Object.defineProperty(exports, "UnionGuestOperateUiAnimation", {
  enumerable: true,
  get: function () {
    return union_guest_operate_ui_animation_js_1.UnionGuestOperateUiAnimation;
  }
});
var union_head_style_js_1 = require("./fb-action/union-head-style.js");
Object.defineProperty(exports, "UnionHeadStyle", {
  enumerable: true,
  get: function () {
    return union_head_style_js_1.UnionHeadStyle;
  }
});
var union_hide_group_config_js_1 = require("./fb-action/union-hide-group-config.js");
Object.defineProperty(exports, "UnionHideGroupConfig", {
  enumerable: true,
  get: function () {
    return union_hide_group_config_js_1.UnionHideGroupConfig;
  }
});
var union_hide_range_config_js_1 = require("./fb-action/union-hide-range-config.js");
Object.defineProperty(exports, "UnionHideRangeConfig", {
  enumerable: true,
  get: function () {
    return union_hide_range_config_js_1.UnionHideRangeConfig;
  }
});
var union_highlight_explore_skill_icon_js_1 = require("./fb-action/union-highlight-explore-skill-icon.js");
Object.defineProperty(exports, "UnionHighlightExploreSkillIcon", {
  enumerable: true,
  get: function () {
    return union_highlight_explore_skill_icon_js_1.UnionHighlightExploreSkillIcon;
  }
});
var union_interact_option_js_1 = require("./fb-action/union-interact-option.js");
Object.defineProperty(exports, "UnionInteractOption", {
  enumerable: true,
  get: function () {
    return union_interact_option_js_1.UnionInteractOption;
  }
});
var union_item_get_ui_config_js_1 = require("./fb-action/union-item-get-ui-config.js");
Object.defineProperty(exports, "UnionItemGetUiConfig", {
  enumerable: true,
  get: function () {
    return union_item_get_ui_config_js_1.UnionItemGetUiConfig;
  }
});
var union_leisure_interact_option_js_1 = require("./fb-action/union-leisure-interact-option.js");
Object.defineProperty(exports, "UnionLeisureInteractOption", {
  enumerable: true,
  get: function () {
    return union_leisure_interact_option_js_1.UnionLeisureInteractOption;
  }
});
var union_level_sequence_transition_js_1 = require("./fb-action/union-level-sequence-transition.js");
Object.defineProperty(exports, "UnionLevelSequenceTransition", {
  enumerable: true,
  get: function () {
    return union_level_sequence_transition_js_1.UnionLevelSequenceTransition;
  }
});
var union_limit_play_operation_js_1 = require("./fb-action/union-limit-play-operation.js");
Object.defineProperty(exports, "UnionLimitPlayOperation", {
  enumerable: true,
  get: function () {
    return union_limit_play_operation_js_1.UnionLimitPlayOperation;
  }
});
var union_modify_actor_material_type_js_1 = require("./fb-action/union-modify-actor-material-type.js");
Object.defineProperty(exports, "UnionModifyActorMaterialType", {
  enumerable: true,
  get: function () {
    return union_modify_actor_material_type_js_1.UnionModifyActorMaterialType;
  }
});
var union_modify_scene_item_attribute_tag_js_1 = require("./fb-action/union-modify-scene-item-attribute-tag.js");
Object.defineProperty(exports, "UnionModifySceneItemAttributeTag", {
  enumerable: true,
  get: function () {
    return union_modify_scene_item_attribute_tag_js_1.UnionModifySceneItemAttributeTag;
  }
});
var union_montage_config_js_1 = require("./fb-action/union-montage-config.js");
Object.defineProperty(exports, "UnionMontageConfig", {
  enumerable: true,
  get: function () {
    return union_montage_config_js_1.UnionMontageConfig;
  }
});
var union_move_operation_js_1 = require("./fb-action/union-move-operation.js");
Object.defineProperty(exports, "UnionMoveOperation", {
  enumerable: true,
  get: function () {
    return union_move_operation_js_1.UnionMoveOperation;
  }
});
var union_move_scene_item_js_1 = require("./fb-action/union-move-scene-item.js");
Object.defineProperty(exports, "UnionMoveSceneItem", {
  enumerable: true,
  get: function () {
    return union_move_scene_item_js_1.UnionMoveSceneItem;
  }
});
var union_move_to_point_type_js_1 = require("./fb-action/union-move-to-point-type.js");
Object.defineProperty(exports, "UnionMoveToPointType", {
  enumerable: true,
  get: function () {
    return union_move_to_point_type_js_1.UnionMoveToPointType;
  }
});
var union_new_spline_move_target_js_1 = require("./fb-action/union-new-spline-move-target.js");
Object.defineProperty(exports, "UnionNewSplineMoveTarget", {
  enumerable: true,
  get: function () {
    return union_new_spline_move_target_js_1.UnionNewSplineMoveTarget;
  }
});
var union_npc_leisure_interact_op_js_1 = require("./fb-action/union-npc-leisure-interact-op.js");
Object.defineProperty(exports, "UnionNpcLeisureInteractOp", {
  enumerable: true,
  get: function () {
    return union_npc_leisure_interact_op_js_1.UnionNpcLeisureInteractOp;
  }
});
var union_open_qte_config_js_1 = require("./fb-action/union-open-qte-config.js");
Object.defineProperty(exports, "UnionOpenQteConfig", {
  enumerable: true,
  get: function () {
    return union_open_qte_config_js_1.UnionOpenQteConfig;
  }
});
var union_open_system_board_with_return_js_1 = require("./fb-action/union-open-system-board-with-return.js");
Object.defineProperty(exports, "UnionOpenSystemBoardWithReturn", {
  enumerable: true,
  get: function () {
    return union_open_system_board_with_return_js_1.UnionOpenSystemBoardWithReturn;
  }
});
var union_performer_ai_move_to_config_js_1 = require("./fb-action/union-performer-ai-move-to-config.js");
Object.defineProperty(exports, "UnionPerformerAiMoveToConfig", {
  enumerable: true,
  get: function () {
    return union_performer_ai_move_to_config_js_1.UnionPerformerAiMoveToConfig;
  }
});
var union_play_guest_ui_animation_type_js_1 = require("./fb-action/union-play-guest-ui-animation-type.js");
Object.defineProperty(exports, "UnionPlayGuestUiAnimationType", {
  enumerable: true,
  get: function () {
    return union_play_guest_ui_animation_type_js_1.UnionPlayGuestUiAnimationType;
  }
});
var union_pos2_js_1 = require("./fb-action/union-pos2.js");
Object.defineProperty(exports, "UnionPos2", {
  enumerable: true,
  get: function () {
    return union_pos2_js_1.UnionPos2;
  }
});
var union_post_ak_event_js_1 = require("./fb-action/union-post-ak-event.js");
Object.defineProperty(exports, "UnionPostAkEvent", {
  enumerable: true,
  get: function () {
    return union_post_ak_event_js_1.UnionPostAkEvent;
  }
});
var union_prefab_config_js_1 = require("./fb-action/union-prefab-config.js");
Object.defineProperty(exports, "UnionPrefabConfig", {
  enumerable: true,
  get: function () {
    return union_prefab_config_js_1.UnionPrefabConfig;
  }
});
var union_preload_object_type_config_js_1 = require("./fb-action/union-preload-object-type-config.js");
Object.defineProperty(exports, "UnionPreloadObjectTypeConfig", {
  enumerable: true,
  get: function () {
    return union_preload_object_type_config_js_1.UnionPreloadObjectTypeConfig;
  }
});
var union_remove_preload_resource_config_js_1 = require("./fb-action/union-remove-preload-resource-config.js");
Object.defineProperty(exports, "UnionRemovePreloadResourceConfig", {
  enumerable: true,
  get: function () {
    return union_remove_preload_resource_config_js_1.UnionRemovePreloadResourceConfig;
  }
});
var union_reset_entity_config_js_1 = require("./fb-action/union-reset-entity-config.js");
Object.defineProperty(exports, "UnionResetEntityConfig", {
  enumerable: true,
  get: function () {
    return union_reset_entity_config_js_1.UnionResetEntityConfig;
  }
});
var union_reset_player_focus_type_js_1 = require("./fb-action/union-reset-player-focus-type.js");
Object.defineProperty(exports, "UnionResetPlayerFocusType", {
  enumerable: true,
  get: function () {
    return union_reset_player_focus_type_js_1.UnionResetPlayerFocusType;
  }
});
var union_rogue_select_room_js_1 = require("./fb-action/union-rogue-select-room.js");
Object.defineProperty(exports, "UnionRogueSelectRoom", {
  enumerable: true,
  get: function () {
    return union_rogue_select_room_js_1.UnionRogueSelectRoom;
  }
});
var union_scene_interaction_operation_js_1 = require("./fb-action/union-scene-interaction-operation.js");
Object.defineProperty(exports, "UnionSceneInteractionOperation", {
  enumerable: true,
  get: function () {
    return union_scene_interaction_operation_js_1.UnionSceneInteractionOperation;
  }
});
var union_set_alert_value_type_js_1 = require("./fb-action/union-set-alert-value-type.js");
Object.defineProperty(exports, "UnionSetAlertValueType", {
  enumerable: true,
  get: function () {
    return union_set_alert_value_type_js_1.UnionSetAlertValueType;
  }
});
var union_set_area_time_type_js_1 = require("./fb-action/union-set-area-time-type.js");
Object.defineProperty(exports, "UnionSetAreaTimeType", {
  enumerable: true,
  get: function () {
    return union_set_area_time_type_js_1.UnionSetAreaTimeType;
  }
});
var union_set_global_time_scale_js_1 = require("./fb-action/union-set-global-time-scale.js");
Object.defineProperty(exports, "UnionSetGlobalTimeScale", {
  enumerable: true,
  get: function () {
    return union_set_global_time_scale_js_1.UnionSetGlobalTimeScale;
  }
});
var union_set_jigsaw_foundation_js_1 = require("./fb-action/union-set-jigsaw-foundation.js");
Object.defineProperty(exports, "UnionSetJigsawFoundation", {
  enumerable: true,
  get: function () {
    return union_set_jigsaw_foundation_js_1.UnionSetJigsawFoundation;
  }
});
var union_set_jigsaw_item_js_1 = require("./fb-action/union-set-jigsaw-item.js");
Object.defineProperty(exports, "UnionSetJigsawItem", {
  enumerable: true,
  get: function () {
    return union_set_jigsaw_item_js_1.UnionSetJigsawItem;
  }
});
var union_set_player_operation_restriction_js_1 = require("./fb-action/union-set-player-operation-restriction.js");
Object.defineProperty(exports, "UnionSetPlayerOperationRestriction", {
  enumerable: true,
  get: function () {
    return union_set_player_operation_restriction_js_1.UnionSetPlayerOperationRestriction;
  }
});
var union_set_spine_animation_js_1 = require("./fb-action/union-set-spine-animation.js");
Object.defineProperty(exports, "UnionSetSpineAnimation", {
  enumerable: true,
  get: function () {
    return union_set_spine_animation_js_1.UnionSetSpineAnimation;
  }
});
var union_set_tele_control_config_js_1 = require("./fb-action/union-set-tele-control-config.js");
Object.defineProperty(exports, "UnionSetTeleControlConfig", {
  enumerable: true,
  get: function () {
    return union_set_tele_control_config_js_1.UnionSetTeleControlConfig;
  }
});
var union_set_time_scale_js_1 = require("./fb-action/union-set-time-scale.js");
Object.defineProperty(exports, "UnionSetTimeScale", {
  enumerable: true,
  get: function () {
    return union_set_time_scale_js_1.UnionSetTimeScale;
  }
});
var union_ski_config_js_1 = require("./fb-action/union-ski-config.js");
Object.defineProperty(exports, "UnionSkiConfig", {
  enumerable: true,
  get: function () {
    return union_ski_config_js_1.UnionSkiConfig;
  }
});
var union_skill_operation_js_1 = require("./fb-action/union-skill-operation.js");
Object.defineProperty(exports, "UnionSkillOperation", {
  enumerable: true,
  get: function () {
    return union_skill_operation_js_1.UnionSkillOperation;
  }
});
var union_spline_move_model_js_1 = require("./fb-action/union-spline-move-model.js");
Object.defineProperty(exports, "UnionSplineMoveModel", {
  enumerable: true,
  get: function () {
    return union_spline_move_model_js_1.UnionSplineMoveModel;
  }
});
var union_spline_move_pattern_js_1 = require("./fb-action/union-spline-move-pattern.js");
Object.defineProperty(exports, "UnionSplineMovePattern", {
  enumerable: true,
  get: function () {
    return union_spline_move_pattern_js_1.UnionSplineMovePattern;
  }
});
var union_spline_move_target_js_1 = require("./fb-action/union-spline-move-target.js");
Object.defineProperty(exports, "UnionSplineMoveTarget", {
  enumerable: true,
  get: function () {
    return union_spline_move_target_js_1.UnionSplineMoveTarget;
  }
});
var union_sport_state_js_1 = require("./fb-action/union-sport-state.js");
Object.defineProperty(exports, "UnionSportState", {
  enumerable: true,
  get: function () {
    return union_sport_state_js_1.UnionSportState;
  }
});
var union_state_option_js_1 = require("./fb-action/union-state-option.js");
Object.defineProperty(exports, "UnionStateOption", {
  enumerable: true,
  get: function () {
    return union_state_option_js_1.UnionStateOption;
  }
});
var union_stop_guest_ui_animation_type_js_1 = require("./fb-action/union-stop-guest-ui-animation-type.js");
Object.defineProperty(exports, "UnionStopGuestUiAnimationType", {
  enumerable: true,
  get: function () {
    return union_stop_guest_ui_animation_type_js_1.UnionStopGuestUiAnimationType;
  }
});
var union_stop_new_move_with_spline_type_js_1 = require("./fb-action/union-stop-new-move-with-spline-type.js");
Object.defineProperty(exports, "UnionStopNewMoveWithSplineType", {
  enumerable: true,
  get: function () {
    return union_stop_new_move_with_spline_type_js_1.UnionStopNewMoveWithSplineType;
  }
});
var union_summon_entity_type_js_1 = require("./fb-action/union-summon-entity-type.js");
Object.defineProperty(exports, "UnionSummonEntityType", {
  enumerable: true,
  get: function () {
    return union_summon_entity_type_js_1.UnionSummonEntityType;
  }
});
var union_switch_sub_levels_js_1 = require("./fb-action/union-switch-sub-levels.js");
Object.defineProperty(exports, "UnionSwitchSubLevels", {
  enumerable: true,
  get: function () {
    return union_switch_sub_levels_js_1.UnionSwitchSubLevels;
  }
});
var union_talk_background_js_1 = require("./fb-action/union-talk-background.js");
Object.defineProperty(exports, "UnionTalkBackground", {
  enumerable: true,
  get: function () {
    return union_talk_background_js_1.UnionTalkBackground;
  }
});
var union_talk_option_param_js_1 = require("./fb-action/union-talk-option-param.js");
Object.defineProperty(exports, "UnionTalkOptionParam", {
  enumerable: true,
  get: function () {
    return union_talk_option_param_js_1.UnionTalkOptionParam;
  }
});
var union_talk_option_pre_condition_js_1 = require("./fb-action/union-talk-option-pre-condition.js");
Object.defineProperty(exports, "UnionTalkOptionPreCondition", {
  enumerable: true,
  get: function () {
    return union_talk_option_pre_condition_js_1.UnionTalkOptionPreCondition;
  }
});
var union_target_entity_js_1 = require("./fb-action/union-target-entity.js");
Object.defineProperty(exports, "UnionTargetEntity", {
  enumerable: true,
  get: function () {
    return union_target_entity_js_1.UnionTargetEntity;
  }
});
var union_target_vehicle_js_1 = require("./fb-action/union-target-vehicle.js");
Object.defineProperty(exports, "UnionTargetVehicle", {
  enumerable: true,
  get: function () {
    return union_target_vehicle_js_1.UnionTargetVehicle;
  }
});
var union_teammate_teleport_config_js_1 = require("./fb-action/union-teammate-teleport-config.js");
Object.defineProperty(exports, "UnionTeammateTeleportConfig", {
  enumerable: true,
  get: function () {
    return union_teammate_teleport_config_js_1.UnionTeammateTeleportConfig;
  }
});
var union_teleport_config_js_1 = require("./fb-action/union-teleport-config.js");
Object.defineProperty(exports, "UnionTeleportConfig", {
  enumerable: true,
  get: function () {
    return union_teleport_config_js_1.UnionTeleportConfig;
  }
});
var union_teleport_to_and_enter_vehicle_type_js_1 = require("./fb-action/union-teleport-to-and-enter-vehicle-type.js");
Object.defineProperty(exports, "UnionTeleportToAndEnterVehicleType", {
  enumerable: true,
  get: function () {
    return union_teleport_to_and_enter_vehicle_type_js_1.UnionTeleportToAndEnterVehicleType;
  }
});
var union_teleport_to_latest_reset_point_option_js_1 = require("./fb-action/union-teleport-to-latest-reset-point-option.js");
Object.defineProperty(exports, "UnionTeleportToLatestResetPointOption", {
  enumerable: true,
  get: function () {
    return union_teleport_to_latest_reset_point_option_js_1.UnionTeleportToLatestResetPointOption;
  }
});
var union_teleport_transition_option_js_1 = require("./fb-action/union-teleport-transition-option.js");
Object.defineProperty(exports, "UnionTeleportTransitionOption", {
  enumerable: true,
  get: function () {
    return union_teleport_transition_option_js_1.UnionTeleportTransitionOption;
  }
});
var union_toggle_air_wall_js_1 = require("./fb-action/union-toggle-air-wall.js");
Object.defineProperty(exports, "UnionToggleAirWall", {
  enumerable: true,
  get: function () {
    return union_toggle_air_wall_js_1.UnionToggleAirWall;
  }
});
var union_toggle_map_mark_state_js_1 = require("./fb-action/union-toggle-map-mark-state.js");
Object.defineProperty(exports, "UnionToggleMapMarkState", {
  enumerable: true,
  get: function () {
    return union_toggle_map_mark_state_js_1.UnionToggleMapMarkState;
  }
});
var union_toggle_scan_spline_effect_js_1 = require("./fb-action/union-toggle-scan-spline-effect.js");
Object.defineProperty(exports, "UnionToggleScanSplineEffect", {
  enumerable: true,
  get: function () {
    return union_toggle_scan_spline_effect_js_1.UnionToggleScanSplineEffect;
  }
});
var union_ui_game_js_1 = require("./fb-action/union-ui-game.js");
Object.defineProperty(exports, "UnionUiGame", {
  enumerable: true,
  get: function () {
    return union_ui_game_js_1.UnionUiGame;
  }
});
var union_ui_operation_js_1 = require("./fb-action/union-ui-operation.js");
Object.defineProperty(exports, "UnionUiOperation", {
  enumerable: true,
  get: function () {
    return union_ui_operation_js_1.UnionUiOperation;
  }
});
var union_unlock_atlas_system_option_js_1 = require("./fb-action/union-unlock-atlas-system-option.js");
Object.defineProperty(exports, "UnionUnlockAtlasSystemOption", {
  enumerable: true,
  get: function () {
    return union_unlock_atlas_system_option_js_1.UnionUnlockAtlasSystemOption;
  }
});
var union_unlock_cook_system_option_js_1 = require("./fb-action/union-unlock-cook-system-option.js");
Object.defineProperty(exports, "UnionUnlockCookSystemOption", {
  enumerable: true,
  get: function () {
    return union_unlock_cook_system_option_js_1.UnionUnlockCookSystemOption;
  }
});
var union_unlock_system_option_js_1 = require("./fb-action/union-unlock-system-option.js");
Object.defineProperty(exports, "UnionUnlockSystemOption", {
  enumerable: true,
  get: function () {
    return union_unlock_system_option_js_1.UnionUnlockSystemOption;
  }
});
var union_var_js_1 = require("./fb-action/union-var.js");
Object.defineProperty(exports, "UnionVar", {
  enumerable: true,
  get: function () {
    return union_var_js_1.UnionVar;
  }
});
var union_var_context_js_1 = require("./fb-action/union-var-context.js");
Object.defineProperty(exports, "UnionVarContext", {
  enumerable: true,
  get: function () {
    return union_var_context_js_1.UnionVarContext;
  }
});
var union_vehicle_control_type_js_1 = require("./fb-action/union-vehicle-control-type.js");
Object.defineProperty(exports, "UnionVehicleControlType", {
  enumerable: true,
  get: function () {
    return union_vehicle_control_type_js_1.UnionVehicleControlType;
  }
});
var union_vehicle_entering_target_js_1 = require("./fb-action/union-vehicle-entering-target.js");
Object.defineProperty(exports, "UnionVehicleEnteringTarget", {
  enumerable: true,
  get: function () {
    return union_vehicle_entering_target_js_1.UnionVehicleEnteringTarget;
  }
});
var universal_tone_js_1 = require("./fb-action/universal-tone.js");
Object.defineProperty(exports, "UniversalTone", {
  enumerable: true,
  get: function () {
    return universal_tone_js_1.UniversalTone;
  }
});
var unlock_achievement_system_item_js_1 = require("./fb-action/unlock-achievement-system-item.js");
Object.defineProperty(exports, "UnlockAchievementSystemItem", {
  enumerable: true,
  get: function () {
    return unlock_achievement_system_item_js_1.UnlockAchievementSystemItem;
  }
});
var unlock_atlas_system_item_js_1 = require("./fb-action/unlock-atlas-system-item.js");
Object.defineProperty(exports, "UnlockAtlasSystemItem", {
  enumerable: true,
  get: function () {
    return unlock_atlas_system_item_js_1.UnlockAtlasSystemItem;
  }
});
var unlock_cook_system_cook_book_js_1 = require("./fb-action/unlock-cook-system-cook-book.js");
Object.defineProperty(exports, "UnlockCookSystemCookBook", {
  enumerable: true,
  get: function () {
    return unlock_cook_system_cook_book_js_1.UnlockCookSystemCookBook;
  }
});
var unlock_dungeon_entry_js_1 = require("./fb-action/unlock-dungeon-entry.js");
Object.defineProperty(exports, "UnlockDungeonEntry", {
  enumerable: true,
  get: function () {
    return unlock_dungeon_entry_js_1.UnlockDungeonEntry;
  }
});
var unlock_entity_js_1 = require("./fb-action/unlock-entity.js");
Object.defineProperty(exports, "UnlockEntity", {
  enumerable: true,
  get: function () {
    return unlock_entity_js_1.UnlockEntity;
  }
});
var unlock_geographical_atlas_js_1 = require("./fb-action/unlock-geographical-atlas.js");
Object.defineProperty(exports, "UnlockGeographicalAtlas", {
  enumerable: true,
  get: function () {
    return unlock_geographical_atlas_js_1.UnlockGeographicalAtlas;
  }
});
var unlock_noun_atlas_js_1 = require("./fb-action/unlock-noun-atlas.js");
Object.defineProperty(exports, "UnlockNounAtlas", {
  enumerable: true,
  get: function () {
    return unlock_noun_atlas_js_1.UnlockNounAtlas;
  }
});
var unlock_photo_memory_collect_system_item_js_1 = require("./fb-action/unlock-photo-memory-collect-system-item.js");
Object.defineProperty(exports, "UnlockPhotoMemoryCollectSystemItem", {
  enumerable: true,
  get: function () {
    return unlock_photo_memory_collect_system_item_js_1.UnlockPhotoMemoryCollectSystemItem;
  }
});
var unlock_plot_photo_atlas_js_1 = require("./fb-action/unlock-plot-photo-atlas.js");
Object.defineProperty(exports, "UnlockPlotPhotoAtlas", {
  enumerable: true,
  get: function () {
    return unlock_plot_photo_atlas_js_1.UnlockPlotPhotoAtlas;
  }
});
var unlock_system_item_js_1 = require("./fb-action/unlock-system-item.js");
Object.defineProperty(exports, "UnlockSystemItem", {
  enumerable: true,
  get: function () {
    return unlock_system_item_js_1.UnlockSystemItem;
  }
});
var unlock_teleport_trigger_js_1 = require("./fb-action/unlock-teleport-trigger.js");
Object.defineProperty(exports, "UnlockTeleportTrigger", {
  enumerable: true,
  get: function () {
    return unlock_teleport_trigger_js_1.UnlockTeleportTrigger;
  }
});
var use_phantom_skill_js_1 = require("./fb-action/use-phantom-skill.js");
Object.defineProperty(exports, "UsePhantomSkill", {
  enumerable: true,
  get: function () {
    return use_phantom_skill_js_1.UsePhantomSkill;
  }
});
var variable_motion_js_1 = require("./fb-action/variable-motion.js");
Object.defineProperty(exports, "VariableMotion", {
  enumerable: true,
  get: function () {
    return variable_motion_js_1.VariableMotion;
  }
});
var vehicle_cruising_params_js_1 = require("./fb-action/vehicle-cruising-params.js");
Object.defineProperty(exports, "VehicleCruisingParams", {
  enumerable: true,
  get: function () {
    return vehicle_cruising_params_js_1.VehicleCruisingParams;
  }
});
var vehicle_enter_js_1 = require("./fb-action/vehicle-enter.js");
Object.defineProperty(exports, "VehicleEnter", {
  enumerable: true,
  get: function () {
    return vehicle_enter_js_1.VehicleEnter;
  }
});
var vehicle_enter_path_move_js_1 = require("./fb-action/vehicle-enter-path-move.js");
Object.defineProperty(exports, "VehicleEnterPathMove", {
  enumerable: true,
  get: function () {
    return vehicle_enter_path_move_js_1.VehicleEnterPathMove;
  }
});
var vehicle_entering_npc_target_js_1 = require("./fb-action/vehicle-entering-npc-target.js");
Object.defineProperty(exports, "VehicleEnteringNpcTarget", {
  enumerable: true,
  get: function () {
    return vehicle_entering_npc_target_js_1.VehicleEnteringNpcTarget;
  }
});
var vehicle_entering_player_target_js_1 = require("./fb-action/vehicle-entering-player-target.js");
Object.defineProperty(exports, "VehicleEnteringPlayerTarget", {
  enumerable: true,
  get: function () {
    return vehicle_entering_player_target_js_1.VehicleEnteringPlayerTarget;
  }
});
var vehicle_entity_js_1 = require("./fb-action/vehicle-entity.js");
Object.defineProperty(exports, "VehicleEntity", {
  enumerable: true,
  get: function () {
    return vehicle_entity_js_1.VehicleEntity;
  }
});
var vehicle_exit_npc_js_1 = require("./fb-action/vehicle-exit-npc.js");
Object.defineProperty(exports, "VehicleExitNpc", {
  enumerable: true,
  get: function () {
    return vehicle_exit_npc_js_1.VehicleExitNpc;
  }
});
var vehicle_exit_path_move_js_1 = require("./fb-action/vehicle-exit-path-move.js");
Object.defineProperty(exports, "VehicleExitPathMove", {
  enumerable: true,
  get: function () {
    return vehicle_exit_path_move_js_1.VehicleExitPathMove;
  }
});
var vehicle_exit_player_js_1 = require("./fb-action/vehicle-exit-player.js");
Object.defineProperty(exports, "VehicleExitPlayer", {
  enumerable: true,
  get: function () {
    return vehicle_exit_player_js_1.VehicleExitPlayer;
  }
});
var vehicle_move_with_path_line_js_1 = require("./fb-action/vehicle-move-with-path-line.js");
Object.defineProperty(exports, "VehicleMoveWithPathLine", {
  enumerable: true,
  get: function () {
    return vehicle_move_with_path_line_js_1.VehicleMoveWithPathLine;
  }
});
var vehicle_new_spline_move_target_js_1 = require("./fb-action/vehicle-new-spline-move-target.js");
Object.defineProperty(exports, "VehicleNewSplineMoveTarget", {
  enumerable: true,
  get: function () {
    return vehicle_new_spline_move_target_js_1.VehicleNewSplineMoveTarget;
  }
});
var vehicle_play_passenger_voice_js_1 = require("./fb-action/vehicle-play-passenger-voice.js");
Object.defineProperty(exports, "VehiclePlayPassengerVoice", {
  enumerable: true,
  get: function () {
    return vehicle_play_passenger_voice_js_1.VehiclePlayPassengerVoice;
  }
});
var vehicle_sprint_js_1 = require("./fb-action/vehicle-sprint.js");
Object.defineProperty(exports, "VehicleSprint", {
  enumerable: true,
  get: function () {
    return vehicle_sprint_js_1.VehicleSprint;
  }
});
var vehicle_waterfall_climb_gravity_config_js_1 = require("./fb-action/vehicle-waterfall-climb-gravity-config.js");
Object.defineProperty(exports, "VehicleWaterfallClimbGravityConfig", {
  enumerable: true,
  get: function () {
    return vehicle_waterfall_climb_gravity_config_js_1.VehicleWaterfallClimbGravityConfig;
  }
});
var vehicle_waterfall_climbing_js_1 = require("./fb-action/vehicle-waterfall-climbing.js");
Object.defineProperty(exports, "VehicleWaterfallClimbing", {
  enumerable: true,
  get: function () {
    return vehicle_waterfall_climbing_js_1.VehicleWaterfallClimbing;
  }
});
var wait_js_1 = require("./fb-action/wait.js");
Object.defineProperty(exports, "Wait", {
  enumerable: true,
  get: function () {
    return wait_js_1.Wait;
  }
});
var wait_battle_condition_js_1 = require("./fb-action/wait-battle-condition.js");
Object.defineProperty(exports, "WaitBattleCondition", {
  enumerable: true,
  get: function () {
    return wait_battle_condition_js_1.WaitBattleCondition;
  }
});
var white_cat_warning_js_1 = require("./fb-action/white-cat-warning.js");
Object.defineProperty(exports, "WhiteCatWarning", {
  enumerable: true,
  get: function () {
    return white_cat_warning_js_1.WhiteCatWarning;
  }
});
//# sourceMappingURL=fb-action.js.map