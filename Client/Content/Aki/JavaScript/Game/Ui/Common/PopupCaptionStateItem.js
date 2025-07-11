"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupCaptionStateItem = undefined;
const UE = require("ue");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiPanelBase_1 = require("../Base/UiPanelBase");
class PopupCaptionStateItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Cv1 = undefined;
    this.pv1 = undefined;
    this.OnClickCallBack = () => {};
    this.YP = () => {
      this.OnClickCallBack();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.YP]];
  }
  OnStart() {
    this.Cv1 = this.GetSprite(1).GetColor();
    this.pv1 = UE.Color.FromHex("FFCC7B");
  }
  BindClick(t) {
    this.OnClickCallBack = t;
  }
  SetTipsLocalText(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t);
  }
  SetCaptionChangeColor(t) {
    t = t ? this.pv1 : this.Cv1;
    this.GetSprite(1).SetColor(t);
    this.GetText(2).SetColor(t);
  }
}
exports.PopupCaptionStateItem = PopupCaptionStateItem;
//# sourceMappingURL=PopupCaptionStateItem.js.map