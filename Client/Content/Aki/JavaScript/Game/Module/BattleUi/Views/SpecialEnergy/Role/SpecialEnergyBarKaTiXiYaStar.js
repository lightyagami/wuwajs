"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SpecialEnergyBarKaTiXiYaStar = void 0;
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  ALPHA_ANIM_TIME = 300;
class SpecialEnergyBarKaTiXiYaStar extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Vdu = 0, this.ccu = -1, this.jdu = [], this.Hdu = [], this.Fdt = !1, this.$du = 1
  }
  OnRegisterComponent() {
    this.Vdu = 2 * SpecialEnergyBarKaTiXiYaStar.StarTotalNum - 1;
    for (let t = 0; t < this.Vdu; t++) this.ComponentRegisterInfos.push([t, UE.UIItem])
  }
  OnStart() {
    for (let t = 0; t < this.Vdu; t++) this.jdu.push(1), this.Hdu.push(1);
    this.$du = 1 / ALPHA_ANIM_TIME
  }
  SetStarNum(t) {
    if (this.ccu !== t) {
      var i = Math.max(2 * t - 1, 0);
      if (-1 === this.ccu)
        for (let t = 0; t < this.Vdu; t++) this.GetItem(t).SetUIActive(t < i), this.GetItem(t).SetAlpha(1);
      else {
        var s = Math.max(2 * this.ccu - 1, 0);
        if (i < s)
          for (let t = i; t < s; t++) this.Wdu(t);
        else
          for (let t = s; t < i; t++) this.GetItem(t).SetUIActive(!0), this.Qdu(t)
      }
      this.ccu = t
    }
  }
  Wdu(t) {
    this.jdu[t] = 0, this.Fdt = !0
  }
  Qdu(t) {
    this.jdu[t] = 1, this.Hdu[t] = 1, this.GetItem(t).SetAlpha(1)
  }
  Tick(t) {
    if (this.Fdt) {
      this.Fdt = !1;
      var i = t * this.$du;
      for (let t = 0; t < this.Vdu; t++) this.Hdu[t] !== this.jdu[t] && (this.Hdu[t] < this.jdu[t] || (this.Hdu[t] -= i, this.Hdu[t] <= this.jdu[t]) ? this.Hdu[t] = this.jdu[t] : this.Fdt = !0, this.GetItem(t).SetAlpha(this.Hdu[t]), 0 === this.Hdu[t]) && this.GetItem(t).SetUIActive(!1)
    }
  }
}(exports.SpecialEnergyBarKaTiXiYaStar = SpecialEnergyBarKaTiXiYaStar).StarTotalNum = 6;
//# sourceMappingURL=SpecialEnergyBarKaTiXiYaStar.js.map