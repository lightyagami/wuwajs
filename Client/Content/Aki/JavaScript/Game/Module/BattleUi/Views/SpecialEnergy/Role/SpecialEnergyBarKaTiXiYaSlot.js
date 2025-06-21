"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SpecialEnergyBarKaTiXiYaSlot = void 0;
const UE = require("ue"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  normalTagIds = [-365754222, -1911043416, 1499871730],
  collectTagIds = [1020759813, 560609209, 1725788623],
  SLOT_NUM = 3,
  COLLECT_EFFECT_DURATION = 800,
  COLLECT_IN_EFFECT_DURATION = 1e3,
  COLLECT_OUT_EFFECT_DURATION = 500;
class SpecialEnergyBarKaTiXiYaSlot extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments), this.icu = [], this.rcu = [], this.ocu = [], this.ncu = [], this.scu = [], this.acu = [0, 0, 0, 0, 0, 0, 0, 0, 0], this.Fdt = !1, this.UiKeyItem = void 0, this.hcu = (t, s) => {
      t = normalTagIds.indexOf(t);
      t < 0 || this.icu[t] === s || (this.icu[t] = s, this._Oe(!1), s ? this._cu(3 + t, COLLECT_IN_EFFECT_DURATION) : this._cu(6 + t, COLLECT_OUT_EFFECT_DURATION))
    }, this.lcu = (t, s) => {
      t = collectTagIds.indexOf(t);
      t < 0 || this.rcu[t] === s || (this.rcu[t] = s, this._Oe(!1), s && this._cu(t, COLLECT_EFFECT_DURATION))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UINiagara],
      [4, UE.UINiagara],
      [5, UE.UINiagara],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UINiagara],
      [16, UE.UINiagara],
      [17, UE.UINiagara],
      [18, UE.UINiagara],
      [19, UE.UINiagara],
      [20, UE.UINiagara],
      [21, UE.UINiagara],
      [22, UE.UINiagara],
      [23, UE.UINiagara],
      [24, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    this.UiKeyItem && await this.InitKeyItem(this.UiKeyItem)
  }
  OnStart() {
    super.OnStart(), this.ocu.push([this.GetItem(0), this.GetItem(1), this.GetItem(2)]), this.ocu.push([this.GetUiNiagara(3), this.GetUiNiagara(4), this.GetUiNiagara(5)]), this.ocu.push([this.GetItem(12), this.GetItem(13), this.GetItem(14)]), this.ncu.push([this.GetItem(6), this.GetItem(7), this.GetItem(8)]), this.ncu.push([this.GetItem(9), this.GetItem(10), this.GetItem(11)]), this.scu.push(this.GetUiNiagara(15)), this.scu.push(this.GetUiNiagara(16)), this.scu.push(this.GetUiNiagara(17)), this.scu.push(this.GetUiNiagara(18)), this.scu.push(this.GetUiNiagara(20)), this.scu.push(this.GetUiNiagara(22)), this.scu.push(this.GetUiNiagara(15)), this.scu.push(this.GetUiNiagara(16)), this.scu.push(this.GetUiNiagara(17)), this._Oe(!0), this.ucu()
  }
  ucu() {
    for (const t of normalTagIds) this.ListenForTagAddOrRemoveChanged(t, this.hcu);
    for (const s of collectTagIds) this.ListenForTagAddOrRemoveChanged(s, this.lcu)
  }
  _Oe(s = !1) {
    if (this.TagComponent) {
      if (s) {
        for (const i of normalTagIds) this.icu.push(this.TagComponent.HasTag(i));
        for (const E of collectTagIds) this.rcu.push(this.TagComponent.HasTag(E))
      }
      let t = !1,
        h = !0;
      for (let i = 0; i < SLOT_NUM; i++) {
        var e = this.icu[i];
        let s = 0;
        this.rcu[i] ? s = 2 : e ? (s = 1, t = !0) : h = !1;
        for (let t = 0; t < 3; t++) this.ocu[t][i].SetUIActive(t === s);
        this.ncu[0][i].SetUIActive(0 === s), this.ncu[1][i].SetUIActive(0 !== s)
      }
      this.KeyItem?.RefreshKeyEnable(t, s), this.GetItem(24)?.SetUIActive(h)
    }
  }
  _cu(t, s) {
    var i = this.scu[t];
    i && (i.SetUIActive(!0), this.acu[t] = Time_1.Time.Now + s, this.Fdt = !0)
  }
  RefreshVisible() {}
  Tick(t) {
    if (super.Tick(t), this.Fdt) {
      this.Fdt = !1;
      for (let t = 0; t < this.acu.length; t++) {
        var s = this.acu[t];
        0 < s && s < Time_1.Time.Now ? (this.scu[t].SetUIActive(!1), this.acu[t] = 0) : this.Fdt = !0
      }
    }
  }
}
exports.SpecialEnergyBarKaTiXiYaSlot = SpecialEnergyBarKaTiXiYaSlot;
//# sourceMappingURL=SpecialEnergyBarKaTiXiYaSlot.js.map