"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DeckBuilderSortFilterItem = void 0;
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class DeckBuilderSortFilterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Data = void 0, this.OnToggleSelect = void 0, this.gDt = t => {
      1 === t && this.OnToggleSelect?.(this.GridIndex)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle]
    ], this.BtnBindInfo = [
      [1, this.gDt]
    ]
  }
  Refresh(t, e, i) {
    this.Data = t, LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name), e ? this.OnSelected(!1) : this.OnDeselected(!1)
  }
  OnSelected(t) {
    this.GetExtendToggle(1)?.SetToggleState(1, t)
  }
  OnDeselected(t) {
    this.GetExtendToggle(1)?.SetToggleState(0, t)
  }
}
exports.DeckBuilderSortFilterItem = DeckBuilderSortFilterItem;
//# sourceMappingURL=DeckBuilderSortFilterItem.js.map