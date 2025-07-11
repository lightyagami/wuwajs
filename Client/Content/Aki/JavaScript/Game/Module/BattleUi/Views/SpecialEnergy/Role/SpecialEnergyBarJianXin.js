"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarJianXin = undefined;
const SpecialEnergyBarPointGraduate_1 = require("../SpecialEnergyBarPointGraduate");
class SpecialEnergyBarJianXin extends SpecialEnergyBarPointGraduate_1.SpecialEnergyBarPointGraduate {
  constructor() {
    super(...arguments);
    this.zmt = 0;
    this.Zmt = t => {
      if (t > 0) {
        this.SlotItem.PlayUseEffectWithPercent(this.zmt);
      }
    };
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagCountChanged(2044061337, this.Zmt);
  }
  RefreshBarPercent(t = false) {
    let i = this.PercentMachine.GetCurPercent();
    if (this.PercentMachine.GetTargetPercent() === 1) {
      i = 1;
    }
    this.IsKeyEnable = i >= this.Config.DisableKeyOnPercent;
    let s = true;
    let e = false;
    if (t) {
      s = i < 1;
    } else if (i > this.LastPercent) {
      e = i >= 1;
      s = !e;
    } else if (i < this.LastPercent) {
      e = i <= 0;
      s = e;
    }
    this.SlotItem.UpdatePercentWithVisible(i, s, e, t, e && s ? 0 : this.LastPercent);
    this.PointItem.UpdatePercentWithVisible(i, !s, e, t);
    if (e || t) {
      for (const r of this.GraduateItemList) {
        r.SetUIActive(!s);
      }
    }
    this.KeyItem?.RefreshKeyEnable(this.IsKeyEnable, t);
    if (i === 0) {
      this.zmt = this.LastPercent;
    }
    this.LastPercent = i;
  }
}
exports.SpecialEnergyBarJianXin = SpecialEnergyBarJianXin;
//# sourceMappingURL=SpecialEnergyBarJianXin.js.map