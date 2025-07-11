"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuickChatView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ChatController_1 = require("../ChatController");
const PrivateChatRoom_1 = require("../PrivateChatRoom");
const TeamChatRoom_1 = require("../TeamChatRoom");
const WorldTeamChatRoom_1 = require("../WorldTeamChatRoom");
const QuickChatText_1 = require("./QuickChatText");
class QuickChatView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ChatInputMaxNum = 0;
    this.Tyt = [];
    this.Lyt = e => {
      var t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
      if (t) {
        if (t instanceof PrivateChatRoom_1.PrivateChatRoom) {
          t = t.GetTargetPlayerId();
          if (!t) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Chat", 5, "私聊对象玩家Id不存在", ["targetPlayerId", t]);
            }
            return;
          }
        }
        this.qSt(e, Protocol_1.Aki.Protocol.p8n.DIs);
        this.CloseMe();
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Chat", 5, "当前没有加入任何一个聊天室");
      }
    };
    this.Dyt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Dyt]];
  }
  OnStart() {
    this.ChatInputMaxNum = CommonParamById_1.configCommonParamById.GetIntConfig("chat_character");
    this.GetButton(1)?.RootUIComp.SetUIActive(true);
    this.Ryt();
  }
  Ryt() {
    var e = ConfigManager_1.ConfigManager.ChatConfig.GetAllQuickChatConfigList();
    if (e) {
      var t = this.GetItem(3);
      var r = this.GetItem(2);
      var o = t.GetOwner();
      for (const l of e) {
        var i = LguiUtil_1.LguiUtil.DuplicateActor(o, r);
        var i = new QuickChatText_1.QuickChatText(i);
        var a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(l.QuickChatContent);
        i.Refresh(a);
        i.BindOnClicked(this.Lyt);
        i.SetActive(true);
        this.Tyt.push(i);
      }
      t.SetUIActive(false);
    }
  }
  qSt(e, t) {
    var r;
    var o;
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("InputChatContent");
    } else if (e.length > this.ChatInputMaxNum) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ReachInputMaxNum", this.ChatInputMaxNum);
    } else if (r = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom()) {
      o = r.GetLastTimeStamp();
      if (TimeUtil_1.TimeUtil.GetServerTime() - o < r.ChatCd / TimeUtil_1.TimeUtil.InverseMillisecond) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ChatCdText");
      } else if (r instanceof PrivateChatRoom_1.PrivateChatRoom) {
        if (o = r.GetTargetPlayerId()) {
          if (ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(o)) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ChatRefuseText");
          } else {
            ChatController_1.ChatController.PrivateChatRequest(t, e, o);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Chat", 5, "私聊对象玩家Id不存在", ["targetPlayerId", o]);
        }
      } else if (r instanceof TeamChatRoom_1.TeamChatRoom) {
        ChatController_1.ChatController.ChannelChatRequest(t, e, Protocol_1.Aki.Protocol.BFs.Proto_MatchTeam);
      } else if (r instanceof WorldTeamChatRoom_1.WorldChatRoom) {
        ChatController_1.ChatController.ChannelChatRequest(t, e, Protocol_1.Aki.Protocol.BFs.Proto_WorldTeam);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Chat", 5, "当前没有加入任何一个聊天室");
    }
  }
  OnBeforeDestroy() {
    this.Uyt();
  }
  Uyt() {
    for (const e of this.Tyt) {
      e.Destroy();
    }
  }
}
exports.QuickChatView = QuickChatView;
//# sourceMappingURL=QuickChatView.js.map