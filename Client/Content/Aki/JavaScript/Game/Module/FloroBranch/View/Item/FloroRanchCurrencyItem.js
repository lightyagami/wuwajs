"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchCurrencyItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
class FloroRanchCurrencyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.fOu = undefined;
    this.eTt = () => {
      UiManager_1.UiManager.OpenView("FloroRanchCommonTipsView", {
        TipType: 1,
        CurrencyData: this.fOu,
        RemoveCallback: undefined,
        EntityData: undefined
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITextureTransitionComponent], [2, UE.UIText], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.eTt]];
  }
  SetCurrencyData(e) {
    this.fOu = e;
    e = this.GetTexture(0);
    this.SetTextureByPath(this.fOu.GetIconPath(), e, undefined, () => {
      this.ATt();
    });
    e = this.fOu.GetAmount();
    this.GetText(2).SetText(ModelManager_1.ModelManager.FloroRanchModel.GetCoinText(e));
  }
  ATt() {
    var e = this.GetUiTextureTransitionComponent(1);
    if (e) {
      e.SetAllStateTexture(this.GetTexture(0).GetTexture());
    }
  }
}
exports.FloroRanchCurrencyItem = FloroRanchCurrencyItem;
//# sourceMappingURL=FloroRanchCurrencyItem.js.map