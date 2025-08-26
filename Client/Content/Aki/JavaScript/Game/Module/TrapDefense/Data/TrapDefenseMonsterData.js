"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMonsterData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
class TrapDefenseMonsterData {
  constructor(t) {
    this.Id = 0;
    this.IconPath = "";
    this.QualityId = 0;
    this.NameKey = "";
    this.Config = undefined;
    this.ConfigType = undefined;
    this.InTheInstance = false;
    this.SortId = 0;
    this.Id = t;
  }
  static Create(t) {
    var e = new TrapDefenseMonsterData(t.Id);
    e.Config = t;
    e.AU();
    return e;
  }
  AU() {
    this.ConfigType = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetMonsterTypeConfigById(this.Config.MonsterType);
    this.IconPath = this.ConfigType.Icon;
    this.NameKey = this.Config.Name;
    this.SortId = this.Config.Sort;
  }
  GetShowActorLabelStr() {
    var t = this.Id;
    var e = this.Config.SimpleCombatSubtypeId;
    return `Monster_${t}_tId-${this.ConfigType.TemplateId}_subId-${e}_inInst-${this.InTheInstance}`;
  }
  GetQualityPathDesc() {
    return this.GetRiskData()?.Config.DescQualityPath ?? "RiskType-QualityDesc-" + this.ConfigType.RiskType;
  }
  GetQualityPathGrid() {
    return this.GetRiskData()?.Config.GridQualityPath ?? "RiskType-QualityGrid-" + this.ConfigType.RiskType;
  }
  GetRiskData() {
    var t = this.ConfigType.RiskType;
    return ModelManager_1.ModelManager.TrapDefenseModel.ViewModelMonster.MonsterTypeDataMap.get(t);
  }
  IsBoss() {
    return this.ConfigType.RiskType === 3;
  }
  GetRiskTypeNameKey() {
    return this.GetRiskData()?.Config.Name ?? "RiskType-Name-" + this.ConfigType.RiskType;
  }
  GetBodyTypeNameKey() {
    var t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelMonster.GetMonsterBodyMap();
    var e = this.ConfigType.BodyType;
    return t.get(e)?.Name ?? "BodyType-Name-" + e;
  }
  GetAttrDataShowList() {
    var t = this.Config.SimpleCombatSubtypeId;
    var e = this.ConfigType.TemplateId;
    const a = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetBuffData(e, t);
    if (a) {
      return this.Config.AttrShow.map(t => {
        t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAttrShow(t);
        if (t.ToMonster) {
          const e = this.Config[t.ToMonster]?.toString() ?? "UnFind-" + t.ToMonster;
          return {
            NameKey: t.Name,
            IconPath: t.Icon,
            Value: e
          };
        }
        const e = a[t.Key]?.toString() ?? "UnFind-" + t.Key;
        return {
          NameKey: t.Name,
          IconPath: t.Icon,
          Value: e
        };
      });
    } else {
      return [];
    }
  }
  GetTagDataShowList() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelMonster.GetMonsterTagMap();
    var a = [];
    for (let t = 0; t < this.Config.Tag.length; t++) {
      var s = e.get(this.Config.Tag[t]);
      var s = {
        IconPath: s.Icon,
        NameKey: s.Name,
        Value: this.Config.TagDesc[t]
      };
      a.push(s);
    }
    return a;
  }
  GetGridTagPathList() {
    var t = this.GetTagDataShowList();
    if (t.length > 0) {
      return t.map(t => t.IconPath);
    } else {
      return [ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("MonsterTagUnStateIcon") ?? "MonsterTagUnStateIcon"];
    }
  }
  SetIsInTheInstance(t) {
    this.InTheInstance = t;
  }
}
exports.TrapDefenseMonsterData = TrapDefenseMonsterData;
//# sourceMappingURL=TrapDefenseMonsterData.js.map