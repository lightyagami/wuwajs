"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HONAMI_HELP_COLLECT = exports.HONAMI_HELP_SHOP = exports.HONAMI_HELP_WANTED = exports.HONAMI_HELP_TALENT = exports.HONAMI_HELP_READYGO = exports.HONAMI_HELP_WEAPONSELECT = exports.HONAMI_HELP_BACKPACK = exports.HONAMI_HELP_MAIN = exports.honamiWeaponTypeMap = exports.honamiCollectStateMap = exports.collectStateToScoreRewardMap = exports.HonamiBackpackTypeMap = exports.honamiItemTypeMap = exports.RICHTXT_QUEST = exports.HONAMI_MAX_SHOW_REVENUE = exports.HONAMI_MAIN_QUEST_ID = exports.HONAMI_DUNGEON_ID = exports.HONAMI_BAKCPACK_CLICK_CD = exports.HONAMI_DISABLE_ALPHA = exports.HONAMI_ENABLE_ALPHA = exports.HONAMI_DUNGEON_ENTRANCE_ID = exports.HONAMI_MASCOT_EMPTY_BIG_PATH = exports.HONAMI_MASCOT_EMPTY_PATH = exports.HONAMI_EMPTY_GRID_BG = exports.HONAMI_ROLE_VIRTUAL_SCORE = exports.HONAMI_DUNGEON_DEFAULT_AREA_ID = exports.HONAMI_ROLE_SLOT_MAX = exports.HONAMI_ROLE_SLOT_OFFSET = exports.HONAMI_ROLE_TEAM_COUNT = exports.HONAMI_GRID_ITEM_VERTICAL_INTERVAL_MOBILE = exports.HONAMI_GRID_ITEM_HORIZONTAL_INTERVAL_MOBILE = exports.HONAMI_GRID_ITEM_VERTICAL_INTERVAL = exports.HONAMI_GRID_ITEM_HORIZONTAL_INTERVAL = exports.HONAMI_GRID_ITEM_HEIGHT_MOBILE = exports.HONAMI_GRID_ITEM_WIDTH_MOBILE = exports.HONAMI_GRID_ITEM_HEIGHT = exports.HONAMI_GRID_ITEM_WIDTH = undefined;
exports.HONAMI_GRID_ITEM_WIDTH = 86;
exports.HONAMI_GRID_ITEM_HEIGHT = 86;
exports.HONAMI_GRID_ITEM_WIDTH_MOBILE = 134;
exports.HONAMI_GRID_ITEM_HEIGHT_MOBILE = 134;
exports.HONAMI_GRID_ITEM_HORIZONTAL_INTERVAL = 2;
exports.HONAMI_GRID_ITEM_VERTICAL_INTERVAL = 2;
exports.HONAMI_GRID_ITEM_HORIZONTAL_INTERVAL_MOBILE = 2;
exports.HONAMI_GRID_ITEM_VERTICAL_INTERVAL_MOBILE = 2;
exports.HONAMI_ROLE_TEAM_COUNT = 3;
exports.HONAMI_ROLE_SLOT_OFFSET = 100;
exports.HONAMI_ROLE_SLOT_MAX = 6;
exports.HONAMI_DUNGEON_DEFAULT_AREA_ID = 1;
exports.HONAMI_ROLE_VIRTUAL_SCORE = 100;
exports.HONAMI_EMPTY_GRID_BG = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity28/HonamiStory/HonamiStoryBackpack/SP_GridEmpty.SP_GridEmpty";
exports.HONAMI_MASCOT_EMPTY_PATH = "/Game/Aki/UI/UIResources/UiActivity/Image/Activity28/HonamiStory/HonamiStoryHead/T_HonamiStoryHeadBEmpty.T_HonamiStoryHeadBEmpty";
exports.HONAMI_MASCOT_EMPTY_BIG_PATH = "/Game/Aki/UI/UIResources/UiActivity/Image/Activity28/HonamiStory/HonamiStoryHead/T_HonamiStoryHeadAEmpty.T_HonamiStoryHeadAEmpty";
exports.HONAMI_DUNGEON_ENTRANCE_ID = 1521;
exports.HONAMI_ENABLE_ALPHA = 1;
exports.HONAMI_DISABLE_ALPHA = 0.4;
exports.HONAMI_BAKCPACK_CLICK_CD = 300;
exports.HONAMI_DUNGEON_ID = 8760;
exports.HONAMI_MAIN_QUEST_ID = 880000044;
exports.HONAMI_MAX_SHOW_REVENUE = 99999999;
exports.RICHTXT_QUEST = "<color=#b3dffa>{0}</color>";
exports.honamiItemTypeMap = new Map([[1, "HonamiStory_ItemType_Plugin"], [2, "HonamiStory_ItemType_Normal"]]);
exports.HonamiBackpackTypeMap = new Map([[0, 1], [1, 2], [2, 3], [3, 4]]);
exports.collectStateToScoreRewardMap = new Map([[0, "SP_HonamiStoryScoreReward_Unfinished"], [1, "SP_HonamiStoryScoreReward_Finished"], [2, "SP_HonamiStoryScoreReward_GotReward"]]);
exports.honamiCollectStateMap = new Map([[0, "HonamiStory_Collect_Unfinished"], [1, "HonamiStory_Collect_Finished"], [2, "HonamiStory_Collect_GotReward"]]);
exports.honamiWeaponTypeMap = new Map([[1, "HonamiStory_Weapon_Type_1"], [2, "HonamiStory_Weapon_Type_2"], [3, "HonamiStory_Weapon_Type_3"]]);
exports.HONAMI_HELP_MAIN = 431;
exports.HONAMI_HELP_BACKPACK = 434;
exports.HONAMI_HELP_WEAPONSELECT = 436;
exports.HONAMI_HELP_READYGO = 437;
exports.HONAMI_HELP_TALENT = 439;
exports.HONAMI_HELP_WANTED = 440;
exports.HONAMI_HELP_SHOP = 441;
exports.HONAMI_HELP_COLLECT = 442; //# sourceMappingURL=HonamiStoryDefine.js.map