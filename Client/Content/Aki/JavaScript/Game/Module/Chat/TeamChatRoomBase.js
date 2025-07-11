"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeamChatRoomBase = undefined;
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ChatContentData_1 = require("./ChatContentData");
const ChatRoom_1 = require("./ChatRoom");
class TeamChatRoomBase extends ChatRoom_1.ChatRoom {
  AddHistoryChatContent(t) {
    this.EarliestHistoryContentUniqueId = "";
    var o = [];
    let a = undefined;
    for (const n of t) {
      var i = n.SenderPlayerId;
      var s = n.Content;
      var r = n.ChatContentType;
      var h = n.NoticeType;
      var C = n.UtcTime;
      let t = 0;
      t = typeof C == "number" ? C : C ? Number(MathUtils_1.MathUtils.LongToBigInt(n.UtcTime)) : TimeUtil_1.TimeUtil.GetServerTime();
      let e = 0;
      if (a) {
        e = a.TimeStamp;
      }
      var C = n.SenderPlayerName;
      var m = n.SenderIcon;
      var i = new ChatContentData_1.ChatContentData("", i, s, r, h, true, t, e, this.ChatRoomType, C, m);
      a = i;
      o.push(i);
    }
    this.ChatContentList = o.concat(this.ChatContentList);
  }
}
exports.TeamChatRoomBase = TeamChatRoomBase;
//# sourceMappingURL=TeamChatRoomBase.js.map