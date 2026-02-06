"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopTabRedDot = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class PayShopTabRedDot extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  IsAllEventParamAsUId() {
    return false;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.PayShopGoodsBuy, EventDefine_1.EEventName.GoodsRefreshDiscountTime, EventDefine_1.EEventName.SwitchPayShopView, EventDefine_1.EEventName.RefreshPayShop, EventDefine_1.EEventName.RefreshGoods, EventDefine_1.EEventName.RefreshGoodsList, EventDefine_1.EEventName.UnLockGoods, EventDefine_1.EEventName.RefreshPayShopTabRedDot, EventDefine_1.EEventName.ReceiveWeekCardDataEvent];
  }
  OnCheck(e) {
    var n = ModelManager_1.ModelManager.PayShopModel.GetCurrentPayShopId();
    return ModelManager_1.ModelManager.PayShopModel.CheckPayShopTabHasRedDot(n, e);
  }
}
exports.PayShopTabRedDot = PayShopTabRedDot;
//# sourceMappingURL=PayShopTabRedDot.js.map