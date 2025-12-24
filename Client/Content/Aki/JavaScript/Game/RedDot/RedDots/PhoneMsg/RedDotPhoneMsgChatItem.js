"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhoneMsgChatItem = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPhoneMsgChatItem extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhoneMsgSetAsRead, EventDefine_1.EEventName.OnPhoneMsgAdd];
  }
  OnCheck(e) {
    return !ModelManager_1.ModelManager.PhoneMsgModel.IsShortMsgRead(e);
  }
}
exports.RedDotPhoneMsgChatItem = RedDotPhoneMsgChatItem;
//# sourceMappingURL=RedDotPhoneMsgChatItem.js.map