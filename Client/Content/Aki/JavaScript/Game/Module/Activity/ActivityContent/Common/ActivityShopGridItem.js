"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityShopGridItem = undefined;
const PayShopGoods_1 = require("../../../PayShop/PayShopData/PayShopGoods");
const PayShopItem_1 = require("../../../PayShop/PayShopTab/TabItem/PayShopItem");
class ActivityShopGridItem extends PayShopItem_1.PayShopItem {
  constructor() {
    super(...arguments);
    this.b2a = (t, o) => {
      this.SetNewFlagState(o.GetIfNeedRemind());
    };
  }
  OnStart() {
    super.OnStart();
    this.SetExtraFunction(this.b2a);
    this.SetRedDotState(false);
  }
  Refresh(t, o, e) {
    if (t instanceof PayShopGoods_1.PayShopGoods) {
      super.Refresh(t, o, e);
      this.SetNewFlagState(t.GetIfNeedRemind());
    }
  }
}
exports.ActivityShopGridItem = ActivityShopGridItem;
//# sourceMappingURL=ActivityShopGridItem.js.map