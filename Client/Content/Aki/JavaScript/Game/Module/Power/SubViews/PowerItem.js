"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PowerItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const coinNotEnoughColor = UE.Color.FromHex("9D2437FF");
class PowerItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super();
    this.Ooo = undefined;
    this.NTt = undefined;
    this.Bke = t => {
      if (t === 1) {
        this.NTt(this.Ooo);
      }
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  Refresh(t, s, i) {
    this.Ooo = t;
    this.GetText(10).SetText(t.StackValue.toString());
    if (t.CostValue > t.StackValue) {
      this.GetText(10).SetColor(coinNotEnoughColor);
    }
    this.GetSprite(7).SetUIActive(false);
    this.GetItem(9).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.SetItemIcon(this.GetTexture(3), t.ItemId);
  }
  SetClickCallback(t) {
    this.NTt = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UISprite], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText]];
    this.BtnBindInfo = [[0, this.Bke]];
  }
  SetIntoToggleGroup(t) {
    this.GetExtendToggle(0).SetToggleGroup(t.GetOwner());
  }
}
exports.PowerItem = PowerItem;
//# sourceMappingURL=PowerItem.js.map