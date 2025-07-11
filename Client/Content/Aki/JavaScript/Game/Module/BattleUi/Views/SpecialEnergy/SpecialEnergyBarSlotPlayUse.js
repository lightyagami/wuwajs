"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarSlotPlayUse = undefined;
const SpecialEnergyBarSlot_1 = require("./SpecialEnergyBarSlot");
class SpecialEnergyBarSlotPlayUse extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments);
    this.zau = new Array();
  }
  async InitSlotItem(e) {
    await super.InitSlotItem(e);
    this.zau.push(0);
  }
  RefreshBarPercent(e = false) {
    var t = this.PercentMachine.GetCurPercent();
    var r = this.GetKeyEnable();
    for (let e = 0; e < this.SlotItemList.length; e++) {
      var s = this.SlotItemList[e];
      var a = t * this.SlotNum - e;
      s.UpdatePercent(a, r);
      if (this.zau[e] > 0 && a <= 0) {
        s.PlayUseEffectWithPercent(this.zau[e]);
      }
      this.zau[e] = a;
    }
    this.KeyItem?.RefreshKeyEnable(r, e);
  }
}
exports.SpecialEnergyBarSlotPlayUse = SpecialEnergyBarSlotPlayUse;
//# sourceMappingURL=SpecialEnergyBarSlotPlayUse.js.map