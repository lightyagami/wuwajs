"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SpecialEnergyBarSlotPlayUse = void 0;
const SpecialEnergyBarSlot_1 = require("./SpecialEnergyBarSlot");
class SpecialEnergyBarSlotPlayUse extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments), this.lou = new Array
  }
  async InitSlotItem(e) {
    await super.InitSlotItem(e), this.lou.push(0)
  }
  RefreshBarPercent(e = !1) {
    var t = this.PercentMachine.GetCurPercent(),
      r = this.GetKeyEnable();
    for (let e = 0; e < this.SlotItemList.length; e++) {
      var s = this.SlotItemList[e],
        a = t * this.SlotNum - e;
      s.UpdatePercent(a, r), 0 < this.lou[e] && a <= 0 && s.PlayUseEffectWithPercent(this.lou[e]), this.lou[e] = a
    }
    this.KeyItem?.RefreshKeyEnable(r, e)
  }
}
exports.SpecialEnergyBarSlotPlayUse = SpecialEnergyBarSlotPlayUse;
//# sourceMappingURL=SpecialEnergyBarSlotPlayUse.js.map