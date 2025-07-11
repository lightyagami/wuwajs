"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarPoint = undefined;
const UE = require("ue");
const SpecialEnergyBarBase_1 = require("./SpecialEnergyBarBase");
const SpecialEnergyBarPointItem_1 = require("./SpecialEnergyBarPointItem");
const POINT_NUM = 41;
const POINT_WIDTH = 9;
class SpecialEnergyBarPoint extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.edt = undefined;
    this.IsMorph = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    e.push(this.InitPointItem(this.GetItem(0)));
    e.push(this.InitKeyItem(this.GetItem(1)));
    await Promise.all(e);
  }
  async InitPointItem(e) {
    this.edt = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem();
    this.edt.InitPrefabInfo(POINT_NUM, POINT_WIDTH);
    await this.edt.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnStart() {
    var e;
    if (this.Config) {
      if (this.Config.EffectColor) {
        e = new UE.LinearColor(UE.Color.FromHex(this.Config.EffectColor));
        this.edt.SetFullEffectColor(e);
      }
      this.GetItem(2).SetUIActive(!this.IsMorph);
      this.RefreshBarPercent(true);
    }
  }
  RefreshBarPercent(e = false) {
    var t = this.PercentMachine.GetCurPercent();
    this.edt.UpdatePercent(t);
    this.KeyItem?.RefreshKeyEnable(this.GetKeyEnable(), e);
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  OnKeyEnableChanged() {
    this.RefreshBarPercent();
  }
  Tick(e) {
    super.Tick(e);
    this.edt?.Tick(e);
  }
}
exports.SpecialEnergyBarPoint = SpecialEnergyBarPoint;
//# sourceMappingURL=SpecialEnergyBarPoint.js.map