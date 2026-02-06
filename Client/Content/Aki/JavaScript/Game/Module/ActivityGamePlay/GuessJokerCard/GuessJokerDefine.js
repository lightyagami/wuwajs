"use strict";

function getCardPositionConfig(e) {
  e = exports.guessJokerCardPositionConfig[e];
  return {
    PositionRate: e.PositionRate ?? 0,
    Spacing: e.Spacing,
    UpOffset: e.UpOffset ?? 70,
    Size: e.Size ?? 1,
    Alpha: e.Alpha ?? 1
  };
}
function calculateCardScaleByIndex(e, t) {
  var o;
  var r;
  if (t <= 1) {
    return exports.GUESS_JOKER_START_CARD_SIZE;
  } else {
    o = (t - 1) / 2;
    if (t % 2 == 0) {
      t = Math.floor(o);
      r = Math.ceil(o);
      if (e <= t) {
        return exports.GUESS_JOKER_START_CARD_SIZE - (t - e) * exports.GUESS_JOKER_START_CARD_SCALE_RANGE;
      } else {
        return exports.GUESS_JOKER_START_CARD_SIZE - (e - r) * exports.GUESS_JOKER_START_CARD_SCALE_RANGE;
      }
    } else {
      t = Math.floor(o);
      r = Math.abs(e - t);
      return exports.GUESS_JOKER_START_CARD_SIZE - r * exports.GUESS_JOKER_START_CARD_SCALE_RANGE;
    }
  }
}
function calculateCardRotation(e, t) {
  var o;
  var r;
  if (t <= 1) {
    return 0;
  } else {
    o = (t - 1) / 2;
    if (t % 2 == 0) {
      t = Math.floor(o);
      r = Math.ceil(o);
      if (e <= t) {
        return exports.GUESS_JOKER_START_CARD_ROTATION + (t - e) * exports.GUESS_JOKER_START_CARD_ROTATION_RANGE;
      } else {
        return -exports.GUESS_JOKER_START_CARD_ROTATION - (e - r) * exports.GUESS_JOKER_START_CARD_ROTATION_RANGE;
      }
    } else {
      return -(e - Math.floor(o)) * exports.GUESS_JOKER_START_CARD_ROTATION_RANGE;
    }
  }
}
function getPokerStateName(e) {
  var t = {
    [0]: "Idle",
    1: "BeChosenCardStrong",
    2: "BeChosenCardWeak",
    3: "BeDrawnCardHappy",
    4: "BeDrawnCardSad",
    5: "DrawCardNormal",
    6: "DrawCardThinking",
    7: "GetCardHappy",
    8: "GetCardSad",
    9: "Win",
    10: "Lose",
    11: "IdelPerformance",
    12: "Unknown"
  };
  return t[e] ?? t[12];
}
function getPokerIdleStateName(e) {
  var t = {
    [0]: "Idle_Normal",
    1: "Idle_Disadvantage",
    2: "Idle_Advantage",
    3: "Idle_Unknown"
  };
  return t[e] ?? t[3];
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPokerIdleStateName = exports.getPokerStateName = exports.GUESS_JOKER_CARD_WIDTH = exports.GUESS_JOKER_CARD_SKILL_EXECUTE_TIME = exports.GUESS_JOKER_CARD_SHOW_TIME = exports.GUESS_JOKER_CARD_AI_CARDS_COUNT_LIMIT_ADVANTAGE = exports.GUESS_JOKER_CARD_PLAYER_CARDS_COUNT_LIMIT_ADVANTAGE = exports.GUESS_JOKER_CARD_AI_CARDS_COUNT_LIMIT = exports.calculateCardRotation = exports.calculateCardScaleByIndex = exports.getCardPositionConfig = exports.GUESS_JOKER_START_CARD_ROTATION_RANGE = exports.GUESS_JOKER_START_CARD_ROTATION = exports.GUESS_JOKER_START_CARD_SCALE_RANGE = exports.GUESS_JOKER_START_CARD_SIZE = exports.guessJokerCardPositionConfig = exports.guessJokerCardStageTransitionMap = exports.GUESS_JOKER_SKILL_PROGRESS_THRESHOLD = exports.GUESS_JOKER_AI_BECHOOSE_CARD_EMOTION_COUNT = exports.GUESS_JOKER_CARD_DISABLE_ALPHA = exports.GUESS_JOKER_CARD_CHECK_ITEM_UP_OFFSET = exports.GUESS_JOKER_AI_CHECK_CARD_MIN_LENGTH = exports.GUESS_JOKER_AI_CHECK_CARD_MAX_LENGTH = exports.GUESS_JOKER_JINXI_LEVEL_ID = exports.GUESS_JOKER_PLAYER_SKILL_ID = exports.GUESS_JOKER_JINXI_SKILL_ID = exports.GUESS_JOKER_JIABEI_SKILL_ID = exports.GUESS_JOKER_LUHESI_SKILL_ID = undefined;
exports.GUESS_JOKER_LUHESI_SKILL_ID = 151001;
exports.GUESS_JOKER_JIABEI_SKILL_ID = 120801;
exports.GUESS_JOKER_JINXI_SKILL_ID = 130401;
exports.GUESS_JOKER_PLAYER_SKILL_ID = 100001;
exports.GUESS_JOKER_JINXI_LEVEL_ID = 1010;
exports.GUESS_JOKER_AI_CHECK_CARD_MAX_LENGTH = 3;
exports.GUESS_JOKER_AI_CHECK_CARD_MIN_LENGTH = 1;
exports.GUESS_JOKER_CARD_CHECK_ITEM_UP_OFFSET = 200;
exports.GUESS_JOKER_CARD_DISABLE_ALPHA = 0.3;
exports.GUESS_JOKER_AI_BECHOOSE_CARD_EMOTION_COUNT = 2;
exports.GUESS_JOKER_SKILL_PROGRESS_THRESHOLD = 0.3;
exports.guessJokerCardStageTransitionMap = {
  [0]: [1],
  1: [2, 6],
  2: [3, 6],
  3: [4, 6],
  4: [5, 6],
  5: [1, 6],
  6: []
};
exports.guessJokerCardPositionConfig = {
  [7]: {
    PositionRate: -18,
    Spacing: 4,
    Size: 0.8
  },
  6: {
    PositionRate: -37,
    Spacing: -50,
    Size: 0.75
  },
  3: {
    PositionRate: -50,
    Spacing: -50,
    Size: 0.75
  },
  4: {
    PositionRate: -50,
    Spacing: -50,
    Size: 0.75
  },
  1: {
    PositionRate: -42,
    Spacing: -50,
    Size: 0.75
  },
  2: {
    PositionRate: -12.5,
    Spacing: 4,
    Size: 0.42,
    Alpha: 0.45
  },
  5: {
    PositionRate: -16,
    Spacing: 8,
    Size: 0.71,
    Alpha: 1
  },
  0: {
    PositionRate: -12.5,
    Spacing: 4,
    Size: 0.42,
    Alpha: 0.45
  }
};
exports.GUESS_JOKER_START_CARD_SIZE = 1;
exports.GUESS_JOKER_START_CARD_SCALE_RANGE = 0;
exports.GUESS_JOKER_START_CARD_ROTATION = 0;
exports.GUESS_JOKER_START_CARD_ROTATION_RANGE = 0;
exports.getCardPositionConfig = getCardPositionConfig;
exports.calculateCardScaleByIndex = calculateCardScaleByIndex;
exports.calculateCardRotation = calculateCardRotation;
exports.GUESS_JOKER_CARD_AI_CARDS_COUNT_LIMIT = 3;
exports.GUESS_JOKER_CARD_PLAYER_CARDS_COUNT_LIMIT_ADVANTAGE = 4;
exports.GUESS_JOKER_CARD_AI_CARDS_COUNT_LIMIT_ADVANTAGE = 4;
exports.GUESS_JOKER_CARD_SHOW_TIME = 1000;
exports.GUESS_JOKER_CARD_SKILL_EXECUTE_TIME = 1500;
exports.GUESS_JOKER_CARD_WIDTH = 240;
exports.getPokerStateName = getPokerStateName;
exports.getPokerIdleStateName = getPokerIdleStateName; //# sourceMappingURL=GuessJokerDefine.js.map