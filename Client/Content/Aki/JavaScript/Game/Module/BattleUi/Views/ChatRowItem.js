"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatRowItem = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
class ChatRowItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.jst = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [4, UE.UIText], [3, UE.UIText], [1, UE.UISprite], [2, UE.UISprite]];
  }
  Initialize(t) {
    super.Initialize();
    this.jst = t;
    var i = this.GetText(4);
    var e = this.GetSprite(1);
    var r = this.GetSprite(2);
    var a = this.GetText(3);
    var o = ModelManager_1.ModelManager.FriendModel;
    var l = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var _ = t.SenderPlayerId;
    var T = t.TargetPlayerId;
    var u = t.Content;
    let g = undefined;
    if (t.ContentChatRoomType === 1) {
      if (!T) {
        return;
      }
      o = o.GetFriendById(T);
      if (!o) {
        return;
      }
      g = `<color=#e5d5a1>[${g = o.PlayerName}]</color>`;
      LguiUtil_1.LguiUtil.SetLocalTextNew(a, "Text_FriendTag_Text");
      e?.SetUIActive(true);
      r?.SetUIActive(false);
    } else {
      T = ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(_)?.PlayerNumber;
      g = `<color=#aadcef>[${T}P][${g = t.SenderPlayerName}]</color>`;
      LguiUtil_1.LguiUtil.SetLocalTextNew(a, "Text_TeamTag_Text");
      e?.SetUIActive(false);
      r?.SetUIActive(true);
    }
    if (t.ContentType === Protocol_1.Aki.Protocol.p8n.DIs) {
      if (t.ContentChatRoomType === 1) {
        if (l === _) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_TalkToFriendWithOutTag_Text", g, u);
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_FriendTalkToMeExpressionWithOutTag_Text", g, u);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_TeamTalkWithoutTag_Text", g, u);
      }
      i.SetUIActive(true);
      i.bBestFit = false;
    }
    if (t.ContentType === Protocol_1.Aki.Protocol.p8n.Proto_Emoji) {
      o = Number(t.Content);
      T = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(o);
      let e = "";
      if (T) {
        a = T.ExpressionTexturePath;
        if (!a) {
          return;
        }
        e = `<texture=${a},0.3/>`;
      }
      if (t.ContentChatRoomType === 1) {
        if (l === _) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_TalkToFriendWithOutTag_Text", g, e);
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_FriendTalkToMeExpressionWithOutTag_Text", g, e);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_TeamTalkWithoutTag_Text", g, e);
      }
      i.SetUIActive(true);
      this.GetHorizontalLayout(0)?.SetAlign(6);
    }
  }
  Reset() {
    super.Reset();
  }
  GetChatRowData() {
    return this.jst;
  }
}
exports.ChatRowItem = ChatRowItem;
//# sourceMappingURL=ChatRowItem.js.map