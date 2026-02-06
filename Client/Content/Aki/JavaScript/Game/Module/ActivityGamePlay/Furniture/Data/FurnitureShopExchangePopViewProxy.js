"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureShopExchangePopViewProxy = undefined;
const CommonGameplayShopExchangePopViewProxy_1 = require("../../../PayShop/GameplayShop/Data/CommonGameplayShopExchangePopViewProxy");
const FurnitureExchangeShopItem_1 = require("../View/FurnitureExchangeShopItem");
const FurnitureShopExchangeItemProxy_1 = require("./FurnitureShopExchangeItemProxy");
class FurnitureShopExchangePopViewProxy extends CommonGameplayShopExchangePopViewProxy_1.CommonGameplayShopExchangePopViewProxy {
  UpdateShopItemData() {
    var e;
    if (this.GoodsData) {
      (e = new FurnitureShopExchangeItemProxy_1.FurnitureShopExchangeItemProxy()).UpdateFromPayShopGoods(this.GoodsData);
      this.ShopItemProxy = e;
    }
  }
  UpdateShopItemResource() {
    this.ShopItemResource = "PnlDIYShopItem";
  }
  ShopItemCreate() {
    this.ShopItem = new FurnitureExchangeShopItem_1.FurnitureExchangeShopItem();
    return this.ShopItem;
  }
  ShopItemRefresh() {
    var e = this.ShopItem;
    if (e && this.ShopItemProxy) {
      e.RefreshByData(this.ShopItemProxy);
    }
  }
  UpdateTipTitleItem() {
    this.TipTitleItemVisible = false;
  }
}
exports.FurnitureShopExchangePopViewProxy = FurnitureShopExchangePopViewProxy;
//# sourceMappingURL=FurnitureShopExchangePopViewProxy.js.map