"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryItemTipsHotKey = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class HonamiStoryItemTipsHotKey extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  SetAutoLocation(e) {
    var t = LguiUtil_1.LguiUtil.GetAdaptiveTipsPosition(e, this.RootItem);
    var i = this.GetItem(1).Width;
    var e = e.Height > e.Width ? -e.Width / 2 : -e.Height / 2;
    t.X = t.X + i;
    t.Z = t.Z + e;
    var i = t.ToUeVectorOld();
    this.RootItem.SetUIWorldLocation(i);
  }
}
exports.HonamiStoryItemTipsHotKey = HonamiStoryItemTipsHotKey;
//# sourceMappingURL=HonamiStoryItemTipsHotKey.js.map