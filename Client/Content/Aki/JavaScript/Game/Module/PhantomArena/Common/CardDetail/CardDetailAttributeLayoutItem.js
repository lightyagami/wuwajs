"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardDetailAttributeLayoutItem = undefined;
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const CardDetailAttributeItem_1 = require("./CardDetailAttributeItem");
class CardDetailAttributeLayoutItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.nvt = undefined;
    this.mA1 = () => new CardDetailAttributeItem_1.CardDetailAttributeItem();
    this.nvt = new GenericLayout_1.GenericLayout(e, this.mA1, t?.GetOwner());
  }
  Refresh(e) {
    this.nvt.RefreshByData(e);
  }
}
exports.CardDetailAttributeLayoutItem = CardDetailAttributeLayoutItem;
//# sourceMappingURL=CardDetailAttributeLayoutItem.js.map