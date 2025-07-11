"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarZheZhiEffectItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class SpecialEnergyBarZheZhiEffectItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Hnt = undefined;
    this.yne = false;
  }
  async InitAsync(t) {
    await this.CreateThenShowByResourceIdAsync("UiItem_BarSlot_1105", t, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UINiagara], [3, UE.UINiagara], [4, UE.UINiagara], [5, UE.UIItem], [6, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    this.GetUiNiagara(3).SetUIActive(false);
    this.GetUiNiagara(4).SetUIActive(false);
    this.Est(5);
    this.Est(6);
  }
  SetNiagaraParam(t, e) {
    this.GetUiNiagara(2).SetNiagaraVarFloat(t, e);
  }
  SetVisible(t) {
    if (this.yne !== t) {
      if (this.yne = t) {
        this.Gnt(6);
        this.GetUiNiagara(4).SetUIActive(false);
        this.bnt(5);
      } else {
        this.Gnt(5);
        this.GetUiNiagara(3).SetUIActive(false);
        this.bnt(6);
      }
    }
  }
  OnBeforeHide() {
    this.Hnt = undefined;
  }
  Est(t) {
    var e = [];
    var i = this.GetItem(t).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var s = i.Num();
    for (let t = 0; t < s; t++) {
      e.push(i.Get(t));
    }
    this.Hnt ||= new Map();
    this.Hnt.set(t, e);
  }
  bnt(t) {
    t = this.Hnt?.get(t);
    if (t) {
      for (const e of t) {
        e.Play();
      }
    }
  }
  Gnt(t) {
    t = this.Hnt?.get(t);
    if (t) {
      for (const e of t) {
        e.Stop();
      }
    }
  }
}
exports.SpecialEnergyBarZheZhiEffectItem = SpecialEnergyBarZheZhiEffectItem;
//# sourceMappingURL=SpecialEnergyBarZheZhiEffectItem.js.map