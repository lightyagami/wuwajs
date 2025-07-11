"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingLimitTimeShopGridItem = undefined;
const PayShopGoods_1 = require("../../../../../../PayShop/PayShopData/PayShopGoods");
const PayShopItem_1 = require("../../../../../../PayShop/PayShopTab/TabItem/PayShopItem");
class FishingLimitTimeShopGridItem extends PayShopItem_1.PayShopItem {
  constructor(t) {
    super();
    this.ActivityDataBase = t;
    this.b2a = (t, e) => {
      this.SetNewFlagState(e.GetIfNeedRemind());
    };
  }
  OnStart() {
    super.OnStart();
    this.SetExtraFunction(this.b2a);
    this.SetRedDotState(false);
  }
  Refresh(t, e, s) {
    if (t instanceof PayShopGoods_1.PayShopGoods) {
      super.Refresh(t, e, s);
      this.SetNewFlagState(t.GetIfNeedRemind());
    }
  }
}
exports.FishingLimitTimeShopGridItem = FishingLimitTimeShopGridItem;
//# sourceMappingURL=FishingLimitTimeShopGridItem.js.map