"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionRogueSelectRoomHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbRogueRoleSelectRoom_1 = require("./FbRogueRoleSelectRoom");
class UnionRogueSelectRoomHelper {
  static GetUnionRogueSelectRoomObject(e) {
    if (e === fb_action_1.UnionRogueSelectRoom.RogueRoleSelectRoom) {
      return new fb_action_1.RogueRoleSelectRoom();
    }
  }
  static ReadUnionRogueSelectRoom(e, o) {
    if (o !== undefined && e === fb_action_1.UnionRogueSelectRoom.RogueRoleSelectRoom) {
      return FbRogueRoleSelectRoom_1.FbRogueRoleSelectRoom.Create(o);
    } else {
      return undefined;
    }
  }
}
exports.UnionRogueSelectRoomHelper = UnionRogueSelectRoomHelper;
//# sourceMappingURL=UnionRogueSelectRoomHelper.js.map