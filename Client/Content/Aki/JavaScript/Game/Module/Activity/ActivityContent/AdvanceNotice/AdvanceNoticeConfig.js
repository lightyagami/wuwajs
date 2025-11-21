"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeConfig = undefined;
const AdvertisingPageInfoByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/AdvertisingPageInfoByActivityId");
const AdvertisingPageInfoById_1 = require("../../../../../Core/Define/ConfigQuery/AdvertisingPageInfoById");
const AdvertisingTabActivityById_1 = require("../../../../../Core/Define/ConfigQuery/AdvertisingTabActivityById");
const AdvertisingTabCharacterById_1 = require("../../../../../Core/Define/ConfigQuery/AdvertisingTabCharacterById");
const AdvertisingTabCostumeById_1 = require("../../../../../Core/Define/ConfigQuery/AdvertisingTabCostumeById");
const AdvertisingTabEnemyById_1 = require("../../../../../Core/Define/ConfigQuery/AdvertisingTabEnemyById");
const AdvertisingTabInfoById_1 = require("../../../../../Core/Define/ConfigQuery/AdvertisingTabInfoById");
const AdvertisingTabRegionById_1 = require("../../../../../Core/Define/ConfigQuery/AdvertisingTabRegionById");
const AdvertisingTabStoryById_1 = require("../../../../../Core/Define/ConfigQuery/AdvertisingTabStoryById");
const AdvertisingTabSystemById_1 = require("../../../../../Core/Define/ConfigQuery/AdvertisingTabSystemById");
const AdvertisingUrlConfigById_1 = require("../../../../../Core/Define/ConfigQuery/AdvertisingUrlConfigById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class AdvanceNoticeConfig extends ConfigBase_1.ConfigBase {
  GetAdvertisingPageInfoById(e) {
    return AdvertisingPageInfoById_1.configAdvertisingPageInfoById.GetConfig(e);
  }
  GetAdvertisingPageInfoByActivityId(e) {
    return AdvertisingPageInfoByActivityId_1.configAdvertisingPageInfoByActivityId.GetConfig(e);
  }
  GetAdvertisingTabInfoById(e) {
    return AdvertisingTabInfoById_1.configAdvertisingTabInfoById.GetConfig(e);
  }
  GetAdvertisingTabCharacterById(e) {
    return AdvertisingTabCharacterById_1.configAdvertisingTabCharacterById.GetConfig(e);
  }
  GetAdvertisingTabEnemyById(e) {
    return AdvertisingTabEnemyById_1.configAdvertisingTabEnemyById.GetConfig(e);
  }
  GetAdvertisingTabStoryById(e) {
    return AdvertisingTabStoryById_1.configAdvertisingTabStoryById.GetConfig(e);
  }
  GetAdvertisingTabRegionById(e) {
    return AdvertisingTabRegionById_1.configAdvertisingTabRegionById.GetConfig(e);
  }
  GetAdvertisingTabCostumeById(e) {
    return AdvertisingTabCostumeById_1.configAdvertisingTabCostumeById.GetConfig(e);
  }
  GetAdvertisingTabActivityById(e) {
    return AdvertisingTabActivityById_1.configAdvertisingTabActivityById.GetConfig(e);
  }
  GetAdvertisingTabSystemById(e) {
    return AdvertisingTabSystemById_1.configAdvertisingTabSystemById.GetConfig(e);
  }
  GetAdvertisingUrlConfigById(e) {
    return AdvertisingUrlConfigById_1.configAdvertisingUrlConfigById.GetConfig(e);
  }
}
exports.AdvanceNoticeConfig = AdvanceNoticeConfig;
//# sourceMappingURL=AdvanceNoticeConfig.js.map