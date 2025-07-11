"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMoonChasingShop = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityMoonChasingController_1 = require("../../../Module/Activity/ActivityContent/MoonChasing/Activity/ActivityMoonChasingController");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMoonChasingShop extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "MoonChasingRewardAndShop";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MoonChasingRefreshRewardRedDot, EventDefine_1.EEventName.RefreshGoodsList, EventDefine_1.EEventName.UnLockGoods, EventDefine_1.EEventName.GoodsSoldOut];
  }
  IsAllEventParamAsUId() {
    return false;
  }
  OnCheck() {
    ActivityMoonChasingController_1.ActivityMoonChasingController.RefreshActivityRedDot();
    return ModelManager_1.ModelManager.MoonChasingRewardModel.GetShopRedDotState();
  }
}
exports.RedDotMoonChasingShop = RedDotMoonChasingShop;
//# sourceMappingURL=RedDotMoonChasingShop.js.map