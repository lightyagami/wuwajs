"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingTowerConfig = undefined;
const MowTowerBuffReById_1 = require("../../../../../Core/Define/ConfigQuery/MowTowerBuffReById");
const MowTowerLevelsReById_1 = require("../../../../../Core/Define/ConfigQuery/MowTowerLevelsReById");
const MowTowerRewardReById_1 = require("../../../../../Core/Define/ConfigQuery/MowTowerRewardReById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class MowingTowerConfig extends ConfigBase_1.ConfigBase {
  GetBossMowingTowerConfigById(e) {
    return MowTowerLevelsReById_1.configMowTowerLevelsReById.GetConfig(e);
  }
  GetMowingTowerRewardById(e) {
    return MowTowerRewardReById_1.configMowTowerRewardReById.GetConfig(e);
  }
  GetMowingTowerBuffById(e) {
    return MowTowerBuffReById_1.configMowTowerBuffReById.GetConfig(e);
  }
}
exports.MowingTowerConfig = MowingTowerConfig;
//# sourceMappingURL=MowingTowerConfig.js.map