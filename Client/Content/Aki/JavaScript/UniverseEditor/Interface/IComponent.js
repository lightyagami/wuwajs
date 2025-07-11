"use strict";

function getComponent(e, o) {
  e = e[o];
  if (e && !e.Disabled) {
    return e;
  }
}
function getOriginalComponent(e, o) {
  return e[o];
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
var EControllerType;
var EReboundOptionType;
var EFillType;
var EJigsawCompleteCondition;
var EExploreSkillInteractType;
var EExploreSkillSearchTargetCfg;
var EFanInteractType;
var EFanGearType;
var EAiGearStrategy;
var EPickInteraction;
var EDetectionFrequency;
var EBatchBulletMovementType;
var EGroupAiMode;
var EInhalationPerformanceType;
var EInhaledPerResultType;
var ERenderSpecifiedRangeType;
var EWindSourceType;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EColorChangeStrategyOfSplineEffect = exports.EReviveType = exports.runtimePlatformCnMap = exports.ETriggerMode = exports.EConveyorBeltMoveType = exports.EConveyorBeltFieldType = exports.ESpecialNpcType = exports.ENpcUiInteractType = exports.ENpcStandbyShowFinitelyPlayMode = exports.ENpcStandbyShowMode = exports.EGroupFinishConfig = exports.EGearHitAffectType = exports.ETargetGearGroupFailureCondition = exports.ETargetGearGroupSuccessCondition = exports.EHitBulletType = exports.EHitLogicType = exports.ESpawnMonsterConstraint = exports.ESpawnMonsterPreCondition = exports.ESpawnMonsterCompleteCondition = exports.ESpawnMonsterStartCondition = exports.EPullingFoundation = exports.EItemFoundation = exports.EDirection = exports.EThrowMotion = exports.ETeleControlDestroyCondition = exports.EAimPointType = exports.EScanMode = exports.EBulletCreateCondition = exports.EEntityGroupFailureCondition = exports.EAudioType = exports.EAkEventType = exports.EAudioRangeType = exports.rewardTypeCollectConfig = exports.rewardTypeCommonConfig = exports.rewardTypeCnMap = exports.aoizLayerValues = exports.aoiXyLayerValues = exports.AOI_EXITRANGE_INCREMENT = exports.entityCategoryConfig = exports.EFightMusicsSwitchType = exports.EWorldLevelBonus = exports.EAiWanderType = exports.EInteractTurnAround = exports.EInteractPlayerDiractionType = exports.DEFAULT_INIT_SPEED = exports.getOriginalComponent = exports.getComponent = exports.componentList = exports.componentInterfaceMap = exports.componentMap = undefined;
exports.EWindSourceType = exports.ERenderSpecifiedRangeType = exports.EInhaledPerResultType = exports.EInhalationPerformanceType = exports.EGroupAiMode = exports.EBatchBulletMovementType = exports.EDetectionFrequency = exports.EPickInteraction = exports.EAiGearStrategy = exports.levelPrefabBpPathConfig = exports.EFanGearType = exports.EFanInteractType = exports.EExploreSkillSearchTargetCfg = exports.EExploreSkillInteractType = exports.EJigsawCompleteCondition = exports.EFillType = exports.EReboundOptionType = exports.EControllerType = exports.ELevelAiCycleMode = exports.EPatrolCycleMode = exports.patrolMoveStateNameByValue = exports.EPatrolMoveState = exports.EEffectSplineCreateMode = exports.EPointGroupGenerateType = exports.ESplineType = exports.ESplineLine = exports.EMonsterShowOnDeathType = undefined;
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
  PerformanceOptimizationComponent: undefined
};
exports.componentInterfaceMap = exports.componentMap;
exports.componentList = Object.keys(exports.componentInterfaceMap).sort();
exports.getComponent = getComponent;
exports.getOriginalComponent = getOriginalComponent;
exports.DEFAULT_INIT_SPEED = 150;
(function (e) {
  e.Npc = "Npc";
  e.LeisureInteraction = "LeisureInteraction";
})(EInteractPlayerDiractionType = exports.EInteractPlayerDiractionType ||= {});
(function (e) {
  e.FaceEachOther = "FaceEachOther";
  e.FaceEachOtherWithRecoveryImmediately = "FaceEachOtherWithRecoveryImmediately";
  e.PlayerTurnToInteractor = "PlayerTurnToInteractor";
})(EInteractTurnAround = exports.EInteractTurnAround ||= {});
(function (e) {
  e[e.SmallRange = 300] = "SmallRange";
  e[e.MiddleRange = 600] = "MiddleRange";
  e[e.BigRange = 1000] = "BigRange";
  e[e.SmallRangeLargeBody = 301] = "SmallRangeLargeBody";
  e[e.MiddleRangeLargeBody = 601] = "MiddleRangeLargeBody";
  e[e.BigRangeLargeBody = 1001] = "BigRangeLargeBody";
})(EAiWanderType = exports.EAiWanderType ||= {});
(function (e) {
  e[e.WorldLevelTable = 0] = "WorldLevelTable";
  e[e.AreaBouns = 1] = "AreaBouns";
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
  8: 15000
};
exports.aoizLayerValues = {
  [0]: -1,
  1: 24000,
  2: 6000,
  3: 3000
};
exports.rewardTypeCnMap = {
  [0]: "附近掉落",
  1: "房主掉落",
  2: "采集物掉落",
  3: "实体行为发放"
};
exports.rewardTypeCommonConfig = [0, 1, 3];
exports.rewardTypeCollectConfig = [0, 1, 2];
(function (e) {
  e.SceneActorRefComp = "SceneActorRefComp";
  e.RangeComp = "RangeComp";
  e.AOI = "AOI";
})(EAudioRangeType = exports.EAudioRangeType ||= {});
(function (e) {
  e.Point = "Point";
  e.Box = "Box";
  e.Default = "Default";
})(EAkEventType = exports.EAkEventType ||= {});
(function (e) {
  e.AudioAMB = "AudioAMB";
  e.AudioBGM = "AudioBGM";
})(EAudioType = exports.EAudioType ||= {});
(function (e) {
  e.SequentialState = "SequentialState";
  e.ArbitraryState = "ArbitraryState";
})(EEntityGroupFailureCondition = exports.EEntityGroupFailureCondition ||= {});
(function (e) {
  e.OnHit = "OnHit";
  e.OnMatching = "OnMatching";
  e.OnCollision = "OnCollision";
  e.OnThrowTriggerTime = "OnThrowDelayTime";
  e.OpenGravityCollision = "OpenGravityCollision";
})(EBulletCreateCondition = exports.EBulletCreateCondition ||= {});
(function (e) {
  e[e.Camera = 0] = "Camera";
  e[e.Surround = 1] = "Surround";
})(EScanMode = exports.EScanMode ||= {});
(function (e) {
  e[e.Normal = 0] = "Normal";
  e[e.Weakness = 1] = "Weakness";
})(EAimPointType = exports.EAimPointType ||= {});
(function (e) {
  e.LetGo = "LetGo";
  e.CreateBullet = "CreateBullet";
  e.Throw = "Throw";
})(ETeleControlDestroyCondition = exports.ETeleControlDestroyCondition ||= {});
(function (e) {
  e.Projectile = "Projectile";
  e.Circumnutation = "Circumnutation";
  e.TrackTarget = "TrackTarget";
  e.Levitate = "Levitate";
  e.FreeFall = "FreeFall";
})(EThrowMotion = exports.EThrowMotion ||= {});
(function (e) {
  e.Right = "Right";
  e.Left = "Left";
})(EDirection = exports.EDirection ||= {});
(function (e) {
  e.CategoryMatching = "CategoryMatching";
  e.BuildingBlock = "BuildingBlock";
  e.PulseDevice = "PulseDevice";
  e.RangeAdsorption = "RangeAdsorption";
})(EItemFoundation = exports.EItemFoundation ||= {});
(EPullingFoundation = exports.EPullingFoundation ||= {}).CategoryMatching = "CategoryMatching";
(function (e) {
  e[e.Immediate = 0] = "Immediate";
  e[e.TriggerRange = 1] = "TriggerRange";
})(ESpawnMonsterStartCondition = exports.ESpawnMonsterStartCondition ||= {});
(function (e) {
  e[e.AllKill = 0] = "AllKill";
  e[e.Duration = 1] = "Duration";
  e[e.QuantityRefill = 2] = "QuantityRefill";
})(ESpawnMonsterCompleteCondition = exports.ESpawnMonsterCompleteCondition ||= {});
(ESpawnMonsterPreCondition = exports.ESpawnMonsterPreCondition ||= {}).DependOnPreceding = "DependOnPreceding";
(ESpawnMonsterConstraint = exports.ESpawnMonsterConstraint ||= {}).CharacterForwardAnnularSector = "CharacterForwardAnnularSector";
(function (e) {
  e.ChangeNextState = "ChangeNextState";
  e.ChangeCountDownState = "ChangeCountDownState";
  e.ChangeLockState = "ChangeLockState";
  e.ChangeNextAndLockTargetState = "ChangeNextAndLockTargetState";
  e.ChangeTargetState = "ChangeTargetState";
})(EHitLogicType = exports.EHitLogicType ||= {});
(function (e) {
  e.OnlyDropAttack = "OnlyDropAttack";
  e.CrystalAttack = "CrystalAttack";
  e.PlayerAttack = "PlayerAttack";
  e.FixedBulletId = "FixedBulletId";
  e.AllCharacterAttack = "AllCharacterAttack";
})(EHitBulletType = exports.EHitBulletType ||= {});
(function (e) {
  e.SameSpecificState = "SameSpecificState";
  e.SameArbitraryState = "SameArbitraryState";
  e.CountDownState = "CountDownState";
  e.SpecificTargetState = "SpecificTargetState";
})(ETargetGearGroupSuccessCondition = exports.ETargetGearGroupSuccessCondition ||= {});
(function (e) {
  e.ArbitraryState = "ArbitraryState";
  e.SequentialState = "SequentialState";
  e.HitTargetEntity = "HitTargetEntity";
})(ETargetGearGroupFailureCondition = exports.ETargetGearGroupFailureCondition ||= {});
(EGearHitAffectType = exports.EGearHitAffectType ||= {}).ChangeNextState = "ChangeNextState";
(function (e) {
  e.Silence = "Silence";
  e.Destroy = "Destroy";
})(EGroupFinishConfig = exports.EGroupFinishConfig ||= {});
(function (e) {
  e.Finite = "Finite";
  e.Loop = "Loop";
  e.Sit = "Sit";
})(ENpcStandbyShowMode = exports.ENpcStandbyShowMode ||= {});
(function (e) {
  e.Randomly = "Randomly";
  e.Orderly = "Orderly";
})(ENpcStandbyShowFinitelyPlayMode = exports.ENpcStandbyShowFinitelyPlayMode ||= {});
(function (e) {
  e.HandInItem = "HandInItem";
  e.Shop = "Shop";
  e.AntiqueShop = "AntiqueShop";
  e.ChengXiaoShanShop = "ChengXiaoShanShop";
  e.Gramophone = "Gramophone";
})(ENpcUiInteractType = exports.ENpcUiInteractType ||= {});
(ESpecialNpcType = exports.ESpecialNpcType ||= {}).BaseRoleNpc = "BaseRoleNpc";
(function (e) {
  e.DirectionalField = "DirectionalField";
  e.PointField = "PointField";
})(EConveyorBeltFieldType = exports.EConveyorBeltFieldType ||= {});
(EConveyorBeltMoveType = exports.EConveyorBeltMoveType ||= {}).FixSpeed = "FixSpeed";
(function (e) {
  e[e.Distance = 0] = "Distance";
  e[e.Global = 1] = "Global";
})(ETriggerMode = exports.ETriggerMode ||= {});
exports.runtimePlatformCnMap = {
  [1]: "PC",
  2: "移动端"
};
(function (e) {
  e[e.BigWorldDisableResurrectionItem = 12] = "BigWorldDisableResurrectionItem";
  e[e.BigWorldEnableResurrectionItem = 13] = "BigWorldEnableResurrectionItem";
})(EReviveType = exports.EReviveType ||= {});
(EColorChangeStrategyOfSplineEffect = exports.EColorChangeStrategyOfSplineEffect ||= {}).RGB = "RGB";
(function (e) {
  e[e.Effect = 0] = "Effect";
})(EMonsterShowOnDeathType = exports.EMonsterShowOnDeathType ||= {});
(function (e) {
  e.Linear = "Linear";
  e.Curve = "Curve";
  e.Constant = "Constant";
  e.CurveCustomTangent = "CurveCustomTangent";
})(ESplineLine = exports.ESplineLine ||= {});
(function (e) {
  e.Common = "Common";
  e.Parkour = "Parkour";
  e.Butterfly = "Butterfly";
  e.Effect = "Effect";
  e.Patrol = "Patrol";
  e.LevelAI = "LevelAI";
  e.AirPassage = "AirPassage";
  e.ContinuesVariableSpeedMovement = "ContinuesVariableSpeedMovement";
  e.TimePatrol = "TimePatrol";
  e.Range = "Range";
})(ESplineType = exports.ESplineType ||= {});
(EPointGroupGenerateType = exports.EPointGroupGenerateType ||= {}).Layer = "Layer";
(function (e) {
  e.WholeLine = "WholeLine";
  e.EquidistantPoint = "EquidistantPoint";
})(EEffectSplineCreateMode = exports.EEffectSplineCreateMode ||= {});
(function (e) {
  e[e.Walk = 1] = "Walk";
  e[e.Run = 2] = "Run";
  e[e.Sprint = 3] = "Sprint";
})(EPatrolMoveState = exports.EPatrolMoveState ||= {});
exports.patrolMoveStateNameByValue = {
  [EPatrolMoveState.Walk]: "走",
  [EPatrolMoveState.Run]: "跑",
  [EPatrolMoveState.Sprint]: "冲刺"
};
(function (e) {
  e.Loop = "Loop";
  e.Once = "Once";
})(EPatrolCycleMode = exports.EPatrolCycleMode ||= {});
(ELevelAiCycleMode = exports.ELevelAiCycleMode ||= {}).Loop = "Loop";
(function (e) {
  e.FreeAngle = "FreeAngle";
  e.FixedAngle = "FixedAngle";
})(EControllerType = exports.EControllerType ||= {});
(EReboundOptionType = exports.EReboundOptionType ||= {}).ForwardFront = "ForwardFront";
(function (e) {
  e.Fixed = "Fixed";
  e.Direction = "Direction";
})(EFillType = exports.EFillType ||= {});
(function (e) {
  e.ActivateAllCorrectPiece = "ActivateAllCorrectPiece";
  e.ActivateSpecifiedPiece = "ActivateSpecifiedPiece";
  e.PutInTheSpecifiedPiece = "PutInTheSpecifiedPiece";
  e.ActivateRenjuPiece = "ActivateRenjuPiece";
})(EJigsawCompleteCondition = exports.EJigsawCompleteCondition ||= {});
(function (e) {
  e.PullGiant = "PullGiant";
  e.StatueInteractPoint = "StatueInteractPoint";
  e.PullStatue = "PullStatue";
  e.RagDollCrushingRock = "RagDollCrushingRock";
  e.RagDollDestroySolidRock = "RagDollDestroySolidRock";
  e.LonelyDollPollutant = "LonelyDollPollutant";
  e.Custom = "Custom";
})(EExploreSkillInteractType = exports.EExploreSkillInteractType ||= {});
(function (e) {
  e.AngleWeight = "AngleWeight";
  e.EnterScreenWeight = "EnterScreenWeight";
})(EExploreSkillSearchTargetCfg = exports.EExploreSkillSearchTargetCfg ||= {});
(function (e) {
  e.Hit = "Hit";
  e.FKey = "FKey";
})(EFanInteractType = exports.EFanInteractType ||= {});
(function (e) {
  e.ReboundPlateGear = "ReboundPlateGear";
  e.LightDeliver = "LightDeliver ";
})(EFanGearType = exports.EFanGearType ||= {});
exports.levelPrefabBpPathConfig = {
  Item: "/Game/Aki/Character/Item/BP_BaseItem.BP_BaseItem_C",
  InteractedBox: "/Game/Aki/GamePlay/InteractiveObject/BP_InteractedBox.BP_InteractedBox_C",
  PhysicsItem: "/Game/Aki/GamePlay/InteractiveObject/BP_PhysicsItem.BP_PhysicsItem_C"
};
(function (e) {
  e.RenjuStrategy = "RenjuStrategy";
  e.RaceStrategy = "RaceStrategy";
})(EAiGearStrategy = exports.EAiGearStrategy ||= {});
(EPickInteraction = exports.EPickInteraction ||= {}).ChessmanInteract = "ChessmanInteract";
(function (e) {
  e.Low = "Low";
  e.Medium = "Medium";
  e.High = "High";
  e.SuperHigh = "SuperHigh";
})(EDetectionFrequency = exports.EDetectionFrequency ||= {});
(function (e) {
  e[e.Sprint = 0] = "Sprint";
  e[e.Stationary = 1] = "Stationary";
})(EBatchBulletMovementType = exports.EBatchBulletMovementType ||= {});
(EGroupAiMode = exports.EGroupAiMode ||= {}).Patrol = "Patrol";
(function (e) {
  e.Role = "Role";
  e.SceneItem = "SceneItem";
})(EInhalationPerformanceType = exports.EInhalationPerformanceType ||= {});
(function (e) {
  e.DestroySelf = "DestroySelf";
  e.ChangeSelfState = "ChangeSelfState";
})(EInhaledPerResultType = exports.EInhaledPerResultType ||= {});
(function (e) {
  e.FlowerBridge = "FlowerBridge";
  e.BookPage = "BookPage";
  e.FogBarrier = "FogBarrier";
})(ERenderSpecifiedRangeType = exports.ERenderSpecifiedRangeType ||= {});
(function (e) {
  e[e.Directional = 0] = "Directional";
})(EWindSourceType = exports.EWindSourceType ||= {}); //# sourceMappingURL=IComponent.js.map