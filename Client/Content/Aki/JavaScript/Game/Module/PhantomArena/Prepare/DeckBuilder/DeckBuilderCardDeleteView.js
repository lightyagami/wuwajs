"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DeckBuilderCardDeleteView = void 0;
const UE = require("ue"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  DeckBuilderCardDeleteFilterItem_1 = require("./DeckBuilderCardDeleteFilterItem");
class DeckBuilderCardDeleteView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.W41 = new Set, this.Pe = void 0, this.Q41 = [], this.K41 = void 0, this.p1l = () => {
      this.CloseMe()
    }, this.xco = () => {
      0 === this.W41.size ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1125") : (this.CloseMe(), this.Pe.DeleteFunc(this.W41))
    }, this.juu = e => {
      1 === e ? this.W41.add(0) : this.W41.delete(0)
    }, this.Y41 = () => {
      var e = new DeckBuilderCardDeleteFilterItem_1.DeckBuilderCardDeleteFilterItem;
      return e.OnItemToggleStateChange = this.fA1, e
    }, this.fA1 = (e, t) => {
      e = this.Q41[e];
      1 === t ? this.W41.add(e.Element) : this.W41.delete(e.Element)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIExtendToggle],
      [3, UE.UILayoutBase],
      [4, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.p1l],
      [1, this.xco],
      [2, this.juu]
    ]
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam;
    for (let e = 0; e <= 6; e++) {
      var t = e,
        i = this.Pe.EnabledElementSet.has(t),
        s = {
          Element: t,
          Enabled: this.Pe.EnabledElementSet.has(t),
          Selected: i
        };
      i && this.W41.add(t), this.Q41.push(s)
    }
    this.Q41.sort((e, t) => e.Enabled === t.Enabled ? 0 === e.Element ? 1 : 0 === t.Element ? -1 : e.Element - t.Element : e.Enabled ? -1 : 1), this.K41 = new GenericLayout_1.GenericLayout(this.GetLayoutBase(3), this.Y41, this.GetItem(4).GetOwner()), await this.K41.RefreshByDataAsync(this.Q41)
  }
}
exports.DeckBuilderCardDeleteView = DeckBuilderCardDeleteView;
//# sourceMappingURL=DeckBuilderCardDeleteView.js.map