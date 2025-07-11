"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleShopButton = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleShopButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Gke = undefined;
    this.eje = () => {
      this.Gke?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.eje]];
  }
  OnBeforeDestroy() {
    this.Gke = undefined;
  }
  SetFunction(t) {
    this.Gke = t;
  }
  SetText(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, ...e);
  }
  SetCostText(t, e) {
    var i = this.GetText(4);
    i.SetText(t);
    if (e !== undefined) {
      i.SetChangeColor(e, i.changeColor);
    }
  }
  SetCostItem(t) {
    this.SetItemIcon(this.GetTexture(3), t);
  }
  SetInteractive(t) {
    this.GetButton(0).SetSelfInteractive(t);
  }
}
exports.RogueBattleShopButton = RogueBattleShopButton;
//# sourceMappingURL=RogueBattleShopButton.js.map