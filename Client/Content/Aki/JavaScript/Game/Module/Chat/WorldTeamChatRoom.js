"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldChatRoom = undefined;
const TeamChatRoomBase_1 = require("./TeamChatRoomBase");
class WorldChatRoom extends TeamChatRoomBase_1.TeamChatRoomBase {
  constructor(e) {
    super(3, e);
  }
  GetUniqueId() {
    return 3;
  }
}
exports.WorldChatRoom = WorldChatRoom;
//# sourceMappingURL=WorldTeamChatRoom.js.map