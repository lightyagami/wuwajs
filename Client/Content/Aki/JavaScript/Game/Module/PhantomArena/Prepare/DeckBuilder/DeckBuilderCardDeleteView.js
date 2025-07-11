"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderCardDeleteView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const DeckBuilderCardDeleteFilterItem_1 = require("./DeckBuilderCardDeleteFilterItem");
class DeckBuilderCardDeleteView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.EV1 = new Set();
    this.Pe = undefined;
    this.IV1 = [];
    this.TV1 = undefined;
    this.p1l = () => {
      this.CloseMe();
    };
    this.xco = () => {
      if (this.EV1.size === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1125");
      } else {
        this.CloseMe();
        this.Pe.DeleteFunc(this.EV1);
      }
    };
    this.sIu = e => {
      if (e === 1) {
        this.EV1.add(0);
      } else {
        this.EV1.delete(0);
      }
    };
    this.RV1 = () => {
      var e = new DeckBuilderCardDeleteFilterItem_1.DeckBuilderCardDeleteFilterItem();
      e.OnItemToggleStateChange = this.jA1;
      return e;
    };
    this.jA1 = (e, t) => {
      e = this.IV1[e];
      if (t === 1) {
        this.EV1.add(e.Element);
      } else {
        this.EV1.delete(e.Element);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIExtendToggle], [3, UE.UILayoutBase], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.p1l], [1, this.xco], [2, this.sIu]];
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam;
    for (let e = 0; e <= 6; e++) {
      var t = e;
      var i = this.Pe.EnabledElementSet.has(t);
      var s = {
        Element: t,
        Enabled: this.Pe.EnabledElementSet.has(t),
        Selected: i
      };
      if (i) {
        this.EV1.add(t);
      }
      this.IV1.push(s);
    }
    this.IV1.sort((e, t) => e.Enabled === t.Enabled ? e.Element === 0 ? 1 : t.Element === 0 ? -1 : e.Element - t.Element : e.Enabled ? -1 : 1);
    this.TV1 = new GenericLayout_1.GenericLayout(this.GetLayoutBase(3), this.RV1, this.GetItem(4).GetOwner());
    await this.TV1.RefreshByDataAsync(this.IV1);
  }
}
exports.DeckBuilderCardDeleteView = DeckBuilderCardDeleteView;
//# sourceMappingURL=DeckBuilderCardDeleteView.js.map