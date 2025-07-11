"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderSortFilterItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class DeckBuilderSortFilterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.OnToggleSelect = undefined;
    this.gDt = t => {
      if (t === 1) {
        this.OnToggleSelect?.(this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle]];
    this.BtnBindInfo = [[1, this.gDt]];
  }
  Refresh(t, e, i) {
    this.Data = t;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name);
    if (e) {
      this.OnSelected(false);
    } else {
      this.OnDeselected(false);
    }
  }
  OnSelected(t) {
    this.GetExtendToggle(1)?.SetToggleState(1, t);
  }
  OnDeselected(t) {
    this.GetExtendToggle(1)?.SetToggleState(0, t);
  }
}
exports.DeckBuilderSortFilterItem = DeckBuilderSortFilterItem;
//# sourceMappingURL=DeckBuilderSortFilterItem.js.map