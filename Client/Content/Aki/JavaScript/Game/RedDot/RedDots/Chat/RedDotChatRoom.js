"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotChatRoom = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotChatRoom extends RedDotBase_1.RedDotBase {
  OnCheck(e) {
    let t = undefined;
    return !!(t = e === 2 ? ModelManager_1.ModelManager.ChatModel.GetTeamChatRoom() : e === 3 ? ModelManager_1.ModelManager.ChatModel.GetWorldChatRoom() : ModelManager_1.ModelManager.ChatModel.GetPrivateChatRoom(e)) && t.GetIsShowRedDot();
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnRefreshChatRoomRedDot, EventDefine_1.EEventName.OnRemoveFriend];
  }
}
exports.RedDotChatRoom = RedDotChatRoom;
//# sourceMappingURL=RedDotChatRoom.js.map