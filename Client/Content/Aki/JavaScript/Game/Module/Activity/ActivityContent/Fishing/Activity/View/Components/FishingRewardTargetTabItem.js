"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingRewardTargetTabItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract");
class FishingRewardTargetTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.pua = undefined;
    this.vua = -1;
    this.Mua = () => {
      this.pua?.ClickedCallback?.(this.vua);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Mua]];
  }
  SetToggleState(t, s) {
    t = t ? 1 : 0;
    this.GetExtendToggle(1).SetToggleState(t, s);
  }
  Sua(t) {
    this.GetItem(2).SetUIActive(t);
  }
  RefreshRedDot() {
    var t = this.pua?.RefreshRedDot?.(this.vua + 1) ?? false;
    this.Sua(t);
  }
  Refresh(t, s, e) {
    this.pua = t;
    this.vua = t.Index;
    if (t.NameTextId) {
      this.GetText(0)?.ShowTextNew(t.NameTextId);
    }
    this.RefreshRedDot();
  }
}
exports.FishingRewardTargetTabItem = FishingRewardTargetTabItem;
//# sourceMappingURL=FishingRewardTargetTabItem.js.map