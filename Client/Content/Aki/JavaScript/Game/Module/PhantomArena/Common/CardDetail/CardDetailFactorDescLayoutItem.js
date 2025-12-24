"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardDetailFactorDescLayoutItem = undefined;
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const CardDetailFactorDescItem_1 = require("./CardDetailFactorDescItem");
class CardDetailFactorDescLayoutItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.CA1 = undefined;
    this.pA1 = () => new CardDetailFactorDescItem_1.CardDetailFactorDescItem();
    this.CA1 = new GenericLayout_1.GenericLayout(e, this.pA1, t?.GetOwner());
  }
  Refresh(e) {
    this.CA1.RefreshByData(e);
  }
  SetLayoutActive(e) {
    this.CA1.GetRootUiItem()?.SetUIActive(e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && !(e.length <= 1)) {
      e = Number(e[1]);
      if (e = this.CA1?.GetGridByDisplayIndex(e)) {
        return [e, e];
      } else {
        return undefined;
      }
    }
  }
}
exports.CardDetailFactorDescLayoutItem = CardDetailFactorDescLayoutItem;
//# sourceMappingURL=CardDetailFactorDescLayoutItem.js.map