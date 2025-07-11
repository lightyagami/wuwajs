"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeamChatRoom = undefined;
const TeamChatRoomBase_1 = require("./TeamChatRoomBase");
class TeamChatRoom extends TeamChatRoomBase_1.TeamChatRoomBase {
  constructor(e) {
    super(2, e);
  }
  GetUniqueId() {
    return 2;
  }
}
exports.TeamChatRoom = TeamChatRoom;
//# sourceMappingURL=TeamChatRoom.js.map