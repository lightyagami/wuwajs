"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardDetailAttributeLayoutItem = void 0;
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  CardDetailAttributeItem_1 = require("./CardDetailAttributeItem");
class CardDetailAttributeLayoutItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(), this.nvt = void 0, this.Fw1 = () => new CardDetailAttributeItem_1.CardDetailAttributeItem, this.nvt = new GenericLayout_1.GenericLayout(e, this.Fw1, t?.GetOwner())
  }
  Refresh(e) {
    this.nvt.RefreshByData(e)
  }
}
exports.CardDetailAttributeLayoutItem = CardDetailAttributeLayoutItem;
//# sourceMappingURL=CardDetailAttributeLayoutItem.js.map