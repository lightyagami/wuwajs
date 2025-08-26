"use strict";

var ELevelPlayExploratoryCheckTiming;
var ELevelPlayInteractResetTime;
var ELevelPlayInfoMappingType;
var ETrapDefenseSpawnMonsterCondition;
var EMonsterSourceType;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EMonsterSourceType = exports.ETrapDefenseSpawnMonsterCondition = exports.ELevelPlayInfoMappingType = exports.decisionBtTypeNameMap = exports.levelPlayTypeNameMap = exports.ELevelPlayInteractResetTime = exports.ELevelPlayExploratoryCheckTiming = undefined;
(function (e) {
  e[e.OnCompletion = 0] = "OnCompletion";
})(ELevelPlayExploratoryCheckTiming = exports.ELevelPlayExploratoryCheckTiming ||= {});
(function (e) {
  e.Weekly = "Weekly";
  e.Daily = "Daily";
  e.MidNight = "MidNight";
})(ELevelPlayInteractResetTime = exports.ELevelPlayInteractResetTime ||= {});
exports.levelPlayTypeNameMap = {
  MonsterTreasure: "怪守宝箱",
  MonsterKill: "复合杀怪",
  SpecialElite: "特殊红名精英",
  Riddle: "机关解密",
  Quest: "任务玩法",
  Challenge: "战斗挑战",
  HighSpeedMovement: "高速移动挑战",
  SilentArea: "无音区",
  NightmareSpawnPoint: "梦魇刷怪点",
  LordGym: "全息战略",
  RebornBoss: "大世界复刷领主",
  Dungeon: "副本主控",
  DecisionBt: "副本决策行为树",
  BlackSwordChallenge: "黑剑挑战"
};
exports.decisionBtTypeNameMap = {
  Bvb: "声骸竞技场"
};
(function (e) {
  e[e.PunishReport = 0] = "PunishReport";
  e[e.SoaringChallenge = 1] = "SoaringChallenge";
  e[e.NightmareSpawnPoint = 2] = "NightmareSpawnPoint";
})(ELevelPlayInfoMappingType = exports.ELevelPlayInfoMappingType ||= {});
(function (e) {
  e.Completed = "Completed";
  e.Open = "Open";
  e.AllOpenedIsCompletion = "AllOpenedIsCompletion";
})(ETrapDefenseSpawnMonsterCondition = exports.ETrapDefenseSpawnMonsterCondition ||= {});
(EMonsterSourceType = exports.EMonsterSourceType ||= {}).EntityTemplate = "EntityTemplate"; //# sourceMappingURL=ILevelPlay.js.map