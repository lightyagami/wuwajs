"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotInfrShop = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotInfrShop extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "Infrastructure";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshGoods, EventDefine_1.EEventName.InfrastructureShopRedDotUpdate, EventDefine_1.EEventName.InfrastructureFireDataUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.InfrastructureModel.GetShopHasNewRedDot();
  }
}
exports.RedDotInfrShop = RedDotInfrShop;
//# sourceMappingURL=RedDotInfrShop.js.map