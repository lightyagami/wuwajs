"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarPointItem = exports.SpecialEnergyBarPointEffectInfo = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../Core/Common/Time");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const POINT_EFFECT_NUM = 3;
const EFFECT_DURATION = 500;
class SpecialEnergyBarPointEffectInfo {
  constructor() {
    this.Effect = undefined;
    this.FinishTime = 0;
    this.IsPlaying = false;
  }
}
exports.SpecialEnergyBarPointEffectInfo = SpecialEnergyBarPointEffectInfo;
class SpecialEnergyBarPointItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.wdt = 1;
    this.Bdt = 0;
    this.bdt = true;
    this.qdt = 0;
    this.Gdt = 0;
    this.Ndt = 0;
    this.Odt = [];
    this.kdt = 0;
    this.Fdt = false;
    this.Vdt = 1;
    this.PNn = undefined;
  }
  InitPrefabInfo(t, i, s = true) {
    this.wdt = t;
    this.Bdt = i;
    this.bdt = s;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UINiagara], [2, UE.UINiagara]];
    for (let t = 0; t < POINT_EFFECT_NUM; t++) {
      this.ComponentRegisterInfos.push([t + 3, UE.UINiagara]);
    }
  }
  OnStart() {
    for (let t = 0; t < POINT_EFFECT_NUM; t++) {
      var i = new SpecialEnergyBarPointEffectInfo();
      i.Effect = this.GetUiNiagara(t + 3);
      i.Effect.SetUIActive(false);
      this.Odt.push(i);
    }
  }
  SetFullEffectColor(t, i = false) {
    this.GetUiNiagara(1).SetNiagaraVarLinearColor("Color", t);
    this.GetUiNiagara(2).SetNiagaraVarLinearColor("Color", t);
    for (const s of this.Odt) {
      s.Effect.SetNiagaraVarLinearColor("Color", t);
    }
    this.GetUiNiagara(1).SetNiagaraVarFloat("Default", i ? 0 : 1);
    this.GetUiNiagara(1).SetNiagaraVarFloat("Shift", i ? 1 : 0);
  }
  SetEffectBasePercent(t) {
    this.Vdt = t;
    this.GetUiNiagara(1).SetNiagaraVarFloat("Dissolve", this.Vdt);
    this.GetUiNiagara(2).SetNiagaraVarFloat("Dissolve", this.Vdt);
  }
  UpdatePercent(t, i = true) {
    var s = Math.ceil(t * this.wdt);
    var t = this.Vdt * s / this.wdt;
    this.GetUiNiagara(1).SetNiagaraVarFloat("Dissolve", t);
    this.GetUiNiagara(2).SetNiagaraVarFloat("Dissolve", t);
    this.GetUiNiagara(1).SetUIActive(t > 0);
    this.GetUiNiagara(2).SetUIActive(t > 0);
    if (i && this.qdt > s) {
      var e = EFFECT_DURATION + Time_1.Time.Now;
      for (let i = Math.min(s + POINT_EFFECT_NUM, this.qdt) - 1; i >= s; i--) {
        let t = i;
        if (!this.bdt) {
          t = this.wdt - t - 1;
        }
        var h = this.Bdt * (t - (this.wdt - 1) / 2);
        var r = this.Hdt();
        var o = r.Effect;
        o.SetAnchorOffsetX(h);
        if (!r.IsPlaying) {
          o.SetUIActive(true);
        }
        o.ActivateSystem(true);
        r.IsPlaying = true;
        r.FinishTime = e;
      }
      this.Fdt = true;
    }
    this.qdt = s;
  }
  UpdatePercentWithVisible(t, i, s, e) {
    if (s || e) {
      this.RootItem.SetUIActive(i);
    }
    if (i) {
      this.UpdatePercent(t, !s && !e);
    }
  }
  UpdateLeftRightPercent(t, i) {
    var s;
    var t = Math.ceil(t * this.wdt);
    var i = Math.ceil(i * this.wdt);
    if (this.Gdt !== t || this.Ndt !== i) {
      this.Gdt = t;
      this.Ndt = t;
      s = this.Bdt * t;
      this.GetItem(0).SetAnchorOffsetX(s);
      s = (i - t) / this.wdt;
      this.GetUiNiagara(1).SetNiagaraVarFloat("Dissolve", s);
      this.GetUiNiagara(2).SetNiagaraVarFloat("Dissolve", s);
    }
  }
  Hdt() {
    var t = this.Odt[this.kdt];
    this.kdt++;
    if (this.kdt >= POINT_EFFECT_NUM) {
      this.kdt = 0;
    }
    return t;
  }
  Tick(t) {
    if (this.Fdt) {
      this.Fdt = false;
      for (const i of this.Odt) {
        if (i.IsPlaying) {
          if (i.FinishTime <= Time_1.Time.Now) {
            i.Effect.SetUIActive(false);
            i.IsPlaying = false;
          } else {
            this.Fdt = true;
          }
        }
      }
    }
  }
  ReplaceFullEffect(t) {
    var i = this.GetUiNiagara(1);
    this.PNn ||= i.NiagaraSystemReference;
    i.SetNiagaraSystem(t);
  }
  ResetFullEffect() {
    if (this.PNn) {
      this.GetUiNiagara(1).SetNiagaraSystem(this.PNn);
      this.PNn = undefined;
    }
  }
  OnBeforeDestroy() {
    this.ResetFullEffect();
  }
}
exports.SpecialEnergyBarPointItem = SpecialEnergyBarPointItem;
//# sourceMappingURL=SpecialEnergyBarPointItem.js.map