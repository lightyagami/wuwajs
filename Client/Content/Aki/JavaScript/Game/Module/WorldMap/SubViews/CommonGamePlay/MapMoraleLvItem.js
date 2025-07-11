"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapMoraleLvItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class MapMoraleLvItem extends UiPanelBase_1.UiPanelBase {
  async Init(e, t = "UiItem_MapTipMorale") {
    await this.CreateThenShowByResourceIdAsync(t, e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIArtText], [2, UE.UITexture]];
  }
  UpdateTitle(e) {
    this.GetText(0)?.ShowTextNew(e);
  }
  UpdateLv(e) {
    this.GetArtText(1)?.SetText(e.toString());
  }
  UpdateLvColor(e) {
    this.GetArtText(1)?.SetColor(UE.Color.FromHex(e));
  }
  UpdateBgColor(e) {
    this.GetTexture(2)?.SetColor(UE.Color.FromHex(e));
  }
  UpdateData(e) {
    this.UpdateTitle(e.TitleId);
    this.UpdateLv(e.Lv);
    if (e.LvColor) {
      this.UpdateLvColor(e.LvColor);
    }
    if (e.BgColor) {
      this.UpdateBgColor(e.BgColor);
    }
  }
}
exports.MapMoraleLvItem = MapMoraleLvItem;
//# sourceMappingURL=MapMoraleLvItem.js.map