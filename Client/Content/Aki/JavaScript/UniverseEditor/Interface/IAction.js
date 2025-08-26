"use strict";

var EActionTargetEntity;
var EEntityVarMatchType;
var EFlowListAction;
var EShowTalkCameraMotionType;
var EInteractUniqueness;
var EGuideTriggerType;
var EChangeEntityState;
var EWuYinQuState;
var ETeleportTransitionType;
var EMp4BackgroundColor;
var EAfterTeleportScreenColor;
var EFireBulletType;
var ETeleportType;
var ETeammateTeleportType;
var EClientTeleportType;
var EEnableSubLevelTransitionType;
var ERogueSelectRoomType;
var ERogueRewardReceiveType;
var ECenterTextShowAnim;
var ETextAlign;
var ETextHorizontal;
var EFontSize;
var ESetBattleStateType;
var ESetBattleTagType;
var EBattleStatePerceptionBehavior;
var ESetEntityTagType;
var EExecBattleActionType;
var EMoveEvent;
var EDetectBattleConditionType;
var EDetectBattleTagType;
var EUnlockSystemItemType;
var EUnlockCookSystemType;
var EUnlockAtlasSystemType;
var ECharacterMoveToPointType;
var ETraceSplineOptionType;
var ECommonTipType;
var ECommonTip2Type;
var EControlTrackingType;
var EAiEventType;
var EPlayerType;
var EEaseType;
var EFadeInScreenShowType;
var EMovieBackgroundType;
var EFadeUiOverride;
var EHideType;
var ELimitPlayOperation;
var ESystem;
var ELeisureInteract;
var ENpcLeisureInteract;
var EPostAkEvent;
var EMoveSceneItemType;
var EMoveMotion;
var EStopSceneItemMoveType;
var EPieceColorType;
var ETuningStandGridType;
var ETuningStandBubbleTriggerType;
var ETuningStandVisualType;
var ETraceTracingGridType;
var ETraceTracingImageType;
var ESwitchSubLevelsType;
var ESwitchDataLayersTransitionType;
var ETeleportToLatestResetPointType;
var EAdjustPlayerCamera;
var EEnterOrbitalCameraType;
var EAirWallCollisionPreset;
var EToggleAirWall;
var EPlayerOperationType;
var EDisplayModeInPlayerOp;
var EEnableFunctionType;
var EMoveOperationType;
var ESkillOperationType;
var EDisplayModeInSkillOp;
var EExploreSkillType;
var ECameraOperationType;
var ESceneInteractionOperationType;
var EUiOperationType;
var EUiElement;
var EChangeEntityPrefabPerformanceType;
var EMapMarkState;
var EMapMarkType;
var ERegionConfigType;
var EJigsawPieceState;
var EJigsawShape;
var ESetJigsawItemType;
var ESetJigsawFoundationType;
var ESpecificVehicleRoleType;
var EGondolaVoiceTriggeredType;
function isOptionItem(e) {
  return e === "Option" || e === "SystemOption";
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ESetBattleTagType = exports.ESetBattleStateType = exports.EFontSize = exports.ETextHorizontal = exports.ETextAlign = exports.ECenterTextShowAnim = exports.ERogueRewardReceiveType = exports.ERogueSelectRoomType = exports.EEnableSubLevelTransitionType = exports.EClientTeleportType = exports.ETeammateTeleportType = exports.ETeleportType = exports.EFireBulletType = exports.EAfterTeleportScreenColor = exports.EMp4BackgroundColor = exports.ETeleportTransitionType = exports.EWuYinQuState = exports.EChangeEntityState = exports.isPerformanceTypeContainTag = exports.getEntityPrefabPerformanceTag = exports.getEntityPrefabPerformanceKeyByTag = exports.getPerformanceListByType = exports.entityPrefabPerformanceTypes = exports.entityPrefabPerformanceConfig = exports.getEntityStateTag = exports.isStateTypeContainsState = exports.getEntityStateKeyByTag = exports.getStateValuesByType = exports.getStatesByType = exports.getEntityStateTypes = exports.entityStateConfig = exports.EGuideTriggerType = exports.EInteractUniqueness = exports.logicOpTypeConfig = exports.compareTypeConfig = exports.calOpTypeConfig = exports.defaultTransform = exports.cameraTypeConfig = exports.cameraBindModeConfig = exports.plotModeConfig = exports.cameraModeConfig = exports.actorStateConfig = exports.EShowTalkCameraMotionType = exports.isOptionItem = exports.logLevelConfig = exports.EFlowListAction = exports.EEntityVarMatchType = exports.EActionTargetEntity = exports.actionInterfaceRecordMap = exports.actionInterfaceMap = undefined;
exports.exploreSkillTypeMapper = exports.EExploreSkillType = exports.EDisplayModeInSkillOp = exports.ESkillOperationType = exports.EMoveOperationType = exports.EEnableFunctionType = exports.EDisplayModeInPlayerOp = exports.EPlayerOperationType = exports.EToggleAirWall = exports.EAirWallCollisionPreset = exports.EEnterOrbitalCameraType = exports.EAdjustPlayerCamera = exports.ETeleportToLatestResetPointType = exports.ESwitchDataLayersTransitionType = exports.ESwitchSubLevelsType = exports.ETraceTracingImageType = exports.ETraceTracingGridType = exports.ETuningStandVisualType = exports.ETuningStandBubbleTriggerType = exports.ETuningStandGridType = exports.EPieceColorType = exports.EStopSceneItemMoveType = exports.EMoveMotion = exports.EMoveSceneItemType = exports.EPostAkEvent = exports.ENpcLeisureInteract = exports.ELeisureInteract = exports.ESystem = exports.ELimitPlayOperation = exports.EHideType = exports.EFadeUiOverride = exports.EMovieBackgroundType = exports.EFadeInScreenShowType = exports.EEaseType = exports.EPlayerType = exports.EAiEventType = exports.EControlTrackingType = exports.ECommonTip2Type = exports.ECommonTipType = exports.ETraceSplineOptionType = exports.ECharacterMoveToPointType = exports.EUnlockAtlasSystemType = exports.EUnlockCookSystemType = exports.EUnlockSystemItemType = exports.EDetectBattleTagType = exports.EDetectBattleConditionType = exports.EMoveEvent = exports.EExecBattleActionType = exports.ESetEntityTagType = exports.EBattleStatePerceptionBehavior = undefined;
exports.EGondolaVoiceTriggeredType = exports.ESpecificVehicleRoleType = exports.ESetJigsawFoundationType = exports.ESetJigsawItemType = exports.EJigsawShape = exports.EJigsawPieceState = exports.ERegionConfigType = exports.EMapMarkType = exports.EMapMarkState = exports.EChangeEntityPrefabPerformanceType = exports.EUiElement = exports.EUiOperationType = exports.ESceneInteractionOperationType = exports.ECameraOperationType = undefined;
exports.actionInterfaceMap = {
  Activate: undefined,
  AccpetCurrentQuest: undefined,
  AddFlowInteractOption: undefined,
  SetTime: undefined,
  AwakeEntity: undefined,
  CalculateVar: undefined,
  RandomVar: undefined,
  CallByCondition: undefined,
  CallFunction: undefined,
  CameraLookAt: undefined,
  StopCameraLookAt: undefined,
  EnableHostility: undefined,
  ChangeActorState: undefined,
  ChangeBehaviorState: undefined,
  ChangeEntityState: undefined,
  ChangeNpcPerformState: undefined,
  ChangeInteractOptionText: undefined,
  ChangeOtherState: undefined,
  ChangeRandomState: undefined,
  ChangeState: undefined,
  Collect: undefined,
  CompleteChildQuest: undefined,
  Destroy: undefined,
  DestroyAllChild: undefined,
  DestroyEntity: undefined,
  DestroySelf: undefined,
  DoCalculate: undefined,
  EnableFunction: undefined,
  FaceToPos: undefined,
  FinishDoInteract: undefined,
  FinishState: undefined,
  FinishTalk: undefined,
  GetItem: undefined,
  DestroyQuestItem: undefined,
  GuideTrigger: undefined,
  CompleteGuide: undefined,
  Invoke: undefined,
  JumpTalk: undefined,
  Log: undefined,
  MoveToPos: undefined,
  MoveWithSpline: undefined,
  NewMoveWithSpline: undefined,
  StopNewMoveWithSpline: undefined,
  CharacterMoveToPoint: undefined,
  OpenSystemBoard: undefined,
  OpenSystemFunction: undefined,
  PlayCustomSequence: undefined,
  PlayerLookAt: undefined,
  EntityLookAt: undefined,
  CharacterLookAt: undefined,
  EntityTurnTo: undefined,
  PlayFlow: undefined,
  PlayMovie: undefined,
  PlayEffect: undefined,
  PlayEffect2: undefined,
  RemoveEffect: undefined,
  PlayMontage: undefined,
  PlaySequenceData: undefined,
  PlayerInput: undefined,
  Prompt: undefined,
  AddPlayBubble: undefined,
  PlayBubble: undefined,
  ClearPlayBubble: undefined,
  EnableAI: undefined,
  RemoveFlowInteractOption: undefined,
  SendNpcMail: undefined,
  SetBehaviorIsPaused: undefined,
  SetCameraMode: undefined,
  SetEntityVisible: undefined,
  SetEntityClientVisible: undefined,
  SetEntityClientVisibleSave: undefined,
  SetHeadIconVisible: undefined,
  SetMoveSpeed: undefined,
  SetNumberVar: undefined,
  SetPlotMode: undefined,
  SetPos: undefined,
  SetVar: undefined,
  SetActorVar: undefined,
  ShowCenterText: undefined,
  ShowMessage: undefined,
  ShowTalk: undefined,
  SimpleMove: undefined,
  SpawnChild: undefined,
  SpawnEntity: undefined,
  SyncVarToActorState: undefined,
  Wait: undefined,
  AddBuffToEntity: undefined,
  AddBuffToPlayer: undefined,
  AddBuffToFollowShooter: undefined,
  LockEntity: undefined,
  UnlockEntity: undefined,
  SetForceLock: undefined,
  SetAreaState: undefined,
  SetWuYinQuState: undefined,
  RemoveBuffFromEntity: undefined,
  RemoveBuffFromPlayer: undefined,
  SetPlayerMoveControl: undefined,
  UnlockTeleportTrigger: undefined,
  ChangeTeamPosition: undefined,
  ClientChangeTeamPosition: undefined,
  ClaimLevelPlayReward: undefined,
  SetReviveRegion: undefined,
  PromptQuestChapterUI: undefined,
  FireBullet: undefined,
  FireBulletEffect: undefined,
  SetPlayerPos: undefined,
  ClientSetPlayerPos: undefined,
  ClientPreEnableSubLevels: undefined,
  ChangeSelfEntityState: undefined,
  InterludeActions: undefined,
  AddBuffToTriggeredEntity: undefined,
  RemoveBuffToTriggeredEntity: undefined,
  DetectTrigger: undefined,
  ItemFoundationMatch: undefined,
  SetBattleState: undefined,
  ExecBattleAction: undefined,
  ExecClientBattleAction: undefined,
  WaitBattleCondition: undefined,
  UnlockSystemItem: undefined,
  RunActions: undefined,
  CommonTip: undefined,
  EndCommonTip: undefined,
  CommonTip2: undefined,
  EnableNearbyTracking: undefined,
  EnableLevelPlay: undefined,
  UnLimitPlayerOperation: undefined,
  LimitPlayerOperation: undefined,
  SetPlayerOperationRestriction: undefined,
  LeisureInteract: undefined,
  NpcLeisureInteract: undefined,
  ChangePhantom: undefined,
  RestorePhantom: undefined,
  TakePlotPhoto: undefined,
  OpenQte: undefined,
  Preload: undefined,
  RemovePreloadResource: undefined,
  ExecAlertSystemAction: undefined,
  ChangeEntityCamp: undefined,
  RecordDungeonEvent: undefined,
  ResetLevelPlay: undefined,
  GetRewardByInteract: undefined,
  TriggerSpecificScanEffect: undefined,
  WaitUntilLevelSequenceReachMark: undefined,
  GuestOperateUiAnimation: undefined,
  VehicleEnter: undefined,
  VehicleEnterNpc: undefined,
  VehicleExitPlayer: undefined,
  VehicleExitNpc: undefined,
  VehicleTeleport: undefined,
  VehiclePlayPassengerVoice: undefined,
  VehicleWaterfallClimbing: undefined,
  TeleportToAndEnterVehicle: undefined,
  VehicleMoveWithPathLine: undefined,
  VehicleSprint: undefined,
  SetAreaTimeState: undefined,
  SlideRailStart: undefined,
  BvbSendSystemEvent: undefined,
  BvbPlayDialog: undefined,
  BvbSendAiEvent: undefined,
  BvbPlayerOperationConstraint: undefined,
  TeleportDungeon: undefined,
  SettlementDungeon: undefined,
  ClaimDungeonReward: undefined,
  ExitDungeon: undefined,
  UnlockDungeonEntry: undefined,
  FinishDungeon: undefined,
  StopUiScreenEffect: undefined,
  StartFlowTemplate: undefined,
  BeginFlowTemplate: undefined,
  ChangeFlowTemplate: undefined,
  SetFlowTemplate: undefined,
  EndFlowTemplate: undefined,
  CloseFlowTemplate: undefined,
  SendAiEvent: undefined,
  FadeInScreen: undefined,
  FadeOutScreen: undefined,
  ChangeFightTeam: undefined,
  ManualOccupations: undefined,
  AddTrialCharacter: undefined,
  UpdateTrialCharacter: undefined,
  RestoreTrialCharacter: undefined,
  RemoveTrialCharacter: undefined,
  AddGuestCharacter: undefined,
  RemoveGuestCharacter: undefined,
  AddTrialFollowShooter: undefined,
  RemoveTrialFollowShooter: undefined,
  DestroyQuest: undefined,
  SetCameraAnim: undefined,
  RotatorEntity: undefined,
  TraceSpline: undefined,
  ToggleScanSplineEffect: undefined,
  ChangeTimer: undefined,
  ToggleTimerPauseState: undefined,
  EnableSystem: undefined,
  PostAkEvent: undefined,
  MoveSceneItem: undefined,
  StopSceneItemMove: undefined,
  ChangeLiftTarget: undefined,
  HideByRangeInFlow: undefined,
  ShowAllHidedGroupInFlow: undefined,
  OpenSimpleGameplay: undefined,
  ChangeActorTalker: undefined,
  SwitchSubLevels: undefined,
  SwitchDataLayers: undefined,
  ActivateResetPoint: undefined,
  TeleportToLatestResetPoint: undefined,
  SetWeather: undefined,
  SetTimeLockState: undefined,
  SetWeatherLockState: undefined,
  AdjustPlayerCamera: undefined,
  RestorePlayerCameraAdjustment: undefined,
  ResetPlayerCameraFocus: undefined,
  UsePhantomSkill: undefined,
  ChangePhantomFormation: undefined,
  RestorePhantomFormation: undefined,
  EnterOrbitalCamera: undefined,
  ExitOrbitalCamera: undefined,
  EnableSplineMoveModel: undefined,
  SetSportsState: undefined,
  PlayLevelSequence: undefined,
  SetExploreState: undefined,
  RogueGotoNextFloor: undefined,
  RogueSelectRoom: undefined,
  RogueActivatePortal: undefined,
  RogueReceiveReward: undefined,
  EnableAoiNotify: undefined,
  ChangeEntityPrefabPerformance: undefined,
  ModifySceneItemAttributeTag: undefined,
  ToggleMapMarkState: undefined,
  FocusOnMapMark: undefined,
  EnableTemporaryTeleport: undefined,
  SetTeleControl: undefined,
  ActiveAntiGravitySafePoint: undefined,
  ClearFishingCabinInSaleItems: undefined,
  AcceptFishingEntrust: undefined,
  DestroyFishingBoat: undefined,
  SetSpineAnimation: undefined,
  DangoAbyssActivatePortal: undefined,
  DangoAbyssGotoNextFloor: undefined,
  DangoAbyssCreateRewardTreasureBox: undefined,
  DangoAbyssReceiveReward: undefined,
  SetTimeScale: undefined,
  EnableActor: undefined,
  ModifyActorMaterial: undefined,
  ToggleAirWall: undefined,
  TriggerCameraShake: undefined,
  CreatePrefab: undefined,
  DestroyPrefab: undefined,
  PlayRegisteredMontage: undefined,
  RecoverDurability: undefined,
  SetRegionConfig: undefined,
  SetJigsawItem: undefined,
  SetJigsawFoundation: undefined,
  ToggleHighlightExploreUi: undefined,
  ResetEntity: undefined,
  PlayDynamicSettlement: undefined,
  SetInteractionLockState: undefined,
  FinishCondition: undefined,
  ClearEntityVisibleTag: undefined,
  SetEntityPos: undefined,
  ResetEntityPos: undefined,
  ServerSetPlayerPos: undefined,
  FixTeleControllerPos: undefined,
  CustomJson: undefined,
  FixFoundationRelation: undefined,
  FixShowTargetRange: undefined,
  ForceOccupations: undefined,
  ServerForceEnableLevelPlay: undefined,
  TeleportDungeonPos: undefined,
  SetAudioState: undefined,
  PerformerAiSplineMove: undefined,
  PerformerAiMoveTo: undefined,
  HideTargetRange: undefined,
  ShowTargetRange: undefined,
  HideSpecificEntities: undefined,
  ShowSpecificEntities: undefined,
  HideGroup: undefined,
  ShowHidedGroup: undefined,
  ReignsSetPropertyVisible: undefined,
  ReignsChangeBackground: undefined,
  ReignsChangePlayerName: undefined,
  ReignsCallCard: undefined,
  ReignsTriggerGuide: undefined,
  ReignsAddBuff: undefined,
  ReignsCheckSettle: undefined,
  TarkovInteractPickUp: undefined,
  TrapDefenseChangeMiniMap: undefined,
  TrapDefensePlayerOperationConstraint: undefined,
  SetNpcGroupPerform: undefined,
  RemoveNpcGroupPerform: undefined,
  EnableEntityLookAt: undefined,
  DisableEntityLookAt: undefined,
  OverrideAiBehaviorTree: undefined,
  RestoreAiBehaviorTree: undefined,
  FlowDefineNpcGroupPerform: undefined,
  SeqEventAddTagToSelf: undefined,
  SeqEventFireBullet: undefined,
  ExecResurrection: undefined,
  OpenSystemBoardWithReturn: undefined,
  ExecRiskHarvestEffect: undefined,
  MowingTowerGotoNextFloor: undefined,
  SlashAndTowerGotoNextFloor: undefined,
  SummonEntity: undefined,
  SetupMoraleSystem: undefined,
  RunActorCustomEvent: undefined,
  RequestSystemFunction: undefined,
  PlayWalkingOverlayMontage: undefined,
  ChangeNpcAbpState: undefined,
  CloseWalkingOverlayMontage: undefined
};
exports.actionInterfaceRecordMap = exports.actionInterfaceMap;
(function (e) {
  e[e.Self = -10000] = "Self";
})(EActionTargetEntity = exports.EActionTargetEntity ||= {});
(function (e) {
  e.EntityId = "EntityId";
  e.EntityState = "EntityState";
})(EEntityVarMatchType = exports.EEntityVarMatchType ||= {});
(function (e) {
  e[e.GenText = 0] = "GenText";
  e[e.ModifyText = 1] = "ModifyText";
})(EFlowListAction = exports.EFlowListAction ||= {});
exports.logLevelConfig = {
  Info: "提示",
  Warn: "警告",
  Error: "错误"
};
exports.isOptionItem = isOptionItem;
(function (e) {
  e.Preset = "Preset";
  e.Tween = "Tween";
})(EShowTalkCameraMotionType = exports.EShowTalkCameraMotionType ||= {});
exports.actorStateConfig = {
  Idle: "待机",
  Open: "打开",
  Close: "关闭"
};
exports.cameraModeConfig = {
  Drama: "剧情相机",
  Follow: "跟随",
  FollowDrama: "跟随相机剧情模式"
};
exports.plotModeConfig = {
  LevelA: "A级演出",
  LevelB: "B级演出",
  LevelC: "C级演出",
  LevelD: "D级演出",
  Prompt: "头像浮框",
  Reigns: "王权玩法"
};
exports.cameraBindModeConfig = {
  One: "1角色",
  Two: "2角色",
  Three: "3角色",
  None: "无"
};
exports.cameraTypeConfig = {
  CS: "特写",
  MS: "中景",
  WS: "远景",
  None: "无"
};
exports.defaultTransform = {
  Pos: {
    X: 0,
    Y: 0,
    Z: 0
  }
};
exports.calOpTypeConfig = {
  Add: "+",
  Sub: "-",
  Mut: "×",
  Div: "÷"
};
exports.compareTypeConfig = {
  Ge: ">=",
  Gt: ">",
  Le: "<=",
  Lt: "<",
  Eq: "==",
  Ne: "!="
};
exports.logicOpTypeConfig = {
  And: "与",
  Or: "或"
};
(EInteractUniqueness = exports.EInteractUniqueness ||= {}).Closest = "Closest";
(function (e) {
  e.BeginnerGuide = "BeginnerGuide";
  e.AttackGuide = "AttackGuide";
})(EGuideTriggerType = exports.EGuideTriggerType ||= {});
exports.entityStateConfig = {
  激活态: {
    常态: "关卡.Common.状态.常态",
    激活: "关卡.Common.状态.激活"
  },
  完成态: {
    常态: "关卡.Common.状态.常态",
    激活: "关卡.Common.状态.激活",
    完成: "关卡.Common.状态.完成"
  },
  失败态: {
    常态: "关卡.Common.状态.常态",
    激活: "关卡.Common.状态.激活",
    完成: "关卡.Common.状态.完成",
    失败: "关卡.Common.状态.失败"
  },
  封锁态: {
    封锁: "关卡.Common.状态.封锁",
    解锁: "关卡.Common.状态.解锁",
    常态: "关卡.Common.状态.常态",
    激活: "关卡.Common.状态.激活",
    完成: "关卡.Common.状态.完成"
  },
  状态型打击机关: {
    状态1: "关卡.打击机关.状态1",
    状态5: "关卡.打击机关.状态5",
    完成: "关卡.Common.状态.完成",
    已废弃状态2: "关卡.打击机关.状态2",
    已废弃状态3: "关卡.打击机关.状态3",
    已废弃状态4: "关卡.打击机关.状态4",
    已废弃状态6: "关卡.打击机关.状态6",
    已废弃状态7: "关卡.打击机关.状态7",
    已废弃初始状态: "关卡.打击机关.初始状态",
    已废弃完成状态: "关卡.打击机关.完成状态"
  },
  打击机关组: {
    激活: "关卡.Common.状态.激活",
    完成: "关卡.Common.状态.完成"
  },
  射击靶: {
    数字状态1: "关卡.射击靶.状态1",
    数字状态2: "关卡.射击靶.状态2",
    数字状态3: "关卡.射击靶.状态3",
    数字状态4: "关卡.射击靶.状态4",
    完成状态: "关卡.射击靶.状态5",
    禁止状态: "关卡.射击靶.状态6",
    初始状态: "关卡.射击靶.状态7",
    禁止射击: "关卡.射击靶.禁止射击",
    允许射击: "关卡.射击靶.允许射击",
    完成射击: "关卡.射击靶.完成射击"
  },
  射击靶组: {
    常态: "关卡.Common.状态.常态",
    激活: "关卡.Common.状态.激活",
    完成: "关卡.Common.状态.完成"
  },
  鲸鱼冰面: {
    初始状态: "关卡.鲸鱼冰面.初始状态",
    战斗状态1: "关卡.鲸鱼冰面.战斗状态1",
    战斗状态2: "关卡.鲸鱼冰面.战斗状态2",
    战斗状态3: "关卡.鲸鱼冰面.战斗状态3",
    结束状态: "关卡.鲸鱼冰面.结束状态"
  },
  多层电梯: {
    上升: "关卡.电梯.上升",
    下降: "关卡.电梯.下降",
    停靠: "关卡.电梯.停靠"
  },
  声弦: {
    隐藏: "关卡.声弦.隐藏",
    常驻: "关卡.声弦.常驻",
    收缩: "关卡.声弦.收缩",
    爆炸: "关卡.声弦.爆炸",
    锁定: "关卡.Common.状态.锁定"
  },
  无音区: {
    沉寂: "关卡.无音区.沉寂",
    激活: "关卡.无音区.激活",
    净化: "关卡.无音区.净化"
  },
  副本入口: {
    可解锁: "物体.物体阶段.可解锁",
    常态: "关卡.Common.状态.常态",
    激活: "关卡.Common.状态.激活",
    交互中: "关卡.Common.状态.交互中"
  },
  二态电压: {
    高压: "关卡.Common.状态.高压",
    低压: "关卡.Common.状态.低压"
  },
  中枢乐器: {
    常态: "关卡.Common.状态.常态",
    一阶段: "关卡.中枢乐器.状态.一阶段",
    二阶段: "关卡.中枢乐器.状态.二阶段",
    三阶段: "关卡.中枢乐器.状态.三阶段",
    四阶段: "关卡.中枢乐器.状态.四阶段",
    五阶段: "关卡.中枢乐器.状态.五阶段"
  },
  物体阶段: {
    完整: "物体.物体阶段.完整",
    轻微破损: "物体.物体阶段.轻微破损",
    严重破损: "物体.物体阶段.严重破损",
    完全破坏: "物体.物体阶段.完全破坏"
  },
  时间回放: {
    状态1: "关卡.时间回放.状态1",
    状态2: "关卡.时间回放.状态2",
    状态3: "关卡.时间回放.状态3",
    状态4: "关卡.时间回放.状态4",
    状态5: "关卡.时间回放.状态5",
    状态6: "关卡.时间回放.状态6",
    状态7: "关卡.时间回放.状态7",
    状态8: "关卡.时间回放.状态8",
    状态9: "关卡.时间回放.状态9",
    状态10: "关卡.时间回放.状态10",
    占位: "关卡.时间回放.占位"
  },
  场景交互: {
    常态: "关卡.Common.状态.常态",
    交互中: "关卡.Common.状态.场景物件交互中"
  },
  屏障生成机关: {
    闭合: "关卡.屏障生成机关.闭合",
    启动: "关卡.屏障生成机关.启动",
    故障: "关卡.屏障生成机关.故障",
    完成: "关卡.屏障生成机关.完成",
    封锁: "关卡.屏障生成机关.封锁"
  },
  LevelSeq标记: {
    标记A: "关卡.LevelSeq标记.标记A",
    标记B: "关卡.LevelSeq标记.标记B",
    标记C: "关卡.LevelSeq标记.标记C",
    标记D: "关卡.LevelSeq标记.标记D",
    标记E: "关卡.LevelSeq标记.标记E",
    标记F: "关卡.LevelSeq标记.标记F",
    标记G: "关卡.LevelSeq标记.标记G",
    标记H: "关卡.LevelSeq标记.标记H",
    标记I: "关卡.LevelSeq标记.标记I",
    标记J: "关卡.LevelSeq标记.标记J"
  },
  黑海岸时针石柱: {
    常态: "关卡.黑海岸时针石柱.常态",
    可激活: "关卡.黑海岸时针石柱.可激活",
    激活: "关卡.黑海岸时针石柱.激活",
    完成: "关卡.黑海岸时针石柱.完成"
  },
  采集物底座: {
    未采集: "关卡.采集物底座.未采集",
    完全采集: "关卡.采集物底座.完全采集"
  },
  Npc生态事件: {
    事件1: "关卡.Npc生态事件.事件1",
    事件2: "关卡.Npc生态事件.事件2",
    事件3: "关卡.Npc生态事件.事件3",
    事件4: "关卡.Npc生态事件.事件4",
    事件5: "关卡.Npc生态事件.事件5",
    事件6: "关卡.Npc生态事件.事件6",
    事件7: "关卡.Npc生态事件.事件7",
    事件8: "关卡.Npc生态事件.事件8"
  },
  踩踏机关: {
    顶部: "关卡.踩踏机关.顶部",
    下降中: "关卡.踩踏机关.下降中",
    上升中: "关卡.踩踏机关.上升中",
    底部: "关卡.踩踏机关.底部"
  },
  传送门: {
    闲置: "关卡.传送门.闲置",
    激活: "关卡.传送门.激活",
    传送中: "关卡.传送门.传送中",
    传送完成: "关卡.传送门.传送完成"
  },
  黑石囚笼: {
    完整: "关卡.黑石囚笼.完整",
    破损一阶段: "关卡.黑石囚笼.破损.一阶段",
    破损二阶段: "关卡.黑石囚笼.破损.二阶段",
    破损三阶段: "关卡.黑石囚笼.破损.三阶段",
    完全破坏: "关卡.黑石囚笼.完全破坏"
  },
  乘霄山光线传导机关: {
    常态: "关卡.Common.状态.常态",
    激活: "关卡.Common.状态.激活",
    准备中: "关卡.Common.状态.准备中",
    完成: "关卡.Common.状态.完成"
  },
  多层封锁态: {
    常态: "关卡.Common.状态.常态",
    一层: "关卡.多层封锁.一层",
    二层: "关卡.多层封锁.二层",
    三层: "关卡.多层封锁.三层",
    四层: "关卡.多层封锁.四层",
    五层: "关卡.多层封锁.五层",
    完成: "关卡.Common.状态.完成"
  },
  大个布偶坚固岩石: {
    状态1: "关卡.打击机关.状态1",
    状态2: "关卡.打击机关.状态2",
    状态3: "关卡.打击机关.状态3",
    状态4: "关卡.打击机关.状态4",
    状态5: "关卡.打击机关.状态5",
    状态6: "关卡.打击机关.状态6"
  },
  走图案玩法控制器: {
    常态: "关卡.打击机关.状态1",
    准备态: "关卡.打击机关.状态2",
    激活态: "关卡.打击机关.状态3",
    完成态: "关卡.打击机关.状态4",
    回放态: "关卡.打击机关.状态5"
  },
  档位控制: {
    停止: "关卡.档位控制.停止",
    慢速: "关卡.档位控制.慢速",
    快速: "关卡.档位控制.快速",
    档位1: "关卡.档位控制.档位1",
    档位2: "关卡.档位控制.档位2",
    档位3: "关卡.档位控制.档位3",
    档位4: "关卡.档位控制.档位4",
    档位5: "关卡.档位控制.档位5"
  },
  斩击状态: {
    激活: "关卡.Common.状态.激活",
    封锁: "关卡.Common.状态.封锁",
    完成: "关卡.Common.状态.完成",
    失败: "关卡.Common.状态.失败"
  },
  神王频率状态: {
    普通常态: "关卡.打击机关.状态1",
    普通激活: "关卡.打击机关.状态2",
    普通完成: "关卡.打击机关.状态3",
    神王常态: "关卡.打击机关.状态4",
    神王激活: "关卡.打击机关.状态5",
    神王完成: "关卡.打击机关.状态6"
  },
  呓语雕像状态: {
    完整状态: "关卡.打击机关.状态1",
    破坏阶段1: "关卡.打击机关.状态2",
    破坏阶段2: "关卡.打击机关.状态3",
    破坏阶段3: "关卡.打击机关.状态4",
    破坏阶段4: "关卡.打击机关.状态5"
  },
  老虎机: {
    关闭: "关卡.老虎机.关闭",
    开启: "关卡.老虎机.开启",
    旋转状态1: "关卡.老虎机.旋转状态1",
    旋转状态2: "关卡.老虎机.旋转状态2",
    旋转状态3: "关卡.老虎机.旋转状态3",
    旋转状态4: "关卡.老虎机.旋转状态4",
    旋转状态5: "关卡.老虎机.旋转状态5",
    旋转状态6: "关卡.老虎机.旋转状态6",
    旋转状态7: "关卡.老虎机.旋转状态7",
    旋转状态8: "关卡.老虎机.旋转状态8",
    激活: "关卡.Common.状态.激活",
    失败: "关卡.Common.状态.失败",
    完成: "关卡.Common.状态.完成"
  }
};
const entityStateTypes = Object.keys(exports.entityStateConfig);
function getEntityStateTypes() {
  return entityStateTypes;
}
exports.getEntityStateTypes = getEntityStateTypes;
const statesMap = new Map();
function initStatesMap() {
  statesMap.clear();
  for (const t of Object.entries(exports.entityStateConfig)) {
    var e = new Map();
    statesMap.set(t[0], e);
    var o = Object.entries(t[1]);
    for (const i of o) {
      e.set(i[0], i[1]);
    }
  }
}
function getStatesByType(e) {
  if (statesMap.size <= 0) {
    initStatesMap();
  }
  e = statesMap.get(e);
  if (e) {
    return Array.from(e.keys());
  } else {
    return [];
  }
}
function getStateValuesByType(e) {
  if (statesMap.size <= 0) {
    initStatesMap();
  }
  e = statesMap.get(e);
  if (e) {
    return Array.from(e.values());
  } else {
    return [];
  }
}
function getEntityStateKeyByTag(e, o) {
  if (statesMap.size <= 0) {
    initStatesMap();
  }
  for (const t of statesMap) {
    if (t[0] === e) {
      for (const i of t[1]) {
        if (i[1] === o) {
          return i[0];
        }
      }
    }
  }
}
function isStateTypeContainsState(e, o) {
  o = getEntityStateKeyByTag(e, o);
  return !!o && getStatesByType(e)?.includes(o);
}
function getEntityStateTag(e, o) {
  var t = exports.entityStateConfig[e];
  if (t) {
    return t[o];
  }
  throw new Error(`getEntityStateTag: ${e} is not exist`);
}
exports.getStatesByType = getStatesByType;
exports.getStateValuesByType = getStateValuesByType;
exports.getEntityStateKeyByTag = getEntityStateKeyByTag;
exports.isStateTypeContainsState = isStateTypeContainsState;
exports.getEntityStateTag = getEntityStateTag;
exports.entityPrefabPerformanceConfig = {
  副本入口: {
    交互中: "关卡.Common.表现.交互中"
  },
  反弹板: {
    隐藏特效: "关卡.Common.表现.隐藏",
    激活特效: "关卡.Common.表现.激活"
  },
  光线传导机关: {
    启动未连接: "关卡.Common.表现.光线传导机关.启动.未连接",
    启动且被其他对象连接: "关卡.Common.表现.光线传导机关.启动.被连接",
    启动且连接到其他对象: "关卡.Common.表现.光线传导机关.启动.连接到对象"
  }
};
exports.entityPrefabPerformanceTypes = Object.keys(exports.entityPrefabPerformanceConfig);
const myEntityPrefabPerformanceMap = new Map();
function getEntityPrefabPerformanceMap() {
  var e = myEntityPrefabPerformanceMap;
  if (e.size === 0) {
    for (const i of Object.entries(exports.entityPrefabPerformanceConfig)) {
      var o = new Map();
      e.set(i[0], o);
      var t = Object.entries(i[1]);
      for (const r of t) {
        o.set(r[0], r[1]);
      }
    }
  }
  return e;
}
function getPerformanceListByType(e) {
  e = getEntityPrefabPerformanceMap().get(e);
  if (e) {
    return Array.from(e.keys());
  } else {
    return [];
  }
}
function getEntityPrefabPerformanceKeyByTag(e, o) {
  e = getEntityPrefabPerformanceMap().get(e);
  if (e) {
    for (var [t, i] of e) {
      if (i === o) {
        return t;
      }
    }
  }
}
function getEntityPrefabPerformanceTag(e, o) {
  var t = exports.entityPrefabPerformanceConfig[e];
  if (t) {
    return t[o];
  }
  throw new Error(`getEntityPrefabPerformanceTag: ${e} is not exist`);
}
function isPerformanceTypeContainTag(e, o) {
  var t = getPerformanceListByType(e);
  var e = getEntityPrefabPerformanceKeyByTag(e, o);
  return !!e && t?.includes(e);
}
exports.getPerformanceListByType = getPerformanceListByType;
exports.getEntityPrefabPerformanceKeyByTag = getEntityPrefabPerformanceKeyByTag;
exports.getEntityPrefabPerformanceTag = getEntityPrefabPerformanceTag;
exports.isPerformanceTypeContainTag = isPerformanceTypeContainTag;
(function (e) {
  e.Directly = "Directly";
  e.BatchDirectly = "BatchDirectly";
  e.Loop = "Loop";
})(EChangeEntityState = exports.EChangeEntityState ||= {});
(function (e) {
  e[e.End = 0] = "End";
  e[e.Start = 1] = "Start";
  e[e.Nothing = 4] = "Nothing";
})(EWuYinQuState = exports.EWuYinQuState ||= {});
(function (e) {
  e.PlayMp4 = "PlayMp4";
  e.PlayEffect = "PlayEffect";
  e.CenterText = "CenterText";
  e.Seamless = "Seamless";
  e.FadeInScreen = "FadeInScreen";
  e.DigitalScreen = "DigitalScreen";
  e.CharacterDisplay = "CharacterDisplay";
  e.CustomLoading = "CustomLoading";
})(ETeleportTransitionType = exports.ETeleportTransitionType ||= {});
(function (e) {
  e.Black = "Black";
  e.White = "White";
})(EMp4BackgroundColor = exports.EMp4BackgroundColor ||= {});
(function (e) {
  e.Black = "Black";
  e.White = "White";
})(EAfterTeleportScreenColor = exports.EAfterTeleportScreenColor ||= {});
(function (e) {
  e.TrackTarget = "TrackTarget";
  e.ForwardFront = "ForwardFront";
  e.TrackPosition = "TrackPosition";
})(EFireBulletType = exports.EFireBulletType ||= {});
(function (e) {
  e[e.FixedPos = 0] = "FixedPos";
  e[e.NearestEntity = 1] = "NearestEntity";
  e[e.GravityFlipFixedPos = 2] = "GravityFlipFixedPos";
  e[e.SafePos = 3] = "SafePos";
})(ETeleportType = exports.ETeleportType ||= {});
(function (e) {
  e[e.TelePortAfterTimeOut = 0] = "TelePortAfterTimeOut";
})(ETeammateTeleportType = exports.ETeammateTeleportType ||= {});
(function (e) {
  e[e.RelativeEntityPos = 0] = "RelativeEntityPos";
})(EClientTeleportType = exports.EClientTeleportType ||= {});
(EEnableSubLevelTransitionType = exports.EEnableSubLevelTransitionType ||= {}).SceneCapture = "SceneCapture";
(ERogueSelectRoomType = exports.ERogueSelectRoomType ||= {}).Role = "Role";
(function (e) {
  e.ReceiveByCount = "ReceiveByCount";
  e.ReceiveByEnergy = "ReceiveByEnergy";
})(ERogueRewardReceiveType = exports.ERogueRewardReceiveType ||= {});
(function (e) {
  e.ShowAll = "ShowAll";
  e.FadeOut = "FadeOut";
  e.TypeWriter = "TypeWriter";
})(ECenterTextShowAnim = exports.ECenterTextShowAnim ||= {});
(function (e) {
  e.Top = "Top";
  e.Middle = "Middle";
  e.Bottom = "Bottom";
})(ETextAlign = exports.ETextAlign ||= {});
(function (e) {
  e.Left = "Left";
  e.Center = "Center";
  e.Right = "Right";
})(ETextHorizontal = exports.ETextHorizontal ||= {});
(function (e) {
  e.Small = "Small";
  e.Middle = "Middle";
  e.Big = "Big";
})(EFontSize = exports.EFontSize ||= {});
(function (e) {
  e.SetBattleTag = "SetBattleTag";
  e.NotifyMonsterPerception = "NotifyMonsterPerception";
  e.NotifyMonsterPlayStandbyTags = "NotifyMonsterPlayStandbyTags";
})(ESetBattleStateType = exports.ESetBattleStateType ||= {});
(function (e) {
  e.BattleMonsterLanding = "怪物.common.关卡.通信专用.幻象落地开启";
  e.BattleFinalMonsterLanding = "怪物.common.关卡.通信专用.唤醒者";
  e.BattleMonsterSleep = "怪物.common.关卡.睡觉";
})(ESetBattleTagType = exports.ESetBattleTagType ||= {});
(function (e) {
  e.NotifyGatherToPlayer = "NotifyGatherToPlayer";
  e.NotifyGatherToEntity = "NotifyGatherToEntity";
})(EBattleStatePerceptionBehavior = exports.EBattleStatePerceptionBehavior ||= {});
(function (e) {
  e.Add = "Add";
  e.Remove = "Remove";
})(ESetEntityTagType = exports.ESetEntityTagType ||= {});
(function (e) {
  e.SetBattleTags = "SetBattleTags";
  e.SetMonsterMoveTarget = "SetMonsterMoveTarget";
  e.ExitMonsterMoveTarget = "ExitMonsterMoveTarget";
})(EExecBattleActionType = exports.EExecBattleActionType ||= {});
(function (e) {
  e.Walk = "怪物.common.关卡.朝目标点移动.走";
  e.Run = "怪物.common.关卡.朝目标点移动.跑";
})(EMoveEvent = exports.EMoveEvent ||= {});
(EDetectBattleConditionType = exports.EDetectBattleConditionType ||= {}).DetectBattleTag = "DetectBattleTag";
(EDetectBattleTagType = exports.EDetectBattleTagType ||= {}).MonsterOnTheGround = "怪物.common.关卡.通信专用.进入战斗";
(function (e) {
  e.CookSystem = "CookSystem";
  e.AtlasSystem = "AtlasSystem";
  e.AchievementSystem = "AchievementSystem";
  e.PhotoMemoryCollect = "MemoirsSystem";
  e.DangoCollect = "DangoCollect";
})(EUnlockSystemItemType = exports.EUnlockSystemItemType ||= {});
(EUnlockCookSystemType = exports.EUnlockCookSystemType ||= {}).UnlockCookBook = "UnlockCookBook";
(function (e) {
  e.GeographicalAtlas = "GeographicalAtlas";
  e.PlotPhoto = "PlotPhoto";
  e.Noun = "Noun";
})(EUnlockAtlasSystemType = exports.EUnlockAtlasSystemType ||= {});
(function (e) {
  e.Walk = "Walk";
  e.Adaptive = "Adaptive";
})(ECharacterMoveToPointType = exports.ECharacterMoveToPointType ||= {});
(function (e) {
  e.Open = "Open";
  e.Close = "Close";
})(ETraceSplineOptionType = exports.ETraceSplineOptionType ||= {});
(function (e) {
  e[e.ChallengeCondition = 0] = "ChallengeCondition";
  e[e.ChallengeSuccess = 3] = "ChallengeSuccess";
  e[e.ChallengeFail = 4] = "ChallengeFail";
  e[e.ReachChallenge = 5] = "ReachChallenge";
  e[e.TriggerDelegation = 6] = "TriggerDelegation";
  e[e.MissionComplete = 7] = "MissionComplete";
  e[e.GeneralFloatingTip = 9] = "GeneralFloatingTip";
  e[e.TipId = 10] = "TipId";
  e[e.PrepareCountdown = 11] = "PrepareCountdown";
  e[e.EnterInRange = 12] = "EnterInRange";
  e[e.FirstComplete = 13] = "FirstComplete";
  e[e.RemainStarWarning = 14] = "RemainStarWarning";
  e[e.DreamlessWarning = 15] = "DreamlessWarning";
  e[e.PunishReport = 16] = "PunishReport";
  e[e.BlackCatWarning = 17] = "BlackCatWarning";
  e[e.WhiteCatWarning = 18] = "WhiteCatWarning";
  e[e.SlashAndTowerTip = 19] = "SlashAndTowerTip";
  e[e.BadBuKingChallengeTip = 20] = "BadBuKingChallengeTip";
  e[e.MoraleAreaTip = 21] = "MoraleAreaTip";
  e[e.NightmareLord = 22] = "NightmareLord";
  e[e.NightmareSpawnPoint = 23] = "NightmareSpawnPoint";
  e[e.GreatSwordChallenge = 24] = "GreatSwordChallenge";
  e[e.TrapDefenseTip = 25] = "TrapDefenseTip";
})(ECommonTipType = exports.ECommonTipType ||= {});
(function (e) {
  e[e.PrepareCountdown = 0] = "PrepareCountdown";
})(ECommonTip2Type = exports.ECommonTip2Type ||= {});
(function (e) {
  e.Self = "Self";
  e.Other = "Other";
})(EControlTrackingType = exports.EControlTrackingType ||= {});
(function (e) {
  e.CatAndDogPlayFlow = "CatAndDogPlayFlow";
  e.AnimalStandUp = "AnimalStandUp";
  e.AnimalSitDown = "AnimalSitDown";
  e.AnimalRandomAction = "AnimalRandomAction";
})(EAiEventType = exports.EAiEventType ||= {});
(function (e) {
  e.P1 = "P1";
  e.P2 = "P2";
  e.P3 = "P3";
})(EPlayerType = exports.EPlayerType ||= {});
(function (e) {
  e[e.Linear = 0] = "Linear";
  e[e.Transient = 1] = "Transient";
  e[e.InOutCubic = 2] = "InOutCubic";
  e[e.OutSine = 3] = "OutSine";
  e[e.OutQuart = 4] = "OutQuart";
})(EEaseType = exports.EEaseType ||= {});
(function (e) {
  e.White = "White";
  e.Black = "Black";
})(EFadeInScreenShowType = exports.EFadeInScreenShowType ||= {});
(function (e) {
  e.White = "White";
  e.Black = "Black";
})(EMovieBackgroundType = exports.EMovieBackgroundType ||= {});
(function (e) {
  e[e.ShowTalkDialog = 0] = "ShowTalkDialog";
})(EFadeUiOverride = exports.EFadeUiOverride ||= {});
(function (e) {
  e.WorldMonsterAndMonsterTreasure = "WorldMonsterAndMonsterTreasure";
  e.WorldEntityAndLevelPlay = "WorldEntityAndLevelPlay";
  e.SpecifyEntity = "SpecifyEntity";
  e.SpecifyLevelPlay = "SpecifyLevelPlay";
  e.SpecifyDataLayers = "SpecifyDataLayers";
})(EHideType = exports.EHideType ||= {});
(function (e) {
  e.AllowCamera = "AllowCamera";
  e.AllowAction = "AllowAction";
  e.AllowMove = "AllowMove";
  e.AllowMoveNew = "AllowMoveNew";
  e.AllowUi = "AllowUi";
  e.AllowMouse = "AllowMouse";
  e.BlockAll = "BlockAll";
})(ELimitPlayOperation = exports.ELimitPlayOperation ||= {});
(function (e) {
  e[e.Map = 10015] = "Map";
  e[e.Team = 10007] = "Team";
})(ESystem = exports.ESystem ||= {});
(function (e) {
  e.SitDown = "SitDown";
  e.SitOnGround = "SitOnGround";
  e.Bounce = "Bounce";
  e.Catapult = "Catapult";
  e.SuperCatapult = "SuperCatapult";
  e.Manipulate = "Manipulate";
  e.StandControl = "StandControl";
  e.StandControl2 = "StandControl2";
  e.Soar = "Soar";
  e.Soar2 = "Soar2";
  e.Glide = "Glide";
  e.HookLock = "HookLock";
  e.KiteHook = "KiteHook";
  e.GetUp = "GetUp";
  e.FailurePose = "FailurePose";
  e.GameplayPose1 = "GameplayPose1";
  e.GameplayPose2 = "GameplayPose2";
  e.GameplayPose3 = "GameplayPose3";
  e.FaithJump = "FaithJump";
  e.WindProtagonistParkour1 = "WindProtagonistParkour1";
  e.WindProtagonistParkour2 = "WindProtagonistParkour2";
  e.WindProtagonistParkour3 = "WindProtagonistParkour3";
  e.WindProtagonistParkour4 = "WindProtagonistParkour4";
  e.WindProtagonistParkour5 = "WindProtagonistParkour5";
})(ELeisureInteract = exports.ELeisureInteract ||= {});
(ENpcLeisureInteract = exports.ENpcLeisureInteract ||= {}).SitDown = "SitDown";
(function (e) {
  e.Global = "Global";
  e.Target = "Target";
})(EPostAkEvent = exports.EPostAkEvent ||= {});
(function (e) {
  e.MoveToPoint = "MoveToPoint";
  e.CycleMoveToPoints = "CycleMoveToPoints";
  e.MoveToRelativePosition = "MoveToRelativePosition";
})(EMoveSceneItemType = exports.EMoveSceneItemType ||= {});
(function (e) {
  e.UniformMotion = "UniformMotion";
  e.VariableMotion = "VariableMotion";
})(EMoveMotion = exports.EMoveMotion ||= {});
(function (e) {
  e.StopAtCurrentPos = "StopAtCurrentPos";
  e.StopAtNextPos = "StopAtNextPos";
})(EStopSceneItemMoveType = exports.EStopSceneItemMoveType ||= {});
(function (e) {
  e.White = "White";
  e.Red = "Red";
  e.Yellow = "Yellow";
  e.Blue = "Blue";
  e.Green = "Green";
  e.Gray = "Gray";
})(EPieceColorType = exports.EPieceColorType ||= {});
(function (e) {
  e.Empty = "Empty";
  e.Start1 = "Start1";
  e.End1 = "End1";
  e.Start2 = "Start2";
  e.End2 = "End2";
  e.Number1 = "Number1";
  e.Number2 = "Number2";
  e.Number3 = "Number3";
  e.Number4 = "Number4";
})(ETuningStandGridType = exports.ETuningStandGridType ||= {});
(function (e) {
  e.Enter = "Enter";
  e.StartLink = "StartLink";
  e.InvalidLink = "InvalidLink";
  e.LinkUp = "LinkUp";
  e.LinkMiss = "LinkMiss";
  e.LinkComplete = "LinkComplete";
  e.Reset = "Reset";
  e.TooLong = "TooLong";
})(ETuningStandBubbleTriggerType = exports.ETuningStandBubbleTriggerType ||= {});
(function (e) {
  e.Tuning = "Tuning";
  e.Challenge = "Challenge";
})(ETuningStandVisualType = exports.ETuningStandVisualType ||= {});
(function (e) {
  e.Block = "Block";
  e.Empty = "Empty";
  e.Chess1 = "Chess1";
  e.Chess2 = "Chess2";
  e.Chess3 = "Chess3";
})(ETraceTracingGridType = exports.ETraceTracingGridType ||= {});
(function (e) {
  e[e.Type1 = 1] = "Type1";
  e[e.Type2 = 2] = "Type2";
  e[e.Type3 = 3] = "Type3";
})(ETraceTracingImageType = exports.ETraceTracingImageType ||= {});
(function (e) {
  e.Directly = "Directly";
  e.Preload = "Preload";
  e.Permission = "Permission";
})(ESwitchSubLevelsType = exports.ESwitchSubLevelsType ||= {});
(ESwitchDataLayersTransitionType = exports.ESwitchDataLayersTransitionType ||= {}).Sequence = "Sequence";
(ETeleportToLatestResetPointType = exports.ETeleportToLatestResetPointType ||= {}).Directly = "Directly";
(function (e) {
  e.Basic = "关卡.Common.镜头调整";
  e.Horizontal = "关卡.Common.镜头.横版镜头";
  e.Dialog = "关卡.Common.镜头.对话镜头";
  e.Fixed = "关卡.Common.镜头.固定镜头";
  e.AxisLock = "关卡.Common.镜头.锁轴镜头";
  e.FirstPerson = "关卡.Common.镜头.第一人称镜头";
})(EAdjustPlayerCamera = exports.EAdjustPlayerCamera ||= {});
(EEnterOrbitalCameraType = exports.EEnterOrbitalCameraType ||= {}).ControlByMove = "ControlByMove";
(function (e) {
  e[e.Normal = 0] = "Normal";
  e[e.HugeBoss = 1] = "HugeBoss";
  e[e.OnlyBullet = 2] = "OnlyBullet";
  e[e.OnlyMonster = 3] = "OnlyMonster";
  e[e.OnlyBlockPlayer = 4] = "OnlyBlockPlayer";
})(EAirWallCollisionPreset = exports.EAirWallCollisionPreset ||= {});
(function (e) {
  e.Open = "Open";
  e.Close = "Close";
})(EToggleAirWall = exports.EToggleAirWall ||= {});
(function (e) {
  e.EnableAll = "EnableAll";
  e.DisableAll = "DisableAll";
  e.DisableModule = "DisableModule";
})(EPlayerOperationType = exports.EPlayerOperationType ||= {});
(function (e) {
  e.ShowUi = "ShowUi";
  e.HideUi = "HideUi";
})(EDisplayModeInPlayerOp = exports.EDisplayModeInPlayerOp ||= {});
(EEnableFunctionType = exports.EEnableFunctionType ||= {}).TeleportDungeon = "TeleportDungeon";
(function (e) {
  e.Enable = "Enable";
  e.Disable = "Disable";
})(EMoveOperationType = exports.EMoveOperationType ||= {});
(function (e) {
  e.Enable = "Enable";
  e.Disable = "Disable";
  e.DisableSection = "DisableSection";
})(ESkillOperationType = exports.ESkillOperationType ||= {});
(function (e) {
  e.Ashen = "Ashen";
  e.Hide = "Hide";
  e.Disable = "Disable";
})(EDisplayModeInSkillOp = exports.EDisplayModeInSkillOp ||= {});
(function (e) {
  e[e.Hook = 210001] = "Hook";
  e[e.Throw = 210002] = "Throw";
  e[e.Control = 210003] = "Control";
  e[e.Scan = 210004] = "Scan";
  e[e.ShowVision = 210008] = "ShowVision";
  e[e.Photo = 210012] = "Photo";
  e[e.PlaceTemporaryTeleport = 210015] = "PlaceTemporaryTeleport";
  e[e.DetectSoundBox = 210016] = "DetectSoundBox";
  e[e.DetectTreasure = 210017] = "DetectTreasure";
  e[e.FollowShooterEnter = 210020] = "FollowShooterEnter";
  e[e.FollowShooterExit = 210025] = "FollowShooterExit";
  e[e.Soaring = 210030] = "Soaring";
})(EExploreSkillType = exports.EExploreSkillType ||= {});
exports.exploreSkillTypeMapper = {
  [EExploreSkillType.Hook]: "钩锁",
  [EExploreSkillType.Throw]: "投掷控物",
  [EExploreSkillType.Control]: "拉起控物",
  [EExploreSkillType.Scan]: "扫描",
  [EExploreSkillType.ShowVision]: "幻象展示",
  [EExploreSkillType.Photo]: "拍照",
  [EExploreSkillType.PlaceTemporaryTeleport]: "放置临时传送点",
  [EExploreSkillType.DetectSoundBox]: "声匣探测",
  [EExploreSkillType.DetectTreasure]: "物资探测",
  [EExploreSkillType.FollowShooterEnter]: "辅助机进入",
  [EExploreSkillType.FollowShooterExit]: "辅助机退出",
  [EExploreSkillType.Soaring]: "翱翔"
};
(function (e) {
  e.Enable = "Enable";
  e.Disable = "Disable";
})(ECameraOperationType = exports.ECameraOperationType ||= {});
(function (e) {
  e.Enable = "Enable";
  e.Disable = "Disable";
})(ESceneInteractionOperationType = exports.ESceneInteractionOperationType ||= {});
(function (e) {
  e.Enable = "Enable";
  e.EnableSectionalUi = "EnableSectionalUi";
  e.Disable = "Disable";
})(EUiOperationType = exports.EUiOperationType ||= {});
(EUiElement = exports.EUiElement ||= {}).Guide = "Guide";
(function (e) {
  e.Target = "Target";
  e.Self = "Self";
})(EChangeEntityPrefabPerformanceType = exports.EChangeEntityPrefabPerformanceType ||= {});
(function (e) {
  e.Show = "Show";
  e.Hide = "Hide";
  e.Disable = "Disable";
})(EMapMarkState = exports.EMapMarkState ||= {});
(function (e) {
  e.Custom = "Custom";
  e.Quest = "Quest";
})(EMapMarkType = exports.EMapMarkType ||= {});
(ERegionConfigType = exports.ERegionConfigType ||= {}).Mpc = "Mpc";
(function (e) {
  e.Disable = "Disable";
  e.Correct = "Correct";
  e.Incorrect = "Incorrect";
})(EJigsawPieceState = exports.EJigsawPieceState ||= {});
(function (e) {
  e.Circle = "Circle";
  e.Rectangle = "Rectangle";
})(EJigsawShape = exports.EJigsawShape ||= {});
(ESetJigsawItemType = exports.ESetJigsawItemType ||= {}).MoveJigsawItem = "MoveJigsawItem";
(ESetJigsawFoundationType = exports.ESetJigsawFoundationType ||= {}).SetPieceState = "SetPieceState";
(function (e) {
  e[e.FishingBoat = 10001] = "FishingBoat";
})(ESpecificVehicleRoleType = exports.ESpecificVehicleRoleType ||= {});
(function (e) {
  e[e.FindTreasure = 0] = "FindTreasure";
  e[e.OpenCompass = 1] = "OpenCompass";
  e[e.KeepMoving = 2] = "KeepMoving";
  e[e.StopMoving = 3] = "StopMoving";
  e[e.StayIdle = 4] = "StayIdle";
  e[e.InviteRole = 5] = "InviteRole";
  e[e.InArea0 = 6] = "InArea0";
  e[e.InArea1 = 7] = "InArea1";
  e[e.InArea2 = 8] = "InArea2";
  e[e.NearFishingPoint = 9] = "NearFishingPoint";
})(EGondolaVoiceTriggeredType = exports.EGondolaVoiceTriggeredType ||= {}); //# sourceMappingURL=IAction.js.map