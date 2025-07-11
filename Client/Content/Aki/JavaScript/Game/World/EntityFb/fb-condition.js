"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckPlayerGender = exports.CheckPlayerCanJoinRogue = exports.CheckPlayerCanJoinActivityCondition = exports.CheckOnlinePlayer = exports.CheckNodeStatus = exports.CheckMoonBuildingState = exports.CheckLordGymFinishCondition = exports.CheckLevelPlayState = exports.CheckLevelPlayCompleteNumber = exports.CheckJigsawItemPlaceIndex = exports.CheckJigsawItemMove = exports.CheckJigsawInfoCondition = exports.CheckItems = exports.CheckIsUsingVehicle = exports.CheckIsPlayerUsingVehicle = exports.CheckIsGramophonePlayingMusic = exports.CheckInRangeCondition = exports.CheckInCombat = exports.CheckHookLockPointCondition = exports.CheckGuestCharacter = exports.CheckGameplayTagCondition = exports.CheckFormationRoleInfoCondition = exports.CheckFishingPointHasFish = exports.CheckFishingCageFillingRatio = exports.CheckFinishLoading = exports.CheckEntityReward = exports.CheckEntityPosition = exports.CheckEntityLockedCondition = exports.CheckEntityIsVisibility = exports.CheckEntityHasSceneItemAttributeTag = exports.CheckEntityGravityDirection = exports.CheckEntityDistanceCondition = exports.CheckEntitiesExist = exports.CheckDungeonHasSaveConfig = exports.CheckDungeonFinish = exports.CheckDirectionCondition = exports.CheckDataLayerCondition = exports.CheckDangoCultivationProgress = exports.CheckCurrentRole = exports.CheckCollectionShopState = exports.CheckCollectAnimalParts = exports.CheckClientEvent = exports.CheckChildQuestStatus = exports.CheckChildQuestFinished = exports.CheckChessWinner = exports.CheckCertainFishingItemCount = exports.CheckCalabashDevelopRewardCondition = exports.CheckAlertAreaEnabled = exports.CheckAiState = exports.AllPlayerType = undefined;
exports.FeatureCollectionLevel = exports.EntityStateCondition = exports.EntityGroupCondition = exports.EntityEventCondition = exports.ESkillReady = exports.CustomJsonCondition = exports.CountDangoOverTargetLevel = exports.ConditionGroup = exports.CompleteCertainFishingEntrust = exports.CompareWeather = exports.CompareVarCondition = exports.CompareVar = exports.CompareTimePeriod = exports.CompareTeammateDieCondition = exports.ComparePlayerNumInDungeon = exports.ComparePlayerMotionState2 = exports.ComparePlayerMotionState = exports.CompareNpcPerformStateCondition = exports.CompareMinAlertValue = exports.CompareMaxAlertValue = exports.CompareLiftCondition = exports.CompareLevelPlayRewardStateCondition = exports.CompareFishingTechLevel = exports.CompareFishingPrestigeLevelCondition = exports.CompareFishingBoatState = exports.CompareExploreLevelCondition = exports.CompareEntityStateCondition = exports.CompareEntitySelfStateCondition = exports.CompareEntityGroupStateCondition = exports.CompareDungeonId = exports.CompareCustomAlertValue = exports.CompareCalabashLevelCondition = exports.CompareAlertValue = exports.Clock = exports.ChildQuestCondition = exports.CheckVehicleCondition = exports.CheckTreasureBeenClaimedCondition = exports.CheckTrackMoonPopularity = exports.CheckTeleControlState = exports.CheckTargetEntity = exports.CheckTargetAttributeCondition = exports.CheckSystemStateCondition = exports.CheckSystemFunction = exports.CheckSystemEventBvb = exports.CheckSubLevelStateConfig = exports.CheckSubLevelState = exports.CheckRogueAbilitySelectCondition = exports.CheckPlayerStateRestrictionCondition = exports.CheckPlayerSkillReadyCondition = exports.CheckPlayerPosition = undefined;
exports.Weather = exports.WeaponLevel = exports.VisionSkillReady = exports.UnionWeaponLevel = exports.UnionVisibleCondition = exports.UnionVehicleCondition = exports.UnionTargetEntity = exports.UnionTargetAttribute = exports.UnionSkillReadyOption = exports.UnionRoleLevel = exports.UnionPlayerAttribute = exports.UnionOnlinePlayerConditionTarget = exports.UnionCondition2 = exports.UnionComparedAlertValue = exports.UnionCheckTargetTypeConfig = exports.UnionCheckTarget = exports.UnionCheckSystemState = exports.UnionCheckPlayerCanJoinActivity = exports.UnionCheckJigsawInfo = exports.UnionCheckFormationRoleInfo = exports.UnionCheckDangoCultivationProgressConfig = exports.UltimateSkillReady = exports.TriggeredEntity = exports.TimePeriod = exports.TargetEntity = exports.SpecifyRoleWeaponLevel = exports.SpecifyRoleLevel = exports.SelfEntity = exports.RoleLevel = exports.RangeSphere = exports.QuestStateEqualCondition = exports.PreQuest = exports.PreChildQuest = exports.PlayerEntity = exports.PlayerAttribute = exports.PieceIndex = exports.OnlinePlayerConditionTargetParticipator = exports.OnlinePlayerConditionTargetHost = exports.ListenEntityThroughPortal = exports.ListenEntitySelfEventCondition = exports.ItemConfig = exports.HourToHourCondition = exports.Hour = exports.HealthAttribute = exports.HasUpgradableVision = exports.HasEquippedVision = exports.HasBuff = exports.GramophoneCheckCondition = undefined;
var all_player_type_js_1 = require("./fb-condition/all-player-type.js");
Object.defineProperty(exports, "AllPlayerType", {
  enumerable: true,
  get: function () {
    return all_player_type_js_1.AllPlayerType;
  }
});
var check_ai_state_js_1 = require("./fb-condition/check-ai-state.js");
Object.defineProperty(exports, "CheckAiState", {
  enumerable: true,
  get: function () {
    return check_ai_state_js_1.CheckAiState;
  }
});
var check_alert_area_enabled_js_1 = require("./fb-condition/check-alert-area-enabled.js");
Object.defineProperty(exports, "CheckAlertAreaEnabled", {
  enumerable: true,
  get: function () {
    return check_alert_area_enabled_js_1.CheckAlertAreaEnabled;
  }
});
var check_calabash_develop_reward_condition_js_1 = require("./fb-condition/check-calabash-develop-reward-condition.js");
Object.defineProperty(exports, "CheckCalabashDevelopRewardCondition", {
  enumerable: true,
  get: function () {
    return check_calabash_develop_reward_condition_js_1.CheckCalabashDevelopRewardCondition;
  }
});
var check_certain_fishing_item_count_js_1 = require("./fb-condition/check-certain-fishing-item-count.js");
Object.defineProperty(exports, "CheckCertainFishingItemCount", {
  enumerable: true,
  get: function () {
    return check_certain_fishing_item_count_js_1.CheckCertainFishingItemCount;
  }
});
var check_chess_winner_js_1 = require("./fb-condition/check-chess-winner.js");
Object.defineProperty(exports, "CheckChessWinner", {
  enumerable: true,
  get: function () {
    return check_chess_winner_js_1.CheckChessWinner;
  }
});
var check_child_quest_finished_js_1 = require("./fb-condition/check-child-quest-finished.js");
Object.defineProperty(exports, "CheckChildQuestFinished", {
  enumerable: true,
  get: function () {
    return check_child_quest_finished_js_1.CheckChildQuestFinished;
  }
});
var check_child_quest_status_js_1 = require("./fb-condition/check-child-quest-status.js");
Object.defineProperty(exports, "CheckChildQuestStatus", {
  enumerable: true,
  get: function () {
    return check_child_quest_status_js_1.CheckChildQuestStatus;
  }
});
var check_client_event_js_1 = require("./fb-condition/check-client-event.js");
Object.defineProperty(exports, "CheckClientEvent", {
  enumerable: true,
  get: function () {
    return check_client_event_js_1.CheckClientEvent;
  }
});
var check_collect_animal_parts_js_1 = require("./fb-condition/check-collect-animal-parts.js");
Object.defineProperty(exports, "CheckCollectAnimalParts", {
  enumerable: true,
  get: function () {
    return check_collect_animal_parts_js_1.CheckCollectAnimalParts;
  }
});
var check_collection_shop_state_js_1 = require("./fb-condition/check-collection-shop-state.js");
Object.defineProperty(exports, "CheckCollectionShopState", {
  enumerable: true,
  get: function () {
    return check_collection_shop_state_js_1.CheckCollectionShopState;
  }
});
var check_current_role_js_1 = require("./fb-condition/check-current-role.js");
Object.defineProperty(exports, "CheckCurrentRole", {
  enumerable: true,
  get: function () {
    return check_current_role_js_1.CheckCurrentRole;
  }
});
var check_dango_cultivation_progress_js_1 = require("./fb-condition/check-dango-cultivation-progress.js");
Object.defineProperty(exports, "CheckDangoCultivationProgress", {
  enumerable: true,
  get: function () {
    return check_dango_cultivation_progress_js_1.CheckDangoCultivationProgress;
  }
});
var check_data_layer_condition_js_1 = require("./fb-condition/check-data-layer-condition.js");
Object.defineProperty(exports, "CheckDataLayerCondition", {
  enumerable: true,
  get: function () {
    return check_data_layer_condition_js_1.CheckDataLayerCondition;
  }
});
var check_direction_condition_js_1 = require("./fb-condition/check-direction-condition.js");
Object.defineProperty(exports, "CheckDirectionCondition", {
  enumerable: true,
  get: function () {
    return check_direction_condition_js_1.CheckDirectionCondition;
  }
});
var check_dungeon_finish_js_1 = require("./fb-condition/check-dungeon-finish.js");
Object.defineProperty(exports, "CheckDungeonFinish", {
  enumerable: true,
  get: function () {
    return check_dungeon_finish_js_1.CheckDungeonFinish;
  }
});
var check_dungeon_has_save_config_js_1 = require("./fb-condition/check-dungeon-has-save-config.js");
Object.defineProperty(exports, "CheckDungeonHasSaveConfig", {
  enumerable: true,
  get: function () {
    return check_dungeon_has_save_config_js_1.CheckDungeonHasSaveConfig;
  }
});
var check_entities_exist_js_1 = require("./fb-condition/check-entities-exist.js");
Object.defineProperty(exports, "CheckEntitiesExist", {
  enumerable: true,
  get: function () {
    return check_entities_exist_js_1.CheckEntitiesExist;
  }
});
var check_entity_distance_condition_js_1 = require("./fb-condition/check-entity-distance-condition.js");
Object.defineProperty(exports, "CheckEntityDistanceCondition", {
  enumerable: true,
  get: function () {
    return check_entity_distance_condition_js_1.CheckEntityDistanceCondition;
  }
});
var check_entity_gravity_direction_js_1 = require("./fb-condition/check-entity-gravity-direction.js");
Object.defineProperty(exports, "CheckEntityGravityDirection", {
  enumerable: true,
  get: function () {
    return check_entity_gravity_direction_js_1.CheckEntityGravityDirection;
  }
});
var check_entity_has_scene_item_attribute_tag_js_1 = require("./fb-condition/check-entity-has-scene-item-attribute-tag.js");
Object.defineProperty(exports, "CheckEntityHasSceneItemAttributeTag", {
  enumerable: true,
  get: function () {
    return check_entity_has_scene_item_attribute_tag_js_1.CheckEntityHasSceneItemAttributeTag;
  }
});
var check_entity_is_visibility_js_1 = require("./fb-condition/check-entity-is-visibility.js");
Object.defineProperty(exports, "CheckEntityIsVisibility", {
  enumerable: true,
  get: function () {
    return check_entity_is_visibility_js_1.CheckEntityIsVisibility;
  }
});
var check_entity_locked_condition_js_1 = require("./fb-condition/check-entity-locked-condition.js");
Object.defineProperty(exports, "CheckEntityLockedCondition", {
  enumerable: true,
  get: function () {
    return check_entity_locked_condition_js_1.CheckEntityLockedCondition;
  }
});
var check_entity_position_js_1 = require("./fb-condition/check-entity-position.js");
Object.defineProperty(exports, "CheckEntityPosition", {
  enumerable: true,
  get: function () {
    return check_entity_position_js_1.CheckEntityPosition;
  }
});
var check_entity_reward_js_1 = require("./fb-condition/check-entity-reward.js");
Object.defineProperty(exports, "CheckEntityReward", {
  enumerable: true,
  get: function () {
    return check_entity_reward_js_1.CheckEntityReward;
  }
});
var check_finish_loading_js_1 = require("./fb-condition/check-finish-loading.js");
Object.defineProperty(exports, "CheckFinishLoading", {
  enumerable: true,
  get: function () {
    return check_finish_loading_js_1.CheckFinishLoading;
  }
});
var check_fishing_cage_filling_ratio_js_1 = require("./fb-condition/check-fishing-cage-filling-ratio.js");
Object.defineProperty(exports, "CheckFishingCageFillingRatio", {
  enumerable: true,
  get: function () {
    return check_fishing_cage_filling_ratio_js_1.CheckFishingCageFillingRatio;
  }
});
var check_fishing_point_has_fish_js_1 = require("./fb-condition/check-fishing-point-has-fish.js");
Object.defineProperty(exports, "CheckFishingPointHasFish", {
  enumerable: true,
  get: function () {
    return check_fishing_point_has_fish_js_1.CheckFishingPointHasFish;
  }
});
var check_formation_role_info_condition_js_1 = require("./fb-condition/check-formation-role-info-condition.js");
Object.defineProperty(exports, "CheckFormationRoleInfoCondition", {
  enumerable: true,
  get: function () {
    return check_formation_role_info_condition_js_1.CheckFormationRoleInfoCondition;
  }
});
var check_gameplay_tag_condition_js_1 = require("./fb-condition/check-gameplay-tag-condition.js");
Object.defineProperty(exports, "CheckGameplayTagCondition", {
  enumerable: true,
  get: function () {
    return check_gameplay_tag_condition_js_1.CheckGameplayTagCondition;
  }
});
var check_guest_character_js_1 = require("./fb-condition/check-guest-character.js");
Object.defineProperty(exports, "CheckGuestCharacter", {
  enumerable: true,
  get: function () {
    return check_guest_character_js_1.CheckGuestCharacter;
  }
});
var check_hook_lock_point_condition_js_1 = require("./fb-condition/check-hook-lock-point-condition.js");
Object.defineProperty(exports, "CheckHookLockPointCondition", {
  enumerable: true,
  get: function () {
    return check_hook_lock_point_condition_js_1.CheckHookLockPointCondition;
  }
});
var check_in_combat_js_1 = require("./fb-condition/check-in-combat.js");
Object.defineProperty(exports, "CheckInCombat", {
  enumerable: true,
  get: function () {
    return check_in_combat_js_1.CheckInCombat;
  }
});
var check_in_range_condition_js_1 = require("./fb-condition/check-in-range-condition.js");
Object.defineProperty(exports, "CheckInRangeCondition", {
  enumerable: true,
  get: function () {
    return check_in_range_condition_js_1.CheckInRangeCondition;
  }
});
var check_is_gramophone_playing_music_js_1 = require("./fb-condition/check-is-gramophone-playing-music.js");
Object.defineProperty(exports, "CheckIsGramophonePlayingMusic", {
  enumerable: true,
  get: function () {
    return check_is_gramophone_playing_music_js_1.CheckIsGramophonePlayingMusic;
  }
});
var check_is_player_using_vehicle_js_1 = require("./fb-condition/check-is-player-using-vehicle.js");
Object.defineProperty(exports, "CheckIsPlayerUsingVehicle", {
  enumerable: true,
  get: function () {
    return check_is_player_using_vehicle_js_1.CheckIsPlayerUsingVehicle;
  }
});
var check_is_using_vehicle_js_1 = require("./fb-condition/check-is-using-vehicle.js");
Object.defineProperty(exports, "CheckIsUsingVehicle", {
  enumerable: true,
  get: function () {
    return check_is_using_vehicle_js_1.CheckIsUsingVehicle;
  }
});
var check_items_js_1 = require("./fb-condition/check-items.js");
Object.defineProperty(exports, "CheckItems", {
  enumerable: true,
  get: function () {
    return check_items_js_1.CheckItems;
  }
});
var check_jigsaw_info_condition_js_1 = require("./fb-condition/check-jigsaw-info-condition.js");
Object.defineProperty(exports, "CheckJigsawInfoCondition", {
  enumerable: true,
  get: function () {
    return check_jigsaw_info_condition_js_1.CheckJigsawInfoCondition;
  }
});
var check_jigsaw_item_move_js_1 = require("./fb-condition/check-jigsaw-item-move.js");
Object.defineProperty(exports, "CheckJigsawItemMove", {
  enumerable: true,
  get: function () {
    return check_jigsaw_item_move_js_1.CheckJigsawItemMove;
  }
});
var check_jigsaw_item_place_index_js_1 = require("./fb-condition/check-jigsaw-item-place-index.js");
Object.defineProperty(exports, "CheckJigsawItemPlaceIndex", {
  enumerable: true,
  get: function () {
    return check_jigsaw_item_place_index_js_1.CheckJigsawItemPlaceIndex;
  }
});
var check_level_play_complete_number_js_1 = require("./fb-condition/check-level-play-complete-number.js");
Object.defineProperty(exports, "CheckLevelPlayCompleteNumber", {
  enumerable: true,
  get: function () {
    return check_level_play_complete_number_js_1.CheckLevelPlayCompleteNumber;
  }
});
var check_level_play_state_js_1 = require("./fb-condition/check-level-play-state.js");
Object.defineProperty(exports, "CheckLevelPlayState", {
  enumerable: true,
  get: function () {
    return check_level_play_state_js_1.CheckLevelPlayState;
  }
});
var check_lord_gym_finish_condition_js_1 = require("./fb-condition/check-lord-gym-finish-condition.js");
Object.defineProperty(exports, "CheckLordGymFinishCondition", {
  enumerable: true,
  get: function () {
    return check_lord_gym_finish_condition_js_1.CheckLordGymFinishCondition;
  }
});
var check_moon_building_state_js_1 = require("./fb-condition/check-moon-building-state.js");
Object.defineProperty(exports, "CheckMoonBuildingState", {
  enumerable: true,
  get: function () {
    return check_moon_building_state_js_1.CheckMoonBuildingState;
  }
});
var check_node_status_js_1 = require("./fb-condition/check-node-status.js");
Object.defineProperty(exports, "CheckNodeStatus", {
  enumerable: true,
  get: function () {
    return check_node_status_js_1.CheckNodeStatus;
  }
});
var check_online_player_js_1 = require("./fb-condition/check-online-player.js");
Object.defineProperty(exports, "CheckOnlinePlayer", {
  enumerable: true,
  get: function () {
    return check_online_player_js_1.CheckOnlinePlayer;
  }
});
var check_player_can_join_activity_condition_js_1 = require("./fb-condition/check-player-can-join-activity-condition.js");
Object.defineProperty(exports, "CheckPlayerCanJoinActivityCondition", {
  enumerable: true,
  get: function () {
    return check_player_can_join_activity_condition_js_1.CheckPlayerCanJoinActivityCondition;
  }
});
var check_player_can_join_rogue_js_1 = require("./fb-condition/check-player-can-join-rogue.js");
Object.defineProperty(exports, "CheckPlayerCanJoinRogue", {
  enumerable: true,
  get: function () {
    return check_player_can_join_rogue_js_1.CheckPlayerCanJoinRogue;
  }
});
var check_player_gender_js_1 = require("./fb-condition/check-player-gender.js");
Object.defineProperty(exports, "CheckPlayerGender", {
  enumerable: true,
  get: function () {
    return check_player_gender_js_1.CheckPlayerGender;
  }
});
var check_player_position_js_1 = require("./fb-condition/check-player-position.js");
Object.defineProperty(exports, "CheckPlayerPosition", {
  enumerable: true,
  get: function () {
    return check_player_position_js_1.CheckPlayerPosition;
  }
});
var check_player_skill_ready_condition_js_1 = require("./fb-condition/check-player-skill-ready-condition.js");
Object.defineProperty(exports, "CheckPlayerSkillReadyCondition", {
  enumerable: true,
  get: function () {
    return check_player_skill_ready_condition_js_1.CheckPlayerSkillReadyCondition;
  }
});
var check_player_state_restriction_condition_js_1 = require("./fb-condition/check-player-state-restriction-condition.js");
Object.defineProperty(exports, "CheckPlayerStateRestrictionCondition", {
  enumerable: true,
  get: function () {
    return check_player_state_restriction_condition_js_1.CheckPlayerStateRestrictionCondition;
  }
});
var check_rogue_ability_select_condition_js_1 = require("./fb-condition/check-rogue-ability-select-condition.js");
Object.defineProperty(exports, "CheckRogueAbilitySelectCondition", {
  enumerable: true,
  get: function () {
    return check_rogue_ability_select_condition_js_1.CheckRogueAbilitySelectCondition;
  }
});
var check_sub_level_state_js_1 = require("./fb-condition/check-sub-level-state.js");
Object.defineProperty(exports, "CheckSubLevelState", {
  enumerable: true,
  get: function () {
    return check_sub_level_state_js_1.CheckSubLevelState;
  }
});
var check_sub_level_state_config_js_1 = require("./fb-condition/check-sub-level-state-config.js");
Object.defineProperty(exports, "CheckSubLevelStateConfig", {
  enumerable: true,
  get: function () {
    return check_sub_level_state_config_js_1.CheckSubLevelStateConfig;
  }
});
var check_system_event_bvb_js_1 = require("./fb-condition/check-system-event-bvb.js");
Object.defineProperty(exports, "CheckSystemEventBvb", {
  enumerable: true,
  get: function () {
    return check_system_event_bvb_js_1.CheckSystemEventBvb;
  }
});
var check_system_function_js_1 = require("./fb-condition/check-system-function.js");
Object.defineProperty(exports, "CheckSystemFunction", {
  enumerable: true,
  get: function () {
    return check_system_function_js_1.CheckSystemFunction;
  }
});
var check_system_state_condition_js_1 = require("./fb-condition/check-system-state-condition.js");
Object.defineProperty(exports, "CheckSystemStateCondition", {
  enumerable: true,
  get: function () {
    return check_system_state_condition_js_1.CheckSystemStateCondition;
  }
});
var check_target_attribute_condition_js_1 = require("./fb-condition/check-target-attribute-condition.js");
Object.defineProperty(exports, "CheckTargetAttributeCondition", {
  enumerable: true,
  get: function () {
    return check_target_attribute_condition_js_1.CheckTargetAttributeCondition;
  }
});
var check_target_entity_js_1 = require("./fb-condition/check-target-entity.js");
Object.defineProperty(exports, "CheckTargetEntity", {
  enumerable: true,
  get: function () {
    return check_target_entity_js_1.CheckTargetEntity;
  }
});
var check_tele_control_state_js_1 = require("./fb-condition/check-tele-control-state.js");
Object.defineProperty(exports, "CheckTeleControlState", {
  enumerable: true,
  get: function () {
    return check_tele_control_state_js_1.CheckTeleControlState;
  }
});
var check_track_moon_popularity_js_1 = require("./fb-condition/check-track-moon-popularity.js");
Object.defineProperty(exports, "CheckTrackMoonPopularity", {
  enumerable: true,
  get: function () {
    return check_track_moon_popularity_js_1.CheckTrackMoonPopularity;
  }
});
var check_treasure_been_claimed_condition_js_1 = require("./fb-condition/check-treasure-been-claimed-condition.js");
Object.defineProperty(exports, "CheckTreasureBeenClaimedCondition", {
  enumerable: true,
  get: function () {
    return check_treasure_been_claimed_condition_js_1.CheckTreasureBeenClaimedCondition;
  }
});
var check_vehicle_condition_js_1 = require("./fb-condition/check-vehicle-condition.js");
Object.defineProperty(exports, "CheckVehicleCondition", {
  enumerable: true,
  get: function () {
    return check_vehicle_condition_js_1.CheckVehicleCondition;
  }
});
var child_quest_condition_js_1 = require("./fb-condition/child-quest-condition.js");
Object.defineProperty(exports, "ChildQuestCondition", {
  enumerable: true,
  get: function () {
    return child_quest_condition_js_1.ChildQuestCondition;
  }
});
var clock_js_1 = require("./fb-condition/clock.js");
Object.defineProperty(exports, "Clock", {
  enumerable: true,
  get: function () {
    return clock_js_1.Clock;
  }
});
var compare_alert_value_js_1 = require("./fb-condition/compare-alert-value.js");
Object.defineProperty(exports, "CompareAlertValue", {
  enumerable: true,
  get: function () {
    return compare_alert_value_js_1.CompareAlertValue;
  }
});
var compare_calabash_level_condition_js_1 = require("./fb-condition/compare-calabash-level-condition.js");
Object.defineProperty(exports, "CompareCalabashLevelCondition", {
  enumerable: true,
  get: function () {
    return compare_calabash_level_condition_js_1.CompareCalabashLevelCondition;
  }
});
var compare_custom_alert_value_js_1 = require("./fb-condition/compare-custom-alert-value.js");
Object.defineProperty(exports, "CompareCustomAlertValue", {
  enumerable: true,
  get: function () {
    return compare_custom_alert_value_js_1.CompareCustomAlertValue;
  }
});
var compare_dungeon_id_js_1 = require("./fb-condition/compare-dungeon-id.js");
Object.defineProperty(exports, "CompareDungeonId", {
  enumerable: true,
  get: function () {
    return compare_dungeon_id_js_1.CompareDungeonId;
  }
});
var compare_entity_group_state_condition_js_1 = require("./fb-condition/compare-entity-group-state-condition.js");
Object.defineProperty(exports, "CompareEntityGroupStateCondition", {
  enumerable: true,
  get: function () {
    return compare_entity_group_state_condition_js_1.CompareEntityGroupStateCondition;
  }
});
var compare_entity_self_state_condition_js_1 = require("./fb-condition/compare-entity-self-state-condition.js");
Object.defineProperty(exports, "CompareEntitySelfStateCondition", {
  enumerable: true,
  get: function () {
    return compare_entity_self_state_condition_js_1.CompareEntitySelfStateCondition;
  }
});
var compare_entity_state_condition_js_1 = require("./fb-condition/compare-entity-state-condition.js");
Object.defineProperty(exports, "CompareEntityStateCondition", {
  enumerable: true,
  get: function () {
    return compare_entity_state_condition_js_1.CompareEntityStateCondition;
  }
});
var compare_explore_level_condition_js_1 = require("./fb-condition/compare-explore-level-condition.js");
Object.defineProperty(exports, "CompareExploreLevelCondition", {
  enumerable: true,
  get: function () {
    return compare_explore_level_condition_js_1.CompareExploreLevelCondition;
  }
});
var compare_fishing_boat_state_js_1 = require("./fb-condition/compare-fishing-boat-state.js");
Object.defineProperty(exports, "CompareFishingBoatState", {
  enumerable: true,
  get: function () {
    return compare_fishing_boat_state_js_1.CompareFishingBoatState;
  }
});
var compare_fishing_prestige_level_condition_js_1 = require("./fb-condition/compare-fishing-prestige-level-condition.js");
Object.defineProperty(exports, "CompareFishingPrestigeLevelCondition", {
  enumerable: true,
  get: function () {
    return compare_fishing_prestige_level_condition_js_1.CompareFishingPrestigeLevelCondition;
  }
});
var compare_fishing_tech_level_js_1 = require("./fb-condition/compare-fishing-tech-level.js");
Object.defineProperty(exports, "CompareFishingTechLevel", {
  enumerable: true,
  get: function () {
    return compare_fishing_tech_level_js_1.CompareFishingTechLevel;
  }
});
var compare_level_play_reward_state_condition_js_1 = require("./fb-condition/compare-level-play-reward-state-condition.js");
Object.defineProperty(exports, "CompareLevelPlayRewardStateCondition", {
  enumerable: true,
  get: function () {
    return compare_level_play_reward_state_condition_js_1.CompareLevelPlayRewardStateCondition;
  }
});
var compare_lift_condition_js_1 = require("./fb-condition/compare-lift-condition.js");
Object.defineProperty(exports, "CompareLiftCondition", {
  enumerable: true,
  get: function () {
    return compare_lift_condition_js_1.CompareLiftCondition;
  }
});
var compare_max_alert_value_js_1 = require("./fb-condition/compare-max-alert-value.js");
Object.defineProperty(exports, "CompareMaxAlertValue", {
  enumerable: true,
  get: function () {
    return compare_max_alert_value_js_1.CompareMaxAlertValue;
  }
});
var compare_min_alert_value_js_1 = require("./fb-condition/compare-min-alert-value.js");
Object.defineProperty(exports, "CompareMinAlertValue", {
  enumerable: true,
  get: function () {
    return compare_min_alert_value_js_1.CompareMinAlertValue;
  }
});
var compare_npc_perform_state_condition_js_1 = require("./fb-condition/compare-npc-perform-state-condition.js");
Object.defineProperty(exports, "CompareNpcPerformStateCondition", {
  enumerable: true,
  get: function () {
    return compare_npc_perform_state_condition_js_1.CompareNpcPerformStateCondition;
  }
});
var compare_player_motion_state_js_1 = require("./fb-condition/compare-player-motion-state.js");
Object.defineProperty(exports, "ComparePlayerMotionState", {
  enumerable: true,
  get: function () {
    return compare_player_motion_state_js_1.ComparePlayerMotionState;
  }
});
var compare_player_motion_state2_js_1 = require("./fb-condition/compare-player-motion-state2.js");
Object.defineProperty(exports, "ComparePlayerMotionState2", {
  enumerable: true,
  get: function () {
    return compare_player_motion_state2_js_1.ComparePlayerMotionState2;
  }
});
var compare_player_num_in_dungeon_js_1 = require("./fb-condition/compare-player-num-in-dungeon.js");
Object.defineProperty(exports, "ComparePlayerNumInDungeon", {
  enumerable: true,
  get: function () {
    return compare_player_num_in_dungeon_js_1.ComparePlayerNumInDungeon;
  }
});
var compare_teammate_die_condition_js_1 = require("./fb-condition/compare-teammate-die-condition.js");
Object.defineProperty(exports, "CompareTeammateDieCondition", {
  enumerable: true,
  get: function () {
    return compare_teammate_die_condition_js_1.CompareTeammateDieCondition;
  }
});
var compare_time_period_js_1 = require("./fb-condition/compare-time-period.js");
Object.defineProperty(exports, "CompareTimePeriod", {
  enumerable: true,
  get: function () {
    return compare_time_period_js_1.CompareTimePeriod;
  }
});
var compare_var_js_1 = require("./fb-condition/compare-var.js");
Object.defineProperty(exports, "CompareVar", {
  enumerable: true,
  get: function () {
    return compare_var_js_1.CompareVar;
  }
});
var compare_var_condition_js_1 = require("./fb-condition/compare-var-condition.js");
Object.defineProperty(exports, "CompareVarCondition", {
  enumerable: true,
  get: function () {
    return compare_var_condition_js_1.CompareVarCondition;
  }
});
var compare_weather_js_1 = require("./fb-condition/compare-weather.js");
Object.defineProperty(exports, "CompareWeather", {
  enumerable: true,
  get: function () {
    return compare_weather_js_1.CompareWeather;
  }
});
var complete_certain_fishing_entrust_js_1 = require("./fb-condition/complete-certain-fishing-entrust.js");
Object.defineProperty(exports, "CompleteCertainFishingEntrust", {
  enumerable: true,
  get: function () {
    return complete_certain_fishing_entrust_js_1.CompleteCertainFishingEntrust;
  }
});
var condition_group_js_1 = require("./fb-condition/condition-group.js");
Object.defineProperty(exports, "ConditionGroup", {
  enumerable: true,
  get: function () {
    return condition_group_js_1.ConditionGroup;
  }
});
var count_dango_over_target_level_js_1 = require("./fb-condition/count-dango-over-target-level.js");
Object.defineProperty(exports, "CountDangoOverTargetLevel", {
  enumerable: true,
  get: function () {
    return count_dango_over_target_level_js_1.CountDangoOverTargetLevel;
  }
});
var custom_json_condition_js_1 = require("./fb-condition/custom-json-condition.js");
Object.defineProperty(exports, "CustomJsonCondition", {
  enumerable: true,
  get: function () {
    return custom_json_condition_js_1.CustomJsonCondition;
  }
});
var eskill_ready_js_1 = require("./fb-condition/eskill-ready.js");
Object.defineProperty(exports, "ESkillReady", {
  enumerable: true,
  get: function () {
    return eskill_ready_js_1.ESkillReady;
  }
});
var entity_event_condition_js_1 = require("./fb-condition/entity-event-condition.js");
Object.defineProperty(exports, "EntityEventCondition", {
  enumerable: true,
  get: function () {
    return entity_event_condition_js_1.EntityEventCondition;
  }
});
var entity_group_condition_js_1 = require("./fb-condition/entity-group-condition.js");
Object.defineProperty(exports, "EntityGroupCondition", {
  enumerable: true,
  get: function () {
    return entity_group_condition_js_1.EntityGroupCondition;
  }
});
var entity_state_condition_js_1 = require("./fb-condition/entity-state-condition.js");
Object.defineProperty(exports, "EntityStateCondition", {
  enumerable: true,
  get: function () {
    return entity_state_condition_js_1.EntityStateCondition;
  }
});
var feature_collection_level_js_1 = require("./fb-condition/feature-collection-level.js");
Object.defineProperty(exports, "FeatureCollectionLevel", {
  enumerable: true,
  get: function () {
    return feature_collection_level_js_1.FeatureCollectionLevel;
  }
});
var gramophone_check_condition_js_1 = require("./fb-condition/gramophone-check-condition.js");
Object.defineProperty(exports, "GramophoneCheckCondition", {
  enumerable: true,
  get: function () {
    return gramophone_check_condition_js_1.GramophoneCheckCondition;
  }
});
var has_buff_js_1 = require("./fb-condition/has-buff.js");
Object.defineProperty(exports, "HasBuff", {
  enumerable: true,
  get: function () {
    return has_buff_js_1.HasBuff;
  }
});
var has_equipped_vision_js_1 = require("./fb-condition/has-equipped-vision.js");
Object.defineProperty(exports, "HasEquippedVision", {
  enumerable: true,
  get: function () {
    return has_equipped_vision_js_1.HasEquippedVision;
  }
});
var has_upgradable_vision_js_1 = require("./fb-condition/has-upgradable-vision.js");
Object.defineProperty(exports, "HasUpgradableVision", {
  enumerable: true,
  get: function () {
    return has_upgradable_vision_js_1.HasUpgradableVision;
  }
});
var health_attribute_js_1 = require("./fb-condition/health-attribute.js");
Object.defineProperty(exports, "HealthAttribute", {
  enumerable: true,
  get: function () {
    return health_attribute_js_1.HealthAttribute;
  }
});
var hour_js_1 = require("./fb-condition/hour.js");
Object.defineProperty(exports, "Hour", {
  enumerable: true,
  get: function () {
    return hour_js_1.Hour;
  }
});
var hour_to_hour_condition_js_1 = require("./fb-condition/hour-to-hour-condition.js");
Object.defineProperty(exports, "HourToHourCondition", {
  enumerable: true,
  get: function () {
    return hour_to_hour_condition_js_1.HourToHourCondition;
  }
});
var item_config_js_1 = require("./fb-condition/item-config.js");
Object.defineProperty(exports, "ItemConfig", {
  enumerable: true,
  get: function () {
    return item_config_js_1.ItemConfig;
  }
});
var listen_entity_self_event_condition_js_1 = require("./fb-condition/listen-entity-self-event-condition.js");
Object.defineProperty(exports, "ListenEntitySelfEventCondition", {
  enumerable: true,
  get: function () {
    return listen_entity_self_event_condition_js_1.ListenEntitySelfEventCondition;
  }
});
var listen_entity_through_portal_js_1 = require("./fb-condition/listen-entity-through-portal.js");
Object.defineProperty(exports, "ListenEntityThroughPortal", {
  enumerable: true,
  get: function () {
    return listen_entity_through_portal_js_1.ListenEntityThroughPortal;
  }
});
var online_player_condition_target_host_js_1 = require("./fb-condition/online-player-condition-target-host.js");
Object.defineProperty(exports, "OnlinePlayerConditionTargetHost", {
  enumerable: true,
  get: function () {
    return online_player_condition_target_host_js_1.OnlinePlayerConditionTargetHost;
  }
});
var online_player_condition_target_participator_js_1 = require("./fb-condition/online-player-condition-target-participator.js");
Object.defineProperty(exports, "OnlinePlayerConditionTargetParticipator", {
  enumerable: true,
  get: function () {
    return online_player_condition_target_participator_js_1.OnlinePlayerConditionTargetParticipator;
  }
});
var piece_index_js_1 = require("./fb-condition/piece-index.js");
Object.defineProperty(exports, "PieceIndex", {
  enumerable: true,
  get: function () {
    return piece_index_js_1.PieceIndex;
  }
});
var player_attribute_js_1 = require("./fb-condition/player-attribute.js");
Object.defineProperty(exports, "PlayerAttribute", {
  enumerable: true,
  get: function () {
    return player_attribute_js_1.PlayerAttribute;
  }
});
var player_entity_js_1 = require("./fb-condition/player-entity.js");
Object.defineProperty(exports, "PlayerEntity", {
  enumerable: true,
  get: function () {
    return player_entity_js_1.PlayerEntity;
  }
});
var pre_child_quest_js_1 = require("./fb-condition/pre-child-quest.js");
Object.defineProperty(exports, "PreChildQuest", {
  enumerable: true,
  get: function () {
    return pre_child_quest_js_1.PreChildQuest;
  }
});
var pre_quest_js_1 = require("./fb-condition/pre-quest.js");
Object.defineProperty(exports, "PreQuest", {
  enumerable: true,
  get: function () {
    return pre_quest_js_1.PreQuest;
  }
});
var quest_state_equal_condition_js_1 = require("./fb-condition/quest-state-equal-condition.js");
Object.defineProperty(exports, "QuestStateEqualCondition", {
  enumerable: true,
  get: function () {
    return quest_state_equal_condition_js_1.QuestStateEqualCondition;
  }
});
var range_sphere_js_1 = require("./fb-condition/range-sphere.js");
Object.defineProperty(exports, "RangeSphere", {
  enumerable: true,
  get: function () {
    return range_sphere_js_1.RangeSphere;
  }
});
var role_level_js_1 = require("./fb-condition/role-level.js");
Object.defineProperty(exports, "RoleLevel", {
  enumerable: true,
  get: function () {
    return role_level_js_1.RoleLevel;
  }
});
var self_entity_js_1 = require("./fb-condition/self-entity.js");
Object.defineProperty(exports, "SelfEntity", {
  enumerable: true,
  get: function () {
    return self_entity_js_1.SelfEntity;
  }
});
var specify_role_level_js_1 = require("./fb-condition/specify-role-level.js");
Object.defineProperty(exports, "SpecifyRoleLevel", {
  enumerable: true,
  get: function () {
    return specify_role_level_js_1.SpecifyRoleLevel;
  }
});
var specify_role_weapon_level_js_1 = require("./fb-condition/specify-role-weapon-level.js");
Object.defineProperty(exports, "SpecifyRoleWeaponLevel", {
  enumerable: true,
  get: function () {
    return specify_role_weapon_level_js_1.SpecifyRoleWeaponLevel;
  }
});
var target_entity_js_1 = require("./fb-condition/target-entity.js");
Object.defineProperty(exports, "TargetEntity", {
  enumerable: true,
  get: function () {
    return target_entity_js_1.TargetEntity;
  }
});
var time_period_js_1 = require("./fb-condition/time-period.js");
Object.defineProperty(exports, "TimePeriod", {
  enumerable: true,
  get: function () {
    return time_period_js_1.TimePeriod;
  }
});
var triggered_entity_js_1 = require("./fb-condition/triggered-entity.js");
Object.defineProperty(exports, "TriggeredEntity", {
  enumerable: true,
  get: function () {
    return triggered_entity_js_1.TriggeredEntity;
  }
});
var ultimate_skill_ready_js_1 = require("./fb-condition/ultimate-skill-ready.js");
Object.defineProperty(exports, "UltimateSkillReady", {
  enumerable: true,
  get: function () {
    return ultimate_skill_ready_js_1.UltimateSkillReady;
  }
});
var union_check_dango_cultivation_progress_config_js_1 = require("./fb-condition/union-check-dango-cultivation-progress-config.js");
Object.defineProperty(exports, "UnionCheckDangoCultivationProgressConfig", {
  enumerable: true,
  get: function () {
    return union_check_dango_cultivation_progress_config_js_1.UnionCheckDangoCultivationProgressConfig;
  }
});
var union_check_formation_role_info_js_1 = require("./fb-condition/union-check-formation-role-info.js");
Object.defineProperty(exports, "UnionCheckFormationRoleInfo", {
  enumerable: true,
  get: function () {
    return union_check_formation_role_info_js_1.UnionCheckFormationRoleInfo;
  }
});
var union_check_jigsaw_info_js_1 = require("./fb-condition/union-check-jigsaw-info.js");
Object.defineProperty(exports, "UnionCheckJigsawInfo", {
  enumerable: true,
  get: function () {
    return union_check_jigsaw_info_js_1.UnionCheckJigsawInfo;
  }
});
var union_check_player_can_join_activity_js_1 = require("./fb-condition/union-check-player-can-join-activity.js");
Object.defineProperty(exports, "UnionCheckPlayerCanJoinActivity", {
  enumerable: true,
  get: function () {
    return union_check_player_can_join_activity_js_1.UnionCheckPlayerCanJoinActivity;
  }
});
var union_check_system_state_js_1 = require("./fb-condition/union-check-system-state.js");
Object.defineProperty(exports, "UnionCheckSystemState", {
  enumerable: true,
  get: function () {
    return union_check_system_state_js_1.UnionCheckSystemState;
  }
});
var union_check_target_js_1 = require("./fb-condition/union-check-target.js");
Object.defineProperty(exports, "UnionCheckTarget", {
  enumerable: true,
  get: function () {
    return union_check_target_js_1.UnionCheckTarget;
  }
});
var union_check_target_type_config_js_1 = require("./fb-condition/union-check-target-type-config.js");
Object.defineProperty(exports, "UnionCheckTargetTypeConfig", {
  enumerable: true,
  get: function () {
    return union_check_target_type_config_js_1.UnionCheckTargetTypeConfig;
  }
});
var union_compared_alert_value_js_1 = require("./fb-condition/union-compared-alert-value.js");
Object.defineProperty(exports, "UnionComparedAlertValue", {
  enumerable: true,
  get: function () {
    return union_compared_alert_value_js_1.UnionComparedAlertValue;
  }
});
var union_condition2_js_1 = require("./fb-condition/union-condition2.js");
Object.defineProperty(exports, "UnionCondition2", {
  enumerable: true,
  get: function () {
    return union_condition2_js_1.UnionCondition2;
  }
});
var union_online_player_condition_target_js_1 = require("./fb-condition/union-online-player-condition-target.js");
Object.defineProperty(exports, "UnionOnlinePlayerConditionTarget", {
  enumerable: true,
  get: function () {
    return union_online_player_condition_target_js_1.UnionOnlinePlayerConditionTarget;
  }
});
var union_player_attribute_js_1 = require("./fb-condition/union-player-attribute.js");
Object.defineProperty(exports, "UnionPlayerAttribute", {
  enumerable: true,
  get: function () {
    return union_player_attribute_js_1.UnionPlayerAttribute;
  }
});
var union_role_level_js_1 = require("./fb-condition/union-role-level.js");
Object.defineProperty(exports, "UnionRoleLevel", {
  enumerable: true,
  get: function () {
    return union_role_level_js_1.UnionRoleLevel;
  }
});
var union_skill_ready_option_js_1 = require("./fb-condition/union-skill-ready-option.js");
Object.defineProperty(exports, "UnionSkillReadyOption", {
  enumerable: true,
  get: function () {
    return union_skill_ready_option_js_1.UnionSkillReadyOption;
  }
});
var union_target_attribute_js_1 = require("./fb-condition/union-target-attribute.js");
Object.defineProperty(exports, "UnionTargetAttribute", {
  enumerable: true,
  get: function () {
    return union_target_attribute_js_1.UnionTargetAttribute;
  }
});
var union_target_entity_js_1 = require("./fb-condition/union-target-entity.js");
Object.defineProperty(exports, "UnionTargetEntity", {
  enumerable: true,
  get: function () {
    return union_target_entity_js_1.UnionTargetEntity;
  }
});
var union_vehicle_condition_js_1 = require("./fb-condition/union-vehicle-condition.js");
Object.defineProperty(exports, "UnionVehicleCondition", {
  enumerable: true,
  get: function () {
    return union_vehicle_condition_js_1.UnionVehicleCondition;
  }
});
var union_visible_condition_js_1 = require("./fb-condition/union-visible-condition.js");
Object.defineProperty(exports, "UnionVisibleCondition", {
  enumerable: true,
  get: function () {
    return union_visible_condition_js_1.UnionVisibleCondition;
  }
});
var union_weapon_level_js_1 = require("./fb-condition/union-weapon-level.js");
Object.defineProperty(exports, "UnionWeaponLevel", {
  enumerable: true,
  get: function () {
    return union_weapon_level_js_1.UnionWeaponLevel;
  }
});
var vision_skill_ready_js_1 = require("./fb-condition/vision-skill-ready.js");
Object.defineProperty(exports, "VisionSkillReady", {
  enumerable: true,
  get: function () {
    return vision_skill_ready_js_1.VisionSkillReady;
  }
});
var weapon_level_js_1 = require("./fb-condition/weapon-level.js");
Object.defineProperty(exports, "WeaponLevel", {
  enumerable: true,
  get: function () {
    return weapon_level_js_1.WeaponLevel;
  }
});
var weather_js_1 = require("./fb-condition/weather.js");
Object.defineProperty(exports, "Weather", {
  enumerable: true,
  get: function () {
    return weather_js_1.Weather;
  }
});
//# sourceMappingURL=fb-condition.js.map