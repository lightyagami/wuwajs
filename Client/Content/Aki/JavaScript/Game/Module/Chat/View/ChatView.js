"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender");
const InputKeyDisplayData_1 = require("../../../InputSettings/InputKeyDisplayData");
const InputSettings_1 = require("../../../InputSettings/InputSettings");
const InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const UiInteractLogReport_1 = require("../../../Ui/LogReport/UiInteractLogReport");
const UiManager_1 = require("../../../Ui/UiManager");
const FriendController_1 = require("../../Friend/FriendController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const ChatController_1 = require("../ChatController");
const ChatDefine_1 = require("../ChatDefine");
const PrivateChatRoom_1 = require("../PrivateChatRoom");
const TeamChatRoom_1 = require("../TeamChatRoom");
const WorldTeamChatRoom_1 = require("../WorldTeamChatRoom");
const ChatContent_1 = require("./ChatContent");
const ChatContentDynamicItem_1 = require("./ChatContentDynamicItem");
const PrivateChatFriendItem_1 = require("./PrivateChatFriendItem");
class ChatView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.TSt = [];
    this.LSt = false;
    this.DSt = undefined;
    this.RSt = undefined;
    this.SOd = undefined;
    this.MOd = undefined;
    this.USt = [];
    this.ChatInputMaxNum = 0;
    this.ASt = false;
    this.PSt = false;
    this.XPn = new InputKeyDisplayData_1.InputKeyDisplayData();
    this.eut = false;
    this.NPn = (t, e, i) => {
      return new ChatContent_1.ChatContentItem();
    };
    this.cHe = () => this.wSt();
    this.BSt = t => {};
    this.bSt = t => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Chat", 5, "当聊天文本提交时", ["content", t]);
      }
      this.qSt(t, Protocol_1.Aki.Protocol.p8n.DIs);
    };
    this.GSt = () => {};
    this.NSt = t => true;
    this.OSt = t => {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ReachInputMaxNum", this.ChatInputMaxNum);
      return true;
    };
    this.kSt = t => {
      var e;
      if (t.Y >= 0) {
        this.LSt = true;
      } else if (this.LSt && !ChatController_1.ChatController.IsInRequestHistory && (this.LSt = false, (e = (t = ModelManager_1.ModelManager.ChatModel).GetJoinedChatRoom()) instanceof PrivateChatRoom_1.PrivateChatRoom)) {
        t.RequestPrivateRoomLocalHistory(e);
      }
    };
    this.FSt = (t, e) => {
      if (this.ASt && e === 0 && !(e = this.GetInputText(2)).IsInputActive()) {
        e.ActivateInputText();
      }
    };
    this.VSt = t => {};
    this.HSt = t => {
      var e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom();
      this.jSt(e);
      var i = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
      if (i && (this.WSt(i, e), i.GetUniqueId() === t.GetUniqueId())) {
        if (i instanceof PrivateChatRoom_1.PrivateChatRoom) {
          this.KSt(i);
        } else {
          this.QSt(i);
        }
        this.XSt(true);
      }
    };
    this.$St = (t, e) => {
      var i;
      var r = ModelManager_1.ModelManager.ChatModel;
      var s = r.GetJoinedChatRoom();
      if (s && (i = s.GetUniqueId(), t = t.GetUniqueId(), r = r.GetAllSortedChatRoom(), this.jSt(r), this.WSt(s, r), i === t)) {
        this.vXa(e);
      }
    };
    this.zSt = t => {
      var e;
      if (ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom().GetUniqueId() === t.GetUniqueId()) {
        e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom();
        if (t instanceof PrivateChatRoom_1.PrivateChatRoom) {
          this.KSt(t);
          this.WSt(t, e);
        } else if (t instanceof TeamChatRoom_1.TeamChatRoom || t instanceof WorldTeamChatRoom_1.WorldChatRoom) {
          this.QSt(t);
          this.WSt(t, e);
        }
        this.XSt(true);
      }
    };
    this.ZSt = t => {
      var e;
      if (t instanceof PrivateChatRoom_1.PrivateChatRoom) {
        this.PSt = false;
        if (e = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom()) {
          if (e.GetUniqueId() === t.GetUniqueId()) {
            this.eyt(t);
            this.XSt(true);
          }
        } else {
          e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom();
          this.jSt(e);
          this.tyt(t);
        }
      }
    };
    this.iyt = t => {
      var e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom();
      this.jSt(e);
      var e = this.oyt(e);
      if (e) {
        if (e.ChatRoomType === 1) {
          this.KSt(e);
        } else {
          this.QSt(e);
        }
      } else {
        this.XSt(false);
      }
    };
    this.r7e = t => {
      var e = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
      if (e) {
        if (e instanceof PrivateChatRoom_1.PrivateChatRoom) {
          e = e.GetTargetPlayerId();
          if (!e) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Chat", 5, "私聊对象玩家Id不存在", ["targetPlayerId", e]);
            }
            return;
          }
        }
        this.qSt(t.toString(), Protocol_1.Aki.Protocol.p8n.Proto_Emoji);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Chat", 5, "当前没有加入任何一个聊天室");
      }
    };
    this.ryt = () => {
      UiManager_1.UiManager.OpenView("SelectedFriendChatView");
    };
    this.nyt = () => {
      UiManager_1.UiManager.OpenView("ChatExpressionView");
    };
    this.syt = () => {
      UiManager_1.UiManager.OpenView("QuickChatView");
    };
    this.ayt = () => {
      var t = this.GetInputText(2).GetText();
      this.qSt(t, Protocol_1.Aki.Protocol.p8n.DIs);
    };
    this.hyt = () => {
      var t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
      if (t && this.GetButton(8).GetOwner().GetComponentByClass(UE.UIItem.StaticClass()) && t instanceof PrivateChatRoom_1.PrivateChatRoom) {
        t = t.GetTargetPlayerId();
        ControllerHolder_1.ControllerHolder.ChatController.RequestChatOption(t);
      }
    };
    this.lyt = () => {
      UiManager_1.UiManager.CloseView("ChatView");
    };
    this.EOd = [];
    this._yt = () => {
      var t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
      if (t && t instanceof PrivateChatRoom_1.PrivateChatRoom) {
        t = t.GetTargetPlayerId();
        ModelManager_1.ModelManager.FriendModel.ClearFriendSearchResults();
        FriendController_1.FriendController.RequestSearchPlayerBasicInfo(t, true);
      }
    };
    this.uyt = t => {
      t = ModelManager_1.ModelManager.ChatModel.GetPrivateChatRoom(t);
      if (t) {
        this.cyt(t);
        this.K7e(t);
      }
    };
    this.MSt = t => {
      var t = ModelManager_1.ModelManager.ChatModel.GetPrivateChatRoom(t);
      if (!!t && !((t = this.USt.indexOf(t)) < 0)) {
        this.RSt.UnsafeGetGridProxy(t)?.RefreshMuteItem();
      }
    };
    this.rSt = t => {
      var t = ModelManager_1.ModelManager.ChatModel.GetPrivateChatRoom(t);
      if (!!t && !((t = this.USt.indexOf(t)) < 0)) {
        this.RSt.UnsafeGetGridProxy(t)?.RefreshPlayerTexture();
      }
    };
    this.XBo = () => {
      if (this.eut && !Info_1.Info.IsInTouch()) {
        this.CloseMe();
      } else {
        this.eut = Info_1.Info.IsInTouch();
        this.$Pn();
      }
    };
    this.myt = (t, e) => {
      var i = ModelManager_1.ModelManager.ChatModel;
      let r = undefined;
      switch (t) {
        case 1:
          if (!ModelManager_1.ModelManager.FriendModel.GetFriendById(e)) {
            return;
          }
          if ((r = i.GetPrivateChatRoom(e)) instanceof PrivateChatRoom_1.PrivateChatRoom) {
            this.tyt(r);
          }
          break;
        case 2:
          r = i.GetTeamChatRoom();
          this.dyt();
          break;
        case 3:
          r = i.GetWorldChatRoom();
          this.Cyt();
      }
      if (r) {
        this.WSt(r, this.USt);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UITextInputComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIItem], [17, UE.UIItem], [7, UE.UIText], [6, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIButtonComponent], [10, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [11, UE.UIDynScrollViewComponent], [15, UE.UILoopScrollViewComponent], [16, UE.UIButtonComponent], [18, UE.UIText], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIText], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [14, UE.UIItem]];
    this.BtnBindInfo = [[0, this.ryt], [1, this.nyt], [3, this.syt], [4, this.ayt], [8, this.hyt], [9, this.lyt], [16, this.lyt]];
  }
  OnBeforeCreate() {
    UiInteractLogReport_1.UiInteractLogReport.RecordChatOpen();
  }
  async OnBeforeStartAsync() {
    this.MOd = new ChatContentDynamicItem_1.ChatContentDynamicItem();
    this.SOd = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(11), this.GetItem(26), this.MOd, this.NPn);
    await this.SOd.Init();
  }
  OnStart() {
    this.eut = Info_1.Info.IsInTouch();
    this.ChatInputMaxNum = CommonParamById_1.configCommonParamById.GetIntConfig("chat_character");
    this.GetInputText(2).MaxInput = this.ChatInputMaxNum;
    this.GetItem(10).SetUIActive(false);
    var t = this.GetItem(10).GetOwner();
    this.RSt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(15), t, this.cHe);
    var t = ModelManager_1.ModelManager.ChatModel;
    var e = t.GetAllSortedChatRoom();
    this.jSt(e);
    let i = t.GetJoinedChatRoom();
    if ((i = i || this.oyt(e)) instanceof PrivateChatRoom_1.PrivateChatRoom) {
      this.KSt(i);
    } else {
      this.QSt(i);
    }
    this.XSt(i !== undefined);
    this.gyt();
    this.$Pn();
    this.Ore();
    this.Rah();
  }
  Rah() {
    var t = UiManager_1.UiManager.IsViewShow("BattleView");
    var e = this.GetItem(23);
    var i = this.GetItem(24);
    if (t) {
      e.SetUIActive(true);
      i.SetUIActive(false);
    } else {
      e.SetUIActive(false);
      i.SetUIActive(true);
    }
  }
  OnBeforeDestroy() {
    this.fyt();
    this.pyt();
    ModelManager_1.ModelManager.ChatModel.LeaveCurrentChatRoom();
    this.kre();
    this.RSt.ClearGridProxies();
    this.RSt = undefined;
    this.USt.length = 0;
    this.PSt = false;
  }
  OnAfterDestroy() {
    UiInteractLogReport_1.UiInteractLogReport.RecordChatClose();
  }
  OnTick(t) {
    this.PSt;
  }
  Ore() {
    var t = this.GetInputText(2);
    t.OnTextChange.Bind(this.BSt);
    t.OnTextSubmit.Bind(this.bSt);
    t.OnInputActivateDelegate.Bind(this.GSt);
    t.OnCheckTextInputDelegate.Bind(this.NSt);
    t.OnTextClip.Bind(this.OSt);
    this.GetUIDynScrollViewComponent(11).OnScrollValueChange.Bind(this.kSt);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.激活聊天, this.FSt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCreatePrivateChatRoom, this.VSt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnJoinChatRoom, this.zSt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddHistoryChatContentCompleted, this.ZSt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnOpenChatRoom, this.HSt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddChatContent, this.$St);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemovePrivateChatRoom, this.iyt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnClosePrivateChatRoom, this.iyt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectExpression, this.r7e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SearchPlayerInfo, this.uyt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddMutePlayer, this.MSt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveMutePlayer, this.MSt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChatPlayerInfoChanged, this.rSt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
  }
  kre() {
    var t = this.GetInputText(2);
    t.OnTextChange.Unbind();
    t.OnTextSubmit.Unbind();
    t.OnInputActivateDelegate.Unbind();
    t.OnCheckTextInputDelegate.Unbind();
    this.GetUIDynScrollViewComponent(11).OnScrollValueChange.Unbind();
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.激活聊天, this.FSt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCreatePrivateChatRoom, this.VSt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnJoinChatRoom, this.zSt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddHistoryChatContentCompleted, this.ZSt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnOpenChatRoom, this.HSt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddChatContent, this.$St);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemovePrivateChatRoom, this.iyt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnClosePrivateChatRoom, this.iyt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectExpression, this.r7e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SearchPlayerInfo, this.uyt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddMutePlayer, this.MSt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveMutePlayer, this.MSt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChatPlayerInfoChanged, this.rSt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
  }
  async vXa(t) {
    let e = false;
    var i = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser();
    if (!(e = i && t.PsAccountId && i.get(t.PsAccountId) ? true : e)) {
      this.EOd.push(t);
      this.YSt(this.EOd, true);
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.SOd?.ScrollToItemIndex(this.EOd.length - 1);
      }, ChatDefine_1.CHAT_SCROLL_DELAY);
    }
  }
  $Pn() {
    var e = this.GetText(18);
    if (InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(this.XPn, InputMappingsDefine_1.actionMappings.激活聊天)) {
      var i = this.XPn.GetDisplayKeyNameList();
      if (i) {
        let t = "";
        for (const s of i) {
          var r = InputSettings_1.InputSettings.GetKeyIconPath(s);
          t += `<texture=${r}>`;
        }
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "SendChatText", t);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "PrefabTextItem_1493640674_Text");
      }
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "PrefabTextItem_1493640674_Text");
    }
  }
  qSt(t, e) {
    if (StringUtils_1.StringUtils.IsEmpty(t)) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("InputChatContent");
    } else if (t.length > this.ChatInputMaxNum) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ReachInputMaxNum", this.ChatInputMaxNum);
    } else {
      var i = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
      if (i) {
        var r = i.GetLastTimeStamp();
        if (TimeUtil_1.TimeUtil.GetServerTime() - r < i.ChatCd / TimeUtil_1.TimeUtil.InverseMillisecond) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ChatCdText");
        } else {
          if (i instanceof PrivateChatRoom_1.PrivateChatRoom) {
            r = i.GetTargetPlayerId();
            if (!r) {
              if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Chat", 5, "私聊对象玩家Id不存在", ["targetPlayerId", r]);
              }
              return;
            }
            if (ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(r)) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ChatRefuseText");
              return;
            }
            ChatController_1.ChatController.PrivateChatRequest(e, t, r);
          } else if (i instanceof TeamChatRoom_1.TeamChatRoom) {
            ChatController_1.ChatController.ChannelChatRequest(e, t, Protocol_1.Aki.Protocol.BFs.Proto_MatchTeam);
          } else if (i instanceof WorldTeamChatRoom_1.WorldChatRoom) {
            ChatController_1.ChatController.ChannelChatRequest(e, t, Protocol_1.Aki.Protocol.BFs.Proto_WorldTeam);
          }
          this.GetInputText(2).SetText("", false);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Chat", 5, "当前没有加入任何一个聊天室");
      }
    }
  }
  XSt(t) {
    var e = this.GetItem(12);
    var i = this.GetItem(13);
    e.SetUIActive(t);
    i.SetUIActive(!t);
    this.ASt = t;
  }
  vyt(t) {
    this.GetButton(8).GetOwner().GetUIItem()?.SetUIActive(t);
  }
  KSt(t) {
    var e;
    if (t && t.CanChat()) {
      e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom();
      this.cyt(t, true);
      this.K7e(t);
      this.Nxa(t);
      this.sPa(t);
      this.WSt(t, e);
      this.eyt(t);
      this.vyt(true);
      this.XSt(true);
    }
  }
  QSt(t) {
    var e;
    if (t) {
      e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom();
      this.WSt(t, e);
      this.eyt(t);
      this.Nxa(undefined);
      this.sPa(undefined, true);
      this.cyt(undefined, false);
      this.K7e(undefined, true);
      this.vyt(false);
      this.XSt(true);
    }
  }
  async eyt(t) {
    this.fyt();
    var t = t.GetChatContentList();
    var e = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser();
    var i = [];
    for (const r of t) {
      if (!r.PsAccountId || !e || !e.has(r.PsAccountId)) {
        i.push(r);
      }
    }
    this.Myt(i);
  }
  Myt(t) {
    if (t.length <= 0) {
      this.YSt([]);
    } else {
      this.YSt(t);
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.SOd?.ScrollToItemIndex(t.length - 1);
      }, ChatDefine_1.FIRST_CHAT_SCROLL_DELAY);
    }
  }
  YSt(t, e) {
    const i = [];
    for (const n of t) {
      var r;
      var s;
      if (n.NoticeType === Protocol_1.Aki.Protocol.GFs.Proto_EnterTeam || n.NoticeType === Protocol_1.Aki.Protocol.GFs.Proto_ExitTeam) {
        r = {
          ChatContentData: n,
          Type: 2
        };
        i.push(r);
      } else if (n.IsOwnSend()) {
        r = {
          ChatContentData: n,
          Type: 1
        };
        i.push(r);
      } else {
        s = {
          ChatContentData: n,
          Type: 0
        };
        i.push(s);
      }
    }
    this.EOd = t;
    this.SOd?.RefreshByData(i, true, true);
    if (e && !Info_1.Info.IsInTouch()) {
      this.SOd?.BindLateUpdate(() => {
        this.SOd?.ScrollToItemIndex(i.length - 1).then(() => {
          for (const t of this.SOd?.GetScrollItemItems() ?? []) {
            if (t.Data.ChatContentData.TimeStamp === i[i.length - 1].ChatContentData.TimeStamp) {
              ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(t.GetInteractItem(), true, true);
              break;
            }
          }
        });
        this.SOd?.UnBindLateUpdate();
      });
    }
  }
  fyt() {
    for (const t of this.TSt) {
      t.Destroy();
    }
    this.TSt.length = 0;
  }
  WSt(t, e) {
    if (!!t && !((e = e.indexOf(t)) < 0)) {
      this.RSt.SelectGridProxy(e);
    }
  }
  cyt(t, e = true) {
    var i = this.GetItem(5);
    var r = this.GetItem(17);
    if (e) {
      i.SetUIActive(false);
      r.SetUIActive(false);
      if (!!t && !((e = this.USt.indexOf(t)) < 0)) {
        this.RSt.UnsafeGetGridProxy(e)?.RefreshIsOnline(t);
      }
    } else {
      i.SetUIActive(false);
      r.SetUIActive(false);
    }
  }
  K7e(t, e = false) {
    var i = this.GetText(7);
    var r = this.GetText(6);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalText(i, "CurrentTeam");
      i?.SetColor(ChatDefine_1.playerRealNameColor);
      r.SetUIActive(false);
    } else {
      e = t.GetPlayerName();
      t = t.GetPlayerRemarks();
      r.SetUIActive(false);
      if (t) {
        i.SetText(t);
        i?.SetColor(ChatDefine_1.playerMarkNameColor);
      } else {
        i.SetText(e);
        i.SetColor(ChatDefine_1.playerRealNameColor);
      }
    }
  }
  gyt() {
    this.pyt();
    var t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
    if (t && t instanceof PrivateChatRoom_1.PrivateChatRoom) {
      this.DSt = TimerSystem_1.GameplayTimerSystem.Forever(this._yt, ChatDefine_1.REFRESH_PLAYER_INFO_TIME_DOWN);
    }
  }
  pyt() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.DSt)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.DSt);
      this.DSt = undefined;
    }
  }
  jSt(t) {
    this.USt = t;
    this.RSt?.RefreshByData(t);
  }
  wSt() {
    var t = new PrivateChatFriendItem_1.ChatRoomItem();
    t.BindOnClicked(this.myt);
    return t;
  }
  tyt(t) {
    var e;
    var i = ModelManager_1.ModelManager.ChatModel;
    var r = t.GetTargetPlayerId();
    if (!!r && !!t.CanChat() && (!((e = i.GetJoinedChatRoom()) instanceof PrivateChatRoom_1.PrivateChatRoom) || e.GetTargetPlayerId() !== r)) {
      i.JoinChatRoom(t);
    }
  }
  dyt() {
    var t = ModelManager_1.ModelManager.ChatModel;
    var e = t.GetTeamChatRoom();
    if (e) {
      t.JoinChatRoom(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Chat", 5, "加入队伍聊天室失败，聊天室未初始化");
    }
  }
  Cyt() {
    var t = ModelManager_1.ModelManager.ChatModel;
    var e = t.GetWorldChatRoom();
    if (e) {
      t.JoinChatRoom(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Chat", 5, "加入世界聊天室失败，聊天室未初始化");
    }
  }
  oyt(t) {
    for (const e of t) {
      if (e instanceof PrivateChatRoom_1.PrivateChatRoom) {
        if (e.CanChat()) {
          this.tyt(e);
          return e;
        }
      } else {
        if (e instanceof TeamChatRoom_1.TeamChatRoom) {
          this.dyt();
          return e;
        }
        if (e instanceof WorldTeamChatRoom_1.WorldChatRoom) {
          this.Cyt();
          return e;
        }
      }
    }
  }
  Nxa(t) {
    var e;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      e = t !== undefined && t?.GetPsnUserId() !== "";
      this.GetItem(21)?.SetUIActive(e);
      if (e && t) {
        this.GetText(22)?.SetText(t.GetPsnOnlineId());
        this.GetText(22)?.SetUIActive(true);
      } else {
        this.GetText(22)?.SetUIActive(false);
      }
    } else {
      this.GetItem(21)?.SetUIActive(false);
      this.GetText(22)?.SetUIActive(false);
    }
  }
  sPa(t, e = false) {
    if (!e && PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      e = t !== undefined && t?.GetPsnUserId() !== "";
      this.GetItem(25)?.SetUIActive(!e);
    } else {
      this.GetItem(25)?.SetUIActive(false);
    }
  }
  OnBeforeShow() {
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableFrameGeneration("ChatView");
  }
  OnAfterHide() {
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableFrameGeneration("ChatView");
  }
}
exports.ChatView = ChatView;
//# sourceMappingURL=ChatView.js.map