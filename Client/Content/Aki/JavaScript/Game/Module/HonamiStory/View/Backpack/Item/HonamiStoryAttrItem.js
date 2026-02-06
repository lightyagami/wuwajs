"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryAttrItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class HonamiStoryAttrItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Tzm = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [4, UE.UIText], [3, UE.UIItem], [5, UE.UIItem]];
  }
  Refresh(t, i, r) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Name);
    this.SetTextureByPath(t.IconPath, this.GetTexture(0));
    var s = t.NewValue !== t.OldValue;
    let e = t.OldValue.toString();
    let o = t.NewValue.toString();
    if (t.IsPercent) {
      U = t.OldValue === 0 ? 0 : 1;
      e = (t.OldValue / 100).toFixed(U) + "%";
      U = t.NewValue === 0 ? 0 : 1;
      o = (t.NewValue / 100).toFixed(U) + "%";
    }
    this.GetText(2).SetText(e);
    var U = this.GetText(4);
    U.SetText(o);
    this.Tzm ||= U.Color;
    if (s) {
      s = t.NewValue < t.OldValue ? U.changeColor : this.Tzm;
      U.SetColor(s);
    } else {
      U.SetColor(UE.Color.FromHex("#ffffff"));
    }
  }
}
exports.HonamiStoryAttrItem = HonamiStoryAttrItem;
//# sourceMappingURL=HonamiStoryAttrItem.js.map