"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatExpressionGroupItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ChatExpressionGroupItem extends UiPanelBase_1.UiPanelBase {
  constructor(s) {
    super();
    this.aHe = 0;
    this.jYe = undefined;
    this.hSt = s => {
      if (s === 1 && this.jYe) {
        this.jYe(this.aHe);
      }
    };
    this.CreateThenShowByActor(s);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIExtendToggle]];
    this.BtnBindInfo = [[1, this.hSt]];
  }
  Refresh(s) {
    this.aHe = s.Id;
    s = s.GroupTexturePath;
    const e = this.GetTexture(0);
    e.SetUIActive(false);
    this.SetTextureByPath(s, e, undefined, () => {
      e.SetUIActive(true);
    });
  }
  SetState(s, e = false) {
    this.GetExtendToggle(1).SetToggleState(s, e);
  }
  BindOnClicked(s) {
    this.jYe = s;
  }
}
exports.ChatExpressionGroupItem = ChatExpressionGroupItem;
//# sourceMappingURL=ChatExpressionGroupItem.js.map