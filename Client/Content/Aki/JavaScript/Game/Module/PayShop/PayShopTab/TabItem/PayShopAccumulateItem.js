"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopAccumulateItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class PayShopAccumulateItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture]];
  }
  RefreshCurrencyTex(e) {
    const t = this.GetTexture(1);
    t.SetUIActive(false);
    this.SetItemIcon(this.GetTexture(1), e, undefined, () => {
      t.SetUIActive(true);
    });
  }
  RefreshTextById(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, t);
  }
}
exports.PayShopAccumulateItem = PayShopAccumulateItem;
//# sourceMappingURL=PayShopAccumulateItem.js.map