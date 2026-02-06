"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractGameplayShopExchangePopViewProxy = undefined;
const GameplayShopTextData_1 = require("./GameplayShopTextData");
class AbstractGameplayShopExchangePopViewProxy {
  constructor() {
    this.CurrencyId = 0;
    this.CurrencyIdList = [];
    this.Price = 0;
    this.DescribeTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.TipTitleItemVisible = false;
    this.LeftTimeItemVisible = false;
    this.LeftTimeTextVisible = false;
    this.LeftTimeDescTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.LeftTimeTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.LimitTextItemVisible = false;
    this.LimitTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.LockItemVisible = false;
    this.LockTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.ReSellTime = 0;
    this.BuyCount = 1;
    this.MaxBuyCount = 0;
    this.ExchangeTableTextId = "";
    this.ShopItemResource = "";
  }
}
exports.AbstractGameplayShopExchangePopViewProxy = AbstractGameplayShopExchangePopViewProxy;
//# sourceMappingURL=AbstractGameplayShopExchangePopViewProxy.js.map