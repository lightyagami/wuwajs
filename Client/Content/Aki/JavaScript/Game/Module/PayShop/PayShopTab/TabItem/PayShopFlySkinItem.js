"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopFlySkinItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ShopFlySkinData_1 = require("../../../Skin/Data/ShopFlySkinData");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class PayShopFlySkinItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UITexture], [5, UE.UITexture], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UISprite], [9, UE.UIItem]];
  }
  Refresh(i, t, s) {
    var i = ShopFlySkinData_1.ShopFlySkinData.Create(i);
    this.SetTextureByPath(i.GetPreviewTextureInPop(), this.GetTexture(0));
    var e = i.GetIfDirect();
    this.GetTexture(1).SetUIActive(!e);
    if (e) {
      e = i.GetDirectPriceText();
      this.GetText(2).SetText(e);
      this.GetText(3).SetText("");
    } else {
      e = i.GetPriceData();
      this.SetItemIcon(this.GetTexture(1), e.CurrencyId);
      r = e.NowPrice;
      this.GetText(2).SetText(r.toString());
      if (r = e.OriginalPrice) {
        this.GetText(3).SetUIActive(true);
        this.GetText(3).SetText(`<s>${r.toString()}</s>`);
      } else {
        this.GetText(3).SetUIActive(false);
      }
    }
    this.GetSprite(8)?.SetUIActive(false);
    this.GetItem(9)?.SetUIActive(false);
    var e = i.GetFlySkinData().GetSkinGrade() === 1;
    this.GetItem(6).SetUIActive(e);
    this.GetItem(7).SetUIActive(e);
    var r = e ? "T_ShopSkinBg1" : "T_ShopSkinBg";
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(r);
    this.SetTextureByPath(i, this.GetTexture(5));
  }
}
exports.PayShopFlySkinItem = PayShopFlySkinItem;
//# sourceMappingURL=PayShopFlySkinItem.js.map