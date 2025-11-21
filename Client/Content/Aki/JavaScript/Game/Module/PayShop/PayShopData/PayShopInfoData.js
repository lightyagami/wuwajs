"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopInfoData = undefined;
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
class PayShopInfoData {
  constructor() {
    this.Id = 0;
    this.UpdateTime = 0n;
    this.LastUpdateTime = 0n;
    this.ShopTabViewType = 0;
    this.DynamicTabId = 0;
    this.Sort = 0;
    this.Money = new Array();
    this.SortRule = 0;
  }
  Phrase(t) {
    this.Id = t.s5n;
    this.UpdateTime = MathUtils_1.MathUtils.LongToBigInt(t.Lxs);
    this.LastUpdateTime = MathUtils_1.MathUtils.LongToBigInt(t.JT_);
    this.ShopTabViewType = t.Ukd;
    this.DynamicTabId = t.xkd;
    this.Sort = t.cBs;
    this.Money = t.Bkd;
    this.SortRule = t.kkd;
  }
}
exports.PayShopInfoData = PayShopInfoData;
//# sourceMappingURL=PayShopInfoData.js.map