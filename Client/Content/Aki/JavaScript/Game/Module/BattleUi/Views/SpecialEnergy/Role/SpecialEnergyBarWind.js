"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarWind = undefined;
const UE = require("ue");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
const EFFECT_BASE_PERCENT = 18 / 41;
class SpecialEnergyBarWind extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.Rdt = undefined;
    this.DB = false;
    this.eEc = false;
    this.tEc = (t, e) => {
      this.iEc(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem());
    await Promise.all(t);
  }
  async InitBarItem() {
    this.Rdt = new SpecialEnergyBarSlot_1.SpecialEnergyBarSlot();
    this.Rdt.ForceHideBottomLine = true;
    this.Rdt.ForceEffectBasePercent = EFFECT_BASE_PERCENT;
    this.Rdt.InitData(this.RoleData, this.Config, true);
    await this.Rdt.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(4);
    this.InitTweenAnim(5);
    this.Gdl(true);
    var t = this.TagComponent?.HasTag(1356344465) ?? false;
    this.iEc(t, true);
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(1356344465, this.tEc);
  }
  OnBarPercentChanged() {
    this.Gdl();
  }
  OnKeyEnableChanged() {
    this.Gdl();
  }
  Gdl(t = false) {
    var e = this.GetKeyEnable();
    this.rEc(e, t);
  }
  rEc(t, e = false) {
    if ((this.DB !== t || !!e) && !((this.DB = t) ? (this.GetItem(1)?.SetUIActive(false), this.GetItem(2)?.SetUIActive(true)) : (this.GetItem(1)?.SetUIActive(true), this.GetItem(2)?.SetUIActive(false)), e)) {
      if (t) {
        this.PlayTweenAnim(4);
        this.StopTweenAnim(5);
      } else {
        this.StopTweenAnim(4);
        this.PlayTweenAnim(5);
      }
    }
  }
  iEc(t, e = false) {
    if (this.eEc !== t || !!e) {
      this.eEc = t;
      this.GetItem(3)?.SetUIActive(!t);
    }
  }
  Tick(t) {
    super.Tick(t);
    this.Rdt?.Tick(t);
  }
}
exports.SpecialEnergyBarWind = SpecialEnergyBarWind;
//# sourceMappingURL=SpecialEnergyBarWind.js.map