"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeFetterSuitDetailItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class AdvanceNoticeFetterSuitDetailItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(t, e, i) {
    if (t.TitleTextData.TextKey) {
      this.GetText(0).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.TitleTextData.TextKey, ...t.TitleTextData.Params);
    } else {
      this.GetText(0).SetUIActive(false);
    }
    if (t.DescTextData.TextKey) {
      this.GetText(1).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.DescTextData.TextKey, ...t.DescTextData.Params);
    } else {
      this.GetText(1).SetUIActive(false);
    }
  }
}
exports.AdvanceNoticeFetterSuitDetailItem = AdvanceNoticeFetterSuitDetailItem;
//# sourceMappingURL=AdvanceNoticeFetterSuitDetailItem.js.map