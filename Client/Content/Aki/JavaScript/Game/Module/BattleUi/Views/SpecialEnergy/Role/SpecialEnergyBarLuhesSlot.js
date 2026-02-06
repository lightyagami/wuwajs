"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarLuhesSlot = undefined;
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarLuhesSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  SwitchKeyItem(e) {
    if (e) {
      this.Config = e;
      this.AttributeId = e.AttributeId;
      this.MaxAttributeId = e.MaxAttributeId;
      this.RemoveEvents();
      this.AddEvents();
      this.OnAttributeChanged();
      this.KeyItem?.SwitchToKeyInfoList(e.KeyInfoList);
    }
  }
}
exports.SpecialEnergyBarLuhesSlot = SpecialEnergyBarLuhesSlot;
//# sourceMappingURL=SpecialEnergyBarLuhesSlot.js.map