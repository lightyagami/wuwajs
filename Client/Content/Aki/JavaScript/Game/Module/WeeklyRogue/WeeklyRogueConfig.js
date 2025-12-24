"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueConfig = undefined;
const RogueWeeklyBFAll_1 = require("../../../Core/Define/ConfigQuery/RogueWeeklyBFAll");
const RogueWeeklyBFById_1 = require("../../../Core/Define/ConfigQuery/RogueWeeklyBFById");
const RogueWeeklyBuffPoolById_1 = require("../../../Core/Define/ConfigQuery/RogueWeeklyBuffPoolById");
const RogueWeeklyBuffPoolByRelatedArtifactId_1 = require("../../../Core/Define/ConfigQuery/RogueWeeklyBuffPoolByRelatedArtifactId");
const RogueWeeklyCycleById_1 = require("../../../Core/Define/ConfigQuery/RogueWeeklyCycleById");
const RogueWeeklyParamById_1 = require("../../../Core/Define/ConfigQuery/RogueWeeklyParamById");
const RogueWeeklyRewardById_1 = require("../../../Core/Define/ConfigQuery/RogueWeeklyRewardById");
const RogueWeeklyRoomPoolById_1 = require("../../../Core/Define/ConfigQuery/RogueWeeklyRoomPoolById");
const RogueWeeklyRoomTypeById_1 = require("../../../Core/Define/ConfigQuery/RogueWeeklyRoomTypeById");
const RogueWeekQualityConfigById_1 = require("../../../Core/Define/ConfigQuery/RogueWeekQualityConfigById");
const RogueWeekTagById_1 = require("../../../Core/Define/ConfigQuery/RogueWeekTagById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class WeeklyRogueConfig extends ConfigBase_1.ConfigBase {
  GetWeeklyRogueParam(e) {
    return RogueWeeklyParamById_1.configRogueWeeklyParamById.GetConfig(e);
  }
  GetRogueWeeklyRoomType(e) {
    return RogueWeeklyRoomTypeById_1.configRogueWeeklyRoomTypeById.GetConfig(e);
  }
  GetRogueWeeklyBuffPool(e) {
    return RogueWeeklyBuffPoolById_1.configRogueWeeklyBuffPoolById.GetConfig(e);
  }
  GetRogueWeeklyBuffPoolByRelatedArtifactId(e) {
    return RogueWeeklyBuffPoolByRelatedArtifactId_1.configRogueWeeklyBuffPoolByRelatedArtifactId.GetConfigList(e);
  }
  GetRogueWeeklyQualityConfig(e) {
    return RogueWeekQualityConfigById_1.configRogueWeekQualityConfigById.GetConfig(e);
  }
  GetRogueWeeklyRewardConfig(e) {
    return RogueWeeklyRewardById_1.configRogueWeeklyRewardById.GetConfig(e);
  }
  GetRogueWeeklyCycleConfig(e) {
    return RogueWeeklyCycleById_1.configRogueWeeklyCycleById.GetConfig(e);
  }
  GetRoomTypeConfig(e) {
    return RogueWeeklyRoomTypeById_1.configRogueWeeklyRoomTypeById.GetConfig(e);
  }
  GetRoomPoolConfig(e) {
    return RogueWeeklyRoomPoolById_1.configRogueWeeklyRoomPoolById.GetConfig(e);
  }
  GetRogueWeekTagConfig(e) {
    return RogueWeekTagById_1.configRogueWeekTagById.GetConfig(e);
  }
  GetBlackFlowerConfig(e) {
    return RogueWeeklyBFById_1.configRogueWeeklyBFById.GetConfig(e);
  }
  GetBlackFlowerConfigAll() {
    return RogueWeeklyBFAll_1.configRogueWeeklyBFAll.GetConfigList() ?? [];
  }
}
exports.WeeklyRogueConfig = WeeklyRogueConfig;
//# sourceMappingURL=WeeklyRogueConfig.js.map