"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatRoom = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ChatContentData_1 = require("./ChatContentData");
class ChatRoom {
  constructor(t, e) {
    this.ChatRoomType = 0;
    this.ChatContentList = [];
    this.eSt = -1;
    this.tSt = false;
    this.Mne = 0;
    this.EarliestHistoryContentUniqueId = "";
    this.jFe = false;
    this.LocalSaveMsgLimit = 0;
    this.ChatCd = 0;
    this.ChatRoomType = t;
    this.Mne = e;
    this.jFe = false;
    t = ConfigManager_1.ConfigManager.ChatConfig.GetChatConfig(this.Mne);
    if (t) {
      this.LocalSaveMsgLimit = t.LocalSaveMsgLimit;
      this.ChatCd = t.ChatCd;
    }
  }
  Reset() {
    this.ChatContentList.length = 0;
    this.eSt = -1;
    this.jFe = false;
  }
  Open() {
    if (!this.jFe) {
      this.eSt = TimeUtil_1.TimeUtil.GetServerTime();
      this.jFe = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Chat", 5, " 打开聊天室", ["uniqueId", this.GetUniqueId()]);
      }
    }
  }
  Close() {
    if (this.jFe && (this.ChatContentList.length = 0, this.eSt = -1, this.jFe = false, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Chat", 5, " 关闭聊天室", ["uniqueId", this.GetUniqueId()]);
    }
  }
  GetIsOpen() {
    return this.jFe;
  }
  SetIsShowRedDot(t) {
    this.tSt = t;
  }
  GetIsShowRedDot() {
    return this.tSt;
  }
  GetConfigId() {
    return this.Mne;
  }
  GetUniqueId() {
    return -1;
  }
  GetChatConfig() {
    return ConfigManager_1.ConfigManager.ChatConfig.GetChatConfig(this.Mne);
  }
  GetChatContentList() {
    return this.ChatContentList;
  }
  GetEarliestHistoryContentUniqueId() {
    return this.EarliestHistoryContentUniqueId;
  }
  GetCreateTimeStamp() {
    return this.eSt;
  }
  ClearCreateTime() {
    this.eSt = -1;
  }
  GetLastTimeStamp() {
    var t = this.ChatContentList.length - 1;
    if (t < 0) {
      return 0;
    } else {
      return this.ChatContentList[t].TimeStamp;
    }
  }
  AddChatContent(t, e, i, s, r, h, o, n, a, C, u, _) {
    t = new ChatContentData_1.ChatContentData(t, e, i, s, r, h, o, n, this.ChatRoomType, a, C, u, _);
    this.ChatContentList.push(t);
    return t;
  }
  GetLastChatContentData(t = 1) {
    t = this.ChatContentList.length - t;
    if (!(t < 0)) {
      return this.ChatContentList[t];
    }
  }
  AddHistoryChatContent(t) {
    t.sort((t, e) => {
      var i = t.UtcTime;
      var s = e.UtcTime;
      if (i && s) {
        if (typeof i == "number" && typeof s == "number") {
          return i - s;
        } else {
          return Number(MathUtils_1.MathUtils.LongToBigInt(i)) - Number(MathUtils_1.MathUtils.LongToBigInt(s));
        }
      } else {
        return t.SenderUid - e.SenderUid;
      }
    });
    this.EarliestHistoryContentUniqueId = t[0].MsgId;
    var i = [];
    let s = undefined;
    for (const u of t) {
      var r = u.SenderUid;
      var h = u.Content;
      var o = u.ChatContentType;
      var n = u.OfflineMsg;
      var a = u.MsgId;
      var C = u.UtcTime;
      let t = 0;
      t = typeof C == "number" ? C : C ? Number(MathUtils_1.MathUtils.LongToBigInt(u.UtcTime)) : TimeUtil_1.TimeUtil.GetServerTime();
      let e = 0;
      if (s) {
        e = s.TimeStamp;
      }
      C = new ChatContentData_1.ChatContentData(a, r, h, o, Protocol_1.Aki.Protocol.GFs.Proto_None, n, t, e, this.ChatRoomType, undefined, undefined);
      s = C;
      i.push(C);
    }
    this.ChatContentList = i.concat(this.ChatContentList);
  }
}
exports.ChatRoom = ChatRoom;
//# sourceMappingURL=ChatRoom.js.map