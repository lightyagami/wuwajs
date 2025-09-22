"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBattleInventoryData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const TrapDefenseBattleItemData_1 = require("./TrapDefenseBattleItemData");
class TrapDefenseBattleInventoryData {
  constructor() {
    this.ItemMap = new Map();
  }
  static Create() {
    var e = new TrapDefenseBattleInventoryData();
    e.AU();
    return e;
  }
  GetOwnItemTypeCount() {
    let e = 0;
    for (const t of this.ItemMap.values()) {
      if (t.InventoryCount > 0) {
        e++;
      }
    }
    return e;
  }
  AU() {
    for (const t of ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAllTrapDefenseItem()) {
      var e = TrapDefenseBattleItemData_1.TrapDefenseBattleItemData.Create(t);
      this.ItemMap.set(e.Config.Id, e);
    }
  }
  GetItemData(e) {
    return this.ItemMap.get(e);
  }
  UpdateItemData(e) {
    for (const a of e) {
      let e = this.ItemMap.get(a.v9n);
      var t;
      if (!e) {
        t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseItemConfigById(a.v9n);
        e = TrapDefenseBattleItemData_1.TrapDefenseBattleItemData.Create(t);
        this.ItemMap.set(a.v9n, e);
      }
      e.UpdateByServerData(a.wed, a.Led);
    }
  }
}
exports.TrapDefenseBattleInventoryData = TrapDefenseBattleInventoryData;
//# sourceMappingURL=TrapDefenseBattleInventoryData.js.map