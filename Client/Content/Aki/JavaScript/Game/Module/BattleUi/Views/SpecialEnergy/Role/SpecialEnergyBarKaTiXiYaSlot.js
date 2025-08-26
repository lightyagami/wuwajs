"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarKaTiXiYaSlot = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../../Core/Common/Time");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const normalTagIds = [-365754222, -1911043416, 1499871730];
const collectTagIds = [1020759813, 560609209, 1725788623];
const SLOT_NUM = 3;
const COLLECT_EFFECT_DURATION = 800;
const COLLECT_IN_EFFECT_DURATION = 1000;
const COLLECT_OUT_EFFECT_DURATION = 500;
class SpecialEnergyBarKaTiXiYaSlot extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.xIu = [];
    this.UIu = [];
    this.DIu = [];
    this.BIu = [];
    this.kIu = [];
    this.OIu = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.Fdt = false;
    this.UiKeyItem = undefined;
    this.qIu = (t, s) => {
      t = normalTagIds.indexOf(t);
      if (!(t < 0) && this.xIu[t] !== s) {
        this.xIu[t] = s;
        this._Oe(false);
        if (s) {
          this.FIu(3 + t, COLLECT_IN_EFFECT_DURATION);
        } else {
          this.FIu(6 + t, COLLECT_OUT_EFFECT_DURATION);
        }
      }
    };
    this.GIu = (t, s) => {
      t = collectTagIds.indexOf(t);
      if (!(t < 0) && this.UIu[t] !== s) {
        this.UIu[t] = s;
        this._Oe(false);
        if (s) {
          this.FIu(t, COLLECT_EFFECT_DURATION);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UINiagara], [4, UE.UINiagara], [5, UE.UINiagara], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UINiagara], [16, UE.UINiagara], [17, UE.UINiagara], [18, UE.UINiagara], [19, UE.UINiagara], [20, UE.UINiagara], [21, UE.UINiagara], [22, UE.UINiagara], [23, UE.UINiagara], [24, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    if (this.UiKeyItem) {
      await this.InitKeyItem(this.UiKeyItem);
    }
  }
  OnStart() {
    super.OnStart();
    this.DIu.push([this.GetItem(0), this.GetItem(1), this.GetItem(2)]);
    this.DIu.push([this.GetUiNiagara(3), this.GetUiNiagara(4), this.GetUiNiagara(5)]);
    this.DIu.push([this.GetItem(12), this.GetItem(13), this.GetItem(14)]);
    this.BIu.push([this.GetItem(6), this.GetItem(7), this.GetItem(8)]);
    this.BIu.push([this.GetItem(9), this.GetItem(10), this.GetItem(11)]);
    this.kIu.push(this.GetUiNiagara(15));
    this.kIu.push(this.GetUiNiagara(16));
    this.kIu.push(this.GetUiNiagara(17));
    this.kIu.push(this.GetUiNiagara(18));
    this.kIu.push(this.GetUiNiagara(20));
    this.kIu.push(this.GetUiNiagara(22));
    this.kIu.push(this.GetUiNiagara(15));
    this.kIu.push(this.GetUiNiagara(16));
    this.kIu.push(this.GetUiNiagara(17));
    this._Oe(true);
    this.NIu();
  }
  NIu() {
    for (const t of normalTagIds) {
      this.ListenForTagAddOrRemoveChanged(t, this.qIu);
    }
    for (const s of collectTagIds) {
      this.ListenForTagAddOrRemoveChanged(s, this.GIu);
    }
  }
  _Oe(s = false) {
    if (this.TagComponent) {
      if (s) {
        for (const i of normalTagIds) {
          this.xIu.push(this.TagComponent.HasTag(i));
        }
        for (const E of collectTagIds) {
          this.UIu.push(this.TagComponent.HasTag(E));
        }
      }
      let t = false;
      let h = true;
      for (let i = 0; i < SLOT_NUM; i++) {
        var e = this.xIu[i];
        let s = 0;
        if (this.UIu[i]) {
          s = 2;
        } else if (e) {
          s = 1;
          t = true;
        } else {
          h = false;
        }
        for (let t = 0; t < 3; t++) {
          this.DIu[t][i].SetUIActive(t === s);
        }
        this.BIu[0][i].SetUIActive(s === 0);
        this.BIu[1][i].SetUIActive(s !== 0);
      }
      this.KeyItem?.RefreshKeyEnable(t, s);
      this.GetItem(24)?.SetUIActive(h);
    }
  }
  FIu(t, s) {
    var i = this.kIu[t];
    if (i) {
      i.SetUIActive(true);
      this.OIu[t] = Time_1.Time.Now + s;
      this.Fdt = true;
    }
  }
  RefreshVisible() {}
  Tick(t) {
    super.Tick(t);
    if (this.Fdt) {
      this.Fdt = false;
      for (let t = 0; t < this.OIu.length; t++) {
        var s = this.OIu[t];
        if (s > 0 && s < Time_1.Time.Now) {
          this.kIu[t].SetUIActive(false);
          this.OIu[t] = 0;
        } else {
          this.Fdt = true;
        }
      }
    }
  }
}
exports.SpecialEnergyBarKaTiXiYaSlot = SpecialEnergyBarKaTiXiYaSlot;
//# sourceMappingURL=SpecialEnergyBarKaTiXiYaSlot.js.map