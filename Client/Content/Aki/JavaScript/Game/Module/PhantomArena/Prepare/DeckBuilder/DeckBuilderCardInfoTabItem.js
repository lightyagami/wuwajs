"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DeckBuilderCardInfoTabItem = exports.DeckBuilderCardInfoTabItemData = void 0;
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class DeckBuilderCardInfoTabItemData {
  constructor() {
    this.TabIndex = 0, this.TabNameTextId = "", this.OnSelect = void 0
  }
}
exports.DeckBuilderCardInfoTabItemData = DeckBuilderCardInfoTabItemData;
class DeckBuilderCardInfoTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Pe = void 0, this.fA1 = t => {
      1 === t && this.Pe.OnSelect?.(this.Pe.TabIndex)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.fA1]
    ]
  }
  Refresh(t) {
    this.Pe = t, LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.TabNameTextId)
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, t)
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, t)
  }
}
exports.DeckBuilderCardInfoTabItem = DeckBuilderCardInfoTabItem;
//# sourceMappingURL=DeckBuilderCardInfoTabItem.js.map