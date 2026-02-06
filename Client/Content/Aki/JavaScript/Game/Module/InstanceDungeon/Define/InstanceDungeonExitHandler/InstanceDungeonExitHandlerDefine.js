"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dungeonExitHandlerMap = undefined;
const BattleBabelTowerExitHandler_1 = require("./BattleBabelTowerExitHandler");
const BattleShipTowerExitHandler_1 = require("./BattleShipTowerExitHandler");
const FightPhotoExitHandler_1 = require("./FightPhotoExitHandler");
const HonamiStoryExitHandler_1 = require("./HonamiStoryExitHandler");
const LordGymExitHanlder_1 = require("./LordGymExitHanlder");
const LordInInstanceExitHandler_1 = require("./LordInInstanceExitHandler");
const MapRogueExitHandler_1 = require("./MapRogueExitHandler");
const MotorFightExitHandler_1 = require("./MotorFightExitHandler");
const RoguelikeExitHandler_1 = require("./RoguelikeExitHandler");
const RoleTrialExitHandler_1 = require("./RoleTrialExitHandler");
const TowerDefenseExitHandler_1 = require("./TowerDefenseExitHandler");
const TowerExitHandler_1 = require("./TowerExitHandler");
const WheelTowerExitHandler_1 = require("./WheelTowerExitHandler");
exports.dungeonExitHandlerMap = new Map([[21, new TowerDefenseExitHandler_1.TowerDefenseExitHandler()], [30, new BattleBabelTowerExitHandler_1.BattleBabelTowerExitHandler()], [27, new BattleShipTowerExitHandler_1.BattleShipTowerExitHandler()], [34, new MapRogueExitHandler_1.MapRogueExitHandler()], [15, new RoguelikeExitHandler_1.RoguelikeExitHandler()], [29, new RoguelikeExitHandler_1.RoguelikeExitHandler()], [17, new TowerExitHandler_1.TowerExitHandler()], [18, new TowerExitHandler_1.TowerExitHandler()], [42, new FightPhotoExitHandler_1.FightPhotoExitHandler()], [40, new RoleTrialExitHandler_1.RoleTrialExitHandler()], [3, new LordInInstanceExitHandler_1.LordInInstanceExitHandler()], [39, new HonamiStoryExitHandler_1.HonamiStoryExitHandler()], [4, new LordInInstanceExitHandler_1.LordInInstanceExitHandler()], [48, new LordGymExitHanlder_1.LordGymExitHandler()], [47, new WheelTowerExitHandler_1.WheelTowerExitHandler()], [44, new MotorFightExitHandler_1.MotorFightExitHandler()]]);
//# sourceMappingURL=InstanceDungeonExitHandlerDefine.js.map