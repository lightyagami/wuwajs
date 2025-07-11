"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarPointGraduate = undefined;
const UE = require("ue");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SpecialEnergyBarBase_1 = require("./SpecialEnergyBarBase");
const SpecialEnergyBarPointItem_1 = require("./SpecialEnergyBarPointItem");
const SpecialEnergyBarSlotItem_1 = require("./SpecialEnergyBarSlotItem");
const POINT_NUM = 41;
const POINT_WIDTH = 9;
const TOTAL_WIDTH = 369;
class SpecialEnergyBarPointGraduate extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.SlotItem = undefined;
    this.PointItem = undefined;
    this.GraduateItemList = [];
    this.IsKeyEnable = false;
    this.LastPercent = 0;
    this.NeedInitSlot = true;
    this.NeedInitPoint = true;
    this.IsMorph = false;
  }
  OnInitData() {
    this.LastPercent = this.PercentMachine.GetCurPercent();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitSlotItem(this.GetItem(0)));
    t.push(this.InitPointItem(this.GetItem(1)));
    t.push(this.InitNumItem(this.GetItem(3)));
    t.push(this.InitKeyItem(this.GetItem(3)));
    await Promise.all(t);
    if (this.NumItem) {
      this.NumItem.GetRootItem().SetHierarchyIndex(0);
    }
  }
  async InitSlotItem(t) {
    if (this.NeedInitSlot) {
      this.SlotItem = new SpecialEnergyBarSlotItem_1.SpecialEnergyBarSlotItem();
      await this.SlotItem.CreateThenShowByResourceIdAsync("UiItem_EnergyBarSlot", t);
    }
  }
  async InitPointItem(t) {
    if (this.NeedInitPoint) {
      this.PointItem = new SpecialEnergyBarPointItem_1.SpecialEnergyBarPointItem();
      this.PointItem.InitPrefabInfo(POINT_NUM, POINT_WIDTH);
      await this.PointItem.CreateThenShowByResourceIdAsync("UiItem_EnergyBarPoint", t);
    }
  }
  OnStart() {
    if (this.Config) {
      if (this.Config.EffectColor) {
        var i = UE.Color.FromHex(this.Config.EffectColor);
        var e = new UE.LinearColor(i);
        let t = i;
        if (this.Config.PointColor) {
          t = UE.Color.FromHex(this.Config.PointColor);
        }
        this.PointItem?.SetFullEffectColor(e);
        this.SlotItem?.SetBarColor(i);
        this.SlotItem?.SetPointColor(t);
        this.SlotItem?.SetFullEffectColor(e);
      }
      var i = this.GetItem(2);
      this.GraduateItemList.push(i);
      var s = this.Config.SlotNum - 1;
      if (s > 1) {
        var h = i.GetOwner();
        var r = i.GetParentAsUIItem();
        for (let t = 1; t < s; t++) {
          var a = LguiUtil_1.LguiUtil.DuplicateActor(h, r);
          this.GraduateItemList.push(a.GetComponentByClass(UE.UIItem.StaticClass()));
        }
      } else {
        i.SetUIActive(s > 0);
      }
      for (let t = 0; t < s; t++) {
        this.SetGraduateItemOffset(t, this.Config.ExtraFloatParams[t]);
      }
      this.GetItem(4).SetUIActive(!this.IsMorph);
      this.RefreshBarPercent(true);
    }
  }
  SetGraduateItemOffset(t, i) {
    t = this.GraduateItemList[t];
    if (t) {
      t.SetAnchorOffsetX(TOTAL_WIDTH * (i - 0.5));
    }
  }
  RefreshBarPercent(t = false) {
    var i = this.PercentMachine.GetCurPercent();
    var e = this.GetKeyEnable();
    let s = false;
    if (this.IsKeyEnable !== e) {
      this.IsKeyEnable = e;
      s = true;
    }
    this.SlotItem?.UpdatePercentWithVisible(i, !e, s, t, this.LastPercent);
    this.PointItem?.UpdatePercentWithVisible(i, e, s, t);
    this.KeyItem?.RefreshKeyEnable(e, t);
    this.LastPercent = i;
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  OnKeyEnableChanged() {
    this.RefreshBarPercent();
  }
  Tick(t) {
    super.Tick(t);
    this.PointItem?.Tick(t);
    this.SlotItem?.Tick(t);
  }
  ReplaceFullEffect(t) {
    this.PointItem.ReplaceFullEffect(t);
    this.SlotItem.ReplaceFullEffect(t);
  }
}
exports.SpecialEnergyBarPointGraduate = SpecialEnergyBarPointGraduate;
//# sourceMappingURL=SpecialEnergyBarPointGraduate.js.map