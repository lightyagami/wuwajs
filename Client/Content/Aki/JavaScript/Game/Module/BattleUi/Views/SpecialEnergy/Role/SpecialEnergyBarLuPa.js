"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarLuPa = undefined;
const UE = require("ue");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarLuPaSlot_1 = require("./SpecialEnergyBarLuPaSlot");
class SpecialEnergyBarLuPa extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.cer = 0;
    this.Rdt = undefined;
    this.tYo = t => {
      this.Uvu(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UINiagara], [6, UE.UINiagara], [7, UE.UIItem], [8, UE.UIItem]];
  }
  OnInitData() {
    super.OnInitData();
    this.ListenForTagCountChanged(682210009, this.tYo);
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem());
    await Promise.all(t);
  }
  async InitBarItem() {
    this.Rdt = new SpecialEnergyBarLuPaSlot_1.SpecialEnergyBarLuPaSlot();
    this.Rdt.InitData(this.RoleData, this.Config);
    this.Rdt.ForceHideBottomLine = true;
    await this.Rdt.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(3);
    this.InitTweenAnim(4);
    this.InitTweenAnim(7);
    this.InitTweenAnim(8);
    var t = this.TagComponent?.GetTagCount(682210009) ?? 0;
    this.Uvu(t, true);
  }
  Uvu(t, i = false) {
    if (t !== this.cer || i) {
      var s = this.cer;
      this.cer = t;
      this.Rdt.SetTagCount(this.cer);
      this.CSu(this.cer >= 2);
      if (i) {
        if (this.cer >= 2) {
          this.PlayTweenAnim(3);
          this.PlayTweenAnim(7);
        } else if (this.cer === 1) {
          this.PlayTweenAnim(3);
        }
      } else if (s > this.cer) {
        for (let t = this.cer; t < s; t++) {
          if (t === 0) {
            this.StopTweenAnim(3);
            this.PlayTweenAnim(4);
          } else if (t === 1) {
            this.StopTweenAnim(7);
            this.PlayTweenAnim(8);
          }
        }
      } else {
        for (let t = s; t < this.cer; t++) {
          if (t === 0) {
            this.StopTweenAnim(4);
            this.PlayTweenAnim(3);
          } else if (t === 1) {
            this.StopTweenAnim(8);
            this.PlayTweenAnim(7);
          }
        }
      }
    }
  }
  CSu(t) {
    this.GetItem(1)?.SetUIActive(!t);
    this.GetItem(2)?.SetUIActive(t);
  }
  Tick(t) {
    super.Tick(t);
    this.Rdt?.Tick(t);
  }
}
exports.SpecialEnergyBarLuPa = SpecialEnergyBarLuPa;
//# sourceMappingURL=SpecialEnergyBarLuPa.js.map