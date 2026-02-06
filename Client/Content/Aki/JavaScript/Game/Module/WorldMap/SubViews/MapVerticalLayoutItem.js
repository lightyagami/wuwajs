"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapVerticalLayoutItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class MapVerticalLayoutItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.PHm = () => {
      this.Pe?.OnBtnClickCb?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UITexture], [4, UE.UISprite], [5, UE.UISprite]];
    this.BtnBindInfo = [[2, this.PHm]];
  }
  Refresh(t, i, s) {
    if ((this.Pe = t).LeftText) {
      this.GetText(0).SetText(t.LeftText);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.LeftTextId);
    }
    if (t.RightText) {
      this.GetText(1).SetUIActive(true);
      this.GetText(1).SetText(t.RightText);
    } else if (t.RightTextId) {
      this.GetText(1).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.RightTextId);
    } else {
      this.GetText(1).SetUIActive(false);
    }
    this.GetButton(2).RootUIComp.SetUIActive(t.ShowBtnHelp);
    this.GetTexture(3).SetUIActive(t.ShowIcon);
    this.GetSprite(4).SetUIActive(t.ShowSprite);
    this.GetSprite(5).SetUIActive(t.ShowScaleIcon ?? false);
    if (t.ShowScaleIcon) {
      this.SetSpriteByPath(t.ScaleIconPath, this.GetSprite(5), true);
    }
  }
}
exports.MapVerticalLayoutItem = MapVerticalLayoutItem;
//# sourceMappingURL=MapVerticalLayoutItem.js.map