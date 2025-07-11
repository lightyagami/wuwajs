"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarKeLaiTa = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
const EFFECT_BASE_PERCENT = 19 / 41;
class SpecialEnergyBarKeLaiTa extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.Rdt = undefined;
    this.bst = undefined;
    this.p2a = 0;
    this.Rdl = false;
    this.$jl = -1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UINiagara], [4, UE.UINiagara], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem());
    t.push(this.LoadEffects());
    await Promise.all(t);
  }
  async InitBarItem() {
    this.Rdt = new SpecialEnergyBarSlot_1.SpecialEnergyBarSlot();
    this.Rdt.ForceHideBottomLine = true;
    this.Rdt.InitData(this.RoleData, this.Config, true);
    await this.Rdt.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    super.OnStart();
    this.InitTweenAnim(5);
    this.Rdt.SetCustomEffectBasePercent(EFFECT_BASE_PERCENT);
    this.RefreshBuff();
    this.y4l(this.bst === undefined, true);
  }
  RefreshBuff() {
    if (this.Config?.BuffId) {
      this.bst = this.BuffComponent?.GetBuffById(this.Config.BuffId);
      this.p2a = this.bst?.Handle ?? 0;
    } else {
      this.bst = undefined;
      this.p2a = 0;
    }
  }
  Tick(t) {
    super.Tick(t);
    this.Rdt?.Tick(t);
    if (!this.bst || !this.BuffComponent?.GetBuffByHandle(this.p2a)) {
      this.RefreshBuff();
    }
    if (this.bst && this.bst.Duration > 0) {
      this.y4l(false);
      t = 1 - this.bst.GetRemainDuration() / this.bst.Duration;
      this.Xjl(t);
    } else {
      this.y4l(true);
    }
  }
  Xjl(t) {
    if (this.$jl !== t) {
      this.$jl = t;
      this.GetUiNiagara(3).SetNiagaraVarFloat("Dissolve", t);
      this.GetUiNiagara(4).SetNiagaraVarFloat("Dissolve", t);
    }
  }
  y4l(t, i = false) {
    if ((this.Rdl !== t || !!i) && !(Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "【能量条】柯莱塔终结重击状态更新", ["isRed", t]), this.Rdl = t, this.GetItem(1)?.SetUIActive(!t), this.GetItem(2)?.SetUIActive(t), t) && !i) {
      this.PlayTweenAnim(5);
    }
  }
}
exports.SpecialEnergyBarKeLaiTa = SpecialEnergyBarKeLaiTa;
//# sourceMappingURL=SpecialEnergyBarKeLaiTa.js.map