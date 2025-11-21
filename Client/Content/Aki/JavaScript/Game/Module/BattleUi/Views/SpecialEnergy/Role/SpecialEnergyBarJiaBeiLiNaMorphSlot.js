"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarJiaBeiLiNaMorphSlot = undefined;
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarJiaBeiLiNaMorphSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  RefreshBarPercent(e = false) {
    var r = this.PercentMachine.GetCurPercent();
    this.SlotItemList[0].UpdatePercentWithFullEffect(r, r, e);
  }
}
exports.SpecialEnergyBarJiaBeiLiNaMorphSlot = SpecialEnergyBarJiaBeiLiNaMorphSlot;
//# sourceMappingURL=SpecialEnergyBarJiaBeiLiNaMorphSlot.js.map