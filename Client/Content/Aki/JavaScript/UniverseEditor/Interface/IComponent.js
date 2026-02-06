"use strict";

function getComponent(o, e) {
  o = o[e];
  if (o && !o.Disabled) {
    return o;
  }
}
function getOriginalComponent(o, e) {
  return o[e];
}
var EInteractPlayerDiractionType;
var EInteractTurnAround;
var EAiWanderType;
var EWorldLevelBonus;
var EFightMusicsSwitchType;
var EAudioRangeType;
var EAkEventType;
var EAudioType;
var EEntityGroupFailureCondition;
var EPilotThrowPointVisualType;
var EPilotThrowAutoThrowType;
var EMotorInteractConstraintType;
var EHookLockScreenDetectType;
var EHookFetchMoveMode;
var EBulletCreateCondition;
var EScanMode;
var EAimPointType;
var ETeleControlDestroyCondition;
var EThrowMotion;
var EDirection;
var EItemFoundation;
var EPullingFoundation;
var ESpawnMonsterStartCondition;
var ESpawnMonsterCompleteCondition;
var ESpawnMonsterPreCondition;
var ESpawnMonsterConstraint;
var EHitLogicType;
var EHitBulletType;
var ETargetGearGroupSuccessCondition;
var ETargetGearGroupFailureCondition;
var EGearHitAffectType;
var EGroupFinishConfig;
var ENpcStandbyShowMode;
var ENpcStandbyShowFinitelyPlayMode;
var ENpcUiInteractType;
var ESpecialNpcType;
var ESpecialNpcMarkType;
var EConveyorBeltFieldType;
var EConveyorBeltMoveType;
var ETriggerMode;
var EReviveType;
var EColorChangeStrategyOfSplineEffect;
var EMonsterShowOnDeathType;
var ESplineLine;
var ESplineType;
var EPointGroupGenerateType;
var EEffectSplineCreateMode;
var EPatrolMoveState;
var EPatrolCycleMode;
var ELevelAiCycleMode;
var EMotorSlideOffDirection;
var EControllerType;
var EReboundOptionType;
var EFillType;
var EJigsawCompleteCondition;
var EExploreSkillInteractType;
var EExploreSkillSearchTargetCfg;
var EFanInteractType;
var EFanGearType;
var EBeamLayoutType;
var EAiGearStrategy;
var EPickInteraction;
var EDetectionFrequency;
var EBatchBulletMovementType;
var EGroupAiMode;
var EInhalationPerformanceType;
var EInhaledPerResultType;
var ERenderSpecifiedRangeType;
var EWindSourceType;
var EMonsterChooseType;
var EPointChooseType;
var ERangeConstraint;
var EProceduralVisualType;
var ELookAtTargetType;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ESpecialNpcMarkType = exports.ESpecialNpcType = exports.ENpcUiInteractType = exports.ENpcStandbyShowFinitelyPlayMode = exports.ENpcStandbyShowMode = exports.EGroupFinishConfig = exports.EGearHitAffectType = exports.ETargetGearGroupFailureCondition = exports.ETargetGearGroupSuccessCondition = exports.EHitBulletType = exports.EHitLogicType = exports.ESpawnMonsterConstraint = exports.ESpawnMonsterPreCondition = exports.ESpawnMonsterCompleteCondition = exports.ESpawnMonsterStartCondition = exports.EPullingFoundation = exports.EItemFoundation = exports.EDirection = exports.EThrowMotion = exports.ETeleControlDestroyCondition = exports.EAimPointType = exports.EScanMode = exports.EBulletCreateCondition = exports.EHookFetchMoveMode = exports.EHookLockScreenDetectType = exports.EMotorInteractConstraintType = exports.EPilotThrowAutoThrowType = exports.EPilotThrowPointVisualType = exports.EEntityGroupFailureCondition = exports.EAudioType = exports.EAkEventType = exports.EAudioRangeType = exports.rewardTypeCollectConfig = exports.rewardTypeCommonConfig = exports.rewardTypeCnMap = exports.aoizLayerValues = exports.aoiXyLayerValues = exports.AOI_EXITRANGE_INCREMENT = exports.entityCategoryConfig = exports.EFightMusicsSwitchType = exports.EWorldLevelBonus = exports.EAiWanderType = exports.EInteractTurnAround = exports.EInteractPlayerDiractionType = exports.DEFAULT_INIT_SPEED = exports.getOriginalComponent = exports.getComponent = exports.componentList = exports.componentInterfaceMap = exports.componentMap = undefined;
exports.ELookAtTargetType = exports.EProceduralVisualType = exports.ERangeConstraint = exports.EPointChooseType = exports.EMonsterChooseType = exports.EWindSourceType = exports.ERenderSpecifiedRangeType = exports.EInhaledPerResultType = exports.EInhalationPerformanceType = exports.EGroupAiMode = exports.EBatchBulletMovementType = exports.EDetectionFrequency = exports.EPickInteraction = exports.EAiGearStrategy = exports.EBeamLayoutType = exports.levelPrefabBpPathConfig = exports.EFanGearType = exports.EFanInteractType = exports.EExploreSkillSearchTargetCfg = exports.EExploreSkillInteractType = exports.EJigsawCompleteCondition = exports.EFillType = exports.EReboundOptionType = exports.EControllerType = exports.EMotorSlideOffDirection = exports.ELevelAiCycleMode = exports.EPatrolCycleMode = exports.patrolMoveStateNameByValue = exports.EPatrolMoveState = exports.EEffectSplineCreateMode = exports.EPointGroupGenerateType = exports.ESplineType = exports.ESplineLine = exports.EMonsterShowOnDeathType = exports.EColorChangeStrategyOfSplineEffect = exports.EReviveType = exports.runtimePlatformCnMap = exports.ETriggerMode = exports.EConveyorBeltMoveType = exports.EConveyorBeltFieldType = undefined;
exports.componentMap = {
  AirWallSpawnerComponent: undefined,
  ActorStateComponent: undefined,
  AiComponent: undefined,
  LevelAiComponent: undefined,
  AttributeComponent: undefined,
  BaseInfoComponent: undefined,
  BehaviorFlowComponent: undefined,
  CalculateComponent: undefined,
  EntitySpawnerComponent: undefined,
  EntityStateComponent: undefined,
  SceneItemAttributeComponent: undefined,
  EventComponent: undefined,
  FlowComponent: undefined,
  GrabComponent: undefined,
  InteractComponent: undefined,
  InteractiveComponent: undefined,
  LampComponent: undefined,
  MoveComponent: undefined,
  NpcComponent: undefined,
  RefreshComponent: undefined,
  RefreshGroupComponent: undefined,
  RefreshEntityComponent: undefined,
  RefreshSingleComponent: undefined,
  RewardComponent: undefined,
  RotatorComponent: undefined,
  RotatorComponent2: undefined,
  SimpleComponent: undefined,
  SphereComponent: undefined,
  SphereFactoryComponent: undefined,
  SpringBoardComponent: undefined,
  SpringComponent: undefined,
  SpawnMonsterComponent: undefined,
  StateComponent: undefined,
  SwitcherComponent: undefined,
  TalkComponent: undefined,
  TrampleUe5Component: undefined,
  TreasureBoxComponent: undefined,
  TriggerUe5Component: undefined,
  UndergroundComponent: undefined,
  VarComponent: undefined,
  TriggerComponent: undefined,
  HookLockPoint: undefined,
  HookFetchComponent: undefined,
  TargetGearComponent: undefined,
  TargetGearGroupComponent: undefined,
  ItemFoundation: undefined,
  ItemFoundation2: undefined,
  PullingObjectFoundation: undefined,
  JigsawItem: undefined,
  JigsawFoundation: undefined,
  CollectComponent: undefined,
  TeleControl2: undefined,
  DestructibleItem: undefined,
  LevelPlayComponent: undefined,
  VisionComponent: undefined,
  VisionCaptureComponent: undefined,
  ResetEntitiesPosComponent: undefined,
  EntityGroupComponent: undefined,
  AdsorbComponent: undefined,
  TeleportComponent: undefined,
  TrampleComponent: undefined,
  NpcPerformComponent: undefined,
  InteractGearComponent: undefined,
  LiftComponent: undefined,
  FollowTrackComponent: undefined,
  SceneItemLifeCycleComponent: undefined,
  BubbleComponent: undefined,
  FightInteractComponent: undefined,
  NearbyTrackingComponent: undefined,
  EntityPackageComponent: undefined,
  SkyboxComponent: undefined,
  StateHintComponent: undefined,
  EntityVisibleComponent: undefined,
  CombinedVisibleGroupComponent: undefined,
  WeaponComponent: undefined,
  DungeonEntryComponent: undefined,
  ResurrectionComponent: undefined,
  BuffProducerComponent: undefined,
  BuffConsumerComponent: undefined,
  GuideLineCreatorComponent: undefined,
  InteractAudioComponent: undefined,
  DropComponent: undefined,
  AdviseItemComponent: undefined,
  VisionItemComponent: undefined,
  MonsterComponent: undefined,
  CombatComponent: undefined,
  EntityListComponent: undefined,
  AnimalComponent: undefined,
  EntityAudioComponent: undefined,
  EntityStateAudioComponent: undefined,
  EntityCustomAudioComponent: undefined,
  SceneItemMovementComponent: undefined,
  RangeComponent: undefined,
  ExtraRangeComponent: undefined,
  TimelineTrackControlComponent: undefined,
  SplineComponent: undefined,
  SceneActorRefComponent: undefined,
  EditCustomAoiComponent: undefined,
  SceneBulletComponent: undefined,
  TurntableControlComponent: undefined,
  ConditionListenerComponent: undefined,
  AttachTargetComponent: undefined,
  ReboundComponent: undefined,
  LevitateMagnetComponent: undefined,
  PhotoTargetComponent: undefined,
  AiAlertNotifyComponent: undefined,
  MonsterGachaItemComponent: undefined,
  MonsterGachaBaseComponent: undefined,
  ProgressBarControlComponent: undefined,
  ConveyorBeltComponent: undefined,
  DynamicTeleportComponent: undefined,
  ExploreSkillInteractComponent: undefined,
  FanComponent: undefined,
  ResetSelfPosComponent: undefined,
  PasserbyNpcSpawnComponent: undefined,
  ModelComponent: undefined,
  EntityBundleComponent: undefined,
  BeamCastComponent: undefined,
  BeamReceiveComponent: undefined,
  TimeStopComponent: undefined,
  PortalComponent: undefined,
  NoRenderPortalComponent: undefined,
  EffectAreaComponent: undefined,
  PhysicsConstraintComponent: undefined,
  FollowShooterComponent: undefined,
  ConnectorComponent: undefined,
  CharacterConnectorComponent: undefined,
  HitComponent: undefined,
  DynamicPortalCreatorComponent: undefined,
  AiGearStrategyComponent: undefined,
  PickInteractComponent: undefined,
  ClientTriggerComponent: undefined,
  LocationSafetyComponent: undefined,
  BatchBulletCasterComponent: undefined,
  VehicleComponent: undefined,
  EnrichmentAreaComponent: undefined,
  ChessmanComponent: undefined,
  MonitorComponent: undefined,
  GroupAiComponent: undefined,
  InhalationAbilityComponent: undefined,
  InhaledItemComponent: undefined,
  AirPassageComponent: undefined,
  RenderSpecifiedRangeComponent: undefined,
  LevelPrefabPerformComponent: undefined,
  SceneItemAiComponent: undefined,
  GravityFlipComponent: undefined,
  LevelSequenceFrameEventComponent: undefined,
  LevelQteComponent: undefined,
  WalkingPatternComponent: undefined,
  LifePointCenterComponent: undefined,
  HackManagementComponent: undefined,
  ClientConditionListenerComponent: undefined,
  TemplateEntitySpawnerComponent: undefined,
  WindSourceComponent: undefined,
  SlideRailComponent: undefined,
  CurveControlComponent: undefined,
  EntityBatchRefreshComponent: undefined,
  SimpleCombatComponent: undefined,
  GridObjectComponent: undefined,
  GodKingFrequencyControllerComponent: undefined,
  PerformanceOptimizationComponent: undefined,
  SceneItemEventListenerComponent: undefined,
  DynamicSpawnMonsterPointComponent: undefined,
  DynamicSpawnMonsterComponent: undefined,
  RollBlockComponent: undefined,
  RollBlockFloorComponent: undefined,
  RollBlockItemComponent: undefined,
  SunSpiritCollectComponent: undefined,
  SunSpiritLauncherComponent: undefined,
  SunSpiritGearComponent: undefined,
  MotorSlideComponent: undefined,
  ProceduralVisualComponent: undefined,
  RoadNetworkNavigationComponent: undefined,
  DynamicEntityRewardComponent: undefined,
  FurnitureSlotComponent: undefined,
  VisionDisplayComponent: undefined,
  SystemModuleDataSyncComponent: undefined,
  ExhibitComponent: undefined,
  SlidePerformComponent: undefined,
  TimeScheduleComponent: undefined
};
exports.componentInterfaceMap = exports.componentMap;
exports.componentList = Object.keys(exports.componentInterfaceMap).sort();
exports.getComponent = getComponent;
exports.getOriginalComponent = getOriginalComponent;
exports.DEFAULT_INIT_SPEED = 150;
(function (o) {
  o.Npc = "Npc";
  o.LeisureInteraction = "LeisureInteraction";
})(EInteractPlayerDiractionType = exports.EInteractPlayerDiractionType ||= {});
(function (o) {
  o.FaceEachOther = "FaceEachOther";
  o.FaceEachOtherWithRecoveryImmediately = "FaceEachOtherWithRecoveryImmediately";
  o.PlayerTurnToInteractor = "PlayerTurnToInteractor";
})(EInteractTurnAround = exports.EInteractTurnAround ||= {});
(function (o) {
  o[o.SmallRange = 300] = "SmallRange";
  o[o.MiddleRange = 600] = "MiddleRange";
  o[o.BigRange = 1000] = "BigRange";
  o[o.SmallRangeLargeBody = 301] = "SmallRangeLargeBody";
  o[o.MiddleRangeLargeBody = 601] = "MiddleRangeLargeBody";
  o[o.BigRangeLargeBody = 1001] = "BigRangeLargeBody";
})(EAiWanderType = exports.EAiWanderType ||= {});
(function (o) {
  o[o.WorldLevelTable = 0] = "WorldLevelTable";
  o[o.AreaBouns = 1] = "AreaBouns";
})(EWorldLevelBonus = exports.EWorldLevelBonus ||= {});
(EFightMusicsSwitchType = exports.EFightMusicsSwitchType ||= {}).SwitchByTag = "SwitchByTag";
exports.entityCategoryConfig = {
  MonsterMatchType: "怪物类型",
  ControlMatchType: "控物类型",
  ItemFoundation: "底座类型",
  DestructibleType: "可破坏物"
};
exports.AOI_EXITRANGE_INCREMENT = 1000;
exports.aoiXyLayerValues = {
  [0]: 6000,
  1: 24000,
  2: 99000,
  3: 11000,
  6: 3000,
  7: 9000,
  8: 14000,
  9: 49000
};
exports.aoizLayerValues = {
  [0]: -1,
  1: 24000,
  2: 6000,
  3: 3000,
  4: 50000
};
exports.rewardTypeCnMap = {
  [0]: "附近掉落",
  1: "房主掉落",
  2: "采集物掉落",
  3: "实体行为发放"
};
exports.rewardTypeCommonConfig = [0, 1, 3];
exports.rewardTypeCollectConfig = [0, 1, 2];
(function (o) {
  o.SceneActorRefComp = "SceneActorRefComp";
  o.RangeComp = "RangeComp";
  o.AOI = "AOI";
})(EAudioRangeType = exports.EAudioRangeType ||= {});
(function (o) {
  o.Point = "Point";
  o.Box = "Box";
  o.Default = "Default";
})(EAkEventType = exports.EAkEventType ||= {});
(function (o) {
  o.AudioAMB = "AudioAMB";
  o.AudioBGM = "AudioBGM";
})(EAudioType = exports.EAudioType ||= {});
(function (o) {
  o.SequentialState = "SequentialState";
  o.ArbitraryState = "ArbitraryState";
})(EEntityGroupFailureCondition = exports.EEntityGroupFailureCondition ||= {});
(function (o) {
  o.Normal = "Normal";
  o.MainStory = "MainStory";
})(EPilotThrowPointVisualType = exports.EPilotThrowPointVisualType ||= {});
(function (o) {
  o.LowAngle = "LowAngle";
  o.HighAngle = "HighAngle";
})(EPilotThrowAutoThrowType = exports.EPilotThrowAutoThrowType ||= {});
(EMotorInteractConstraintType = exports.EMotorInteractConstraintType ||= {}).FaceToTarget = "FaceToTarget";
(function (o) {
  o.CentralEllipse = "CentralEllipse";
  o.FullScreen = "FullScreen";
})(EHookLockScreenDetectType = exports.EHookLockScreenDetectType ||= {});
(EHookFetchMoveMode = exports.EHookFetchMoveMode ||= {}).Uniform = "Uniform";
(function (o) {
  o.OnHit = "OnHit";
  o.OnMatching = "OnMatching";
  o.OnCollision = "OnCollision";
  o.OnThrowTriggerTime = "OnThrowDelayTime";
  o.OpenGravityCollision = "OpenGravityCollision";
})(EBulletCreateCondition = exports.EBulletCreateCondition ||= {});
(function (o) {
  o[o.Camera = 0] = "Camera";
  o[o.Surround = 1] = "Surround";
})(EScanMode = exports.EScanMode ||= {});
(function (o) {
  o[o.Normal = 0] = "Normal";
  o[o.Weakness = 1] = "Weakness";
})(EAimPointType = exports.EAimPointType ||= {});
(function (o) {
  o.LetGo = "LetGo";
  o.CreateBullet = "CreateBullet";
  o.Throw = "Throw";
})(ETeleControlDestroyCondition = exports.ETeleControlDestroyCondition ||= {});
(function (o) {
  o.Projectile = "Projectile";
  o.Circumnutation = "Circumnutation";
  o.TrackTarget = "TrackTarget";
  o.Levitate = "Levitate";
  o.FreeFall = "FreeFall";
})(EThrowMotion = exports.EThrowMotion ||= {});
(function (o) {
  o.Right = "Right";
  o.Left = "Left";
})(EDirection = exports.EDirection ||= {});
(function (o) {
  o.CategoryMatching = "CategoryMatching";
  o.BuildingBlock = "BuildingBlock";
  o.PulseDevice = "PulseDevice";
  o.RangeAdsorption = "RangeAdsorption";
})(EItemFoundation = exports.EItemFoundation ||= {});
(EPullingFoundation = exports.EPullingFoundation ||= {}).CategoryMatching = "CategoryMatching";
(function (o) {
  o[o.Immediate = 0] = "Immediate";
  o[o.TriggerRange = 1] = "TriggerRange";
})(ESpawnMonsterStartCondition = exports.ESpawnMonsterStartCondition ||= {});
(function (o) {
  o[o.AllKill = 0] = "AllKill";
  o[o.Duration = 1] = "Duration";
  o[o.QuantityRefill = 2] = "QuantityRefill";
})(ESpawnMonsterCompleteCondition = exports.ESpawnMonsterCompleteCondition ||= {});
(ESpawnMonsterPreCondition = exports.ESpawnMonsterPreCondition ||= {}).DependOnPreceding = "DependOnPreceding";
(ESpawnMonsterConstraint = exports.ESpawnMonsterConstraint ||= {}).CharacterForwardAnnularSector = "CharacterForwardAnnularSector";
(function (o) {
  o.ChangeNextState = "ChangeNextState";
  o.ChangeCountDownState = "ChangeCountDownState";
  o.ChangeLockState = "ChangeLockState";
  o.ChangeNextAndLockTargetState = "ChangeNextAndLockTargetState";
  o.ChangeTargetState = "ChangeTargetState";
  o.ChangeByPartHit = "ChangeByPartHit";
})(EHitLogicType = exports.EHitLogicType ||= {});
(function (o) {
  o.OnlyDropAttack = "OnlyDropAttack";
  o.CrystalAttack = "CrystalAttack";
  o.PlayerAttack = "PlayerAttack";
  o.FixedBulletId = "FixedBulletId";
  o.AllCharacterAttack = "AllCharacterAttack";
})(EHitBulletType = exports.EHitBulletType ||= {});
(function (o) {
  o.SameSpecificState = "SameSpecificState";
  o.SameArbitraryState = "SameArbitraryState";
  o.CountDownState = "CountDownState";
  o.SpecificTargetState = "SpecificTargetState";
})(ETargetGearGroupSuccessCondition = exports.ETargetGearGroupSuccessCondition ||= {});
(function (o) {
  o.ArbitraryState = "ArbitraryState";
  o.SequentialState = "SequentialState";
  o.HitTargetEntity = "HitTargetEntity";
})(ETargetGearGroupFailureCondition = exports.ETargetGearGroupFailureCondition ||= {});
(EGearHitAffectType = exports.EGearHitAffectType ||= {}).ChangeNextState = "ChangeNextState";
(function (o) {
  o.Silence = "Silence";
  o.Destroy = "Destroy";
})(EGroupFinishConfig = exports.EGroupFinishConfig ||= {});
(function (o) {
  o.Finite = "Finite";
  o.Loop = "Loop";
  o.Sit = "Sit";
})(ENpcStandbyShowMode = exports.ENpcStandbyShowMode ||= {});
(function (o) {
  o.Randomly = "Randomly";
  o.Orderly = "Orderly";
})(ENpcStandbyShowFinitelyPlayMode = exports.ENpcStandbyShowFinitelyPlayMode ||= {});
(function (o) {
  o.HandInItem = "HandInItem";
  o.Shop = "Shop";
  o.AntiqueShop = "AntiqueShop";
  o.ChengXiaoShanShop = "ChengXiaoShanShop";
  o.Gramophone = "Gramophone";
  o.SoundBox3 = "SoundBox3";
  o.SunSpirit = "SunSpirit";
  o.ShopNew = "ShopNew";
})(ENpcUiInteractType = exports.ENpcUiInteractType ||= {});
(ESpecialNpcType = exports.ESpecialNpcType ||= {}).BaseRoleNpc = "BaseRoleNpc";
(function (o) {
  o.TrafficLight = "TrafficLight";
  o.IgnoreCameraHideNpc = "IgnoreCameraHideNpc";
})(ESpecialNpcMarkType = exports.ESpecialNpcMarkType ||= {});
(function (o) {
  o.DirectionalField = "DirectionalField";
  o.PointField = "PointField";
})(EConveyorBeltFieldType = exports.EConveyorBeltFieldType ||= {});
(EConveyorBeltMoveType = exports.EConveyorBeltMoveType ||= {}).FixSpeed = "FixSpeed";
(function (o) {
  o[o.Distance = 0] = "Distance";
  o[o.Global = 1] = "Global";
})(ETriggerMode = exports.ETriggerMode ||= {});
exports.runtimePlatformCnMap = {
  [1]: "PC",
  2: "移动端"
};
(function (o) {
  o[o.BigWorldDisableResurrectionItem = 12] = "BigWorldDisableResurrectionItem";
  o[o.BigWorldEnableResurrectionItem = 13] = "BigWorldEnableResurrectionItem";
})(EReviveType = exports.EReviveType ||= {});
(EColorChangeStrategyOfSplineEffect = exports.EColorChangeStrategyOfSplineEffect ||= {}).RGB = "RGB";
(function (o) {
  o[o.Effect = 0] = "Effect";
})(EMonsterShowOnDeathType = exports.EMonsterShowOnDeathType ||= {});
(function (o) {
  o.Linear = "Linear";
  o.Curve = "Curve";
  o.Constant = "Constant";
  o.CurveCustomTangent = "CurveCustomTangent";
})(ESplineLine = exports.ESplineLine ||= {});
(function (o) {
  o.Common = "Common";
  o.Parkour = "Parkour";
  o.Butterfly = "Butterfly";
  o.Effect = "Effect";
  o.Patrol = "Patrol";
  o.LevelAI = "LevelAI";
  o.AirPassage = "AirPassage";
  o.ContinuesVariableSpeedMovement = "ContinuesVariableSpeedMovement";
  o.TimePatrol = "TimePatrol";
  o.Range = "Range";
  o.Way = "Way";
  o.MotorSlide = "MotorSlide";
})(ESplineType = exports.ESplineType ||= {});
(EPointGroupGenerateType = exports.EPointGroupGenerateType ||= {}).Layer = "Layer";
(function (o) {
  o.WholeLine = "WholeLine";
  o.EquidistantPoint = "EquidistantPoint";
})(EEffectSplineCreateMode = exports.EEffectSplineCreateMode ||= {});
(function (o) {
  o[o.Walk = 1] = "Walk";
  o[o.Run = 2] = "Run";
  o[o.Sprint = 3] = "Sprint";
})(EPatrolMoveState = exports.EPatrolMoveState ||= {});
exports.patrolMoveStateNameByValue = {
  [EPatrolMoveState.Walk]: "走",
  [EPatrolMoveState.Run]: "跑",
  [EPatrolMoveState.Sprint]: "冲刺"
};
(function (o) {
  o.Loop = "Loop";
  o.Once = "Once";
})(EPatrolCycleMode = exports.EPatrolCycleMode ||= {});
(ELevelAiCycleMode = exports.ELevelAiCycleMode ||= {}).Loop = "Loop";
(function (o) {
  o.Left = "Left";
  o.Right = "Right";
})(EMotorSlideOffDirection = exports.EMotorSlideOffDirection ||= {});
(function (o) {
  o.FreeAngle = "FreeAngle";
  o.FixedAngle = "FixedAngle";
})(EControllerType = exports.EControllerType ||= {});
(EReboundOptionType = exports.EReboundOptionType ||= {}).ForwardFront = "ForwardFront";
(function (o) {
  o.Fixed = "Fixed";
  o.Direction = "Direction";
})(EFillType = exports.EFillType ||= {});
(function (o) {
  o.ActivateAllCorrectPiece = "ActivateAllCorrectPiece";
  o.ActivateSpecifiedPiece = "ActivateSpecifiedPiece";
  o.PutInTheSpecifiedPiece = "PutInTheSpecifiedPiece";
  o.ActivateRenjuPiece = "ActivateRenjuPiece";
})(EJigsawCompleteCondition = exports.EJigsawCompleteCondition ||= {});
(function (o) {
  o.PullGiant = "PullGiant";
  o.StatueInteractPoint = "StatueInteractPoint";
  o.PullStatue = "PullStatue";
  o.RagDollCrushingRock = "RagDollCrushingRock";
  o.RagDollDestroySolidRock = "RagDollDestroySolidRock";
  o.LonelyDollPollutant = "LonelyDollPollutant";
  o.QuantumDiffusion = "QuantumDiffusion";
  o.Custom = "Custom";
})(EExploreSkillInteractType = exports.EExploreSkillInteractType ||= {});
(function (o) {
  o.AngleWeight = "AngleWeight";
  o.EnterScreenWeight = "EnterScreenWeight";
})(EExploreSkillSearchTargetCfg = exports.EExploreSkillSearchTargetCfg ||= {});
(function (o) {
  o.Hit = "Hit";
  o.FKey = "FKey";
})(EFanInteractType = exports.EFanInteractType ||= {});
(function (o) {
  o.ReboundPlateGear = "ReboundPlateGear";
  o.LightDeliver = "LightDeliver ";
})(EFanGearType = exports.EFanGearType ||= {});
exports.levelPrefabBpPathConfig = {
  Item: "/Game/Aki/Character/Item/BP_BaseItem.BP_BaseItem_C",
  InteractedBox: "/Game/Aki/GamePlay/InteractiveObject/BP_InteractedBox.BP_InteractedBox_C",
  PhysicsItem: "/Game/Aki/GamePlay/InteractiveObject/BP_PhysicsItem.BP_PhysicsItem_C"
};
(EBeamLayoutType = exports.EBeamLayoutType ||= {}).BeamWall = "BeamWall";
(function (o) {
  o.RenjuStrategy = "RenjuStrategy";
  o.RaceStrategy = "RaceStrategy";
})(EAiGearStrategy = exports.EAiGearStrategy ||= {});
(EPickInteraction = exports.EPickInteraction ||= {}).ChessmanInteract = "ChessmanInteract";
(function (o) {
  o.Low = "Low";
  o.Medium = "Medium";
  o.High = "High";
  o.SuperHigh = "SuperHigh";
})(EDetectionFrequency = exports.EDetectionFrequency ||= {});
(function (o) {
  o[o.Sprint = 0] = "Sprint";
  o[o.Stationary = 1] = "Stationary";
})(EBatchBulletMovementType = exports.EBatchBulletMovementType ||= {});
(EGroupAiMode = exports.EGroupAiMode ||= {}).Patrol = "Patrol";
(function (o) {
  o.Role = "Role";
  o.SceneItem = "SceneItem";
})(EInhalationPerformanceType = exports.EInhalationPerformanceType ||= {});
(function (o) {
  o.DestroySelf = "DestroySelf";
  o.ChangeSelfState = "ChangeSelfState";
})(EInhaledPerResultType = exports.EInhaledPerResultType ||= {});
(function (o) {
  o.FlowerBridge = "FlowerBridge";
  o.BookPage = "BookPage";
  o.FogBarrier = "FogBarrier";
  o.QuantumFollowShooter = "QuantumFollowShooter";
})(ERenderSpecifiedRangeType = exports.ERenderSpecifiedRangeType ||= {});
(function (o) {
  o[o.Directional = 0] = "Directional";
})(EWindSourceType = exports.EWindSourceType ||= {});
(EMonsterChooseType = exports.EMonsterChooseType ||= {}).RandomPoolChoose = "RandomPoolChoose";
(EPointChooseType = exports.EPointChooseType ||= {}).SpawnMonsterPoint = "SpawnMonsterPoint";
(ERangeConstraint = exports.ERangeConstraint ||= {}).SearchSpawnMonsterPoint = "SearchSpawnMonsterPoint";
(EProceduralVisualType = exports.EProceduralVisualType ||= {}).LookAt = "LookAt";
(function (o) {
  o.Entity = "Entity";
  o.Player = "Player";
})(ELookAtTargetType = exports.ELookAtTargetType ||= {}); //# sourceMappingURL=IComponent.js.map