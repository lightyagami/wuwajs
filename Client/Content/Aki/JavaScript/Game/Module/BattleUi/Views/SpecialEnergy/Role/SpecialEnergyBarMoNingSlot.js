"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarMoNingSlot = undefined;
const UE = require("ue");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarMoNingSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  SwitchPointColor(e) {
    e = UE.Color.FromHex(this.Config?.PointColorList[e ? 1 : 0] ?? "ffffff");
    this.SlotItemList[0].SetPointColor(e);
  }
}
exports.SpecialEnergyBarMoNingSlot = SpecialEnergyBarMoNingSlot;
//# sourceMappingURL=SpecialEnergyBarMoNingSlot.js.map