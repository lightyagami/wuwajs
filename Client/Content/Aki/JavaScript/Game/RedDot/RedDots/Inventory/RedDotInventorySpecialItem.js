"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotInventorySpecialItem = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotInventorySpecialItem extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnAddCommonItemList, EventDefine_1.EEventName.OnRemoveItemRedDot, EventDefine_1.EEventName.OnResponseCommonItemFinished];
  }
  OnCheck(e) {
    var n = ModelManager_1.ModelManager.InventoryModel.GetItemMainTypeMapping(7);
    return !!n && n.HasRedDot();
  }
}
exports.RedDotInventorySpecialItem = RedDotInventorySpecialItem;
//# sourceMappingURL=RedDotInventorySpecialItem.js.map