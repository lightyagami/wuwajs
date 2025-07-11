"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ResElementLevelGainByTargetType_1 = require("../../../Core/Define/ConfigQuery/ResElementLevelGainByTargetType");
const RogueResAffixById_1 = require("../../../Core/Define/ConfigQuery/RogueResAffixById");
const RogueResBondAll_1 = require("../../../Core/Define/ConfigQuery/RogueResBondAll");
const RogueResBondById_1 = require("../../../Core/Define/ConfigQuery/RogueResBondById");
const RogueResBondLvByLv_1 = require("../../../Core/Define/ConfigQuery/RogueResBondLvByLv");
const RogueResBondRoleAll_1 = require("../../../Core/Define/ConfigQuery/RogueResBondRoleAll");
const RogueResBondRoleByRoleId_1 = require("../../../Core/Define/ConfigQuery/RogueResBondRoleByRoleId");
const RogueResBuffPoolById_1 = require("../../../Core/Define/ConfigQuery/RogueResBuffPoolById");
const RogueResCharacterBuffById_1 = require("../../../Core/Define/ConfigQuery/RogueResCharacterBuffById");
const RogueResEffectById_1 = require("../../../Core/Define/ConfigQuery/RogueResEffectById");
const RogueResEffectTagById_1 = require("../../../Core/Define/ConfigQuery/RogueResEffectTagById");
const RogueResPokemonById_1 = require("../../../Core/Define/ConfigQuery/RogueResPokemonById");
const RogueResQualityConfigById_1 = require("../../../Core/Define/ConfigQuery/RogueResQualityConfigById");
const RogueResRoomPoolById_1 = require("../../../Core/Define/ConfigQuery/RogueResRoomPoolById");
const RogueResRoomTypeById_1 = require("../../../Core/Define/ConfigQuery/RogueResRoomTypeById");
const RogueResSkillLvRuleAll_1 = require("../../../Core/Define/ConfigQuery/RogueResSkillLvRuleAll");
const RogueResSynergyTypeAll_1 = require("../../../Core/Define/ConfigQuery/RogueResSynergyTypeAll");
const RogueResSynergyTypeById_1 = require("../../../Core/Define/ConfigQuery/RogueResSynergyTypeById");
const RogueResTeamLvRuleAll_1 = require("../../../Core/Define/ConfigQuery/RogueResTeamLvRuleAll");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class RogueBattleConfig extends ConfigBase_1.ConfigBase {
  GetRogueResBuffPoolById(e) {
    var o = RogueResBuffPoolById_1.configRogueResBuffPoolById.GetConfig(e);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RogueBattle", 77, "RogueBattleTokenItem.RefreshDescText tokenConfig is null", ["ConfigId", e]);
      }
    }
    return o;
  }
  GetRoomPoolConfig(e) {
    return RogueResRoomPoolById_1.configRogueResRoomPoolById.GetConfig(e);
  }
  GetRogueRoomType(e) {
    return RogueResRoomTypeById_1.configRogueResRoomTypeById.GetConfig(e);
  }
  GetElementLevelGain(e) {
    return ResElementLevelGainByTargetType_1.configResElementLevelGainByTargetType.GetConfig(e);
  }
  GetRogueResPokemon(e) {
    return RogueResPokemonById_1.configRogueResPokemonById.GetConfig(e);
  }
  GetRogueResAffix(e) {
    return RogueResAffixById_1.configRogueResAffixById.GetConfig(e);
  }
  GetRogueResQualityConfig(e) {
    return RogueResQualityConfigById_1.configRogueResQualityConfigById.GetConfig(e);
  }
  GetRogueResBond(e) {
    return RogueResBondById_1.configRogueResBondById.GetConfig(e);
  }
  GetAllRogueResBond() {
    return RogueResBondAll_1.configRogueResBondAll.GetConfigList();
  }
  GetRogueResBondRole(e) {
    return RogueResBondRoleByRoleId_1.configRogueResBondRoleByRoleId.GetConfig(e);
  }
  GetAllRogueResBondRole() {
    return RogueResBondRoleAll_1.configRogueResBondRoleAll.GetConfigList();
  }
  GetRogueResCharacterBuff(e) {
    return RogueResCharacterBuffById_1.configRogueResCharacterBuffById.GetConfig(e);
  }
  GetAllRogueResBondType() {
    return RogueResSynergyTypeAll_1.configRogueResSynergyTypeAll.GetConfigList();
  }
  GetRogueResBondTypeById(e) {
    return RogueResSynergyTypeById_1.configRogueResSynergyTypeById.GetConfig(e);
  }
  GetRogueResEffectById(e) {
    return RogueResEffectById_1.configRogueResEffectById.GetConfig(e);
  }
  GetRogueResEffectTagById(e) {
    return RogueResEffectTagById_1.configRogueResEffectTagById.GetConfig(e);
  }
  GetAllRogueResTeamLvRule() {
    return RogueResTeamLvRuleAll_1.configRogueResTeamLvRuleAll.GetConfigList();
  }
  GetAllRogueResSkillLvRule() {
    return RogueResSkillLvRuleAll_1.configRogueResSkillLvRuleAll.GetConfigList();
  }
  GetBondLvConfigByLv(e) {
    return RogueResBondLvByLv_1.configRogueResBondLvByLv.GetConfig(e);
  }
}
exports.RogueBattleConfig = RogueBattleConfig;
//# sourceMappingURL=RogueBattleConfig.js.map