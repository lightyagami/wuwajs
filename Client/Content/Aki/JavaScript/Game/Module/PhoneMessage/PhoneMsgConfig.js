"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMsgConfig = undefined;
const ChatBgAll_1 = require("../../../Core/Define/ConfigQuery/ChatBgAll");
const ChatBgById_1 = require("../../../Core/Define/ConfigQuery/ChatBgById");
const ChatDialogAll_1 = require("../../../Core/Define/ConfigQuery/ChatDialogAll");
const ChatDialogById_1 = require("../../../Core/Define/ConfigQuery/ChatDialogById");
const ChatPartnerById_1 = require("../../../Core/Define/ConfigQuery/ChatPartnerById");
const ShortMessageByAll_1 = require("../../../Core/Define/ConfigQuery/ShortMessageByAll");
const ShortMessageById_1 = require("../../../Core/Define/ConfigQuery/ShortMessageById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class PhoneMsgConfig extends ConfigBase_1.ConfigBase {
  GetPhoneMsgConfig(e) {
    return ShortMessageById_1.configShortMessageById.GetConfig(e);
  }
  GetChatPartnerConfig(e) {
    return ChatPartnerById_1.configChatPartnerById.GetConfig(e);
  }
  GetChatBgConfig(e) {
    return ChatBgById_1.configChatBgById.GetConfig(e);
  }
  GetAllChatBgConfigList() {
    return ChatBgAll_1.configChatBgAll.GetConfigList();
  }
  GetChatDialogConfig(e) {
    return ChatDialogById_1.configChatDialogById.GetConfig(e);
  }
  GetAllChatDialogConfigList() {
    return ChatDialogAll_1.configChatDialogAll.GetConfigList();
  }
  GetShortMessageConfigByPlayFlow(e) {
    var r = e.FlowListName;
    var t = e.FlowId;
    var o = e.StateId;
    for (const i of ShortMessageByAll_1.configShortMessageByAll.GetConfigList()) {
      var a = i.FlowParam;
      if (a.length === 3 && a[0] === r && parseInt(a[1]) === t && parseInt(a[2]) === o) {
        return i;
      }
    }
  }
}
exports.PhoneMsgConfig = PhoneMsgConfig;
//# sourceMappingURL=PhoneMsgConfig.js.map