"use strict";

var ELevelPlayExploratoryCheckTiming;
var ELevelPlayInteractResetTime;
var ELevelPlayInfoMappingType;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ELevelPlayInfoMappingType = exports.decisionBtTypeNameMap = exports.levelPlayTypeNameMap = exports.ELevelPlayInteractResetTime = exports.ELevelPlayExploratoryCheckTiming = undefined;
(function (e) {
  e[e.OnCompletion = 0] = "OnCompletion";
})(ELevelPlayExploratoryCheckTiming = exports.ELevelPlayExploratoryCheckTiming ||= {});
(function (e) {
  e.Weekly = "Weekly";
  e.Daily = "Daily";
  e.MidNight = "MidNight";
})(ELevelPlayInteractResetTime = exports.ELevelPlayInteractResetTime ||= {});
exports.levelPlayTypeNameMap = {
  SilentArea: "无音区",
  MonsterTreasure: "怪守宝箱",
  LordGym: "全息战略",
  Challenge: "战斗挑战",
  Riddle: "机关解密",
  Quest: "任务玩法",
  Dungeon: "副本主控",
  SpecialElite: "特殊红名精英",
  HighSpeedMovement: "高速移动挑战",
  RebornBoss: "大世界复刷领主",
  DecisionBt: "副本决策行为树",
  NightmareSpawnPoint: "梦魇刷怪点"
};
exports.decisionBtTypeNameMap = {
  Bvb: "声骸竞技场"
};
(function (e) {
  e[e.PunishReport = 0] = "PunishReport";
  e[e.SoaringChallenge = 1] = "SoaringChallenge";
  e[e.NightmareSpawnPoint = 2] = "NightmareSpawnPoint";
})(ELevelPlayInfoMappingType = exports.ELevelPlayInfoMappingType ||= {}); //# sourceMappingURL=ILevelPlay.js.map