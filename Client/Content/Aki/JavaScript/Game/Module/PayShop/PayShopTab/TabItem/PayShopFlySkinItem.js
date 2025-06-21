"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PayShopFlySkinItem = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ShopFlySkinData_1 = require("../../../Skin/Data/ShopFlySkinData"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class PayShopFlySkinItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UITexture],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UISprite],
      [9, UE.UIItem]
    ]
  }
  Refresh(i, t, s) {
    var i = ShopFlySkinData_1.ShopFlySkinData.Create(i),
      e = (this.SetTextureByPath(i.GetPreviewTextureInPop(), this.GetTexture(0)), i.GetIfDirect()),
      e = (this.GetTexture(1).SetUIActive(!e), e ? (e = i.GetDirectPriceText(), this.GetText(2).SetText(e), this.GetText(3).SetText("")) : (e = i.GetPriceData(), this.SetItemIcon(this.GetTexture(1), e.CurrencyId), r = e.NowPrice, this.GetText(2).SetText(r.toString()), (r = e.OriginalPrice) ? (this.GetText(3).SetUIActive(!0), this.GetText(3).SetText(`<s>${r.toString()}</s>`)) : this.GetText(3).SetUIActive(!1)), this.GetSprite(8)?.SetUIActive(!1), this.GetItem(9)?.SetUIActive(!1), 1 === i.GetFlySkinData().GetSkinGrade()),
      r = (this.GetItem(6).SetUIActive(e), this.GetItem(7).SetUIActive(e), e ? "T_ShopSkinBg1" : "T_ShopSkinBg"),
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(r);
    this.SetTextureByPath(i, this.GetTexture(5))
  }
}
exports.PayShopFlySkinItem = PayShopFlySkinItem;
//# sourceMappingURL=PayShopFlySkinItem.js.map