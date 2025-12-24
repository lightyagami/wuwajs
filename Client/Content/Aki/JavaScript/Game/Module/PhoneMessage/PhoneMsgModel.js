"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMsgModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const BirthDayByMsgId_1 = require("../../../Core/Define/ConfigQuery/BirthDayByMsgId");
const SpeakerById_1 = require("../../../Core/Define/ConfigQuery/SpeakerById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const PlotDefine_1 = require("../Plot/PlotDefine");
const PhoneSystemDefine_1 = require("./PhoneSystemDefine");
class PhoneMsgModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.IsChatShowInitDone = false;
    this.CurrentUsingChatDialogId = 0;
    this.CurrentUsingChatBgId = 0;
    this.JTf = new Set();
    this.ZTf = new Set();
    this.CurrentToBeNotifiedMsgArray = new Array();
    this.CurrentToBeNotifiedMsgInSmallHeadQueue = [];
    this.CurrentShowingMsgIdInSmallHead = 0;
    this.ChatPartnerIdList = new Array();
    this.ChatPartnerId2ShortMessagesIdsDict = new Map();
    this.Id2ShortMessagesDict = new Map();
  }
  OnInit() {
    return true;
  }
  InitChatShow(e, t, r, i) {
    this.CurrentUsingChatDialogId = e;
    this.CurrentUsingChatBgId = t;
    this.SetUnLockChatDialogIds(r);
    this.SetUnLockChatBgIds(i);
    this.IsChatShowInitDone = true;
  }
  SetUnLockChatDialogIds(e) {
    for (const t of e) {
      this.JTf.add(t);
    }
  }
  SetUnLockChatBgIds(e) {
    for (const t of e) {
      this.ZTf.add(t);
    }
  }
  OnPhoneMsgDialogAndBgAddNotify(e) {
    if (e.snf) {
      this.SetUnLockChatDialogIds(e.snf);
    }
    if (e.hnf) {
      this.SetUnLockChatBgIds(e.hnf);
    }
  }
  IsChatDialogUnlocked(e) {
    return this.JTf.has(e);
  }
  IsChatBgUnlocked(e) {
    return this.ZTf.has(e);
  }
  OnPhoneMsgUpdateNotify(e) {
    var t = e.x9n;
    this.AddMessages(e.gIc, t);
    for (const s of e.pIc) {
      if (this.Id2ShortMessagesDict.has(s)) {
        this.Id2ShortMessagesDict.delete(s);
      }
      var r;
      var i;
      var a = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(s);
      if (a && this.ChatPartnerId2ShortMessagesIdsDict.has(a.WhichChat) && ((i = (r = this.ChatPartnerId2ShortMessagesIdsDict.get(a.WhichChat)).indexOf(s)) !== -1 && r.splice(i, 1), r.length === 0) && (this.ChatPartnerId2ShortMessagesIdsDict.delete(a.WhichChat), (i = this.ChatPartnerIdList.indexOf(a.WhichChat)) !== -1)) {
        this.ChatPartnerIdList.splice(i, 1);
      }
    }
    if (e.pIc.length > 0) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhoneHaveMsgToRemove);
    }
  }
  AddMessages(e, t = undefined, r = true) {
    let i = r;
    for (const g of e) {
      var a = g.v9n;
      var s = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(a);
      if (s) {
        var n = new PhoneSystemDefine_1.PhoneMsgShortMsgData(a);
        this.Id2ShortMessagesDict.set(a, n);
        n.IsRead = g.qSs;
        n.IsReceived = g.onf;
        n.LatestProgress = g.rnf;
        n.UnLockTime = g.yzs;
        var o = g.to1;
        for (const l of Object.keys(o)) {
          var h = o[l];
          n.SelectedOptionsDict.set(Number(l), h);
        }
        var _;
        var f = s.WhichChat;
        if (!this.ChatPartnerIdList.includes(f)) {
          this.ChatPartnerIdList.push(f);
        }
        if (this.ChatPartnerId2ShortMessagesIdsDict.has(f)) {
          if (!(_ = this.ChatPartnerId2ShortMessagesIdsDict.get(f)).includes(a)) {
            _.push(a);
          }
        } else {
          this.ChatPartnerId2ShortMessagesIdsDict.set(f, [a]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhoneMsgAdd, a);
        switch (t) {
          case Protocol_1.Aki.Protocol.cnf.Proto_None:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("PhoneSystem", 43, "短信通知原因为Proto_None, 请联系后端");
            }
            i = false;
            break;
          case Protocol_1.Aki.Protocol.cnf.Proto_QuestFix:
          case Protocol_1.Aki.Protocol.cnf.Proto_ActionRevert:
            i = false;
        }
        if (i && s.TipType) {
          (s.TipType === 1 ? this.CurrentToBeNotifiedMsgInSmallHeadQueue : this.CurrentToBeNotifiedMsgArray).push(a);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnNewPhoneMsgNeedShowTips);
        }
      }
    }
    for (const u of this.ChatPartnerId2ShortMessagesIdsDict.values()) {
      u.sort((e, t) => {
        e = this.Id2ShortMessagesDict.get(e);
        t = this.Id2ShortMessagesDict.get(t);
        e = e.UnLockTime;
        t = t.UnLockTime;
        if (e === t) {
          return 0;
        } else if (e < t) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    this.ChatPartnerIdList.sort((e, t) => {
      var e = this.ChatPartnerId2ShortMessagesIdsDict.get(e);
      var t = this.ChatPartnerId2ShortMessagesIdsDict.get(t);
      var e = e[0];
      var t = t[0];
      var r = this.GetPhoneMsgShortMsgDataByShortMsgId(e).UnLockTime.low;
      var i = this.GetPhoneMsgShortMsgDataByShortMsgId(t).UnLockTime.low;
      if (r === i) {
        if (e < t) {
          return 1;
        } else {
          return -1;
        }
      } else if (r < i) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  GetAllChatPartnerIds() {
    return this.ChatPartnerIdList;
  }
  GetAllPhoneMsgShortMsgDataByChatPartnerId(e) {
    if (this.ChatPartnerIdList.includes(e)) {
      e = this.ChatPartnerId2ShortMessagesIdsDict.get(e);
      if (!e) {
        return;
      }
      var t = [];
      for (const i of e) {
        var r = this.Id2ShortMessagesDict.get(i);
        if (r) {
          t.push(r);
        }
      }
      return t;
    }
  }
  GetPhoneMsgShortMsgDataByShortMsgId(e) {
    if (this.Id2ShortMessagesDict.has(e)) {
      return this.Id2ShortMessagesDict.get(e);
    }
  }
  GetFirstMsgDataByShortMsgId(e) {
    if (this.GetPhoneMsgShortMsgDataByShortMsgId(e)) {
      e = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(e);
      e = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(e.FlowParam[0], Number(e.FlowParam[1]), Number(e.FlowParam[2]));
      if (e) {
        if (e[0]) {
          for (const s of e) {
            if (s.Name === "ShowTalk") {
              for (const n of s.Params.TalkItems) {
                if (!this.rbf(n)) {
                  var t = n.WhoId ? SpeakerById_1.configSpeakerById.GetConfig(n.WhoId) : undefined;
                  if (!t) {
                    return;
                  }
                  var t = PublicUtil_1.PublicUtil.GetConfigTextByTable(0, t.Id) ?? "";
                  var r = SpeakerById_1.configSpeakerById.GetConfig(n.WhoId).HeadIconAsset;
                  let e = "";
                  switch (n.Type) {
                    case "Talk":
                      e = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(n.TidTalk) ?? "";
                      break;
                    case "PhoneMessage":
                      var i = n;
                      switch (i.MessageType.Type) {
                        case "Emoji":
                          var a = i.MessageType.EmojiId;
                          var a = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(a).Name;
                          var a = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(a) ?? "";
                          e = ConfigManager_1.ConfigManager.TextConfig.GetMultiText("ChatBubble_Content_Expression", a);
                          break;
                        case "Attachment":
                          e = ConfigManager_1.ConfigManager.TextConfig.GetMultiText("ChatBubble_Content_Attachment") ?? "";
                      }
                  }
                  return [t, r, e];
                }
              }
            }
          }
        }
      }
    }
  }
  IsShortMsgRead(e) {
    e = this.GetPhoneMsgShortMsgDataByShortMsgId(e);
    return !!e && e.IsRead;
  }
  IsSomeOneHasUnReadMsg(e) {
    e = this.GetAllPhoneMsgShortMsgDataByChatPartnerId(e);
    if (e) {
      for (const t of e) {
        if (!t.IsRead) {
          return true;
        }
      }
    }
    return false;
  }
  IsSomeOneHasUnReceivedMsg(e) {
    e = this.GetAllPhoneMsgShortMsgDataByChatPartnerId(e);
    if (e) {
      for (const r of e) {
        var t = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(r.ShortMsgId);
        if (t && t.FinallPopType === 6 && !r.IsReceived) {
          return true;
        }
      }
    }
    return false;
  }
  IsAllPhoneMsgRead() {
    for (const e of this.Id2ShortMessagesDict.values()) {
      if (!e.IsRead) {
        return false;
      }
    }
    return true;
  }
  IsHasUnReceivedMsg() {
    for (const t of this.Id2ShortMessagesDict.values()) {
      var e = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(t.ShortMsgId);
      if (e && e.FinallPopType === 6 && !t.IsReceived) {
        return true;
      }
    }
    return false;
  }
  IsPhoneMsgUnlock(e) {
    return this.Id2ShortMessagesDict.has(e);
  }
  SetShortMsgOptionData(e, t, r) {
    var i = this.GetPhoneMsgShortMsgDataByShortMsgId(e);
    if (i) {
      i.SelectedOptionsDict.set(t, r);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnUpdateShortMsgOptionData, e);
    }
  }
  GetShortMsgHasAnySelectedOption(e) {
    e = this.GetPhoneMsgShortMsgDataByShortMsgId(e);
    return !!e && e.SelectedOptionsDict.size > 0;
  }
  SetShortMsgRewardData(e, t) {
    e = this.GetPhoneMsgShortMsgDataByShortMsgId(e);
    if (e) {
      e.IsReceived = true;
    }
  }
  CreateShortMessageDisplayDataByShortMsgId(e) {
    e = this.GetPhoneMsgShortMsgDataByShortMsgId(e);
    if (e) {
      return this.CreateShortMessageDisplayData(e);
    }
  }
  CreateShortMessageDisplayData(e) {
    var t;
    var r = e.ShortMsgId;
    var i = new PhoneSystemDefine_1.ShortMessageDisplayData(r);
    i.ReadIndex = this.CoverServerProgressToReadIndex(e.LatestProgress);
    i.OptionSelectedMap = new Map(e.SelectedOptionsDict);
    i.IsReceivedReward = e.IsReceived;
    i.ChatDataList.length = 0;
    var e = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(r);
    var r = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(e.FlowParam[0], Number(e.FlowParam[1]), Number(e.FlowParam[2]));
    if (r) {
      if (t = r.find(e => e.Name === "SetPlotMode")) {
        t = t.Params;
        this.mPf(t, i);
      }
      if (t = r.find(e => e.Name === "ShowTalk")) {
        r = t.Params;
        i.InitTalkItemData(r);
        this.fPf(r, e, i);
      }
      if (i.IsJumpToFirstOption && i.OptionSelectedMap.size === 0) {
        i.ReadIndex = i.ChatDataList.length - 1;
      }
      i.ReadIndex = MathCommon_1.MathCommon.Clamp(i.ReadIndex, -1, i.ChatDataList.length - 1);
    }
    return i;
  }
  GetLastChatTextByShortMsgId(e) {
    e = this.CreateShortMessageDisplayDataByShortMsgId(e);
    if (e) {
      return this.GetLastChatTextByDisplayData(e);
    } else {
      return "";
    }
  }
  GetLastChatTextByDisplayData(t) {
    var r = t.ChatDataList;
    if (r.length === 0) {
      return "";
    }
    let i = undefined;
    let a = "";
    for (let e = t.ReadIndex; e >= 0; e--) {
      var s = r[e];
      if (s && s.ChatContentType !== 2 && (i = s, (a = this.kQf(i, t)) !== "")) {
        break;
      }
    }
    if (a === "") {
      if (t.ReadIndex < 0) {
        for (const e of r) {
          if (e && e.ChatContentType !== 2 && (i = e, (a = this.kQf(i, t)) !== "")) {
            break;
          }
        }
      } else {
        a = ConfigManager_1.ConfigManager.TextConfig.GetMultiText("ChatBubble_Content_Input") ?? "";
      }
    }
    return a;
  }
  kQf(e, t) {
    let r = "";
    if (!e) {
      if (t = ModelManager_1.ModelManager.PhoneMsgModel.GetFirstMsgDataByShortMsgId(t.ShortMsgId)) {
        return t[2];
      } else {
        return "";
      }
    }
    switch (e.ContentType) {
      case 1:
        r = e.ContentStr;
        break;
      case 2:
        var i = e.ContentNum;
        var i = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(i).Name;
        var i = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(i) ?? "";
        r = ConfigManager_1.ConfigManager.TextConfig.GetMultiText("ChatBubble_Content_Expression", i);
        break;
      case 3:
        r = ConfigManager_1.ConfigManager.TextConfig.GetMultiText("ChatBubble_Content_Attachment") ?? "";
    }
    return r;
  }
  mPf(e, t) {
    e = e.PhoneMessageConfig;
    t.IsJumpToFirstOption = e?.IsJumpToFirstOption ?? false;
  }
  fPf(e, t, r, i = 0) {
    var a = e.TalkItems;
    let s = i;
    while (s >= 0 && s < a.length) {
      s = this.ebf(e, t, r, s);
    }
    if (!r.IsLastOption()) {
      this.tbf(t, r);
    }
  }
  ebf(e, t, r, i = 0) {
    var e = e.TalkItems;
    var a = e[i];
    let s = undefined;
    let n = -1;
    let o = false;
    if (this.rbf(a)) {
      s = this.CreateSystemTipChatData(a);
    } else if (this.nDf(a)) {
      if (r.OptionSelectedMap.has(i)) {
        n = this.ibf(e, i, r);
      } else {
        s = this.CreateSelfPhoneMsgChatData(a, true);
        o = true;
      }
    } else {
      s = a.WhoId === PlotDefine_1.PLOT_SELF_SPEAKER_ID || a.WhoId === PlotDefine_1.PLOT_MESSAGE_SELF_SPEAKER_ID ? this.CreateSelfPhoneMsgChatData(a) : this.CreateOtherPhoneMsgChatData(a);
    }
    if (s) {
      r.ChatDataList.push(s);
    }
    if (n >= 0) {
      return n;
    }
    if (o) {
      return -1;
    }
    var h = a.Actions?.[0];
    if (h) {
      switch (h.Name) {
        case "FinishTalk":
          return -1;
        case "JumpTalk":
          return this.B4f(h, r);
      }
    }
    var _ = a.Options;
    if (_ && _.length > 0) {
      if (r.OptionSelectedMap.has(i)) {
        return this.ibf(e, i, r);
      }
      _ = this.CreateSelfPhoneMsgChatData(a, true);
      if (_) {
        r.ChatDataList.push(_);
        return -1;
      }
    }
    return i + 1;
  }
  ibf(e, t, r) {
    var i = t;
    var e = e[t].Options;
    if (!e) {
      return i;
    }
    t = r.OptionSelectedMap.get(t);
    if (t === undefined || t < 0 || t >= e.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhoneSystem", 43, "[短信剧本配置ERROR] 选项选择索引错误", ["短信ID", r.ShortMsgId]);
      }
    } else {
      e = e[t];
      if (!e.Actions || e.Actions.length === 0) {
        return i + 1;
      }
      t = e.Actions.find(e => e.Name === "JumpTalk");
      if (t) {
        return this.B4f(t, r);
      }
      i = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(r.ShortMsgId);
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhoneSystem", 43, "[短信剧本配置ERROR] 选项配置中找不到JumpTalk类型，注意！JumpTalk必须指向玩家选项所对应的完整发言，而非下一句NPC发言，否则将不显示玩家发言", ["短信ID", r.ShortMsgId], ["剧本ID", i.FlowParam[0]]);
      }
    }
    return -1;
  }
  tbf(e, t) {
    e = this.obf(e, t);
    if (e) {
      t.ChatDataList.push(e);
    }
  }
  B4f(e, t) {
    e = t.IdToIndexMap.get(e.Params.TalkId);
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhoneSystem", 43, "[短信剧本配置ERROR] JumpTalk指向的选项Index不存在", ["短信ID", t.ShortMsgId]);
      }
      return -1;
    } else {
      return e;
    }
  }
  ProcessAfterAnswer(e, t) {
    var r;
    var i;
    if (!(t < 0)) {
      if (r = e.ShowTalkConfig) {
        e.ChatDataList.splice(e.ChatDataList.length - 1, 1);
        if (!((t = this.ibf(r.TalkItems, t, e)) < 0)) {
          i = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(e.ShortMsgId);
          this.fPf(r, i, e, t);
        }
      }
    }
  }
  rbf(e) {
    return e.Type === "PhoneMessage" && e.MessageType.Type === "SystemTip";
  }
  nDf(e) {
    return e.Type === "Option" || e.Type === "SystemOption";
  }
  Uaf(e) {
    if (e = e && (e ? SpeakerById_1.configSpeakerById.GetConfig(e) : undefined)) {
      return [PublicUtil_1.PublicUtil.GetConfigTextByTable(0, e.Id) ?? "", e.HeadIconAsset];
    } else {
      return ["", ""];
    }
  }
  nbf(e, t, r = false) {
    if (r) {
      this.k4f(e, t);
    } else {
      switch (t.Type) {
        case "Talk":
          this.q4f(e, t);
          break;
        case "PhoneMessage":
          this.O4f(e, t);
      }
    }
  }
  k4f(t, r) {
    r = r.Options;
    if (r && r.length !== 0) {
      r = r[0];
      let e = undefined;
      if (r.TypeParams) {
        if (r.TypeParams.Type !== "PhoneMessageEmoji") {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PhoneSystem", 43, "[短信剧本配置ERROR] 选项配置中找不到选项类型");
          }
          return;
        }
        e = 9;
      } else {
        e = 8;
      }
      t.ContentType = e;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhoneSystem", 43, "[短信剧本配置ERROR] 选项配置中找不到选项");
    }
  }
  q4f(e, t) {
    e.IsSendError = t.Style?.Type === "PhoneSendError";
    e.ContentStr = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t.TidTalk) ?? "";
    this.SetDialogChatData(e, t);
  }
  O4f(e, t) {
    var r = t;
    e.IsSendError = r.Style?.Type === "PhoneSendError";
    switch (r.MessageType.Type) {
      case "Emoji":
        this.SetEmojiChatData(e, r);
        break;
      case "Attachment":
        this.SetAttachmentChatData(e, r);
    }
  }
  CreateOtherPhoneMsgChatData(e) {
    var t = new PhoneSystemDefine_1.PhoneMsgChatData(0);
    t.TalkItem = e;
    var r = this.Uaf(e.WhoId);
    t.SpeakerName = r[0];
    t.SpeakerHeadIconPath = r[1];
    this.nbf(t, e);
    return t;
  }
  CreateSelfPhoneMsgChatData(e, t = false) {
    var r = new PhoneSystemDefine_1.PhoneMsgChatData(1);
    r.TalkItem = e;
    var i = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
    var i = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinIdByRoleId(i);
    var i = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(i);
    r.SpeakerHeadIconPath = i.RoleHeadIconCircle;
    r.SpeakerName = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    this.nbf(r, e, t);
    return r;
  }
  CreateSystemTipChatData(e) {
    var t;
    if (e.MessageType.Type === "SystemTip") {
      (t = new PhoneSystemDefine_1.PhoneMsgChatData(2)).TalkItem = e;
      t.ContentType = 7;
      t.ContentStr = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(e.TidTalk) ?? "";
      return t;
    }
  }
  SetDialogChatData(e, t) {
    e.ContentType = 1;
    e.ContentStr = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t.TidTalk) ?? "";
  }
  SetEmojiChatData(e, t) {
    if (t.MessageType.Type === "Emoji") {
      t = t.MessageType;
      e.ContentType = 2;
      e.ContentNum = t.EmojiId;
    }
  }
  SetAttachmentChatData(e, t) {
    if (t.MessageType.Type === "Attachment") {
      t = t.MessageType;
      e.ContentType = 3;
      e.ContentNum = t.AttachmentId;
    }
  }
  obf(e, t) {
    if (e.FinallPopType) {
      var r = new PhoneSystemDefine_1.PhoneMsgChatData(2);
      switch (e.FinallPopType) {
        case 4:
          r.ContentType = 4;
          r.QuestId = e.QuestId;
          break;
        case 5:
          r.ContentType = 5;
          var i = BirthDayByMsgId_1.configBirthDayByMsgId.GetConfig(e.Id);
          r.BirthdayCardItemId = i?.BirthDayCardItemId ?? 0;
          break;
        case 6:
          r.ContentType = 6;
          r.DropId = e.DropId;
          r.IsFinish = t.IsReceivedReward;
      }
      var a = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetChatPartnerConfig(e.WhichChat);
      r.IsGroupChat = a?.IsGroupChat ?? false;
      r.ShortMessageId = e.Id;
      r.ChatParnetId = e.WhichChat;
      r.UnLockTime = this.Id2ShortMessagesDict.get(e.Id)?.UnLockTime ?? 0;
      return r;
    }
  }
  CoverServerProgressToReadIndex(e) {
    return e - 1;
  }
  CoverReadIndexToServerProgress(e) {
    return e + 1;
  }
}
exports.PhoneMsgModel = PhoneMsgModel;
//# sourceMappingURL=PhoneMsgModel.js.map