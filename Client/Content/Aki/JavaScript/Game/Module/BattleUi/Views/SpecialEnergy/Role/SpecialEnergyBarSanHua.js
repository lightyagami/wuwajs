"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarSanHua = undefined;
const UE = require("ue");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarPointItem_1 = require("../SpecialEnergyBarPointItem");
const POINT_NUM = 41;
const POINT_WIDTH = 9;
const TOTAL_WIDTH = 369;
const successTagId = 1598973985;
const buffTagId = 1278596622;
const buffId = 1102012003;
class SpecialEnergyBarSanHua extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.edt = undefined;
    this.tdt = false;
    this.idt = 0;
    this.odt = 1;
    this.rdt = 0;
    this.ndt = s => {
      var t = this.GetUiNiagara(3);
      if (s > 0) {
        t.SetAnchorOffsetX(TOTAL_WIDTH * (this.rdt - 0.5));
        t.SetUIActive(true);
      } else {
        t.SetUIActive(false);
      }
    };
    this.sdt = s => {
      this.adt();
      this.RefreshBarPercent();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UINiagara], [3, UE.UINiagara], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var s = [];
    s.push(this.InitPointItem(this.GetItem(0)));
    s.push(this.InitKeyItem(this.GetItem(4)));
    await Promise.all(s);
  }
  async InitPointItem(s) {
    this.edt = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem();
    this.edt.InitPrefabInfo(POINT_NUM, POINT_WIDTH);
    await this.edt.CreateThenShowByActorAsync(s.GetOwner());
  }
  OnStart() {
    var s;
    if (this.Config) {
      if (this.Config.EffectColor) {
        s = new UE.LinearColor(UE.Color.FromHex(this.Config.EffectColor));
        this.edt.SetFullEffectColor(s);
      }
      this.adt();
      this.RefreshBarPercent(true);
      this.GetUiNiagara(3).SetUIActive(false);
      this.KeyItem?.RefreshKeyEnable(true, true);
    }
  }
  adt() {
    var s = this.GetBuffCountByBuffId(buffId);
    var t = this.AttributeComponent.GetCurrentValue(this.Config.MaxAttributeId);
    this.idt = this.Config.ExtraFloatParams[s * 2] / t;
    this.odt = this.Config.ExtraFloatParams[s * 2 + 1] / t;
  }
  RefreshBarPercent(s = false) {
    var t = this.PercentMachine.GetTargetPercent();
    if (t > 0) {
      this.rdt = t;
    }
    this.edt.UpdateLeftRightPercent(this.idt, this.odt);
    this.GetItem(1).SetAnchorOffsetX(TOTAL_WIDTH * (t - 0.5));
    var t = t > this.idt && t <= this.odt;
    if (!!s || t !== this.tdt) {
      this.tdt = t;
      this.GetUiNiagara(2).SetUIActive(t);
    }
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  Tick(s) {
    super.Tick(s);
    this.edt?.Tick(s);
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagCountChanged(successTagId, this.ndt);
    this.ListenForTagCountChanged(buffTagId, this.sdt);
  }
  RemoveEvents() {
    super.RemoveEvents();
  }
}
exports.SpecialEnergyBarSanHua = SpecialEnergyBarSanHua;
//# sourceMappingURL=SpecialEnergyBarSanHua.js.map