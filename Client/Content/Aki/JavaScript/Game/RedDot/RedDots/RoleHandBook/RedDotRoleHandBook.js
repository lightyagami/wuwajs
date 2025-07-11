"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotRoleHandBook = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotRoleHandBook extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotRefreshItemData, EventDefine_1.EEventName.RedDotStart];
  }
  OnCheck() {
    var n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleListByType(1);
    var o = n.length;
    for (let e = 0; e < o; e++) {
      var r;
      var a;
      var t = n[e];
      var i = t.Id;
      if (t.PartyId !== 9) {
        let e = undefined;
        let n = undefined;
        for ([r, a] of t.ExchangeConsume) {
          e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(r);
          n = a;
          break;
        }
        t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i);
        i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e.Id);
        if (t === undefined && i >= n) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.RedDotRoleHandBook = RedDotRoleHandBook;
//# sourceMappingURL=RedDotRoleHandBook.js.map