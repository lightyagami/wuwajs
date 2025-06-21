"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardDetailTaskDescItem = void 0;
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class CardDetailTaskDescItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText]
    ]
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Desc, e.CurrentProgress)
  }
}
exports.CardDetailTaskDescItem = CardDetailTaskDescItem;
//# sourceMappingURL=CardDetailTaskDescItem.js.map