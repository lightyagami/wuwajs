"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarLuPaSlot = undefined;
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarLuPaSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments);
    this.cer = 0;
  }
  SetTagCount(t) {
    this.cer = t;
    this.RefreshBarPercent();
  }
  RefreshBarPercent(t = false) {
    var e = this.PercentMachine.GetCurPercent();
    var r = this.GetKeyEnable();
    for (let t = 0; t < this.SlotItemList.length; t++) {
      var s = this.SlotItemList[t];
      if (t < this.cer) {
        s.UpdatePercent(e * this.SlotNum - t, false, true);
      } else {
        s.UpdatePercent(e * this.SlotNum - t, r, true);
      }
    }
    var i = Math.floor(e * this.SlotNum);
    this.KeyItem?.RefreshKeyEnable(r && this.cer < i, t);
  }
}
exports.SpecialEnergyBarLuPaSlot = SpecialEnergyBarLuPaSlot;
//# sourceMappingURL=SpecialEnergyBarLuPaSlot.js.map