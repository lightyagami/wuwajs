"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsOddsItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class RacingBetsOddsItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ITc = 0;
    this.on1 = 0;
    this.aM1 = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UIArtText], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnBeforeShow() {
    this.RefreshUi(this.ITc, this.on1, this.aM1);
  }
  RefreshUi(s, e, t) {
    this.ITc = s;
    this.on1 = e;
    this.aM1 = t;
    if (this.IsShowOrShowing) {
      this.GetArtText(0).SetText(s.toString());
      this.GetArtText(1).SetText(e.toString());
      this.GetItem(2).SetUIActive(e > 0);
      this.GetItem(3).SetUIActive(t);
    }
  }
  SetItemOffset(s) {
    this.RootItem?.SetAnchorOffset(s);
  }
  SetVisible(s) {
    this.SetActive(s);
  }
}
exports.RacingBetsOddsItem = RacingBetsOddsItem;
//# sourceMappingURL=RacingBetsOddsItem.js.map