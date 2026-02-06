"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPayShopTagItem = undefined;
const UE = require("ue");
const PayItemDefine_1 = require("../../../../PayItem/PayItemDefine");
const PayShopGoods_1 = require("../../../../PayShop/PayShopData/PayShopGoods");
const PayShopExtraTagItem_1 = require("../../../../PayShop/PayShopTab/TabItem/PayShopExtraTagItem");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class TotalTopUpPayShopTagItem extends PayShopExtraTagItem_1.PayShopExtraTagItem {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture]];
  }
  OnStart() {
    var e;
    var t = ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController?.GetCurrentScoreIconPath();
    if (t && t !== "") {
      e = this.GetTexture(1);
      this.SetTextureByPath(t, e);
    }
  }
  Refresh(t) {
    var o = ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController;
    if (o) {
      let e = 0;
      if (t instanceof PayShopGoods_1.PayShopGoods) {
        e = o.GetGoodsScore(t.GetGoodsId());
      } else if (t instanceof PayItemDefine_1.PayItemData) {
        e = o.GetRechargeItemScore(t.PayItemId);
      }
      if (e <= 0) {
        this.SetUiActive(false);
      } else {
        this.SetUiActive(true);
        this.GetText(0)?.SetText(e.toString());
      }
    }
  }
}
exports.TotalTopUpPayShopTagItem = TotalTopUpPayShopTagItem;
//# sourceMappingURL=TotalTopUpPayShopTagItem.js.map