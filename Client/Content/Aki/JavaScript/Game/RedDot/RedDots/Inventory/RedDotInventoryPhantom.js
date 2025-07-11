"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotInventoryPhantom = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotInventoryPhantom extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnAddPhantomItemList, EventDefine_1.EEventName.OnRemoveItemRedDot];
  }
  OnCheck(e) {
    var n = ModelManager_1.ModelManager.InventoryModel.GetItemMainTypeMapping(3);
    return !!n && n.HasRedDot();
  }
}
exports.RedDotInventoryPhantom = RedDotInventoryPhantom;
//# sourceMappingURL=RedDotInventoryPhantom.js.map