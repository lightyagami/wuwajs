"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueConfig = undefined;
const SkillGameplayButtonByGameplayType_1 = require("../../../Core/Define/ConfigQuery/SkillGameplayButtonByGameplayType");
const SurvivorsActivityConfigByActivityId_1 = require("../../../Core/Define/ConfigQuery/SurvivorsActivityConfigByActivityId");
const SurvivorsComboById_1 = require("../../../Core/Define/ConfigQuery/SurvivorsComboById");
const SurvivorsItemByActivityId_1 = require("../../../Core/Define/ConfigQuery/SurvivorsItemByActivityId");
const SurvivorsItemById_1 = require("../../../Core/Define/ConfigQuery/SurvivorsItemById");
const SurvivorsLevelByActivityId_1 = require("../../../Core/Define/ConfigQuery/SurvivorsLevelByActivityId");
const SurvivorsLevelById_1 = require("../../../Core/Define/ConfigQuery/SurvivorsLevelById");
const SurvivorsMonsterTypeByTemplateId_1 = require("../../../Core/Define/ConfigQuery/SurvivorsMonsterTypeByTemplateId");
const SurvivorsPropertyById_1 = require("../../../Core/Define/ConfigQuery/SurvivorsPropertyById");
const SurvivorsQualityById_1 = require("../../../Core/Define/ConfigQuery/SurvivorsQualityById");
const SurvivorsRoleByActivityId_1 = require("../../../Core/Define/ConfigQuery/SurvivorsRoleByActivityId");
const SurvivorsRoleById_1 = require("../../../Core/Define/ConfigQuery/SurvivorsRoleById");
const SurvivorsRoleEvolveById_1 = require("../../../Core/Define/ConfigQuery/SurvivorsRoleEvolveById");
const SurvivorsRoleLvById_1 = require("../../../Core/Define/ConfigQuery/SurvivorsRoleLvById");
const SurvivorsRoleLvByRoleId_1 = require("../../../Core/Define/ConfigQuery/SurvivorsRoleLvByRoleId");
const SurvivorsScoreRewardByActivity_1 = require("../../../Core/Define/ConfigQuery/SurvivorsScoreRewardByActivity");
const SurvivorsTalentEffectById_1 = require("../../../Core/Define/ConfigQuery/SurvivorsTalentEffectById");
const SurvivorsTalentTreeByActivityId_1 = require("../../../Core/Define/ConfigQuery/SurvivorsTalentTreeByActivityId");
const SurvivorsTalentTreeById_1 = require("../../../Core/Define/ConfigQuery/SurvivorsTalentTreeById");
const SurvivorsTaskById_1 = require("../../../Core/Define/ConfigQuery/SurvivorsTaskById");
const SurvivorsWaveByLevel_1 = require("../../../Core/Define/ConfigQuery/SurvivorsWaveByLevel");
const SurvivorsWeaponByActivityId_1 = require("../../../Core/Define/ConfigQuery/SurvivorsWeaponByActivityId");
const SurvivorsWeaponById_1 = require("../../../Core/Define/ConfigQuery/SurvivorsWeaponById");
const SurvivorsWeaponEvolveById_1 = require("../../../Core/Define/ConfigQuery/SurvivorsWeaponEvolveById");
const SurvivorsWeaponLvById_1 = require("../../../Core/Define/ConfigQuery/SurvivorsWeaponLvById");
const SurvivorsWeaponLvByWeaponId_1 = require("../../../Core/Define/ConfigQuery/SurvivorsWeaponLvByWeaponId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
class SurvivorsRogueConfig extends ConfigBase_1.ConfigBase {
  GetSurvivorsActivityConfigByActivityId(e) {
    return SurvivorsActivityConfigByActivityId_1.configSurvivorsActivityConfigByActivityId.GetConfig(e);
  }
  GetAllSurvivorsLevelByActId(e) {
    return SurvivorsLevelByActivityId_1.configSurvivorsLevelByActivityId.GetConfigList(e) ?? [];
  }
  GetSurvivorsLevel(e) {
    return SurvivorsLevelById_1.configSurvivorsLevelById.GetConfig(e);
  }
  GetMaxWaveNumByLevelId(e) {
    e = SurvivorsWaveByLevel_1.configSurvivorsWaveByLevel.GetConfigList(e);
    if (e) {
      return e.length;
    } else {
      return 0;
    }
  }
  GetWaveDuration(e, r) {
    e = SurvivorsWaveByLevel_1.configSurvivorsWaveByLevel.GetConfigList(e);
    if (e) {
      for (const v of e) {
        if (v.Wave === r) {
          return v.WaveTime;
        }
      }
    }
    return 0;
  }
  GetWaveType(e, r) {
    e = SurvivorsWaveByLevel_1.configSurvivorsWaveByLevel.GetConfigList(e);
    if (e) {
      for (const v of e) {
        if (v.Wave === r) {
          return v.WaveType;
        }
      }
    }
    return 0;
  }
  IsBonusWave(e, r) {
    e = SurvivorsWaveByLevel_1.configSurvivorsWaveByLevel.GetConfigList(e);
    if (e) {
      for (const v of e) {
        if (v.Wave === r) {
          return v.TreasurePool.size > 0;
        }
      }
    }
    return false;
  }
  IsBoss(e) {
    e = SurvivorsMonsterTypeByTemplateId_1.configSurvivorsMonsterTypeByTemplateId.GetConfig(e);
    return !!e && e.RiskType === 3;
  }
  GetAllSurvivorsRoleByActId(e) {
    return SurvivorsRoleByActivityId_1.configSurvivorsRoleByActivityId.GetConfigList(e) ?? [];
  }
  GetSurvivorsRole(e) {
    return SurvivorsRoleById_1.configSurvivorsRoleById.GetConfig(e);
  }
  GetSurvivorsRoleLv(e) {
    return SurvivorsRoleLvById_1.configSurvivorsRoleLvById.GetConfig(e);
  }
  GetSurvivorsRoleLvListByRoleId(e) {
    return SurvivorsRoleLvByRoleId_1.configSurvivorsRoleLvByRoleId.GetConfigList(e) ?? [];
  }
  GetSurvivorsRoleEvolve(e) {
    return SurvivorsRoleEvolveById_1.configSurvivorsRoleEvolveById.GetConfig(e);
  }
  GetSurvivorsRoleDefaultEvolve(v) {
    v = this.GetSurvivorsRole(v);
    if (v) {
      let e = 0;
      let r = MathUtils_1.MathUtils.Int32Max;
      for (var [i, o] of v.EvolveIds) {
        if (r >= o) {
          r = o;
          e = i;
        }
      }
      if (e) {
        return this.GetSurvivorsRoleEvolve(e);
      }
    }
  }
  GetAllSurvivorsWeaponByActId(e) {
    return SurvivorsWeaponByActivityId_1.configSurvivorsWeaponByActivityId.GetConfigList(e) ?? [];
  }
  GetSurvivorsWeapon(e) {
    return SurvivorsWeaponById_1.configSurvivorsWeaponById.GetConfig(e);
  }
  GetSurvivorsWeaponDefaultEvolve(v) {
    v = this.GetSurvivorsWeapon(v);
    if (v) {
      let e = 0;
      let r = MathUtils_1.MathUtils.Int32Max;
      for (var [i, o] of v.EvolveIds) {
        if (r >= o) {
          r = o;
          e = i;
        }
      }
      if (e) {
        return this.GetSurvivorsWeaponEvolve(e);
      }
    }
  }
  GetSurvivorsWeaponLv(e) {
    return SurvivorsWeaponLvById_1.configSurvivorsWeaponLvById.GetConfig(e);
  }
  GetSurvivorsWeaponLvListByWeaponId(e) {
    return SurvivorsWeaponLvByWeaponId_1.configSurvivorsWeaponLvByWeaponId.GetConfigList(e) ?? [];
  }
  GetSurvivorsWeaponEvolve(e) {
    return SurvivorsWeaponEvolveById_1.configSurvivorsWeaponEvolveById.GetConfig(e);
  }
  GetAllTalentTreeNodeByActId(e) {
    return SurvivorsTalentTreeByActivityId_1.configSurvivorsTalentTreeByActivityId.GetConfigList(e) ?? [];
  }
  GetTalentTreeNode(e) {
    return SurvivorsTalentTreeById_1.configSurvivorsTalentTreeById.GetConfig(e);
  }
  GetTalentTreeEffect(e) {
    return SurvivorsTalentEffectById_1.configSurvivorsTalentEffectById.GetConfig(e);
  }
  GetAllSurvivorsItemByActId(e) {
    return SurvivorsItemByActivityId_1.configSurvivorsItemByActivityId.GetConfigList(e) ?? [];
  }
  GetSurvivorsItem(e) {
    return SurvivorsItemById_1.configSurvivorsItemById.GetConfig(e);
  }
  GetQualityConfig(e) {
    return SurvivorsQualityById_1.configSurvivorsQualityById.GetConfig(e);
  }
  GetPropertyConfig(e) {
    return SurvivorsPropertyById_1.configSurvivorsPropertyById.GetConfig(e);
  }
  GetSkillButtonConfigByType(e) {
    return SkillGameplayButtonByGameplayType_1.configSkillGameplayButtonByGameplayType.GetConfigList(e);
  }
  GetComboConfig(e) {
    e = this.GetSurvivorsLevel(e);
    if (e) {
      return SurvivorsComboById_1.configSurvivorsComboById.GetConfig(e.ComboCfgId);
    }
  }
  GetSurvivorsTask(e) {
    return SurvivorsTaskById_1.configSurvivorsTaskById.GetConfig(e);
  }
  GetAllSurvivorsScoreRewardByActId(e) {
    return SurvivorsScoreRewardByActivity_1.configSurvivorsScoreRewardByActivity.GetConfigList(e) ?? [];
  }
}
exports.SurvivorsRogueConfig = SurvivorsRogueConfig;
//# sourceMappingURL=SurvivorsRogueConfig.js.map