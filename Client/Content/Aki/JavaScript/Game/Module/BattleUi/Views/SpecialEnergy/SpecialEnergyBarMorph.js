"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarMorph = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const SpecialEnergyBaIconHandle_1 = require("./SpecialEnergyBaIconHandle");
const SpecialEnergyBarBase_1 = require("./SpecialEnergyBarBase");
const SpecialEnergyBarPoint_1 = require("./SpecialEnergyBarPoint");
const SpecialEnergyBarPointGraduate_1 = require("./SpecialEnergyBarPointGraduate");
const SpecialEnergyBarSlot_1 = require("./SpecialEnergyBarSlot");
const specialEnergyBarClassList = [undefined, undefined, undefined, SpecialEnergyBarPoint_1.SpecialEnergyBarPoint, SpecialEnergyBarSlot_1.SpecialEnergyBarSlot, undefined, undefined, undefined, undefined, SpecialEnergyBarPointGraduate_1.SpecialEnergyBarPointGraduate];
const EFFECT_DURATION = 500;
class SpecialEnergyBarMorph extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.Ddt = new SpecialEnergyBaIconHandle_1.SpecialEnergyBaIconHandle();
    this.VXa = new SpecialEnergyBaIconHandle_1.SpecialEnergyBaIconHandle();
    this.BarItem = undefined;
    this.Udt = 0;
    this.bst = undefined;
    this.p2a = 0;
    this.RNn = false;
    this.xNn = false;
    this.NeedExtraEffectOnKeyEnable = false;
    this.KeyEnableNiagaraIndex = -1;
    this.ReplaceFullEffectIndex = -1;
    this.ReplaceStartEffectIndex = -1;
  }
  async InitByPathAsync(i, t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "加载特殊能量条 - 变身组件");
    }
    await this.CreateByResourceIdAsync("UiItem_BarPointMorp", i, false);
    this.AddEvents();
    this.RefreshVisible();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UINiagara], [3, UE.UINiagara], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    i.push(this.InitBarItem());
    i.push(this.LoadEffects());
    i.push(this.InitKeyItem(this.GetItem(1)));
    await Promise.all(i);
  }
  OnInitData() {
    var i;
    var t;
    super.OnInitData();
    if (this.Config && (this.KeyEnableNiagaraIndex = this.Config.KeyEnableNiagaraIndex, this.NeedExtraEffectOnKeyEnable = this.KeyEnableNiagaraIndex >= 0, (t = (i = this.Config.ExtraFloatParams).length) > 1 && (this.ReplaceFullEffectIndex = i[1]), t > 2)) {
      this.ReplaceStartEffectIndex = i[2];
    }
  }
  OnStart() {
    var i = [this.GetTexture(0)];
    this.Ddt.Init(i, this.GetItem(6));
    if (this.Config?.EnableIconPath) {
      this.RNn = true;
    } else {
      this.RNn = false;
      if (this.Config?.IconPath) {
        this.Ddt.SetIcon(this.Config.IconPath);
      } else {
        this.Ddt.SetIcon(undefined);
      }
    }
    this.VXa.Init([this.GetTexture(5)]);
    if (this.Config?.FrontIconPath) {
      this.VXa.SetIcon(this.Config.FrontIconPath);
    } else {
      this.VXa.SetIcon(undefined);
    }
    if (this.Udt === 0) {
      this.GetUiNiagara(2).SetUIActive(false);
    }
    this.RefreshBuff();
    if (this.NeedExtraEffectOnKeyEnable) {
      if ((i = this.NiagaraList[this.KeyEnableNiagaraIndex]) && (this.GetUiNiagara(3).SetNiagaraSystem(i), this.Config?.OtherEffectColorList[this.KeyEnableNiagaraIndex])) {
        i = UE.Color.FromHex(this.Config?.OtherEffectColorList[this.KeyEnableNiagaraIndex]);
        i = new UE.LinearColor(i);
        this.GetUiNiagara(3).SetNiagaraVarLinearColor("Color", i);
      }
      this.GetUiNiagara(3).SetUIActive(false);
    }
    if (this.ReplaceFullEffectIndex >= 0 && (i = this.NiagaraList[this.ReplaceFullEffectIndex]) && this.BarItem && (this.BarItem.ReplaceFullEffect(i), this.BarItem instanceof SpecialEnergyBarSlot_1.SpecialEnergyBarSlot)) {
      this.BarItem.UpdateFullEffectOffsetBySlotWidth();
    }
    if (this.ReplaceStartEffectIndex >= 0 && (i = this.NiagaraList[this.ReplaceStartEffectIndex])) {
      this.GetUiNiagara(2).SetNiagaraSystem(i);
    }
    this.RefreshBarPercent(true);
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
  OnChangeVisibleByTagChange(i) {
    if (i) {
      this.RefreshBuff();
      if (this.IsShowOrShowing) {
        this.GetUiNiagara(2).SetUIActive(true);
        this.Udt = EFFECT_DURATION + Time_1.Time.Now;
      }
    } else {
      this.bst = undefined;
      this.p2a = 0;
      this.Ddt.PlayEndAnim(false);
    }
  }
  async InitBarItem() {
    var i = this.GetSpecialEnergyBarClass();
    if (i) {
      this.BarItem = new i();
      this.BarItem.InitData(this.RoleData, this.Config, false);
      if (i === SpecialEnergyBarSlot_1.SpecialEnergyBarSlot || i === SpecialEnergyBarPoint_1.SpecialEnergyBarPoint || i === SpecialEnergyBarPointGraduate_1.SpecialEnergyBarPointGraduate) {
        this.BarItem.IsMorph = true;
      }
      await this.BarItem.InitByPathAsync(this.GetItem(4), this.Config.PrefabPath);
    }
  }
  GetSpecialEnergyBarClass() {
    return specialEnergyBarClassList[this.Config.PrefabType];
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    this.Ddt.OnBeforeDestroy();
    this.VXa.OnBeforeDestroy();
  }
  RefreshBarPercent(i = false) {
    var t = this.GetKeyEnable();
    this.RefreshIcon(t);
    this.RefreshExtraEffectOnKeyEnable(t);
    this.KeyItem?.RefreshKeyEnable(t, i);
  }
  RefreshIcon(t) {
    if (this.RNn) {
      let i = this.Config.IconPath;
      if (t && this.Config.EnableIconPath) {
        i = this.Config.EnableIconPath;
      }
      this.Ddt.SetIcon(i);
    }
  }
  RefreshExtraEffectOnKeyEnable(i) {
    if (this.NeedExtraEffectOnKeyEnable && this.xNn !== i) {
      this.xNn = i;
      this.GetUiNiagara(3).SetUIActive(i);
    }
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  OnKeyEnableChanged() {
    this.RefreshBarPercent();
  }
  Tick(i) {
    super.Tick(i);
    this.BarItem?.Tick(i);
    if (this.Udt > 0 && this.Udt <= Time_1.Time.Now) {
      this.GetUiNiagara(2).SetUIActive(false);
      this.Udt = 0;
    }
    if (!this.bst || !this.BuffComponent?.GetBuffByHandle(this.p2a)) {
      this.RefreshBuff();
    }
    if (this.bst) {
      this.Ddt.PlayEndAnim(this.bst.GetRemainDuration() < this.Config.ExtraFloatParams[0]);
    }
  }
  ReplaceFullEffect(i) {
    this.BarItem.ReplaceFullEffect(i);
  }
}
exports.SpecialEnergyBarMorph = SpecialEnergyBarMorph;
//# sourceMappingURL=SpecialEnergyBarMorph.js.map