"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SpecialEnergyBarLuPa = void 0;
const UE = require("ue"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  SpecialEnergyBarLuPaSlot_1 = require("./SpecialEnergyBarLuPaSlot");
class SpecialEnergyBarLuPa extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments), this.cer = 0, this.Rdt = void 0, this.tYo = t => {
      this.L1u(t)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UINiagara],
      [6, UE.UINiagara],
      [7, UE.UIItem],
      [8, UE.UIItem]
    ]
  }
  OnInitData() {
    super.OnInitData(), this.ListenForTagCountChanged(682210009, this.tYo)
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem()), await Promise.all(t)
  }
  async InitBarItem() {
    this.Rdt = new SpecialEnergyBarLuPaSlot_1.SpecialEnergyBarLuPaSlot, this.Rdt.InitData(this.RoleData, this.Config), this.Rdt.ForceHideBottomLine = !0, await this.Rdt.InitByActorAsync(this.GetItem(0).GetOwner())
  }
  OnStart() {
    this.InitTweenAnim(3), this.InitTweenAnim(4), this.InitTweenAnim(7), this.InitTweenAnim(8);
    var t = this.TagComponent?.GetTagCount(682210009) ?? 0;
    this.L1u(t, !0)
  }
  L1u(t, i = !1) {
    if (t !== this.cer || i) {
      var s = this.cer;
      if (this.cer = t, this.Rdt.SetTagCount(this.cer), this._uu(2 <= this.cer), i) 2 <= this.cer ? (this.PlayTweenAnim(3), this.PlayTweenAnim(7)) : 1 === this.cer && this.PlayTweenAnim(3);
      else if (s > this.cer)
        for (let t = this.cer; t < s; t++) 0 === t ? (this.StopTweenAnim(3), this.PlayTweenAnim(4)) : 1 === t && (this.StopTweenAnim(7), this.PlayTweenAnim(8));
      else
        for (let t = s; t < this.cer; t++) 0 === t ? (this.StopTweenAnim(4), this.PlayTweenAnim(3)) : 1 === t && (this.StopTweenAnim(8), this.PlayTweenAnim(7))
    }
  }
  _uu(t) {
    this.GetItem(1)?.SetUIActive(!t), this.GetItem(2)?.SetUIActive(t)
  }
  Tick(t) {
    super.Tick(t), this.Rdt?.Tick(t)
  }
}
exports.SpecialEnergyBarLuPa = SpecialEnergyBarLuPa;
//# sourceMappingURL=SpecialEnergyBarLuPa.js.map