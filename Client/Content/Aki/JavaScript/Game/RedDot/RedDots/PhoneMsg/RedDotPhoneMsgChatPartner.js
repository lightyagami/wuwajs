"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhoneMsgChatPartner = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPhoneMsgChatPartner extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  IsAllEventParamAsUId() {
    return false;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhoneMsgSetAsRead, EventDefine_1.EEventName.OnPhoneMsgSetReceived, EventDefine_1.EEventName.OnPhoneMsgPanelOpen];
  }
  OnCheck(e) {
    var n = ModelManager_1.ModelManager.PhoneMsgModel.IsSomeOneHasUnReadMsg(e);
    var e = ModelManager_1.ModelManager.PhoneMsgModel.IsSomeOneHasUnReceivedMsg(e);
    return n && !e;
  }
}
exports.RedDotPhoneMsgChatPartner = RedDotPhoneMsgChatPartner;
//# sourceMappingURL=RedDotPhoneMsgChatPartner.js.map