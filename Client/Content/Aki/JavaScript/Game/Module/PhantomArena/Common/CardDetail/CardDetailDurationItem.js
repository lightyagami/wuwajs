"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardDetailDurationItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class CardDetailDurationItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(e) {
    if (e.Tips) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Tips);
    }
    this.GetText(1).SetText(e.DurationDesc);
  }
}
exports.CardDetailDurationItem = CardDetailDurationItem;
//# sourceMappingURL=CardDetailDurationItem.js.map