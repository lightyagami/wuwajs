"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractGameplayShopItemProxy = undefined;
const AbstractGameplayShopBaseItemProxy_1 = require("./AbstractGameplayShopBaseItemProxy");
const GameplayShopTextData_1 = require("./GameplayShopTextData");
class AbstractGameplayShopItemProxy extends AbstractGameplayShopBaseItemProxy_1.AbstractGameplayShopBaseItemProxy {
  constructor() {
    super(...arguments);
    this.DiscountTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.DiscountItemVisible = false;
    this.LabelTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.LabelVisible = false;
    this.LeftTimeTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.LeftTimeItemVisible = false;
    this.ReSellTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.ReSellItemVisible = false;
    this.SoldOutTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.SoldOutItemVisible = false;
    this.LockTextData = new GameplayShopTextData_1.GameplayShopTextData();
    this.LockItemVisible = false;
    this.TagNewItemVisible = false;
  }
  OnBuyButtonClick() {}
}
exports.AbstractGameplayShopItemProxy = AbstractGameplayShopItemProxy;
//# sourceMappingURL=AbstractGameplayShopItemProxy.js.map