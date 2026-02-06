"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatRowDynamicItemInSide = exports.ChatRowDynamicItemSize = exports.ChatRowDynamicItem = exports.ChatRowLoopItem = exports.ChatRowItem = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
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
  Initialize(e) {
    super.Initialize();
    this.jst = e;
    var i = this.GetText(4);
    var t = this.GetSprite(1);
    var a = this.GetSprite(2);
    var r = this.GetText(3);
    var o = ModelManager_1.ModelManager.FriendModel;
    var s = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var T = e.SenderPlayerId;
    var l = e.TargetPlayerId;
    var n = e.Content;
    let _ = undefined;
    if (e.ContentChatRoomType === 1) {
      if (!l) {
        return;
      }
      o = o.GetFriendById(l);
      if (!o) {
        return;
      }
      _ = `<color=#e5d5a1>[${_ = o.PlayerName}]</color>`;
      LguiUtil_1.LguiUtil.SetLocalTextNew(r, "Text_FriendTag_Text");
      t?.SetUIActive(true);
      a?.SetUIActive(false);
    } else {
      l = ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(T)?.PlayerNumber;
      _ = `<color=#aadcef>[${l}P][${_ = e.SenderPlayerName}]</color>`;
      LguiUtil_1.LguiUtil.SetLocalTextNew(r, "Text_TeamTag_Text");
      t?.SetUIActive(false);
      a?.SetUIActive(true);
    }
    if (e.ContentType === Protocol_1.Aki.Protocol.p8n.DIs) {
      if (e.ContentChatRoomType === 1) {
        if (s === T) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_TalkToFriendWithOutTag_Text", _, n);
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_FriendTalkToMeExpressionWithOutTag_Text", _, n);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_TeamTalkWithoutTag_Text", _, n);
      }
      i.SetUIActive(true);
      i.bBestFit = false;
    }
    if (e.ContentType === Protocol_1.Aki.Protocol.p8n.Proto_Emoji) {
      o = Number(e.Content);
      l = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(o);
      let t = "";
      if (l) {
        r = l.ExpressionTexturePath;
        if (!r) {
          return;
        }
        t = `<texture=${r},0.3/>`;
      }
      if (e.ContentChatRoomType === 1) {
        if (s === T) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_TalkToFriendWithOutTag_Text", _, t);
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_FriendTalkToMeExpressionWithOutTag_Text", _, t);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_TeamTalkWithoutTag_Text", _, t);
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
class ChatRowLoopItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.jst = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [4, UE.UIText], [3, UE.UIText], [1, UE.UISprite], [2, UE.UISprite]];
  }
  Refresh(e, t, i) {
    this.jst = e;
    var a = this.GetText(4);
    var r = this.GetSprite(1);
    var o = this.GetSprite(2);
    var s = this.GetText(3);
    var T = ModelManager_1.ModelManager.FriendModel;
    var l = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var n = e.SenderPlayerId;
    var _ = e.TargetPlayerId;
    var u = e.Content;
    let g = undefined;
    if (e.ContentChatRoomType === 1) {
      if (!_) {
        return;
      }
      T = T.GetFriendById(_);
      if (!T) {
        return;
      }
      g = `<color=#e5d5a1>[${g = T.PlayerName}]</color>`;
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, "Text_FriendTag_Text");
      r?.SetUIActive(true);
      o?.SetUIActive(false);
    } else {
      _ = ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(n)?.PlayerNumber;
      g = `<color=#aadcef>[${_}P][${g = e.SenderPlayerName}]</color>`;
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, "Text_TeamTag_Text");
      r?.SetUIActive(false);
      o?.SetUIActive(true);
    }
    if (e.ContentType === Protocol_1.Aki.Protocol.p8n.DIs) {
      if (e.ContentChatRoomType === 1) {
        if (l === n) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(a, "Text_TalkToFriendWithOutTag_Text", g, u);
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(a, "Text_FriendTalkToMeExpressionWithOutTag_Text", g, u);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(a, "Text_TeamTalkWithoutTag_Text", g, u);
      }
      a.SetUIActive(true);
      a.bBestFit = false;
    }
    if (e.ContentType === Protocol_1.Aki.Protocol.p8n.Proto_Emoji) {
      T = Number(e.Content);
      _ = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(T);
      let t = "";
      if (_) {
        s = _.ExpressionTexturePath;
        if (!s) {
          return;
        }
        t = `<texture=${s},0.3/>`;
      }
      if (e.ContentChatRoomType === 1) {
        if (l === n) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(a, "Text_TalkToFriendWithOutTag_Text", g, t);
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(a, "Text_FriendTalkToMeExpressionWithOutTag_Text", g, t);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(a, "Text_TeamTalkWithoutTag_Text", g, t);
      }
      a.SetUIActive(true);
      this.GetHorizontalLayout(0)?.SetAlign(6);
    }
  }
  GetChatRowData() {
    return this.jst;
  }
}
exports.ChatRowLoopItem = ChatRowLoopItem;
class ChatRowDynamicItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$Ag = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  GetUsingItem(t) {
    return this.GetItem(1).GetOwner();
  }
  Update(t, e) {
    this.$Ag?.Update(t, e);
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
    await this.WZt();
  }
  async WZt() {
    this.$Ag = new ChatRowDynamicItemInSide();
    await this.$Ag.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  ClearItem() {
    this.Destroy();
  }
}
exports.ChatRowDynamicItem = ChatRowDynamicItem;
class ChatRowDynamicItemSize extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  GetItemSize(t) {
    var e = this.GetItem(1).GetWidth();
    var i = this.GetItem(1).GetHeight();
    return new UE.Vector2D(e, i);
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
  }
  ClearItem() {}
}
exports.ChatRowDynamicItemSize = ChatRowDynamicItemSize;
class ChatRowDynamicItemInSide extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIText]];
  }
  Update(e, t) {
    var i = this.GetText(4);
    var a = this.GetSprite(1);
    var r = this.GetSprite(2);
    var o = this.GetText(3);
    var s = ModelManager_1.ModelManager.FriendModel;
    var T = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    var l = e.SenderPlayerId;
    var n = e.TargetPlayerId;
    var _ = e.Content;
    let u = undefined;
    if (e.ContentChatRoomType === 1) {
      if (!n) {
        return;
      }
      s = s.GetFriendById(n);
      if (!s) {
        return;
      }
      u = `<color=#e5d5a1>[${u = s.PlayerName}]</color>`;
      LguiUtil_1.LguiUtil.SetLocalTextNew(o, "Text_FriendTag_Text");
      a?.SetUIActive(true);
      r?.SetUIActive(false);
    } else {
      const t = ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(l)?.PlayerNumber;
      u = `<color=#aadcef>[${t}P][${u = e.SenderPlayerName}]</color>`;
      LguiUtil_1.LguiUtil.SetLocalTextNew(o, "Text_TeamTag_Text");
      a?.SetUIActive(false);
      r?.SetUIActive(true);
    }
    if (e.ContentType === Protocol_1.Aki.Protocol.p8n.DIs) {
      if (e.ContentChatRoomType === 1) {
        if (T === l) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_TalkToFriendWithOutTag_Text", u, _);
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_FriendTalkToMeExpressionWithOutTag_Text", u, _);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_TeamTalkWithoutTag_Text", u, _);
      }
      i.SetUIActive(true);
      i.bBestFit = false;
      this.GetHorizontalLayout(0)?.SetAlign(0);
    }
    if (e.ContentType === Protocol_1.Aki.Protocol.p8n.Proto_Emoji) {
      n = Number(e.Content);
      s = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(n);
      let t = "";
      if (s) {
        o = s.ExpressionTexturePath;
        if (!o) {
          return;
        }
        t = `<texture=${o},0.3/>`;
      }
      if (e.ContentChatRoomType === 1) {
        if (T === l) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_TalkToFriendWithOutTag_Text", u, t);
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_FriendTalkToMeExpressionWithOutTag_Text", u, t);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "Text_TeamTalkWithoutTag_Text", u, t);
      }
      i.SetUIActive(true);
      this.GetHorizontalLayout(0)?.SetAlign(6);
    }
  }
}
exports.ChatRowDynamicItemInSide = ChatRowDynamicItemInSide;
//# sourceMappingURL=ChatRowItem.js.map