"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const ChatController_1 = require("./ChatController");
const ChatDefine_1 = require("./ChatDefine");
const ChatPlayerData_1 = require("./ChatPlayerData");
const ChatRowData_1 = require("./ChatRowData");
const PrivateChatRoom_1 = require("./PrivateChatRoom");
const TeamChatRoom_1 = require("./TeamChatRoom");
const WorldTeamChatRoom_1 = require("./WorldTeamChatRoom");
class ChatModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.kEt = new Map();
    this.VEt = [];
    this.HEt = 0;
    this.jEt = new Map();
    this.WEt = undefined;
    this.KEt = undefined;
    this.QEt = undefined;
    this.XEt = [];
    this.IsOpenedChatView = false;
    this.ShowTimeDifferent = 0;
  }
  OnInit() {
    this.ShowTimeDifferent = CommonParamById_1.configCommonParamById.GetIntConfig("ShowTimeDifferent");
    return true;
  }
  OnClear() {
    for (const t of this.jEt.values()) {
      t.Reset();
    }
    this.jEt.clear();
    this.VEt.length = 0;
    this.XEt.length = 0;
    this.QEt = undefined;
    this.ClearChatPlayerData();
    return true;
  }
  AddChatPlayerData(t) {
    var e = new ChatPlayerData_1.ChatPlayerData(t);
    this.kEt.set(t, e);
    return e;
  }
  GetChatPlayerData(t) {
    return this.kEt.get(t);
  }
  RefreshChatPlayerData(t, e, a) {
    let o = this.GetChatPlayerData(t);
    var i = (o = o || this.AddChatPlayerData(t)).GetPlayerIcon();
    var r = o.GetPlayerName();
    var h = ModelManager_1.ModelManager.PersonalModel;
    var n = h.GetPersonalInfoData();
    if (n && n.PlayerId === t) {
      o.SetPlayerIcon(h.GetHeadPhotoId());
      o.SetPlayerName(n.Name);
    } else {
      o.SetPlayerIcon(e);
      o.SetPlayerName(a);
    }
    if (i !== e || r !== a) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChatPlayerInfoChanged, t);
    }
  }
  ClearChatPlayerData() {
    this.kEt.clear();
  }
  AddChatContent(t, e, a, o, i, r, h, n, s, C, m, _, v) {
    e = t.AddChatContent(e, a, o, i, r, h, n, s, C, m, _, v);
    let l = 0;
    let f = 0;
    if (t instanceof PrivateChatRoom_1.PrivateChatRoom) {
      l = t.GetTargetPlayerId();
      f = 1;
    } else if (t instanceof TeamChatRoom_1.TeamChatRoom) {
      f = 2;
    } else if (t instanceof WorldTeamChatRoom_1.WorldChatRoom) {
      f = 3;
    }
    if (a !== ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
      this.SetChatRoomRedDot(t, true);
    }
    if (r === Protocol_1.Aki.Protocol.GFs.Proto_None) {
      this.AddChatRowData(a, o, i, false, f, n, l, C, m);
    }
    this.YEt();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddChatContent, t, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshChatRedDot);
  }
  YEt() {
    for (const t of this.jEt.values()) {
      t.ClearCreateTime();
    }
  }
  RequestPrivateRoomLocalHistory(t) {
    var e = t.GetUniqueId();
    var t = t.GetEarliestHistoryContentUniqueId();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Chat", 5, "===目前暂时屏蔽聊天本地缓存的请求===", ["chatUniqueId", e], ["fromContentUniqueId", t]);
    }
  }
  AddChatRowData(t, e, a, o, i, r, h, n, s, C = true) {
    this.JEt(t, e, a, o, i, r, h, n, s);
    if (C && this.VEt.length > ChatDefine_1.CHAT_CONTENT_QUEUE_SIZE) {
      this.zEt();
    }
  }
  SortChatRowData() {
    this.VEt.sort((t, e) => t.TimeStamp - e.TimeStamp);
  }
  ClampChatRowDataListLength() {
    var t = this.VEt.length;
    if (!(t <= ChatDefine_1.CHAT_CONTENT_QUEUE_SIZE)) {
      this.VEt = this.VEt.slice(Math.max(t - ChatDefine_1.CHAT_CONTENT_QUEUE_SIZE, 0));
    }
  }
  DeletePrivateChat(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Chat", 5, "[ChatDebug]删除主界面聊天数据", ["playerId", e]);
    }
    for (let t = 0; t < this.VEt.length; t++) {
      if (this.VEt[t].TargetPlayerId === e) {
        this.VEt.splice(t, 1);
        t--;
      }
    }
  }
  DeleteTeamChat() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Chat", 5, "[ChatDebug]删除主界面队伍聊天数据");
    }
    for (let t = 0; t < this.VEt.length; t++) {
      var e = this.VEt[t];
      if (e.ContentChatRoomType === 2 || e.ContentChatRoomType === 3) {
        this.VEt.splice(t, 1);
        t--;
      }
    }
  }
  SetTeamChatRowDataVisible(t) {
    for (const a of this.VEt) {
      var e = a.ContentChatRoomType;
      if (e === 2 || e === 3) {
        a.IsVisible = t;
      }
    }
  }
  JEt(t, e, a, o, i, r, h, n, s) {
    t = new ChatRowData_1.ChatRowData(this.HEt++, t, e, a, o, i, r, h, n, s);
    this.VEt.push(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPushChatRowData, t);
  }
  ClearChatRowData() {
    this.VEt.length = 0;
  }
  RemoveChatRowDataByChatRoomType(...e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Chat", 5, "[ChatDebug]删除主界面聊天数据---开始", ["chatRoomType", e], ["chatRowDataListLength", this.VEt.length]);
    }
    var a = [];
    for (let t = 0; t < this.VEt.length; t++) {
      var o = this.VEt[t];
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Chat", 5, "[ChatDebug]删除主界面聊天数据---打印当前聊天记录", ["Content", o.Content], ["TimeStamp", o.TimeStamp]);
      }
      if (e.includes(o.ContentChatRoomType)) {
        a.push(t);
      }
    }
    for (const t of a) {
      this.VEt.splice(t, 1);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Chat", 5, "[ChatDebug]删除主界面聊天数据---结束", ["removeIndexList", a], ["chatRowDataListLength", this.VEt.length]);
    }
  }
  zEt() {
    var t = this.VEt.shift();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPopChatRowData, t);
  }
  GetChatRowDataList() {
    return this.VEt;
  }
  HasOfflineMassage() {
    for (const t of this.VEt) {
      if (t.IsOfflineMassage) {
        return true;
      }
    }
    return false;
  }
  AddPrivateHistoryChatContent(t, e) {
    var a = [];
    for (const r of e) {
      var o = r.N8n;
      var i = {
        UtcTime: r.k8n,
        MsgId: r.O8n,
        SenderUid: o,
        Content: r.P8n,
        ChatContentType: r.p8n,
        OfflineMsg: r.F8n
      };
      a.push(i);
      var i = ModelManager_1.ModelManager.FriendModel?.GetFriendById(o);
      if (i) {
        this.RefreshChatPlayerData(o, i.PlayerHeadPhoto, i.PlayerName);
      }
    }
    t.AddHistoryChatContent(a);
    t.Open();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddHistoryChatContentCompleted, t);
  }
  AddTeamHistoryChatContent(t, e) {
    var a = [];
    for (const i of e) {
      var o = {
        SenderPlayerId: i.GLs,
        SenderPlayerName: i.kLs,
        UtcTime: i.FLs,
        SenderIcon: i.OLs,
        Content: i.P8n,
        ChatContentType: i.p8n,
        NoticeType: i.NLs
      };
      a.push(o);
    }
    t.AddHistoryChatContent(a);
    t.Open();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddHistoryChatContentCompleted, t);
  }
  JoinChatRoom(t) {
    this.SetChatRoomRedDot(t, false);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Chat", 5, " 加入聊天室", ["UniqueId", t.GetUniqueId()]);
    }
    if (t.GetIsOpen()) {
      this.QEt = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnJoinChatRoom, t);
    } else if (t instanceof PrivateChatRoom_1.PrivateChatRoom) {
      if (!t.CanChat()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Chat", 5, " 加入私人聊天室时，对应好友在黑名单或不在好友列表中，无法加入聊天室", ["UniqueId", t.GetUniqueId()]);
        }
        return;
      }
      this.QEt = t;
      this.RequestOpenPrivateChatRoom(t);
    } else {
      this.QEt = t;
      this.RequestOpenChatRoom(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshChatRedDot);
  }
  LeaveCurrentChatRoom() {
    this.QEt = undefined;
  }
  RemovePrivateChatRoom(t) {
    if (this.QEt instanceof PrivateChatRoom_1.PrivateChatRoom && this.QEt.GetTargetPlayerId() === t) {
      this.LeaveCurrentChatRoom();
    }
    var e = this.GetPrivateChatRoom(t);
    if (e) {
      e.Reset();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Chat", 5, " 删除私人聊天室", ["PlayerId", t]);
      }
      this.jEt.delete(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemovePrivateChatRoom, t);
    }
  }
  ClosePrivateChatRoom(t) {
    if (this.QEt instanceof PrivateChatRoom_1.PrivateChatRoom && this.QEt.GetTargetPlayerId() === t) {
      this.QEt = undefined;
    }
    var e = this.GetPrivateChatRoom(t);
    if (e) {
      e.Close();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Chat", 5, " 关闭私人聊天室", ["PlayerId", t]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClosePrivateChatRoom, t);
    }
  }
  RequestOpenPrivateChatRoom(t) {
    var e;
    if (!t.GetIsOpen()) {
      e = t.GetTargetPlayerId();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Chat", 5, " 请求打开私人聊天室", ["PlayerId", e]);
      }
      t.Open();
      ChatController_1.ChatController.PrivateChatHistoryRequest(e);
      this.SetChatRoomRedDot(t, true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOpenChatRoom, t);
    }
  }
  RequestOpenChatRoom(t) {
    if (!t.GetIsOpen()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Chat", 5, " 请求打开队伍/联机聊天室 ");
      }
      t.Open();
      this.SetChatRoomRedDot(t, true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOpenChatRoom, t);
    }
  }
  SetChatRoomRedDot(t, e) {
    if (t && t.GetIsShowRedDot() !== e && this.GetJoinedChatRoom()?.GetUniqueId() !== t.GetUniqueId()) {
      t.SetIsShowRedDot(e);
      if (t instanceof PrivateChatRoom_1.PrivateChatRoom) {
        e = t.GetTargetPlayerId();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshChatRoomRedDot, e);
      } else if (t instanceof TeamChatRoom_1.TeamChatRoom) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshChatRoomRedDot, 2);
      } else if (t instanceof WorldTeamChatRoom_1.WorldChatRoom) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshChatRoomRedDot, 3);
      }
    }
  }
  GetJoinedChatRoom() {
    return this.QEt;
  }
  HasRedDot() {
    for (const t of this.jEt.values()) {
      if (t.GetIsShowRedDot()) {
        return true;
      }
    }
    return !!this.WEt?.GetIsShowRedDot() || !!this.KEt?.GetIsShowRedDot();
  }
  TryGetPrivateChatRoom(t) {
    let e = this.GetPrivateChatRoom(t);
    return e = e || this.NewPrivateChatRoom(t);
  }
  NewPrivateChatRoom(t) {
    var e = new PrivateChatRoom_1.PrivateChatRoom(t, 1);
    this.jEt.set(t, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCreatePrivateChatRoom, t);
    return e;
  }
  NewTeamChatRoom() {
    this.WEt = new TeamChatRoom_1.TeamChatRoom(2);
    return this.WEt;
  }
  NewWorldChatRoom() {
    this.KEt = new WorldTeamChatRoom_1.WorldChatRoom(2);
    return this.KEt;
  }
  SelectedPrivateChatFriend(t) {
    t = this.TryGetPrivateChatRoom(t);
    if (t.CanChat()) {
      this.JoinChatRoom(t);
    }
  }
  GetPrivateChatRoom(t) {
    return this.jEt.get(t);
  }
  GetTeamChatRoom() {
    return this.WEt;
  }
  SetTeamChatRoom(t) {
    this.WEt = t;
  }
  GetWorldChatRoom() {
    return this.KEt;
  }
  SetWorldChatRoom(t) {
    this.KEt = t;
  }
  GetAllSortedChatRoom() {
    var t = [];
    for (const a of this.jEt.values()) {
      if (a.GetIsOpen() && a.CanChat()) {
        t.push(a);
      }
    }
    t.sort((t, e) => {
      var a = t.GetLastTimeStamp();
      var o = e.GetLastTimeStamp();
      if (a === 0) {
        return -1;
      } else if (o === 0) {
        return 1;
      } else if (a !== o) {
        return o - a;
      } else {
        return e.GetCreateTimeStamp() - t.GetCreateTimeStamp();
      }
    });
    var e = this.GetTeamChatRoom();
    if (e) {
      t.unshift(e);
    } else if (e = this.GetWorldChatRoom()) {
      t.unshift(e);
    }
    return t;
  }
  IsInPrivateChatRoom(t) {
    t = this.GetPrivateChatRoom(t);
    return !!t && t.GetIsOpen();
  }
  AddMutePlayer(t) {
    this.XEt.push(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddMutePlayer, t);
  }
  RemoveMutePlayer(t) {
    var e = this.XEt.indexOf(t);
    if (!(e < 0)) {
      this.XEt.splice(e, 1);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveMutePlayer, t);
    }
  }
  ClearAllMutePlayer() {
    this.XEt.length = 0;
  }
  IsInMute(t) {
    return this.XEt.indexOf(t) >= 0;
  }
}
exports.ChatModel = ChatModel;
//# sourceMappingURL=ChatModel.js.map