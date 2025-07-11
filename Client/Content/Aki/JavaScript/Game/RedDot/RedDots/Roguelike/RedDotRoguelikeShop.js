"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotRoguelikeShop = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityRogueController_1 = require("../../../Module/Activity/ActivityContent/RougeActivity/ActivityRogueController");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotRoguelikeShop extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RoguelikeDataUpdate, EventDefine_1.EEventName.RefreshAllPayShop, EventDefine_1.EEventName.RefreshGoods, EventDefine_1.EEventName.RefreshGoodsList, EventDefine_1.EEventName.RefreshPayShop, EventDefine_1.EEventName.CrossDay];
  }
  OnCheck() {
    ActivityRogueController_1.ActivityRogueController.RefreshActivityRedDot();
    return ModelManager_1.ModelManager.RoguelikeModel.CheckRoguelikeShopRedDot();
  }
}
exports.RedDotRoguelikeShop = RedDotRoguelikeShop;
//# sourceMappingURL=RedDotRoguelikeShop.js.map