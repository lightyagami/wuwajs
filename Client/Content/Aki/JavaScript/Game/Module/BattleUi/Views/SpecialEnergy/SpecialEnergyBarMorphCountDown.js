"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarMorphCountDown = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../Core/Common/Time");
const SpecialEnergyBaIconHandle_1 = require("./SpecialEnergyBaIconHandle");
const SpecialEnergyBarBase_1 = require("./SpecialEnergyBarBase");
const SpecialEnergyBarPointItem_1 = require("./SpecialEnergyBarPointItem");
const pointNumList = [19, 20];
const TOTAL_NUM = 41;
const POINT_WIDTH = 9;
const EFFECT_DURATION = 500;
class SpecialEnergyBarMorphCountDown extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.Adt = undefined;
    this.Pdt = undefined;
    this.Ddt = new SpecialEnergyBaIconHandle_1.SpecialEnergyBaIconHandle();
    this.Udt = 0;
    this.xdt = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UINiagara], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    if (this.Config.PrefabType === 5) {
      this.xdt = pointNumList[0];
    } else {
      this.xdt = pointNumList[1];
    }
    var i = [];
    i.push(this.InitPointLeftItem(this.GetItem(0)));
    i.push(this.InitPointRightItem(this.GetItem(1)));
    await Promise.all(i);
  }
  async InitPointLeftItem(i) {
    this.Adt = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem();
    this.Adt.InitPrefabInfo(this.xdt, POINT_WIDTH);
    await this.Adt.CreateThenShowByActorAsync(i.GetOwner());
  }
  async InitPointRightItem(i) {
    this.Pdt = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem();
    this.Pdt.InitPrefabInfo(this.xdt, POINT_WIDTH);
    await this.Pdt.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    var i;
    if (this.Config) {
      i = this.xdt / TOTAL_NUM;
      this.Adt.SetEffectBasePercent(i);
      this.Pdt.SetEffectBasePercent(i);
      if (this.Config.EffectColor) {
        i = new UE.LinearColor(UE.Color.FromHex(this.Config.EffectColor));
        this.Adt.SetFullEffectColor(i, true);
        this.Pdt.SetFullEffectColor(i, true);
      }
      if (this.Config.IconPath) {
        i = [this.GetTexture(2)];
        this.Ddt.Init(i, this.GetItem(4));
        this.Ddt.SetIcon(this.Config.IconPath);
      }
      if (this.Udt === 0) {
        this.GetUiNiagara(3).SetUIActive(false);
      }
      this.RefreshBarPercent();
    }
  }
  OnChangeVisibleByTagChange(i) {
    if (i) {
      this.GetUiNiagara(3).SetUIActive(true);
      this.Udt = EFFECT_DURATION + Time_1.Time.Now;
    }
  }
  OnBeforeShow() {
    if (this.Config.PrefabType === 9) {
      this.GetUiNiagara(3).SetUIActive(true);
      this.Udt = EFFECT_DURATION + Time_1.Time.Now;
    }
  }
  RefreshBarPercent() {
    var i = this.PercentMachine.GetCurPercent();
    this.Adt.UpdatePercent(i);
    this.Pdt.UpdatePercent(i);
    this.Ddt.PlayEndAnim(i < this.Config.ExtraFloatParams[0]);
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  Tick(i) {
    super.Tick(i);
    this.Adt?.Tick(i);
    this.Pdt?.Tick(i);
    if (this.Udt > 0 && this.Udt <= Time_1.Time.Now) {
      this.GetUiNiagara(3).SetUIActive(false);
      this.Udt = 0;
    }
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    this.Ddt.OnBeforeDestroy();
  }
}
exports.SpecialEnergyBarMorphCountDown = SpecialEnergyBarMorphCountDown;
//# sourceMappingURL=SpecialEnergyBarMorphCountDown.js.map