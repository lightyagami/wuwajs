"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarKanTeLeiLaSlot = undefined;
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarKanTeLeiLaSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments);
    this.FullEffectForceDisable = false;
  }
  RefreshBarPercent(e = false) {
    var t = this.PercentMachine.GetCurPercent();
    var r = this.GetKeyEnable();
    var s = !this.FullEffectForceDisable && r;
    for (let e = 0; e < this.SlotItemList.length; e++) {
      this.SlotItemList[e].UpdatePercent(t * this.SlotNum - e, s);
    }
    this.KeyItem?.RefreshKeyEnable(r, e);
  }
}
exports.SpecialEnergyBarKanTeLeiLaSlot = SpecialEnergyBarKanTeLeiLaSlot;
//# sourceMappingURL=SpecialEnergyBarKanTeLeiLaSlot.js.map