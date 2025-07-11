"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingHandBookDesItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class FishingHandBookDesItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem]];
  }
  Refresh(t, i, e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.DesText);
    this.GetText(1).SetText(t.DataText);
    this.GetItem(2).SetUIActive(t.IsGolden ?? false);
    this.GetItem(3).SetUIActive(t.IsSliver ?? false);
  }
}
exports.FishingHandBookDesItem = FishingHandBookDesItem;
//# sourceMappingURL=FishingHandBookDesItem.js.map