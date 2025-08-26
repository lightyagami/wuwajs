"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridItemPriceComponent = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridItemPriceComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemDiscount";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  OnRefresh(e) {
    if (e) {
      this.SetPrice(e.CurPrice, e.OriginalPrice);
      this.SetTexture(e.TexPath);
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
  SetPrice(e, i) {
    if (i !== undefined && e !== i) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RogueInfoViewShopPriceWithDiscount", e, i);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RogueInfoViewShopPrice", e);
    }
  }
  SetTexture(e) {
    var i = this.GetTexture(0);
    i.SetUIActive(false);
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      this.SetTextureShowUntilLoaded(e, i);
    }
  }
}
exports.MediumItemGridItemPriceComponent = MediumItemGridItemPriceComponent;
//# sourceMappingURL=MediumItemGridItemPriceComponent.js.map