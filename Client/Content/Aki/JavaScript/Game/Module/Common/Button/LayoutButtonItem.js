"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LayoutButtonItem = exports.ButtonItemData = undefined;
const UE = require("ue");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ButtonItemData {
  constructor() {
    this.OnClickCallback = () => {};
    this.ButtonText = "";
    this.Index = 0;
    this.RedDotName = undefined;
  }
}
exports.ButtonItemData = ButtonItemData;
class LayoutButtonItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.ije = () => {
      if (this.$8i) {
        this.$8i.OnClickCallback(this.$8i.Index);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.ije]];
  }
  Refresh(t, e, i) {
    if (this.$8i && this.$8i.RedDotName) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.$8i.RedDotName, this.GetItem(2));
      RedDotController_1.RedDotController.BindRedDot(t.RedDotName, this.GetItem(2));
    }
    this.$8i = t;
    this.GetText(1)?.ShowTextNew(t.ButtonText);
  }
  OnBeforeDestroy() {
    if (this.$8i && this.$8i.RedDotName) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.$8i.RedDotName, this.GetItem(2));
    }
  }
  SetEnableClick(t) {
    this.GetButton(0)?.SetSelfInteractive(t);
  }
  SetShowText(t) {
    this.GetText(1).ShowTextNew(t);
  }
  SetLocalText(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t, ...e);
  }
  SetRedDotVisible(t) {
    this.GetItem(2).SetUIActive(t);
  }
}
exports.LayoutButtonItem = LayoutButtonItem;
//# sourceMappingURL=LayoutButtonItem.js.map