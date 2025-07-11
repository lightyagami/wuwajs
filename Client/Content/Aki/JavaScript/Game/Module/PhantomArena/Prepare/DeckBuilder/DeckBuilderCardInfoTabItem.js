"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderCardInfoTabItem = exports.DeckBuilderCardInfoTabItemData = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class DeckBuilderCardInfoTabItemData {
  constructor() {
    this.TabIndex = 0;
    this.TabNameTextId = "";
    this.OnSelect = undefined;
  }
}
exports.DeckBuilderCardInfoTabItemData = DeckBuilderCardInfoTabItemData;
class DeckBuilderCardInfoTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.jA1 = t => {
      if (t === 1) {
        this.Pe.OnSelect?.(this.Pe.TabIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.jA1]];
  }
  Refresh(t) {
    this.Pe = t;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.TabNameTextId);
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, t);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, t);
  }
}
exports.DeckBuilderCardInfoTabItem = DeckBuilderCardInfoTabItem;
//# sourceMappingURL=DeckBuilderCardInfoTabItem.js.map