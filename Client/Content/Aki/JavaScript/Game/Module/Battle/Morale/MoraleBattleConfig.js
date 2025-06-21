"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleBattleConfig = void 0;
const MoraleKeepLevelAll_1 = require("../../../../Core/Define/ConfigQuery/MoraleKeepLevelAll"),
  MoraleKeepLevelById_1 = require("../../../../Core/Define/ConfigQuery/MoraleKeepLevelById"),
  MoraleLevelDiffById_1 = require("../../../../Core/Define/ConfigQuery/MoraleLevelDiffById"),
  MoraleLevelDiffShowAll_1 = require("../../../../Core/Define/ConfigQuery/MoraleLevelDiffShowAll"),
  MoraleLevelDiffShowById_1 = require("../../../../Core/Define/ConfigQuery/MoraleLevelDiffShowById"),
  MoralePlayById_1 = require("../../../../Core/Define/ConfigQuery/MoralePlayById"),
  ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class MoraleBattleConfig extends ConfigBase_1.ConfigBase {
  GetMoraleConfig(e) {
    if (e) return MoralePlayById_1.configMoralePlayById.GetConfig(e)
  }
  GetExpConfig(e) {
    return MoraleKeepLevelById_1.configMoraleKeepLevelById.GetConfig(e)
  }
  GetAllExpConfig() {
    return MoraleKeepLevelAll_1.configMoraleKeepLevelAll.GetConfigList()
  }
  GetLevelDiffConfig(e) {
    return MoraleLevelDiffById_1.configMoraleLevelDiffById.GetConfig(e)
  }
  GetLevelDiffShowConfig(e) {
    return MoraleLevelDiffShowById_1.configMoraleLevelDiffShowById.GetConfig(e)
  }
  GetAllLevelDiffShowConfig() {
    return MoraleLevelDiffShowAll_1.configMoraleLevelDiffShowAll.GetConfigList()
  }
}
exports.MoraleBattleConfig = MoraleBattleConfig;
//# sourceMappingURL=MoraleBattleConfig.js.map