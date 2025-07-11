"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotChatView = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotChatView extends RedDotBase_1.RedDotBase {
  OnCheck() {
    return ModelManager_1.ModelManager.ChatModel.HasRedDot();
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnRefreshChatRedDot, EventDefine_1.EEventName.OnRemoveFriend];
  }
}
exports.RedDotChatView = RedDotChatView;
//# sourceMappingURL=RedDotChatView.js.map