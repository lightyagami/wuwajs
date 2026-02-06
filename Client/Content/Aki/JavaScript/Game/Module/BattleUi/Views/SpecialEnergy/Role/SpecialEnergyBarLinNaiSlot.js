"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarLinNaiSlot = undefined;
const UE = require("ue");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarLinNaiSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments);
    this.OwnerLogic = undefined;
  }
  SwitchPointColor(e) {
    e = UE.Color.FromHex(this.Config?.PointColorList[e ? 1 : 0] ?? "ffffff");
    this.SlotItemList[0].SetPointColor(e);
  }
  SwitchKeyItem(e, t = false) {
    if (e) {
      this.Config = e;
      this.KeyItem?.SetConfig(e);
      this.KeyItem?.SwitchToKeyInfoList(this.Config.KeyInfoList);
    }
    if (t) {
      this.GetItem(0)?.SetUIActive(false);
      this.GetItem(1)?.SetUIActive(true);
      this.GetItem(2)?.SetUIActive(false);
    } else {
      this.GetItem(0)?.SetUIActive(true);
      this.GetItem(1)?.SetUIActive(true);
      this.GetItem(2)?.SetUIActive(true);
    }
  }
  GetKeyEnable() {
    return this.OwnerLogic?.GetKeyEnable() ?? false;
  }
  RefreshKeyEnable(e, t) {
    this.KeyItem?.RefreshKeyEnable(e, t);
  }
}
exports.SpecialEnergyBarLinNaiSlot = SpecialEnergyBarLinNaiSlot;
//# sourceMappingURL=SpecialEnergyBarLinNaiSlot.js.map