"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levelPlayTypeToNumber = exports.levelPlayStatusLogString = exports.WEEK_SHARE_ID = exports.INVALID_LEVELPLAY_TRACKPRIORITY = exports.INVALID_LEVELPLAYID = exports.GAMEPLAY_FIRST_PROMPT_TYPE_ID = undefined;
exports.GAMEPLAY_FIRST_PROMPT_TYPE_ID = 6000;
exports.INVALID_LEVELPLAYID = 0;
exports.INVALID_LEVELPLAY_TRACKPRIORITY = -10000;
exports.WEEK_SHARE_ID = 1;
exports.levelPlayStatusLogString = {
  [0]: "0-关闭",
  1: "1-等待(客户端完成开启Action后 C2S请求切到Open)",
  2: "2-开启",
  3: "3-完成",
  4: "4-领奖"
};
exports.levelPlayTypeToNumber = {
  SilentArea: 0,
  Challenge: 1,
  Riddle: 2,
  MonsterTreasure: 3,
  Quest: 4,
  Dungeon: 5,
  RebornBoss: 6,
  LordGym: 7,
  SpecialElite: 8,
  HighSpeedMovement: 9,
  DecisionBt: 10,
  NightmareSpawnPoint: 11,
  MonsterKill: 12,
  EntityManage: 13,
  LogicControl: 14,
  BlackSwordChallenge: 15
}; //# sourceMappingURL=LevelPlayDefine.js.map