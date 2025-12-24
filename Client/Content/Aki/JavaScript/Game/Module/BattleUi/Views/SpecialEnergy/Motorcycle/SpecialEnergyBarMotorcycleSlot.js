"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarMotorcycleSlot = undefined;
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarMotorcycleSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  InitMotorcycleData(t, e, r = true) {
    this.NeedInitKeyItem = r;
    if (!this.Destroyed && t) {
      this.Config = e;
      this.OnInitData();
      this.PercentMachine.Init(0);
    }
  }
  OnStart() {
    super.OnStart();
    for (const t of this.SlotItemList) {
      t.SetFullEffectPercent(1);
    }
  }
  UpdatePercent(e, r, t) {
    for (let t = 0; t < this.SlotItemList.length; t++) {
      this.SlotItemList[t].UpdatePercent(e * this.SlotNum - t, r);
    }
    this.KeyItem?.RefreshKeyEnable(r, t);
  }
}
exports.SpecialEnergyBarMotorcycleSlot = SpecialEnergyBarMotorcycleSlot;
//# sourceMappingURL=SpecialEnergyBarMotorcycleSlot.js.map