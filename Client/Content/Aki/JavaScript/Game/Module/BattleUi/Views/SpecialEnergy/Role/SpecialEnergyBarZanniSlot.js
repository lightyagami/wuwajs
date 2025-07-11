"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarZanniSlot = undefined;
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarZanniSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments);
    this.BottomLineLight = undefined;
    this.DarkItemList = [];
    this.FullEffectWhenEnable = false;
    this.ac = 0;
  }
  RefreshBarPercent(e = false) {
    var s = this.PercentMachine.GetCurPercent();
    if (this.FullEffectWhenEnable) {
      var i = this.GetKeyEnable();
      for (let t = 0; t < this.SlotItemList.length; t++) {
        var r = this.SlotItemList[t];
        var a = s * this.SlotNum - t;
        r.UpdatePercentWithFullEffectEnable(a, i, e);
      }
      this.KeyItem?.RefreshKeyEnable(i, e);
    } else {
      super.RefreshBarPercent(e);
      let t = 0;
      if (s <= 0) {
        t = -1;
      } else if (s >= 1) {
        t = 1;
      }
      this.Owt(t, e);
    }
  }
  Owt(t, e = false) {
    if (this.ac !== t || e) {
      this.ac = t;
      this.BottomLineLight?.SetUIActive(this.ac === 1);
      for (const s of this.DarkItemList) {
        s.SetUIActive(this.ac !== -1);
      }
    }
  }
}
exports.SpecialEnergyBarZanniSlot = SpecialEnergyBarZanniSlot;
//# sourceMappingURL=SpecialEnergyBarZanniSlot.js.map