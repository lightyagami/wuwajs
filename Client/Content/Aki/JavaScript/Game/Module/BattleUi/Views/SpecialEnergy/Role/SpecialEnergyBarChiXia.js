"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarChiXia = undefined;
const SpecialEnergyBarPointGraduate_1 = require("../SpecialEnergyBarPointGraduate");
const GRADUATE_ENERGY_NUM = 30;
class SpecialEnergyBarChiXia extends SpecialEnergyBarPointGraduate_1.SpecialEnergyBarPointGraduate {
  constructor() {
    super(...arguments);
    this.lne = (t, e) => {
      if (e) {
        var e = this.AttributeComponent.GetCurrentValue(this.Config.AttributeId) - GRADUATE_ENERGY_NUM;
        var s = this.AttributeComponent.GetCurrentValue(this.Config.MaxAttributeId);
        let t = s > 0 ? e / s : 0;
        if (t >= 0) {
          this.SetGraduateItemOffset(0, t);
          this.GraduateItemList[0].SetUIActive(true);
        } else {
          this.GraduateItemList[0].SetUIActive(false);
        }
      } else {
        this.GraduateItemList[0].SetUIActive(false);
      }
    };
  }
  OnInitData() {
    super.OnInitData();
    this.NeedInitSlot = false;
    this.NeedInitNumItem = true;
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(1280168885, this.lne);
  }
  RemoveEvents() {
    super.RemoveEvents();
  }
  OnStart() {
    super.OnStart();
    this.GraduateItemList[0]?.SetUIActive(false);
  }
  RefreshBarPercent(t = false) {
    var e = this.PercentMachine.GetCurPercent();
    this.PointItem.UpdatePercent(e);
    this.KeyItem?.RefreshKeyEnable(e >= this.Config.DisableKeyOnPercent, t);
    var e = this.AttributeComponent.GetCurrentValue(this.Config.AttributeId);
    this.NumItem?.SetNum(e);
  }
}
exports.SpecialEnergyBarChiXia = SpecialEnergyBarChiXia;
//# sourceMappingURL=SpecialEnergyBarChiXia.js.map