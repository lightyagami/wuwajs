"use strict";

function createElementSortFunc(o) {
  return (t, e) => {
    if (t.Element !== e.Element) {
      if (t.Element === o) {
        return -1;
      }
      if (e.Element === o) {
        return 1;
      }
    }
    return 0;
  };
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GYM_BG_MIDDLE_GRAY = exports.GYM_BG_MIDDLE_COLOR = exports.GYM_BG_LEFT_WHITE = exports.GYM_BG_LEFT_GRAY = exports.GYM_BG_LEFT_COLOR = exports.phantomArenaEntranceShopTabIconMap = exports.TEXT_RESULT_LEVEL_SKILL_DESC = exports.INSTANCE_FAIL = exports.INSTANCE_SUCCESS = exports.HELP_ID_LEVEL = exports.HELP_ID_COLLECT = exports.HELP_ID_SHOP = exports.HELP_ID_ENTRANCE = exports.COLLECT_ELEMENT_PHYSICAL_NAME = exports.COLLECT_BADGE_GROUP_TITLE = exports.ENTRANCE_MASTER_INFO_EXP_TEXT_ID = exports.ENTRANCE_NPC_LOCK_TEXT_ID = exports.ENTRANCE_GYM_LOCK_TEXT_ID = exports.BVB_SPEEDUP_TIPS = exports.ENTRANCE_SHOP_COUNT_ID = exports.ENTRANCE_LEVEL_COUNT_ID = exports.ENTRANCE_MAINSHOP_ID = exports.ENTRANCE_COLLECTION_TEXT_ID = exports.ENTRANCE_ROLE_TEXT_ID = exports.ENTRANCE_CARD_TEXT_ID = exports.ENTRANCE_SHOP_TEXT_ID = exports.ENTRANCE_TASK_TEXT_ID = exports.GYM_GYM_OFFSET_MIDDLE = exports.GYM_BG_OFFSET_MAX = exports.GYM_INERTIA_TWEEN_TIME = exports.REPEAT_GYM_MAX_DIFFICULTY = exports.positionGymLevel = exports.GYM_MAX_LEVEL = exports.ACTIVITY_SUBVIEW_TEXT_UNLOCK = exports.POINTS_NAME_TEXT = exports.addCardFailedResultToTipTextId = exports.cardSlotDefaultSortFunc = exports.cardSlotSortTypeToSortFunc = exports.cardTabTypeToElementConfigId = exports.cardTabTypeToFilterElementList = exports.CARD_CRIT_DAMAGE_TEXT_ID = exports.CARD_CRIT_RATE_TEXT_ID = exports.CARD_LIFE_TEXT_ID = exports.CARD_ATTACK_TEXT_ID = exports.CARD_COST_TEXT_ID = exports.CARD_SLOT_FRAME_GOLD_ICON_PATH = exports.CARD_SLOT_FRAME_NORMAL_ICON_PATH = exports.CARD_ALL_ELEMENT_TAB_COLOR = exports.CARD_ALL_ELEMENT_TAB_ICON_PATH = exports.CARD_COUNT_PER_PAGE = undefined;
exports.DECK_ID_EMPTY_TEMP = exports.DECK_ID_NONE = exports.GYM_BG_RIGHT_GRAY = exports.GYM_BG_RIGHT_COLOR = exports.GYM_BG_MIDDLE_WHITE = undefined;
exports.CARD_COUNT_PER_PAGE = 8;
exports.CARD_ALL_ELEMENT_TAB_ICON_PATH = "/Game/Aki/UI/UIResources/Common/Image/IconElementRound/T_IconElementAll.T_IconElementAll";
exports.CARD_ALL_ELEMENT_TAB_COLOR = "FFFFFFFF";
exports.CARD_SLOT_FRAME_NORMAL_ICON_PATH = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity24/SoundRemnantArena/Outside/SP_IconOutsideTeamListNor.SP_IconOutsideTeamListNor";
exports.CARD_SLOT_FRAME_GOLD_ICON_PATH = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity24/SoundRemnantArena/Outside/SP_IconOutsideTeamListGold.SP_IconOutsideTeamListGold";
exports.CARD_COST_TEXT_ID = "PhantomBattle_1001";
exports.CARD_ATTACK_TEXT_ID = "PhantomBattle_1002";
exports.CARD_LIFE_TEXT_ID = "PhantomBattle_1003";
exports.CARD_CRIT_RATE_TEXT_ID = "PhantomBattle_1004";
exports.CARD_CRIT_DAMAGE_TEXT_ID = "PhantomBattle_1005";
exports.cardTabTypeToFilterElementList = {
  [1]: [1, 0],
  2: [2, 0],
  3: [3, 0],
  4: [4, 0],
  5: [5, 0],
  6: [6, 0]
};
exports.cardTabTypeToElementConfigId = {
  [1]: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6
};
exports.cardSlotSortTypeToSortFunc = {
  [1]: (t, e) => e.Cost - t.Cost,
  2: createElementSortFunc(1),
  3: createElementSortFunc(2),
  4: createElementSortFunc(3),
  5: createElementSortFunc(4),
  6: createElementSortFunc(5),
  7: createElementSortFunc(6)
};
const cardSlotDefaultSortFunc = (t, e) => t.Cost !== e.Cost ? e.Cost - t.Cost : t.Element !== e.Element ? t.Element === 0 ? 1 : e.Element === 0 ? -1 : t.Element - e.Element : t.CardId - e.CardId;
exports.cardSlotDefaultSortFunc = cardSlotDefaultSortFunc;
exports.addCardFailedResultToTipTextId = {
  [1]: "PhantomBattle_1056",
  2: "PhantomBattle_1073",
  4: "PhantomBattle_1074",
  6: "PhantomBattle_1054",
  3: "PhantomBattle_1052",
  5: "PhantomBattle_1052",
  7: "PhantomBattleGym_cost1_Limit",
  8: "PhantomBattleGym_cost3_Limit"
};
exports.POINTS_NAME_TEXT = "PhantomBattle_1106";
exports.ACTIVITY_SUBVIEW_TEXT_UNLOCK = "PhantomBattle_1103";
exports.GYM_MAX_LEVEL = 7;
exports.positionGymLevel = ["left", "left", "middle", "middle", "right", "right", "right"];
exports.REPEAT_GYM_MAX_DIFFICULTY = 2;
exports.GYM_INERTIA_TWEEN_TIME = 0.618;
exports.GYM_BG_OFFSET_MAX = 330;
exports.GYM_GYM_OFFSET_MIDDLE = -700;
exports.ENTRANCE_TASK_TEXT_ID = "PhantomBattle_1093";
exports.ENTRANCE_SHOP_TEXT_ID = "PhantomBattle_1094";
exports.ENTRANCE_CARD_TEXT_ID = "PhantomBattle_1095";
exports.ENTRANCE_ROLE_TEXT_ID = "PhantomBattle_1096";
exports.ENTRANCE_COLLECTION_TEXT_ID = "PhantomBattle_1097";
exports.ENTRANCE_MAINSHOP_ID = "PhantomBattle_1098";
exports.ENTRANCE_LEVEL_COUNT_ID = "PhantomBattle_1025";
exports.ENTRANCE_SHOP_COUNT_ID = "PhantomBattle_1100";
exports.BVB_SPEEDUP_TIPS = "PhantomBattle_1107";
exports.ENTRANCE_GYM_LOCK_TEXT_ID = "PhantomBattleGym_Locked";
exports.ENTRANCE_NPC_LOCK_TEXT_ID = "PhantomBattleNpc_Locked";
exports.ENTRANCE_MASTER_INFO_EXP_TEXT_ID = "TowerDefence_LV";
exports.COLLECT_BADGE_GROUP_TITLE = "PrefabTextItem_3661046131_Text";
exports.COLLECT_ELEMENT_PHYSICAL_NAME = "PhantomBattle_1123";
exports.HELP_ID_ENTRANCE = 334;
exports.HELP_ID_SHOP = 335;
exports.HELP_ID_COLLECT = 338;
exports.HELP_ID_LEVEL = 341;
exports.INSTANCE_SUCCESS = 3029;
exports.INSTANCE_FAIL = 3030;
exports.TEXT_RESULT_LEVEL_SKILL_DESC = "Text_ResultLevelSkillDesc_Text";
exports.phantomArenaEntranceShopTabIconMap = new Map([["PhantomArenaEntranceTaskTabView", ["SP_IconOutsideShop1Nor", "SP_IconOutsideShop1Sle"]], ["PhantomArenaEntranceShopTabView", ["SP_IconOutsideShop2Nor", "SP_IconOutsideShop2Sle"]]]);
exports.GYM_BG_LEFT_COLOR = "GymTabViewTextureBgLeftColor";
exports.GYM_BG_LEFT_GRAY = "GymTabViewTextureBgLeftGray";
exports.GYM_BG_LEFT_WHITE = "GymTabViewTextureBgLeftWhite";
exports.GYM_BG_MIDDLE_COLOR = "GymTabViewTextureBgMiddleColor";
exports.GYM_BG_MIDDLE_GRAY = "GymTabViewTextureBgMiddleGray";
exports.GYM_BG_MIDDLE_WHITE = "GymTabViewTextureBgMiddleWhite";
exports.GYM_BG_RIGHT_COLOR = "GymTabViewTextureBgRightColor";
exports.GYM_BG_RIGHT_GRAY = "GymTabViewTextureBgRightGray";
exports.DECK_ID_NONE = -1;
exports.DECK_ID_EMPTY_TEMP = -100; //# sourceMappingURL=PhantomArenaDefine.js.map