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
    this.TJc = [];
    this.WNu = new Map();
    this.xjc = new Map();
  }
  InitInstance(e) {
    this.TJc.length = 0;
    if (e) {
      e = TrapDefenseWaveByTrapDefenseLevelId_1.configTrapDefenseWaveByTrapDefenseLevelId.GetConfigList(e.Id);
      if (e && e.length > 0) {
        for (const r of e) {
          this.TJc.push(r);
        }
        this.TJc.sort((e, r) => e.WaveId - r.WaveId);
      }
    }
  }
  get CurrentTrapCount() {
    return this.xjc.size;
  }
  HasPlaceToBuildTrap() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetMaxTrapCount();
    return this.CurrentTrapCount < e;
  }
  GetWaveSplineIds(e) {
    e.length = 0;
    var r = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetBatch();
    if (!(r < 1) && !(r > this.TJc.length)) {
      r = this.TJc[r - 1];
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
      if (this.WNu.has(r)) {
        return "实体数据已存在";
      } else {
        this.WNu.set(r, e);
        if ((0, TowerDefenseEventEntityModel_1.isTypeOfTrapInfo)(e)) {
          this.xjc.set(r, e);
        }
        return;
      }
    } else {
      return "实体数据无效";
    }
  }
  GetEntity(e) {
    return this.WNu.get(e);
  }
  GetAllEntities(r) {
    r.length = 0;
    this.WNu.forEach(e => {
      r.push(e);
    });
  }
  HasAnyTrapByType(e) {
    for (const r of this.xjc.values()) {
      if (r.TrapId === e) {
        return true;
      }
    }
    return false;
  }
  RemoveEntity(e) {
    var r = this.WNu.get(e);
    if (r && (this.WNu.delete(e), this.xjc.get(e))) {
      this.xjc.delete(e);
    }
    return r;
  }
  HasEntity(e) {
    return this.WNu.has(e);
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