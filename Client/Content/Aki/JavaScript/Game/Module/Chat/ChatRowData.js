"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatRowData = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
class ChatRowData {
  constructor(t, s, i, h, o, e, r, c, a, l) {
    this.UniqueId = 0;
    this.SenderPlayerId = 0;
    this.SenderPlayerIcon = undefined;
    this.SenderPlayerName = undefined;
    this.TargetPlayerId = undefined;
    this.Content = "";
    this.ContentType = Protocol_1.Aki.Protocol.p8n.DIs;
    this.ContentChatRoomType = 0;
    this.IsOfflineMassage = false;
    this.TimeStamp = 0;
    this.IsVisible = true;
    this.UniqueId = t;
    this.SenderPlayerId = s;
    this.Content = i;
    this.ContentType = h;
    this.IsOfflineMassage = o;
    this.TargetPlayerId = c;
    this.ContentChatRoomType = e;
    this.TimeStamp = r;
    this.SenderPlayerName = a;
    this.SenderPlayerIcon = l;
  }
}
exports.ChatRowData = ChatRowData;
//# sourceMappingURL=ChatRowData.js.map