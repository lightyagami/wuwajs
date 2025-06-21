"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardDetailFactorDescLayoutItem = void 0;
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  CardDetailFactorDescItem_1 = require("./CardDetailFactorDescItem");
class CardDetailFactorDescLayoutItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(), this.jw1 = void 0, this.Hw1 = () => new CardDetailFactorDescItem_1.CardDetailFactorDescItem, this.jw1 = new GenericLayout_1.GenericLayout(e, this.Hw1, t?.GetOwner())
  }
  Refresh(e) {
    this.jw1.RefreshByData(e)
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && !(e.length <= 1)) return e = Number(e[1]), (e = this.jw1?.GetGridByDisplayIndex(e)) ? [e, e] : void 0
  }
}
exports.CardDetailFactorDescLayoutItem = CardDetailFactorDescLayoutItem;
//# sourceMappingURL=CardDetailFactorDescLayoutItem.js.map