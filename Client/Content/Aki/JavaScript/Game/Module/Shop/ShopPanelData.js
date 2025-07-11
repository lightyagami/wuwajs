"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopPanelData = undefined;
class ShopPanelData {
  constructor() {
    this.ItemId = 0;
    this.CurrencyId = 0;
    this.SingleBuyCount = 0;
    this.SingleBuyPrice = 0;
    this.BoughtCount = 0;
    this.BuyLimit = 0;
    this.IsLock = false;
    this.LockText = undefined;
    this.InSellTime = false;
    this.BuySuccessFunction = undefined;
  }
  IsSoldOut() {
    return this.BuyLimit > 0 && this.BoughtCount === this.BuyLimit;
  }
  IsInteractive() {
    return !this.IsSoldOut() && this.InSellTime && !this.IsLock;
  }
}
exports.ShopPanelData = ShopPanelData;
//# sourceMappingURL=ShopPanelData.js.map