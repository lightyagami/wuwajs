"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayShopBaseItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GameplayShopUtil_1 = require("../GameplayShopUtil");
class GameplayShopBaseItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.BaseItemProxy = undefined;
    this.VDg = () => {
      if (this.BaseItemProxy) {
        this.BaseItemProxy.OnTipsButtonClick();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UITexture], [8, UE.UIText], [9, UE.UIText], [10, UE.UIText], [11, UE.UIItem], [12, UE.UITexture], [13, UE.UIItem]];
    this.BtnBindInfo = [[3, this.VDg]];
  }
  RefreshByData(t) {
    this.BaseItemProxy = t;
    this.RefreshQualitySprite();
    this.RefreshBottomBgSprite();
    this.RefreshItemTexture();
    this.RefreshTipsButton();
    this.RefreshBuyLimitCountTextText();
    this.RefreshNameText();
    this.RefreshPriceItem();
    this.RefreshPriceTipsText();
    this.RefreshRedDot();
    this.RefreshBigItemIconTexture();
    this.RefreshNormalItemBg();
    this.RefreshRaycastTarget();
  }
  RefreshQualitySprite() {
    if (this.BaseItemProxy) {
      this.SetSpriteByPath(this.BaseItemProxy.QualitySpritePath, this.GetSprite(0), false);
    }
  }
  RefreshBottomBgSprite() {
    if (this.BaseItemProxy) {
      this.GetSprite(1).SetUIActive(this.BaseItemProxy.BottomBgVisible);
    }
  }
  RefreshItemTexture() {
    var t;
    if (this.BaseItemProxy && ((t = this.GetTexture(2)).SetUIActive(this.BaseItemProxy.ItemTextureVisible), this.BaseItemProxy.ItemTextureVisible)) {
      if (this.BaseItemProxy.ItemId > 0) {
        this.SetItemIcon(t, this.BaseItemProxy.ItemId);
      } else {
        this.SetTextureByPath(this.BaseItemProxy.ItemTexturePath, t);
      }
    }
  }
  RefreshTipsButton() {
    if (this.BaseItemProxy) {
      this.GetButton(3).RootUIComp.SetUIActive(this.BaseItemProxy.TipsButtonVisible);
    }
  }
  RefreshBuyLimitCountTextText() {
    var t;
    if (this.BaseItemProxy && ((t = this.GetText(4)).SetUIActive(this.BaseItemProxy.BuyLimitCountTextVisible), this.BaseItemProxy.BuyLimitCountTextVisible)) {
      GameplayShopUtil_1.GameplayShopUtil.SetText(t, this.BaseItemProxy.BuyLimitCountTextData);
    }
  }
  RefreshNameText() {
    var t;
    if (this.BaseItemProxy) {
      t = this.GetText(5);
      GameplayShopUtil_1.GameplayShopUtil.SetText(t, this.BaseItemProxy.ItemNameTextData);
    }
  }
  RefreshPriceItem() {
    var t;
    if (this.BaseItemProxy && (this.GetItem(6).SetUIActive(this.BaseItemProxy.PriceItemVisible), this.BaseItemProxy.PriceItemVisible) && ((t = this.GetTexture(7)).SetUIActive(this.BaseItemProxy.CurrencyIconVisible), this.BaseItemProxy.CurrencyIconVisible && this.SetItemIcon(t, this.BaseItemProxy.CurrencyId), t = this.GetText(8), GameplayShopUtil_1.GameplayShopUtil.SetText(t, this.BaseItemProxy.NowPriceTextData), t.SetColor(UE.Color.FromHex(this.BaseItemProxy.NowPriceTextColor)), (t = this.GetText(9)).SetUIActive(this.BaseItemProxy.OriginalPriceVisible), this.BaseItemProxy.OriginalPriceVisible)) {
      GameplayShopUtil_1.GameplayShopUtil.SetText(t, this.BaseItemProxy.OriginalPriceTextData);
    }
  }
  RefreshPriceTipsText() {
    var t;
    if (this.BaseItemProxy && ((t = this.GetText(10)).SetUIActive(this.BaseItemProxy.PriceTipsTextVisible), this.BaseItemProxy.PriceTipsTextVisible)) {
      GameplayShopUtil_1.GameplayShopUtil.SetText(t, this.BaseItemProxy.PriceTipsTextData);
    }
  }
  RefreshRedDot() {
    if (this.BaseItemProxy) {
      this.GetItem(11).SetUIActive(this.BaseItemProxy.RedDotVisible);
    }
  }
  RefreshBigItemIconTexture() {
    var t;
    if (this.BaseItemProxy && ((t = this.GetTexture(12)).SetUIActive(this.BaseItemProxy.BigItemIconVisible), this.BaseItemProxy.BigItemIconVisible)) {
      this.SetTextureByPath(this.BaseItemProxy.BigItemIconTexturePath, t);
    }
  }
  RefreshNormalItemBg() {
    if (this.BaseItemProxy) {
      this.GetItem(13).SetUIActive(this.BaseItemProxy.ItemBgItemVisible);
    }
  }
  RefreshRaycastTarget() {
    if (this.BaseItemProxy) {
      this.RootItem.SetRaycastTarget(this.BaseItemProxy.RaycastTarget);
    }
  }
}
exports.GameplayShopBaseItem = GameplayShopBaseItem;
//# sourceMappingURL=GameplayShopBaseItem.js.map