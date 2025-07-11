"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingRiskConfigContext = undefined;
const RiskHarvestArtifactAll_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestArtifactAll");
const RiskHarvestArtifactById_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestArtifactById");
const RiskHarvestBuffGroupAll_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestBuffGroupAll");
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
  constructor() {
    this.LVa = undefined;
    this.AVa = undefined;
    this.DVa = new Map();
    this.Aja = new Map();
    this.RVa = (e, r) => e.BuffType === r.BuffType ? e.Id - r.Id : e.BuffType - r.BuffType;
  }
  Init() {
    var e = RiskHarvestArtifactAll_1.configRiskHarvestArtifactAll.GetConfigList();
    if (e !== undefined) {
      for (const n of e) {
        var t;
        var i;
        var s = [];
        var o = [];
        var a = n.BasicBuffGroup;
        let r = 0;
        for ([t, i] of n.BuffGroup.entries()) {
          var f = a[t];
          s.push({
            Index: t,
            BuffId: i,
            Threshold: f
          });
          for (let e = r; e < f; e++) {
            var u = (e - r) / (f - r);
            o.push({
              Count: e,
              SuperLevel: t,
              Partial: u,
              Overall: (u + t) / n.BuffGroup.length
            });
          }
          r = f;
        }
        o.push({
          Count: a.at(-1) ?? 0,
          SuperLevel: a.length,
          Partial: 1,
          Overall: 1
        });
        this.DVa.set(n.Id, s);
        this.Aja.set(n.Id, o);
      }
    }
  }
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
  GetProgressOverallPercentage(e, r) {
    e = this.Aja.get(e);
    if (e === undefined) {
      return 0;
    } else if (r >= e.length) {
      return 1;
    } else {
      return e[r].Overall;
    }
  }
  GetProgressPartialPercentage(e, r) {
    e = this.Aja.get(e);
    if (e === undefined) {
      return 0;
    } else if (r >= e.length) {
      return 1;
    } else {
      return e[r].Partial;
    }
  }
  GetProgressLevel(e, r) {
    e = this.Aja.get(e);
    if (e === undefined) {
      return 0;
    } else if (r >= e.length) {
      return e.at(-1)?.SuperLevel ?? 0;
    } else {
      return e[r].SuperLevel;
    }
  }
  GetBuffThresholdByArtifactIdAndIndex(e, r) {
    e = this.DVa.get(e);
    if (e === undefined || r >= e.length) {
      return 0;
    } else {
      return e[r].Threshold;
    }
  }
  GetBuffIdByArtifactIdAndIndex(e, r) {
    e = this.DVa.get(e);
    if (e === undefined || r >= e.length) {
      return 0;
    } else {
      return e[r].BuffId;
    }
  }
  GetThresholdDataByArtifactId(e) {
    return this.DVa.get(e);
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
      e = this.DVa.get(e);
      if (e !== undefined) {
        for (const i of e) {
          if (i.BuffId === r && t >= i.Threshold) {
            return true;
          }
        }
      }
    }
    return false;
  }
  get BasicBuffConfigs() {
    if (this.LVa === undefined) {
      var e = [];
      for (const r of RiskHarvestBuffGroupAll_1.configRiskHarvestBuffGroupAll.GetConfigList()) {
        if (r.BuffType < 3) {
          e.push(r);
        }
      }
      e.sort(this.RVa);
      this.LVa = e;
    }
    return this.LVa;
  }
  get SuperBuffConfigs() {
    if (this.AVa === undefined) {
      var e = [];
      for (const r of RiskHarvestBuffGroupAll_1.configRiskHarvestBuffGroupAll.GetConfigList()) {
        if (r.BuffType === 3) {
          e.push(r);
        }
      }
      e.sort(this.RVa);
      this.AVa = e;
    }
    return this.AVa;
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