"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopSkinItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ShopSkinData_1 = require("../../../Skin/Data/ShopSkinData");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class PayShopSkinItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ayl = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UITexture], [5, UE.UITexture], [6, UE.UIItem], [7, UE.UIItem]];
  }
  Refresh(t, i, s) {
    this.ayl = ShopSkinData_1.ShopSkinData.Create(t);
    this.lyl(this.ayl);
    this.syl(this.ayl);
    this.iyl(this.ayl);
    this.ryl(this.ayl);
    this.hyl(this.ayl);
    this.JSl(this.ayl);
    this.f7l(this.ayl);
  }
  f7l(t) {
    t = t.GetRoleSkinData().GetSuitWeaponSkinId() > 0;
    this.GetItem(6).SetUIActive(t);
    this.GetItem(7).SetUIActive(t);
  }
  lyl(t) {
    this.SetTextureByPath(t.GetPayShopPreviewBuyRoleTexturePath(), this.GetTexture(0));
  }
  hyl(t) {
    if (t && (t = t.GetPayShopPreviewBuyRoleSuitWeaponTexturePath()) !== "" && t) {
      this.GetTexture(4).SetUIActive(true);
      this.SetTextureByPath(t, this.GetTexture(4));
    } else {
      this.GetTexture(4).SetUIActive(false);
    }
  }
  syl(t) {
    var i;
    if (t) {
      i = t.GetIfDirect();
      this.GetTexture(1).SetUIActive(!i);
      if (!i) {
        i = t.GetPriceData();
        this.SetItemIcon(this.GetTexture(1), i.CurrencyId);
      }
    } else {
      this.GetTexture(1).SetUIActive(false);
    }
  }
  ryl(t) {
    if (!t || t.GetIfDirect()) {
      this.GetText(3).SetText("");
    } else if (t = t.GetPriceData().OriginalPrice) {
      this.GetText(3).SetUIActive(true);
      this.GetText(3).SetText(`<s>${t.toString()}</s>`);
    } else {
      this.GetText(3).SetUIActive(false);
    }
  }
  iyl(t) {
    var i;
    if (t) {
      if (t.GetIfDirect()) {
        i = t.GetDirectPriceText();
        this.GetText(2).SetText(i);
      } else {
        i = t.GetPriceData().NowPrice;
        this.GetText(2).SetText(i.toString());
      }
    } else {
      this.GetText(2).SetText("");
    }
  }
  JSl(t) {
    if (t) {
      t = t.GetRoleSkinData().GetSuitWeaponSkinId() > 0 ? "T_ShopSkinBg1" : "T_ShopSkinBg";
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
      this.SetTextureByPath(t, this.GetTexture(5));
    } else {
      this.GetTexture(5).SetUIActive(false);
    }
  }
}
exports.PayShopSkinItem = PayShopSkinItem;
//# sourceMappingURL=PayShopSkinItem.js.map