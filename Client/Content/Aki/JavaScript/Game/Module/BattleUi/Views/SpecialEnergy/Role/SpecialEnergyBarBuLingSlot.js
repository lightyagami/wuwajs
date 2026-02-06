"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarBuLingSlot = undefined;
const UE = require("ue");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarBuLingSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments);
    this.RTm = false;
    this.wTm = false;
  }
  OnStart() {
    this.OverrideColor = false;
    if (this.Config?.EffectColor) {
      this.LTm(0, this.Config.EffectColor, this.Config.PointColor);
      this.LTm(1, this.Config.OtherEffectColorList[0], this.Config.PointColorList[1]);
    }
    super.OnStart();
  }
  LTm(t, s, e) {
    var s = UE.Color.FromHex(s);
    var i = new UE.LinearColor(s);
    var e = UE.Color.FromHex(e);
    this.SlotItemList[t].SetBarColor(s);
    this.SlotItemList[t].SetPointColor(e);
    this.SlotItemList[t].SetFullEffectColor(i, false);
  }
  SetState(t, s) {
    this.RTm = t;
    this.wTm = s;
    this.RefreshBarPercent();
  }
  RefreshBarPercent(t = false) {
    var s = this.RTm && this.wTm;
    this.SlotItemList[0].UpdatePercent(this.RTm ? 1 : 0, false);
    this.SlotItemList[1].UpdatePercent(this.wTm ? 1 : 0, false);
    this.KeyItem?.RefreshKeyEnable(s, t);
  }
}
exports.SpecialEnergyBarBuLingSlot = SpecialEnergyBarBuLingSlot;
//# sourceMappingURL=SpecialEnergyBarBuLingSlot.js.map