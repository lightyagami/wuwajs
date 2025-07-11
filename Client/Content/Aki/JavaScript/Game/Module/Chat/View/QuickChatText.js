"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuickChatText = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class QuickChatText extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.yyt = "";
    this.jYe = undefined;
    this.Iyt = () => {
      if (this.jYe) {
        this.jYe(this.yyt);
      }
    };
    this.CreateThenShowByActor(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.Iyt]];
  }
  OnBeforeDestroy() {
    this.jYe = undefined;
  }
  Refresh(e) {
    this.GetText(0).SetText(e);
    this.yyt = e;
  }
  BindOnClicked(e) {
    this.jYe = e;
  }
}
exports.QuickChatText = QuickChatText;
//# sourceMappingURL=QuickChatText.js.map