"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarAiMiSiSlot = undefined;
const UE = require("ue");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarAiMiSiSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments);
    this.Gwc = [];
    this.sLd = [];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var t = [];
    t.push(this.LoadEffects());
    await Promise.all(t);
  }
  OnStart() {
    this.ForceEffectBasePercent = 12 / 41;
    super.OnStart();
    for (const t of this.SlotItemList) {
      t.SetFullEffectPercent(1);
    }
  }
  OnInitData() {
    var t;
    if ((super.OnInitData(), this.Config) && (this.Config.EffectColor && (t = UE.Color.FromHex(this.Config.EffectColor), this.Gwc.push(t)), this.Config.OtherEffectColorList[0] && (t = UE.Color.FromHex(this.Config.OtherEffectColorList[0]), this.Gwc.push(t)), this.Config.PointColorList.length >= 2)) {
      for (let t = 0; t < 2; t++) {
        this.sLd.push(UE.Color.FromHex(this.Config.PointColorList[t]));
      }
    }
  }
  RefreshBarPercent(t = false) {
    var i = this.PercentMachine.GetCurPercent();
    var s = this.GetKeyEnable();
    for (let t = 0; t < this.SlotItemList.length; t++) {
      this.SlotItemList[t].UpdatePercent(i * this.SlotNum - t, true);
    }
    this.KeyItem?.RefreshKeyEnable(s, t);
  }
  SetBarColor(t) {
    for (const i of this.SlotItemList) {
      i.SetBarColor(this.Gwc[t]);
      i.SetPointColor(this.sLd[t]);
    }
    if (t === 0) {
      this.RevertFullEffect();
    } else {
      this.ReplaceFullEffect(this.NiagaraList[t - 1]);
    }
  }
  SetKeyVisible(t) {
    this.GetItem(this.SlotNum)?.SetUIActive(t);
  }
}
exports.SpecialEnergyBarAiMiSiSlot = SpecialEnergyBarAiMiSiSlot;
//# sourceMappingURL=SpecialEnergyBarAiMiSiSlot.js.map