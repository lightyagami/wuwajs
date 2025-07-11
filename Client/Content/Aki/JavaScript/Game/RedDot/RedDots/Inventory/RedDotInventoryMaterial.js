"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotInventoryMaterial = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotInventoryMaterial extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnAddCommonItemList, EventDefine_1.EEventName.OnRemoveItemRedDot, EventDefine_1.EEventName.OnResponseCommonItemFinished];
  }
  OnCheck(e) {
    var n = ModelManager_1.ModelManager.InventoryModel.GetItemMainTypeMapping(5);
    return !!n && n.HasRedDot();
  }
}
exports.RedDotInventoryMaterial = RedDotInventoryMaterial;
//# sourceMappingURL=RedDotInventoryMaterial.js.map