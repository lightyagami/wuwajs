"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseEventModel = undefined;
const TrapDefenseWaveByTrapDefenseLevelId_1 = require("../../../../Core/Define/ConfigQuery/TrapDefenseWaveByTrapDefenseLevelId");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TowerDefenseEventEntityModel_1 = require("./TowerDefenseEventEntityModel");
class TowerDefenseEventModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Ped = [];
    this.HNu = new Map();
    this.MYc = new Map();
  }
  InitInstance(e) {
    this.Ped.length = 0;
    if (e) {
      e = TrapDefenseWaveByTrapDefenseLevelId_1.configTrapDefenseWaveByTrapDefenseLevelId.GetConfigList(e.Id);
      if (e && e.length > 0) {
        for (const r of e) {
          this.Ped.push(r);
        }
        this.Ped.sort((e, r) => e.WaveId - r.WaveId);
      }
    }
  }
  get CurrentTrapCount() {
    return this.MYc.size;
  }
  HasPlaceToBuildTrap() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetMaxTrapCount();
    return this.CurrentTrapCount < e;
  }
  GetWaveSplineIds(e) {
    e.length = 0;
    var r = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetBatch();
    if (!(r < 1) && !(r > this.Ped.length)) {
      r = this.Ped[r - 1];
      e.push(...r.SplineList);
    }
  }
  IsEnoughGoldToBuildTrap(e) {
    var r = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetGoldNum();
    var e = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.InBuildingDataMap.get(e.TrapId);
    return !!e && e.GetBuildingCost(true) <= r;
  }
  ValidateBuildTrap(e) {
    return !!this.HasPlaceToBuildTrap() && this.IsEnoughGoldToBuildTrap(e);
  }
  TryAddEntity(e) {
    var r;
    if (e && e.IsValid()) {
      r = e.Uid;
      if (this.HNu.has(r)) {
        return "实体数据已存在";
      } else {
        this.HNu.set(r, e);
        if ((0, TowerDefenseEventEntityModel_1.isTypeOfTrapInfo)(e)) {
          this.MYc.set(r, e);
        }
        return;
      }
    } else {
      return "实体数据无效";
    }
  }
  GetEntity(e) {
    return this.HNu.get(e);
  }
  GetAllEntities(r) {
    r.length = 0;
    this.HNu.forEach(e => {
      r.push(e);
    });
  }
  HasAnyTrapByType(e) {
    for (const r of this.MYc.values()) {
      if (r.TrapId === e) {
        return true;
      }
    }
    return false;
  }
  RemoveEntity(e) {
    var r = this.HNu.get(e);
    if (r && (this.HNu.delete(e), this.MYc.get(e))) {
      this.MYc.delete(e);
    }
    return r;
  }
  HasEntity(e) {
    return this.HNu.has(e);
  }
  GetMachineIdByIndex(e) {
    var r = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetSlotData();
    if (!(e < 0) && !(e >= r.length)) {
      return r[e].GetSlotData()?.Id;
    }
  }
}
exports.TowerDefenseEventModel = TowerDefenseEventModel;
//# sourceMappingURL=TowerDefenseEventModel.js.map