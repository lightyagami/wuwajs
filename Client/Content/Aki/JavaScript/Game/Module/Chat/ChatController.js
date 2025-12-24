"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventCSharpBridge_1 = require("../../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const ChatDefine_1 = require("./ChatDefine");
const PrivateChatRoom_1 = require("./PrivateChatRoom");
class ChatController extends UiControllerBase_1.UiControllerBase {
  static OnClear() {
    if (this.M5a && TimerSystem_1.GameplayTimerSystem.Has(this.M5a)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.M5a);
      this.M5a = undefined;
    }
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectChatFriend, this.LEt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterTeam, this.Cze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveTeam, this.vze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterOnlineWorld, this.pze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveOnlineWorld, this.Mze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveFriend, this.DEt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResetModuleByResetToBattleView, this.REt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetFriendInitData, this.UEt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnWorldTeamPlayerInfoChanged, this.AEt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestAddMutePlayer, this.zMf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestRemoveMutePlayer, this.JMf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestChatOption, this.ZMf);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectChatFriend, this.LEt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterTeam, this.Cze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveTeam, this.vze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterOnlineWorld, this.pze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveOnlineWorld, this.Mze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveFriend, this.DEt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResetModuleByResetToBattleView, this.REt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetFriendInitData, this.UEt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnWorldTeamPlayerInfoChanged, this.AEt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestAddMutePlayer, this.zMf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestRemoveMutePlayer, this.JMf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestChatOption, this.ZMf);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(15585, this.PEt);
    Net_1.Net.Register(24562, this.xEt);
    Net_1.Net.Register(19817, this.wEt);
    Net_1.Net.Register(21473, this.BEt);
    Net_1.Net.Register(23455, this.bEt);
    Net_1.Net.Register(22002, this.qEt);
    Net_1.Net.Register(19277, this.Dhl);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15585);
    Net_1.Net.UnRegister(24562);
    Net_1.Net.UnRegister(19817);
    Net_1.Net.UnRegister(21473);
    Net_1.Net.UnRegister(23455);
    Net_1.Net.UnRegister(22002);
    Net_1.Net.UnRegister(19277);
  }
  static PrivateChatRequest(l, t, a) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(), e => {
      if (e === 1) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CommunicationRectricted"));
        this.O3a();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Chat", 27, "PrivateChatRequest 通信受限");
        }
      } else {
        if (!a) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Chat", 5, "PrivateChatRequest 私聊对象玩家Id不存在", ["targetPlayerId", a]);
          }
        }
        (e = new Protocol_1.Aki.Protocol.$zn()).p8n = l;
        e.P8n = t;
        e.B8n = a;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Chat", 5, "PrivateChatRequest 客户端请求私聊聊天", ["request", e]);
        }
        Net_1.Net.Call(29037, Protocol_1.Aki.Protocol.$zn.create(e), e => {
          var t;
          var a;
          var o;
          var r;
          var n = ModelManager_1.ModelManager.ChatModel;
          var i = e.B8n;
          var _ = e.Q4n;
          if (_ !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(_, 25842);
          } else {
            _ = e.O8n;
            t = e.ALs;
            a = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
            o = TimeUtil_1.TimeUtil.GetServerTime();
            r = (i = n.GetPrivateChatRoom(i)).GetLastTimeStamp();
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Chat", 5, "PrivateChatResponse 私聊聊天服务端回应", ["response", e]);
            }
            n.AddChatContent(i, _, a, t, l, Protocol_1.Aki.Protocol.GFs.Proto_None, false, o, r);
            if (e = ModelManager_1.ModelManager.FriendModel?.GetFriendById(a)) {
              n.RefreshChatPlayerData(a, e.PlayerHeadPhoto, e.PlayerName, e.PlayerTitleId, e.PlayerTitleStarLevel);
            }
            ChatController.PrivateChatOperateRequest(Protocol_1.Aki.Protocol.xFs.Proto_ReadMsg, 0);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshChatRowData, false);
          }
        });
      }
    });
  }
  static async O3a() {
    await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(), 3, 6);
  }
  static ChannelChatRequest(t, a, o) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(), e => {
      if (e === 1) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CommunicationRectricted"));
        this.O3a();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Chat", 27, "PrivateChatRequest 通信受限");
        }
      } else {
        (e = new Protocol_1.Aki.Protocol.iZn()).w8n = Protocol_1.Aki.Protocol.bFs.Proto_Team;
        e.b8n = o;
        e.p8n = t;
        e.P8n = a;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Chat", 5, "ChannelChatRequest 客户端请求队伍聊天", ["request", e]);
        }
        Net_1.Net.Call(19255, Protocol_1.Aki.Protocol.iZn.create(e), e => {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28142);
          } else if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Chat", 5, "ChannelChatRequest 队伍聊天服务端回应", ["response", e]);
          }
        });
      }
    });
  }
  static async hSl(e) {
    var t;
    var a;
    var o;
    var r;
    var n;
    var i;
    var e = e.PLs;
    var _ = e.N8n;
    var l = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser();
    if (!l || !l.get(e.KI_)) {
      t = (l = ModelManager_1.ModelManager.ChatModel).TryGetPrivateChatRoom(_);
      a = e.O8n;
      o = Number(MathUtils_1.MathUtils.LongToBigInt(e.k8n));
      o = Number(o);
      r = e.P8n;
      n = e.p8n;
      if (i = ModelManager_1.ModelManager.FriendModel?.GetFriendById(_)) {
        l.RefreshChatPlayerData(_, i.PlayerHeadPhoto, i.PlayerName, i.PlayerTitleId, i.PlayerTitleStarLevel);
      }
      if (t.GetIsOpen()) {
        i = e.F8n;
        e = t.GetLastTimeStamp();
        l.AddChatContent(t, a, _, r, n, Protocol_1.Aki.Protocol.GFs.Proto_None, i, o, e);
      } else {
        l.RequestOpenPrivateChatRoom(t);
        l.AddChatRowData(_, r, n, false, 1, o, _);
      }
      ChatController.PrivateChatOperateRequest(Protocol_1.Aki.Protocol.xFs.Proto_ReadMsg, 0);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshChatRowData, false);
    }
  }
  static async RJa(e) {
    var t;
    var a;
    var o;
    var r;
    var n;
    var i;
    var _;
    var l;
    var s;
    var C;
    var h;
    var v = ModelManager_1.ModelManager.ChatModel;
    let g = undefined;
    let M = undefined;
    M = e.b8n === Protocol_1.Aki.Protocol.BFs.Proto_MatchTeam ? (g = v.GetTeamChatRoom(), "TeamMatch") : (g = v.GetWorldChatRoom(), "TeamWorld");
    if (g) {
      if (e.qLs?.NLs === Protocol_1.Aki.Protocol.GFs.Proto_ClearMessages) {
        g.Reset();
        v.DeleteTeamChat();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshChatRowData, false);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOpenChatRoom, g);
      } else if ((await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetTargetRelation([e.qLs.KI_])).get(e.qLs.KI_) !== 5 && (t = TimeUtil_1.TimeUtil.GetServerTime(), a = (e = e.qLs).GLs, o = e.P8n, r = e.p8n, n = e.NLs, i = g.GetLastTimeStamp(), _ = e.kLs, l = e.OLs, s = e.YI_, C = e.KI_, h = e.w8d, e = e.L8d, v.AddChatContent(g, M, a, o, r, n, true, t, i, _, l, s, C), v.RefreshChatPlayerData(a, l, _, h, e), n !== Protocol_1.Aki.Protocol.GFs.Proto_EnterTeam) && n !== Protocol_1.Aki.Protocol.GFs.Proto_ExitTeam) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshChatRowData, false);
      }
    }
  }
  static PrivateChatHistoryRequest(o) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(), e => {
      if (e === 1) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Chat", 27, "PrivateChatHistoryRequest 通信受限");
        }
      } else {
        (e = new Protocol_1.Aki.Protocol.Wzn()).B8n = o;
        this.IsInRequestHistory = true;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Chat", 5, "PrivateChatHistoryRequest 客户端请求最近的私聊记录", ["request", e]);
        }
        Net_1.Net.Call(20405, Protocol_1.Aki.Protocol.Wzn.create(e), e => {
          var t;
          var a;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Chat", 5, "PrivateChatHistoryResponse 私聊聊天历史服务端回应", ["response", e]);
          }
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs && (ChatController.IsInRequestHistory = false, t = ModelManager_1.ModelManager.ChatModel, a = (e = e.R5n).B8n) && (t = t.GetPrivateChatRoom(a)) && (a = e.ULs) && !(a.length <= 0)) {
            this.$za(t, e.ULs, o);
          }
        });
      }
    });
  }
  static async $za(e, t, a) {
    var o = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser();
    var r = [];
    for (const n of t) {
      if (!o || !o.get(n.KI_)) {
        r.push(n);
      }
    }
    ModelManager_1.ModelManager.ChatModel.AddPrivateHistoryChatContent(e, r);
    ChatController.PrivateChatOperateRequest(Protocol_1.Aki.Protocol.xFs.Proto_OpenChat, a);
  }
  static async Xza(e) {
    var t = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser();
    var a = ModelManager_1.ModelManager.ChatModel;
    a.RemoveChatRowDataByChatRoomType(1);
    var o = [];
    for (const h of e.bLs) {
      var r = h.B8n;
      var o = [];
      let e = false;
      for (const v of h.ULs) {
        if (t && t.get(v.KI_)) {
          e = true;
        } else {
          o.push(v);
        }
      }
      if (!e) {
        var n = a.TryGetPrivateChatRoom(r);
        n.Reset();
        a.AddPrivateHistoryChatContent(n, o);
        for (const g of o) {
          var i = g.N8n;
          var _ = g.P8n;
          var l = g.p8n;
          var s = g.F8n;
          var C = Number(MathUtils_1.MathUtils.LongToBigInt(g.k8n));
          if (s && n) {
            a.SetChatRoomRedDot(n, true);
          }
          a.AddChatRowData(i, _, l, s, 1, C, r, undefined, undefined, false);
        }
      }
    }
    a.SortChatRowData();
    a.ClampChatRowDataListLength();
    for (const M of a.GetChatRowDataList()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Chat", 5, "[ChatDebug]PrivateChatHistoryNotify---打印最终聊天数据", ["Content", M.Content], ["TimeStamp", M.TimeStamp], ["IsOfflineMassage", M.IsOfflineMassage]);
      }
    }
    ChatController.PrivateChatOperateRequest(Protocol_1.Aki.Protocol.xFs.Proto_ReadMsg, 0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshChatRowData, true);
  }
  static async Nrh(e) {
    var t = new Array();
    for (const f of e.VLs) {
      if (f.KI_ !== "" && !t.includes(f.KI_)) {
        t.push(f.KI_);
      }
    }
    let a = new Map();
    if (t.length > 0) {
      a = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetTargetRelation(t);
    }
    var o = ModelManager_1.ModelManager.ChatModel;
    let r = undefined;
    let n = undefined;
    o.RemoveChatRowDataByChatRoomType(2, 3);
    if (r = e.b8n === Protocol_1.Aki.Protocol.BFs.Proto_MatchTeam ? (n = 2, o.GetTeamChatRoom()) : (n = 3, o.GetWorldChatRoom())) {
      var i;
      var _;
      var l;
      var s;
      var C;
      var h;
      var v;
      var g;
      var M;
      var e = e.VLs;
      o.AddTeamHistoryChatContent(r, e);
      for (const m of e) {
        if (a.get(m.KI_) !== 5) {
          i = m.GLs;
          _ = m.P8n;
          l = m.p8n;
          s = m.NLs;
          C = m.kLs;
          h = m.OLs;
          v = m.w8d;
          g = m.L8d;
          M = Number(MathUtils_1.MathUtils.LongToBigInt(m.FLs));
          o.RefreshChatPlayerData(i, h, C, v, g);
          if (s === Protocol_1.Aki.Protocol.GFs.Proto_None) {
            o.AddChatRowData(i, _, l, true, n, M, 0, C, h);
          }
        }
      }
      o.SortChatRowData();
      o.ClampChatRowDataListLength();
      for (const d of o.GetChatRowDataList()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Chat", 5, "[ChatDebug]ChannelChatHistoryNotify---打印最终聊天数据", ["Content", d.Content], ["TimeStamp", d.TimeStamp], ["IsOfflineMassage", d.IsOfflineMassage]);
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshChatRowData, true);
    }
  }
  static ChatMutePlayerRequest(e, t) {
    var a = new Protocol_1.Aki.Protocol.Jzn();
    a.B8n = e;
    a.q8n = t;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Chat", 5, "ChatMutePlayerRequest 客户端请求屏蔽", ["request", a]);
    }
    Net_1.Net.Call(20527, Protocol_1.Aki.Protocol.Jzn.create(a), this.NEt);
    if (t) {
      ModelManager_1.ModelManager.ChatModel.AddMutePlayer(e);
      EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsSyncAddMutePlayer, e);
    } else {
      ModelManager_1.ModelManager.ChatModel.RemoveMutePlayer(e);
      EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsSyncRemoveMutePlayer, e);
    }
  }
  static ChatReportPush(e) {}
  static PrivateChatOperateRequest(e, t) {
    var a = new Protocol_1.Aki.Protocol.Zzn();
    a.Q5n = e;
    a.G8n = t;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Chat", 5, "PrivateChatOperateRequest 客户端请求聊天操作", ["request", a]);
    }
    Net_1.Net.Call(17589, Protocol_1.Aki.Protocol.Zzn.create(a), this.OEt);
    if (e === Protocol_1.Aki.Protocol.xFs.Proto_CloseChat) {
      ModelManager_1.ModelManager.ChatModel.ClosePrivateChatRoom(t);
    }
  }
  static OpenFriendChat(e) {
    ModelManager_1.ModelManager.ChatModel.SelectedPrivateChatFriend(e);
    UiManager_1.UiManager.OpenView("ChatView");
  }
  static TryActiveDeleteFriendTips(e) {
    var t;
    if (UiManager_1.UiManager.IsViewShow("ChatView") && (t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom()) && t instanceof PrivateChatRoom_1.PrivateChatRoom && t.GetTargetPlayerId() === e) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("DeleteFriendText");
    }
  }
  static S5a() {
    var e = new Protocol_1.Aki.Protocol.Xzn();
    Net_1.Net.Call(17219, e, e => {
      if (!e.XI_ && (!this.M5a || !TimerSystem_1.GameplayTimerSystem.Has(this.M5a))) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Chat", 5, "PrivateChatDataResponse 服务端加载聊天数据失败，等待一段时间后重新请求", ["DelayTime", ChatDefine_1.DELAY_PRIVATE_CHAT_DATA_REQUEST_TIME]);
        }
        this.M5a = TimerSystem_1.GameplayTimerSystem.Delay(this.E5a, ChatDefine_1.DELAY_PRIVATE_CHAT_DATA_REQUEST_TIME);
      }
    });
  }
  static RequestChatOption(t) {
    ControllerHolder_1.ControllerHolder.FriendController.RequestPlayerCurrentDeactivationState(t, e => {
      if (e) {
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PlayerDeleteSelf");
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, undefined, undefined, [e]);
      } else {
        UiManager_1.UiManager.OpenView("ChatOption", t);
      }
    });
  }
}
exports.ChatController = ChatController;
(_a = ChatController).IsInRequestHistory = false;
ChatController.M5a = undefined;
ChatController.REt = () => {
  if (UiManager_1.UiManager.IsViewShow("ChatView")) {
    UiManager_1.UiManager.CloseView("ChatView");
  }
};
ChatController.LEt = e => {
  ModelManager_1.ModelManager.ChatModel.SelectedPrivateChatFriend(e);
};
ChatController.FQe = e => {
  if (e === "ChatView") {
    ModelManager_1.ModelManager.ChatModel.IsOpenedChatView = true;
  }
};
ChatController.pze = () => {
  if (!ModelManager_1.ModelManager.ChatModel.GetWorldChatRoom()) {
    ModelManager_1.ModelManager.ChatModel.SetWorldChatRoom(ModelManager_1.ModelManager.ChatModel.NewWorldChatRoom());
  }
  EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsSyncChatEnterOnlineWorld);
};
ChatController.Mze = () => {
  var e = ModelManager_1.ModelManager.ChatModel;
  e.SetWorldChatRoom(undefined);
  e.SetTeamChatRowDataVisible(false);
  var t = e.GetWorldChatRoom();
  if (t) {
    e.SetChatRoomRedDot(t, false);
  }
  if (UiManager_1.UiManager.IsViewShow("ChatView")) {
    UiManager_1.UiManager.CloseView("ChatView");
  }
  EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsSyncChatLeaveOnlineWorld);
};
ChatController.Cze = () => {
  var e = ModelManager_1.ModelManager.ChatModel;
  e.SetTeamChatRoom(e.NewTeamChatRoom());
  EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsSyncChatEnterTeam);
};
ChatController.vze = () => {
  var e = ModelManager_1.ModelManager.ChatModel;
  e.SetTeamChatRoom(undefined);
  e.SetTeamChatRowDataVisible(false);
  var t = e.GetTeamChatRoom();
  if (t) {
    e.SetChatRoomRedDot(t, false);
  }
  if (UiManager_1.UiManager.IsViewShow("ChatView")) {
    UiManager_1.UiManager.CloseView("ChatView");
  }
  EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsSyncChatLeaveTeam);
};
ChatController.DEt = e => {
  ModelManager_1.ModelManager.ChatModel.RemovePrivateChatRoom(e);
};
ChatController.PEt = t => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Chat", 5, "PrivateMessageNotify 私聊聊天服务端通知", ["notify", t]);
  }
  PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(), e => {
    if (e === 1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Chat", 27, "PrivateChatRequest 通信受限");
      }
    } else {
      _a.hSl(t);
    }
  });
};
ChatController.xEt = t => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Chat", 5, "ChannelChatMessageNotify 队伍聊天服务端通知", ["notify", t]);
  }
  PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(), e => {
    if (e === 1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Chat", 27, "PrivateChatRequest 通信受限");
      }
    } else {
      _a.RJa(t);
    }
  });
};
ChatController.wEt = t => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Chat", 5, "PrivateChatHistoryNotify 服务端推送最近的私人聊天历史记录");
  }
  PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(), e => {
    if (e === 1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Chat", 27, "PrivateChatHistoryRequest 通信受限");
      }
    } else {
      _a.Xza(t);
    }
  });
};
ChatController.BEt = t => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Chat", 5, "ChannelChatHistoryNotify 服务端推送最近的队伍聊天历史记录");
  }
  PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(), e => {
    if (e === 1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Chat", 27, "PrivateChatHistoryRequest 通信受限");
      }
    } else {
      _a.Nrh(t);
    }
  });
};
ChatController.bEt = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Chat", 5, "ChatMutePlayerListNotify 服务端通知屏蔽列表", ["notify", e]);
  }
  var t = ModelManager_1.ModelManager.ChatModel;
  t.ClearAllMutePlayer();
  for (const a of e.W5n) {
    t.AddMutePlayer(a);
  }
};
ChatController.NEt = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Chat", 5, "ChatMutePlayerResponse 服务端屏蔽回应", ["response", e]);
  }
  e = e.BLs;
  if (e && e.length !== 0) {
    var t = ModelManager_1.ModelManager.ChatModel;
    for (const a of e) {
      t.RemoveMutePlayer(a);
    }
  }
};
ChatController.qEt = e => {
  var t = MathUtils_1.MathUtils.LongToBigInt(e.xSs);
  var t = TimeUtil_1.TimeUtil.GetCountDownData(Number(t) - TimeUtil_1.TimeUtil.GetServerTime());
  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("BanChatText" + e.bSs, t.CountDownText);
};
ChatController.Dhl = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Chat", 5, "PrivateMessageNotify 私聊聊天服务端通知删除信息", ["notify", e]);
  }
  for (const t of e.W5n) {
    ModelManager_1.ModelManager.ChatModel.DeletePrivateChat(t);
    ModelManager_1.ModelManager.ChatModel.GetPrivateChatRoom(t)?.Close();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClosePrivateChatRoom, t);
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshChatRowData, false);
};
ChatController.OEt = e => {
  if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrBanChatDefault && Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Chat", 5, "PrivateChatOperateResponse 聊天操作回应", ["response", e]);
  }
};
ChatController.UEt = () => {
  _a.S5a();
};
ChatController.E5a = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Chat", 5, "PrivateChatDataResponse 开始重新请求");
  }
  _a.S5a();
  _a.M5a = undefined;
};
ChatController.AEt = e => {
  var t = e.W5n;
  var a = ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(t);
  if (a) {
    switch (e.JDs) {
      case Protocol_1.Aki.Protocol.i7s.Proto_Head:
        a.SetPlayerIcon(e.V8n);
        break;
      case Protocol_1.Aki.Protocol.i7s.H8n:
        a.SetPlayerName(e.j8n);
        break;
      case Protocol_1.Aki.Protocol.i7s.Proto_PlayerTitle:
        a.SetPlayerTitle(e.j8n);
        break;
      case Protocol_1.Aki.Protocol.i7s.v7n:
        a.SetSex(e.V8n);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChatPlayerInfoChanged, t);
  }
};
ChatController.zMf = e => {
  ModelManager_1.ModelManager.ChatModel.AddMutePlayer(e);
};
ChatController.JMf = e => {
  ModelManager_1.ModelManager.ChatModel.RemoveMutePlayer(e);
};
ChatController.ZMf = e => {
  ChatController.RequestChatOption(e);
}; //# sourceMappingURL=ChatController.js.map