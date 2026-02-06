"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractGameplayShopBaseItemProxy = undefined;
const GameplayShopTextData_1 = require("./GameplayShopTextData");
class AbstractGameplayShopBaseItemProxy {
  constructor() {
    this.CurrencyId = 0;
    this.ItemId = 0;
    this.QualitySpritePath = "";
    this.ItemTexturePath = "";
    this.ItemTextureVisible = true;
    this.BigItemIconTexturePath = "";
    this.BigItemIconVisible = false;
    this.ItemNameTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.TipsButtonVisible = false;
    this.BottomBgVisible = true;
    this.BuyLimitCountTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.BuyLimitCountTextVisible = false;
    this.PriceItemVisible = true;
    this.CurrencyIconVisible = true;
    this.NowPriceTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.NowPriceTextColor = "000000FF";
    this.OriginalPriceTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.OriginalPriceVisible = false;
    this.PriceTipsTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.PriceTipsTextVisible = false;
    this.RedDotVisible = false;
    this.ItemBgItemVisible = true;
    this.RaycastTarget = true;
  }
  OnTipsButtonClick() {}
}
exports.AbstractGameplayShopBaseItemProxy = AbstractGameplayShopBaseItemProxy;
//# sourceMappingURL=AbstractGameplayShopBaseItemProxy.js.map