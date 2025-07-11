"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhantomHandBook = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const ModelManager_1 = require("../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDot/RedDotBase");
class RedDotPhantomHandBook extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomReadRedDotUpdate, EventDefine_1.EEventName.OnHandBookRedDotUpdate];
  }
  OnCheck() {
    var t = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfoList(1);
    if (t) {
      var n = t.length;
      for (let e = 0; e < n; e++) {
        if (!t[e].IsRead) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.RedDotPhantomHandBook = RedDotPhantomHandBook;
//# sourceMappingURL=RedDotPhantomHandBook.js.map