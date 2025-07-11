"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopGoodsPrice = undefined;
const PayShopDefine_1 = require("../PayShopDefine");
class PayShopGoodsPrice {
  constructor() {
    this.Id = 0;
    this.Count = 0;
    this.PromotionCount = 0;
  }
  Phrase(t) {
    this.Id = t.s5n ?? 0;
    this.Count = t.m9n ?? 0;
    this.PromotionCount = t.vBs ?? 0;
  }
  GetDiscount() {
    return Math.ceil((this.Count - this.PromotionCount) * PayShopDefine_1.DISCOUNT_PERCENT / this.Count);
  }
  GetDiscountNew() {
    return Math.floor((this.Count - this.PromotionCount) * PayShopDefine_1.DISCOUNT_PERCENT / this.PromotionCount);
  }
}
exports.PayShopGoodsPrice = PayShopGoodsPrice;
//# sourceMappingURL=PayShopGoodsPrice.js.map