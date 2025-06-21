"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SpecialEnergyBarLuPaSlot = void 0;
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarLuPaSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments), this.cer = 0
  }
  SetTagCount(t) {
    this.cer = t, this.RefreshBarPercent()
  }
  RefreshBarPercent(t = !1) {
    var e = this.PercentMachine.GetCurPercent(),
      r = this.GetKeyEnable();
    for (let t = 0; t < this.SlotItemList.length; t++) {
      var s = this.SlotItemList[t];
      t < this.cer ? s.UpdatePercent(e * this.SlotNum - t, !1, !0) : s.UpdatePercent(e * this.SlotNum - t, r, !0)
    }
    var i = Math.floor(e * this.SlotNum);
    this.KeyItem?.RefreshKeyEnable(r && this.cer < i, t)
  }
}
exports.SpecialEnergyBarLuPaSlot = SpecialEnergyBarLuPaSlot;
//# sourceMappingURL=SpecialEnergyBarLuPaSlot.js.map