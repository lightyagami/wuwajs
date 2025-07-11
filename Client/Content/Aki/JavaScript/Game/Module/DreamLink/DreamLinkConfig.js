"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkConfig = undefined;
const BattleLinkCharacterAll_1 = require("../../../Core/Define/ConfigQuery/BattleLinkCharacterAll");
const BattleLinkCharacterById_1 = require("../../../Core/Define/ConfigQuery/BattleLinkCharacterById");
const DreamLinkRoleDungeonById_1 = require("../../../Core/Define/ConfigQuery/DreamLinkRoleDungeonById");
const DreamLinkWorldRunById_1 = require("../../../Core/Define/ConfigQuery/DreamLinkWorldRunById");
const DreamLinkWorldRunByMarkId_1 = require("../../../Core/Define/ConfigQuery/DreamLinkWorldRunByMarkId");
const RogueBossInstanceById_1 = require("../../../Core/Define/ConfigQuery/RogueBossInstanceById");
const RogueLimitTimeRewardById_1 = require("../../../Core/Define/ConfigQuery/RogueLimitTimeRewardById");
const RogueWhiteCatBossRewardById_1 = require("../../../Core/Define/ConfigQuery/RogueWhiteCatBossRewardById");
const RogueWhiteCatById_1 = require("../../../Core/Define/ConfigQuery/RogueWhiteCatById");
const RogueWhiteCatRewardById_1 = require("../../../Core/Define/ConfigQuery/RogueWhiteCatRewardById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class DreamLinkConfig extends ConfigBase_1.ConfigBase {
  GetDreamLinkRoleDungeonConfig(e) {
    return DreamLinkRoleDungeonById_1.configDreamLinkRoleDungeonById.GetConfig(e);
  }
  GetActivityConfig(e) {
    return RogueWhiteCatById_1.configRogueWhiteCatById.GetConfig(e);
  }
  GetRogueBossInstanceConfig(e) {
    return RogueBossInstanceById_1.configRogueBossInstanceById.GetConfig(e);
  }
  GetRoleConfig(e) {
    return BattleLinkCharacterById_1.configBattleLinkCharacterById.GetConfig(e);
  }
  GetRoleConfigList() {
    return BattleLinkCharacterAll_1.configBattleLinkCharacterAll.GetConfigList();
  }
  GetEnergyRewardConfig(e) {
    return RogueWhiteCatRewardById_1.configRogueWhiteCatRewardById.GetConfig(e);
  }
  GetWorldRunConfig(e) {
    return DreamLinkWorldRunById_1.configDreamLinkWorldRunById.GetConfig(e);
  }
  GetWorldRunConfigByMarkId(e) {
    return DreamLinkWorldRunByMarkId_1.configDreamLinkWorldRunByMarkId.GetConfig(e);
  }
  GetLimitTimeRewardConfig(e) {
    return RogueLimitTimeRewardById_1.configRogueLimitTimeRewardById.GetConfig(e);
  }
  GetBossRewardConfig(e) {
    return RogueWhiteCatBossRewardById_1.configRogueWhiteCatBossRewardById.GetConfig(e);
  }
}
exports.DreamLinkConfig = DreamLinkConfig;
//# sourceMappingURL=DreamLinkConfig.js.map