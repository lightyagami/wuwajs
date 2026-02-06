"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotFurnitureEntrance = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotFurnitureEntrance extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.UpdateFurnitureEntranceRedDot, EventDefine_1.EEventName.RefreshGoodsList, EventDefine_1.EEventName.RefreshAllPayShop, EventDefine_1.EEventName.OnPayShopConditionFinish, EventDefine_1.EEventName.UnLockGoods, EventDefine_1.EEventName.FurnitureFunctionOpenNotify, EventDefine_1.EEventName.OnFurnitureAreaUnlockNotify];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.FurnitureModel.CheckFurnitureEntranceRedDot();
  }
}
exports.RedDotFurnitureEntrance = RedDotFurnitureEntrance;
//# sourceMappingURL=RedDotFurnitureEntrance.js.map