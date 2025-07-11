"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopTagItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class PayShopTagItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.TextParam = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture]];
  }
  SetText(e) {
    this.GetText(0)?.SetText(e);
  }
  SetTextByTextId(e, t = 0) {
    this.TextParam = t;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, t);
  }
  SetMaskVisible(e) {
    this.GetTexture(1)?.SetUIActive(e);
  }
}
exports.PayShopTagItem = PayShopTagItem;
//# sourceMappingURL=PayShopTagItem.js.map