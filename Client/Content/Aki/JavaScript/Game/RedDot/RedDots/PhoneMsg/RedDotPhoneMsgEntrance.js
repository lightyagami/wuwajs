"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhoneMsgEntrance = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPhoneMsgEntrance extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhoneMsgSetAsRead, EventDefine_1.EEventName.OnPhoneMsgSetReceived, EventDefine_1.EEventName.OnPhoneMsgAdd, EventDefine_1.EEventName.OnPhoneHaveMsgToRemove];
  }
  IsAllEventParamAsUId() {
    return false;
  }
  OnCheck() {
    var e = !ModelManager_1.ModelManager.PhoneMsgModel.IsAllPhoneMsgRead();
    var n = ModelManager_1.ModelManager.PhoneMsgModel.IsHasUnReceivedMsg();
    return e || n;
  }
}
exports.RedDotPhoneMsgEntrance = RedDotPhoneMsgEntrance;
//# sourceMappingURL=RedDotPhoneMsgEntrance.js.map