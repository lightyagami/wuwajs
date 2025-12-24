"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhoneMsgChatPartnerGiftIcon = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPhoneMsgChatPartnerGiftIcon extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "FunctionPhoneMsg";
  }
  IsMultiple() {
    return true;
  }
  IsAllEventParamAsUId() {
    return false;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhoneMsgSetReceived, EventDefine_1.EEventName.OnPhoneMsgAdd];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.PhoneMsgModel.IsSomeOneHasUnReceivedMsg(e);
  }
}
exports.RedDotPhoneMsgChatPartnerGiftIcon = RedDotPhoneMsgChatPartnerGiftIcon;
//# sourceMappingURL=RedDotPhoneMsgChatPartnerGiftIcon.js.map