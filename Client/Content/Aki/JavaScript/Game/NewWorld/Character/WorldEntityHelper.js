"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldEntityHelper = exports.USE_ENTITY_POOL = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const MonsterBattleConfById_1 = require("../../../Core/Define/ConfigQuery/MonsterBattleConfById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const IEntity_1 = require("../../../UniverseEditor/Interface/IEntity");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const RbBlockComponent_1 = require("../../LevelGamePlay/RollBlock/RbBlockComponent");
const RbFloorComponent_1 = require("../../LevelGamePlay/RollBlock/RbFloorComponent");
const RbItemComponent_1 = require("../../LevelGamePlay/RollBlock/RbItemComponent");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InteractionSpotComponent_1 = require("../../Module/Interaction/InteractionSpotComponent");
const PanoramicPointComponent_1 = require("../../Module/Panoramic/PanoramicPointComponent");
const BaseActorComponent_1 = require("../Common/Component/BaseActorComponent");
const BaseSplineMoveComponent_1 = require("../Common/Component/BaseSplineMoveComponent");
const BaseTagComponent_1 = require("../Common/Component/BaseTagComponent");
const BaseUnifiedStateComponent_1 = require("../Common/Component/BaseUnifiedStateComponent");
const ClientConditionListenerComponent_1 = require("../Common/Component/ClientConditionListenerComponent");
const CommonConnectComponent_1 = require("../Common/Component/CommonConnectComponent");
const CustomAudioControlComponent_1 = require("../Common/Component/CustomAudioControlComponent");
const DurablityComponent_1 = require("../Common/Component/DurablityComponent");
const InteractItemComponent_1 = require("../Common/Component/InteractItemComponent");
const LevelQteComponent_1 = require("../Common/Component/LevelQteComponent");
const LevelTagComponent_1 = require("../Common/Component/LevelTagComponent");
const MotorcycleRailComponent_1 = require("../Common/Component/MotorcycleRailComponent");
const PerformanceComponent_1 = require("../Common/Component/PerformanceComponent");
const PostProcessBridgeComponent_1 = require("../Common/Component/PostProcessBridgeComponent");
const RoadNetworkNavigationComponent_1 = require("../Common/Component/RoadNetworkNavigationComponent");
const SceneItemInhalationComponent_1 = require("../Common/Component/SceneItemInhalationComponent");
const SubActorPerformanceComponent_1 = require("../Common/Component/SubActorPerformanceComponent");
const SubMeshComponent_1 = require("../Common/Component/SubMeshComponent");
const UeActorTickManageComponent_1 = require("../Common/Component/UeActorTickManageComponent");
const UeComponentTickManageComponent_1 = require("../Common/Component/UeComponentTickManageComponent");
const UeMovementTickManageComponent_1 = require("../Common/Component/UeMovementTickManageComponent");
const UeSkeletalTickManageComponent_1 = require("../Common/Component/UeSkeletalTickManageComponent");
const PawnAdsorbComponent_1 = require("../Pawn/Component/PawnAdsorbComponent");
const PawnInfoManageComponent_1 = require("../Pawn/Component/PawnInfoManageComponent");
const PawnInteractNewComponent_1 = require("../Pawn/Component/PawnInteractNewComponent");
const PawnPerceptionComponent_1 = require("../Pawn/Component/PawnPerceptionComponent");
const PawnSelfCenterComponent_1 = require("../Pawn/Component/PawnSelfCenterComponent");
const PawnSensoryComponent_1 = require("../Pawn/Component/PawnSensoryComponent");
const PawnSensoryInfoComponent_1 = require("../Pawn/Component/PawnSensoryInfoComponent");
const OptimizationStrategyComponent_1 = require("../Pawn/OptimizationStrategy/OptimizationStrategyComponent");
const PlayerAttributeComponent_1 = require("../Player/Component/PlayerAttributeComponent");
const PlayerBuffComponent_1 = require("../Player/Component/PlayerBuffComponent");
const PlayerGameplayCueComponent_1 = require("../Player/Component/PlayerGameplayCueComponent");
const PlayerLifeCycleComponent_1 = require("../Player/Component/PlayerLifeCycleComponent");
const PlayerTagComponent_1 = require("../Player/Component/PlayerTagComponent");
const ProceduralVisualComponent_1 = require("../ProceduralVisualComponent");
const AiGearStrategyComponent_1 = require("../SceneItem/AiInteraction/AiGearStrategyComponent");
const AiWeaponMovementComponent_1 = require("../SceneItem/AiInteraction/AiWeaponMovementComponent");
const CollectComponent_1 = require("../SceneItem/CollectComponent");
const BatchBulletCasterComponent_1 = require("../SceneItem/Common/Component/BatchBulletCasterComponent");
const EffectAreaComponent_1 = require("../SceneItem/Common/Component/EffectAreaComponent");
const GodKingFrequencyControllerComponent_1 = require("../SceneItem/Common/Component/GodKingFrequencyControllerComponent");
const RenderMaskComponent_1 = require("../SceneItem/Common/Component/RenderMaskComponent");
const SceneItemAiRacingMoveComponent_1 = require("../SceneItem/Common/Component/SceneItemAiRacingMoveComponent");
const SceneItemAttachTargetComponent_1 = require("../SceneItem/Common/Component/SceneItemAttachTargetComponent");
const SceneItemCurveControlComponent_1 = require("../SceneItem/Common/Component/SceneItemCurveControlComponent");
const SceneItemDebugComponent_1 = require("../SceneItem/Common/Component/SceneItemDebugComponent");
const SceneItemDynamicAttachTargetComponent_1 = require("../SceneItem/Common/Component/SceneItemDynamicAttachTargetComponent");
const SceneItemInteractAudioComponent_1 = require("../SceneItem/Common/Component/SceneItemInteractAudioComponent");
const SceneItemMoveComponent_1 = require("../SceneItem/Common/Component/SceneItemMoveComponent");
const SceneItemNoRenderPortalComponent_1 = require("../SceneItem/Common/Component/SceneItemNoRenderPortalComponent");
const SceneItemPhysicalAttachComponent_1 = require("../SceneItem/Common/Component/SceneItemPhysicalAttachComponent");
const SceneItemPortalComponent_1 = require("../SceneItem/Common/Component/SceneItemPortalComponent");
const SceneItemProgressControlComponent_1 = require("../SceneItem/Common/Component/SceneItemProgressControlComponent");
const SceneItemPropertyComponent_1 = require("../SceneItem/Common/Component/SceneItemPropertyComponent");
const SceneItemStateAudioComponent_1 = require("../SceneItem/Common/Component/SceneItemStateAudioComponent");
const SceneItemStateComponent_1 = require("../SceneItem/Common/Component/SceneItemStateComponent");
const SceneItemTimeTrackControlComponent_1 = require("../SceneItem/Common/Component/SceneItemTimeTrackControlComponent");
const SceneItemTurntableControllerComponent_1 = require("../SceneItem/Common/Component/SceneItemTurntableControllerComponent");
const SmartObjectComponent_1 = require("../SceneItem/Common/Component/SmartObjectComponent");
const TemplateEntitySpawnerComponent_1 = require("../SceneItem/Common/Component/TemplateEntitySpawnerComponent");
const WindDirectionalSourceComponent_1 = require("../SceneItem/Common/Component/WindDirectionalSourceComponent");
const DynamicPortalCreatorComponent_1 = require("../SceneItem/DynamicPortalCreatorComponent");
const GamePlayElevatorComponent_1 = require("../SceneItem/GamePlayElevatorComponent");
const GamePlayHitGearComponent_1 = require("../SceneItem/GamePlayHitGearComponent");
const GamePlayTreasureBoxComponent_1 = require("../SceneItem/GamePlayTreasureBoxComponent");
const GamePlayWalkingPatternComponent_1 = require("../SceneItem/GamePlayWalkingPatternComponent");
const SceneItemJigsawBaseComponent_1 = require("../SceneItem/Jigsaw/SceneItemJigsawBaseComponent");
const SceneItemJigsawItemComponent_1 = require("../SceneItem/Jigsaw/SceneItemJigsawItemComponent");
const LevelSequenceFrameEventComponent_1 = require("../SceneItem/LevelSequenceFrameEventComponent");
const SceneBulletComponent_1 = require("../SceneItem/SceneBulletComponent");
const SceneItemActorComponent_1 = require("../SceneItem/SceneItemActorComponent");
const SceneItemAdviceComponent_1 = require("../SceneItem/SceneItemAdviceComponent");
const SceneItemAiInteractionComponent_1 = require("../SceneItem/SceneItemAiInteractionComponent");
const SceneItemBeamCastComponent_1 = require("../SceneItem/SceneItemBeamCastComponent");
const SceneItemBeamReceiveComponent_1 = require("../SceneItem/SceneItemBeamReceiveComponent");
const SceneItemBuffConsumerComponent_1 = require("../SceneItem/SceneItemBuffConsumerComponent");
const SceneItemBuffProducerComponent_1 = require("../SceneItem/SceneItemBuffProducerComponent");
const SceneItemCameraAlertComponent_1 = require("../SceneItem/SceneItemCameraAlertComponent");
const SceneItemCaptureComponent_1 = require("../SceneItem/SceneItemCaptureComponent");
const SceneItemChessmanComponent_1 = require("../SceneItem/SceneItemChessmanComponent");
const SceneItemConveyorBeltComponent_1 = require("../SceneItem/SceneItemConveyorBeltComponent");
const SceneItemDamageComponent_1 = require("../SceneItem/SceneItemDamageComponent");
const SceneItemDropItemComponent_1 = require("../SceneItem/SceneItemDropItemComponent");
const SceneItemEventListenerComponent_1 = require("../SceneItem/SceneItemEventListenerComponent");
const SceneItemExploreInteractComponent_1 = require("../SceneItem/SceneItemExploreInteractComponent");
const SceneItemFanComponent_1 = require("../SceneItem/SceneItemFanComponent");
const SceneItemFishingPointComponent_1 = require("../SceneItem/SceneItemFishingPointComponent");
const SceneItemGravityComponent_1 = require("../SceneItem/SceneItemGravityComponent");
const SceneItemGravityFlipComponent_1 = require("../SceneItem/SceneItemGravityFlipComponent");
const SceneItemGroupAiComponent_1 = require("../SceneItem/SceneItemGroupAiComponent");
const SceneItemGuidePathComponent_1 = require("../SceneItem/SceneItemGuidePathComponent");
const SceneItemHitComponent_1 = require("../SceneItem/SceneItemHitComponent");
const SceneItemInhaledItemComponent_1 = require("../SceneItem/SceneItemInhaledItemComponent");
const SceneItemLevitateMagnetComponent_1 = require("../SceneItem/SceneItemLevitateMagnetComponent");
const SceneItemManipulatableComponent_1 = require("../SceneItem/SceneItemManipulatableComponent");
const SceneItemMonsterGachaItemComponent_1 = require("../SceneItem/SceneItemMonsterGachaItemComponent");
const SceneItemMovementSyncComponent_1 = require("../SceneItem/SceneItemMovementSyncComponent");
const SceneItemMultiInteractionActorComponent_1 = require("../SceneItem/SceneItemMultiInteractionActorComponent");
const SceneItemNearbyTrackingComponent_1 = require("../SceneItem/SceneItemNearbyTrackingComponent");
const SceneItemOutletComponent_1 = require("../SceneItem/SceneItemOutletComponent");
const SceneItemPickInteractComponent_1 = require("../SceneItem/SceneItemPickInteractComponent");
const SceneItemReboundComponent_1 = require("../SceneItem/SceneItemReboundComponent");
const SceneItemReferenceComponent_1 = require("../SceneItem/SceneItemReferenceComponent");
const SceneItemResetPositionComponent_1 = require("../SceneItem/SceneItemResetPositionComponent");
const SceneItemResetSelfPositionComponent_1 = require("../SceneItem/SceneItemResetSelfPositionComponent");
const SceneItemRotatorComponent_1 = require("../SceneItem/SceneItemRotatorComponent");
const SceneItemSunSpiritGearComponent_1 = require("../SceneItem/SceneItemSunSpiritGearComponent");
const SceneItemSunSpiritLauncherComponent_1 = require("../SceneItem/SceneItemSunSpiritLauncherComponent");
const SceneItemTimeScaleComponent_1 = require("../SceneItem/SceneItemTimeScaleComponent");
const SceneItemTimeStopMachineComponent_1 = require("../SceneItem/SceneItemTimeStopMachineComponent");
const SceneItemTrackGuideComponent_1 = require("../SceneItem/SceneItemTrackGuideComponent");
const SceneItemVehicleComponent_1 = require("../SceneItem/SceneItemVehicleComponent");
const SceneItemWindPipelineComponent_1 = require("../SceneItem/SceneItemWindPipelineComponent");
const UeSceneItemMoveTickManagerComponent_1 = require("../SceneItem/UeSceneItemMoveTickManagerComponent");
const SceneItemGenericOutletComponent_1 = require("../SceneItemGenericOutletComponent");
const MotorAnimationSyncComponent_1 = require("../Vehicle/Common/MotorAnimationSyncComponent");
const UeVehicleMovementTickManageComponent_1 = require("../Vehicle/Common/UeVehicleMovementTickManageComponent");
const VehicleAbilityComponent_1 = require("../Vehicle/Common/VehicleAbilityComponent");
const VehicleActorComponent_1 = require("../Vehicle/Common/VehicleActorComponent");
const VehicleAnimationComponent_1 = require("../Vehicle/Common/VehicleAnimationComponent");
const VehicleAudioComponent_1 = require("../Vehicle/Common/VehicleAudioComponent");
const VehicleBuffComponent_1 = require("../Vehicle/Common/VehicleBuffComponent");
const VehicleCatapultComponent_1 = require("../Vehicle/Common/VehicleCatapultComponent");
const VehicleFrozenComponent_1 = require("../Vehicle/Common/VehicleFrozenComponent");
const VehicleHitComponent_1 = require("../Vehicle/Common/VehicleHitComponent");
const VehicleInputComponent_1 = require("../Vehicle/Common/VehicleInputComponent");
const VehicleLockOnComponent_1 = require("../Vehicle/Common/VehicleLockOnComponent");
const VehicleMontageComponent_1 = require("../Vehicle/Common/VehicleMontageComponent");
const VehicleMoveComponent_1 = require("../Vehicle/Common/VehicleMoveComponent");
const VehicleMovementSyncComponent_1 = require("../Vehicle/Common/VehicleMovementSyncComponent");
const VehiclePerformComponent_1 = require("../Vehicle/Common/VehiclePerformComponent");
const VehicleSceneItemPerformComponent_1 = require("../Vehicle/Common/VehicleSceneItemPerformComponent");
const VehicleSkillComponent_1 = require("../Vehicle/Common/VehicleSkillComponent");
const VehicleSplineMoveComponent_1 = require("../Vehicle/Common/VehicleSplineMoveComponent");
const VehicleTagComponent_1 = require("../Vehicle/Common/VehicleTagComponent");
const FishingBoatDeathComponent_1 = require("../Vehicle/FishingBoat/FishingBoatDeathComponent");
const FishingBoatInputComponent_1 = require("../Vehicle/FishingBoat/FishingBoatInputComponent");
const FishingBoatPerformComponent_1 = require("../Vehicle/FishingBoat/FishingBoatPerformComponent");
const GongduolaAudioComponent_1 = require("../Vehicle/Gongduola/GongduolaAudioComponent");
const GongduolaInputComponent_1 = require("../Vehicle/Gongduola/GongduolaInputComponent");
const GongduolaPerformComponent_1 = require("../Vehicle/Gongduola/GongduolaPerformComponent");
const GongduolaSplineMoveComponent_1 = require("../Vehicle/Gongduola/GongduolaSplineMoveComponent");
const MotorcycleActorComponent_1 = require("../Vehicle/Motorcycle/MotorcycleActorComponent");
const MotorcycleAnimationComponent_1 = require("../Vehicle/Motorcycle/MotorcycleAnimationComponent");
const MotorcycleAudioComponent_1 = require("../Vehicle/Motorcycle/MotorcycleAudioComponent");
const MotorcycleInputComponent_1 = require("../Vehicle/Motorcycle/MotorcycleInputComponent");
const MotorcycleMoveComponent_1 = require("../Vehicle/Motorcycle/MotorcycleMoveComponent");
const MotorcycleOutlookComponent_1 = require("../Vehicle/Motorcycle/MotorcycleOutlookComponent");
const MotorcyclePerformComponent_1 = require("../Vehicle/Motorcycle/MotorcyclePerformComponent");
const MotorcycleRailMoveComponent_1 = require("../Vehicle/Motorcycle/MotorcycleRailMove/MotorcycleRailMoveComponent");
const MotorcycleSplineMoveComponent_1 = require("../Vehicle/Motorcycle/MotorcycleSplineMoveComponent");
const MotorcycleStrengthComponent_1 = require("../Vehicle/Motorcycle/MotorcycleStrengthComponent");
const MotorcycleUiComponent_1 = require("../Vehicle/Motorcycle/MotorcycleUiComponent");
const MotorcycleWaterComponent_1 = require("../Vehicle/Motorcycle/MotorcycleWaterComponent");
const MotorcylceConfigComponent_1 = require("../Vehicle/Motorcycle/MotorcylceConfigComponent");
const AnimalDeathSyncComponent_1 = require("./Animal/Component/AnimalDeathSyncComponent");
const AnimalPerformComponent_1 = require("./Animal/Component/AnimalPerformComponent");
const AnimalStateMachineComponent_1 = require("./Animal/Component/AnimalStateMachineComponent");
const CharacterComponentPriorityDefine_1 = require("./Common/CharacterComponentPriorityDefine");
const BaseDamageComponent_1 = require("./Common/Component/Abilities/BaseDamageComponent");
const CharacterAbilityComponent_1 = require("./Common/Component/Abilities/CharacterAbilityComponent");
const CharacterAttributeComponent_1 = require("./Common/Component/Abilities/CharacterAttributeComponent");
const CharacterBuffComponent_1 = require("./Common/Component/Abilities/CharacterBuffComponent");
const CharacterDamageComponent_1 = require("./Common/Component/Abilities/CharacterDamageComponent");
const CharacterGameplayCueComponent_1 = require("./Common/Component/Abilities/CharacterGameplayCueComponent");
const CharacterGasDebugComponent_1 = require("./Common/Component/Abilities/CharacterGasDebugComponent");
const CharacterMontageComponent_1 = require("./Common/Component/Abilities/CharacterMontageComponent");
const CharacterPassiveSkillComponent_1 = require("./Common/Component/Abilities/CharacterPassiveSkillComponent");
const CharacterStatisticsComponent_1 = require("./Common/Component/Abilities/CharacterStatisticsComponent");
const CharacterTriggerComponent_1 = require("./Common/Component/Abilities/CharacterTriggerComponent");
const CharacterUnifiedStateComponent_1 = require("./Common/Component/Abilities/CharacterUnifiedStateComponent");
const FollowableComponent_1 = require("./Common/Component/Abilities/Follow/FollowableComponent");
const FollowerComponent_1 = require("./Common/Component/Abilities/Follow/FollowerComponent");
const FollowShooterComponent_1 = require("./Common/Component/Abilities/Follow/FollowShooterComponent");
const PlayerFollowableComponent_1 = require("./Common/Component/Abilities/Follow/PlayerFollowableComponent");
const VisionBuffComponent_1 = require("./Common/Component/Abilities/VisionBuffComponent");
const CharacterActionComponent_1 = require("./Common/Component/Action/CharacterActionComponent");
const CharacterSwingComponent_1 = require("./Common/Component/Action/CharacterSwingComponent");
const BaseCrowdAiComponent_1 = require("./Common/Component/BaseCrowdAiComponent");
const BaseMoveComponent_1 = require("./Common/Component/BaseMoveComponent");
const CharacterActorComponent_1 = require("./Common/Component/CharacterActorComponent");
const CharacterAiComponent_1 = require("./Common/Component/CharacterAiComponent");
const CharacterAnimationComponent_1 = require("./Common/Component/CharacterAnimationComponent");
const CharacterAnimationSyncComponent_1 = require("./Common/Component/CharacterAnimationSyncComponent");
const CharacterAttachComponent_1 = require("./Common/Component/CharacterAttachComponent");
const CharacterAudioComponent_1 = require("./Common/Component/CharacterAudioComponent");
const CharacterBirthTagComponent_1 = require("./Common/Component/CharacterBirthTagComponent");
const CharacterCaughtNewComponent_1 = require("./Common/Component/CharacterCaughtNewComponent");
const CharacterCombatMessageComponent_1 = require("./Common/Component/CharacterCombatMessageComponent");
const CharacterCrowdAiComponent_1 = require("./Common/Component/CharacterCrowdAiComponent");
const CharacterCustomValueComponent_1 = require("./Common/Component/CharacterCustomValueComponent");
const CharacterFightStateComponent_1 = require("./Common/Component/CharacterFightStateComponent");
const CharacterFollowComponent_1 = require("./Common/Component/CharacterFollowComponent");
const CharacterFootEffectComponent_1 = require("./Common/Component/CharacterFootEffectComponent");
const CharacterGaitComponent_1 = require("./Common/Component/CharacterGaitComponent");
const CharacterGlideComponent_1 = require("./Common/Component/CharacterGlideComponent");
const CharacterHitComponent_1 = require("./Common/Component/CharacterHitComponent");
const CharacterHoldingHandsComponent_1 = require("./Common/Component/CharacterHoldingHandsComponent");
const CharacterInputComponent_1 = require("./Common/Component/CharacterInputComponent");
const CharacterInteractivePerformComponent_1 = require("./Common/Component/CharacterInteractivePerformComponent");
const CharacterLevelShootComponent_1 = require("./Common/Component/CharacterLevelShootComponent");
const CharacterLinkedAnimInstComponent_1 = require("./Common/Component/CharacterLinkedAnimInstComponent");
const CharacterLogicStateSyncComponent_1 = require("./Common/Component/CharacterLogicStateSyncComponent");
const CharacterManipulateComponent_1 = require("./Common/Component/CharacterManipulateComponent");
const CharacterManipulateInteractComponent_1 = require("./Common/Component/CharacterManipulateInteractComponent");
const CharacterMoveComponent_1 = require("./Common/Component/CharacterMoveComponent");
const CharacterMovementSyncComponent_1 = require("./Common/Component/CharacterMovementSyncComponent");
const CharacterPartComponent_1 = require("./Common/Component/CharacterPartComponent");
const CharacterPartScanComponent_1 = require("./Common/Component/CharacterPartScanComponent");
const CharacterPendulumComponent_1 = require("./Common/Component/CharacterPendulumComponent");
const CharacterPhysicsAssetComponent_1 = require("./Common/Component/CharacterPhysicsAssetComponent");
const CharacterPlanComponent_1 = require("./Common/Component/CharacterPlanComponent");
const CharacterRoleTransitionComponent_1 = require("./Common/Component/CharacterRoleTransitionComponent");
const CharacterSelfCenterComponent_1 = require("./Common/Component/CharacterSelfCenterComponent");
const CharacterShieldComponent_1 = require("./Common/Component/CharacterShieldComponent");
const CharacterSkinDamageComponent_1 = require("./Common/Component/CharacterSkinDamageComponent");
const CharacterSpecialTagComponent_1 = require("./Common/Component/CharacterSpecialTagComponent");
const CharacterSplineMoveComponent_1 = require("./Common/Component/CharacterSplineMoveComponent");
const CharacterStateMachineNewComponent_1 = require("./Common/Component/CharacterStateMachineNewComponent");
const CharacterSwimComponent_1 = require("./Common/Component/CharacterSwimComponent");
const CharacterThrowComponent_1 = require("./Common/Component/CharacterThrowComponent");
const CharacterTimeScaleComponent_1 = require("./Common/Component/CharacterTimeScaleComponent");
const CharacterWalkOnAirComponent_1 = require("./Common/Component/CharacterWalkOnAirComponent");
const CharacterWalkOnWaterComponent_1 = require("./Common/Component/CharacterWalkOnWaterComponent");
const CharacterWeaponComponent_1 = require("./Common/Component/CharacterWeaponComponent");
const CreatureDataComponent_1 = require("./Common/Component/CreatureDataComponent");
const DangoPerformComponent_1 = require("./Common/Component/DangoPerformComponent");
const ActorDebugMovementComponent_1 = require("./Common/Component/Debug/ActorDebugMovementComponent");
const CharacterExploreComponent_1 = require("./Common/Component/Explore/CharacterExploreComponent");
const MotorcycleExploreComponent_1 = require("./Common/Component/Explore/MotorcycleExploreComponent");
const CharacterFlowComponent_1 = require("./Common/Component/Flow/CharacterFlowComponent");
const CharacterLockOnComponent_1 = require("./Common/Component/LockOn/CharacterLockOnComponent");
const CharacterMorphComponent_1 = require("./Common/Component/Morph/CharacterMorphComponent");
const CharacterCatapultComponent_1 = require("./Common/Component/Move/CharacterCatapultComponent");
const CharacterClimbComponent_1 = require("./Common/Component/Move/CharacterClimbComponent");
const CharacterKiteComponent_1 = require("./Common/Component/Move/CharacterKiteComponent");
const CharacterPatrolComponent_1 = require("./Common/Component/Move/CharacterPatrolComponent");
const CharacterRailSlideComponent_1 = require("./Common/Component/Move/CharacterRailSlideComponent");
const CharacterRollComponent_1 = require("./Common/Component/Move/CharacterRollComponent");
const CharacterSlideComponent_1 = require("./Common/Component/Move/CharacterSlideComponent");
const CharacterSplineClimbComponent_1 = require("./Common/Component/Move/CharacterSplineClimbComponent");
const NpcMoveComponent_1 = require("./Common/Component/NpcMoveComponent");
const PawnHeadInfoComponent_1 = require("./Common/Component/PawnHeadInfoComponent");
const RolePreloadComponent_1 = require("./Common/Component/RolePreloadComponent");
const ScanComponent_1 = require("./Common/Component/ScanComponent");
const BaseSkillCdComponent_1 = require("./Common/Component/Skill/BaseSkillCdComponent");
const CharacterSkillCdComponent_1 = require("./Common/Component/Skill/CharacterSkillCdComponent");
const CharacterSkillComponent_1 = require("./Common/Component/Skill/CharacterSkillComponent");
const CharacterSkillTriggerComponent_1 = require("./Common/Component/Skill/CharacterSkillTriggerComponent");
const CharacterSpecialSkillComponent_1 = require("./Common/Component/Skill/CharacterSpecialSkillComponent");
const VisionSkillComponent_1 = require("./Common/Component/Skill/VisionSkillComponent");
const CharacterVisionComponent_1 = require("./Common/Component/Vision/CharacterVisionComponent");
const CreateEntityData_1 = require("./CreateEntityData");
const ClientTriggerComponent_1 = require("./Custom/Components/ClientTriggerComponent");
const DungeonEntranceComponent_1 = require("./Custom/Components/DungeonEntranceComponent");
const GrapplingHookPointComponent_1 = require("./Custom/Components/GrapplingHookPointComponent");
const RangeComponent_1 = require("./Custom/Components/RangeComponent");
const SafetyLocationComponent_1 = require("./Custom/Components/SafetyLocationComponent");
const TriggerComponent_1 = require("./Custom/Components/TriggerComponent");
const HackManagementComponent_1 = require("./Monster/Component/HackManagementComponent");
const MonsterFlowComponent_1 = require("./Monster/Component/MonsterFlowComponent");
const ExecutionComponent_1 = require("./Monster/Entity/Component/ExecutionComponent");
const MonsterBehaviorComponent_1 = require("./Monster/Entity/Component/MonsterBehaviorComponent");
const MonsterDeathComponent_1 = require("./Monster/Entity/Component/MonsterDeathComponent");
const MonsterDebugComponent_1 = require("./Monster/Entity/Component/MonsterDebugComponent");
const MonsterFrozenComponent_1 = require("./Monster/Entity/Component/MonsterFrozenComponent");
const MonsterWeaknessComponent_1 = require("./Monster/Entity/Component/MonsterWeaknessComponent");
const CommonNpcPerformComponent_1 = require("./Npc/Component/CommonNpcPerformComponent");
const NpcDriveVehicleComponent_1 = require("./Npc/Component/NpcDriveVehicleComponent");
const NpcFlowComponent_1 = require("./Npc/Component/NpcFlowComponent");
const NpcPasserbyComponent_1 = require("./Npc/Component/NpcPasserbyComponent");
const NpcPerformComponent_1 = require("./Npc/Component/NpcPerformComponent");
const NpcSitOnChairComponent_1 = require("./Npc/Component/NpcSitOnChairComponent");
const NpcVehiclePerformComponent_1 = require("./Npc/Component/NpcVehiclePerformComponent");
const PasserbyGeneratorComponent_1 = require("./Npc/Component/PasserbyGeneratorComponent");
const RoleAttributeComponent_1 = require("./Role/Component/RoleAttributeComponent");
const RoleAudioComponent_1 = require("./Role/Component/RoleAudioComponent");
const RoleBreakWeaknessComponent_1 = require("./Role/Component/RoleBreakWeaknessComponent");
const RoleBuffComponent_1 = require("./Role/Component/RoleBuffComponent");
const RoleDeathComponent_1 = require("./Role/Component/RoleDeathComponent");
const RoleDriveVehicleComponent_1 = require("./Role/Component/RoleDriveVehicleComponent");
const RoleElementComponent_1 = require("./Role/Component/RoleElementComponent");
const RoleEnergyComponent_1 = require("./Role/Component/RoleEnergyComponent");
const RoleFrozenComponent_1 = require("./Role/Component/RoleFrozenComponent");
const RoleGaitComponent_1 = require("./Role/Component/RoleGaitComponent");
const RoleGrowComponent_1 = require("./Role/Component/RoleGrowComponent");
const RoleInhalationComponent_1 = require("./Role/Component/RoleInhalationComponent");
const RoleInheritComponent_1 = require("./Role/Component/RoleInheritComponent");
const RoleLinkedAnimInstComponent_1 = require("./Role/Component/RoleLinkedAnimInstComponent");
const RoleLocationSafetyComponent_1 = require("./Role/Component/RoleLocationSafetyComponent");
const RolePartyComponent_1 = require("./Role/Component/RolePartyComponent");
const RoleQteComponent_1 = require("./Role/Component/RoleQteComponent");
const RoleSceneInteractComponent_1 = require("./Role/Component/RoleSceneInteractComponent");
const RoleStrengthComponent_1 = require("./Role/Component/RoleStrengthComponent");
const RoleTagComponent_1 = require("./Role/Component/RoleTagComponent");
const RoleTeamComponent_1 = require("./Role/Component/RoleTeamComponent");
const SimpleNpcActorComponent_1 = require("./SimpleNpc/Component/SimpleNpcActorComponent");
const SimpleNpcAnimationComponent_1 = require("./SimpleNpc/Component/SimpleNpcAnimationComponent");
const ROLE_PRIORITY = 7;
const GLOBAL_PRIORITY = 7;
const VISION_PRIORITY = 11;
const MONSTER_PRIORITY = 10;
const NPC_PRIORITY = 9;
const VEHICLE_PRIORITY = 11;
const OTHER_PRIORITY = 8;
exports.USE_ENTITY_POOL = true;
class WorldEntityHelper {
  static Initialize() {
    this.Nor();
    this.Oor();
    this.xIc();
    this.kor();
    this.u11();
    this.yna();
    return true;
  }
  static Clear() {
    this.ComponentPriority.clear();
    this.For.clear();
    this.DIc.clear();
    this.d11.clear();
    return true;
  }
  static CreateWorldEntity(e) {
    var n = e.EntityData;
    let o = -1n;
    let t = undefined;
    switch (n.zHn) {
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        e.Priority = MONSTER_PRIORITY;
        if (this.GetMonsterComponentRecord(e)) {
          break;
        }
        return;
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
        e.Priority = ROLE_PRIORITY;
        if (e.ComponentDataMap.get("oI_")?.oI_?.fI_) {
          if (this.GetAutoRoleComponentRecord(e)) {
            break;
          }
          return;
        }
        if (this.GetRoleComponentRecord(e)) {
          break;
        }
        return;
      case Protocol_1.Aki.Protocol.kks.Proto_Vision:
        e.Priority = VISION_PRIORITY;
        if (this.GetVisionComponentRecord(e)) {
          break;
        }
        return;
      case Protocol_1.Aki.Protocol.kks.Proto_Animal:
        e.Priority = OTHER_PRIORITY;
        if (this.GetAnimalComponentRecord(e)) {
          break;
        }
        return;
      case Protocol_1.Aki.Protocol.kks.Proto_Custom:
        e.Priority = OTHER_PRIORITY;
        if (this.GetCustomComponentRecord(e)) {
          break;
        }
        return;
      case Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity:
        e.Priority = GLOBAL_PRIORITY;
        if (this.GetPlayerComponentRecord(e)) {
          break;
        }
        return;
      case Protocol_1.Aki.Protocol.kks.Proto_SceneEntity:
        e.Priority = GLOBAL_PRIORITY;
        if (this.GetSceneEntityComponentRecord(e)) {
          break;
        }
        return;
      case Protocol_1.Aki.Protocol.kks.Proto_Npc:
        e.Priority = NPC_PRIORITY;
        switch (n.oys || 0) {
          case 1:
            if (this.Hor) {
              t = ControllerHolder_1.ControllerHolder.CharacterController.SpawnEntity(this.Hor);
              o = this.Hor;
            }
            break;
          case 2:
            if (this.jor) {
              t = ControllerHolder_1.ControllerHolder.CharacterController.SpawnEntity(this.jor);
              o = this.jor;
            }
            break;
          case 3:
            if (this.w4l) {
              t = ControllerHolder_1.ControllerHolder.CharacterController.SpawnEntity(this.w4l);
              o = this.w4l;
            }
            break;
          case 4:
            if (this.Cn1) {
              t = ControllerHolder_1.ControllerHolder.CharacterController.SpawnEntity(this.Cn1);
              o = this.Cn1;
            }
            break;
          default:
            if (this.Wor) {
              t = ControllerHolder_1.ControllerHolder.CharacterController.SpawnEntity(this.Wor);
              o = this.Wor;
            }
        }
        if (t) {
          e.ComponentsKey = o;
          this.Kor(e);
        } else {
          if (!this.GetNpcComponentRecord(e)) {
            return;
          }
          o = e.ComponentsKey;
        }
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
        e.Priority = OTHER_PRIORITY;
        if (this.GetSceneItemComponentRecord(e)) {
          break;
        }
        return;
      case Protocol_1.Aki.Protocol.kks.HI_:
        e.Priority = VEHICLE_PRIORITY;
        if (this.GetVehicleComponentRecord(e)) {
          break;
        }
        return;
    }
    o = e.ComponentsKey;
    if (t = t || ControllerHolder_1.ControllerHolder.CharacterController.SpawnEntity(o)) {
      if (!ControllerHolder_1.ControllerHolder.CharacterController.Respawn(t, t.Entity, e.Priority, e)) {
        return;
      }
    } else {
      t = ControllerHolder_1.ControllerHolder.CharacterController.CreateEntity(o, e);
    }
    return t;
  }
  static Destroy(e) {
    if (exports.USE_ENTITY_POOL) {
      var n = e.Entity.GetComponent(0);
      if (n.IsNpc()) {
        switch (n.GetSubEntityType()) {
          case 1:
            this.Hor = n.GetComponentKey();
            break;
          case 2:
            this.jor = n.GetComponentKey();
            break;
          case 3:
            this.w4l = n.GetComponentKey();
            break;
          case 4:
            this.Cn1 = n.GetComponentKey();
            break;
          default:
            this.Wor = n.GetComponentKey();
        }
      }
      if (ControllerHolder_1.ControllerHolder.CharacterController.DestroyToLru(e)) {
        return true;
      } else {
        return false;
      }
    }
    return !!ControllerHolder_1.ControllerHolder.CharacterController.Destroy(e);
  }
  static GetMonsterComponentRecord(e) {
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterActorComponent_1.CharacterActorComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterLogicStateSyncComponent_1.CharacterLogicStateSyncComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterBirthTagComponent_1.CharacterBirthTagComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterStateMachineNewComponent_1.CharacterStateMachineNewComponent)) {
      return false;
    }
    if (!e.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAbilityComponent_1.CharacterAbilityComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAttributeComponent_1.CharacterAttributeComponent)) {
      return false;
    }
    if (CreateEntityData_1.CreateEntityData.IsFollowShooter(e) && !e.AddComponent(CharacterSkillCdComponent_1.CharacterSkillCdComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterBuffComponent_1.CharacterBuffComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterGameplayCueComponent_1.CharacterGameplayCueComponent)) {
      return false;
    }
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      if (!e.AddComponent(CharacterGasDebugComponent_1.CharacterGasDebugComponent)) {
        return false;
      }
      if (!e.AddComponent(CharacterStatisticsComponent_1.CharacterStatisticsComponent)) {
        return false;
      }
      if (!e.AddComponent(ActorDebugMovementComponent_1.ActorDebugMovementComponent)) {
        return false;
      }
    }
    if (!e.AddComponent(CharacterUnifiedStateComponent_1.CharacterUnifiedStateComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterFightStateComponent_1.CharacterFightStateComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterTriggerComponent_1.CharacterTriggerComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterMontageComponent_1.CharacterMontageComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterDamageComponent_1.CharacterDamageComponent)) {
      return false;
    }
    if (!e.AddComponent(MonsterFrozenComponent_1.MonsterFrozenComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterShieldComponent_1.CharacterShieldComponent)) {
      return false;
    }
    if (!e.AddComponent(LevelTagComponent_1.LevelTagComponent)) {
      return false;
    }
    if (!e.AddComponent(MonsterDeathComponent_1.MonsterDeathComponent)) {
      return false;
    }
    if (!e.AddComponent(MonsterDebugComponent_1.MonsterDebugComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAnimationComponent_1.CharacterAnimationComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterMoveComponent_1.CharacterMoveComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSelfCenterComponent_1.CharacterSelfCenterComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterMovementSyncComponent_1.CharacterMovementSyncComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterRoleTransitionComponent_1.CharacterRoleTransitionComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSkillComponent_1.CharacterSkillComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterCustomValueComponent_1.CharacterCustomValueComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterPassiveSkillComponent_1.CharacterPassiveSkillComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSkillTriggerComponent_1.CharacterSkillTriggerComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSpecialSkillComponent_1.CharacterSpecialSkillComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAiComponent_1.CharacterAiComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterFollowComponent_1.CharacterFollowComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterHitComponent_1.CharacterHitComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterTimeScaleComponent_1.CharacterTimeScaleComponent)) {
      return false;
    }
    if (!e.AddComponent(PawnPerceptionComponent_1.PawnPerceptionComponent)) {
      return false;
    }
    if (!e.AddComponent(MonsterBehaviorComponent_1.MonsterBehaviorComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterWeaponComponent_1.CharacterWeaponComponent)) {
      return false;
    }
    if (!e.AddComponent(UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterCaughtNewComponent_1.CharacterCaughtNewComponent)) {
      return false;
    }
    if (!e.AddComponent(UeMovementTickManageComponent_1.UeMovementTickManageComponent)) {
      return false;
    }
    if (!e.AddComponent(UeActorTickManageComponent_1.UeActorTickManageComponent)) {
      return false;
    }
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      if (!e.AddComponent(UeComponentTickManageComponent_1.UeComponentTickManageComponent)) {
        return false;
      }
      e.SetParam(UeComponentTickManageComponent_1.UeComponentTickManageComponent, UE.TsCharacterDebugComponent_C.StaticClass());
    }
    if (!e.AddComponent(CharacterPartComponent_1.CharacterPartComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterPartScanComponent_1.CharacterPartScanComponent)) {
      return false;
    }
    if (CreateEntityData_1.CreateEntityData.HasScanInfo(e) && !e.AddComponent(ScanComponent_1.ScanComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAudioComponent_1.CharacterAudioComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSwimComponent_1.CharacterSwimComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterWalkOnWaterComponent_1.CharacterWalkOnWaterComponent)) {
      return false;
    }
    var n = CreateEntityData_1.CreateEntityData.GetAnimalComponentConfig(e);
    if (n) {
      if (!e.AddComponent(AnimalStateMachineComponent_1.AnimalStateMachineComponent)) {
        return false;
      }
      if (!e.AddComponent(AnimalPerformComponent_1.AnimalPerformComponent)) {
        return false;
      }
      e.SetParam(AnimalPerformComponent_1.AnimalPerformComponent, n);
    }
    if (!e.AddComponent(PawnInteractNewComponent_1.PawnInteractNewComponent)) {
      return false;
    }
    if (!e.AddComponent(InteractionSpotComponent_1.InteractionSpotComponent)) {
      return false;
    }
    do {
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        break;
      }
      var o = CreateEntityData_1.CreateEntityData.GetMonsterComponent(e)?.FightConfigId;
      if (!o) {
        break;
      }
      o = MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(o);
      if (!o || o.ExecutionId.length === 0) {
        break;
      }
      if (!e.AddComponent(ExecutionComponent_1.ExecutionComponent)) {
        return false;
      }
    } while (0);
    if (!e.AddComponent(MonsterWeaknessComponent_1.MonsterWeaknessComponent)) {
      return false;
    }
    if (CreateEntityData_1.CreateEntityData.IsRobot(e) && !e.AddComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent)) {
      return false;
    }
    if (CreateEntityData_1.CreateEntityData.IsFollowShooter(e) && !e.AddComponent(FollowShooterComponent_1.FollowShooterComponent)) {
      return false;
    }
    if (!e.AddComponent(PawnInfoManageComponent_1.PawnInfoManageComponent)) {
      return false;
    }
    if (!e.AddComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent)) {
      return false;
    }
    if (!e.AddComponent(MonsterFlowComponent_1.MonsterFlowComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterPatrolComponent_1.CharacterPatrolComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAttachComponent_1.CharacterAttachComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterMorphComponent_1.CharacterMorphComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterHoldingHandsComponent_1.CharacterHoldingHandsComponent)) {
      return false;
    }
    if (!e.AddComponent(BaseCrowdAiComponent_1.BaseCrowdAiComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterCombatMessageComponent_1.CharacterCombatMessageComponent)) {
      return false;
    }
    if (CreateEntityData_1.CreateEntityData.GetBaseInfo(e)?.Category.MonsterMatchType === 4) {
      if (!e.AddComponent(CharacterGaitComponent_1.CharacterGaitComponent)) {
        return false;
      }
      if (!e.AddComponent(SubMeshComponent_1.SubMeshComponent)) {
        return false;
      }
    }
    this.UIc(e, this.Ina);
    return !!e.AddComponent(RolePreloadComponent_1.RolePreloadComponent);
  }
  static GetRoleComponentRecord(e) {
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterActorComponent_1.CharacterActorComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterLogicStateSyncComponent_1.CharacterLogicStateSyncComponent)) {
      return false;
    }
    if (!e.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleDriveVehicleComponent_1.RoleDriveVehicleComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterStateMachineNewComponent_1.CharacterStateMachineNewComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAbilityComponent_1.CharacterAbilityComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleGrowComponent_1.RoleGrowComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleAttributeComponent_1.RoleAttributeComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSkillCdComponent_1.CharacterSkillCdComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleBuffComponent_1.RoleBuffComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterGameplayCueComponent_1.CharacterGameplayCueComponent)) {
      return false;
    }
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      if (!e.AddComponent(CharacterGasDebugComponent_1.CharacterGasDebugComponent)) {
        return false;
      }
      if (!e.AddComponent(CharacterStatisticsComponent_1.CharacterStatisticsComponent)) {
        return false;
      }
      if (!e.AddComponent(ActorDebugMovementComponent_1.ActorDebugMovementComponent)) {
        return false;
      }
    }
    if (!e.AddComponent(CharacterUnifiedStateComponent_1.CharacterUnifiedStateComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterTriggerComponent_1.CharacterTriggerComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterMontageComponent_1.CharacterMontageComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterDamageComponent_1.CharacterDamageComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleFrozenComponent_1.RoleFrozenComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterShieldComponent_1.CharacterShieldComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleTagComponent_1.RoleTagComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleElementComponent_1.RoleElementComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleInheritComponent_1.RoleInheritComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleTeamComponent_1.RoleTeamComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleStrengthComponent_1.RoleStrengthComponent)) {
      return false;
    }
    if (!e.AddComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSkillComponent_1.CharacterSkillComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSpecialTagComponent_1.CharacterSpecialTagComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterCustomValueComponent_1.CharacterCustomValueComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterPassiveSkillComponent_1.CharacterPassiveSkillComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSkillTriggerComponent_1.CharacterSkillTriggerComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSpecialSkillComponent_1.CharacterSpecialSkillComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleDeathComponent_1.RoleDeathComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleEnergyComponent_1.RoleEnergyComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAnimationComponent_1.CharacterAnimationComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleLinkedAnimInstComponent_1.RoleLinkedAnimInstComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterMoveComponent_1.CharacterMoveComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSelfCenterComponent_1.CharacterSelfCenterComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterPendulumComponent_1.CharacterPendulumComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterThrowComponent_1.CharacterThrowComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterCaughtNewComponent_1.CharacterCaughtNewComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleGaitComponent_1.RoleGaitComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterInputComponent_1.CharacterInputComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSplineMoveComponent_1.CharacterSplineMoveComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterMovementSyncComponent_1.CharacterMovementSyncComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterWeaponComponent_1.CharacterWeaponComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleSceneInteractComponent_1.RoleSceneInteractComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterLockOnComponent_1.CharacterLockOnComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterFollowComponent_1.CharacterFollowComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterManipulateComponent_1.CharacterManipulateComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterManipulateInteractComponent_1.CharacterManipulateInteractComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterLevelShootComponent_1.CharacterLevelShootComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterExploreComponent_1.CharacterExploreComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterHitComponent_1.CharacterHitComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleQteComponent_1.RoleQteComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleBreakWeaknessComponent_1.RoleBreakWeaknessComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterTimeScaleComponent_1.CharacterTimeScaleComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSwimComponent_1.CharacterSwimComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterWalkOnWaterComponent_1.CharacterWalkOnWaterComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterWalkOnAirComponent_1.CharacterWalkOnAirComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterClimbComponent_1.CharacterClimbComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterGlideComponent_1.CharacterGlideComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSlideComponent_1.CharacterSlideComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterRailSlideComponent_1.CharacterRailSlideComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterCatapultComponent_1.CharacterCatapultComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterRollComponent_1.CharacterRollComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterKiteComponent_1.CharacterKiteComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterActionComponent_1.CharacterActionComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterHoldingHandsComponent_1.CharacterHoldingHandsComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSplineClimbComponent_1.CharacterSplineClimbComponent)) {
      return false;
    }
    if (!e.AddComponent(UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent)) {
      return false;
    }
    if (!e.AddComponent(UeMovementTickManageComponent_1.UeMovementTickManageComponent)) {
      return false;
    }
    if (!e.AddComponent(UeActorTickManageComponent_1.UeActorTickManageComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterInteractivePerformComponent_1.CharacterInteractivePerformComponent)) {
      return false;
    }
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      if (!e.AddComponent(UeComponentTickManageComponent_1.UeComponentTickManageComponent)) {
        return false;
      }
      e.SetParam(UeComponentTickManageComponent_1.UeComponentTickManageComponent, UE.TsCharacterDebugComponent_C.StaticClass());
    }
    if (!e.AddComponent(CharacterAiComponent_1.CharacterAiComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleAudioComponent_1.RoleAudioComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSwingComponent_1.CharacterSwingComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleLocationSafetyComponent_1.RoleLocationSafetyComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterVisionComponent_1.CharacterVisionComponent)) {
      return false;
    }
    if (e.AddComponent(CharacterPhysicsAssetComponent_1.CharacterPhysicsAssetComponent)) {
      return !!e.AddComponent(CharacterFootEffectComponent_1.CharacterFootEffectComponent) && !!e.AddComponent(CharacterSkinDamageComponent_1.CharacterSkinDamageComponent) && !!e.AddComponent(RolePartyComponent_1.RolePartyComponent) && !!e.AddComponent(CharacterCrowdAiComponent_1.CharacterCrowdAiComponent) && !!e.AddComponent(CharacterMorphComponent_1.CharacterMorphComponent) && !!e.AddComponent(CharacterCombatMessageComponent_1.CharacterCombatMessageComponent) && !!e.AddComponent(RolePreloadComponent_1.RolePreloadComponent) && !!e.AddComponent(SubMeshComponent_1.SubMeshComponent) && !!e.AddComponent(RoleInhalationComponent_1.RoleInhalationComponent) && (e.RegisterToGameBudgetController = true);
    }
    return false;
  }
  static GetAutoRoleComponentRecord(e) {
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterActorComponent_1.CharacterActorComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterLogicStateSyncComponent_1.CharacterLogicStateSyncComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterStateMachineNewComponent_1.CharacterStateMachineNewComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAbilityComponent_1.CharacterAbilityComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleGrowComponent_1.RoleGrowComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleAttributeComponent_1.RoleAttributeComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleBuffComponent_1.RoleBuffComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterGameplayCueComponent_1.CharacterGameplayCueComponent)) {
      return false;
    }
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      if (!e.AddComponent(CharacterGasDebugComponent_1.CharacterGasDebugComponent)) {
        return false;
      }
      if (!e.AddComponent(CharacterStatisticsComponent_1.CharacterStatisticsComponent)) {
        return false;
      }
      if (!e.AddComponent(ActorDebugMovementComponent_1.ActorDebugMovementComponent)) {
        return false;
      }
    }
    if (!e.AddComponent(CharacterUnifiedStateComponent_1.CharacterUnifiedStateComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterFightStateComponent_1.CharacterFightStateComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterTriggerComponent_1.CharacterTriggerComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterMontageComponent_1.CharacterMontageComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterDamageComponent_1.CharacterDamageComponent)) {
      return false;
    }
    if (!e.AddComponent(MonsterFrozenComponent_1.MonsterFrozenComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterShieldComponent_1.CharacterShieldComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleTagComponent_1.RoleTagComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleDeathComponent_1.RoleDeathComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSkillComponent_1.CharacterSkillComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterCustomValueComponent_1.CharacterCustomValueComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterPassiveSkillComponent_1.CharacterPassiveSkillComponent)) {
      return false;
    }
    if (!e.AddComponent(BaseSkillCdComponent_1.BaseSkillCdComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSkillTriggerComponent_1.CharacterSkillTriggerComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSpecialSkillComponent_1.CharacterSpecialSkillComponent)) {
      return false;
    }
    if (!e.AddComponent(RoleEnergyComponent_1.RoleEnergyComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAnimationComponent_1.CharacterAnimationComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterMoveComponent_1.CharacterMoveComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSelfCenterComponent_1.CharacterSelfCenterComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterCaughtNewComponent_1.CharacterCaughtNewComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterGaitComponent_1.CharacterGaitComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterMovementSyncComponent_1.CharacterMovementSyncComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterWeaponComponent_1.CharacterWeaponComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterFollowComponent_1.CharacterFollowComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterHitComponent_1.CharacterHitComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterTimeScaleComponent_1.CharacterTimeScaleComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSwimComponent_1.CharacterSwimComponent)) {
      return false;
    }
    if (!e.AddComponent(UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent)) {
      return false;
    }
    if (!e.AddComponent(UeMovementTickManageComponent_1.UeMovementTickManageComponent)) {
      return false;
    }
    if (!e.AddComponent(UeActorTickManageComponent_1.UeActorTickManageComponent)) {
      return false;
    }
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      if (!e.AddComponent(UeComponentTickManageComponent_1.UeComponentTickManageComponent)) {
        return false;
      }
      e.SetParam(UeComponentTickManageComponent_1.UeComponentTickManageComponent, UE.TsCharacterDebugComponent_C.StaticClass());
    }
    return !!e.AddComponent(CharacterAiComponent_1.CharacterAiComponent) && !!e.AddComponent(CharacterAudioComponent_1.CharacterAudioComponent) && !!e.AddComponent(CharacterVisionComponent_1.CharacterVisionComponent) && !!e.AddComponent(CharacterCombatMessageComponent_1.CharacterCombatMessageComponent) && !!e.AddComponent(RolePreloadComponent_1.RolePreloadComponent) && !!e.AddComponent(SubMeshComponent_1.SubMeshComponent) && (e.RegisterToGameBudgetController = true);
  }
  static GetSceneEntityComponentRecord(e) {
    return !!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent) && !!e.AddComponent(CharacterActorComponent_1.CharacterActorComponent) && !!e.AddComponent(CharacterAbilityComponent_1.CharacterAbilityComponent) && !!e.AddComponent(CharacterAttributeComponent_1.CharacterAttributeComponent) && !!e.AddComponent(CharacterBuffComponent_1.CharacterBuffComponent) && !!e.AddDebugComponent(CharacterGasDebugComponent_1.CharacterGasDebugComponent) && !!e.AddDebugComponent(CharacterStatisticsComponent_1.CharacterStatisticsComponent) && !!e.AddComponent(CharacterTriggerComponent_1.CharacterTriggerComponent) && !!e.AddComponent(CharacterDamageComponent_1.CharacterDamageComponent) && !!e.AddComponent(LevelTagComponent_1.LevelTagComponent) && !!e.AddComponent(CharacterRoleTransitionComponent_1.CharacterRoleTransitionComponent) && !!e.AddComponent(CharacterPassiveSkillComponent_1.CharacterPassiveSkillComponent) && !!e.AddComponent(CharacterFollowComponent_1.CharacterFollowComponent) && !!e.AddComponent(CharacterHitComponent_1.CharacterHitComponent) && !!e.AddComponent(CharacterTimeScaleComponent_1.CharacterTimeScaleComponent) && !!e.AddComponent(MonsterFlowComponent_1.MonsterFlowComponent) && !!e.AddComponent(CharacterCombatMessageComponent_1.CharacterCombatMessageComponent) && !!e.AddComponent(RolePreloadComponent_1.RolePreloadComponent);
  }
  static GetPlayerComponentRecord(e) {
    return !!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent) && !!e.AddComponent(PlayerLifeCycleComponent_1.PlayerLifeCycleComponent) && !!e.AddComponent(PlayerAttributeComponent_1.PlayerAttributeComponent) && !!e.AddComponent(PlayerTagComponent_1.PlayerTagComponent) && !!e.AddComponent(PlayerBuffComponent_1.PlayerBuffComponent) && !!e.AddComponent(PlayerFollowableComponent_1.PlayerFollowableComponent) && !!e.AddComponent(BaseSkillCdComponent_1.BaseSkillCdComponent) && !!e.AddComponent(PlayerGameplayCueComponent_1.PlayerGameplayCueComponent) && !!e.AddDebugComponent(CharacterGasDebugComponent_1.CharacterGasDebugComponent);
  }
  static GetVisionComponentRecord(e) {
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterActorComponent_1.CharacterActorComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterLogicStateSyncComponent_1.CharacterLogicStateSyncComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterBirthTagComponent_1.CharacterBirthTagComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterStateMachineNewComponent_1.CharacterStateMachineNewComponent)) {
      return false;
    }
    if (!e.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAbilityComponent_1.CharacterAbilityComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAttributeComponent_1.CharacterAttributeComponent)) {
      return false;
    }
    if (!e.AddComponent(VisionBuffComponent_1.VisionBuffComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterGameplayCueComponent_1.CharacterGameplayCueComponent)) {
      return false;
    }
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      if (!e.AddComponent(CharacterGasDebugComponent_1.CharacterGasDebugComponent)) {
        return false;
      }
      if (!e.AddComponent(ActorDebugMovementComponent_1.ActorDebugMovementComponent)) {
        return false;
      }
    }
    if (!e.AddComponent(CharacterUnifiedStateComponent_1.CharacterUnifiedStateComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterTriggerComponent_1.CharacterTriggerComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterMontageComponent_1.CharacterMontageComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterDamageComponent_1.CharacterDamageComponent)) {
      return false;
    }
    if (!e.AddComponent(MonsterFrozenComponent_1.MonsterFrozenComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterShieldComponent_1.CharacterShieldComponent)) {
      return false;
    }
    if (!e.AddComponent(BaseTagComponent_1.BaseTagComponent)) {
      return false;
    }
    if (!e.AddComponent(MonsterDeathComponent_1.MonsterDeathComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAnimationComponent_1.CharacterAnimationComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterMoveComponent_1.CharacterMoveComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSelfCenterComponent_1.CharacterSelfCenterComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAiComponent_1.CharacterAiComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterPatrolComponent_1.CharacterPatrolComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterMovementSyncComponent_1.CharacterMovementSyncComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterRoleTransitionComponent_1.CharacterRoleTransitionComponent)) {
      return false;
    }
    if (!e.AddComponent(VisionSkillComponent_1.VisionSkillComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSkillTriggerComponent_1.CharacterSkillTriggerComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterPassiveSkillComponent_1.CharacterPassiveSkillComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterLockOnComponent_1.CharacterLockOnComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterFollowComponent_1.CharacterFollowComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterHitComponent_1.CharacterHitComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterTimeScaleComponent_1.CharacterTimeScaleComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterWalkOnWaterComponent_1.CharacterWalkOnWaterComponent)) {
      return false;
    }
    if (!e.AddComponent(UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent)) {
      return false;
    }
    if (!e.AddComponent(UeMovementTickManageComponent_1.UeMovementTickManageComponent)) {
      return false;
    }
    if (!e.AddComponent(UeActorTickManageComponent_1.UeActorTickManageComponent)) {
      return false;
    }
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      if (!e.AddComponent(UeComponentTickManageComponent_1.UeComponentTickManageComponent)) {
        return false;
      }
      e.SetParam(UeComponentTickManageComponent_1.UeComponentTickManageComponent, UE.TsCharacterDebugComponent_C.StaticClass());
    }
    return !!e.AddComponent(CharacterPartComponent_1.CharacterPartComponent) && !!e.AddComponent(CharacterAudioComponent_1.CharacterAudioComponent) && !!e.AddComponent(CharacterCombatMessageComponent_1.CharacterCombatMessageComponent) && !!e.AddComponent(RolePreloadComponent_1.RolePreloadComponent) && (e.RegisterToGameBudgetController = true);
  }
  static GetAnimalComponentRecord(e) {
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterActorComponent_1.CharacterActorComponent)) {
      return false;
    }
    if (Info_1.Info.IsBuildDevelopmentOrDebug && !e.AddComponent(ActorDebugMovementComponent_1.ActorDebugMovementComponent)) {
      return false;
    }
    if (!e.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterMontageComponent_1.CharacterMontageComponent)) {
      return false;
    }
    if (!e.AddComponent(BaseTagComponent_1.BaseTagComponent)) {
      return false;
    }
    if (!e.AddComponent(BaseUnifiedStateComponent_1.BaseUnifiedStateComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAnimationComponent_1.CharacterAnimationComponent)) {
      return false;
    }
    if (!e.AddComponent(AnimalStateMachineComponent_1.AnimalStateMachineComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterMoveComponent_1.CharacterMoveComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterSelfCenterComponent_1.CharacterSelfCenterComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAudioComponent_1.CharacterAudioComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterAiComponent_1.CharacterAiComponent)) {
      return false;
    }
    if (!e.AddComponent(CharacterHitComponent_1.CharacterHitComponent)) {
      return false;
    }
    if (!e.AddComponent(AnimalDeathSyncComponent_1.AnimalDeathSyncComponent)) {
      return false;
    }
    if (!e.AddComponent(PawnPerceptionComponent_1.PawnPerceptionComponent)) {
      return false;
    }
    var n = e.PbEntityInitData;
    if (n) {
      if (!e.AddComponent(PawnInteractNewComponent_1.PawnInteractNewComponent)) {
        return false;
      }
      if (!e.AddComponent(InteractionSpotComponent_1.InteractionSpotComponent)) {
        return false;
      }
    }
    if (!e.AddComponent(PawnInfoManageComponent_1.PawnInfoManageComponent)) {
      return false;
    }
    if (!e.AddComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent)) {
      return false;
    }
    if (n) {
      n = (0, IComponent_1.getComponent)(n.ComponentsData, "AnimalComponent");
      if (n) {
        if (!e.AddComponent(AnimalPerformComponent_1.AnimalPerformComponent)) {
          return false;
        }
        e.SetParam(AnimalPerformComponent_1.AnimalPerformComponent, n);
      }
    }
    if (!e.AddComponent(CharacterPlanComponent_1.CharacterPlanComponent)) {
      return false;
    }
    if (!e.AddComponent(UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent)) {
      return false;
    }
    if (!e.AddComponent(UeMovementTickManageComponent_1.UeMovementTickManageComponent)) {
      return false;
    }
    if (!e.AddComponent(UeActorTickManageComponent_1.UeActorTickManageComponent)) {
      return false;
    }
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      if (!e.AddComponent(UeComponentTickManageComponent_1.UeComponentTickManageComponent)) {
        return false;
      }
      e.SetParam(UeComponentTickManageComponent_1.UeComponentTickManageComponent, UE.TsCharacterDebugComponent_C.StaticClass());
    }
    return !CreateEntityData_1.CreateEntityData.HasScanInfo(e) || !!e.AddComponent(ScanComponent_1.ScanComponent);
  }
  static GetCustomComponentRecord(e) {
    var n = e.PbEntityInitData?.ComponentsData;
    if (!n) {
      return false;
    }
    var o = e.GetPbModelConfig();
    var o = IEntity_1.componentsByEntityAki[o.EntityType];
    if (!o) {
      return false;
    }
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent)) {
      return false;
    }
    if (!e.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent)) {
      return false;
    }
    if (!e.AddComponent(LevelTagComponent_1.LevelTagComponent)) {
      return false;
    }
    for (const a of o) {
      switch (a) {
        case "RangeComponent":
          var t = (0, IComponent_1.getComponent)(n, "RangeComponent");
          if (!t) {
            return false;
          }
          if (!e.AddComponent(RangeComponent_1.RangeComponent)) {
            return false;
          }
          e.SetParam(RangeComponent_1.RangeComponent, t);
          break;
        case "TriggerComponent":
          t = (0, IComponent_1.getComponent)(n, "TriggerComponent");
          if (!t) {
            return false;
          }
          if (!e.AddComponent(TriggerComponent_1.TriggerComponent)) {
            return false;
          }
          if (t.ClientPrePerformance && !e.AddComponent(ClientTriggerComponent_1.ClientTriggerComponent)) {
            return false;
          }
          e.SetParam(TriggerComponent_1.TriggerComponent, t);
          break;
        case "LocationSafetyComponent":
          var r = (0, IComponent_1.getComponent)(n, "LocationSafetyComponent");
          if (!r) {
            return false;
          }
          if (!e.AddComponent(SafetyLocationComponent_1.SafetyLocationComponent)) {
            return false;
          }
          e.SetParam(SafetyLocationComponent_1.SafetyLocationComponent, r);
          break;
        case "ClientTriggerComponent":
          r = (0, IComponent_1.getComponent)(n, "ClientTriggerComponent");
          if (!r) {
            return false;
          }
          if (!e.AddComponent(ClientTriggerComponent_1.ClientTriggerComponent)) {
            return false;
          }
          e.SetParam(ClientTriggerComponent_1.ClientTriggerComponent, r);
          break;
        case "LevelQteComponent":
          var m = (0, IComponent_1.getComponent)(n, "LevelQteComponent");
          if (!m) {
            return false;
          }
          if (!e.AddComponent(LevelQteComponent_1.LevelQteComponent)) {
            return false;
          }
          e.SetParam(LevelQteComponent_1.LevelQteComponent, m);
          break;
        case "EntityCustomAudioComponent":
          m = (0, IComponent_1.getComponent)(n, "EntityCustomAudioComponent");
          if (!m) {
            return false;
          }
          if (!e.AddComponent(CustomAudioControlComponent_1.CustomAudioControlComponent)) {
            return false;
          }
          e.SetParam(CustomAudioControlComponent_1.CustomAudioControlComponent, m);
          break;
        case "MotorSlideComponent":
          var C = (0, IComponent_1.getComponent)(n, "MotorSlideComponent");
          if (!C) {
            return false;
          }
          if (!e.AddComponent(MotorcycleRailComponent_1.MotorcycleRailComponent)) {
            return false;
          }
          e.SetParam(MotorcycleRailComponent_1.MotorcycleRailComponent, C);
          break;
        case "PerformanceOptimizationComponent":
          C = (0, IComponent_1.getComponent)(n, "PerformanceOptimizationComponent");
          if (!C) {
            return false;
          }
          if (!e.AddComponent(OptimizationStrategyComponent_1.OptimizationStrategyComponent)) {
            return false;
          }
          e.SetParam(OptimizationStrategyComponent_1.OptimizationStrategyComponent, C);
      }
    }
    return e.RegisterToGameBudgetController = true;
  }
  static GetNpcComponentRecord(e) {
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent)) {
      return false;
    }
    var n = e.GetPbModelConfig();
    if (n) {
      n = n.EntityType;
      if (IEntity_1.componentsByEntityAki[n]) {
        n = e.PbEntityInitData;
        if (n) {
          if (n.ComponentsData) {
            var n = e.EntityData;
            var n = n.oys || 0;
            var o = this.For.get(n);
            if (!o) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "初始化NpcEntity类型" + n + "失败，没有对应的组件预设配置", ["CreatureDataId", e.CreatureDataId], ["PbDataId", e.PbDataId]);
              }
              return false;
            }
            for (const t of o) {
              if (!e.HasComponent(t) && !e.AddComponent(t)) {
                return false;
              }
            }
            if (GlobalData_1.GlobalData.IsPlayInEditor) {
              if (!e.AddComponent(UeComponentTickManageComponent_1.UeComponentTickManageComponent)) {
                return false;
              }
              e.SetParam(UeComponentTickManageComponent_1.UeComponentTickManageComponent, UE.TsCharacterDebugComponent_C.StaticClass());
            }
          }
        }
      }
    }
    return true;
  }
  static GetSceneItemComponentRecord(n) {
    var o = n.PbEntityInitData;
    n.EnableMovement = false;
    if (!n.AddComponent(CreatureDataComponent_1.CreatureDataComponent)) {
      return false;
    }
    if (!n.AddComponent(SceneItemActorComponent_1.SceneItemActorComponent)) {
      return false;
    }
    if (!n.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent)) {
      return false;
    }
    if (!n.AddComponent(PawnInfoManageComponent_1.PawnInfoManageComponent)) {
      return false;
    }
    if (!n.AddComponent(LevelTagComponent_1.LevelTagComponent)) {
      return false;
    }
    if (!n.AddComponent(SceneItemStateComponent_1.SceneItemStateComponent)) {
      return false;
    }
    if (!n.AddComponent(SceneItemPropertyComponent_1.SceneItemPropertyComponent)) {
      return false;
    }
    if (!n.AddComponent(PerformanceComponent_1.PerformanceComponent)) {
      return false;
    }
    if (!n.AddComponent(SceneItemTimeScaleComponent_1.SceneItemTimeScaleComponent)) {
      return false;
    }
    if (!n.AddComponent(PawnSelfCenterComponent_1.PawnSelfCenterComponent)) {
      return false;
    }
    if (GlobalData_1.GlobalData.IsPlayInEditor && !n.AddComponent(SceneItemDebugComponent_1.SceneItemDebugComponent)) {
      return false;
    }
    if (!this.UIc(n, this.DIc, this.d11)) {
      return false;
    }
    if (o?.ComponentsData) {
      if ((0, IComponent_1.getComponent)(o.ComponentsData, "InteractComponent")) {
        if (!n.AddComponent(PawnInteractNewComponent_1.PawnInteractNewComponent)) {
          return false;
        }
        if (!n.AddComponent(InteractionSpotComponent_1.InteractionSpotComponent)) {
          return false;
        }
        if (!n.AddComponent(PanoramicPointComponent_1.PanoramicPointComponent)) {
          return false;
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Interaction", 36, "SceneItemEntity.AddInteractComponents 旧版交互已经废除");
    }
    if (!n.AddComponent(PawnPerceptionComponent_1.PawnPerceptionComponent)) {
      return false;
    }
    if (!n.AddComponent(InteractItemComponent_1.InteractItemComponent)) {
      return false;
    }
    var t = CreateEntityData_1.CreateEntityData.GetBaseInfo(n);
    if (t?.IsShowNameOnHead && !n.HasComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent) && !n.AddComponent(PawnHeadInfoComponent_1.PawnHeadInfoComponent)) {
      return false;
    }
    t = t?.Category?.FishingMechanismType;
    if ((t === "FishingPoint" || t === "DynamicFishingPoint") && !n.AddComponent(SceneItemFishingPointComponent_1.SceneItemFishingPointComponent)) {
      return false;
    }
    if (CreateEntityData_1.CreateEntityData.HasScanInfo(n) && !n.AddComponent(ScanComponent_1.ScanComponent)) {
      return false;
    }
    if (o) {
      let e = false;
      t = (0, IComponent_1.getComponent)(o.ComponentsData, "WeaponComponent");
      if (t?.WeaponId && (e = true, !n.AddComponent(AiWeaponMovementComponent_1.AiWeaponMovementComponent))) {
        return false;
      }
      if (e) {
        if (!n.AddComponent(SceneItemAiInteractionComponent_1.SceneItemAiInteractionComponent)) {
          return false;
        }
        n.EnableMovement = true;
      }
    }
    if (o) {
      t = (0, IComponent_1.getComponent)(o.ComponentsData, "AiGearStrategyComponent");
      if (t?.StrategyType.Type === IComponent_1.EAiGearStrategy.RaceStrategy && !n.AddComponent(SceneItemAiRacingMoveComponent_1.SceneItemAiRacingMoveComponent)) {
        return false;
      }
    }
    return (!n.ComponentDataMap.get("Mys") || !!n.AddComponent(SceneItemDropItemComponent_1.SceneItemDropItemComponent)) && (!n.EnableMovement || !!n.AddComponent(SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent));
  }
  static GetVehicleComponentRecord(e) {
    var n = e.PbEntityInitData;
    if (!n) {
      return false;
    }
    n = (0, IComponent_1.getComponent)(n.ComponentsData, "BaseInfoComponent");
    if (!n) {
      return false;
    }
    if (!e.AddComponent(CreatureDataComponent_1.CreatureDataComponent)) {
      return false;
    }
    switch (n.Category.VehicleType) {
      case "Motorcycle":
        if (e.AddComponent(MotorcycleActorComponent_1.MotorcycleActorComponent) && e.AddComponent(MotorcycleRailMoveComponent_1.MotorcycleRailMoveComponent) && e.AddComponent(MotorcycleAnimationComponent_1.MotorcycleAnimationComponent) && e.AddComponent(MotorcycleOutlookComponent_1.MotorcycleOutlookComponent) && e.AddComponent(MotorAnimationSyncComponent_1.MotorAnimationSyncComponent) && e.AddComponent(MotorcycleExploreComponent_1.MotorcycleExploreComponent)) {
          break;
        }
        return false;
      default:
        if (e.AddComponent(VehicleActorComponent_1.VehicleActorComponent) && e.AddComponent(VehicleAnimationComponent_1.VehicleAnimationComponent) && e.AddComponent(CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent)) {
          break;
        }
        return false;
    }
    if (!e.AddComponent(VehicleAbilityComponent_1.VehicleAbilityComponent)) {
      return false;
    }
    switch (n.Category.VehicleType) {
      case "Gongduola":
      case "AutoMoveGongduola":
        if (e.AddComponent(GongduolaSplineMoveComponent_1.GongduolaSplineMoveComponent) && e.AddComponent(GongduolaInputComponent_1.GongduolaInputComponent) && e.AddComponent(GongduolaPerformComponent_1.GongduolaPerformComponent) && e.AddComponent(GongduolaAudioComponent_1.GongduolaAudioComponent) && e.AddComponent(VehicleMoveComponent_1.VehicleMoveComponent)) {
          break;
        }
        return false;
      case "FishingBoat":
        if (e.AddComponent(GongduolaSplineMoveComponent_1.GongduolaSplineMoveComponent) && e.AddComponent(FishingBoatPerformComponent_1.FishingBoatPerformComponent) && e.AddComponent(FishingBoatInputComponent_1.FishingBoatInputComponent) && e.AddComponent(GongduolaAudioComponent_1.GongduolaAudioComponent) && e.AddComponent(CharacterAttributeComponent_1.CharacterAttributeComponent) && e.AddComponent(CharacterSkillCdComponent_1.CharacterSkillCdComponent) && e.AddComponent(CharacterBuffComponent_1.CharacterBuffComponent) && e.AddComponent(CharacterGameplayCueComponent_1.CharacterGameplayCueComponent) && e.AddComponent(VehicleSkillComponent_1.VehicleSkillComponent) && e.AddComponent(CharacterTriggerComponent_1.CharacterTriggerComponent) && e.AddComponent(CharacterPassiveSkillComponent_1.CharacterPassiveSkillComponent) && e.AddComponent(CharacterSkillTriggerComponent_1.CharacterSkillTriggerComponent) && e.AddComponent(CharacterTimeScaleComponent_1.CharacterTimeScaleComponent) && e.AddComponent(VehicleHitComponent_1.VehicleHitComponent) && e.AddComponent(BaseDamageComponent_1.BaseDamageComponent) && e.AddComponent(VehicleMontageComponent_1.VehicleMontageComponent) && e.AddComponent(FishingBoatDeathComponent_1.FishingBoatDeathComponent) && e.AddComponent(RolePreloadComponent_1.RolePreloadComponent) && e.AddComponent(VehicleMoveComponent_1.VehicleMoveComponent)) {
          break;
        }
        return false;
      case "NpcVehicle":
        return false;
      case "Motorcycle":
        if (e.AddComponent(BaseDamageComponent_1.BaseDamageComponent) && e.AddComponent(MotorcylceConfigComponent_1.MotorcycleConfigComponent) && e.AddComponent(MotorcycleSplineMoveComponent_1.MotorcycleSplineMoveComponent) && e.AddComponent(MotorcycleInputComponent_1.MotorcycleInputComponent) && e.AddComponent(MotorcyclePerformComponent_1.MotorcyclePerformComponent) && e.AddComponent(MotorcycleAudioComponent_1.MotorcycleAudioComponent) && e.AddComponent(MotorcycleMoveComponent_1.MotorcycleMoveComponent) && e.AddComponent(MotorcycleWaterComponent_1.MotorcycleWaterComponent) && e.AddComponent(CharacterAttributeComponent_1.CharacterAttributeComponent) && e.AddComponent(VehicleLockOnComponent_1.VehicleLockOnComponent) && e.AddComponent(CharacterSkillCdComponent_1.CharacterSkillCdComponent) && e.AddComponent(CharacterTimeScaleComponent_1.CharacterTimeScaleComponent) && e.AddComponent(VehicleFrozenComponent_1.VehicleFrozenComponent) && e.AddComponent(VehicleBuffComponent_1.VehicleBuffComponent) && e.AddComponent(RolePreloadComponent_1.RolePreloadComponent) && e.AddComponent(VehicleSkillComponent_1.VehicleSkillComponent) && e.AddComponent(VehicleCatapultComponent_1.VehicleCatapultComponent) && e.AddComponent(CharacterGameplayCueComponent_1.CharacterGameplayCueComponent) && e.AddComponent(FollowerComponent_1.FollowerComponent) && e.AddComponent(FollowableComponent_1.FollowableComponent) && e.AddComponent(MotorcycleUiComponent_1.MotorcycleUiComponent) && e.AddComponent(MotorcycleStrengthComponent_1.MotorcycleStrengthComponent) && e.AddComponent(VehicleMontageComponent_1.VehicleMontageComponent) && e.AddComponent(BaseCrowdAiComponent_1.BaseCrowdAiComponent)) {
          break;
        }
        return false;
      default:
        if (!e.AddComponent(VehicleSplineMoveComponent_1.VehicleSplineMoveComponent)) {
          return false;
        }
        if (!e.AddComponent(VehicleInputComponent_1.VehicleInputComponent)) {
          return false;
        }
        if (!e.AddComponent(VehiclePerformComponent_1.VehiclePerformComponent)) {
          return false;
        }
        if (!e.AddComponent(VehicleAudioComponent_1.VehicleAudioComponent)) {
          return false;
        }
        if (!e.AddComponent(VehicleMoveComponent_1.VehicleMoveComponent)) {
          return false;
        }
    }
    if (!e.AddComponent(PawnSelfCenterComponent_1.PawnSelfCenterComponent)) {
      return false;
    }
    if (!e.AddComponent(VehicleMovementSyncComponent_1.VehicleMovementSyncComponent)) {
      return false;
    }
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      if (!e.AddComponent(ActorDebugMovementComponent_1.ActorDebugMovementComponent)) {
        return false;
      }
      if (!e.AddComponent(CharacterGasDebugComponent_1.CharacterGasDebugComponent)) {
        return false;
      }
    }
    return !!e.AddComponent(PawnInteractNewComponent_1.PawnInteractNewComponent) && !!e.AddComponent(InteractionSpotComponent_1.InteractionSpotComponent) && !!e.AddComponent(PawnPerceptionComponent_1.PawnPerceptionComponent) && !!e.AddComponent(PawnSensoryInfoComponent_1.PawnSensoryInfoComponent) && !!e.AddComponent(VehicleTagComponent_1.VehicleTagComponent) && !!e.AddComponent(UeActorTickManageComponent_1.UeActorTickManageComponent) && !!e.AddComponent(UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent) && !!e.AddComponent(UeVehicleMovementTickManageComponent_1.UeVehicleMovementTickManageComponent) && !(this.UIc(e, this.BIc), 0);
  }
  static UIc(n, e, o) {
    var t = n.PbEntityInitData;
    var r = t?.ComponentsData;
    if (t && r) {
      t = n.GetPbModelConfig();
      if (t) {
        var m = t.EntityType;
        var t = IEntity_1.componentsByEntityAki[m];
        if (t) {
          for (const l of t) {
            var C = r[l];
            if (!C) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 31, "初始化Entity找不到对应的prefab配置", ["entityType", m], ["creatureDataId", n.CreatureDataId], ["pbDataId", n.PbDataId], ["componentType", l]);
              }
              return false;
            }
            if (!C.Disabled) {
              var a = e.get(l);
              if (a) {
                var i = o?.get(l);
                if (i && i.length !== a.length) {
                  if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("Entity", 79, "组件和条件配置数量不一致", ["ctorArrayLength", a.length], ["conditionFuncArrayLength", i.length], ["componentType", l]);
                  }
                  return false;
                }
                for (let e = 0; e < a.length; e++) {
                  var p = a[e];
                  if (!n.HasComponent(p)) {
                    if (i !== undefined) {
                      var c = i[e];
                      if (c !== undefined && !c(n)) {
                        continue;
                      }
                    }
                    if (!n.AddComponent(p)) {
                      return false;
                    }
                    n.SetParam(p, C);
                  }
                }
              }
            }
          }
        }
      }
    }
    return true;
  }
  static Kor(e) {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      e.SetParam(UeComponentTickManageComponent_1.UeComponentTickManageComponent, UE.TsCharacterDebugComponent_C.StaticClass());
    }
  }
  static Nor() {
    this.ComponentPriority.set(BaseActorComponent_1.BaseActorComponent, CharacterComponentPriorityDefine_1.ACTOR_TICK_PRIORITY);
    this.ComponentPriority.set(BaseMoveComponent_1.BaseMoveComponent, CharacterComponentPriorityDefine_1.MOVE_TICK_PRIORITY);
    this.ComponentPriority.set(BaseSplineMoveComponent_1.BaseSplineMoveComponent, CharacterComponentPriorityDefine_1.SPLINE_MOVE_TICK_PRIORITY);
    this.ComponentPriority.set(CharacterMovementSyncComponent_1.CharacterMovementSyncComponent, CharacterComponentPriorityDefine_1.MOVEMENT_SYNC_TICK_PRIORITY);
    this.ComponentPriority.set(CharacterInputComponent_1.CharacterInputComponent, CharacterComponentPriorityDefine_1.INPUT_TICK_PRIORITY);
    this.ComponentPriority.set(CharacterClimbComponent_1.CharacterClimbComponent, CharacterComponentPriorityDefine_1.CLIMB_TICK_PRIORITY);
    this.ComponentPriority.set(CharacterSlideComponent_1.CharacterSlideComponent, CharacterComponentPriorityDefine_1.SLIDE_TICK_PRIORITY);
    this.ComponentPriority.set(RoleGaitComponent_1.RoleGaitComponent, CharacterComponentPriorityDefine_1.GAIT_TICK_PRIORITY);
    this.ComponentPriority.set(VehicleInputComponent_1.VehicleInputComponent, CharacterComponentPriorityDefine_1.INPUT_TICK_PRIORITY);
    this.ComponentPriority.set(VehicleMoveComponent_1.VehicleMoveComponent, CharacterComponentPriorityDefine_1.MOVE_TICK_PRIORITY);
    this.ComponentPriority.set(UeActorTickManageComponent_1.UeActorTickManageComponent, CharacterComponentPriorityDefine_1.UE_ACTOR_TICK_PRIOTITY);
    this.ComponentPriority.set(UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent, CharacterComponentPriorityDefine_1.UE_SKELETAL_TICK_PRIORITY);
    this.ComponentPriority.set(UeComponentTickManageComponent_1.UeComponentTickManageComponent, CharacterComponentPriorityDefine_1.UE_OTHER_COMPONENT_TICK_PRIORITY);
    this.ComponentPriority.set(UeMovementTickManageComponent_1.UeMovementTickManageComponent, CharacterComponentPriorityDefine_1.UE_MOVE_TICK_PRIORITY);
    this.ComponentPriority.set(UeVehicleMovementTickManageComponent_1.UeVehicleMovementTickManageComponent, CharacterComponentPriorityDefine_1.UE_MOVE_TICK_PRIORITY);
  }
  static Oor() {
    this.For.set(3, [CharacterActorComponent_1.CharacterActorComponent, PawnSensoryInfoComponent_1.PawnSensoryInfoComponent, BaseUnifiedStateComponent_1.BaseUnifiedStateComponent, NpcMoveComponent_1.NpcMoveComponent, CharacterPatrolComponent_1.CharacterPatrolComponent, CharacterAnimationComponent_1.CharacterAnimationComponent, CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent, VehicleTagComponent_1.VehicleTagComponent, PawnSensoryComponent_1.PawnSensoryComponent, VehicleInputComponent_1.VehicleInputComponent, CommonNpcPerformComponent_1.CommonNpcPerformComponent, NpcVehiclePerformComponent_1.NpcVehiclePerformComponent, PawnInteractNewComponent_1.PawnInteractNewComponent, InteractionSpotComponent_1.InteractionSpotComponent, PawnPerceptionComponent_1.PawnPerceptionComponent, PawnInfoManageComponent_1.PawnInfoManageComponent, PawnHeadInfoComponent_1.PawnHeadInfoComponent, CharacterAiComponent_1.CharacterAiComponent, CharacterPlanComponent_1.CharacterPlanComponent, NpcFlowComponent_1.NpcFlowComponent, UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent, UeMovementTickManageComponent_1.UeMovementTickManageComponent, UeActorTickManageComponent_1.UeActorTickManageComponent, CharacterAudioComponent_1.CharacterAudioComponent, ScanComponent_1.ScanComponent]);
    this.For.set(0, [CharacterActorComponent_1.CharacterActorComponent, PawnSensoryInfoComponent_1.PawnSensoryInfoComponent, BaseUnifiedStateComponent_1.BaseUnifiedStateComponent, NpcMoveComponent_1.NpcMoveComponent, CharacterPatrolComponent_1.CharacterPatrolComponent, CharacterAnimationComponent_1.CharacterAnimationComponent, CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent, LevelTagComponent_1.LevelTagComponent, PawnSensoryComponent_1.PawnSensoryComponent, CommonNpcPerformComponent_1.CommonNpcPerformComponent, PawnInteractNewComponent_1.PawnInteractNewComponent, InteractionSpotComponent_1.InteractionSpotComponent, PawnPerceptionComponent_1.PawnPerceptionComponent, PawnInfoManageComponent_1.PawnInfoManageComponent, PawnHeadInfoComponent_1.PawnHeadInfoComponent, CharacterAiComponent_1.CharacterAiComponent, CharacterPlanComponent_1.CharacterPlanComponent, NpcFlowComponent_1.NpcFlowComponent, UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent, UeMovementTickManageComponent_1.UeMovementTickManageComponent, UeActorTickManageComponent_1.UeActorTickManageComponent, CharacterAudioComponent_1.CharacterAudioComponent, ScanComponent_1.ScanComponent, NpcDriveVehicleComponent_1.NpcDriveVehicleComponent, CharacterHoldingHandsComponent_1.CharacterHoldingHandsComponent, NpcSitOnChairComponent_1.NpcSitOnChairComponent, CharacterGameplayCueComponent_1.CharacterGameplayCueComponent, CharacterInteractivePerformComponent_1.CharacterInteractivePerformComponent, CharacterSwingComponent_1.CharacterSwingComponent, CharacterLinkedAnimInstComponent_1.CharacterLinkedAnimInstComponent, BaseCrowdAiComponent_1.BaseCrowdAiComponent]);
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      this.For.get(0)?.push(ActorDebugMovementComponent_1.ActorDebugMovementComponent);
    }
    this.For.set(1, [SimpleNpcActorComponent_1.SimpleNpcActorComponent, SimpleNpcAnimationComponent_1.SimpleNpcAnimationComponent, PawnSensoryInfoComponent_1.PawnSensoryInfoComponent, CommonNpcPerformComponent_1.CommonNpcPerformComponent, PawnPerceptionComponent_1.PawnPerceptionComponent, PawnInfoManageComponent_1.PawnInfoManageComponent, PawnHeadInfoComponent_1.PawnHeadInfoComponent, NpcFlowComponent_1.NpcFlowComponent, UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent, UeActorTickManageComponent_1.UeActorTickManageComponent, ScanComponent_1.ScanComponent, BaseCrowdAiComponent_1.BaseCrowdAiComponent]);
    this.For.set(2, [CharacterActorComponent_1.CharacterActorComponent, BaseUnifiedStateComponent_1.BaseUnifiedStateComponent, NpcMoveComponent_1.NpcMoveComponent, NpcPerformComponent_1.NpcPerformComponent, CharacterAnimationComponent_1.CharacterAnimationComponent, NpcPasserbyComponent_1.NpcPasserbyComponent, UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent, UeMovementTickManageComponent_1.UeMovementTickManageComponent, UeActorTickManageComponent_1.UeActorTickManageComponent, BaseCrowdAiComponent_1.BaseCrowdAiComponent]);
    this.For.set(4, [CharacterActorComponent_1.CharacterActorComponent, CharacterAnimationComponent_1.CharacterAnimationComponent, UeSkeletalTickManageComponent_1.UeSkeletalTickManageComponent, UeActorTickManageComponent_1.UeActorTickManageComponent, DangoPerformComponent_1.DangoPerformComponent]);
  }
  static xIc() {
    this.BIc.set("NearbyTrackingComponent", [SceneItemNearbyTrackingComponent_1.SceneItemNearbyTrackingComponent]);
  }
  static u11() {
    this.d11.set("TriggerComponent", [undefined, e => {
      var n = e.PbEntityInitData?.ComponentsData;
      return !!n && !!(n = (0, IComponent_1.getComponent)(n, "TriggerComponent")) && (!!n.ClientPrePerformance || !(Log_1.Log.CheckInfo() && Log_1.Log.Info("Entity", 79, "TriggerComponent配置ClientPrePerformance为false时不添加ClientTriggerComponent", ["creatureDataId", e.CreatureDataId], ["pbDataId", e.PbDataId]), 1));
    }]);
  }
  static kor() {
    this.DIc.set("TreasureBoxComponent", [GamePlayTreasureBoxComponent_1.SceneItemTreasureBoxComponent]);
    this.DIc.set("TeleControl2", [SceneItemHitComponent_1.SceneItemHitComponent, SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent, SceneItemManipulatableComponent_1.SceneItemManipulatableComponent, SceneItemDynamicAttachTargetComponent_1.SceneItemDynamicAttachTargetComponent]);
    this.DIc.set("ItemFoundation2", [SceneItemOutletComponent_1.SceneItemOutletComponent]);
    this.DIc.set("DestructibleItem", [SceneItemHitComponent_1.SceneItemHitComponent, DurablityComponent_1.DurabilityComponent, SceneItemDamageComponent_1.SceneItemDamageComponent]);
    this.DIc.set("AdsorbComponent", [PawnAdsorbComponent_1.PawnAdsorbComponent]);
    this.DIc.set("RangeComponent", [RangeComponent_1.RangeComponent]);
    this.DIc.set("TriggerComponent", [TriggerComponent_1.TriggerComponent, ClientTriggerComponent_1.ClientTriggerComponent]);
    this.DIc.set("TrampleComponent", [SceneItemGravityComponent_1.SceneItemGravityComponent]);
    this.DIc.set("TargetGearComponent", [SceneItemMoveComponent_1.SceneItemMoveComponent, UeSceneItemMoveTickManagerComponent_1.UeSceneItemMoveTickManagerComponent, SceneItemHitComponent_1.SceneItemHitComponent, GamePlayHitGearComponent_1.GamePlayHitGearComponent, SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent]);
    this.DIc.set("LiftComponent", [GamePlayElevatorComponent_1.GamePlayElevatorComponent]);
    this.DIc.set("ConveyorBeltComponent", [SceneItemConveyorBeltComponent_1.SceneItemConveyorBeltComponent]);
    this.DIc.set("FollowTrackComponent", [SceneItemMoveComponent_1.SceneItemMoveComponent, UeSceneItemMoveTickManagerComponent_1.UeSceneItemMoveTickManagerComponent, SceneItemTrackGuideComponent_1.SceneItemTrackGuideComponent, SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent]);
    this.DIc.set("NearbyTrackingComponent", [SceneItemNearbyTrackingComponent_1.SceneItemNearbyTrackingComponent]);
    this.DIc.set("SkyboxComponent", [PostProcessBridgeComponent_1.PostProcessBridgeComponent]);
    this.DIc.set("DungeonEntryComponent", [DungeonEntranceComponent_1.DungeonEntranceComponent]);
    this.DIc.set("BuffProducerComponent", [SceneItemBuffProducerComponent_1.SceneItemBuffProducerComponent]);
    this.DIc.set("BuffConsumerComponent", [SceneItemHitComponent_1.SceneItemHitComponent, SceneItemBuffConsumerComponent_1.SceneItemBuffConsumerComponent]);
    this.DIc.set("ResetEntitiesPosComponent", [SceneItemResetPositionComponent_1.SceneItemResetPositionComponent]);
    this.DIc.set("RotatorComponent2", [SceneItemRotatorComponent_1.SceneItemRotatorComponent, UeSceneItemMoveTickManagerComponent_1.UeSceneItemMoveTickManagerComponent]);
    this.DIc.set("VisionItemComponent", [SceneItemCaptureComponent_1.SceneItemCaptureComponent]);
    this.DIc.set("GuideLineCreatorComponent", [SceneItemGuidePathComponent_1.SceneItemGuidePathComponent]);
    this.DIc.set("SceneItemMovementComponent", [SceneItemMoveComponent_1.SceneItemMoveComponent, UeSceneItemMoveTickManagerComponent_1.UeSceneItemMoveTickManagerComponent, SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent]);
    this.DIc.set("AdviseItemComponent", [SceneItemAdviceComponent_1.SceneItemAdviceComponent]);
    this.DIc.set("EntityStateAudioComponent", [SceneItemStateAudioComponent_1.SceneItemStateAudioComponent]);
    this.DIc.set("InteractAudioComponent", [SceneItemInteractAudioComponent_1.SceneItemInteractAudioComponent]);
    this.DIc.set("EntityCustomAudioComponent", [CustomAudioControlComponent_1.CustomAudioControlComponent]);
    this.DIc.set("TimelineTrackControlComponent", [SceneItemTimeTrackControlComponent_1.SceneItemTimeTrackControlComponent]);
    this.DIc.set("SceneActorRefComponent", [SceneItemReferenceComponent_1.SceneItemReferenceComponent]);
    this.DIc.set("LevelSequenceFrameEventComponent", [LevelSequenceFrameEventComponent_1.LevelSequenceFrameEventComponent]);
    this.DIc.set("AttachTargetComponent", [SceneItemDynamicAttachTargetComponent_1.SceneItemDynamicAttachTargetComponent, SceneItemAttachTargetComponent_1.SceneItemAttachTargetComponent]);
    this.DIc.set("ReboundComponent", [SceneItemReboundComponent_1.SceneItemReboundComponent]);
    this.DIc.set("TurntableControlComponent", [SceneItemTurntableControllerComponent_1.SceneItemTurntableControllerComponent]);
    this.DIc.set("JigsawFoundation", [SceneItemJigsawBaseComponent_1.SceneItemJigsawBaseComponent, SceneItemMultiInteractionActorComponent_1.SceneItemMultiInteractionActorComponent]);
    this.DIc.set("JigsawItem", [SceneItemJigsawItemComponent_1.SceneItemJigsawItemComponent, SceneItemMultiInteractionActorComponent_1.SceneItemMultiInteractionActorComponent]);
    this.DIc.set("SceneBulletComponent", [SceneBulletComponent_1.SceneBulletComponent]);
    this.DIc.set("LevitateMagnetComponent", [SceneItemHitComponent_1.SceneItemHitComponent, SceneItemMoveComponent_1.SceneItemMoveComponent, UeSceneItemMoveTickManagerComponent_1.UeSceneItemMoveTickManagerComponent, SceneItemLevitateMagnetComponent_1.SceneItemLevitateMagnetComponent, SceneItemMovementSyncComponent_1.SceneItemMovementSyncComponent]);
    this.DIc.set("AiAlertNotifyComponent", [SmartObjectComponent_1.SmartObjectComponent]);
    this.DIc.set("MonsterGachaItemComponent", [SceneItemMonsterGachaItemComponent_1.SceneItemMonsterGachaItemComponent]);
    this.DIc.set("ProgressBarControlComponent", [SceneItemProgressControlComponent_1.SceneItemProgressControlComponent]);
    this.DIc.set("ExploreSkillInteractComponent", [SceneItemExploreInteractComponent_1.SceneItemExploreInteractComponent]);
    this.DIc.set("HookLockPoint", [GrapplingHookPointComponent_1.GrapplingHookPointComponent, SceneItemDynamicAttachTargetComponent_1.SceneItemDynamicAttachTargetComponent]);
    this.DIc.set("FanComponent", [SceneItemFanComponent_1.SceneItemFanComponent, SceneItemHitComponent_1.SceneItemHitComponent, PawnInteractNewComponent_1.PawnInteractNewComponent, InteractionSpotComponent_1.InteractionSpotComponent, RangeComponent_1.RangeComponent]);
    this.DIc.set("PickInteractComponent", [SceneItemPickInteractComponent_1.SceneItemPickInteractComponent]);
    this.DIc.set("AiGearStrategyComponent", [AiGearStrategyComponent_1.AiGearStrategyComponent]);
    this.DIc.set("ChessmanComponent", [SceneItemChessmanComponent_1.SceneItemChessmanComponent]);
    this.DIc.set("ResetSelfPosComponent", [SceneItemResetSelfPositionComponent_1.SceneItemResetSelfPositionComponent]);
    this.DIc.set("TimeStopComponent", [SceneItemTimeStopMachineComponent_1.SceneItemTimeStopMachineComponent]);
    this.DIc.set("BeamCastComponent", [SceneItemBeamCastComponent_1.SceneItemBeamCastComponent, RangeComponent_1.RangeComponent]);
    this.DIc.set("BeamReceiveComponent", [SceneItemBeamReceiveComponent_1.SceneItemBeamReceiveComponent]);
    this.DIc.set("PortalComponent", [SceneItemPortalComponent_1.SceneItemPortalComponent]);
    this.DIc.set("NoRenderPortalComponent", [SceneItemNoRenderPortalComponent_1.SceneItemNoRenderPortalComponent]);
    this.DIc.set("BubbleComponent", [CharacterFlowComponent_1.CharacterFlowComponent, PawnHeadInfoComponent_1.PawnHeadInfoComponent]);
    this.DIc.set("PasserbyNpcSpawnComponent", [PasserbyGeneratorComponent_1.PasserbyGeneratorComponent]);
    this.DIc.set("EffectAreaComponent", [EffectAreaComponent_1.EffectAreaComponent]);
    this.DIc.set("PhysicsConstraintComponent", [SceneItemHitComponent_1.SceneItemHitComponent, SceneItemPhysicalAttachComponent_1.SceneItemPhysicalAttachComponent]);
    this.DIc.set("ConnectorComponent", [CommonConnectComponent_1.CommonConnectComponent]);
    this.DIc.set("HitComponent", [SceneItemHitComponent_1.SceneItemHitComponent]);
    this.DIc.set("ClientTriggerComponent", [ClientTriggerComponent_1.ClientTriggerComponent]);
    this.DIc.set("DynamicPortalCreatorComponent", [DynamicPortalCreatorComponent_1.DynamicPortalCreatorComponent]);
    this.DIc.set("LocationSafetyComponent", [SafetyLocationComponent_1.SafetyLocationComponent]);
    this.DIc.set("CollectComponent", [CollectComponent_1.CollectComponent]);
    this.DIc.set("RenderSpecifiedRangeComponent", [RenderMaskComponent_1.RenderMaskComponent]);
    this.DIc.set("MonitorComponent", [SceneItemCameraAlertComponent_1.SceneItemCameraAlertComponent, RangeComponent_1.RangeComponent]);
    this.DIc.set("GroupAiComponent", [SceneItemGroupAiComponent_1.SceneItemGroupAiComponent]);
    this.DIc.set("BatchBulletCasterComponent", [BatchBulletCasterComponent_1.BatchBulletCasterComponent]);
    this.DIc.set("ClientConditionListenerComponent", [ClientConditionListenerComponent_1.ClientConditionListenerComponent]);
    this.DIc.set("AirPassageComponent", [SceneItemWindPipelineComponent_1.SceneItemWindPipelineComponent]);
    this.DIc.set("InhalationAbilityComponent", [SceneItemInhalationComponent_1.SceneItemInhalationComponent]);
    this.DIc.set("InhaledItemComponent", [SceneItemInhaledItemComponent_1.SceneItemInhaledItemComponent]);
    this.DIc.set("PullingObjectFoundation", [SceneItemGenericOutletComponent_1.SceneItemGenericOutletComponent]);
    this.DIc.set("LevelPrefabPerformComponent", [SubActorPerformanceComponent_1.SubActorPerformanceComponent]);
    this.DIc.set("SceneItemAiComponent", [SmartObjectComponent_1.SmartObjectComponent]);
    this.DIc.set("LevelQteComponent", [LevelQteComponent_1.LevelQteComponent]);
    this.DIc.set("WalkingPatternComponent", [GamePlayWalkingPatternComponent_1.GamePlayWalkingPatternComponent]);
    this.DIc.set("VehicleComponent", [VehicleSceneItemPerformComponent_1.VehicleSceneItemPerformComponent, SceneItemVehicleComponent_1.SceneItemVehicleComponent]);
    this.DIc.set("GravityFlipComponent", [SceneItemGravityFlipComponent_1.SceneItemGravityFlipComponent]);
    this.DIc.set("WindSourceComponent", [WindDirectionalSourceComponent_1.WindDirectionalSourceComponent]);
    this.DIc.set("GodKingFrequencyControllerComponent", [GodKingFrequencyControllerComponent_1.GodKingFrequencyControllerComponent]);
    this.DIc.set("TemplateEntitySpawnerComponent", [TemplateEntitySpawnerComponent_1.TemplateEntitySpawnerComponent]);
    this.DIc.set("CurveControlComponent", [SceneItemCurveControlComponent_1.SceneItemCurveControlComponent]);
    this.DIc.set("SceneItemEventListenerComponent", [SceneItemEventListenerComponent_1.SceneItemEventListenerComponent]);
    this.DIc.set("RollBlockComponent", [RbBlockComponent_1.RbBlockComponent]);
    this.DIc.set("RollBlockFloorComponent", [RbFloorComponent_1.RbFloorComponent]);
    this.DIc.set("RollBlockItemComponent", [RbItemComponent_1.RbItemComponent]);
    this.DIc.set("SunSpiritGearComponent", [SceneItemSunSpiritGearComponent_1.SceneItemSunSpiritGearComponent]);
    this.DIc.set("SunSpiritLauncherComponent", [SceneItemSunSpiritLauncherComponent_1.SceneItemSunSpiritLauncherComponent]);
    this.DIc.set("ExtraRangeComponent", [BaseCrowdAiComponent_1.BaseCrowdAiComponent]);
    this.DIc.set("MotorSlideComponent", [MotorcycleRailComponent_1.MotorcycleRailComponent]);
    this.DIc.set("RoadNetworkNavigationComponent", [RoadNetworkNavigationComponent_1.RoadNetworkNavigationComponent]);
    this.DIc.set("VisionDisplayComponent", [SmartObjectComponent_1.SmartObjectComponent]);
    this.DIc.set("ProceduralVisualComponent", [ProceduralVisualComponent_1.ProceduralVisualComponent]);
  }
  static yna() {
    this.Ina.set("CharacterConnectorComponent", [PawnSensoryComponent_1.PawnSensoryComponent, CommonConnectComponent_1.CommonConnectComponent]);
    this.Ina.set("HackManagementComponent", [HackManagementComponent_1.HackManagementComponent]);
  }
}
(exports.WorldEntityHelper = WorldEntityHelper).Hor = 0n;
WorldEntityHelper.Wor = 0n;
WorldEntityHelper.jor = 0n;
WorldEntityHelper.w4l = 0n;
WorldEntityHelper.Cn1 = 0n;
WorldEntityHelper.For = new Map();
WorldEntityHelper.ComponentPriority = new Map();
WorldEntityHelper.BIc = new Map();
WorldEntityHelper.DIc = new Map();
WorldEntityHelper.d11 = new Map();
WorldEntityHelper.Ina = new Map();
Global_1.Global.WorldEntityHelper = WorldEntityHelper; //# sourceMappingURL=WorldEntityHelper.js.map