"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonAndTextItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ButtonAndTextItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.G6e = undefined;
    this.eTt = () => {
      if (this.G6e) {
        this.G6e();
      }
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  RefreshText(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), e, t);
  }
  RefreshTextNew(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, t);
  }
  SetText(e) {
    this.GetText(1).SetText(e);
  }
  SetTextColor(e) {
    this.GetText(1).SetColor(e);
  }
  RefreshEnable(e) {
    this.GetButton(0).SetSelfInteractive(e);
  }
  BindCallback(e) {
    this.G6e ||= e;
  }
}
exports.ButtonAndTextItem = ButtonAndTextItem;
//# sourceMappingURL=ButtonAndTextItem.js.map