"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStorySettleItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class HonamiStorySettleItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(t, e, r) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name);
    this.GetText(1).SetText(t.Value);
  }
}
exports.HonamiStorySettleItem = HonamiStorySettleItem;
//# sourceMappingURL=HonamiStorySettleItem.js.map