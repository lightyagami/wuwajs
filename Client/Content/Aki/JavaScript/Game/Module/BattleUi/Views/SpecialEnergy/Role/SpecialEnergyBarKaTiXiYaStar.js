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
    this.GLu = 0;
    this.LIu = -1;
    this.FLu = [];
    this.NLu = [];
    this.Fdt = false;
    this.VLu = 1;
  }
  OnRegisterComponent() {
    this.GLu = SpecialEnergyBarKaTiXiYaStar.StarTotalNum * 2 - 1;
    for (let t = 0; t < this.GLu; t++) {
      this.ComponentRegisterInfos.push([t, UE.UIItem]);
    }
  }
  OnStart() {
    for (let t = 0; t < this.GLu; t++) {
      this.FLu.push(1);
      this.NLu.push(1);
    }
    this.VLu = 1 / ALPHA_ANIM_TIME;
  }
  SetStarNum(t) {
    if (this.LIu !== t) {
      var i = Math.max(t * 2 - 1, 0);
      if (this.LIu === -1) {
        for (let t = 0; t < this.GLu; t++) {
          this.GetItem(t).SetUIActive(t < i);
          this.GetItem(t).SetAlpha(1);
        }
      } else {
        var s = Math.max(this.LIu * 2 - 1, 0);
        if (i < s) {
          for (let t = i; t < s; t++) {
            this.jLu(t);
          }
        } else {
          for (let t = s; t < i; t++) {
            this.GetItem(t).SetUIActive(true);
            this.HLu(t);
          }
        }
      }
      this.LIu = t;
    }
  }
  jLu(t) {
    this.FLu[t] = 0;
    this.Fdt = true;
  }
  HLu(t) {
    this.FLu[t] = 1;
    this.NLu[t] = 1;
    this.GetItem(t).SetAlpha(1);
  }
  Tick(t) {
    if (this.Fdt) {
      this.Fdt = false;
      var i = t * this.VLu;
      for (let t = 0; t < this.GLu; t++) {
        if (this.NLu[t] !== this.FLu[t] && (this.NLu[t] < this.FLu[t] || (this.NLu[t] -= i, this.NLu[t] <= this.FLu[t]) ? this.NLu[t] = this.FLu[t] : this.Fdt = true, this.GetItem(t).SetAlpha(this.NLu[t]), this.NLu[t] === 0)) {
          this.GetItem(t).SetUIActive(false);
        }
      }
    }
  }
}
(exports.SpecialEnergyBarKaTiXiYaStar = SpecialEnergyBarKaTiXiYaStar).StarTotalNum = 6;
//# sourceMappingURL=SpecialEnergyBarKaTiXiYaStar.js.map