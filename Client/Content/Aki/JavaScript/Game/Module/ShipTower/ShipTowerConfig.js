"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerConfig = undefined;
const SlashAndTowerCfgById_1 = require("../../../Core/Define/ConfigQuery/SlashAndTowerCfgById");
const SlashAndTowerCfgBySeason_1 = require("../../../Core/Define/ConfigQuery/SlashAndTowerCfgBySeason");
const SlashAndTowerRewardByBelongToSeason_1 = require("../../../Core/Define/ConfigQuery/SlashAndTowerRewardByBelongToSeason");
const SlashAndTowerSeasonById_1 = require("../../../Core/Define/ConfigQuery/SlashAndTowerSeasonById");
const SlashBuffToItemAll_1 = require("../../../Core/Define/ConfigQuery/SlashBuffToItemAll");
const SlashBuffToItemById_1 = require("../../../Core/Define/ConfigQuery/SlashBuffToItemById");
const SlashBuffToItemByItemId_1 = require("../../../Core/Define/ConfigQuery/SlashBuffToItemByItemId");
const SlashBuffToItemByItemIdAndSeason_1 = require("../../../Core/Define/ConfigQuery/SlashBuffToItemByItemIdAndSeason");
const SlashBuffToItemByItemIdList_1 = require("../../../Core/Define/ConfigQuery/SlashBuffToItemByItemIdList");
const SlashBuffToItemBySeason_1 = require("../../../Core/Define/ConfigQuery/SlashBuffToItemBySeason");
const SlashTowerShowStageAll_1 = require("../../../Core/Define/ConfigQuery/SlashTowerShowStageAll");
const SlashTowerStageInfoByInstId_1 = require("../../../Core/Define/ConfigQuery/SlashTowerStageInfoByInstId");
const SlashTowerTagInfoById_1 = require("../../../Core/Define/ConfigQuery/SlashTowerTagInfoById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ShipTowerConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  GetStageCfgById(e) {
    return SlashAndTowerCfgById_1.configSlashAndTowerCfgById.GetConfig(e);
  }
  GetAllShowStageCfg() {
    return SlashTowerShowStageAll_1.configSlashTowerShowStageAll.GetConfigList();
  }
  GetStageInfoCfgByInstId(e) {
    return SlashTowerStageInfoByInstId_1.configSlashTowerStageInfoByInstId.GetConfig(e);
  }
  GetStageCfgBySeason(e) {
    return SlashAndTowerCfgBySeason_1.configSlashAndTowerCfgBySeason.GetConfigList(e);
  }
  GetChallengeRewardCfgBySeason(e) {
    return SlashAndTowerRewardByBelongToSeason_1.configSlashAndTowerRewardByBelongToSeason.GetConfigList(e);
  }
  GetAllBuffCfg() {
    return SlashBuffToItemAll_1.configSlashBuffToItemAll.GetConfigList();
  }
  GetBuffCfgById(e) {
    return SlashBuffToItemById_1.configSlashBuffToItemById.GetConfig(e);
  }
  GetBuffCfgByItemId(e) {
    return SlashBuffToItemByItemId_1.configSlashBuffToItemByItemId.GetConfig(e);
  }
  GetBuffCfgBySeason(e) {
    return SlashBuffToItemBySeason_1.configSlashBuffToItemBySeason.GetConfigList(e);
  }
  GetBuffCfgByItemIdAndSeason(e, r) {
    return SlashBuffToItemByItemIdAndSeason_1.configSlashBuffToItemByItemIdAndSeason.GetConfig(e, r);
  }
  GetBuffCfgByItemIdList(e) {
    return SlashBuffToItemByItemIdList_1.configSlashBuffToItemByItemIdList.GetConfigList(e);
  }
  GetWordInfoCfgById(e) {
    return SlashTowerTagInfoById_1.configSlashTowerTagInfoById.GetConfig(e);
  }
  GetSeasonCfgById(e) {
    return SlashAndTowerSeasonById_1.configSlashAndTowerSeasonById.GetConfig(e);
  }
}
exports.ShipTowerConfig = ShipTowerConfig;
//# sourceMappingURL=ShipTowerConfig.js.map