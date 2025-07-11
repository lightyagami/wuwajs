"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotItemHandBook = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDot/RedDotBase");
class RedDotItemHandBook extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnItemReadRedDotUpdate];
  }
  OnCheck(r) {
    var n = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfoList(5);
    if (n) {
      var t = n.length;
      for (let e = 0; e < t; e++) {
        var a = n[e];
        if (ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigById(a.Id).Type === r && !a.IsRead) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.RedDotItemHandBook = RedDotItemHandBook;
//# sourceMappingURL=RedDotItemHandBook.js.map