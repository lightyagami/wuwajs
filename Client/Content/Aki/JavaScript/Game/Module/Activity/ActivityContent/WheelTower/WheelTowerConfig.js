"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerConfig = undefined;
const NewTowerBuffById_1 = require("../../../../../Core/Define/ConfigQuery/NewTowerBuffById");
const NewTowerLevelByCycleId_1 = require("../../../../../Core/Define/ConfigQuery/NewTowerLevelByCycleId");
const NewTowerLevelById_1 = require("../../../../../Core/Define/ConfigQuery/NewTowerLevelById");
const NewTowerParamByCycleId_1 = require("../../../../../Core/Define/ConfigQuery/NewTowerParamByCycleId");
const NewTowerRoleAll_1 = require("../../../../../Core/Define/ConfigQuery/NewTowerRoleAll");
const NewTowerRoleById_1 = require("../../../../../Core/Define/ConfigQuery/NewTowerRoleById");
const NewTowerScoreRewardById_1 = require("../../../../../Core/Define/ConfigQuery/NewTowerScoreRewardById");
const NewTowerScoreRewardByLevelId_1 = require("../../../../../Core/Define/ConfigQuery/NewTowerScoreRewardByLevelId");
const NewTowerTagById_1 = require("../../../../../Core/Define/ConfigQuery/NewTowerTagById");
const NewTowerWaveById_1 = require("../../../../../Core/Define/ConfigQuery/NewTowerWaveById");
const NewTowerWaveByLevel_1 = require("../../../../../Core/Define/ConfigQuery/NewTowerWaveByLevel");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class WheelTowerConfig extends ConfigBase_1.ConfigBase {
  GetTowerConfig(e) {
    return NewTowerParamByCycleId_1.configNewTowerParamByCycleId.GetConfig(e);
  }
  GetLevelConfigById(e) {
    return NewTowerLevelById_1.configNewTowerLevelById.GetConfig(e);
  }
  GetLevelConfigListByCycleId(e) {
    return NewTowerLevelByCycleId_1.configNewTowerLevelByCycleId.GetConfigList(e);
  }
  GetWaveConfigById(e) {
    return NewTowerWaveById_1.configNewTowerWaveById.GetConfig(e);
  }
  GetWaveConfigListByLevelId(e) {
    return NewTowerWaveByLevel_1.configNewTowerWaveByLevel.GetConfigList(e);
  }
  GetBuffConfigById(e) {
    return NewTowerBuffById_1.configNewTowerBuffById.GetConfig(e);
  }
  GetRewardConfigById(e) {
    return NewTowerScoreRewardById_1.configNewTowerScoreRewardById.GetConfig(e);
  }
  GetRewardConfigListByLevelId(e) {
    return NewTowerScoreRewardByLevelId_1.configNewTowerScoreRewardByLevelId.GetConfigList(e);
  }
  GetRoleConfigList() {
    return NewTowerRoleAll_1.configNewTowerRoleAll.GetConfigList();
  }
  GetRoleConfigByRoleId(e) {
    return NewTowerRoleById_1.configNewTowerRoleById.GetConfig(e);
  }
  GetTagConfigByTagId(e) {
    return NewTowerTagById_1.configNewTowerTagById.GetConfig(e);
  }
}
exports.WheelTowerConfig = WheelTowerConfig;
//# sourceMappingURL=WheelTowerConfig.js.map