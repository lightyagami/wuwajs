"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseEventConfig = undefined;
const SimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId_1 = require("../../../Core/Define/ConfigQuery/SimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId");
const TrapDefenseBuildingById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseBuildingById");
const TrapDefenseBuildingTypeById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseBuildingTypeById");
const TrapDefenseDeathrattleById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseDeathrattleById");
const TrapDefenseMonsterById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseMonsterById");
const TrapDefenseMonsterTypeById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseMonsterTypeById");
const TrapDefenseSpecialCellById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseSpecialCellById");
const TrapDefenseSpecialCellTypeById_1 = require("../../../Core/Define/ConfigQuery/TrapDefenseSpecialCellTypeById");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const ModelManager_1 = require("../../Manager/ModelManager");
const TowerDefenseEventEntityModel_1 = require("./Model/TowerDefenseEventEntityModel");
class TowerDefenseEventConfig {
  static FillUpModelInfo(e, r = false) {
    var n = e;
    var i = (0, TowerDefenseEventEntityModel_1.isTypeOfSpecialCellBaseInfo)(n);
    if (i) {
      var t = TrapDefenseSpecialCellById_1.configTrapDefenseSpecialCellById.GetConfig(n.ConfigId);
      if (!t) {
        return "特殊地块配置不存在";
      }
      n.CellType = t.CellType;
      t = TrapDefenseSpecialCellTypeById_1.configTrapDefenseSpecialCellTypeById.GetConfig(n.CellType);
      if (!t) {
        return "特殊地块类型配置不存在";
      }
      n.TemplateId = t.TemplateId;
    }
    var t = e;
    var o = (0, TowerDefenseEventEntityModel_1.isTypeOfTrapBaseInfo)(t);
    if (o) {
      var f = TrapDefenseBuildingById_1.configTrapDefenseBuildingById.GetConfig(t.ConfigId);
      if (!f) {
        return "陷阱配置不存在";
      }
      t.TrapId = f.BuildingType;
      t.BranchId = f.Branch;
      t.DefaultCost = f.ConstructDefaultCost;
      if (!e.IsValid() || r) {
        r = f.SimpleCombatSubtypeIds;
        if (t.Level < 1 || t.Level > r.length) {
          return "陷阱等级不合法";
        }
        t.SubTypeId = r[t.Level - 1];
      }
      f = TrapDefenseBuildingTypeById_1.configTrapDefenseBuildingTypeById.GetConfig(t.TrapId);
      if (!f) {
        return "陷阱类型配置不存在";
      }
      t.TemplateId = f.TemplateId;
      t.PlacementType = f.PlacementType;
      t.CanRotate = f.CanRotate;
    }
    r = e;
    if ((0, TowerDefenseEventEntityModel_1.isTypeOfMonsterInfo)(r)) {
      f = TrapDefenseMonsterById_1.configTrapDefenseMonsterById.GetConfig(r.ConfigId);
      if (!f) {
        return "怪物配置不存在";
      }
      r.DeathType = f.Deathrattle;
      if (r.DeathType !== 0) {
        var a = TrapDefenseDeathrattleById_1.configTrapDefenseDeathrattleById.GetConfig(r.DeathType);
        if (!a) {
          return "死亡回响配置不存在";
        }
        r.BuffRadius = a.NearbyMonsterRadius;
        r.BuffIds = a.NearbyMonsterBuffs;
        r.PolluteRadius = a.PolluteRadius;
        r.SpawnIds = a.SpawnMonsters;
      }
      a = TrapDefenseMonsterTypeById_1.configTrapDefenseMonsterTypeById.GetConfig(f.MonsterType);
      if (!a) {
        return "怪物类型配置不存在";
      }
      r.TemplateId = a.TemplateId;
    }
    f = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(e.TemplateId);
    if (!f) {
      return "实体模板不存在";
    }
    if (o) {
      r = (0, IComponent_1.getComponent)(f.ComponentsData, "GridObjectComponent");
      if (!r) {
        return "网格对象组件不存在";
      }
      t.GridSize.Set(r.CellSize.X, r.CellSize.Y);
    }
    if (i) {
      a = (0, IComponent_1.getComponent)(f.ComponentsData, "GridObjectComponent");
      if (!a) {
        return "网格对象组件不存在";
      }
      n.GridSize.Set(a.CellSize.X, a.CellSize.Y);
    }
    o = (0, IComponent_1.getComponent)(f.ComponentsData, "SimpleCombatComponent");
    if (!o) {
      return "战斗组件不存在";
    }
    e.CombatId = o.Id;
    t = SimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId_1.configSimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId.GetConfig(e.CombatId, e.SubTypeId);
    if (!t) {
      return "战斗配置不存在";
    }
    e.PrefabPath = t.PrefabPath;
    e.AssetPath = t.DaPath;
    e.PropertyId = t.PropertyId;
  }
}
exports.TowerDefenseEventConfig = TowerDefenseEventConfig;
//# sourceMappingURL=TowerDefenseEventConfig.js.map