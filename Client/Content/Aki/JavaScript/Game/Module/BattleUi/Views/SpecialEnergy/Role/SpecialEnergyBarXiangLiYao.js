"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarXiangLiYao = undefined;
const SpecialEnergyBarMorph_1 = require("../SpecialEnergyBarMorph");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarXiangLiYao extends SpecialEnergyBarMorph_1.SpecialEnergyBarMorph {
  OnBeforeShow() {
    var e;
    super.OnBeforeShow();
    if (this.NiagaraList[0]) {
      (e = this.BarItem).ReplaceFullEffect(this.NiagaraList[0]);
      e.UpdateFullEffectOffsetBySlotWidth();
    }
  }
  GetSpecialEnergyBarClass() {
    return SpecialEnergyBarSlot_1.SpecialEnergyBarSlot;
  }
}
exports.SpecialEnergyBarXiangLiYao = SpecialEnergyBarXiangLiYao;
//# sourceMappingURL=SpecialEnergyBarXiangLiYao.js.map