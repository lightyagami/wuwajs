"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingRiskConfigContext = undefined;
const RiskHarvestArtifactById_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestArtifactById");
const RiskHarvestBuffGroupByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestBuffGroupByActivityId");
const RiskHarvestBuffGroupById_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestBuffGroupById");
const RiskHarvestInstAll_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestInstAll");
const RiskHarvestInstByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestInstByActivityId");
const RiskHarvestInstById_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestInstById");
const RiskHarvestInstByInstanceID_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestInstByInstanceID");
const RiskHarvestScoreRewardByActivityId_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestScoreRewardByActivityId");
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const type2QualityData = new Map([[1, {
  HexColor: "3E9DFFFF",
  CfgQualityInfoId: 3,
  BackgroundResource: "T_MowingQualityBlue"
}], [2, {
  HexColor: "7645A3FF",
  CfgQualityInfoId: 4,
  BackgroundResource: "T_MowingQualityPurple"
}], [3, {
  HexColor: "FFBD47FF",
  CfgQualityInfoId: 5,
  BackgroundResource: "T_MowingQualityGold"
}]]);
class MowingRiskConfigContext {
  Dispose() {}
  GetBuffHexColorById(e) {
    e = RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    if (e === undefined) {
      return "FFFFFFFF";
    } else {
      return type2QualityData.get(e.BuffType)?.HexColor ?? "FFFFFFFF";
    }
  }
  GetBuffNameTextIdById(e) {
    e = RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    if (e === undefined) {
      return "";
    } else {
      return e.BuffName;
    }
  }
  GetBuffDescriptionTextIdById(e) {
    e = RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    if (e === undefined) {
      return "";
    } else {
      return e.BuffDesc;
    }
  }
  GetBuffDescriptionArgsById(e) {
    e = RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    if (e === undefined) {
      return [];
    } else {
      return e.BuffFactors;
    }
  }
  GetBuffIconPathById(e) {
    e = RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    if (e === undefined) {
      return "";
    } else {
      return e.BuffIcon;
    }
  }
  GetBuffQualityInfoById(e) {
    e = RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    if (e !== undefined) {
      e = type2QualityData.get(e.BuffType);
      if (e !== undefined) {
        return ConfigManager_1.ConfigManager.CommonConfig?.GetItemQualityById(e.CfgQualityInfoId);
      }
    }
  }
  GetBuffQualityPathById(e) {
    return this.GetBuffQualityInfoById(e)?.MediumItemGridQualitySpritePath ?? "";
  }
  GetNewBuffNameHexColorById(e) {
    return this.GetBuffQualityInfoById(e)?.TextColor ?? "FFFFFFFF";
  }
  GetNewBuffQualityTexPathById(e) {
    return this.GetBuffQualityInfoById(e)?.AcquireNewItemQualityTexPath ?? "";
  }
  IsNewBuffGoldenById(e) {
    return this.GetBuffQualityInfoById(e)?.Id === 5;
  }
  GetBuffIntroduceBackgroundPath(e) {
    var e = RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    if (e === undefined || (e = type2QualityData.get(e.BuffType)) === undefined) {
      return "";
    } else {
      e = e.BackgroundResource;
      return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    }
  }
  GetBuffMaxCountByArtifactId(e) {
    return RiskHarvestArtifactById_1.configRiskHarvestArtifactById.GetConfig(e)?.BasicBuffGroup.at(-1) ?? 0;
  }
  GetProgressLevel(e, r) {
    e = this.GetArtifactConfig(e);
    if (e) {
      var t = e.BasicBuffGroup;
      if (t[t.length - 1] <= r) {
        return t.length;
      }
      for (let e = 0; e < t.length; e++) {
        if (r < t[e]) {
          return e;
        }
      }
    }
    return 0;
  }
  GetProgressOverallPercentage(e, r) {
    var t = this.GetArtifactConfig(e);
    if (t) {
      if ((t = t.BasicBuffGroup)[t.length - 1] <= r) {
        return 1;
      } else {
        return (r - (r = (e = this.GetProgressLevel(e, r)) > 0 ? t[e - 1] : 0)) / (t[e] - r);
      }
    } else {
      return 0;
    }
  }
  GetProgressPartialPercentage(e, r) {
    var t;
    var i = this.GetArtifactConfig(e);
    if (i) {
      if ((t = i.BasicBuffGroup)[t.length - 1] <= r) {
        return 1;
      } else {
        t = this.GetProgressLevel(e, r);
        return (this.GetProgressOverallPercentage(e, r) + t) / i.BuffGroup.length;
      }
    } else {
      return 0;
    }
  }
  GetArtifactConfig(e) {
    return RiskHarvestArtifactById_1.configRiskHarvestArtifactById.GetConfig(e);
  }
  GetBuffThresholdByArtifactIdAndIndex(e, r) {
    return this.GetArtifactConfig(e).BasicBuffGroup[r];
  }
  GetBuffIdByArtifactIdAndIndex(e, r) {
    return this.GetArtifactConfig(e).BuffGroup[r];
  }
  GetBuffConfigById(e) {
    return RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
  }
  GetBuffTypeById(e) {
    e = RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    if (e !== undefined) {
      return e.BuffType;
    }
  }
  GetIdByInstanceId(e) {
    e = RiskHarvestInstByInstanceID_1.configRiskHarvestInstByInstanceID.GetConfig(e);
    if (e !== undefined) {
      return e.Id;
    }
  }
  GetInstanceRewardScoreById(e) {
    return RiskHarvestInstById_1.configRiskHarvestInstById.GetConfig(e)?.RewardScore ?? 0;
  }
  GetScoreToUnlockById(e) {
    e = RiskHarvestInstById_1.configRiskHarvestInstById.GetConfig(e);
    if (e === undefined || e.UnlockInst === 0) {
      return 0;
    } else {
      return e.UnlockScore;
    }
  }
  IsSuperBuffByBuffId(e) {
    return this.GetBuffTypeById(e) === 3;
  }
  IsSuperBuffAvailable(e, r, t) {
    if (this.IsSuperBuffByBuffId(r)) {
      var e = this.GetArtifactConfig(e);
      var i = e.BasicBuffGroup;
      var s = e.BuffGroup;
      for (let e = 0; e < i.length; e++) {
        if (s[e] === r && t >= i[e]) {
          return true;
        }
      }
    }
    return false;
  }
  get IsInstanceNewCache() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MowingRiskIsInstanceNew);
    if (e !== undefined) {
      return e;
    }
    var r = new Map();
    var e = RiskHarvestInstAll_1.configRiskHarvestInstAll.GetConfigList();
    if (e !== undefined) {
      for (const t of e) {
        r.set(t.Id, true);
      }
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MowingRiskIsInstanceNew, r);
    }
    return r;
  }
  set IsInstanceNewCache(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MowingRiskIsInstanceNew, e);
  }
  GetRiskHarvestInstByActivityId(e) {
    return RiskHarvestInstByActivityId_1.configRiskHarvestInstByActivityId.GetConfigList(e) ?? [];
  }
  GetRiskHarvestScoreRewardByActivityId(e) {
    return RiskHarvestScoreRewardByActivityId_1.configRiskHarvestScoreRewardByActivityId.GetConfigList(e) ?? [];
  }
  GetBuffConfigListByActivityId(e) {
    return RiskHarvestBuffGroupByActivityId_1.configRiskHarvestBuffGroupByActivityId.GetConfigList(e) ?? [];
  }
}
exports.MowingRiskConfigContext = MowingRiskConfigContext;
//# sourceMappingURL=MowingRiskConfigContext.js.map