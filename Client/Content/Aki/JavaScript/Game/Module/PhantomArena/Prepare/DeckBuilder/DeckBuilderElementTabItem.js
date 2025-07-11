"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderElementTabItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class DeckBuilderElementTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.OnToggleSelect = undefined;
    this.DV1 = () => {
      this.OnToggleSelect?.(this.GridIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.DV1]];
  }
  Refresh(t, e, s) {
    this.Data = t;
    this.SetTextureShowUntilLoaded(t.TabTexturePath, this.GetTexture(1));
    t = UE.Color.FromHex(t.TabElementColor);
    this.GetSprite(2).SetColor(t);
    this.GetSprite(3).SetColor(t);
    if (e) {
      this.OnSelected(false);
    } else {
      this.OnDeselected(false);
    }
    this.RefreshRedDotState();
    this.RefreshDisableState();
    this.RefreshMaxState();
  }
  OnSelected(t) {
    this.GetExtendToggle(0)?.SetToggleState(1, t);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0)?.SetToggleState(0, t);
  }
  RefreshRedDotState() {
    this.GetItem(4).SetUIActive(this.Data.ShowRedDot);
  }
  RefreshDisableState() {
    this.GetItem(5).SetUIActive(this.Data.IsDisable);
  }
  RefreshMaxState() {
    this.GetItem(6).SetUIActive(this.Data.IsArrivedMax);
  }
}
exports.DeckBuilderElementTabItem = DeckBuilderElementTabItem;
//# sourceMappingURL=DeckBuilderElementTabItem.js.map