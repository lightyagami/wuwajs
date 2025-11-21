"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarAoGuSiTaSlot = undefined;
const Info_1 = require("../../../../../../Core/Common/Info");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SpecialEnergyBarKeyItem_1 = require("../SpecialEnergyBarKeyItem");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarAoGuSiTaSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments);
    this.wUd = [];
    this.dJs = [];
    this.LUd = -1;
  }
  OnInitData() {
    this.wUd.push(ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(130601));
    this.wUd.push(ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(130602));
  }
  async InitKeyItem(e) {
    await super.InitKeyItem(e);
    if (!Info_1.Info.IsInTouch()) {
      this.dJs.push(this.KeyItem);
      var t = [];
      for (const a of this.wUd) {
        var r = new SpecialEnergyBarKeyItem_1.SpecialEnergyBarKeyItem();
        r.SetConfig(a);
        this.dJs.push(r);
        this.ExtraKeyItemList.push(r);
        t.push(r.CreateThenShowByResourceIdAsync("UiItem_EnergyBarHotKey", e));
      }
      await Promise.all(t);
    }
  }
  SetKeyItemEnable(e, t, r = false) {
    this.dJs[e].RefreshKeyEnable(t, r);
  }
  SetKeyItemType(t) {
    if (this.LUd !== t) {
      this.LUd = t;
      for (let e = 0; e < this.dJs.length; e++) {
        this.dJs[e].SetUiActive(t === e);
      }
    }
  }
}
exports.SpecialEnergyBarAoGuSiTaSlot = SpecialEnergyBarAoGuSiTaSlot;
//# sourceMappingURL=SpecialEnergyBarAoGuSiTaSlot.js.map