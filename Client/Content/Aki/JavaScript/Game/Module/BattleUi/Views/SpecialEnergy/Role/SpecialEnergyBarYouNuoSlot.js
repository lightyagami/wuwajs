"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarYouNuoSlot = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SpecialEnergyBarKeyItem_1 = require("../SpecialEnergyBarKeyItem");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarYouNuoSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments);
    this.wZt = [];
    this.dJs = [];
    this.Gwc = [];
    this.sLd = [];
    this.wbd = 1;
  }
  OnInitData() {
    this.wZt.push(ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(141001));
    this.wZt.push(ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(141002));
  }
  async InitKeyItem(e) {
    await super.InitKeyItem(e);
    if (!Info_1.Info.IsInTouch()) {
      this.dJs.push(this.KeyItem);
      var t = [];
      for (const i of this.wZt) {
        var r = new SpecialEnergyBarKeyItem_1.SpecialEnergyBarKeyItem();
        r.SetConfig(i);
        this.dJs.push(r);
        this.ExtraKeyItemList.push(r);
        t.push(r.CreateThenShowByResourceIdAsync("UiItem_EnergyBarHotKey", e));
      }
      await Promise.all(t);
    }
  }
  OnStart() {
    this.OverrideColor = true;
    super.OnStart();
    var e = this.wZt[1];
    if (e.EffectColor) {
      var e = UE.Color.FromHex(e.EffectColor);
      var t = new UE.LinearColor(e);
      for (const r of this.SlotItemList) {
        r.SetFullEffectColor(t, this.IsMorph);
      }
    }
    this.aLd(this.Config);
    this.aLd(this.wZt[0]);
  }
  aLd(e) {
    var t = UE.Color.FromHex(e.EffectColor);
    var e = UE.Color.FromHex(e.PointColor);
    this.Gwc.push(t);
    this.sLd.push(e);
  }
  SetFullEffectPercent(e) {
    if (this.wbd !== e) {
      this.wbd = e;
      this.RefreshBarPercent();
    }
  }
  RefreshBarPercent(t = false) {
    var r = this.PercentMachine.GetCurPercent();
    var i = r >= this.wbd;
    for (let e = 0; e < this.SlotItemList.length; e++) {
      var s = this.SlotItemList[e];
      var a = r * this.SlotNum - e;
      s.UpdatePercentWithFullEffectEnable(a, i, t);
    }
  }
  SetKeyItemEnable(e, t, r = false) {
    if (!Info_1.Info.IsInTouch()) {
      this.dJs[e].RefreshKeyEnable(t, r);
    }
  }
  SetKeyItemType(t) {
    if (!Info_1.Info.IsInTouch()) {
      for (let e = 0; e < this.dJs.length; e++) {
        this.dJs[e].SetUiActive(t === e);
      }
    }
  }
  SetBarColor(e) {
    if (e < this.Gwc.length) {
      for (const t of this.SlotItemList) {
        t.SetBarColor(this.Gwc[e]);
        t.SetPointColor(this.sLd[e]);
      }
    }
  }
}
exports.SpecialEnergyBarYouNuoSlot = SpecialEnergyBarYouNuoSlot;
//# sourceMappingURL=SpecialEnergyBarYouNuoSlot.js.map