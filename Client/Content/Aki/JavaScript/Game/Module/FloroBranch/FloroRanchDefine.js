"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FLORO_RANCH_HIGH_SPEED = exports.FLORO_RANCH_MID_SPEED = exports.FLORO_RANCH_DEFAULT_SPEED = exports.FLORO_RANCH_CARD_OFFSET_Z = exports.FLORO_RANCH_HELP_ID = exports.FLORO_RANCH_GAME_PLAY_HELP_ID = exports.FLORO_RANCH_POPUP_REWARD_RED_COIN_COUNT = exports.FLORO_RANCH_POPUP_REWARD_YELLOW_COIN_COUNT = exports.FLORO_RANCH_TOY_SKILL_ANIM_WAIT_TIME = exports.FLORO_RANCH_CARD_ITEM_ANIM_GAP_TIME = exports.FLORO_RANCH_TERRAIN_TIP_HEIGHT_SHORT = exports.FLORO_RANCH_TERRAIN_TIP_HEIGHT_HIGHER = exports.FLORO_RANCH_TERRAIN_ITEM_COUNT = exports.FLORO_RANCH_DAY_WAGE_TASK_WAIT_TIME_4 = exports.FLORO_RANCH_DAY_WAGE_TASK_WAIT_TIME_3 = exports.FLORO_RANCH_DAY_WAGE_TASK_WAIT_TIME_2 = exports.FLORO_RANCH_DAY_WAGE_TASK_WAIT_TIME = exports.FLORO_RANCH_DAY_ACTION_WAIT_TIME = exports.FLORO_RANCH_DAY_START_TASK_WAIT_TIME = exports.FLORO_RANCH_CARD_ITEM_MAX_HIERACHY = exports.FLORO_RANCH_CARD_EVOLVE_UP_TIME = exports.FLORO_RANCH_CARD_FUSION_SHOW_TIME = exports.FLORO_RANCH_CARD_FUSION_HIDE_TIME = exports.FLORO_RANCH_CARD_SACRIFICE_TIME = exports.FLORO_RANCH_CARD_BE_EAT_TIME = exports.FLORO_RANCH_CARD_EAT_TIME = exports.FLORO_RANCH_CARD_MOVE_TIME = exports.FLORO_RANCH_CARD_NORAML_WAIT_ANIM_TIME = exports.FLORO_RANCH_CARD_HIDE_ANIM_WAIT_TIME = exports.FLORO_RANCH_CARD_SHOW_ANIM_WAIT_TIME = exports.floroRanchRewardLeftDirection = exports.floroRanchRewardRightDirection = exports.FLORO_RANCH_BEZIER_CENTER_FACTOR = exports.FLORO_RANCH_BEZIER_FACTOR = exports.floroRanchRewardPopUpSpeed = exports.floroRanchPopupRewardOffset = exports.FLORO_RANCH_REWARD_POPUP_WAIT_TIME_4 = exports.FLORO_RANCH_REWARD_POPUP_WAIT_TIME_3 = exports.FLORO_RANCH_REWARD_POPUP_WAIT_TIME_2 = exports.FLORO_RANCH_REWARD_POPUP_WAIT_TIME = exports.FLORO_RANCH_REWARD_COIN_BEZIER_WAIT_TIME = exports.FLORO_RANCH_REWARD_COIN_BEZIER_TIME_4 = exports.FLORO_RANCH_REWARD_COIN_BEZIER_TIME_3 = exports.FLORO_RANCH_REWARD_COIN_BEZIER_TIME_2 = exports.FLORO_RANCH_REWARD_COIN_BEZIER_TIME = exports.FLORO_RANCH_REWARD_POPUP_STAY_TIME_4 = exports.FLORO_RANCH_REWARD_POPUP_STAY_TIME_3 = exports.FLORO_RANCH_REWARD_POPUP_STAY_TIME_2 = exports.FLORO_RANCH_REWARD_POPUP_STAY_TIME = exports.FLORO_RANCH_REWARD_POPUP_TIME = undefined;
exports.entityTypePriority = exports.FloroRanchSelectRaceData = exports.floroRanchDifficultyTextId = exports.floroRanchStageTransitionMap = exports.FLORO_RANCH_DEBUG_INFO_ITEM_PATH = exports.floroRanchSpeedTimeMap = exports.floroRanchEndlessSpeedList = exports.floroRanchSpeedList = exports.FLORO_RANCH_SKIP_SPEED = exports.FLORO_RANCH_MAX_SPEED = undefined;
const Vector_1 = require("../../../Core/Utils/Math/Vector");
exports.FLORO_RANCH_REWARD_POPUP_TIME = 500;
exports.FLORO_RANCH_REWARD_POPUP_STAY_TIME = 500;
exports.FLORO_RANCH_REWARD_POPUP_STAY_TIME_2 = 1000;
exports.FLORO_RANCH_REWARD_POPUP_STAY_TIME_3 = 2000;
exports.FLORO_RANCH_REWARD_POPUP_STAY_TIME_4 = 2000;
exports.FLORO_RANCH_REWARD_COIN_BEZIER_TIME = 500;
exports.FLORO_RANCH_REWARD_COIN_BEZIER_TIME_2 = 800;
exports.FLORO_RANCH_REWARD_COIN_BEZIER_TIME_3 = 1200;
exports.FLORO_RANCH_REWARD_COIN_BEZIER_TIME_4 = 12000;
exports.FLORO_RANCH_REWARD_COIN_BEZIER_WAIT_TIME = 20;
exports.FLORO_RANCH_REWARD_POPUP_WAIT_TIME = 200;
exports.FLORO_RANCH_REWARD_POPUP_WAIT_TIME_2 = 500;
exports.FLORO_RANCH_REWARD_POPUP_WAIT_TIME_3 = 1000;
exports.FLORO_RANCH_REWARD_POPUP_WAIT_TIME_4 = 1000;
exports.floroRanchPopupRewardOffset = Vector_1.Vector.Create(0, 0, 100);
exports.floroRanchRewardPopUpSpeed = Vector_1.Vector.Create(100, 100, 0);
exports.FLORO_RANCH_BEZIER_FACTOR = 0.5;
exports.FLORO_RANCH_BEZIER_CENTER_FACTOR = 0.5;
exports.floroRanchRewardRightDirection = Vector_1.Vector.Create(0, 1, 0);
exports.floroRanchRewardLeftDirection = Vector_1.Vector.Create(0, -1, 0);
exports.FLORO_RANCH_CARD_SHOW_ANIM_WAIT_TIME = 200;
exports.FLORO_RANCH_CARD_HIDE_ANIM_WAIT_TIME = 200;
exports.FLORO_RANCH_CARD_NORAML_WAIT_ANIM_TIME = 200;
exports.FLORO_RANCH_CARD_MOVE_TIME = 500;
exports.FLORO_RANCH_CARD_EAT_TIME = 1000;
exports.FLORO_RANCH_CARD_BE_EAT_TIME = 1000;
exports.FLORO_RANCH_CARD_SACRIFICE_TIME = 1250;
exports.FLORO_RANCH_CARD_FUSION_HIDE_TIME = 1000;
exports.FLORO_RANCH_CARD_FUSION_SHOW_TIME = 1000;
exports.FLORO_RANCH_CARD_EVOLVE_UP_TIME = 1000;
exports.FLORO_RANCH_CARD_ITEM_MAX_HIERACHY = 99;
exports.FLORO_RANCH_DAY_START_TASK_WAIT_TIME = 1000;
exports.FLORO_RANCH_DAY_ACTION_WAIT_TIME = 1000;
exports.FLORO_RANCH_DAY_WAGE_TASK_WAIT_TIME = 2500;
exports.FLORO_RANCH_DAY_WAGE_TASK_WAIT_TIME_2 = 3500;
exports.FLORO_RANCH_DAY_WAGE_TASK_WAIT_TIME_3 = 5000;
exports.FLORO_RANCH_DAY_WAGE_TASK_WAIT_TIME_4 = 15000;
exports.FLORO_RANCH_TERRAIN_ITEM_COUNT = 20;
exports.FLORO_RANCH_TERRAIN_TIP_HEIGHT_HIGHER = 380;
exports.FLORO_RANCH_TERRAIN_TIP_HEIGHT_SHORT = 240;
exports.FLORO_RANCH_CARD_ITEM_ANIM_GAP_TIME = 50;
exports.FLORO_RANCH_TOY_SKILL_ANIM_WAIT_TIME = 200;
exports.FLORO_RANCH_POPUP_REWARD_YELLOW_COIN_COUNT = 100;
exports.FLORO_RANCH_POPUP_REWARD_RED_COIN_COUNT = 1000;
exports.FLORO_RANCH_GAME_PLAY_HELP_ID = 354;
exports.FLORO_RANCH_HELP_ID = 347;
exports.FLORO_RANCH_CARD_OFFSET_Z = 40;
exports.FLORO_RANCH_DEFAULT_SPEED = 1;
exports.FLORO_RANCH_MID_SPEED = 3;
exports.FLORO_RANCH_HIGH_SPEED = 5;
exports.FLORO_RANCH_MAX_SPEED = 50;
exports.FLORO_RANCH_SKIP_SPEED = 99;
exports.floroRanchSpeedList = [exports.FLORO_RANCH_DEFAULT_SPEED, exports.FLORO_RANCH_MID_SPEED, exports.FLORO_RANCH_HIGH_SPEED];
exports.floroRanchEndlessSpeedList = [exports.FLORO_RANCH_DEFAULT_SPEED, exports.FLORO_RANCH_MID_SPEED, exports.FLORO_RANCH_HIGH_SPEED, exports.FLORO_RANCH_MAX_SPEED];
exports.floroRanchSpeedTimeMap = {
  [exports.FLORO_RANCH_DEFAULT_SPEED]: {
    PopupRewardStayTime: exports.FLORO_RANCH_REWARD_POPUP_STAY_TIME,
    PopupRewardWaitTime: exports.FLORO_RANCH_REWARD_POPUP_WAIT_TIME,
    BezierCurveTime: exports.FLORO_RANCH_REWARD_COIN_BEZIER_TIME,
    WageSettleWaitTime: exports.FLORO_RANCH_DAY_WAGE_TASK_WAIT_TIME
  },
  [exports.FLORO_RANCH_MID_SPEED]: {
    PopupRewardStayTime: exports.FLORO_RANCH_REWARD_POPUP_STAY_TIME_2,
    PopupRewardWaitTime: exports.FLORO_RANCH_REWARD_POPUP_WAIT_TIME_2,
    BezierCurveTime: exports.FLORO_RANCH_REWARD_COIN_BEZIER_TIME_2,
    WageSettleWaitTime: exports.FLORO_RANCH_DAY_WAGE_TASK_WAIT_TIME_2
  },
  [exports.FLORO_RANCH_HIGH_SPEED]: {
    PopupRewardStayTime: exports.FLORO_RANCH_REWARD_POPUP_STAY_TIME_3,
    PopupRewardWaitTime: exports.FLORO_RANCH_REWARD_POPUP_WAIT_TIME_3,
    BezierCurveTime: exports.FLORO_RANCH_REWARD_COIN_BEZIER_TIME_3,
    WageSettleWaitTime: exports.FLORO_RANCH_DAY_WAGE_TASK_WAIT_TIME_3
  },
  [exports.FLORO_RANCH_MAX_SPEED]: {
    PopupRewardStayTime: exports.FLORO_RANCH_REWARD_POPUP_STAY_TIME_4,
    PopupRewardWaitTime: exports.FLORO_RANCH_REWARD_POPUP_WAIT_TIME_4,
    BezierCurveTime: exports.FLORO_RANCH_REWARD_COIN_BEZIER_TIME_4,
    WageSettleWaitTime: exports.FLORO_RANCH_DAY_WAGE_TASK_WAIT_TIME_4
  }
};
exports.FLORO_RANCH_DEBUG_INFO_ITEM_PATH = "/Game/Aki/UI/UIResources/UiActivity/Prefabs/Activity25/Pasture/UiItem_FloroRanchEntityInfo.UiItem_FloroRanchEntityInfo";
exports.floroRanchStageTransitionMap = {
  [0]: [1],
  1: [2, 4, 5],
  2: [3, 4, 5],
  3: [5],
  4: [2, 5],
  5: []
};
exports.floroRanchDifficultyTextId = {
  [1]: "Farm_Difficulty1",
  2: "Farm_Difficulty2",
  3: "Farm_Difficulty3"
};
class FloroRanchSelectRaceData {
  constructor(e, t) {
    this.RaceId = e;
    this.SubDungeonData = t;
  }
}
exports.FloroRanchSelectRaceData = FloroRanchSelectRaceData;
exports.entityTypePriority = {
  [1]: 1,
  2: 2,
  0: 3
}; //# sourceMappingURL=FloroRanchDefine.js.map