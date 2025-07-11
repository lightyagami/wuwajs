"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarFeibiSlot = undefined;
const UE = require("ue");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
const EFFECT_BASE_PERCENT = 19 / 41;
const TOTAL_POINT_NUM = 19;
const CHANGE_EFFECT_OFFSET_X = 184.5;
const CHANGE_EFFECT_WIDTH = 369;
class SpecialEnergyBarFeibiSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments);
    this.rdt = [0, 0];
  }
  OnStart() {
    if (this.Config?.EffectColor) {
      var e = UE.Color.FromHex(this.Config.EffectColor);
      var t = new UE.LinearColor(e);
      for (const E of this.SlotItemList) {
        E.SetBarColor(e);
        E.SetChangeEffectColor(t);
      }
    }
    super.OnStart();
  }
  RefreshBarPercent(t = false) {
    var E = this.PercentMachine.GetCurPercent();
    var e = this.GetKeyEnable();
    for (let e = 0; e < this.SlotItemList.length; e++) {
      var r = this.SlotItemList[e];
      var s = Math.floor((E * 2 - e) * TOTAL_POINT_NUM) / TOTAL_POINT_NUM;
      var s = Math.max(s, 0);
      var i = (s = Math.min(s, 1)) * EFFECT_BASE_PERCENT;
      r.UpdatePercentWithFullEffect(s, i, t);
      if (this.rdt[e] > i && !t) {
        r.SetChangeEffectOffsetX(CHANGE_EFFECT_OFFSET_X + CHANGE_EFFECT_WIDTH * i);
        r.PlayChangeEffectWithPercent(this.rdt[e] - i);
      }
      this.rdt[e] = i;
    }
    this.KeyItem?.RefreshKeyEnable(e, t);
  }
}
exports.SpecialEnergyBarFeibiSlot = SpecialEnergyBarFeibiSlot;
//# sourceMappingURL=SpecialEnergyBarFeibiSlot.js.map