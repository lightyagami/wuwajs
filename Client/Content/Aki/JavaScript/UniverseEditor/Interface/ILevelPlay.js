"use strict";

var ELevelPlayExploratoryCheckTiming;
var ELevelPlayInteractResetTime;
var ELevelPlayInfoMappingType;
var ETrapDefenseSpawnMonsterCondition;
var EMonsterSourceType;
var ERollBlockGridType;
var ERollBlockBlockType;
var ERollBlockItemType;
var ERollBlockLayType;
var ERollBlockHintStepType;
var EFindSunSpiritGridType;
var EFindSunSpiritGridState;
function isRollBlockWalkableGrid(e) {
  return [ERollBlockGridType.Floor, ERollBlockGridType.Goal, ERollBlockGridType.LinkGoal, ERollBlockGridType.JumpFloor, ERollBlockGridType.FallFloor, ERollBlockGridType.BreakTrigger, ERollBlockGridType.Quantum].includes(e);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EFindSunSpiritGridState = exports.EFindSunSpiritGridType = exports.ERollBlockHintStepType = exports.ERollBlockLayType = exports.ERollBlockItemType = exports.ERollBlockBlockType = exports.isRollBlockWalkableGrid = exports.ERollBlockGridType = exports.EMonsterSourceType = exports.ETrapDefenseSpawnMonsterCondition = exports.ELevelPlayInfoMappingType = exports.decisionBtTypeNameMap = exports.levelPlayTypeNameMap = exports.ELevelPlayInteractResetTime = exports.ELevelPlayExploratoryCheckTiming = undefined;
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
  BlackSwordChallenge: "黑剑挑战",
  EntityManage: "实体管理",
  LogicControl: "逻辑控制",
  SilentArea: "无音区",
  NightmareSpawnPoint: "梦魇刷怪点",
  MonsterSettlement: "怪物聚落",
  LordGym: "全息战略",
  RebornBoss: "大世界复刷领主",
  Dungeon: "副本主控",
  DecisionBt: "副本决策行为树"
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
(EMonsterSourceType = exports.EMonsterSourceType ||= {}).EntityTemplate = "EntityTemplate";
(function (e) {
  e.Empty = "Empty";
  e.Floor = "Floor";
  e.Goal = "Goal";
  e.LinkGoal = "LinkGoal";
  e.JumpFloor = "JumpFloor";
  e.FallFloor = "FallFloor";
  e.BreakTrigger = "BreakTrigger";
  e.Quantum = "Quantum";
  e.Laser = "Laser";
})(ERollBlockGridType = exports.ERollBlockGridType ||= {});
exports.isRollBlockWalkableGrid = isRollBlockWalkableGrid;
(function (e) {
  e.Block1 = "Block1";
  e.Block2 = "Block2";
})(ERollBlockBlockType = exports.ERollBlockBlockType ||= {});
(function (e) {
  e.BreakableObstacle = "BreakableObstacle";
  e.QuantumObstacle = "QuantumObstacle";
  e.LaserEmitter = "LaserEmitter";
})(ERollBlockItemType = exports.ERollBlockItemType ||= {});
(function (e) {
  e.Left = "Left";
  e.Right = "Right";
  e.Forward = "Forward";
  e.Backward = "Backward";
})(ERollBlockLayType = exports.ERollBlockLayType ||= {});
(function (e) {
  e.Roll = "Roll";
  e.Jump = "Jump";
  e.Operation = "Operation";
})(ERollBlockHintStepType = exports.ERollBlockHintStepType ||= {});
(function (e) {
  e[e.Empty = 0] = "Empty";
  e[e.NormalFloor = 1] = "NormalFloor";
  e[e.MutableFloor = 2] = "MutableFloor";
  e[e.BeginFloor = 3] = "BeginFloor";
  e[e.EndFloor = 4] = "EndFloor";
})(EFindSunSpiritGridType = exports.EFindSunSpiritGridType ||= {});
(function (e) {
  e[e.Virtual = 0] = "Virtual";
  e[e.Physical = 1] = "Physical";
})(EFindSunSpiritGridState = exports.EFindSunSpiritGridState ||= {}); //# sourceMappingURL=ILevelPlay.js.map