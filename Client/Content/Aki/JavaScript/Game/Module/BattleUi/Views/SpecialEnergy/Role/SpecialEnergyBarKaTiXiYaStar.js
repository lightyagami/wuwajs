"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarKaTiXiYaStar = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const ALPHA_ANIM_TIME = 300;
class SpecialEnergyBarKaTiXiYaStar extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.cAu = 0;
    this.VIu = -1;
    this.dAu = [];
    this.mAu = [];
    this.Fdt = false;
    this.fAu = 1;
  }
  OnRegisterComponent() {
    this.cAu = SpecialEnergyBarKaTiXiYaStar.StarTotalNum * 2 - 1;
    for (let t = 0; t < this.cAu; t++) {
      this.ComponentRegisterInfos.push([t, UE.UIItem]);
    }
  }
  OnStart() {
    for (let t = 0; t < this.cAu; t++) {
      this.dAu.push(1);
      this.mAu.push(1);
    }
    this.fAu = 1 / ALPHA_ANIM_TIME;
  }
  SetStarNum(t) {
    if (this.VIu !== t) {
      var i = Math.max(t * 2 - 1, 0);
      if (this.VIu === -1) {
        for (let t = 0; t < this.cAu; t++) {
          this.GetItem(t).SetUIActive(t < i);
          this.GetItem(t).SetAlpha(1);
        }
      } else {
        var s = Math.max(this.VIu * 2 - 1, 0);
        if (i < s) {
          for (let t = i; t < s; t++) {
            this.gAu(t);
          }
        } else {
          for (let t = s; t < i; t++) {
            this.GetItem(t).SetUIActive(true);
            this.CAu(t);
          }
        }
      }
      this.VIu = t;
    }
  }
  gAu(t) {
    this.dAu[t] = 0;
    this.Fdt = true;
  }
  CAu(t) {
    this.dAu[t] = 1;
    this.mAu[t] = 1;
    this.GetItem(t).SetAlpha(1);
  }
  Tick(t) {
    if (this.Fdt) {
      this.Fdt = false;
      var i = t * this.fAu;
      for (let t = 0; t < this.cAu; t++) {
        if (this.mAu[t] !== this.dAu[t] && (this.mAu[t] < this.dAu[t] || (this.mAu[t] -= i, this.mAu[t] <= this.dAu[t]) ? this.mAu[t] = this.dAu[t] : this.Fdt = true, this.GetItem(t).SetAlpha(this.mAu[t]), this.mAu[t] === 0)) {
          this.GetItem(t).SetUIActive(false);
        }
      }
    }
  }
}
(exports.SpecialEnergyBarKaTiXiYaStar = SpecialEnergyBarKaTiXiYaStar).StarTotalNum = 6;
//# sourceMappingURL=SpecialEnergyBarKaTiXiYaStar.js.map