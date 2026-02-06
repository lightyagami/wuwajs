"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowConfig = undefined;
const MotorFightBossRefreshById_1 = require("../../../Core/Define/ConfigQuery/MotorFightBossRefreshById");
const MotorFightBuffEffectById_1 = require("../../../Core/Define/ConfigQuery/MotorFightBuffEffectById");
const MotorFightBuffGateById_1 = require("../../../Core/Define/ConfigQuery/MotorFightBuffGateById");
const MotorFightBuffGateRefreshById_1 = require("../../../Core/Define/ConfigQuery/MotorFightBuffGateRefreshById");
const MotorFightItemById_1 = require("../../../Core/Define/ConfigQuery/MotorFightItemById");
const MotorFightItemTypeById_1 = require("../../../Core/Define/ConfigQuery/MotorFightItemTypeById");
const MotorFightMainLevelByInstId_1 = require("../../../Core/Define/ConfigQuery/MotorFightMainLevelByInstId");
const MotorFightMainLevelByLevelId_1 = require("../../../Core/Define/ConfigQuery/MotorFightMainLevelByLevelId");
const MotorFightMonsterRefreshById_1 = require("../../../Core/Define/ConfigQuery/MotorFightMonsterRefreshById");
const MotorFightQualityById_1 = require("../../../Core/Define/ConfigQuery/MotorFightQualityById");
const MotorFightRoleById_1 = require("../../../Core/Define/ConfigQuery/MotorFightRoleById");
const MotorFightSubLevelBySubLevelId_1 = require("../../../Core/Define/ConfigQuery/MotorFightSubLevelBySubLevelId");
const MotorFightWaveByWaveId_1 = require("../../../Core/Define/ConfigQuery/MotorFightWaveByWaveId");
const MotorFightWaveGroupById_1 = require("../../../Core/Define/ConfigQuery/MotorFightWaveGroupById");
const MotorMonsterById_1 = require("../../../Core/Define/ConfigQuery/MotorMonsterById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class MotorcycleArrowConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  GetLevelByInstId(e) {
    return MotorFightMainLevelByInstId_1.configMotorFightMainLevelByInstId.GetConfig(e);
  }
  GetLevelByLevelId(e) {
    return MotorFightMainLevelByLevelId_1.configMotorFightMainLevelByLevelId.GetConfig(e);
  }
  GetMotorFightRoleById(e) {
    return MotorFightRoleById_1.configMotorFightRoleById.GetConfig(e);
  }
  GetSubLevelByInstId(e) {
    return MotorFightSubLevelBySubLevelId_1.configMotorFightSubLevelBySubLevelId.GetConfig(e);
  }
  GetMotorFightWaveGroupById(e) {
    return MotorFightWaveGroupById_1.configMotorFightWaveGroupById.GetConfig(e);
  }
  GetMotorFightWaveById(e) {
    return MotorFightWaveByWaveId_1.configMotorFightWaveByWaveId.GetConfig(e);
  }
  GetMonsterRefreshById(e) {
    return MotorFightMonsterRefreshById_1.configMotorFightMonsterRefreshById.GetConfig(e);
  }
  GetBossRefreshById(e) {
    return MotorFightBossRefreshById_1.configMotorFightBossRefreshById.GetConfig(e);
  }
  GetMonsterConfigById(e) {
    return MotorMonsterById_1.configMotorMonsterById.GetConfig(e);
  }
  GetBuffRefreshByRefreshId(e) {
    return MotorFightBuffGateRefreshById_1.configMotorFightBuffGateRefreshById.GetConfig(e);
  }
  GetBuffGateConfigById(e) {
    return MotorFightBuffGateById_1.configMotorFightBuffGateById.GetConfig(e);
  }
  GetBuffGateByRefreshId(e) {
    e = this.GetBuffRefreshByRefreshId(e);
    if (e) {
      return this.GetBuffGateConfigById(e.BuffGateId);
    }
  }
  GetBuffEffectById(e) {
    return MotorFightBuffEffectById_1.configMotorFightBuffEffectById.GetConfig(e);
  }
  GetCollectionItemConfigById(e) {
    return MotorFightItemById_1.configMotorFightItemById.GetConfig(e);
  }
  GetCollectionTypeConfigById(e) {
    return MotorFightItemTypeById_1.configMotorFightItemTypeById.GetConfig(e);
  }
  GetMotorFightQuality(e) {
    return MotorFightQualityById_1.configMotorFightQualityById.GetConfig(e);
  }
}
exports.MotorcycleArrowConfig = MotorcycleArrowConfig;
//# sourceMappingURL=MotorcycleArrowConfig.js.map